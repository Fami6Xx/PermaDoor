"use client";

import {Navbar, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link";
import {usePathname} from "next/navigation";
import {Spacer} from "@nextui-org/spacer";
import {Divider} from "@nextui-org/divider";
import {useState} from "react";

const NavbarBody = ({routes, children, userRoutes}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const pathname = usePathname();

	const checkRoute = (desiredPath) => {
		return pathname === desiredPath;
	}

	const shouldDisplay = (route) => {
		return route.protected && userRoutes || !route.protected;
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
						shouldDisplay(item) &&
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
				{
					userRoutes ?
						<>
							<Spacer y={2}/>
							<Divider/>
							<Spacer y={2}/>
							{
								userRoutes.map((item, index) => (
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
						</>
						:
						<></>
				}
			</NavbarMenu>
		</Navbar>
	);
};

export default NavbarBody;