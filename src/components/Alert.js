import Alert from "react-bootstrap/Alert";

export default function AlertDismissible(props) {
  const capitalize = (word) => {
    if (word==="danger"){
      word = "error"
    }
    if (word==="primary"){
      word = "success"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <Alert variant={props.alert.type}>
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
        </Alert>
      )}
    </div>
  );
}
