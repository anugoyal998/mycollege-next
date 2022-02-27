import React from "react";
// controllers
import loginController from '../../controllers/login'
// controllers
// icons
import { BiMenu } from "react-icons/bi";
import { FiSend, FiUser } from "react-icons/fi";
// icons
import tw from "tailwind-styled-components";
import GoogleLogin from "react-google-login";


const Navbar = () => {
  return (
    <TwNavbar>
      <IconWrapper><BiMenu /></IconWrapper>
      <RightWrapper>
        <IconWrapper><FiSend /></IconWrapper>
          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CID}` || "1068529013155-7fgh84mf7umu0j3abqfd2kl2kjj18snb.apps.googleusercontent.com"}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="cursor-pointer"
              >
                <FiUser className="text-xl" />
              </button>
            )}
            buttonText=""
            onSuccess={loginController.loginSuccess}
            onFailure={loginController.loginFailure}
            cookiePolicy={"single_host_origin"}
          />
      </RightWrapper>
    </TwNavbar>
  );
};

const TwNavbar = tw.div`
    flex justify-between items-center px-3 py-4
`;
const RightWrapper = tw.div`
    flex items-center space-x-3
`;
const IconWrapper = tw.div`
    text-xl cursor-pointer
`;

export default Navbar;
