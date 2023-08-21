import {ScrollShadow} from "@nextui-org/scroll-shadow";

const Wrapper = ({children}) => {
	return (
		<ScrollShadow orientation="horizontal" hideScrollBar className="flex flex-row gap-4 max-w-[80%] md:max-w-[90%] h-full lg:max-w-[1080px]" key="wrapper">
			{children}
		</ScrollShadow>
	);
}

export default Wrapper;