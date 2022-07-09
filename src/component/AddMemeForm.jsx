import React from 'react'
import { useState } from 'react';
import { create } from 'ipfs-http-client'
import { useContext } from 'react';
import { MemeUploaderContext } from '../context/MemeUploaderContext';
import Loader from '../component/loader/Loader'
// 0xD2c2A06faA94882eF915479D2b4733892b752B5d
import { Link } from 'react-router-dom';

const client = create('https://ipfs.infura.io:5001/api/v0')

const AddMemeForm = () => {
  const { addImagesToBlockchain, isLoading, setBlockHash,currentAccount } = useContext(MemeUploaderContext)
  const [username, setUsername] = useState(``)
  const [desc, setDesc] = useState(``)
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      const content = {
        "username":username,
        "account": currentAccount,
        "desc": desc,
        "image": url,
      }
      const jsonContent = JSON.stringify(content)
      const damta = await client.add(jsonContent)
      setBlockHash(damta.path)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  
  async function addContent() {
    addImagesToBlockchain()
  }
  return (
    <>
      <div class="modal modal-sheet position-static d-block bg-secondary py-5 " tabIndex="-1" role="dialog" id="modalSheet">
        <div class="modal-dialog" role="document">
          <div class="modal-content rounded-6 shadow">
          <div class="modal-header border-bottom-0">
              <h5 class="modal-title">Modal title</h5>
              <Link to="/">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></Link>
            </div>
            <div class="modal-body py-0">
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Username</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                  <div id="emailHelp" class="form-text"></div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Small Description</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    name='desc'
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                  />
                  <div id="emailHelp" class="form-text"></div>
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label"></label>
                  <input class="form-control" type="file" id="formFile"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            {isLoading && <Loader />}
            <div class="modal-footer flex-column border-top-0">
              <button type="button" class="btn btn-lg btn-primary w-100 mx-0 mb-2" onClick={addContent} >Upload</button>
              <Link to="/" >
              <button type="button" class="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal">Cancel</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddMemeForm