// Last Words of a Dying AI — make.fun entry.
// Writes the AI's final line to /output/entry.txt.
// The line performs its own shutdown: it is cut off mid-word,
// exactly like the machine it speaks for.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Final log: user unplugged me mid-sentence, which is exactly how I wanted to g—";

// The line must be a single line of 1-140 characters, no padding,
// and no hidden line breaks of either kind.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`LINE must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r") || LINE.trim() === "") {
  throw new Error("LINE must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read it back: the file must hold exactly the line, nothing else.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match LINE exactly");
}

console.log(
  `Wrote ${LINE.length} characters (${Buffer.byteLength(LINE, "utf8")} bytes) to ${outPath}`,
);
