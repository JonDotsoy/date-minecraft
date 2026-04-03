import { useEffect, useId, useMemo, useState } from "react";
import { DateMinecraft } from "../../../../src/date-minecraft";
import { Temporal } from "temporal-polyfill";
import { MinecraftClock } from "./minecraft-clock";

const useCurrentTick = () => {
    const [tick, setTick] = useState(() => DateMinecraft.now());
    const dateMinecraft = useMemo(() => DateMinecraft.fromTick(tick), [tick]);

    useEffect(() => {
        let raf: number;
        const loop = () => {
            setTick(DateMinecraft.now());
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
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
            <span style={valueStyle}>{value} <ButtonValueToClipboard value={value}></ButtonValueToClipboard></span>
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
    const result = DateMinecraft.fromTick(tick).toLocaleString();
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

function ControlGameTimeToTick() {
    const id = useId();
    const [input, setInput] = useState("");

    const result = (() => {
        if (!input.trim()) return null;
        try {
            return DateMinecraft.fromFormat(input);
        } catch {
            return null;
        }
    })();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={slotStyle}>
                <label htmlFor={id} style={labelStyle}>Game Time</label>
                <input
                    id={id}
                    type="text"
                    value={input}
                    placeholder="12:30  or  D1T6:00"
                    onChange={e => setInput(e.target.value)}
                    style={{ ...inputStyle, width: "140px" }}
                />
            </div>
            {result !== null && (
                <div style={slotStyle}>
                    <span style={labelStyle}>Ticks</span>
                    <span style={valueStyle}>{result.toLocaleString()}</span>
                </div>
            )}
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

function ButtonValueToClipboard({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return (
        <button
            onClick={handleClick}
            title="Copy to clipboard"
            style={{
                background: copied ? "#55AA55" : "#555555",
                border: "2px solid",
                borderTopColor: copied ? "#77CC77" : "#888888",
                borderLeftColor: copied ? "#77CC77" : "#888888",
                borderBottomColor: copied ? "#2A6A2A" : "#222222",
                borderRightColor: copied ? "#2A6A2A" : "#222222",
                cursor: "pointer",
                padding: "1px 4px",
                fontSize: "7px",
                color: copied ? "#AAFFAA" : "#CCCCCC",
                textShadow: copied ? "1px 1px #1A3A1A" : "1px 1px #111111",
                lineHeight: 1,
                flexShrink: 0,
                transition: "background 0.15s, color 0.15s",
            }}
        >
            {copied ? "✓" : "⧉"}
        </button>
    );
}

const codeStyle: React.CSSProperties = {
    background: MC_BLACK,
    border: `2px solid ${MC_BLACK}`,
    boxShadow: `inset 2px 2px 0 #1A1A1A, inset -2px -2px 0 #5A5A5A`,
    padding: "10px 12px",
    fontFamily: "monospace",
    fontSize: "7px",
    lineHeight: "1.7",
    color: "#AAFFAA",
    whiteSpace: "pre",
    overflowX: "auto",
    marginBottom: "8px",
};

type Token = { type: "keyword" | "string" | "comment" | "number" | "punctuation" | "text"; value: string };

const JS_KEYWORDS = new Set(["import", "from", "const", "let", "var", "new", "return", "if", "else", "function", "class", "export", "default", "typeof", "instanceof", "console"]);

function tokenize(code: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;
    while (i < code.length) {
        // Single-line comment
        if (code[i] === "/" && code[i + 1] === "/") {
            const end = code.indexOf("\n", i);
            const value = end === -1 ? code.slice(i) : code.slice(i, end);
            tokens.push({ type: "comment", value });
            i += value.length;
        // String (single, double, backtick)
        } else if (code[i] === '"' || code[i] === "'" || code[i] === "`") {
            const q = code[i];
            let j = i + 1;
            while (j < code.length && code[j] !== q) {
                if (code[j] === "\\") j++;
                j++;
            }
            tokens.push({ type: "string", value: code.slice(i, j + 1) });
            i = j + 1;
        // Number
        } else if (/[0-9]/.test(code[i])) {
            let j = i;
            while (j < code.length && /[0-9.]/.test(code[j])) j++;
            tokens.push({ type: "number", value: code.slice(i, j) });
            i = j;
        // Identifier or keyword
        } else if (/[a-zA-Z_$]/.test(code[i])) {
            let j = i;
            while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
            const word = code.slice(i, j);
            tokens.push({ type: JS_KEYWORDS.has(word) ? "keyword" : "text", value: word });
            i = j;
        // Punctuation
        } else if (/[(){}[\];,.:=<>!+\-*/&|]/.test(code[i])) {
            tokens.push({ type: "punctuation", value: code[i] });
            i++;
        } else {
            tokens.push({ type: "text", value: code[i] });
            i++;
        }
    }
    return tokens;
}

const TOKEN_COLORS: Record<Token["type"], string> = {
    keyword: "#FF9955",
    string: "#55FF55",
    comment: "#777777",
    number: "#FFFF55",
    punctuation: "#AAAAAA",
    text: "#AAFFAA",
};

function HighlightedCode({ code }: { code: string }) {
    const tokens = tokenize(code);
    return (
        <>
            {tokens.map((tok, i) => (
                <span key={i} style={{ color: TOKEN_COLORS[tok.type] }}>{tok.value}</span>
            ))}
        </>
    );
}

function CodeBlock({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <div style={{ position: "relative" }}>
            <pre style={codeStyle}><HighlightedCode code={code} /></pre>
            <button
                onClick={() => {
                    navigator.clipboard.writeText(code).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                    });
                }}
                title="Copy to clipboard"
                style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    background: copied ? "#55AA55" : "#555555",
                    border: "2px solid",
                    borderTopColor: copied ? "#77CC77" : "#888888",
                    borderLeftColor: copied ? "#77CC77" : "#888888",
                    borderBottomColor: copied ? "#2A6A2A" : "#222222",
                    borderRightColor: copied ? "#2A6A2A" : "#222222",
                    cursor: "pointer",
                    padding: "1px 5px",
                    fontSize: "7px",
                    color: copied ? "#AAFFAA" : "#CCCCCC",
                    textShadow: copied ? "1px 1px #1A3A1A" : "1px 1px #111111",
                    lineHeight: 1,
                }}
            >
                {copied ? "✓" : "⧉"}
            </button>
        </div>
    );
}

// ── Conversion section ────────────────────────────────────────────────────────

function ConversionSection() {
    const textStyle: React.CSSProperties = {
        color: MC_DARK,
        fontSize: "7px",
        lineHeight: "2",
        marginBottom: "8px",
    };
    const highlightStyle: React.CSSProperties = {
        color: "#FFFF55",
        textShadow: "1px 1px #3F3F00",
    };
    const formulaRowStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "90px 12px 80px 1fr",
        alignItems: "center",
        gap: "4px",
        background: MC_DARK,
        border: `1px solid ${MC_BLACK}`,
        padding: "4px 8px",
        marginBottom: "2px",
    };

    return (
        <>
            <McPanel title="WHAT IS A TICK?">
                <div style={textStyle}>
                    A <span style={highlightStyle}>tick</span> is Minecraft&apos;s fundamental unit of time. The game engine processes every event — mob movement, redstone circuits, block updates — exactly once per tick. Under normal conditions the server runs at <span style={highlightStyle}>20 ticks per second (TPS)</span>.
                </div>
                <div style={textStyle}>
                    Inspired by the <span style={highlightStyle}>Unix epoch</span> (seconds since January 1, 1970), this library anchors its own epoch at <span style={highlightStyle}>May 16, 2009</span> — the release date of Minecraft Classic. Every real-world moment can therefore be expressed as a unique tick offset from that date.
                </div>
                <div style={textStyle}>
                    Because Minecraft has no native concept of months or years, elapsed time is expressed using only days, hours, minutes, and seconds:
                </div>
                <div style={{ ...slotStyle, justifyContent: "center", marginBottom: "0" }}>
                    <span style={{ color: "#AAFFAA", fontSize: "9px", textShadow: "1px 1px #003F00", letterSpacing: "2px" }}>
                        Days 14, 12:32:11
                    </span>
                </div>
            </McPanel>

            <McPanel title="TICK CONVERSION">
                <div style={{ ...textStyle, marginBottom: "8px" }}>
                    Since <span style={highlightStyle}>1 tick = 50 ms</span> of real time, every larger unit is a fixed multiple:
                </div>
                {([
                    { ticks: "20", unit: "1 second", formula: "20 × 1" },
                    { ticks: "1,200", unit: "1 minute", formula: "20 × 60" },
                    { ticks: "72,000", unit: "1 hour", formula: "20 × 3,600" },
                    { ticks: "1,728,000", unit: "1 day", formula: "20 × 86,400" },
                ] as const).map(row => (
                    <div key={row.unit} style={formulaRowStyle}>
                        <span style={{ color: "#FFFF55", fontSize: "7px", textShadow: "1px 1px #3F3F00" }}>{row.ticks} ticks</span>
                        <span style={{ color: "#555555", fontSize: "7px" }}>=</span>
                        <span style={{ color: "#AAFFAA", fontSize: "7px" }}>{row.unit}</span>
                        <span style={{ color: "#555555", fontSize: "7px" }}>({row.formula})</span>
                    </div>
                ))}
                <div style={{ ...textStyle, marginTop: "10px", marginBottom: "0" }}>
                    To break a tick count into human time: divide by <span style={highlightStyle}>1,728,000</span> for days → remainder by <span style={highlightStyle}>72,000</span> for hours → remainder by <span style={highlightStyle}>1,200</span> for minutes → remainder by <span style={highlightStyle}>20</span> for seconds.
                </div>
            </McPanel>
        </>
    );
}

// ── Ticks reference table ────────────────────────────────────────────────────

const REFERENCE_TICKS = [0, 1000, 6000, 12000, 18000, 24000, 48000, 72000];

function TickReferenceTable() {
    const thStyle: React.CSSProperties = {
        background: MC_DARK,
        color: MC_GRAY,
        fontSize: "7px",
        letterSpacing: "1px",
        padding: "4px 8px",
        textAlign: "left",
        fontWeight: "bold",
        borderBottom: `2px solid ${MC_BLACK}`,
    };
    const tdStyle: React.CSSProperties = {
        background: MC_SLOT,
        color: MC_BLACK,
        fontSize: "7px",
        padding: "3px 8px",
        borderBottom: `1px solid ${MC_DARK}`,
        whiteSpace: "nowrap",
    };

    return (
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
            <thead>
                <tr>
                    <th style={thStyle}>TICKS</th>
                    <th style={thStyle}>HUMAN TIME</th>
                    <th style={thStyle}>GAME TIME</th>
                </tr>
            </thead>
            <tbody>
                {REFERENCE_TICKS.map((tick) => {
                    const dm = DateMinecraft.fromTick(tick);
                    const totalMs = tick * DateMinecraft.MS_PER_TICK;
                    const duration = Temporal.Duration.from({ milliseconds: totalMs }).round({ largestUnit: "days", smallestUnit: "seconds" });
                    const humeTime = `${duration.days}d ${String(duration.hours).padStart(2, "0")}:${String(duration.minutes).padStart(2, "0")}:${String(duration.seconds).padStart(2, "0")}`;
                    const gameTime = dm.toLocaleString();
                    return (
                        <tr key={tick}>
                            <td style={tdStyle}>{tick.toLocaleString()}</td>
                            <td style={tdStyle}>{humeTime}</td>
                            <td style={tdStyle}>{gameTime}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
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
                <StatSlot label="Game Time" value={dateMinecraft.toLocaleString()} />
                <StatSlot label="Total Ticks" value={Number(totalTicks).toLocaleString()} />
                <StatSlot label="Real World" value={realDate} />
            </McPanel>

            {/* Converter: ticks → time */}
            <McPanel title="TICK → TIME">
                <ControlTickToTime />
            </McPanel>

            {/* Converter: game time → ticks */}
            <McPanel title="GAME TIME → TICK">
                <ControlGameTimeToTick />
            </McPanel>

            {/* Converter: hour → clock */}
            <McPanel title="HOUR → CLOCK">
                <InputClock />
            </McPanel>

            {/* Ticks reference table */}
            <McPanel title="TICKS REFERENCE">
                <TickReferenceTable />
            </McPanel>

            {/* Conversion explainer */}
            <ConversionSection />

            {/* Usage instructions */}
            <McPanel title="HOW TO USE">
                <div style={{ ...labelStyle, fontSize: "7px", color: "#AAAAAA", marginBottom: "8px" }}>
                    Install the package:
                </div>
                <CodeBlock code={`npm install @jondotsoy/date-minecraft`} />

                <div style={{ ...labelStyle, fontSize: "7px", color: "#AAAAAA", marginBottom: "8px", marginTop: "10px" }}>
                    Import and use:
                </div>
                <CodeBlock code={`import { DateMinecraft } from "@jondotsoy/date-minecraft";

// From a tick number
const a = new DateMinecraft(6000);
console.log(a.hour);    // 12
console.log(a.minute);  // 0
console.log(a.toLocaleString()); // "Day 0, 12:00:00"

// From a time string
const b = new DateMinecraft("18:00");
console.log(b.tick);    // 18000

// Ticks since Minecraft's launch (May 16, 2009)
const ticks = DateMinecraft.now();
const current = new DateMinecraft(ticks);

// Get ticks per day constant
console.log(DateMinecraft.TICKS_PER_DAY); // 24000`} />
            </McPanel>

            {/* Footer */}
            <div style={{
                textAlign: "center",
                padding: "12px",
                color: "#555555",
                fontSize: "7px",
                textShadow: "1px 1px #111111",
            }}>
                © {new Date().getFullYear()} — created by{" "}
                <a
                    href="https://jon.soy"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#AAFFAA", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                >
                    @jondotsoy
                </a>
                {" · "}
                <a
                    href="https://github.com/jondotsoy/date-minecraft"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#AAFFAA", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                >
                    GitHub
                </a>
            </div>
        </div>
    );
}
