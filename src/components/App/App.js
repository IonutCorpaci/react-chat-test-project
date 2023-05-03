import './App.css';
import { useState } from "react";
import Chats from "../Chats/Chats";
import Messages from "../Messages/Messages";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import {Col, Container, Row} from "react-bootstrap";

function App() {
  const [userSelected, setUserSelected] = useState(null);

  const onUserSelected = (id) => {
    setUserSelected(id);
  };


  return (
    <div className="App">
      <Container fluid style={{height: "70vh"}}>
        <Row>
          <Col xs={4} style={{paddingLeft: '0px', paddingRight: '0px', height: "70vh"}}>
            <ErrorBoundary>
              <Chats onUserSelected={onUserSelected}/>
            </ErrorBoundary>
          </Col>
          <Col xs={8} style={{paddingLeft: '0px', paddingRight: '0px', height: "70vh"}}>
            <ErrorBoundary>
              <Messages userId={userSelected}/>
            </ErrorBoundary>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
