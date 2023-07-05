import Notes from "./Notes";

export default function Home(props) {
  const showAlert = props.showAlert
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
}
