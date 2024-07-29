import React from "react";
import * as FcIcons from "react-icons/fc";

function SignIn(props) {
  console.log(FcIcons.FcGoogle);
  return (
    <>
      <button className="sign-in">
        <FcIcons.FcGoogle />
        <span>
          <b>구글로 로그인하기</b>
        </span>
      </button>
      <span className="notice">
        ⚾아이폰(ios)은 safasi, chrome <br /> 등으로 로그인 해주세요. 🙏
      </span>
    </>
  );
}

export default SignIn;
