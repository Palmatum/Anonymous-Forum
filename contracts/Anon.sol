//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Post.sol";

contract Anon {
    uint256 public postCounter;
    Post[] public posts;

    constructor() {
        postCounter = 0;
    }

    function createPost(
        string memory _postHeading,
        string memory _postDescription
    ) public {
        postCounter++;
        Post post = new Post(
            msg.sender,
            postCounter,
            _postHeading,
            _postDescription
        );
        posts.push(post);
    }

    function getPost() public view returns (Post[] memory) {
        return posts;
    }
}
