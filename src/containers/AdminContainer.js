import React from "react";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
 
function AdminContainer() {
  return (
    <Container>
      <Col className={"mt-5 section"}>
      <Row p={5}>
        <h1>Admin</h1>
        <Col>
          <div class="sub-section" mt={3} md={6} sm={12}>
            <h2>Totals transactions</h2>
            <p className="lead">100,00</p>
          </div>
        </Col>
        <Col>
          <div class="sub-section" mt={3} md={6} sm={12}>
            <h2>Total Users</h2>
            <p className={`lead`}>
              500
            </p>
          </div>
        </Col>
      </Row>
      </Col>
      <Col className="section mt-5">

        section
      </Col>

    </Container>
  );
}

export default AdminContainer;
