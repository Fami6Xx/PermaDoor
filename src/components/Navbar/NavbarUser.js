import {Avatar} from "@nextui-org/avatar";
import NavbarUserContent from "@/components/Navbar/NavbarUserContent";
import NavbarAuth from "@/components/Navbar/NavbarAuth";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";

const NavbarUser = async ({authentication, session}) => {
	// ToDo: Until not fixed in react-aria this dropdown wont work in server components
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
				<NavbarAuth settings={authentication.buttons}/>
			</>
		);
	}
};

export default NavbarUser;