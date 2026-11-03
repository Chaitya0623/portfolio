import { Fragment, useLayoutEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { styles } from '../styles'
import { internships } from '../constants'
import SectionWrapper from '../hoc/SectionWrapper'
import CardBadge from './CardBadge'

import { Tilt } from 'react-tilt'
import { fadeIn, textVariant } from '../utils/motion'

// Numbers like 1.5M+, 96–107%, 4×, 120k+ get highlighted in the bullets.
const METRIC = /(\d[\d.,–]*(?:[+%×kKM])+)/g

const Highlight = ({ text }) =>
  text.split(METRIC).map((part, i) =>
    i % 2 ? <span key={i} className='text-white font-semibold'>{part}</span> : part
  )

const ExperienceCard = ({ index, name, description, image, open, onToggle, cardRef }) => {
  return (
    <motion.div ref={cardRef} variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 0,
          scale: 1.03,
          speed: 450,
        }}
        className={`group bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border ${open ? 'border-[#6fa3f3]' : 'border-[#3a3a3a]'} shadow-[0_0_10px_rgba(255,204,0,0.3),_0_0_20px_rgba(255,105,180,0.2)]`}
      >
        <button type='button' onClick={onToggle} aria-expanded={open} className='block w-full text-left'>
          <div className='relative w-full h-[200px]'>
            <CardBadge type='expand' open={open} />
            <img
              src={image}
              alt='company_logo'
              className='w-full h-full object-cover rounded-2xl'
            />
          </div>

          <div className='mt-5'>
            <h3 className='text-white font-bold text-[20px] text-center'>{name}</h3>
            <p className='mt-2 text-secondary text-[14px] text-center'>{description}</p>
          </div>
        </button>
      </Tilt>
    </motion.div>
  );
};

const DetailsPanel = ({ name, company, location, description, points }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className='basis-full w-full max-w-[1136px] bg-tertiary rounded-2xl border border-[#3a3a3a] p-6 sm:p-8 shadow-[0_0_10px_rgba(255,204,0,0.3),_0_0_20px_rgba(255,105,180,0.2)]'
  >
    <div className='flex flex-wrap items-baseline justify-between gap-2'>
      <h3 className='text-white font-bold text-[20px]'>
        {name} <span className='text-[#6fa3f3]'>@ {company}</span>
      </h3>
      <p className='text-secondary text-[14px]'>{description} • {location}</p>
    </div>
    <ul className='mt-5 list-disc ml-5 space-y-3'>
      {points.map((point, i) => (
        <li key={i} className='text-secondary text-[15px] leading-[26px] pl-1'>
          <Highlight text={point} />
        </li>
      ))}
    </ul>
  </motion.div>
);

const Experience = () => {
  const [open, setOpen] = useState(null)
  const [rowEnd, setRowEnd] = useState(null)
  const cardRefs = useRef([])

  // The panel goes after the last card in the open card's row.
  useLayoutEffect(() => {
    if (open === null) return
    const place = () => {
      const top = cardRefs.current[open].offsetTop
      let end = open
      while (end + 1 < internships.length && cardRefs.current[end + 1].offsetTop === top) end++
      setRowEnd(end)
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [open])

  return (
    <>
    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center mt-[-50px]`}>Experience</h2>
    </motion.div>

    <div className='mt-10 flex flex-wrap gap-7 justify-center'>
      {internships.map((experience, index) => (
        <Fragment key={`experience-${index}`}>
          <ExperienceCard
            index={index}
            {...experience}
            open={open === index}
            onToggle={() => setOpen(open === index ? null : index)}
            cardRef={(el) => (cardRefs.current[index] = el)}
          />
          {open !== null && rowEnd === index && (
            <DetailsPanel key={open} {...internships[open]} />
          )}
        </Fragment>
      ))}
    </div>

  </>
  )
}

export default SectionWrapper(Experience, 'experience')
