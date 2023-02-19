import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ProjectFilters from "./pages/projects/Filters";
import Projects from "./pages/projects/ProjectList";
import { About, Experience, SkillList } from "./pages";
import { Article, News, NewsFilters } from "./pages/news";
import { useRoutes } from "react-router-dom";

export function MainRoutes() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/news", element: <News /> },
    { path: "/news/:slug", element: <Article /> },
    { path: "/about", element: <About /> },
    { path: "/projects", element: <Projects /> },
    { path: "/experience", element: <Experience /> },
    { path: "/contact", element: <Contact /> },
  ]);
}

export function AsideRoutes() {
  return useRoutes([
    { path: "/", element: <NewsFilters /> },
    { path: "/news/*", element: <NewsFilters /> },
    { path: "/projects/*", element: <ProjectFilters /> },
    { path: "/experience/*", element: <SkillList /> },
  ]);
}
