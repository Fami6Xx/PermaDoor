import {NavbarBrand, NavbarContent} from "@nextui-org/navbar";
import NavbarUser from "@/components/Navbar/user/NavbarUser";
import NavbarContentGenerator from "@/components/Navbar/NavbarContentGenerator";
import Image from "next/image";
import NavbarBody from "@/components/Navbar/NavbarBody";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const PermaNav = async () => {
	const siteInfo = {
		name: "",
		logo:
			<div className={"m-1 ml-3"}>
				<svg id="Vrstva_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-10 h-10">
					<circle cx="128" cy="128" r="115.294" fill="#000" stroke="#000" strokeMiterlimit="10"
									strokeWidth="0.75" />
					<path
						d="M182.563,98.919a48.621,48.621,0,0,1,25.922,25.923,48.647,48.647,0,0,1,0,37.807,48.621,48.621,0,0,1-25.922,25.923,47.367,47.367,0,0,1-18.9,3.822H155.6l-9.174-16.957H163.66a27.71,27.71,0,0,0,11.327-2.364,28.186,28.186,0,0,0,9.313-6.6,31.4,31.4,0,0,0,6.255-10.078,34.287,34.287,0,0,0,2.293-12.649,33.9,33.9,0,0,0-2.293-12.509,31.412,31.412,0,0,0-6.255-10.078,29.127,29.127,0,0,0-9.313-6.671,27.087,27.087,0,0,0-11.327-2.433H141.42v80.34H121.961V95.1h41.7A47.384,47.384,0,0,1,182.563,98.919Z"
						fill="#fff" />
					<path
						d="M118.135,69.6a35.743,35.743,0,0,1,10.981,7.367,34.34,34.34,0,0,1,7.436,10.911,33.821,33.821,0,0,1-7.436,37.529,36.361,36.361,0,0,1-10.981,7.3,33.2,33.2,0,0,1-13.343,2.71H93.95L83.386,115.952h21.406a14.276,14.276,0,0,0,5.768-1.181,13.413,13.413,0,0,0,4.656-3.336,16.807,16.807,0,0,0,3.128-5.143,17.838,17.838,0,0,0,1.181-6.6,15.316,15.316,0,0,0-1.181-5.908,18.329,18.329,0,0,0-3.128-5.073A15.569,15.569,0,0,0,110.56,85.1a12.49,12.49,0,0,0-5.768-1.39h-24.6v80.479H60.869v-97.3h43.923A33.2,33.2,0,0,1,118.135,69.6Z"
						fill="#fff" stroke="#000" strokeMiterlimit="10" strokeWidth="2" />
				</svg>
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
				name: "Friends",
				pathname: "/friends",
				protected: true
			},
			{
				name: "Chats",
				pathname: "/chats",
				protected: true
			},
			{
				name: "Add Friend",
				pathname: "/friends/add",
				protected: true
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
				<NavbarContentGenerator routes={siteInfo.routes} isLoggedIn={!!session}/>
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