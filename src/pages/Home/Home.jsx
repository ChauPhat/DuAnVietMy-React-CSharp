import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExloreMenu from '../../components/ExploreMenu/ExploreMenu'

const Home = () => {

  const [category,setCategory] = useState("All");
 
  return (
    <div>Home
      <Header/>
      <ExloreMenu  category={category} setCategory={setCategory} />
    </div>
  )
}

export default Home