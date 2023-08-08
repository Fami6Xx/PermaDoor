"use client";

import SearchUser from "@/components/Friends/add/SearchUser";
import {useSession} from "next-auth/react";

const Page = () => {
	const session = useSession();
	let users = [];

	const search = (value) => {
		fetch("/api/user/find?query=" + value + "&currentUserId=" + session.data.user.id)
		.then(res => res.json())
		.then(data => {
			users = data;
			console.log(users);
		});
	}

	return (
		<>
			<div className="flex flex-row gap-2 md:gap-8 justify-center content-center items-center w-full md:mt-16 mt-8">
				<h1 className="text-3xl font-bold ml-6 mt-3">Find friends</h1>
				<SearchUser search={search}/>
			</div>

			<div className="md:m-auto md:w-[80vw] mt-8 rounded-none md:rounded-lg md:mt-8 dark:bg-opacity-30 md:dark:bg-opacity-50 lg:h-[34vw] min-h-[500px] max-h-[1000px] bg-content1 box-border shadow-small overflow-hidden">
				<div className="m-7 w-[calc(100%-56px)] min-h-[calc(500px-56px)] max-h-[calc(1000px-56px)] h-[calc(100%-56px)] bg-gray-500 bg-opacity-20 rounded overflow-auto">

				</div>
			</div>
		</>
	);
};

export default Page;