import {NavbarBrand, NavbarContent} from "@nextui-org/navbar";
import NavbarUser from "@/components/Navbar/user/NavbarUser";
import NavbarContentGenerator from "@/components/Navbar/NavbarContentGenerator";
import Image from "next/image";
import NavbarBody from "@/components/Navbar/NavbarBody";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getProviders} from "next-auth/react";

const PermaNav = async () => {
	const siteInfo = {
		name: "PD",
		logo:
			<div className={"m-1 ml-3"}>
				<Image
					src="https://cdn.discordapp.com/app-icons/1126625590770925628/ba49f2dbe1be940037b34820f0b1a23c.png?size=256"
					alt="ICON"
					priority={true}
					width={32}
					height={32}
				/>
			</div>,
		authentication: {
			enabled: true,
			useNextAuth: true, // If true then the settings in buttons are ignored
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

	const session = await getServerSession(authOptions);

	// Providers and styles will be moved to NavbarUser when the bugs are fixed
	const providers = await getProviders();
	let styles = {};

	authOptions.providers.map((config) => (
		styles[config.id] = config.style
	));

	return (
		<NavbarBody routes={siteInfo.routes} userRoutes={session ? siteInfo.authentication.userRoutes : false}>
			<NavbarBrand>
				{siteInfo.logo}
				<p className="font-bold text-inherit">{siteInfo.name}</p>
			</NavbarBrand>
			<NavbarContent justify="center" className="hidden sm:flex gap-4">
				<NavbarContentGenerator routes={siteInfo.routes}/>
			</NavbarContent>
			<NavbarContent justify="end">
				{siteInfo.authentication.enabled ?
					<NavbarUser authentication={siteInfo.authentication} session={session} providers={providers} styles={styles}/>
					:
					<></>
				}
			</NavbarContent>
		</NavbarBody>
	);
};

export default PermaNav;