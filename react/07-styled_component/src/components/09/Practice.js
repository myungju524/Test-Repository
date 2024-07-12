import React from "react";
import styled from "styled-components";
import Input from "./Input";
import SearchInput from "./SearchInput";
import images from "./search.png";

export function Practice(props) {
  return (
    <div>
      {/* 
     <h2>Input</h2>
     <Input/>
     <h2>Search Input</h2>
     <SearachInput />

      */}
      <h2>Input</h2>
      <Input />
      <h2>Search Input</h2>
      <SearchInput />
    </div>
  );
}
