import React, { useMemo, useState } from "react";
import { C, SERIES, VizFrame, Seg, Slider, Legend, Plot, path, fmt, linspace, range, mulberry32, gaussian } from "./kit";
import { normInv } from "./stats";

const sampleData = (seed) => {
  const r = mulberry32(seed);
  // a bimodal sample with a couple of outliers, so bin choice and plot choice actually matter
  const d = range(240).map((i) => (i < 160 ? 40 + 7 * gaussian(r) : 68 + 5 * gaussian(r)));
  return [...d, 105, 108, 4];
};

export const HistogramBins = () => {
  const [bw, setBw] = useState(5);
  const [closed, setClosed] = useState("right");
  const data = useMemo(() => sampleData(5), []);
  const lo = 0, hi = 115;
  const nb = Math.ceil((hi - lo) / bw);
  const counts = Array(nb).fill(0);
  data.forEach((v) => {
    let k = closed === "right" ? Math.ceil((v - lo) / bw) - 1 : Math.floor((v - lo) / bw);
    k = Math.max(0, Math.min(nb - 1, k));
    counts[k]++;
  });
  const ym = Math.max(...counts) * 1.15;
  return (
    <VizFrame
      title="Histogram bin width"
      controls={<><Slider label="Bin width" value={bw} min={1} max={30} onChange={setBw} /><Seg value={closed} onChange={setClosed} options={[{ value: "right", label: "(a, b]  right-closed" }, { value: "left", label: "[a, b)  left-closed" }]} /></>}
      caption={`Same ${data.length} values, ${nb} bins. Too wide hides the two modes, too narrow turns into noise, so the default (e.g. ggplot2's 30 bins) is rarely the best choice. R's hist() is right-closed by default; ggplot2 is also right-closed unless you set closed = "left".`}
    >
      <Plot xd={[lo, hi]} yd={[0, ym]} xLabel="value" yLabel="count" tooltip={(x) => { const k = Math.min(nb - 1, Math.floor((x - lo) / bw)); return <div>{closed === "right" ? "(" : "["}{lo + k * bw}, {lo + (k + 1) * bw}{closed === "right" ? "]" : ")"}: {counts[k]}</div>; }}>
        {({ sx, sy }) => counts.map((c, k) => <rect key={k} x={sx(lo + k * bw) + 1} y={sy(c)} width={Math.max(1, sx(lo + (k + 1) * bw) - sx(lo + k * bw) - 2)} height={sy(0) - sy(c)} rx={bw > 3 ? 3 : 1} fill={C.blue} />)}
      </Plot>
    </VizFrame>
  );
};

const quantile = (s, q) => {
  const pos = (s.length - 1) * q, b = Math.floor(pos);
  return s[b] + (s[Math.min(b + 1, s.length - 1)] - s[b]) * (pos - b);
};

export const BoxplotVsDensity = () => {
  const [view, setView] = useState("both");
  const data = useMemo(() => sampleData(5), []);
  const s = [...data].sort((a, b) => a - b);
  const q1 = quantile(s, 0.25), q3 = quantile(s, 0.75), med = quantile(s, 0.5), iqr = q3 - q1;
  const lf = q1 - 1.5 * iqr, uf = q3 + 1.5 * iqr;
  const wl = s.find((v) => v >= lf), wh = [...s].reverse().find((v) => v <= uf);
  const out = s.filter((v) => v < lf || v > uf);
  const bwK = 4;
  const kde = (x) => s.reduce((a, v) => a + Math.exp(-0.5 * ((x - v) / bwK) ** 2), 0) / (s.length * bwK * Math.sqrt(2 * Math.PI));
  const xs = linspace(0, 115, 200);
  return (
    <VizFrame
      title="Boxplot vs density curve"
      controls={<Seg value={view} onChange={setView} options={[{ value: "both", label: "Both" }, { value: "box", label: "Boxplot" }, { value: "density", label: "Density" }]} />}
      caption={`The boxplot summarises median (${fmt(med, 1)}), hinges (Q1 ${fmt(q1, 1)}, Q3 ${fmt(q3, 1)}) and flags ${out.length} outliers beyond 1.5 × IQR from the hinges. It cannot show that this data has two modes; the density curve (and ridgeline plots built from it) can.`}
    >
      <Plot xd={[0, 115]} yd={[0, 0.045]} h={240} xLabel="value" yTicks={[]}>
        {({ sx, sy }) => (
          <>
            {view !== "box" && <path d={path(xs.map((x) => [x, kde(x)]), sx, sy)} fill="#9085e922" stroke={C.violet} strokeWidth="2" />}
            {view !== "density" && (
              <g>
                <line x1={sx(wl)} x2={sx(q1)} y1={sy(0.036)} y2={sy(0.036)} stroke={C.text} />
                <line x1={sx(q3)} x2={sx(wh)} y1={sy(0.036)} y2={sy(0.036)} stroke={C.text} />
                <rect x={sx(q1)} y={sy(0.041)} width={sx(q3) - sx(q1)} height={sy(0.031) - sy(0.041)} rx="4" fill="#3987e533" stroke={C.blue} strokeWidth="2" />
                <line x1={sx(med)} x2={sx(med)} y1={sy(0.041)} y2={sy(0.031)} stroke={C.yellow} strokeWidth="2.5" />
                {[wl, wh].map((v) => <line key={v} x1={sx(v)} x2={sx(v)} y1={sy(0.039)} y2={sy(0.033)} stroke={C.text} />)}
                {out.map((v, i) => <circle key={i} cx={sx(v)} cy={sy(0.036)} r="4.5" fill={C.red} stroke={C.surface} strokeWidth="2"><title>outlier: {fmt(v, 1)}</title></circle>)}
              </g>
            )}
          </>
        )}
      </Plot>
    </VizFrame>
  );
};

export const QQPlot = () => {
  const [kind, setKind] = useState("Normal");
  const pts = useMemo(() => {
    const r = mulberry32(12);
    const n = 150;
    const draw = {
      Normal: () => gaussian(r),
      "t (df = 3)": () => { const z = gaussian(r); const c = gaussian(r) ** 2 + gaussian(r) ** 2 + gaussian(r) ** 2; return z / Math.sqrt(c / 3); },
      "Right-skewed": () => -Math.log(1 - r()) - 1,
    }[kind];
    const s = range(n).map(draw).sort((a, b) => a - b);
    return s.map((v, i) => [normInv((i + 0.5) / n), v]);
  }, [kind]);
  return (
    <VizFrame
      title="Quantile–quantile plot against the normal"
      controls={<Seg value={kind} onChange={setKind} options={["Normal", "t (df = 3)", "Right-skewed"]} />}
      caption="Sample quantiles vs theoretical normal quantiles. Normal data falls on the line; the t-distribution's heavier tails bend away at both ends (an S-shape); skewed data curves away on one side."
    >
      <Plot xd={[-3, 3]} yd={[-5, 5]} h={280} xLabel="theoretical quantile (normal)" yLabel="sample quantile">
        {({ sx, sy }) => (
          <>
            <line x1={sx(-3)} y1={sy(-3)} x2={sx(3)} y2={sy(3)} stroke={C.yellow} strokeDasharray="4 3" />
            {pts.map(([x, y], i) => <circle key={i} cx={sx(x)} cy={sy(Math.max(-5, Math.min(5, y)))} r="3.5" fill={C.blue} stroke={C.surface} strokeWidth="1.5" />)}
          </>
        )}
      </Plot>
    </VizFrame>
  );
};

const loess = (pts, span) => {
  const n = pts.length, k = Math.max(3, Math.round(span * n));
  return pts.map(([x0]) => {
    const d = pts.map(([x]) => Math.abs(x - x0));
    const h = [...d].sort((a, b) => a - b)[k - 1] || 1;
    let sw = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
    pts.forEach(([x, y], i) => {
      const u = d[i] / h;
      const w = u < 1 ? (1 - u ** 3) ** 3 : 0;
      sw += w; sx += w * x; sy += w * y; sxx += w * x * x; sxy += w * x * y;
    });
    const den = sw * sxx - sx * sx;
    const b = den ? (sw * sxy - sx * sy) / den : 0;
    const a = (sy - b * sx) / sw;
    return [x0, a + b * x0];
  });
};

export const LoessSpan = () => {
  const [span, setSpan] = useState(0.75);
  const pts = useMemo(() => {
    const r = mulberry32(21);
    return range(120).map((i) => [i, 20 + 0.08 * i + 6 * Math.sin(i / 9) + 3 * gaussian(r)]);
  }, []);
  const fit = useMemo(() => loess(pts, span), [pts, span]);
  return (
    <VizFrame
      title="LOESS smoothing (geom_smooth)"
      controls={<Slider label="span" value={span} min={0.08} max={1} step={0.01} onChange={setSpan} />}
      caption="LOESS fits a small weighted regression around every point, using the nearest span × n points, and stitches them together; there is no single global equation (non-parametric). A smaller span follows the data more closely (wigglier); a larger span is smoother. R's default span is 0.75."
    >
      <Plot xd={[0, 119]} yd={[5, 45]} xLabel="time" tooltip={(x) => { const p = fit[Math.round(x)]; return p && <div>t = {p[0]}: smooth {fmt(p[1], 1)}, raw {fmt(pts[p[0]][1], 1)}</div>; }}>
        {({ sx, sy }) => (
          <>
            {pts.map(([x, y]) => <circle key={x} cx={sx(x)} cy={sy(y)} r="3" fill={C.muted} opacity="0.6" />)}
            <path d={path(fit, sx, sy)} fill="none" stroke={C.blue} strokeWidth="2.5" />
          </>
        )}
      </Plot>
    </VizFrame>
  );
};

const BAR = { cats: ["Q1", "Q2", "Q3", "Q4"], series: [{ n: "Product A", v: [12, 15, 14, 18] }, { n: "Product B", v: [8, 7, 11, 9] }, { n: "Product C", v: [5, 9, 6, 10] }] };

export const StackedVsGrouped = () => {
  const [mode, setMode] = useState("stacked");
  const W = 600, H = 260, pl = 40, pb = 28, pt = 10;
  const max = mode === "stacked" ? 40 : 20;
  const sy = (v) => H - pb - (v / max) * (H - pb - pt);
  const gw = (W - pl - 10) / BAR.cats.length;
  return (
    <VizFrame
      title="Stacked vs grouped bars"
      controls={<Seg value={mode} onChange={setMode} options={[{ value: "stacked", label: "Stacked" }, { value: "grouped", label: "Grouped" }]} />}
      caption="Stacked bars make the totals easy to compare, but only the bottom segment shares a common baseline. Grouped bars make the comparison across categories (A vs B vs C) easy."
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ minWidth: 320 }}>
        {range(5).map((i) => { const v = (max / 4) * i; return <g key={i}><line x1={pl} x2={W - 10} y1={sy(v)} y2={sy(v)} stroke={C.grid} /><text x={pl - 6} y={sy(v) + 4} fontSize="11" fill={C.muted} textAnchor="end">{v}</text></g>; })}
        {BAR.cats.map((c, ci) => {
          let acc = 0;
          return (
            <g key={c}>
              {BAR.series.map((s, si) => {
                const v = s.v[ci];
                if (mode === "stacked") {
                  const y0 = acc; acc += v;
                  return <rect key={s.n} x={pl + ci * gw + gw * 0.25} y={sy(acc) + 1} width={gw * 0.5} height={sy(y0) - sy(acc) - 2} rx="3" fill={SERIES[si]}><title>{`${s.n} ${c}: ${v}`}</title></rect>;
                }
                const bw = (gw * 0.7) / 3;
                return <rect key={s.n} x={pl + ci * gw + gw * 0.15 + si * bw + 1} y={sy(v)} width={bw - 2} height={sy(0) - sy(v)} rx="3" fill={SERIES[si]}><title>{`${s.n} ${c}: ${v}`}</title></rect>;
              })}
              {mode === "stacked" && <text x={pl + ci * gw + gw / 2} y={sy(acc) - 5} fontSize="11" fill={C.text} textAnchor="middle">{acc}</text>}
              <text x={pl + ci * gw + gw / 2} y={H - 8} fontSize="12" fill={C.muted} textAnchor="middle">{c}</text>
            </g>
          );
        })}
      </svg>
      <Legend items={BAR.series.map((s, i) => ({ label: s.n, color: SERIES[i], box: true }))} />
    </VizFrame>
  );
};

/* Exact Shapley values for a toy model, by enumerating every join order. */
const FEATS = ["CAtBat", "Hits", "Walks", "Years"];
const BASE = { CAtBat: 2600, Hits: 100, Walks: 40, Years: 7 };
const toyModel = (x) => 120 + 0.08 * x.CAtBat + 1.2 * x.Hits - 1.5 * x.Walks + 6 * x.Years + 0.004 * (x.Hits - 100) * (x.Years - 7) * 10;

const perms = (a) => (a.length <= 1 ? [a] : a.flatMap((v, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [v, ...p])));

export const ShapleyValues = () => {
  const [x, setX] = useState({ CAtBat: 5200, Hits: 160, Walks: 70, Years: 12 });
  const phi = useMemo(() => {
    const out = Object.fromEntries(FEATS.map((f) => [f, 0]));
    const P = perms(FEATS);
    P.forEach((order) => {
      const cur = { ...BASE };
      let prev = toyModel(cur);
      order.forEach((f) => {
        cur[f] = x[f];
        const now = toyModel(cur);
        out[f] += (now - prev) / P.length;
        prev = now;
      });
    });
    return out;
  }, [x]);
  const base = toyModel(BASE), pred = toyModel(x);
  const steps = [...FEATS].sort((a, b) => Math.abs(phi[b]) - Math.abs(phi[a]));
  let acc = base;
  const lo = Math.min(base, pred, ...steps.map((f) => (acc += phi[f]))) - 30;
  acc = base;
  const hi = Math.max(base, pred, ...steps.map((f) => (acc += phi[f]))) + 30;
  const W = 600, pl = 80, sx = (v) => pl + ((v - lo) / (hi - lo)) * (W - pl - 20);
  acc = base;
  const ranges = { CAtBat: [500, 9000, 100], Hits: [30, 220, 5], Walks: [5, 120, 5], Years: [1, 20, 1] };
  return (
    <VizFrame
      title="SHAP: exact Shapley values for a toy salary model"
      controls={FEATS.map((f) => <Slider key={f} label={f} value={x[f]} min={ranges[f][0]} max={ranges[f][1]} step={ranges[f][2]} onChange={(v) => setX({ ...x, [f]: v })} />)}
      caption={`Toy model (not fitted to real data): each feature's Shapley value is its marginal contribution averaged over all ${perms(FEATS).length} orders in which features can "join", starting from a baseline row. They always add up exactly: baseline ${fmt(base, 1)} + Σφ = prediction ${fmt(pred, 1)}. Red bars push the prediction down.`}
    >
      <svg viewBox={`0 0 ${W} ${40 + steps.length * 34}`} className="w-full h-auto" style={{ minWidth: 320 }}>
        <text x={sx(base)} y="14" fontSize="11" fill={C.muted} textAnchor="middle">baseline {fmt(base, 0)}</text>
        <line x1={sx(base)} x2={sx(base)} y1="18" y2={30 + steps.length * 34} stroke={C.axis} strokeDasharray="3 3" />
        {steps.map((f, i) => {
          const a = acc, b = (acc += phi[f]);
          const y = 24 + i * 34;
          return (
            <g key={f}>
              <text x={pl - 8} y={y + 16} fontSize="12" fill={C.text} textAnchor="end">{f}</text>
              <rect x={Math.min(sx(a), sx(b))} y={y + 2} width={Math.max(2, Math.abs(sx(b) - sx(a)))} height="22" rx="4" fill={phi[f] >= 0 ? C.blue : C.red} />
              <text x={Math.max(sx(a), sx(b)) + 6} y={y + 17} fontSize="11" fill={C.text}>{phi[f] >= 0 ? "+" : ""}{fmt(phi[f], 1)}</text>
            </g>
          );
        })}
        <line x1={sx(pred)} x2={sx(pred)} y1="18" y2={30 + steps.length * 34} stroke={C.yellow} strokeWidth="2" />
        <text x={sx(pred)} y={38 + steps.length * 34} fontSize="11" fill={C.yellow} textAnchor="middle">prediction {fmt(pred, 0)}</text>
      </svg>
      <Legend items={[{ label: "raises prediction", color: C.blue, box: true }, { label: "lowers prediction", color: C.red, box: true }]} />
    </VizFrame>
  );
};

export const PartialDependence = () => {
  const [mode, setMode] = useState("ice");
  // toy model with an interaction, so individual ICE lines diverge from the average PDP
  const rows = useMemo(() => { const r = mulberry32(31); return range(25).map(() => ({ z: r() * 2 - 1, off: gaussian(r) * 3 })); }, []);
  const f = (x, row) => 10 + row.off + 4 * Math.sin(x) + 3 * row.z * x;
  const xs = linspace(0, 4, 50);
  const lines = rows.map((row) => xs.map((x) => [x, f(x, row) - (mode === "cice" ? f(0, row) : 0)]));
  const pdp = xs.map((x, i) => [x, lines.reduce((s, l) => s + l[i][1], 0) / lines.length]);
  const ys = lines.flat().map((p) => p[1]);
  return (
    <VizFrame
      title="Partial dependence vs ICE vs centered ICE"
      controls={<Seg value={mode} onChange={setMode} options={[{ value: "pdp", label: "PDP only" }, { value: "ice", label: "ICE" }, { value: "cice", label: "Centered ICE" }]} />}
      caption="ICE draws one line per row: set the feature to each value, keep the row's other features, and predict. The PDP (yellow) is the average of those lines. Here the feature interacts with another one, so the flat-looking PDP hides lines going up and down; centering every line at the same start point makes that variation obvious."
    >
      <Plot xd={[0, 4]} yd={[Math.min(...ys) - 1, Math.max(...ys) + 1]} xLabel="feature value" yLabel="prediction">
        {({ sx, sy }) => (
          <>
            {mode !== "pdp" && lines.map((l, i) => <path key={i} d={path(l, sx, sy)} fill="none" stroke={C.blue} strokeWidth="1" opacity="0.45" />)}
            <path d={path(pdp, sx, sy)} fill="none" stroke={C.yellow} strokeWidth="3" />
          </>
        )}
      </Plot>
      <Legend items={[{ label: "individual rows (ICE)", color: C.blue }, { label: "average (PDP)", color: C.yellow }]} />
    </VizFrame>
  );
};
