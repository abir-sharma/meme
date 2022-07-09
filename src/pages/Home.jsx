import React, { useState,useEffect } from 'react'
import Memes from '../component/Memes'
// import StripeCheckout from 'react-stripe-checkout' 
// import axios from 'axios'

const Home = () => {
  // const [u,setUserD]=useState([])
  // const [product]=useState({
  //   name:"sample game",
  //   price:"200",
  //   description:"this is sample game"
  // })
  // function handleToken(token,addresses){
  //   console.log(token,addresses)
  // }
  // useEffect(() => {
  //   const userDetails=async()=>{
  //     const res=await axios.get("/posts")
  //     setUserD(res.data)
  //   }
  //   userDetails()
  // }, [])
  // console.log(u.posts,"abirded")
  // useEffect(()=>{
  //   const login=async()=>{
  //     const res=await axios.post("/login",{
  //       "email":"sa1@gmail.com",
  //       "password":"123"
  //     })
  //     console.log(res.data,"amber")
  //   }
  //   login()
  // },[])
  return (
      <>
      <Memes />
      </>
  )
}

export default Home