import { Row, Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.scss";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Map from "./pages/Map/Map";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className="app-container" fluid>
        <Row className="h-100">
          <Col className="h-100">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/map" component={Map} />
              <Redirect from="/" to="/home" />
            </Switch>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;
