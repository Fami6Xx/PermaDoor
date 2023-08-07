import {NavbarBrand, NavbarContent} from "@nextui-org/navbar";
import NavbarUser from "@/components/Navbar/user/NavbarUser";
import NavbarContentGenerator from "@/components/Navbar/NavbarContentGenerator";
import Image from "next/image";
import NavbarBody from "@/components/Navbar/NavbarBody";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

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
					pathname: "/api/auth/signout",
					description: "Logout from your account",
					icon: <>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="1.3em" width="1.3em" className="text-xl text-default-500 pointer-events-none flex-shrink-0">
							<path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
						</svg>
					</>
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
					<NavbarUser authentication={siteInfo.authentication} session={session}/>
					:
					<></>
				}
			</NavbarContent>
		</NavbarBody>
	);
};

export default PermaNav;