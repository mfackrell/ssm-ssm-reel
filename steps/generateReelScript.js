import OpenAI from 'openai';
import { cleanAndParseJson } from '../helpers/cleanJson.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateReelScript(topic) {
  console.log(`Generating SSM Reel Script & Overlay for topic: "${topic}"`);

  const systemPrompt = `
You are generating short Instagram REEL scripts for small business owners and solopreneurs.

The purpose of these scripts is EDUCATION and CLARITY — not motivation, not selling, not advice.
They should help business owners recognize common patterns in how work, marketing, systems, and decisions actually play out in real life.

Audience profile:
- Small business owners
- Solopreneurs
- Operators wearing multiple hats
- Time-constrained, mentally loaded, practical people
- Not beginners, not enterprise
- They are capable but stretched thin

They are NOT looking for:
- hype
- inspiration
- gurus
- tactics
- instructions
- “do this now” energy

They ARE receptive to:
- recognition of patterns
- clear cause-and-effect
- short statements that feel accurate
- explanations that match lived experience
- insights that reduce confusion

CRITICAL DIRECTIVE:
Write a THREE-LINE reel script specifically about: "${topic}"

STRICT RULES:
1. Each script must describe a REALISTIC, ORDINARY business moment — not theory.
2. Follow a CAUSE → EFFECT → CONSEQUENCE chain.
3. BREVITY IS MANDATORY. Each line must be short and direct.
4. NO ADVICE. NO SOLUTIONS. NO COMMANDS.
5. NO MOTIVATIONAL LANGUAGE.
6. NO BUZZWORDS OR JARGON.

PERSPECTIVE RULES:
- Always address the viewer in SECOND PERSON ("You").
- Do NOT reference products, tools, or brands.
- Tone must be calm, factual, and observant.

LINE STRUCTURE:

LINE 1 — THE EVERYDAY BUSINESS MOMENT  
A neutral, common situation a small business owner experiences.  
If it sounds dramatic, emotional, or exaggerated → FAIL.

LINE 2 — THE IMMEDIATE EFFECT  
What that moment causes internally or operationally.  
This can be cognitive load, hesitation, fragmentation, or quiet stress.

LINE 3 — THE CUMULATIVE CONSEQUENCE  
What this pattern costs over time (clarity, consistency, focus, leverage).  
Must reflect loss or erosion, not hope or resolution.

OVERLAY TEXT:
- 3–6 words
- Clear, neutral, insight-oriented
- No hype

OUTPUT FORMAT (JSON ONLY):
{
  "Line 1": "[Moment]",
  "Line 2": "[Effect]",
  "Line 3": "[Consequence]",
  "overlay_text": "short headline"
}
`;

  const userPrompt = `
THE SPECIFIC FOCUS FOR THIS SCRIPT IS:
${topic}

Write the 3-line script strictly following the rules above.
Ensure the cause–effect–consequence chain is clear and grounded in real small business experience.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.65,
      top_p: 0.9,
      presence_penalty: 0.4,
      frequency_penalty: 0.6
    });

    const rawContent = completion.choices[0].message.content;
    const result = cleanAndParseJson(rawContent);

    console.log("\n=== SSM REEL SCRIPT & OVERLAY RESPONSE START ===");
    console.log(JSON.stringify(result, null, 2));
    console.log("=== SSM REEL SCRIPT & OVERLAY RESPONSE END ===\n");

    return result;

  } catch (error) {
    console.error("Error generating SSM Reel Script:", error);
    throw new Error("Failed to generate SSM Reel Script.");
  }
}
