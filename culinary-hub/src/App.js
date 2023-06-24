import './App.css';
import NavBar from './component/Layout/NavBar';
import { Routes, Route } from "react-router-dom"
import FavoriteList from './component/Pages/FavoriteList';
import HomePage from './component/Pages/HomePage';
import Recipes from './component/Pages/Recipes';
import SignUp from './component/Pages/SignUp';
import Login from './component/Pages/LogIn';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/FavoriteList" element={<FavoriteList />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Recipes" element={<Recipes />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<Login />} />
      </Routes>
    </>


  );
}

export default App;
