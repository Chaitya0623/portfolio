## SQL

- https://www.geeksforgeeks.org/sql-tutorial/
- Playlist: [Learn Basic SQL in 15 Minutes | Business Intelligence For Beginners | SQL Tutorial For Beginners 1/3](https://www.youtube.com/watch?v=kbKty5ZVKMY)
- Practice before Leetcode: https://www.sql-practice.com/

### Sample tables used in every example

- All examples use PostgreSQL syntax; the date section lists the MySQL / SQL Server equivalents

```
employees
 id | name  | dept  | salary | hire_date  | manager_id
----+-------+-------+--------+------------+-----------
  1 | Asha  | Eng   | 120000 | 2021-03-15 | NULL
  2 | Ben   | Eng   |  95000 | 2022-07-01 | 1
  3 | Chen  | Eng   |  95000 | 2023-01-10 | 1
  7 | Gia   | Eng   |  90000 | 2025-08-18 | 1
  4 | Dev   | Sales |  70000 | 2020-11-20 | NULL
  5 | Ella  | Sales |  82000 | 2022-02-14 | 4
  6 | Farah | HR    |  65000 | 2024-05-06 | NULL

customers                         orders
 customer_id | name | city         order_id | customer_id | amount | order_date
-------------+------+---------    ----------+-------------+--------+-----------
           1 | Riya | NYC               101 |           1 |    250 | 2026-09-03
           2 | Sam  | Boston            102 |           1 |    100 | 2026-10-12
           3 | Tara | NYC               103 |           2 |    400 | 2026-10-15
           4 | Uma  | Chicago           104 |           3 |     80 | 2026-10-28
                                        105 |           1 |    300 | 2026-11-02
```

### Filtering and sorting

```sql
SELECT name, salary
FROM employees
WHERE dept = 'Eng' AND salary > 90000
ORDER BY salary DESC, name   -- the second key breaks the Ben / Chen tie
LIMIT 2;

-- name | salary
-- Asha | 120000
-- Ben  |  95000
```

- Without a tie-breaker, rows with equal sort keys can come back in any order, so `LIMIT` results can change between runs
- Handy filters: `IN ('Eng', 'HR')`, `BETWEEN 70000 AND 90000` (inclusive), `LIKE 'A%'` (starts with A), `ILIKE` for case-insensitive matching in Postgres

### Aggregation: GROUP BY and HAVING

```sql
SELECT dept, COUNT(*) AS headcount, ROUND(AVG(salary), 2) AS avg_salary
FROM employees
GROUP BY dept
HAVING COUNT(*) > 1;

-- dept  | headcount | avg_salary
-- Eng   |         4 |  100000.00
-- Sales |         2 |   76000.00      (HR has 1 person, so HAVING drops it)
```

- **Logical order of execution:** FROM / JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT (which is why a SELECT alias can't be used in WHERE)
- **WHERE vs HAVING:** WHERE filters rows before grouping, HAVING filters groups after aggregation
- Every column in SELECT must either be in GROUP BY or wrapped in an aggregate (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`)
- **Conditional aggregation** (one pass, many counts) with `CASE` inside an aggregate:

```sql
SELECT dept,
       SUM(CASE WHEN salary >= 90000 THEN 1 ELSE 0 END) AS earning_90k_plus,
       SUM(CASE WHEN hire_date >= '2023-01-01' THEN 1 ELSE 0 END) AS hired_since_2023
FROM employees
GROUP BY dept;

-- dept  | earning_90k_plus | hired_since_2023
-- Eng   |                4 |                2
-- Sales |                0 |                0
-- HR    |                0 |                1
```

### Joins

- **Joins:** INNER (matches only), LEFT / RIGHT (keep all rows of one side, NULLs for no match), FULL OUTER, CROSS (cartesian product), SELF join

```sql
-- every customer with their order count and total spend (Uma has no orders)
SELECT c.name, COUNT(o.order_id) AS orders, COALESCE(SUM(o.amount), 0) AS total
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
GROUP BY c.name
ORDER BY total DESC;

-- name | orders | total
-- Riya |      3 |   650
-- Sam  |      1 |   400
-- Tara |      1 |    80
-- Uma  |      0 |     0
```

- `COUNT(o.order_id)` gives Uma 0 because her joined order columns are NULL; `COUNT(*)` would wrongly give 1
- A filter on the right table of a LEFT JOIN belongs in the ON clause; putting it in WHERE silently turns it into an inner join

```sql
-- only count orders above 100
... LEFT JOIN orders o ON o.customer_id = c.customer_id AND o.amount > 100
-- Riya 2 / 550, Sam 1 / 400, Tara 0 / 0, Uma 0 / 0      (all 4 customers kept)

... LEFT JOIN orders o ON o.customer_id = c.customer_id
    WHERE o.amount > 100
-- Riya 2 / 550, Sam 1 / 400                              (Tara and Uma vanish)
```

- **Self join:** join a table to itself, e.g. each employee with their manager's name

```sql
SELECT e.name, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
-- Ben, Chen, Gia → Asha;  Ella → Dev;  Asha, Dev, Farah → NULL
```

- **Anti-join** (rows with no match): customers who never ordered

```sql
SELECT c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
WHERE o.order_id IS NULL;          -- or: WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id)
-- Uma
```

### Subqueries and CTEs

- **CTEs (WITH):** name intermediate results for readability; recursive CTEs walk hierarchies

```sql
-- employees who earn more than their department's average
WITH dept_avg AS (
  SELECT dept, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY dept
)
SELECT e.name, e.dept, e.salary
FROM employees e
JOIN dept_avg d ON d.dept = e.dept
WHERE e.salary > d.avg_salary;

-- name | dept  | salary
-- Asha | Eng   | 120000       (Eng average is 100000)
-- Ella | Sales |  82000       (Sales average is 76000)
```

- The same query without a CTE uses a correlated subquery: `WHERE e.salary > (SELECT AVG(salary) FROM employees x WHERE x.dept = e.dept)`, which is re-evaluated per row
- **CASE WHEN** is SQL's if / else:

```sql
SELECT name,
       CASE WHEN salary >= 100000 THEN 'senior'
            WHEN salary >=  80000 THEN 'mid'
            ELSE 'junior' END AS band
FROM employees;
-- Asha senior;  Ben, Chen, Gia, Ella mid;  Dev, Farah junior
```

### Window functions and PARTITION BY

- **Window functions:** compute over a set of rows without collapsing them (unlike GROUP BY)
- `PARTITION BY` splits rows into groups (like GROUP BY), but every row stays in the output and can see its group. `ORDER BY` inside `OVER (...)` sets the order within each partition. Leave out `PARTITION BY` and the whole table is one partition
  - `ROW_NUMBER()` (unique), `RANK()` (ties share a rank, then gaps), `DENSE_RANK()` (ties share a rank, no gaps)

```sql
SELECT name, dept, salary,
       ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS row_num,
       RANK()       OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk,
       DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dense_rnk,
       AVG(salary)  OVER (PARTITION BY dept)                      AS dept_avg
FROM employees;

-- name  | dept  | salary | row_num | rnk | dense_rnk | dept_avg
-- Asha  | Eng   | 120000 |       1 |   1 |         1 |   100000
-- Ben   | Eng   |  95000 |       2 |   2 |         2 |   100000
-- Chen  | Eng   |  95000 |       3 |   2 |         2 |   100000
-- Gia   | Eng   |  90000 |       4 |   4 |         3 |   100000   ← RANK skips 3, DENSE_RANK doesn't
-- Ella  | Sales |  82000 |       1 |   1 |         1 |    76000
-- Dev   | Sales |  70000 |       2 |   2 |         2 |    76000
-- Farah | HR    |  65000 |       1 |   1 |         1 |    65000
```

::viz sql-window

- **Top N per group:** window functions can't go in WHERE (they're computed after it), so rank in a CTE, then filter

```sql
WITH ranked AS (
  SELECT name, dept, salary,
         DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS r
  FROM employees
)
SELECT name, dept, salary FROM ranked WHERE r <= 2;
-- Eng: Asha, Ben, Chen (Ben and Chen tie for 2nd);  Sales: Ella, Dev;  HR: Farah
```

- Nth highest salary: `DENSE_RANK() OVER (ORDER BY salary DESC)` in a CTE, then filter on the rank
- `LAG()` / `LEAD()` for previous / next row, `SUM(x) OVER (PARTITION BY g ORDER BY t)` for running totals

```sql
SELECT customer_id, order_id, order_date, amount,
       SUM(amount)     OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total,
       order_date - LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS days_since_prev
FROM orders;

-- customer_id | order_id | order_date | amount | running_total | days_since_prev
--           1 |      101 | 2026-09-03 |    250 |           250 | NULL
--           1 |      102 | 2026-10-12 |    100 |           350 | 39
--           1 |      105 | 2026-11-02 |    300 |           650 | 21
--           2 |      103 | 2026-10-15 |    400 |           400 | NULL
--           3 |      104 | 2026-10-28 |     80 |            80 | NULL
```

- **Frames:** with an `ORDER BY`, the default frame is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, so rows tied on the order key get the same running total. Use `ROWS` for an exact window, e.g. a 3-order moving average: `AVG(amount) OVER (ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)`
- **Month over month growth** (combines dates, a CTE and LAG):

```sql
WITH monthly AS (
  SELECT DATE_TRUNC('month', order_date)::date AS month, SUM(amount) AS revenue
  FROM orders
  GROUP BY 1
)
SELECT month, revenue,
       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
             / NULLIF(LAG(revenue) OVER (ORDER BY month), 0), 1) AS pct_change
FROM monthly
ORDER BY month;

-- month      | revenue | pct_change
-- 2026-09-01 |     250 | NULL
-- 2026-10-01 |     580 | 132.0
-- 2026-11-01 |     300 | -48.3
```

- `100.0 *` forces decimal division (integer / integer truncates in Postgres and SQL Server), and `NULLIF(x, 0)` turns a zero denominator into NULL instead of an error

### Dates and times

- `NOW()` / `CURRENT_TIMESTAMP` give the current date and time (in Postgres, the start of the current transaction); `CURRENT_DATE` gives just today's date
- Date arithmetic uses intervals: `CURRENT_DATE - INTERVAL '30 days'`, `hire_date + INTERVAL '1 year'`; subtracting two dates gives a number of days

```sql
-- orders in the last 30 days (say today is 2026-11-06, so the cutoff is 2026-10-07)
SELECT order_id, order_date
FROM orders
WHERE order_date >= CURRENT_DATE - INTERVAL '30 days';
-- 102, 103, 104, 105

-- tenure in whole years
SELECT name, EXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date)) AS years
FROM employees;
-- on 2026-11-06: Asha 5, Dev 5, Ben 4, Ella 4, Chen 3, Farah 2, Gia 1
```

- `DATE_TRUNC('month', ts)` rounds down to the start of the month (for grouping by month / week / day), `EXTRACT(DOW FROM ts)` pulls out a part (DOW, MONTH, YEAR, HOUR), `TO_CHAR(ts, 'YYYY-MM')` formats it as text
- Other databases use different names:
  - MySQL: `NOW()`, `CURDATE()`, `DATE_SUB(CURDATE(), INTERVAL 30 DAY)`, `DATEDIFF(a, b)` (days), `DATE_FORMAT(ts, '%Y-%m')`
  - SQL Server: `GETDATE()`, `DATEADD(day, -30, GETDATE())`, `DATEDIFF(day, a, b)`
- Filter on the raw column (`order_date >= '2026-10-01' AND order_date < '2026-11-01'`) rather than wrapping it in a function (`EXTRACT(MONTH FROM order_date) = 10`), so an index on the column can still be used

### NULLs

- **NULLs:** `COUNT(*)` counts rows, `COUNT(col)` skips NULLs; compare with `IS NULL`, never `= NULL`
- `COALESCE(a, b, ...)` returns the first non-NULL value (e.g. `COALESCE(manager_name, 'none')`), `NULLIF(a, b)` returns NULL when a = b
- Aggregates like `AVG` and `SUM` ignore NULLs, and any arithmetic with NULL gives NULL (`5 + NULL` is NULL)
- `NOT IN (subquery)` returns nothing if the subquery contains a NULL; prefer `NOT EXISTS`

### Common interview patterns

- **Find duplicates, then delete all but one:**

```sql
SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;

DELETE FROM users
WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) AS rn
    FROM users
  ) t
  WHERE rn > 1
);
```

- **Consecutive days (gaps and islands):** for a user's distinct login dates, `login_date - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date)` is constant within a streak, so group by it to get each streak's length

```sql
WITH d AS (
  SELECT DISTINCT user_id, login_date FROM logins
), g AS (
  SELECT user_id, login_date,
         login_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date))::int AS grp
  FROM d
)
SELECT user_id, MIN(login_date) AS start_date, COUNT(*) AS streak_days
FROM g
GROUP BY user_id, grp
HAVING COUNT(*) >= 3;    -- users with a 3+ day streak
```

- **Share of total:** `amount * 100.0 / SUM(amount) OVER ()` gives each row's percentage of the grand total (an empty `OVER ()` means the whole table)
- **Second order per customer / first purchase:** `ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date)` then keep `rn = 1` or `rn = 2`

### Performance

- **UNION vs UNION ALL:** UNION removes duplicates (extra sort/hash), UNION ALL keeps them and is faster
- **Indexes:** speed up reads/filters/joins on the indexed columns, but slow down writes and take space
- `EXPLAIN ANALYZE` shows the query plan (index scan vs sequential scan) and where the time goes
- Select only the columns you need instead of `SELECT *`, and filter early so joins work on fewer rows

## R

- [R Programming Tutorial - Learn the Basics of Statistical Computing](https://www.youtube.com/watch?v=_V8eKsto3Ug)
- Packages: https://cran.r-project.org/

## Python

- Basics (data types, string formatting, functions, statements, OOP): https://github.com/Chaitya0623/Python_Notes/blob/main/pythonNotes.ipynb
- **Built-in Functions:** https://docs.python.org/3/library/functions.html
- **Virtual Environment:** `python -m venv <venv>`, `venv\scripts\activate` (`$ source <venv>/bin/activate`) for mac
  - `pip cache purge` (delete cache)
- Use `list.sort()` to sort the list, `sorted(list)` to store it in another var
- **Pandas Functions:** https://www.geeksforgeeks.org/pandas-functions-in-python/
  - **sample(n):** to get samples from data
  - **nlargest():** get n largest values from data
  - **pivot():** create a long format df into a wider df
  - **melt():** wider to longer format
- Dynamically collect and store data from multiple excel sheets inside the same folder https://github.com/Chaitya0623/IITp_PSD/blob/main/data.ipynb
- **Shallow copy vs Deep copy:** shallow copy: `copy.copy(x)`, `=` operator only creates a new variable that shares the reference of the original object. Copy "clones" these objects. Deep copy (`copy.deepcopy(x)`): creates a new compound object before inserting copies of original into it in a recursive manner. Modification to an element in Li2 does not affect Li1 (independent). In shallow copy, modifications to nested elements in Li2 will be reflected in the original object

::viz copy-semantics

- **uv** is similar to pip, but just 10x faster. It loads packages in parallel, and not one after the other. Better for dependency resolution too
  - https://www.datacamp.com/tutorial/python-uv

## Frontend

- JavaScript **Promises** make handling asynchronous operations like API calls, file loading, or time delays easier. Think of a Promise as a placeholder for a value that will be available in the future

```
Promise.all([
  Promise.resolve("Task 1 completed"),
  Promise.resolve("Task 2 completed"),
  Promise.reject("Task 3 failed")
])
.then((results) => console.log(results))
.catch((error) => console.error(error));
```

::viz promise-all

- The **async** function allows us to write promise-based code as if it were synchronous. This ensures that the execution thread is not blocked
- The **await** keyword is used to wait for a promise to resolve. It can only be used within an async block. Await makes the code wait until the promise returns a result
- React efficient because of rendering techniques and usable components
- The **DOM** treats a document as a tree structure, where each node is an object that represents a part of the document. You can use DOM methods to access the tree and make changes to the document
- React operates by creating an in-memory **virtual DOM** rather than directly manipulating the browser's DOM. It performs necessary manipulations within this virtual representation before applying changes to the actual browser DOM. React is efficient, altering only what requires modification

## Backend (Django)

- https://www.geeksforgeeks.org/django-tutorial/
- It is called a batteries included web framework because it provides built in features for everything, including django admin interface, default database - SQLite3, etc
- **Views:** handling user requests and rendering responses (function based and class based)
- **URL's:** serve as a crucial mechanism for directing incoming requests to the appropriate views within your web application. With the flexibility of regular expressions, Django's URL dispatcher allows you to define patterns that match specific URL patterns and route them to corresponding views
- **Templates:** basically written in HTML, CSS, and Javascript in a .html file. Django framework efficiently handles and generates dynamic HTML web pages that are visible to the end-user. Django mainly functions with a backend so, in order to provide a frontend and provide a layout to our website, we use templates
- **Models:** is the built-in feature that Django uses to create tables, their fields, and various constraints. In short, Django Models is the SQL Database one uses with Django. SQL (Structured Query Language) is complex and involves a lot of different queries for creating, deleting, updating, or any other stuff related to a database
- **Forms:** defining and managing the fields & data types in the form
- **Django REST Framework:** for building web api's (Representational State Transfer API)

## Robot Operating Systems

- https://wiki.ros.org/Documentation
- **Arduino:** https://www.arduino.cc/en/Guide microcontroller to which the electronic components are connected, need to put in ros publishers/subscribers in arduino code
- **Raspberry Pi:** single board computer (more powerful)
- **Jetson XavierNX:** supercomputer for complex tasks
- **Depth Sensing Cameras:** Intel Realsense D435i, Zed2 - stereo cam
- **LiDar:** remote sensing technology that uses laser pulses to measure distances and create 3D models
- **YOLO:** (you only look once) detect objects in real time
- **RoboFlow:** you can label objects and create CV models
- **MoveIt:** handles motion planning and kinematics for the robotic arm
- **MoveBase:** used to move a robot to a certain position using the navigation stack (uses local and global planners)
- **OMPL:** open motion planning library, sampling-based motion planning algorithms (collision detection and visualisation are provided around it by MoveIt)
- **Dronekit:** https://dronekit.netlify.app/ https://qgroundcontrol.com/
- **Major Components**
  - **Mapping:** creating a map of the surrounding terrain (Rtab map)
  - **Localization:** estimating the robot's current position on the map
  - **Odometry:** estimate the change in position over time (using a depth sensing camera or the rotation of the wheels)
  - **Path Planning:** finding the shortest distance between the robot's current position and the final position (dijkstra, dynamic window)
- Configure SSH with github on Ubuntu: [How to configure and use SSH with GitHub on Ubuntu?](https://www.youtube.com/watch?v=w22huz8lFsA)
