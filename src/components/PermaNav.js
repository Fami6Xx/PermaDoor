import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link";
import NavbarUser from "@/components/NavbarUser";

const PermaNav = async () => {
	// If session is needed in here, then remove it from NavbarUser and move it here.
	return (
		<Navbar>
			<NavbarBrand>
				<p className="font-bold text-inherit">PD</p>
			</NavbarBrand>
			<NavbarContent justify="center" className="hidden sm:flex gap-4">
				<NavbarItem as={Link} color="foreground" href="">Features</NavbarItem>
				<NavbarItem isActive as={Link} href="">Customers</NavbarItem>
				<NavbarItem as={Link} color="foreground" href="">Integrations</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarUser/>
			</NavbarContent>
		</Navbar>
	);
};

export default PermaNav;