import React from "react";
import styled from "@emotion/styled";
import { varContainer } from "./variants/container";
import { m } from "framer-motion";

interface MotionContainerProps {
  animate?: boolean;
  action?: boolean;
  children: React.ReactNode;
  [key: string]: any; // for ...other props
}

const StyledMotionDiv = styled(m.div)`
  // Add any default styles here if needed
`;

const MotionContainer: React.FC<MotionContainerProps> = ({
  animate,
  action = false,
  children,
  ...other
}) => {
  if (action) {
    return (
      <StyledMotionDiv
        initial={false}
        animate={animate ? "animate" : "exit"}
        variants={varContainer()}
        {...other}
      >
        {children}
      </StyledMotionDiv>
    );
  }

  return (
    <StyledMotionDiv
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      {...other}
    >
      {children}
    </StyledMotionDiv>
  );
};

export default MotionContainer;
