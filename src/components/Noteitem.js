import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noteContext from "../context/notes/NoteContext";

export default function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <Col md={3}>
      <Card className="my-3">
        <Card.Body>
          <div className="d-flex align-items-baseline">
            <Card.Title>{note.title}</Card.Title>
            <FontAwesomeIcon
              icon="fa-solid fa-trash"
              className="mx-2 point"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note deleted successfully", "success")
              }}
            />
            <FontAwesomeIcon
              icon="fa-regular fa-pen-to-square"
              className="mx-2 point"
              onClick={() => {
                updateNote(note);
              }}
            />
          </div>
          <Card.Text>{note.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
