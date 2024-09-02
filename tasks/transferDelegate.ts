import { task, types } from 'hardhat/config'
import { ActionType, HardhatRuntimeEnvironment, TaskArguments } from 'hardhat/types'

import { MULTISIGS } from '../constants/multisigs'

const action: ActionType<TaskArguments> = async ({ contractName }, hre: HardhatRuntimeEnvironment) => {
    // Needs to be the delegate wallet index
    const signer = (await hre.ethers.getSigners())[0]
    const Oft = await hre.deployments.get(contractName)
    const oft = await hre.ethers.getContractAt(Oft.abi, Oft.address, signer)
    const owner = MULTISIGS[hre.network.name]

    if (!owner) {
        throw new Error('No owner found for this network')
    }

    const txResponse = await oft.functions.setDelegate(owner)
    console.log(txResponse)
    const txReceipt = await txResponse.wait()
    console.log(`tx hash: ${txReceipt.transactionHash}`)
}

task('transferDelegate', 'Transfers delegate of a contract to another address')
    .setAction(action)
    .addParam('contractName', 'Contract name', undefined, types.string, false)
