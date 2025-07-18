import { github } from "../assets";
import { projects, publications } from "../constants";

import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { fadeIn, textVariant } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'

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
          className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-[#3a3a3a] shadow-[0_0_10px_rgba(255,204,0,0.3),_0_0_20px_rgba(255,105,180,0.2)]'
        >
          <div className='relative w-full h-[200px]'>
            <a href={source_code_link} rel='noopener noreferrer' className='block w-full h-full'>
            <img
              src={image}
              alt='project_image'
              className='w-full h-full object-cover rounded-2xl'
            />
            </a>
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

const PublicationsCard = ({
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
            <a href={source_code_link} target='_blank' rel='noopener noreferrer' className='block w-full h-full'>
            <img
              src={image}
              alt='project_image'
              className='w-full h-full object-cover rounded-2xl'
            />
            </a>
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

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>Projects</h2>
      </motion.div>

      <div className='mt-10 flex flex-wrap gap-7 justify-center '>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center mt-[50px]`}>Publications</h2>
      </motion.div>

      <div className='mt-10 flex flex-wrap gap-7 justify-center '>
        {publications.map((project, index) => (
          <PublicationsCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");