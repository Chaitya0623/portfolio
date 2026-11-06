import React, { Suspense } from "react";
import { VIZ } from "./viz";

/*
  A deliberately small Markdown subset, so the notes can stay as plain text files:
    ## / ### / ####  headings          - item (2 spaces per nesting level)  bullets
    ```...```        code blocks        $ formula                            display formula
    ::viz <id>       interactive viz    blank line                           paragraph break
  Inline: **bold**, `code`, [text](url) and bare URLs.
*/

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const INLINE = /(\*\*.+?\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s)]+)/g;

const Inline = ({ text }) =>
  text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**")) return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`")) return <code key={i} className="px-1.5 py-0.5 rounded bg-[#1c1c1c] text-[#f0c36a] text-[0.9em]">{part.slice(1, -1)}</code>;
    const md = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    const href = md ? md[2] : /^https?:\/\//.test(part) ? part.replace(/[.,;]$/, "") : null;
    if (href)
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-words">
          {md ? md[1] : href}
        </a>
      );
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });

export const parseNotes = (src) => {
  const lines = src.replace(/\r/g, "").split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith("```")) {
      const body = [];
      for (i++; i < lines.length && !lines[i].startsWith("```"); i++) body.push(lines[i]);
      blocks.push({ type: "code", text: body.join("\n") });
      i++;
      continue;
    }
    const h = line.match(/^(#{2,4})\s+(.*)/);
    if (h) { blocks.push({ type: `h${h[1].length}`, text: h[2] }); i++; continue; }
    const v = line.match(/^::viz\s+([\w-]+)/);
    if (v) { blocks.push({ type: "viz", id: v[1] }); i++; continue; }
    if (line.startsWith("$ ")) { blocks.push({ type: "formula", text: line.slice(2) }); i++; continue; }
    if (/^\s*- /.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*- /.test(lines[i])) {
        const m = lines[i].match(/^(\s*)- (.*)/);
        items.push({ level: Math.floor(m[1].length / 2), text: m[2] });
        i++;
        // continuation lines (indented, not a new bullet) belong to the previous item
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*- /.test(lines[i]) && !/^\s*\$ /.test(lines[i])) items[items.length - 1].text += " " + lines[i++].trim();
        if (i < lines.length && /^\s+\$ /.test(lines[i])) items[items.length - 1].formula = lines[i++].trim().slice(2);
      }
      blocks.push({ type: "list", items });
      continue;
    }
    const para = [line];
    for (i++; i < lines.length && lines[i].trim() && !/^(#{2,4}\s|```|::viz|\s*- |\$ )/.test(lines[i]); i++) para.push(lines[i]);
    blocks.push({ type: "p", text: para.join(" ") });
  }
  return blocks;
};

const List = ({ items }) => {
  // Turn the flat (level, text) list into a nested tree.
  const root = { children: [] };
  const stack = [{ node: root, level: -1 }];
  items.forEach((it) => {
    const node = { ...it, children: [] };
    while (stack.length > 1 && stack[stack.length - 1].level >= it.level) stack.pop();
    stack[stack.length - 1].node.children.push(node);
    stack.push({ node, level: it.level });
  });
  const render = (nodes, depth) => (
    <ul className={`${depth ? "mt-1 ml-5" : "mt-3"} space-y-1.5 ${["list-disc", "list-[circle]", "list-[square]"][depth % 3]} marker:text-[#6b6b6b] pl-5`}>
      {nodes.map((n, k) => (
        <li key={k} className="text-secondary text-[17px] leading-relaxed">
          <Inline text={n.text} />
          {n.formula && <div className="my-2 font-mono text-[14px] text-white bg-[#141414] border border-[#2a2a2a] rounded-lg px-3 py-2 overflow-x-auto">{n.formula}</div>}
          {n.children.length > 0 && render(n.children, depth + 1)}
        </li>
      ))}
    </ul>
  );
  return render(root.children, 0);
};

const NoteRenderer = ({ src }) => {
  const blocks = parseNotes(src);
  // Long chapters get a row of section links (buttons, so the URL hash keeps selecting the chapter).
  const sections = blocks.filter((b) => b.type === "h3").map((b) => b.text);
  return (
    <div className="w-full">
      {sections.length >= 6 && (
        <nav aria-label="Sections" className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1.5 border-l-2 border-[#3a3a3a] pl-4">
          <span className="text-[12px] uppercase tracking-wider text-[#9a9a9a]">Jump to</span>
          {sections.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => document.getElementById(slugify(t))?.scrollIntoView({ behavior: "smooth" })}
              className="text-[14px] text-[#6fa3f3] hover:text-white hover:underline underline-offset-4"
            >
              {t}
            </button>
          ))}
        </nav>
      )}
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i} id={slugify(b.text)} className="scroll-mt-28 mt-14 mb-2 text-white text-[26px] sm:text-[30px] font-bold border-b border-[#2a2a2a] pb-2">{b.text}</h2>;
          case "h3":
            return <h3 key={i} id={slugify(b.text)} className="scroll-mt-28 mt-8 text-white text-[20px] sm:text-[22px] font-semibold">{b.text}</h3>;
          case "h4":
            return <h4 key={i} className="mt-6 text-[#f0c36a] text-[17px] font-semibold">{b.text}</h4>;
          case "p":
            return <p key={i} className="mt-3 text-secondary text-[17px] leading-relaxed"><Inline text={b.text} /></p>;
          case "formula":
            return <div key={i} className="my-3 font-mono text-[14px] text-white bg-[#141414] border border-[#2a2a2a] rounded-lg px-3 py-2 overflow-x-auto">{b.text}</div>;
          case "code":
            return <pre key={i} className="my-3 text-[13px] leading-relaxed text-[#d4d4d4] bg-[#141414] border border-[#2a2a2a] rounded-lg p-3 overflow-x-auto"><code>{b.text}</code></pre>;
          case "list":
            return <List key={i} items={b.items} />;
          case "viz": {
            const V = VIZ[b.id];
            return V ? <Suspense key={i} fallback={null}><V /></Suspense> : null;
          }
          default:
            return null;
        }
      })}
    </div>
  );
};

export default NoteRenderer;
