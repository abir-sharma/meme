const main = async ()=> {
  const MemeUploader = await hre.ethers.getContractFactory("MemeUploader");
  const memeUploader = await MemeUploader.deploy();
  // 0xFEdFC5b240B6c2AFf906D1A1d7FFdE28E24e5187
  await memeUploader.deployed();

  console.log("MemeUploader deployed to:", memeUploader.address);
}

const runMain=async ()=>{
  try{
      await main();
      process.exit(0);
  }
  catch (error){
      console.error(error);
      process.exit(1);
  }
}

runMain();
