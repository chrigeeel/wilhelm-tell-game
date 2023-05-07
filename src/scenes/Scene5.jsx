import React, { useRef, useState } from "react";

import background from "../assets/background_scene_5.png";
import wilhelmTellSrc from "../assets/wilhelmTell.png";
import gesslerSrc from "../assets/gessler.png";
import guardSrc from "../assets/guard.png";
import arrowSrc from "../assets/arrow.png";
import bloodSrc from "../assets/blood.png";
import shootSrc from "../assets/shoot.mp3";
import enderdragonSrc from "../assets/enderdragon.mp3";

import Object, { SoundSteps } from "../components/Object";
import { sleep } from "../util/util";
import useSound from "use-sound";
import Container from "../components/Container";
import Play from "../components/Play";
import Transition from "../components/Transition";

/*
Szene 5: Gesslers Tod
Hintergrund: Gasse im Wald vor Küssnacht
Protagonist (Wilhelm Tell) versteckt sich hinter einem Strauch mit seiner Armbrust
Charaktere: Tell 
Tell: «Durch diese hohle Gasse muss er kommen, Es führt kein andrer Weg nach Küssnacht»
Monolog Tell: «
Gessler und seine Gefolgschaft (Wachen) erscheinen,
Tell schiesst und trifft Gessler
Gessler sinkt ab, seine letzten Worte sind: «„Das ist Tells Geschoß.“»

*/

const title = "Gesslers Tod";

const Scene5 = ({ callback }) => {
	const wilhelmTell = useRef({});
	const gessler = useRef({});
	const guard1 = useRef({});
	const guard2 = useRef({});
	const arrow = useRef({});

	const [showArrow, setShowArrow] = useState(false);
	const [showBlood, setShowBlood] = useState(false);
	const [playShoot] = useSound(shootSrc);
	const [playEnderdragon] = useSound(enderdragonSrc);

	const pipeline = async () => {
		await wilhelmTell.current.speak(
			"Durch diese hohle Gasse muss er kommen, Es führt kein andrer Weg nach Küssnacht"
		);

		await Promise.all([
			guard1.current.move(-10, -15, 3, SoundSteps),
			guard1.current.scale(450, 90),
			guard2.current.move(5, -15, 3, SoundSteps),
			guard2.current.scale(450, 90),
			gessler.current.move(-2, -15, 3, SoundSteps),
			gessler.current.scale(450, 90),
		]);

		await shoot();

		await gessler.current.speak("Das ist Tells Geschoss.");
		gessler.current.rotate(90);
		gessler.current.move(0, -13, 1);
		setShowArrow(false);
		setShowBlood(false);
		playEnderdragon();
		await sleep(14_000);
		wilhelmTell.current.direct("left");
		await wilhelmTell.current.move(-40, 0, 30, SoundSteps);

		callback();
	};

	const shoot = async () => {
		setShowArrow(true);
		playShoot();
		await sleep(50);
		await arrow.current.move(35, 3, 10);
		setShowBlood(true);
		await sleep(300);
	};

	return (
		<Container>
			<Transition title={title} onTransitionEnd={pipeline} />
			<Play src={background}>
				<Object
					myRef={wilhelmTell}
					startPosition={{
						left: 5,
						bottom: 33,
					}}
					startDirection={"right"}
					height={(250 / 973) * 100}
					src={wilhelmTellSrc}
					name="Wilhelm Tell"
				/>
				<Object
					myRef={guard1}
					startPosition={{
						left: 45,
						bottom: 52,
					}}
					startDirection={"left"}
					height={(50 / 973) * 100}
					src={guardSrc}
					name="Wache"
				/>
				<Object
					myRef={guard2}
					startPosition={{
						left: 50,
						bottom: 53,
					}}
					startDirection={"right"}
					height={(50 / 973) * 100}
					src={guardSrc}
					name="Wache"
				/>
				<Object
					myRef={gessler}
					startPosition={{
						left: 48,
						bottom: 51,
					}}
					startDirection={"left"}
					height={(50 / 973) * 100}
					src={gesslerSrc}
					name="Gessler"
				/>
				{showArrow && (
					<Object
						myRef={arrow}
						startPosition={{
							left: 12,
							bottom: 51,
						}}
						startDirection={"right"}
						height={(50 / 973) * 100}
						src={arrowSrc}
					/>
				)}
				{showBlood && (
					<Object
						myRef={arrow}
						startPosition={{
							left: 49.5,
							bottom: 55,
						}}
						startDirection={"right"}
						height={(30 / 973) * 100}
						src={bloodSrc}
					/>
				)}
			</Play>
		</Container>
	);
};

export default Scene5;
