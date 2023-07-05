import React, { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    } else {
      navigate('/login')
    }
      
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    handleShow();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    handleClose();
    props.showAlert("Note updated successfully", "primary")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 my-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="etitle"
                placeholder="Enter title"
                id="etitle"
                value={note.etitle}
                onChange={onChange}
                minLength={3}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="edescription"
                id="edescription"
                value={note.edescription}
                onChange={onChange}
                minLength={3}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tag"
                name="etag"
                id="etag"
                value={note.etag}
                onChange={onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="my-4">
        <h2>Your Notes</h2>
        <Container className="mx-3 my-2">
          {notes.length === 0 && "No Notes to display"}
        </Container>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </Row>
    </>
  );
}
