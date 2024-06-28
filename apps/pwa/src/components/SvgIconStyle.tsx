import React from "react";
import styled from "@emotion/styled";

interface SvgIconStyleProps {
  src: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

const IconSpan = styled.span<SvgIconStyleProps>`
  display: inline-block;
  background-color: currentColor;
  width: ${(props) => props.width || 24}px;
  height: ${(props) => props.height || 24}px;
  mask: ${(props) => `url(${props.src}) no-repeat center / contain`};
  -webkit-mask: ${(props) => `url(${props.src}) no-repeat center / contain`};
`;

const SvgIconStyle: React.FC<SvgIconStyleProps> = ({
  width,
  height,
  src,
  style,
}) => {
  return <IconSpan src={src} width={width} height={height} style={style} />;
};

export default SvgIconStyle;
