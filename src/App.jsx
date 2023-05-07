import { useState } from "react";
import Scene1 from "./scenes/Scene1";
import Scene2 from "./scenes/Scene2";
import Scene3 from "./scenes/Scene3";
import Scene4 from "./scenes/Scene4";
import Scene5 from "./scenes/Scene5";
import Scene6 from "./scenes/Scene6";

import Outro from "./scenes/Outro";
import Preload from "./scenes/Preload";

function App() {
	const [scene, setScene] = useState(null);

	const pipeline = async () => {
		setScene(
			<Preload
				callback={() =>
					setScene(
						<Scene1
							callback={() =>
								setScene(
									<Scene2
										callback={() =>
											setScene(
												<Scene3
													callback={() =>
														setScene(
															<Scene4
																callback={() =>
																	setScene(
																		<Scene5
																			callback={() =>
																				setScene(
																					<Scene6
																						callback={() =>
																							setScene(
																								<Outro />
																							)
																						}
																					/>
																				)
																			}
																		/>
																	)
																}
															/>
														)
													}
												/>
											)
										}
									/>
								)
							}
						/>
					)
				}
			/>
		);
	};

	return (
		<div
			className="flex items-center justify-center
            h-screen w-screen bg-stone-100"
		>
			{scene ? (
				scene
			) : (
				<div
					className="flex flex-col items-center justify-center
                    h-screen w-screen bg-stone-950
                    absolute top-0 left-0 z-50"
				>
					<span className="text-7xl text-stone-100">
						Wilhelm Tell
					</span>
					<span className="text-3xl text-stone-100">
						Friedrich Schiller
					</span>
					<button
						onClick={pipeline}
						className="border-4 border-dotted uppercase text-stone-100 rounded-sm px-4 py-2 mt-4"
					>
						<span className="text-2xl">Start</span>
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
