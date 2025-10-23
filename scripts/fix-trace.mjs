import fs from "node:fs";

const inPath = process.argv[2] || ".next/trace";
const outPath = process.argv[3] || ".next/trace.fixed.json";

const raw = fs.readFileSync(inPath, "utf8");

// 1) capturar todas as arrays JSON presentes no ficheiro
const arrays = [];
const regex = /\[\s*\{[\s\S]*?\}\s*\]/g; // "qualquer array de objetos"
let m;
while ((m = regex.exec(raw))) {
  try {
    const arr = JSON.parse(m[0]);
    if (Array.isArray(arr)) arrays.push(...arr);
  } catch (e) {
    // ignora pedaços inválidos
  }
}

// 2) normalizar spans: remover startTime e garantir ms
const spans = arrays.map(s => {
  const { startTime, ...rest } = s;
  return rest;
});

// 3) construir envelope
const appVersion =
  spans.find(s => s?.tags?.version)?.tags?.version || "unknown";

const fixed = {
  schemaVersion: "1.0",
  tool: "next-dev-trace",
  timeUnit: "ms",
  appVersion,
  spans
};

// 4) escrever ficheiro final
fs.writeFileSync(outPath, JSON.stringify(fixed, null, 2), "utf8");
console.log(`✔ Trace corrigido: ${outPath} (${spans.length} spans)`);
