import React, { useMemo, useState } from "react";
import { C, VizFrame, Seg, Legend } from "./kit";

/* ---------------- Window functions / PARTITION BY ---------------- */

// Same employees table as the SQL notes.
const EMPLOYEES = [
  { name: "Asha", dept: "Eng", salary: 120000 },
  { name: "Ben", dept: "Eng", salary: 95000 },
  { name: "Chen", dept: "Eng", salary: 95000 },
  { name: "Gia", dept: "Eng", salary: 90000 },
  { name: "Dev", dept: "Sales", salary: 70000 },
  { name: "Ella", dept: "Sales", salary: 82000 },
  { name: "Farah", dept: "HR", salary: 65000 },
];
const DEPTS = ["Eng", "Sales", "HR"];
const DEPT_COLOR = { Eng: C.blue, Sales: C.orange, HR: C.aqua };

const FUNCS = [
  { value: "ROW_NUMBER", label: "ROW_NUMBER" },
  { value: "RANK", label: "RANK" },
  { value: "DENSE_RANK", label: "DENSE_RANK" },
  { value: "SUM", label: "running SUM" },
  { value: "AVG", label: "AVG" },
  { value: "LAG", label: "LAG" },
];

const money = (v) => (v == null ? "NULL" : v.toLocaleString("en-US", { maximumFractionDigits: 0 }));

const compute = (fn, partitioned) => {
  const groups = partitioned ? DEPTS.map((d) => EMPLOYEES.filter((e) => e.dept === d)) : [EMPLOYEES];
  return groups.flatMap((g) => {
    // ORDER BY salary DESC (name breaks ties so ROW_NUMBER is stable here)
    const rows = [...g].sort((a, b) => b.salary - a.salary || a.name.localeCompare(b.name));
    const avg = rows.reduce((s, r) => s + r.salary, 0) / rows.length;
    return rows.map((r, i) => {
      const higher = rows.filter((x) => x.salary > r.salary);
      let value;
      if (fn === "ROW_NUMBER") value = i + 1;
      else if (fn === "RANK") value = higher.length + 1;
      else if (fn === "DENSE_RANK") value = new Set(higher.map((x) => x.salary)).size + 1;
      // default RANGE frame: tied rows (peers) are included in each other's running total
      else if (fn === "SUM") value = money(rows.filter((x) => x.salary >= r.salary).reduce((s, x) => s + x.salary, 0));
      else if (fn === "AVG") value = money(avg);
      else value = money(i ? rows[i - 1].salary : null);
      return { ...r, value, first: i === 0 };
    });
  });
};

const sqlFor = (fn, partitioned) => {
  const part = partitioned ? "PARTITION BY dept " : "";
  if (fn === "AVG") return `AVG(salary) OVER (${partitioned ? "PARTITION BY dept" : ""})`;
  const call = fn === "SUM" ? "SUM(salary)" : fn === "LAG" ? "LAG(salary)" : `${fn}()`;
  return `${call} OVER (${part}ORDER BY salary DESC)`;
};

const CAPTIONS = {
  ROW_NUMBER: "Numbers rows 1, 2, 3… inside each partition. Ties (Ben and Chen) still get different numbers, and which one comes first is arbitrary unless you add a tie-breaker to ORDER BY.",
  RANK: "Ties share a rank, then the next rank is skipped: Ben and Chen are both 2, so Gia is 4.",
  DENSE_RANK: "Ties share a rank with no gap afterwards: Ben and Chen are both 2, so Gia is 3. Use this for “Nth highest salary”.",
  SUM: "A running total down the ordered rows. With the default RANGE frame, tied rows (Ben and Chen) are added together, so both show the same total. ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW would add them one at a time.",
  AVG: "With no ORDER BY, the frame is the whole partition, so every row shows its group’s average without collapsing rows like GROUP BY would.",
  LAG: "The previous row’s salary in the window order. The first row of each partition has no previous row, so it gets NULL.",
};

export const SqlWindow = () => {
  const [fn, setFn] = useState("RANK");
  const [partitioned, setPartitioned] = useState(true);
  const rows = useMemo(() => compute(fn, partitioned), [fn, partitioned]);

  return (
    <VizFrame
      title="Window functions with PARTITION BY"
      controls={
        <>
          <Seg options={FUNCS} value={fn} onChange={setFn} />
          <Seg
            options={[
              { value: "on", label: "PARTITION BY dept" },
              { value: "off", label: "no partition" },
            ]}
            value={partitioned ? "on" : "off"}
            onChange={(v) => setPartitioned(v === "on")}
          />
        </>
      }
      caption={CAPTIONS[fn]}
    >
      <pre className="mb-3 text-[13px] text-[#d4d4d4] bg-[#141414] border border-[#2a2a2a] rounded-lg p-3 overflow-x-auto">
        <code>
          {"SELECT name, dept, salary,\n       "}
          <span className="font-mono text-[#f0c36a]">{sqlFor(fn, partitioned)}</span>
          {" AS result\nFROM employees;"}
        </code>
      </pre>
      <table className="w-full min-w-[420px] text-[14px] tabular-nums border-separate border-spacing-0">
        <thead>
          <tr className="text-left text-[12px] uppercase tracking-wider text-[#9a9a9a]">
            <th className="py-2 pl-3 font-medium">name</th>
            <th className="py-2 font-medium">dept</th>
            <th className="py-2 pr-4 font-medium text-right">salary</th>
            <th className="py-2 pr-3 font-medium text-right text-[#f0c36a]">result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="text-[#E0E0E0]">
              <td
                className={`py-1.5 pl-3 ${partitioned && r.first ? "border-t-2 border-[#3a3a3a]" : "border-t border-[#202020]"}`}
                style={{ boxShadow: `inset 4px 0 0 ${partitioned ? DEPT_COLOR[r.dept] : C.axis}` }}
              >
                {r.name}
              </td>
              <td className={`py-1.5 ${partitioned && r.first ? "border-t-2 border-[#3a3a3a]" : "border-t border-[#202020]"}`}>{r.dept}</td>
              <td className={`py-1.5 pr-4 text-right ${partitioned && r.first ? "border-t-2 border-[#3a3a3a]" : "border-t border-[#202020]"}`}>
                {money(r.salary)}
              </td>
              <td
                className={`py-1.5 pr-3 text-right font-semibold text-white ${partitioned && r.first ? "border-t-2 border-[#3a3a3a]" : "border-t border-[#202020]"}`}
              >
                {r.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3">
        <Legend
          items={
            partitioned
              ? DEPTS.map((d) => ({ label: `partition: ${d}`, color: DEPT_COLOR[d], box: true }))
              : [{ label: "one partition (whole table)", color: C.axis, box: true }]
          }
        />
      </div>
    </VizFrame>
  );
};
