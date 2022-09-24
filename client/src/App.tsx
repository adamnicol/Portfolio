import { MainRoutes, AsideRoutes } from "./routes";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SidePanel from "./components/layout/SidePanel";

import "./css/bootstrap.scss";
import "./css/styles.scss";

function App() {
  return (
    <div>
      <Header />
      <SidePanel />
      <div className="container-fluid">
        <div className="row">
          <main className="col-xl-6">
            <MainRoutes />
          </main>
          <div className="col">
            <aside>
              <AsideRoutes />
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
