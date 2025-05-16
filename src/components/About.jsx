import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { fadeIn, textVariant } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'
import { profile } from '../assets'

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[150px] w-full">
      <motion.div
      variants={fadeIn("right","spring",0.5*index,0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
        <div 
        options={{
          max:45,
          scale:1,
          speed:450
        }} className='bg-tertiary rounded-[20px] py-5 px-5 min-h-[130px] flex justify-evenly items-center flex-col'>
          {/* <img src={icon} alt={title} className='wi16 h-16 object-contain'/> */}
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center mt-[0px] sm:mt-[30px]`}>
        Chaitya Shah
      </h2>
    </motion.div>

    <div className="sm:flex items-center justify-center"> 

    <div className="sm:w-1/3 mt-5 sm:mt-0 mb-5 sm:mb-0 flex justify-center items-center">  
      <img src={profile} alt="Your Photo" className="rounded-[20px] w-70 h-70 object-cover border border-[#000000] shadow-[0_0_10px_rgba(255,204,0,0.3),_0_0_20px_rgba(255,105,180,0.2)]" />
    </div>

    <div className="w-full md:w-2/3 sm:ml-10 flex flex-col items-start">
    <motion.p variants={fadeIn("","",0.1,0.1)}
    className='mt-2 text-secondary text-[17px] leading-[30px] text-center'>
      I am an upcoming Data Science grad student at Columbia University with a strong foundation in AI, ML, and full-stack development. 
      I’ve led cross-functional teams to build AI-powered platforms from the ground up, working alongside nonprofit leadership to develop new 
      product vertical with backing from Mozilla and Google.
    </motion.p>

    <motion.p variants={fadeIn("","",0.1,0.1)}
    className='mt-5 text-secondary text-[17px] leading-[30px] text-center'>
      My work focuses on building data-driven systems end to end; from developing predictive models and GenAI applications to deploying scalable 
      solutions on AWS with Docker and Terraform. I've applied these skills across domains like social media analytics, mental health tech, and 
      energy optimization, always aiming for measurable impact and real-world scalability. Always excited to explore opportunities at the 
      intersection of AI and real-world problem-solving.
    </motion.p>
    </div>
    </div>

    {/* <div className='mt-10 flex flex-wrap gap-10 justify-center align-center'>
      {services.map((service,index) => (
        <ServiceCard key={service.title} index={index} {...service}/>
      ))}
    </div> */}
    </>
  )
}

export default SectionWrapper(About, 'about')