import {ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import NavbarAuthProvider from "@/components/Navbar/user/auth/NavbarAuthProvider";

const NavbarNextModal = ({providers, providerStyles}) => {
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
								logo={providerStyles[provider.id].logo}
								logoDark={providerStyles[provider.id].logoDark}
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