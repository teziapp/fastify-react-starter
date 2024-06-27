import { Outlet } from "react-router-dom";
import { BaseLayout } from "../base/BaseLayout";

const DashboardLayout = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};
export default DashboardLayout;
