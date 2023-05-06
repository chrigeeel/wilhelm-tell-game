import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

// speed is in percent per second
const Object = ({ className, myRef, name }) => {
	const [coordinates, setCoordinates] = useState({
		left: 0,
		bottom: 50,
	});
	const [animate, setAnimate] = useState({
		left: "0%",
		bottom: "0%",
	});
	const [transition, setTransition] = useState({
		ease: "linear",
		duration: 1,
	});

	// speed is in percentage per seconds
	const moveHorizontal = (percentage, speed) => {
		setCoordinates((prevData) => ({
			left: prevData.left + percentage,
			bottom: prevData.bottom,
		}));
		const duration = percentage / speed;
		setTransition({
			ease: "linear",
			duration,
		});
	};

	const jump = (upPercentage, fallPercentage, speed) => {
		setCoordinates((prevData) => ({
			left: prevData.left,
			bottom: prevData.bottom + upPercentage,
		}));
		const duration = upPercentage / speed;
		setTransition({
			ease: "linear",
			duration,
		});
		setTimeout(() => {
			setCoordinates((prevData) => ({
				left: prevData.left,
				bottom: prevData.bottom - fallPercentage,
			}));
			const duration = fallPercentage / speed;
			setTransition({
				ease: "linear",
				duration,
			});
		}, duration * 1000);
	};

	myRef.current.moveHorizontal = moveHorizontal;
	myRef.current.jump = jump;

	useEffect(() => {
		setAnimate({
			left: `${coordinates.left}%`,
			bottom: `${coordinates.bottom}%`,
			ease: "linear",
		});
	}, [coordinates]);

	return (
		<motion.div
			animate={animate}
			transition={transition}
			className={`absolute left-0 bottom-0 ${className}`}
		>
			<div className="relative w-full h-full">
				<div className="absolute -top-10 bg-slate-800 w-full text-center">
					<span className="text-white text-2xl">{name}</span>
				</div>
			</div>
		</motion.div>
	);
};

export default Object;
