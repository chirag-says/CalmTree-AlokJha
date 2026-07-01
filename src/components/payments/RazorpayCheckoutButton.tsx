/**
 * RazorpayCheckoutButton
 *
 * Loads the Razorpay checkout.js SDK, creates an order via our server function,
 * then opens the Razorpay payment modal.
 *
 * The client success callback is NOT the source of truth — it shows an optimistic
 * "payment processing" state. Real entitlement/purchase rows are written by the webhook.
 * After the callback, we invalidate the entitlement cache so the UI re-checks.
 *
 * Props:
 *   productType  — 'assessment_category' | 'ebook'
 *   productRef   — tier name for assessments, ebook UUID for ebooks
 *   label        — button label (e.g. "Unlock for ₹99")
 *   onSuccess    — called after optimistic success (poll for entitlement landing)
 */

import { useState, useCallback } from "react";
import { usePostHog } from "@posthog/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { createRazorpayOrder } from "@/lib/api/payments.functions";
import { invalidateEntitlementCache } from "@/hooks/useEntitlement";

// Razorpay checkout.js type declaration
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  prefill?: { email?: string };
  theme?: { color?: string };
  handler: (response: RazorpayPaymentResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
  close(): void;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface RazorpayCheckoutButtonProps {
  productType: "assessment_category" | "ebook";
  productRef: string;
  label: string;
  onSuccess?: () => void;
  className?: string;
  size?: "default" | "sm" | "lg";
}

export function RazorpayCheckoutButton({
  productType,
  productRef,
  label,
  onSuccess,
  className,
  size = "default",
}: RazorpayCheckoutButtonProps) {
  const { user, session } = useAuth();
  const posthog = usePostHog();
  const [loading, setLoading] = useState(false);

  const handleCheckout = useCallback(async () => {
    if (!user || !session?.access_token) {
      toast.error("Please sign in before making a purchase.");
      return;
    }

    setLoading(true);
    try {
      // 1. Create order server-side (price looked up there)
      const result = await createRazorpayOrder({
        data: {
          accessToken: session.access_token,
          productType,
          productRef,
        },
      });

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      const { orderId, amount, currency, keyId } = result;

      // 2. Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Could not load payment gateway. Please check your connection.");
        return;
      }

      // 3. Open checkout modal
      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: "CalmTree",
        description: productType === "ebook" ? "Ebook Purchase" : "Assessment Tier Access",
        prefill: { email: user.email },
        theme: { color: "#166534" }, // matches CalmTree primary green
        handler: (response) => {
          posthog.capture("purchase_completed", {
            product_type: productType,
            product_ref: productRef,
            currency,
            razorpay_order_id: response.razorpay_order_id,
          });
          // Optimistic: show success immediately; webhook does the real DB write.
          toast.success("Payment successful! Your access is being activated…", {
            duration: 5000,
          });
          // Invalidate cache so next entitlement check goes to the server.
          invalidateEntitlementCache();
          onSuccess?.();

          console.log("[razorpay] Payment captured:", response.razorpay_payment_id);
        },
        modal: {
          ondismiss: () => {
            posthog.capture("payment_dismissed", {
              product_type: productType,
              product_ref: productRef,
            });
            toast("Payment cancelled.");
          },
        },
      });

      posthog.capture("checkout_initiated", {
        product_type: productType,
        product_ref: productRef,
        currency,
      });
      rzp.open();
    } finally {
      setLoading(false);
    }
  }, [user, session, productType, productRef, onSuccess, posthog]);

  return (
    <Button size={size} className={className} disabled={loading} onClick={handleCheckout}>
      {loading ? (
        <>
          <Loader2 className="animate-spin h-4 w-4" />
          Loading…
        </>
      ) : (
        label
      )}
    </Button>
  );
}
