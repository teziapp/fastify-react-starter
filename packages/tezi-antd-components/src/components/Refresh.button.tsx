import { SyncOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
import { useNavigate } from "react-router-dom";

type Props = {
	icon?: boolean;
} & ButtonProps;

export const RefreshBtn = ({ icon, ...others }: Props) => {
	const navigate = useNavigate();

	return (
		<Button icon={icon ? <SyncOutlined /> : null} onClick={() => navigate(0)} {...others}>
			Refresh page
		</Button>
	);
};
