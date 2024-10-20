import { motion } from "framer-motion"
import { styles } from '../styles'
import ComputersCanvas from "./canvas/Computers";
import Lottie from 'react-lottie'
import { analysisLottie } from "../assets";

const Hero = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: analysisLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <section className="relative w-full h-screen mx-auto flex justify-center items-center">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] sm:top-[220px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#6fa3f3]"/>
          <div className="w-1 sm:h-60 h-40 blue-gradient"/>
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Chaitya <span className="text-[#1e50bd]">Shah</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            An Aspiring Data Scientist 
            <br className="sm:block hidden"/> and a Machine Learning Developer.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:ml-[650px] sm:mt-0 mt-5">
  <div className="flex justify-center items-center">
    <Lottie
      options={defaultOptions}
      height={window.innerWidth < 600 ? 200 : window.innerWidth < 900 ? 300 : 500} // Adjust heights
      width={window.innerWidth < 600 ? 240 : window.innerWidth < 900 ? 360 : 600} // Adjust widths
    />
  </div>
</div>
      {/* <ComputersCanvas /> */}
    </section>
  )
}

export default Hero