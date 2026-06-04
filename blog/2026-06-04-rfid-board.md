---
title: Building a 2x2 RFID board with RC522 + 74HC4067 + Raspberry Pi
description: A small tutorial on how to build a 2x2 game board that detects game pieces using RFID sensors.
authors: [oleks]
---

*Goal:* build a 2x2 board, with one RFID reader per cell, using a multiplexer already so the design can later scale to 4x5.

<!-- truncate -->

## Components

- 4 × RC522 RFID modules
- 1 × 74HC4067 multiplexer
- 1 × Raspberry Pi 3B+
- 4 × RFID tags
- 4 × 10 kΩ resistors
- Jumper wires
- External 3.3 V power supply (recommended)

## Cell Layout

Use this numbering:

```text
+--------+--------+
| Cell 0 | Cell 1 |
| RC522  | RC522  |
|  #0    |  #1    |
+--------+--------+
| Cell 2 | Cell 3 |
| RC522  | RC522  |
|  #2    |  #3    |
+--------+--------+
```

The corresponding multiplexer channels are:

```text
Cell 0 -> MUX C0 -> RC522 #0 SDA/SS
Cell 1 -> MUX C1 -> RC522 #1 SDA/SS
Cell 2 -> MUX C2 -> RC522 #2 SDA/SS
Cell 3 -> MUX C3 -> RC522 #3 SDA/SS
```

## Raspberry Pi GPIO Pins Used

Use these Raspberry Pi pins:

| Purpose | Raspberry Pi GPIO | Physical pin |
|---|---:|---:|
| SPI SCLK | GPIO11 | Pin 23 |
| SPI MOSI | GPIO10 | Pin 19 |
| SPI MISO | GPIO9 | Pin 21 |
| SPI CE0 | GPIO8 | Pin 24 |
| RC522 reset | GPIO25 | Pin 22 |
| MUX S0 | GPIO17 | Pin 11 |
| MUX S1 | GPIO27 | Pin 13 |
| MUX S2 | GPIO23 | Pin 16 |
| MUX S3 | GPIO24 | Pin 18 |
| MUX enable | GPIO22 | Pin 15 |
| 3.3 V | 3.3 V | Pin 1 or 17 |
| Ground | GND | Pin 6, 9, 14, 20, 25, 30, 34, or 39 |

## Connect Power

### Connect Ground First

All grounds must be connected together.

Connect:

| From | To |
|---|---|
| Raspberry Pi GND | Breadboard ground rail |
| RC522 #0 GND | Breadboard ground rail |
| RC522 #1 GND | Breadboard ground rail |
| RC522 #2 GND | Breadboard ground rail |
| RC522 #3 GND | Breadboard ground rail |
| 74HC4067 GND | Breadboard ground rail |

If you use an external 3.3 V supply, also connect:

| From | To |
|---|---|
| External power supply GND | Breadboard ground rail |

### Connect 3.3 V Power

For a 4-reader prototype, you can test using the Raspberry Pi 3.3 V pin.

Connect:

| From | To |
|---|---|
| Raspberry Pi 3.3 V | Breadboard 3.3 V rail |
| RC522 #0 VCC / 3.3V | Breadboard 3.3 V rail |
| RC522 #1 VCC / 3.3V | Breadboard 3.3 V rail |
| RC522 #2 VCC / 3.3V | Breadboard 3.3 V rail |
| RC522 #3 VCC / 3.3V | Breadboard 3.3 V rail |
| 74HC4067 VCC | Breadboard 3.3 V rail |

For the future 4x5 board, use an external 3.3 V power supply instead of the Pi 3.3 V pin.

Do not connect RC522 VCC to 5 V.

## Connect Shared SPI Wires

All four RC522 modules share the same SPI bus.

Connect these wires:

| Raspberry Pi | RC522 #0 | RC522 #1 | RC522 #2 | RC522 #3 |
|---|---|---|---|---|
| GPIO11 / SCLK | SCK | SCK | SCK | SCK |
| GPIO10 / MOSI | MOSI | MOSI | MOSI | MOSI |
| GPIO9 / MISO | MISO | MISO | MISO | MISO |

This means:

```text
Pi GPIO11 goes to SCK on all 4 readers.
Pi GPIO10 goes to MOSI on all 4 readers.
Pi GPIO9 goes to MISO on all 4 readers.
```

## Connect Reset

Connect one reset wire shared by all RC522 modules:

| Raspberry Pi | RC522 #0 | RC522 #1 | RC522 #2 | RC522 #3 |
|---|---|---|---|---|
| GPIO25 | RST | RST | RST | RST |

This lets the Pi reset all RFID readers together.


## Connect the 74HC4067 Control Pins

The 74HC4067 has address pins `S0`, `S1`, `S2`, and `S3`.

These pins tell the multiplexer which channel to connect.

Connect:

| 74HC4067 | Raspberry Pi |
|---|---|
| S0 | GPIO17 |
| S1 | GPIO27 |
| S2 | GPIO23 |
| S3 | GPIO24 |
| EN | GPIO22 |

The `EN` pin is usually active-low:

```text
EN = HIGH -> multiplexer disabled
EN = LOW  -> multiplexer enabled
```

During normal scanning, the script will:

1. Disable the multiplexer.
2. Choose a channel using S0-S3.
3. Enable the multiplexer.
4. Read the corresponding RC522.
5. Disable the multiplexer again.

## Connect the Multiplexer Signal Pin

Connect the common signal pin of the multiplexer to the Raspberry Pi SPI chip-select pin.

Depending on your 74HC4067 board, this pin may be called:

- `SIG`
- `COM`
- `Z`

Connect:

| 74HC4067 | Raspberry Pi |
|---|---|
| SIG / COM / Z | GPIO8 / CE0 |

This means that the Raspberry Pi chip-select signal goes into the multiplexer.

The multiplexer then sends that signal to one selected RC522 reader.

## Connect Each RC522 SDA/SS Pin to the Multiplexer

The RC522 module usually labels its chip-select pin as:

- `SDA`
- sometimes `SS`
- sometimes `SDA/SS`

This is not I2C SDA in this setup. On RC522 SPI modules, this pin is used as SPI chip select.

Connect:

| Cell | RC522 module | RC522 pin | 74HC4067 channel |
|---:|---|---|---|
| 0 | RC522 #0 | SDA/SS | C0 |
| 1 | RC522 #1 | SDA/SS | C1 |
| 2 | RC522 #2 | SDA/SS | C2 |
| 3 | RC522 #3 | SDA/SS | C3 |

So:

```text
RC522 #0 SDA/SS -> 74HC4067 C0
RC522 #1 SDA/SS -> 74HC4067 C1
RC522 #2 SDA/SS -> 74HC4067 C2
RC522 #3 SDA/SS -> 74HC4067 C3
```

Do not connect the RC522 SDA/SS pins directly to the Raspberry Pi.

Do not connect the four SDA/SS pins together.


## Add Pull-Up Resistors on SDA/SS

Each RC522 `SDA/SS` pin must be pulled up to 3.3 V with a 10 kΩ resistor.

Connect:

| RC522 pin | Resistor | Power |
|---|---|---|
| RC522 #0 SDA/SS | 10 kΩ | 3.3 V |
| RC522 #1 SDA/SS | 10 kΩ | 3.3 V |
| RC522 #2 SDA/SS | 10 kΩ | 3.3 V |
| RC522 #3 SDA/SS | 10 kΩ | 3.3 V |

In practice:

```text
RC522 SDA/SS pin -> one side of 10 kΩ resistor
other side of resistor -> 3.3 V rail
```

Why this is needed:

When a reader is not connected through the multiplexer, its `SDA/SS` pin would otherwise float. The pull-up keeps it HIGH, which means deselected.

## Complete Connection Checklist

### Raspberry Pi to RC522 Readers

| Raspberry Pi | Connects to |
|---|---|
| GPIO11 / SCLK | SCK on all RC522 |
| GPIO10 / MOSI | MOSI on all RC522 |
| GPIO9 / MISO | MISO on all RC522 |
| GPIO25 | RST on all RC522 |
| 3.3 V | VCC on all RC522 |
| GND | GND on all RC522 |

### Raspberry Pi to 74HC4067

| Raspberry Pi | 74HC4067 |
|---|---|
| GPIO8 / CE0 | SIG / COM / Z |
| GPIO17 | S0 |
| GPIO27 | S1 |
| GPIO23 | S2 |
| GPIO24 | S3 |
| GPIO22 | EN |
| 3.3 V | VCC |
| GND | GND |

### 74HC4067 to RC522 Readers

| 74HC4067 | RC522 |
|---|---|
| C0 | RC522 #0 SDA/SS |
| C1 | RC522 #1 SDA/SS |
| C2 | RC522 #2 SDA/SS |
| C3 | RC522 #3 SDA/SS |

## Enable SPI on Raspberry Pi

Run:

```bash
sudo raspi-config
```

Then:

```text
Interface Options -> SPI -> Enable
```

Reboot:

```bash
sudo reboot
```

After reboot, check that SPI exists:

```bash
ls /dev/spidev*
```

You should see something like:

```text
/dev/spidev0.0
/dev/spidev0.1
```

## Install Python Dependencies

Install required packages:

```bash
sudo apt update
sudo apt install -y python3-pip python3-gpiozero python3-spidev python3-rpi.gpio
pip3 install mfrc522
```

If `pip3 install mfrc522` fails because of system package restrictions, use a virtual environment:

```bash
python3 -m venv ~/rfid-env
source ~/rfid-env/bin/activate
pip install mfrc522 spidev RPi.GPIO
```


## Python Code: Scan the 2x2 Board

```python
import time
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522

# 74HC4067 address pins
MUX_S0 = 17
MUX_S1 = 27
MUX_S2 = 23
MUX_S3 = 24

# 74HC4067 enable pin
# Usually active-low:
# HIGH = disabled
# LOW = enabled
MUX_EN = 22

# Shared RC522 reset pin
RC522_RST = 25

# Number of cells in the 2x2 board
CELL_COUNT = 4

CELL_NAMES = {
    0: "Cell 0: top-left",
    1: "Cell 1: top-right",
    2: "Cell 2: bottom-left",
    3: "Cell 3: bottom-right",
}


def setup_gpio():
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)

    GPIO.setup(MUX_S0, GPIO.OUT)
    GPIO.setup(MUX_S1, GPIO.OUT)
    GPIO.setup(MUX_S2, GPIO.OUT)
    GPIO.setup(MUX_S3, GPIO.OUT)
    GPIO.setup(MUX_EN, GPIO.OUT)

    GPIO.setup(RC522_RST, GPIO.OUT)

    # Disable mux at startup.
    GPIO.output(MUX_EN, GPIO.HIGH)

    # Keep RC522 readers out of reset.
    GPIO.output(RC522_RST, GPIO.HIGH)


def disable_mux():
    GPIO.output(MUX_EN, GPIO.HIGH)


def enable_mux():
    GPIO.output(MUX_EN, GPIO.LOW)


def select_mux_channel(channel):
    # Channel number is binary encoded on S0-S3.
    GPIO.output(MUX_S0, GPIO.HIGH if (channel & 0b0001) else GPIO.LOW)
    GPIO.output(MUX_S1, GPIO.HIGH if (channel & 0b0010) else GPIO.LOW)
    GPIO.output(MUX_S2, GPIO.HIGH if (channel & 0b0100) else GPIO.LOW)
    GPIO.output(MUX_S3, GPIO.HIGH if (channel & 0b1000) else GPIO.LOW)


def select_cell(cell_index):
    # Connect Raspberry Pi CE0 to the SDA/SS pin of one RC522 reader.
    disable_mux()
    select_mux_channel(cell_index)

    # Small settling delay after switching channel.
    time.sleep(0.002)

    enable_mux()

    # Small delay before using SPI.
    time.sleep(0.002)


def main():
    setup_gpio()

    # SimpleMFRC522 uses /dev/spidev0.0, which corresponds to CE0.
    reader = SimpleMFRC522()

    last_seen = {}

    print("Scanning 2x2 RFID board.")
    print("Press Ctrl+C to stop.")
    print()

    try:
        while True:
            for cell in range(CELL_COUNT):
                select_cell(cell)

                try:
                    tag_id, text = reader.read_no_block()
                except Exception as error:
                    tag_id = None
                    text = None
                    print(f"{CELL_NAMES[cell]} -> read error: {error}")

                if tag_id:
                    value = str(tag_id)

                    if last_seen.get(cell) != value:
                        last_seen[cell] = value
                        print(f"{CELL_NAMES[cell]} -> tag {value}")
                else:
                    if last_seen.get(cell) is not None:
                        last_seen[cell] = None
                        print(f"{CELL_NAMES[cell]} -> empty")

                disable_mux()

                # Avoid scanning too aggressively.
                time.sleep(0.05)

    except KeyboardInterrupt:
        print()
        print("Stopping.")

    finally:
        disable_mux()
        GPIO.cleanup()


if __name__ == "__main__":
    main()
```

## Expected Output

When a tag is placed on Cell 0:

```text
Cell 0: top-left -> tag 123456789
```

When a tag is removed:

```text
Cell 0: top-left -> empty
```

When several tags are placed:

```text
Cell 0: top-left -> tag 123456789
Cell 1: top-right -> tag 987654321
Cell 2: bottom-left -> tag 555555555
Cell 3: bottom-right -> tag 222222222
```
