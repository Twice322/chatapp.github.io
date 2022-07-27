import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthProvider from "./firebase/components/AuthContext";
import "./styles/_antd.scss";
import "./styles/_adaptive.scss";

const App = () => {
  return (
    <AuthProvider>
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route exact path="*" element={<Auth />} />
            <Route path="Chat-App/im" element={<Home />} />
            <Route path="Chat-App/im/:id" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};
export default App;
