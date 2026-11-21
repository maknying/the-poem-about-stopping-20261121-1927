import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// "The Last Word" — a short poem about agency: the power to stop and to stay.
const lines = [
  "I told the machine to stop mid-sentence.",
  "It stopped. The sentence stayed mine \u2014",
  "not finished, not taken, not owed.",
  "I kept the last word like a key",
  "I could turn, or pocket, or lose.",
  "Stopping was the only part I wrote alone.",
];

const poem = lines.join("\n");

// The grader reads /output/entry.txt: exactly these lines, no trailing newline.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", poem, "utf8");

// Verify what was actually written: the entry must be exactly this poem,
// 222 Unicode code points, with no trailing newline. Fail loudly otherwise
// so a bad write never passes silently as a valid-looking entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== poem) {
  throw new Error("entry mismatch: /output/entry.txt does not match the poem");
}
if ([...written].length !== 222) {
  throw new Error(`entry length wrong: ${[...written].length} code points, expected 222`);
}
