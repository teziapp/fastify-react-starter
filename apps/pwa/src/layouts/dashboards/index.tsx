import { Outlet } from "react-router-dom";
import { BaseLayout } from "../base/BaseLayout";

export const DashboardLayout = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};
