import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import { motion } from "framer-motion"
import 'react-vertical-timeline-component/style.min.css'
import { styles } from '../styles'
import { internships, positionsofresponsibility } from '../constants'
import SectionWrapper from '../hoc/SectionWrapper'
import { github } from "../assets";

import { Tilt } from 'react-tilt'
import { fadeIn, textVariant } from '../utils/motion'

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
          <a href={source_code_link} target='_blank' rel='noopener noreferrer' className='block w-full h-full'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />
          </a>
          {source_code_link && (
          <span className='absolute top-3 right-3 text-white text-[24px]'>
            🔗
          </span>
        )}
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[20px] text-center'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px] text-center'>{description}</p>
          {/* <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
          {source_code_link && (
          <a
            href={source_code_link}
            className='text-white-100 text-[19px] font-bold tracking-wider block'
            target='_blank'
            rel='noopener noreferrer'
          >
            {'🔗'}
          </a>
        )}
          </div> */}
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

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#0c235f",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid #1e50bd" }}
      date={experience.date}
      iconStyle={{ background: '#fff' }}
      icon={
        <div className='flex justify-center items-center w-full h-full scale-125'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
      {experience.image && (
        <img
          src={experience.image}
          className='w-full h-auto mt-5 rounded-lg'
        />
      )}
      {experience.link && (
        <a
          href={experience.link}
          className='mt-5 text-white-100 text-[19px] font-bold tracking-wider block mt-3'
          target='_blank'
          rel='noopener noreferrer'
        >
          {experience.linkname || 'Link'}
        </a>
      )}
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center mt-[-50px]`}>Experience</h2>
    </motion.div>



    <div className='mt-10 flex flex-wrap gap-7 justify-center'>
      {internships.map((project, index) => (
        <ProjectCard key={`project-${index}`} index={index} {...project} />
      ))}
    </div>

    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center mt-20`}>Positions of Responsibility</h2>
    </motion.div>



    <div className='mt-10 flex flex-wrap gap-7 justify-center'>
      {positionsofresponsibility.map((project, index) => (
        <ProjectCard key={`project-${index}`} index={index} {...project} />
      ))}
    </div>
  </>
  //   <>
  //   <motion.div variants={textVariant()}>
  //     <h2 className={`${styles.sectionHeadText} text-center`}>
  //       Internships
  //     </h2>
  //   </motion.div>

  //   <div className='mt-10 flex flex-col'>
  //     <VerticalTimeline>
  //       {internships.map((experience, index) => (
  //         <ExperienceCard
  //           key={`experience-${index}`}
  //           experience={experience}
  //         />
  //       ))}
  //     </VerticalTimeline>
  //   </div>

  //   <motion.div variants={textVariant()}>
  //     <h2 className={`${styles.sectionHeadText} text-center mt-10`}>
  //       Positions Of Responsibility
  //     </h2>
  //   </motion.div>

  //   <div className='mt-10 flex flex-col'>
  //     <VerticalTimeline>
  //       {positionsofresponsibility.map((experience, index) => (
  //         <ExperienceCard
  //           key={`experience-${index}`}
  //           experience={experience}
  //         />
  //       ))}
  //     </VerticalTimeline>
  //   </div>
  // </>
  )
}

export default SectionWrapper(Experience, 'experience')