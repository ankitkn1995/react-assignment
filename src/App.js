/** @format */
import "./App.css";
import Register from "./auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./component/Home";
import Header from "./component/Header";
import ProtectRoute from "./auth/protectRoute";
import { useSelector } from "react-redux";
import AddAndEditUser from "./crud/AddAndEditUser";
import UserInfo from "./component/UserInfo";

function App() {
  const user = useSelector((state) => state);
  console.log(user);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/:id' element={<UserInfo />} />
        <Route path='/editUser/:id' element={<AddAndEditUser />} />
        <Route
          path='register'
          element={
            <ProtectRoute>
              <Register />
            </ProtectRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectRoute>
              <Login />
            </ProtectRoute>
          }
        />
        <Route path='/addUser' element={<AddAndEditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
