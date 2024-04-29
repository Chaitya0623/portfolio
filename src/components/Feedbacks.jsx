import React from "react";
import { testimonials, competitions } from "../constants";

import { motion } from 'framer-motion'
import { styles } from '../styles'
import { fadeIn, textVariant } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.5, 0.75)}  >
      <div className='block justify-between items-center text-center gap-1 w-full'>
          <p className='text-white font-bold text-[48px]'>
           {name}
          </p>
          <img
            src={image}
            alt='project_image'
            className='sm:w-[50%] h-[60%] mx-auto object-cover rounded-2xl w-full mt-5'
          />
          <p className='mt-1 text-secondary text-[24px] mt-5 mb-10'>
            {testimonial}
          </p>
      </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center`}>International Competitions</h2>
    </motion.div>
    <div className={`bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[100px]`}
      >
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
        {competitions.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>

    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center mt-10`}>Hackathons</h2>
    </motion.div>
    <div className={`bg-black-100 rounded-[20px] mt-10`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[100px]`}
      >
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
    </>
  );
};

export default SectionWrapper(Feedbacks, "achievements");