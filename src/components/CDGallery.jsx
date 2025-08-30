import { useRef, useEffect, useState } from "react";
import CDCard from "./CDCard";

export default function CDGallery({ cds, onSelect }) {
  const containerRef = useRef(null);
  const [centerX, setCenterX] = useState(0);

  useEffect(() => {
    const updateCenter = () => {
      if (containerRef.current) {
        setCenterX(containerRef.current.offsetWidth / 2);
      }
    };
    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto flex scrollbar-hide snap-x snap-mandatory"
    >
      {cds.map((cd) => (
        <TransformingCard
          key={cd.id}
          cd={cd}
          onSelect={onSelect}
          containerRef={containerRef}
          centerX={centerX}
        />
      ))}
    </div>
  );
}

function TransformingCard({ cd, onSelect, containerRef, centerX }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const offset = (cardCenter - centerX) / rect.width; // relative position

      // Transformation logic
      const scale = 1 - Math.min(Math.abs(offset) * 0.3, 0.5);
      const rotateY = offset * -30; // tilt left/right
      const translateZ = -Math.abs(offset) * 100; // depth

      setStyle({
        transform: `perspective(1000px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        transition: "transform 0.1s",
      });
    };

    handleScroll();
    containerRef.current.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerRef, centerX]);

  return (
    <div
      ref={cardRef}
      className="snap-center flex-shrink-0 w-48 mx-6 transition-transform duration-300"
      style={style}
    >
      <CDCard cd={cd} onSelect={onSelect} />
    </div>
  );
}
