import { CarouselProps, RowProps } from "antd";
import { createContext } from "react";

export type StylesContentProps = {
	rowProps: RowProps;
	carouselProps: CarouselProps;
};

export const StylesContext = createContext<StylesContentProps | null>(null);
