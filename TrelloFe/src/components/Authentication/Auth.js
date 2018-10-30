import React from "react";
import styled from "styled-components";
import { lifecycle, compose, withState, withHandlers } from "recompose";

const Auth = ({
  title,
  username,
  password,
  onChangeUsername,
  onChangePassword,
  onSubmit
}) => {
  let validateForm = () => {
    return username.length > 0 && password.length > 0;
  };
  return (
    <Container>
      <Inputs>
        <Title>{title}</Title>
        <LabelUsername style={{ color: "#472f6b" }}>
          Name :
          <InputTitle
            type="text"
            name="note"
            value={username}
            onChange={onChangeUsername}
          />
          {console.log(username)}
        </LabelUsername>
        <LabelPassword style={{ color: "#472f6b" }}>
          Pass :
          <InputTitle
            type="password"
            name="note"
            value={password}
            onChange={onChangePassword}
          />
        </LabelPassword>
        <InputButton
          type="submit"
          value="Submit"
          disabled={!validateForm()}
          onClick={onSubmit}
        />
      </Inputs>
    </Container>
  );
};
const enhance = compose(
  withState("username", "updateUsername", ""),
  withState("password", "updatePassword", ""),
  withHandlers({
    onChangeUsername: props => event => {
      props.updateUsername(event.target.value);
      console.log(props);
    },
    onChangePassword: props => event => {
      props.updatePassword(event.target.value);
      console.log(props);
    },
    onSubmit: props => event => {
      event.preventDefault();
    }
  })
);
export default enhance(Auth);

const Container = styled.div`
font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    display:flex
    justify-content:center
  height: 90%;
  margin: 1em 0em;
`;
const Inputs = styled.div`
  margin-top: 5em;
  height: 60%;
`;
const Title = styled.div`
  font-size: 2em;
  margin-bottom: 1em;

  color: #727272;
  font-weight: bold;
`;
const LabelUsername = styled.div`
  font-size: 1.2em;
  margin-bottom: 1em;
`;
const LabelPassword = styled.div`
  font-size: 1.2em;
  margin-bottom: 1em;
`;
const InputTitle = styled.input`
    border-radius: 5px;
    border: 1px solid #472f6b;
    outline:none;
    margin-top:1%
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    font-size:1em;
    margin-left:0.5em;
`;

const InputButton = styled.input`
  background: #472f6b;
  color: white;
  padding: 5px 10px;
  outline: none;
  border-radius: 15px;
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
  font-size: 0.8em;
  &:hover {
    border: 1px solid #472f6b;
    background-color: #472f6b;
    color: white;
    padding: 5px 10px;
  }
`;
