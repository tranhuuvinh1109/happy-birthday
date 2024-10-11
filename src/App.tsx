
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import "./App.css";
import Layout from "./components/Layout";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
