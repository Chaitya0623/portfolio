import { motion } from "framer-motion";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";
import { profile } from "../../assets";

const ColumbiaAdmit = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          The Story Behind My Columbia Admit
        </h2>
      </motion.div>

      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          1. The Beginning: What Sparked the Journey
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Since school, I’ve been fascinated by how probability and statistics
          can explain the world around us. The idea that numbers could guide
          everyday decisions through mathematical reasoning felt almost magical
          to me. Naturally, this led me to consider a career in Actuarial
          Science, a field dedicated to applying mathematics and statistics to
          assess and manage financial risks, especially in finance.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          But as I delved deeper, I realized I wanted to go beyond traditional
          models. What if we could build systems that understand how humans
          think? Inspired by Freakonomics and its assertion that “Economics is a
          science with excellent tools for gaining answers but a serious
          shortage of interesting questions,” I became captivated by a new idea:
          was it possible to understand someone's state of mind without them
          saying a word?
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          That question sparked my journey into Data Science, a field where
          numbers tell stories, models uncover hidden truths, and technology
          helps us make smarter decisions every day.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          To prepare myself, I decided to take a couple of additional years to
          strengthen my skills, deepen my domain knowledge, and build a strong
          network. After carefully researching my options, I set my sights on
          Columbia University, a renowned Ivy League for Data Science with top
          labs in behavioral data, a well established program, and a dedicated
          Data Science Institute. What stood out even more was Columbia’s
          uniquely interdisciplinary environment: students and faculty from
          fields like law, fintech, social sciences, and computer science
          constantly collaborate, creating the perfect space to apply Data
          Science across real world domains.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          2. How I Approached the Process
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The very first step for me was not jumping into applications, but
          asking the right questions to myself. Self talk was crucial. I had to
          be brutally honest about my goals, readiness, and expectations before
          moving forward.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Here are the questions I asked myself, grouped into the areas that
          mattered most:
        </motion.p>

        <div className="mt-5 text-secondary text-[17px]">
          <strong>Personal Readiness</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Why do I even want to pursue a master's degree?</li>
            <li>
              Do I truly want to commit to an additional two years of study?
            </li>
            <li>
              Am I financially prepared to support both my education and living
              expenses during this time?
            </li>
            <li>
              Am I ready to live away from family and friends, and adapt to a
              completely new culture if needed?
            </li>
            <li>
              Am I mentally prepared to face rejections or failures during the
              application and job search process without losing focus?
            </li>
            <li>
              What kind of life do I want? A stable, comfortable career path, or
              a more ambitious, high risk, high reward journey?
            </li>
            <li>
              How will this master's degree fit into my long term career goals?
            </li>
            <li>
              How do I plan to compete with candidates who already have work
              experience?
            </li>
            <li>
              What unique qualities or experiences do I bring that differentiate
              me from others?
            </li>
          </ul>

          <strong className="mt-5 block">Academic Choices</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              Should I go for a broader Computer Science degree to keep my
              options open, or choose a specialized field aligned with my
              passion?
            </li>
            <li>
              What specific skills or knowledge gaps am I hoping to fill through
              my master's degree?
            </li>
            <li>
              What kind of learning environment suits me best: research
              intensive, industry oriented, collaborative, competitive, or a
              mix?
            </li>
            <li>Which universities align with my goals, and why?</li>
            <li>
              How significant are the people around me (diversity, ambition,
              mindset) when choosing a university?
            </li>
          </ul>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Now, there’s no single "right" answer to all these questions, but it’s
          important to prioritize what you want. It’s okay if you don’t have all
          the answers at the beginning. What matters is recognizing that these
          questions exist and being honest about where you stand. For example,
          when I first asked myself what unique qualities set me apart, I didn’t
          have a clear answer either. But simply knowing that this was an
          important gap helped me focus on where I needed to grow.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          When I started, I didn’t have answers to most of these questions. I
          just made the decision to begin. Slowly, through experiences,
          exploration, and a lot of self learning, things started becoming
          clearer. My first priority was simple: become really good at what I
          do. So I went back to basics, I focused on learning how to code, and
          gradually built a strong foundation in Machine Learning and Data
          Science.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          3. Turning Reflection Into Action
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Once I had a clearer understanding of what I wanted, it was time to
          act on it. This phase wasn’t about ticking off items on a checklist,
          it was about building a story that genuinely reflected who I was and
          what I was aiming for.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Since I was sure I wanted to pursue a career in Machine Learning and
          Data Science, I focused on getting practical experience. I interned as
          an Artificial Intelligence Intern at Infiheal, where I worked on a
          production ready mental health chatbot using data sourced from
          psychologists. This was my first hands on experience with large
          language models and deploying systems on cloud platforms. After that,
          I joined IIT Patna as a Research Intern, working part time on fraud
          detection in Ethereum transactions using graph neural networks. During
          the summer after my sixth semester, I interned at Avrio Energy as a
          Data Science Intern. There, I worked on data pipelining and scaling
          while contributing to energy efficiency solutions across 70+
          McDonald’s outlets in 22 countries.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The most impactful phase of my journey, both in terms of Data Science
          and personal growth, came through my work at SimPPL. I started as a
          Research Intern, working on assessing political bias on Truth Social,
          the platform launched by Donald Trump after being banned from Twitter.
          At that point, I knew I wanted to dive deeper into Data Science, but I
          struggled to find the right opportunities and like minded
          collaborators. Being from a CS background, I didn’t have many peers
          focused solely on core Data Science. SimPPL gave me that space, an
          environment where everyone was passionate about the same domain. I was
          the youngest member of the team, and I was grateful to learn from
          people more experienced than me. One thing I realized through this
          journey is that while many people know how to write code for ML
          models, very few know how to ask the right questions or formulate the
          right problem statement. That’s what truly sets impactful work apart
          and it’s something our founder, Swapneel Mehta constantly encouraged
          me to focus on. While working on the paper, I collaborated with
          international researchers, including a PhD student from CMU and
          Swapneel himself, who is a PostDoc at MIT. Honestly, even if I had
          gone the corporate route, I doubt I’d have gotten the chance to work
          with such a team. We eventually published our paper at an A grade
          conference, something I never imagined achieving during undergrad.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Another huge opportunity that Swapneel gave me was to Lead the
          development of the MVP for an AI-powered Audience Analytics Platform,
          scaling it to pilot with grants from Mozilla and Google (ExploreCSR).
          Our goals were to understand loyal audience behavior, monitor author
          performance across categories to expand reach and extract long term
          value from years of user interaction data. We successfully delivered a
          pilot to New York Public Radio and expanded to LION Network members.
          This project also gave me a new perspective beyond tech. I worked
          closely with Dhara Mungra, our program manager, who completely changed
          how I approached problems. My instinct was always to use complex
          technical solutions, but Dhara taught me that simplicity often solves
          better. I never saw myself as someone who could confidently speak for
          a product, but SimPPL changed that. We regularly met with potential
          clients, journalists, and industry experts who helped us assess the
          product’s viability. While many would worry about putting their
          reputation on the line, Dhara and Swapneel made sure to make me step
          up, learn how to present myself and lead meetings, and that made all
          the difference. Working on the product gave me two key takeaways:
          first, it gave me something meaningful to talk about in conversations
          and interviews; second, it opened doors to network with industry
          experts I wouldn’t have otherwise met.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          4. Navigating The Application Process
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Once I had clarity on my direction and experiences to speak about, I
          shifted focus to the application components. While basic formats for
          these are easily available online, here’s what I personally found most
          important beyond the templates.
        </motion.p>

        <strong className="mt-5 block">Resume: Story Over Checklist</strong>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          When working on the resume, it's easy to get caught up in showcasing
          past experiences, crafting impactful bullet points, and perfecting the
          formatting. But in the process, we often lose sight of the main
          objective: to clearly communicate what we specialize in. Instead of
          simply listing skills and projects, focus on telling a coherent story.
          Remember, having an internship at a well known company is valuable,
          but what matters more is the actual work you did and the impact you
          created.
        </motion.p>

        <strong className="mt-5 block">
          School Selection: Finding the Right Fit
        </strong>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          One major piece of advice I’d offer is to start early, ideally 5–6
          months before the application deadlines. Begin by identifying programs
          that align with your interests and start tailoring your profile
          accordingly. Shortlisting universities is often confusing, and ranking
          alone isn't always the best metric. Here’s what I did instead: I
          created an Excel sheet and added columns like college, degree,
          requirements, cost, coursework, location, job prospects, TA/RA
          opportunities. There’s no single “best” university, it’s about finding
          the one that aligns with your profile and career goals. Another key
          step: talk to current students. I reached out to people already in the
          programs I was interested in to understand the actual pros and cons.
          It's important to ask specific questions when reaching out to people.
          Generic questions lead to generic answers and rarely result in
          meaningful conversations. The perspective of someone living that
          experience is far more valuable than outside assumptions.
        </motion.p>

        <strong className="mt-5 block">
          SOP Strategy: Connecting Curiosity to Career
        </strong>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          Remember the self reflection questions I mentioned earlier? The
          answers to many of those are essential when writing your Statement of
          Purpose. Tailor each SOP for the specific university to avoid generic
          writing. Show who you are, what you’ve done, and what you want to do.
          Top universities receive thousands of applications, so you need to
          stand out. Make sure your first paragraph hooks the reader by
          highlighting your unique motivation. In my case, I connected my
          interest in Behavioral Data Science to a personal experience. Also,
          ask trustworthy people, especially those outside your field, to read
          your SOP. I had my mom review mine. She’s not from a technical
          background, so if she could understand it, I felt confident the
          admissions committee would too.
        </motion.p>

        <strong className="mt-5 block">
          Letters of Recommendation: Choosing the Right Voices
        </strong>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          If you're applying straight from undergrad, I’d recommend submitting
          two academic LORs and one professional LOR. Prioritize professors
          under whom you've done meaningful work ideally, those who've seen you
          grow over time and can genuinely vouch for your strengths. I took a
          letter from the professor I worked with on my first research paper
          through the ML Club. He also taught me Data Science courses and
          mentored me during the Innovative Product Development project. It’s a
          plus if the professor’s specialization aligns with your intended
          field; the admissions committee knows such a person can evaluate you
          well. For my professional LOR, I chose Swapneel from SimPPL. Having
          worked with him for almost two years, he had seen me evolve, from a
          beginner to someone leading a product.
        </motion.p>

        <strong className="mt-5 block">
          Dealing With Uncertainties: Trusting the Process
        </strong>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          Many people chase multiple research papers, but I believe quality
          matters more than quantity. As an undergrad, publishing in a top tier
          conference or Q1 journal is not expected but if you manage it, it
          gives you an edge. When it comes to standardized tests, no matter how
          much you prepare, what ultimately counts is your ability to stay calm
          at the test center. Focus on building that calm.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Lastly, don’t compare your journey to others. The grass always looks
          greener on the other side. Trust your path, remember how far you’ve
          come, and believe in the effort you’ve put in.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          5. Unique Challenges & What Made My Path Different
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          From the outside, my journey might look well structured, but the
          reality was far from linear. Some of the most defining experiences
          I’ve had came through failures and detours. Looking back, those are
          the exact moments that shaped both my mindset and trajectory.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          One of the biggest turning points was being part of DJS Antariksh, my
          college’s Martian Rover team. Over two and a half years, I
          participated in six international competitions and contributed to
          podium finishes in three. But our success was built on a foundation of
          setbacks. Our first onsite event, the International Rover Challenge
          (IRC) 2023 was also my first competition. I worked on the first ever
          iteration of the Martian Rover, and watched my seniors run on 1–2
          hours of sleep for several days, pouring everything into it. Despite
          all the effort, we finished 8th. That experience shifted something in
          me. After that, I realized what it takes to become a master at what
          you want. I realized that raw technical skill wasn’t enough; what
          mattered most was how we performed under pressure. That “clutch”
          mentality of owning the outcome, especially in high stakes moments,
          became a cornerstone of how I approached future challenges.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The following six months were some of the most intense of my life. I
          was juggling academics, research, internships, and the rover team,
          averaging only 4–5 hours of sleep a night for straight six months. My
          sleep schedule was so messed up that I used to stay awake the entire
          night and used to sleep while travelling to college and during
          lectures. I was determined to improve, and made sure no one could ever
          doubt my technical contributions. But just two weeks before our next
          competition, the European Rover Challenge 2023 (Remote) I hit a wall.
          I was put on bed rest due to burnout. Still, we managed to finish 2nd.
          That contrast taught me a lesson no classroom ever could: hard work is
          important, but not at the cost of your health. But more than anything,
          this phase taught me what it truly feels like to work very hard,
          something I had never pushed myself to do before. It showed me what I
          was capable of, and helped me discover my potential.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          These experiences led to me being promoted to Coding Head, where I led
          a 30-member department within a 150-member team. I wasn’t just
          responsible for getting our rover to work across competition tasks; I
          also had to mentor and manage. Through this, I started to understand
          what it means to lead, not just with knowledge, but with clarity,
          empathy, and accountability. We applied everything we’d learned and
          secured 3rd place at IRC 2024, my first major leadership competition.
          Later, we represented India at ERC 2024 in Krakow, competing against
          MS and PhD students from around the world. We placed 11th overall and
          were the top ranked team from India and Asia.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          You might wonder how being part of a robotics team connects to a
          career in Data Science. For me, it made all the difference. It taught
          me how to stay calm under pressure and deliver results when it
          mattered most, a skill crucial in any field, be it Data Science or
          competitive robotics. More importantly, it helped me understand myself
          better. This team really opened up my understanding of what tech could
          look like beyond just projects and hackathons. Representing the
          country on an international stage, and actually winning, was a
          perspective shifting experience and, in my opinion, a strong addition
          to my profile.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Around the end of my second year, I was applying for my first
          internship through our college fair. I thought I had a solid profile:
          strong ML fundamentals, rover experience, and a published paper as a
          second-year student. But I wasn’t shortlisted. The only ML company at
          the fair had passed on me. Still, I believed I could contribute. So, I
          created a mini mental health chatbot as a demo tailored specifically
          for them. On interview day, I simply asked them if they’d be open to
          giving me a shot, and I got the interview. Competing against peers and
          even seniors, I landed the internship. They later told me I stood out
          because I had asked, and because I had built something personal that
          showed initiative. That moment reinforced a life lesson: not asking is
          always a no.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Another experience that made my journey unique was my time at SimPPL.
          For someone directly from undergrad, there’s often an unspoken
          disadvantage compared to those with full-time work experience. But
          SimPPL helped bridge that gap. I got the rare opportunity to work on a
          product from scratch, almost like being in a startup environment,
          while collaborating with international researchers, mentors and
          industry experts. It wasn’t just about writing code, I learned how to
          ask the right questions, how to define the right problems, and how to
          build things that actually mattered.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          What made this journey even more meaningful were the people. My
          seniors, professors, cousins, and internship mentors played a huge
          role. Swapneel believed in me long before I had any “crazy” experience
          to show for it. Him and Dhara didn’t just mentor me on technical
          topics; we had one-on-one conversations about everything from personal
          websites to how to network better, what to do when moving to a new
          city, and how to build credibility from scratch. Their mentorship
          helped me develop not just as a data scientist, but as a person who
          could speak for a product, lead a team, and carry a vision.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          6. What I’d Change if I Had to Do It Again
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          You probably guessed it right, I did take a hit on my GPA. If there’s one
          thing I would definitely change, it’s managing my time better. Even
          during exam weeks, I often found myself working on projects instead of
          focusing solely on academics. I prioritized building skills over
          theoretical knowledge. While I consistently scored well in subjects I
          was genuinely interested in, my overall pointer was 8.7.
          Unfortunately, many universities consider GPA a key factor, so that
          became a hurdle during shortlisting. I’m grateful Columbia evaluated
          my profile holistically.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Another mistake I made was with my GRE prep. Juggling multiple
          responsibilities meant I could dedicate only eight days of quality
          study time. While I scored 170 in Quant, my Verbal score was a
          disappointing 147. I didn’t take the vocabulary component seriously
          enough, despite being able to comprehend the passages, my limited
          vocab meant I had to rely on guesswork for several questions.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Lastly, while working on SOPs, one thing I overlooked was checking if
          the university had sufficient funding in my area of interest. Even if
          you’re highly qualified, if there’s no funding or research focus in
          your domain, chances of getting in can drop significantly.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          7. What’s Next: Goals, Options, and Evolving Plans
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Looking ahead, one of the biggest gaps I see in myself is domain
          knowledge. If I really want to understand human behavior and make
          better, data driven decisions, I need to figure out what parameters
          actually matter, how they change depending on the use case, and how to
          use them meaningfully. It’s not just about knowing the tools, but
          about knowing how and when to use them. At Columbia, I want to close
          this gap by learning from people across fields, joining student clubs,
          and working with professors who are building things at the
          intersection of tech and behavioral science.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Another big focus for me is figuring out how to use AI systems well in
          production. Right now, I’m building AI Agents, but I’m still figuring
          out how to make them scalable, cost efficient, and useful in the real
          world. I want to get better at the engineering side of things,
          especially for domains like mental health or public systems, where
          it’s important that the tech actually works at scale.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Over time, I want to find the right balance between technical depth
          and real world impact. I plan to work in research labs, join
          interdisciplinary hackathons, and hopefully intern with teams working
          on AI for social good. But more than anything, I want to keep growing,
          not just as a Data Scientist, but as someone who’s grounded, curious,
          and intentional about the work I do.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          It’s easy to focus on the admit as the goal. But what really matters
          is who you become along the way. That’s what Columbia saw, and that’s
          what I’ll carry forward.
        </motion.p>
      </div>
    </>
  );
};

export default SectionWrapper(ColumbiaAdmit, "columbiaadmit");
