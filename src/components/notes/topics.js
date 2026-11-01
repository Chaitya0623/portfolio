import programming from "./content/programming.md?raw";
import dsa from "./content/dsa.md?raw";
import os from "./content/operating-systems.md?raw";
import networks from "./content/computer-networks.md?raw";
import dbms from "./content/dbms.md?raw";
import mathematics from "./content/mathematics.md?raw";
import statistics from "./content/statistics.md?raw";
import eda from "./content/eda.md?raw";
import ml from "./content/machine-learning.md?raw";
import performance from "./content/ml-performance.md?raw";
import nlp from "./content/nlp.md?raw";
import dl from "./content/deep-learning.md?raw";
import ai from "./content/artificial-intelligence.md?raw";
import de from "./content/data-engineering.md?raw";
import cloud from "./content/cloud-computing.md?raw";
import tools from "./content/additional-tools.md?raw";
import blockchain from "./content/blockchain.md?raw";

// Card accents reuse the validated categorical slots from viz/kit.
// Each card is a group; its topics become chapters shown one at a time, with their sections dropped one level.
const groups = [
  {
    slug: "cs-fundamentals",
    short: "CS",
    name: "CS Fundamentals",
    accent: "#3987e5",
    parts: [
      ["Programming & Software Development", programming],
      ["Data Structures & Algorithms", dsa],
      ["Operating Systems", os],
      ["Computer Networks", networks],
      ["Database Management Systems", dbms],
      ["Blockchain & Smart Contracts", blockchain],
    ],
  },
  { slug: "math-statistics", short: "∑", name: "Math & Statistics", accent: "#9085e9", parts: [["Mathematics", mathematics], ["Statistics & Probability", statistics]] },
  {
    slug: "machine-learning",
    short: "ML",
    name: "Machine Learning",
    accent: "#199e70",
    parts: [
      ["Exploratory Data Analysis & Visualization", eda],
      ["Machine Learning", ml],
      ["Performance in Machine Learning", performance],
    ],
  },
  { slug: "deep-learning-nlp", short: "DL", name: "Deep Learning & NLP", accent: "#d55181", parts: [["Deep Learning", dl], ["Natural Language Processing", nlp]] },
  { slug: "ai-tools", short: "AI", name: "AI & Tools", accent: "#c98500", parts: [["Artificial Intelligence", ai], ["Additional Tools", tools]] },
  { slug: "data-engineering-cloud", short: "DE", name: "Data Engineering & Cloud", accent: "#d95926", parts: [["Data Engineering", de], ["Cloud Computing", cloud]] },
];

const demote = (src) => src.replace(/^(#{2,3}) /gm, "#$1 ");

export const notes_topics = groups.map((g) => ({
  ...g,
  chapters: g.parts.map(([title, body]) => ({ title, src: demote(body) })),
}));
