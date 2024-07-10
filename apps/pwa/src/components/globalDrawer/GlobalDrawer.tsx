import React, { useState, useEffect } from "react";
import { Drawer as AntDrawer } from "antd";
import useDrawerStore from "../../store/drawerStore";

const GlobalDrawer: React.FC = () => {
  const { isOpen, title, position, height, component, closeDrawer } =
    useDrawerStore();
  const [drawerWidth, setDrawerWidth] = useState("100%");

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(window.innerWidth < 640 ? "100%" : "50%");
    };

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHorizontal = position === "top" || position === "bottom";

  return (
    <AntDrawer
      title={title}
      placement={position}
      onClose={closeDrawer}
      open={isOpen}
      width={isHorizontal ? "100%" : drawerWidth}
      height={isHorizontal ? height : "100%"}
      className="p-0"
      style={{ padding: 0 }}
    >
      <div className="h-full w-full p-4 overflow-auto">{component}</div>
    </AntDrawer>
  );
};

export default GlobalDrawer;
