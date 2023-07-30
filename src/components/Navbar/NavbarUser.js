import {Avatar} from "@nextui-org/avatar";
import NavbarSimpleAuth from "@/components/Navbar/NavbarSimpleAuth";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {getProviders} from "next-auth/react";
import NavbarNextAuth from "@/components/Navbar/NavbarNextAuth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const NavbarUser = async ({authentication, session}) => {
	// ToDo: Until not fixed in react-aria this dropdown wont work in server components
	const providers = await getProviders();
	let styles = {};

	authOptions.providers.map((config) => (
		styles[config.id] = config.style
	));

	if(session) {
		return (
			<Dropdown>
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
					<DropdownItem key="mother" title="Your Mother" description="Not gonna give you up"/>
				</DropdownMenu>
			</Dropdown>
		);
	}else {
		return (
			<>
				{
					authentication.useNextAuth ?
						<NavbarNextAuth providers={providers} providerStyles={styles}/>
						:
						<NavbarSimpleAuth settings={authentication.buttons}/>
				}
			</>
		);
	}
};

export default NavbarUser;