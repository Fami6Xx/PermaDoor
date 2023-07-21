"use client";

import {usePathname} from "next/navigation";
import {Link} from "@nextui-org/link";
import {NavbarItem} from "@nextui-org/navbar";

const NavbarContentGenerator = ({routes}) => {
	const pathname = usePathname();

	return (
		<>
			{
				routes.map((route) => (
					<NavbarItem as={Link} isActive={pathname === route.pathname} color="foreground" href={route.pathname}>{route.name}</NavbarItem>
				))
			}
		</>
	);
};

export default NavbarContentGenerator;