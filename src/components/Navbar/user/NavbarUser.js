"use client";

import {Avatar} from "@nextui-org/avatar";
import NavbarSimpleAuth from "@/components/Navbar/user/auth/NavbarSimpleAuth";
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/dropdown";
import NavbarNextButton from "@/components/Navbar/user/auth/NavbarNextButton";
import NavbarNextModal from "@/components/Navbar/user/auth/NavbarNextModal";

const NavbarUser = async ({authentication, session, providers, styles}) => {
	// ToDo: Until not fixed in react-aria this dropdown wont work in server components

	if(session) {
		return (
			<Dropdown showArrow classNames={{
				base: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
				arrow: "bg-default-200",
			}}>
				<DropdownTrigger>
					<Avatar
						showFallback
						isBordered
						src={session.user.image}
						radius="sm"
						aria-label="User menu"
					/>
				</DropdownTrigger>
				<DropdownMenu variant="faded" aria-label="Dropdown user menu">
					<DropdownSection title={"User"}>
						<DropdownItem key={"userInformation"} startContent={
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="1.3em" width="1.3em" className="text-xl text-default-500 pointer-events-none flex-shrink-0">
								<path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
							</svg>
						} isReadOnly title={session.user.name} description={session.user.email}/>
					</DropdownSection>
					<DropdownSection title={"Actions"} items={authentication.userRoutes}>
						{(item) => (
							<DropdownItem
								key={item.name}
								onClick={() => router.push(item.pathname)}
								description={item.description}
								startContent={item.icon ? item.icon : null}
							>
								{item.name}
							</DropdownItem>
						)}
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>
		);
	}else {
		return (
			<>
				{
					authentication.useNextAuth ?
						<>
							<NavbarNextButton>
								<NavbarNextModal providers={providers} providerStyles={styles}/>
							</NavbarNextButton>
						</>
						:
						<NavbarSimpleAuth settings={authentication.buttons}/>
				}
			</>
		);
	}
};

export default NavbarUser;