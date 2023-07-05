import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";


export default function Signup(props) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const host = "https://enote-api-5c2o.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
        //refirect
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Account created successfully","success")
      } else {
        props.showAlert("Invalid Credentials","danger")
      }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
    
  return (
    <Container className="my-3">
    <h2>Create an account to use eNoteBook</h2>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          onChange={onChange}
          value={credentials.name}
          minLength={3}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={onChange}
          value={credentials.email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={onChange}
          value={credentials.password}
          minLength={5}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="cpassword">Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Re-Enter password"
          name="cpassword"
          onChange={onChange}
          value={credentials.cpassword}
          minLength={5}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
  );
}
