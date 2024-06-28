// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { OFTMinterBurner } from "../OFTMinterBurner.sol";

contract StakedFraxOFT is OFTMinterBurner {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate
    ) OFTMinterBurner(_name, _symbol, _lzEndpoint, _delegate) {}
}
