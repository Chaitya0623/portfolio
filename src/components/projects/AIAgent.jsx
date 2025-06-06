import { motion } from "framer-motion";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";
import { profile } from "../../assets";

const AIAgent = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          AI Agent for Social Media Trend Analysis
        </h2>
      </motion.div>

      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          1. Arbiter: AI-Powered Cross Platform Social Intelligence System
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          In the digital era, vast amounts of public discourse take place across
          platforms like Reddit, Telegram, and YouTube. For organizations aiming
          to understand social sentiment, track misinformation, or identify
          emerging community needs, manually sifting through this fragmented
          content is both inefficient and ineffective. There is a growing need
          for a unified, automated solution that can provide real time, topic
          wise insights from multiple sources of public data.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Developed under the guidance of UNICEF, <strong>Arbiter</strong> is a
          comprehensive AI-powered system designed to streamline multi platform
          social media analysis. The platform enables stakeholders to monitor
          and interpret over 120,000+ posts across diverse online spaces,
          offering topic specific intelligence that supports more informed
          decision making.
        </motion.p>

        <motion.h3
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[24px]"
        >
          AI Agent Capabilities
        </motion.h3>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          At the core of Arbiter is an autonomous AI Agent, built using
          LangGraph, capable of dynamically navigating data pipelines,
          performing contextual reasoning, and generating high quality insights.
          This agent doesn’t just fetch data, it analyzes trends, clusters
          discussions, detects anomalies, and generates visualizations tailored
          for actionable use.
        </motion.p>

        <motion.h3
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[24px]"
        >
          System Design & Highlights
        </motion.h3>

        <div className="text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>
              <strong>Cross-Platform Data Ingestion:</strong> Automated
              pipelines collect public posts and comments from Reddit, Telegram,
              and YouTube, normalizing content across varying data formats
            </li>
            <li>
              <strong>Topic-Wise Analysis:</strong> Conversations are
              semantically grouped using embedding based clustering (FAISS),
              allowing detailed breakdowns by theme
            </li>
            <li>
              <strong>LangGraph Orchestration:</strong> Each analysis task is
              broken down into nodes within a LangGraph, enabling structured
              reasoning steps like summarization, filtering, and ranking
            </li>
            <li>
              <strong>Modular & Scalable:</strong> Designed with extensibility
              in mind, Arbiter can easily incorporate additional platforms as needed
            </li>
          </ul>
        </div>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          2. What Can Arbiter's AI Agent Answer?
        </motion.h2>

        <div className="text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-5 space-y-1">
            <li>
              What is the engagement pattern for all the posts by the user XYZ?
            </li>
            <li>
              What posts showed the most engagement?
            </li>
            <li>
              What information do you have about politics?
            </li>
            <li>
              What posts showed the most engagement in february 2025?
            </li>
            <li>
              What users wrote the most posts on 20th feb 2025?
            </li>
            <li>
              Which user has shown the most engagement?
            </li>
            <li>
              What was the post that had the most likes and comments?
            </li>
            <li>
              Were there any engagement spikes in february, if yes, what was the content about?
            </li>
          </ul>
        </div>

        <motion.h3
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[24px]"
        >
          Future Questions that we aim to answer
        </motion.h3>

        <div className="text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>
              How has sentiment around vaccine safety evolved on Telegram since
              January?
            </li>
            <li>
              Which channels are contributing to misinformation around education
              policy?
            </li>
            <li>
              Can you summarize the top 3 concerns raised in YouTube comments
              about UNICEF’s recent campaign?
            </li>
            <li>
              Are there any emerging influencers or activist groups talking
              about child rights in Latin America?
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(AIAgent, "aiagent");
