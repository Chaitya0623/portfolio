import { motion } from "framer-motion";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";
import Feedbacks from "../Feedbacks";

const DJSAntariksh = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Lessons from Leading an International Mars Rover Team
        </h2>
      </motion.div>

      <div className="w-full flex flex-col items-start">
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          During my undergraduate years, I had the incredible opportunity to be
          part of my college’s International Martian Rover Team, DJS Antariksh.
          This experience played a huge role in shaping my growth, not just
          technically, but also in terms of leadership, communication, and
          collaboration. Over a span of 2.5 years, I had the chance to represent
          my country in six international competitions. DJS Antariksh has been a
          deeply meaningful part of my journey, and I’d love to share the
          experiences, challenges, and lessons that made it so special.
        </motion.p>
      </div>

      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          1. The Dream That Took Flight
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          When I started my undergraduate Computer Engineering degree, I didn’t
          have a clear direction. I just knew I wanted to build something
          meaningful. I felt I lacked the technical foundation to call myself a
          good coder, and that realization pushed me to explore. Like many
          others, I considered web development and machine learning. But what
          unexpectedly caught my interest was robotics, something I hadn’t
          seriously considered until I came across DJS Antariksh, my college’s
          International Martian Rover Team.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The team was structured into five departments: Coding, Electronics,
          Mechanical, Marketing, and Science. I was naturally drawn to the
          Coding department, which itself was split into three areas: AI,
          focused on building object detection models; GUI, which managed the
          team’s website and rover interface; and ROS, which handled the rover’s
          control systems and real-time communication.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          I decided I wanted to get in this team, and that motivation led me to
          start learning C++, my first ever programming language. I also had
          some web development experience from high school, which gave me a
          small head start. When the recruitment process began, I applied with
          no expectations, and to my surprise, I was selected as one of 10
          members out of over 200 applicants. It wasn’t until much later in my
          journey that I truly understood what the team saw in me.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          At the time, I thought a “good project” meant something like a
          polished hackathon app, an innovative website, or a machine learning
          model. But the first time I walked into the team’s workshop, it
          completely changed my perspective. This wasn’t a short-term project.
          It was a year round effort involving 150 students working across
          disciplines, all focused on one mission: designing and building a Mars
          rover capable of competing internationally.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          In those early days, while our seniors assembled the rover, we were
          busy getting up to speed, learning the tech stack, understanding the
          team’s workflows, and figuring out how such a large operation
          functioned. Then came my first big challenge: the International Rover
          Challenge 2023 which also happened to be our team’s first onsite
          international competition.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          2. My First Competition
        </motion.h2>

        <div className="mt-5 text-secondary text-[17px]">
          <strong>Competition Objectives</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              Astrobiology Expedition: The rover acts as a Mobile Science
              Laboratory to collect samples and perform analysis to seek signs
              of life.
            </li>
            <li>
              Reconnaissance and Delivery Operation: The rover reconnaissance an
              area to search, locate, pick up, and deliver objects to specific
              locations.
            </li>
            <li>
              Instrument Deployment and Maintenance Operation: The rovers
              traverses a short distance to operate on a mock-up instrument
              panel to perform a set of precise operations.
            </li>
            <li>
              Autonomous Mission: The rover is required to traverse between
              markers across moderately rugged terrain autonomously using arrow
              signs. Teleoperation is not allowed in this mission.
            </li>
            <li>
              Presentation and Business Plan Proposal: Documenting the technical
              details of the Rover and how the team tackles situations.
            </li>
          </ul>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          For each task, only a selected few team members are permitted inside
          the base station. The base station is typically a closed tent located
          near the competition site. However, direct visual access to the rover
          or the terrain is not allowed. All operations must be conducted within
          the base station and within a strict time limit. Therefore, primarily
          the rover operators and some members of the coding team are granted
          access to the base station during missions.
        </motion.p>

        <motion.p className="mt-5 text-secondary text-[17px]">
          <strong>The International Rover Challenge 2023</strong>
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          We arrived onsite a few days after our seniors, only to find them like
          "walking zombies". For the next four days, we barely slept, just four
          hours total, and barely kept track of meals. When the seniors were
          working on assembling the rover and testing it on all the tasks, I was
          working on the team website and deploying it because we needed it
          before the presentation task. On the very first task, disaster struck.
          Our main embedded computing board, the Jetson Xavier NX, crashed
          mid-task and was accidentally wiped clean. Months of setup vanished in
          an instant. The rover, prepared meticulously for each challenge, had
          to be reconfigured from scratch overnight. While our seniors worked
          relentlessly to rebuild the autonomous system, we supported in every
          way possible: pulling GitHub repositories, testing motors and sensors,
          checking hardware components. Every bit of effort counted.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          We managed to recover and perform reasonably well, finishing 8th
          overall. It wasn’t the result we had aimed for, but it was a turning
          point. The experience made one thing clear: effort alone wasn’t
          enough. If we wanted to compete seriously with postgraduate and
          PhD-level teams from around the world, we would have to do the things
          we had never done before.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          3. Self Reflection = Better Results
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          This was the moment when we finally got to work hands on with the
          rover. We had reached a stage where we could contribute ideas, discuss
          their feasibility, and even implement them. Initially, we had a six
          wheeled rover, but our batch decided to create a new rover for
          ourselves, and were now transitioning to a four wheeled design. This
          meant completely reconfiguring the system and rewriting the code for
          the autonomous tasks from scratch.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          During this phase, we began visiting the workshop two to three times a
          week. Experimenting with new sensors, cameras, and other components
          became a regular part of our routine, continuing until we had
          developed a highly competent rover. Knowledge transfer within the
          coding department and building good rapport with members of other
          departments became essential parts of the process.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Over the next six months, our team, for the first time, aimed to
          participate in two competitions simultaneously. Both versions of the
          European Rover Challenge 2023, Onsite and Remote. For the onsite
          competition, we had to perform tasks similar to those at the
          International Rover Challenge, but with greater complexity. For the
          remote version, we needed to ensure that both the rover and the
          robotic arm could function remotely, with all testing conducted
          through simulations. Both formats also required us to give technical
          presentations.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Balancing preparations for both competitions along with academics and
          a part-time internship was challenging. However, I stuck to one core
          principle: I could sacrifice sleep for days on end, but I never wanted
          anyone to say I hadn't given my 100%, or that my other commitments had
          affected my work. As a result, I remember sleeping just 4–5 hours a
          night for six straight months.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Though the whole team contributed to both competitions, my Coding Head
          and one of my peers decided to focus on the onsite challenge, while I
          took full responsibility for the remote competition. As the event
          approached, staying overnight at the workshop and returning home just
          for meals became a routine. And then came the twist, just one week
          before the competition, I was put on bed rest due to burnout.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Before the final rounds of the remote competition, we had test drives
          to evaluate all systems and get comfortable with the controls. For the
          navigation task, where we had to traverse terrain, avoid obstacles,
          and drop a probe near a landmark, I served as one of the rover
          operators. We made decisions based on camera feeds and rover
          dimensions. For the maintenance task, which involved the robotic arm,
          we had to detect ArUco tags, press buttons in a specific order, and
          move objects from one place to another. We were using the UR3 arm, and
          one of the major challenges was figuring out which joints to move
          without causing collisions or hitting limits. The entire pose
          estimation, motion planning, and execution were handled by the
          autonomous code we had developed.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          In the first test drive, although everything worked smoothly in
          simulation, the robotic arm didn’t respond properly in real life. In
          the second test, we fixed many of the bugs and managed to move the arm
          and even touch the buttons, but we couldn’t push them. Since there
          were penalties for damaging the control board, we couldn’t afford to
          make rough estimations based only on simulations. Ultimately, we had
          to abandon the autonomous code for the robotic arm and switch to
          manual control. For the navigation task, I led the movement
          operations, and we managed to score full marks. I was also responsible
          for presenting our coding approach, highlighting both our strategy and
          the things that didn’t go as expected.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          With all the effort we put in, we secured second place globally.
          Still, I often wonder: if I hadn't been forced onto bed rest in the
          final days, maybe, just maybe, we could have pulled off the autonomous
          task as well.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          4. Tech Turning to Leadership
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Before the European Rover Challenge (ERC) 2023, our batch had just
          completed a full year together, and for the first time, we were on the
          other side of the table, interviewing juniors. With just ten of us
          tasked with screening nearly 200 candidates, the shift from being
          interviewees to interviewers was a significant milestone. It gave us
          clarity about what our seniors had seen in us when we had applied, and
          what we should now look for in the next generation.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          Despite not being very technically sound when I first joined the team,
          I had come to realize that selection was always more about potential
          and team fit than just raw technical skills. A key challenge during
          recruitment was the decentralized nature of interviews; each of us
          conducted separate sessions, so during final discussions, we had to
          strongly advocate for the candidates we believed in, backing every
          decision with proper documentation. Capturing insights from 20-30
          minute interviews wasn’t easy, but thorough records allowed for
          informed, collective decision-making.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          As our work on ERC progressed, my technical contributions and
          initiative were recognized, and I was given the responsibility of
          Coding Head. Within just six months of taking on this leadership role,
          we had to begin a fresh round of recruitment. This meant I now had to
          support not only my peers and juniors, but also the newest members of
          the team, our superjuniors.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          As head, I had to ensure the timely delivery of our competition tasks,
          knowing that delays in any one department could disrupt the whole
          system due to our interdependent workflows. I was also responsible for
          final technical documentation from the coding side, conflict
          resolution among peers, and creating structured learning tasks for
          juniors. This phase taught me that leadership isn’t just about knowing
          your domain, it’s about enabling others to function at their best too.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          Our next challenge came fast: preparing for both the International
          Rover Challenge (IRC) 2024 and the International Space Drone Challenge
          (ISDC) 2024, scheduled just one week after our final exams. Time was
          short, but this time we leaned into what we had learned before: focus
          over frenzy, planning over panic.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          Since we had already built a new rover for ERC, and with experience
          from the previous IRC, the transition was smoother. We were better
          prepared and had pre-tested several mission tasks. But challenges, as
          always, found their way in.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          5. Competition Days, Lessons Under Pressure
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Our first task was the Maintenance Task, where the rover had to
          traverse rugged terrain, press buttons, insert an ethernet cable, and
          perform other precise operations. Only five team members were allowed
          inside the base station: our captain (in charge of navigation), our
          electronics head and vice-captain (handling the robotic arm), our team
          manager (keeping track of time), and me, responsible for bringing up
          all systems and ensuring everything ran smoothly. As we began
          operating the robotic arm, a crucial camera wire got entangled. Due to
          the tension, we lost the feed from our main camera. Then, while
          lifting a 5kg dumbbell, we couldn’t raise it beyond a certain height,
          and one of the arm joints hit its mechanical limit. After that, we
          lost control over that joint entirely. To make matters worse, just a
          minute before the task ended, the final remaining camera feed also
          failed. One of the last steps required us to pick up a cone and place
          it inside a marked circle. With no visual feedback, the task seemed
          nearly impossible. My peer decided to take a chance. He rotated the
          wheels in the general direction, hoping the cone would land in the
          right spot. Incredibly, it did. That one move saved the task.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The next challenge was the Reconnaissance and Delivery Options Task.
          In this task, the rover had to detect and identify scattered objects
          across the terrain, pick them up, and drop them at specified locations
          using GPS coordinates. I had written a script to calculate our current
          location and the destination using GPS, which allowed for faster
          movement across the field instead of relying solely on camera
          feedback. Last year, during this same task, we had to take a manual
          intervention and rewire components during the run. In this year’s
          attempt, we completed it without any intervention, which was a huge
          improvement. (In this context, a manual intervention means that one
          team member is allowed to go out and fix the rover, but they can't
          return to the base station afterward). Thanks to intense practice, our
          operator had become incredibly efficient. He was able to pick up even
          the smallest objects, at difficult terrain angles, in just one
          attempt. We successfully picked up four objects, placed them in the
          designated spots, and for the first time, our rover returned to the
          base station after completing the mission, a significant milestone for
          us.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Next came the task that required no operator input, the Autonomous
          Navigation Task. The rover had to independently follow arrows and
          navigate the terrain without manual control. For this, I was the only
          person in the base station responsible for execution. If anything
          failed, it was entirely on me. Before the competition, I had carefully
          studied the lighting conditions at the site and noticed how variable
          sunlight could be. When the rover changed directions, the lighting
          fluctuated drastically. Anticipating this, I wrote code to
          automatically adjust the brightness and contrast of the camera feed,
          improving our arrow detection accuracy under different lighting. Our
          model performed perfectly, it detected the first arrow and executed
          the movement flawlessly. But while turning toward the second arrow,
          the uneven terrain caused one of our orientation sensors to give
          incorrect rotational values. The model, being highly accurate, picked
          up an arrow almost 20 meters away, one that was meant to be detected
          later in the sequence, and started moving toward it.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Unfortunately, the task had to be completed strictly in order, so this
          deviation meant we had to abort the task midway. It was a tough moment
          for me. I had poured in a lot of effort, and at a time when the team
          relied on me the most, I couldn't deliver the expected outcome. It
          felt like a personal failure. I took some time, about half an hour, to
          process everything and let my emotions out. But I knew I couldn’t let
          it hold me back. One last task remained, and I was determined to give
          it everything I had.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The final and most critical task, the Astrobiological Expedition, was
          up next, and I knew I had to give everything, whether or not it was a
          coding-specific challenge. To support the team, I configured and set
          up seven cameras overnight, most teams struggled with even two. For
          panoramic imaging, we developed a script to stitch multiple fields of
          view into a single file. This was our last chance, and we decided to
          risk it all.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Each team was given 10 minutes for preparation and 30 minutes to
          perform the task. Failing to launch the rover within the initial 10
          minutes would mean an immediate forfeit. During this tight prep
          window, we had to focus all cameras, test rover mobility, arm
          movements, and get the microscope and sensors configured. Our master
          ROS launch file also included the main camera feed, so everything
          needed to be online before we could proceed. During setup, I
          encountered the first challenge, the main camera wire wasn’t properly
          connected, which I realized just in time. Fixing it was critical, as
          it fed into the main ROS master. Thankfully, I caught and resolved the
          issue before the 10-minute prep window expired.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Just as I was about to finalize everything, the judge entered the base
          station to explain the task flow and expected execution order. As she
          turned to leave, she accidentally stepped on the main Ethernet cable
          that was supplying telemetry to my laptop. My entire screen went
          black. The moment she lifted her foot, the laptop restarted, but by
          then, the ROS master had shut down. I had to bring the entire system
          back online from scratch, and I had barely any time left to do it. But
          in that moment of pressure, something extraordinary happened. Not a
          single person in the base station came over to check on my laptop or
          question what was going on. Everyone simply trusted me to handle it.
          That silent confidence from the team meant everything to me. It was
          one of the most affirming moments of my journey.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          I managed to reboot and get the rover up and running just within the
          deadline. The task began, and we performed well: collecting samples,
          capturing panoramas, and completing the various required actions. Then
          came the final subtask, returning the collected sample to the base
          station. One of the designated sample sites was on extremely rigged
          terrain. Most teams had avoided it, but we decided to go for it. We
          successfully retrieved the sample, but on the way back, one of the
          rover wheels stopped working. Since our rover had four independently
          powered wheels, losing even one significantly affected directional
          control. To adapt, our captain made a quick decision: rather than
          pushing against the damaged wheel, he rotated the rover in the
          opposite direction to realign its path. But instead of a straight
          return, the rover started moving diagonally. As we were navigating the
          final stretch, the main connection plug got detached, we lost full
          control of the rover. However, the last issued commands were still
          being executed. We took the risk and let the rover continue its final
          programmed motion. It headed back, slowly but surely, slanting,
          broken, but moving. It finally bumped into our teammates, who were
          standing just outside the base station, watching. That’s when we
          realized control had already been lost. They pressed the kill switch,
          and at that moment, we saw that the rover had successfully reached the
          designated location.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          We had completed the task. Despite the odds, despite the setbacks, we
          delivered. We scored 264 out of 300 points in that task, our
          highest-scoring event, and it became the defining moment of our
          competition. That moment showed me something profound: all our
          planning, all the hours of coding, all the problem-solving, it all
          matters. But what defines success is how you respond when the pressure
          is highest and certainty is lowest. From finishing 8th in the previous
          edition to securing 3rd place this time at IRC, and 2nd at ISDC 2024,
          the journey wasn’t just about technical growth. It was about
          resilience, trust, and rising to the occasion when it mattered most.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          6. Representing India Outside India
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          My final competition with the team was the European Rover Challenge
          2024, and qualifying for it involved more than just technical
          innovation. We had to submit detailed documentation along with a
          compelling video showcasing our work. That’s when I truly realized
          that strong documentation and clear communication are just as crucial
          as technical skills. Most of us tend to focus solely on improving
          tech, including myself. But this experience taught me that presenting
          and explaining our work is equally important, especially when the
          responsibility of doing so falls squarely on your shoulders.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          For this competition, I took a step back from performing the rover
          autonomy and handed it over to the juniors, both to prepare them for
          their upcoming roles and to promote independent ownership. I
          personally focused on upgrading our telemetry system and working on
          autonomy for the drone, which was a key part of our submission. To
          keep the team coordinated and motivated, I introduced a few
          non-technical elements as well: team-building games, group lunches,
          weekly stand-ups, and one-on-one feedback sessions, both ways.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          After weeks of preparation, we qualified. And with that came the
          opportunity to represent India on an international stage, something I
          had dreamed of since I was a child. Competing abroad was a proud
          moment for all of us.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The competition itself went well. We managed to complete all assigned
          tasks, and our systems held up under pressure. But watching other
          teams was eye-opening. Many had advanced significantly within just a
          year. That’s when we realized the difference in context: while we were
          balancing robotics with academics and internships, several of these
          teams included PhD and Master’s students working full-time on their
          systems. Their level of specialization and depth showed. This made us
          reflect. In our college environment, where most students are from CS,
          IT, Electronics, or Mechanical backgrounds, it’s rare to find people
          deeply focused solely on robotics. That makes accelerating growth a
          bigger challenge, but not an impossible one.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          On the drone side, we faced an unexpected hurdle. Our main drone was
          damaged during transportation, but we still completed the task using a
          backup drone. Throughout, I was in direct communication with the
          judges, explaining our autonomous systems, constraints, and design
          choices. One of the judges, impressed with our work and approach, even
          took a picture with our team and asked for my linkedin. That small
          gesture meant a lot, it was a recognition of not just our technical
          work, but our resilience and attitude.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          In the final rankings, we placed 11th overall, and were the top-ranked
          team from Asia and India. While the global competition was intense,
          this experience taught me that communication, pitching, and networking
          are just as vital as solving technical challenges. Many of the people
          I met there, from across the world remain close friends and contacts
          to this day.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          7. Looking Back
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          This team has made me who I am today. It has given me the mindset to
          go all in for what I love and never settle for being average. It’s
          here that I’ve learned how to solve problems with clarity, take
          ownership when it counts the most, and be the clutch person under
          pressure. At this point, I genuinely believe that if my team needs
          something, whether it’s a new tech stack or a critical fix, I can pick
          it up in a few days and get things moving. The bond I share with my
          peers and the way we trust each other in crucial times is what has
          made this experience even more special.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Looking back, my journey has been far more than just building robots,
          it has been about building myself. From stepping into the team with
          limited technical knowledge to eventually leading critical subsystems,
          managing cross-functional teams, and representing my country on an
          international stage, each phase has shaped me profoundly. I’ve learned
          that while technical expertise is essential, it’s leadership,
          planning, communication, and the ability to perform under pressure
          that truly drive impact. Whether it was taking interviews, resolving
          conflicts, writing documentation, or recovering systems moments before
          a mission, every challenge taught me something new. I’m especially
          grateful to my teammates, mentors, and juniors, who trusted me,
          challenged me, and grew with me. This journey was never about
          individual achievement, it was about a shared passion and a collective
          pursuit of excellence. And for all the moments, successful or
          otherwise, I carry nothing but gratitude.
        </motion.p>
      </div>
    </>
  );
};

export default SectionWrapper(DJSAntariksh, "DJSAntariksh");
