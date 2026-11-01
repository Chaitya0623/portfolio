import React, { useMemo, useState } from "react";
import { C, VizFrame, Seg, Slider, Btn, Legend, Plot, Stat, path, range, mulberry32, useStepper } from "./kit";

/* ---------------- Airflow DAG ---------------- */

const TASKS = {
  extract_orders: { deps: [], x: 70, y: 50 },
  extract_users: { deps: [], x: 70, y: 150 },
  transform: { deps: ["extract_orders", "extract_users"], x: 250, y: 100 },
  quality_check: { deps: ["transform"], x: 420, y: 50 },
  load_warehouse: { deps: ["transform"], x: 420, y: 150 },
  refresh_dashboard: { deps: ["quality_check", "load_warehouse"], x: 560, y: 100 },
};

export const AirflowDAG = () => {
  const [fail, setFail] = useState("none");
  const frames = useMemo(() => {
    const st = Object.fromEntries(Object.keys(TASKS).map((t) => [t, "queued"]));
    const out = [{ ...st }];
    let changed = true;
    while (changed) {
      changed = false;
      const ready = Object.keys(TASKS).filter((t) => st[t] === "queued" && TASKS[t].deps.every((d) => st[d] === "success"));
      const blocked = Object.keys(TASKS).filter((t) => st[t] === "queued" && TASKS[t].deps.some((d) => st[d] === "failed" || st[d] === "upstream_failed"));
      blocked.forEach((t) => (st[t] = "upstream_failed"));
      if (ready.length) {
        ready.forEach((t) => (st[t] = "running"));
        out.push({ ...st });
        ready.forEach((t) => (st[t] = t === fail ? "failed" : "success"));
        changed = true;
      } else if (blocked.length) changed = true;
      out.push({ ...st });
    }
    return out;
  }, [fail]);
  const [i, controls] = useStepper(frames.length, 800, fail);
  const st = frames[i];
  const col = { queued: "#222", running: C.yellow, success: C.aqua, failed: C.red, upstream_failed: C.orange };
  return (
    <VizFrame
      title="An Airflow DAG run"
      controls={<><Seg value={fail} onChange={setFail} options={[{ value: "none", label: "All succeed" }, { value: "extract_users", label: "Fail extract" }, { value: "quality_check", label: "Fail QC" }]} />{controls}</>}
      caption="A DAG (directed acyclic graph) runs on a schedule with a clear start and end. A task starts only when all of its upstream tasks succeeded, independent tasks run in parallel, and when a task fails everything downstream is marked upstream_failed instead of running on bad data."
    >
      <svg viewBox="0 0 640 200" className="w-full h-auto" style={{ minWidth: 320 }}>
        <defs><marker id="dag-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={C.muted} /></marker></defs>
        {Object.entries(TASKS).flatMap(([t, { deps, x, y }]) => deps.map((d) => <line key={d + t} x1={TASKS[d].x + 58} y1={TASKS[d].y} x2={x - 60} y2={y} stroke={C.axis} strokeWidth="1.5" markerEnd="url(#dag-a)" />))}
        {Object.entries(TASKS).map(([t, { x, y }]) => (
          <g key={t}>
            <rect x={x - 58} y={y - 18} width="116" height="36" rx="8" fill={col[st[t]]} opacity={st[t] === "queued" ? 1 : 0.9} stroke={C.axis} />
            <text x={x} y={y - 1} fontSize="11" fill="#fff" textAnchor="middle">{t}</text>
            <text x={x} y={y + 12} fontSize="9" fill="#fff" opacity="0.8" textAnchor="middle">{st[t]}</text>
          </g>
        ))}
      </svg>
      <Legend items={Object.entries(col).map(([k, v]) => ({ label: k, color: v, box: true }))} />
    </VizFrame>
  );
};

/* ---------------- HITS ---------------- */

const PAGES = { A: [80, 60], B: [80, 160], C: [260, 40], D: [260, 120], E: [260, 190], F: [440, 110] };
const LINKS = [["A", "C"], ["A", "D"], ["A", "F"], ["B", "D"], ["B", "E"], ["B", "F"], ["C", "F"], ["E", "D"], ["F", "D"]];

export const HITS = () => {
  const iters = useMemo(() => {
    const names = Object.keys(PAGES);
    let hub = Object.fromEntries(names.map((n) => [n, 1])), auth = { ...hub };
    const out = [{ hub, auth }];
    for (let k = 0; k < 8; k++) {
      const na = Object.fromEntries(names.map((n) => [n, LINKS.filter(([, t]) => t === n).reduce((s, [f]) => s + hub[f], 0)]));
      const nh = Object.fromEntries(names.map((n) => [n, LINKS.filter(([f]) => f === n).reduce((s, [, t]) => s + na[t], 0)]));
      const norm = (o) => { const z = Math.sqrt(Object.values(o).reduce((s, v) => s + v * v, 0)) || 1; return Object.fromEntries(Object.entries(o).map(([k2, v]) => [k2, v / z])); };
      auth = norm(na); hub = norm(nh);
      out.push({ hub, auth });
    }
    return out;
  }, []);
  const [i, controls] = useStepper(iters.length, 700);
  const [view, setView] = useState("auth");
  const sc = iters[i][view];
  return (
    <VizFrame
      title="HITS: hubs and authorities"
      controls={<><Seg value={view} onChange={setView} options={[{ value: "auth", label: "Authority scores" }, { value: "hub", label: "Hub scores" }]} />{controls}</>}
      caption="Start every page at 1, then repeat: authority = sum of the hub scores of pages linking to it; hub = sum of the authority scores of pages it links to; normalise. D is linked by many good hubs, so it becomes the top authority; A and B link to many good pages, so they become the top hubs. Node size = score."
    >
      <svg viewBox="0 0 540 230" className="w-full h-auto" style={{ minWidth: 320 }}>
        <defs><marker id="hits-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={C.muted} /></marker></defs>
        {LINKS.map(([f, t]) => { const [x1, y1] = PAGES[f], [x2, y2] = PAGES[t]; const d = Math.hypot(x2 - x1, y2 - y1), r = 10 + 26 * sc[t]; return <line key={f + t} x1={x1} y1={y1} x2={x2 - ((x2 - x1) / d) * (r + 3)} y2={y2 - ((y2 - y1) / d) * (r + 3)} stroke={C.axis} strokeWidth="1.5" markerEnd="url(#hits-a)" />; })}
        {Object.entries(PAGES).map(([n, [x, y]]) => (
          <g key={n}>
            <circle cx={x} cy={y} r={10 + 26 * sc[n]} fill={view === "auth" ? C.violet : C.aqua} stroke={C.surface} strokeWidth="2" />
            <text x={x} y={y + 4} fontSize="12" fill="#fff" textAnchor="middle" fontWeight="600">{n}</text>
            <text x={x + 14 + 26 * sc[n]} y={y + 4} fontSize="11" fill={C.muted}>{sc[n].toFixed(2)}</text>
          </g>
        ))}
      </svg>
      <div className="text-[12px] text-[#9a9a9a]">iteration {i}</div>
    </VizFrame>
  );
};

/* ---------------- Cloud deployment ---------------- */

const NODES = {
  browser: { x: 60, y: 120, label: "Browser", sub: "user" },
  dns: { x: 190, y: 40, label: "DNS", sub: "domain → EC2 IP" },
  nginx: { x: 330, y: 120, label: "Nginx", sub: ":80 / :443 + SSL" },
  frontend: { x: 500, y: 50, label: "frontend", sub: "container :3000" },
  backend: { x: 500, y: 140, label: "backend", sub: "container :8000" },
  db: { x: 500, y: 225, label: "postgres", sub: "container :5432" },
};
const REQS = {
  "http://site": { hops: ["browser", "dns", "nginx", "browser"], note: "Port 80 request → Nginx answers with a 301 redirect to https:// (use 307/308 instead if a POST body must be preserved)." },
  "GET /": { hops: ["browser", "dns", "nginx", "frontend", "nginx", "browser"], note: "TLS terminates at Nginx (certbot certificates), which reverse-proxies / to the frontend container." },
  "POST /api/login": { hops: ["browser", "nginx", "backend", "db", "backend", "nginx", "browser"], note: "/api/* is routed to the backend container, which talks to Postgres over the docker-compose network using the DATABASE_* env vars." },
};

export const DeployArchitecture = () => {
  const [req, setReq] = useState("GET /");
  const { hops, note } = REQS[req];
  const [i, controls] = useStepper(hops.length, 650, req);
  const seen = hops.slice(0, i + 1);
  return (
    <VizFrame
      title="Request flow: one EC2 instance, docker-compose, Nginx reverse proxy"
      controls={<><Seg value={req} onChange={setReq} options={Object.keys(REQS)} />{controls}</>}
      caption={note}
    >
      <svg viewBox="0 0 620 270" className="w-full h-auto" style={{ minWidth: 320 }}>
        <rect x="265" y="8" width="345" height="255" rx="14" fill="none" stroke={C.axis} strokeDasharray="5 4" />
        <text x="600" y="24" fontSize="11" fill={C.muted} textAnchor="end">EC2 instance · docker-compose network</text>
        {range(seen.length - 1).map((k) => { const a = NODES[seen[k]], b = NODES[seen[k + 1]]; return <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.yellow} strokeWidth="3" opacity={k === seen.length - 2 ? 1 : 0.45} />; })}
        {Object.entries(NODES).map(([k, n]) => (
          <g key={k}>
            <rect x={n.x - 52} y={n.y - 22} width="104" height="44" rx="8" fill={seen[seen.length - 1] === k ? "#c9850033" : "#1a1a1a"} stroke={seen.includes(k) ? C.yellow : C.axis} />
            <text x={n.x} y={n.y - 3} fontSize="12" fill="#fff" textAnchor="middle">{n.label}</text>
            <text x={n.x} y={n.y + 12} fontSize="9.5" fill={C.muted} textAnchor="middle">{n.sub}</text>
          </g>
        ))}
      </svg>
    </VizFrame>
  );
};

/* ---------------- Gas fee ---------------- */

const TX = { "ETH transfer": 21000, "ERC-20 transfer": 65000, "DEX swap": 150000, "NFT mint": 120000 };

export const GasFee = () => {
  const [tx, setTx] = useState("ERC-20 transfer");
  const [base, setBase] = useState(10);
  const [tip, setTip] = useState(1.5);
  const [limit, setLimit] = useState(80000);
  const [price, setPrice] = useState(3000);
  const used = TX[tx];
  const ok = limit >= used;
  const gasCharged = ok ? used : limit;
  const feeEth = (gasCharged * (base + tip)) / 1e9;
  return (
    <VizFrame
      title="Ethereum gas fee calculator (EIP-1559)"
      controls={<><Seg value={tx} onChange={setTx} options={Object.keys(TX)} /><Slider label="Base fee (gwei)" value={base} min={1} max={100} onChange={setBase} /><Slider label="Priority tip (gwei)" value={tip} min={0} max={10} step={0.5} onChange={setTip} /><Slider label="Gas limit" value={limit} min={21000} max={300000} step={1000} onChange={setLimit} format={(v) => v.toLocaleString()} /><Slider label="ETH price ($)" value={price} min={500} max={8000} step={100} onChange={setPrice} /></>}
      caption="Fee = gas used × (base fee + priority tip). Gas measures computation on the EVM, not GPU time; more complex transactions use more. The base fee is burned and the tip goes to the validator. The gas limit is the most gas you allow: set it too low and the transaction runs out of gas, reverts, and you still pay for the gas consumed. Gas amounts are typical values, not exact."
    >
      <div className="flex flex-wrap gap-3">
        <Stat label="Gas used" value={gasCharged.toLocaleString()} sub={ok ? `of limit ${limit.toLocaleString()}` : "limit hit"} />
        <Stat label="Fee" value={`${feeEth.toFixed(6)} ETH`} sub={`≈ $${(feeEth * price).toFixed(2)}`} />
        <Stat label="Burned (base)" value={`${((gasCharged * base) / 1e9).toFixed(6)}`} sub="ETH" />
        <Stat label="Status" value={ok ? "✓ success" : "✕ out of gas"} sub={ok ? "" : "reverted, fee still paid"} />
      </div>
    </VizFrame>
  );
};

/* ---------------- Explore / exploit ---------------- */

const ARMS = [0.05, 0.08, 0.12];
const betaSample = (r, a, b) => {
  // Beta via two Gamma draws (Marsaglia–Tsang); a, b ≥ 1 here
  const gam = (k) => { const d = k - 1 / 3, c = 1 / Math.sqrt(9 * d); for (;;) { let x, v; do { const u1 = r(), u2 = r(); x = Math.sqrt(-2 * Math.log(u1 || 1e-12)) * Math.cos(2 * Math.PI * u2); v = 1 + c * x; } while (v <= 0); v = v ** 3; const u = r(); if (u < 1 - 0.0331 * x ** 4 || Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v; } };
  const x = gam(a), y = gam(b);
  return x / (x + y);
};

export const Bandit = () => {
  const [eps, setEps] = useState(0.1);
  const [seed, setSeed] = useState(1);
  const T = 3000, RUNS = 20;
  const sims = useMemo(() => {
    const run = (policy, rep) => {
      const r = mulberry32(seed * 1000 + rep * 7 + (policy === "ts" ? 1 : 2));
      const s = ARMS.map(() => 0), f = ARMS.map(() => 0);
      let regret = 0;
      const curve = [], pulls = ARMS.map(() => 0);
      for (let t = 0; t < T; t++) {
        let a;
        if (policy === "ts") a = ARMS.map((_, i) => betaSample(r, 1 + s[i], 1 + f[i])).reduce((b, v, i, arr) => (v > arr[b] ? i : b), 0);
        else {
          // greedy policies: play each track once, then the best empirical like-rate (ties → random)
          const untried = ARMS.findIndex((_, i) => s[i] + f[i] === 0);
          const mean = ARMS.map((_, i) => s[i] / (s[i] + f[i]) + r() * 1e-9);
          a = untried >= 0 ? untried : policy === "eps" && r() < eps ? Math.floor(r() * ARMS.length) : mean.reduce((b, v, i, arr) => (v > arr[b] ? i : b), 0);
        }
        pulls[a]++;
        r() < ARMS[a] ? s[a]++ : f[a]++;
        regret += Math.max(...ARMS) - ARMS[a];
        if (t % 30 === 0) curve.push([t, regret]);
      }
      return { curve, pulls };
    };
    // a single run is very noisy, so average the regret curve and pull counts over RUNS simulations
    const avg = (policy) => {
      const runs = range(RUNS).map((k) => run(policy, k));
      return {
        curve: runs[0].curve.map(([t], j) => [t, runs.reduce((acc, x) => acc + x.curve[j][1], 0) / RUNS]),
        pulls: ARMS.map((_, i) => runs.reduce((acc, x) => acc + x.pulls[i], 0) / RUNS),
      };
    };
    return { ts: avg("ts"), eps: avg("eps"), greedy: avg("greedy") };
  }, [eps, seed]);
  const ymax = Math.max(...Object.values(sims).map((s) => s.curve[s.curve.length - 1][1])) * 1.05;
  const names = { greedy: "pure exploitation (greedy)", eps: `ε-greedy (ε = ${eps})`, ts: "Thompson sampling (Bayesian)" };
  return (
    <VizFrame
      title="Exploration vs exploitation: which track to recommend?"
      controls={<><Slider label="ε" value={eps} min={0} max={0.5} step={0.01} onChange={setEps} /><Btn onClick={() => setSeed(seed + 1)}>Re-run</Btn></>}
      caption={`Averaged over ${RUNS} simulations. Three tracks with true like-rates ${ARMS.map((a) => `${(a * 100).toFixed(1)}%`).join(", ")} (unknown to the policy). Regret = likes lost versus always playing the best track. Pure exploitation tries each track once and then always plays the best-looking one, so it often locks onto a mediocre track; ε-greedy keeps exploring at a fixed rate forever; Thompson sampling keeps a Bayesian Beta belief per track and samples from it, so it explores where it's uncertain and exploits once it's confident.`}
    >
      <Plot xd={[0, T]} yd={[0, ymax]} xLabel="recommendations" yLabel="cumulative regret" tooltip={(x) => { const k = Math.min(Math.round(x / 30), sims.ts.curve.length - 1); return <div>{Object.entries(sims).map(([n, s]) => <div key={n}>{names[n]}: {s.curve[k][1].toFixed(1)}</div>)}</div>; }}>
        {({ sx, sy }) => Object.entries(sims).map(([n, s], i) => <path key={n} d={path(s.curve, sx, sy)} fill="none" stroke={[C.orange, C.blue, C.aqua][i]} strokeWidth="2" />)}
      </Plot>
      <Legend items={Object.keys(sims).map((n, i) => ({ label: `${names[n]}: best track played ${((sims[n].pulls[2] / T) * 100).toFixed(0)}%`, color: [C.orange, C.blue, C.aqua][i] }))} />
    </VizFrame>
  );
};

/* ---------------- Multi-hop graph ---------------- */

const GN = {
  A1: { x: 70, y: 60, t: "audiobook" }, A2: { x: 70, y: 180, t: "audiobook" }, A4: { x: 470, y: 70, t: "audiobook" },
  P1: { x: 230, y: 70, t: "podcast" }, P2: { x: 230, y: 180, t: "podcast" }, P3: { x: 470, y: 190, t: "podcast" },
  M1: { x: 350, y: 130, t: "music" },
};
const GE = [["A1", "P1"], ["P1", "A4"], ["A2", "P2"], ["P2", "M1"], ["M1", "P3"], ["P1", "M1"], ["A2", "P1"]];

export const MultiHop = () => {
  const [sel, setSel] = useState("A1");
  const nb = (n) => GE.filter((e) => e.includes(n)).map((e) => (e[0] === n ? e[1] : e[0]));
  const one = new Set(nb(sel));
  const two = new Set([...one].flatMap(nb).filter((n) => n !== sel && !one.has(n)));
  const col = { audiobook: C.blue, podcast: C.orange, music: C.violet };
  return (
    <VizFrame
      title="Multi-hop relations in a content graph"
      caption={`Click a node. ${sel} is directly connected (1 hop, solid ring) to ${[...one].join(", ") || "nothing"}, and 2 hops away (dashed ring) from ${[...two].join(", ") || "nothing"}. A GNN aggregates features from these neighbourhoods, so ${sel} gets related to items it never co-occurred with directly, which is how a brand-new audiobook catalogue can borrow signal from music and podcasts.`}
    >
      <svg viewBox="0 0 540 240" className="w-full h-auto" style={{ minWidth: 320 }}>
        {GE.map(([a, b]) => <line key={a + b} x1={GN[a].x} y1={GN[a].y} x2={GN[b].x} y2={GN[b].y} stroke={(a === sel || b === sel) ? C.yellow : C.axis} strokeWidth={(a === sel || b === sel) ? 2.5 : 1.5} />)}
        {Object.entries(GN).map(([n, { x, y, t }]) => (
          <g key={n} onClick={() => setSel(n)} className="cursor-pointer">
            {(one.has(n) || two.has(n)) && <circle cx={x} cy={y} r="27" fill="none" stroke={C.yellow} strokeDasharray={two.has(n) ? "4 3" : undefined} strokeWidth="2" />}
            <circle cx={x} cy={y} r="20" fill={col[t]} stroke={n === sel ? "#fff" : C.surface} strokeWidth="3" />
            <text x={x} y={y + 4} fontSize="12" fill="#fff" textAnchor="middle" fontWeight="600">{n}</text>
          </g>
        ))}
      </svg>
      <Legend items={Object.entries(col).map(([k, v]) => ({ label: k, color: v, box: true }))} />
    </VizFrame>
  );
};
