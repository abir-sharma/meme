import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'

export const MemeUploaderContext=React.createContext()
const { ethereum } = window

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const MemeUploaderContract = new ethers.Contract(contractAddress, contractABI, signer)
    return MemeUploaderContract
}
export const MemeUploaderProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("")
    const [blockHash,setBlockHash]=useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [imgCount, setImgCount] = useState(localStorage.getItem('imgCount'))
    const [imgs,setImgs]=useState([])
    const [formData,setFormData]=useState({username:"",addressTo:"",amount:"",message:""})
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [transactions,setTransactions]=useState([])
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                setCurrentAccount(accounts[0])
                getImages()
                getAllTransactions()
            }
            else {
                console.log("No accounts found")
            }

        } catch (error) {
            throw new Error("No ethereum object")
        }

    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            setCurrentAccount(accounts[0])
            window.reload()
        } catch (error) {
            throw new Error("No ethereum object")
        }
    }

    const addImagesToBlockchain=async()=>{
        try {
            if (!ethereum) return alert("Please install metamask")
            const memeUploaderContract = getEthereumContract()
            const imguploadhash = await memeUploaderContract.addImagesToBlockchain(blockHash)

            
            setIsLoading(true)

            console.log(`Loading - ${imguploadhash.hash}`)
            await imguploadhash.wait()
            setIsLoading(false)
            console.log(`Success - ${imguploadhash.hash}`)
            window.reload()

        } catch (error) {
            console.log(error)
        }
    }

    const getImages=async()=>{
        try {
            if (!ethereum) return alert("Please install metamask")
            const memeUploaderContract = getEthereumContract()

            const iamgs = await memeUploaderContract.getImages()
            const structuredImags=iamgs.map((image)=>({
                imgHash:image.hash,
                timestamp:new Date(image.timeOfUpload.toNumber() * 1000).toLocaleString()
            }))
            setImgs(structuredImags)
            
        } catch (error) {
            console.log(error)
        }
    }

    const checkIfTransactionExist = async () => {
        try {
            const memeUploaderContract = getEthereumContract()
            const imgsCount = await memeUploaderContract.getImageCount()
            const tCount=await memeUploaderContract.getTransactionsCount()
            localStorage.setItem("imgCount", imgsCount);
            localStorage.setItem("tCount",tCount)
        }
        catch (error) {
            throw new Error("No ethereum object")

        }
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const memeUploaderContract = getEthereumContract()

            const availableTransactions = await memeUploaderContract.getAllTransactions()
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo:transaction.reciever,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                username:transaction.username,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))
            setTransactions(structuredTransactions)
        }
    
        catch (error) {
            console.log(error)
        }
    }

    const addTransactionToBlockchain = async () => {

        try {
            if (!ethereum) return alert("Please install metamask")
            const { username,amount,addressTo,message } = formData
            console.log(formData,"vf")
            const memeUploaderContract = getEthereumContract()
            const parsedAmount = ethers.utils.parseEther(amount)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 GWEI
                    value: parsedAmount._hex, //0.00001
                }]
            })
            const transactionHash = await memeUploaderContract.addTransactionToBlockchain(addressTo, parsedAmount,message,username)
            setIsLoading(true)

            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait()
            setIsLoading(false)
            console.log(`Success - ${transactionHash.hash}`)
            const transactionsCount = await memeUploaderContract.getTransactionsCount()
            setTransactionCount(transactionsCount.toNumber())
            window.reload()

        } catch (error) {
            throw new Error("No ethereum object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
        checkIfTransactionExist()
    }, [])
    return (
        <MemeUploaderContext.Provider value={{getEthereumContract,currentAccount,connectWallet,addImagesToBlockchain,blockHash,setBlockHash,imgCount,isLoading,imgs,setFormData,formData,transactionCount,transactions,addTransactionToBlockchain,getAllTransactions}}>
            {children}
        </MemeUploaderContext.Provider>
    )
}