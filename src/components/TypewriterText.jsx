import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";


export default function TypewriterText({ texts }) {
    const [displayText, setDisplayText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[textIndex];
        let timeout;

        if (!isDeleting && displayText === currentText) {
            // Pause قبل ما يبدأ يمسح
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayText === "") {
            // انتقل للنص الجاي
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
        } else {
            const speed = isDeleting ? 60 : 100;
            timeout = setTimeout(() => {
                setDisplayText((prev) =>
                    isDeleting
                        ? currentText.slice(0, prev.length - 1)
                        : currentText.slice(0, prev.length + 1)
                );
            }, speed);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex]);

    return (
        <motion.span
            className="block text-3xl font-bold bg-linear-to-r from-red-600 to-pink-500 bg-clip-text text-transparent mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {displayText}

            {/* Blinking Cursor */}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block ml-0.5 w-0.75 h-[1em] bg-current align-middle"
            />
        </motion.span>
    );
}