import React from 'react'
import './home.scss'
import List from '../Components/list/List'
import NavBar from '../Components/nav/NavBar'
import Featured from '../Components/featured/Featured'


const Home = () => {
  return (
    <div className='home'>  
      <NavBar />
      <Featured />
      <List />
      <List />
      <List />
    </div>
  )
}

export default Home