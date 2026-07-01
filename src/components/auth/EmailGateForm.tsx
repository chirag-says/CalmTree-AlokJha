/**
 * EmailGateForm
 *
 * Inline (non-modal) version of the OTP flow used inside ReportGate.
 * Renders as a card — no Dialog wrapper.
 * After successful verification it calls onSuccess() so the parent
 * can claim any stashed result and re-render the full report.
 */

import { OtpFlow } from "./AuthModal";

interface EmailGateFormProps {
  /** Called when OTP verification succeeds */
  onSuccess: () => void;
  /** Optional prompt shown above the form */
  prompt?: string;
}

export function EmailGateForm({ onSuccess, prompt }: EmailGateFormProps) {
  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 md:p-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-1">See your full breakdown</h3>
        <p className="text-sm text-muted-foreground">
          {prompt ??
            "Enter your email to unlock the dimension-by-dimension analysis — free, always."}
        </p>
      </div>
      <OtpFlow onSuccess={onSuccess} />
    </div>
  );
}
