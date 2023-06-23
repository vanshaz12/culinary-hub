import './App.css';
import NavBar from './component/Layout/NavBar';
import { Routes, Route } from "react-router-dom"
import FavoriteList from './component/Pages/FavoriteList';
import HomePage from './component/Pages/HomePage';
import Recipes from './component/Pages/Recipes';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/FavoriteList" element={<FavoriteList />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Recipes" element={<Recipes />} />

      </Routes>
    </>


  );
}

export default App;
