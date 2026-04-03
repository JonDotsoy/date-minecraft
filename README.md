# @jondotsoy/date-minecraft

A library to work with Minecraft dates and ticks.

## Install

```bash
npm install @jondotsoy/date-minecraft
```

## Usage

```ts
import { DateMinecraft } from "@jondotsoy/date-minecraft";

const date = DateMinecraft.fromTick(18000);

console.log(date.tick);        // 18000
console.log(date.hour);        // 18
console.log(date.minute);      // 0
console.log(date.second);      // 0
console.log(date.toString());  // D0T18:00:00.000

console.log(date.toLocaleString()); // Day 0, 18:00:00
```

## API

### `DateMinecraft.fromTick(tick: number): DateMinecraft`

Creates a `DateMinecraft` instance from a given tick value.

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
date.total({ unit: "hours" })       // total hours as float
date.total({ unit: "days", _fixed: 2 }) // rounded to 2 decimals
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
date.toLocaleString()                              // "Day 0, 18:00:00"
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

| Constant               | Value  |
|------------------------|--------|
| `MS_PER_TICK`          | 50     |
| `TICKS_PER_SECOND`     | 20     |
| `TICKS_PER_DAY`        | 24000  |
