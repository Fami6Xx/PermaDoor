"use client";

import {useRouter} from "next/navigation";
import {Button} from "@nextui-org/button";
import {Divider} from "@nextui-org/divider";
import {Spacer} from "@nextui-org/spacer";

const NavbarUserContent = ({name}) => {
	const router = useRouter();
	return (
		<>
			<Spacer y={2}/>
			<p>{name}</p>
			<Spacer y={2}/>
			<Divider/>
			<Spacer y={1}/>
			<Button variant="light" size="md" radius="sm" onPress={(e) => {router.push("/api/auth/signout")}}>Logout</Button>
		</>
	);
};

export default NavbarUserContent;