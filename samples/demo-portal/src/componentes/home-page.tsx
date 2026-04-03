import { useEffect, useId, useMemo, useState } from "react";
import { DateMinecraft } from "../../../../src/date-minecraft";
import { MinecraftClock } from "./minecraft-clock";

const MINECRAFT_BIRTH = Date.UTC(2009, 4, 16, 0, 0, 0);

const getTotalTicksSinceBirth = () => {
    const ms = Date.now() - MINECRAFT_BIRTH;
    return (ms / 1000) * DateMinecraft.MS_PER_TICK;
};

const useCurrentTick = () => {
    const [tick, setTick] = useState(() => getTotalTicksSinceBirth());
    const dateMinecraft = useMemo(() => DateMinecraft.fromTick(tick), [tick]);

    useEffect(() => {
        const interval = setInterval(() => setTick(getTotalTicksSinceBirth()), 200);
        return () => clearInterval(interval);
    }, []);

    return [tick, dateMinecraft] as const;
};

// ── Shared style tokens ──────────────────────────────────────────────────────

const MC_GRAY = "#C6C6C6";
const MC_DARK = "#373737";
const MC_SLOT = "#8B8B8B";
const MC_BLACK = "#1D1D1D";

const panelStyle: React.CSSProperties = {
    background: MC_GRAY,
    border: `2px solid ${MC_BLACK}`,
    boxShadow: `inset 2px 2px 0 #FFFFFF, inset -2px -2px 0 ${MC_SLOT}`,
    padding: "16px",
    marginBottom: "12px",
};

const slotStyle: React.CSSProperties = {
    background: MC_DARK,
    border: `2px solid ${MC_BLACK}`,
    boxShadow: `inset 2px 2px 0 #1A1A1A, inset -2px -2px 0 #5A5A5A`,
    padding: "8px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
};

const labelStyle: React.CSSProperties = {
    color: "#AAAAAA",
    fontSize: "7px",
    lineHeight: "1.4",
    whiteSpace: "nowrap",
};

const valueStyle: React.CSSProperties = {
    color: "#FFFFFF",
    fontSize: "8px",
    textShadow: "1px 1px #3F3F3F",
    textAlign: "right",
    wordBreak: "break-all",
};

const panelTitleStyle: React.CSSProperties = {
    color: MC_BLACK,
    fontSize: "8px",
    textShadow: `1px 1px #FFFFFF`,
    marginBottom: "10px",
    paddingBottom: "8px",
    borderBottom: `2px solid ${MC_SLOT}`,
};

const inputStyle: React.CSSProperties = {
    background: MC_BLACK,
    border: `2px solid`,
    borderTopColor: "#1A1A1A",
    borderLeftColor: "#1A1A1A",
    borderBottomColor: "#5A5A5A",
    borderRightColor: "#5A5A5A",
    color: "#FFFFFF",
    fontSize: "8px",
    padding: "6px 8px",
    outline: "none",
    width: "100%",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StatSlot({ label, value }: { label: string; value: string }) {
    return (
        <div style={slotStyle}>
            <span style={labelStyle}>{label}</span>
            <span style={valueStyle}>{value}</span>
        </div>
    );
}

function McPanel({ title, children }: { title?: string; children: React.ReactNode }) {
    return (
        <div style={panelStyle}>
            {title && <div style={panelTitleStyle}>{title}</div>}
            {children}
        </div>
    );
}

function ControlTickToTime() {
    const id = useId();
    const [tick, setTick] = useState(0);
    const result = DateMinecraft.fromTick(tick).toString();
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={slotStyle}>
                <label htmlFor={id} style={labelStyle}>Ticks</label>
                <input
                    id={id}
                    type="number"
                    defaultValue={tick}
                    onChange={e => setTick(Number(e.target.value))}
                    style={{ ...inputStyle, width: "140px" }}
                />
            </div>
            <div style={slotStyle}>
                <span style={labelStyle}>Result</span>
                <span style={valueStyle}>{result}</span>
            </div>
        </div>
    );
}

function InputClock() {
    const id = useId();
    const [hour, setHour] = useState(6);
    const clockRotation = (-180 - hour * 15) % 360;
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={slotStyle}>
                <label htmlFor={id} style={labelStyle}>Hour (0–23)</label>
                <input
                    id={id}
                    type="number"
                    min={0}
                    max={23}
                    value={hour}
                    onChange={e => setHour(Number(e.target.value))}
                    style={{ ...inputStyle, width: "80px" }}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
                <MinecraftClock rotation={clockRotation} />
            </div>
        </div>
    );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function HomePage() {
    const [tick, dateMinecraft] = useCurrentTick();

    const clockRotation = useMemo(() => {
        const h = dateMinecraft.total({ unit: "hour", _fixed: 6 });
        return (-180 - h * 15) % 360;
    }, [dateMinecraft]);

    const day = Math.floor(tick / DateMinecraft.TICKS_PER_DAY);
    const timeStr = `${String(dateMinecraft.hour).padStart(2, "0")}:${String(dateMinecraft.minute).padStart(2, "0")}:${String(dateMinecraft.second).padStart(2, "0")}`;
    const realDate = new Date().toLocaleString();
    const totalTicks = tick.toFixed(0);

    const timeOfDay = (() => {
        const h = dateMinecraft.hour;
        if (h >= 6 && h < 12) return "Morning";
        if (h >= 12 && h < 18) return "Afternoon";
        if (h >= 18 && h < 21) return "Dusk";
        return "Night";
    })();

    const timeColor = (() => {
        const h = dateMinecraft.hour;
        if (h >= 6 && h < 18) return "#FFFF55";
        if (h >= 18 && h < 21) return "#FFAA00";
        return "#5555FF";
    })();

    return (
        <div style={{ maxWidth: "560px", width: "100%" }}>
            {/* Title */}
            <div style={{
                textAlign: "center",
                marginBottom: "20px",
            }}>
                <h1 style={{
                    color: "#FFFF55",
                    fontSize: "18px",
                    textShadow: "3px 3px #3F3F00",
                    letterSpacing: "2px",
                    lineHeight: "1.4",
                }}>
                    MINECRAFT
                </h1>
                <h2 style={{
                    color: "#AAFFAA",
                    fontSize: "10px",
                    textShadow: "2px 2px #003F00",
                    letterSpacing: "3px",
                    marginTop: "4px",
                }}>
                    DATE CLOCK
                </h2>
            </div>

            {/* Clock panel */}
            <McPanel>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                    <MinecraftClock rotation={clockRotation} />
                    <div style={{
                        color: timeColor,
                        fontSize: "14px",
                        textShadow: `2px 2px ${timeColor === "#FFFF55" ? "#3F3F00" : timeColor === "#FFAA00" ? "#3F2A00" : "#00003F"}`,
                        letterSpacing: "2px",
                    }}>
                        {timeStr}
                    </div>
                    <div style={{
                        color: timeColor,
                        fontSize: "8px",
                        textShadow: "1px 1px #3F3F3F",
                        opacity: 0.85,
                    }}>
                        {timeOfDay}
                    </div>
                </div>
            </McPanel>

            {/* Stats panel */}
            <McPanel title="GAME STATS">
                <StatSlot label="Day" value={`Day ${day.toLocaleString()}`} />
                <StatSlot label="Game Time" value={dateMinecraft.toString()} />
                <StatSlot label="Total Ticks" value={Number(totalTicks).toLocaleString()} />
                <StatSlot label="Real World" value={realDate} />
            </McPanel>

            {/* Converter: ticks → time */}
            <McPanel title="TICK → TIME">
                <ControlTickToTime />
            </McPanel>

            {/* Converter: hour → clock */}
            <McPanel title="HOUR → CLOCK">
                <InputClock />
            </McPanel>
        </div>
    );
}
