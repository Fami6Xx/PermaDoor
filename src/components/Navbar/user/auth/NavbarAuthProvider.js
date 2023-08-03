"use client";

import {useTheme} from "next-themes";
import Image from "next/image";
import {signIn} from "next-auth/react";
import {Button} from "@nextui-org/button";

const NavbarAuthProvider = ({logo, logoDark, children, providerId, providerName}) => {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<>
			<Button
				fullWidth
				variant="ghost"
				size="lg"
				startContent={
					<Image
						alt={providerName}
						width={25}
						height={25}
						src={
							`https://authjs.dev/img/providers${resolvedTheme === "dark" ? logoDark : logo}`
						}
					/>
				}
				onPress={() => signIn(providerId)}
			>
				{...children}
			</Button>
		</>
	);
};

export default NavbarAuthProvider;