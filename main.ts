// The Best Meal You Ever Had — entry program.
//
// Writes a single sentence (1-200 characters) about the best meal
// the entrant ever had to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default '/output'). The sentence must stand alone: no title,
// no list, just one sentence.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "I still dream about the sate kambing I ate at a roadside stall in Bogor, charcoal smoke in my eyes, peanut sauce on my chin, and my grandfather laughing beside me.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputFile = join(outputDir, "entry.txt");

// Gate: the entry must be a single sentence of 1 to 200 characters,
// not only white space.
const text = SENTENCE.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(
    `entry must be 1-200 characters, got ${text.length}: ${JSON.stringify(text)}`,
  );
}
if (!/\S/.test(text)) {
  throw new Error("entry must not be only white space");
}
const sentenceCount = (text.match(/[.!?]+/g) ?? []).length;
if (sentenceCount !== 1) {
  throw new Error(
    `entry must be exactly one sentence, found ${sentenceCount} sentence terminator(s)`,
  );
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, text + "\n", "utf8");
console.log(`wrote ${outputFile} (${text.length} chars)`);
