import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoPrivate from "../Layout/NoPrivate";
import LandingPage from "../Pages/LandingPage/LandingPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoPrivate />}>
          <Route index element={<LandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
