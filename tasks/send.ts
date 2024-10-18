import { BigNumber } from 'ethers'
import { hexZeroPad } from 'ethers/lib/utils'
import { task, types } from 'hardhat/config'
import { ActionType, HardhatRuntimeEnvironment } from 'hardhat/types'

// struct SendParam {
//     uint32 dstEid; // Destination endpoint ID.
//     bytes32 to; // Recipient address.
//     uint256 amountLD; // Amount to send in local decimals.
//     uint256 minAmountLD; // Minimum amount to send in local decimals.
//     bytes extraOptions; // Additional options supplied by the caller to be used in the LayerZero message.
//     bytes composeMsg; // The composed message for the send() operation.
//     bytes oftCmd; // The OFT command to be executed, unused in default OFT implementations.
// }

interface TaskArguments {
    dstEid: number
    amount: string
    to: string
    contractName: string
}

const action: ActionType<TaskArguments> = async (
    { dstEid, amount, to, contractName },
    hre: HardhatRuntimeEnvironment
) => {
    const signer = (await hre.ethers.getSigners())[0]
    const Oft = await hre.deployments.get(contractName)
    const oft = await hre.ethers.getContractAt(Oft.abi, Oft.address, signer)

    // approve the amount to be sent adapters only
    if (hre.network.name.startsWith('ethereum')) {
        const erc20Token = await hre.ethers.getContractAt('IERC20', (await oft.functions.token())[0])
        const approvalTxResponse = await erc20Token.approve(oft.address, amount)
        const approvalTxReceipt = await approvalTxResponse.wait()
        console.log(`approved: ${amount}: ${approvalTxReceipt.transactionHash}`)
        console.log('balance: ', (await erc20Token.balanceOf(signer.address)).toString())
    } else {
        console.log('balance: ', (await oft.balanceOf(signer.address)).toString())
    }

    console.log('amount:  ', amount)

    const amountLD = BigNumber.from(amount)
    const sendParam = {
        dstEid,
        to: hexZeroPad(to, 32),
        amountLD: amountLD.toString(),
        minAmountLD: amountLD.mul(9_000).div(10_000).toString(),
        // calls with 60k gas + the existing enforced options
        // extraOptions: '0x0003010011010000000000000000000000000000ea60',
        extraOptions: '0x',
        composeMsg: '0x',
        oftCmd: '0x',
    }
    const [msgFee] = await oft.functions.quoteSend(sendParam, false)
    console.log('msgFee: ', msgFee.nativeFee.toString())
    const txResponse = await oft.functions.send(sendParam, msgFee, to, {
        value: msgFee.nativeFee,
        // gasLimit: 1000000,
    })
    console.log(txResponse)
    const txReceipt = await txResponse.wait()
    console.log(`send: ${amount} to ${to}: ${txReceipt.transactionHash}`)
}

task('send', 'Sends a transaction')
    .setAction(action)
    .addParam('dstEid', 'Destination endpoint ID', undefined, types.int, false)
    .addParam('amount', 'Amount to send in wei', undefined, types.string, false)
    .addParam('to', 'Recipient address', undefined, types.string, false)
    .addParam('contractName', 'Contract name', undefined, types.string, false)
