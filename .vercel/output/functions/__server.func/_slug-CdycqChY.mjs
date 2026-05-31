import { j as jsxRuntimeExports, r as reactExports } from "./_libs/react.mjs";
import { a as SiteLayout, B as Button } from "./_ssr/SiteLayout-xyxx2_P_.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { R as Route, g as getAssessment, S as SITE } from "./_ssr/router-DN3jm67H.mjs";
import "./_libs/sonner.mjs";
import { a as ArrowRight, A as ArrowLeft, C as CircleCheckBig, R as RotateCcw } from "./_libs/lucide-react.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
function QuestionCard({
  question,
  selectedValue,
  onSelect,
  questionNumber,
  totalQuestions
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-right-4 duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-medium tracking-wide uppercase mb-4", children: [
      "Question ",
      questionNumber,
      " of ",
      totalQuestions
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl md:text-2xl font-semibold text-foreground leading-snug mb-8", children: question.text }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: question.options.map((opt) => {
      const isSelected = selectedValue === opt.value;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onSelect(opt.value),
          className: `w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                ${isSelected ? "border-primary bg-primary/8 text-foreground shadow-sm" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-primary/[0.03]"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: opt.label })
        },
        opt.value
      );
    }) })
  ] });
}
const COLOR_MAP = {
  green: { stroke: "stroke-emerald-500", text: "text-emerald-600", bg: "bg-emerald-500/10" },
  yellow: { stroke: "stroke-amber-500", text: "text-amber-600", bg: "bg-amber-500/10" },
  orange: { stroke: "stroke-orange-500", text: "text-orange-600", bg: "bg-orange-500/10" },
  red: { stroke: "stroke-red-500", text: "text-red-600", bg: "bg-red-500/10" }
};
function ScoreGauge({ percentage, label, color }) {
  const colors = COLOR_MAP[color];
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - percentage / 100 * circumference;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-48 h-48", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          className: "w-full h-full -rotate-90",
          viewBox: "0 0 160 160",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "80",
                cy: "80",
                r: radius,
                fill: "none",
                stroke: "currentColor",
                className: "text-border",
                strokeWidth: "10"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "80",
                cy: "80",
                r: radius,
                fill: "none",
                className: colors.stroke,
                strokeWidth: "10",
                strokeLinecap: "round",
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                style: {
                  transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-4xl font-bold ${colors.text}`, children: percentage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mt-1", children: "out of 100" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`,
        children: label
      }
    )
  ] });
}
function ResultsView({ config, result, onRetake }) {
  const { range } = result;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-semibold mb-2", children: "Your Results" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        config.meta.title,
        " · ",
        result.answeredCount,
        " of",
        " ",
        result.totalQuestions,
        " questions answered"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScoreGauge,
      {
        percentage: result.percentage,
        label: range.label,
        color: range.color
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 md:p-8 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-3", children: "What this means" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: range.interpretation })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 md:p-8 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-4", children: "What you can do" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: range.suggestions.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-primary shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-8", children: [
      config.meta.source,
      " This is an educational self-check, not a clinical diagnosis. ",
      SITE.disclaimer
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: onRetake, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
        "Retake Assessment"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/assessments", children: [
        "Try Another Assessment",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) })
    ] })
  ] });
}
function scoreQuestion(question, answer) {
  if (!question.reverse) return answer;
  const values = question.options.map((o) => o.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return max - answer + min;
}
function scoreAssessment(config, answers) {
  const { questions, scoring, resultRanges } = config;
  let total = 0;
  let answeredCount = 0;
  for (const q of questions) {
    const raw = answers[q.id];
    if (raw === void 0) continue;
    total += scoreQuestion(q, raw);
    answeredCount++;
  }
  let score;
  switch (scoring.method) {
    case "sum":
      score = total;
      break;
    case "average":
      score = answeredCount > 0 ? total / answeredCount : 0;
      break;
    case "percentage":
      score = answeredCount > 0 ? Math.round(total / (answeredCount * Math.max(...questions[0].options.map((o) => o.value))) * 100) : 0;
      break;
  }
  const percentage = Math.round(
    (score - scoring.min) / (scoring.max - scoring.min) * 100
  );
  const range = resultRanges.find((r) => score >= r.min && score <= r.max) ?? resultRanges[resultRanges.length - 1];
  return {
    score: Math.round(score * 10) / 10,
    percentage: Math.max(0, Math.min(100, percentage)),
    range,
    answeredCount,
    totalQuestions: questions.length
  };
}
function AssessmentRunner({ config }) {
  const [state, setState] = reactExports.useState({
    currentIndex: 0,
    answers: {},
    completed: false
  });
  const [started, setStarted] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const { questions } = config;
  const currentQ = questions[state.currentIndex];
  const isFirst = state.currentIndex === 0;
  const isLast = state.currentIndex === questions.length - 1;
  const hasAnswer = currentQ ? state.answers[currentQ.id] !== void 0 : false;
  const progress = Math.round(
    Object.keys(state.answers).length / questions.length * 100
  );
  const selectAnswer = reactExports.useCallback(
    (value) => {
      if (!currentQ) return;
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [currentQ.id]: value }
      }));
    },
    [currentQ]
  );
  const goNext = reactExports.useCallback(() => {
    if (isLast) {
      const scored = scoreAssessment(config, state.answers);
      setResult(scored);
      setState((prev) => ({ ...prev, completed: true }));
    } else {
      setState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1
      }));
    }
  }, [isLast, config, state.answers]);
  const goPrev = reactExports.useCallback(() => {
    if (!isFirst) {
      setState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex - 1
      }));
    }
  }, [isFirst]);
  const retake = reactExports.useCallback(() => {
    setState({ currentIndex: 0, answers: {}, completed: false });
    setResult(null);
    setStarted(false);
  }, []);
  if (result) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsView, { config, result, onRetake: retake });
  }
  if (!started) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-semibold mb-3", children: config.meta.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2", children: config.meta.subtitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          config.meta.questionCount,
          " questions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: config.meta.duration }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Free & private" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 text-left mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "Before you start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: config.instructions })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "h-12 px-8", onClick: () => setStarted(true), children: [
        "Start Assessment",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-4", children: config.meta.source })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          progress,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full rounded-full bg-primary transition-all duration-500 ease-out",
          style: { width: `${progress}%` }
        }
      ) })
    ] }),
    currentQ && /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuestionCard,
      {
        question: currentQ,
        selectedValue: state.answers[currentQ.id],
        onSelect: selectAnswer,
        questionNumber: state.currentIndex + 1,
        totalQuestions: questions.length
      },
      currentQ.id
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-8 pt-6 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          onClick: goPrev,
          disabled: isFirst,
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: goNext,
          disabled: !hasAnswer,
          className: "gap-2",
          children: [
            isLast ? "See Results" : "Next",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] })
  ] });
}
function Page() {
  const {
    slug
  } = Route.useParams();
  const config = getAssessment(slug);
  if (!config) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold mb-4", children: "Assessment not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "We couldn't find an assessment with that name." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/assessments", className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "View all assessments" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/60", style: {
      background: "var(--gradient-hero)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-5 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/assessments", className: "text-sm text-muted-foreground hover:text-foreground transition-colors", children: "← All assessments" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-3xl px-5 py-12 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AssessmentRunner, { config }) })
  ] });
}
export {
  Page as component
};
