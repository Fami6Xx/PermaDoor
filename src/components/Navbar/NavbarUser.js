import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {Avatar} from "@nextui-org/avatar";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import NavbarUserContent from "@/components/Navbar/NavbarUserContent";
import {Button} from "@nextui-org/button";

const NavbarUser = async ({authentication}) => {
	const session = await getServerSession(authOptions);
	if(session) {
		return (
			<Popover showArrow placement="bottom">
				<PopoverTrigger>
					<Avatar
						showFallback
						isBordered
						src={session.user.image}
						radius="sm"
						className="transition-transform"
					/>
				</PopoverTrigger>
				<PopoverContent>
					<NavbarUserContent name={session.user.name} routes={authentication.userRoutes}/>
				</PopoverContent>
			</Popover>
		);
	}else {
		// ToDo: Maybe recode it to be as ButtonGroup not as two buttons, it could look better
		return (
			<>
				{authentication.buttons.login.enabled ? <Button color="primary" variant="faded">LOGIN</Button> : <></>}
				{authentication.buttons.register.enabled ? <Button color="primary" variant="faded">REGISTER</Button> : <></>}
			</>
		);
	}
};

export default NavbarUser;