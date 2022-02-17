import styles from "../styles/Home.module.css";
import { Form, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Post from "../lib/components/Post";
import AnonAbi from "../artifacts/contracts/Anon.sol/Anon.json";
import PostAbi from "../artifacts/contracts/Post.sol/Post.json";

export default function Home() {
  const anonAddress = "contractAddress";

  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [flag, setFlag] = useState(false);
  const [posts, setPosts] = useState([]);
  
  const changeFlag = () => {
    setFlag(!flag);
  };

  const changeHeading = (e) => {
    setHeading(e.target.value);
  };

  const changeDesc = (e) => {
    setDesc(e.target.value);
  };

  

  useEffect(() => {
    (async () => {
      try {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        await provider.send("eth_requestAccounts", []);
        const AnonContract = new ethers.Contract(
          anonAddress,
          AnonAbi.abi,
          provider
        );
        let postsArray = await AnonContract.getPost();

        postsArray = await Promise.all(
          postsArray.map(async (item, index) => {
            const PostContract = new ethers.Contract(
              item,
              PostAbi.abi,
              provider
            );
            const _head = await PostContract.postHeading();
            const _desc = await PostContract.postDescription();
            const _addr = await PostContract.user();
            const itemObject = {
              heading: _head,
              description: _desc,
              address: _addr,
            };
            return itemObject;
          })
        );

        setPosts(postsArray);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [flag]);

  const postCreation = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const AnonContract = new ethers.Contract(anonAddress, AnonAbi.abi, signer);
    const createPostTx = await AnonContract.createPost(heading, desc);
    await createPostTx.wait();
    setHeading("");
    setDesc("");
  };

  return (
    <div className="d-flex align-items-center flex-column">
      <Card
        className="d-flex flex-column align-items-center"
        style={{ width: "48rem", padding: "14px", margin: "14px" }}
      >
        <Form>
          <Form.Group style={{ width: "38rem", marginBottom: "14px" }}>
            <Form.Label>Enter heading</Form.Label>
            <Form.Control
              value={heading}
              onChange={changeHeading}
              as={"textarea"}
              rows={1}
            />
          </Form.Group>
          <Form.Group style={{ width: "38rem", marginBottom: "14px" }}>
            <Form.Label>Enter Description</Form.Label>
            <Form.Control
              value={desc}
              onChange={changeDesc}
              as={"textarea"}
              rows={3}
            />
          </Form.Group>
          <Button onClick={postCreation} variant={"primary"}>
            Post
          </Button>
          <Button
            onClick={changeFlag}
            variant="success"
            style={{ marginLeft: "14px" }}
          >
            Refresh
          </Button>
        </Form>
      </Card>

      {posts.map((item, i) => {
        return (
          <Post
            key={Math.random()}
            heading={item.heading}
            description={item.description}
            address={item.address}
          />
        );
      })}
    </div>
  );
}
