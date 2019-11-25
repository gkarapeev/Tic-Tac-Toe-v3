import styled from "styled-components";

export const Button = styled.button`
  padding: 7px 10px;
  border-radius: 3px;
  border: none;
  font-size: 20px;
  background-color: ${props =>
    props.primary ? "rgb(39, 146, 52)" : "rgb(100, 100, 100)"};
  color: rgb(245, 245, 245);
  transition: background-color 0.1s ease-out;
  &:hover {
    background-color: ${props =>
      props.primary ? "rgb(59, 206, 76)" : "rgb(215, 215, 215)"};
    color: black;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  height: 60px;
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  box-shadow: 2px 2px 5px -1px rgba(0, 0, 0, 0.34),
    inset 0px 0px 7px 5px rgb(255, 255, 255);
  border-radius: 3px;
  border: none;
  background-color: aliceblue;
  text-align: center;
`;