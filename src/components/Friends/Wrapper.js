"use client";

const Wrapper = ({children}) => {
	return (
		<div className="flex flex-row gap-4 w-[80%] md:w-[90%] max-w-[1080px] pb-4 overflow-auto" key="wrapper">
			{children}
		</div>
	);
}

export default Wrapper;