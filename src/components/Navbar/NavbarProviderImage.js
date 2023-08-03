"use client";

import {useTheme} from "next-themes";
import Image from "next/image";

const NavbarProviderImage = ({logo, logoDark}) => {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<>
			<Image
				alt={provider.name}
				width={25}
				height={25}
				src={
					`https://authjs.dev/img/providers${resolvedTheme === "dark" ? logoDark : logo}`
				}
			/>
		</>
	);
};

export default NavbarProviderImage;