import Card from "react-bootstrap/card";

const Post = ({key, heading, description, address}) => {
  return <Card style={{ width: '38rem', margin: "14px" }}>
      <Card.Header>{address}</Card.Header>
      <Card.Body>
          <Card.Title>{heading}</Card.Title>
          <Card.Text>{description}</Card.Text>
      </Card.Body>
  </Card>;
};

export default Post;
