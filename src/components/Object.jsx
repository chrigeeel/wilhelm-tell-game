import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import useSound from "use-sound";
import SpeechBubble from "./SpeechBubble";

import walking from "../assets/walking.mp3";
import running from "../assets/running.mp3";
import villager from "../assets/villager.mp3";
import swimming from "../assets/swimming.mp3";
import { getRandomInt, sleep, useWindowSize } from "../util/util";

const villagerSprite = {
	0: [0, 900],
	1: [1000, 900],
	2: [2000, 900],
	3: [3000, 900],
	4: [4000, 900],
	5: [5000, 900],
	6: [6000, 900],
	7: [7000, 900],
	8: [8000, 900],
	9: [9000, 900],
	10: [10000, 900],
	11: [11000, 900],
	12: [12000, 900],
	13: [13000, 900],
	14: [14000, 900],
};

export const SoundSteps = "steps";
export const SoundSwim = "swim";

// speed is in percent per second
const Object = ({
	className,
	myRef,
	name,
	startPosition,
	height,
	src,
	startDirection,
}) => {
	const [coordinates, setCoordinates] = useState({
		left: 0,
		bottom: 0,
	});
	const [animate, setAnimate] = useState({
		left: "0%",
		bottom: "0%",
	});
	const [transition, setTransition] = useState({
		ease: "linear",
		duration: 1,
	});
	const [speakData, setSpeakData] = useState({
		text: "",
		callback: () => {},
	});
	const [size, setSize] = useState(100);
	const [direction, setDirection] = useState(startDirection);

	const [playWalking, walkingSound] = useSound(walking);
	const [playRunning, runningSound] = useSound(running);
	const [playVillager, villagerSound] = useSound(villager, {
		sprite: villagerSprite,
	});
	const [playSwimming, swimmingSound] = useSound(swimming);
	const [rotateDeg, setRotateDeg] = useState(0);

	const move = (
		horizontalPercentage,
		verticalPercentage,
		speed,
		sound = "none"
	) => {
		setCoordinates((prevData) => ({
			left: prevData.left + horizontalPercentage,
			bottom: prevData.bottom + verticalPercentage,
		}));
		const duration = Math.abs(
			Math.max(
				Math.abs(horizontalPercentage),
				Math.abs(verticalPercentage)
			) / speed
		);
		setTransition({
			ease: "linear",
			duration,
		});
		switch (sound) {
			case SoundSteps:
				if (speed > 40) {
					playRunning();
				} else {
					playWalking();
				}
				break;
			case SoundSwim:
				playSwimming();
				break;
		}

		return new Promise((resolve, _) => {
			setTimeout(() => {
				resolve();
				switch (sound) {
					case SoundSteps:
						if (speed > 40) {
							runningSound.stop();
						} else {
							walkingSound.stop();
						}
						break;
					case SoundSwim:
						swimmingSound.stop();
						break;
				}
			}, duration * 1000);
		});
	};

	const scale = (percentage, speed) => {
		const duration = percentage / speed;

		setSize(percentage);
		setTransition({
			ease: "linear",
			duration,
		});

		return sleep(duration * 1000);
	};

	const speak = async (text) => {
		const id = `${getRandomInt(14)}`;
		playVillager({
			id,
		});
		const promise = new Promise((resolve, _) => {
			setSpeakData({
				text,
				callback: () => {
					setSpeakData({
						text: "",
						callback: () => {},
					});
					resolve();
				},
			});
		});

		return promise;
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

	const direct = (direction) => {
		setDirection(direction);
	};

	const rotate = (deg) => {
		setRotateDeg(deg);
	};

	myRef.current.move = move;
	myRef.current.jump = jump;
	myRef.current.speak = speak;
	myRef.current.scale = scale;
	myRef.current.direct = direct;
	myRef.current.rotate = rotate;

	useEffect(() => {
		setAnimate({
			height: `${(height * size) / 100}%`,
			left: `${coordinates.left}%`,
			bottom: `${coordinates.bottom}%`,
		});
	}, [coordinates, size]);

	const characterRef = useRef(null);
	const [speechBubblePosition, setSpeechBubblePosition] = useState({});
	const { width } = useWindowSize();

	useEffect(() => {
		if (characterRef.current) {
			const rect = characterRef.current.getBoundingClientRect();
			console.log(rect);
			console.log(characterRef.current.offsetWidth);
			const bubblePosition = {
				left: rect.left, // Center the speech bubble above the character
				top: rect.top - characterRef.current.offsetHeight, // Add a 10px distance to the top of the character
			};
			setSpeechBubblePosition(bubblePosition);
		}
	}, [characterRef, speakData, width]);

	return (
		<div
			style={{
				left: `${startPosition.left}%`,
				bottom: `${startPosition.bottom}%`,
			}}
			className="absolute h-full w-full"
		>
			<div className="relative h-full w-full">
				<motion.div
					initial={{
						height: `${(height * size) / 100}%`,
					}}
					style={{
						rotate: `${rotateDeg}deg`,
					}}
					animate={animate}
					transition={transition}
					className={`absolute left-0 bottom-0 ${className}`}
				>
					<div className="flex relative w-full h-full overflow-visible">
						{src && (
							<img
								src={src}
								className={`h-full drop-shadow-2xl ${
									direction === "right" && "-scale-x-100"
								}`}
								alt=""
							/>
						)}
						{name && (
							<div className="absolute -top-8 left-1/2 -translate-x-1/2">
								<span className="text-white text-center bg-stone-900 bg-opacity-70 px-2 py-1 shadow-lg whitespace-nowrap">
									{name}
								</span>
							</div>
						)}

						<div
							className="flex items-center justify-center overflow-visible
							absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-red w-80"
						>
							<SpeechBubble
								position={speechBubblePosition}
								text={speakData.text}
								onDone={speakData.callback}
							/>
							<span
								ref={characterRef}
								className="bg-transparent text-transparent pr-[1px]"
							>
								{speakData.text}
							</span>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

Object.defaultProps = {
	height: 100,
	startDirection: "left",
};

export default Object;
