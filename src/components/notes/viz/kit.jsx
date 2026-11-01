import React, { useRef, useState } from "react";

// Categorical slots validated against the dark #141414 surface (dataviz validator, all checks pass).
// Assign in this order; never cycle.
export const C = {
  blue: "#3987e5",
  orange: "#d95926",
  aqua: "#199e70",
  yellow: "#c98500",
  magenta: "#d55181",
  violet: "#9085e9",
  red: "#e66767",
  good: "#0ca30c",
  surface: "#141414",
  grid: "#262626",
  axis: "#4a4a4a",
  text: "#E0E0E0",
  muted: "#9a9a9a",
};
export const SERIES = [C.blue, C.orange, C.aqua, C.yellow, C.magenta, C.violet, C.red];

export const fmt = (v, d = 2) =>
  Number.isFinite(v) ? (Math.abs(v) >= 1000 ? v.toFixed(0) : v.toFixed(d)) : "–";

export const range = (n) => Array.from({ length: n }, (_, i) => i);
export const linspace = (a, b, n) => range(n).map((i) => a + ((b - a) * i) / (n - 1));

// Seeded RNG so "random" demos are reproducible until the user re-rolls.
export const mulberry32 = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
export const gaussian = (rng) => {
  let u = 0;
  while (u === 0) u = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
};

export const VizFrame = ({ title, caption, children, controls }) => (
  <figure className="my-8 w-full rounded-2xl border border-[#3a3a3a] bg-[#0d0d0d] p-4 sm:p-6 shadow-[0_0_10px_rgba(255,204,0,0.15),_0_0_20px_rgba(255,105,180,0.1)]">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-[11px] uppercase tracking-wider text-[#c98500] border border-[#c98500]/40 rounded px-1.5 py-0.5">
        Interactive
      </span>
      <h4 className="text-white font-semibold text-[16px] sm:text-[18px]">{title}</h4>
    </div>
    {controls && <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">{controls}</div>}
    <div className="mt-4 w-full overflow-x-auto">{children}</div>
    {caption && <figcaption className="mt-3 text-[13px] text-[#9a9a9a] leading-relaxed">{caption}</figcaption>}
  </figure>
);

export const Slider = ({ label, value, min, max, step = 1, onChange, format = (v) => v }) => (
  <label className="flex items-center gap-3 text-[13px] text-secondary">
    <span className="whitespace-nowrap">{label}</span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-28 sm:w-36 accent-[#c98500]"
    />
    <span className="tabular-nums text-white min-w-[3ch]">{format(value)}</span>
  </label>
);

export const Seg = ({ options, value, onChange }) => (
  <div className="inline-flex flex-wrap rounded-lg border border-[#3a3a3a] overflow-hidden">
    {options.map((o) => {
      const v = typeof o === "string" ? o : o.value;
      const l = typeof o === "string" ? o : o.label;
      return (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-3 py-1.5 text-[13px] transition-colors ${
            value === v ? "bg-[#2a2a2a] text-white" : "text-[#9a9a9a] hover:text-white"
          }`}
        >
          {l}
        </button>
      );
    })}
  </div>
);

export const Btn = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-3 py-1.5 text-[13px] rounded-lg border border-[#3a3a3a] text-secondary hover:text-white hover:border-[#c98500] disabled:opacity-40 disabled:hover:border-[#3a3a3a]"
  >
    {children}
  </button>
);

export const Legend = ({ items }) => (
  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-secondary">
    {items.map((it) => (
      <span key={it.label} className="inline-flex items-center gap-1.5">
        <svg width="18" height="10">
          {it.box ? (
            <rect x="3" y="0" width="12" height="10" rx="2" fill={it.color} />
          ) : (
            <line x1="1" x2="17" y1="5" y2="5" stroke={it.color} strokeWidth="2" strokeDasharray={it.dash} />
          )}
        </svg>
        {it.label}
      </span>
    ))}
  </div>
);

export const Stat = ({ label, value, sub }) => (
  <div className="rounded-xl border border-[#2a2a2a] px-3 py-2 min-w-[110px]">
    <div className="text-[11px] uppercase tracking-wider text-[#9a9a9a]">{label}</div>
    <div className="text-white text-[18px] font-semibold tabular-nums">{value}</div>
    {sub && <div className="text-[11px] text-[#9a9a9a]">{sub}</div>}
  </div>
);

const niceTicks = (a, b, n = 5) => {
  const span = b - a;
  if (!(span > 0)) return [a];
  const raw = span / n;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= n) || 10 * mag;
  const out = [];
  for (let t = Math.ceil(a / step) * step; t <= b + 1e-9; t += step) out.push(+t.toFixed(10));
  return out;
};

// Linear-scale SVG plot. children receives { sx, sy, hx } where hx is the hovered x value (or null).
export const Plot = ({
  xd,
  yd,
  w = 600,
  h = 280,
  xLabel,
  yLabel,
  children,
  tooltip,
  xTicks,
  yTicks,
  xFmt = (v) => v,
  yFmt = (v) => v,
}) => {
  const pad = { l: 48, r: 16, t: 12, b: xLabel ? 42 : 28 };
  const ref = useRef(null);
  const [hx, setHx] = useState(null);
  const clipId = `clip${React.useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const sx = (v) => pad.l + ((v - xd[0]) / (xd[1] - xd[0])) * (w - pad.l - pad.r);
  const sy = (v) => h - pad.b - ((v - yd[0]) / (yd[1] - yd[0])) * (h - pad.t - pad.b);
  const xt = xTicks || niceTicks(xd[0], xd[1], 6);
  const yt = yTicks || niceTicks(yd[0], yd[1], 4);
  const onMove = (e) => {
    if (!tooltip) return;
    const r = ref.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * w;
    const v = xd[0] + ((px - pad.l) / (w - pad.l - pad.r)) * (xd[1] - xd[0]);
    setHx(v < xd[0] || v > xd[1] ? null : v);
  };
  const tip = tooltip && hx != null ? tooltip(hx) : null;
  return (
    <div className="relative" style={{ minWidth: 320 }}>
      <svg
        ref={ref}
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-auto select-none"
        onMouseMove={onMove}
        onMouseLeave={() => setHx(null)}
      >
        {yt.map((t) => (
          <g key={`y${t}`}>
            <line x1={pad.l} x2={w - pad.r} y1={sy(t)} y2={sy(t)} stroke={C.grid} />
            <text x={pad.l - 6} y={sy(t) + 4} fontSize="11" fill={C.muted} textAnchor="end">
              {yFmt(t)}
            </text>
          </g>
        ))}
        {xt.map((t) => (
          <text key={`x${t}`} x={sx(t)} y={h - pad.b + 16} fontSize="11" fill={C.muted} textAnchor="middle">
            {xFmt(t)}
          </text>
        ))}
        <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke={C.axis} />
        {xLabel && (
          <text x={(pad.l + w - pad.r) / 2} y={h - 6} fontSize="12" fill={C.muted} textAnchor="middle">
            {xLabel}
          </text>
        )}
        {yLabel && (
          <text
            transform={`translate(12 ${(pad.t + h - pad.b) / 2}) rotate(-90)`}
            fontSize="12"
            fill={C.muted}
            textAnchor="middle"
          >
            {yLabel}
          </text>
        )}
        <defs>
          <clipPath id={clipId}>
            <rect x={pad.l} y={pad.t - 8} width={w - pad.l - pad.r + 8} height={h - pad.t - pad.b + 8} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>{children({ sx, sy, hx, w, h, pad })}</g>
        {tip && <line x1={sx(hx)} x2={sx(hx)} y1={pad.t} y2={h - pad.b} stroke={C.muted} strokeDasharray="3 3" />}
      </svg>
      {tip && (
        <div
          className="pointer-events-none absolute top-2 rounded-lg border border-[#3a3a3a] bg-black/90 px-2.5 py-1.5 text-[12px] text-secondary"
          style={{ left: `${(sx(hx) / w) * 100}%`, transform: sx(hx) > w * 0.6 ? "translateX(-105%)" : "translateX(8px)" }}
        >
          {tip}
        </div>
      )}
    </div>
  );
};

export const path = (pts, sx, sy) =>
  pts
    .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y))
    .map(([x, y], i) => `${i ? "L" : "M"}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`)
    .join("");

// Hook for step-through animations: play/pause/reset over a precomputed list of frames.
export const useStepper = (n, speed = 600, resetKey = null) => {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  React.useEffect(() => {
    if (!playing) return;
    if (i >= n - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setI((v) => v + 1), speed);
    return () => clearTimeout(t);
  }, [playing, i, n, speed]);
  React.useEffect(() => {
    setI(0);
    setPlaying(false);
  }, [n, resetKey]);
  const controls = (
    <div className="flex gap-2">
      <Btn onClick={() => (i >= n - 1 ? (setI(0), setPlaying(true)) : setPlaying(!playing))}>
        {playing ? "Pause" : i >= n - 1 ? "Replay" : "Play"}
      </Btn>
      <Btn onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}>
        ◀ Step
      </Btn>
      <Btn onClick={() => setI(Math.min(n - 1, i + 1))} disabled={i >= n - 1}>
        Step ▶
      </Btn>
      <Btn onClick={() => (setI(0), setPlaying(false))}>Reset</Btn>
      <span className="self-center text-[12px] text-[#9a9a9a] tabular-nums">
        {i + 1}/{n}
      </span>
    </div>
  );
  return [i, controls, setI];
};
