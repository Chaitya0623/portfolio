import React from "react";
import { competitions } from "../constants";

import { motion } from 'framer-motion'
import { styles } from '../styles'
import { fadeIn, textVariant } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'
import { Tilt } from 'react-tilt'

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[200px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            {/* <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div> */}
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[20px] text-center'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px] text-center'>{description}</p>
        </div>

        {/* <div className='mt-4 flex flex-wrap gap-2'>
          {tags && tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div> */}
      </Tilt>
    </motion.div>
  );
};

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
            className='sm:w-[50%] h-[60%] mx-auto object-fill rounded-2xl w-full mt-5'
          />
          <p className='mt-1 text-secondary text-[24px] mt-5 mb-10'>
            {testimonial}
          </p>
      </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    // <>
    // <motion.div variants={textVariant()}>
    //   <h2 className={`${styles.sectionHeadText} text-center`}>International Competitions</h2>
    // </motion.div>
    // <div className={`bg-black-100 rounded-[20px]`}>
    //   <div
    //     className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[100px]`}
    //   >
    //   </div>
    //   <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
    //     {competitions.map((testimonial, index) => (
    //       <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
    //     ))}
    //   </div>
    // </div>

    // <motion.div variants={textVariant()}>
    //   <h2 className={`${styles.sectionHeadText} text-center mt-10`}>Hackathons</h2>
    // </motion.div>
    // <div className={`bg-black-100 rounded-[20px] mt-10`}>
    //   <div
    //     className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[100px]`}
    //   >
    //   </div>
    //   <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
    //     {testimonials.map((testimonial, index) => (
    //       <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
    //     ))}
    //   </div>
    // </div>
    // </>
    <>
    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center mt-[-50px]`}>Achievements</h2>
    </motion.div>



    <div className='mt-10 flex flex-wrap justify-center gap-7'>
      {competitions.map((project, index) => (
        <ProjectCard key={`project-${index}`} index={index} {...project} />
      ))}
    </div>
  </>
  );
};

export default SectionWrapper(Feedbacks, "achievements");