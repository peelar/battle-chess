import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  display: flex;
  background-color: whitesmoke;
  border: 2px solid gray;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  align-items: center;
  font-size: 1.25rem;

  &:hover {
    background-color: gray;
    border-color: gray;
    color: whitesmoke;
  }

  svg {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }
`;

export default Button;
