import { useEffect, useEffectEvent, useId, useMemo, useState, useTransition } from "react";
import { DateMinecraft } from "../../../../src/date-minecraft";
import { MinecraftClock } from "./minecraft-clock";

const MINECRAFT_BIRTH = Date.UTC(2009, 4, 16, 0, 0, 0);
// const MINECRAFT_BIRTH = Date.now();

const useCurrentTick = () => {
    const [tick, setTick] = useState(0);
    const dateMinecraft = useMemo(() => DateMinecraft.fromTick(tick), [tick]);

    const getTotalTicksSinceBirth = () => {
        const millisecondsSinceMinecraftBirth = (Date.now() - MINECRAFT_BIRTH) ;
        const totalSecondsSinceBirth = millisecondsSinceMinecraftBirth / 1000;
        const totalTicksSinceBirth = totalSecondsSinceBirth * DateMinecraft.MS_PER_TICK;
        return totalTicksSinceBirth;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTick(getTotalTicksSinceBirth());
        }, 200);
        return () => clearInterval(interval);
    }, [])

    return [tick, dateMinecraft] as const;
}

function ControlTickToTime() {
    const id = useId();
    const [tick, setTick] = useState(0);
    return <>
        <div>
            <label htmlFor={id}>Ticks</label>
            <input id={id} type="number" defaultValue={tick} onChange={e => setTick(Number(e.target.value))} />
        </div>
        <div>
            <input type="text" disabled value={DateMinecraft.fromTick(tick).toString()} />
        </div>
    </>
}

function InputClock() {
    const id = useId();
    const [hour, setHour] = useState(6);
    const clockRotation = (-180 - hour * 15) % 360;
    return <>
        <div>
            <label htmlFor={id}>Hour (0-23)</label>
            <input id={id} type="number" min={0} max={23} value={hour} onChange={e => setHour(Number(e.target.value))} />
        </div>
        <div><MinecraftClock rotation={clockRotation} /></div>
    </>
}

export function HomePage() {
    const [tick, dateMinecraft] = useCurrentTick();

    // rotation
    // dateMinecraft.hour == 0 -> rotation -180
    // dateMinecraft.hour == 6 -> rotation 90
    // dateMinecraft.hour == 12 -> rotation 0 
    // dateMinecraft.hour == 18 -> rotation -90 
    const clockRotation = useMemo(() => {
        const h = dateMinecraft.total({ unit: "hour", _fixed: 6 });
        const rotation = (-180 - h * 15) % 360
        return rotation;
    }, [dateMinecraft]);

    return <>
        <div>Ticks since Minecraft birth: {tick.toFixed(0)}</div>
        <div>Game Clock: {dateMinecraft.toString()}</div>
        <div>{new Date().toLocaleString()}</div>

        <MinecraftClock rotation={clockRotation} />

        <h2>Converter</h2>
        <div>
            <ControlTickToTime></ControlTickToTime>
        </div>
        <div>
            <InputClock></InputClock>
        </div>
    </>
}
