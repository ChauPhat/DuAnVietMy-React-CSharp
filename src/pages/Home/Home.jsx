import React, {useState} from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExloreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {

  const [category,setCategory] = useState("All");
 
  return (
    <div>Home
      <Header/>
      <ExloreMenu  category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  )
}

export default Home