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
            I am driven by a deep curiosity about human behavior, and a desire
            to build scalable systems that don't just predict our actions, but
            enable better decision making. As an incoming Data Science grad
            student at Columbia University, I'm continuing to deepen my work at
            the intersection of Artificial Intelligence, systems design and
            human impact.
          </motion.p>

          <motion.p
            variants={fadeIn("", "", 0.1, 0.1)}
            className="mt-5 text-secondary text-[17px] leading-[30px] text-center"
          >
            I have led cross functional teams to build AI powered platforms from
            the ground up, working alongside nonprofit leadership to develop a
            new product vertical backed by Mozilla and Google. My work spans the
            full stack of data driven development, from crafting predictive
            models and GenAI applications to deploying robust, production ready
            solutions. My goal is to build solutions that move beyond research,
            bridging the gap between innovation and implementation to create
            tangible value in the real world.
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
