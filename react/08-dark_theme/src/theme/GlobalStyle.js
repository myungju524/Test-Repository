import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset} 
body{
    background-color:  ${({ theme }) => theme.bgColor};
    color : ${({ theme }) => theme.textColor};
    position: relative;
    display: block;
    width:100%;
    height: 100%;
    margin : 0 auto;
    font-family: pretendard, sans-serif;
}

`;
