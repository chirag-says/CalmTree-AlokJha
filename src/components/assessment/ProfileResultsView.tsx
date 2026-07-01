/**
 * ProfileResultsView — results page for profile-based assessments.
 *
 * Shows: primary profile name + interpretation, optional blended secondary,
 * practical next step, and actions (retake, share, explore more).
 */

import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ReportGate } from "./ReportGate";
import { SITE } from "@/data/constants";
import { ArrowRight, RotateCcw, Share2, CheckCircle2 } from "lucide-react";
import type { ProfileAssessmentConfig, ProfileResult, ProfileDef } from "@/data/assessments/types";

interface ProfileResultsViewProps {
  config: ProfileAssessmentConfig;
  result: ProfileResult;
  onRetake: () => void;
}

const COLOR_CLASSES: Record<
  NonNullable<ProfileDef["color"]>,
  { border: string; bg: string; text: string; badge: string }
> = {
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    text: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    text: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  yellow: {
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    text: "text-yellow-600 dark:text-yellow-400",
    badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    text: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  orange: {
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
    text: "text-orange-600 dark:text-orange-400",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  },
  red: {
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    text: "text-red-600 dark:text-red-400",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/5",
    text: "text-purple-600 dark:text-purple-400",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  },
  violet: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    text: "text-violet-600 dark:text-violet-400",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
  teal: {
    border: "border-teal-500/30",
    bg: "bg-teal-500/5",
    text: "text-teal-600 dark:text-teal-400",
    badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  },
  green: {
    border: "border-green-500/30",
    bg: "bg-green-500/5",
    text: "text-green-600 dark:text-green-400",
    badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  },
};

export function ProfileResultsView({ config, result, onRetake }: ProfileResultsViewProps) {
  const { primary, secondary } = result;
  const colors = COLOR_CLASSES[primary.color] ?? COLOR_CLASSES.blue;

  const handleShare = () => {
    const secondary_text = secondary ? ` with a blend of ${secondary.label}` : "";
    const text = `I just took the ${config.meta.title} on Calmtree and my style is "${primary.label}"${secondary_text}. Try it yourself!`;
    if (navigator.share) {
      navigator.share({ text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold mb-2">Your Results</h2>
        <p className="text-muted-foreground">
          {config.meta.title} · {result.answeredCount} of {result.totalQuestions} questions answered
        </p>
      </div>

      {/* Primary profile card */}
      <div
        className={`rounded-2xl border-2 p-6 md:p-8 mb-6 text-center ${colors.border} ${colors.bg}`}
      >
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Your Primary Style
        </p>
        <h3 className={`text-2xl md:text-3xl font-semibold mb-2 ${colors.text}`}>
          {primary.label}
        </h3>
        <p className="text-sm text-muted-foreground italic mb-4">{primary.meaning}</p>
        <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
          {primary.interpretation}
        </p>
      </div>

      {/* Secondary / blended style */}
      {secondary && (
        <div className="rounded-2xl border border-border bg-card p-6 mb-6">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Blended Secondary Style
          </p>
          <div className="flex items-start gap-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-0.5 ${
                (COLOR_CLASSES[secondary.color] ?? COLOR_CLASSES.blue).badge
              }`}
            >
              {secondary.label}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {secondary.meaning} Your responses suggest a blend of both styles.
            </p>
          </div>
        </div>
      )}

      {/* Next step */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className={`h-5 w-5 mt-0.5 shrink-0 ${colors.text}`} />
          <div>
            <h3 className="font-semibold mb-1">Suggested next step</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{primary.nextStep}</p>
          </div>
        </div>
      </div>

      {/* Profile breakdown (all profiles with counts) — gated */}
      {config.profiles.length > 0 && (
        <div className="mb-8">
          <ReportGate config={config}>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-5">Response Breakdown</h3>
              <div className="space-y-4">
                {config.profiles.map((profile) => {
                  const count = result.counts[profile.code] ?? 0;
                  const pct =
                    result.totalQuestions > 0
                      ? Math.round((count / result.totalQuestions) * 100)
                      : 0;
                  const isPrimary = profile.code === primary.code;
                  const profileColors = COLOR_CLASSES[profile.color] ?? COLOR_CLASSES.blue;
                  return (
                    <div key={profile.code}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-sm font-medium ${isPrimary ? profileColors.text : "text-foreground"}`}
                        >
                          {profile.label}
                          {isPrimary && (
                            <span
                              className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${profileColors.badge}`}
                            >
                              Primary
                            </span>
                          )}
                          {secondary && profile.code === secondary.code && (
                            <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                              Secondary
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {count}/{result.totalQuestions}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-border overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isPrimary ? "bg-primary" : "bg-muted-foreground/30"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ReportGate>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground mb-8">
        Calmtree Original Assessment™ · This is an educational self-reflection, not a clinical
        diagnosis. {SITE.disclaimer}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={onRetake}>
          <RotateCcw className="h-4 w-4" />
          Retake
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
          Share Result
        </Button>
        <Button asChild>
          <Link to="/assessments">
            Try Another Assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
