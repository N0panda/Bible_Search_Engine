import React, { useState, useEffect } from 'react';
import "./searchBar.css";

export function SearchBar() {

  async function getData(text) {
    if (text.length < 1) return;

    const data = {
      data: text,
    }

    const queryResult = await fetch("http://localhost:5000/bible/search/searchInBible", {
      method: "POST",
      body: JSON.stringify(data),
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
    console.log(queryResult);
  }

  const data = [{ "name": "Nopanda" }, { "name": "Yespanda" }, { "name": "DoncTouchMyPanda" }]
  const ref = "https://www.google.com/"
  return (
    <div className="search" >
      <div className="searchInputs">
        <input
          type="text"
          onChange={(e) => getData(e.target.value)}
          name="search-bar"
          id="search-bar"
          placeholder="Search ..."
        />
        <div className="searchIcon">
          <img src="search-icone.png" alt="NA" />
        </div>
      </div>
      <div className="dataResult">
        {data.map((value, key) => {
          return <a className='dataItem' href={ref} target="_blank" rel="noreferrer">
            <p>{value.name}</p>
          </a>
        })}
      </div>
    </div>
  )
}