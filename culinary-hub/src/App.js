import './App.css';
import NavBar from './component/Layout/NavBar';
import { Routes, Route } from "react-router-dom"
import FavoriteList from './component/Pages/FavoriteList';
import HomePage from './component/Pages/HomePage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/FavoriteList" element={<FavoriteList />} />
        <Route path="/" element={<HomePage />} />

      </Routes>
    </>


  );
}

export default App;
