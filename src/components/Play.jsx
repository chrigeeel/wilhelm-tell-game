import React from "react";

import * as AspectRatio from "@radix-ui/react-aspect-ratio";

const Play = ({ children, src }) => {
	return (
		<div className="flex w-full h-full">
			<div className="flex flex-grow bg-stone-950 z-10"></div>
			<div className="aspect-square h-screen mx-auto bg-slate-500 relative">
				<img
					className="absolute top-0 left-0 h-full w-full"
					src={src}
					alt=""
				/>
				{children}
			</div>
			<div className="flex flex-grow bg-stone-950  z-10"></div>
		</div>
	);
};

export default Play;
