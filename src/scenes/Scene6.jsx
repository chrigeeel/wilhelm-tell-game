import React, { useRef } from "react";

import background from "../assets/background_scene_6.png";
import wilhelmTellSrc from "../assets/wilhelmTell.png";
import kuoniSrc from "../assets/kuoni.png";
import ruodiSrc from "../assets/ruodi.png";
import arnoldSrc from "../assets/arnold.png";
import wernerSrc from "../assets/werner.png";
import waltherSrc from "../assets/walter.png";
import walterTellSrc from "../assets/walterTell.png";
import Container from "../components/Container";
import Play from "../components/Play";
import Object, { SoundSteps } from "../components/Object";
import { sleep } from "../util/util";
import Transition from "../components/Transition";

/*
Dialog:
Ruodi: Die Feinde sind verjagt.
Werner Stauffacher: "Wir haben es geschafft! Die Habsburger sind vertrieben!"
Walther Fürst: "Die Freiheit haben wir gemeinsam erkämpft. Lasst uns feiern!"
Arnold vom Melchtal: "Unsere erste Eidgenossenschaft ist gegründet. Die Zukunft gehört uns!"
Wilhelm Tell tritt hervor.
Wilhelm Tell: "Ich bin stolz auf das, was wir erreicht haben. Doch es ist wichtig, dass wir unsere Freiheit bewahren und uns an diejenigen erinnern, die für sie gekämpft haben. Lasst uns in Eintracht zusammenstehen."

Alle Charaktere feiern gemeinsam die Freiheit und den Sieg.

Ende des Spiels.

*/

const title = "Feier der Freiheit";

const Scene6 = ({ callback }) => {
	const wilhelmTell = useRef({});
	const kuoni = useRef({});
	const ruodi = useRef({});
	const arnold = useRef({});
	const werner = useRef({});
	const walther = useRef({});
	const walterTell = useRef({});

	const pipeline = async () => {
		await ruodi.current.speak("Die Feinde sind verjagt.");
		await werner.current.speak(
			"Wir haben es geschafft! Die Habsburger sind vertrieben!"
		);
		await walther.current.speak(
			"Die Freiheit haben wir gemeinsam erkämpft. Lasst uns feiern!"
		);
		await arnold.current.speak(
			"Unsere erste Eidgenossenschaft ist gegründet. Die Zukunft gehört uns!"
		);
		await wilhelmTell.current.move(0, 35, 20, SoundSteps);
		await wilhelmTell.current.speak(
			"Ich bin stolz auf das, was wir erreicht haben. Doch es ist wichtig, dass wir unsere Freiheit bewahren und uns an diejenigen erinnern, die für sie gekämpft haben. Lasst uns in Eintracht zusammenstehen."
		);

		await sleep(5000);

		callback();
	};

	return (
		<Container>
			<Transition title={title} onTransitionEnd={pipeline} />
			<Play src={background}>
				<Object
					myRef={walther}
					startPosition={{
						left: 34,
						bottom: 8,
					}}
					startDirection={"right"}
					height={(180 / 973) * 100}
					src={waltherSrc}
					name="Walther"
				/>
				<Object
					myRef={arnold}
					startPosition={{
						left: 30,
						bottom: 4,
					}}
					startDirection={"right"}
					height={(190 / 973) * 100}
					src={arnoldSrc}
					name="Arnold"
				/>
				<Object
					myRef={werner}
					startPosition={{
						left: 27,
						bottom: 1,
					}}
					startDirection={"right"}
					height={(200 / 973) * 100}
					src={wernerSrc}
					name="Werner"
				/>
				<Object
					myRef={ruodi}
					startPosition={{
						left: 50,
						bottom: 12,
					}}
					startDirection={"left"}
					height={(160 / 973) * 100}
					src={ruodiSrc}
					name="Ruodi"
				/>
				<Object
					myRef={kuoni}
					startPosition={{
						left: 58,
						bottom: 8,
					}}
					startDirection={"left"}
					height={(190 / 973) * 100}
					src={kuoniSrc}
					name="Kuoni"
				/>
				<Object
					myRef={walterTell}
					startPosition={{
						left: 65,
						bottom: 3,
					}}
					startDirection={"left"}
					height={(150 / 973) * 100}
					src={walterTellSrc}
					name="Walter Tell"
				/>
				<Object
					myRef={wilhelmTell}
					startPosition={{
						left: 45,
						bottom: -30,
					}}
					startDirection={"right"}
					height={(200 / 973) * 100}
					src={wilhelmTellSrc}
					name="Wilhelm Tell"
				/>
			</Play>
		</Container>
	);
};

export default Scene6;
