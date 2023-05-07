import React, { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import Play from "../components/Play";

import background from "../assets/background_scene_4.png";

import boatSrc from "../assets/boat.png";
import wilhelmTellSrc from "../assets/wilhelmTell.png";
import guardSrc from "../assets/guard.png";
import Object, { SoundSteps, SoundSwim } from "../components/Object";
import { sleep } from "../util/util";

import hit from "../assets/hit.mp3";
import storm from "../assets/storm.mp3";
import rain from "../assets/rain.webp";
import useSound from "use-sound";
import Transition from "../components/Transition";

/*
Szene 4: Tells Flucht 
Hintergrund: Sturm auf dem Vierwaldstädtersee
Protagonist (Wilhelm Tell) gefesselt auf dem Boot.
Charaktere: Tell und Habsburger Wachen.
Dialog:
Wache: «Tell, hilf uns das Boot in diesem Sturm zu lenken, sonst werden wir sinken»
Tells Fesseln werden gelöst
Tell schafft es, vom Boot an Land zu springen und macht sich auf den Weg nach Küsnacht, wo er sich an Gessler rächen will.
Tell: «Ich muss vor Gessler in Küssnacht sein, so kann ich mich rächen!»
Tell macht sich auf den Weg

*/

const title = "Tells Flucht";

const Scene4 = ({ callback }) => {
	const boat = useRef({});
	const wilhelmTell = useRef({});
	const guard1 = useRef({});
	const guard2 = useRef({});

	const [playHit] = useSound(hit);
	const [playStorm, stormSound] = useSound(storm, {
		volume: 0.2,
	});

	const pipeline = async () => {
		playStorm();
		await guard2.current.speak(
			"Tell, hilf uns das Boot in diesem Sturm zu lenken, sonst werden wir sinken"
		);
		await guard1.current.speak("Ich entfessle dich...");
		await guard1.current.move(-5, -2, 10, SoundSteps);
		await sleep(1000);
		await guard1.current.move(5, 2, 10, SoundSteps);
		await sleep(500);
		await Promise.all([
			boat.current.move(-10, 0, 10, SoundSwim),
			wilhelmTell.current.move(-10, 0, 10),
			guard1.current.move(-10, 0, 10),
			guard2.current.move(-10, 0, 10),
		]);
		await wilhelmTell.current.move(-15, 10, 40);
		await wilhelmTell.current.move(-15, -25, 40);
		wilhelmTell.current.rotate(-90);
		playHit();
		await sleep(1500);
		wilhelmTell.current.rotate(0);
		await sleep(500);
		await wilhelmTell.current.speak(
			"Ich muss vor Gessler in Küssnacht sein, so kann ich mich rächen!"
		);
		await wilhelmTell.current.move(-50, -5, 50, SoundSteps);

		stormSound.stop();
		callback();
	};

	return (
		<Container>
			<Transition title={title} onTransitionEnd={pipeline} />
			<Play src={background}>
				<Object
					myRef={boat}
					startPosition={{
						left: 60,
						bottom: 20,
					}}
					startDirection={"right"}
					height={(125 / 973) * 100}
					src={boatSrc}
				/>
				<Object
					myRef={wilhelmTell}
					startPosition={{
						left: 65,
						bottom: 25,
					}}
					startDirection={"right"}
					height={(200 / 973) * 100}
					src={wilhelmTellSrc}
					name="Wilhelm Tell"
				/>
				<Object
					myRef={guard1}
					startPosition={{
						left: 75,
						bottom: 27,
					}}
					startDirection={"left"}
					height={(200 / 973) * 100}
					src={guardSrc}
					name="Wache"
				/>
				<Object
					myRef={guard2}
					startPosition={{
						left: 85,
						bottom: 26,
					}}
					startDirection={"left"}
					height={(200 / 973) * 100}
					src={guardSrc}
					name="Wache"
				/>
				<img
					className="h-full w-full absolute top-0 left-0"
					src={rain}
					alt=""
				/>
			</Play>
		</Container>
	);
};

export default Scene4;
