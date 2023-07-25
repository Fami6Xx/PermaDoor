"use client";

import {Button, ButtonGroup} from "@nextui-org/button";
import {useRouter} from "next/navigation";

const NavbarAuth = ({settings}) => {
	const router = useRouter();

	return (
		<>
			{
				settings.login.enabled && settings.register.enabled ?
					<ButtonGroup variant="ghost">
						<Button onPress={() => {router.push(settings.login.pathname)}}>Login</Button>
						<Button onPress={() => {router.push(settings.register.pathname)}}>Register</Button>
					</ButtonGroup>
					:
					<>
						{settings.login.enabled ? <Button variant="ghost" onPress={() => {router.push(settings.login.pathname)}}>Login</Button> : <></>}
						{settings.register.enabled ? <Button variant="ghost" onPress={() => {router.push(settings.register.pathname)}}>Register</Button> : <></>}
					</>
			}
		</>
	);
};

export default NavbarAuth;