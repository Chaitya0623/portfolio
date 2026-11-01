## Data Mining

- **What is binning in Data Mining?** Divide into smaller intervals as bins, reduce continuous and discrete data cardinality

## Orchestration

- **Airflow:** batch workflow orchestration platform. Python framework enables you to build workflows connecting with virtually any technology. If your workflows have a clear start and end, and run at regular intervals, they can be programmed as an Airflow DAG. Not used for infinitely running event based workflows https://airflow.apache.org/docs/apache-airflow/stable/index.html [Learn Apache Airflow in 10 Minutes | High-Paying Skills for Data Engineers](https://www.youtube.com/watch?v=5peQThvQmQk)

::viz airflow

- **Prefect:** https://www.prefect.io/ Airflow takes much more time in creating the DAG Design Flow. You get controllability on what part of code can be run where and when (like docker, server, etc)
- **Batch vs streaming:** batch processes bounded chunks on a schedule (Airflow + Spark); streaming processes events continuously (Kafka, Flink, Spark Structured Streaming)
- **Spark basics:** lazy evaluation (transformations build a plan, actions run it); narrow transformations (map, filter) stay within a partition, wide ones (groupBy, join) shuffle data across the cluster and are expensive; watch for data skew
- **Reliable pipelines:** make them idempotent (re-running gives the same result), support backfills, and add data quality checks (row counts, nulls, uniqueness, freshness)

## APIs and Databases

- **GraphQL:** https://graphql.org/ an alternative to REST API's, get all the data that you need with just one request. Responses in JSON
- **CouchDB:** Replication and synchronization capabilities of CouchDB make it ideal for using it in mobile devices, where network connection is not guaranteed, and the application must keep on working offline https://couchdb.apache.org/
- **PostgreSQL:** https://www.postgresql.org/ User can define his own data types, functional languages. Can handle concurrent transactions without locking the database (MVCC). Offers various indexing techniques such as B-tree, Hash for indexing
- **Prometheus:** https://prometheus.io/ monitoring system with its own time series database, uses PromQL Language
- **Grafana:** https://grafana.com/ Tool to visualize time series data. For some parameters, it automatically makes visualizations using AI
- **Metabase:** https://www.metabase.com/ fast analytics with user friendly designs (PowerBi alternative)
- **Victoria Metrics Database:** https://victoriametrics.com/ time series data storage
- **CAP theorem:** when a network partition happens, a distributed system has to choose between consistency and availability

## Data Warehousing

- **OLTP vs OLAP:** OLTP serves many small reads/writes for applications (row-oriented, e.g. PostgreSQL); OLAP serves large analytical scans (columnar formats like Parquet, warehouses like Snowflake / BigQuery)
- **ETL vs ELT:** ETL transforms before loading into the warehouse; ELT loads raw data first and transforms inside the warehouse (e.g. with dbt)
- **Star schema:** a central fact table (events and measures) joined to dimension tables (who, what, when, where); a snowflake schema further normalises the dimensions
- **Slowly changing dimensions:** Type 1 overwrites the old value; Type 2 keeps history by adding a new row with valid-from / valid-to dates

## Web Data

- **HITS Algorithm:** ranking web pages based on their link structure
  - **hub** (links to many good pages)
  - **authority** (linked by many good hubs)

::viz hits

- **Web Crawler:** automated program that browses through the web to index pages for search engines
- One problem with web scraping for data collection is that the data keeps on changing, like the president of a country might change and the old data might not be relevant. Crawlers need to be designed accordingly
- A **wrapper** is a program that extracts structured information from unstructured or semi-structured web pages
