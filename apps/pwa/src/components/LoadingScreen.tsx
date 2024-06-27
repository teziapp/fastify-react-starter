import React from "react";
import { Spin } from "antd";
import { m } from "framer-motion";
import styled from "@emotion/styled";
import { Logo } from "./Logo/Logo";

// Styled components
const RootStyle = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedBox = styled(m.div)`
  position: absolute;
  border-radius: 25%;
  border: solid 1px #ffd980;
`;

interface LoadingScreenProps {
  isDashboard?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isDashboard = false,
  ...other
}) => {
  if (isDashboard) {
    return <Spin size="large" />;
  }

  return (
    <RootStyle {...other}>
      <m.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 1,
          repeat: Infinity,
        }}
      >
        <Logo color={"black"} />
      </m.div>
      <AnimatedBox
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
        style={{
          width: 100,
          height: 100,
        }}
      />
      <AnimatedBox
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{
          ease: "linear",
          duration: 3.2,
          repeat: Infinity,
        }}
        style={{
          width: 120,
          height: 120,
          borderWidth: 8,
        }}
      />
    </RootStyle>
  );
};

export default LoadingScreen;
