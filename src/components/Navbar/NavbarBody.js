"use client";

import React from 'react';
import {Navbar, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link";
import {usePathname} from "next/navigation";

const NavbarBody = ({routes, children}) => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const pathname = usePathname();

	const checkRoute = (desiredPath) => {
		return pathname === desiredPath;
	}

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen} isBordered isMenuOpen={isMenuOpen}>
			<NavbarMenuToggle
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				className="sm:hidden"
			/>
			{...children}
			<NavbarMenu>
				{
					routes.map((item, index) => (
						<NavbarMenuItem key={`${item.name}-${index}`}>
							<Link
								color={checkRoute(item.pathname) ? "primary" : "foreground"}
								className="w-full"
								href={item.pathname}
								size="lg"
							>
								{item.name}
							</Link>
						</NavbarMenuItem>
					))
				}
			</NavbarMenu>
		</Navbar>
	);
};

export default NavbarBody;