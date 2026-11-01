import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { textVariant } from "../../utils/motion";
import NoteRenderer, { slugify } from "./NoteRenderer";
import { notes_topics } from "./topics";

const NotePage = () => {
  const { slug } = useParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const idx = notes_topics.findIndex((t) => t.slug === slug);
  const topic = notes_topics[idx];
  // The active chapter lives in the URL hash so it can be linked to and survives refresh.
  const chIdx = topic ? Math.max(0, topic.chapters.findIndex((c) => `#${slugify(c.title)}` === hash)) : 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug, chIdx]);

  if (!topic)
    return (
      <section className={`${styles.padding} max-w-7xl mx-auto pt-28 text-secondary`}>
        Note not found. <Link to="/blogs" className="text-blue-400 hover:underline">Back to blogs</Link>
      </section>
    );

  const chapter = topic.chapters[chIdx];
  const goTo = (i) => navigate(`/blogs/notes/${slug}#${slugify(topic.chapters[i].title)}`);
  const prevTopic = notes_topics[idx - 1], nextTopic = notes_topics[idx + 1];
  const tab = (active) =>
    `text-[14px] rounded-full border px-4 py-1.5 transition-colors ${
      active ? "border-[#c98500] bg-[#c98500]/15 text-white" : "border-[#3a3a3a] text-secondary hover:text-white hover:border-[#c98500]"
    }`;

  return (
    <section className={`${styles.padding} max-w-7xl mx-auto relative z-0 pt-28`}>
      <Link to="/blogs" className="text-[14px] text-[#9a9a9a] hover:text-white">← All notes</Link>
      <motion.div variants={textVariant()} initial="hidden" animate="show">
        <h1 className={`${styles.sectionHeadText} mt-2 leading-tight`}>{topic.name}</h1>
      </motion.div>

      {topic.chapters.length > 1 && (
        <nav className="mt-6 flex flex-wrap gap-2">
          {topic.chapters.map((c, i) => (
            <button key={c.title} onClick={() => goTo(i)} className={tab(i === chIdx)}>
              {c.title}
            </button>
          ))}
        </nav>
      )}

      <h2 className="mt-10 text-white text-[30px] sm:text-[36px] font-bold">{chapter.title}</h2>
      <div className="mt-2">
        <NoteRenderer key={`${slug}-${chIdx}`} src={chapter.src} />
      </div>

      <div className="mt-16 pt-6 border-t border-[#2a2a2a] flex justify-between gap-4 text-[15px]">
        {chIdx > 0 ? (
          <button onClick={() => goTo(chIdx - 1)} className="text-secondary hover:text-white text-left">← {topic.chapters[chIdx - 1].title}</button>
        ) : prevTopic ? (
          <Link to={`/blogs/notes/${prevTopic.slug}`} className="text-secondary hover:text-white">← {prevTopic.name}</Link>
        ) : <span />}
        {chIdx < topic.chapters.length - 1 ? (
          <button onClick={() => goTo(chIdx + 1)} className="text-secondary hover:text-white text-right">{topic.chapters[chIdx + 1].title} →</button>
        ) : nextTopic ? (
          <Link to={`/blogs/notes/${nextTopic.slug}`} className="text-secondary hover:text-white text-right">{nextTopic.name} →</Link>
        ) : <span />}
      </div>
    </section>
  );
};

export default NotePage;
