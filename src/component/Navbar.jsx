import React from 'react'
import { useContext } from 'react';
import { MemeUploaderContext } from '../context/MemeUploaderContext';
import { shortenAddress } from '../utils/shortenAddress'
import { Link } from 'react-router-dom';


const Navbar = () => {
  const { currentAccount,connectWallet }=useContext(MemeUploaderContext)
  return (
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
  <Link className="navbar-brand" to="/">
                MemeBazz
              </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
      <Link className="nav-link active" to="/addMeme">
                Add-Meme
              </Link>
        </li>
        <li class="nav-item">
        <Link className="nav-link active" to="/profile">
                Profile
              </Link>
        </li>
      </ul>
      {currentAccount?<p className='text-light mx-2' >Your Account : {shortenAddress(currentAccount)}</p>:<button class="btn btn-outline-primary mx-2" type="submit" onClick={connectWallet} >Connect Wallet</button>}
      

    </div>
  </div>
</nav>

  )
}

export default Navbar