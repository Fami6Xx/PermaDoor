"use client";

import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/dropdown";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Avatar} from "@nextui-org/avatar";
import SelectTheme from "@/components/Navbar/user/SelectTheme";

const NavbarUserDrop = ({userRoutes, image, email, name}) => {
	const router = useRouter();

	return (
		<Dropdown showArrow classNames={{
			base: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
			arrow: "bg-default-200",
		}}>
			<DropdownTrigger>
				<Avatar
					showFallback
					isBordered
					isFocusable
					src={image}
					radius="sm"
					aria-label="User menu"
				/>
			</DropdownTrigger>
			<DropdownMenu variant="faded" aria-label="Dropdown user menu">
				<DropdownSection title="User">
					<DropdownItem key="userInformation" startContent={
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="1.3em" width="1.3em" className="text-xl text-default-500 pointer-events-none flex-shrink-0">
							<path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
						</svg>
					} isReadOnly title={name} description={email}/>
					<DropdownItem
						isReadOnly
						key="theme"
						className="cursor-default"
						textValue="Theme"
					>
						<SelectTheme/>
					</DropdownItem>
				</DropdownSection>
				<DropdownSection title="Actions" items={userRoutes}>
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
			</DropdownMenu>
		</Dropdown>
	);
};

export default NavbarUserDrop;