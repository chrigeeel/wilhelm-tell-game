import { useState } from "react";
import Scene from "./scene/Scene";
import Scene1 from "./scenes/Scene1";
import Scene2 from "./scenes/Scene2";
import Scene3 from "./scenes/Scene3";

function App() {
	return (
		<div
			className="flex items-center justify-center
            h-screen w-screen bg-stone-100"
		>
			<Scene3 />
		</div>
	);
}

export default App;
