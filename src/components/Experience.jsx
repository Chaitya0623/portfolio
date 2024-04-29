import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import { motion } from "framer-motion"
import 'react-vertical-timeline-component/style.min.css'
import { styles } from '../styles'
import { internships, positionsofresponsibility } from '../constants'
import SectionWrapper from '../hoc/SectionWrapper'
import { textVariant } from "../utils/motion"

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
      <h2 className={`${styles.sectionHeadText} text-center`}>
        Internships
      </h2>
    </motion.div>

    <div className='mt-10 flex flex-col'>
      <VerticalTimeline>
        {internships.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
          />
        ))}
      </VerticalTimeline>
    </div>

    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center mt-10`}>
        Positions Of Responsibility
      </h2>
    </motion.div>

    <div className='mt-10 flex flex-col'>
      <VerticalTimeline>
        {positionsofresponsibility.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
          />
        ))}
      </VerticalTimeline>
    </div>
  </>
  )
}

export default SectionWrapper(Experience, 'experience')