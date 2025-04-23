import { useEffect, useRef } from "react";
import { animate, frame, motionValue } from "motion";

export default function BallFollower() {
  const ballRef = useRef(null);
  const R = 15;
  const pointerX = motionValue(window.innerWidth / 2);
  const pointerY = motionValue(window.innerHeight / 2);

  useEffect(() => {
    const ball = ballRef.current;

    function springToPointer() {
      animate(
        ball,
        {
          x: pointerX.get() - R,
          y: pointerY.get() - R,
        },
        { type: "spring", stiffness: 30, damping: 10 }
      );
    }

    const schedule = () => frame.postRender(springToPointer);
    const unsubX = pointerX.on("change", schedule);
    const unsubY = pointerY.on("change", schedule);

    const moveHandler = (e) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };
    document.addEventListener("pointermove", moveHandler);

    return () => {
      document.removeEventListener("pointermove", moveHandler);
      unsubX(); unsubY();
    };
  }, []);

  return (
    <div
      ref={ballRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "30px",
        height: "30px",
        backgroundColor: "#145f48",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 999,
      }}
    />
  );
}
