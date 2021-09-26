import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import Input from "../../components/Input/Input";

import "./Register.scss";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");

  function onHandleSubmit(e) {
    e.preventDefault();
    console.log(firstname, lastname, mobileNo, email);
  }

  return (
    <Form
      className="registration-form h-100 d-flex flex-column justify-content-center align-items-center"
      onSubmit={onHandleSubmit}
    >
      <Row>
        <Col xs="12">
          <h2 className="yellow-accent">Enter Your Details:</h2>
        </Col>
        <Col xs="12">
          <Input
            name="firstname"
            label="Firstname"
            placeholder="Enter firstname"
            type="text"
            value={firstname}
            onHandleChange={setFirstname}
            className="mb-3"
          ></Input>
          <Input
            name="lastname"
            label="Lastname"
            placeholder="Enter Lastname"
            type="text"
            value={lastname}
            onHandleChange={setLastname}
            className="mb-3"
          ></Input>
          <Input
            name="mobile-no"
            label="Mobile No"
            placeholder="Enter Mobile Number"
            type="tel"
            value={mobileNo}
            onHandleChange={setMobileNo}
            className="mb-3"
          ></Input>
          <Input
            name="email"
            label="Email"
            placeholder="Enter Email"
            type="email"
            value={email}
            onHandleChange={setEmail}
            className="mb-3"
          ></Input>
          <Button type="submit" color="primary">
            Submut
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
