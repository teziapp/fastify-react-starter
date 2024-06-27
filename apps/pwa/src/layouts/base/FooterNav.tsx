import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;

type FooterNavProps = React.HTMLAttributes<HTMLDivElement>;

const FooterNav = ({ ...others }: FooterNavProps) => {
  return (
    <Footer {...others}>
      Crafted with ❤️ by{" "}
      <Link to="https://teziapp.com" target="_blank">
        Tezi
      </Link>
    </Footer>
  );
};

export default FooterNav;
