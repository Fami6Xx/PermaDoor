import {ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import {signIn} from "next-auth/react";
import NavbarProviderImage from "@/components/Navbar/user/auth/NavbarProviderImage";

const NavbarNextModal = ({providers, providerStyles}) => {
	return (
		<>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">Sign in</ModalHeader>
				<ModalBody>
					{Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<Button
								fullWidth
								variant="ghost"
								size="lg"
								startContent={<NavbarProviderImage logoDark={providerStyles[provider.id].logoDark} logo={providerStyles[provider.id].logo}/>}
								onPress={() => signIn(provider.id)}
							>
								Sign in with <b>{provider.name}</b>
							</Button>
						</div>
					))}
				</ModalBody>
				<ModalFooter/>
			</ModalContent>
		</>
	);
};

export default NavbarNextModal;