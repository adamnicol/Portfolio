import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import ViewPost from "./components/ViewPost";
import NewsFilters from "./components/NewsFilters";

export const main = (
  <Routes>
    <Route index element={<Home />} />
    <Route path="/news" element={<Home />} />
    <Route path="/news/:tag" element={<Home />} />
    <Route path="/news/post/:id" element={<ViewPost />} />
  </Routes>
);

export const aside = (
  <Routes>
    <Route index element={<NewsFilters />} />
    <Route path="/news" element={<NewsFilters />} />
    <Route path="/news/:tag" element={<NewsFilters />} />
    <Route path="/news/post/:id" element={<NewsFilters />} />
  </Routes>
);
