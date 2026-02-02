import { motion } from "framer-motion";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";
import axioma from "../../assets/company/Axioma.mp4";
import { Tilt } from "react-tilt";

const AudienceAnalytics = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Audience Analytics Platform
        </h2>
      </motion.div>

      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          1. Newsroom Analytics Platform
        </motion.h2>

        <div className="mt-5 w-full flex flex-col lg:flex-row gap-10 justify-between items-center">
          <div className="flex-1">
            <motion.p
              variants={fadeIn("", "", 0.1, 0.1)}
              className="text-secondary text-[17px]"
            >
              Many small to mid sized newsrooms lack the resources to hire dedicated
              data science teams, leaving them reliant on limited tools like Google
              Analytics. To address this gap, we built <strong>Axioma</strong>, an
              AI powered Audience Analytics Platform designed to provide actionable,
              data driven insights tailored specifically for news media
              organizations. Our goal was to go beyond basic metrics and uncover
              deep patterns in reader behavior, author impact, and long term content
              engagement.
            </motion.p>

            <motion.p
              variants={fadeIn("", "", 0.1, 0.1)}
              className="mt-5 text-secondary text-[17px]"
            >
              Built under <strong>SimPPL</strong> with support from{" "}
              <strong>Mozilla</strong> and <strong>Google (ExploreCSR)</strong>, I
              led the development of the MVP and delivered a pilot to{" "}
              <strong>New York Public Radio</strong> and later expanded it to
              members of the <strong>LION Publishers Network</strong>. The platform
              helps newsrooms understand loyal audience behavior, monitor author
              performance, and extract long term value from years of user
              interaction data.
            </motion.p>
          </div>

          {/* Right: Video */}
          <motion.div className="flex-1 max-w-[480px] w-full">
            <Tilt
              options={{ max: 45, scale: 1, speed: 450 }}
              className="bg-tertiary p-5 rounded-2xl border border-[#3a3a3a] shadow-[0_0_10px_rgba(255,204,0,0.3),_0_0_20px_rgba(255,105,180,0.2)]"
            >
              <div className="relative w-full h-[250px]">
                <video
                  id="axiomaVideo"
                  src={axioma}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-xl cursor-pointer"
                  onClick={() => {
                    const isMobile = window.innerWidth < 640;
                    const video = document.getElementById("axiomaVideo");
                    if (!isMobile && video?.requestFullscreen) {
                      video.requestFullscreen();
                    }
                  }}
                />
              </div>
            </Tilt>
          </motion.div>
        </div>


        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          2. Key Features
        </motion.h2>

        <div className="text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-5 space-y-3">
            <li>
              <strong>Comprehensive User Demographics Analysis</strong>
              <br />
              Visualize audience behavior across time using intuitive
              dashboards. Our system segments readers by age, location, device,
              and subscription status, offering a nuanced view of who engages
              with your content. These insights help you tailor content to
              specific audience cohorts and track shifts in audience makeup
              across different campaigns or editorial shifts.
            </li>
            <li>
              <strong>
                Understanding Content Performance and User Behavior
              </strong>
              <br />
              Go beyond click through rates and bounce metrics. Our AI models
              uncover the "why" behind reader preferences by tracking how
              specific topics, tones, and formats impact engagement and
              retention. Understand which types of content convert casual
              readers into subscribers, and which themes resonate most with your
              loyal audience. The system can also simulate next click
              predictions based on historic behavior to help plan user journeys
              more effectively.
            </li>
            <li>
              <strong>
                Author Level Analytics and Strategic Performance Insights
              </strong>
              <br />
              Identify not just popular stories, but high impact authors. Our
              author scoring models consider consistency, resonance across
              themes, contribution to subscriber growth, and engagement metrics
              to surface under recognized contributors. Editors can use these
              metrics to inform hiring, shift content responsibilities, or
              assign writers to high potential topics.
            </li>
            <li>
              <strong>On-and-Off Platform Impact Analysis</strong>
              <br />
              Gain a complete understanding of your content’s impact both on
              your platform and across external channels. Identify which
              audience segments, themes, and authors drive the most revenue
              while uncovering key insights into emerging trends. Leverage
              predictive analytics to anticipate upcoming topics and stay ahead
              of shifting audience interests, ensuring your content remains
              timely and relevant.
            </li>
            <li>
              <strong>Predictive Topic and Trend Detection</strong>
              <br />
              Using natural language processing and social signal tracking, our
              system detects emerging trends and predicts audience interest in
              upcoming themes. This allows editorial teams to plan content
              calendars in advance, seize attention windows early, and stay
              relevant without relying solely on reactive news cycles.
            </li>
            <li>
              <strong>Subscriber vs Non-Subscriber Behavior Modeling</strong>
              <br />
              Understand what differentiates a loyal subscriber from a casual
              visitor. Our models compare engagement journeys and highlight
              content, categories, or authors that disproportionately attract
              subscribers. Use this to shape your paywall strategy, optimize
              onboarding funnels, and increase conversion rates.
            </li>
            <li>
              <strong>Business Intelligence for Newsrooms</strong>
              <br />
              From identifying which categories deserve more investment to
              determining which author to highlight next week, the platform
              turns engagement data into operational recommendations. Whether
              it’s editorial planning or advertising optimization, newsrooms
              receive clear, data backed suggestions for high impact decisions.
            </li>
          </ul>
        </div>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          3. Technical Implementation
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The Axioma platform is built as a complete full-stack production system designed 
          to handle real-time analytics at scale. On the frontend, <strong>Next.js</strong> powers 
          the responsive, interactive dashboards that journalists and editors use daily. The backend 
          is driven by <strong>Flask APIs</strong> that process and serve analytics computations, while 
          <strong>PostgreSQL</strong> manages persistent data storage and <strong>Redis</strong> handles 
          caching and real-time data layers for sub-second dashboard updates. The entire system is 
          containerized with <strong>Docker</strong> for consistency and scalability, orchestrated and 
          served via <strong>Nginx</strong> on <strong>AWS</strong> infrastructure. This architecture 
          processes 1M+ user interactions daily, driving real-time content recommendations and enabling 
          newsrooms to make data-informed editorial decisions instantaneously.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          4. My Learnings
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Leading the development and deployment of this platform not only
          enhanced my technical proficiency in analytics and ML pipelines, but
          also refined my ability to communicate product value, collaborate with
          non technical stakeholders, and shape real world, user facing
          solutions. While I initially leaned toward building sophisticated
          models, I discovered the power of usability, communication, and
          storytelling, especially when engaging with potential clients,
          journalists, and media executives.
        </motion.p>
      </div>
    </>
  );
};

export default SectionWrapper(AudienceAnalytics, "audienceanalytics");
