import { BrowserRouter, Routes, Route } from "react-router-dom"
import { About, Contact, Education, Experience, Navbar, Works, Blogs, Feedbacks,
  ColumbiaAdmit, DJSAntariksh, 
  AudienceAnalytics, AIAgent, MentalHealthChatbot, EthereumFraudDetection, EnergyOptimization
} from './components'
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
              <About/>
              <Education />
              <Experience />
              
            </>}>
            </Route>
            <Route path='/projects' element={
              <>
              <Navbar/>
              <Works/>
            </>}>
            </Route>
            <Route path='/blogs' element={
              <>
              <Navbar/>
              <Blogs/>
            </>}>
            </Route>
            <Route path='/contact' element={
              <>
              <Navbar/>
                <Contact/>
            </>}>
            </Route>

            <Route path='/blogs/columbia-admit' element={
              <>
              <Navbar/>
              <ColumbiaAdmit />
            </>}>
            </Route>

            <Route path='/blogs/djs-antariksh' element={
              <>
              <Navbar/>
              <DJSAntariksh />
              <Feedbacks />
            </>}>
            </Route>

            <Route path='/projects/audience-analytics' element={
              <>
              <Navbar/>
              <AudienceAnalytics />
            </>}>
            </Route>
            <Route path='/projects/ai-agent' element={
              <>
              <Navbar/>
              <AIAgent />
            </>}>
            </Route>
            <Route path='/projects/mental-health-chatbot' element={
              <>
              <Navbar/>
              <MentalHealthChatbot />
            </>}>
            </Route>
            <Route path='/projects/ethereum-fraud-detection' element={
              <>
              <Navbar/>
              <EthereumFraudDetection />
            </>}>
            </Route>
            <Route path='/projects/energy-optimization' element={
              <>
              <Navbar/>
              <EnergyOptimization />
            </>}>
            </Route>
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
