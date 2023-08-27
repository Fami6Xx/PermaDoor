"use client";

import {Select, SelectItem} from "@nextui-org/select";
import {useTheme} from "next-themes";

const SelectTheme = () => {
	const {theme, setTheme} = useTheme();

	function selectTheme(theme) {
		setTheme(theme.currentKey);
	}

	return (
		<Select
			color="default"
			placeholder="Selected theme"
			disableAnimation={false}
			radius="sm"
			size="md"
			fullWidth={false}
			disableSelectorIconRotation={false}
			isInvalid={false}
			isMultiline={true}
			labelPlacement="inside"
			variant="flat"
			label="Theme"
			isLabelPlaceholder={false}
			selectedKeys={[theme]}
			onSelectionChange={(keys) => selectTheme(keys)}
		>
			<SelectItem key="system">System</SelectItem>
			<SelectItem key="dark">Dark</SelectItem>
			<SelectItem key="light">Light</SelectItem>
		</Select>
	);
}

export default SelectTheme;