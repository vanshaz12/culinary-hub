import './App.css'
import NavBar from './component/Layout/NavBar'
import { Routes, Route } from "react-router-dom"
import FavoriteList from './component/Pages/FavoriteList'
import HomePage from './component/Pages/HomePage'
import Recipes from './component/Pages/Recipes'
import SignUp from './component/Pages/SignUp'
import Login from './component/Pages/LogIn'
import RecipeDetails from './component/Pages/RecipeDetails'
import Instructions from './component/Pages/Instructions'
import ListItemDetails from './component/Pages/ListContent'

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
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/recipes/:id/instructions" element={<Instructions />} />
        <Route path="/list/:id" element={<ListItemDetails />} />

      </Routes>
    </>


  )
}

export default App
