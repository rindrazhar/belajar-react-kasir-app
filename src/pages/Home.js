import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListCategories, Hasil, Menus } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryClick: "Makanan",
      cart: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryClick)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const cart = res.data;
        this.setState({ cart });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevState) {
    if (this.state.cart !== prevState.cart) {
      axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          const cart = res.data;
          this.setState({ cart });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  changeCategory = (value) => {
    this.setState({
      categoryClick: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  cartFunction = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const cart = {
            total: 1,
            total_value: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", cart)
            .then((res) => {
              swal({
                title: "Success Add to Cart!",
                text: "Success Add to Cart : " + cart.product.nama,
                icon: "success",
                button: false,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const cart = {
            total: res.data[0].total + 1,
            total_value: res.data[0].total_value + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, cart)
            .then((res) => {
              swal({
                title: "Success Add to Cart!",
                text: "Success Add to Cart : " + cart.product.nama,
                icon: "success",
                button: false,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, categoryClick, cart } = this.state;
    return (
      <div className="mt-3">
        <Container Fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              categoryClick={categoryClick}
            />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      menu={menu}
                      key={menu.id}
                      cartFunction={this.cartFunction}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil cart={cart} />
          </Row>
        </Container>
      </div>
    );
  }
}
