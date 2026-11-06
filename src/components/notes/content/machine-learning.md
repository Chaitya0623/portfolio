## Foundations

- Andrew Ng Stanford Notes: https://cs229.stanford.edu/main_notes.pdf
- **AI vs ML vs DL vs DS:** AI is the process of mimicking the human brain whereas machine learning is the process to do so
  - AI applications are able to do its own task without human intervention (amazon, tesla)
  - **ML:** subset of AI, provides stats tools to analyze, visualize, prediction of data
  - **Deep Learning:** subset of ML - mimic human brain (multi-layered neural networks)
  - **Data Science:** An umbrella term that encompasses all aspects of data processing, including collection, modeling, and insights. Not subset of, but related to both AI and ML
- **Bias:** assumptions that the learner uses to predict the outputs, skews the result of an algorithm in favour or against an idea. how close the models predicted values are to the true values
- **Variance:** measure of spread in data from its mean position, changes in the model when using different portions of the train and test data
- **Underfitting:** high bias low variance, underfitting has fewer variables, so more assumptions needed, Model accuracy is low with both training and test data
- **Overfitting:** model performs well → training data (low bias). fails to perform well → test data (high variance)
- **Bias Variance Tradeoff:** how to solve overfitting, underfitting, low/high bias, variance. What is the optimal value? Solve using L1/L2 regularization, dropout in neural networks
  - Simple model: high bias, low variance
  - Complex model: low bias high variance

- **Cross-validation:** k-fold averages performance over k train/validation splits. Use stratified k-fold for imbalanced classification and a time-based split (train on the past, validate on the future, never shuffle) for time series. Nested CV keeps hyperparameter tuning from making the estimate look too optimistic
- **Data leakage:** information from the validation/test set or from the future sneaks into training. Fit scalers, encoders and imputers on the training fold only (sklearn Pipelines do this for you), and drop features that are only known after the outcome
- **Feature scaling** matters for distance- and gradient-based models (KNN, SVM, k-means, PCA, regularised linear models, neural nets) but not for tree-based models
- **Missing values:** drop, impute (mean / median / mode, KNN, model-based) and optionally add a "was missing" indicator
- **Curse of dimensionality:** as features grow, data becomes sparse and distances become less meaningful, so distance-based methods suffer and you need far more data

::viz bias-variance

## Classification of Machine Learning

- **Supervised ML:** Classification and Regression (Labeled Data)
  - I/P → Hypothesis → O/P.
  - Independent, dependent features.
  - **Regression:** output is a continuous variable.
  - **Classification:** fixed number of categories in O/P. e.g. True/False
- **Unsupervised ML:** Clustering, Dimensionality Reduction
  - No dependent variable, usually no labels
  - **Clustering:** grouping similar items together. e.g. customer segmentation
  - **Dimensionality Reduction**
  - **Association Rules:** used to uncover hidden relationships between variables and large datasets
- **Ensemble Techniques** (combining models)
- **Semi Supervised** (small labelled, large unlabeled, train on labelled, make preds on unlabeled, use preds with highest confidence for training again)

## Libraries

- **Numpy:** for large multi dimensional array for matrix processing (mathematical operations)
- **Pandas:** data analysis and associated manipulation of tabular data in dataframes
- **Matplotlib:** graphical representation of data
- **Seaborn:** for making statistical graphics in python
- **Scikit-learn:** provides efficient tools including classification, regression, clustering, dimensionality reduction, etc
- **Surprise:** used for SVD in recommendation systems
- **Keras:** used for creating deep learning models (neural networks)
- **Haarcascade:** has pretrained models for object detection. Eg. human face detection, eye detection, vehicle detection
- **Deepface:** face recognition
- **Scipy:** numpy extension for complex scientific & mathematical problems
- **Pandas-profiling:** auto generates tables for data analysis on the dataset
- **Sweetviz:** high density visualizations to kickstart EDA
- **SnapML:** IBM library for ML modeling, provides highly efficient GPU/CPU implementations of linear/tree based models

## Supervised ML

### Linear Regression

- Used for predicting the value of a dependent variable
- Train dataset → model → hypothesis → O/P
- **Best Fit Line:** Equation of a straight line
  $ y = mx + c   →   y = β₀ + β₁x   →   hθ(x) = θ₀ + θ₁x
  - θ₀ = intercept, θ₁ = slope, x = data points
- What do we need to solve? - Minimize the cost function
- **Convergence Algorithm** - The cost function will definitely not give you local minima in linear regression (the MSE cost is convex, so the only minimum is the global one).
- **Cost Function** - minimize the mean squared error, square → to avoid negative values, 1/n → to get average, 1/2 → will help in derivative
  $ J(θ) = (1/2n) ∑ (hθ(xᵢ) − yᵢ)²
- Loss function is how bad your model is for one example, cost function is for the entire dataset
- **Gradient Descent Algorithm:** to minimize the cost function
  $ θⱼ := θⱼ − α · ∂J(θ)/∂θⱼ
  - The cost curve is a parabola (convex bowl), but the gradient keeps changing at each point, so the step size shrinks as you approach the minimum

::viz gradient-descent

- **Stochastic Gradient Descent:** computing the gradient over the whole dataset at every step is expensive, you thus use SGD which adds an element of randomness
  - Difference between GD and SGD/how is the randomness decided? GD uses the full dataset for each update, while SGD uses a randomly chosen data point or mini-batch for each update. The randomness comes from shuffling or random sampling of data before each update
- **Batch Gradient Descent:** uses the entire dataset to compute every update (smooth and stable, works well for convex optimization, but each step is expensive and it might get stuck in a local minimum for non convex problems)
- **Mini-Batch Gradient Descent:** gradient is computed on a small batch, the parameters are updated, then it moves to the next batch (can be different sizes)

- **Regression metrics:** MAE is robust to outliers (predicts the median), MSE/RMSE penalises large errors (predicts the mean), MAPE breaks down near zero

::viz gd-variants

- **Convex Optimization:** in general optimization, we can get stuck with a local minima. Convex problems have no local minima except the global minima. We generally use convex optimization for loss functions.
- **Performance Metrics:**
  $ R² = 1 − RSS/TSS
  - R² = coefficient of determination
  - RSS = sum of squares of residuals
  - TSS = total sum of squares
  - For adjusted R², divide RSS by N−p−1 and TSS by N−1, where N = total sample size, p = number of independent variables
    $ Adjusted R² = 1 − (1 − R²)(N − 1)/(N − p − 1)
  - R Square is always greater than or equal to adjusted R Square.
- **Assumptions in Linear Regression:**
  - 1. Normality of residuals (Gaussian Distribution → model will perform well)
  - 2. Standardization (Scaling data) → z-score (not an assumption as such, but it helps gradient descent converge)
  - 3. Linearity
  - 4. Multicollinearity - If 2 characteristics are similar, we drop one (and each observation should be independent of any other)
    - Detect it with the Variance Inflation Factor, VIF = 1 / (1 − Rⱼ²), where Rⱼ² comes from regressing feature j on the other features; VIF above ~5–10 is a warning sign. It makes coefficients unstable and hard to interpret, but does not hurt predictions much
  - 5. Homoscedasticity: residuals have constant variance (check with a residuals vs fitted plot)

### Logistic Regression (binary classification)

- **Sigmoid Function:**
  $ σ(z) = 1 / (1 + e^(−z))
- Best parameters are obtained by minimizing the cost function (log loss)
- **Interpreting coefficients:** the model is linear in the log-odds, log(p / (1 − p)) = β₀ + β₁x₁ + …, so a one-unit increase in xᵢ multiplies the odds by e^βᵢ (the odds ratio), holding other features fixed
  - Example: β = 0.4 for "number of late payments" → e^0.4 ≈ 1.49, so each extra late payment raises the odds of default by about 49%
- **Performance Metrics:**
  - Accuracy = (TP + TN) / (TP + FP + FN + TN)
  - Precision = TP / (TP + FP) (accuracy of positive predictions)
  - Recall = TP / (TP + FN) (model's ability to identify all relevant instances)
  - F1-Score = 2 × Precision × Recall / (Precision + Recall) (harmonic mean)
- **AUC (Area Under the ROC Curve):** evaluate binary classification models across all thresholds (for heavily imbalanced data, the precision-recall curve is often more informative)
- **KS statistic (Kolmogorov–Smirnov):** the largest gap between the cumulative score distributions of positives and negatives, i.e. the maximum of TPR − FPR over all thresholds. Common in credit risk scoring; higher means the model separates the classes better
- **Probit Regression** (uses the normal CDF instead of sigmoid in logistic)

- **Imbalanced data:** judge with precision, recall, F1 or PR-AUC instead of accuracy; use class weights, resampling (undersampling, oversampling, SMOTE, applied to the training data only) and tune the decision threshold

::viz classification-metrics

### Ridge and Lasso Regression

- y = output of predicted model
- L1 = absolute values
- L2 = squares
- Lambda = regularization strength, a hyperparameter chosen with cross validation
- **Ridge (L2 Regularization):** Try to get a generalized model of low bias and low variance - prevent overfitting. Steep slope leads to overfitting.
  $ Cost = MSE + λ ∑ θⱼ²
- **Lasso (L1 Regularization)** helps in preventing overfitting, feature selection (it can shrink coefficients to exactly 0)
  $ Cost = MSE + λ ∑ |θⱼ|

- **Why L1 gives sparse weights:** the L1 constraint region is a diamond with corners on the axes, so the optimum often lands on a corner where some weights are exactly 0; the L2 region is a circle with no corners

::viz regularization

### Naive Bayes Classifier

- Uses Bayes Theorem, with the "naive" assumption that features are conditionally independent given the class
  $ P(y | x₁…xₙ) ∝ P(y) ∏ P(xᵢ | y)
- **Generative vs discriminative:** generative models learn P(x, y) (Naive Bayes), discriminative models learn P(y | x) directly (logistic regression)

### KNN Algorithm (K Nearest Neighbours)

- Does classification and Regression both
- Cons - Outliers, Imbalance

### Decision Tree (nested if else condition)

- Nested if-else condition
- Till you get pure leaf nodes (to predict the class of unknown cases)
- Purity: purity split, entropy, gini impurity
- **Entropy:** (Randomness - not sorted)
  - Entropy = 0 for a pure node (only one class), 1 for a perfectly mixed 50/50 node (two classes)
    $ Entropy = −∑ pᵢ × log₂(pᵢ)
- **Gini Impurity:** probability of misclassifying a randomly chosen element. (Used mainly for CART)
  $ GI = 1 − ∑ pᵢ²
- Which feature to take to split? **Information Gain:**
  $ IG(D, A) = H(D) − H(D | A),   H(D) = entropy of class distribution
  - For the category that has more gain, you start with that
  - If huge number of features (fast): Gini Impurity, Small set: Entropy

::viz impurity

- **Pruning in Decision Trees:** to prevent the model from overfitting. Removes unwanted nodes from the overfitted decision tree to make it smaller in size (pre/post pruning)
- **Decision Tree Regressor:** (output is continuous)
  - F1 score, mean, mean square error
  - Pre pruning: if % > 80, don't solve further; post pruning: grow the full tree, then cut it back
  - Hyperparameters: max depth, max leaf

### Ensemble Techniques (use multiple algorithms)

- **Bagging:** bootstrap aggregation, getting data from all the different models independently
- **Boosting:** sequential combination of models (many weak learners sequentially combined to form a strong learner)
- **Random Forest Classifier and Regressor:**
  - In decision tree, there is low bias and high variance. This high variance is converted to low variance using Random Forest. Normalization is not required in DT & RF but standardization is required in KNN. Random forest is not much impacted by outliers, KNN is
  - **Bagging:** combines output of different decision trees, equal opportunity to all features by selecting randomly
  - **Boosting (AdaBoost):** giving weight to all samples (overall = 1)
    - Total error = sum of the weights of the misclassified samples
    - Performance of Stump = ½ logₑ((1 − TE) / TE)
    - New sample weight = weight × e^(performance) for misclassified samples, weight × e^(−performance) for correctly classified ones
    - Divide weight by sum of new weight to get normalized weight
  - Classification = majority of output
  - Regression = average (of multiple decision trees)
- **Black vs White Box Models:**
  - **White Box:** explainable by design (linear regression, decision tree)
  - **Black Box:** not explainable by itself (random forest, KNN)
- **XgBoost:** works better on numerical and categorical features, Extreme Gradient Boosting. https://www.nvidia.com/en-in/glossary/xgboost/
- **Support Vector Machines (SVM):** text category assignment, image recognition
  - Linear → linear kernel (LinearSVC), Non-Linear → kernel SVM (RBF, polynomial)
  - **Kernelling:** mapping data to a higher dimensional space
- **Bagging vs boosting:** bagging trains models in parallel on bootstrap samples and mainly reduces variance (random forest); boosting trains sequentially, each model fitting the errors (gradients of the loss) of the previous ones, mainly reduces bias, and needs a learning rate / early stopping to avoid overfitting

## Unsupervised ML

### K-means Clustering

- We try k values -> suitable
- Initialize K number of centroids
- Compute the average to update centroids
- To get optimal k value, use elbow method
- **Silhouette Algorithm:** how similar a data point is within-cluster (cohesion) as compared to other clusters (separation)
  $ s(i) = (b(i) − a(i)) / max(a(i), b(i))   for different values of k
  - a(i) = avg dist between the point and other points in the same cluster
  - b(i) = avg dist between the point and points in the nearest different cluster
- [Elbow Method | Silhouette Coefficient Method in K Means Clustering Solved Example by Mahesh Huddar](https://www.youtube.com/watch?v=wW1tgWtkj4I)

::viz kmeans

### Hierarchical Clustering

- You need to find the longest vertical line that has no horizontal line passing through it
- Maximum time is taken by hierarchical clustering
- Dataset = small -> hierarchical clustering
- Dataset = big -> kmeans

### DB Scan Clustering (density based)

- **Min pts:** hyperparameter
- **Epsilon:** radius of that specific circle
- **Core point:** center of a circle (radius ε) that contains at least min pts
- **Border point:** not a core point itself, but within ε of at least one core point
- **Noise point:** neither a core point nor within ε of one

::viz dbscan

### Association Rules

- **Apriori Algorithm:** first identify the frequent itemsets in the dataset (items that appear in a certain number of transactions). Then generate association rules. "If item A is purchased, Item B is also likely to be purchased". It uses a bottom up approach starting with individual items and gradually building up to more complex datasets
  - **Support:** probability of an event to occur
  - **Confidence:** measure of conditional probability
  - **Lift:** probability of all items occurring together divided by the product of antecedent and consequent as if they are independent of each other

### Dimensionality Reduction

- **Singular Value Decomposition (SVD):** decomposes a matrix into 3 other matrices (in order to understand latent features). Mainly used in dimensionality reduction, noise reduction, recommendation systems
- **PCA (Principal Component Analysis)** - shift (rotate) the axes to the directions of maximum variance

::viz pca

## Other Learning Paradigms

- **Self Supervised Learning:** a model learns from unlabeled data by creating its own supervisory signals
- **Reinforcement Learning:** training agents to make decisions in an environment by receiving rewards or penalties for their actions, ultimately learning to optimize a cumulative reward

## ML Engineering

- **Model drift** is the decline in the accuracy of a machine learning model over time due to changes in the statistical properties of the data it encounters in production. Monitor key metrics and alerts to detect it
- **A/B testing** (or split testing) is a method of comparing two versions (A and B) of something—like a webpage, email, or app feature—by showing them to different user groups to see which performs better at achieving a specific goal, like more clicks or sign-ups, using data to make informed decisions for better user experience and conversion rates
  - Define the goal and hypothesis
  - Select key metrics
    - **Guardrail metrics:** metrics that must not get worse even if the main metric improves (latency, crash rate, unsubscribes, revenue per user)
  - Determine Statistical Parameters:
    - **Significance Level (Alpha):** The probability of rejecting a true null hypothesis (Type I error), typically set at 0.05.
    - **Statistical Power (1 − Beta):** The probability of correctly rejecting a false null hypothesis (avoiding a Type II error, whose probability is Beta), typically set at 0.8.
    - **Minimum Detectable Effect (MDE):** The smallest difference between the control and variant that is considered practically significant and worth detecting. These parameters are crucial for calculating the required sample size and duration of the experiment.
  - Prepare the model
  - Traffic splitting and randomization
  - Run the experiment (rollout in 1%, 5%.... And compare)
  - Data analysis

- **A/B testing pitfalls**
  - Peeking: stopping as soon as p < 0.05 inflates false positives; fix the sample size up front or use a sequential test
  - Novelty / primacy effects: users react to change itself, so run long enough (full weekly cycles)
  - Sample ratio mismatch: if a 50/50 split arrives as 52/48, check with a chi-square test before trusting results
  - Interference / network effects: treated users affect control users (marketplaces, social features)

::viz ab-test

- **Shadow testing** is a strategy where a new version of software runs alongside the current live version, processing the same real production traffic but without affecting users.
- **ML system design framework:** clarify the business goal and turn it into an ML metric → data and labels → features → simple baseline → offline evaluation → online A/B test → deployment (batch vs real-time) → monitoring for drift → retraining

## Applied ML in Finance

- **Alphas:** combines small elements of data and creates a market portfolio (1-20 variables, profitable signals), what signals are healthy/unhealthy for the stock market
- Averaging the results of multiple sentiment analysis models gives a much better result than just relying on one of them

### Data and Learning

- **Types of Data:** first party (company data), second party (credit card sharing data), third party (google ads, meta)
- **Passive learning:** You can not judge companies based on reviews only. Eg. a flight got cancelled, rather than there being a problem wrt the airlines, there might be a case where a particular event occurred. These reviews need to be kept into consideration.
- **Active learning:** information available (consumers chose whether to pay a cost or no based on customer review for a particular product)
- **Local Learning:** sector specific public signals
  - θ: true underlying economic state (e.g., fundamental productivity)
  - sᵢ,ⱼ: individual firm's private signal about θ
  - εᵢ,ⱼ: idiosyncratic noise in firm i's signal
  - sⱼ: average signal across all firms in sector j — becomes a sector-level public signal
  - αⱼ: share of investors participating in sector j
  - Mⱼ: number of potential investors/firms in sector j
  - τₛ: precision (inverse of variance) of individual signals

### Subir Chatterjee - Fi-tek: building softwares for wealth management

- For wealth management, the clients want to speak to people, the agents can automate only a part of it
- You use the contact and support features only when you have a negative situation. No one calls and tells "Columbia you're doing a great job" before paying the tuition fees.
- Most clients are in the range of 65+, we thus need to converse with their children, because we want to keep the wealth with ourselves
- According to BCG, 60% of companies using AI have not yet achieved material value (profits)
- Data Quality is one of the problems we face
- Fraud Detection, behavioural analysis, dynamic response, risk mitigation, autonomous decision making, cross system integration
- Phishing is the best way to get data (not through technology)

## Recommendation Systems

- **Approaches:** collaborative filtering (user-user, item-item, matrix factorisation), content-based filtering, hybrids
- **Cold start:** new users or items have no interaction history, so fall back on content features, popularity or onboarding questions
- **Two-stage pipeline:** candidate retrieval (e.g. two-tower embeddings) narrows millions of items to hundreds, then a ranking model orders them
- **Metrics:** precision@k, recall@k, MAP, NDCG

### Case Study: Spotify Recommendation System

- https://www.spotify.com/in-en/safetyandprivacy/understanding-recommendations
- **Track Identifiers:** Just retrieving the songs based on article titles is not efficient and cost effective (titles can also be ambiguous). Thus, they have implemented a Text2Track approach where they have fine-tuned LLMs to generate track identifiers. They have already stored the semantic Id's for each track based on collaborative filtering.
- Do Research by keeping the product team as customers into consideration. Show, don't tell. So usually research often pivots to product, both go hand in hand.
- **Hooks for Recommendations:** When recommending new articles, they provided a small explanation containing meaningful details about the artist or the music which led to higher music engagement. (eg. Relive U2's iconic 1993 Dublin concert with ZOO TV Live EP). They used LLMs that can do this for them based on a sample dataset (initially used zero shot or few shot learning open source models like llama, and then modified with human in the loop approach)
- They have also created a personalised AI DJ that understands the user's personal cues and recommends accordingly (with this, users are more willing to listen to a song that they would otherwise skip). They have a huge dataset, and they tune llama (3.1) only for scaling
- **Podcast Segmentation:** Podcast providers usually don't provide chapters with their podcast, thus they need to be generated for easier navigation. (PODTILE - LongT5 with 16k input token limit, if greater size - chunking). While chunking, we often lose the globalized context. Thus global context cues are given.
- Search by content-based filtering. Recommendations using collaborative filtering. Joint generative model
- **Early Discovery of Trending songs:** The desire for shared experiences is evident when people intentionally listen to music that is popular within their community, which differs from listening aimed at mood regulation or self-awareness. In collaborative filtering, it doesn't care about who the other people are and does not matter where their listening took place. Thus, it is important to identify the songs that are trending within the community. Some songs gain traction soon after its release, whereas some songs take a month. We need to discover such songs earlier. Thus, use a heuristic approach. On the day after release, if the fraction of users who have listened to the song exceeds a threshold, it is recommended to more users.
- **Community Music Recommendation:** In order to make local music recommendations, apart from language, beats, instruments, where is the artist from and is the artist accessible to that locality (e.g. concerts) also played an important role. These artists were then coupled with the user's prior behaviour. A/B tests were made on these based on user interactions
- **GNN:** Personalizing content for millions of music tracks, podcasts and audiobooks can be algorithmically achieved using graph-based machine learning. While audiobooks were new back then, they used music and podcasts to map similar thematic posts (using LLM Embeddings). They then used a multi-hop approach for graph traversal. That is, if Audiobook A1 is connected to podcast P1 (1-hop relation), and podcast P1 is connected to Audiobook A4, then the implication is that audiobook A1 and audiobook A4 are somehow related (2-hop relation). GNN by aggregating functions to their nearby nodes. They then use a 2 tower model which accounts for other user signals, such as demographics. Thus combining HGNN with a 2T model. In the unified model, the 2nd layer which is the user representation layer needs to be dynamic.

::viz multi-hop

- **Long and Short Term Data:** There is a lot of long term and short term data. Thus, using the entire data to make decisions will be expensive, and also decision making will be slow. We thus use long term causal inference (short - clicks, likes; long - retention from a year). To estimate long term outcome without the surrogacy restriction (variable in the middle which might cause the changes), we use off-policy evaluation techniques (inverse propensity scoring, double robust methods). But this does not consider short term rewards, thus, it will fail miserably when the long term data is noisy. They thus use Long Term Off-Policy Evaluation (LOPE). This approach is a combination of surrogacy and action effect. Here, surrogacy is also considered with long term rewards (it does not assume surrogacy like long term CI).
- **Production Environment Cycle:** For the process of updating an ML model, the shorter the update cycle, the quicker the ML systems can learn about the user's preference changes. However, in a production system, this update cycle can range from several hours to a few days. A simple way of tackling this is by using Bayesian decision making. This method maintains a Bayesian belief about the user's interests and selects content that decreases the uncertainty. This balancing act is also referred as exploration-exploitation (EE) tradeoff. But this process has limitations like high computational complexity and it's hard to specify a good prior distribution. We thus use in-context EE (ICEE) where the bayesian belief updates through neural network inference. We can thus accomplish Bayesian Decision making using supervised learning and neural network inference, enabling real-time adaptation to user's preference. Each listening session of the user can be used as an episode for Reinforcement Learning. But in ICEE, you cannot perform parameter updates while learning to solve individual tasks. Thus, the information of all the episodes are consolidated into a single sequence. The reward of the previous state is used as an input for the next state. For in-episode return-to-go, they use the multi-game decision transformer (MGDT) which calculates the cumulative reward from the current step and includes a model that predicts return at each step. For cross-episode return-to-go, binary values, 1 if the current episode's return is better than all previous episodes. But in the ideal case, the model needs to learn to solve a new task with the least number of episodes. They thus use an unbiased training objective (considering the standard return conditioned RL method is biased towards the data collection policy), which corrects the previous training objective with a probability ratio between uniform action distribution and data collection distribution. The Bayesian Optimization (BO) is used to search for the optimum of a function with the minimum number of function evaluations.

::viz bandit

- **Discover Weekly** is optimizing for discovery (introducing tracks, artists and genres that are novel to the user), whereas **Daily Mix** is based on the user's favourite content with some new music they may enjoy.

## ML Interview Tips (Ace the Data Science Interview)

- Using Linear Regression and getting it done will be more important than applying deep learning everywhere.
- don't choose something about a state-of-the-art transformer model to discuss as your favorite technique. Your details on it may be hazy, and your interviewer might not know enough about it to carry on a good conversation. (eg, random forest can handle both classification and regression, make sure you have something on the resume for the same)
- Try to learn about the math, pitfalls of every algorithm
- You need to know the derivations for Research Scientist, Quant roles

## Resources

- Deep Learning (Goodfellow, Bengio, Courville)
- Introduction to Machine Learning Interviews (Chip Huyen): https://huyenchip.com/ml-interviews-book/
- ML System Design Case Studies: https://substack.com/@youssefhosni95/note/c-139882498
- ML Case Studies: https://www.evidentlyai.com/ml-system-design
