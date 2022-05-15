import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css"
import { ErrorPage } from "./components/error";
import { ReadChapter } from "./components/lecturePage"
import { SearchPage } from "./components/searchPage";



export default function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route path="/" element={<Navigate to="/search" />}/>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/lecture/:book/:chapter/:verse" element={<ReadChapter />} />
            <Route path="*" element={<Navigate to="/search" />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}