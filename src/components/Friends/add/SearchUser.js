"use client";

import {Input} from "@nextui-org/input";
import {useEffect, useState} from "react";

const SearchUser = ({search}) => {
	const [value, setValue] = useState("");
	const [lastKeypressTime, setLastKeypressTime] = useState(0);
	const delay = 1000; // ms

	useEffect(() => {
		if (lastKeypressTime === 0) return;

		const timerId = setTimeout(() => {
			if (Date.now() - lastKeypressTime >= delay) {
				fetchYourData();
			}
		}, delay);

		return () => {
			clearTimeout(timerId);
		};
	}, [lastKeypressTime]);

	function update(value) {
		setLastKeypressTime(Date.now());
		setValue(value);
	}

	function fetchYourData() {
		if(value === "") return;
		if(value.trim() === "") return;

		search(value);
	}

	return (
		<>
			<Input
				className="w-64"
				type="text"
				variant="bordered"
				label="Username"
				value={value}
				onValueChange={update}
			/>
		</>
	);
};

export default SearchUser;