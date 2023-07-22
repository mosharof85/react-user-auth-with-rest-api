import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { use_user_registration_Mutation } from "../store/userApiSlice";
import { setUserInfo } from "../store/authSlice";

function RegisterScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  const [_user_registration_, { isLoading }] = use_user_registration_Mutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await _user_registration_({
        name: inputName.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      }).unwrap();

      dispatch(setUserInfo({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <div style={{ position: "relative" }}>
        {isLoading && <Loader />}
        <h1>Sign Up</h1>
        <Form onSubmit={submitForm}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              ref={inputName}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email Address"
              ref={inputEmail}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={inputPassword}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              ref={inputConfirmPassword}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span>Sign Up</span>
          </Button>

          <Row className="py-3">
            <Col>
              Already have an account? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </FormContainer>
  );
}

export default RegisterScreen;
