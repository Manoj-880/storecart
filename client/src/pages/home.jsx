import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate();

let onClick = () => {
  navigate('/login')
}

  return (
    <div>
      Home
      <button onClick={onClick}>Go to Login</button>
    </div>
  )
}

export default Home