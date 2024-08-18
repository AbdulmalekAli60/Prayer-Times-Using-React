import "./App.css";
// Components
import MainContent from "./components/MainContent";

// Components

//MUI Library
import Container from "@mui/material/Container";

//MUI Library
function App() {
  return (
    <div
      className="App"
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   width: "100vw",
      //   background: "green",
      // }}
    >
      <Container maxWidth="xl">
        <MainContent />
      </Container>
    </div>
  );
}

export default App;
