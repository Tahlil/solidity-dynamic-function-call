const privateKeyToAddress = require('@celo/utils/lib/address').privateKeyToAddress
require('dotenv').config()

// 1. Import web3 and contractkit 
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')

// 2. Init a new kit, connected to the alfajores testnet
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

function readJsonFile(file) {
    let bufferData = fs.readFileSync(file)
    let stData = bufferData.toString()
    let data = JSON.parse(stData)
    return data
}


const Greeter = require('../abi/contracts/Greeter.sol/Greeter.json')

// Initialize a new Contract interface
async function initContract(){
    // Check the Celo network ID
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Greeter.networks[networkId];
    const deployInfo = readJsonFile("deplpoyedAddress.json");
    // Create a new contract instance with the Greeter contract info
    let instance = new web3.eth.Contract(
        Greeter.abi,
        deployInfo.address
    );

    get(instance)
    set(instance, 1)
}

// Read the 'name' stored in the Greeter.sol contract
async function get(instance){
    let name = await instance.methods.get().call()
    console.log(name)
}

// Set the 'name' stored in the Greeter.sol contract
async function set(instance, newName){

    // Add your account to ContractKit to sign transactions
    // This account must have a CELO balance to pay tx fees, get some https://celo.org/build/faucet
    kit.connection.addAccount(process.env.PRIVATE_KEY)
    const address = privateKeyToAddress(process.env.PRIVATE_KEY)

    // Encode the transaction to Greeter.sol according to the ABI
    let txObject = await instance.methods.set(newName)
    
    // Send the transaction
    let tx = await kit.sendTransactionObject(txObject, { from: address })

    let receipt = await tx.waitReceipt()
    console.log(receipt)
}

initContract()