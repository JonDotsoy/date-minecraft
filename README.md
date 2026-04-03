# @jondotsoy/date-minecraft

A library to work with Minecraft dates and ticks.

## Install

```bash
npm install @jondotsoy/date-minecraft
```

## Usage

```ts
import { DateMinecraft } from "@jondotsoy/date-minecraft";

// From a tick number
const a = new DateMinecraft(18000);
console.log(a.hour);           // 18
console.log(a.toString());     // D0T18:00:00.000

// From a time string
const b = new DateMinecraft("18:00");
console.log(b.tick);           // 18000

// Ticks since Minecraft's launch (May 16, 2009)
const ticks = DateMinecraft.now();
const current = new DateMinecraft(ticks);
console.log(current.toLocaleString());
```

## API

### `new DateMinecraft(value: string | number)`

Creates a `DateMinecraft` instance from a tick number or a time string.

```ts
new DateMinecraft(6000)          // from ticks
new DateMinecraft("12:00")       // hh:mm
new DateMinecraft("12:00:00")    // hh:mm:ss
new DateMinecraft("T12:00")      // Thh:mm
new DateMinecraft("T12:00:00")   // Thh:mm:ss
new DateMinecraft("D0T12:00")    // DdThh:mm
new DateMinecraft("D0T12:00:00") // DdThh:mm:ss
```

Throws `Error` if the string format is unrecognized, or `RangeError` if hours ≥ 24, minutes ≥ 60, or seconds ≥ 60.

### `DateMinecraft.now(): number`

Returns the ticks elapsed since Minecraft's launch date (May 16, 2009 UTC).

```ts
const ticks = DateMinecraft.now();
const current = new DateMinecraft(ticks);
```

### `DateMinecraft.fromFormat(value: string): number`

Parses a time string and returns the corresponding tick count.

Supported formats:

| Format       | Example          |
|--------------|------------------|
| `hh:mm`      | `"12:00"`        |
| `hh:mm:ss`   | `"12:00:00"`     |
| `Thh:mm`     | `"T12:00"`       |
| `Thh:mm:ss`  | `"T12:00:00"`    |
| `DdThh:mm`   | `"D0T12:00"`     |
| `DdThh:mm:ss`| `"D0T12:00:00"`  |

### `DateMinecraft.fromTick(tick: number): DateMinecraft`

Creates a `DateMinecraft` instance from a tick value.

### Properties

| Property      | Description                        |
|---------------|------------------------------------|
| `tick`        | Raw tick value                     |
| `hour`        | In-game hour (0–23)                |
| `minute`      | In-game minute (0–59)              |
| `second`      | In-game second (0–59)              |
| `millisecond` | In-game millisecond (0–999)        |

### `date.total({ unit, _fixed? }): number`

Returns the total elapsed time in the given unit.

```ts
date.total({ unit: "hours" })            // total hours as float
date.total({ unit: "days", _fixed: 2 })  // rounded to 2 decimals
```

Supported units: `millisecond`, `milliseconds`, `second`, `seconds`, `minute`, `minutes`, `hour`, `hours`, `day`, `days`.

### `date.toString(): string`

Returns a string in the format `D{day}T{HH}:{mm}:{ss}.{mmm}`.

```
D0T06:00:00.000
```

### `date.toLocaleString(locales?, options?): string`

Returns a human-readable string.

```ts
date.toLocaleString()                               // "Day 0, 18:00:00"
date.toLocaleString(undefined, { hourCycle: "h12" }) // "Day 0, 06:00:00 PM"
date.toLocaleString(undefined, { hourCycle: "h11" }) // "Day 0, 06:00:00 PM"
date.toLocaleString(undefined, { hourCycle: "h23" }) // "Day 0, 18:00:00"
date.toLocaleString(undefined, { hourCycle: "h24" }) // "Day 0, 18:00:00"
```

#### `options.hourCycle`

| Value   | Range  | Description                        |
|---------|--------|------------------------------------|
| `h23`   | 0–23   | 24-hour clock, midnight as `00` (default) |
| `h24`   | 1–24   | 24-hour clock, midnight as `24`    |
| `h12`   | 1–12   | 12-hour clock with AM/PM, midnight as `12` |
| `h11`   | 0–11   | 12-hour clock with AM/PM, midnight as `00` |

## Constants

| Constant              | Value                    |
|-----------------------|--------------------------|
| `MS_PER_TICK`         | 50                       |
| `TICKS_PER_SECOND`    | 20                       |
| `TICKS_PER_DAY`       | 24000                    |
| `MINECRAFT_BIRTH`     | May 16, 2009 00:00 UTC   |
