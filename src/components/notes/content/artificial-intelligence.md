## Agents and MCP

- **Types of agents:** https://www.ibm.com/think/topics/ai-agent-types (use the link for entire detailed agentic ai documentation)
- **Model Context Protocol (MCP):** Like the USB port of AI Apps (connect models to data and tools) - lets you do cool stuff like take a youtube video link and generate a summary. It is an open-source standard (protocol) introduced by Anthropic https://substack.com/@youssefhosni95/note/c-129316599
  - In MCP, you decide what the model knows, in Agentic AI, you decide what the model does
  - MCP basically has servers for Github, Slack, Google Drive, Databases, thus just use that structure to standardize stuff. (it's like using an already existing workflow)
  - You can run the agents and MCP servers on your local pc, thus ensuring data privacy. You can also pivot the computation to some other device using MCP, thus, it's much better for prod servers

## Searching Methods

- Define initial state, actions, goal test, path cost
- **Uninformed Search**
  - **Breadth-First Search (BFS):** Explores level by level
  - **Depth-First Search (DFS):** Explores as deep as possible first
  - **Depth-Limited / Iterative Deepening (DFID):** DFS with limit → avoids infinite paths. DFID combines DFS + BFS benefits.
- **Informed Search (Heuristic-Based)**
  - **Greedy Best-First Search** → Uses heuristic h(n) to pick "closest" node. Fast but not guaranteed optimal.
  - **A* Search** → Uses f(n) = g(n) + h(n) (g = path cost, h = heuristic). Optimal if heuristic is admissible.

::viz pathfinding

- **Local Search & Optimization**
  - **Hill Climbing** → moves towards better neighbors. Can get stuck in local maxima
  - **Simulated Annealing** → probabilistic jumps to escape local maxima
  - **Local Beam Search** → keeps k best states at each step.
  - **Genetic Algorithm** → population, selection, crossover, mutation.
  - **Ant Colony Optimization** → probabilistic path finding inspired by ants.

::viz local-search

- **Adversarial Search (Games)**
  - **Minimax Algorithm** → choose moves to maximize utility assuming opponent plays optimally.
  - **Alpha-Beta Pruning** → reduces nodes evaluated in minimax tree. Eg. Chess, tic tac toe

::viz alpha-beta

- **Fuzzy logic** is a reasoning method for dealing with imprecise and uncertain information, unlike classical logic's strict "true" or "false" system

## LLMs

- **How does a model unlearn?** (maybe violate copyright law or garbage text) We cannot afford to retrain the model, what can be done? (e.g. OpenAI is being sued by the NY Times for using its content to train ChatGPT)
  - Consider masked attention layers (masking the unwanted data) - main use of masking in decoders is that the model does not cheat by looking at future tokens
- **GPT (Generative Pretrained Transformer).** A neural network ML model using internet data to generate any type of text
  - **Model:** import pretrained model ('gpt-2')
  - **Optimizer:** AdamW (depends on use case)
  - **Scheduler:** adjust the learning rate
- **FLAN (Finetuned Language Net):** Google's instruction-tuning approach (and models like FLAN-T5): fine-tuning a language model on many tasks phrased as natural language instructions, so it follows new instructions better zero-shot
- **RAG (Retrieval Augmented Generation)** https://aws.amazon.com/what-is/retrieval-augmented-generation/ fetches the relevant data as per the user query from the existing data and adds it to the prompt at inference time (no retraining of the model) https://www.youtube.com/watch?v=tcqEUSNCn8I
  - **Reranking in RAG** - improves result (BERT cross-encoders, E5-Rerank, LLaMA-based rerankers or LLM-as-reranker)
  - **Chunking** is the process of breaking down large amounts of text or data into smaller, manageable pieces called "chunks"

::viz rag

- **How to reduce hallucinations:**
  - Chain of thoughts prompting
  - RAG
  - Prompt Engineering
  - Human in the loop
  - Negative prompting (penalise those results)
  - Adjust temperature

## Fine-Tuning Llama

- Llama is an open-weights LLM, trained on huge amounts of data, often used as a cost efficient version to tailor to a particular use case. Unlike closed source models, it provides full control over fine-tuning, while ensuring data privacy and ethical AI alignment. How to fine-tune?
- Given the limited computational resources available (e.g., 15 GB RAM on Google Colab), traditional full-model fine-tuning is not feasible. Instead, we employ **Parameter-Efficient Fine-Tuning (PEFT)** techniques that freeze most of the LLaMA model's weights and update only a small subset of trainable parameters. This drastically reduces both training time and memory usage without compromising model quality.
- We use **LoRA** (Low-Rank Adaptation of Large Language Models), which introduces low rank matrices into specific layers of the model to adapt it to downstream tasks with minimal overhead. [LoRA & QLoRA Fine-tuning Explained In-Depth](https://www.youtube.com/watch?v=t1caDsMzWBk)
- To make the model even more memory efficient, we adopt **QLoRA**, which combines LoRA with 4-bit quantization via the bitsandbytes library. This reduces the base model's footprint from 16-bit (or 32-bit) floating point precision to just 4-bit, making it possible to train a 7B parameter model within the constraints of consumer grade GPUs or Colab environments.

## Agentic AI

- **Agentic AI:** eg. you ask a prompt "i want to buy a stock between nvidia and tesla, which one will give me a better profit now", for this, we will have to query the current stock market data + the trends and then give an output as LLM prompt. So how to do this autonomously is what AI agents do https://www.youtube.com/watch?v=xOS0BhhdUbo
- **Phidata:** build, ship and monitor agentic systems [Building Your First Agentic AI- Financial Agent With Phidata](https://www.youtube.com/watch?v=74SnvbQYgx8) mainly you get to see what each agent is doing, thus more control
- RAG with vector databases: https://www.youtube.com/watch?v=4MTtfTZnH5Y
- **Autogen:** multiple agents working together to accomplish a task https://www.youtube.com/watch?v=vU2S6dVf79M so when gpt tells you to run a particular code, this actually does it for you
- **Langflow:** low code AI agent creator https://www.youtube.com/watch?v=EIvbi99G9RE [Building RAG And Agentic Application In 5 Min With No Code Using Langflow](https://www.youtube.com/watch?v=uA6sL65UNi4) best for non coders (you can test your system but not suitable for deployment)
  - [ADVANCED Python AI Agent Tutorial - Using RAG, Langflow & Multi-Agents](https://www.youtube.com/watch?v=QmUsG_3wHPg)
- **LangGraph:** https://www.youtube.com/watch?v=gqvFmK7LpDo https://www.youtube.com/watch?v=b2iM9bPdAEs (langchain can also query arxiv and wikipedia, it has its wrappers) [Tutorial 1-Getting Started With LangGraph- Building Stateful Multi AI Agents](https://www.youtube.com/watch?v=gqvFmK7LpDo)
  - Supports multiple concurrent sessions and users
  - Conversationally biased, so not that great for workflows
- Use LangGraph when you want to create an entire pipeline, interact with databases. Use Autogen when you want agents to interact with each other (ai agents ask questions to each other and self improve)
- **Solutions to large scale agentics:** state graphs (nodes, edges, parallel execution), asynchronous mapreduce (instead of waiting for all map tasks to finish, the process might start when a certain number is completed)
- **LangSmith:** track every function in the chatbot
- For graphrag agent: https://github.com/circlemind-ai/fast-graphrag
- Langchain and CrewAI have a lot of tools for different use cases (even tools for different formats for RAG) https://python.langchain.com/docs/integrations/tools/
  - https://docs.crewai.com/en/tools/overview
- **CrewAI:** defining roles, goals and backstory for agents, good for multi agent workflows, production ready systems (it's not an LLM, it's an LLM agent framework)
  - IBM's Agentics: https://github.com/IBM/agentics
  - https://docs.crewai.com/en/concepts/agents
- **DuckDuckGoSearch:** for web searching (asking references for publications and stuff too)
- One problem with agentic AI is that the data can be compromised (when you make the API calls). One solution is to create a local version using Ollama or vLLM, but it is computationally expensive. The other option is to just create a contract with OpenAI or something, they might agree to work on that at a much more reasonable price and without the pain of engineering and hosting the architecture.
- The time to execute an LLM call depends mostly on the output size and less on the input size due to iterative token by token text generation (the input is processed in one parallel pass, which mainly affects the time to first token)
