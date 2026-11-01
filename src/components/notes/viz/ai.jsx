import React, { useMemo, useState } from "react";
import { C, VizFrame, Seg, Slider, Btn, Legend, Plot, Stat, path, linspace, range, mulberry32, useStepper } from "./kit";

/* ---------------- Grid search: BFS / DFS / Greedy / A* ---------------- */

const R = 13, CO = 22, START = [6, 2], GOAL = [6, 19];
const DEFAULT_WALLS = (() => {
  const w = new Set();
  for (let r = 1; r < 11; r++) w.add(`${r},10`);
  for (let c = 4; c < 10; c++) w.add(`3,${c}`);
  for (let c = 12; c < 19; c++) w.add(`9,${c}`);
  for (let r = 3; r < 9; r++) w.add(`${r},15`);
  return w;
})();

const search = (algo, walls) => {
  const key = (p) => `${p[0]},${p[1]}`;
  const h = (p) => Math.abs(p[0] - GOAL[0]) + Math.abs(p[1] - GOAL[1]);
  const g = { [key(START)]: 0 }, parent = {}, closed = new Set();
  let open = [START];
  const frames = [];
  while (open.length) {
    let idx = 0;
    if (algo === "Greedy") idx = open.reduce((b, p, i) => (h(p) < h(open[b]) ? i : b), 0);
    if (algo === "A*") idx = open.reduce((b, p, i) => (g[key(p)] + h(p) < g[key(open[b])] + h(open[b]) || (g[key(p)] + h(p) === g[key(open[b])] + h(open[b]) && h(p) < h(open[b])) ? i : b), 0);
    if (algo === "DFS") idx = open.length - 1;
    const cur = open[idx];
    open = open.filter((_, i) => i !== idx);
    if (closed.has(key(cur))) continue;
    closed.add(key(cur));
    if (key(cur) === key(GOAL)) break;
    for (const [dr, dc] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
      const n = [cur[0] + dr, cur[1] + dc];
      if (n[0] < 0 || n[1] < 0 || n[0] >= R || n[1] >= CO || walls.has(key(n)) || closed.has(key(n))) continue;
      const ng = g[key(cur)] + 1;
      if (g[key(n)] === undefined || ng < g[key(n)]) {
        if (algo === "BFS" && g[key(n)] !== undefined) continue;
        g[key(n)] = ng; parent[key(n)] = key(cur); open.push(n);
      }
    }
    if (closed.size % 3 === 0) frames.push(new Set(closed));
  }
  frames.push(new Set(closed));
  const pathCells = [];
  if (closed.has(key(GOAL))) for (let k = key(GOAL); k; k = parent[k]) pathCells.push(k);
  return { frames, pathCells, expanded: closed.size };
};

export const Pathfinding = () => {
  const [algo, setAlgo] = useState("A*");
  const [walls, setWalls] = useState(DEFAULT_WALLS);
  const { frames, pathCells, expanded } = useMemo(() => search(algo, walls), [algo, walls]);
  const [i, controls, setI] = useStepper(frames.length, 60, `${algo}${walls.size}`);
  const done = i >= frames.length - 1;
  const closed = frames[Math.min(i, frames.length - 1)];
  const toggle = (k) => { const w = new Set(walls); w.has(k) ? w.delete(k) : w.add(k); setWalls(w); };
  const desc = {
    BFS: "explores level by level; uninformed but finds the shortest path when all steps cost the same.",
    DFS: "dives as deep as possible first; uninformed and usually returns a long, winding path.",
    Greedy: "always expands the node whose heuristic h(n) looks closest to the goal; fast but not guaranteed optimal.",
    "A*": "expands the lowest f(n) = g(n) + h(n); with an admissible h (Manhattan distance here) the path is optimal.",
  }[algo];
  return (
    <VizFrame
      title="Search: BFS vs DFS vs Greedy best-first vs A*"
      controls={<><Seg value={algo} onChange={setAlgo} options={["BFS", "DFS", "Greedy", "A*"]} />{controls}<Btn onClick={() => setI(frames.length - 1)}>Skip to end</Btn></>}
      caption={`${algo} ${desc} Click cells to add or remove walls.`}
    >
      <div className="inline-grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${CO}, minmax(12px, 24px))`, minWidth: 320 }}>
        {range(R).flatMap((r) => range(CO).map((c) => {
          const k = `${r},${c}`;
          const isS = r === START[0] && c === START[1], isG = r === GOAL[0] && c === GOAL[1];
          const bg = isS ? C.aqua : isG ? C.red : walls.has(k) ? "#555" : done && pathCells.includes(k) ? C.yellow : closed.has(k) ? "#3987e566" : "#1a1a1a";
          return <div key={k} onClick={() => !isS && !isG && toggle(k)} className="aspect-square rounded-[3px] cursor-pointer" style={{ background: bg }} />;
        }))}
      </div>
      <div className="flex flex-wrap gap-3 mt-3 items-center">
        <Stat label="Nodes expanded" value={expanded} />
        <Stat label="Path length" value={pathCells.length ? pathCells.length - 1 : "none"} />
        <Legend items={[{ label: "start", color: C.aqua, box: true }, { label: "goal", color: C.red, box: true }, { label: "expanded", color: "#3987e5", box: true }, { label: "final path", color: C.yellow, box: true }]} />
      </div>
    </VizFrame>
  );
};

/* ---------------- Minimax + alpha-beta ---------------- */

const LEAVES = [3, 5, 6, 9, 1, 2, 0, -1];

export const AlphaBeta = () => {
  const [prune, setPrune] = useState(true);
  const [leaves, setLeaves] = useState(LEAVES);
  const res = useMemo(() => {
    const val = {}, pruned = new Set(), visited = new Set();
    const go = (node, depth, a, b, maxi) => {
      visited.add(node);
      if (depth === 3) return (val[node] = leaves[node - 7]);
      let best = maxi ? -Infinity : Infinity;
      for (const ch of [2 * node + 1, 2 * node + 2]) {
        if (prune && a >= b) { const mark = (n) => { pruned.add(n); if (n < 7) [2 * n + 1, 2 * n + 2].forEach(mark); }; mark(ch); continue; }
        const v = go(ch, depth + 1, a, b, !maxi);
        if (maxi) (best = Math.max(best, v)), (a = Math.max(a, v));
        else (best = Math.min(best, v)), (b = Math.min(b, v));
      }
      return (val[node] = best);
    };
    go(0, 0, -Infinity, Infinity, true);
    return { val, pruned, leavesEval: [...visited].filter((n) => n >= 7).length };
  }, [prune, leaves]);
  const pos = (n) => { const d = Math.floor(Math.log2(n + 1)); const idx = n - (2 ** d - 1); return [((idx + 0.5) / 2 ** d) * 560 + 20, 30 + d * 60]; };
  const bestLeafPath = (() => { const p = [0]; let n = 0; while (n < 7) { const [l, r] = [2 * n + 1, 2 * n + 2]; n = res.val[l] === res.val[n] && !res.pruned.has(l) ? l : r; p.push(n); } return p; })();
  return (
    <VizFrame
      title="Minimax with alpha–beta pruning"
      controls={<><Seg value={prune} onChange={setPrune} options={[{ value: false, label: "Plain minimax" }, { value: true, label: "Alpha–beta" }]} /><Btn onClick={() => setLeaves(leaves.map(() => Math.floor(Math.random() * 19) - 9))}>Random leaves</Btn><Btn onClick={() => setLeaves(LEAVES)}>Reset</Btn></>}
      caption={`MAX (▲) picks the largest child, MIN (▼) the smallest, assuming the opponent plays optimally. Alpha–beta skips branches (greyed) that can't change the decision, and gets the same root value while evaluating ${res.leavesEval} of 8 leaves.`}
    >
      <svg viewBox="0 0 600 230" className="w-full h-auto" style={{ minWidth: 320 }}>
        {range(7).flatMap((n) => [2 * n + 1, 2 * n + 2].map((ch) => { const [x1, y1] = pos(n), [x2, y2] = pos(ch); const on = bestLeafPath.includes(n) && bestLeafPath.includes(ch); return <line key={ch} x1={x1} y1={y1} x2={x2} y2={y2} stroke={res.pruned.has(ch) ? C.grid : on ? C.yellow : C.axis} strokeWidth={on ? 2.5 : 1.5} strokeDasharray={res.pruned.has(ch) ? "3 3" : undefined} />; }))}
        {range(15).map((n) => {
          const [x, y] = pos(n), d = Math.floor(Math.log2(n + 1)), p = res.pruned.has(n);
          return (
            <g key={n} opacity={p ? 0.3 : 1}>
              {d < 3 ? <path d={d % 2 === 0 ? `M${x},${y - 14} L${x + 15},${y + 11} L${x - 15},${y + 11}Z` : `M${x},${y + 14} L${x + 15},${y - 11} L${x - 15},${y - 11}Z`} fill={d % 2 === 0 ? C.blue : C.orange} />
                : <rect x={x - 14} y={y - 12} width="28" height="24" rx="4" fill="#222" stroke={C.axis} />}
              <text x={x} y={y + (d < 3 ? (d % 2 === 0 ? 7 : 1) : 5)} fontSize="12" fill="#fff" textAnchor="middle" fontWeight="600">{d < 3 ? (p ? "" : res.val[n]) : leaves[n - 7]}</text>
            </g>
          );
        })}
      </svg>
      <Legend items={[{ label: "MAX", color: C.blue, box: true }, { label: "MIN", color: C.orange, box: true }, { label: "principal variation", color: C.yellow }, { label: "pruned", color: C.axis, dash: "3 3" }]} />
    </VizFrame>
  );
};

/* ---------------- Hill climbing vs simulated annealing ---------------- */

const land = (x) => 2 * Math.sin(1.3 * x) + 1.2 * Math.sin(3.1 * x + 1) + 0.3 * x;

export const LocalSearch = () => {
  const [algo, setAlgo] = useState("hill");
  const [T0, setT0] = useState(3);
  const [seed, setSeed] = useState(1);
  const runs = useMemo(() => {
    const r = mulberry32(seed);
    return range(12).map(() => {
      let x = r() * 10, T = T0;
      const tr = [x];
      for (let i = 0; i < 300; i++) {
        const nx = Math.max(0, Math.min(10, x + (r() - 0.5) * 0.6));
        const d = land(nx) - land(x);
        if (d > 0 || (algo === "anneal" && r() < Math.exp(d / Math.max(T, 1e-6)))) x = nx;
        T *= 0.985;
        tr.push(x);
      }
      return tr;
    });
  }, [algo, T0, seed]);
  const xs = linspace(0, 10, 300);
  const gbest = xs.reduce((b, x) => (land(x) > land(b) ? x : b), 0);
  const hits = runs.filter((t) => Math.abs(t[t.length - 1] - gbest) < 0.4).length;
  return (
    <VizFrame
      title="Hill climbing vs simulated annealing (maximising)"
      controls={<><Seg value={algo} onChange={setAlgo} options={[{ value: "hill", label: "Hill climbing" }, { value: "anneal", label: "Simulated annealing" }]} />{algo === "anneal" && <Slider label="Start temperature" value={T0} min={0.2} max={8} step={0.1} onChange={setT0} />}<Btn onClick={() => setSeed(seed + 1)}>New random starts</Btn></>}
      caption={`12 runs from random starts. Hill climbing only accepts better neighbours, so most runs get stuck on whatever local maximum is nearest. Annealing also accepts worse moves with probability e^(Δ/T); T starts high (exploration) and cools (exploitation), letting runs escape local maxima. ${hits}/12 runs reached the global maximum.`}
    >
      <Plot xd={[0, 10]} yd={[-4, 7]} xLabel="state x" yLabel="objective">
        {({ sx, sy }) => (
          <>
            <path d={path(xs.map((x) => [x, land(x)]), sx, sy)} fill="none" stroke={C.blue} strokeWidth="2" />
            {runs.map((t, k) => <g key={k}><circle cx={sx(t[0])} cy={sy(land(t[0]))} r="3" fill={C.muted} /><circle cx={sx(t[t.length - 1])} cy={sy(land(t[t.length - 1]))} r="6" fill={Math.abs(t[t.length - 1] - gbest) < 0.4 ? C.aqua : C.orange} stroke={C.surface} strokeWidth="2" /></g>)}
          </>
        )}
      </Plot>
      <Legend items={[{ label: "start", color: C.muted, box: true }, { label: "ended at global max", color: C.aqua, box: true }, { label: "stuck at local max", color: C.orange, box: true }]} />
    </VizFrame>
  );
};

/* ---------------- RAG ---------------- */

const CHUNKS = [
  "LoRA freezes the pretrained weights and trains small low-rank matrices added to selected layers.",
  "QLoRA combines LoRA with 4-bit quantization so a 7B model can be fine-tuned on a single consumer GPU.",
  "Docker images package an application with its dependencies so it runs the same everywhere.",
  "Nginx can act as a reverse proxy that routes requests to different containers on one domain.",
  "Retrieval augmented generation fetches relevant documents and adds them to the prompt before the LLM answers.",
  "Chunking splits long documents into smaller pieces so each one can be embedded and retrieved.",
  "Reranking with a cross-encoder reorders the retrieved chunks by relevance to the question.",
];
const QS = ["How can I fine-tune a 7B model on one GPU?", "What does a reverse proxy do for my containers?", "Why split documents into chunks for retrieval?"];
const STOP = new Set("a an the and or of to for on in is it my do does can i what how why with so be by each one that are its before into".split(" "));
const toks = (s) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w)).map((w) => w.replace(/(ing|ed|s)$/, ""));

export const RAGRetrieval = () => {
  const [q, setQ] = useState(0);
  const [k, setK] = useState(2);
  const vocab = [...new Set(CHUNKS.flatMap(toks).concat(QS.flatMap(toks)))];
  const df = Object.fromEntries(vocab.map((w) => [w, CHUNKS.filter((c) => toks(c).includes(w)).length]));
  const vec = (s) => { const t = toks(s); return vocab.map((w) => (t.filter((x) => x === w).length) * Math.log((CHUNKS.length + 1) / ((df[w] || 0) + 1))); };
  const cos = (a, b) => { const d = a.reduce((s, v, i) => s + v * b[i], 0); const n = Math.sqrt(a.reduce((s, v) => s + v * v, 0) * b.reduce((s, v) => s + v * v, 0)); return n ? d / n : 0; };
  const qv = vec(QS[q]);
  const scored = CHUNKS.map((c, i) => ({ c, i, s: cos(qv, vec(c)) })).sort((a, b) => b.s - a.s);
  const top = scored.slice(0, k);
  return (
    <VizFrame
      title="RAG: retrieve, then generate"
      controls={<><Seg value={q} onChange={setQ} options={QS.map((s, i) => ({ value: i, label: `Q${i + 1}` }))} /><Slider label="top-k" value={k} min={1} max={4} onChange={setK} /></>}
      caption="A real system embeds the question and every chunk with a neural embedding model and searches a vector database; this demo uses TF-IDF cosine similarity so the scores are computed live. The top-k chunks are pasted into the prompt as context, which grounds the LLM's answer in your data and reduces hallucinations."
    >
      <div className="text-[13px] text-white mb-2">❓ {QS[q]}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="text-[12px] text-[#9a9a9a] mb-1">1–2. Embed and score every chunk (cosine similarity)</div>
          {scored.map(({ c, i, s }) => (
            <div key={i} className={`text-[12px] rounded-lg px-2 py-1.5 mb-1 border ${top.some((t) => t.i === i) ? "border-[#199e70] text-white" : "border-[#2a2a2a] text-[#777]"}`}>
              <span className="tabular-nums mr-2 text-[#c98500]">{s.toFixed(2)}</span>{c}
            </div>
          ))}
        </div>
        <div>
          <div className="text-[12px] text-[#9a9a9a] mb-1">3. Augmented prompt sent to the LLM</div>
          <pre className="text-[12px] whitespace-pre-wrap rounded-lg bg-[#161616] border border-[#2a2a2a] p-3 text-secondary">{`Answer using only the context below.

Context:
${top.map((t, n) => `[${n + 1}] ${t.c}`).join("\n")}

Question: ${QS[q]}`}</pre>
        </div>
      </div>
    </VizFrame>
  );
};
