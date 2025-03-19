import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignupSignin from "./SignupSignin";
import Home from "./Home";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupSignin />} />
      </Routes>
    </Router>
  );
}
