# Automat API

## Local development

Run Elasticsearch, e.g.

    $ docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.8.1

Then, start the service. [Gin](https://github.com/codegangsta/gin) is
recommended to handle hot-reloads. Install it, and Go itself, and then run:

    $ cd api
    $ gin -p 3000 run main.go

Mac installation of go and gin:

    $ brew install go
    $ go get github.com/codegangsta/gin
