// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { OFT } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFT.sol";
import { IOFTMinterBurner } from "./interfaces/IOFTMinterBurner.sol";

// @dev For net new tokens on chains
contract OFTMinterBurner is OFT, IOFTMinterBurner {
    mapping(address minterburner => bool canMintAndBurn) public isMinterBurner;

    // @dev only owners or minterBurner
    modifier onlyMinterBurner() {
        if (!isMinterBurner[msg.sender]) revert NotMinterBurner(msg.sender);
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate
    ) OFT(_name, _symbol, _lzEndpoint, _delegate) Ownable(_delegate) {}

    function addMinterBurner(address _minterBurner) external onlyOwner {
        isMinterBurner[_minterBurner] = true;
        emit MinterBurnerAdded(_minterBurner);
    }

    function removeMinterBurner(address _minterBurner) external onlyOwner {
        isMinterBurner[_minterBurner] = false;
        emit MinterBurnerRemoved(_minterBurner);
    }

    function mint(address _to, uint256 _amount) external onlyMinterBurner {
        _mint(_to, _amount);
        emit MintedBy(msg.sender);
    }

    function burn(address _from, uint256 _amount) external onlyMinterBurner {
        _burn(_from, _amount);
        emit BurnedBy(msg.sender);
    }
}
