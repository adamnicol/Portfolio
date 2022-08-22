import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./css/bootstrap.min.css";
import "./css/style.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" />
          <Route path="/projects" />
          <Route path="/contact" />
          <Route path="/login" />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
