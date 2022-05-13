import { readFile } from 'fs/promises';
import { Client } from "@elastic/elasticsearch";
import { ELASTIC_URI, INDEX_NAME } from "./.config";

async function createElasticIndex(client: Client): Promise<void> {
  const bibleDataTemplate = {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0,
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
    await client.indices
    .create({
      index: INDEX_NAME,
      wait_for_active_shards: "1",
      body: bibleDataTemplate,
    })
  } catch (err) {
    console.error(err)
  }
  console.log(`${INDEX_NAME} has been created`)
}

async function deleteElasticIndex(client: Client): Promise<void> {
    await client.indices.delete({
      index: INDEX_NAME
    }).then(() => {
      console.log(`${INDEX_NAME} has been deleted`)
    }).catch((err) => {
      console.error("Index does not exist")
    })
}

async function fillElasticIndex(client: Client): Promise<void> {

  const data = JSON.parse(await readFile("./ressources/KJVBibleParsed.json", "utf8"));
  
  for (const elem of data) {
    await client.index({
      index: "bible",
      refresh: "true",
      body: elem
    }).then((res) => {
      // console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  
  // await client.index({
  //   index: "bible",
  //   refresh: "true",
  //   body: data[0]
  // }).then((res) => {
  //   console.log(res)
  // }).catch((err) => {
  //   console.log(err)
  // })
}

async function setupElasticDb(): Promise<void> {
  const client = new Client({
    node: ELASTIC_URI,
  });

  await deleteElasticIndex(client);
  console.log(`Creation of ${INDEX_NAME} ...`)
  await createElasticIndex(client);
  await fillElasticIndex(client)
}

setupElasticDb();
