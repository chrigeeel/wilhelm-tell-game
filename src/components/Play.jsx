import React from "react";

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
			<div className="flex flex-grow bg-stone-950 z-10"></div>
		</div>
	);
};

export default Play;
