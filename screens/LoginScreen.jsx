import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../store/authSlice";
import { use_user_login_Mutation } from "../store/userApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function LoginScreen() {
  const inputEmail = useRef();
  const inputPassword = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [_user_login_, { isLoading }] = use_user_login_Mutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await _user_login_({
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
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
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

          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>

          <Row className="py-3">
            <Col>
              New Customer? <Link to="/register">Register</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </FormContainer>
  );
}

export default LoginScreen;
