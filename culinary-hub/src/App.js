import './App.css';
import NavBar from './component/Layout/NavBar';
import { Routes, Route } from "react-router-dom"
import FavoriteList from './component/Pages/FavoriteList';
import HomePage from './component/Pages/HomePage';
import Recipes from './component/Pages/Recipes';
import SignUp from './component/Pages/SignUp';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/FavoriteList" element={<FavoriteList />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Recipes" element={<Recipes />} />
        <Route path="/SignUp" element={<SignUp />} />

      </Routes>
    </>


  );
}

export default App;
