import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";
import IndexPage from "./Components/pages/IndexPage";
import LoginPage from "./Components/pages/LoginPage";
import RegisterPage from "./Components/pages/RegisterPage";
import CreatePost from "./Components/pages/CreatePostPage";
import { UserContextProvider } from "./Components/context/UserContext";
import PostPage from "./Components/pages/PostPage";
import EditPostPage from "./Components/pages/EditPostPage";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path={"/create"} element={<CreatePost />} />
          <Route path={"/post/:id"} element={<PostPage />} />
          <Route path={"/edit/:id"} element={<EditPostPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="toast-message"
      />
    </UserContextProvider>
  );
}

export default App;
