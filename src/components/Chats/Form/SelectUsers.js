"use client";

import {Select, SelectItem} from "@nextui-org/select";
import {User} from "@nextui-org/user";
import {useEffect, useState} from "react";

/**
 * @param users {Array<SelectUser>} - Array of users
 * @param selectionChanged {function} - Function that will be called when selection changes
 * @param errors {boolean} - If there are errors
 * @returns {JSX.Element}
 * @constructor
 */
const SelectUsers = ({users, selectionChanged, errors}) => {
	const [values, setValues] = useState(new Set([]));

	useEffect(() => {
		selectionChanged ? selectionChanged(values) : null;
	}, [values]);

	return (
		<>
			<Select
				items={users}
				label={users.length === 0 ? "No users found" : "Select users to have a conversation with"}
				disabled={users.length === 0}
				placeholder="No users selected"
				labelPlacement="outside"
				selectionMode="multiple"
				selectedKeys={values}
				onSelectionChange={setValues}
				className="max-w-xs"
				variant="bordered"
				errorMessage={errors ? "You need to select at least one user" : null}
			>
				{(user) => (
					<SelectItem
						key={user.id}
						textValue={user.global_name}
					>
						<User
							avatarProps={{
								src: user.image,
							}}
							name={user.global_name}
							isFocusable
						/>
					</SelectItem>
				)}
			</Select>
		</>
	);
};

/**
 * @typedef {Object} SelectUser
 * @property {string} id - ID of the user
 * @property {string} global_name - Global name of the user
 * @property {string} image - Image of the user
 */

export default SelectUsers;