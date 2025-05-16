import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { styles } from '../styles'
import { navLinks } from '../constants'
import { logo, menu, close } from '../assets'
import resumepdf from '../assets/ChaityaShah_Resume.pdf'

const Navbar = () => {
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)
  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className='w-full flex justify-center items-center max-w-7xl mx-auto'>
          <ul className='list-none hidden sm:flex flex-row gap-10'>
            {navLinks.map((link) => (
              <li 
              key={link.id}
              className={`${
                active === link.title
                ? "text-white"
                : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => {
                setActive(link.title);
                window.scrollTo(0,0);}}
              >
              {link.id === 'about' ? (
                <a href="/">{link.title}</a>
              ) : link.id === 'resume' ? (
                <a href={resumepdf} download>
                  {link.title}
                </a>
              ) : (
                <Link to={`/${link.id}`}>{link.title}</Link>
              )}
            </li>
            ))}
          </ul>
          <div className='sm:hidden flex flex-1 justify-end items-center'>
            <img src={toggle ? close : menu} 
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
            />
            <div className={`${!toggle ? 'hidden' : 'flex'}
            p-6 bg-black absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
              {navLinks.map((link) => (
                <li 
                key={link.id}
                className={`${
                  active === link.title
                  ? "text-white"
                  : "text-secondary"
                } font-poppins font-medium cursor-pointer text-[16px]`}
                onClick={() => {
                  setToggle(!toggle)
                  setActive(link.title)
                }}
                >
                  {link.id === 'about' ? (
                <a href="/">{link.title}</a>
              ) : link.id === 'resume' ? (
                <a href={resumepdf} download>
                  {link.title}
                </a>
              ) : (
                <Link to={`/${link.id}`}>{link.title}</Link>
              )}
                </li>
              ))}
            </ul>
            </div>
          </div>
      </div>
    </nav>
  )
}

export default Navbar