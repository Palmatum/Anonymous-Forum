const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Anon", function () {
  it("Should create a post", async function () {
    const Anon = await ethers.getContractFactory("Anon");
    const anon = await Anon.deploy();
    await anon.deployed();
    const createPostTx = await anon.createPost(
      "A nice day",
      "Beautiful sky, grass and trees!"
    );
    await createPostTx.wait();
    const postsArray = await anon.getPost();
    expect(postsArray.length).to.greaterThan(0);
  });

  it("Should create a post and return the heading, description and address", async function () {
    const Anon = await ethers.getContractFactory("Anon");
    const anon = await Anon.deploy();
    await anon.deployed();
    const createPostTx = await anon.createPost(
      "A nice day",
      "Beautiful sky, grass and trees!"
    );
    await createPostTx.wait();
    const postsArray = await anon.getPost();
    const postAddress = postsArray[0];
    const post = await ethers.getContractAt("Post", postAddress);
    const [user] = await ethers.getSigners();
    expect(await post.postHeading()).to.equal("A nice day");
    expect(await post.postDescription()).to.equal(
      "Beautiful sky, grass and trees!"
    );
    expect(await post.user()).to.equal(user.address);
  });


});
