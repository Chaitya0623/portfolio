import React, { useMemo, useState } from "react";
import { C, VizFrame, Seg, Slider, Btn, Legend, Plot, Stat, path, fmt, linspace, range, mulberry32, gaussian } from "./kit";

/* ---------------- math helpers ---------------- */

const LANCZOS = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
export const lgamma = (z) => {
  if (z < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * z))) - lgamma(1 - z);
  z -= 1;
  let x = 0.99999999999980993;
  LANCZOS.forEach((c, i) => (x += c / (z + i + 1)));
  const t = z + LANCZOS.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
};
export const normPdf = (x, m = 0, s = 1) => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));
const erf = (x) => {
  // Abramowitz & Stegun 7.1.26
  const s = Math.sign(x), a = Math.abs(x), t = 1 / (1 + 0.3275911 * a);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return s * y;
};
export const normCdf = (x) => 0.5 * (1 + erf(x / Math.SQRT2));
export const normInv = (p) => {
  // bisection is plenty for UI precision
  let lo = -10, hi = 10;
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2;
    normCdf(m) < p ? (lo = m) : (hi = m);
  }
  return (lo + hi) / 2;
};
const binomPmf = (k, n, p) => Math.exp(lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1) + k * Math.log(p) + (n - k) * Math.log(1 - p));
const poisPmf = (k, l) => Math.exp(k * Math.log(l) - l - lgamma(k + 1));
const betaPdf = (x, a, b) => (x <= 0 || x >= 1 ? 0 : Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) + lgamma(a + b) - lgamma(a) - lgamma(b)));

const Bars = ({ data, sx, sy, color, w = 0.7, title }) =>
  data.map(([x, y]) => (
    <rect key={x} x={sx(x - w / 2)} y={sy(y)} width={Math.max(1, sx(x + w / 2) - sx(x - w / 2) - 2)} height={Math.max(0, sy(0) - sy(y))} rx="3" fill={color}>
      {title && <title>{title(x, y)}</title>}
    </rect>
  ));

/* ---------------- Mathematics ---------------- */

export const Eigenvectors = () => {
  const [m, setM] = useState({ a: 2, b: 1, c: 1, d: 2 });
  const [th, setTh] = useState(20);
  const { a, b, c, d } = m;
  const tr = a + d, det = a * d - b * c, disc = tr * tr - 4 * det;
  const eig = disc >= 0 ? [(tr + Math.sqrt(disc)) / 2, (tr - Math.sqrt(disc)) / 2] : null;
  const evec = (l) => {
    const v = Math.abs(b) > 1e-9 ? [b, l - a] : Math.abs(c) > 1e-9 ? [l - d, c] : l === a ? [1, 0] : [0, 1];
    const n = Math.hypot(...v);
    return [v[0] / n, v[1] / n];
  };
  const x = [Math.cos((th * Math.PI) / 180), Math.sin((th * Math.PI) / 180)];
  const Ax = [a * x[0] + b * x[1], c * x[0] + d * x[1]];
  const cross = x[0] * Ax[1] - x[1] * Ax[0];
  const aligned = Math.abs(cross) < 0.06 * Math.hypot(...Ax);
  const S = 40, O = 160;
  const P = ([u, v]) => [O + u * S, O - v * S];
  const circle = linspace(0, 2 * Math.PI, 80).map((t) => [Math.cos(t), Math.sin(t)]);
  const ell = circle.map(([u, v]) => [a * u + b * v, c * u + d * v]);
  const Arrow = ({ v, color, label, wdt = 2.5 }) => {
    const [x2, y2] = P(v);
    return (
      <g>
        <line x1={O} y1={O} x2={x2} y2={y2} stroke={color} strokeWidth={wdt} markerEnd={`url(#ah-${color.slice(1)})`} />
        <text x={x2 + 6} y={y2 - 6} fill={C.text} fontSize="12">{label}</text>
        <defs><marker id={`ah-${color.slice(1)}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={color} /></marker></defs>
      </g>
    );
  };
  const slot = (k) => <Slider key={k} label={k} value={m[k]} min={-3} max={3} step={0.5} onChange={(v) => setM({ ...m, [k]: v })} />;
  return (
    <VizFrame
      title="Eigenvectors: directions a matrix only stretches"
      controls={
        <>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">{["a", "b", "c", "d"].map(slot)}</div>
          <Slider label="Rotate x" value={th} min={0} max={360} onChange={setTh} format={(v) => `${v}°`} />
        </>
      }
      caption="A = [[a, b], [c, d]] maps the unit circle to the ellipse. Rotate the input vector x: when x lines up with an eigenvector, Ax points the same way (or exactly opposite), scaled by λ. If the eigenvalues are complex (e.g. a pure rotation), no such real direction exists."
    >
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <svg viewBox="0 0 320 320" className="w-full max-w-[340px] h-auto">
          {range(9).map((i) => (
            <g key={i}>
              <line x1={O + (i - 4) * S} x2={O + (i - 4) * S} y1="0" y2="320" stroke={C.grid} />
              <line y1={O + (i - 4) * S} y2={O + (i - 4) * S} x1="0" x2="320" stroke={C.grid} />
            </g>
          ))}
          <path d={circle.map((p, i) => `${i ? "L" : "M"}${P(p).join(",")}`).join("")} fill="none" stroke={C.axis} strokeDasharray="4 3" />
          <path d={ell.map((p, i) => `${i ? "L" : "M"}${P(p).join(",")}`).join("")} fill="#3987e514" stroke={C.blue} strokeWidth="2" />
          {eig && [0, 1].map((k) => {
            const v = evec(eig[k]);
            return <line key={k} x1={O - v[0] * 200} y1={O + v[1] * 200} x2={O + v[0] * 200} y2={O - v[1] * 200} stroke={C.violet} strokeDasharray="6 4" />;
          })}
          <Arrow v={x} color={C.yellow} label="x" />
          <Arrow v={Ax} color={aligned ? C.aqua : C.orange} label="Ax" />
        </svg>
        <div className="flex flex-wrap gap-3">
          <Stat label="trace" value={fmt(tr)} />
          <Stat label="det" value={fmt(det)} />
          <Stat label="λ₁, λ₂" value={eig ? `${fmt(eig[0])}, ${fmt(eig[1])}` : "complex"} />
          <Stat label="x is eigenvector?" value={aligned ? "yes ✓" : "no"} sub={aligned ? `Ax ≈ ${fmt(Math.hypot(...Ax) * Math.sign(Ax[0] * x[0] + Ax[1] * x[1]))}·x` : "direction changed"} />
        </div>
      </div>
      <Legend items={[{ label: "eigenvector directions", color: C.violet, dash: "6 4" }, { label: "input x", color: C.yellow }, { label: "output Ax", color: C.orange }]} />
    </VizFrame>
  );
};

export const KLDivergence = () => {
  const [m1, setM1] = useState(0), [s1, setS1] = useState(1), [m2, setM2] = useState(1), [s2, setS2] = useState(1.6);
  const kl = (ma, sa, mb, sb) => Math.log(sb / sa) + (sa * sa + (ma - mb) ** 2) / (2 * sb * sb) - 0.5;
  const xs = linspace(-6, 6, 200);
  const ent = (s) => 0.5 * Math.log(2 * Math.PI * Math.E * s * s);
  return (
    <VizFrame
      title="KL divergence between two Gaussians"
      controls={
        <>
          <Slider label="μ of P" value={m1} min={-3} max={3} step={0.1} onChange={setM1} />
          <Slider label="σ of P" value={s1} min={0.3} max={3} step={0.1} onChange={setS1} />
          <Slider label="μ of Q" value={m2} min={-3} max={3} step={0.1} onChange={setM2} />
          <Slider label="σ of Q" value={s2} min={0.3} max={3} step={0.1} onChange={setS2} />
        </>
      }
      caption="KL divergence is 0 only when the two distributions are identical, and it is not symmetric: D(P‖Q) ≠ D(Q‖P) whenever the spreads differ. That is why it is called a divergence and not a distance. Entropy (in nats) grows with the spread."
    >
      <Plot xd={[-6, 6]} yd={[0, Math.max(normPdf(0, 0, s1), normPdf(0, 0, s2)) * 1.1]} xLabel="x" yLabel="density" yFmt={(v) => v.toFixed(2)}
        tooltip={(x) => <div><div className="text-white">x = {fmt(x)}</div><div>p(x) = {fmt(normPdf(x, m1, s1), 3)}</div><div>q(x) = {fmt(normPdf(x, m2, s2), 3)}</div></div>}>
        {({ sx, sy }) => (
          <>
            <path d={path(xs.map((x) => [x, normPdf(x, m1, s1)]), sx, sy)} fill="none" stroke={C.blue} strokeWidth="2" />
            <path d={path(xs.map((x) => [x, normPdf(x, m2, s2)]), sx, sy)} fill="none" stroke={C.orange} strokeWidth="2" />
          </>
        )}
      </Plot>
      <div className="flex flex-wrap gap-3 mt-2 items-center">
        <Legend items={[{ label: "P", color: C.blue }, { label: "Q", color: C.orange }]} />
        <Stat label="D(P‖Q)" value={fmt(kl(m1, s1, m2, s2), 3)} />
        <Stat label="D(Q‖P)" value={fmt(kl(m2, s2, m1, s1), 3)} />
        <Stat label="H(P)" value={fmt(ent(s1), 3)} />
        <Stat label="H(Q)" value={fmt(ent(s2), 3)} />
      </div>
    </VizFrame>
  );
};

const rank = (arr) => {
  const idx = arr.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
  const r = Array(arr.length);
  idx.forEach(([, i], k) => (r[i] = k + 1));
  return r;
};
const pearson = (x, y) => {
  const n = x.length, mx = x.reduce((a, b) => a + b) / n, my = y.reduce((a, b) => a + b) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) (sxy += (x[i] - mx) * (y[i] - my)), (sxx += (x[i] - mx) ** 2), (syy += (y[i] - my) ** 2);
  return { r: sxy / Math.sqrt(sxx * syy), byx: sxy / sxx, bxy: sxy / syy, mx, my };
};

export const Correlation = () => {
  const [rho, setRho] = useState(0.7);
  const [outlier, setOutlier] = useState(false);
  const [seed, setSeed] = useState(3);
  const pts = useMemo(() => {
    const r = mulberry32(seed);
    const p = range(60).map(() => {
      const a = gaussian(r), b = gaussian(r);
      return [a, rho * a + Math.sqrt(1 - rho * rho) * b];
    });
    if (outlier) p.push([3.2, -3.2]);
    return p;
  }, [rho, outlier, seed]);
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const { r, byx, bxy, mx, my } = pearson(xs, ys);
  const rx = rank(xs), ry = rank(ys);
  const n = xs.length;
  const d2 = rx.reduce((s, v, i) => s + (v - ry[i]) ** 2, 0);
  const spear = 1 - (6 * d2) / (n * (n * n - 1));
  return (
    <VizFrame
      title="Pearson vs Spearman, and the regression line of Y on X"
      controls={
        <>
          <Slider label="True correlation" value={rho} min={-0.95} max={0.95} step={0.05} onChange={setRho} />
          <label className="flex items-center gap-2 text-[13px] text-secondary"><input type="checkbox" checked={outlier} onChange={() => setOutlier(!outlier)} className="accent-[#d55181]" />add an outlier</label>
          <Btn onClick={() => setSeed(seed + 1)}>Resample</Btn>
        </>
      }
      caption="Pearson's r measures linear association and is pulled around by outliers; Spearman's ρ works on ranks, so it is more robust. The line is Y − Ȳ = b_yx (X − X̄), and r = ±√(b_yx · b_xy), taking the common sign of the two regression coefficients."
    >
      <Plot xd={[-3.5, 3.5]} yd={[-3.5, 3.5]} h={300} xLabel="X" yLabel="Y">
        {({ sx, sy }) => (
          <>
            {pts.map(([x, y], i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={i === 60 ? 6 : 4} fill={i === 60 ? C.magenta : C.blue} stroke={C.surface} strokeWidth="2" opacity="0.9"><title>{`(${fmt(x)}, ${fmt(y)})`}</title></circle>)}
            <path d={path([[-3.5, my + byx * (-3.5 - mx)], [3.5, my + byx * (3.5 - mx)]], sx, sy)} stroke={C.yellow} strokeWidth="2" />
          </>
        )}
      </Plot>
      <div className="flex flex-wrap gap-3">
        <Stat label="Pearson r" value={fmt(r)} />
        <Stat label="Spearman ρ" value={fmt(spear)} />
        <Stat label="b_yx" value={fmt(byx)} />
        <Stat label="±√(b_yx·b_xy)" value={fmt(Math.sign(byx) * Math.sqrt(byx * bxy))} />
      </div>
    </VizFrame>
  );
};

/* ---------------- Statistics ---------------- */

export const Distributions = () => {
  const [dist, setDist] = useState("Binomial");
  const [n, setN] = useState(20), [p, setP] = useState(0.3), [lam, setLam] = useState(4);
  const [mu, setMu] = useState(0), [sd, setSd] = useState(1), [ua, setUa] = useState(1), [ub, setUb] = useState(5);
  let plot, mean, variance, controls;
  if (dist === "Binomial" || dist === "Poisson") {
    const K = dist === "Binomial" ? n : Math.max(15, Math.ceil(lam * 3));
    const data = range(K + 1).map((k) => [k, dist === "Binomial" ? binomPmf(k, n, p) : poisPmf(k, lam)]);
    mean = dist === "Binomial" ? n * p : lam;
    variance = dist === "Binomial" ? n * p * (1 - p) : lam;
    const ym = Math.max(...data.map((d) => d[1])) * 1.15;
    plot = (
      <Plot xd={[-0.5, K + 0.5]} yd={[0, ym]} xLabel="k" yLabel="P(X = k)" yFmt={(v) => v.toFixed(2)}
        tooltip={(x) => { const k = Math.round(x); const d = data[k]; return d && <div>P(X = {k}) = {fmt(d[1], 4)}</div>; }}>
        {({ sx, sy }) => <><Bars data={data} sx={sx} sy={sy} color={C.blue} /><line x1={sx(mean)} x2={sx(mean)} y1={sy(0)} y2={sy(ym)} stroke={C.yellow} strokeDasharray="4 3" /></>}
      </Plot>
    );
    controls = dist === "Binomial"
      ? <><Slider label="n" value={n} min={1} max={50} onChange={setN} /><Slider label="p" value={p} min={0.01} max={0.99} step={0.01} onChange={setP} /></>
      : <Slider label="λ" value={lam} min={0.5} max={20} step={0.5} onChange={setLam} />;
  } else {
    let f, xd;
    if (dist === "Normal") (f = (x) => normPdf(x, mu, sd)), (xd = [-8, 8]), (mean = mu), (variance = sd * sd);
    if (dist === "Exponential") (f = (x) => (x < 0 ? 0 : lam * Math.exp(-lam * x))), (xd = [0, Math.max(3, 5 / lam)]), (mean = 1 / lam), (variance = 1 / (lam * lam));
    const a = Math.min(ua, ub - 0.5), b = Math.max(ub, ua + 0.5);
    if (dist === "Uniform") (f = (x) => (x >= a && x <= b ? 1 / (b - a) : 0)), (xd = [0, 10]), (mean = (a + b) / 2), (variance = (b - a) ** 2 / 12);
    const xs = linspace(xd[0], xd[1], 400);
    const ym = Math.max(...xs.map(f)) * 1.15;
    plot = (
      <Plot xd={xd} yd={[0, ym]} xLabel="x" yLabel="f(x)" yFmt={(v) => v.toFixed(2)} tooltip={(x) => <div>f({fmt(x)}) = {fmt(f(x), 4)}</div>}>
        {({ sx, sy }) => (
          <>
            <path d={path(xs.map((x) => [x, f(x)]), sx, sy) + `L${sx(xd[1])},${sy(0)}L${sx(xd[0])},${sy(0)}Z`} fill="#3987e522" />
            <path d={path(xs.map((x) => [x, f(x)]), sx, sy)} fill="none" stroke={C.blue} strokeWidth="2" />
            <line x1={sx(mean)} x2={sx(mean)} y1={sy(0)} y2={sy(ym)} stroke={C.yellow} strokeDasharray="4 3" />
          </>
        )}
      </Plot>
    );
    controls = dist === "Normal"
      ? <><Slider label="μ" value={mu} min={-4} max={4} step={0.1} onChange={setMu} /><Slider label="σ" value={sd} min={0.3} max={3} step={0.1} onChange={setSd} /></>
      : dist === "Exponential" ? <Slider label="λ" value={lam} min={0.5} max={5} step={0.5} onChange={setLam} />
      : <><Slider label="a" value={ua} min={0} max={9} step={0.5} onChange={setUa} /><Slider label="b" value={ub} min={1} max={10} step={0.5} onChange={setUb} /></>;
  }
  const formulas = {
    Binomial: "μ = np, σ² = np(1 − p)",
    Poisson: "μ = λ, σ² = λ",
    Normal: "μ, σ² as set",
    Exponential: "μ = 1/λ, σ² = 1/λ²",
    Uniform: "μ = (a + b)/2, σ² = (b − a)²/12",
  }[dist];
  return (
    <VizFrame
      title="Probability distribution explorer"
      controls={<><Seg value={dist} onChange={setDist} options={["Binomial", "Poisson", "Normal", "Uniform", "Exponential"]} />{controls}</>}
      caption={`Discrete distributions have a PMF (bars), continuous ones a PDF (curve) whose area integrates to 1. The dashed line is the mean. ${formulas}.`}
    >
      {plot}
      <div className="flex gap-3 mt-1"><Stat label="Mean" value={fmt(mean, 3)} /><Stat label="Variance" value={fmt(variance, 3)} /><Stat label="Std dev" value={fmt(Math.sqrt(variance), 3)} /></div>
    </VizFrame>
  );
};

const POPS = {
  Exponential: { draw: (r) => -Math.log(1 - r()), mu: 1, sd: 1 },
  Uniform: { draw: (r) => r() * 2, mu: 1, sd: 2 / Math.sqrt(12) },
  Bimodal: { draw: (r) => (r() < 0.5 ? 0.2 : 1.8) + 0.15 * gaussian(r), mu: 1, sd: Math.sqrt(0.81 + 0.0225) },
};

export const CentralLimit = () => {
  const [pop, setPop] = useState("Exponential");
  const [n, setN] = useState(5);
  const [seed, setSeed] = useState(1);
  const P = POPS[pop];
  const { means, raw } = useMemo(() => {
    const r = mulberry32(seed * 101 + n);
    const raw = range(3000).map(() => P.draw(r));
    const means = range(2000).map(() => range(n).reduce((s) => s + P.draw(r), 0) / n);
    return { means, raw };
  }, [pop, n, seed]);
  const hist = (arr, lo, hi, bins) => {
    const w = (hi - lo) / bins, c = Array(bins).fill(0);
    arr.forEach((v) => { const k = Math.floor((v - lo) / w); if (k >= 0 && k < bins) c[k]++; });
    return c.map((v, k) => [lo + (k + 0.5) * w, v / (arr.length * w)]);
  };
  const H1 = hist(raw, 0, 4, 40), H2 = hist(means, 0, 2.5, 50);
  const se = P.sd / Math.sqrt(n);
  const xs = linspace(0, 2.5, 200);
  const ym2 = Math.max(normPdf(P.mu, P.mu, se), ...H2.map((h) => h[1])) * 1.1;
  return (
    <VizFrame
      title="Central Limit Theorem"
      controls={<><Seg value={pop} onChange={setPop} options={Object.keys(POPS)} /><Slider label="Sample size n" value={n} min={1} max={50} onChange={setN} /><Btn onClick={() => setSeed(seed + 1)}>Resample</Btn></>}
      caption={`Left: the population, which is clearly not normal. Right: 2,000 means of samples of size n, with the N(μ, σ²/n) curve on top. As n grows, the sample means become normal regardless of the population's shape, and the spread shrinks like σ/√n (here ${fmt(se, 3)}).`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <div className="text-[12px] text-[#9a9a9a] mb-1">Population</div>
          <Plot xd={[0, 4]} yd={[0, Math.max(...H1.map((h) => h[1])) * 1.1]} w={360} h={230} yFmt={(v) => v.toFixed(1)}>
            {({ sx, sy }) => <Bars data={H1} sx={sx} sy={sy} color={C.violet} w={0.1} />}
          </Plot>
        </div>
        <div>
          <div className="text-[12px] text-[#9a9a9a] mb-1">Distribution of sample means</div>
          <Plot xd={[0, 2.5]} yd={[0, ym2]} w={360} h={230} yFmt={(v) => v.toFixed(1)}>
            {({ sx, sy }) => <><Bars data={H2} sx={sx} sy={sy} color={C.blue} w={0.05} /><path d={path(xs.map((x) => [x, normPdf(x, P.mu, se)]), sx, sy)} fill="none" stroke={C.yellow} strokeWidth="2" /></>}
          </Plot>
        </div>
      </div>
      <Legend items={[{ label: "sample means", color: C.blue, box: true }, { label: "N(μ, σ²/n)", color: C.yellow }]} />
    </VizFrame>
  );
};

export const MonteCarloPi = () => {
  const [N, setN] = useState(500);
  const [seed, setSeed] = useState(4);
  const pts = useMemo(() => { const r = mulberry32(seed); return range(5000).map(() => [r(), r()]); }, [seed]);
  const shown = pts.slice(0, N);
  const inside = shown.filter(([x, y]) => x * x + y * y <= 1).length;
  const est = (4 * inside) / N;
  const curve = [10, 25, 50, 100, 200, 400, 700, 1000, 1500, 2000, 3000, 4000, 5000].filter((k) => k <= N).map((k) => [k, (4 * pts.slice(0, k).filter(([x, y]) => x * x + y * y <= 1).length) / k]);
  return (
    <VizFrame
      title="Monte Carlo: estimating π by random sampling"
      controls={<><Slider label="Samples" value={N} min={10} max={5000} step={10} onChange={setN} /><Btn onClick={() => setSeed(seed + 1)}>New random draw</Btn></>}
      caption="Throw random points into a unit square. The fraction landing inside the quarter circle approaches π/4 (law of large numbers), so π ≈ 4 × inside / total. The error shrinks roughly like 1/√N: more simulations, more accurate results, but more computation."
    >
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 items-center">
        <svg viewBox="0 0 220 220" className="w-full max-w-[260px] h-auto">
          <rect x="10" y="10" width="200" height="200" fill="none" stroke={C.axis} />
          {shown.map(([x, y], i) => <circle key={i} cx={10 + x * 200} cy={210 - y * 200} r="1.6" fill={x * x + y * y <= 1 ? C.blue : C.orange} />)}
          <path d="M10,10 A200,200 0 0,1 210,210" fill="none" stroke={C.yellow} strokeWidth="2" />
        </svg>
        <div>
          <div className="flex gap-3 mb-2"><Stat label="Estimate" value={est.toFixed(4)} /><Stat label="Error" value={(est - Math.PI).toFixed(4)} /></div>
          <Plot xd={[0, Math.max(N, 50)]} yd={[2.6, 3.7]} h={180} xLabel="samples" yFmt={(v) => v.toFixed(1)}>
            {({ sx, sy }) => <><line x1={sx(0)} x2={sx(Math.max(N, 50))} y1={sy(Math.PI)} y2={sy(Math.PI)} stroke={C.yellow} strokeDasharray="4 3" /><path d={path(curve, sx, sy)} fill="none" stroke={C.blue} strokeWidth="2" />{curve.map(([k, v]) => <circle key={k} cx={sx(k)} cy={sy(v)} r="4" fill={C.blue} stroke={C.surface} strokeWidth="2" />)}</>}
          </Plot>
        </div>
      </div>
    </VizFrame>
  );
};

export const BayesUpdate = () => {
  const [a, setA] = useState(2), [b, setB] = useState(2), [k, setK] = useState(7), [n, setN] = useState(10);
  const kk = Math.min(k, n);
  const xs = linspace(0.001, 0.999, 300);
  const lik = (x) => betaPdf(x, kk + 1, n - kk + 1);
  const ym = Math.min(12, Math.max(...xs.map((x) => Math.max(betaPdf(x, a, b), lik(x), betaPdf(x, a + kk, b + n - kk))))) * 1.1;
  const clip = (v) => Math.min(v, ym);
  return (
    <VizFrame
      title="Bayesian updating with a conjugate (Beta–Binomial) prior"
      controls={<><Slider label="Prior α" value={a} min={0.5} max={40} step={0.5} onChange={setA} /><Slider label="Prior β" value={b} min={0.5} max={40} step={0.5} onChange={setB} /><Slider label="Successes" value={kk} min={0} max={n} onChange={setK} /><Slider label="Trials" value={n} min={1} max={100} onChange={setN} /></>}
      caption={`Beta prior × binomial likelihood = Beta(α + k, β + n − k) posterior: same family as the prior, which is what conjugacy means. Make the prior tight (large α, β) and the posterior barely moves (a mild update); add many trials (a precise signal) and the data dominate (a strong update). Posterior mean = ${fmt((a + kk) / (a + b + n), 3)}.`}
    >
      <Plot xd={[0, 1]} yd={[0, ym]} xLabel="θ (success probability)" yLabel="density" yFmt={(v) => v.toFixed(0)}
        tooltip={(x) => <div><div className="text-white">θ = {fmt(x)}</div><div>prior {fmt(betaPdf(x, a, b))}</div><div>likelihood {fmt(lik(x))}</div><div>posterior {fmt(betaPdf(x, a + kk, b + n - kk))}</div></div>}>
        {({ sx, sy }) => (
          <>
            <path d={path(xs.map((x) => [x, clip(betaPdf(x, a, b))]), sx, sy)} fill="none" stroke={C.violet} strokeWidth="2" strokeDasharray="5 4" />
            <path d={path(xs.map((x) => [x, clip(lik(x))]), sx, sy)} fill="none" stroke={C.orange} strokeWidth="2" />
            <path d={path(xs.map((x) => [x, clip(betaPdf(x, a + kk, b + n - kk))]), sx, sy)} fill="none" stroke={C.aqua} strokeWidth="2.5" />
          </>
        )}
      </Plot>
      <Legend items={[{ label: `prior Beta(${a}, ${b})`, color: C.violet, dash: "5 4" }, { label: "likelihood (normalised)", color: C.orange }, { label: `posterior Beta(${a + kk}, ${b + n - kk})`, color: C.aqua }]} />
    </VizFrame>
  );
};

export const PValue = () => {
  const [z, setZ] = useState(2.1);
  const [tails, setTails] = useState("two");
  const [alpha, setAlpha] = useState(0.05);
  const p = tails === "two" ? 2 * (1 - normCdf(Math.abs(z))) : 1 - normCdf(z);
  const crit = tails === "two" ? normInv(1 - alpha / 2) : normInv(1 - alpha);
  const xs = linspace(-4, 4, 300);
  const shade = (lo, hi, sx, sy) => {
    const seg = linspace(lo, hi, 60);
    return path(seg.map((x) => [x, normPdf(x)]), sx, sy) + `L${sx(hi)},${sy(0)}L${sx(lo)},${sy(0)}Z`;
  };
  return (
    <VizFrame
      title="z-test: p-value and the rejection region"
      controls={<><Slider label="Test statistic z" value={z} min={-4} max={4} step={0.05} onChange={setZ} /><Seg value={tails} onChange={setTails} options={[{ value: "two", label: "two-tailed" }, { value: "right", label: "right-tailed" }]} /><Seg value={alpha} onChange={setAlpha} options={[{ value: 0.1, label: "α 0.10" }, { value: 0.05, label: "α 0.05" }, { value: 0.01, label: "α 0.01" }]} /></>}
      caption="Under H₀ the statistic follows N(0, 1). The p-value (shaded) is the probability of a result at least as extreme as the one observed, assuming H₀ is true. Reject H₀ when p ≤ α, which is the same as z landing beyond the critical value (dashed)."
    >
      <Plot xd={[-4, 4]} yd={[0, 0.45]} xLabel="z" yFmt={(v) => v.toFixed(1)}>
        {({ sx, sy }) => {
          const az = Math.abs(z);
          return (
            <>
              <path d={path(xs.map((x) => [x, normPdf(x)]), sx, sy)} fill="none" stroke={C.blue} strokeWidth="2" />
              {tails === "two" ? <><path d={shade(az, 4, sx, sy)} fill={C.magenta} opacity="0.5" /><path d={shade(-4, -az, sx, sy)} fill={C.magenta} opacity="0.5" /></> : z < 4 && <path d={shade(z, 4, sx, sy)} fill={C.magenta} opacity="0.5" />}
              {(tails === "two" ? [crit, -crit] : [crit]).map((c) => <line key={c} x1={sx(c)} x2={sx(c)} y1={sy(0)} y2={sy(0.42)} stroke={C.yellow} strokeDasharray="4 3" />)}
              <line x1={sx(z)} x2={sx(z)} y1={sy(0)} y2={sy(normPdf(z)) - 12} stroke="#fff" strokeWidth="2" />
              <text x={sx(z)} y={sy(normPdf(z)) - 16} fill="#fff" fontSize="12" textAnchor="middle">z = {z.toFixed(2)}</text>
            </>
          );
        }}
      </Plot>
      <div className="flex flex-wrap gap-3">
        <Stat label="p-value" value={p < 0.0001 ? "< 0.0001" : p.toFixed(4)} />
        <Stat label="critical z" value={`±${crit.toFixed(3)}`.replace("±", tails === "two" ? "±" : "")} />
        <Stat label="decision" value={p <= alpha ? "reject H₀" : "fail to reject"} />
      </div>
    </VizFrame>
  );
};

const target = (x) => 0.35 * normPdf(x, -2, 0.7) + 0.65 * normPdf(x, 1.5, 1);

export const Metropolis = () => {
  const [step, setStep] = useState(1);
  const [N, setN] = useState(2000);
  const [seed, setSeed] = useState(9);
  const { chain, acc } = useMemo(() => {
    const r = mulberry32(seed);
    let x = 0, a = 0;
    const out = [];
    for (let i = 0; i < 6000; i++) {
      const prop = x + step * gaussian(r);
      // symmetric Gaussian proposal, so the Hastings correction cancels
      if (r() < Math.min(1, target(prop) / target(x))) (x = prop), a++;
      out.push(x);
    }
    return { chain: out, acc: a / 6000 };
  }, [step, seed]);
  const c = chain.slice(0, N);
  const bins = 60, lo = -5, hi = 5, w = (hi - lo) / bins;
  const counts = Array(bins).fill(0);
  c.forEach((v) => { const k = Math.floor((v - lo) / w); if (k >= 0 && k < bins) counts[k]++; });
  const H = counts.map((v, k) => [lo + (k + 0.5) * w, v / (c.length * w)]);
  const xs = linspace(lo, hi, 200);
  const trace = c.slice(0, 400).map((v, i) => [i, v]);
  return (
    <VizFrame
      title="MCMC with the Metropolis algorithm"
      controls={<><Slider label="Proposal step size" value={step} min={0.05} max={8} step={0.05} onChange={setStep} /><Slider label="Samples" value={N} min={100} max={6000} step={100} onChange={setN} /><Btn onClick={() => setSeed(seed + 1)}>Re-run</Btn></>}
      caption={`Each new sample is proposed near the current one and accepted with probability min(1, p(x′)/p(x)), so consecutive samples are dependent, unlike rejection sampling. A tiny step accepts almost everything but crawls; a huge step gets rejected a lot. Acceptance rate: ${(acc * 100).toFixed(0)}%. The histogram converges to the target (yellow), even though it has two modes.`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <div className="text-[12px] text-[#9a9a9a] mb-1">Trace (first 400 steps)</div>
          <Plot xd={[0, 400]} yd={[-5, 5]} w={360} h={230} xLabel="iteration">
            {({ sx, sy }) => <path d={path(trace, sx, sy)} fill="none" stroke={C.blue} strokeWidth="1.2" />}
          </Plot>
        </div>
        <div>
          <div className="text-[12px] text-[#9a9a9a] mb-1">Histogram of samples vs target</div>
          <Plot xd={[lo, hi]} yd={[0, 0.5]} w={360} h={230} xLabel="x" yFmt={(v) => v.toFixed(1)}>
            {({ sx, sy }) => <><Bars data={H} sx={sx} sy={sy} color={C.blue} w={w} /><path d={path(xs.map((x) => [x, target(x)]), sx, sy)} fill="none" stroke={C.yellow} strokeWidth="2" /></>}
          </Plot>
        </div>
      </div>
    </VizFrame>
  );
};

export const LawOfLargeNumbers = () => {
  const [seed, setSeed] = useState(2);
  const [N, setN] = useState(500);
  const rolls = useMemo(() => { const r = mulberry32(seed); return range(3000).map(() => 1 + Math.floor(r() * 6)); }, [seed]);
  let s = 0;
  const run = rolls.slice(0, N).map((v, i) => [i + 1, (s += v) / (i + 1)]);
  return (
    <VizFrame
      title="Law of large numbers: running average of die rolls"
      controls={<><Slider label="Rolls" value={N} min={10} max={3000} step={10} onChange={setN} /><Btn onClick={() => setSeed(seed + 1)}>Roll again</Btn></>}
      caption="A fair die has expected value 3.5. Early averages swing a lot; as the number of rolls grows, the running average settles onto 3.5."
    >
      <Plot xd={[1, N]} yd={[1, 6]} xLabel="number of rolls" yLabel="running mean" tooltip={(x) => { const p = run[Math.max(0, Math.round(x) - 1)]; return p && <div>after {p[0]} rolls: {p[1].toFixed(3)}</div>; }}>
        {({ sx, sy }) => <><line x1={sx(1)} x2={sx(N)} y1={sy(3.5)} y2={sy(3.5)} stroke={C.yellow} strokeDasharray="4 3" /><path d={path(run, sx, sy)} fill="none" stroke={C.blue} strokeWidth="2" /></>}
      </Plot>
    </VizFrame>
  );
};

export const BaseRate = () => {
  const [prev, setPrev] = useState(0.01);
  const [sens, setSens] = useState(0.99);
  const [spec, setSpec] = useState(0.95);
  const N = 1000;
  const sick = Math.round(prev * N);
  const tp = Math.round(sens * sick), fn = sick - tp;
  const fp = Math.round((1 - spec) * (N - sick)), tn = N - sick - fp;
  const ppv = (sens * prev) / (sens * prev + (1 - spec) * (1 - prev));
  // order dots so each group is contiguous: TP, FN, FP, TN
  const cells = [...Array(tp).fill("tp"), ...Array(fn).fill("fn"), ...Array(fp).fill("fp"), ...Array(tn).fill("tn")];
  const col = { tp: C.red, fn: C.orange, fp: C.yellow, tn: "#2a2a2a" };
  return (
    <VizFrame
      title="Base rates: how many positive tests are real?"
      controls={<><Slider label="Prevalence" value={prev} min={0.001} max={0.3} step={0.001} onChange={setPrev} format={(v) => `${(v * 100).toFixed(1)}%`} /><Slider label="Sensitivity" value={sens} min={0.5} max={1} step={0.01} onChange={setSens} format={(v) => `${Math.round(v * 100)}%`} /><Slider label="Specificity" value={spec} min={0.5} max={0.999} step={0.001} onChange={setSpec} format={(v) => `${(v * 100).toFixed(1)}%`} /></>}
      caption={`1,000 people. When the condition is rare, even a good test produces more false positives (yellow) than true positives (red), so P(sick | positive) = TP / (TP + FP) is far lower than the sensitivity. Raising specificity helps much more than raising sensitivity here.`}
    >
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: "repeat(40, 8px)" }}>
          {cells.map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: col[c] }} />)}
        </div>
        <div className="flex flex-col gap-3">
          <Stat label="P(sick | positive)" value={`${(ppv * 100).toFixed(1)}%`} sub="positive predictive value" />
          <Legend items={[{ label: `sick, test + (${tp})`, color: col.tp, box: true }, { label: `sick, test − (${fn})`, color: col.fn, box: true }, { label: `healthy, test + (${fp})`, color: col.fp, box: true }, { label: `healthy, test − (${tn})`, color: "#555", box: true }]} />
        </div>
      </div>
    </VizFrame>
  );
};
