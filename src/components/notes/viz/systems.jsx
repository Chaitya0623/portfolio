import React, { useMemo, useState } from "react";
import { C, SERIES, VizFrame, Seg, Slider, Legend, Stat, fmt } from "./kit";

/* ---------------- CPU scheduling ---------------- */

const PROCS = [
  { id: "P1", at: 0, bt: 7, pr: 3 },
  { id: "P2", at: 2, bt: 4, pr: 1 },
  { id: "P3", at: 4, bt: 1, pr: 4 },
  { id: "P4", at: 5, bt: 4, pr: 2 },
  { id: "P5", at: 6, bt: 3, pr: 5 },
];

const schedule = (algo, q) => {
  const rem = Object.fromEntries(PROCS.map((p) => [p.id, p.bt]));
  const finish = {};
  const timeline = [];
  let t = 0, cur = null, slice = 0;
  const queue = [];
  const arrived = new Set();
  const enqueueArrivals = () =>
    PROCS.forEach((p) => {
      if (p.at <= t && !arrived.has(p.id)) arrived.add(p.id), queue.push(p.id);
    });
  while (Object.keys(finish).length < PROCS.length) {
    enqueueArrivals();
    const ready = PROCS.filter((p) => p.at <= t && rem[p.id] > 0);
    if (algo === "RR") {
      if (cur && (rem[cur] === 0 || slice === q)) {
        if (rem[cur] > 0) queue.push(cur);
        cur = null;
      }
      if (!cur) {
        cur = queue.shift() || null;
        slice = 0;
      }
    } else {
      const preemptive = algo === "SRTF";
      if (!cur || rem[cur] === 0 || preemptive) {
        const pick = {
          FCFS: (a, b) => a.at - b.at,
          SJF: (a, b) => a.bt - b.bt || a.at - b.at,
          SRTF: (a, b) => rem[a.id] - rem[b.id] || a.at - b.at,
          Priority: (a, b) => a.pr - b.pr || a.at - b.at,
        }[algo];
        cur = ready.sort(pick)[0]?.id || null;
      }
    }
    timeline.push(cur);
    if (cur) {
      rem[cur]--;
      slice++;
      if (rem[cur] === 0) finish[cur] = t + 1;
    }
    t++;
  }
  const segs = [];
  timeline.forEach((id, i) => {
    const last = segs[segs.length - 1];
    if (last && last.id === id) last.end = i + 1;
    else segs.push({ id, start: i, end: i + 1 });
  });
  const stats = PROCS.map((p) => ({ ...p, ct: finish[p.id], tat: finish[p.id] - p.at, wt: finish[p.id] - p.at - p.bt }));
  return { segs, stats, total: t };
};

export const CpuScheduling = () => {
  const [algo, setAlgo] = useState("FCFS");
  const [q, setQ] = useState(2);
  const { segs, stats, total } = useMemo(() => schedule(algo, q), [algo, q]);
  const color = (id) => (id ? SERIES[PROCS.findIndex((p) => p.id === id)] : "#222");
  const W = 600, sx = (v) => 10 + (v / total) * (W - 20);
  const avgW = stats.reduce((s, p) => s + p.wt, 0) / stats.length;
  const avgT = stats.reduce((s, p) => s + p.tat, 0) / stats.length;
  return (
    <VizFrame
      title="CPU scheduling Gantt chart"
      controls={
        <>
          <Seg value={algo} onChange={setAlgo} options={[{ value: "FCFS", label: "FCFS" }, { value: "SJF", label: "SJF" }, { value: "SRTF", label: "SRTN" }, { value: "Priority", label: "Priority" }, { value: "RR", label: "Round Robin" }]} />
          {algo === "RR" && <Slider label="Time quantum" value={q} min={1} max={6} onChange={setQ} />}
        </>
      }
      caption="Same five processes under each policy. Shortest Remaining Time Next (preemptive SJF) gives the lowest average waiting time. Priority uses lower number = higher priority (non-preemptive here)."
    >
      <svg viewBox={`0 0 ${W} 70`} className="w-full h-auto" style={{ minWidth: 320 }}>
        {segs.map((s, i) => (
          <g key={i}>
            <rect x={sx(s.start) + 1} y="8" width={sx(s.end) - sx(s.start) - 2} height="32" rx="4" fill={color(s.id)}>
              <title>{`${s.id || "idle"}: t=${s.start} → ${s.end}`}</title>
            </rect>
            <text x={(sx(s.start) + sx(s.end)) / 2} y="29" fontSize="12" fill="#fff" textAnchor="middle">{s.id || "idle"}</text>
            <text x={sx(s.start)} y="56" fontSize="10" fill={C.muted} textAnchor="middle">{s.start}</text>
          </g>
        ))}
        <text x={sx(total)} y="56" fontSize="10" fill={C.muted} textAnchor="middle">{total}</text>
      </svg>
      <div className="mt-3 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
        <table className="text-[13px] text-secondary w-full">
          <thead>
            <tr className="text-[#9a9a9a] text-left">
              {["Process", "Arrival", "Burst", "Priority", "Completion", "Turnaround", "Waiting"].map((h) => <th key={h} className="pr-3 font-normal">{h}</th>)}
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {stats.map((p, i) => (
              <tr key={p.id}>
                <td className="pr-3"><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5" style={{ background: SERIES[i] }} />{p.id}</td>
                <td>{p.at}</td><td>{p.bt}</td><td>{p.pr}</td><td>{p.ct}</td><td>{p.tat}</td><td>{p.wt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-3">
          <Stat label="Avg waiting" value={fmt(avgW)} />
          <Stat label="Avg turnaround" value={fmt(avgT)} />
        </div>
      </div>
    </VizFrame>
  );
};

/* ---------------- Page replacement ---------------- */

const REFS = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];

const replace = (algo, nf) => {
  let frames = [];
  const lastUsed = {}, freq = {}, loadedAt = {};
  return REFS.map((p, t) => {
    let hit = frames.includes(p);
    let victim = null;
    if (!hit) {
      if (frames.length < nf) frames = [...frames, p];
      else {
        let idx;
        if (algo === "FIFO") idx = frames.reduce((b, f, i) => (loadedAt[f] < loadedAt[frames[b]] ? i : b), 0);
        if (algo === "LRU") idx = frames.reduce((b, f, i) => (lastUsed[f] < lastUsed[frames[b]] ? i : b), 0);
        if (algo === "LFU") idx = frames.reduce((b, f, i) => (freq[f] < freq[frames[b]] || (freq[f] === freq[frames[b]] && lastUsed[f] < lastUsed[frames[b]]) ? i : b), 0);
        if (algo === "Optimal") {
          const nextUse = (f) => { const k = REFS.indexOf(f, t + 1); return k === -1 ? Infinity : k; };
          idx = frames.reduce((b, f, i) => (nextUse(f) > nextUse(frames[b]) ? i : b), 0);
        }
        victim = frames[idx];
        frames = frames.map((f, i) => (i === idx ? p : f));
        delete freq[victim];
      }
      loadedAt[p] = t;
    }
    lastUsed[p] = t;
    freq[p] = (freq[p] || 0) + 1;
    return { p, frames: [...frames], hit, victim };
  });
};

export const PageReplacement = () => {
  const [algo, setAlgo] = useState("LRU");
  const [nf, setNf] = useState(3);
  const steps = useMemo(() => replace(algo, nf), [algo, nf]);
  const faults = steps.filter((s) => !s.hit).length;
  return (
    <VizFrame
      title="Page replacement"
      controls={
        <>
          <Seg value={algo} onChange={setAlgo} options={["FIFO", "LRU", "LFU", "Optimal"]} />
          <Slider label="Frames" value={nf} min={2} max={5} onChange={setNf} />
          <Stat label="Page faults" value={faults} sub={`hit ratio ${fmt((1 - faults / REFS.length) * 100, 0)}%`} />
        </>
      }
      caption="Each column is one memory reference. Red = page fault (the replaced page is shown struck through below), green = hit. Optimal is the lower bound every other policy is compared against, but it needs to know the future."
    >
      <div className="flex gap-1" style={{ minWidth: 560 }}>
        {steps.map((s, t) => (
          <div key={t} className="flex-1 min-w-[24px] flex flex-col items-center gap-1">
            <div className="text-white text-[13px] font-semibold">{s.p}</div>
            {Array.from({ length: nf }, (_, k) => (
              <div key={k} className={`w-full text-center text-[12px] rounded py-0.5 ${s.frames[k] === s.p ? (s.hit ? "bg-[#199e70]/40 text-white" : "bg-[#e66767]/40 text-white") : "bg-[#1c1c1c] text-secondary"}`}>
                {s.frames[k] ?? " "}
              </div>
            ))}
            <div className="text-[10px] h-3" style={{ color: s.hit ? C.aqua : C.red }}>{s.hit ? "hit" : "F"}</div>
            <div className="text-[10px] h-3 line-through text-[#9a9a9a]">{s.victim ?? ""}</div>
          </div>
        ))}
      </div>
    </VizFrame>
  );
};

/* ---------------- Disk scheduling ---------------- */

const REQ = [98, 183, 37, 122, 14, 124, 65, 67];
const HEAD = 53, MAXCYL = 199;

const diskOrder = (algo, dir) => {
  const up = dir === "up";
  const lower = REQ.filter((r) => r < HEAD).sort((a, b) => b - a);
  const upper = REQ.filter((r) => r >= HEAD).sort((a, b) => a - b);
  const seq = [HEAD];
  const jumps = [];
  if (algo === "FCFS") seq.push(...REQ);
  if (algo === "SSTF") {
    let left = [...REQ], cur = HEAD;
    while (left.length) {
      const nx = left.reduce((b, r) => (Math.abs(r - cur) < Math.abs(b - cur) ? r : b));
      seq.push(nx);
      left = left.filter((r) => r !== nx);
      cur = nx;
    }
  }
  if (algo === "SCAN") up ? seq.push(...upper, MAXCYL, ...lower) : seq.push(...lower, 0, ...upper);
  if (algo === "LOOK") up ? seq.push(...upper, ...lower) : seq.push(...lower, ...upper);
  if (algo === "C-SCAN") {
    if (up) seq.push(...upper, MAXCYL), jumps.push(seq.length), seq.push(0, ...[...lower].reverse());
    else seq.push(...lower, 0), jumps.push(seq.length), seq.push(MAXCYL, ...[...upper].reverse());
  }
  if (algo === "C-LOOK") {
    if (up) seq.push(...upper), jumps.push(seq.length), seq.push(...[...lower].reverse());
    else seq.push(...lower), jumps.push(seq.length), seq.push(...[...upper].reverse());
  }
  let total = 0;
  for (let i = 1; i < seq.length; i++) total += Math.abs(seq[i] - seq[i - 1]);
  return { seq, jumps, total };
};

export const DiskScheduling = () => {
  const [algo, setAlgo] = useState("SCAN");
  const [dir, setDir] = useState("up");
  const { seq, jumps, total } = useMemo(() => diskOrder(algo, dir), [algo, dir]);
  const W = 600, H = 40 + seq.length * 24;
  const sx = (c) => 20 + (c / MAXCYL) * (W - 40);
  const sy = (i) => 30 + i * 24;
  return (
    <VizFrame
      title="Disk scheduling: head movement"
      controls={
        <>
          <Seg value={algo} onChange={setAlgo} options={["FCFS", "SSTF", "SCAN", "C-SCAN", "LOOK", "C-LOOK"]} />
          {algo !== "FCFS" && algo !== "SSTF" && <Seg value={dir} onChange={setDir} options={[{ value: "up", label: "→ towards 199" }, { value: "down", label: "← towards 0" }]} />}
          <Stat label="Total head movement" value={total} sub="cylinders" />
        </>
      }
      caption={`Head starts at ${HEAD}; queue = [${REQ.join(", ")}] on a 0–199 disk. Dashed segments are the return sweep of the circular variants (no requests are served on the way back); they are counted in the total here, although some textbooks leave them out.`}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ minWidth: 320 }}>
        {[0, 50, 100, 150, 199].map((c) => (
          <g key={c}>
            <line x1={sx(c)} x2={sx(c)} y1="18" y2={H - 6} stroke={C.grid} />
            <text x={sx(c)} y="12" fontSize="10" fill={C.muted} textAnchor="middle">{c}</text>
          </g>
        ))}
        {seq.slice(1).map((c, i) => (
          <line key={i} x1={sx(seq[i])} y1={sy(i)} x2={sx(c)} y2={sy(i + 1)} stroke={jumps.includes(i + 1) ? C.muted : C.blue} strokeWidth="2" strokeDasharray={jumps.includes(i + 1) ? "5 4" : undefined} />
        ))}
        {seq.map((c, i) => {
          const isReq = REQ.includes(c);
          return (
            <g key={i}>
              <circle cx={sx(c)} cy={sy(i)} r="5" fill={i === 0 ? C.yellow : isReq ? C.blue : C.surface} stroke={isReq || i === 0 ? C.surface : C.muted} strokeWidth="2" />
              <text x={sx(c) + (c > 170 ? -9 : 9)} y={sy(i) + 4} fontSize="11" fill={C.text} textAnchor={c > 170 ? "end" : "start"}>{c}</text>
            </g>
          );
        })}
      </svg>
    </VizFrame>
  );
};

/* ---------------- Networking ---------------- */

const OSI = [
  { n: "Application", d: "Provides user services", p: "HTTP, FTP, SMTP, DNS", pdu: "Data", tcp: 0 },
  { n: "Presentation", d: "Data translation, encryption, compression", p: "TLS, JPEG, UTF-8", pdu: "Data", tcp: 0 },
  { n: "Session", d: "Manages sessions (start, maintain, terminate)", p: "RPC, NetBIOS", pdu: "Data", tcp: 0 },
  { n: "Transport", d: "Reliable end-to-end delivery, segmentation, flow & error control", p: "TCP, UDP", pdu: "Segment / Datagram", tcp: 1 },
  { n: "Network", d: "Logical addressing and routing", p: "IP, ICMP", pdu: "Packet", tcp: 2 },
  { n: "Data Link", d: "Framing, MAC addressing, error detection", p: "Ethernet, Wi-Fi (802.11), PPP", pdu: "Frame", tcp: 3 },
  { n: "Physical", d: "Transmission of raw bits over the medium", p: "Cables, radio waves", pdu: "Bits", tcp: 3 },
];
const TCPIP = ["Application", "Transport", "Internet", "Network Access (Link)"];

export const NetworkLayers = () => {
  const [sel, setSel] = useState(3);
  const L = OSI[sel];
  const headers = OSI.slice(3, sel + 1).filter((x) => x.n !== "Physical");
  return (
    <VizFrame
      title="OSI (7 layers) ↔ TCP/IP (4 layers)"
      caption="Click a layer. As data travels down the stack each layer wraps the payload with its own header (encapsulation); the receiver unwraps in reverse."
    >
      <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1.3fr] gap-3" style={{ minWidth: 320 }}>
        <div className="flex flex-col gap-1">
          <div className="text-[12px] text-[#9a9a9a]">OSI</div>
          {OSI.map((l, i) => (
            <button key={l.n} onClick={() => setSel(i)} className={`text-left rounded-lg px-3 py-1.5 text-[13px] border ${i === sel ? "border-[#c98500] bg-[#c98500]/15 text-white" : "border-[#2a2a2a] text-secondary hover:text-white"}`}>
              {7 - i}. {l.n}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-[12px] text-[#9a9a9a]">TCP/IP</div>
          {TCPIP.map((n, k) => {
            const span = OSI.filter((l) => l.tcp === k).length;
            return (
              <div key={n} className={`rounded-lg px-3 flex items-center text-[13px] border ${L.tcp === k ? "border-[#3987e5] bg-[#3987e5]/15 text-white" : "border-[#2a2a2a] text-secondary"}`} style={{ height: span * 34 + (span - 1) * 4 }}>
                {n}
              </div>
            );
          })}
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-xl border border-[#2a2a2a] p-3 text-[13px] text-secondary">
          <div className="text-white font-semibold">{L.n}</div>
          <div className="mt-1">{L.d}</div>
          <div className="mt-2"><span className="text-[#9a9a9a]">Examples:</span> {L.p}</div>
          <div className="mt-1"><span className="text-[#9a9a9a]">Unit (PDU):</span> {L.pdu}</div>
          <div className="mt-3 text-[#9a9a9a] text-[12px]">What leaves this layer</div>
          <div className="mt-1 flex font-mono text-[11px]">
            {[...headers].reverse().map((h) => (
              <span key={h.n} className="px-1.5 py-1 border border-[#3a3a3a] bg-[#1c1c1c]">{h.n === "Data Link" ? "MAC hdr" : h.n === "Network" ? "IP hdr" : "TCP hdr"}</span>
            ))}
            <span className="px-1.5 py-1 border border-[#3a3a3a] bg-[#199e70]/30 text-white">data</span>
            {sel >= 5 && <span className="px-1.5 py-1 border border-[#3a3a3a] bg-[#1c1c1c]">FCS</span>}
          </div>
        </div>
      </div>
    </VizFrame>
  );
};

export const TcpVsUdp = () => {
  const [loss, setLoss] = useState(20);
  const pk = Array.from({ length: 10 }, (_, i) => i + 1);
  const lost = new Set(pk.filter((i) => ((i * 37) % 100) < loss));
  return (
    <VizFrame
      title="TCP vs UDP with a lossy link"
      controls={<Slider label="Packet loss" value={loss} min={0} max={60} step={5} onChange={setLoss} format={(v) => `${v}%`} />}
      caption="TCP acknowledges and retransmits lost segments, so every byte arrives in order at the cost of extra round trips. UDP just sends; whatever is lost stays lost, which is fine for live video or games."
    >
      {["TCP", "UDP"].map((proto) => (
        <div key={proto} className="mb-3">
          <div className="text-[13px] text-white mb-1">{proto}</div>
          <div className="flex gap-1 flex-wrap">
            {pk.map((i) => {
              const l = lost.has(i);
              return (
                <div key={i} className={`w-11 text-center rounded text-[12px] py-1 border ${l ? (proto === "TCP" ? "border-[#c98500] text-white" : "border-[#e66767] text-[#e66767] line-through") : "border-[#199e70] text-white"}`}>
                  #{i}{l && proto === "TCP" ? "↻" : ""}
                </div>
              );
            })}
          </div>
          <div className="text-[12px] text-[#9a9a9a] mt-1">
            {proto === "TCP" ? `${pk.length}/${pk.length} delivered in order · ${lost.size} retransmission${lost.size === 1 ? "" : "s"} (↻)` : `${pk.length - lost.size}/${pk.length} delivered · no retransmissions`}
          </div>
        </div>
      ))}
    </VizFrame>
  );
};

/* ---------------- DBMS: B+ tree ---------------- */

const LEAVES = [[5, 10], [15, 20], [25, 30, 35], [40, 50], [60, 70], [75, 80, 90]];
const INTERNAL = [{ keys: [15, 25], kids: [0, 1, 2] }, { keys: [60, 75], kids: [3, 4, 5] }];
const ROOT = [40];

export const BPlusTree = () => {
  const [lo, setLo] = useState(20);
  const [hi, setHi] = useState(62);
  const a = Math.min(lo, hi), b = Math.max(lo, hi);
  const childIdx = (keys, k) => keys.filter((x) => k >= x).length;
  const inI = childIdx(ROOT, a);
  const leafStart = INTERNAL[inI].kids[childIdx(INTERNAL[inI].keys, a)];
  const leafHits = new Set();
  for (let li = leafStart; li < LEAVES.length; li++) {
    if (LEAVES[li][0] > b) break;
    leafHits.add(li);
  }
  const W = 600;
  const leafX = (i) => 12 + i * ((W - 24) / LEAVES.length);
  const lw = (W - 24) / LEAVES.length - 10;
  const Node = ({ x, y, w, keys, on, kHi }) => (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="6" fill={on ? "#3987e533" : "#1c1c1c"} stroke={on ? C.blue : C.axis} />
      {keys.map((k, i) => (
        <text key={k} x={x + ((i + 0.5) * w) / keys.length} y={y + 19} fontSize="12" textAnchor="middle" fill={kHi && kHi(k) ? C.yellow : C.text} fontWeight={kHi && kHi(k) ? 700 : 400}>{k}</text>
      ))}
    </g>
  );
  return (
    <VizFrame
      title="Range query on a B+ tree"
      controls={
        <>
          <Slider label="From" value={lo} min={0} max={95} onChange={setLo} />
          <Slider label="To" value={hi} min={0} max={95} onChange={setHi} />
        </>
      }
      caption={`Query: keys between ${a} and ${b}. The search goes down one root-to-leaf path to find ${a}, then simply follows the linked leaves (arrows) to the right. That leaf chain is why B+ trees make range queries easy. Internal nodes store only routing keys; all data lives in the leaves.`}
    >
      <svg viewBox={`0 0 ${W} 190`} className="w-full h-auto" style={{ minWidth: 320 }}>
        {INTERNAL.map((n, i) => {
          const x = i === 0 ? 100 : 380;
          return (
            <g key={i}>
              <line x1={300} y1={38} x2={x + 60} y2={70} stroke={i === inI ? C.blue : C.axis} strokeWidth={i === inI ? 2 : 1} />
              {n.kids.map((k, j) => (
                <line key={k} x1={x + 20 + j * 40} y1={98} x2={leafX(k) + lw / 2} y2={140} stroke={i === inI && k === leafStart ? C.blue : C.axis} strokeWidth={i === inI && k === leafStart ? 2 : 1} />
              ))}
              <Node x={x} y={70} w={120} keys={n.keys} on={i === inI} />
            </g>
          );
        })}
        <Node x={260} y={10} w={80} keys={ROOT} on />
        {LEAVES.map((l, i) => (
          <g key={i}>
            <Node x={leafX(i)} y={140} w={lw} keys={l} on={leafHits.has(i)} kHi={(k) => k >= a && k <= b} />
            {i < LEAVES.length - 1 && <path d={`M${leafX(i) + lw + 1},154 L${leafX(i + 1) - 1},154`} stroke={leafHits.has(i) && leafHits.has(i + 1) ? C.blue : C.axis} markerEnd="url(#arr)" />}
          </g>
        ))}
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={C.muted} />
          </marker>
        </defs>
      </svg>
      <Legend items={[{ label: "visited node", color: C.blue }, { label: "matching key", color: C.yellow, box: true }]} />
    </VizFrame>
  );
};
