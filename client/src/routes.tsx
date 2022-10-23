import { useRoutes } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import NewsFeed from "./components/news/NewsFeed";
import NewsFilters from "./components/news/Filters";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectFilters from "./components/projects/Filters";
import ViewPost from "./components/news/ViewPost";

export function MainRoutes() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/news", element: <NewsFeed /> },
    { path: "/news/:slug", element: <ViewPost /> },
    { path: "/about", element: <About /> },
    { path: "/projects", element: <Projects /> },
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
