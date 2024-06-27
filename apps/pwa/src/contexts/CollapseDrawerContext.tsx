import { createContext, useEffect, useState, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

// Define the context state type
interface CollapseDrawerContextType {
  isCollapse: boolean;
  collapseClick: boolean;
  collapseHover: boolean;
  onToggleCollapse: () => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
}

const initialState: CollapseDrawerContextType = {
  isCollapse: true,
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => {},
  onHoverEnter: () => {},
  onHoverLeave: () => {},
};

const CollapseDrawerContext =
  createContext<CollapseDrawerContextType>(initialState);

interface CollapseDrawerProviderProps {
  children: ReactNode;
}

function CollapseDrawerProvider({ children }: CollapseDrawerProviderProps) {
  const isDesktop = useMediaQuery({ maxWidth: 960 });
  const [collapse, setCollapse] = useState({
    click: false,
    hover: false,
  });

  useEffect(() => {
    if (!isDesktop) {
      setCollapse({
        click: false,
        hover: false,
      });
    } else {
      setCollapse({
        click: true,
        hover: false,
      });
    }
  }, [isDesktop]);

  const handleToggleCollapse = () => {
    setCollapse((prev) => ({ ...prev, click: !prev.click }));
  };

  const handleHoverEnter = () => {
    if (collapse.click) {
      setCollapse((prev) => ({ ...prev, hover: true }));
    }
  };

  const handleHoverLeave = () => {
    setCollapse((prev) => ({ ...prev, hover: false }));
  };

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        onToggleCollapse: handleToggleCollapse,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave,
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  );
}

export { CollapseDrawerContext, CollapseDrawerProvider };
