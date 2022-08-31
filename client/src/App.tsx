import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SidePanel from "./components/layout/SidePanel";
import Home from "./components/Home";

import "./css/bootstrap.scss";
import "./css/styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SidePanel />
      <main className="container-fluid main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" />
          <Route path="/projects" />
          <Route path="/contact" />
          <Route path="/login" />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
