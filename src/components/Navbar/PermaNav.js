import {Navbar, NavbarBrand, NavbarContent} from "@nextui-org/navbar";
import NavbarUser from "@/components/Navbar/NavbarUser";
import NavbarContentGenerator from "@/components/Navbar/NavbarContentGenerator";

const PermaNav = async () => {
	// If session is needed in here, then remove it from NavbarUser and move it here.
	const siteInfo = {
		name: "PD",
		logo: <></>,
		routes: [
			{
				name: "Home",
				pathname: "/"
			},
			{
				name: "Features",
				pathname: "/features"
			},
			{
				name: "Customers",
				pathname: "/customers",
			},
			{
				name: "Integrations",
				pathname: "/integrations"
			},
			{
				name: "FAQ",
				pathname: "/faq"
			}
		],
	};

	return (
		<Navbar>
			<NavbarBrand>
				{siteInfo.logo}
				<p className="font-bold text-inherit">{siteInfo.name}</p>
			</NavbarBrand>
			<NavbarContent justify="center" className="hidden sm:flex gap-4">
				<NavbarContentGenerator routes={siteInfo.routes}/>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarUser/>
			</NavbarContent>
		</Navbar>
	);
};

export default PermaNav;