import React, { useRef, useState } from "react";
import Container from "../components/Container";
import Play from "../components/Play";

import background from "../assets/background_scene_3.png";
import arnoldSrc from "../assets/arnold.png";
import wernerSrc from "../assets/werner.png";
import gesslerSrc from "../assets/gessler.png";
import guardSrc from "../assets/guard.png";
import appleSrc from "../assets/apple.png";
import wilhelmTellSrc from "../assets/wilhelmTell.png";
import walterTellSrc from "../assets/walterTell.png";
import poleSrc from "../assets/pole.png";

import Object, { SoundSteps } from "../components/Object";
import { sleep } from "../util/util";

/*
Szene 3: Der Apfelschuss

Hintergrund: Dorfplatz in Altdorf
Charaktere: Wilhelm Tell, sein Sohn Walter, Stauffacher und Melchthal (Gessler kommt später dazu) und dessen Wachen erscheinen von rechts.
Tell und sein Sohn Walter laufen unabsichtlich am Hut vorbei, ohne diesen zu ehren.
Wachen: «In des Kaisers Namen! Haltet an und steht! Ihr habt dem Hut nicht Reverenz bewiesen.»
Tell: «Freund, lass mich gehen.»
Wachen: «Fort, fort ins Gefängnis!»
Stauffacher und Melchthal: «Habt Einsicht, Tell war sich dessen nicht bewusst»
Gessler erscheint (auf seinem Pferd)
Gessler: "Verachtest du so deinen Kaiser, Tell, Und mich, der hier an seiner Statt gebietet?»
Tell: «Verzeiht mir lieber Herr! Aus Unbedacht, Nicht aus Verachtung Eurer ist's geschehn»
Gessler:  «Wachen! Verhaftet ihn!»
Wachen stürmen herbei und verhaften Tell.
Gessler: «Wenn du willst, dass du und dein Sohn leben, nimm die Armbrust und mach dich bereit, einen Apfel von des Knaben Kopf zu schiessen, fehlst du ihn, so ist dein Kopf verloren.
Wilhelm Tell: „Erlasset mir den Schuß. Hier ist mein Herz! Ruft Eure Reisigen und stoßt mich nieder."

Tell schießt den Apfel ab.
Stauffacher ruft: «Der Apfel ist gefallen! Der Knabe lebt!»
Gessler: «Bei Gott! der Apfel mitten durchgeschossen! Es war ein Meisterschuss, ich muss ihn loben.»
Gessler: «Aber wofür ist der zweite Pfeil, den du bei dir trägst»
Tell: «Mit diesem zweiten Pfeil durchschoss ich - Euch, Wenn ich mein liebes Kind getroffen hätte»
Gessler: «Verhaftet ihn!»
Wachen verhaften ihn

Charaktere: Wilhelm Tell, sein Sohn Walter, Gessler und dessen Wachen verlassen den Bildschirm nach links.
*/

const title = "Der Apfelschuss";

const Scene3 = () => {
	const wilhelmTell = useRef({});
	const walterTell = useRef({});
	const arnold = useRef({});
	const werner = useRef({});
	const gessler = useRef({});
	const guard1 = useRef({});
	const guard2 = useRef({});
	const apple = useRef({});
	const pole = useRef({});

	const [showApple, setShowApple] = useState(false);

	const pipeline = async () => {
		await Promise.all([
			wilhelmTell.current.move(80, 0, 20, SoundSteps),
			walterTell.current.move(80, 0, 20, SoundSteps),
		]);

		await Promise.all([
			//guard2.current.speak(
			//	"In des Kaisers Namen! Haltet an und steht! Ihr habt dem Hut nicht Reverenz bewiesen."
			//),
			(async () => {
				await sleep(500);
				wilhelmTell.current.direct("left");
				walterTell.current.direct("left");
			})(),
		]);
		//await wilhelmTell.current.speak("Freund, lass mich gehen.");
		//await guard2.current.speak("Fort, fort ins Gefängnis!");

		await Promise.all([
			arnold.current.move(50, 0, 41, SoundSteps),
			werner.current.move(50, 0, 41, SoundSteps),
		]);

		/*await arnold.current.speak(
			"Habt Einsicht, Tell war sich dessen nicht bewusst."
		);*/
		await gessler.current.move(-15, 0, 20, SoundSteps);
		wilhelmTell.current.direct("right");
		walterTell.current.direct("right");
		/*await gessler.current.speak(
			"Verachtest du so deinen Kaiser, Tell, Und mich, der hier an seiner Statt gebietet?"
		);
		await wilhelmTell.current.speak(
			"Verzeiht mir lieber Herr! Aus Unbedacht, Nicht aus Verachtung Eurer ist's geschehn"
		);
		await gessler.current.speak("Wachen! Verhaftet ihn!");*/

		await Promise.all([
			guard1.current.scale(125, 100),
			guard2.current.scale(125, 100),
			guard1.current.move(25, -5, 20, SoundSteps),
			guard2.current.move(20, -5, 20, SoundSteps),
		]);

		/*await gessler.current.speak(
			"Wenn du willst, dass du und dein Sohn leben, nimm die Armbrust und mach dich bereit, einen Apfel von des Knaben Kopf zu schiessen, fehlst du ihn, so ist dein Kopf verloren."
		);
		await wilhelmTell.current.speak(
			"Erlasset mir den Schuß. Hier ist mein Herz! Ruft Eure Reisigen und stoßt mich nieder."
		);*/

		await Promise.all([
			arnold.current.move(-5, 6, 10, SoundSteps),
			arnold.current.scale(80, 80),
			werner.current.move(-5, 6, 10, SoundSteps),
			werner.current.scale(80, 80),
		]);

		wilhelmTell.current.direct("left");
		await walterTell.current.move(-55, 0, 20, SoundSteps);

		await Promise.all([
			guard1.current.scale(100, 100),
			guard2.current.scale(100, 100),
			guard1.current.move(-25, 5, 20, SoundSteps),
			guard2.current.move(-20, 5, 20, SoundSteps),
		]);

		await Promise.all([
			guard1.current.scale(125, 100),
			guard1.current.move(-35, -5, 40, SoundSteps),
		]);

		guard1.current.direct("right");

		await sleep(500);
		setShowApple(true);
		await sleep(500);

		await Promise.all([
			guard1.current.scale(100, 100),
			guard1.current.move(35, 5, 40, SoundSteps),
		]);
	};

	return (
		<Container>
			<button
				onClick={() => {
					pipeline();
				}}
				className="absolute top-10 left-10 bg-red-500 z-50 w-36 h-14"
			>
				Play
			</button>
			<button
				onClick={() => {
					pipeline();
				}}
				className="absolute top-32 left-10 bg-emerald-500 z-50 w-36 h-14"
			>
				Shoot
			</button>
			<Play src={background}>
				<Object
					myRef={pole}
					startPosition={{
						left: 40,
						bottom: 10,
					}}
					startDirection={"right"}
					height={300}
					src={poleSrc}
				/>
				<Object
					myRef={guard1}
					startPosition={{
						left: 33,
						bottom: 10,
					}}
					startDirection={"left"}
					height={150}
					src={guardSrc}
					name="Wache"
				/>
				<Object
					myRef={guard2}
					startPosition={{
						left: 50,
						bottom: 10,
					}}
					startDirection={"right"}
					height={150}
					src={guardSrc}
					name="Wache"
				/>
				<Object
					myRef={werner}
					startPosition={{
						left: -20,
						bottom: 3,
					}}
					startDirection={"right"}
					height={200}
					src={wernerSrc}
					name="Werner"
				/>
				<Object
					myRef={arnold}
					startPosition={{
						left: -30,
						bottom: 3,
					}}
					startDirection={"right"}
					height={200}
					src={arnoldSrc}
					name="Arnold"
				/>
				<Object
					myRef={gessler}
					startPosition={{
						left: 100,
						bottom: 3,
					}}
					startDirection={"left"}
					height={200}
					src={gesslerSrc}
					name="Gessler"
				/>
				<Object
					myRef={wilhelmTell}
					startPosition={{
						left: -15,
						bottom: 3,
					}}
					startDirection={"right"}
					height={200}
					src={wilhelmTellSrc}
					name="Wilhelm Tell"
				/>
				<Object
					myRef={walterTell}
					startPosition={{
						left: -20,
						bottom: 3,
					}}
					startDirection={"right"}
					height={150}
					src={walterTellSrc}
					name="Walter Tell"
				/>
				{showApple && (
					<Object
						myRef={apple}
						startPosition={{
							left: 6.7,
							bottom: 19,
						}}
						startDirection={"right"}
						height={30}
						src={appleSrc}
					/>
				)}
			</Play>
		</Container>
	);
};

export default Scene3;
