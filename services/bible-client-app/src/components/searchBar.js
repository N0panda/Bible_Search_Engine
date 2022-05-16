import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./searchBar.css";

function getFormatedDigit(value){
  const converted = String(value);

  if (converted.length < 2) return "0" + converted
  return converted
}

function isMatching(toMatch, needleTab) {
  for (let i = 0; i < needleTab.length; i +=1) {
    if (toMatch.toLowerCase() === needleTab[i].toLowerCase()) return true;
  }
  return false;
}

function buildRegexString(needle) {
  const tab = needle.split(" ")
  let result = ""
  for (let i=0; i<tab.length; i+=1) {
    result += tab[i];
    if (i + 1 < tab.length && tab[i].replace(/[ ]*/g, "").length > 0) result += "|"
  }
  return result
}

function getHilightMatch(haystack, needle) {
  const regex = buildRegexString(needle)
  return haystack.replace(/[-_.?,;:]+/g, "").split(new RegExp(`(${regex})`, `gi`)).map((piece, index) => {
    return (
      <span
        key={index}
        style={{
          background:
            isMatching(piece, needle.split(" "))
              ? "#DF9DFC"
              : "TRANSPARENT",
          borderRadius: "6px",
        }}
      >
        {piece}
      </span>
    )
  })
}

export function SearchBar() {

  const [data, setData] = useState([])
  const [unserInput, setUserInput] = useState("")

  async function getData(text) {
    let payload = { data: text }
    if (text.length < 1) payload = { data: " " }

    const queryResult = await fetch("http://localhost:5000/bible/search/searchInBible", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      }
    }).then((response) => response.json())
      .then((responseData) => {
        return responseData.data;
      })
      .catch((error) => {
        console.warn(error)
        return null
      });
    setData(queryResult)
  }

  const onchangeHandler = (data) => {
    getData(data)
    setUserInput(data);
  }

  return (
    <div className="search" >
      <div className="searchInputs">
        <input
          type="text"
          onChange={(e) => onchangeHandler(e.target.value)}
          name="search-bar"
          id="search-bar"
          placeholder="Search ..."
        />
        <div className="searchIcon">
          <img src="search-icone.png" alt="NA" />
        </div>
      </div>
      <div className="dataResult">
        <div className='dataLegend'>
          <p className='bookLegend'>Book</p>
          <p className='chapterLegend'>Chapter</p>
          <p className='verseLegend'>Verse n°</p>
          <p className='textLegend'> Verse text</p>
        </div>
        <div className='dataItemsContainer'>
          {data.map((value, key) => {
            const uniqueKey = `uniqueKey${key}`;
            return <Link key={uniqueKey} className='dataItem' to={{
            pathname: `/lecture/${value.book}/${value.chapter}/${value.verse}`
          }} state="{value}" target="_blank">
            <div className='dataItemContent'>
              <p className='book'>{getFormatedDigit(value.book)}</p>
              <p className='chapter'>{getFormatedDigit(value.chapter)}</p>
              <p className='verse'>{getFormatedDigit(value.verse)}</p>
              <p className='text'>{ getHilightMatch(value.text, unserInput)}</p>
            </div>
          </Link>
        })}
        </div>
      </div>
    </div>
  )
}