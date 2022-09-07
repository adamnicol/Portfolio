import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SidePanel from "./components/layout/SidePanel";
import routes from "./routes";

import "./css/bootstrap.scss";
import "./css/styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SidePanel />
      <div className="container-fluid">
        <div className="row">
          <main className="col-xl-6">
            <Routes>
              {routes.map((route, i) => {
                return <Route key={i} path={route.path} element={route.main} />;
              })}
            </Routes>
          </main>
          <div className="col">
            <aside>
              <Routes>
                {routes.map((route, i) => {
                  return (
                    <Route key={i} path={route.path} element={route.aside} />
                  );
                })}
              </Routes>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
