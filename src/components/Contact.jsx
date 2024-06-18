import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { EarthCanvas } from "./canvas";
import { slideIn } from "../utils/motion";

import { motion } from 'framer-motion'
import { styles } from '../styles'
import SectionWrapper from '../hoc/SectionWrapper'
import { github, linkedin, instagram } from "../assets";

import Lottie from 'react-lottie'
import { contactLottie } from "../assets";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_behdkv1',
        'template_odf7vu4',
        {
          from_name: form.name,
          to_name: "Chaitya Shah",
          from_email: form.email,
          to_email: "chaityatest@gmail.com",
          message: form.message,
        },
        'QRmcR8881LRgaKGm6'
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: contactLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div
      className={`flex xl:flex-row flex-col-reverse gap-10 overflow-hidden sm:mt-[-40px] mt-[-250px]`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <h3 className={`${styles.sectionHeadText} flex justify-center`}>Contact</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-2 flex flex-col gap-5'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What is your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What is your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={3}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What do you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
          <div className="flex flex-wrap justify-center align-center gap-3 mt-5">
            <button className="bg-tertiary border-white py-3 px-4 rounded-full outline-none w-fit text-white font-bold shadow-md shadow-primary" onClick={() => window.open('https://github.com/Chaitya0623', "_blank")}>              
              <img
                src={github}
                className='w-7 h-7 object-contain'
              />
            </button>
            <button className="bg-tertiary border-white py-3 px-4 rounded-full outline-none w-fit text-white font-bold shadow-md shadow-primary" onClick={() => window.open('https://www.linkedin.com/in/chaitya-shah-381b5421b/', "_blank")}>              
              <img
                src={linkedin}
                className='w-7 h-7 object-contain'
              />
            </button>
            <button className="bg-tertiary border-white py-3 px-4 rounded-full outline-none w-fit text-white font-bold shadow-md shadow-primary" onClick={() => window.open('https://www.instagram.com/chaitya0623/', "_blank")}>              
              <img
                src={instagram}
                className='w-7 h-7 object-contain'
              />
            </button>
          </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
      <div className="sm:ml-[100px] sm:mt-100 mt-[150px]">
        <Lottie options={defaultOptions} height={window.innerWidth < 600 ? 240 : 400} width={window.innerWidth < 600 ? 300 : 500}/>
      </div>
        {/* <EarthCanvas /> */}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");