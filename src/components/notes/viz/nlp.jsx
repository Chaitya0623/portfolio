import React, { useMemo, useState } from "react";
import { C, VizFrame, Seg, Slider, range, useStepper } from "./kit";

/* ---------------- BPE ---------------- */

const CORPUS = { low: 5, lower: 2, newest: 6, widest: 3 };

const bpeFrames = (nMerges) => {
  let words = Object.entries(CORPUS).map(([w, c]) => ({ toks: [...w, "_"], c }));
  const frames = [{ words: words.map((w) => ({ ...w, toks: [...w.toks] })), merge: null, pairs: [] }];
  for (let m = 0; m < nMerges; m++) {
    const cnt = {};
    words.forEach(({ toks, c }) => toks.slice(0, -1).forEach((t, i) => { const k = `${t} ${toks[i + 1]}`; cnt[k] = (cnt[k] || 0) + c; }));
    const pairs = Object.entries(cnt).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    if (!pairs.length) break;
    const [best] = pairs[0];
    const [a, b] = best.split(" ");
    words = words.map(({ toks, c }) => {
      const out = [];
      for (let i = 0; i < toks.length; i++) {
        if (toks[i] === a && toks[i + 1] === b) out.push(a + b), i++;
        else out.push(toks[i]);
      }
      return { toks: out, c };
    });
    frames.push({ words: words.map((w) => ({ ...w, toks: [...w.toks] })), merge: [a, b, pairs[0][1]], pairs: pairs.slice(0, 5) });
  }
  return frames;
};

export const BPE = () => {
  const frames = useMemo(() => bpeFrames(10), []);
  const [i, controls] = useStepper(frames.length, 1100);
  const f = frames[i];
  const vocab = new Set(frames.slice(0, i + 1).flatMap((fr) => fr.words.flatMap((w) => w.toks)));
  return (
    <VizFrame
      title="Byte Pair Encoding, merge by merge"
      controls={controls}
      caption="Start from characters (_ marks the end of a word). Count every adjacent pair, weighted by how often each word occurs, merge the most frequent pair into a new token, and repeat. Frequent words end up as single tokens; rare words stay split into reusable subwords, so nothing is ever out-of-vocabulary."
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4">
        <div className="flex flex-col gap-2">
          {f.words.map((w) => (
            <div key={w.toks.join("")} className="flex items-center gap-2">
              <span className="text-[12px] text-[#9a9a9a] w-10 text-right tabular-nums">×{w.c}</span>
              <div className="flex gap-1 flex-wrap">
                {w.toks.map((t, k) => <span key={k} className={`px-2 py-1 rounded-md text-[13px] font-mono border ${f.merge && t === f.merge[0] + f.merge[1] ? "border-[#c98500] bg-[#c98500]/20 text-white" : "border-[#3a3a3a] text-secondary"}`}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className="text-[13px] text-secondary">
          {f.merge ? <div className="mb-2">Merge #{i}: <code className="text-white">{f.merge[0]}</code> + <code className="text-white">{f.merge[1]}</code> → <code className="text-[#c98500]">{f.merge[0] + f.merge[1]}</code> (count {f.merge[2]})</div> : <div className="mb-2">Step 0: characters only</div>}
          {f.pairs.length > 0 && <div className="text-[12px] text-[#9a9a9a]">Top pairs this round: {f.pairs.map(([p, c]) => `"${p}" ${c}`).join(", ")}</div>}
          <div className="mt-2 text-[12px] text-[#9a9a9a]">Vocabulary size: {vocab.size}</div>
        </div>
      </div>
    </VizFrame>
  );
};

/* ---------------- N-gram ---------------- */

const SENTS = [
  "i like deep learning",
  "i like machine learning",
  "i love machine learning",
  "deep learning is fun",
  "machine learning is fun",
  "i like nlp",
];

export const Bigram = () => {
  const [word, setWord] = useState("i");
  const counts = useMemo(() => {
    const c = {};
    SENTS.forEach((s) => { const t = ["<s>", ...s.split(" "), "</s>"]; t.slice(0, -1).forEach((w, i) => { c[w] = c[w] || {}; c[w][t[i + 1]] = (c[w][t[i + 1]] || 0) + 1; }); });
    return c;
  }, []);
  const next = Object.entries(counts[word] || {}).sort((a, b) => b[1] - a[1]);
  const tot = next.reduce((s, [, v]) => s + v, 0);
  return (
    <VizFrame
      title="Bigram language model"
      controls={<Seg value={word} onChange={setWord} options={["<s>", "i", "like", "machine", "deep", "learning", "is"]} />}
      caption={`Trained on: ${SENTS.map((s) => `"${s}"`).join(", ")}. P(next | "${word}") = count("${word} next") / count("${word}"). Pick the previous word to see the predicted next-word distribution. Unseen pairs get probability 0, which is why real n-gram models use smoothing.`}
    >
      <svg viewBox={`0 0 600 ${24 + next.length * 32}`} className="w-full h-auto" style={{ minWidth: 320 }}>
        {next.map(([w, c], i) => (
          <g key={w}>
            <text x="110" y={30 + i * 32} fontSize="13" fill={C.text} textAnchor="end">{w}</text>
            <rect x="120" y={14 + i * 32} width={Math.max(3, (c / tot) * 400)} height="22" rx="4" fill={C.blue} />
            <text x={126 + (c / tot) * 400} y={30 + i * 32} fontSize="12" fill={C.text}>{c}/{tot} = {(c / tot).toFixed(2)}</text>
          </g>
        ))}
      </svg>
    </VizFrame>
  );
};

/* ---------------- TF-IDF ---------------- */

const DOCS = ["the cat sat on the mat", "the dog sat on the log", "cats and dogs are pets", "the mat was red"];

export const TFIDF = () => {
  const [d, setD] = useState(0);
  const toks = DOCS.map((s) => s.split(" "));
  const vocab = [...new Set(toks.flat())];
  const idf = Object.fromEntries(vocab.map((w) => [w, Math.log(DOCS.length / toks.filter((t) => t.includes(w)).length)]));
  const rows = [...new Set(toks[d])].map((w) => { const tf = toks[d].filter((x) => x === w).length / toks[d].length; return { w, tf, idf: idf[w], s: tf * idf[w] }; }).sort((a, b) => b.s - a.s);
  const max = Math.max(...rows.map((r) => r.s), 0.01);
  return (
    <VizFrame
      title="TF-IDF: what makes a word important in this document?"
      controls={<Seg value={d} onChange={setD} options={DOCS.map((s, i) => ({ value: i, label: `Doc ${i + 1}` }))} />}
      caption={`TF = count in doc / doc length; IDF = ln(N / number of docs containing the word), N = ${DOCS.length}. "the" appears in 3 of 4 docs, so it scores low even though it is the most frequent word; words unique to this document score highest.`}
    >
      <div className="font-mono text-[13px] text-white mb-3">&ldquo;{DOCS[d]}&rdquo;</div>
      <table className="text-[13px] text-secondary w-full max-w-[560px]">
        <thead><tr className="text-[#9a9a9a] text-left"><th className="font-normal">term</th><th className="font-normal">TF</th><th className="font-normal">IDF</th><th className="font-normal w-1/2">TF × IDF</th></tr></thead>
        <tbody className="tabular-nums">
          {rows.map((r) => (
            <tr key={r.w}>
              <td className="pr-3 text-white">{r.w}</td><td>{r.tf.toFixed(2)}</td><td>{r.idf.toFixed(2)}</td>
              <td><div className="flex items-center gap-2"><div className="h-3 rounded" style={{ width: `${(r.s / max) * 70}%`, minWidth: 2, background: C.blue }} />{r.s.toFixed(3)}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </VizFrame>
  );
};

/* ---------------- Attention ---------------- */

// Tiny hand-built 4-d embeddings (dims ≈ animal-ness, place-ness, state, function word).
const TOK = ["the", "animal", "didn't", "cross", "the ", "street", "because", "it", "was", "tired"];
const EMB = {
  the: [0, 0, 0, 1], animal: [1, 0, 0.2, 0], "didn't": [0, 0, 0.3, 0.6], cross: [0.2, 0.4, 0.1, 0], "the ": [0, 0, 0, 1],
  street: [0, 1, 0, 0], because: [0, 0, 0.1, 0.8], it: [0.8, 0.5, 0.3, 0.3], was: [0, 0, 0.5, 0.6], tired: [0.7, 0, 1, 0],
};
const WQ = [[2, 0, 0, 0], [0, 1.2, 0, 0], [0, 0, 1.5, 0], [0, 0, 0, 0.3]];
const WK = [[2, 0, 0, 0], [0, 1.2, 0, 0], [0, 0, 1.5, 0], [0, 0, 0, 0.3]];
const mv = (M, v) => M.map((r) => r.reduce((s, x, i) => s + x * v[i], 0));

export const Attention = () => {
  const [q, setQ] = useState(7);
  const [scale, setScale] = useState(true);
  const [causal, setCausal] = useState(false);
  const d = 4;
  const Q = TOK.map((t) => mv(WQ, EMB[t])), K = TOK.map((t) => mv(WK, EMB[t]));
  const weights = (qi) => {
    const s = K.map((k, j) => (causal && j > qi ? -Infinity : Q[qi].reduce((a, x, i) => a + x * k[i], 0) / (scale ? Math.sqrt(d) : 1)));
    const m = Math.max(...s.filter(Number.isFinite));
    const e = s.map((v) => (Number.isFinite(v) ? Math.exp(v - m) : 0));
    const z = e.reduce((a, b) => a + b);
    return e.map((v) => v / z);
  };
  const W = TOK.map((_, i) => weights(i));
  const cell = 34;
  return (
    <VizFrame
      title="Scaled dot-product self-attention"
      controls={<><label className="flex items-center gap-2 text-[13px] text-secondary"><input type="checkbox" checked={scale} onChange={() => setScale(!scale)} className="accent-[#c98500]" />divide by √d</label><label className="flex items-center gap-2 text-[13px] text-secondary"><input type="checkbox" checked={causal} onChange={() => setCausal(!causal)} className="accent-[#c98500]" />causal mask (decoder)</label></>}
      caption="Toy 4-dimensional embeddings, hand-built for illustration rather than learned. Each row is a query token; the row is softmax(q·kᵀ/√d) over all keys and sums to 1. Click a row: the output for that token is the weighted average of the value vectors. 'it' puts its largest weight on 'animal', not on 'street'. With the causal mask a token can't see future tokens, which is what GPT-style decoders do."
    >
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="overflow-x-auto">
          <div className="inline-grid" style={{ gridTemplateColumns: `70px repeat(${TOK.length}, ${cell}px)` }}>
            <div />
            {TOK.map((t, j) => <div key={j} className="text-[10px] text-[#9a9a9a] h-16 flex items-end justify-center pb-1"><span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{t}</span></div>)}
            {TOK.map((t, i) => (
              <React.Fragment key={i}>
                <button onClick={() => setQ(i)} className={`text-[12px] text-right pr-2 ${i === q ? "text-[#c98500] font-semibold" : "text-secondary"}`}>{t}</button>
                {W[i].map((w, j) => <div key={j} onClick={() => setQ(i)} title={`${t} → ${TOK[j]}: ${w.toFixed(3)}`} className={`cursor-pointer ${i === q ? "ring-1 ring-[#c98500]" : ""}`} style={{ width: cell, height: 24, background: `rgba(57,135,229,${0.05 + w * 1.6})`, border: "1px solid #0d0d0d" }} />)}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex-1 min-w-[220px]">
          <div className="text-[12px] text-[#9a9a9a] mb-1">Attention weights for query &ldquo;{TOK[q]}&rdquo;</div>
          {W[q].map((w, j) => (
            <div key={j} className="flex items-center gap-2 text-[12px] text-secondary">
              <span className="w-16 text-right">{TOK[j]}</span>
              <div className="h-3 rounded" style={{ width: `${w * 160}px`, minWidth: 1, background: C.blue }} />
              <span className="tabular-nums">{w.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </VizFrame>
  );
};

/* ---------------- Decoding ---------------- */

const NEXT = [["learning", 3.1], ["models", 2.4], ["networks", 2.2], ["data", 1.6], ["is", 1.1], ["the", 0.7], ["banana", -0.5], ["purple", -1.2]];

export const Decoding = () => {
  const [T, setT] = useState(1);
  const [topP, setTopP] = useState(0.9);
  const [topK, setTopK] = useState(8);
  const ex = NEXT.map(([, z]) => Math.exp(z / T));
  const Z = ex.reduce((a, b) => a + b);
  const probs = NEXT.map(([w], i) => ({ w, p: ex[i] / Z })).sort((a, b) => b.p - a.p);
  let cum = 0;
  const kept = probs.map((x, i) => { const keep = i < topK && cum < topP; cum += x.p; return { ...x, keep }; });
  const kz = kept.filter((x) => x.keep).reduce((s, x) => s + x.p, 0);
  return (
    <VizFrame
      title='Decoding: temperature, top-k and nucleus (top-p) sampling'
      controls={<><Slider label="Temperature" value={T} min={0.1} max={3} step={0.05} onChange={setT} /><Slider label="top-k" value={topK} min={1} max={8} onChange={setTopK} /><Slider label="top-p" value={topP} min={0.05} max={1} step={0.01} onChange={setTopP} /></>}
      caption={`Next token after "deep …". Nucleus sampling keeps the smallest set of most-likely tokens whose cumulative probability reaches p, so the candidate list grows or shrinks with the model's confidence; top-k always keeps exactly k. Kept tokens are renormalised (right column) before sampling. Currently ${kept.filter((x) => x.keep).length} candidate(s).`}
    >
      <table className="text-[13px] text-secondary w-full max-w-[600px]">
        <thead><tr className="text-[#9a9a9a] text-left"><th className="font-normal">token</th><th className="font-normal w-1/2">probability</th><th className="font-normal">cumulative</th><th className="font-normal">after filter</th></tr></thead>
        <tbody className="tabular-nums">
          {(() => { let c = 0; return kept.map((x) => { c += x.p; return (
            <tr key={x.w} className={x.keep ? "" : "opacity-40"}>
              <td className="pr-3 text-white">{x.w}</td>
              <td><div className="flex items-center gap-2"><div className="h-3 rounded" style={{ width: `${x.p * 100}%`, minWidth: 2, background: x.keep ? C.blue : C.muted }} />{(x.p * 100).toFixed(1)}%</div></td>
              <td>{(c * 100).toFixed(0)}%</td>
              <td>{x.keep ? `${((x.p / kz) * 100).toFixed(1)}%` : "dropped"}</td>
            </tr>); }); })()}
        </tbody>
      </table>
    </VizFrame>
  );
};

// A tiny tree of next-token probabilities where greedy picks a worse sequence than beam search.
const TREE = {
  "": [["The", 0.5], ["A", 0.4], ["Nice", 0.1]],
  The: [["dog", 0.4], ["nice", 0.35], ["car", 0.25]],
  A: [["cat", 0.9], ["dog", 0.1]],
  Nice: [["day", 0.6], ["one", 0.4]],
  "The dog": [["runs", 0.5], ["barks", 0.5]],
  "The nice": [["woman", 0.6], ["man", 0.4]],
  "The car": [["stops", 0.9], ["goes", 0.1]],
  "A cat": [["sleeps", 0.8], ["eats", 0.2]],
  "A dog": [["sits", 1.0]],
  "Nice day": [["!", 1.0]],
  "Nice one": [["!", 1.0]],
};

export const BeamSearch = () => {
  const [k, setK] = useState(2);
  const steps = useMemo(() => {
    let beams = [{ seq: "", p: 1 }];
    const out = [beams];
    for (let t = 0; t < 3; t++) {
      const cand = beams.flatMap((b) => (TREE[b.seq] || []).map(([w, p]) => ({ seq: (b.seq ? b.seq + " " : "") + w, p: b.p * p })));
      beams = cand.sort((a, b) => b.p - a.p).slice(0, k);
      out.push(cand.map((c) => ({ ...c, kept: beams.includes(c) })));
    }
    return out;
  }, [k]);
  const final = steps[3].filter((c) => c.kept).sort((a, b) => b.p - a.p);
  return (
    <VizFrame
      title="Greedy decoding vs beam search"
      controls={<Seg value={k} onChange={setK} options={[{ value: 1, label: "k = 1 (greedy)" }, { value: 2, label: "k = 2" }, { value: 3, label: "k = 3" }]} />}
      caption="At each step, every kept sequence is extended by every next token, and only the k most probable sequences (by product of probabilities) survive. Greedy commits to 'The' (0.5) and ends at 0.5 × 0.4 × 0.5 = 0.10; a beam of 2 keeps 'A' alive and finds 'A cat sleeps' = 0.4 × 0.9 × 0.8 = 0.288."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[1, 2, 3].map((t) => (
          <div key={t}>
            <div className="text-[12px] text-[#9a9a9a] mb-1">step {t}</div>
            {steps[t].sort((a, b) => b.p - a.p).map((c) => (
              <div key={c.seq} className={`text-[12px] font-mono rounded px-2 py-1 mb-1 border ${c.kept ? "border-[#199e70] text-white" : "border-[#2a2a2a] text-[#666]"}`}>
                {c.seq} <span className="float-right tabular-nums">{c.p.toFixed(3)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 text-[13px] text-secondary">Best output: <span className="text-white font-mono">{final[0]?.seq}</span> (p = {final[0]?.p.toFixed(3)})</div>
    </VizFrame>
  );
};

export const CbowSkipgram = () => {
  const [mode, setMode] = useState("cbow");
  const [win, setWin] = useState(2);
  const [c, setC] = useState(3);
  const words = "the quick brown fox jumps over the lazy dog".split(" ");
  const ctx = range(words.length).filter((i) => i !== c && Math.abs(i - c) <= win);
  return (
    <VizFrame
      title="Word2Vec: CBOW vs skip-gram training pairs"
      controls={<><Seg value={mode} onChange={setMode} options={[{ value: "cbow", label: "CBOW" }, { value: "skip", label: "Skip-gram" }]} /><Slider label="Window" value={win} min={1} max={4} onChange={setWin} /><Slider label="Centre word" value={c} min={0} max={words.length - 1} onChange={setC} format={(v) => words[v]} /></>}
      caption="CBOW predicts the centre word from the (averaged) surrounding words; skip-gram does the reverse and predicts each surrounding word from the centre word. Sliding this window over a large corpus produces the training examples, and the learned hidden layer becomes the word embedding."
    >
      <div className="flex flex-wrap gap-1.5 mb-3">
        {words.map((w, i) => <span key={i} className={`px-2 py-1 rounded-md text-[13px] border ${i === c ? "border-[#c98500] bg-[#c98500]/20 text-white" : ctx.includes(i) ? "border-[#3987e5] bg-[#3987e5]/15 text-white" : "border-[#2a2a2a] text-[#777]"}`}>{w}</span>)}
      </div>
      <div className="font-mono text-[13px] text-secondary">
        {mode === "cbow"
          ? <div>input: [{ctx.map((i) => words[i]).join(", ")}] → predict: <span className="text-[#c98500]">{words[c]}</span></div>
          : ctx.map((i) => <div key={i}>input: <span className="text-[#c98500]">{words[c]}</span> → predict: {words[i]}</div>)}
      </div>
    </VizFrame>
  );
};
