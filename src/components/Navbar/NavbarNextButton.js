"use client";

import {useDisclosure} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {Modal} from "@nextui-org/modal";

const NavbarNextButton = (props) => {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();

	return (
		<>
			<Button variant="ghost" onPress={onOpen}>Sign in</Button>
			<Modal
				isOpen={isOpen}
				size="xs"
				onOpenChange={onOpenChange}
			>
				{...props.children}
			</Modal>
		</>
	);
};

export default NavbarNextButton;