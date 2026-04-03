import { useState } from "react";
import { MinecraftClock } from "./minecraft-clock";

export function MinecraftClockControl({ defaultRotation = 0 }: { defaultRotation?: number }) {
    const [rotation, setRotation] = useState(defaultRotation);

    return <>
        <MinecraftClock rotation={360 - rotation } ></MinecraftClock>
        <input type="range" min="0" max="360" value={rotation} onChange={(e) => setRotation(parseInt(e.target.value))} />
    </>
}