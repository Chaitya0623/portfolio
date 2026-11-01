## Linear Algebra

- Vector in space Rᵈ is said to be d-dimensional. Revise, dot/cross product
- Two vectors are orthogonal if uᵀv = 0
- Matrix W ∈ Rᵐˣⁿ maps n-dimensional vectors to m-dimensional vectors
- The **rank** of a matrix is the number of linearly independent columns (or rows) that make up W. W = u₁v₁ᵀ + u₂v₂ᵀ (a sum of rank-1 outer products), so it indirectly helps map the complexity of the matrix
- **Eigenvectors:** Ax = λx, non-zero vectors that, when transformed by a matrix, only change in scale (stretch or shrink) without changing direction.
- **Eigenvalues:** λ, factor by which eigenvector is scaled.
- **Eigendecomposition:** decomposition of square matrix into eigenvectors. We thus use SVD for non-square matrices

::viz eigen

## Information Theory and Calculus

- **Expectation:** E(x) = ∑f(x)p(x), weighted average of all possible outcomes
- **Entropy:** uncertainty, H(x) = −∑p(x)log(p(x))
- **KL Divergence:** comparing how similar 2 distributions are (it is not symmetric, D(P‖Q) ≠ D(Q‖P))
  $ DKL(P‖Q) = ∑ p(x) log(p(x)/q(x))

::viz kl-divergence

- A **gradient** is a vector of partial derivatives (vector of slopes in each dir)
- **PDF (Probability Density Function):** f(x), non-negative, integrates to 1
- **CDF (Cumulative Distribution Function):** F(x) = P(X ≤ x)

## Hypothesis Testing

- In order to determine the difference between a sample mean and a population mean
  - **Z-test** (large sample tests, or when the population σ is known)
    $ z = (x̄ − μ) / (σ / √n)
  - **T-test** (small sample tests, population σ unknown)
    $ t = (x̄ − μ) / (s / √n),  with n − 1 degrees of freedom
- **Chi-Square Test (χ²):** to check if a set of data fits a specified distribution, where O = observed, E = expected
  $ χ² = ∑ (Oᵢ − Eᵢ)² / Eᵢ
- **ANOVA (Analysis of Variance):** to determine if there are statistically significant differences between the means of three or more independent groups. State the hypothesis, get the null hypothesis, calculate sum of squares, degrees of freedom (for between and within, how many independent variations we are measuring in the data), F ratio (variance between groups to variance within groups) and then decision (if calculated F > critical F, reject the null hypothesis)
  $ F = MS_between / MS_within = (SS_between / (k − 1)) / (SS_within / (N − k))

- **Type I error:** false positive (rejecting a true H₀), probability α. **Type II error:** false negative (missing a real effect), probability β. **Power** = 1 − β
- **95% confidence interval:** if we repeated the sampling many times, 95% of the intervals built this way would contain the true parameter (it is not "a 95% probability the parameter is inside this particular interval")
- **Multiple testing:** testing 20 independent metrics at α = 0.05 gives about a 64% chance (1 − 0.95²⁰) of at least one false positive. Bonferroni uses α/m; Benjamini–Hochberg controls the false discovery rate

::viz p-value

## Correlation and Regression

- **Correlation between variables:**
  - **Karl Pearson's correlation coefficient**
    $ r = ∑(xᵢ − x̄)(yᵢ − ȳ) / √( ∑(xᵢ − x̄)² · ∑(yᵢ − ȳ)² )
    - Positive, negative or zero correlation
  - **Spearman's Rank Correlation (ρ):** where d = difference between ranks
    $ ρ = 1 − 6∑dᵢ² / (n(n² − 1))
- **Regression:**
  - Regression of Y on X:
    $ Y − Ȳ = b_yx (X − X̄),   b_yx = Cov(X, Y) / σ_X²
  - Relation between correlation and regression coefficients (r takes the common sign of b_yx and b_xy):
    $ r = ±√(b_yx · b_xy)

::viz correlation
