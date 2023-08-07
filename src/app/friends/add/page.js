"use client";

import SearchUser from "@/components/Friends/add/SearchUser";

const Page = () => {
	let users = [];

	const search = async (value) => {
		console.log("searching " + value);
		console.log(users);
	}

	return (
		<>
			<div className="flex flex-row gap-2 md:gap-8 justify-center content-center items-center w-full md:mt-16 mt-8">
				<h1 className="text-3xl font-bold ml-6 mt-3">Find friends</h1>
				<SearchUser search={search}/>
			</div>
		</>
	);
};

export default Page;