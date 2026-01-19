import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function Index({children}) {
    const magnetic = useRef(null);

    useEffect( () => {
        // 1. Check if the ref exists immediately
        if (!magnetic.current) return;

        // 2. Variable capture for safe cleanup
        const mRef = magnetic.current;

        const xTo = gsap.quickTo(mRef, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
        const yTo = gsap.quickTo(mRef, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const {height, width, left, top} = mRef.getBoundingClientRect();
            const x = clientX - (left + width/2)
            const y = clientY - (top + height/2)
            xTo(x * 0.35);
            yTo(y * 0.35);
        }

        const mouseLeave = (e) => {
            xTo(0);
            yTo(0);
        }

        mRef.addEventListener("mousemove", mouseMove)
        mRef.addEventListener("mouseleave", mouseLeave)

        // 3. Safe Cleanup
        return () => {
            if (mRef) {
                mRef.removeEventListener("mousemove", mouseMove)
                mRef.removeEventListener("mouseleave", mouseLeave)
            }
        }
    }, [])

    return (
        React.cloneElement(children, {ref:magnetic})
    )
}