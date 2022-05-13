import { BibleInterface } from "../interfaces";
import { Client } from "@elastic/elasticsearch";

export async function matchUserQueryInDatabase(
  userQuery: string,
  indexName: string
): Promise<Array<BibleInterface>> {
  const client = new Client({
    node: process.env.ELASTIC_URI,
  });

  const response = await client
    .search(
      {
        index: indexName,
        _source: ["book", "chapter", "verse", "text"],
        size: 15,
        body: {
          query: {
            match_phrase: {
              text: userQuery,
            },
          },
        },
      },
      {
        ignore: [404],
        maxRetries: 3,
      }
    )
    .catch((err) => {
      // DEAL WITH ERRORS HERE
      throw err.stack;
    });
  if (response.body?.hits?.length < 0) return [];
  const result = await Promise.all(
    response.body.hits.hits.map(async (elem: any) => {
      return {
        book: elem._source.book,
        chapter: elem._source.chapter,
        verse: elem._source.verse,
        Text: elem._source.text,
      };
    })
  );
  client.close();
  return result;
}
