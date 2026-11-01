## SQL

- https://www.geeksforgeeks.org/sql-tutorial/
- Playlist: [Learn Basic SQL in 15 Minutes | Business Intelligence For Beginners | SQL Tutorial For Beginners 1/3](https://www.youtube.com/watch?v=kbKty5ZVKMY)
- Practice before Leetcode: https://www.sql-practice.com/

- **Logical order of execution:** FROM / JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT (which is why a SELECT alias can't be used in WHERE)
- **WHERE vs HAVING:** WHERE filters rows before grouping, HAVING filters groups after aggregation
- **Joins:** INNER (matches only), LEFT / RIGHT (keep all rows of one side, NULLs for no match), FULL OUTER, CROSS (cartesian product), SELF join
  - A filter on the right table of a LEFT JOIN belongs in the ON clause; putting it in WHERE silently turns it into an inner join
- **Window functions:** compute over a set of rows without collapsing them (unlike GROUP BY)
  - `ROW_NUMBER()` (unique), `RANK()` (ties share a rank, then gaps), `DENSE_RANK()` (ties share a rank, no gaps)
  - `LAG()` / `LEAD()` for previous / next row, `SUM(x) OVER (PARTITION BY g ORDER BY t)` for running totals
  - Nth highest salary: `DENSE_RANK() OVER (ORDER BY salary DESC)` in a CTE, then filter on the rank
- **NULLs:** `COUNT(*)` counts rows, `COUNT(col)` skips NULLs; compare with `IS NULL`, never `= NULL`
- **UNION vs UNION ALL:** UNION removes duplicates (extra sort/hash), UNION ALL keeps them and is faster
- **CTEs (WITH):** name intermediate results for readability; recursive CTEs walk hierarchies
- **Indexes:** speed up reads/filters/joins on the indexed columns, but slow down writes and take space

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
