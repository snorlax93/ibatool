import Layout from "./Pages/Layout";
import NoPage from "./Pages/NoPage";

import Home from "./Pages/Home";
import Episodes from "./Pages/Episodes";
import Topics from "./Pages/Topics";
import PageC from "./Pages/PageC";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="episodes" element={<Episodes />} />
          <Route path="topics" element={<Topics />} />
          <Route path="Users" element={<PageC />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
