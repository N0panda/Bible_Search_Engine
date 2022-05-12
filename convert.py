import json
import pandas as pd

with open("./KJV_bible.json") as f:
  data = json.load(f)

def createDictionary(elem):
  ### elem is a list of length 5
  # elem[0] ==> Verse ID
  # elem[1] ==> Book
  # elem[2] ==> Chapter
  # elem[3] ==> Verse
  # elem[4] ==> plain text

  structuredElement = {
    "verse_ID": elem[0],
    "book": elem[1],
    "chapter": elem[2],
    "verse": elem[3],
    "text": elem[4]
  }
  return structuredElement


data = data["resultset"]["row"]
dataFormated = []
for elem in data:
  dataFormated.append(createDictionary(elem["field"]))

bible = pd.DataFrame(dataFormated)
print(bible)