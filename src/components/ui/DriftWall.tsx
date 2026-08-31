import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import "./DriftWall.css";

export type DriftWallItem = {
  image: string;
  title?: string;
  href?: string;
};

type DriftWallProps = {
  items: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: "up" | "down";
  variance?: number;
  parallax?: number;
  lift?: number;
  fade?: number;
  dim?: number;
  overlayColor?: string;
  className?: string;
  style?: CSSProperties;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const columnFactor = (index: number, variance: number) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

/**
 * Adaptación TypeScript del efecto DriftWall de React Bits.
 * Se usa como una capa visual decorativa detrás de la bienvenida.
 */
export function DriftWall({
  items,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 18,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1_200,
  depth = 120,
  speed = 42,
  direction = "up",
  variance = 0.45,
  parallax = 0.6,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  overlayColor = "#060010",
  className = "",
  style,
}: DriftWallProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const trackRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const dampedPointerRef = useRef({ x: 0, y: 0 });
  const hoveredColumnRef = useRef(-1);
  const lastTimestampRef = useRef<number | null>(null);
  const [containerHeight, setContainerHeight] = useState(600);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    setReducedMotion(prefersReducedMotion());
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const columnItems = useMemo(() => {
    const safeColumns = Math.max(1, Math.floor(columns));
    const result = Array.from({ length: safeColumns }, () => [] as DriftWallItem[]);
    items.forEach((item, index) => result[index % safeColumns].push(item));
    return result.map((column) => (column.length ? column : items.slice(0, 1)));
  }, [columns, items]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map((column) => {
      const copyHeight = Math.max(unit, column.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 1.7) / copyHeight) + 1);
      return { copies, copyHeight };
    });
  }, [columnItems, containerHeight, gap, tileHeight]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerHeight(entry?.contentRect.height || 600);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const directionSign = direction === "up" ? 1 : -1;
    return columnItems.map((_, columnIndex) => {
      const alternateSign = columnIndex % 2 === 0 ? 1 : -1;
      return speed * columnFactor(columnIndex, variance) * directionSign * alternateSign;
    });
  }, [columnItems, direction, speed, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map(
      ({ copyHeight }, columnIndex) => copyHeight * ((columnIndex * 0.37) % 1),
    );
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnItems, columnMeta]);

  const applyPlaneTransform = useCallback(
    (pointerX: number, pointerY: number) => {
      if (!planeRef.current) return;
      planeRef.current.style.transform =
        `translate(-50%, -50%) scale(1.2) ` +
        `rotateX(${tilt + pointerY}deg) rotateY(${turn + pointerX}deg) ` +
        `rotateZ(${roll}deg) translateZ(${-depth}px)`;
    },
    [depth, roll, tilt, turn],
  );

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const delta = Math.min(0.05, Math.max(0, timestamp - lastTimestampRef.current) / 1_000);
      lastTimestampRef.current = timestamp;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damping = 1 - Math.exp(-delta / 0.12);
      dampedPointerRef.current.x += (targetX - dampedPointerRef.current.x) * damping;
      dampedPointerRef.current.y += (targetY - dampedPointerRef.current.y) * damping;
      applyPlaneTransform(dampedPointerRef.current.x, dampedPointerRef.current.y);

      columnMeta.forEach((meta, columnIndex) => {
        const track = trackRefs.current[columnIndex];
        if (!track) return;
        if (!reducedMotion) {
          const targetVelocity =
            hoveredColumnRef.current === columnIndex ? 0 : baseVelocities[columnIndex];
          const easing = 1 - Math.exp(-delta / (targetVelocity === 0 ? 0.16 : 0.28));
          velocitiesRef.current[columnIndex] +=
            (targetVelocity - velocitiesRef.current[columnIndex]) * easing;
          const rawOffset =
            (offsetsRef.current[columnIndex] || 0) + velocitiesRef.current[columnIndex] * delta;
          offsetsRef.current[columnIndex] =
            ((rawOffset % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
        }
        track.style.transform = `translate3d(0, ${-(offsetsRef.current[columnIndex] || 0)}px, 0)`;
      });

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [applyPlaneTransform, baseVelocities, columnMeta, reducedMotion, parallax]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (bounds && parallax > 0 && !reducedMotion) {
        pointerRef.current = {
          x: (event.clientX - bounds.left) / bounds.width - 0.5,
          y: (event.clientY - bounds.top) / bounds.height - 0.5,
        };
      }

      const target = document.elementFromPoint(event.clientX, event.clientY);
      const tile = target instanceof Element ? target.closest<HTMLElement>("[data-drift-tile]") : null;
      if (!tile) {
        hoveredColumnRef.current = -1;
        setActiveId(null);
        return;
      }
      hoveredColumnRef.current = Number(tile.dataset.column);
      setActiveId(tile.dataset.driftTile || null);
    },
    [parallax, reducedMotion],
  );

  const handlePointerLeave = useCallback(() => {
    pointerRef.current = { x: 0, y: 0 };
    hoveredColumnRef.current = -1;
    setActiveId(null);
  }, []);

  const cssVariables = {
    "--dw-tile-w": `${tileWidth}px`,
    "--dw-tile-h": `${tileHeight}px`,
    "--dw-gap": `${gap}px`,
    "--dw-radius": `${radius}px`,
    "--dw-perspective": `${perspective}px`,
    "--dw-lift": `${lift}px`,
    "--dw-dim": dim,
    "--dw-overlay": overlayColor,
    "--dw-edge": `${Math.max(0, (1 - fade) * 100)}%`,
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      className={`drift-wall ${reducedMotion ? "drift-wall--reduced" : ""} ${className}`.trim()}
      style={cssVariables}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((column, columnIndex) => {
          const meta = columnMeta[columnIndex];
          return (
            <div className="drift-wall__column" key={`column-${columnIndex}`}>
              <div
                className="drift-wall__track"
                ref={(element) => {
                  trackRefs.current[columnIndex] = element;
                }}
              >
                {Array.from({ length: meta.copies }, (_, copyIndex) =>
                  column.map((item, itemIndex) => {
                    const tileId = `${columnIndex}-${copyIndex}-${itemIndex}`;
                    const inner = (
                      <span className="drift-wall__inner">
                        <img
                          src={item.image}
                          alt=""
                          draggable={false}
                          loading={copyIndex === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        <span className="drift-wall__overlay" />
                      </span>
                    );
                    return item.href ? (
                      <a
                        key={tileId}
                        className={`drift-wall__tile ${activeId === tileId ? "is-active" : ""}`}
                        data-drift-tile={tileId}
                        data-column={columnIndex}
                        href={item.href}
                        tabIndex={-1}
                      >
                        {inner}
                      </a>
                    ) : (
                      <span
                        key={tileId}
                        className={`drift-wall__tile ${activeId === tileId ? "is-active" : ""}`}
                        data-drift-tile={tileId}
                        data-column={columnIndex}
                      >
                        {inner}
                      </span>
                    );
                  }),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
