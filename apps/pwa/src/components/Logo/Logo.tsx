import { Flex, FlexProps, theme, Typography } from "antd";
import { Link } from "react-router-dom";
import { CSSProperties } from "react";

type LogoProps = {
  color?: CSSProperties["color"];
  imgSize?: {
    h?: number | string;
    w?: number | string;
  };
  asLink?: boolean;
  href?: string;
  bgColor?: CSSProperties["backgroundColor"];
} & Partial<FlexProps>;

export const Logo = ({
  asLink,
  color,
  href,
  imgSize,
  bgColor,
  ...others
}: LogoProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  return asLink ? (
    <Link to={href || "#"} className="logo-link">
      <Flex gap={others.gap || "small"} align="center" {...others}>
        <img
          src="/favicon/android-chrome-512x512.png"
          alt="Logo"
          height={imgSize?.h || 48}
        />
        <Typography.Title
          level={5}
          type="secondary"
          style={{
            color,
            margin: 0,
            padding: `4px 8px`,
            backgroundColor: bgColor,
            borderRadius,
          }}
        >
          My App
        </Typography.Title>
      </Flex>
    </Link>
  ) : (
    <Flex gap={others.gap || "small"} align="center" {...others}>
      <img
        src="/favicon/android-chrome-512x512.png"
        alt="Logo"
        height={imgSize?.h || 48}
      />
    </Flex>
  );
};
