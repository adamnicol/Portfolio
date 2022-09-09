import { BrowserRouter } from "react-router-dom";
import { main, aside } from "./routes";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SidePanel from "./components/layout/SidePanel";

import "./css/bootstrap.scss";
import "./css/styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SidePanel />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6">
            <main>{main}</main>
          </div>
          <div className="col">
            <aside>{aside}</aside>
          </div>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
