import React, { useRef } from "react";
import Container from "../components/Container";
import Transition from "../components/Transition";
import Object from "../components/Object";
import SpeechBubble from "../components/SpeechBubble";
import { sleep } from "../util/util";

const title = "Am Vierwaldstätter See";

const Scene1 = () => {
    const wilhelmTell = useRef({});
    const kuoni = useRef({});
    const ruodi = useRef({});
    const konradBaumgarten = useRef({});

    const pipeline = async () => {
        console.log("pipeline start");
        kuoni.current.moveHorizontal(-50, 40);
        ruodi.current.moveHorizontal(-50, 40);
        await sleep(2000);
        await konradBaumgarten.current.moveHorizontal(-50, 60);
        console.log("done");
        await sleep(500);
        await kuoni.current.speak(
            "Seht, dort ist Konrad Baumgarten, der vor den habsburgischen Soldaten flieht!"
        );
        await ruodi.current.speak("Nun, nun, was gibt's so eilig?");
        await konradBaumgarten.current.speak(
            "Eilt, eilt, die Habsburger sind mir dicht schon an den Fersen! Bitte nehmt mich auf das Boot und bringt mich über den See."
        );
        await ruodi.current.speak(
            "Ein schweres Ungewitter ist Im Anzug. Ihr müsst warten... Ich kann nicht steuern gegen Sturm und Wellen."
        );
        await wilhelmTell.current.moveHorizontal(20, 20);
        await wilhelmTell.current.speak(
            "Wo's not tut, Fährmann, lässt sich alles wagen. Ich will's mit meiner schwachen Kraft versuchen. Lasst uns schnell handeln!"
        );
    };

    return (
        <Container>
            {/*<Transition title={title} onTransitionEnd={pipeline} /> */}
            <Object
                className="h-24 w-16 bg-red-500"
                myRef={wilhelmTell}
                name="Wilhelm Tell"
                startPosition={{
                    left: 10,
                    bottom: 10,
                }}
            />
            <Object
                className="h-24 w-16 bg-emerald-500"
                myRef={kuoni}
                name="Kuoni"
                startPosition={{
                    left: 100,
                    bottom: 10,
                }}
            />{" "}
            <Object
                className="h-24 w-16 bg-amber-500"
                myRef={ruodi}
                name="Ruodi"
                startPosition={{
                    left: 110,
                    bottom: 10,
                }}
            />
            <Object
                className="h-24 w-16 bg-slate-500"
                myRef={konradBaumgarten}
                name="Konrad Baumgarten"
                startPosition={{
                    left: 120,
                    bottom: 10,
                }}
            />
            <button
                onClick={async () => {
                    await pipeline();
                }}
            >
                start
            </button>
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
