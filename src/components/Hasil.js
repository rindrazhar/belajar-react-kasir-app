import React, { Component } from "react";
import { Row, Col, ListGroup, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

export default class Hasil extends Component {
  render() {
    const { cart } = this.props;

    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {cart.length !== 0 && (
          <ListGroup>
            {cart.map((menuCart) => (
              <ListGroup.Item>
                <Row>
                  <Col xs="2">
                    <h4>
                      <Badge pill bg="success">
                        {menuCart.total}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{menuCart.product.nama}</h5>
                    <p>Rp. {numberWithCommas(menuCart.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp. {numberWithCommas(menuCart.total_value)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    );
  }
}
