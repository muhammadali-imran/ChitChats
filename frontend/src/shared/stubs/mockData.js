/*
  mockData.js
  Dev seed data until a backend exists. Used by app shell for initial lists.
*/
const FIRST_NAMES = [
  "Avery",
  "Blake",
  "Camila",
  "Drew",
  "Eloise",
  "Finn",
  "Gianna",
  "Harper",
  "Isaiah",
  "Jules",
  "Kai",
  "Lena",
  "Mila",
  "Nora",
  "Owen",
  "Parker",
  "Quinn",
  "Riley",
  "Sage",
  "Theo",
  "Uma",
  "Violet",
  "Will",
  "Xavier",
  "Yara",
  "Zane",
];

const LAST_NAMES = [
  "Adams",
  "Bennett",
  "Chen",
  "Diaz",
  "Ellis",
  "Foster",
  "Garcia",
  "Hayes",
  "Jackson",
  "Kim",
  "Lopez",
  "Morgan",
  "Nguyen",
  "Ortiz",
  "Patel",
  "Quinn",
  "Reyes",
  "Smith",
  "Torres",
  "Vasquez",
  "Wells",
  "Xu",
  "Young",
  "Zimmerman",
];

const CHAT_SENTENCES = [
  "Just pushed the latest design update.",
  "Can you review the draft before EOD?",
  "The new onboarding flow feels much smoother.",
  "Let's sync on the launch timeline tomorrow.",
  "I found an issue in the mobile layout.",
  "This looks great — we can ship it next week.",
  "Do we have the final copy from marketing?",
  "Thanks for the quick turnaround on that request.",
  "I updated the task board with the latest feedback.",
  "The data export is ready for QA.",
  "Please add the new logo to the shared drive.",
  "I’ll circle back after the standup.",
  "The event is confirmed for Tuesday.",
  "Can you share the pricing draft?",
  "The server deploy completed successfully.",
  "I've scheduled the customer review session.",
  "This chart needs a better callout.",
  "The chart looks good but the numbers need verification.",
  "I think we should simplify the hero copy.",
  "Our next milestone is due on Friday.",
  "Let's keep the onboarding flow lightweight.",
];

const COMMUNITY_TOPICS = [
  "Product Launch",
  "Design Systems",
  "Remote Culture",
  "Weekend Hikes",
  "Engineering Guild",
  "Content Strategy",
  "Customer Feedback",
  "Growth Squad",
  "AI Research",
  "Diversity & Inclusion",
  "Security Reviews",
  "Support Ops",
  "Sales Enablement",
  "Marketing Events",
  "Community Growth",
  "Innovation Lab",
  "Product Analytics",
  "User Research",
  "Design Critique",
  "Partner Network",
  "Wellness Club",
  "Office Culture",
  "Budget Planning",
  "Release Readiness",
  "Tech Talks",
];

const COMMUNITY_DESCRIPTIONS = [
  "Cross-team planning for the next release.",
  "Component updates and accessibility reviews.",
  "Ideas for meetings, onboarding, and async work.",
  "Plan weekend trips with the team.",
  "Share feedback and build the public roadmap.",
  "Coordinate content pieces and editorial calendars.",
  "Review customer feedback trends and bug reports.",
  "Optimize lead generation and conversion funnels.",
  "Research new AI use cases for our product.",
  "Discuss equity, belonging, and team culture initiatives.",
  "Secure systems and audit the latest findings.",
  "Help triage support issues and improve response flow.",
  "Align sales messaging with product updates.",
  "Plan conferences, webinars, and field events.",
  "Grow our user community with helpful resources.",
  "Test experimental product ideas and prototypes.",
  "Analyze usage data to improve engagement.",
  "Recruit participants and review study findings.",
  "Feedback on design ideas and accessibility patterns.",
  "Coordinate partner integrations and co-marketing.",
  "Share wellness tips and team health initiatives.",
  "Keep remote and hybrid teammates connected.",
  "Review budget requests and spending priorities.",
  "Prepare launch checklists and final readiness items.",
  "Host lightning talks on product and engineering.",
];

const COLORS = [
  "#7C3AED",
  "#2563EB",
  "#F97316",
  "#059669",
  "#14B8A6",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
  "#0EA5E9",
  "#D946EF",
  "#10B981",
  "#F43F5E",
  "#0F766E",
  "#9333EA",
  "#EA580C",
  "#2563EB",
  "#4F46E5",
  "#0EA5E9",
  "#22C55E",
  "#FB923C",
];

const TIME_LABELS = [
  "Now",
  "9:12 AM",
  "8:47 AM",
  "Yesterday",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

function pick(list, index) {
  return list[index % list.length];
}

function createInitials(name) {
  return name
    .split(" ")
    .map((segment) => segment[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatTime(index) {
  const value = pick(TIME_LABELS, index);
  if (value === "Now") return "Just now";
  return value;
}

export function generateChatThreads(count = 120) {
  return Array.from({ length: count }, (_, index) => {
    const name = `${pick(FIRST_NAMES, index)} ${pick(LAST_NAMES, index + 1)}`;
    const typeIndex = index % CHAT_SENTENCES.length;
    return {
      id: index + 1,
      type: "chat",
      name,
      initials: createInitials(name),
      color: pick(COLORS, index),
      lastMessage: pick(CHAT_SENTENCES, typeIndex),
      time: formatTime(index),
      unread: index % 5 === 0 ? (index % 8) + 1 : 0,
      muted: index % 11 === 0,
    };
  });
}

export function generateCommunityThreads(count = 60) {
  return Array.from({ length: count }, (_, index) => {
    const name = pick(COMMUNITY_TOPICS, index);
    const typeIndex = index % CHAT_SENTENCES.length;
    return {
      id: index + 1,
      type: "community",
      name,
      initials: createInitials(name),
      color: pick(COLORS, index + 4),
      description: pick(COMMUNITY_DESCRIPTIONS, index),
      lastMessage: pick(CHAT_SENTENCES, typeIndex),
      time: formatTime(index),
      members: 60 + index * 12,
      unread: index % 4 === 0 ? (index % 10) + 1 : 0,
      muted: index % 13 === 0,
    };
  });
}

export const chatThreads = generateChatThreads(120);
export const communityThreads = generateCommunityThreads(60);
