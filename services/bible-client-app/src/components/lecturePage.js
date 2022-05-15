import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./lecturePage.css";

export function ReadChapter() {
  const location = useParams();
  const { book, chapter, verse } = location
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  function getAllCorrespondingChapters(book, chapter) {
    if (!chapter || !book) return;

    const payload = {
      data: {
        book,
        chapter,
      }
    }

    fetch("http://localhost:5000/bible/search/searchAllVerses", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      }
    }).then((response) => {
      if (response.ok) return response.json()
      throw new Error("no bad query")
    })
      .then((responseData) => {
        setData(responseData.data);
      })
      .catch((error) => {
        setError(error)
      });
  }

  let navigate = useNavigate();

  const handleError = () => {
    if (error) navigate("/error")
      console.log(error)
  }

  useEffect(() => {
    getAllCorrespondingChapters(book, chapter)
  }, [book, chapter])

  useEffect(() => {
    handleError()
  })


  return (
    <div className='lecturePage'>
      <h1 className='title'>Bible Book {book}, Chapter {chapter}</h1>
      <div className='fullChapter'>
        {data.map((value, key) => {
          if (parseInt(verse) === value.verse) return <p className='choosenVerse'>[{value.verse}] {value.text}</p>
          return <p>[{value.verse}] {value.text}</p>
        })}
      </div>
    </div>
  )
}