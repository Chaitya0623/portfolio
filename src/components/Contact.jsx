import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { motion } from 'framer-motion'
import { styles } from '../styles'
import SectionWrapper from '../hoc/SectionWrapper'
import { github, linkedin, gmail } from "../assets";

import Lottie from 'react-lottie'

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
        'service_z9j61jl',
        'template_h5fz6fd',
        {
          from_name: form.name,
          to_name: "Chaitya Shah",
          from_email: form.email,
          to_email: "chaitya0623@gmail.com",
          message: form.message,
        },
        'u0kZg_JSHlRi7WQNf'
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


  return (
    <div
      className={`sm:flex sm:justify-center gap-10 sm:mt-[-15px] mt-[100px] min-h-[calc(100vh-210px)]`}
    >
      <motion.div
        className='flex-[0.75] sm:max-w-[600px] bg-primary p-5 rounded-2xl border border-[#3a3a3a] shadow-[0_0_10px_rgba(255,204,0,0.3),_0_0_20px_rgba(255,105,180,0.2)]'
      >
        <h3 className={`${styles.sectionHeadText} flex justify-center`}>Contact</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='flex flex-col gap-3'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3'>What's your full name?</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className='bg-[#222222] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3'>Where can I reach you?</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className='bg-[#222222] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3'>How can I help you?</span>
            <textarea
              rows={3}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='Write your message here'
              className='bg-[#222222] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <div className="mt-2 flex justify-center">
            <button
              type='submit'
              className='bg-[#222222] py-3 px-6 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
          <div className="flex flex-wrap justify-center align-center gap-3 mt-3">
            <button className="bg-[#222222] border-white py-3 px-3 rounded-full outline-none w-fit text-white font-bold shadow-md shadow-primary" onClick={() => window.open('https://github.com/Chaitya0623', "_blank")}>              
              <img
                src={github}
                className='w-7 h-7 object-contain'
              />
            </button>
            <button className="bg-[#222222] border-white py-3 px-3 rounded-full outline-none w-fit text-white font-bold shadow-md shadow-primary" onClick={() => window.open('https://www.linkedin.com/in/chaitya-shah-381b5421b/', "_blank")}>              
              <img
                src={linkedin}
                className='w-7 h-5 object-contain'
              />
            </button>
            <button className="bg-[#222222] border-white py-3 px-3 rounded-full outline-none w-fit text-white font-bold shadow-md shadow-primary" onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=chaitya0623@gmail.com', "_blank")}>              
              <img
                src={gmail}
                className='w-7 h-7 object-contain'
              />
            </button>
          </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");