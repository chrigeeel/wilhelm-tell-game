import React, { useRef } from "react";
import Object from "../components/Object";

// coordinates are in %

const Scene = () => {
    const myRef = useRef({});

    return (
        <div className="w-full overflow-hidden max-w-[100%] h-full max-h-[100%] relative">
            <Object
                name="Timon"
                myRef={myRef}
                className="bg-red-500 w-16 h-24"
            />
            <button
                onClick={() => {
                    myRef.current.moveHorizontal(20, 10);
                }}
                className="absolute top-0 left-0 w-24 h-12 bg-emerald-500"
            >
                move right
            </button>
            <button
                onClick={() => {
                    myRef.current.jump(20, 50, 20);
                }}
                className="absolute top-0 left-32 w-24 h-12 bg-emerald-500"
            >
                jump
            </button>
        </div>
    );
};

export default Scene;
