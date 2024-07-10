import { Breadcrumb } from "antd";
import { Iconify } from "../../components/icon";

export default function BreadCrumb() {
  return (
    <Breadcrumb
      items={[]}
      className="!text-sm"
      separator={<Iconify icon="ph:dot-duotone" />}
    />
  );
}
