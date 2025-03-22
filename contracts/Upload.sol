// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Credentials {
        string title;
        string privateKey;
    }
    
    mapping(address => Credentials[]) private data;
    
    function add(address account, string memory _title, string memory _privateKey) external {
        data[account].push(Credentials(_title, _privateKey));
    }
    
    function display(address account) external view returns (Credentials[] memory) {
        require(account == msg.sender, "Access restricted to owner");
        return data[account];
    }
}