import {ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import NavbarAuthProvider from "@/components/Navbar/user/auth/NavbarAuthProvider";
import {getProviders} from "next-auth/react";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const NavbarNextModal = async () => {
	const providers = await getProviders();
	let styles = {};

	authOptions.providers.map((config) => (
		styles[config.id] = config.style
	));

	return (
		<>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">Sign in</ModalHeader>
				<ModalBody>
					{Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<NavbarAuthProvider
								providerId={provider.id}
								providerName={provider.name}
								logo={styles[provider.id].logo}
								logoDark={styles[provider.id].logoDark}
							>
								Sign in with <b>{provider.name}</b>
							</NavbarAuthProvider>
						</div>
					))}
				</ModalBody>
				<ModalFooter/>
			</ModalContent>
		</>
	);
};

export default NavbarNextModal;