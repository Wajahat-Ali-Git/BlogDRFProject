import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import PostDetails from "./pages/PostDetails";
import Posts from "./pages/Posts";
import { Signup } from "./pages/Signup";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/"></Route>
      <Route element={<Login />} path="/login"></Route>
      <Route element={<Signup />} path="/signup"></Route>
      <Route element={<Posts />} path="/posts" />
      <Route element={<PostDetails />} path="/posts/post-detail" />
    </Routes>
  );
}

export default App;
