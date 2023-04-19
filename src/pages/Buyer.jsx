import React from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';

const Buyer = () => {
    const role = window.localStorage.getItem('role');
  return (
    <div>
        <Navbar role={role} />
    </div>
  )
}

export default Buyer