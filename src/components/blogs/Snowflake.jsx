import { motion } from "framer-motion";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";

// Import images - adjust paths based on your project structure
import workloadHeterogeneityOverview from "./snowflake/workload_heterogeneity_overview.png";
import workloadTaxonomy from "./snowflake/workload_taxonomy.png";
import valueOfOptimization from "./snowflake/value_of_optimization_by_class.png";
import diversificationEffect from "./snowflake/diversification_effect.png";
import regionalHeterogeneity from "./snowflake/regional_heterogeneity.png";
import decisionFramework from "./snowflake/decision_framework.png";
import comprehensiveSummary from "./snowflake/comprehensive_summary.png";

const SnowflakeBlog = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          The Limits of Aggregate Optimization: Workload Heterogeneity in
          Multi-Cloud Capacity Planning
        </h2>
      </motion.div>

      <div className="w-full flex flex-col items-start">
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px] italic"
        >
          Inspired by "Shaved Ice: Optimal Compute Resource Commitments for
          Dynamic Multi-Cloud Workloads" (Stokely et al., ICPE 2025), extended
          with a heterogeneity-aware analysis and a practical decision
          framework.
        </motion.p>
      </div>

      {/* Section: Why This Matters */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          Why This Matters
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Capacity planning for cloud compute isn't just "forecast demand, buy
          commitment." Long-term commitments (Reserved Instances / Savings
          Plans) offer large discounts, but they also convert forecasting error
          into real money:
        </motion.p>

        <div className="mt-5 text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Under-commit</strong> → you pay a premium for on-demand
              usage (think: "spill").
            </li>
            <li>
              <strong>Over-commit</strong> → you pay for capacity you don't use
              (think: "waste").
            </li>
          </ul>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          At Snowflake scale, even small percentage improvements translate into
          meaningful savings. But there's a catch: the same "total demand" curve
          can be made up of many smaller workloads with very different behavior.
          If we ignore that mix, we risk optimizing for an "average workload"
          that doesn't actually exist.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          This post does two things:
        </motion.p>

        <div className="mt-3 text-secondary text-[17px]">
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Gives a high-level, <strong>paraphrased gist</strong> of what
              Shaved Ice contributes.
            </li>
            <li>
              Shows why <strong>workload heterogeneity</strong> changes how we
              should think about "optimal" commitment strategies—then proposes a{" "}
              <strong>taxonomy + decision framework</strong> grounded in
              empirical results.
            </li>
          </ol>
        </div>
      </div>

      {/* Section: What the Shaved Ice Paper Did */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          What the Shaved Ice Paper Did (Gist, Paraphrased)
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Shaved Ice studies multi-cloud compute demand at Snowflake and asks:{" "}
          <em>
            How do we balance the savings of longer commitments against the risk
            that future demand doesn't match what we committed to?
          </em>
        </motion.p>

        <motion.p className="mt-5 text-secondary text-[17px]">
          <strong>1) Characterize demand drivers (not just the time series)</strong>
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          The paper argues that "future demand" is shaped by multiple forces:
          user demand patterns (daily/weekly cycles, seasonal drops, growth
          trends), hardware evolution (step changes in price/performance across
          VM generations), and software performance improvements (ongoing
          efficiency gains). The practical implication: commitments should be
          set with awareness that the world changes under you.
        </motion.p>

        <motion.p className="mt-5 text-secondary text-[17px]">
          <strong>2) Optimize commitment level with realistic asymmetry</strong>
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          The paper frames commitment selection as balancing two costs: spill
          (demand above commitment → fulfilled at on-demand rates) and waste
          (commitment above demand → unused capacity). Since on-demand is often
          far more expensive than committed rates, being short can hurt more
          than being long. Shaved Ice searches for the commitment level that
          minimizes a weighted mix of spill + waste.
        </motion.p>

        <motion.p className="mt-5 text-secondary text-[17px]">
          <strong>3) Make it production-shaped</strong>
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          Shaved Ice addresses why this is hard in real operations: trend isn't
          monotone week-to-week, seasonal dips matter (holidays), forecast
          horizon choices affect the "optimal" commitment, and staggered
          commitments (laddering) can reduce downside when demand drops.
        </motion.p>

        <motion.p className="mt-5 text-secondary text-[17px]">
          <strong>4) Extend beyond commitments</strong>
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          Finally, it expands from "how much to buy" to "how to run the system":
          time shifting deferrable internal work into off-peak troughs to
          exploit unused commitments, and free pools / predictive
          pre-provisioning to mask VM startup latency so customers can scale
          quickly.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          <strong>Takeaway:</strong> Shaved Ice gives a practical blueprint for
          commitment optimization and releases a dataset that enables follow-on
          research.
        </motion.p>
      </div>

      {/* Section: The Pitfall */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          The Pitfall: A Smooth Total Can Hide Messy Parts
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Even if an aggregate strategy is good, it can still hide an important
          operational question:
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px] italic border-l-4 border-secondary pl-4"
        >
          Which specific workloads are predictable enough that simple strategies
          work well—and which workloads need extra care?
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          To answer that, I analyze the Shaved Ice dataset at the level of
          individual (region, VM type) workloads.
        </motion.p>
      </div>

      {/* Section: The Data */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          The Data: What's in the Shaved Ice Dataset
        </motion.h2>

        <motion.p className="mt-5 text-secondary text-[17px]">
          <strong>What one data point represents</strong>
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          The dataset provides hourly compute demand. Values are normalized
          (scaled), which means you should read them as relative demand rather
          than absolute VM counts. Each time series corresponds to one
          "workload," defined as a region × VM type pair.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Intuitively: Region is "where" the compute runs. VM type is "what
          kind" of machine shape it is. A (region, VM type) demand curve is the
          platform asking: How many of these machines do we need, hour by hour,
          in that region?
        </motion.p>

        <motion.p className="mt-5 text-secondary text-[17px]">
          <strong>Time range and coverage</strong>
        </motion.p>
        <div className="mt-2 text-secondary text-[17px]">
          <ul className="list-disc list-inside space-y-1">
            <li>Time range: Feb 2021 – Jan 2024</li>
            <li>Granularity: hourly</li>
            <li>Workloads analyzed: 47 distinct region × VM type combinations</li>
          </ul>
        </div>

        <motion.p className="mt-5 text-secondary text-[17px]">
          <strong>Why hourly matters</strong>
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          Hourly data is the operational layer where capacity planning feels
          real: customer-driven daily cycles show up clearly, weekly patterns
          show up clearly, and short spikes (and shortfalls) matter because they
          translate to spill.
        </motion.p>

        <motion.p className="mt-5 text-secondary text-[17px]">
          <strong>How I look at the data</strong>
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-2 text-secondary text-[17px]"
        >
          Instead of treating the platform as one big curve, I treat each
          workload as having its own "personality." In this post, I quantify
          that personality using: how bumpy the curve is (stable vs spiky), and
          how strongly it repeats daily and weekly. These are simple signals,
          but they're surprisingly informative.
        </motion.p>
      </div>

      {/* Finding #1 */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          Finding #1: Some Workloads Run Like Clockwork; Others Are Spiky
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Across the 47 workloads, predictability varies a lot:
        </motion.p>

        <div className="mt-5 text-secondary text-[17px]">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Variability (CV)</strong> ranges from 0.01 to 1.82 (~191×
              spread). CV is basically: how bumpy is the demand relative to its
              average?
            </li>
            <li>
              <strong>Daily repeatability</strong> ranges from 0.02 to 1.00.
              This measures how similar demand is to itself one day later (same
              hour). 13 workloads (28%) have weak daily structure.
            </li>
            <li>
              <strong>Weekly repeatability</strong> ranges from -0.09 to 0.99.
              This measures how similar demand is to itself one week later. 17
              workloads (36%) have weak weekly structure.
            </li>
          </ul>
        </div>

        <motion.div
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-8 w-full flex justify-center"
        >
          <img
            src={workloadHeterogeneityOverview}
            alt="Workload Heterogeneity Overview"
            className="max-w-full h-auto rounded-lg"
          />
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          <strong>Plain-English takeaway:</strong> A single
          forecasting/commitment rule won't fit everyone. Some workloads are
          steady enough that you can plan confidently; others are inherently
          harder.
        </motion.p>
      </div>

      {/* Finding #2 */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          Finding #2: Workloads Naturally Fall Into Three Buckets
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          When you look at "bumpiness" + "daily/weekly repeatability" together,
          workloads cluster into three operationally useful groups:
        </motion.p>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-secondary text-[15px]">
            <thead>
              <tr className="border-b border-secondary">
                <th className="py-2 px-4 text-left">Bucket</th>
                <th className="py-2 px-4 text-right">Workloads</th>
                <th className="py-2 px-4 text-right">Volume Share</th>
                <th className="py-2 px-4 text-left">What It Feels Like</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-secondary/30">
                <td className="py-2 px-4">HIGH predictability</td>
                <td className="py-2 px-4 text-right">25 (53%)</td>
                <td className="py-2 px-4 text-right">96.3%</td>
                <td className="py-2 px-4">Strong patterns, relatively stable</td>
              </tr>
              <tr className="border-b border-secondary/30">
                <td className="py-2 px-4">MEDIUM predictability</td>
                <td className="py-2 px-4 text-right">13 (28%)</td>
                <td className="py-2 px-4 text-right">3.3%</td>
                <td className="py-2 px-4">Some patterns, but not always reliable</td>
              </tr>
              <tr>
                <td className="py-2 px-4">LOW predictability</td>
                <td className="py-2 px-4 text-right">9 (19%)</td>
                <td className="py-2 px-4 text-right">0.4%</td>
                <td className="py-2 px-4">Weak patterns, lots of surprise spikes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <motion.div
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-8 w-full flex justify-center"
        >
          <img
            src={workloadTaxonomy}
            alt="Workload Taxonomy"
            className="max-w-full h-auto rounded-lg"
          />
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          <strong>Plain-English takeaway:</strong> Most of the volume is in the
          predictable bucket (big money), but many of the distinct workloads
          live in the messier buckets (operational complexity).
        </motion.p>
      </div>

      {/* Finding #3 */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          Finding #3: "Fancy" Optimization Helps, But Not Equally
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          To measure how much better we can do than simple rules, I use a Shaved
          Ice–style cost idea: if you commit too little, you pay expensive
          on-demand for the shortfall; if you commit too much, you pay for
          unused capacity.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          I compare three ways to pick a commitment level:
        </motion.p>

        <div className="mt-3 text-secondary text-[17px]">
          <ol className="list-decimal list-inside space-y-1">
            <li>
              <strong>Mean:</strong> commit to the average demand
            </li>
            <li>
              <strong>"Average + one bump":</strong> commit to mean + one
              standard deviation (a common rule-of-thumb)
            </li>
            <li>
              <strong>Best-in-hindsight:</strong> the best commitment you could
              pick if you magically knew the future (a lower bound)
            </li>
          </ol>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          <strong>Results by bucket:</strong>
        </motion.p>

        <div className="mt-3 text-secondary text-[17px]">
          <ul className="list-disc list-inside space-y-3">
            <li>
              <strong>HIGH predictability (25 workloads):</strong> Savings vs
              mean = 2,166,134 (8.9%)
            </li>
            <li>
              <strong>MEDIUM predictability (13 workloads):</strong> Savings vs
              mean = 26,849 (4.4%). But the "average + one bump" rule can be
              wildly off here.
            </li>
            <li>
              <strong>LOW predictability (9 workloads):</strong> Savings vs mean
              = 881 (0.4%)
            </li>
          </ul>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Where do the total savings come from? HIGH predictability accounts for{" "}
          <strong>98.7%</strong> of total savings.
        </motion.p>

        <motion.div
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-8 w-full flex justify-center"
        >
          <img
            src={valueOfOptimization}
            alt="Value of Optimization by Class"
            className="max-w-full h-auto rounded-lg"
          />
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          <strong>Plain-English takeaway:</strong> If you want big dollars
          saved, focus on the HIGH bucket. If you want to avoid bad mistakes
          from naive rules, the MEDIUM bucket deserves extra attention. The LOW
          bucket is mostly about risk control, not squeezing out tiny percent
          improvements.
        </motion.p>
      </div>

      {/* Finding #4 */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          Finding #4: Pooling Smooths Things Out
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Aggregation has a real benefit: different workloads don't peak at the
          same time, so the total is smoother than many parts.
        </motion.p>

        <div className="mt-5 text-secondary text-[17px]">
          <ul className="list-disc list-inside space-y-2">
            <li>Average workload bumpiness (volume-weighted CV): 0.446</li>
            <li>Aggregate bumpiness (CV): 0.379</li>
            <li>That's about a 15% smoothness gain from pooling.</li>
          </ul>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          At the cost level: Aggregate optimization saves{" "}
          <strong>2,637,749 cost units (12.95%)</strong> relative to optimizing
          each workload independently.
        </motion.p>

        <motion.div
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-8 w-full flex justify-center"
        >
          <img
            src={diversificationEffect}
            alt="Diversification Effect"
            className="max-w-full h-auto rounded-lg"
          />
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          <strong>Plain-English takeaway:</strong> Shaved Ice's aggregate
          approach is validated: pooling really does make the problem easier.
          The point of heterogeneity analysis isn't "don't aggregate." It's
          "know what's inside the aggregate so you spend effort where it
          matters."
        </motion.p>
      </div>

      {/* Finding #5 */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          Finding #5: "Where You Run" and "What You Run" Both Matter
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Even within the same platform, predictability isn't uniform.
        </motion.p>

        <div className="mt-5 text-secondary text-[17px]">
          <ul className="list-disc list-inside space-y-2">
            <li>Most predictable region: Region 4 (0.74 daily repeatability)</li>
            <li>Least predictable region: Region 1 (0.65 daily repeatability)</li>
            <li>Most volatile VM type: G (CV 1.19)</li>
            <li>Least volatile VM type: K (CV 0.21)</li>
            <li>That's a 5.7× volatility spread across VM types.</li>
          </ul>
        </div>

        <motion.div
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-8 w-full flex justify-center"
        >
          <img
            src={regionalHeterogeneity}
            alt="Regional Heterogeneity"
            className="max-w-full h-auto rounded-lg"
          />
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          <strong>Plain-English takeaway:</strong> You can keep an aggregate
          strategy and still apply sensible guardrails by region and VM class.
        </motion.p>
      </div>

      {/* Decision Framework */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          A Practical Decision Framework
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The goal isn't to run expensive modeling everywhere—it's to spend
          sophistication where it returns value.
        </motion.p>

        <motion.div
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-8 w-full flex justify-center"
        >
          <img
            src={decisionFramework}
            alt="Decision Framework"
            className="max-w-full h-auto rounded-lg"
          />
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          <strong>Recommended strategies by bucket:</strong>
        </motion.p>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-secondary text-[15px]">
            <thead>
              <tr className="border-b border-secondary">
                <th className="py-2 px-4 text-left">Workload Bucket</th>
                <th className="py-2 px-4 text-left">What To Do</th>
                <th className="py-2 px-4 text-left">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-secondary/30">
                <td className="py-2 px-4">HIGH (53% workloads, 96% volume)</td>
                <td className="py-2 px-4">
                  Keep it simple: stable forecasting + quantile-style commitments
                </td>
                <td className="py-2 px-4">
                  Big absolute dollars; strong structure; diminishing returns
                  beyond "good enough"
                </td>
              </tr>
              <tr className="border-b border-secondary/30">
                <td className="py-2 px-4">MEDIUM (28% workloads, 3% volume)</td>
                <td className="py-2 px-4">
                  Invest in better workload-specific models and monitoring
                </td>
                <td className="py-2 px-4">
                  Rule-of-thumb heuristics can be badly wrong even if volume is
                  smaller
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4">LOW (19% workloads, 0.4% volume)</td>
                <td className="py-2 px-4">
                  Use conservative commitments + safety margins; prioritize
                  robustness
                </td>
                <td className="py-2 px-4">
                  Volatility dominates; sophisticated forecasting rarely buys
                  much
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          <strong>Core message:</strong> Treat heterogeneity as a routing
          problem: classify workloads, then apply the right strategy for each
          bucket.
        </motion.p>
      </div>

      {/* Summary */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          Summary: How This Complements Shaved Ice
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Shaved Ice shows how to optimize commitments with realistic cost
          asymmetry, trend/seasonality, and operational techniques like
          laddering and time shifting. This analysis complements it by
          explaining when and where that optimization effort is worth applying
          at finer granularity.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px] italic border-l-4 border-secondary pl-4"
        >
          If you only remember one thing: Aggregation helps (pooling smooths
          demand), but heterogeneity tells you where sophistication pays and
          where it doesn't.
        </motion.p>

        <motion.div
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-8 w-full flex justify-center"
        >
          <img
            src={comprehensiveSummary}
            alt="Comprehensive Summary"
            className="max-w-full h-auto rounded-lg"
          />
        </motion.div>
      </div>

      {/* Reproducibility */}
      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-10 text-secondary text-[32px] text-center"
        >
          Reproducibility
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          All code, intermediate outputs, and figure generation steps are in the
          notebook: <code>Workload_Heterogeneity_ICPE.ipynb</code>
        </motion.p>
      </div>
    </>
  );
};

export default SectionWrapper(SnowflakeBlog, "SnowflakeBlog");