import React, { useEffect, useState } from "react";

import background1 from "../assets/background_scene_1.png";
import boatSrc from "../assets/boat.png";
import wilhelmTellSrc from "../assets/wilhelmTell.png";
import kuoniSrc from "../assets/kuoni.png";
import ruodiSrc from "../assets/ruodi.png";
import konradBaumgartenSrc from "../assets/konradBaumgarten.png";
import build from "../assets/build.mp3";
import background2 from "../assets/background_scene_2.png";
import arnoldSrc from "../assets/arnold.png";
import wernerSrc from "../assets/werner.png";
import waltherSrc from "../assets/walter.png";
import gesslerSrc from "../assets/gessler.png";
import guardSrc from "../assets/guard.png";
import poleSrc from "../assets/pole.png";
import background3 from "../assets/background_scene_3.png";
import appleSrc from "../assets/apple.png";
import arrowSrc from "../assets/arrow.png";
import walterTellSrc from "../assets/walterTell.png";
import shootSrc from "../assets/shoot.mp3";
import hit from "../assets/hit.mp3";
import storm from "../assets/storm.mp3";
import rain from "../assets/rain.webp";
import background4 from "../assets/background_scene_4.png";
import background5 from "../assets/background_scene_5.png";
import bloodSrc from "../assets/blood.png";
import enderdragonSrc from "../assets/enderdragon.mp3";
import background6 from "../assets/background_scene_6.png";

const sources = [
	background1,
	boatSrc,
	wilhelmTellSrc,
	kuoniSrc,
	ruodiSrc,
	konradBaumgartenSrc,
	build,
	background2,
	arnoldSrc,
	wernerSrc,
	waltherSrc,
	gesslerSrc,
	guardSrc,
	poleSrc,
	background3,
	appleSrc,
	arrowSrc,
	walterTellSrc,
	shootSrc,
	hit,
	storm,
	rain,
	background4,
	background5,
	bloodSrc,
	enderdragonSrc,
	background6,
];

const Preload = ({ callback }) => {
	useEffect(() => {
		(async () => {
			console.log("start");
			await Promise.all(
				sources.map((source) => {
					return fetch(source);
				})
			);
			console.log("done");
			callback();
		})();
	}, []);

	return (
		<>
			<div
				className="flex flex-col items-center justify-center
                h-screen w-screen bg-stone-950
                absolute top-0 left-0 z-50"
			>
				<span className="text-4xl text-stone-100">Loading...</span>
				<span className="text-xl text-stone-100">
					Dies kann einige Sekunden dauern.
				</span>
			</div>
		</>
	);
};

export default Preload;
