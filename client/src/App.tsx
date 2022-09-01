import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SidePanel from "./components/layout/SidePanel";
import Home from "./components/Home";

import "./css/bootstrap.scss";
import "./css/styles.scss";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/about", component: undefined },
  { path: "/projects", component: undefined },
  { path: "/contact", component: undefined },
  { path: "/login", component: undefined },
];

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
                return (
                  <Route key={i} path={route.path} element={route.component} />
                );
              })}
            </Routes>
          </main>
          <div className="col">
            <aside className="position-fixed" />
          </div>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
