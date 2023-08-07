"use client";

import {usePathname} from "next/navigation";
import {Link} from "@nextui-org/link";
import {NavbarItem} from "@nextui-org/navbar";

const NavbarContentGenerator = ({routes, isLoggedIn}) => {
	const pathname = usePathname();

	const checkRoute = (desiredPath) => {
		return pathname === desiredPath;
	}

	const shouldDisplay = (route) => {
		return route.protected && isLoggedIn || !route.protected;
	}

	return (
		<>
			{
				routes.map((route, index) => (
					shouldDisplay(route) && <NavbarItem key={`${route.name}-${index}`} as={Link} isActive={checkRoute(route.pathname)} color={checkRoute(route.pathname) ? "" : "foreground"} href={route.pathname}>{route.name}</NavbarItem>
				))
			}
		</>
	);
};

export default NavbarContentGenerator;