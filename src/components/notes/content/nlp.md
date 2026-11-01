## Embeddings and Language Modeling

- Course: https://www.cs.columbia.edu/~johnhew/coms4705/index.html
- **Word Embeddings:** words represented as dense vectors (lower dimensional than one-hot). Learned by using a word to predict the words around it, so interword semantics are captured
- **Word2Vec**
  - **CBOW (Continuous Bag of Words):** predicts a target word using surrounding elements
    - BOW is a simple feature extraction method for classification, does not keep order and context into account
  - **Skip-gram Classifier:** predicts surrounding elements using the target word

::viz word2vec

- **Visualization for Word embeddings:** PCA for linear, t-SNE for non-linear
- **Language Modeling:** Determining a probability distribution over strings.
- **Finite Vocabulary (V):** you cannot teach each and every word to the computer, we thus use chunks of the finite vocabulary to build things around it (subword solution). Those chunks are also made by chars (unicode encoding) to further standardise the process

## Tokenization

- **Tokenization:** breaking raw text into small tokens (word level is not that efficient, only doing characters will generate very long sequences. We can thus use prefix/suffix and generate rare words using characters)
- **Byte Pair Encoding (BPE):** create pairs about words based on frequency (count adjacent characters to check which pair shows up the most), and do it till you obtain the word/sequence (GPT/Llama)

::viz bpe

- **WordPiece:** Breaks rare words into subwords prefixed with ##. (BERT). (begin with a set of character tokens, break all words and get scores for tokens next to each other, merge the highest scoring pair: pair frequency ÷ (frequency of first part × frequency of second part))
- **Byte Level Tokenization:** byte-level BPE, GPT-2 onwards
- **Unicode Encoding:** UTF-8, variable-length (1–4 byte) encoding of the unicode standard
- **Regular Expressions (regex):** specifying text search strings https://www.geeksforgeeks.org/regular-expression-python-examples/
- **Stopwords:** most common words (the, is, in)
- **Stemming:** removal of suffixes to get to the word root, often leading to incorrect meaning & spellings (caring -> car)
  - **Porter Stemmer:** rule based system for removing the suffix
- **Lemmatization:** converts word to its meaningful base form (lemma)

## Classical NLP

- **Word Sense Disambiguation:** identify the correct meaning of the word in a given sentence
  - Knowledge based methods: lesk algorithm, sentence similarity
  - Supervised ML
  - Unsupervised ML
- **Lesk Algorithm:** Used for word sense disambiguation. Compares dictionary definitions of the word to the context in which it's being used. (count the overlapping words)
- **Pragmatics:** understand speaker's intended meaning
- **HMM:** probabilistic model that describes a system with hidden states that evolve over time, where the observed events are influenced by those hidden states.
- **Maximum Entropy Markov Model (MEMM):** a discriminative sequence model that directly predicts the next hidden state from the previous state and the current observation using a maximum-entropy (logistic regression) classifier (combine strengths of both, HMM and ME)
- **Conditional Random Field (CRF):** sequence labelling (understand the context of surrounding data)
- **Ngram:** sequence of n words that occur in a text document. For Unigram, bigram, trigram. Probability = count(those words in a sentence)/count(previous words). Used to predict the next word

::viz bigram

- **Morphology:** study how words are formed and internal structure of words
- **Finite State Transducers (FST's):** map input sequence to output sequence. (used in morphological analysis, spell checking, speech recognition, machine translation). Eg. autocorrect feature
- **Deterministic Parsing:** commits to a single parse at each step (fast, top down/bottom up approach), so it can't keep multiple readings of an ambiguous sentence and handles ambiguity poorly.
- **Plagiarism:** Unauthorized copying (may use similar words without credit)

## Ambiguities and Challenges

- **Ambiguities in NLP**
  - **Lexical:** "bat" (animal or sports), same word different meanings
  - **Syntactic:** "Visiting relatives can be annoying"
  - **Semantic:** "He saw the man with the telescope", did he see the "man with the telescope", or did he use the telescope to see the man
  - **Pragmatic:** "It's cold in here" (could be a request to close window), no context reference for "here"
- **Challenges in NLP:**
  - Sarcasm Detection
  - Understanding the tone using Audio Input
  - Everything is dependent on the wordnet Dataset

## NLP Toolkit

- **Name Entity Recognition:** helps computers understand the meaning of text by extracting key information and organizing it into predefined categories like "person," "location," or "organization"
- **Punkt:** unsupervised trainable model for unlabelled data (sentence tokenization)
- **Wordnet:** massive dictionary of english
- **Omw:** open multilingual wordnet
- **TF-IDF** (term frequency - inverse document frequency): how important a term is within a document relative to a collection of documents

::viz tfidf

- **BOW:** (Bag of words), NLP strategy for converting a text document into numbers that can be used by a computer program
- **Gensim:** open source python library for representing docs as semantic vectors as efficiently and painlessly as possible
- **One hot encoding:** a vector representation of using words in a vocabulary
- **POS-tagging:** (part of speech) marking up a word to a particular part of speech based on its definition and its context
- **Chunking:** to identify POS and short phrases in a given sentence
- **Bi-LSTM:** bidirectional LSTM
- **Seq2seq:** takes input sequence, encodes, gives output sequence
- **Pad_sequences:** to ensure that all sequences in a list have the same length
- **Label_encoder:** converts categorical columns into numerical ones so that they can be filled

## Ideas before Transformers

- **ELMo (Embeddings from Language Models)** (Bigger model is better) Train a general LSTM to model language, use this output to get word embeddings. ELMo uses a bi-directional LSTM language model (BiLM). It processes text both forward and backward.
- **ULMFiT + Finetuning:** train a model on an old dataset, use the same weights and parameters and continue tuning on the new dataset (fine-tune)

## Attention and Transformers

- **Attention:** weigh different words based on how important they are for prediction
  $ attention(q, K, V) = ∑ₜ softmax(q·kₜ / √d) · vₜ
  - **Query (Q):** What this word is looking for
  - **Key (K):** What this word provides
  - **Value (V):** The information it carries

::viz attention

- **Transformers:** A deep learning model. Solves tasks sequence to sequence while easily handling long-distance dependencies. Dynamically weighs the importance of each token in the input sequence based on its relevance to other tokens. It is designed to generate output sequences from input sequences. (There are no sequential operations across the input during training, thus easily parallelizable)
- **Examples of Transformers:**
  - **Encoder** (read and understand the input) - BERT (Bidirectional encoder representations from transformers). Is designed to generate high quality representations of text. Process information in both directions
    - RoBERTa
    - Knowledge Distillation
    - DistilBERT
    - Sentence BERT: sentence Level
  - **Decoder only** (generate output step by step) - GPT because they are trained on a sequence, not input -> output pairs, uses masked self-attention (prevents a token from seeing future tokens)
  - **Encoder + Decoder** - T5 (translate/summarize, so both encoder and decoder are needed)
- **Transformer Architecture** (encoder left, decoder right)
  - In the decoder, the first multihead attention is to get earlier positions in the output sequence, but not future ones (masking). The next one is for cross attention (what part of the input should I focus on)
- **What is self attention?** Representing a vector as a weighted average of other vectors. Helps in capturing long-range dependencies rather than just previous tokens
- **Multihead attention:** multiple matrices for attention, each capturing different features (syntax, parts of speech, etc). (Attention heads can be parallelized)
- **How to get the top values dynamically: nucleus (top-p) sampling.** Have an alpha, take all the tokens till the sum of probabilities hits that alpha.

- **Self-attention cost:** O(n² · d) time and O(n²) memory in sequence length n, which is why long contexts are expensive (FlashAttention, sparse and linear attention reduce the cost)
- **Positional encodings:** sinusoidal (original Transformer), learned (BERT, GPT-2), rotary / RoPE (Llama)
- **KV cache:** during generation, store the keys and values of earlier tokens so each new token only computes its own; memory grows linearly with sequence length
- **Pre-training objectives:** masked language modelling (BERT), next-token / causal language modelling (GPT), span corruption (T5)

::viz decoding

- **GLUE Benchmark:** General Language Understanding Evaluation
- LSTM Processes word by word, transformer considers entire sequence together
- **Skip connection:** Output = f(x) + something_from_earlier_layer
- **Few-shot classification:** recognise unseen classes during training with limited labelled samples

## Multi-class Classification

- **One vs Rest:** we take the class samples we would like to classify, the rest samples are labelled dummy class. We repeat for each class, find the highest probability, disregarding the probabilities for the dummy class
- **One vs One:** split the data into each class, train the two class classifier on each pair of classes. We select the class with the most predictions
- **Softmax Regression:** Multinomial logistic regression, used in scenarios with more than two classes, and the classes are mutually exclusive

## Neural Sequence Representations

- A naive representation of a prefix is to just represent it as the average of its word embeddings.
  $ h = (1/(t−1)) ∑(i=1 to t−1) eᵢ
  - but this ignores word order, "Uncle Iroh ran to Zuko" vs. "Zuko ran to Uncle Iroh" → same representation
- We thus incorporate word positions, p = position embeddings, but addition is commutative, so when we represent the entire sentence together, the position relevance is lost
  $ h = (1/(t−1)) ∑(i=1 to t−1) (eᵢ + pᵢ)
- Linear transformations also don't solve the problem due to the same reason (cumulative nature of addition)
- We thus need to use non-linear functions (ReLU, tanh, sigmoid). Now, the representation depends on both the word and its position: f(eᵢ + pᵢ) ≠ f(eᵢ) + f(pᵢ)
  $ hᵢ = f(eᵢ + pᵢ)
- "I like pizza, so I went to buy" vs. "I hate pizza, so I went to buy". Changing like to hate should ideally change the meaning, but it currently just understands the sentence formation and not the context. So the representation is currently linear in word embedding difference
- We thus need non-linear interactions between words. Here the inner function binds the word embeddings and the positions together, and the outer function non-linearly binds the words together.
  $ h = f( ∑(i=1 to t−1) f(eᵢ + pᵢ) )

## Training and Decoding Tricks

- DPO (Direct Preference Optimization)
- Simple Preference Learning
- Residual Networks: [Why Residual Connections (ResNet) Work](https://www.youtube.com/watch?v=Gey9CG6R6w8)
- **Packing vs padding:** you usually don't want to learn the pad token while computing the loss (the traditional approach of handling different sequence lengths). In packing, we keep the max sequence length based on the hardware computation. So suppose 1M tokens, and no pad tokens, and then go to the next line. So when doing a forward pass, there is no learning of pad tokens needed (how generation works in GPT)
- **Beam search** - keeps the k best partial sequences (2 for k=2) and extends each of them at every step (tree like structure), then picks the entire sequence that has the maximum overall probability

::viz beam-search

- **BLEU** = BP × (p₁p₂p₃p₄)^¼. Evaluating machine translation, p₁, p₂… = precision scores of n-grams respectively, BP = brevity penalty for outputs that are too short.
- **Prompting vs RAG vs fine-tuning:** prompting is cheapest; RAG adds fresh or private knowledge and lets you cite sources; fine-tuning changes behaviour, format or style for a domain. They are often combined
- **Evaluation:** perplexity = exp(average negative log-likelihood per token), lower is better; BLEU / ROUGE for translation and summarisation; human evaluation and LLM-as-a-judge for open-ended outputs
- **Scaling laws:** Chinchilla found that, for a fixed compute budget, roughly 20 training tokens per parameter is compute-optimal

## Applied NLP (Code)

- **Zero Shot Classification:** no labelled data, single and multi-class, is able to classify new examples from previously unseen classes https://github.com/Chaitya0623/Infiheal_Codes/blob/main/Infiheal_ClassEx.ipynb https://huggingface.co/facebook/bart-large-mnli
- **Generate New Text Data:** just pass the prompt in the form of any string and pass labels, if many https://github.com/Chaitya0623/Infiheal_Codes/blob/main/Infiheal_AutoImmune.ipynb, https://huggingface.co/databricks/dolly-v2-12b
- **Semantic Classification:** `pip install faiss-cpu`, Openai, langchain and tiktoken (tokenize texts), preferred in models where semantic similarity is required over syntactic similarity (context), embeddings need to be generated https://github.com/Chaitya0623/Infiheal_Codes/blob/main/Infiheal_Faiss_Senti.ipynb
- Use Langchains, generate_example template (can send instructions, textual question (pass labels) and your tasks) https://github.com/Chaitya0623/Infiheal_Codes/blob/main/Infiheal_CreateDataset.ipynb
- **Create Embeddings:** to generate embeddings for model training using OpenAI, ada-embeddings https://github.com/Chaitya0623/Infiheal_Codes/blob/main/Infiheal_Embeddings.ipynb - has code for Logistic regression and SVC classifier too
- **Text Summarization:** model using akoksal/LongForm-OPT-1.3B, dolly and langchains https://github.com/Chaitya0623/Infiheal_Codes/blob/main/Infiheal_SummarizeGPT.ipynb
- **Name Entity Recognition:** to classify accounts based on fake names https://github.com/Chaitya0623/Infiheal_Codes/blob/main/Infiheal_ner.ipynb
- **Create a Retriever Generator Model:** It will initially store the dataset when the model is queried, it will retrieve an output from the loaded data (if possible), else it uses OpenAI to generate new data. Question Answer Models https://github.com/Chaitya0623/Infiheal_Codes/blob/main/haystack_lfqa.ipynb
