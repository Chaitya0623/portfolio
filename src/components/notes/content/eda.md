## Why R?

- Unlimited graphic options
- Everything is interactive (javascript based)

## Histograms

- Close/open bounds (left closed, right open, etc): default in R is right closed -> (a, b] (right=TRUE)
- Ggplot2 default 30 bins (default is usually not the best way always)
- You can create density histograms with unequal bin widths (not ideal)
- Cumulative frequency histogram: count up to that value
- Bin-width (either set the number of bins, or bin width, or the number of breaks that you want)
- Bin boundaries can be changed with center or boundary

::viz histogram-bins

## Why ggplot2?

- Automated legends and margins
- Easy to create faceted plots (multiple plots with the same axes)
- Carefully chosen defaults
- **Grammar of Graphics**
  - Base R graphics (add each part of the graph line by line)
  - High level functions (just a call for the plot)
- **Layers**
  - **Geom** (geometric object - boxplot, histogram, etc)
  - **Aesthetic mapping** (mapping data with graph: x, y, color, fill..)
  - **Data** (dataframe)
  - **Stat** (statistical transformation - bin, density, etc)
  - **Position** (shifting)
- `mutate()` to change the format of the input, `fct_recode(factor)`
- `scale()` if you want to change the way the axes are there (default is usually good)

## Univariate Continuous Data

- Comparisons: histograms in general are hard to compare
- **Boxplots** (median, max, min, outliers)
  - Outlier = less than lower hinge − 1.5 × (upper hinge − lower hinge), or more than upper hinge + 1.5 × (upper hinge − lower hinge)
- **Density Curves:** nice for overlapping distributions
- In **Ridgeline plots**, you can check the number of modes, which you can't see from boxplots

::viz boxplot-density

- **Quantile-Quantile Plot** (to check normality)
  - Normal has both on the same line
  - The main difference is that the t-distribution is used for small sample sizes or when the population standard deviation is unknown, while the normal distribution is used for large samples or when the population standard deviation is known (t distribution has heavier tails, so it curves away from the line at both ends in a QQ plot)
  - Density curve is based on the data, normal curve is based on a theoretical distribution with the same mean and standard deviation

::viz qq-plot

## Categorical Data

- **Bar Charts**
  - Ordinal data (sort the categories from left to right)
  - Nominal data (sort by count), if horizontal (longest on top)
- **Cleveland dot plots**
  - Use that instead of bar charts when you want to reduce clutter, or show precise values without the visual weight of bars (or if you want more than one dot on the same line)
- With Topcoding, it's ideally showing the data exploded, but that would not have been the case if it was not topcoded and distributed uniformly
- Factors and Proportions
- Preprocess with groupby, missing values, etc

## Dependency Between 2 Variables

- Scatterplots
- Heatmap (hexagons work better than squares) - direction=1 so that light represents smaller numbers and dark represents larger
- Add one variable at a time

## Multivariate Continuous Data

- Always standardize values (different metrics can be on different scales)
- If multiple points meet at the same time, with straight lines, we will lose the track, we thus use splines
- Use stacked bar charts if you care more about the totals than the breakdowns
- If you want to compare across categories like this, grouped is better

::viz stacked-grouped

- In mosaic plots, to find the order in which the splits are done, check the order of categories*(n-1) for splits, eg. 1,2,4… (dependent variable is split last and horizontally)
- **Alluvial Diagram:** used more for staged data

## Color

- Different between color change looks similar throughout
- Be consistent across plots

## Spatial Data

- What problem are **cartograms** designed to address? The problem that in choropleth maps, land area is not proportional to population so areas with low population densities appear to have a greater influence than they actually do
- Radius map, bubble map, pushpin map, density map
- Or you can have quantile breaks, rounded breaks, jenks natural breaks (get clusters if data is grouped together)
- You can find missing rows with `geom_tile()`, `missing_data.frame()` but it removes columns if too much missing data, so keep cross checking. Try to find some patterns in when is the data missing

## Time Series

- Use lines majorly for time series, only exception is when data is less -> bar charts
- Look for: trends, seasonal patterns, cyclical patterns, noise, missing values, outliers, sudden changes
- Don't use fill in those line charts unless it's for density
- **Loess** (geom_smooth) - gives directionality, fits multiple local regression lines and tries to fit the points to these lines. There is no equation -> non parametric. Make span larger (default = 0.75) if you want it to be smoother, smaller to follow the data more closely

::viz loess

- While checking for seasonal patterns, if you see a lot of ups and downs for a region, maybe you can facet it to the day of the week to view it more closely
- You can color across the time series (maybe christmas week) or something
- Try to not use multiple y-axis plots and stuff (keep it uniform)
- `parse_date()`: to make dates uniform YYYY-MM-DD
- **Lubridate:** converts dates in different formats

## Interpretable Machine Learning with Visualization

- With quantitative methods, the predictions and accuracies are going up, but the understanding is going down
- **Partial Dependency Plots:** Change value of one feature to a constant, if that causes a lot of changes, that feature is important, or vice versa
- **SHAP:** uses a game theory rule, if x people work together, what is the valuation, what is the valuation if one more person comes in. Similarly, here, they find the contributions of each feature
  - Here, CatBat is contributing the most, and walks is contributing negatively
  - Then you consider when A joins 3rd (consider only the ones before it). And then take the average of all cases. You will get the avg marginal contribution
  - X and z are ideally 2 random rows from the dataset
  - This is how you get values for each feature
  - More simulations give more consistent results

::viz shap

### Linear Regression

- Residual means the distance between the line and the point, which we get after computing the regression line
- We use confidence intervals to check the results, PI = prediction intervals
- Standardized residuals are not that helpful (they sometimes lose out on the information)
- **Assumptions:** linearity, independence, homoscedasticity (constant variance), and normality of residuals
- **Coefficients** are numbers that represent the strength and direction of the relationship between independent variables and a dependent variable. A coefficient quantifies how much the dependent variable is predicted to change for a one-unit change in that specific independent variable, holding all other variables constant (sometimes standardize the coefficients)
  - Coefficient x Feature plot will be good for explainability (box plot is not a good idea here)
  - Percentage of explainability (t=49%, m=12%, unexplained=39%)
  - If we test it independently, we see that r-squared is the same as percentage contributions, thus additive. If they don't add up, they are correlated

### Logistic Regression

- Think of why not linear regression as the baseline (sigmoid fn)
- Maximum likelihood estimation to get the model
- try to prove the relationship between predictor variables and the log-odds of the outcome
- 0.2-0.4 (McFadden's pseudo R²) suggests strong fit

### Regression Trees

- Change type in rpart.plot to check what kind of visualization you want (labelled tree nodes)
- Try to find which one matches the total
- One problem with decision trees is that they are very unstable (influenced by the training set). It overfits with larger tree size. So the idea is to first create a larger tree, then prune it back
- After each split, try to find the RSS, and compare to parent
- We thus get the pruned Tree

### Classification Trees

- Then calculate impurity reduction at each node
- If you find misclassified (the ones on the right), even in the leaf nodes, those are used as error. error/total misclassified
- g(t) = misclassified (at each node)/total children nodes
- cp = g(t)/total misclassified (at the root)
- You can use partykit or ggparty to create graphs below the decision tree

### Partial Dependence Plot (can be used for almost all models)

- This works great if no correlation
- **Random Forest**
  - You can do quantiles=True (pick more data from the places you have data)
  - Also trim the outliers
  - The ones that change the most are more important
- **ICE (Individual Conditional Expectation):** Instead of taking the average, we look at each row
- **Centered ICE** - all lines start from the same point (better to see the variation)
- To iterate over all the values in the dataframe

::viz pdp-ice

### Local Interpretable Model-agnostic Explanations (LIME)

- At the local level, you can approximate everything with a line
- What led to the prediction
- This is how we get the linear regression line at that point `explain()`
- To measure how different 2 records are
- Here it uses logistic regression instead of ridge

### Decision Rules

- If then statements
- Only works with categorical data, else cut the continuous variables into intervals
- Then take decisions based on the information gain
- Mosaic plot can be used to visualize this

### Classification Model Accuracy

- Check formulae for precision and recall

### Global Variable Importance

- In decision trees, variable importance per feature = total amount by which SSE is reduced
- The surrogate splits should try to mimic the initial split (because it already handles missing values and stuff)
- **Permutation importance:** Scramble the data and check if there is any difference. The second one is what we are doing for decision trees, but taking the average of all trees
- For PDP, calculate the standard deviation for each PDP line
- You can use permutation as a model agnostic for anything
