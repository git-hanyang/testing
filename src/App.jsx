import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CreatePlanner from "./pages/CreatePlanner";
import { PlannerContext } from "./PlannerContext";
import { useState, createContext } from "react";
import { LoginStatus } from "./PlannerContext";
import Destination from "./pages/Destination";
//export const PlannerContext= createContext()

// function Random() {
//   return (
//     <div>
//       <h2>Random</h2>
//       <p>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
//         veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
//         commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
//         velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
//         occaecat cupidatat non proident, sunt in culpa qui officia deserunt
//         mollit anim id est laborum.
//       </p>
//     </div>
//   );
// }

function App() {

  const [plannerData,setPlannerData]=useState()
  const [isLoggedIn,setLoggedIn]=useState(false);

  return (
    <>
    <div className="App">
    <LoginStatus.Provider value={[isLoggedIn,setLoggedIn]}>
      <Header />
      <PlannerContext.Provider value={[plannerData,setPlannerData]}>
      
      <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/planner/create" element={<CreatePlanner/>} />
          <Route path="/login" element={<Login />} />
      </Routes>
      
      </PlannerContext.Provider> 
      </LoginStatus.Provider>
      <Footer />
    </div>
    
    </>
  );
}

export default App;
