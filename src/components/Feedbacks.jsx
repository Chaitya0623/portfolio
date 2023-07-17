import React from "react";
import { testimonials } from "../constants";

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
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-[#0c235f] p-10 rounded-3xl xs:w-[320px] w-full'
  >
      <div className='mt-3 block justify-between items-center gap-1 w-full'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl w-full'
          />
        <div className='flex-1 flex flex-col mt-3'>
          <p className='text-white font-medium text-[16px]'>
           {name}
          </p>
          <p className='mt-1 text-secondary text-[12px]'>
            {testimonial}
          </p>
        </div>
      </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className={`bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <h2 className={styles.sectionHeadText}>Achievements</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");