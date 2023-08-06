"use client";

import {useRouter} from "next/navigation";
import {DropdownItem, DropdownSection} from "@nextui-org/dropdown";

const NavbarUserContent = ({name, email, routes}) => {
	const router = useRouter();

	return (
		<>
			<DropdownSection title={"User"}>
				<DropdownItem key={"userInformation"} isReadOnly title={name} description={email}/>
			</DropdownSection>
			<DropdownSection title={"Actions"}>
				{(item) => (
					<DropdownItem
						key={item.name}
						onClick={() => router.push(item.pathname)}
						>
						{item.name}
					</DropdownItem>
				)}
			</DropdownSection>
		</>
	);
};

export default NavbarUserContent;