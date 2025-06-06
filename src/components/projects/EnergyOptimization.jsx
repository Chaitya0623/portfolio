import { motion } from "framer-motion";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";
import { profile } from "../../assets";

const EnergyOptimization = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Energy Optimization Across McDonald's Outlets
        </h2>
      </motion.div>

      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          1. Powering Sustainability with Data
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          In the face of a global energy crisis and rising concerns about
          sustainability, businesses are under increasing pressure to reduce
          their carbon footprint. During my internship at Avrio Energy, a
          Berlin-based climate-tech startup focused on energy decarbonization
          for retail businesses, I had the opportunity to work at the intersection
          of technology, energy efficiency, and environmental impact. One of the
          most impactful projects I contributed to was in collaboration with
          McDonald’s, aimed at optimizing power consumption across more than 70
          retail outlets spanning 22 countries.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          What made this project particularly exciting was its practical
          relevance. These McDonald’s outlets operate in varied geographies,
          time zones, and building layouts, each with different consumption
          patterns and appliance usage behaviors. Rather than building a
          one-size-fits-all solution, the challenge was to create a scalable
          system that could ingest, process, and analyze appliance-level energy
          consumption in near real-time. From kitchen fryers to HVAC systems,
          every watt counted. Our work focused on identifying inefficiencies and
          reducing unnecessary power usage without compromising operational
          performance.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          To enable actionable insights, we developed an end-to-end data
          pipeline that aggregated streaming power usage data, stored it in a
          centralized relational database, and visualized it through interactive
          Power BI dashboards. These dashboards became a crucial decision-making
          tool for energy managers and store operators, surfacing key KPIs such
          as energy consumption trends, appliance-level usage, and cross-store
          benchmarking. The insights drawn from these tools contributed to a 15%
          reduction in operational energy costs, demonstrating how data
          transparency can directly drive business efficiency and environmental
          responsibility.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Moreover, by analyzing time-series patterns, we were able to identify
          abnormal usage signatures that pointed to malfunctioning appliances or
          suboptimal operating schedules. Recognizing this opportunity, I worked
          on building an automated fault detection system that not only flagged
          anomalies but also triggered real-time alerts via Airflow, helping
          staff take preventive action. This system was powered by a lightweight
          yet highly effective XGBoost-based model, which achieved an accuracy
          of over 92% in detecting energy anomalies. This further led to a
          reduction in wasted energy, bringing real savings and reducing
          unnecessary emissions.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          This experience fundamentally changed how I viewed data science, not
          just as a discipline for optimizing models, but as a tool to optimize
          systems, influence behavior, and tackle real-world problems with
          measurable outcomes.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          2. Engineering the Tech Stacks
        </motion.h2>

        <div className="text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-5 space-y-1">
            <li>
              <strong>Apache Airflow:</strong> A Python-based batch workflow
              orchestration platform, ideal for defining workflows with a clear
              start and end that run at scheduled intervals. In this project, it
              was used to automate ingestion pipelines and trigger real-time
              alerts for anomaly detection via DAGs (Directed Acyclic Graphs).
            </li>
            <li>
              <strong>Prefect:</strong> A modern workflow orchestration tool
              offering finer control over execution environments (e.g., Docker,
              cloud functions). While not directly implemented here, it's
              mentioned as an alternative due to Airflow’s steeper DAG setup
              overhead.
            </li>
            <li>
              <strong>GraphQL:</strong> A query language for APIs that enables
              clients to fetch exactly the data they need in a single request.
              Useful in building lightweight, flexible APIs. The REST API
              requires client requests to follow a fixed structure to receive a
              resource. Thus, GraphQL was explored as a potential enhancement
              for querying appliance data more efficiently than REST APIs.
            </li>
            <li>
              <strong>CouchDB:</strong> A NoSQL database designed for high
              availability and offline-first use cases. It is ideal for usage in
              mobile devices, where network connection is not guaranteed, and
              the application must keep on working offline.
            </li>
            <li>
              <strong>PostgreSQL:</strong> A powerful relational database with
              support for custom data types, advanced indexing (B-tree, Hash),
              and high-concurrency handling. It was the main storage layer for
              appliance-level energy data, supporting fast queries and
              aggregations for the Power BI dashboards.
            </li>
            <li>
              <strong>Prometheus:</strong> A time-series database that supports
              dimensional data collection and querying using PromQL. It was
              evaluated for monitoring pipeline health metrics and system
              resource usage over time.
            </li>
            <li>
              <strong>Grafana:</strong> A visualization tool for time-series
              data. In this project, it was actively used to monitor and
              visualize appliance-level power consumption trends across
              McDonald’s outlets, enabling detection of abnormal usage patterns
              in real-time.
            </li>
            <li>
              <strong>Metabase:</strong> A user-friendly analytics and
              dashboarding tool, often seen as an open-source alternative to
              Power BI. It was briefly tested during prototyping before Power BI
              was finalized for business-facing reports.
            </li>
            <li>
              <strong>VictoriaMetrics:</strong> A high-performance time-series
              database. It was researched as a scalable storage backend for
              long-term IoT data retention due to its compression and querying
              capabilities.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(EnergyOptimization, "energyoptimization");
