import { Routes, Route, useParams } from "react-router-dom";
import NootraGenie from "./Quiz";
import { BlogList, ArticlePage, MethodologyPage, InteractionsIndex, InteractionDetail } from "./Blog";
import articles from "./articles";

function ArticleWrapper() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  return <ArticlePage article={article} />;
}

function InteractionWrapper() {
  const { slug } = useParams();
  return <InteractionDetail slug={slug} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NootraGenie />} />
      <Route path="/r/:code" element={<NootraGenie />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<ArticleWrapper />} />
      <Route path="/methodology" element={<MethodologyPage />} />
      <Route path="/interactions" element={<InteractionsIndex />} />
      <Route path="/interactions/:slug" element={<InteractionWrapper />} />
    </Routes>
  );
}
