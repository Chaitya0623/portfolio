## Data Models

- **Entity Relationship Model (ER)**
- **Extended ER Model (EER):** Adds more concepts:
  - **Generalization** – Combine subclasses into superclass.
  - **Specialization** – Divide superclass into subclasses.
  - **Aggregation** – Relationship treated as an entity.
- **Relational Model**

## Relational Database Design

- Normalization - research more
- Transaction Management (ACID properties - atomicity, consistency, isolation, durability)
- Concurrency Control
- Serializability
- Recovery System

## Distributed Databases

- Transparency (location, replication, fragmentation)
- Reliability and Fault Tolerance
- Improved Performance
- Scalability
- Data Fragmentation (horizontal, vertical, hybrid)

## Indexing

- **Dynamic Multilevel Indexes:** Data is not static; insertions/deletions may cause restructuring.
  - **B-Trees** → Balanced tree, keys in internal nodes + leaves. Keeps search efficient (can store data in any nodes)
  - **B+ Trees** → Variation where all actual data entries are in leaf nodes; internal nodes store only keys.
    - Easier range queries
    - Widely used in real DBMS (e.g., Oracle, MySQL, PostgreSQL)

::viz bplus-tree

## New Database Applications & Architectures

- **Data Warehousing** → Stores integrated, historical data for analysis (OLAP)
- **Multimedia Databases** → Store images, audio, video, etc.
- **Mobile Databases** → Support data access from mobile devices with offline syncing
- **NoSQL** → Non-relational, schema-less, scalable (e.g., MongoDB)
- **Native XML Databases (NXD)** → Directly store XML documents
- **Document-oriented Databases** → Store JSON-like documents, BSON (binary JSON), XML (tree like), (MongoDB, CouchDB)
- **Graph Databases** → Store entities as nodes and relationships as edges (Neo4j)
- **Federated Databases** → Multiple databases appear as one unified system

## Distributed Database Design

- **Data Fragmentation** → Break data into smaller parts (horizontal, vertical, hybrid).
- **Replication** → Store copies for reliability/performance.
- **Allocation** → Decide where to place data
