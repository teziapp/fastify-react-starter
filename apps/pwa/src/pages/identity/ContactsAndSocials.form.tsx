import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, FormInstance, Input, Select } from "antd";

type InputProps = {
	parentFields?: ("identity" | string)[];
	setFieldValue?: FormInstance["setFieldValue"];
};

export const ContactsAndSocialsForm = ({ parentFields = [] }: InputProps) => {
	const typeOptions = [
		{ value: "email" },
		{ value: "instagram" },
		{ value: "mobile" },
		{ value: "phone" },
		{ value: "twitter/x" },
	];
	return (
		<Form.List name={[...parentFields, "contactsAndSocials"]}>
			{(fields, { add, remove }) => {
				return (
					<>
						<div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
							{fields.map((field, index) => (
								<Card
									size="small"
									title={`Item ${field.name + 1}`}
									key={field.key}
									extra={
										<CloseOutlined
											onClick={() => {
												remove(field.name);
											}}
										/>
									}
								>
									<Form.Item label="Label" name={[field.name, "label"]}>
										<Input />
									</Form.Item>
									<Form.Item label="Type" name={[field.name, "type"]}>
										<Select
											defaultValue={typeOptions[index]?.value ?? ""}
											options={typeOptions}
										/>
									</Form.Item>
									<Form.Item label="ISD code" name={[field.name, "isd_code"]}>
										<Input />
									</Form.Item>
									<Form.Item label="Value" name={[field.name, "value"]}>
										<Input />
									</Form.Item>
									<Form.Item label="url" name={[field.name, "url"]}>
										<Input />
									</Form.Item>
								</Card>
							))}
						</div>

						<Button style={{ margin: 4 }} type="dashed" onClick={() => add()} block>
							+ Add Contacts And Socials
						</Button>
					</>
				);
			}}
		</Form.List>
	);
};
