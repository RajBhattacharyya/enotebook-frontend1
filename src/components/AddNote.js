import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    props.showAlert("Note added successfully", "primary")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <Container className="my-3">
      <h2>Add a note</h2>
      <Form>
        <Form.Group className="mb-3 my-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title"
            id="title"
            onChange={onChange}
            value={note.title}
            minLength={3}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="description"
            id="description"
            onChange={onChange}
            value={note.description}
            minLength={3}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tag"
            name="tag"
            id="tag"
            onChange={onChange}
            value={note.tag}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleClick}>
          Add Note
        </Button>
      </Form>
    </Container>
  );
}
