import { DatePicker, Form, FormInstance, Input, Radio, Select } from "antd";
import { AddressesForm } from "./Addresses.form";
import { ContactsAndSocialsForm } from "./ContactsAndSocials.form";

type InputProps = {
	parentFields: ("identity" | string)[];
	setFieldValue: FormInstance["setFieldValue"];
};

export const IdentityForm = ({ parentFields }: InputProps) => {
	const getFieldName = (name: string) => [...parentFields, name];

	return (
		<>
			<Form.Item label="Name" name={getFieldName("name")}>
				<Input />
			</Form.Item>
			<Form.Item label="Alias" name={getFieldName("aliases")}>
				<Select mode="tags" options={[]} />
			</Form.Item>
			<Form.Item label="Birthday">
				<DatePicker format="DD-MM-YYY" />
			</Form.Item>
			<Form.Item label="Skills" name={getFieldName("skills")}>
				<Select allowClear mode="tags" options={[]} tokenSeparators={[","]} />
			</Form.Item>
			<Form.Item label="Website" name={getFieldName("website")}>
				<Input />
			</Form.Item>
			<Form.Item label="Bio" name={getFieldName("bio")}>
				<Input.TextArea rows={4} />
			</Form.Item>
			<Form.Item label="Interests" name={getFieldName("interests")}>
				<Select allowClear mode="tags" options={[]} tokenSeparators={[","]} />
			</Form.Item>
			<Form.Item label="Notes" name={getFieldName("notes")}>
				<Input.TextArea rows={4} />
			</Form.Item>
			<Form.Item label="Education" name={getFieldName("education")}>
				<Select allowClear mode="tags" options={[]} tokenSeparators={[","]} />
			</Form.Item>
			<Form.Item label="Type" name={getFieldName("type")}>
				<Radio.Group options={["person", "organisation"]} optionType="button" />
			</Form.Item>
			<ContactsAndSocialsForm />
			<AddressesForm />
		</>
	);
};
