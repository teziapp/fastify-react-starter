import { PropsWithChildren } from "react";
import { HelmetProvider } from "react-helmet-async";
import { StylesContext } from "./context";
import { ThemeProvider } from "./theme";

export const AntdThemeProvider = ({ children }: PropsWithChildren) => (
	<HelmetProvider>
		<ThemeProvider>
			<StylesContext.Provider
				value={{
					rowProps: {
						gutter: [
							{ xs: 8, sm: 16, md: 24, lg: 32 },
							{ xs: 8, sm: 16, md: 24, lg: 32 },
						],
					},
					carouselProps: {
						autoplay: true,
						dots: true,
						dotPosition: "bottom",
						infinite: true,
						slidesToShow: 3,
						slidesToScroll: 1,
					},
				}}
			>
				{children}
			</StylesContext.Provider>
		</ThemeProvider>
	</HelmetProvider>
);
