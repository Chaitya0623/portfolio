import React, { useMemo, useState } from "react";
import { C, VizFrame, Seg, Slider, Btn, Legend, Plot, path, useStepper, mulberry32, linspace } from "./kit";

/* ---------------- Programming ---------------- */

export const CopySemantics = () => {
  const [mode, setMode] = useState("assign");
  const [mutated, setMutated] = useState(null);
  const a = mutated === "inner" ? [[99, 2], [3, 4]] : mutated === "outer" ? [[1, 2], [3, 4], [5, 6]] : [[1, 2], [3, 4]];
  // What li2 looks like after applying the same mutation to li2, and what li1 then shows.
  const shared = { assign: { outer: true, inner: true }, shallow: { outer: false, inner: true }, deep: { outer: false, inner: false } }[mode];
  const li1 =
    mutated === "inner" ? (shared.inner ? a : [[1, 2], [3, 4]]) : mutated === "outer" ? (shared.outer ? a : [[1, 2], [3, 4]]) : a;
  const code = { assign: "li2 = li1", shallow: "li2 = copy.copy(li1)", deep: "li2 = copy.deepcopy(li1)" }[mode];
  const Box = ({ name, val, hl }) => (
    <div className={`rounded-xl border p-3 ${hl ? "border-[#d55181]" : "border-[#2a2a2a]"}`}>
      <div className="text-[12px] text-[#9a9a9a] mb-1">{name}</div>
      <code className="text-white text-[15px]">{JSON.stringify(val)}</code>
    </div>
  );
  return (
    <VizFrame
      title="Assignment vs shallow copy vs deep copy"
      controls={
        <>
          <Seg
            value={mode}
            onChange={(m) => (setMode(m), setMutated(null))}
            options={[
              { value: "assign", label: "= operator" },
              { value: "shallow", label: "copy.copy" },
              { value: "deep", label: "copy.deepcopy" },
            ]}
          />
          <Btn onClick={() => setMutated("inner")}>li2[0][0] = 99</Btn>
          <Btn onClick={() => setMutated("outer")}>li2.append([5, 6])</Btn>
          <Btn onClick={() => setMutated(null)}>Reset</Btn>
        </>
      }
      caption="A shallow copy creates a new outer list but shares the nested objects, so editing a nested element shows up in both; appending to the outer list does not. A deep copy is fully independent."
    >
      <div className="font-mono text-[13px] text-[#c98500] mb-3">li1 = [[1, 2], [3, 4]]; {code}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Box name="li2 (the one you edited)" val={a} />
        <Box name="li1 (original)" val={li1} hl={mutated && JSON.stringify(li1) !== "[[1,2],[3,4]]"} />
      </div>
      {mutated && (
        <div className="mt-3 text-[13px] text-secondary">
          {JSON.stringify(li1) !== "[[1,2],[3,4]]" ? "↳ li1 changed too: the edited object is shared." : "↳ li1 is unaffected."}
        </div>
      )}
    </VizFrame>
  );
};

export const PromiseAll = () => {
  const [tasks, setTasks] = useState([
    { ms: 800, ok: true },
    { ms: 1400, ok: true },
    { ms: 1100, ok: false },
  ]);
  const [method, setMethod] = useState("all");
  const settle = (() => {
    if (method === "all") {
      const rej = tasks.filter((t) => !t.ok).sort((a, b) => a.ms - b.ms)[0];
      return rej
        ? { at: rej.ms, text: `.catch → "Task ${tasks.indexOf(rej) + 1} failed" (rejects on the first failure)` }
        : { at: Math.max(...tasks.map((t) => t.ms)), text: ".then → all three results (waits for the slowest)" };
    }
    return { at: Math.max(...tasks.map((t) => t.ms)), text: ".then → an array of {status, value/reason} for every task" };
  })();
  const W = 600, max = 1800, sx = (ms) => 90 + (ms / max) * (W - 110);
  return (
    <VizFrame
      title="Promise.all on a timeline"
      controls={
        <>
          <Seg value={method} onChange={setMethod} options={[{ value: "all", label: "Promise.all" }, { value: "allSettled", label: "Promise.allSettled" }]} />
          {tasks.map((t, i) => (
            <label key={i} className="flex items-center gap-2 text-[13px] text-secondary">
              Task {i + 1}
              <input type="checkbox" checked={t.ok} onChange={() => setTasks(tasks.map((x, j) => (j === i ? { ...x, ok: !x.ok } : x)))} className="accent-[#199e70]" />
              resolves
            </label>
          ))}
        </>
      }
      caption="Each bar is a pending promise. Promise.all settles as soon as any promise rejects, or once every promise has resolved."
    >
      <svg viewBox={`0 0 ${W} 170`} className="w-full h-auto" style={{ minWidth: 320 }}>
        {tasks.map((t, i) => (
          <g key={i}>
            <text x="0" y={30 + i * 36} fill={C.text} fontSize="12">Task {i + 1}</text>
            <rect x={sx(0)} y={18 + i * 36} width={sx(t.ms) - sx(0)} height="16" rx="4" fill={t.ok ? C.aqua : C.red} opacity="0.85" />
            <text x={sx(t.ms) + 6} y={30 + i * 36} fill={C.muted} fontSize="11">{t.ok ? "resolve" : "reject"} @ {t.ms}ms</text>
          </g>
        ))}
        <line x1={sx(settle.at)} x2={sx(settle.at)} y1="10" y2="125" stroke={C.yellow} strokeDasharray="4 3" strokeWidth="2" />
        <text x={sx(settle.at)} y="145" fill={C.yellow} fontSize="12" textAnchor="middle">settles @ {settle.at}ms</text>
      </svg>
      <div className="text-[13px] text-secondary font-mono">{settle.text}</div>
    </VizFrame>
  );
};

/* ---------------- Searching ---------------- */

const SORTED = [3, 7, 11, 15, 19, 24, 28, 33, 38, 42, 47, 51, 56, 63, 70];

export const BinarySearch = () => {
  const [target, setTarget] = useState(51);
  const frames = useMemo(() => {
    const out = [];
    let l = 0, r = SORTED.length - 1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      const cmp = SORTED[mid] === target ? "found" : SORTED[mid] < target ? "right" : "left";
      out.push({ l, r, mid, cmp });
      if (cmp === "found") return out;
      if (cmp === "right") l = mid + 1;
      else r = mid - 1;
    }
    out.push({ l, r, mid: -1, cmp: "none" });
    return out;
  }, [target]);
  const [i, controls] = useStepper(frames.length, 900, target);
  const f = frames[i];
  const msg = {
    found: `arr[${f.mid}] = ${SORTED[f.mid]} == target → found in ${i + 1} comparisons`,
    right: `arr[${f.mid}] = ${SORTED[f.mid]} < ${target} → left = mid + 1`,
    left: `arr[${f.mid}] = ${SORTED[f.mid]} > ${target} → right = mid - 1`,
    none: `left (${f.l}) > right (${f.r}) → not present`,
  }[f.cmp];
  return (
    <VizFrame
      title="Binary search, step by step"
      controls={
        <>
          <Slider label="Target" value={target} min={0} max={72} onChange={setTarget} />
          {controls}
        </>
      }
      caption={`Linear search would need up to ${SORTED.length} comparisons here; binary search needs at most ⌈log₂(${SORTED.length}+1)⌉ = 4.`}
    >
      <div className="flex gap-1 sm:gap-1.5" style={{ minWidth: 320 }}>
        {SORTED.map((v, k) => {
          const inRange = k >= f.l && k <= f.r;
          const isMid = k === f.mid;
          return (
            <div key={k} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full text-center rounded-md py-2 text-[12px] sm:text-[14px] tabular-nums border ${
                  isMid ? (f.cmp === "found" ? "border-[#199e70] bg-[#199e70]/30 text-white" : "border-[#c98500] bg-[#c98500]/25 text-white") : inRange ? "border-[#3a3a3a] text-white" : "border-transparent text-[#555]"
                }`}
              >
                {v}
              </div>
              <div className="text-[10px] text-[#9a9a9a] mt-1 h-3">{k === f.l ? "L" : ""}{k === f.r ? "R" : ""}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 font-mono text-[13px] text-secondary">{msg}</div>
    </VizFrame>
  );
};

/* ---------------- Sorting ---------------- */

const sortFrames = (algo, input) => {
  const a = [...input];
  const F = [];
  let comps = 0;
  const snap = (hl = [], done = []) => F.push({ a: [...a], hl, done, comps });
  const doneSet = new Set();
  const D = () => [...doneSet];
  if (algo === "bubble") {
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        comps++;
        snap([j, j + 1], D());
        if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
      doneSet.add(a.length - i - 1);
    }
  } else if (algo === "selection") {
    for (let i = 0; i < a.length; i++) {
      let m = i;
      for (let j = i + 1; j < a.length; j++) {
        comps++;
        snap([m, j], D());
        if (a[j] < a[m]) m = j;
      }
      [a[i], a[m]] = [a[m], a[i]];
      doneSet.add(i);
    }
  } else if (algo === "insertion") {
    for (let i = 1; i < a.length; i++) {
      let j = i;
      while (j > 0) {
        comps++;
        snap([j - 1, j], D());
        if (a[j - 1] > a[j]) [a[j - 1], a[j]] = [a[j], a[j - 1]];
        else break;
        j--;
      }
    }
  } else if (algo === "merge") {
    const ms = (lo, hi) => {
      if (hi - lo < 1) return;
      const mid = Math.floor((lo + hi) / 2);
      ms(lo, mid);
      ms(mid + 1, hi);
      const left = a.slice(lo, mid + 1), right = a.slice(mid + 1, hi + 1);
      let i = 0, j = 0, k = lo;
      while (i < left.length && j < right.length) {
        comps++;
        a[k++] = left[i] <= right[j] ? left[i++] : right[j++];
        snap([k - 1], D());
      }
      while (i < left.length) (a[k++] = left[i++]), snap([k - 1], D());
      while (j < right.length) (a[k++] = right[j++]), snap([k - 1], D());
    };
    ms(0, a.length - 1);
  } else if (algo === "quick") {
    const qs = (lo, hi) => {
      if (lo >= hi) return lo === hi && doneSet.add(lo);
      const p = a[hi];
      let i = lo;
      for (let j = lo; j < hi; j++) {
        comps++;
        snap([j, hi], D());
        if (a[j] < p) ([a[i], a[j]] = [a[j], a[i]]), i++;
      }
      [a[i], a[hi]] = [a[hi], a[i]];
      doneSet.add(i);
      qs(lo, i - 1);
      qs(i + 1, hi);
    };
    qs(0, a.length - 1);
  }
  F.push({ a: [...a], hl: [], done: a.map((_, i) => i), comps });
  return F;
};

export const SortingVisualizer = () => {
  const [algo, setAlgo] = useState("bubble");
  const [seed, setSeed] = useState(7);
  const input = useMemo(() => {
    const r = mulberry32(seed);
    return Array.from({ length: 16 }, () => 5 + Math.floor(r() * 95));
  }, [seed]);
  const frames = useMemo(() => sortFrames(algo, input), [algo, input]);
  const [i, controls] = useStepper(frames.length, 90, `${algo}${seed}`);
  const f = frames[Math.min(i, frames.length - 1)];
  const big = { bubble: "O(n²)", selection: "O(n²)", insertion: "O(n²) worst, O(n) if nearly sorted", merge: "O(n log n)", quick: "O(n log n) avg, O(n²) worst" }[algo];
  return (
    <VizFrame
      title="Sorting algorithms"
      controls={
        <>
          <Seg value={algo} onChange={setAlgo} options={["bubble", "selection", "insertion", "merge", "quick"]} />
          <Btn onClick={() => setSeed(seed + 1)}>Shuffle</Btn>
          {controls}
        </>
      }
      caption={`Highlighted bars are being compared/written; green bars are in their final position. Comparisons so far: ${f.comps}. Time complexity: ${big}.`}
    >
      <svg viewBox="0 0 600 200" className="w-full h-auto" style={{ minWidth: 320 }}>
        {f.a.map((v, k) => {
          const bw = 600 / f.a.length;
          const col = f.hl.includes(k) ? C.yellow : f.done.includes(k) ? C.aqua : C.blue;
          return (
            <g key={k}>
              <rect x={k * bw + 1} y={190 - v * 1.8} width={bw - 2} height={v * 1.8} rx="4" fill={col} />
              <text x={k * bw + bw / 2} y={186 - v * 1.8} fontSize="10" fill={C.muted} textAnchor="middle">{v}</text>
            </g>
          );
        })}
      </svg>
    </VizFrame>
  );
};

/* ---------------- Graphs ---------------- */

const G_NODES = { A: [80, 100], B: [200, 40], C: [200, 160], D: [320, 30], E: [320, 110], F: [320, 180], G: [450, 70], H: [450, 160] };
const G_EDGES = [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "E"], ["C", "F"], ["D", "G"], ["E", "G"], ["F", "H"], ["E", "H"]];
const ADJ = Object.keys(G_NODES).reduce((m, k) => ({ ...m, [k]: G_EDGES.filter((e) => e.includes(k)).map((e) => (e[0] === k ? e[1] : e[0])).sort() }), {});

export const GraphTraversal = () => {
  const [algo, setAlgo] = useState("BFS");
  const frames = useMemo(() => {
    const out = [];
    const seen = new Set(["A"]);
    const order = [];
    const ds = ["A"];
    out.push({ order: [], ds: [...ds], cur: null });
    while (ds.length) {
      const cur = algo === "BFS" ? ds.shift() : ds.pop();
      order.push(cur);
      const nb = algo === "BFS" ? ADJ[cur] : [...ADJ[cur]].reverse();
      for (const n of nb) if (!seen.has(n)) seen.add(n), ds.push(n);
      out.push({ order: [...order], ds: [...ds], cur });
    }
    return out;
  }, [algo]);
  const [i, controls] = useStepper(frames.length, 800, algo);
  const f = frames[i];
  return (
    <VizFrame
      title="Breadth-first vs depth-first search"
      controls={
        <>
          <Seg value={algo} onChange={setAlgo} options={["BFS", "DFS"]} />
          {controls}
        </>
      }
      caption={algo === "BFS" ? "BFS pops from the front of a queue (popleft), so it finishes each level before going deeper." : "DFS pops from the top of a stack, so it follows one branch as deep as it can before backtracking."}
    >
      <svg viewBox="0 0 540 210" className="w-full h-auto" style={{ minWidth: 320 }}>
        {G_EDGES.map(([u, v]) => (
          <line key={u + v} x1={G_NODES[u][0]} y1={G_NODES[u][1]} x2={G_NODES[v][0]} y2={G_NODES[v][1]} stroke={C.axis} strokeWidth="2" />
        ))}
        {Object.entries(G_NODES).map(([k, [x, y]]) => {
          const vi = f.order.indexOf(k);
          const fill = k === f.cur ? C.yellow : vi >= 0 ? C.aqua : f.ds.includes(k) ? C.violet : "#222";
          return (
            <g key={k}>
              <circle cx={x} cy={y} r="18" fill={fill} stroke={C.surface} strokeWidth="2" />
              <text x={x} y={y + 5} fontSize="14" fill="#fff" textAnchor="middle" fontWeight="600">{k}</text>
              {vi >= 0 && <text x={x + 20} y={y - 14} fontSize="11" fill={C.muted}>#{vi + 1}</text>}
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[13px] text-secondary">
        <span>visited: [{f.order.join(", ")}]</span>
        <span>{algo === "BFS" ? "queue" : "stack"}: [{f.ds.join(", ")}]</span>
      </div>
      <div className="mt-2"><Legend items={[{ label: "current", color: C.yellow, box: true }, { label: "visited", color: C.aqua, box: true }, { label: algo === "BFS" ? "in queue" : "on stack", color: C.violet, box: true }]} /></div>
    </VizFrame>
  );
};

const BST_KEYS = [50, 30, 70, 20, 40, 60, 80, 35, 65];
const buildBST = () => {
  let root = null;
  const ins = (n, k, d, lo, hi) => {
    if (!n) return { k, l: null, r: null, x: (lo + hi) / 2, y: 30 + d * 55 };
    if (k < n.k) n.l = ins(n.l, k, d + 1, lo, (lo + hi) / 2);
    else n.r = ins(n.r, k, d + 1, (lo + hi) / 2, hi);
    return n;
  };
  BST_KEYS.forEach((k) => (root = ins(root, k, 0, 0, 560)));
  return root;
};

export const TreeTraversal = () => {
  const root = useMemo(buildBST, []);
  const [order, setOrder] = useState("inorder");
  const seq = useMemo(() => {
    const out = [];
    const go = (n) => {
      if (!n) return;
      if (order === "preorder") out.push(n.k);
      go(n.l);
      if (order === "inorder") out.push(n.k);
      go(n.r);
      if (order === "postorder") out.push(n.k);
    };
    go(root);
    return out;
  }, [root, order]);
  const [i, controls] = useStepper(seq.length + 1, 700, order);
  const shown = seq.slice(0, i);
  const nodes = [], edges = [];
  const walk = (n) => {
    if (!n) return;
    nodes.push(n);
    [n.l, n.r].forEach((c) => c && (edges.push([n, c]), walk(c)));
  };
  walk(root);
  return (
    <VizFrame
      title="Tree traversals on a binary search tree"
      controls={
        <>
          <Seg value={order} onChange={setOrder} options={[{ value: "inorder", label: "Inorder (L-Root-R)" }, { value: "preorder", label: "Preorder (Root-L-R)" }, { value: "postorder", label: "Postorder (L-R-Root)" }]} />
          {controls}
        </>
      }
      caption="Because a BST keeps Left < Root < Right, an inorder traversal always emits the keys in sorted order."
    >
      <svg viewBox="0 0 560 250" className="w-full h-auto" style={{ minWidth: 320 }}>
        {edges.map(([a, b]) => <line key={`${a.k}-${b.k}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.axis} strokeWidth="2" />)}
        {nodes.map((n) => {
          const idx = shown.indexOf(n.k);
          return (
            <g key={n.k}>
              <circle cx={n.x} cy={n.y} r="18" fill={idx === shown.length - 1 ? C.yellow : idx >= 0 ? C.aqua : "#222"} stroke={C.surface} strokeWidth="2" />
              <text x={n.x} y={n.y + 5} fontSize="13" fill="#fff" textAnchor="middle">{n.k}</text>
              {idx >= 0 && <text x={n.x + 20} y={n.y - 12} fontSize="11" fill={C.muted}>{idx + 1}</text>}
            </g>
          );
        })}
      </svg>
      <div className="font-mono text-[13px] text-secondary">output: [{shown.join(", ")}]</div>
    </VizFrame>
  );
};

export const BigO = () => {
  const [n, setN] = useState(32);
  const fns = [
    { label: "O(log n)", f: (x) => Math.log2(x), color: C.aqua },
    { label: "O(n)", f: (x) => x, color: C.blue },
    { label: "O(n log n)", f: (x) => x * Math.log2(x), color: C.yellow },
    { label: "O(n²)", f: (x) => x * x, color: C.orange },
    { label: "O(2ⁿ)", f: (x) => Math.pow(2, x), color: C.red },
  ];
  const xs = linspace(1, n, 120);
  const ymax = n * n * 1.1;
  return (
    <VizFrame
      title="How fast does the work grow?"
      controls={<Slider label="Input size n" value={n} min={4} max={64} onChange={setN} />}
      caption="Time complexity is about the rate at which the operation count grows with n, not wall-clock time. The y-axis is capped at about n², so 2ⁿ leaves the chart almost immediately. Hover to compare values."
    >
      <Plot
        xd={[1, n]}
        yd={[0, ymax]}
        xLabel="n"
        yLabel="operations"
        yFmt={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v)}
        tooltip={(x) => (
          <div>
            <div className="text-white">n = {Math.round(x)}</div>
            {fns.map((f) => <div key={f.label}>{f.label}: {Math.round(f.f(Math.round(x))).toLocaleString()}</div>)}
          </div>
        )}
      >
        {({ sx, sy }) => fns.map((f) => <path key={f.label} d={path(xs.map((x) => [x, Math.min(f.f(x), ymax)]), sx, sy)} fill="none" stroke={f.color} strokeWidth="2" />)}
      </Plot>
      <Legend items={fns.map((f) => ({ label: f.label, color: f.color }))} />
    </VizFrame>
  );
};
