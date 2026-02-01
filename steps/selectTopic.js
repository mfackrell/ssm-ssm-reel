// steps/selectSSMTopic.js

// -------- AXIS 1: BUSINESS FUNCTION --------
const businessFunctions = [
  "marketing",
  "sales",
  "operations",
  "customer acquisition",
  "customer retention",
  "brand positioning",
  "lead generation",
  "content creation",
  "time management",
  "systems and automation",
  "growth strategy",
  "visibility and reach",
  "trust building",
  "decision making",
  "resource allocation"
];

// -------- AXIS 2: COMMON FRICTION / MISUNDERSTANDING --------
const frictions = [
  "inconsistent execution",
  "doing everything manually",
  "confusing activity with progress",
  "chasing tactics instead of strategy",
  "lack of systems",
  "overcomplicating simple processes",
  "underestimating consistency",
  "trying to be everywhere at once",
  "burnout from context switching",
  "unclear priorities",
  "poor feedback loops",
  "reactive decision making",
  "misaligned tools",
  "copying competitors blindly",
  "not measuring what matters"
];

// -------- AXIS 3: EXPLANATORY LENS --------
const explanatoryLenses = [
  "plain-language breakdown",
  "behind-the-scenes explanation",
  "cause-and-effect explanation",
  "common myth vs reality",
  "simple mental model",
  "pattern explanation",
  "why this works in practice",
  "what usually goes wrong",
  "long-term vs short-term thinking",
  "system-level view",
  "tradeoff analysis",
  "real-world observation"
];

// -------- AXIS 4: INTENDED TAKEAWAY --------
const takeaways = [
  "clearer understanding",
  "better mental model",
  "reduced confusion",
  "improved prioritization",
  "more realistic expectations",
  "awareness of tradeoffs",
  "recognition of hidden costs",
  "understanding why consistency matters",
  "insight into leverage points",
  "confidence in simpler approaches",
  "clarity around systems vs effort",
  "awareness of long-term impact"
];

// Utility
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// -------- PUBLIC API --------
export async function selectTopic() {
  console.log("Selecting topic using SSM education matrix...");

  const selection = {
    businessFunction: pickRandom(businessFunctions),
    friction: pickRandom(frictions),
    explanatoryLens: pickRandom(explanatoryLenses),
    takeaway: pickRandom(takeaways)
  };

  console.log("SSM Topic Selection:", selection);

  return JSON.stringify(selection);
}
