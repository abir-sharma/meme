import React from 'react'
import { useContext } from 'react';
import { MemeUploaderContext } from '../context/MemeUploaderContext';
import { useLocation, useParams } from 'react-router-dom';
import Loader from './loader/Loader'
import { Link } from 'react-router-dom';

const PaymentForm = () => {
  const {username,account}=useParams()
  const { setFormData,formData,addTransactionToBlockchain,isLoading }=useContext(MemeUploaderContext)
  function handleChange(e){
    setFormData({...formData,[e.target.name]:e.target.value,["username"]:username,["addressTo"]:account})
  }
  function submit(){
    addTransactionToBlockchain()
  }
  return (
      <>
   <div class="modal modal-sheet position-static d-block bg-secondary py-5 " tabindex="-1" role="dialog" id="modalSheet">
  <div class="modal-dialog" role="document">
    <div class="modal-content rounded-6 shadow">
      <div class="modal-header border-bottom-0">
        <h5 class="modal-title">Modal title</h5>
        <Link to="/" ><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></Link>
      </div>
      <div class="modal-body py-0">
      <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Amount</label>
    <input type="float" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    placeholder='Amount (ETH)' name='amount' onChange={handleChange}
    />
    <div id="emailHelp" class="form-text"></div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Message</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    placeholder='Enter Message' name='message' onChange={handleChange}
    />
    <div id="emailHelp" class="form-text"></div>
  </div>
  {isLoading?<Loader />:<div class="modal-footer flex-column border-top-0">
        <button type="button" class="btn btn-lg btn-primary w-100 mx-0 mb-2" onClick={submit}>Send</button>
        <Link to="/"><button type="button" class="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal">Cancel</button></Link>
      </div>}
</form>
      </div>
      
    </div>
  </div>
</div>
      </>
  )
}

export default PaymentForm