"use client";

import {usePathname} from "next/navigation";
import {Link} from "@nextui-org/link";
import {NavbarItem} from "@nextui-org/navbar";

const NavbarContentGenerator = ({routes}) => {
	const pathname = usePathname();

	const checkRoute = (desiredPath) => {
		return pathname === desiredPath;
	}

	return (
		<>
			{
				routes.map((route, index) => (
					<NavbarItem key={`${route.name}-${index}`} as={Link} isActive={checkRoute(route.pathname)} color={checkRoute(route.pathname) ? "" : "foreground"} href={route.pathname}>{route.name}</NavbarItem>
				))
			}
		</>
	);
};

export default NavbarContentGenerator;