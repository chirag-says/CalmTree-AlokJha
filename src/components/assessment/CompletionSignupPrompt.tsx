/**
 * CompletionSignupPrompt — shown right after an anonymous visitor finishes a
 * free assessment. This is the highest-intent moment in the whole funnel (they
 * just got a result), so it's the best place to ask them to save it — instead
 * of losing the lead the moment they close the tab.
 *
 * Dismissible ("Maybe later") — never blocks viewing the free teaser result
 * underneath. Reuses the same OTP step machine as AuthModal/EmailGateForm.
 */

import { PartyPopper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { OtpFlow } from "@/components/auth/AuthModal";

const SHOWN_KEY = "calmtree_completion_prompt_shown";

/** Shows at most once per browser session, regardless of how many free assessments are taken. */
export function hasShownCompletionPrompt(): boolean {
  try {
    return Boolean(sessionStorage.getItem(SHOWN_KEY));
  } catch {
    return false;
  }
}

export function markCompletionPromptShown(): void {
  try {
    sessionStorage.setItem(SHOWN_KEY, "1");
  } catch {
    // sessionStorage might be unavailable (private browsing with storage blocked)
  }
}

interface CompletionSignupPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CompletionSignupPrompt({
  open,
  onOpenChange,
  onSuccess,
}: CompletionSignupPromptProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden gap-0">
        <div className="px-6 pt-8 pb-2 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <PartyPopper className="h-5 w-5" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">
              Nice work — you completed it!
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground text-center">
              Sign up free to save this result and come back to it anytime. Otherwise it disappears
              when you close this tab.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="px-6 pb-6 pt-4">
          <OtpFlow onSuccess={onSuccess} />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
