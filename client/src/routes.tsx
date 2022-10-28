import { useRoutes } from "react-router-dom";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import News from "./pages/news/NewsFeed";
import NewsFilters from "./pages/news/Filters";
import Projects from "./pages/projects/ProjectList";
import ProjectFilters from "./pages/projects/Filters";
import ViewPost from "./pages/news/ViewPost";

export function MainRoutes() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/news", element: <News /> },
    { path: "/news/:slug", element: <ViewPost /> },
    { path: "/about", element: <About /> },
    { path: "/projects", element: <Projects /> },
    { path: "/contact", element: <Contact /> },
    { path: "/login", element: <Login /> },
  ]);
}

export function AsideRoutes() {
  return useRoutes([
    { path: "/", element: <NewsFilters /> },
    { path: "/news/*", element: <NewsFilters /> },
    { path: "/projects/*", element: <ProjectFilters /> },
  ]);
}
