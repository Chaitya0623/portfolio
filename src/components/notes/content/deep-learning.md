## When and Why

- Use deep learning for large/more/unstructured complex datasets. Not to be used when you need explainability, when simple rule based systems are better, not much data
- **Neural Networks:** A series of algorithms to recognize underlying relationships in a dataset through a process that mimics the human brain
- **Training** is the process of teaching an AI model using large datasets to learn patterns and adjust its parameters, while **inference** is the separate process of using that trained model to make predictions on new, unseen data

## PyTorch

- **Pytorch:** replacement of numpy for DL, tensors (data structure) [PyTorch for Deep Learning & Machine Learning – Full Course](https://www.youtube.com/watch?v=V_xro1bcAuA)
- https://docs.pytorch.org/docs/stable/index.html
  - `tensor.ndim`: number of dimensions
  - `torch.rand`: random values
  - `torch.zeros`: start with zeros
  - `torch.ones`: start with ones
  - `tensor.dtype`: data type
  - `tensor.min/max/mean`: to get those respective statistical values of all elements in the tensor
  - `tensor.argmin/argmax`: to find the position of the min/max element
  - `x.T`: transpose of tensor
  - `x.reshape`: reshape the size of the tensors (number of elements should be same)
  - `x.squeeze()`: removes all single dimensions from a target tensor
  - `x.unsqueeze()`: adds an extra dimension
  - `torch.permute(input, dims)`: change the order of dimensions
  - `torch.manual_seed(random seed)`: to reduce the randomness throughout the tensors (when you share notebooks, you don't want the same code to have different results)
- How to use GPU on a macbook,

```
if torch.backends.mps.is_available():
    mps_device = torch.device("mps")
```

- **Pytorch model building essentials:**
  - `torch.nn`: contains all the building blocks for neural networks
  - `torch.nn.Parameter`: what params should our model try
  - `torch.nn.Module`: base class for all neural networks
  - `torch.optim`: optimizer, it takes the loss function into account and adjusts the parameters accordingly, SGD for regression, Adam for classification
  - **L1loss:** mean absolute error
  - **MSEloss:** mean square error
  - **BCEloss:** binary cross entropy (needs outputs of sigmoid activation as inputs)
  - **BCEwithLogitsLoss:** prebuilt activation function (needs logits as inputs, does sigmoid activation on its own). Logits are the output given by the final layer that help us do the guesswork by applying the activation function
  - **CrossEntropyLoss:** used for classification
  - `nn.Linear(2, 16)`, here 2 is the number of features in the dataset, and 16 is the number of hidden units you would like to try (trial and error)
  - Which kinds of layers depend on the shape of the dataset. For example, you cannot use linear for concentric circles. (use ReLU for non linear activation)
  - In ReLU, you keep the positive values as it is, negatives change to 0
  - In leaky ReLU, for negative we multiply by a small slope (0.01 by default in PyTorch), just to keep its existence into consideration
  - `nn.Conv2d`: for cnn based models
  - `def forward()`: all nn modules require this
  - `with torch.inference_mode()`: you use this while making predictions, ideally you want to only return the relevant predictions, not the gradient function, not using this will track gradients. Thus, not tracking everything makes the process faster
- Numpy only works on CPU, so you will have to use `tensor.to(device)` and `tensor.cpu()`, to and fro
- Use `torch.save` to save the model, but it is not recommended to save the entire model, so just save the model parameters (`model.state_dict()`). Use ONNX if you want to use the model outside pytorch

## TensorFlow, Tensors and Keras

- **Tensorflow:** allows you to create dataflow graphs that describe how data moves through a graph
- **Tensor:** 1D vector, 2D matrix, can have n dimensions
  - **Scalar:** no dimensions
  - **Vector:** magnitude and direction both
  - **Matrix:** playing with 2 dimensions (rows and columns)
- **Random tensors:** mainly used in models where you have random values at start which gets updated with weights (`torch.rand`)
- **Image tensors:** for image tensors, you put size = (number of color channels (mostly 3), height, width)
- **Matrix Multiplication:**
  - **Dot Product:** basic row, column multiplication (`torch.matmul()`), inner dimensions must match, resulting matrix = shape of outer dimensions (for two vectors, the dot product gives the angle between them)
  - **Cross Product:** If a = (a₁, a₂, a₃) and b = (b₁, b₂, b₃), then a × b = (a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁). It results in another vector (perpendicular to both a and b), not a scalar
- TensorFlow 1 built static graphs (TF2 runs eagerly by default and builds graphs with `tf.function`), PyTorch generates dynamic graphs
- Pytorch (meta) is used more in research, whereas tensorflow (google) is used more in production environments.
- **TPU:** Tensor Processing Unit
- **Keras:** high-level API on top of tensorflow (Keras 3 also runs on JAX and PyTorch), machine learning
  - **Keras Sequential Model:** plain stack of layers where each layer has exactly one input and one output tensor
  - **Embedding:** converts indexes to dense vectors of fixed size
  - **LSTM:** long short term memory
  - **LayerNormalization:** normalizes each sample across its features (independent of the batch)
  - **Dense:** regular densely connected neural network
  - **Activation = "relu":** rectified linear unit, activation function, max(0, x)
  - **Leaky-relu:** f(x) = a·x if x < 0, = x if x > 0 (allows smaller gradient)
  - **Sigmoid:** 1/(1 + e⁻ˣ)
  - **Softmax:** converts a vector of values to a probability distribution, sum = 1, each lies between 0 and 1
  - **Dropout:** set input units to 0 (to test how the model functions without those nodes)
  - **Optimization = 'adam'** (adaptive moment estimation - adapts learning rate of each parameter based on the first and second moments of the gradients) gradient descent method (AdamW, NAdam)
  - **Loss = sparse categorical cross entropy:** cross entropy between labels and predictions

::viz activations

::viz softmax

## ANN (Artificial Neural Networks)

- **Backpropagation in ANN** - we update the weights so that we can correctly classify the output (given input and output remains the same)
- **Parameter:** auto adjusts during model training -> weights (it can also be features like x comes after y, trained in the matrix), bias
- **Hyperparameter:** manually set before model training -> learning rate (usually set to 0.01), train test split
- **Hyperparameter Tuning:**
  - **GridSearchCV:** up to 4 hyperparameters, P&C, top 3, high computation
  - **Random Search:** randomly chose & evaluate
- **Regularization:** slight modifications in the learning algorithm, model generalizes better. Improves performance on unseen data, penalizes the weight matrices -> should not be too high -> underfitting
  - **Dataset augmentation:** rotate, shift, blur
  - **Early stopping:** no improvement
  - **Dropout:** randomly removes nodes (it acts similar to L2 regularization, often applied together and not mutually exclusive)
  - **Ensemble Techniques:** bagging, boosting

- **Fighting overfitting:** more data / augmentation, dropout, weight decay, early stopping, smaller model, batch norm

::viz dropout

- **Batch Normalization:** normalize variables, network works much faster, speeds up training, larger learning rate -> allows sub-optimal starts, acts as regularizer (little)
  - In a feed forward network, batch norm is applied to the output just before applying the activation function
  - Mainly used for images
- **LayerNorm:** normalizes samples independently for each sample within a layer, independent of batch size
  - Used in NLP
- BatchNorm is comparison wrt peers in the batch, LayerNorm is look at yourself and adjust

::viz norm-axes
- **Why non-linear activations?** Without them, any stack of linear layers collapses into a single linear transformation
- **Vanishing / exploding gradients:** backprop multiplies many derivatives together, so gradients shrink or blow up with depth. Fixes: ReLU-family activations, good initialisation (Xavier/Glorot for tanh/sigmoid, He for ReLU), batch/layer norm, residual connections, gradient clipping, gated RNNs (LSTM/GRU)
- **All-zero initialisation** makes every neuron in a layer compute the same thing (symmetry), so they never learn different features
- **Epoch vs batch vs iteration:** one epoch = one pass over the dataset; an iteration = one parameter update on one batch

## CNN (Convolutional Neural Networks)

- Convolution is a mathematical way of combining two signals to generate a third signal. [Tutorial 21- What is Convolution operation in CNN?](https://www.youtube.com/watch?v=Etksi-F5ug8)
- **CNN vs ANN:** only a few neurons contribute to computation of a neuron
- **Backpropagation in CNN:** [Backpropagation in Convolutional Neural Networks (CNNs)](https://www.youtube.com/watch?v=z9hJzduHToc)
- **ReLU Activation Function:** (Rectified Linear Unit) doesn't suffer from vanishing gradients (for positive inputs), simple and fast to compute
- **Conv Layer:** extracts local features by conv kernel filtering, similar to human eye
- **Pooling Layer:** reduce dimension and computation
- **FCL (fully connected layer):** It can "run" after the features are reduced, else the amount of data is too large, therefore, high cost low efficiency
- **Kernel:** the filter you use on the pixels (sobel, prewitt filter, edge detection, blurring, sharpening, dimensionality reduction) https://sbme-tutorials.github.io/2018/cv/notes/4_week4.html
- **Stride:** the step size you take while moving the kernel
- **Padding:** adding a layer of 0's on all sides to capture corner relationships
- **Pooling:** how to calculate the next value for the network (max/min/avg pooling)
- **Dilation:** introduces gaps between the elements of a convolutional filter, allowing the network to have a larger receptive field (the area of the input the filter "sees") without increasing the number of parameters or compromising the resolution of the feature maps

- **Conv layer parameters:** (k × k × C_in + 1) × C_out, independent of the image size, which is why CNNs need far fewer parameters than fully connected layers

::viz convolution

- **CNN for NLP** (apply on vectors) - it does not capture linguistic patterns or context as well, but it can match or outperform RNNs for classification. CNN's are even faster to train than RNN's

## RNN (Recurrent Neural Networks)

- There is a forgetting problem with RNN's. Considering you repeatedly pass it through the same node, you might miss on information.
- RNN's are sequential, thus not parallelizable
- **Seq2seq:** Input or output sequences of Data, input size not fixed, new input might not be independent of previous inputs, each network is performing the same task
- Backpropagation Through Time
- **Problem of Exploding and Vanishing Gradients:** converge to 0, selective read, write, forget -> whiteboard analogy
- **Types of RNN's:**
  - **Basic RNN (unfolded):** simple, suffers from vanishing gradients.
  - **Seq2Seq RNN:** encoder–decoder models for translation.
  - **GRU (Gated Recurrent Unit):** simplified LSTM, fewer gates, designed to mitigate vanishing gradients (exploding gradients are usually handled with gradient clipping). A GRU controls how much past information to keep and how much new information to update. Faster to train, fewer parameters
  - **Bidirectional RNN:** reads sequence forward & backward.
  - **LSTM:** (Long short term memory), aimed at mitigating the vanishing gradient problem for RNN's

## Other Architectures

- **Adversarial Examples:** inputs purposely designed (tiny, deliberate perturbations) to cause the model to make a mistake
- **Autoencoder:** learn a lower dimensional representation for a higher dimensional data, mainly for dimensionality reduction. can learn efficient representation of input data with no need for labels
  - PCA -> linear, faster
  - Auto -> non linear, prone to overfitting
  - **Denoising:** corrupts input data
  - **Contractive:** prevents learning identity function
  - **Variational:** create similar samples as input
- **GAN's (Generative Adversarial Networks):** discriminator focuses on differentiating between real and fake, generator focuses on generating fake such that discriminator fails [The Math Behind Generative Adversarial Networks Clearly Explained!](https://www.youtube.com/watch?v=Gib_kiXgnvA)
- **Graph Neural Networks:** predictions based on nodes and edges
  - **Multi Headed Temporal Graph Attention layers:** each edge in the graph has a timestamp. These are embedded and combined with node and edge features to represent temporal dynamics. In multiheaded, we view these dynamics with multiple perspectives. First, it combines the node and edge features into a single vector. Then it projects this vector into "queries," "keys," and "values", core components of attention mechanisms. Using these, it computes how much attention a node should give to its neighbors (based on feature similarity and timestamp dynamics). Finally, it aggregates these values into a new, time-aware embedding for each node. This layer helps capture how recent or frequent interactions affect a node's importance.
  - **Networkx:** to create directed graphs
  - **Random Walk Algorithm:** each edge is an ordered pair from u -> v. A Sequence of steps or moves from one node to another acc to probability distribution (can also backtrack if no path further and number of nodes is specified) https://github.com/Chaitya0623/IITp_PSD/blob/main/IITp_Research.ipynb toolkit (library)
- **Multilayer Perceptron (MLP):** a feed-forward network of fully connected layers (stacked perceptrons) used for classification and regression. These are capable of capturing non-linear relationships.
- **Transfer Learning:** model trained on one task is reused as the starting point for a model on a related task
