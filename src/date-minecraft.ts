export class DateMinecraft {
    static MS_PER_TICK = 50;
    static TICKS_PER_SECOND = 20;
    static TICKS_PER_DAY = 24_000;
    static IN_GAME_MS_PER_TICK = 86_400_000 / DateMinecraft.TICKS_PER_DAY; // 3600
    static MINECRAFT_BIRTH = Date.UTC(2009, 4, 16, 0, 0, 0);

    readonly tick: number;
    readonly millisecond: number;
    readonly second: number;
    readonly minute: number;
    readonly hour: number;

    constructor(value: string | number) {
        const tick = typeof value === "string" ? DateMinecraft.fromFormat(value) : value;
        this.tick = tick;
        const totalMs = tick * DateMinecraft.IN_GAME_MS_PER_TICK;
        const totalSeconds = totalMs / 1000;
        const totalMinutes = totalSeconds / 60;
        const totalHours = totalMinutes / 60;

        this.millisecond = Math.floor(totalMs) % 1000;
        this.second = Math.floor(totalSeconds) % 60;
        this.minute = Math.floor(totalMinutes) % 60;
        this.hour = Math.floor(totalHours) % 24;
    }

    private static totalsFunctions = {
        millisecond: (tick: number) => tick * DateMinecraft.IN_GAME_MS_PER_TICK,
        second: (tick: number) => (tick * DateMinecraft.IN_GAME_MS_PER_TICK) / 1000,
        minute: (tick: number) => (tick * DateMinecraft.IN_GAME_MS_PER_TICK) / 60_000,
        hour: (tick: number) => (tick * DateMinecraft.IN_GAME_MS_PER_TICK) / 3_600_000,
        day: (tick: number) => tick / DateMinecraft.TICKS_PER_DAY,
    }

    private static totalsFunctionsWithPlural = {
        millisecond: DateMinecraft.totalsFunctions.millisecond,
        milliseconds: DateMinecraft.totalsFunctions.millisecond,
        second: DateMinecraft.totalsFunctions.second,
        seconds: DateMinecraft.totalsFunctions.second,
        minute: DateMinecraft.totalsFunctions.minute,
        minutes: DateMinecraft.totalsFunctions.minute,
        hour: DateMinecraft.totalsFunctions.hour,
        hours: DateMinecraft.totalsFunctions.hour,
        day: DateMinecraft.totalsFunctions.day,
        days: DateMinecraft.totalsFunctions.day,
    }

    total({ unit, _fixed }: {
        unit: keyof typeof DateMinecraft.totalsFunctionsWithPlural,
        /*  * @experimental */
        _fixed?: number
    }): number {
        const totalFunction = DateMinecraft.totalsFunctionsWithPlural[unit];
        const total = totalFunction(this.tick);
        const totalFixed = _fixed ?? 0;
        return parseFloat(total.toFixed(totalFixed));
    }

    toString(): string {
        const pad2 = (n: number) => n.toString().padStart(2, "0");
        const pad3 = (n: number) => n.toString().padStart(3, "0");
        const day = Math.floor(this.tick / DateMinecraft.TICKS_PER_DAY);
        return `D${day}T${pad2(this.hour)}:${pad2(this.minute)}:${pad2(this.second)}.${pad3(this.millisecond)}`;
    }

    toLocaleString(locales?: string | string[], options?: { hourCycle?: 'h11' | 'h12' | 'h23' | 'h24' }): string {
        const pad2 = (n: number) => n.toString().padStart(2, "0");
        const day = Math.floor(this.tick / DateMinecraft.TICKS_PER_DAY);
        const hourCycle = options?.hourCycle ?? "h23";

        let hour = this.hour;
        let suffix = "";

        if (hourCycle === "h12" || hourCycle === "h11") {
            const period = hour < 12 ? "AM" : "PM";
            hour = hour % 12;
            if (hourCycle === "h12" && hour === 0) hour = 12;
            suffix = ` ${period}`;
        } else if (hourCycle === "h24") {
            if (hour === 0) hour = 24;
        }

        return `Day ${day}, ${pad2(hour)}:${pad2(this.minute)}:${pad2(this.second)}${suffix}`;
    }

    static fromTick(tick: number): DateMinecraft {
        return new DateMinecraft(tick);
    }

    static fromFormat(value: string): number {
        const TICKS_PER_HOUR = DateMinecraft.TICKS_PER_DAY / 24;       // 1000
        const TICKS_PER_MINUTE = TICKS_PER_HOUR / 60;                  // 50/3
        const TICKS_PER_SECOND = TICKS_PER_MINUTE / 60;                // 5/18

        let days = 0, hours = 0, minutes = 0, seconds = 0;

        let m = value.match(/^D(\d+)T(\d+):(\d+)(?::(\d+))?$/);
        if (m) {
            days = parseInt(m[1]);
            hours = parseInt(m[2]);
            minutes = parseInt(m[3]);
            seconds = m[4] !== undefined ? parseInt(m[4]) : 0;
        } else {
            m = value.match(/^T(\d+):(\d+)(?::(\d+))?$/) ?? value.match(/^(\d+):(\d+)(?::(\d+))?$/);
            if (m) {
                hours = parseInt(m[1]);
                minutes = parseInt(m[2]);
                seconds = m[3] !== undefined ? parseInt(m[3]) : 0;
            } else {
                throw new Error(`Invalid format: ${value}`);
            }
        }

        if (hours > 23) throw new RangeError(`Hours out of range: ${hours} (expected 0-23)`);
        if (minutes > 59) throw new RangeError(`Minutes out of range: ${minutes} (expected 0-59)`);
        if (seconds > 59) throw new RangeError(`Seconds out of range: ${seconds} (expected 0-59)`);

        return days * DateMinecraft.TICKS_PER_DAY
            + hours * TICKS_PER_HOUR
            + minutes * TICKS_PER_MINUTE
            + seconds * TICKS_PER_SECOND;
    }

    static now(): number {
        const ms = Date.now() - DateMinecraft.MINECRAFT_BIRTH;
        return (ms / 1000) * DateMinecraft.MS_PER_TICK;
    }
}
