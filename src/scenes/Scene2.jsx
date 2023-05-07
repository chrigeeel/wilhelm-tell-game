import React, { useRef, useState } from "react";
import Container from "../components/Container";
import Play from "../components/Play";

import background from "../assets/background_scene_2.png";
import arnoldSrc from "../assets/arnold.png";
import wernerSrc from "../assets/werner.png";
import waltherSrc from "../assets/walter.png";
import gesslerSrc from "../assets/gessler.png";
import guardSrc from "../assets/guard.png";
import poleSrc from "../assets/pole.png";

import Object from "../components/Object";
import { sleep } from "../util/util";

import build from "../assets/build.mp3";
import useSound from "use-sound";
import { AnimatePresence, motion } from "framer-motion";

const title = "Dorfplatz in Altdorf";

/*
Szene 2: Altdorf

Hintergrund: Dorfplatz in Altdorf
Charaktere: Werner Stauffacher, Walther Fürst, Arnold vom Melchtal, Gessler und dessen Wachen erscheinen  später von rechts.
Dialog:
Werner Stauffacher (Kanton Schwyz): "Wir müssen uns gegen die Habsburger vereinen! Denn verbunden werden auch die Schwachen mächtig. "
Walther Fürst (Kanton Uri): "Stimmt! Nur gemeinsam können wir uns befreien."
Arnold vom Melchtal (Kanton Unterwalten): "Lasst uns unsere Kantone vereinen und einen Aufstand planen!"
Legen Hände zusammen
Werner Stauffacher: So wollen wir drei Länder, zu Schutz Und Trutz, zusammenstehn auf Tod und Leben.
Walther Fürst und Melchtal: Auf Tod und Leben! (Rütlischwur)
Sie halten die Hände noch einige Pausen lang zusammengeflochten und schweigen.

Gessler und seine Wachen kommen ins Bild.
Gessler: "Als Zeichen meiner Allmacht werde ich meinen Hut auf eine Stange setzen. Jeder Untertan muss ihn verehren! Daran will ich die Gehorsamen erkennen. "
Stange mit Hut wird aufgerichtet
Wachen: " Dem Hut soll gleiche Ehre wie ihm selbst geschehn!"
*/

const Scene2 = () => {
	const werner = useRef({});
	const walther = useRef({});
	const arnold = useRef({});
	const gessler = useRef({});
	const guard1 = useRef({});
	const guard2 = useRef({});
	const pole = useRef({});

	const [displayPole, setDisplayPole] = useState(false);

	const [playBuild] = useSound(build);

	const buildPole = async () => {
		playBuild();
		await sleep(2000);
		setDisplayPole(true);
	};

	const pipeline = async () => {
		await arnold.current.speak(
			"Wir müssen uns gegen die Habsburger vereinen! Denn verbunden werden auch die Schwachen mächtig."
		);
		await walther.current.speak(
			"Stimmt! Nur gemeinsam können wir uns befreien."
		);
		await arnold.current.speak(
			"Lasst uns unsere Kantone vereinen und einen Aufstand planen!"
		);

		await Promise.all([
			arnold.current.move(-7, 0, 20),
			werner.current.move(-3, 0, 10),
			walther.current.move(3, 0, 10),
		]);

		await werner.current.speak(
			"So wollen wir drei Länder, zu Schutz Und Trutz, zusammenstehn auf Tod und Leben."
		);

		await Promise.all([
			walther.current.speak("Auf Tod und Leben!"),
			arnold.current.speak("Auf Tod und Leben!"),
		]);

		await sleep(2000);

		await Promise.all([
			guard1.current.move(60, 0, 30),
			gessler.current.move(60, 0, 30),
			guard2.current.move(60, 0, 30),
		]);

		await gessler.current.speak(
			"Als Zeichen meiner Allmacht werde ich meinen Hut auf eine Stange setzen. Jeder Untertan muss ihn verehren! Daran will ich die Gehorsamen erkennen."
		);

		await buildPole();

		await sleep(1000);

		await Promise.all([
			guard1.current.speak(
				"Dem Hut soll gleiche Ehre wie ihm selbst geschehn!"
			),
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
			<Play src={background}>
				{displayPole && (
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
				)}
				<Object
					myRef={walther}
					startPosition={{
						left: 50,
						bottom: 3,
					}}
					startDirection={"right"}
					height={200}
					src={waltherSrc}
					name="Walther"
				/>
				<Object
					myRef={werner}
					startPosition={{
						left: 70,
						bottom: 3,
					}}
					src={wernerSrc}
					height={200}
					startDirection={"left"}
					name="Werner"
				/>
				<Object
					myRef={arnold}
					startPosition={{
						left: 85,
						bottom: 3,
					}}
					startDirection={"left"}
					height={200}
					src={arnoldSrc}
					name="Arnold"
				/>

				<Object
					myRef={guard1}
					startPosition={{
						left: -60,
						bottom: 3,
					}}
					startDirection={"right"}
					height={200}
					src={guardSrc}
					name="Wache"
				/>
				<Object
					myRef={gessler}
					startPosition={{
						left: -45,
						bottom: 3,
					}}
					startDirection={"right"}
					height={200}
					src={gesslerSrc}
					name="Gessler"
				/>
				<Object
					myRef={guard2}
					startPosition={{
						left: -30,
						bottom: 3,
					}}
					startDirection={"right"}
					height={200}
					src={guardSrc}
					name="Wache"
				/>
			</Play>
		</Container>
	);
};

export default Scene2;
