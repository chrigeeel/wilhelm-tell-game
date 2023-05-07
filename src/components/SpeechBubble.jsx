import React from "react";
import Typewriter from "typewriter-effect";
import { motion, AnimatePresence } from "framer-motion";

const SpeechBubble = ({ text, onDone }) => {
    return (
        <AnimatePresence>
            {text && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 100,
                        transition: {
                            duration: 0.3,
                        },
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.3,
                        },
                    }}
                    className="bg-stone-100 text-stone-950 p-2 border-2 border-stone-950
                inline-block rounded-md relative max-w-xs"
                >
                    <div className="w-full h-full relative">
                        <span className="text-stone-200">{text}</span>
                        <div className="absolute top-0 left-0">
                            <Typewriter
                                options={{
                                    cursor: "",
                                    delay: 50,
                                }}
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString(text)
                                        .pauseFor(1000)
                                        .callFunction(onDone)
                                        .start();
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

SpeechBubble.defaultProps = {
    onDone: () => console.log("done"),
};

export default SpeechBubble;
