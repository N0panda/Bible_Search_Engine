import React, { useState } from 'react';

export function SearchBar() {
  const [text, setText] = useState('')
  return (
      <div className = "search" >
      <input
        type="text"
        name="search-bar"
        id="search-bar"
        placeholder="Search ..."
      />
      </div>
  )
}