const ContractKit = require('@celo/contractkit')
const Web3 = require('web3')
require('dotenv').config()

const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

kit.connection.addAccount(process.env.PRIVATE_KEY)