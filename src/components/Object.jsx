import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import useSound from "use-sound";
import SpeechBubble from "./SpeechBubble";

import walking from "../assets/walking.mp3";
import running from "../assets/running.mp3";

// speed is in percent per second
const Object = ({ className, myRef, name, startPosition }) => {
    const [coordinates, setCoordinates] = useState({
        left: 0,
        bottom: 0,
    });
    const [animate, setAnimate] = useState({
        left: "0%",
        bottom: "0%",
    });
    const [transition, setTransition] = useState({
        ease: "linear",
        duration: 1,
    });
    const [speakData, setSpeakData] = useState({
        text: "",
        callback: () => {},
    });

    const [playWalking, { stopWalking }] = useSound(walking);
    const [playRunning, { stopRunning }] = useSound(running);

    // speed is in percentage per seconds
    const moveHorizontal = (percentage, speed) => {
        setCoordinates((prevData) => ({
            left: prevData.left + percentage,
            bottom: prevData.bottom,
        }));
        const duration = Math.abs(percentage / speed);
        setTransition({
            ease: "linear",
            duration,
        });
        if (speed > 30) {
            playRunning();
        } else {
            playWalking();
        }

        return new Promise((resolve, _) => {
            setTimeout(() => {
                resolve();
                if (speed > 30) {
                    stopRunning();
                } else {
                    stopWalking();
                }
            }, duration * 1000);
        });
    };

    const speak = async (text) => {
        const promise = new Promise((resolve, _) => {
            setSpeakData({
                text,
                callback: () => {
                    resolve();
                    setSpeakData({
                        text: "",
                        callback: () => {},
                    });
                },
            });
        });

        return promise;
    };

    const jump = (upPercentage, fallPercentage, speed) => {
        setCoordinates((prevData) => ({
            left: prevData.left,
            bottom: prevData.bottom + upPercentage,
        }));
        const duration = upPercentage / speed;
        setTransition({
            ease: "linear",
            duration,
        });
        setTimeout(() => {
            setCoordinates((prevData) => ({
                left: prevData.left,
                bottom: prevData.bottom - fallPercentage,
            }));
            const duration = fallPercentage / speed;
            setTransition({
                ease: "linear",
                duration,
            });
        }, duration * 1000);
    };

    myRef.current.moveHorizontal = moveHorizontal;
    myRef.current.jump = jump;
    myRef.current.speak = speak;

    useEffect(() => {
        setAnimate({
            left: `${coordinates.left}%`,
            bottom: `${coordinates.bottom}%`,
            ease: "linear",
        });
    }, [coordinates]);

    return (
        <div
            style={{
                left: `${startPosition.left}%`,
                bottom: `${startPosition.bottom}%`,
            }}
            className="absolute h-full w-full"
        >
            <div className="relative h-full w-full">
                <motion.div
                    animate={animate}
                    transition={transition}
                    className={`absolute left-0 bottom-0 ${className}`}
                >
                    <div className="relative w-full h-full overflow-visible">
                        <div className="absolute -top-10 bg-stone-900 w-full text-center">
                            <span className="text-white text-lg">{name}</span>
                        </div>
                        <div className="absolute bottom-36 left-[90%] bg-red w-80">
                            <SpeechBubble
                                text={speakData.text}
                                onDone={speakData.callback}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Object;
