import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Bible from "./pages/students/Bible";
import Timetable from "./pages/students/Timetable";
import Documents from "./pages/students/Documents";
import Scheme from "./pages/students/Scheme";

import Faq from "./pages/abiturient/faq";
import Card from "./pages/abiturient/Card"

import Info from "./pages/about/info";
import SocialLinks from "./pages/about/SocialLinks";

import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Header />

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students/bible" element={<Bible />} />
            <Route path="/students/timetable" element={<Timetable />} />
            <Route path="/students/documents" element={<Documents />} />
            <Route path="/students/studcity" element={<Scheme />} />

            <Route path="/abiturient/faq" element={<Faq/>}/>
            <Route path="/abiturient/card" element={<Card/>}/>

            <Route path="/about/info" element={<Info/>}/>
            <Route path="/about/sociallinks" element={<SocialLinks/>}/>

            <Route path="*" element={<h1>404 — Страница не найдена</h1>} />

            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;