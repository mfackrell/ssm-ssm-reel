export async function selectBackgroundMood() {
  console.log("Selecting background mood...");

  const moods = [
    "Clean workspace with soft natural light on a desk surface",
    "Minimal home office with neutral tones and indirect daylight",
    "Laptop on a quiet desk with morning light from the side",
    "Simple notebook and pen on a wooden table with soft shadows",
    "Modern workspace corner with muted gray and beige tones",
    "Sunlight through a window casting clean lines across a desk",
    "Neutral office wall with subtle texture and even lighting",
    "Quiet coffee shop table with blurred background and soft focus",
    "Minimal desktop setup with plant shadows on the wall",
    "Calm interior space with warm ambient lighting and no people",
    "Desk surface with papers neatly stacked and soft overhead light",
    "Natural light hitting a clean keyboard and mouse from the side",
    "Empty conference table with diffused daylight",
    "Simple shelf with books and neutral decor in soft focus",
    "Work journal open on a desk with gentle morning light",
    "Clean white wall with faint shadows from a nearby window",
    "Laptop screen glow in a quiet, dim workspace",
    "Desk lamp illuminating a small working area at dusk",
    "Soft daylight reflecting off a glass tabletop",
    "Minimal office chair and desk in a calm, uncluttered room",
    "Neutral-toned room with subtle architectural lines",
    "Quiet workspace with muted colors and balanced composition",
    "Standing desk near a window with indirect natural light",
    "Simple wooden desk against a light gray wall",
    "Organized workspace with soft highlights and no distractions",
    "Natural textures—wood and fabric—in a clean office setting",
    "Soft afternoon light across a tidy work surface",
    "Minimal studio space with even lighting and neutral palette",
    "Quiet room with a single desk and calm atmosphere",
    "Work area with subtle depth and shallow focus",
    "Desk by a window overlooking a blurred urban background",
    "Neutral workspace with soft contrast and low visual noise",
    "Simple office corner designed for focus and clarity",
    "Clean table surface with notebook centered in frame",
    "Calm indoor setting with balanced light and shadow",
    "Modern workspace with restrained, professional aesthetic",
    "Desk setup emphasizing simplicity and order",
    "Subtle light gradients across a neutral interior wall",
    "Quiet work environment with minimal visual elements",
    "Clean-lined workspace designed for focus, not decoration"
  ];

  // Logic: Randomly select one item from the array
  const randomIndex = Math.floor(Math.random() * moods.length);
  const selectedMood = moods[randomIndex];

  console.log(`Mood Selected: "${selectedMood}"`);

  return selectedMood;
}
