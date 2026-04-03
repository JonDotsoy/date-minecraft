import { expect, test, describe } from "bun:test";
import { DateMinecraft } from "./date-minecraft";

describe("Date Minecraft", () => {
    describe("constants", () => {
        test("should have TICKS_PER_SECOND equal to 20", () => {
            expect(DateMinecraft.TICKS_PER_SECOND).toBe(20);
        });
        test("should have MS_PER_TICK equal to 50", () => {
            expect(DateMinecraft.MS_PER_TICK).toBe(50);
        });
        test("should have TICKS_PER_DAY equal to 24000", () => {
            expect(DateMinecraft.TICKS_PER_DAY).toBe(24_000);
        });
        test("should have IN_GAME_MS_PER_TICK equal to 3600", () => {
            expect(DateMinecraft.IN_GAME_MS_PER_TICK).toBe(3_600);
        });
    });
    describe("fromTick", () => {
        test("should parse tick 0 as hour=0, minute=0, second=0, millisecond=0", () => {
            const d = DateMinecraft.fromTick(0);
            expect(d.hour).toBe(0);
            expect(d.minute).toBe(0);
            expect(d.second).toBe(0);
            expect(d.millisecond).toBe(0);
            expect(d.tick).toBe(0);
        });
        test("should parse tick 1 as second=3, millisecond=600", () => {
            const d = DateMinecraft.fromTick(1);
            expect(d.hour).toBe(0);
            expect(d.minute).toBe(0);
            expect(d.second).toBe(3);
            expect(d.millisecond).toBe(600);
            expect(d.tick).toBe(1);
        });
        test("should parse tick 20 as minute=1, second=12", () => {
            const d = DateMinecraft.fromTick(20);
            expect(d.hour).toBe(0);
            expect(d.minute).toBe(1);
            expect(d.second).toBe(12);
            expect(d.millisecond).toBe(0);
            expect(d.tick).toBe(20);
        });
        test("should parse tick 1200 as hour=1, minute=12", () => {
            const d = DateMinecraft.fromTick(1200);
            expect(d.hour).toBe(1);
            expect(d.minute).toBe(12);
            expect(d.second).toBe(0);
            expect(d.millisecond).toBe(0);
            expect(d.tick).toBe(1200);
        });
        test("should parse tick 12000 as hour=12", () => {
            const d = DateMinecraft.fromTick(12_000);
            expect(d.hour).toBe(12);
            expect(d.minute).toBe(0);
            expect(d.second).toBe(0);
            expect(d.millisecond).toBe(0);
            expect(d.tick).toBe(12_000);
        });
        test("should parse tick 24000 as hour=0 (start of next in-game day)", () => {
            const d = DateMinecraft.fromTick(24_000);
            expect(d.hour).toBe(0);
            expect(d.minute).toBe(0);
            expect(d.second).toBe(0);
            expect(d.millisecond).toBe(0);
            expect(d.tick).toBe(24_000);
        });
        test("should parse tick 72000 as hour=0 (start of 3rd in-game day)", () => {
            const d = DateMinecraft.fromTick(72_000);
            expect(d.hour).toBe(0);
            expect(d.minute).toBe(0);
            expect(d.second).toBe(0);
            expect(d.millisecond).toBe(0);
            expect(d.tick).toBe(72_000);
        });
    });
    describe("total", () => {
        test("should return total in-game milliseconds for tick 20", () => {
            expect(DateMinecraft.fromTick(20).total({ unit: "millisecond" })).toBe(72_000);
        });
        test("should return total in-game seconds for tick 20", () => {
            expect(DateMinecraft.fromTick(20).total({ unit: "seconds" })).toBe(72);
        });
        test("should return total in-game minutes for tick 1200", () => {
            expect(DateMinecraft.fromTick(1200).total({ unit: "minute" })).toBe(72);
        });
        test("should return total in-game hours for tick 72000", () => {
            expect(DateMinecraft.fromTick(72_000).total({ unit: "hour" })).toBe(72);
        });
        test("should return total in-game days for tick 1728000", () => {
            expect(DateMinecraft.fromTick(1_728_000).total({ unit: "day" })).toBe(72);
        });
        test("should return total in-game days (alias) for tick 1728000", () => {
            expect(DateMinecraft.fromTick(1_728_000).total({ unit: "days" })).toBe(72);
        });
        test("should accept plural unit milliseconds", () => {
            expect(DateMinecraft.fromTick(20).total({ unit: "milliseconds" })).toBe(72_000);
        });
        test("should accept singular unit second", () => {
            expect(DateMinecraft.fromTick(20).total({ unit: "second" })).toBe(72);
        });
        test("should accept plural unit minutes", () => {
            expect(DateMinecraft.fromTick(1200).total({ unit: "minutes" })).toBe(72);
        });
        test("should accept plural unit hours", () => {
            expect(DateMinecraft.fromTick(72_000).total({ unit: "hours" })).toBe(72);
        });
    });
    describe("toLocaleString", () => {
        test("should format tick 0 as 'Day 0, 00:00:00.000'", () => {
            expect(DateMinecraft.fromTick(0).toLocaleString()).toBe("Day 0, 00:00:00.000");
        });
        test("should format tick 1 as 'Day 0, 00:00:03.600'", () => {
            expect(DateMinecraft.fromTick(1).toLocaleString()).toBe("Day 0, 00:00:03.600");
        });
        test("should format tick 1200 as 'Day 0, 01:12:00.000'", () => {
            expect(DateMinecraft.fromTick(1200).toLocaleString()).toBe("Day 0, 01:12:00.000");
        });
        test("should format tick 24000 as 'Day 1, 00:00:00.000'", () => {
            expect(DateMinecraft.fromTick(24_000).toLocaleString()).toBe("Day 1, 00:00:00.000");
        });
        test("should format tick 72000 as 'Day 3, 00:00:00.000'", () => {
            expect(DateMinecraft.fromTick(72_000).toLocaleString()).toBe("Day 3, 00:00:00.000");
        });
    });
    describe("toString", () => {
        test("should format tick 0 as D0T00:00:00.000", () => {
            expect(DateMinecraft.fromTick(0).toString()).toBe("D0T00:00:00.000");
        });
        test("should format tick 1 as D0T00:00:03.600", () => {
            expect(DateMinecraft.fromTick(1).toString()).toBe("D0T00:00:03.600");
        });
        test("should format tick 20 as D0T00:01:12.000", () => {
            expect(DateMinecraft.fromTick(20).toString()).toBe("D0T00:01:12.000");
        });
        test("should format tick 200 as D0T00:12:00.000", () => {
            expect(DateMinecraft.fromTick(200).toString()).toBe("D0T00:12:00.000");
        });
        test("should format tick 1200 as D0T01:12:00.000", () => {
            expect(DateMinecraft.fromTick(1200).toString()).toBe("D0T01:12:00.000");
        });
        test("should format tick 12000 as D0T12:00:00.000", () => {
            expect(DateMinecraft.fromTick(12_000).toString()).toBe("D0T12:00:00.000");
        });
        test("should format tick 24000 as D1T00:00:00.000", () => {
            expect(DateMinecraft.fromTick(24_000).toString()).toBe("D1T00:00:00.000");
        });
        test("should format tick 72000 as D3T00:00:00.000", () => {
            expect(DateMinecraft.fromTick(72_000).toString()).toBe("D3T00:00:00.000");
        });
        test("should format tick 1728000 as D72T00:00:00.000", () => {
            expect(DateMinecraft.fromTick(1_728_000).toString()).toBe("D72T00:00:00.000");
        });
    });
});
