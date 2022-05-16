# Bible Search Engine

## About / Synopsis

### This projet is a search engine for the bible, you can search for words and it will return you matchs with the Book, Chapter, Verse numbers and the corresponding text as a link to the full chapter.

## Tech Stack

* FRONT END   =>    React / Node.js / HTML / CSS
* BACK END    =>    Node.js 
* DATABASE    =>    ELK (Elasticsearch: database; Kibana: elastic interface)
* BUILD       =>    Shell script / Docker



# Usage

There are 2 differents branches on the repo that can be build the project :

## develop
(*On this branch all npm packages will be locally installed then mounted on the container so you can directly modify the code in the container by modify your code locally.*) 

**[Requirements]**
  * Node v16 
  * Docker

**[Build]**
  > sh setup.sh  

## automatize-01 (Prefer to use this branch for stability purpose)
(*On this branch all packages are installed in containers, no volumes are used*)  

**[Requirements]**
  * Docker

**[Build]**
  > sh setup.sh  


