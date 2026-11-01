import React, { useMemo, useState } from "react";
import { C, SERIES, VizFrame, Seg, Slider, Btn, Legend, Plot, Stat, path, fmt, linspace, range, mulberry32, gaussian } from "./kit";

/* ---------------- Optimisers ---------------- */

// An elongated, rotated valley: SGD zig-zags across it, momentum-based methods ride along it.
const f2 = (x, y) => 0.5 * (0.05 * (x + y) ** 2 + 2.5 * (x - y) ** 2) / 2;
const g2 = (x, y) => [0.05 * (x + y) / 2 + 2.5 * (x - y) / 2, 0.05 * (x + y) / 2 - 2.5 * (x - y) / 2];

const OPTS = {
  SGD: (lr) => { return (p, g) => [p[0] - lr * g[0], p[1] - lr * g[1]]; },
  Momentum: (lr, b = 0.9) => { let m = [0, 0]; return (p, g) => { m = [b * m[0] + g[0], b * m[1] + g[1]]; return [p[0] - lr * m[0], p[1] - lr * m[1]]; }; },
  Nesterov: (lr, b = 0.9) => { let m = [0, 0]; return (p) => { const look = [p[0] - lr * b * m[0], p[1] - lr * b * m[1]]; const g = g2(...look); m = [b * m[0] + g[0], b * m[1] + g[1]]; return [p[0] - lr * m[0], p[1] - lr * m[1]]; }; },
  Adagrad: (lr) => { let s = [0, 0]; const a = lr * 8; return (p, g) => { s = [s[0] + g[0] ** 2, s[1] + g[1] ** 2]; return [p[0] - (a * g[0]) / (Math.sqrt(s[0]) + 1e-8), p[1] - (a * g[1]) / (Math.sqrt(s[1]) + 1e-8)]; }; },
  RMSprop: (lr, r = 0.9) => { let s = [0, 0]; const a = lr * 2; return (p, g) => { s = [r * s[0] + (1 - r) * g[0] ** 2, r * s[1] + (1 - r) * g[1] ** 2]; return [p[0] - (a * g[0]) / (Math.sqrt(s[0]) + 1e-8), p[1] - (a * g[1]) / (Math.sqrt(s[1]) + 1e-8)]; }; },
  Adam: (lr, b1 = 0.9, b2 = 0.999) => { let m = [0, 0], v = [0, 0], t = 0; const a = lr * 2; return (p, g) => { t++; m = m.map((mi, i) => b1 * mi + (1 - b1) * g[i]); v = v.map((vi, i) => b2 * vi + (1 - b2) * g[i] ** 2); return p.map((pi, i) => pi - (a * (m[i] / (1 - b1 ** t))) / (Math.sqrt(v[i] / (1 - b2 ** t)) + 1e-8)); }; },
};

export const Optimizers = () => {
  const [lr, setLr] = useState(0.2);
  const [on, setOn] = useState({ SGD: true, Momentum: true, Nesterov: false, Adagrad: false, RMSprop: false, Adam: true });
  const [steps, setSteps] = useState(60);
  const names = Object.keys(OPTS);
  const paths = useMemo(() => Object.fromEntries(names.map((n) => {
    const step = OPTS[n](lr);
    let p = [-4, -2.6];
    const out = [p];
    for (let i = 0; i < 150; i++) { p = step(p, g2(...p)); out.push(p); }
    return [n, out];
  })), [lr]);
  const levels = [0.02, 0.1, 0.3, 0.8, 1.6, 3, 5];
  const clip = (v) => Math.max(-6, Math.min(6, v));
  return (
    <VizFrame
      title="Optimisers on a long, narrow valley"
      controls={<><Slider label="Learning rate" value={lr} min={0.05} max={0.7} step={0.01} onChange={setLr} /><Slider label="Steps" value={steps} min={1} max={150} onChange={setSteps} />
        <div className="flex flex-wrap gap-3">{names.map((n, i) => <label key={n} className="flex items-center gap-1.5 text-[13px] text-secondary"><input type="checkbox" checked={on[n]} onChange={() => setOn({ ...on, [n]: !on[n] })} style={{ accentColor: SERIES[i] }} />{n}</label>)}</div></>}
      caption="Contours are the loss (minimum at the centre). Plain SGD crawls along the shallow direction (push the learning rate up and it starts zig-zagging across the steep one). Momentum keeps a moving average of past gradients (β = 0.9) and accelerates along the valley; Nesterov 'peeks ahead' and overshoots less (though at very high learning rates it, too, blows up). Adagrad/RMSprop/Adam scale each parameter's step by its gradient history; Adagrad's accumulated sum keeps growing, so its effective learning rate keeps shrinking."
    >
      <Plot xd={[-5, 5]} yd={[-3.5, 3.5]} h={320}>
        {({ sx, sy }) => (
          <>
            {levels.map((L) => {
              // ellipse f = L in rotated coords u = (x+y)/√2, v = (x−y)/√2: 0.5(0.05u² + 2.5v²) = L
              const a = Math.sqrt((2 * L) / 0.05), b = Math.sqrt((2 * L) / 2.5);
              const pts = linspace(0, 2 * Math.PI, 90).map((t) => { const u = a * Math.cos(t), v = b * Math.sin(t); return [(u + v) / Math.SQRT2, (u - v) / Math.SQRT2]; });
              return <path key={L} d={path(pts, sx, sy) + "Z"} fill="none" stroke={C.grid} strokeWidth="1.5" />;
            })}
            {names.map((n, i) => on[n] && <path key={n} d={path(paths[n].slice(0, steps + 1).map(([x, y]) => [clip(x), clip(y)]), sx, sy)} fill="none" stroke={SERIES[i]} strokeWidth="2" />)}
            {names.map((n, i) => { if (!on[n]) return null; const p = paths[n][steps]; return <circle key={n} cx={sx(clip(p[0]))} cy={sy(clip(p[1]))} r="5" fill={SERIES[i]} stroke={C.surface} strokeWidth="2" />; })}
            <text x={sx(0)} y={sy(0) + 6} fontSize="16" fill={C.text} textAnchor="middle">★</text>
          </>
        )}
      </Plot>
      <div className="flex flex-wrap gap-3 text-[12px] text-secondary">
        {names.filter((n) => on[n]).map((n) => <span key={n}><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1" style={{ background: SERIES[names.indexOf(n)] }} />{n}: loss {fmt(f2(...paths[n][steps]), 4)}</span>)}
      </div>
    </VizFrame>
  );
};

/* ---------------- LR schedulers ---------------- */

export const LRSchedulers = () => {
  const [gamma, setGamma] = useState(0.9);
  const [patience, setPatience] = useState(3);
  const E = 60, lr0 = 0.1;
  const valLoss = useMemo(() => { const r = mulberry32(3); return range(E).map((e) => 0.4 + 1.6 * Math.exp(-e / 8) + 0.05 * gaussian(r)); }, []);
  const plateau = useMemo(() => {
    let lr = lr0, best = Infinity, bad = 0;
    return valLoss.map((l) => { const cur = lr; if (l < best - 1e-4) (best = l), (bad = 0); else if (++bad > patience) (lr *= gamma * 0.6), (bad = 0); return cur; });
  }, [valLoss, gamma, patience]);
  const S = {
    "ExponentialLR": (e) => lr0 * gamma ** e,
    "StepLR (step 15)": (e) => lr0 * (gamma * 0.6) ** Math.floor(e / 15),
    "CosineAnnealingLR": (e) => 0.5 * lr0 * (1 + Math.cos((Math.PI * e) / E)),
    "ReduceLROnPlateau": (e) => plateau[e],
  };
  return (
    <VizFrame
      title="Learning-rate schedulers"
      controls={<><Slider label="γ" value={gamma} min={0.8} max={0.99} step={0.01} onChange={setGamma} /><Slider label="patience" value={patience} min={1} max={8} onChange={setPatience} /></>}
      caption="As the model starts to learn, lower the learning rate. ExponentialLR multiplies the LR by γ every epoch. StepLR does it every N epochs. ReduceLROnPlateau watches a validation metric and cuts the LR only after it hasn't improved for `patience` epochs (here the factor is 0.6γ)."
    >
      <Plot xd={[0, E - 1]} yd={[0, 0.105]} xLabel="epoch" yLabel="learning rate" yFmt={(v) => v.toFixed(2)} tooltip={(x) => { const e = Math.round(x); return <div><div className="text-white">epoch {e}</div>{Object.entries(S).map(([k, f]) => <div key={k}>{k}: {f(e).toExponential(2)}</div>)}</div>; }}>
        {({ sx, sy }) => Object.entries(S).map(([k, f], i) => <path key={k} d={path(range(E).map((e) => [e, f(e)]), sx, sy)} fill="none" stroke={SERIES[i]} strokeWidth="2" />)}
      </Plot>
      <Legend items={Object.keys(S).map((k, i) => ({ label: k, color: SERIES[i] }))} />
    </VizFrame>
  );
};

/* ---------------- Roofline ---------------- */

const HW = {
  "NVIDIA A100 (FP16 tensor)": { peak: 312, bw: 2039 },
  "NVIDIA H100 SXM (FP16 tensor)": { peak: 989, bw: 3350 },
  "Apple M2 GPU (FP32)": { peak: 3.6, bw: 100 },
};
const KERNELS = [
  { n: "vector add", ai: 1 / 12 },
  { n: "LayerNorm", ai: 1 },
  { n: "attention (decode)", ai: 2 },
  { n: "big GEMM", ai: 300 },
];

export const Roofline = () => {
  const [hw, setHw] = useState("NVIDIA A100 (FP16 tensor)");
  const [ai, setAi] = useState(1);
  const { peak, bw } = HW[hw];
  const ridge = (peak * 1000) / bw;
  const perf = (x) => Math.min(peak, (bw * x) / 1000);
  const lx = linspace(-2, 4, 200);
  return (
    <VizFrame
      title="Roofline model: memory-bound or compute-bound?"
      controls={<><Seg value={hw} onChange={setHw} options={Object.keys(HW).map((k) => ({ value: k, label: k.split(" (")[0] }))} /><Slider label="Arithmetic intensity (FLOP/byte)" value={Math.log10(ai)} min={-2} max={4} step={0.05} onChange={(v) => setAi(10 ** v)} format={() => fmt(ai, ai < 1 ? 3 : 1)} /></>}
      caption={`Attainable performance = min(peak FLOPS, memory bandwidth × arithmetic intensity). Left of the ridge point (${ridge.toFixed(0)} FLOP/byte) a kernel is memory-bound: more FLOPS won't help, moving fewer bytes will (fusion, lower precision). Right of it, it's compute-bound. Peak FLOPS ≈ cores × clock (cycles/s) × FLOPs per cycle per core; vendor spec numbers are used here.`}
    >
      <Plot xd={[-2, 4]} yd={[Math.log10(peak) - 4, Math.log10(peak) + 0.5]} h={280} xLabel="arithmetic intensity, FLOP/byte (log)" yLabel="TFLOP/s (log)" xFmt={(v) => `10^${v}`} yFmt={(v) => (10 ** v >= 1 ? (10 ** v).toFixed(0) : (10 ** v).toPrecision(1))}
        tooltip={(x) => <div>AI {fmt(10 ** x, 3)} → {fmt(perf(10 ** x), 2)} TFLOP/s ({perf(10 ** x) < peak ? "memory-bound" : "compute-bound"})</div>}>
        {({ sx, sy }) => (
          <>
            <path d={path(lx.map((x) => [x, Math.log10(perf(10 ** x))]), sx, sy)} fill="none" stroke={C.blue} strokeWidth="2.5" />
            <line x1={sx(Math.log10(ridge))} x2={sx(Math.log10(ridge))} y1={sy(Math.log10(peak) - 4)} y2={sy(Math.log10(peak))} stroke={C.muted} strokeDasharray="3 3" />
            {KERNELS.map((k) => <g key={k.n}><circle cx={sx(Math.log10(k.ai))} cy={sy(Math.log10(perf(k.ai)))} r="5" fill={C.violet} stroke={C.surface} strokeWidth="2" /><text x={sx(Math.log10(k.ai)) + 7} y={sy(Math.log10(perf(k.ai))) + 14} fontSize="11" fill={C.text}>{k.n}</text></g>)}
            <circle cx={sx(Math.log10(ai))} cy={sy(Math.log10(perf(ai)))} r="7" fill={C.yellow} stroke={C.surface} strokeWidth="2" />
          </>
        )}
      </Plot>
      <div className="flex flex-wrap gap-3"><Stat label="Attainable" value={`${fmt(perf(ai), 2)} TFLOP/s`} /><Stat label="% of peak" value={`${((perf(ai) / peak) * 100).toFixed(1)}%`} /><Stat label="Bound" value={perf(ai) < peak ? "memory" : "compute"} /></div>
    </VizFrame>
  );
};

/* ---------------- Inference memory ---------------- */

export const InferenceMemory = () => {
  const [params, setParams] = useState(7);
  const [bytes, setBytes] = useState(2);
  const [ctx, setCtx] = useState(4096);
  const [batch, setBatch] = useState(1);
  // Llama-2-7B-like shape scaled by size: layers & hidden grow with params
  const layers = Math.round(32 * Math.cbrt(params / 7)), hidden = Math.round((4096 * Math.cbrt(params / 7)) / 128) * 128;
  const W = params * 1e9 * bytes;
  const KV = 2 * layers * hidden * ctx * batch * 2; // K and V, FP16 cache
  const GB = (b) => b / 1e9;
  return (
    <VizFrame
      title="LLM inference memory ≈ weights + KV cache"
      controls={<><Slider label="Parameters (B)" value={params} min={1} max={70} onChange={setParams} /><Seg value={bytes} onChange={setBytes} options={[{ value: 4, label: "FP32 (4 B)" }, { value: 2, label: "FP16 (2 B)" }, { value: 1, label: "INT8 (1 B)" }, { value: 0.5, label: "4-bit (0.5 B)" }]} /><Slider label="Context tokens" value={ctx} min={512} max={32768} step={512} onChange={setCtx} /><Slider label="Batch" value={batch} min={1} max={32} onChange={setBatch} /></>}
      caption={`Weights take W × bytes-per-parameter, so the "W × 2" rule is for FP16. The KV cache stores a key and a value vector per layer per token: 2 × layers × hidden × tokens × batch × 2 bytes (assumes standard multi-head attention, ~${layers} layers × ${hidden} hidden; grouped-query attention shrinks it a lot). Activations and framework overhead come on top.`}
    >
      <div className="flex flex-wrap gap-3 mb-3"><Stat label="Weights" value={`${GB(W).toFixed(1)} GB`} /><Stat label="KV cache" value={`${GB(KV).toFixed(1)} GB`} /><Stat label="Total" value={`${GB(W + KV).toFixed(1)} GB`} sub={GB(W + KV) <= 80 ? "fits on one 80 GB GPU" : "needs >1 80 GB GPU"} /></div>
      <svg viewBox="0 0 600 40" className="w-full h-auto" style={{ minWidth: 320 }}>
        {(() => { const tot = Math.max(80e9, W + KV), sx = (v) => (v / tot) * 600; return <><rect x="0" y="8" width={sx(W) - 1} height="24" rx="4" fill={C.blue} /><rect x={sx(W) + 1} y="8" width={Math.max(0, sx(KV) - 2)} height="24" rx="4" fill={C.orange} /><line x1={sx(80e9)} x2={sx(80e9)} y1="2" y2="38" stroke={C.yellow} strokeDasharray="3 3" /></>; })()}
      </svg>
      <Legend items={[{ label: "weights", color: C.blue, box: true }, { label: "KV cache", color: C.orange, box: true }, { label: "80 GB GPU", color: C.yellow, dash: "3 3" }]} />
    </VizFrame>
  );
};

/* ---------------- Activation functions ---------------- */

const ACTS = {
  ReLU: [(x) => Math.max(0, x), (x) => (x > 0 ? 1 : 0)],
  "Leaky ReLU (0.01)": [(x) => (x > 0 ? x : 0.01 * x), (x) => (x > 0 ? 1 : 0.01)],
  Sigmoid: [(x) => 1 / (1 + Math.exp(-x)), (x) => { const s = 1 / (1 + Math.exp(-x)); return s * (1 - s); }],
  Tanh: [Math.tanh, (x) => 1 - Math.tanh(x) ** 2],
  GELU: [(x) => 0.5 * x * (1 + Math.tanh(0.7978845608 * (x + 0.044715 * x ** 3))), (x) => { const h = 1e-4; const g = (z) => 0.5 * z * (1 + Math.tanh(0.7978845608 * (z + 0.044715 * z ** 3))); return (g(x + h) - g(x - h)) / (2 * h); }],
};

export const Activations = () => {
  const [act, setAct] = useState("ReLU");
  const [f, df] = ACTS[act];
  const xs = linspace(-6, 6, 300);
  return (
    <VizFrame
      title="Activation functions and their gradients"
      controls={<Seg value={act} onChange={setAct} options={Object.keys(ACTS)} />}
      caption="Sigmoid and tanh saturate: for large |x| their gradient is almost 0 (at most 0.25 for sigmoid), and multiplying many of these during backprop is the vanishing-gradient problem. ReLU = max(0, x) has gradient 1 for every positive input and is cheap to compute; Leaky ReLU keeps a small slope for negatives so neurons can't 'die'. GELU is the smooth variant used in BERT/GPT."
    >
      <Plot xd={[-6, 6]} yd={[-1.5, 3]} xLabel="x" tooltip={(x) => <div>f({fmt(x)}) = {fmt(f(x), 3)}<br />f′({fmt(x)}) = {fmt(df(x), 3)}</div>}>
        {({ sx, sy }) => (
          <>
            <line x1={sx(0)} x2={sx(0)} y1={sy(-1.5)} y2={sy(3)} stroke={C.axis} />
            <path d={path(xs.map((x) => [x, Math.min(3, f(x))]), sx, sy)} fill="none" stroke={C.blue} strokeWidth="2.5" />
            <path d={path(xs.map((x) => [x, df(x)]), sx, sy)} fill="none" stroke={C.orange} strokeWidth="2" strokeDasharray="5 3" />
          </>
        )}
      </Plot>
      <Legend items={[{ label: "f(x)", color: C.blue }, { label: "f′(x), the gradient", color: C.orange, dash: "5 3" }]} />
    </VizFrame>
  );
};

export const SoftmaxTemperature = () => {
  const [T, setT] = useState(1);
  const logits = [2.0, 1.0, 0.5, 0.1, -1.0];
  const ex = logits.map((z) => Math.exp(z / T));
  const sum = ex.reduce((a, b) => a + b);
  const p = ex.map((e) => e / sum);
  return (
    <VizFrame
      title="Softmax (with temperature)"
      controls={<Slider label="Temperature T" value={T} min={0.1} max={5} step={0.05} onChange={setT} />}
      caption="softmax(zᵢ) = e^(zᵢ/T) / Σⱼ e^(zⱼ/T). The outputs are all between 0 and 1 and sum to exactly 1, so they form a probability distribution. Low T sharpens it towards the largest logit (argmax); high T flattens it towards uniform. LLM 'temperature' is this T."
    >
      <svg viewBox="0 0 600 190" className="w-full h-auto" style={{ minWidth: 320 }}>
        {p.map((v, i) => (
          <g key={i}>
            <text x="8" y={26 + i * 34} fontSize="12" fill={C.muted}>z = {logits[i]}</text>
            <rect x="80" y={12 + i * 34} width={Math.max(2, v * 480)} height="22" rx="4" fill={C.blue} />
            <text x={86 + v * 480} y={28 + i * 34} fontSize="12" fill={C.text}>{(v * 100).toFixed(1)}%</text>
          </g>
        ))}
      </svg>
      <div className="text-[12px] text-[#9a9a9a] font-mono">Σ = {p.reduce((a, b) => a + b).toFixed(3)}</div>
    </VizFrame>
  );
};

/* ---------------- Convolution ---------------- */

const IMG = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 9, 9, 9, 9, 9, 0],
  [0, 9, 0, 0, 0, 9, 0],
  [0, 9, 0, 9, 0, 9, 0],
  [0, 9, 0, 0, 0, 9, 0],
  [0, 9, 9, 9, 9, 9, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
const KERN = {
  "Sobel (vertical edges)": [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
  "Sobel (horizontal edges)": [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
  "Box blur": [[1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9]],
  Sharpen: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
};

export const Convolution = () => {
  const [kname, setK] = useState("Sobel (vertical edges)");
  const [stride, setStride] = useState(1);
  const [pad, setPad] = useState(0);
  const [dil, setDil] = useState(1);
  const [pool, setPool] = useState(false);
  const [sel, setSel] = useState([0, 0]);
  const K = KERN[kname];
  const n = IMG.length + 2 * pad, ke = dil * 2 + 1;
  const P = (r, c) => (r < pad || c < pad || r >= IMG.length + pad || c >= IMG.length + pad ? 0 : IMG[r - pad][c - pad]);
  const out = Math.floor((n - ke) / stride) + 1;
  const conv = range(Math.max(0, out)).map((i) => range(Math.max(0, out)).map((j) => K.reduce((s, row, a) => s + row.reduce((t, k, b) => t + k * P(i * stride + a * dil, j * stride + b * dil), 0), 0)));
  const pooled = pool && out >= 2 ? range(Math.floor(out / 2)).map((i) => range(Math.floor(out / 2)).map((j) => Math.max(conv[2 * i][2 * j], conv[2 * i][2 * j + 1], conv[2 * i + 1][2 * j], conv[2 * i + 1][2 * j + 1]))) : null;
  const [si, sj] = [Math.min(sel[0], out - 1), Math.min(sel[1], out - 1)];
  const covered = new Set(range(3).flatMap((a) => range(3).map((b) => `${si * stride + a * dil},${sj * stride + b * dil}`)));
  const maxAbs = Math.max(1, ...conv.flat().map(Math.abs));
  const cell = 30;
  const Grid = ({ data, hl, onHover, color, label }) => (
    <div>
      <div className="text-[12px] text-[#9a9a9a] mb-1">{label}</div>
      <div className="inline-grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${data[0]?.length || 1}, ${cell}px)` }}>
        {data.flatMap((row, i) => row.map((v, j) => (
          <div key={`${i}-${j}`} onMouseEnter={() => onHover && onHover(i, j)} className={`flex items-center justify-center text-[10px] rounded-sm tabular-nums ${hl && hl(i, j) ? "ring-2 ring-[#c98500]" : ""}`} style={{ width: cell, height: cell, background: color(v, i, j), color: "#fff" }}>
            {Number.isInteger(v) ? v : v.toFixed(1)}
          </div>
        )))}
      </div>
    </div>
  );
  return (
    <VizFrame
      title="Convolution: kernel, stride, padding, dilation, pooling"
      controls={<><Seg value={kname} onChange={setK} options={Object.keys(KERN)} /><Slider label="Stride" value={stride} min={1} max={3} onChange={setStride} /><Slider label="Padding" value={pad} min={0} max={2} onChange={setPad} /><Slider label="Dilation" value={dil} min={1} max={2} onChange={setDil} /><label className="flex items-center gap-2 text-[13px] text-secondary"><input type="checkbox" checked={pool} onChange={() => setPool(!pool)} className="accent-[#c98500]" />2×2 max pool</label></>}
      caption={`Hover an output cell to see which input pixels the 3×3 kernel covered. Output size = ⌊(n + 2p − d(k − 1) − 1)/s⌋ + 1 = ⌊(${IMG.length} + ${2 * pad} − ${dil * 2} − 1)/${stride}⌋ + 1 = ${out}. Padding adds zeros around the border so edge pixels get used too; stride skips positions; dilation spreads the kernel out to see a larger area with the same 9 weights; pooling downsamples the feature map.`}
    >
      <div className="flex flex-wrap gap-6 items-start">
        <Grid label={`Input ${n}×${n}${pad ? " (with zero padding)" : ""}`} data={range(n).map((r) => range(n).map((c) => P(r, c)))} hl={(r, c) => covered.has(`${r},${c}`)} color={(v, r, c) => (r < pad || c < pad || r >= n - pad || c >= n - pad ? "#151515" : v ? "#3987e5" : "#222")} />
        <Grid label="Kernel 3×3" data={K} color={(v) => (v > 0 ? `rgba(25,158,112,${Math.min(1, 0.25 + Math.abs(v) / 3)})` : v < 0 ? `rgba(230,103,103,${Math.min(1, 0.25 + Math.abs(v) / 3)})` : "#222")} />
        {out > 0 && <Grid label={`Feature map ${out}×${out}`} data={conv} onHover={(i, j) => setSel([i, j])} hl={(i, j) => i === si && j === sj} color={(v) => (v >= 0 ? `rgba(57,135,229,${0.12 + (0.88 * v) / maxAbs})` : `rgba(217,89,38,${0.12 + (0.88 * -v) / maxAbs})`)} />}
        {pooled && <Grid label={`After max pool ${pooled.length}×${pooled.length}`} data={pooled} color={(v) => (v >= 0 ? `rgba(57,135,229,${0.12 + (0.88 * v) / maxAbs})` : `rgba(217,89,38,${0.12 + (0.88 * -v) / maxAbs})`)} />}
      </div>
    </VizFrame>
  );
};

/* ---------------- BatchNorm vs LayerNorm ---------------- */

export const NormAxes = () => {
  const [mode, setMode] = useState("batch");
  const X = useMemo(() => { const r = mulberry32(4); return range(4).map((i) => range(6).map((j) => +(3 * i - 2 + j * 0.8 + gaussian(r)).toFixed(1))); }, []);
  const norm = (arr) => { const m = arr.reduce((a, b) => a + b) / arr.length; const s = Math.sqrt(arr.reduce((a, b) => a + (b - m) ** 2, 0) / arr.length) || 1; return arr.map((v) => (v - m) / s); };
  const Y = mode === "batch" ? (() => { const cols = range(6).map((j) => norm(X.map((r) => r[j]))); return X.map((_, i) => range(6).map((j) => cols[j][i])); })() : X.map(norm);
  const [h, setH] = useState(null);
  const inGroup = (i, j) => h && (mode === "batch" ? j === h[1] : i === h[0]);
  const Cell = ({ v, i, j }) => <div onMouseEnter={() => setH([i, j])} className={`w-12 h-8 flex items-center justify-center text-[11px] rounded tabular-nums ${inGroup(i, j) ? "ring-2 ring-[#c98500]" : ""}`} style={{ background: v >= 0 ? `rgba(57,135,229,${Math.min(0.9, 0.15 + Math.abs(v) / 8)})` : `rgba(217,89,38,${Math.min(0.9, 0.15 + Math.abs(v) / 8)})`, color: "#fff" }}>{v.toFixed(1)}</div>;
  return (
    <VizFrame
      title="BatchNorm vs LayerNorm: which axis gets normalised?"
      controls={<Seg value={mode} onChange={setMode} options={[{ value: "batch", label: "BatchNorm" }, { value: "layer", label: "LayerNorm" }]} />}
      caption="Rows are 4 samples in a batch, columns are 6 features. BatchNorm normalises each feature across the batch (compare with your peers), so it depends on batch size. LayerNorm normalises each sample across its own features (look at yourself), so it works with batch size 1 and variable-length sequences, which is why Transformers use it. Hover a cell to see its group."
    >
      <div className="flex flex-wrap gap-8 items-center">
        {[["input", X], ["normalised (mean 0, std 1 per group)", Y]].map(([lab, M]) => (
          <div key={lab}>
            <div className="text-[12px] text-[#9a9a9a] mb-1">{lab}</div>
            <div className="grid grid-cols-6 gap-1">{M.flatMap((r, i) => r.map((v, j) => <Cell key={`${i}${j}`} v={v} i={i} j={j} />))}</div>
          </div>
        ))}
      </div>
    </VizFrame>
  );
};

export const Dropout = () => {
  const [p, setP] = useState(0.5);
  const [seed, setSeed] = useState(1);
  const layers = [4, 6, 6, 2];
  const r = mulberry32(seed);
  const dropped = layers.map((n, li) => range(n).map(() => li > 0 && li < layers.length - 1 && r() < p));
  const X = (li) => 60 + li * 160, Y = (li, i) => 20 + ((i + 0.5) * 200) / layers[li];
  return (
    <VizFrame
      title="Dropout during training"
      controls={<><Slider label="Drop probability p" value={p} min={0} max={0.9} step={0.05} onChange={setP} /><Btn onClick={() => setSeed(seed + 1)}>Next mini-batch</Btn></>}
      caption={`Each training step randomly zeroes hidden units with probability p (a different mask every mini-batch), so the network can't rely on any single unit; surviving activations are scaled by 1/(1 − p) = ${(1 / (1 - p)).toFixed(2)} ("inverted dropout"). At inference time dropout is turned off and every unit is used.`}
    >
      <svg viewBox="0 0 600 240" className="w-full h-auto" style={{ minWidth: 320 }}>
        {layers.slice(0, -1).map((n, li) => range(n).flatMap((i) => range(layers[li + 1]).map((j) => {
          const off = dropped[li][i] || dropped[li + 1][j];
          return <line key={`${li}-${i}-${j}`} x1={X(li)} y1={Y(li, i)} x2={X(li + 1)} y2={Y(li + 1, j)} stroke={off ? C.grid : C.axis} strokeWidth={off ? 0.5 : 1.2} />;
        })))}
        {layers.map((n, li) => range(n).map((i) => <circle key={`${li}-${i}`} cx={X(li)} cy={Y(li, i)} r="11" fill={dropped[li][i] ? C.surface : li === 0 ? C.aqua : li === layers.length - 1 ? C.orange : C.blue} stroke={dropped[li][i] ? C.axis : C.surface} strokeDasharray={dropped[li][i] ? "3 2" : undefined} strokeWidth="2" />))}
      </svg>
    </VizFrame>
  );
};
