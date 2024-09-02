interface TokenDetails {
    address: string
    name: string
    symbol: string
}

interface TokensMap {
    FXS: TokenDetails
    sFRAX: TokenDetails
    sfrxETH: TokenDetails
    FRAX: TokenDetails
    frxETH: TokenDetails
    FPI: TokenDetails
}

export const TOKENS: TokensMap = {
    // FXS on Ethereum
    // https://etherscan.io/token/0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0
    FXS: {
        address: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
        name: 'Frax Share',
        symbol: 'FXS',
    },
    // sFRAX on Ethereum
    // https://etherscan.io/token/0xa663b02cf0a4b149d2ad41910cb81e23e1c41c32
    sFRAX: {
        address: '0xa663b02cf0a4b149d2ad41910cb81e23e1c41c32',
        name: 'Staked FRAX',
        symbol: 'sFRAX',
    },
    // sfrxETH on Ethereum
    // https://etherscan.io/token/0xac3e018457b222d93114458476f3e3416abbe38f
    sfrxETH: {
        address: '0xac3E018457B222d93114458476f3E3416Abbe38F',
        name: 'Staked Frax Ether',
        symbol: 'sfrxETH',
    },
    // FRAX on Ethereum
    // https://etherscan.io/token/0x853d955acef822db058eb8505911ed77f175b99e
    FRAX: {
        address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
        name: 'Frax',
        symbol: 'FRAX',
    },
    // frxETH on Ethereum
    // https://etherscan.io/token/0x5E8422345238F34275888049021821E8E08CAa1f
    frxETH: {
        address: '0x5E8422345238F34275888049021821E8E08CAa1f',
        name: 'Frax Ether',
        symbol: 'frxETH',
    },
    // FPI on Ethereum
    // https://etherscan.io/token/0x5Ca135cB8527d76e932f34B5145575F9d8cbE08E
    FPI: {
        address: '0x5Ca135cB8527d76e932f34B5145575F9d8cbE08E',
        name: 'Frax Price Index',
        symbol: 'FPI',
    },
}
