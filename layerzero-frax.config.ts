import { EndpointId } from '@layerzerolabs/lz-definitions'
import { OAppOmniGraphHardhat } from '@layerzerolabs/toolbox-hardhat'

import { DVNS } from './constants/dvns'
import { getDefaultEnforcedOptions } from './constants/enforcedOptions'
import { MULTISIGS } from './constants/multisigs'

const eth = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: 'FraxOFTAdapter',
}

const blast = {
    eid: EndpointId.BLAST_V2_MAINNET,
    contractName: 'FraxOFT',
}

const base = {
    eid: EndpointId.BASE_V2_MAINNET,
    contractName: 'FraxOFT',
}

const metis = {
    eid: EndpointId.METIS_V2_MAINNET,
    contractName: 'FraxOFT',
}

const getDefaultConfig = (network: string) => {
    return {
        sendConfig: {
            ulnConfig: {
                requiredDVNs: [DVNS.LZ_LABS[network], DVNS.HORIZEN[network]],
            },
        },
        receiveConfig: {
            ulnConfig: {
                requiredDVNs: [DVNS.LZ_LABS[network], DVNS.HORIZEN[network]],
            },
        },
        enforcedOptions: getDefaultEnforcedOptions(),
    }
}

// Deploying contracts to reserve the addresses, but will NOT wire them together
const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: eth,
            config: {
                delegate: MULTISIGS['ethereum'],
                owner: MULTISIGS['ethereum'],
            },
        },
        {
            contract: blast,
            config: {
                delegate: MULTISIGS['blast'],
                owner: MULTISIGS['blast'],
            },
        },
        {
            contract: base,
            config: {
                delegate: MULTISIGS['base'],
                owner: MULTISIGS['base'],
            },
        },
        {
            contract: metis,
            config: {
                delegate: MULTISIGS['metis'],
                owner: MULTISIGS['metis'],
            },
        },
    ],
    connections: [
        // eth
        {
            from: eth,
            to: blast,
            config: getDefaultConfig('ethereum'),
        },
        {
            from: eth,
            to: base,
            config: getDefaultConfig('ethereum'),
        },
        {
            from: eth,
            to: metis,
            config: getDefaultConfig('ethereum'),
        },

        // blast
        {
            from: blast,
            to: eth,
            config: getDefaultConfig('blast'),
        },
        {
            from: blast,
            to: base,
            config: getDefaultConfig('blast'),
        },
        {
            from: blast,
            to: metis,
            config: getDefaultConfig('blast'),
        },

        // base
        {
            from: base,
            to: eth,
            config: getDefaultConfig('base'),
        },
        {
            from: base,
            to: blast,
            config: getDefaultConfig('base'),
        },
        {
            from: base,
            to: metis,
            config: getDefaultConfig('base'),
        },

        // metis
        {
            from: metis,
            to: eth,
            config: getDefaultConfig('metis'),
        },
        {
            from: metis,
            to: base,
            config: getDefaultConfig('metis'),
        },
        {
            from: metis,
            to: blast,
            config: getDefaultConfig('metis'),
        },
    ],
}

export default config
