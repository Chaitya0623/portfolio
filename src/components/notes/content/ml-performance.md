## What Affects Performance

- **Factors:** algorithm (quantization, pruning), hyperparameters, implementation (vectorization, parallelization), framework (pytorch, tensorflow), library, hardware
- Rather than running a for loop on y = axᵢ + b, create a vector and do it once (computationally faster)
- When we update the gradients, synchronization is needed
- **Communication Protocols:** NCCL (nvidia multi-GPU/multi-node collective communications, limited to GPU's), MPI (language independent, used for parallelizing tasks), and Gloo (works with CPU's too)
- `a = 5b, c = 5a` stores more memory than `a = 5b, a = 5a`. Not calling a new variable saves memory when iterated highly
- Repeatedly calling `.to(device)` significantly slows down model training because it tries to change devices in every iteration
- **How to optimize:** measure (track data), analyze (understanding the stack, bottlenecks), optimize (change configuration, parameters)

## Profiling and Benchmarking

- **GPU Profilers:** monitor the computation
  - https://www.tensorflow.org/guide/profiler
  - https://developer.nvidia.com/nvidia-visual-profiler
  - https://docs.pytorch.org/tutorials/recipes/recipes/profiler_recipe.html
- GPU profilers also create an overhead, so you use them only during the development phase and not in prod, there are some hardware counters that can be used for broader overview. Metrics: throughput, latency, floating point operations (FLOPS) - tokens per second, energy (flops/watt), time to first token, speedup
- **Model Benchmarking:** compare and evaluate different models such that the best model is chosen for a specific task
  - **Micro-kernels** (specific feature)
  - **Micro-benchmark** (small part of a programming assignment)
  - **Kernels:** specific algorithm
  - **Synthetic benchmarks:** reproduce the workload of a class
  - **Real applications:** MLPerf https://www.nvidia.com/en-us/data-center/resources/mlperf-benchmarks/
  - **Real workflows:** CANDLE https://github.com/huggingface/candle
- How to identify bottlenecks? Peak FLOPS (maximum performance capabilities of CPU and GPU devices):
  $ Peak FLOPS = total_cores × cycles/second (clock) × FLOPs/cycle per core
- Arithmetic intensity (FLOPs per byte moved) inversely proportional to pressure on memory

::viz roofline

## Gradient Descent Optimization Algorithms and PyTorch

- **Training:** Adjust the parameters to minimize the loss function, and should not be overly optimistic (overfitting). Parameters:
  - Gradient Descent (contour is a topological plot, where each circle has the same loss)
- **Inference:** validation of performance
  - Inference memory (in bytes, FP16) = (W × 2) + KV, where W = number of parameters, KV = key value cache

::viz inference-memory

- **Hyperparameters in DL:**
  - Network archi (no. of hidden layers, hidden inputs per layer)
  - Activation functions
  - Weight initializer
  - Optimizer
  - Learning Rate (learning rate schedule), adaptive learning rate
  - Batch size
- **Momentum:** SGD with momentum works better than normal SGD, you make the updates using the moving average. The more the value of the momentum, the larger the history you keep into account (usually 0.9). It increases the speed at which the gradient converges to the local minima.
  $ mₜ = βmₜ₋₁ + (1 − β) ∂L_Bt/∂θ (θₜ₋₁)
- If the speed is more, it can oscillate and never be at the local minima. We thus use **Nesterov Momentum**, where we can project (peek ahead) the place we want the gradient to land (accelerate or decelerate)
  $ mₜ = βmₜ₋₁ + (1 − β) ∂L_Bt/∂θ (θₜ₋₁ − νmₜ₋₁),   θₜ = θₜ₋₁ − νmₜ
  - ν = learning rate here, θₜ = model parameters
- **Gradient clipping:** clip it periodically to avoid exploding
- How to freeze a layer (set `requires_grad = False` on its parameters)
- **Checkpoint interval:** mainly for fault tolerance (due to hardware restrictions, not rollback to LR and stuff)
- **PyTorch Optimizers:**
  - **Exponential moving average:** to make the graph smoother wrt noisy gradients
  - **Adagrad:** used for sparse data, so that it does not stay 0, problem is that the accumulated squared gradients keep growing, so the learning rate keeps shrinking (vanishes) and learning can stall
  - **RMSprop:** root mean square propagation (moving averages)
  - **Adam:** momentum (first moment) + RMSprop (second moment), with bias correction
  - **Adadelta:** accumulation like adagrad and acceleration like momentum

::viz optimizers

## PyTorch Multiprocessing

- **Python GIL:** prevents multiple threads from executing bytecode in parallel, which is the reason why python is not good for multithreading, especially for CPU related tasks
- Differences in python's multiprocessing module:
  - **Fork:** child needs parent's memory but modifies little. It doesn't physically copy the memory upfront. Only if a change is needed, a copy is created (Copy-on-write)
  - **Spawn:** child needs an independent process, thus making it slower
  - **Forkserver:** more controlled, but still not ideal for CUDA, separate server process forks child
- For multiprocessing, always use pytorch (`torch.multiprocessing`) and not python
- The main reason why people don't use python in prod is dynamic typing (not specifying data types). While it dynamically judges based on behaviour, it might break during deployment
- `torch.utils.data.DataLoader` uses multiprocessing where with num_workers, you can specify number of processes for loading the data
  - **Batch_size:** small are too noisy, not enough gpu's for large. If you keep values too large, you might get an out of memory error
  - **Block_size:** context windows, maximum_sequence_length
  - **sampler:** SequentialSampler, RandomSampler, SubsetRandomSampler, WeightedRandomSampler, CustomSampler
  - **pin_memory:** copy into CUDA pinned memory before returning the data, allows faster data transfers via direct memory access (DMA)
  - **shuffle:** shuffle data after each epoch
- **Architecture:**
  - **WorkerManager:** dispatch batches to workers
  - **Workers:** load samples in each batch
  - **Synchronization**
- `torch.distributed.launch` (now `torchrun`): manages multi-GPU and multi-node training
- **pkl/pickle:** library to save/load models. It serializes the objects to store
- Prefetching

## Schedulers for PyTorch

- As the model starts to learn, decrease the learning rate
- **ExponentialLR:** Every epoch, lower the learning rate by γ
- **ReduceLROnPlateau:** If the validation metric (e.g. val loss) has not improved for `patience` epochs (e.g. 3), lower the learning rate by a factor

::viz lr-schedulers

## Compilers, CPython and JIT

- **Intermediate Representations:** used by compilers to perform operations before generating target machine code.
- **Peephole Optimizations:** a consecutive set of instructions, examined by patterns replaced by a more optimized instruction sequence
  - Eg: `x=x*2` replaced by `x<<1`
- If you want to see the bytecode instructions your function compiles to, you can define the function in the terminal, `import dis`, `dis.dis(myFunc)`
- **CPython:** the reference implementation of Python, written in C; it lets python call C/C++ compiled functions
- Numpy, Pandas and all those libraries are C based, thus just using them is much faster to execute than writing loops in python
- The reason why we still run most machine learning/computation codes in python and not C/C++ is because time is not the only consideration, lines of code, efforts and all are also considered. Also, when you download python, it ideally uses C only, so when you use python, you are mainly using CPython as a baseline approach
- **JIT compilers** aim to shorten the path from Python code to machine code at runtime, improving speed
  - For the first few iterations, you move slowly (interpreting patterns), it then teaches shortcuts (optimizations), then play much faster (native execution)
- **Numba:** generates optimized code using the LLVM (low level virtual machine) compiler, shines in numerical/scientific computing
- `__pycache__` = keeping a recipe already written down so you don't have to rewrite it every time (.pyc sets instructions for a virtual cpu, machine code sets it for a real cpu)
- When doing calculations while training a deep learning model, we use pytorch because it can handle both the kernels, and faster computation. Since PyTorch 2, `torch.compile(model)` JIT-compiles the model in one line, no separate JIT tool needed

## PyTorch Performance (Computational Graph)

- Graph Lowering
- **Compiler Stack:** TorchDynamo -> AOT Autograd -> TorchInductor
- Efficient DNN Design with Neural Architecture Search
