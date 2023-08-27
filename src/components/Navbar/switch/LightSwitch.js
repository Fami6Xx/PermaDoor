"use client";

import {useTheme} from "next-themes";
import {Switch} from "@nextui-org/switch";
import {MoonIcon} from "@/components/Navbar/switch/MoonIcon";
import {SunIcon} from "@/components/Navbar/switch/SunIcon";

const LightSwitch = () => {
	const {theme, setTheme} = useTheme();
	const currentTheme = theme;

	const ChangeTheme = () => {
		if (currentTheme === "dark") {
			setTheme("light")
		}else{
			setTheme("dark")
		}
	}

	return (
		<Switch
			onValueChange={ChangeTheme}
			isSelected={currentTheme === "dark"}
			size="lg"
			color="secondary"
			thumbIcon={({ isSelected, className }) =>
				isSelected ? (
					<MoonIcon className={className} />
				) : (
					<SunIcon className={className} />
				)
			}
		>
		</Switch>
	);
}

export default LightSwitch;