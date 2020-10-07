# Automat API

## Terminology

Slot: zone on the page and also one or more tests associated with it.

Test: an MVT test or configuration belonging to a slot. Tests contain filters
and variants as well as other metadata. An example test might be: 'Show welcome
message to new users and an onwards component for other users for the Body End
slot.'

Filter: a boolean function that is used to narrow page views for a test. E.g.
representing rules like 'only use this test for signed in usere', or 'run this
test against pages with a football tag only'.

Variant: a

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
