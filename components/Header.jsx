import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { use_user_logout_Mutation } from "../store/userApiSlice";
import { destroyUserInfo } from "../store/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [_user_logout_] = use_user_logout_Mutation();

  const handleLogout = async () => {
    try {
      await _user_logout_().unwrap();

      dispatch(destroyUserInfo());

      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand to="/" as={Link}>
            MERN App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link to="/login" as={Link}>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                  <Nav.Link to="/register" as={Link}>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
