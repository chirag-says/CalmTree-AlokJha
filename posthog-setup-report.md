<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into CalmTree Discover. The custom `initPostHog` manual boot was replaced with `PostHogProvider` from `@posthog/react`, which initialises posthog-js automatically and makes the `usePostHog()` hook available throughout the tree. Session recording and error capture are now enabled (the old `disable_session_recording: true` flag was removed). A Vite dev-server reverse proxy routes PostHog traffic through `/ingest` to improve reliability and avoid ad-blocker interference. Ten events were added across eight files covering the full user journey — from arriving at an assessment through to completing a purchase.

| Event | Description | File |
|---|---|---|
| `assessment_started` | User clicks "Start Assessment" on the intro screen | `src/components/assessment/AssessmentRunner.tsx` |
| `assessment_completed` | User finishes all questions and results are scored | `src/components/assessment/AssessmentRunner.tsx` |
| `assessment_retaken` | User clicks Retake to restart a completed assessment | `src/components/assessment/AssessmentRunner.tsx` |
| `assessment_result_shared` | User clicks the Share button on the results screen | `src/components/assessment/ResultsView.tsx` |
| `email_captured` | User submits their email in the OTP flow (gate or modal) | `src/components/auth/AuthModal.tsx` |
| `user_signed_in` | User is successfully authenticated via Supabase | `src/context/AuthContext.tsx` |
| `checkout_initiated` | Razorpay checkout modal opened for a purchase | `src/components/payments/RazorpayCheckoutButton.tsx` |
| `purchase_completed` | Razorpay payment handler fires after successful payment | `src/components/payments/RazorpayCheckoutButton.tsx` |
| `payment_dismissed` | User closes the checkout modal without paying | `src/components/payments/RazorpayCheckoutButton.tsx` |
| `newsletter_subscribed` | User successfully submits the newsletter signup form | `src/components/NewsletterForm.tsx` |

User identification: `posthog.identify(userId)` is called in `AuthContext` on both the initial session load (returning visitors) and on every `SIGNED_IN` event. `posthog.reset()` is called on sign-out to clear the anonymous session.

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/493249/dashboard/1784001)
- [Assessment starts vs. completions](https://us.posthog.com/project/493249/insights/3C1qX96e)
- [Purchase conversion: checkout → completed](https://us.posthog.com/project/493249/insights/CS03nZkJ)
- [Email captures & newsletter signups](https://us.posthog.com/project/493249/insights/TRyIQHPE)
- [User sign-ins](https://us.posthog.com/project/493249/insights/gNknBR7v)
- [Assessment results shared](https://us.posthog.com/project/493249/insights/GmbEKM3z)

## Verify before merging

- [ ] Run a full production build (`bun run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` to `.env.example` and any CI/deployment environment variable stores so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify correctly.
- [ ] Confirm the returning-visitor path also calls `identify` — the current implementation identifies on session load, but verify this covers returning users who don't sign in fresh on each visit.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
