import { motion } from "framer-motion";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";
import { profile } from "../../assets";

const EthereumFraudDetection = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Fraud Detection in Ethereum Transactions
        </h2>
      </motion.div>

      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          1. The Problem: Phishing in Ethereum
        </motion.h2>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The rise of decentralized finance (DeFi) and blockchain based
          platforms like Ethereum has led to a surge in online financial
          activity, and unfortunately, an equal increase in malicious attacks.
          Among them, phishing scams have become a serious concern, stealing
          millions of dollars worth of cryptocurrency from unsuspecting users.
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Phishing scams on Ethereum often involve fake smart contracts,
          suspicious wallets, or impersonation attacks. Unlike traditional
          systems where transactions are tightly regulated, Ethereum’s open,
          pseudonymous environment makes it easy for scammers to hide in plain
          sight.
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          But there's a pattern. Malicious accounts often interact in similar
          ways: with known scam wallets, contract honeypots, or odd transaction
          sequences. These behavioral footprints can be represented as graphs,
          and that’s where graph neural networks come in.
        </motion.p>
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          2. The Dataset: Extracting Ethereum Transaction Graphs from XBlock
        </motion.h2>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          To train our model, we needed a large dataset of real Ethereum
          transactions. We used{" "}
          <a
            href="https://xblock.pro/#/search?keywords&types=datasets&tags=Transaction&tags=Ethereum&page=1&pageSize=5&sort=relevance&order=desc"
            target="__blank__"
            className="underline"
          >
            Xblock
          </a>
          , a comprehensive open source platform for blockchain datasets. XBlock
          provides structured, clean blockchain data including blocks,
          transactions, smart contracts, and event logs.
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          We extracted 254,973 rows from an initial set of over 6,794,521
          Ethereum transactions. Each row included:
        </motion.p>
        <div className="text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>TxHash – Transaction Hash</li>
            <li>BlockHeight – Block number</li>
            <li>TimeStamp – Time of transaction</li>
            <li>From – Sender's id</li>
            <li>To – Receiver's id</li>
            <li>Value – ETH value transferred</li>
            <li>isError – Nodes labelled as Phishing Nodes</li>
          </ul>
        </div>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Due to computational constraints, we limited the dataset and focused
          on designing and testing the architecture before scaling.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          3. Data Preprocessing and Graph Construction
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          We first performed basic data cleaning, normalization, and feature
          engineering:
        </motion.p>

        <div className="text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>
              Nodes represented Ethereum addresses (both senders and receivers)
            </li>
            <li>Edges represented transactions between them</li>
            <li>
              Edge features included value transferred, timestamp, and error
              status
            </li>
          </ul>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          This structure allowed us to model the transaction history as a
          temporal, directed graph, where the time and direction of each
          transaction matter.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          4. Directed Random Walks
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          A directed random walk is a graph traversal technique where, starting
          from a given node, we move step-by-step to a randomly chosen neighbor
          by following only the outgoing edges, thus preserving the
          directionality of the graph. This is especially important in networks
          like Ethereum, where transactions have a clear sender and receiver. In
          our approach, we performed multiple directed random walks from each
          wallet address in the transaction graph. For each walk, we avoided
          revisiting nodes to prevent cycles, and limited the length to 10
          steps. Repeating this process hundreds of times per node allowed us to
          generate a diverse set of sequences capturing how funds propagate
          through the network. These sequences were then used to build a
          graph-based representation that helped our model learn transaction
          patterns indicative of phishing behavior.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          These walks generate meaningful context for each node before feeding
          them into a temporal GNN.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          5. Temporal Graph Attention Layer (TGAT)
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The Temporal Graph Attention (TGAT) layer is at the heart of our
          model. Traditional Graph Neural Networks (GNNs) operate on static
          graphs, they ignore when interactions occur. However, in Ethereum, the
          timing of transactions is crucial. Phishing behavior is often bursty
          or follows suspicious timing patterns.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The TGAT layer solves this by incorporating temporal information
          directly into the attention mechanism. It processes not just the
          structure (which nodes are connected), but also when these connections
          happened. It does this using two key ideas:
        </motion.p>

        <div className="text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>
              Temporal encoding: Each edge in the graph has a timestamp. These
              are embedded and combined with node and edge features to represent
              temporal dynamics.
            </li>
            <li>
              Multi-head attention: This allows the model to look at each node's
              interactions from multiple perspectives (e.g., small local
              patterns, large-scale flow patterns), enabling richer learning.
            </li>
          </ul>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          In our project, each node represented a wallet, and each edge
          represented a transaction (with its timestamp). By using TGAT layers,
          we allowed the model to attend differently to transactions based on
          when they occurred, giving more weight to recent or clustered
          activity, which is often a red flag in scams. First, it combines the
          node and edge features into a single vector. Then it projects this
          vector into "queries," "keys," and "values", core components of
          attention mechanisms. Using these, it computes how much attention a
          node should give to its neighbors (based on feature similarity and
          timestamp dynamics). Finally, it aggregates these values into a new,
          time-aware embedding for each node. This layer helps capture how
          recent or frequent interactions affect a node’s importance, which is
          crucial for phishing detection, since malicious nodes tend to cluster
          or act in bursts.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          6. Multi-Head Temporal Attention
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          While a single attention head is powerful, multiple heads make the
          model far more expressive. Multi-head attention enables the model to
          simultaneously capture different aspects of the transaction behavior,
          for example, one head may notice suspiciously frequent transactions,
          another might capture value anomalies, and another might focus on
          isolated but timed interactions.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          In our architecture, we stacked several TGAT layers, each using
          multiple heads. This deepened the model’s capacity to learn temporal
          transaction patterns from a variety of angles. These layers together
          formed a rich temporal embedding of each node in the Ethereum graph.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          7. Final Classifier: Multilayer Perceptron (MLP)
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Once the TGAT layers generated meaningful temporal graph embeddings
          for each node, we needed a way to classify whether each node (wallet)
          was likely to be involved in phishing.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          For this, we used a Multilayer Perceptron (MLP), a simple but
          effective feedforward neural network. The MLP takes the high-level
          representations output by TGAT and learns to map them to a binary
          label using the sigmoidal function: phishing or non-phishing
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          MLPs are well-suited for this task because they are:
        </motion.p>

        <div className="text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Lightweight and fast to train.</li>
            <li>Capable of capturing non-linear relationships.</li>
            <li>Easily adaptable to small and medium datasets.</li>
          </ul>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          In our pipeline, the MLP served as the final decision-making layer,
          translating all the temporal and structural insights gathered from the
          graph into a clear classification.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          8. Model Performance
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Despite the limited subset of data, our model achieved 85.23% accuracy
          on the test set. This is a strong indication that graph-based temporal
          features are highly predictive of scam behavior in Ethereum networks.
          With more data and hyperparameter tuning, we expect this performance
          to improve significantly.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px] underline"
        >
          This work was carried out during my internship as a Research Intern at
          IIT Patna.
        </motion.p>
      </div>
    </>
  );
};

export default SectionWrapper(EthereumFraudDetection, "ethereumfrauddetection");
