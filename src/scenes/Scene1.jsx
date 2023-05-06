import React, { useRef } from "react";
import Container from "../components/Container";
import Transition from "../components/Transition";
import Object from "../components/Object";
import SpeechBubble from "../components/SpeechBubble";

const title = "Am Vierwaldstätter See";

const Scene1 = () => {
    const wilhelmTell = useRef({});
    const kuoni = useRef({});
    const konradBaumgarten = useRef({});

    const pipeline = async () => {
        console.log("pipeline start");
    };

    return (
        <Container>
            <Transition title={title} onTransitionEnd={pipeline} />
            <Object
                className="h-24 w-16 bg-red-500"
                myRef={wilhelmTell}
                name="Wilhelm Tell"
            />
            <SpeechBubble />
        </Container>
    );
};

export default Scene1;
