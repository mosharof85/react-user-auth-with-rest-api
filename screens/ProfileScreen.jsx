import React, { useEffect, useRef } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { use_user_update_Mutation } from "../store/userApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setUserInfo } from "../store/authSlice";

function ProfileScreen() {
  const dispatch = useDispatch();

  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  const { userInfo } = useSelector((state) => state.auth);

  const [_user_update_, { isLoading }] = use_user_update_Mutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (inputPassword.current.value !== inputConfirmPassword.current.value) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await _user_update_({
        name: inputName.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value
          ? inputPassword.current.value
          : null,
      }).unwrap();

      dispatch(setUserInfo({ ...res, _token: userInfo._token }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    inputName.current.value = userInfo.name;
    inputEmail.current.value = userInfo.email;
  }, []);

  return (
    <FormContainer>
      <div style={{ position: "relative" }}>
        {isLoading && <Loader />}
        <h1>Update Profile</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              ref={inputName}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={inputEmail}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              ref={inputPassword}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              ref={inputConfirmPassword}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
}

export default ProfileScreen;
