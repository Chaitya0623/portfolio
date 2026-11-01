## Processes and Threads

- **Concurrency:** switching between tasks (dealing with multiple tasks at once by interleaving them)
- **Parallelism:** executing multiple tasks at the same instant (on multiple cores)
- **Process:** a program in execution
  - **Process Control Block (PCB):** register, info
- **Threads:** Lightweight process (basic unit of CPU utilization)
  - **User Level:** faster to create and switch, but the kernel doesn't know about them, so one blocking I/O call blocks the whole process and they can't run in parallel on multiple cores
  - **Kernel Level:** true parallelism on multi-core processors
- **Multithreading:** multiple threads within a process

## Scheduling

- **Pre-emptive:** OS can stop a running process
- **Non-preemptive:** process runs until completion or wait
- **Algorithms:**
  - **FCFS (first come first serve):** non pre-emptive, simple, long waiting times possible
  - **Shortest Job First:** optimal (minimum average waiting time), requires knowing burst time
  - **Shortest Remaining Time Next**
  - **Priority Scheduling:** can cause starvation
  - **Round Robin:** cycle giving each process a fixed-duration time slice

::viz cpu-scheduling

## Concurrency and Deadlocks

- **Concurrency:** multiple processes executing simultaneously, synchronization to avoid race condition
- **How to avoid (control access to shared resources):**
  - **Semaphore:** integer variable used for signaling (wait & signal operations)
  - **Mutex:** lock with ownership, similar to a binary semaphore (locked/unlocked)
- **Deadlock:** conditions -> mutual exclusion, hold and wait, no preemption, circular wait
  - Resource Allocation Graph to detect deadlocks

## Memory Management

- **Memory Management:** needed for relocation, protection, sharing, logical vs physical organization
- **Allocation Strategies:**
  - **First fit** (allocate first suitable block)
  - **Best fit** (smallest fitting block)
  - **Worst fit** (largest fitting block)
  - **Next fit** (continue from next position)
- **Paging:** memory divided into frames, eliminates external fragmentation
- **Segmentation:** Memory divided based on logical units (functions, arrays), variable size segments
- **Page Replacement Algorithms:**
  - **FIFO** (first in first out)
  - **Optimal** (replace page not needed for longest time)
  - **LRU** (least recently used)
  - **LFU** (least frequently used)

::viz page-replacement

## I/O Management

- **Disk Scheduling Algorithms**
  - **FCFS**
  - **Shortest Seek Time First (SSTF):** serve the requests closest to the current head position
  - **SCAN (Elevator Algorithm):** moves from one end to another, serving requests along the way
  - **C-SCAN (Circular Scan):** like SCAN, but serves requests in one direction only: it goes all the way to the end, then jumps back to the beginning without serving anything on the return
  - **C-LOOK Algorithm:** Similar to C-SCAN, but head only goes as far as the last request, then jumps back to the first request at the other end

::viz disk-scheduling
