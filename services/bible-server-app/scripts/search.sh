curl --user elastic:elastic123 -XGET --header 'Content-Type: application/json' 'http://localhost:9200/bible/_search?format=json&pretty' -d '{
  "_source": ["text", "book", "chapter", "verse", "verseID"],
  "size": 10,
  "query" : {
    "match" : { 
      "text": {
        "query": "god"
      }
    }
  }
}'