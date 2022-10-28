import { MainRoutes, AsideRoutes } from "./routes";

import Header from "./pages/layout/Header";
import Footer from "./pages/layout/Footer";
import SidePanel from "./pages/layout/SidePanel";

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
