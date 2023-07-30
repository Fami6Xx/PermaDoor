"use client";

import {useDisclosure} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import Image from "next/image";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {useTheme} from "next-themes";
import {signIn} from "next-auth/react";

const NavbarNextAuth = ({providers, providerStyles}) => {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const { resolvedTheme, setTheme } = useTheme()

	return (
		<>
			<Button variant="ghost" onPress={onOpen}>Sign in</Button>
			<Modal
				isOpen={isOpen}
				size="xs"
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">Sign in</ModalHeader>
					<ModalBody>
						{Object.values(providers).map((provider) => (
							<div key={provider.name}>
								<Button
									fullWidth
									variant="ghost"
									size="lg"
									startContent={<Image alt={provider.name} width={25} height={25} src={`https://authjs.dev/img/providers${resolvedTheme === "dark" ? providerStyles[provider.id].logoDark : providerStyles[provider.id].logo}`}/>}
									onPress={() => signIn(provider.id)}
								>
									Sign in with <b>{provider.name}</b>
								</Button>
							</div>
						))}
					</ModalBody>
					<ModalFooter/>
				</ModalContent>
			</Modal>
		</>
	);
};

export default NavbarNextAuth;