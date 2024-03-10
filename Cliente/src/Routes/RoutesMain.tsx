import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPrivate from "../Layout/NoPrivate";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Register from "../Pages/Register/Components/Register";

export default function RoutesMain() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoPrivate />}>
          <Route index element={<LandingPage />} />
          <Route path={"register"} element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
