import React from "react";
import { personal_blogs } from "../constants";

import { motion } from 'framer-motion'
import { styles } from '../styles'
import { fadeIn, textVariant } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'
import { Tilt } from 'react-tilt'
import { Link } from 'react-router-dom'
import { notes_topics } from './notes/topics'

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

const NotesCard = ({ index, slug, short, name, accent, chapters }) => {
    return (
      <motion.div variants={fadeIn("up", "spring", index * 0.1, 0.75)}>
        <Tilt
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-[#3a3a3a] shadow-[0_0_10px_rgba(255,204,0,0.3),_0_0_20px_rgba(255,105,180,0.2)]'
        >
          <Link to={`/blogs/notes/${slug}`} className='block'>
            <div
              className='relative w-full h-[200px] rounded-2xl overflow-hidden flex items-center justify-center'
              style={{
                background: `radial-gradient(circle at 30% 20%, ${accent}55, transparent 60%), radial-gradient(circle at 80% 90%, ${accent}33, transparent 55%), #0d0d0d`,
              }}
            >
              <svg className='absolute inset-0 w-full h-full opacity-30' aria-hidden='true'>
                <defs>
                  <pattern id={`grid-${slug}`} width='24' height='24' patternUnits='userSpaceOnUse'>
                    <path d='M24 0H0V24' fill='none' stroke={accent} strokeWidth='0.5' />
                  </pattern>
                </defs>
                <rect width='100%' height='100%' fill={`url(#grid-${slug})`} />
              </svg>
              <span className='relative text-white font-black text-[56px] tracking-tight' style={{ textShadow: `0 0 24px ${accent}` }}>
                {short}
              </span>
            </div>
          </Link>

          <div className='mt-5'>
            <h3 className='text-white font-bold text-[20px] text-center'>{name}</h3>
            <p className='mt-2 text-secondary text-[14px] text-center'>{chapters.map((c) => c.title).join(' • ')}</p>
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

{/* 

    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center mt-[50px]`}>Tech Blogs</h2>
    </motion.div>

    <div className='mt-10 flex flex-wrap justify-center gap-7'>
      {case_studies.map((project, index) => (
        <BlogsCard key={`project-${index}`} index={index} {...project} />
      ))}
    </div> */}



    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center mt-[50px]`}>Notes</h2>
    </motion.div>

    <div className='mt-10 flex flex-wrap justify-center gap-7'>
      {notes_topics.map((topic, index) => (
        <NotesCard key={topic.slug} index={index} {...topic} />
      ))}
    </div>
  </>
  );
};

export default SectionWrapper(Blogs, "achievements");