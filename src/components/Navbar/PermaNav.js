import {NavbarBrand, NavbarContent} from "@nextui-org/navbar";
import NavbarUser from "@/components/Navbar/NavbarUser";
import NavbarContentGenerator from "@/components/Navbar/NavbarContentGenerator";
import Image from "next/image";
import NavbarBody from "@/components/Navbar/NavbarBody";

const PermaNav = async () => {
	const siteInfo = {
		name: "PD",
		logo:
			<div className={"m-1 ml-3"}>
				<Image
					src="https://cdn.discordapp.com/app-icons/1126625590770925628/ba49f2dbe1be940037b34820f0b1a23c.png?size=256"
					alt="ICON"
					width={32}
					height={32}
				/>
			</div>,
		authentication: {
			enabled: true,
			showUser: true,
			userRoutes: [
				{
					name: "Logout",
					pathname: "/api/auth/signout"
				},
			],
			buttons: {
				login: {
					enabled: true,
					pathname: "/api/auth/signin"
				},
				register: {
					enabled: true,
					pathname: "/api/auth/signin"
				},
			},
		},
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
		<NavbarBody routes={siteInfo.routes}>
			<NavbarBrand>
				{siteInfo.logo}
				<p className="font-bold text-inherit">{siteInfo.name}</p>
			</NavbarBrand>
			<NavbarContent justify="center" className="hidden sm:flex gap-4">
				<NavbarContentGenerator routes={siteInfo.routes}/>
			</NavbarContent>
			{siteInfo.authentication.enabled ?
				<NavbarContent justify="end">
					{siteInfo.authentication.showUser ?
						<NavbarUser authentication={siteInfo.authentication}/>
						:
						<></>
					}
				</NavbarContent>
				:
				<NavbarContent justify="end"></NavbarContent>
			}
		</NavbarBody>
	);
};

export default PermaNav;