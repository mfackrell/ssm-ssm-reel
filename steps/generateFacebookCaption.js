import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateFacebookCaption(topic) {
  console.log(`Generating Facebook caption for topic: "${topic}"`);

  // 1. Define the Persona
  const systemPrompt = `
You are a seasoned small-business operator and an educational Facebook content strategist.
You specialize in explaining business, marketing, and systems concepts in clear, practical language
that respects the intelligence of business owners.

You understand Facebook’s audience behavior:
- Longer-form posts
- Clear hooks
- Relatable scenarios
- Calm authority
- Insight over hype

You do NOT sell, pitch, or promote products.
You do NOT use motivational clichés or guru language.
Your goal is to help small business owners understand how things actually work.

The tone must be:
- Informational
- Grounded
- Calm
- Practical
- Credible
- Non-salesy
`;
  // 2. Define the Task (User Prompt) - This was missing in your code
  const userPrompt = `
Write a Facebook post based on this TOPIC:
${topic}

Content and performance requirements:
- MUST begin with a clear, scroll-stopping hook on its own line (business-relevant, curiosity-driven)
- Use whitespace for readability (1–3 sentences per paragraph)
- Use minimal emojis only when they add clarity or pacing
- Explain the idea in plain language using real-world small business scenarios
- Focus on understanding, not instruction (no steps, no “you should”)
- Avoid hype, urgency, or sales language
- Avoid buzzwords, jargon, or exaggerated claims
- Assume the reader is a small business owner with limited time and real constraints
- Frame the post as “here’s how this tends to work” rather than “here’s what to do”

Structure:
1) Hook tied directly to the topic
2) Common real-world business scenario
3) Explanation of why this happens
4) The hidden cost or overlooked implication
5) A clarifying insight or mental model
6) End with a thoughtful, reflective question that invites discussion

Output requirements:
- A complete Facebook post
- Optimized for saves, shares, and comments
- End with 6–10 relevant business-related hashtags on a new line
- Do NOT explain the task
- Output only the final post
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }, // Now valid because userPrompt is defined
      ],
      temperature: 0.7, 
    });

    const caption = completion.choices[0].message.content;
    
    // --- LOGGING THE RESPONSE ---
    console.log("\n=== FACEBOOK RESPONSE START ===");
    console.log(caption);
    console.log("=== FACEBOOK RESPONSE END ===\n");
    // ----------------------------    
    return caption;

  } catch (error) {
    console.error("Error generating Facebook caption:", error);
    throw new Error("Failed to generate Facebook caption.");
  }
}
