import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import SectionWrapper from "../hoc/SectionWrapper";
import { profile } from "../assets";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2
          className={`${styles.sectionHeadText} text-center mt-[0px] sm:mt-[25px]`}
        >
          Chaitya Shah
        </h2>
      </motion.div>

      <div className="sm:flex items-center justify-center">
        <div className="sm:w-1/3 mt-5 sm:mt-3 mb-5 sm:mb-0 flex justify-center items-center">
          <img
            src={profile}
            alt="Your Photo"
            className="rounded-[20px] w-70 h-70 object-cover border border-[#000000] shadow-[0_0_10px_rgba(255,204,0,0.3),_0_0_20px_rgba(255,105,180,0.2)]"
          />
        </div>

        <div className="w-full md:w-2/3 sm:ml-10 flex flex-col items-start">
          <motion.p
            variants={fadeIn("", "", 0.1, 0.1)}
            className="mt-5 text-secondary text-[17px] leading-[30px] text-center"
          >
            I build AI systems that go from research to production. I&apos;m a
            Data Science grad student at Columbia University
            (graduating December 2026), specializing in NLP and large scale
            machine learning. Most recently, I was a Summer Associate at
            JPMorganChase&apos;s Machine Learning Center of Excellence, working
            on applied LLM research for financial applications.
          </motion.p>

          <motion.p
            variants={fadeIn("", "", 0.1, 0.1)}
            className="mt-5 text-secondary text-[17px] leading-[30px] text-center"
          >
            Before that, as the Founding AI Engineer at SimPPL (backed by
            Mozilla, Google and UNICEF), I led a team building an AI powered
            social network analytics platform that processed 1M+ interactions
            for 20K+ users. I&apos;ve shipped production systems using LLM
            agents, model fine tuning and cloud workflows, and have five
            published papers spanning NLP, machine learning and computational
            social science.
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
