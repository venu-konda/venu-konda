# Hi, I'm Venu Konda

**Portfolio website with live project simulators: https://venu-konda.github.io/venu-konda/** · [Resume (PDF)](https://venu-konda.github.io/venu-konda/assets/resume/Venu_Konda_Resume.pdf)

Embedded Software Engineer at **XDLINX Space Labs**, Hyderabad, working on avionics flight software: STM32, FreeRTOS, peripheral drivers, bootloaders and flash file systems. Before that, two years of IoT firmware on STM32 and ESP32 for industrial monitoring and control.

## What I work with

| Area | Details |
|---|---|
| Languages | Embedded C, C++, Linux system programming, shell scripting, JavaScript (tooling) |
| Microcontrollers | STM32 (Cortex-M), ESP32, NXP LPC2129 (ARM7TDMI) |
| RTOS | FreeRTOS: tasks, queues, semaphores, software timers, memory tuning |
| Communication | UART, SPI, I2C, CAN, RS-485, MODBUS, LoRa |
| Storage | LittleFS, FAT/FAT32, SD card, QSPI NOR flash, parallel NOR flash, I2C EEPROM |
| Firmware services | Bootloaders and firmware update, CRC/checksum integrity, RTC timekeeping, interrupt-driven I/O |
| Tools | STM32CubeIDE, ESP-IDF, Arduino IDE, Keil µVision, GCC/Make, Git, J-Link, ST-Link, logic analyzer, oscilloscope |

## Experience

**Avionics Software Engineer, XDLINX Space Labs** (May 2026 – present)
- Avionics flight software on STM32 under FreeRTOS, with task scheduling and memory usage tuned for deterministic real-time behaviour.
- UART, SPI, I2C and CAN peripheral drivers used across onboard subsystems.
- LittleFS on QSPI NOR flash for persistent onboard storage of configuration and telemetry.
- Bootloader and in-field firmware update mechanism; board bring-up and subsystem integration with the hardware team.

**Lead Hardware Engineer, The India Source – Growth Accelerator Technologies** (Apr 2026 – May 2026)
- Led embedded hardware and firmware development on STM32 and ESP32 (STM32CubeIDE, ESP-IDF, Arduino IDE).
- Built graphical interfaces for 64×64 RGB LED matrix displays; validated hardware with oscilloscopes and logic analyzers.

**IoT Engineer, The India Source – Growth Accelerator Technologies** (Oct 2024 – Mar 2026)
- FreeRTOS firmware on STM32 and ESP32 for industrial monitoring and control, built around tasks, queues and semaphores.
- UART, SPI, I2C, LoRa and MODBUS communication links; RTD/PT100 and 4–20 mA analog inputs.
- Closed-loop PID control for temperature and pressure regulation.

**Advanced Embedded Systems Training, Vector India** (Nov 2023 – Jun 2024)
- Eight-month programme covering hardware design, firmware development and RTOS concepts, in C, C++ and Embedded C.

## Projects

| Project | What it is |
|---|---|
| [ESP32-Smart-Irrigation](https://github.com/venu-konda/ESP32-Smart-Irrigation) | Autonomous soil-moisture irrigation controller on ESP-IDF/FreeRTOS: calibrated sensing, pump safety logic, NVS settings, UART console, MQTT telemetry. CI-built. |
| [data-converter-crc](https://github.com/venu-konda/data-converter-crc) | Browser tool for byte conversion (hex/dec/oct/bin/Base64/text) and CRC calculation, verify, append and identify across a 104-algorithm catalog, with C code generation. [Live](https://venu-konda.github.io/data-converter-crc/) |
| [RFID attendance system](https://github.com/venu-konda/attendence-system-implementation-using-RFID) | NXP LPC2129 (ARM7) firmware: UART tag reader, I2C EEPROM IN/OUT state, RTC timestamps, LCD + keypad, CSV log to a Linux host logger. |
| [preprocessor](https://github.com/venu-konda/preprocessor) | A C preprocessor written from scratch: comment removal, `#include` expansion and `#define` replacement. |
| [shopping-app](https://github.com/venu-konda/shopping-app) | Console shopping cart in C++ with a built-in bank account and password-protected payment (OOP exercise). |
| [embedded-systems-workspace](https://github.com/venu-konda/embedded-systems-workspace) | Collection of embedded systems, C/C++ and Linux programming exercises and projects. |

## Education

- **B.Tech, Electrical and Electronics Engineering**, Vaageswari College of Engineering, JNTUH, Karimnagar (2020 – 2023)
- **Diploma, Electrical and Electronics Engineering**, SRRS Government Polytechnic College, Sircilla (2017 – 2020)

## Contact

[LinkedIn](https://linkedin.com/in/venu-konda-dev) · kondavenuk@gmail.com

## This repository

Besides the profile README, this repository holds my portfolio site, served by GitHub Pages at https://venu-konda.github.io/venu-konda/.

| Path | What it is |
|---|---|
| `index.html`, `assets/` | The portfolio page: summary, skills, experience, projects, education and contact details, plus the resume PDF and photo |
| `sim/` | Browser-only simulators of the projects (FreeRTOS scheduler, PID loop, ESP32 irrigation, RFID attendance, LoRa node, SD-card logger, FIFO IPC, TCP DBMS, C preprocessor, infix→postfix, C++ shopping cart). Plain HTML/CSS/JS, no build step |

To update the site, edit the files and push to `main`; Pages rebuilds within a minute. To replace the photo or resume, overwrite `assets/img/photo.jpg` (square) and `assets/resume/Venu_Konda_Resume.pdf`.

The contact form opens the visitor's e-mail client with the message filled in. To receive messages without that step, create a free form endpoint (for example at formspree.io) and paste its URL into `FORM_ENDPOINT` at the top of `assets/js/site.js`.
