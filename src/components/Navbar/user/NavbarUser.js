import NavbarSimpleAuth from "@/components/Navbar/user/auth/NavbarSimpleAuth";
import NavbarNextButton from "@/components/Navbar/user/auth/NavbarNextButton";
import NavbarNextModal from "@/components/Navbar/user/auth/NavbarNextModal";
import NavbarUserDrop from "@/components/Navbar/user/NavbarUserDrop";

const NavbarUser = ({authentication, session, providers, styles}) => {
	// ToDo: Until not fixed in react-aria this dropdown wont work in server components

	if(session) {
		return (
			<NavbarUserDrop userRoutes={authentication.userRoutes} name={session.user.name} email={session.user.email} image={session.user.image}/>
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