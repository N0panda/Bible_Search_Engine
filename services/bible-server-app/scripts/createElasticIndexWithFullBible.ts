import { readFile } from "fs/promises";
import { Client } from "@elastic/elasticsearch";
import { ELASTIC_URI, INDEX_NAME } from "./.config";

async function createElasticIndex(client: Client): Promise<void> {
  const bibleDataTemplate = {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0,
      analysis: {
        analyzer: {
          my_analyzer: {
            tokenizer: "standard",
            // filter: [
            //   "lowercase", "ngram"
            // ]
          },
        },
        // filter: {
        //   ngram: {
        //     type: "edge_ngram",
        //     min_gram: 1,
        //     max_gram: 20,
        //     token_chars: [
        //       "letter",
        //       "digit"
        //     ]
        //   }
        // }
      },
    },
    mappings: {
      properties: {
        verseID: { type: "keyword" },
        book: { type: "short" },
        chapter: { type: "short" },
        verse: { type: "short" },
        text: { type: "text" },
      },
    },
  };
  try {
    await client.indices.create({
      index: INDEX_NAME,
      wait_for_active_shards: "1",
      body: bibleDataTemplate,
    });
  } catch (err) {
    console.error(err);
  }
  console.log(`${INDEX_NAME} has been created`);
}

async function deleteElasticIndex(client: Client): Promise<void> {
  await client.indices
    .delete({
      index: INDEX_NAME,
    })
    .then(() => {
      console.log(`${INDEX_NAME} has been deleted`);
    })
    .catch((err) => {
      console.error("Index does not exist");
    });
}

async function fillElasticIndex(client: Client): Promise<void> {
  const data = JSON.parse(
    await readFile("./ressources/KJVBibleParsed.json", "utf8")
  );

  const body = await data.flatMap((doc: any) => [
    { index: { _index: "bible" } },
    doc,
  ]);
  await client
    .bulk({
      refresh: true,
      body: body,
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  console.log("Database correctly Filles !");
}

async function waitForUp(client: Client) {
  let connected = false;
  let attempt = 0;
  let error = null
  const maxAttempt = 10;
  while (attempt < maxAttempt) {
    connected = await client
      .ping(
        {},
        {
          requestTimeout: 2000,
          
        }
      )
      .then((res) => {
        return true;
      })
      .catch((err) => {
        attempt += 1;
        error = err;
        console.warn(`Trying to reconect => Attempts : [${attempt}/${maxAttempt}]`);
        return false
      });
    if (connected) {
      console.log("Client connected !");
      return {
        connected: true,
        error: null
      }
    } 
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  return {
    connected: false,
    error,
  }
}

async function setupElasticDb(): Promise<void> {
  const client = new Client({
    node: ELASTIC_URI,
  });

  const status = await waitForUp(client)
  if (!status.connected) {
    console.warn(status.error)
    return;
  }
  await deleteElasticIndex(client);
  console.log(`Creation of ${INDEX_NAME} ...`);
  await createElasticIndex(client);
  console.log("Filling Database ...");
  await fillElasticIndex(client);
}

setupElasticDb();
