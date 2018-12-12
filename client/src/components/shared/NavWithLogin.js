import React from "react";
import {
  Navbar,
  NavbarBrand,
  InputGroup,
  Input,
  Button,
  Container,
  Form,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { GoogleLogin } from "react-google-login-component";
import TagsInput from "react-tagsinput";
import userService from "../../services/user";
import assetService from "../../services/assets";

const Settings = props => (
  <div className="profile">
    <UncontrolledDropdown>
      <DropdownToggle nav caret>
        <img src={props.photo} />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={props.toggleUpload}>Upload</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={props.logout}>Logout</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  </div>
);

const Login = props => (
  <GoogleLogin
    socialId="87909135159-dmefuekvr3otn6e5ccsjfe5rm3amtfmh.apps.googleusercontent.com"
    className="login-btn"
    scope="profile"
    fetchBasicProfile={true}
    responseHandler={props.login}
    buttonText="Login"
  />
);

const UploadModal = props => {
  return (
    <Modal isOpen={props.isUploadOpen} toggle={props.toggleUpload}>
      <ModalHeader toggle={props.toggleUpload}>Upload Assets</ModalHeader>
      <ModalBody>
        <Form onSubmit={props.upload} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="tags">
              <b className="text-muted">5 tags per upload.</b>
            </label>
            <TagsInput
              value={props.tags}
              inputValue={props.tag}
              onChange={props.handleChangeTags.bind(this)}
              onChangeInput={props.changeTagInput.bind(this)}
            />
          </div>

          <div className="form-group ">
            <label>
              <span className="text-muted">
                <i>JPG</i> and <i>PNG</i> only.
              </span>
            </label>
            <br />
            <label>
              <b className="text-muted">25 files at a time.</b>
            </label>
            <br />
            <input
              name="assets"
              type="file"
              multiple
              required
              onChange={props.handleFileChange}
            />
          </div>
          <Button className="btn-block" type="submit">
            Upload Assets
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default class NavWithLogin extends React.Component {
  state = {
    token: null,
    photo: null,
    isUploadOpen: false,
    setting: false,
    assets: [],
    tags: ["fiu"],
    tag: ""
  };

  search = e => {
    e.preventDefault();

    const form = new FormData(e.target);
    const tag = form.get("search");
    this.props.history.push(`/assets?tag=${tag}`);
  };

  login = async user => {
    let email = user.w3.U3;
    let photo = user.w3.Paa;

    try {
      const token = await userService.login(email);
      localStorage.setItem("photo", photo);
      localStorage.setItem("JWT", token);
      this.setState({ token, photo });
    } catch (e) {
      alert("Unable to Login");
    }
  };

  logout = () => {
    localStorage.clear();
    this.setState({ token: null });
  };

  upload = async e => {
    e.preventDefault();
    const { tags, assets } = this.state;

    if (assets.length > 25) {
      alert("25 files per upload");
      this.setState({ isUploadOpen: false });
    } else if (tags.length > 5) {
      alert("No more than 5 tags per upload.");
      this.setState({ isUploadOpen: false });
    } else {
      const isValid = this.checkFileType(assets);
      if (isValid) {
        try {
          const data = await assetService.upload(assets, tags);
          this.setState({ isUploadOpen: false });
          this.props.history.push(`/assets?tag=${tags[0]}`);
        } catch (e) {
          alert("Something went wrong.");
          this.setState({ isUploadOpen: false });
        }
      } else {
        alert("Incorrect file types.");
        this.setState({ isUploadOpen: false });
      }
    }
  };

  checkFileType = assets => {
    for (let asset of assets) {
      let { type } = asset;
      if (
        type != "image/jpeg" &&
        type != "image/png" &&
        type != "image/JPG" &&
        type != "image/PNG" &&
        type != "image/jpg"
      ) {
        return false;
      }
    }
    return true;
  };

  handleFileChange = e => {
    e.preventDefault();
    this.setState({ assets: e.target.files });
  };

  render() {
    const token = localStorage.getItem("JWT");
    const photo = localStorage.getItem("photo");
    const { isUploadOpen, tags, tag } = this.state;

    return (
      <Navbar expand="md">
        <Container>
          <NavbarBrand href="/">
            <img src={require("../../static/logo_w.png")} />
          </NavbarBrand>
          <div className="search-login">
            <Form onSubmit={this.search}>
              <InputGroup>
                <Input placeholder="search" name="search" autoComplete="off" />
                <Button>
                  <i className="fa fa-search" aria-hidden="true" />
                </Button>
              </InputGroup>
            </Form>

            {isUploadOpen && (
              <UploadModal
                tag={tag}
                tags={tags}
                upload={this.upload}
                isUploadOpen={isUploadOpen}
                handleFileChange={this.handleFileChange}
                handleChangeTags={tags => this.setState({ tags })}
                changeTagInput={tag => this.setState({ tag })}
                toggleUpload={() =>
                  this.setState({ isUploadOpen: !isUploadOpen })
                }
              />
            )}

            {token ? (
              <Settings
                photo={photo}
                logout={this.logout}
                toggleUpload={() =>
                  this.setState({ isUploadOpen: !isUploadOpen })
                }
              />
            ) : (
              <Login login={this.login} />
            )}
          </div>
        </Container>
      </Navbar>
    );
  }
}
