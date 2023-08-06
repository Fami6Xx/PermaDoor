"use client";

import {DropdownItem, DropdownSection} from "@nextui-org/dropdown";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

const NavbarDropSection = ({userRoutes}) => {
	const router = useRouter();

	return (
		<DropdownSection title={"Actions"} items={userRoutes}>
			{(item) => (
				<DropdownItem
					key={item.name}
					onPress={() => {
						item.pathname === "/api/auth/signout" ?
							signOut()
							:
							router.push(item.pathname)
					}}
					closeOnSelect={item.pathname !== "/api/auth/signout"}
					description={item.description}
					startContent={item.icon}
				>
					{item.name}
				</DropdownItem>
			)}
		</DropdownSection>
	);
};

export default NavbarDropSection;