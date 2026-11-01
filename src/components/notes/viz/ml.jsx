import React, { useMemo, useState } from "react";
import { C, SERIES, VizFrame, Seg, Slider, Btn, Legend, Plot, Stat, path, fmt, linspace, range, mulberry32, gaussian, useStepper } from "./kit";
import { normCdf, normInv, normPdf } from "./stats";

/* ---------------- linear algebra helpers ---------------- */

const solve = (A, b) => {
  const n = b.length, M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    if (Math.abs(M[c][c]) < 1e-12) continue;
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((r, i) => r[n] / (r[i] || 1));
};

const polyFit = (pts, deg, lambda = 1e-6) => {
  const X = pts.map(([x]) => range(deg + 1).map((p) => x ** p));
  const A = range(deg + 1).map((i) => range(deg + 1).map((j) => X.reduce((s, r) => s + r[i] * r[j], 0) + (i === j ? lambda : 0)));
  const b = range(deg + 1).map((i) => X.reduce((s, r, k) => s + r[i] * pts[k][1], 0));
  const w = solve(A, b);
  return (x) => w.reduce((s, c, p) => s + c * x ** p, 0);
};

/* ---------------- Bias–variance ---------------- */

const truth = (x) => Math.sin(Math.PI * x);

export const BiasVariance = () => {
  const [deg, setDeg] = useState(3);
  const [seed, setSeed] = useState(1);
  const { train, test } = useMemo(() => {
    const r = mulberry32(seed);
    const mk = (n) => range(n).map(() => { const x = r() * 2 - 1; return [x, truth(x) + 0.25 * gaussian(r)]; });
    return { train: mk(18), test: mk(200) };
  }, [seed]);
  const mse = (f, d) => d.reduce((s, [x, y]) => s + (f(x) - y) ** 2, 0) / d.length;
  const curve = useMemo(() => range(13).map((d) => { const f = polyFit(train, d); return [d, mse(f, train), mse(f, test)]; }), [train, test]);
  const f = polyFit(train, deg);
  const xs = linspace(-1, 1, 200);
  const label = deg <= 1 ? "Underfitting: high bias, low variance" : deg >= 9 ? "Overfitting: low bias, high variance" : "Close to the sweet spot";
  return (
    <VizFrame
      title="Bias–variance tradeoff with polynomial regression"
      controls={<><Slider label="Model complexity (degree)" value={deg} min={0} max={12} onChange={setDeg} /><Btn onClick={() => setSeed(seed + 1)}>New training sample</Btn></>}
      caption="18 noisy training points from a sine curve. A simple model misses the pattern on both training and test data; a very flexible one memorises the noise, so training error keeps falling while test error shoots up. Resample to see the high-variance fit change wildly."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <div className="text-[12px] text-[#9a9a9a] mb-1">{label}</div>
          <Plot xd={[-1, 1]} yd={[-2, 2]} w={360} h={250} xLabel="x">
            {({ sx, sy }) => (
              <>
                <path d={path(xs.map((x) => [x, truth(x)]), sx, sy)} fill="none" stroke={C.muted} strokeDasharray="4 3" />
                <path d={path(xs.map((x) => [x, Math.max(-2.2, Math.min(2.2, f(x)))]), sx, sy)} fill="none" stroke={C.yellow} strokeWidth="2.5" />
                {train.map(([x, y], i) => <circle key={i} cx={sx(x)} cy={sy(y)} r="4" fill={C.blue} stroke={C.surface} strokeWidth="2" />)}
              </>
            )}
          </Plot>
        </div>
        <div>
          <div className="text-[12px] text-[#9a9a9a] mb-1">Error vs complexity</div>
          <Plot xd={[0, 12]} yd={[0, 0.6]} w={360} h={250} xLabel="degree" yLabel="MSE" yFmt={(v) => v.toFixed(1)} tooltip={(x) => { const c = curve[Math.round(x)]; return c && <div>degree {c[0]}: train {fmt(c[1], 3)}, test {fmt(c[2], 3)}</div>; }}>
            {({ sx, sy }) => (
              <>
                <path d={path(curve.map((c) => [c[0], Math.min(0.6, c[1])]), sx, sy)} fill="none" stroke={C.blue} strokeWidth="2" />
                <path d={path(curve.map((c) => [c[0], Math.min(0.6, c[2])]), sx, sy)} fill="none" stroke={C.orange} strokeWidth="2" />
                <line x1={sx(deg)} x2={sx(deg)} y1={sy(0)} y2={sy(0.6)} stroke={C.yellow} strokeDasharray="4 3" />
              </>
            )}
          </Plot>
        </div>
      </div>
      <Legend items={[{ label: "training points", color: C.blue, box: true }, { label: "fitted model", color: C.yellow }, { label: "true function", color: C.muted, dash: "4 3" }, { label: "train error", color: C.blue }, { label: "test error", color: C.orange }]} />
    </VizFrame>
  );
};

/* ---------------- Gradient descent ---------------- */

export const GradientDescent1D = () => {
  const [lr, setLr] = useState(0.1);
  const [start, setStart] = useState(-4);
  const J = (t) => (t - 1) ** 2 + 0.5, dJ = (t) => 2 * (t - 1);
  const steps = useMemo(() => {
    const out = [start];
    for (let i = 0; i < 25; i++) out.push(out[out.length - 1] - lr * dJ(out[out.length - 1]));
    return out;
  }, [lr, start]);
  const [i, controls] = useStepper(steps.length, 350, `${lr}${start}`);
  const shown = steps.slice(0, i + 1);
  const xs = linspace(-5, 7, 200);
  const regime = lr < 0.5 ? "smooth convergence" : lr === 0.5 ? "jumps straight to the minimum" : lr < 1 ? "oscillates but converges" : lr === 1 ? "bounces forever" : "diverges";
  return (
    <VizFrame
      title="Gradient descent on a convex cost J(θ)"
      controls={<><Slider label="Learning rate α" value={lr} min={0.02} max={1.05} step={0.01} onChange={setLr} /><Slider label="Start θ" value={start} min={-5} max={7} step={0.5} onChange={setStart} />{controls}</>}
      caption={`Update rule: θ ← θ − α · dJ/dθ. The slope is different at every point, so the steps shrink as θ approaches the minimum. With α = ${lr.toFixed(2)} the iterates ${regime}. For a convex cost there is no local minimum other than the global one.`}
    >
      <Plot xd={[-5, 7]} yd={[0, 37]} xLabel="θ" yLabel="J(θ)" tooltip={(x) => <div>θ = {fmt(x)}, J = {fmt(J(x))}, slope = {fmt(dJ(x))}</div>}>
        {({ sx, sy }) => (
          <>
            <path d={path(xs.map((x) => [x, J(x)]), sx, sy)} fill="none" stroke={C.blue} strokeWidth="2" />
            <path d={path(shown.filter((t) => Math.abs(t) < 8).map((t) => [t, J(t)]), sx, sy)} fill="none" stroke={C.yellow} strokeWidth="1.5" strokeDasharray="3 3" />
            {shown.filter((t) => t > -5 && t < 7).map((t, k) => <circle key={k} cx={sx(t)} cy={sy(J(t))} r={k === shown.length - 1 ? 7 : 4} fill={k === shown.length - 1 ? C.yellow : C.orange} stroke={C.surface} strokeWidth="2" />)}
          </>
        )}
      </Plot>
      <div className="font-mono text-[13px] text-secondary">step {i}: θ = {fmt(shown[shown.length - 1], 4)}, J(θ) = {fmt(J(shown[shown.length - 1]), 4)}</div>
    </VizFrame>
  );
};

export const GradientDescentVariants = () => {
  const [lr, setLr] = useState(0.1);
  const [seed, setSeed] = useState(3);
  const data = useMemo(() => { const r = mulberry32(77); return range(60).map(() => { const x = r() * 2 - 1; return [x, 1.5 + 2 * x + 0.4 * gaussian(r)]; }); }, []);
  const cost = (a, b, d = data) => d.reduce((s, [x, y]) => s + (a + b * x - y) ** 2, 0) / (2 * d.length);
  const grad = (a, b, d) => d.reduce(([ga, gb], [x, y]) => { const e = a + b * x - y; return [ga + e / d.length, gb + (e * x) / d.length]; }, [0, 0]);
  const runs = useMemo(() => {
    const r = mulberry32(seed);
    const run = (bs) => {
      let a = -2, b = -2;
      const out = [[a, b]];
      for (let ep = 0; ep < 200; ep++) {
        const idx = range(data.length).sort(() => r() - 0.5);
        for (let s = 0; s < data.length; s += bs) {
          const g = grad(a, b, idx.slice(s, s + bs).map((k) => data[k]));
          a -= lr * g[0]; b -= lr * g[1];
          if (out.length > 120) break;
          out.push([a, b]);
        }
        if (out.length > 120) break;
      }
      return out;
    };
    return { batch: run(data.length), mini: run(10), sgd: run(1) };
  }, [lr, seed, data]);
  const G = 36, xd = [-2.5, 4], yd = [-2.5, 4.5];
  const cells = [];
  for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) {
    const a = xd[0] + ((i + 0.5) * (xd[1] - xd[0])) / G, b = yd[0] + ((j + 0.5) * (yd[1] - yd[0])) / G;
    cells.push([a, b, cost(a, b)]);
  }
  const cmax = Math.log(Math.max(...cells.map((c) => c[2])));
  const cmin = Math.log(Math.min(...cells.map((c) => c[2])));
  const col = [C.blue, C.aqua, C.orange];
  return (
    <VizFrame
      title="Batch vs mini-batch vs stochastic gradient descent"
      controls={<><Slider label="Learning rate" value={lr} min={0.02} max={0.6} step={0.01} onChange={setLr} /><Btn onClick={() => setSeed(seed + 1)}>Reshuffle</Btn></>}
      caption="Fitting y = θ₀ + θ₁x. The background is the MSE cost surface (darker = lower), minimum at the star; each path is 120 parameter updates. Batch GD uses the whole dataset for each update and takes a smooth path. Mini-batch (10 rows) and SGD (1 row) use random subsets after shuffling, so each step is cheaper but noisier. SGD jitters around the minimum unless the learning rate decays."
    >
      <Plot xd={xd} yd={yd} h={320} xLabel="θ₀ (intercept)" yLabel="θ₁ (slope)">
        {({ sx, sy }) => {
          const cw = sx(xd[0] + (xd[1] - xd[0]) / G) - sx(xd[0]), ch = sy(yd[0]) - sy(yd[0] + (yd[1] - yd[0]) / G);
          const best = solve([[data.length, data.reduce((s, d) => s + d[0], 0)], [data.reduce((s, d) => s + d[0], 0), data.reduce((s, d) => s + d[0] ** 2, 0)]], [data.reduce((s, d) => s + d[1], 0), data.reduce((s, d) => s + d[0] * d[1], 0)]);
          return (
            <>
              {cells.map(([a, b, c], k) => <rect key={k} x={sx(a) - cw / 2} y={sy(b) - ch / 2} width={cw + 0.5} height={ch + 0.5} fill={C.blue} opacity={0.75 - (0.7 * (Math.log(c) - cmin)) / (cmax - cmin)} />)}
              {[["sgd", 2], ["mini", 1], ["batch", 0]].map(([k, ci]) => <path key={k} d={path(runs[k], sx, sy)} fill="none" stroke={col[ci]} strokeWidth={k === "batch" ? 3 : 1.75} />)}
              {[["sgd", 2], ["mini", 1], ["batch", 0]].map(([k, ci]) => { const p = runs[k][runs[k].length - 1]; return <circle key={k} cx={sx(p[0])} cy={sy(p[1])} r="5" fill={col[ci]} stroke={C.surface} strokeWidth="2" />; })}
              <text x={sx(best[0])} y={sy(best[1]) + 6} fontSize="18" fill={C.yellow} textAnchor="middle">★</text>
            </>
          );
        }}
      </Plot>
      <Legend items={[{ label: "Batch GD", color: col[0] }, { label: "Mini-batch (10)", color: col[1] }, { label: "SGD (1)", color: col[2] }]} />
    </VizFrame>
  );
};

/* ---------------- Classification metrics ---------------- */

export const ClassificationMetrics = () => {
  const [thr, setThr] = useState(0.5);
  const [sep, setSep] = useState(1.5);
  const [prev, setPrev] = useState(0.3);
  // scores are logits ~ N(±sep/2, 1); probability = sigmoid(logit)
  const logit = (p) => Math.log(p / (1 - p));
  const t = logit(thr);
  const P = prev, N = 1 - prev;
  const tpr = 1 - normCdf(t - sep / 2), fpr = 1 - normCdf(t + sep / 2);
  const TP = P * tpr, FN = P - TP, FP = N * fpr, TN = N - FP;
  const prec = TP / (TP + FP || 1), rec = tpr, f1 = (2 * prec * rec) / (prec + rec || 1), acc = TP + TN;
  const roc = linspace(-6, 6, 120).map((tt) => [1 - normCdf(tt + sep / 2), 1 - normCdf(tt - sep / 2)]).reverse();
  const auc = normCdf(sep / Math.SQRT2);
  const xs = linspace(-5, 5, 200);
  const sig = (z) => 1 / (1 + Math.exp(-z));
  const M = 1000;
  return (
    <VizFrame
      title="Threshold, confusion matrix, precision/recall and ROC"
      controls={<><Slider label="Threshold" value={thr} min={0.02} max={0.98} step={0.01} onChange={setThr} /><Slider label="Class separation" value={sep} min={0} max={4} step={0.1} onChange={setSep} /><Slider label="Positive rate" value={prev} min={0.02} max={0.5} step={0.01} onChange={setPrev} format={(v) => `${Math.round(v * 100)}%`} /></>}
      caption={`Logistic regression squashes a score z into a probability σ(z) = 1/(1 + e^(−z)); the threshold turns that into a class. Raising the threshold trades recall for precision. Drop the positive rate to ~2% and accuracy looks great even though precision collapses, which is why accuracy alone misleads on imbalanced data. AUC (area under the ROC curve) = ${auc.toFixed(3)} doesn't depend on the threshold.`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
        <div>
          <div className="text-[12px] text-[#9a9a9a] mb-1">Score distributions (x = logit z, threshold at σ(z) = {thr.toFixed(2)})</div>
          <Plot xd={[-5, 5]} yd={[0, 0.45]} h={200} yTicks={[]} xFmt={(v) => v}>
            {({ sx, sy }) => (
              <>
                <path d={path(xs.map((x) => [x, normPdf(x, -sep / 2) * N / Math.max(N, P)]), sx, sy)} fill="#d9592622" stroke={C.orange} strokeWidth="2" />
                <path d={path(xs.map((x) => [x, normPdf(x, sep / 2) * P / Math.max(N, P)]), sx, sy)} fill="#3987e522" stroke={C.blue} strokeWidth="2" />
                <path d={path(xs.map((x) => [x, sig(x) * 0.42]), sx, sy)} fill="none" stroke={C.muted} strokeDasharray="3 3" />
                <line x1={sx(t)} x2={sx(t)} y1={sy(0)} y2={sy(0.45)} stroke={C.yellow} strokeWidth="2" />
                <text x={sx(t) + 4} y={sy(0.42)} fill={C.yellow} fontSize="11">predict positive →</text>
              </>
            )}
          </Plot>
          <Legend items={[{ label: "actual negatives", color: C.orange }, { label: "actual positives", color: C.blue }, { label: "sigmoid σ(z)", color: C.muted, dash: "3 3" }]} />
        </div>
        <div>
          <div className="text-[12px] text-[#9a9a9a] mb-1">ROC curve</div>
          <Plot xd={[0, 1]} yd={[0, 1]} w={300} h={200} xLabel="FPR" xTicks={[0, 0.5, 1]} yTicks={[0, 0.5, 1]}>
            {({ sx, sy }) => (
              <>
                <line x1={sx(0)} y1={sy(0)} x2={sx(1)} y2={sy(1)} stroke={C.axis} strokeDasharray="3 3" />
                <path d={path(roc, sx, sy)} fill="none" stroke={C.blue} strokeWidth="2" />
                <circle cx={sx(fpr)} cy={sy(tpr)} r="6" fill={C.yellow} stroke={C.surface} strokeWidth="2" />
              </>
            )}
          </Plot>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 items-start">
        <table className="text-[13px] text-center border-collapse">
          <thead><tr><td /><td className="px-3 text-[#9a9a9a]">pred +</td><td className="px-3 text-[#9a9a9a]">pred −</td></tr></thead>
          <tbody className="tabular-nums">
            <tr><td className="pr-2 text-[#9a9a9a] text-right">actual +</td><td className="px-3 py-2 bg-[#199e70]/30 text-white rounded">TP {Math.round(TP * M)}</td><td className="px-3 py-2 bg-[#1c1c1c] text-secondary">FN {Math.round(FN * M)}</td></tr>
            <tr><td className="pr-2 text-[#9a9a9a] text-right">actual −</td><td className="px-3 py-2 bg-[#1c1c1c] text-secondary">FP {Math.round(FP * M)}</td><td className="px-3 py-2 bg-[#199e70]/30 text-white">TN {Math.round(TN * M)}</td></tr>
          </tbody>
        </table>
        <Stat label="Accuracy" value={fmt(acc, 3)} sub="(TP+TN)/all" />
        <Stat label="Precision" value={fmt(prec, 3)} sub="TP/(TP+FP)" />
        <Stat label="Recall" value={fmt(rec, 3)} sub="TP/(TP+FN)" />
        <Stat label="F1" value={fmt(f1, 3)} sub="harmonic mean" />
      </div>
    </VizFrame>
  );
};

/* ---------------- Impurity ---------------- */

export const Impurity = () => {
  const [p, setP] = useState(0.3);
  const H = (q) => (q <= 0 || q >= 1 ? 0 : -q * Math.log2(q) - (1 - q) * Math.log2(1 - q));
  const Gi = (q) => 1 - q * q - (1 - q) ** 2;
  const xs = linspace(0, 1, 200);
  return (
    <VizFrame
      title="Entropy vs Gini impurity for a two-class node"
      controls={<Slider label="Fraction of class 1 in node" value={p} min={0} max={1} step={0.01} onChange={setP} />}
      caption="Both are 0 for a pure node (all one class) and highest for a 50/50 node: entropy peaks at 1 bit, Gini at 0.5. A split is chosen to maximise information gain = parent entropy − weighted child entropy. Gini skips the logarithm, so it is a little cheaper to compute."
    >
      <Plot xd={[0, 1]} yd={[0, 1.05]} xLabel="p (class 1)" tooltip={(x) => <div>p = {fmt(x)}: entropy {fmt(H(x), 3)}, Gini {fmt(Gi(x), 3)}</div>}>
        {({ sx, sy }) => (
          <>
            <path d={path(xs.map((x) => [x, H(x)]), sx, sy)} fill="none" stroke={C.blue} strokeWidth="2" />
            <path d={path(xs.map((x) => [x, Gi(x)]), sx, sy)} fill="none" stroke={C.orange} strokeWidth="2" />
            <circle cx={sx(p)} cy={sy(H(p))} r="6" fill={C.blue} stroke={C.surface} strokeWidth="2" />
            <circle cx={sx(p)} cy={sy(Gi(p))} r="6" fill={C.orange} stroke={C.surface} strokeWidth="2" />
          </>
        )}
      </Plot>
      <div className="flex flex-wrap gap-3 items-center">
        <Legend items={[{ label: "Entropy = −Σ pᵢ log₂ pᵢ", color: C.blue }, { label: "Gini = 1 − Σ pᵢ²", color: C.orange }]} />
        <Stat label="Entropy" value={fmt(H(p), 3)} />
        <Stat label="Gini" value={fmt(Gi(p), 3)} />
      </div>
    </VizFrame>
  );
};

/* ---------------- Clustering ---------------- */

const blobs = (seed) => {
  const r = mulberry32(seed);
  const centers = [[-2, -1.5], [2, -1], [0, 2], [2.5, 2.5]];
  return range(160).map((i) => { const c = centers[i % 4]; return [c[0] + 0.6 * gaussian(r), c[1] + 0.6 * gaussian(r)]; });
};
const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

const kmeans = (pts, k, seed) => {
  const r = mulberry32(seed);
  let cent = range(k).map(() => pts[Math.floor(r() * pts.length)]);
  const frames = [];
  for (let it = 0; it < 12; it++) {
    const lab = pts.map((p) => cent.reduce((b, c, i) => (d2(p, c) < d2(p, cent[b]) ? i : b), 0));
    frames.push({ cent, lab });
    const nc = cent.map((c, i) => { const m = pts.filter((_, j) => lab[j] === i); return m.length ? [m.reduce((s, p) => s + p[0], 0) / m.length, m.reduce((s, p) => s + p[1], 0) / m.length] : c; });
    if (nc.every((c, i) => d2(c, cent[i]) < 1e-10)) break;
    cent = nc;
  }
  const last = frames[frames.length - 1];
  const inertia = pts.reduce((s, p, j) => s + d2(p, last.cent[last.lab[j]]), 0);
  return { frames, inertia };
};

const silhouette = (pts, lab, k) => {
  let tot = 0;
  pts.forEach((p, i) => {
    const mean = (c) => { const m = pts.filter((_, j) => lab[j] === c && j !== i); return m.length ? m.reduce((s, q) => s + Math.sqrt(d2(p, q)), 0) / m.length : 0; };
    const a = mean(lab[i]);
    const b = Math.min(...range(k).filter((c) => c !== lab[i] && lab.includes(c)).map(mean));
    tot += Number.isFinite(b) ? (b - a) / Math.max(a, b) : 0;
  });
  return tot / pts.length;
};

export const KMeans = () => {
  const [k, setK] = useState(4);
  const [seed, setSeed] = useState(2);
  const pts = useMemo(() => blobs(8), []);
  const { frames } = useMemo(() => kmeans(pts, k, seed), [pts, k, seed]);
  const elbow = useMemo(() => range(8).map((i) => [i + 1, kmeans(pts, i + 1, 5).inertia]), [pts]);
  const sil = useMemo(() => range(7).map((i) => { const kk = i + 2; const f = kmeans(pts, kk, 5).frames; return [kk, silhouette(pts, f[f.length - 1].lab, kk)]; }), [pts]);
  const [i, controls] = useStepper(frames.length, 700, `${k}${seed}`);
  const f = frames[Math.min(i, frames.length - 1)];
  return (
    <VizFrame
      title="K-means, the elbow method and silhouette scores"
      controls={<><Slider label="k" value={k} min={1} max={8} onChange={setK} /><Btn onClick={() => setSeed(seed + 1)}>New random init</Btn>{controls}</>}
      caption="Each iteration assigns every point to its nearest centroid (✕), then moves each centroid to the mean of its points, until nothing changes. The data has 4 blobs: inertia (within-cluster sum of squares) bends at k = 4 (the elbow) and the average silhouette s = (b − a)/max(a, b) peaks there."
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-3">
        <Plot xd={[-4.5, 4.5]} yd={[-3.5, 4.5]} h={300}>
          {({ sx, sy }) => (
            <>
              {pts.map((p, j) => <circle key={j} cx={sx(p[0])} cy={sy(p[1])} r="4" fill={SERIES[f.lab[j] % SERIES.length]} stroke={C.surface} strokeWidth="1.5" />)}
              {f.cent.map((c, j) => <text key={j} x={sx(c[0])} y={sy(c[1]) + 7} fontSize="22" fontWeight="700" fill="#fff" textAnchor="middle" stroke={C.surface} strokeWidth="1">✕</text>)}
            </>
          )}
        </Plot>
        <div className="flex flex-col gap-1">
          <div className="text-[12px] text-[#9a9a9a]">Elbow: inertia vs k</div>
          <Plot xd={[1, 8]} yd={[0, Math.max(...elbow.map((e) => e[1])) * 1.05]} w={320} h={140} yFmt={(v) => Math.round(v)}>
            {({ sx, sy }) => <><path d={path(elbow, sx, sy)} fill="none" stroke={C.blue} strokeWidth="2" />{elbow.map(([x, y]) => <circle key={x} cx={sx(x)} cy={sy(y)} r={x === k ? 7 : 4} fill={x === k ? C.yellow : C.blue} stroke={C.surface} strokeWidth="2" />)}</>}
          </Plot>
          <div className="text-[12px] text-[#9a9a9a]">Average silhouette vs k</div>
          <Plot xd={[2, 8]} yd={[0, 0.8]} w={320} h={140} yFmt={(v) => v.toFixed(1)}>
            {({ sx, sy }) => <><path d={path(sil, sx, sy)} fill="none" stroke={C.aqua} strokeWidth="2" />{sil.map(([x, y]) => <circle key={x} cx={sx(x)} cy={sy(y)} r={x === k ? 7 : 4} fill={x === k ? C.yellow : C.aqua} stroke={C.surface} strokeWidth="2" />)}</>}
          </Plot>
        </div>
      </div>
    </VizFrame>
  );
};

const moons = () => {
  const r = mulberry32(42);
  const pts = range(150).map((i) => {
    const t = Math.PI * r();
    return i % 2 ? [Math.cos(t) + 0.08 * gaussian(r), Math.sin(t) + 0.08 * gaussian(r)] : [1 - Math.cos(t) + 0.08 * gaussian(r), 0.5 - Math.sin(t) + 0.08 * gaussian(r)];
  });
  return [...pts, [-0.9, -0.6], [2.1, 1.1], [0.5, 1.4], [1.9, -0.6]];
};

export const DBSCAN = () => {
  const [eps, setEps] = useState(0.22);
  const [minPts, setMinPts] = useState(4);
  const pts = useMemo(moons, []);
  const { lab, type } = useMemo(() => {
    const nb = pts.map((p) => pts.map((q, j) => (d2(p, q) <= eps * eps ? j : -1)).filter((j) => j >= 0));
    const core = nb.map((n) => n.length >= minPts);
    const lab = Array(pts.length).fill(-1);
    let c = 0;
    pts.forEach((_, i) => {
      if (!core[i] || lab[i] !== -1) return;
      const stack = [i];
      lab[i] = c;
      while (stack.length) {
        const u = stack.pop();
        if (!core[u]) continue;
        nb[u].forEach((v) => { if (lab[v] === -1) (lab[v] = c), stack.push(v); });
      }
      c++;
    });
    const type = pts.map((_, i) => (core[i] ? "core" : lab[i] >= 0 ? "border" : "noise"));
    return { lab, type };
  }, [pts, eps, minPts]);
  const nClusters = new Set(lab.filter((l) => l >= 0)).size;
  return (
    <VizFrame
      title="DBSCAN: density-based clustering"
      controls={<><Slider label="ε (radius)" value={eps} min={0.05} max={0.6} step={0.01} onChange={setEps} /><Slider label="min pts" value={minPts} min={2} max={12} onChange={setMinPts} /><Stat label="clusters" value={nClusters} /><Stat label="noise" value={type.filter((t) => t === "noise").length} /></>}
      caption="Core points have at least min pts neighbours within ε (big dots, circle shows ε). Border points are within ε of a core point but are not core themselves (small dots). Noise points are neither (grey ✕). Unlike k-means it finds the two curved 'moons' without being told how many clusters exist."
    >
      <Plot xd={[-1.3, 2.3]} yd={[-0.9, 1.6]} h={300}>
        {({ sx, sy }) => {
          const rpx = sx(eps) - sx(0);
          return pts.map((p, i) => type[i] === "noise"
            ? <text key={i} x={sx(p[0])} y={sy(p[1]) + 4} fontSize="12" fill={C.muted} textAnchor="middle">✕</text>
            : <g key={i}>
                {type[i] === "core" && i % 7 === 0 && <circle cx={sx(p[0])} cy={sy(p[1])} r={rpx} fill="none" stroke={SERIES[lab[i] % SERIES.length]} strokeOpacity="0.35" />}
                <circle cx={sx(p[0])} cy={sy(p[1])} r={type[i] === "core" ? 4.5 : 2.5} fill={SERIES[lab[i] % SERIES.length]} stroke={C.surface} strokeWidth="1" />
              </g>);
        }}
      </Plot>
    </VizFrame>
  );
};

/* ---------------- Regularisation ---------------- */

export const Regularization = () => {
  const [lam, setLam] = useState(1);
  const data = useMemo(() => {
    const r = mulberry32(5);
    const w = [3, -2, 1.5, 0, 0, 0.5];
    return range(80).map(() => { const x = range(6).map(() => gaussian(r)); x[4] = x[0] * 0.8 + 0.3 * gaussian(r); return [x, x.reduce((s, v, i) => s + v * w[i], 0) + gaussian(r)]; });
  }, []);
  const n = data.length;
  const ridge = (l) => solve(range(6).map((i) => range(6).map((j) => data.reduce((s, [x]) => s + x[i] * x[j], 0) / n + (i === j ? l : 0))), range(6).map((i) => data.reduce((s, [x, y]) => s + x[i] * y, 0) / n));
  const lasso = (l) => {
    let w = Array(6).fill(0);
    for (let it = 0; it < 200; it++) for (let j = 0; j < 6; j++) {
      const rho = data.reduce((s, [x, y]) => s + x[j] * (y - x.reduce((t, v, k) => t + (k === j ? 0 : v * w[k]), 0)), 0) / n;
      const z = data.reduce((s, [x]) => s + x[j] ** 2, 0) / n;
      w[j] = Math.sign(rho) * Math.max(0, Math.abs(rho) - l) / z;
    }
    return w;
  };
  const lams = linspace(-2, 1.2, 40).map((e) => 10 ** e);
  const pathsR = useMemo(() => lams.map((l) => ridge(l)), []);
  const pathsL = useMemo(() => lams.map((l) => lasso(l)), []);
  const wr = ridge(lam), wl = lasso(lam);
  const Panel = ({ title, paths, cur }) => (
    <div>
      <div className="text-[12px] text-[#9a9a9a] mb-1">{title}</div>
      <Plot xd={[-2, 1.2]} yd={[-2.5, 3.5]} w={320} h={220} xLabel="log₁₀ λ">
        {({ sx, sy }) => (
          <>
            {range(6).map((j) => <path key={j} d={path(paths.map((w, k) => [Math.log10(lams[k]), w[j]]), sx, sy)} fill="none" stroke={SERIES[j]} strokeWidth="2" />)}
            <line x1={sx(Math.log10(lam))} x2={sx(Math.log10(lam))} y1={sy(-2.5)} y2={sy(3.5)} stroke="#fff" strokeDasharray="4 3" />
            <line x1={sx(-2)} x2={sx(1.2)} y1={sy(0)} y2={sy(0)} stroke={C.axis} />
          </>
        )}
      </Plot>
      <div className="text-[12px] text-secondary font-mono">non-zero: {cur.filter((v) => Math.abs(v) > 1e-3).length}/6</div>
    </div>
  );
  return (
    <VizFrame
      title="Ridge (L2) vs Lasso (L1): coefficient paths"
      controls={<Slider label="λ" value={lam} min={0.01} max={15} step={0.01} onChange={setLam} format={(v) => v.toFixed(2)} />}
      caption="Six features, one useless (true weight 0) and one a near-copy of feature 1. As λ grows, ridge shrinks every coefficient smoothly towards 0 but rarely to exactly 0. Lasso drives coefficients to exactly 0 one by one, which is why L1 doubles as feature selection."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Panel title="Ridge: penalty λΣw²" paths={pathsR} cur={wr} />
        <Panel title="Lasso: penalty λΣ|w|" paths={pathsL} cur={wl} />
      </div>
      <Legend items={range(6).map((j) => ({ label: `w${j + 1}`, color: SERIES[j] }))} />
    </VizFrame>
  );
};

/* ---------------- PCA ---------------- */

export const PCA = () => {
  const [ang, setAng] = useState(30);
  const pts = useMemo(() => { const r = mulberry32(9); return range(120).map(() => { const a = 2 * gaussian(r), b = 0.6 * gaussian(r); const t = Math.PI / 5; return [a * Math.cos(t) - b * Math.sin(t), a * Math.sin(t) + b * Math.cos(t)]; }); }, []);
  const mx = pts.reduce((s, p) => s + p[0], 0) / pts.length, my = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  const cxx = pts.reduce((s, p) => s + (p[0] - mx) ** 2, 0) / pts.length, cyy = pts.reduce((s, p) => s + (p[1] - my) ** 2, 0) / pts.length, cxy = pts.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0) / pts.length;
  const pcAng = (0.5 * Math.atan2(2 * cxy, cxx - cyy) * 180) / Math.PI;
  const t = (ang * Math.PI) / 180, u = [Math.cos(t), Math.sin(t)];
  const proj = pts.map((p) => (p[0] - mx) * u[0] + (p[1] - my) * u[1]);
  const varProj = proj.reduce((s, v) => s + v * v, 0) / proj.length;
  const total = cxx + cyy;
  return (
    <VizFrame
      title="PCA: find the direction of maximum variance"
      controls={<><Slider label="Projection axis" value={ang} min={-90} max={90} onChange={setAng} format={(v) => `${v}°`} /><Btn onClick={() => setAng(Math.round(pcAng))}>Snap to PC1</Btn></>}
      caption={`PCA rotates the axes so the first principal component points along the direction of greatest variance (here ≈ ${pcAng.toFixed(0)}°), the second is orthogonal to it, and so on. Projecting onto PC1 keeps the most information when reducing 2D → 1D. Each PC is an eigenvector of the covariance matrix.`}
    >
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Plot xd={[-5, 5]} yd={[-4, 4]} h={300}>
          {({ sx, sy }) => (
            <>
              <line x1={sx(mx - 6 * u[0])} y1={sy(my - 6 * u[1])} x2={sx(mx + 6 * u[0])} y2={sy(my + 6 * u[1])} stroke={C.yellow} strokeWidth="2" />
              {pts.map((p, i) => { const q = [mx + proj[i] * u[0], my + proj[i] * u[1]]; return <g key={i}><line x1={sx(p[0])} y1={sy(p[1])} x2={sx(q[0])} y2={sy(q[1])} stroke={C.axis} /><circle cx={sx(p[0])} cy={sy(p[1])} r="3.5" fill={C.blue} stroke={C.surface} strokeWidth="1.5" /><circle cx={sx(q[0])} cy={sy(q[1])} r="2" fill={C.yellow} /></g>; })}
            </>
          )}
        </Plot>
        <div className="flex md:flex-col gap-3">
          <Stat label="Variance kept" value={`${((varProj / total) * 100).toFixed(1)}%`} />
          <Stat label="Max possible (PC1)" value={`${((((cxx + cyy) / 2 + Math.sqrt(((cxx - cyy) / 2) ** 2 + cxy ** 2)) / total) * 100).toFixed(1)}%`} />
        </div>
      </div>
    </VizFrame>
  );
};

/* ---------------- A/B testing ---------------- */

export const ABTestPlanner = () => {
  const [base, setBase] = useState(0.1);
  const [mde, setMde] = useState(0.1);
  const [alpha, setAlpha] = useState(0.05);
  const [power, setPower] = useState(0.8);
  const nFor = (rel) => {
    const p1 = base, p2 = base * (1 + rel), pb = (p1 + p2) / 2;
    const za = normInv(1 - alpha / 2), zb = normInv(power);
    return Math.ceil((za * Math.sqrt(2 * pb * (1 - pb)) + zb * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2 / (p2 - p1) ** 2);
  };
  const n = nFor(mde);
  const curve = linspace(0.02, 0.5, 60).map((m) => [m * 100, nFor(m)]);
  return (
    <VizFrame
      title="A/B test sample size planner"
      controls={<><Slider label="Baseline conversion" value={base} min={0.01} max={0.5} step={0.01} onChange={setBase} format={(v) => `${(v * 100).toFixed(0)}%`} /><Slider label="MDE (relative)" value={mde} min={0.02} max={0.5} step={0.01} onChange={setMde} format={(v) => `${(v * 100).toFixed(0)}%`} /><Seg value={alpha} onChange={setAlpha} options={[{ value: 0.1, label: "α 0.10" }, { value: 0.05, label: "α 0.05" }, { value: 0.01, label: "α 0.01" }]} /><Seg value={power} onChange={setPower} options={[{ value: 0.8, label: "power 0.8" }, { value: 0.9, label: "power 0.9" }]} /></>}
      caption="Two-sided test of two proportions. α is the Type I error rate; power = 1 − β is the chance of detecting a real effect of size MDE. Halving the MDE roughly quadruples the users you need, which is why the MDE should be the smallest effect that is actually worth acting on."
    >
      <div className="flex flex-wrap gap-3 mb-2">
        <Stat label="Users per variant" value={n.toLocaleString()} />
        <Stat label="Total users" value={(2 * n).toLocaleString()} />
        <Stat label="Detects" value={`${(base * 100).toFixed(1)}% → ${(base * (1 + mde) * 100).toFixed(2)}%`} />
      </div>
      <Plot xd={[2, 50]} yd={[0, Math.min(Math.max(...curve.map((c) => c[1])), n * 6)]} xLabel="relative MDE (%)" yLabel="users per variant" yFmt={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)} tooltip={(x) => <div>MDE {x.toFixed(0)}% → {nFor(x / 100).toLocaleString()} per variant</div>}>
        {({ sx, sy, }) => <><path d={path(curve, sx, (v) => sy(Math.min(v, n * 6)))} fill="none" stroke={C.blue} strokeWidth="2" /><circle cx={sx(mde * 100)} cy={sy(n)} r="6" fill={C.yellow} stroke={C.surface} strokeWidth="2" /></>}
      </Plot>
    </VizFrame>
  );
};
