// https://eth-ropsten.alchemyapi.io/v2/DSkw3Gojqk-P4Nx9_qOFEHw1ak6penX_
// npx hardhat run scripts/deploy.js --network ropsten
// 0x68A83Bb1EFF03e88d3420BDA65A222827AB109D6
require('@nomiclabs/hardhat-waffle');

module.exports={
  solidity:'0.8.0',
  networks:{
    ropsten:{
      url:"https://eth-ropsten.alchemyapi.io/v2/DSkw3Gojqk-P4Nx9_qOFEHw1ak6penX_",
      accounts:['556b53000281cc25e14fc12c743fdf97a21de17e58e19cf63f39807d6a465bba']
    }
  }
}