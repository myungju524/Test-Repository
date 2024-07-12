import styled from "styled-components";
import search from "./search.png";

const SearchInput = styled.input`
  border: 2px solid #eeeeee;
  border-radius: 4px;
  outline: none;
  padding: 16px;
  border-radius: 4px;
  background-image: url(${search});
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: 12px 50%;
  padding-left: 40px;

  &:focus {
    border-color: #7760b4;
  }
`;

export default SearchInput;
