import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SidePanel from "./components/layout/SidePanel";
import Home from "./components/Home";

import "./css/bootstrap.css";
import "./css/styles.css";

function App() {
  return (
    <BrowserRouter>
      <SidePanel />
      <Header />
      <div className="container-fluid">
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
