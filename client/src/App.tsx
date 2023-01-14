import { ErrorBoundary, ErrorFallback } from "./components";
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
        <ErrorBoundary fallback={<ErrorFallback />}>
          <div className="row">
            <main className="col-xl-8 content">
              <MainRoutes />
            </main>
            <div className="col">
              <aside>
                <ErrorBoundary>
                  <AsideRoutes />
                </ErrorBoundary>
              </aside>
            </div>
          </div>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}

export default App;
