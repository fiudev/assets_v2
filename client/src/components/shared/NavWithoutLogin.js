import React from "react";
import {
  Navbar,
  NavbarBrand,
  InputGroup,
  Input,
  Button,
  Container,
  Form
} from "reactstrap";

export default class NavWithoutLogin extends React.Component {
  search = e => {
    e.preventDefault();

    const form = new FormData(e.target);
    const tag = form.get("search");
    this.props.history.push(`/assets?tag=${tag}&page=1`);
  };
  render() {
    return (
      <Navbar expand="sm">
        <Container>
          <NavbarBrand href="/">
            <img src={require("../../static/logo_w.png")} />
          </NavbarBrand>
          <Form onSubmit={this.search}>
            <InputGroup>
              <Input placeholder="search" name="search" autoComplete="off" />
              <Button>
                <i className="fa fa-search" aria-hidden="true" />
              </Button>
            </InputGroup>
          </Form>
        </Container>
      </Navbar>
    );
  }
}
