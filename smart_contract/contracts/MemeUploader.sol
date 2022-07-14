// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract MemeUploader {
    uint256 imgCount;
    uint256 transactionsCount;

    struct ImageUploadStruct {
        string hash;
        uint256 timeOfUpload;
    }

    event Transfer(address from,address reciever,uint amount,string message,string username,uint256 timestamp);

    struct TransferStruct {
        address sender;
        address reciever;
        uint amount;
        string message;
        string username;
        uint256 timestamp;
    }
    TransferStruct[] transactions;
    ImageUploadStruct[] images;
    function addTransactionToBlockchain(address payable receiver,uint amount,string  memory message,string memory username) public {
        transactionsCount+=1;
        transactions.push(TransferStruct(msg.sender,receiver,amount,message,username,block.timestamp));
        emit Transfer(msg.sender,receiver,amount,message,username,block.timestamp);
    }
    function addImagesToBlockchain(string memory hash) public {
        imgCount+=1;
        images.push(ImageUploadStruct(hash,block.timestamp));
    }
    function getImages() public view returns (ImageUploadStruct[] memory) {
        return images;
    }
    function getImageCount() public view returns (uint256) {
        return imgCount;
    }
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }
    function getTransactionsCount() public view returns (uint256) {
        return transactionsCount;
    }
}   