import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {Avatar} from "@nextui-org/avatar";
import NavbarUserContent from "@/components/Navbar/NavbarUserContent";
import NavbarAuth from "@/components/Navbar/NavbarAuth";

const NavbarUser = async ({authentication, session}) => {
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
				<NavbarAuth settings={authentication.buttons}/>
			</>
		);
	}
};

export default NavbarUser;