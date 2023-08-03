import {Avatar} from "@nextui-org/avatar";
import NavbarSimpleAuth from "@/components/Navbar/user/auth/NavbarSimpleAuth";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {getProviders} from "next-auth/react";
import NavbarNextButton from "@/components/Navbar/user/auth/NavbarNextButton";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import NavbarNextModal from "@/components/Navbar/user/auth/NavbarNextModal";

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