# Automat API

## Local development

For initial run of Elasticsearch:

    $ docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.8.1

From then on, for control use:

    $ docker stop elasticsearch
    $ docker start elasticsearch

To start the service itself, [Gin](https://github.com/codegangsta/gin) is
recommended to handle hot-reloads. Install it, and Go itself, and then run:

    $ cd api
    $ gin -p 3000 run main.go

Mac installation of go and gin:

    $ brew install go
    $ go get github.com/codegangsta/gin
