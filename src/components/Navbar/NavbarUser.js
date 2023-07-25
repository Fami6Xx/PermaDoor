import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {Avatar} from "@nextui-org/avatar";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import NavbarUserContent from "@/components/Navbar/NavbarUserContent";
import {Button, ButtonGroup} from "@nextui-org/button";

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
		return (
			<>
				{
					authentication.buttons.login.enabled && authentication.buttons.register.enabled ?
						<ButtonGroup variant="ghost">
							<Button>Login</Button>
							<Button>Register</Button>
						</ButtonGroup>
						:
						<>
							{authentication.buttons.login.enabled ? <Button variant="ghost">Login</Button> : <></>}
							{authentication.buttons.register.enabled ? <Button variant="ghost">Register</Button> : <></>}
						</>
				}
			</>
		);
	}
};

export default NavbarUser;