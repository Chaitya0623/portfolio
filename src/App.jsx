import { BrowserRouter, Routes, Route } from "react-router-dom"
import { About, Contact, Education, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from './components'
import { useState, useEffect } from "react";

const App = () => {
  const [ loading, setLoading ] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },5000)
  })
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center"> */}
          <Routes>
            <Route path="/" element={              
            <>
              <Navbar/>
              <Hero/>
              <About/>
              <Education />
              <Experience />
              <Feedbacks />
              <Works />
              {/* <div className="relative z-0"> */}
                <Contact/>
                {/* <StarsCanvas/> */}
              {/* </div> */}
            </>}>
            </Route>
            {/* <Route path="/home" element={              
            <>
              <Navbar/>
              <Hero/>
              <About/> */}
              {/* <div className="relative z-0"> */}
                {/* <Contact/> */}
                {/* <StarsCanvas/> */}
              {/* </div> */}
            {/* </>}> */}
            {/* </Route> */}
            {/* <Route path="/experience" element={
            <>
              <Navbar />
              <Experience />
            </>}>
            </Route> */}
            {/* <Route path="/projects" element={
            <>
              <Navbar />
              <Works />
            </>}>
            </Route> */}
            {/* <Route path="/achievements" element={
            <>
              <Navbar />
              <Feedbacks />
            </>}>
            </Route>
            <Route path="/publications" element={
            <>
              <Navbar /> */}
              {/* <Publications /> */}
            {/* </>}>
            </Route>
            <Route path="/competitions" element={
            <>
              <Navbar /> */}
              {/* <Publications /> */}
            {/* </>}> */}
            {/* </Route> */}
            {/* <Route path="/projects" element={<Works />}></Route> */}
            {/* <Route path="/achievements" element={<Feedbacks />}></Route> */}
          </Routes>
        {/* </div> */}
        {/* <Experience/> */}
        {/* <Tech /> */}
        {/* <Works/> */}
        {/* <Feedbacks/> */}
      </div>
    </BrowserRouter>
  )
}

export default App
