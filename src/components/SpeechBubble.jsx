import React from "react";
import ReactDOM from "react-dom";
import Typewriter from "typewriter-effect";
import { motion, AnimatePresence } from "framer-motion";

const SpeechBubble = ({ text, onDone, position }) => {
	const bubbleContent = (
		<AnimatePresence className="z-20">
			{text && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 100,
						transition: {
							duration: 0.3,
						},
					}}
					exit={{
						opacity: 0,
						transition: {
							duration: 0.3,
						},
					}}
					className="bg-stone-100 text-stone-950 p-2 border-2 border-stone-950
                    inline-block rounded-md relative max-w-xs shadow-2xl z-30"
					style={{
						position: "fixed",
						...position,
					}}
				>
					<div className="w-full h-full relative">
						<span className="text-stone-500 pr-[1px]">{text}</span>
						<div className="absolute top-0 left-0">
							<Typewriter
								options={{
									cursor: "",
									delay: 50,
								}}
								onInit={(typewriter) => {
									typewriter
										.typeString(text)
										.pauseFor(1000)
										.callFunction(onDone)
										.start();
								}}
							/>
						</div>
					</div>
					<div
						style={{
							borderLeft: "17px solid transparent",
							borderRight: "17px solid transparent",
							borderTop: "17px solid rgb(12 10 9)",
						}}
						className="absolute left-1/2 -bottom-[17px] -translate-x-1/2 w-0 h-0"
					></div>
					<div
						style={{
							borderLeft: "15px solid transparent",
							borderRight: "15px solid transparent",
							borderTop: "15px solid rgb(245 245 244)",
						}}
						className="absolute left-1/2 -bottom-3.5 -translate-x-1/2 w-0 h-0"
					></div>
				</motion.div>
			)}
		</AnimatePresence>
	);
	return ReactDOM.createPortal(
		bubbleContent,
		document.getElementById("speech-bubble-root")
	);
};

SpeechBubble.defaultProps = {
	onDone: () => console.log("done"),
};

export default SpeechBubble;
