import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, FormInstance, Input, Select, SelectProps } from "antd";

type InputProps = {
	parentFields?: ("identity" | string)[];
	setFieldValue?: FormInstance["setFieldValue"];
};

export const AddressesForm = ({ parentFields = [] }: InputProps) => {
	const stateOptions: SelectProps["options"] = [];
	const countryOptions: SelectProps["options"] = [];

	return (
		<Form.List name={[...parentFields, "addresses"]}>
			{(fields, { add, remove }) => {
				return (
					<>
						<div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
							{fields.map((field) => (
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
									<Form.Item label="Address" name={[field.name, "address"]}>
										<Input.TextArea rows={4} />
									</Form.Item>
									<Form.Item label="Pincode" name={[field.name, "postcode"]}>
										<Input type="number" />
									</Form.Item>
									<Form.Item label="City" name={[field.name, "city"]}>
										<Input />
									</Form.Item>
									<Form.Item label="State" name={[field.name, "state"]}>
										<Select options={stateOptions} />
									</Form.Item>
									<Form.Item label="Country" name={[field.name, "country"]}>
										<Select options={countryOptions} />
									</Form.Item>
								</Card>
							))}
						</div>

						<Button style={{ margin: 4 }} type="dashed" onClick={() => add()} block>
							+ Add Address
						</Button>
					</>
				);
			}}
		</Form.List>
	);
};
