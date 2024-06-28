import { type DeployFunction } from 'hardhat-deploy/types'

const deploy: DeployFunction = async (hre) => {
    console.log('Deploying OFTS contracts...')
    const { getNamedAccounts } = hre
    const { deployer, delegate } = await getNamedAccounts()

    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}, Delegate: ${delegate}`)
}

deploy.tags = ['OFTS']
// When adding new tokens to this list, append them to the end to ensure same wallet nonces are used on new chains
deploy.dependencies = [
    // 'FraxSharesOFT',
    // 'FraxSharesOFTAdapter',
    // 'StakedFraxOFT',
    // 'StakedFraxOFTAdapter',
    // 'StakedFraxEtherOFT',
    // 'StakedFraxEtherOFTAdapter',
    // 'FraxOFT',
    // 'FraxOFTAdapter',
    'FraxEtherOFT',
    'FraxEtherOFTAdapter',
    'FraxPriceIndexOFT',
    'FraxPriceIndexOFTAdapter'
]

export default deploy
