## Descriptive Statistics

- **Mean:** average
- **Median:** measure of central tendency, middle value
- **Mode:** most occurring element
- **Range:** difference between the highest and the lowest value in the data
- **Variance:** Measures how far, on average, each data point is from the mean, average of squared differences between each data point and the mean
  $ Var(X) = σ² = E(X²) − {E(X)}²
- **Covariance:** how two variables change together
  $ Cov(X, Y) = E[(X − E[X])(Y − E[Y])]
- **Standard Deviation:** root of variance, measure of spread
- **Percentile:** how a score compares to other scores of the same set
- **Quartile:** divides the set into 4 equal parts
- **Useful identities:** E[aX + b] = aE[X] + b, Var(aX + b) = a²Var(X), Var(X + Y) = Var(X) + Var(Y) + 2Cov(X, Y)
- **Standard error of the mean** = σ / √n, so quadrupling the sample size halves the uncertainty

## Bayesian Thinking

- **Bayesian Thinking:** calculating and updating probabilities as new information becomes available to make the best possible predictions
- **Bayes Theorem (Conditional Probability):**
  $ P(A | B) = P(B | A) · P(A) / P(B)
  - Precise prior or weak signal ⇒ mild update
  - Weak prior or precise signal ⇒ strong update
  - Normal Normal Conjugacy

::viz bayes-update

- **Base-rate fallacy:** a 99% sensitive, 95% specific test for a disease with 1% prevalence. Only about 17% of positives actually have the disease:
  $ P(D | +) = (0.99 × 0.01) / (0.99 × 0.01 + 0.05 × 0.99) ≈ 0.167

::viz base-rate

## Probability Basics

- For mutually independent events P(A∩B) = P(A)·P(B)
- Sum of all probabilities = 1
- **Permutations and Combinations:** C is without considering order https://www.geeksforgeeks.org/maths/permutations-and-combinations/
  - Number of permutations of n things: n!
  - Number of permutations of n things, m alike: n!/m!
  - Number of permutations of n things taken r at a time where repetition is allowed: nʳ
  - Selections out of n identical things: 1
  - Circular Permutation: (n-1)!
- **Random Variable:** assigns a probabilistic real value to an outcome in the sample space of a random experiment
  - **Discrete:** Probability Mass Function (PMF) - describes the probability at a value
  - **Continuous:** Probability Density Function (PDF) - integration
    $ Mean of a CRV: E(X) = ∫ x·f(x) dx
  - **Cumulative Distribution Function (CDF):** describes the probability up to a value
- Conditional random variable X|Y=y is just "the random variable X, but only looking at situations where Y has the value y". For example, ice cream sales (X) on sunny days (Y=sunny)
- **Law of Large Numbers:** If you repeat an experiment many times, the average of the results will get closer and closer to the expected value (mean) of the random variable.

::viz law-large-numbers

## Types of Probability Distributions

### Discrete

- **Binomial Distribution:** Fixed number of independent trials, each with a binary output. Its PMF, mean and variance are:
  $ P(X = k) = C(n, k) pᵏ (1 − p)ⁿ⁻ᵏ,   μ = np,   σ² = np(1 − p)
- **Bernoulli Distribution:** a single trial with a binary output (success with probability p); binomial is for a fixed number of independent bernoulli trials
- **Poisson Distribution:** Probability of a certain number of events within a fixed time interval
  $ P(X = k) = λᵏ e^(−λ) / k!,   μ = λ,   σ² = λ

### Continuous

- **Uniform Distribution:**
  $ f(x) = 1/(b − a),   μ = (a + b)/2,   σ² = (b − a)²/12
- **Exponential Distribution:**
  $ f(x) = λe^(−λx),   μ = 1/λ,   σ² = 1/λ²
- **Normal Distribution:** Modeling data that tends to cluster around a central value
  $ f(x) = (1 / (σ√(2π))) · e^(−(x − μ)² / (2σ²))

::viz distributions

## Priors and Conjugacy

- **Prior:** probability of an event before new data is collected
  - **Discrete:** assigned to set of discrete values
  - **Beta:** continuous distributions (on the interval 0 to 1, e.g. a probability)
  - **Histogram Prior**
- **Conjugate Prior:** when combined with a specific likelihood function, results in a posterior distribution that has the same functional form as the prior distribution
- **Metrics in Normal Distribution:** z = (X – μ) / σ
  - z = z-score (how many standard deviations X is from the mean; look it up in the z-table to get the probability)
  - x = given number
  - μ = mean
  - σ = standard deviation
- **Beta Binomial Model for Overdispersion (Non-Gaussian Conjugacy):** used when variance is greater than expected
- **Poisson-Gamma:** when the variance is greater than its mean
- When both mean and precision (variance) are unknown: Normal-Gamma prior
- **Normal Kernel Density Estimator:** nonparametric estimation (not estimating a specific functional form)

## Estimation and Limit Theorems

- **Maximum Likelihood Estimation:** estimate unknown parameters of a probability distribution/model from data
  - Likelihood:
    $ L(θ) = ∏(i=1 to n) f(xᵢ | θ)
  - Log-likelihood:
    $ ℓ(θ) = log L(θ) = ∑(i=1 to n) log f(xᵢ | θ)
  - MLE estimate:
    $ θ̂ = argmax ℓ(θ)
- **Central Limit Theorem:** under certain conditions, the means of sufficiently large random samples from a population will be approximately normally distributed, regardless of the population's original distribution
  $ (Sₙ − nμ) / √(nσ²) → N(0, 1)   (convergence in distribution)

::viz clt

## Monte Carlo Simulations

- **Monte Carlo Simulations:** use random sampling to predict the possible outcomes of an uncertain event (allows us to approximate high dimensional integrals numerically)
  - Eg. the distance between your home and office is fixed, a probabilistic simulation might predict different travel times by considering other factors like congestion and bad weather.
  - Eg. a marketer needs to decide whether it's feasible to increase the advertising budget for an online course. Here, one should use monte carlo mathematical model on uncertain factors (can be used to build a risk analysis model)
  - Eg. based on the pace of the market, how many units can be sold. But if it is a hot market, it will bring in competitors, so profit will decrease (so all such factors into consideration)
- **Principle:** ergodicity (how the behavior of a system can be defined from the behavior of a single point in the system) - behavior of a moving point in an enclosed system. The computer runs enough simulations to produce an eventual outcome of different inputs (more the number of simulations, more accurate the results). So in general, it calculates the probability by actually performing iterations of the event
- Mistakes made while selecting the input and the mathematical model can lead to inaccurate results, also, high computation

::viz monte-carlo-pi

## Markov Chains and Sampling

- **Markov Chain:** The future behaviour of the system depends only on the current state and not on previous states
- **Hidden Markov Model:** a Markov chain whose states are hidden (not directly observed); we only see outputs that each hidden state emits, and infer the hidden state sequence from them
- **Sampling:** creating chunks of data if the dataset is huge (suppose your dataset has a normal distribution, why will you want to take data points from the edges of the plots. Using sampling, we can replicate how the real dataset looks in terms of distribution)
  - **Rejection Sampling:** creating an evaluation line and then rejecting based on threshold https://towardsdatascience.com/what-is-rejection-sampling-1f6aff92330d
  - **Importance Sampling:** assigning weights to each sample (may suffer from high variance if some weights are much larger than others). Thus, to counter this, we normalize the weights and resample. Sampling Importance Resampling
- **MCMC Algorithm:** Markov Chain Monte Carlo - used to generate samples from a probability distribution. In accept reject sampling, the events were independent, here they are dependent, so they can't be eliminated directly. (The point is that domain should be same as target distribution)
  - **Metropolis Algorithm:** for symmetric proposal distributions
  - **Metropolis Hastings Algorithm:** for asymmetric proposal distributions https://www.youtube.com/watch?v=yCv2N7wGDCw here you consider the proposal probability of transition between two states

::viz metropolis

- **Gibbs Sampling:** multivariate distributions, used when distribution is difficult to sample from directly. Keep one variable fixed, sample the other variable, then another variable. https://www.youtube.com/watch?v=7LB1VHp4tLE
- **Nonparametric Bayes:** infinitely many parameters, grow in complexity with the data, can determine how many clusters/dimensions needed from the data.
- **Kruskal Wallis Test:** rank based non parametric test used to determine if there are any statistically significant differences between 2 or more groups of an independent variable on a continuous variable

## Causal Inference

- **Causal Inference:** correlation shows the relationship between two variables, causation is when one variable directly affects another (association can refer to any kind of relationship, correlation is linear) https://causalwizard.app/inference/article/bootstrap-refuters-dowhy
- **Bootstrap Method:** produce new datasets from the original dataset by randomly drawing samples. They are "drawn with replacement"
- **P-value:** measures the probability of obtaining results at least as extreme as the observed results, assuming that the null hypothesis is true. The lower the p-value, the greater the statistical significance of the observed difference. A p-value of 0.05 or lower is generally considered statistically significant
  - If it lies somewhere between the 5% estimate and the original estimate, it is quite plausible that we would have obtained this estimate even if there were no real causal effect
- **Cardinality:** number of distinct values that a data attribute can take in a dataset
- **Random Common Cause:** adding a variable which is not captured in data, but its influence disrupts your estimate of the causal effect
- **Confounders:** a variable that can create a spurious association between the treatment and the outcome by being related to both. A variable that is not in the causal pathway between the treatment and the outcome, but it causes both the treatment and the outcome (by other paths), similar to RCC, but not random
- **Estimand:** parameter or population value that a researcher wants to learn about a particular study
- **Average Treatment Effect:** difference between the average outcome of the treated group and the average outcome of the control group, where the treatment status is randomly assigned to the study participants
- **Estimate:** approximation of an unknown value based on a sample of data
- **Refutation:** testing a hypothesis by attempting to prove it false
- **Treatment variable:** presence (1) or absence (0) of the treatment in the study
- **Outcome:** variable to be observed in order to determine the effect of an intervention or exposure
- **Difference in Differences:** we cannot simply compare before and after changes, as other factors also come into play https://dimewiki.worldbank.org/Difference-in-Differences
- **Propensity Score Matching:** a propensity score is calculated for each individual in the sample, which represents the probability of being assigned to the treatment group based on their observed characteristics. Once the groups are matched, the average difference in outcomes between the treatment and control groups is calculated, and this difference can be interpreted as the causal effect of the treatment (helps reduce bias)
- **Frontdoor Variable:** a mediator on the path from the treatment to the outcome that is not affected by the confounder, so it lets us estimate the effect even when the confounding variable is unobserved
- **Backdoor Variable:** create a spurious association between the treatment and the outcome by relating to both
- **Regression:** to find the mathematical relationship between the treatment and the outcome, by also considering the confounders
- **DoWhy:** python library for causal effect estimation
- To perform model diagnostics, use covariate balance checks, propensity score overlap plots
- Stochastic Analysis
- **Simpson's paradox:** a trend that appears in every subgroup reverses when the groups are combined, because group sizes differ (a confounder)

