import { type DeployFunction } from 'hardhat-deploy/types'

import { TOKENS } from '../constants/tokens'

const contractName = 'StakedFraxOFT'

const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre

    const { deploy } = deployments
    const { deployer, delegate } = await getNamedAccounts()

    const endpointV2Address = (await hre.deployments.get('EndpointV2')).address
    const args = [TOKENS.sFRAX.name, TOKENS.sFRAX.symbol, endpointV2Address, delegate]

    const { address } = await deploy(contractName, {
        from: deployer,
        args,
        log: true,
        skipIfAlreadyDeployed: true,
    })

    console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
}

deploy.tags = [contractName]
deploy.skip = async ({ network }) => network.name === 'ethereum'

export default deploy
