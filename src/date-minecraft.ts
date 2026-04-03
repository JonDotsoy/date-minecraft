export class DateMinecraft {
    static MS_PER_TICK = 50;
    static TICKS_PER_SECOND = 20;
    static TICKS_PER_DAY = 24_000;
    static IN_GAME_MS_PER_TICK = 86_400_000 / DateMinecraft.TICKS_PER_DAY; // 3600

    readonly tick: number;
    readonly millisecond: number;
    readonly second: number;
    readonly minute: number;
    readonly hour: number;

    private constructor(tick: number) {
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

    total({ unit, _fixed }: { unit: keyof typeof DateMinecraft.totalsFunctionsWithPlural, _fixed?: number }): number {
        const totalFunction = DateMinecraft.totalsFunctionsWithPlural[unit];
        const total = totalFunction(this.tick);
        return _fixed !== undefined ? parseFloat(total.toFixed(_fixed)) : total;
    }

    toString(): string {
        const pad2 = (n: number) => n.toString().padStart(2, "0");
        const pad3 = (n: number) => n.toString().padStart(3, "0");
        const day = Math.floor(this.tick / DateMinecraft.TICKS_PER_DAY);
        return `D${day}T${pad2(this.hour)}:${pad2(this.minute)}:${pad2(this.second)}.${pad3(this.millisecond)}`;
    }

    static fromTick(tick: number): DateMinecraft {
        return new DateMinecraft(tick);
    }
}
