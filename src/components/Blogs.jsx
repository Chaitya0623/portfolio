import React from "react";
import { personal_blogs, case_studies } from "../constants";

import { motion } from 'framer-motion'
import { styles } from '../styles'
import { fadeIn, textVariant } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'
import { Tilt } from 'react-tilt'

const BlogsCard = ({
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
          className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-[#3a3a3a] shadow-[0_0_10px_rgba(255,204,0,0.3),_0_0_20px_rgba(255,105,180,0.2)]'
        >
          <div className='relative w-full h-[200px]'>
            {source_code_link ? (
              <a href={`${source_code_link}`} className='block w-full h-full'>
                <img
                  src={image}
                  alt='project_image'
                  className='w-full h-full object-cover rounded-2xl'
                />
              </a>
            ) : (
              <img
                src={image}
                alt='project_image'
                className='w-full h-full object-cover rounded-2xl'
              />
            )}
          </div>
  
          <div className='mt-5'>
            <h3 className='text-white font-bold text-[20px] text-center'>{name}</h3>
            <p className='mt-2 text-secondary text-[14px] text-center'>{description}</p>
          </div>
  
          <div className='flex flex-wrap gap-2'>
            {tags && tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </Tilt>
      </motion.div>
    );
  };

const Blogs = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center`}>Personal Blogs</h2>
    </motion.div>

    <div className='mt-10 flex flex-wrap justify-center gap-7'>
      {personal_blogs.map((project, index) => (
        <BlogsCard key={`project-${index}`} index={index} {...project} />
      ))}
    </div>



    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center mt-[50px]`}>Case Studies</h2>
    </motion.div>

    <div className='mt-10 flex flex-wrap justify-center gap-7'>
      {case_studies.map((project, index) => (
        <BlogsCard key={`project-${index}`} index={index} {...project} />
      ))}
    </div>
  </>
  );
};

export default SectionWrapper(Blogs, "achievements");