# Automat API

## Run Locally

    $ sbt run

Automat defaults to an in-memory store for development. If you want to use a
real Elasticsearch, do the following:

    $ export USE_REMOTE_ES=true
    $ docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.7.1 // in a separate tab
    $ sbt run
