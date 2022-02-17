//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Post {
    uint256 public postId;
    string public postHeading;
    string public postDescription;
    address public user;

    constructor(
        address _user,
        uint256 _postId,
        string memory _postHeading,
        string memory _postDescription
    ) {
        postId = _postId;
        postHeading = _postHeading;
        postDescription = _postDescription;
        user = _user;
    }
}
