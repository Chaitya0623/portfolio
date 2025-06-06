import { motion } from "framer-motion";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";
import { profile } from "../../assets";

const MentalHealthChatbot = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          RAG Based Mental Health Chatbot
        </h2>
      </motion.div>

      <div className="w-full flex flex-col items-start">
        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          1. Understanding the Impact: Machine Learning for Mental Health
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          My journey into machine learning took a meaningful turn during my
          internship as an Artificial Intelligence Intern at Infiheal
          Healthcare, a mental health focused startup. I contributed to building
          “Healo”, a chatbot designed to provide psychological support to users
          facing emotional challenges. This wasn’t just a chatbot, it was a
          careful balance of empathy, technical precision, and responsible AI
          design.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The project involved building a retrieval-augmented generation (RAG)
          based assistant tailored for handling sensitive queries with empathy
          and factual grounding. Drawing on over 500k+ anonymized
          therapist-patient chat transcripts, I worked on training and
          evaluating models that could understand mental health contexts, avoid
          hallucinations, and respond in a way that built user trust. This was
          my first hands-on experience with large language models (LLMs) and
          production ready AI systems like LangChain and Haystack, that blend
          natural language retrieval with generative response generation.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The results were meaningful. By combining intelligent retrieval with
          fine-tuned language generation, the chatbot achieved improved
          emotional relevance in responses and reduced hallucinations. This
          translated into a significant increase in user retention, especially
          among those using the app for repeat support sessions. The work was
          deeply rewarding, it helped me understand how I could create models
          that not only predict human behaviour, but also explain it.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          2. Fine-Tuning LLaMA for Mental Health Conversations
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          One of the most critical components of this project was the
          fine-tuning of the LLaMA language model to generate responses aligned
          with the emotional sensitivity and behavioral intent required in
          mental health support conversations. While Retrieval-Augmented
          Generation (RAG) was used to ensure factual relevance by grounding the
          model’s responses in verified content, fine-tuning LLaMA allowed the
          system to go a step further, capturing the empathetic tone,
          conversational flow, and psychological nuance vital for effective
          support in this context.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Given the limited computational resources available (e.g., 15 GB RAM
          on Google Colab), traditional full-model fine-tuning was not feasible.
          Instead, we employed Parameter-Efficient Fine-Tuning (PEFT) techniques
          that freeze most of the LLaMA model's weights and update only a small
          subset of trainable parameters. This drastically reduces both training
          time and memory usage without compromising model quality. In
          particular, we used LoRA (Low-Rank Adaptation of Large Language
          Models), which introduces low rank matrices into specific layers of
          the model to adapt it to downstream tasks with minimal overhead.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          To make the model even more memory efficient, we adopted QLoRA, which
          combines LoRA with 4-bit quantization via the bitsandbytes library.
          This reduced the model’s footprint from a 32-bit floating point
          precision to just 4-bit, making it possible to train a 7B parameter
          model within the constraints of consumer grade GPUs or Colab
          environments.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          The fine-tuning process involved configuring a supervised fine-tuning
          (SFT) pipeline, specifying hyperparameters such as:
        </motion.p>

        <div className="text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>
              <strong>Rank (r):</strong> dimensionality of the adaptation
              matrices
            </li>
            <li>
              <strong>Alpha:</strong> scaling factor for LoRA updates
            </li>
            <li>
              <strong>Dropout rate, batch size, and learning rate</strong>
            </li>
            <li>
              <strong>Weight decay and choice of optimizer</strong>
            </li>
            <li>
              <strong>Checkpointing for long-running training runs</strong>
            </li>
          </ul>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          We used Hugging Face’s transformers and peft libraries, along with
          DeepSpeed to scale training and manage memory efficiently. The
          dataset, comprised of thousands of therapist-patient given by
          psychologists, was preprocessed into a structured format and tokenized
          using the native LLaMA tokenizer.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          LLaMA was selected for its combination of open access,
          cost-efficiency, and flexibility. Unlike closed source models, it
          provided full control over fine-tuning, critical for working with
          sensitive behavioral data while ensuring data privacy and ethical AI
          alignment. Its relatively small size (around 25 GB for the 7B model)
          also made it viable for iterative experimentation and deployment in
          constrained environments.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          Ultimately, fine-tuning LLaMA enabled the chatbot to better understand
          emotional cues, reduce hallucinations when paired with RAG, and
          significantly improve user engagement and retention, demonstrating the
          real world value of combining behavioral data science with scalable
          language modeling techniques.
        </motion.p>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          3. Relevant LLM's Used
        </motion.h2>

        <div className="text-secondary text-[17px]">
          <ul className="list-disc list-inside mt-5 space-y-1">
            <li>
              <strong>Zero-Shot Classification (BART-large-MNLI)</strong>:
              Zero-shot classification allows models to classify data into
              categories they haven't been explicitly trained on, leveraging
              semantic knowledge and relationships between categories. This is
              achieved by training on a subset of seen classes and then using
              learned relationships to classify unseen categories. Enables
              classification without labeled data by inferring relationships
              between inputs and candidate labels. Used for multi-class
              classification of psychological states based on user messages.
            </li>
            <li>
              <strong>Text Generation (Dolly v2)</strong>: Capable of generating
              new mental health-related text data based on prompts and label
              conditions. Used to augment dataset examples where conversations
              were limited.
            </li>
            <li>
              <strong>Semantic Classification (OpenAI + FAISS)</strong>:
              Leveraged sentence embeddings and vector similarity (via FAISS)
              for context aware classification tasks, such as detecting tone
              shifts or emotional sentiment.
            </li>
            <li>
              <strong>LangChain</strong>: Used for generating more data points
              similar to the ones given by psychologists based on structured
              prompts and labels to scale dataset creation for fine-tuning and
              evaluation.
            </li>
            <li>
              <strong>OpenAI ADA Embeddings</strong>: Created high dimensional
              embeddings for intent classification and similarity based
              retrieval tasks.
            </li>
            <li>
              <strong>Retriever-Generator Pipeline (Haystack + OpenAI)</strong>:
              Developed a hybrid QA system where relevant answers were retrieved
              from internal datasets; fallback generation occurred via OpenAI
              when no match was found.
            </li>
          </ul>
        </div>

        <motion.h2
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[32px] text-center"
        >
          4. Deployment and Infrastructure
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-5 text-secondary text-[17px]"
        >
          To operationalize my models in a production environment, I deployed
          them using Terraform to automate infrastructure provisioning on AWS.
          Initially, deployments were handled via Docker images hosted on ECR
          (Elastic Container Registry) and served through ECS (Elastic Container
          Service), with logging integrated using CloudWatch. Over time, we
          transitioned the workflow to be fully managed through Terraform, which
          enhanced reproducibility, minimized human error, and reduced manual
          setup time by around 5 hours a week.
        </motion.p>
      </div>
    </>
  );
};

export default SectionWrapper(MentalHealthChatbot, "mentalhealthchatbot");
