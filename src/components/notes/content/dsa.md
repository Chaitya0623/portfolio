## Basics

- **Primitive:** directly supported by programming languages
- **Non-Primitive:** built using primitives
  - **Linear:** array, stack, queue, linked list
  - **Non-Linear:** trees, graph
- https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2 after this, practice on leetcode
- https://manralai.medium.com/data-structures-algorithms-cheat-sheet-in-python-e87d0e29bd1a
- https://www.linkedin.com/posts/rohitdoshi9_coding-dsa-tech-activity-7331884901228576768-8VkZ
- **Call by value** - a copy gets passed (no change outside), **call by reference** - address gets passed, array always passes with reference (change persists)
- **Time Complexity** - not the amount of time taken (because this can differ with device), rate at which time increases with input size

::viz big-o
- **Common patterns:** two pointers, sliding window, prefix sums, binary search on the answer, monotonic stack, heap for top-k, union-find for connectivity, topological sort (Kahn's algorithm) for dependencies, backtracking, dynamic programming
- **How to approach a problem:** clarify inputs and edge cases → state a brute force and its complexity → optimise → code → dry-run on a small example → state final time and space complexity

## Searching

- **Linear Search:** check each element one by one. O(n)
- **Sentinel Search:** place key at the end as sentinel to reduce comparisons. No boundary checks, if it failed for all other comparisons, it has to be there at the last index
- **Binary Search:** left = 0, right = len(list)-1, get mid, and then while loop for left <= right and compare mid with target. (We use binary search when we want to get to a root element without comparing all the items in the list, mainly sorted array related) O(log n)

::viz binary-search

- **Fibonacci Search:** find the smallest fib number >= len(arr), get fib(m-1) and fib(m-2), if element matches, return, else move the 3 variables up or down based on conditions

## Sorting

- **Selection sort:** select the min of the array, then iterate
- **Bubble sort:** keep swapping adjacent nodes. After each iteration, the max number will be stored in the last index of that iteration
- **Insertion sort** - keep on adding one element in the correct order. Keep swapping till it can't be swapped (used in partially sorted lists)
- **Merge sort** - divide and conquer approach (high, mid, low). You recursively sort both the partitions and then keep merging (only 2 functions to be written, merge and mergesort). You use sorting when you need to compare elements in the array (used for large datasets)
- **Quick sort** - take pivot element (random), shift all smaller elements to left, greater elements to right, apply quicksort on each of these arrays. You keep on creating partitions and iterate through the unsorted arrays using i and j

::viz sorting

- **Kadane's algorithm** - to find the maximum sum of a continuous subarray, rather than checking the sum of every possible subarray (O(n²)), iteratively compare max of 2 items (extend the current subarray or start fresh at this element) will give better time complexity -> O(n)

```
a = [1, 2]
b = a        # b points to the same list object as a
b[0] = 99
print(a)     # Output: [99, 2]
```

- If you want to create a copy,
  - `copy = a[:]`
  - `copy = list(a)`
- If you want to iterate on a 2d array, try to flatten it into a 1d array using number of rows and columns, `val = matrix[mid//n][mid%n]`, else pick a corner and apply the logic to reach to a target

## Linked Lists, Recursion and Bits

- **Linked list:** nodes sequentially connected to each other (better than arrays due to keep on changing, and variable sizes). Initialize head, tail, pointer for traversal (while tail is not null). Try using slow and fast pointer if you need to split the linked list
  - **Singly Linked List:** 2 components: val and next (try using fast and slow pointer)
  - **Doubly Linked List:** forward and backward both, one more component - previous (back)
  - **Circular Linked List:** tail.next = head
  - **Doubly Circular Linked List:** Combination of both
  - Polynomial manipulations can be done using linked lists
- **Recursion** - calling the same function again and again. Don't try to understand each and every iteration, use the Recursive Leap of Faith (try to observe patterns)
- **Bit Manipulation:** convert integers into 1's and 0's (keep on dividing by 2 till you get 1/0 as remainder, for reverse, multiply each digit from behind by `2**n`). 1's complement - reverse the bits. 2's complement - reverse the bits and add 1.
  - Bitwise Operators (AND, OR, NOT, XOR, NAND, NOR, Shift (is another version for division or multiplication by `2**n`)).
  - In a 32-bit signed integer, the 1st bit is the sign, followed by the integer values (therefore, max value = `2**31-1`).
  - You can swap two numbers without using a 3rd variable using XOR
  - If you have subsequences related questions, you can use bit manipulation and check for the i'th bit logic. So something similar to creating the table for `2**n` bit operations and then using those only. `1<<n = 2**n`

## Stacks and Queues

- **Stack (LIFO):** push(n), pop(), top(), size(). Python does not have an inbuilt stack function (which other languages do). We use lists itself
  - Applications: infix to postfix, prefix/postfix, parentheses checking, function call stack
- **Queue (FIFO):** use deque() for queue, append(), pop() normal, popleft()
  - **Linear Queue:** using array
  - **Circular Queue:** reuse memory efficiently
  - **Doubly Ended Queue:** insertion/deletion from both ends
  - **Priority Queue:** elements dequeued based on priority
  - **Multi-Queue:** multiple queues managed together
- Sliding Window and 2 pointer

## Trees

- **Trees:** to traverse through nodes with reduced time complexity
  - Preorder, inorder, postorder traversal
- **Binary Search Trees (BST):** Left < Root < Right. Insertion, deletion, searching
  - **Inorder:** left root right
  - **Preorder:** root left right
  - **Postorder:** left right root

::viz tree-traversal

- **AVL Trees:** heights of left and right subtree differ by at most one (RR, LL, LR, RL rotations)
- **Red Black Trees:** Self balancing search trees, Balance is maintained using coloring rules and rotations. Guarantees O(log n) search, insertion, deletion.
- **Randomized BST:** On insertion, node position is randomized to avoid worst-case skew
- **Tango Tree:** Type of binary tree, Breaks the tree into smaller preferred paths (auxiliary trees)
- **Binomial Heap:** uses binomial trees -> a tree of order k has a root with k children, which are themselves roots of binomial trees of order k-1, k-2, …, 0
- **KD Tree:** insertion and deletion in k dimensions
- **R Tree:** using rectangles (boundary boxes), used in geographic information systems
- **R* Tree:** R tree with better heuristics

## Graphs

- **Breadth First Search (BFS):** level wise - use queues (popleft)
- **Depth First Search (DFS):** traversing through the depth, coming back and next - use stacks

::viz graph-traversal

- Nodes, edges, cyclic, acyclic, directed, undirected, indegree (incoming edges), outdegree (outgoing edges), edge weights, adjacency list, adjacency matrix
- Heap/Priority Queue
- **Hashing:** pre storing and fetching, to reduce the time. Use map to create a key value type to store. For mapping, we also have a division method where we store the mod (%) of each number. And then in order to get how many times a number was there (if there are multiple of the same number, we perform binary search on that limited sorted array)

## Asymptotic Notations

- **Big-O (O)** → Upper Bound (usually quoted for the Worst Case)
- **Big-Omega (Ω)** → Lower Bound (often quoted for the Best Case)
- **Theta (Θ)** → Tight Bound (upper and lower bounds match / Exact Growth; not the same thing as the average case)
- **Small-o (o)** → Strictly Less
- **Complexity cheat sheet**
  - Array: access O(1), search O(n), insert/delete in the middle O(n)
  - Hash map / set: insert, lookup, delete O(1) average, O(n) worst case (collisions)
  - Balanced BST: search, insert, delete O(log n)
  - Heap: push / pop O(log n), peek O(1), build from an array O(n)
  - Comparison-based sorting can't beat O(n log n); merge sort is stable with O(n) extra space, quick sort is in-place with O(n log n) average and O(n²) worst
  - BFS / DFS: O(V + E); Dijkstra with a binary heap: O((V + E) log V)

## Dynamic Programming

- **Dynamic Programming:** break a problem into overlapping subproblems, solve each subproblem once, store result in a table, avoids repetitive calc
  - Memoization -> tabulation -> optimization
- **0/1 Knapsack Problem:**
  - Problem: You have n items with weight[i] and profit[i]
  - Goal = maximize profit without exceeding capacity W
  - Decision: For each item → either take (1) or don't take (0)
- **Multistage Graph**
  - Graph divided into stages, find shortest path from source to destination
  - Start from destination and compute minimum cost backward
- **Single Source Shortest Path (Bellman-Ford)**
  - Works even if edges have negative weights (as long as there is no negative cycle)
  - Relax all edges repeatedly (V-1 times)
- **All-Pairs Shortest Path (Floyd–Warshall)**
  - Dynamic programming with intermediate vertices
- **Travelling Salesman Problem (TSP)**
  - Given cities, find min cost cycle visiting all once
  - DP with bit masking
- **Longest Common Subsequence (LCS)**
  - Find longest subsequence present in both strings

## Greedy Approach

- **Greedy Approach:** make the locally best choice at each step, works only when local optimum = global optimum
- **Fractional Knapsack**
  - Unlike 0/1, here you can take fractions of items
  - Sort items by profit/weight
  - Take items until full capacity
- **Dijkstra's Algorithm**
  - Repeatedly pick the shortest unvisited node (requires non-negative edge weights)
- **Minimum Spanning Tree (MST)**
  - **Prim's Algorithm:** Start from a node, expand cheapest edge
  - **Kruskal's Algorithm:** Sort edges, add them if no cycle
- **Job Sequencing with Deadlines**
  - Jobs have profit + deadline
  - Schedule max profit jobs before deadlines

## Backtracking

- **N-Queens**
  - Place queens column by column
  - If safe → recurse, else backtrack
- **Graph Coloring**
  - Assign colors to nodes → backtrack if adjacent same color
- **Subset Sum**
  - Either include or exclude each element

## String Matching Algorithms

- **Naive Algorithm**
  - Try matching pattern at every index
- **Rabin–Karp**
  - Use rolling hash. If hash matches, compare substring
- **Knuth-Morris-Pratt (KMP)**
  - Preprocess pattern into LPS (longest prefix-suffix) table
  - Avoids re-checking characters
- **NP-Complete** problems are the hardest problems in NP: they can be verified in polynomial time, and every NP problem can be reduced to them in polynomial time. If any NP-Complete problem has a polynomial-time solution, then P = NP.
- **Tries:** typically used when insert, search, startswith
  - 2 main components, a[26] and bool, bool set to true after word completed
