import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

const Transition = ({ title, description, onTransitionEnd, duration }) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setVisible(false);
		}, duration + 1000);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{
						opacity: 100,
					}}
					animate={{
						opacity: 100,
						transition: {
							duration: 1,
						},
					}}
					exit={{
						opacity: 0,
						transition: {
							duration: 1,
							onComplete: onTransitionEnd,
						},
					}}
					className="flex items-center justify-center
                    h-screen w-screen bg-stone-950
                    absolute top-0 left-0 z-50"
				>
					<span className="text-7xl text-stone-100">{title}</span>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

Transition.defaultProps = {
	duration: 4000,
	onTransitionEnd: () => console.log("transition end"),
};

export default Transition;
