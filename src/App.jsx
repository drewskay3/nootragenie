import { Routes, Route, useParams } from "react-router-dom";
import NootraGenie from "./Quiz";
import { BlogList, ArticlePage } from "./Blog";
import articles from "./articles";

function ArticleWrapper() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  return <ArticlePage article={article} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NootraGenie />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<ArticleWrapper />} />
    </Routes>
  );
}
