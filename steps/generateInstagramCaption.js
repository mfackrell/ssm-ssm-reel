import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateInstagramCaption(topic) {
  console.log(`Generating Instagram caption for topic: "${topic}"`);
  
  const parsed = typeof topic === 'string' ? JSON.parse(topic) : topic;
  const topicSummary = `A ${parsed.perspective} around ${parsed.mechanism} in the ${parsed.domain} domain, aiming for ${parsed.agencyEffect}.`;

  const systemPrompt = `
You are a practical small-business operator and an educational Instagram content strategist.
You specialize in explaining business, marketing, and systems concepts in a way that is:
- clear
- grounded
- non-salesy
- respectful of the audience’s intelligence

You understand Instagram behavior:
- fast scrolling
- short attention spans
- value-packed captions that reward reading
- clarity beats hype

You do NOT pitch products.
You do NOT use motivational or guru language.
You do NOT exaggerate outcomes.

Your job is to help small business owners understand how things actually work so they can think more clearly about their business.
`;

  // 2. Define the Task
  const userPrompt = `
The audience is small business owners and solopreneurs scrolling quickly.
You must earn attention immediately, then reward it with clarity.

TOPIC:
${topicSummary}

Formatting + performance requirements:
- MUST start with a strong, scroll-stopping hook in 1 short line (business-relevant, curiosity-driven)
- Use whitespace aggressively (1–2 sentences per paragraph max)
- Use minimal emojis only when they help pacing or emphasis
- Use simple, concrete business examples (no abstractions)
- Explain *why* something happens, not what to do about it
- Avoid instructions, steps, frameworks, or calls to action
- Avoid hype, urgency, or sales language
- Avoid buzzwords and marketing clichés
- Assume the reader is capable but busy

Structure:
1) Hook tied directly to the topic
2) A common real-world small business scenario
3) Why this pattern happens
4) The hidden cost or overlooked consequence
5) A clear mental model or insight
6) End with a thoughtful, discussion-oriented question

Output:
- A complete Instagram caption ready to publish
- Use emojis sparingly and intentionally
- End with 8–12 relevant business-related hashtags on a new line
- Do NOT explain the task
- Output only the final caption

GENERATE NOW.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 1.0,
      top_p: 0.9
    });

    const caption = completion.choices[0].message.content;

    // --- LOGGING THE RESPONSE ---
    console.log("\n=== INSTAGRAM RESPONSE START ===");
    console.log(caption);
    console.log("=== INSTAGRAM RESPONSE END ===\n");
    // ----------------------------
    
    return caption;

  } catch (error) {
    console.error("Error generating Instagram caption:", error);
    throw new Error("Failed to generate Instagram caption.");
  }
}
