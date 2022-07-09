import React,{useEffect, useState} from 'react'
import { useContext } from 'react';
import { MemeUploaderContext } from '../context/MemeUploaderContext';
import { Link } from 'react-router-dom';

const Comments=({item})=>{
  return (
    <>
    {item.map((i)=><>
    <ul class="list-group">
    <li class="list-group-item">Amount : {i.amount}Eth <br />By : {i.username} <br />Message : {i.message}</li>
    </ul>
    </>)}
    
    </>
  )
}

const SingleMeme=({img})=>{
  const [donar,setDonar]=useState(false)
  const {transactions}=useContext(MemeUploaderContext)
  const [damta,setDamta]=useState({})
  async function fetchData() {
    let response = await fetch(`https://ipfs.infura.io/ipfs/${img.imgHash}`);
    let data=await response.json()
    setDamta(data)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const filteredTransactions=transactions.filter(item=>item.username===damta.username)
  return(
    <>
    <div class="col">
    <div class="card shadow-sm">
      <img src={damta.image} class="img-thumbnail" height="100" alt="..."></img>

      <div class="card-body">
        <a href={`https://ropsten.etherscan.io/address/${damta.account}`}><p><b>Uploaded By :</b> { damta.username}</p></a>
        <p class="card-text">Description : {damta.desc}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <Link className="btn btn-sm btn-outline-secondary" to={`/tip/${damta.username}/${damta.account}`}>
                Tip
              </Link>
          </div>
          <small class="text-muted"><b>Timestamp : {img.timestamp}</b></small>
        </div>
        <button type="button" class="btn btn-primary mt-2" onClick={()=>setDonar(!donar)} >Donars</button>
      </div>
      {donar && <Comments item={filteredTransactions} /> }
    </div>
    
  </div>
  
  </>
  )
}

const Memes = () => {
  const { imgs,imgCount,transactions}=useContext(MemeUploaderContext)
  return (
    <>
    <h1>{imgCount}</h1>
    <div class="container my-4">

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
  {imgs.slice(0).reverse().map((img,i)=>(<SingleMeme img={img} key={i} />))}
</div>
</div>
    </>
  )
}

export default Memes