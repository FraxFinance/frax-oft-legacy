type Networks = Record<string, string>

interface DVNS {
    LZ_LABS: Networks
    HORIZEN: Networks
}

// https://docs.layerzero.network/explore/decentralized-verifier-networks
export const DVNS: DVNS = {
    LZ_LABS: {
        ethereum: '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
        blast: '0xc097ab8cd7b053326dfe9fb3e3a31a0cce3b526f',
        base: '0x9e059a54699a285714207b43B055483E78FAac25',
        metis: '0x32d4F92437454829b3Fe7BEBfeCE5D0523DEb475',
    },
    HORIZEN: {
        ethereum: '0x380275805876Ff19055EA900CDb2B46a94ecF20D',
        blast: '0x70BF42C69173d6e33b834f59630DAC592C70b369',
        base: '0xa7b5189bcA84Cd304D8553977c7C614329750d99',
        metis: '0x7fe673201724925B5c477d4E1A4Bd3E954688cF5',
    },
}
