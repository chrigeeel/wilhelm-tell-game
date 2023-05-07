import React, { useEffect, useRef } from "react";
import Container from "../components/Container";
import Transition from "../components/Transition";
import Object, { SoundSteps, SoundSwim } from "../components/Object";
import SpeechBubble from "../components/SpeechBubble";
import { sleep } from "../util/util";

import background from "../assets/background_scene_1.png";
import boatSrc from "../assets/boat.png";
import wilhelmTellSrc from "../assets/wilhelmTell.png";
import kuoniSrc from "../assets/kuoni.png";
import ruodiSrc from "../assets/ruodi.png";
import konradBaumgartenSrc from "../assets/konradBaumgarten.png";
import Play from "../components/Play";

const title = "Am Vierwaldstätter See";

const Scene1 = ({ callback }) => {
	const wilhelmTell = useRef({});
	const kuoni = useRef({});
	const ruodi = useRef({});
	const konradBaumgarten = useRef({});
	const boat = useRef({});

	const pipeline = async () => {
		console.log("pipeline start");
		await Promise.all([
			kuoni.current.move(-60, 0, 40, SoundSteps),
			ruodi.current.move(-64, 0, 40, SoundSteps),
		]);
		await sleep(1000);
		await konradBaumgarten.current.move(-55, 0, 60, SoundSteps);
		console.log("done");
		kuoni.current.direct("right"), await sleep(500);
		await kuoni.current.speak(
			"Seht, dort ist Konrad Baumgarten, der vor den habsburgischen Soldaten flieht!"
		);
		await ruodi.current.direct("right");
		await ruodi.current.speak("Nun, nun, was gibt's so eilig?");
		await konradBaumgarten.current.speak(
			"Eilt, eilt, die Habsburger sind mir dicht schon an den Fersen! Bitte nehmt mich auf das Boot und bringt mich über den See."
		);
		await ruodi.current.speak(
			"Ein schweres Ungewitter ist Im Anzug. Ihr müsst warten... Ich kann nicht steuern gegen Sturm und Wellen."
		);
		await wilhelmTell.current.move(15, 0, 20, SoundSteps);
		await wilhelmTell.current.speak(
			"Wo's not tut, Fährmann, lässt sich alles wagen. Ich will's mit meiner schwachen Kraft versuchen. Lasst uns schnell handeln!"
		);
		await sleep(500);
		await Promise.all([
			wilhelmTell.current.move(13, 25, 20, SoundSteps),
			konradBaumgarten.current.move(-13, 25, 30, SoundSteps),
		]);
		await sleep(500);
		await Promise.all([
			wilhelmTell.current.move(4, 8, 5),
			konradBaumgarten.current.move(7, 8, 5),
		]);

		Promise.all([
			wilhelmTell.current.scale(60, 12),
			wilhelmTell.current.move(2, 10, 1, SoundSwim),
			konradBaumgarten.current.scale(60, 12),
			konradBaumgarten.current.move(-7, 10, 1),
			boat.current.scale(60, 12),
			boat.current.move(0, 12, 1.2),
		]);

		await sleep(1000);

		await Promise.all([
			kuoni.current.move(-80, 0, 30),
			ruodi.current.move(-80, 0, 30),
		]);

		callback();
	};

	return (
		<Container>
			<Transition title={title} onTransitionEnd={pipeline} />
			<Play src={background}>
				<Object
					myRef={boat}
					startPosition={{
						left: 45,
						bottom: 47,
					}}
					src={boatSrc}
					height={(70 / 973) * 100}
				/>
				<Object
					myRef={wilhelmTell}
					name="Wilhelm Tell"
					src={wilhelmTellSrc}
					startPosition={{
						left: 10,
						bottom: 18,
					}}
					startDirection={"right"}
					height={(200 / 973) * 100}
				/>
				<Object
					myRef={kuoni}
					name="Kuoni"
					src={kuoniSrc}
					startPosition={{
						left: 100,
						bottom: 18,
					}}
					height={(200 / 973) * 100}
				/>
				<Object
					myRef={ruodi}
					name="Ruodi"
					src={ruodiSrc}
					startPosition={{
						left: 110,
						bottom: 18,
					}}
					height={(200 / 973) * 100}
				/>
				<Object
					myRef={konradBaumgarten}
					name="Konrad Baumgarten"
					src={konradBaumgartenSrc}
					startPosition={{
						left: 120,
						bottom: 18,
					}}
					height={(200 / 973) * 100}
				/>
			</Play>
		</Container>
	);
};

export default Scene1;

/*
Szene 1: Am Vierwaldstätter See

Hintergrund: Vierwaldstätter See
Protagonist (Wilhelm Tell) steht links im Bild.
Charaktere: Kuoni (Hirte), Ruodi(Fischer) und Konrad Baumgarten erscheinen von rechts.
Dialog:
Kuoni: "Seht, dort ist Konrad Baumgarten, der vor den habsburgischen Soldaten flieht!"
Ruodi: «Nun, nun, was gibt's so eilig?»
Konrad Baumgarten: «Eilt, eilt, die Habsburger sind mir dicht schon an den Fersen! Bitte nehmt mich auf das Boot und bringt mich über den See.»
Ruodi: " Ein schweres Ungewitter ist Im Anzug. Ihr müsst warten... Ich kann nicht steuern gegen Sturm und Wellen»
Willhelm Tell tritt hinzu
Wilhelm Tell: " Wo's not tut, Fährmann, lässt sich alles wagen. Ich will's mit meiner schwachen Kraft versuchen. Lasst uns schnell handeln!"

Tell und Baumgarten steigen ins Boot und fahren ab
Charaktere: Kuoni, Ruodi verlassen den Bildschirm nach links.

*/
