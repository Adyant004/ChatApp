import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4 font-Reddit h-screen flex items-center justify-center">
        {/* <Login /> */}
        {/* <Signup /> */}
        <Home />
      </div>
    </>
  );
}

export default App;
