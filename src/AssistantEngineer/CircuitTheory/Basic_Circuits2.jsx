import { useState, useEffect, useCallback } from "react";

const QUESTIONS = [
  {
    id: 207,
    question: "If three inductors are connected in parallel, then which of the following is correct?",
    options: [
      "Power across all the inductors will be same",
      "Thermal loss across all the inductors will be same",
      "Current across all the inductors will be same",
      "Voltage across all the inductors will be same"
    ],
    answer: 3,
    explanation: "When three inductors are connected in parallel, voltage across all inductors will be the same (as in any parallel connection). Each inductor may carry a different current depending on its inductance. In parallel: 1/L_eq = 1/L1 + 1/L2 + 1/L3. The common voltage means all inductors share the same terminal voltage, while currents divide based on individual inductances.",
    topic: "Inductors",
    exam: "PSPCL JE 2019, Shift-I"
  },
  {
    id: 208,
    question: "A capacitor has a capacitance of 5 microfarad. What is the stored energy in the capacitor, if DC voltage of 100 V is applied across it?",
    options: ["25 joules", "25/100 joules", "250/100 joules", "2.5/100 joules"],
    answer: 3,
    explanation: "Given: C = 5 µF = 5×10⁻⁶ F, V = 100 V\nEnergy stored E = ½CV²\nE = ½ × 5×10⁻⁶ × (100)²\nE = ½ × 5×10⁻⁶ × 10000\nE = 2.5×10⁻² = 2.5/100 Joules\nSo E = 0.025 J = 2.5/100 Joules.",
    topic: "Capacitors",
    exam: "PSPCL JE 2019, Shift-I"
  },
  {
    id: 209,
    question: "The Ohm's law is valid for _____ circuits.",
    options: ["linear", "non-linear and linear", "non-linear", "semiconductor"],
    answer: 0,
    explanation: "Ohm's law states: 'The amount of electric current through a metal conductor in a circuit is directly proportional to the voltage impressed across it, for any given temperature.' — I ∝ V, so I = V/R. Ohm's law is valid for linear circuits because the relationship between voltage and current is linear (straight-line graph). It does NOT apply to non-linear devices like diodes, transistors, etc.",
    topic: "Ohm's Law",
    exam: "UPPCL JE 07.09.2021, Shift-I / PSPCL JE 2019, Shift-I"
  },
  {
    id: 210,
    question: "The symbol shown (a diamond-shaped dependent source with + terminal at top and current arrow) is:",
    options: [
      "Voltage controlled current source",
      "Current controlled current source",
      "Current controlled voltage source",
      "Voltage controlled voltage source"
    ],
    answer: 0,
    explanation: "The given symbol represents a Voltage Controlled Current Source (VCCS). It is a dependent source where: The output is a CURRENT source (diamond shape with current arrow), The controlling quantity is VOLTAGE (V). In this source, the output current magnitude depends on the input voltage. It is a dependent source — meaning it relies on another circuit variable. This is widely used in transistor small-signal models.",
    topic: "Circuit Sources",
    exam: "PSPCL JE 2019, Shift-I"
  },
  {
    id: 211,
    question: "The capacitor in circuit opposes the sudden change of:",
    options: ["Voltage", "temperature", "Energy", "current"],
    answer: 0,
    explanation: "A capacitor opposes sudden changes in VOLTAGE. The current through a capacitor is: i_c(t) = C × dV_c/dt. If voltage tried to change instantaneously (dt→0), the current would become infinite — which is physically impossible. Therefore, capacitor voltage cannot change instantaneously, making it a voltage-stabilizing element. Similarly, an inductor opposes sudden changes in current.",
    topic: "Capacitors",
    exam: "PSPCL JE 2019, Shift-I / SSC JE 26.09.2019 / HPSSC JE 2017 / DMRC JE 2014 / SSC JE 2008"
  },
  {
    id: 212,
    question: "1 watt is equal to:",
    options: [
      "1 Newton-meter-second",
      "1 Newton-second/meter",
      "1 Newton/meter-second",
      "1 Newton-meter/second"
    ],
    answer: 3,
    explanation: "Power (P) = Work done / Time = F×d / t (Newton × meter / second)\nSo 1 Watt = 1 Newton-meter/second.\nThis is consistent with the SI unit: 1 W = 1 J/s = 1 N·m/s.\nIn electrical terms: P = VI (Volts × Amperes = Watts).",
    topic: "Units",
    exam: "PSPCL JE 2019, Shift-I"
  },
  {
    id: 213,
    question: "In source transformation of a circuit:",
    options: [
      "voltage source is transformed in current source",
      "inductor is transformed in voltage source",
      "capacitor is transformed in resistor",
      "inductor is transformed in capacitor"
    ],
    answer: 0,
    explanation: "In source transformation: A voltage source (V) in series with resistance (R) is transformed into a current source (I = V/R) in parallel with the same resistance R. Conversely, a current source (I) in parallel with R becomes a voltage source (V = IR) in series with R. Source transformation is a powerful circuit simplification technique that preserves external circuit behavior while changing the internal representation.",
    topic: "Circuit Theorems",
    exam: "PSPCL JE 2019, Shift-I"
  },
  {
    id: 214,
    question: "The property of a substance that opposes the flow of electric current is known as:",
    options: ["resilience", "conductance", "resistance", "immittance"],
    answer: 2,
    explanation: "Resistance is the property of a material that opposes the flow of electric current. It is denoted by 'R' and measured in Ohms (Ω). For a conductor: R = V/I (Ohm's Law). Resistance depends on: material (resistivity ρ), length (L), and cross-sectional area (A): R = ρL/A. Conductance (G = 1/R) is the opposite — it measures ease of current flow.",
    topic: "Resistance",
    exam: "PSPCL JE 2019, Shift-I"
  },
  {
    id: 215,
    question: "What is the average value of voltage extracted from a battery?",
    options: [
      "Same as maximum value",
      "Divide maximum value by √2",
      "Multiply maximum value by √2",
      "Zero"
    ],
    answer: 0,
    explanation: "The average value of voltage extracted from a battery is the SAME as the maximum value. This is because a battery provides DC (Direct Current) voltage. For DC, the voltage is constant and does not vary with time. Therefore, Average Value = Maximum Value = Constant DC Voltage. (Note: For AC sinusoidal waves, average = 0.637 × peak, and RMS = 0.707 × peak.)",
    topic: "DC Circuits",
    exam: "PSPCL JE 2019, Shift-I"
  },
  {
    id: 216,
    question: "An electric bulb rated 100 Watt, 240 V is connected to a 180 V supply. What will be the output of the bulb?",
    options: ["Approx. 76 Watt", "Approx. 46 Watt", "Approx. 56 Watt", "Approx. 100 Watt"],
    answer: 2,
    explanation: "Given: P_rated = 100W, V_rated = 240V, V_new = 180V\nStep 1: Find bulb resistance: R = V²/P = (240)²/100 = 57600/100 = 576 Ω\nStep 2: Find new power: P_new = V_new²/R = (180)²/576 = 32400/576 ≈ 56.25 W ≈ 56 W\nThe bulb glows dimmer because it receives less power at the lower voltage.",
    topic: "Power",
    exam: "PGVCL JE 2015"
  },
  {
    id: 217,
    question: "A 1 kΩ, 1 W resistor can safely pass a current of-",
    options: ["30 mA", "100 mA", "150 mA", "500 mA"],
    answer: 0,
    explanation: "Given: Power Rating = 1W, R = 1 kΩ = 1000 Ω\nUsing P = I²R: I² = P/R = 1/1000 = 0.001\nI = √0.001 = 0.0316 A ≈ 30 mA (31.6 mA)\nSo the resistor can safely carry approximately 30 mA without exceeding its power rating. Exceeding this current would cause the resistor to overheat and fail.",
    topic: "Power",
    exam: "PGVCL JE 2015"
  },
  {
    id: 218,
    question: "If there are b branches and n nodes, the number of equations is given by:",
    options: ["b", "b-n", "n-1", "(b-n+1)"],
    answer: 3,
    explanation: "For a circuit with b branches and n nodes, using mesh analysis (KVL):\nNumber of independent loop equations = b - n + 1\nThis is derived from graph theory. The number of independent KVL equations equals the number of meshes (independent loops). This is also called the 'circuit rank' or 'number of chords'. For KCL equations: we get (n-1) independent node equations.",
    topic: "Network Topology",
    exam: "MIZORAM PSC (PHED) 2019, Paper-I / MPMKVVCL (Bhopal) JE 2018"
  },
  {
    id: 219,
    question: "The current flowing in the branch CD is equal to:",
    options: ["10 A", "5 A", "3.33 A", "2.3 A"],
    answer: 2,
    explanation: "Converting star to delta configuration and solving:\nR_AC = R_AD = (2×1 + 1×1 + 2×1)/1 = 5Ω\nR_CD = (2×1 + 1×1 + 2×1)/2 = 5/2 Ω\nTotal current I = 10/(10/7 + 5/7) = 14/3 A\nCurrent through 1Ω resistance = I × 5/2 ÷ (1 + 5/2) = 5/7 × 14/3 = 10/3 ≈ 3.33 A",
    topic: "Star-Delta",
    exam: "MIZORAM PSC (PHED) 2019, Paper-I"
  },
  {
    id: 220,
    question: "If a capacitor is charged by a square wave current source, the voltage across the capacitor is:",
    options: ["A square wave", "triangular wave", "step function", "zero"],
    answer: 1,
    explanation: "When a capacitor is charged by a square wave current source:\nV_c(t) = (1/C) ∫i_c(t)dt\nThe integral of a square wave is a triangular wave (ramp-up and ramp-down segments).\nMathematically: integrating a constant (flat part of square wave) gives a linearly increasing/decreasing voltage — which forms the triangular waveform.\nThis is the fundamental relationship: integration of square wave = triangular wave.",
    topic: "Waveforms",
    exam: "MIZORAM PSC (PHED) 2019, Paper-I"
  },
  {
    id: 221,
    question: "What is the unit of electric current?",
    options: ["Farad", "Newton", "Ampere", "Coulomb"],
    answer: 2,
    explanation: "The SI unit of electric current is the Ampere (A), named after André-Marie Ampère. Definition: One ampere is defined as the flow of one coulomb of charge per second. 1 A = 1 C/s = 6.25 × 10¹⁸ electrons per second. Other units: Farad is unit of capacitance, Newton is unit of force, Coulomb is unit of electric charge.",
    topic: "Units",
    exam: "RSMSSB JEN (Diploma) 29.11.2020 / RRB JE 01.09.2019 / UPPCL JE 27.08.2018"
  },
  {
    id: 222,
    question: "What is the potential difference?",
    options: [
      "It is the difference of potential between two points in an electric circuit",
      "Difference of Current between the two points",
      "Difference of Resistance between two points",
      "Difference of Capacitance between two points"
    ],
    answer: 0,
    explanation: "Potential difference (also called voltage) is the difference in electric potential between two points in a circuit. It represents the work done per unit charge to move a positive charge from one point to another. Mathematically: V = W/Q (Joules/Coulomb = Volts). The external negative charge is described as having a negative potential and external positive charge has a positive potential.",
    topic: "Voltage",
    exam: "RSMSSB JEN (Diploma) 29.11.2020"
  },
  {
    id: 223,
    question: "Ideal voltage source should have-",
    options: [
      "Zero internal resistance",
      "Infinite internal resistance",
      "Large value of e.m.f.",
      "Medium internal resistance"
    ],
    answer: 0,
    explanation: "An ideal voltage source should have ZERO internal resistance. This means: It maintains a constant terminal voltage regardless of the current drawn. It can supply any amount of current without voltage drop. The entire source voltage appears across the load. In practice, real sources have small but non-zero internal resistance. A battery's internal resistance causes terminal voltage to drop under load.",
    topic: "Voltage Sources",
    exam: "RSMSSB JEN (Diploma) 29.11.2020 / PSPCL JE 2019 / SSC JE 26.09.2019 / Multiple exams"
  },
  {
    id: 224,
    question: "The current flowing through 1 Ω resistor connected between B and E in circuit shown (1A source, three 1Ω resistors in a bridge-like configuration) is:",
    options: ["1 Ampere", "0.5 Ampere", "10 Ampere", "0.25 Ampere"],
    answer: 1,
    explanation: "Using Current Division Rule:\nThe 1Ω between B-E is in parallel with another 1Ω path (C-D side).\nTotal current I = 1A\nI_BE = R_CD/(R_BE + R_CD) × I = 1/(1+1) × 1 = 0.5 A\nSo the current through the 1Ω resistor between B and E = 0.5 A.",
    topic: "Current Division",
    exam: "RSMSSB JEN (Diploma) 29.11.2020"
  },
  {
    id: 225,
    question: "In the circuit shown below, what will the power consumed in 2 Ω resistor connected across A-B? (6V source, 12V source, 2Ω resistors in a network)",
    options: ["16 Watt", "0 Watt", "8 Watt", "32 Watt"],
    answer: 1,
    explanation: "Applying Nodal analysis at point B:\ni₁ + i₂ + i₃ = 0\n(V-6)/2 + V/2 + (V-12)/2 = 0\n(V-6+V+V-12)/2 = 0\n3V - 18 = 0 → V = 6V\nThe potential difference at points A and B is the same (both = 6V), therefore current through A-B is ZERO.\nP = V × I = 6 × 0 = 0 W",
    topic: "Power",
    exam: "RSMSSB JEN (Diploma) 29.11.2020"
  },
  {
    id: 226,
    question: "What is the frequency of the waveform shown? (sinusoidal wave with 0.02 second time period visible)",
    options: ["50 Hz", "100 Hz", "25 Hz", "75 Hz"],
    answer: 2,
    explanation: "From the waveform: Time period T = 0.04 seconds (the wave completes one full cycle in 0.04s, with 0.02s being half-period visible).\nFrequency f = 1/T = 1/0.04 = 100/4 = 25 Hz\nNote: The waveform shows 0.02 sec for the visible portion — reading the complete period as 0.04s gives f = 25 Hz.",
    topic: "AC Waveforms",
    exam: "RSMSSB JEN (Diploma) 29.11.2020"
  },
  {
    id: 227,
    question: "A 100 watt 100V lamp is to be operated on 250V supply, the value of additional resistance to be connected in series will be:",
    options: ["250 ohms", "100 ohms", "150 ohms", "None of these"],
    answer: 2,
    explanation: "Given: P = 100W, V_lamp = 100V, V_supply = 250V\nStep 1: Find current: I = P/V = 100/100 = 1A\nStep 2: Apply KVL: V_supply = V_lamp + V_R\n250 = 100 + IR → IR = 150\nR = 150/1 = 150 Ω\nThe 150Ω resistor drops the extra 150V so the lamp gets only 100V.",
    topic: "Resistance",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 228,
    question: "Two bulbs of rating 60W, 250V and 100W, 250V are connected in series across a supply of 250V in a room. What will be the total power dissipation in the circuit?",
    options: ["37.5 W", "60.0 W", "100.0 W", "160.0 W"],
    answer: 0,
    explanation: "For bulbs in series, total power: P_T = (P₁ × P₂)/(P₁ + P₂) = (60 × 100)/(60 + 100) = 6000/160 = 37.5 W\nThis formula applies because the resistances add in series. R₁ = V²/P₁ = 250²/60 and R₂ = 250²/100. Total R = R₁+R₂, then P = V²/(R₁+R₂). The result is always less than the smaller rating when in series.",
    topic: "Power",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 229,
    question: "A 100 turn coil has an inductance of 6 mH. If the number of turns is increased to 200, all other quantities remaining the same, the inductance will be:",
    options: ["24 mH", "12 mH", "3 mH", "None of these"],
    answer: 0,
    explanation: "Inductance L = μ₀μᵣN²A/ℓ, so L ∝ N²\nGiven: N₁ = 100, L₁ = 6mH, N₂ = 200\nL₁/L₂ = N₁²/N₂²\n6/L₂ = (100)²/(200)² = 10000/40000 = 1/4\nL₂ = 6 × 4 = 24 mH\nInductance increases as the square of the number of turns.",
    topic: "Inductance",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 230,
    question: "RMS value of sinusoidal current is given by:",
    options: [
      "√2 times maximum value of current",
      "1/√2 times maximum value of current",
      "√3 times maximum value of current",
      "1.11 times maximum value of current"
    ],
    answer: 1,
    explanation: "For a sinusoidal current i = Im sinωt:\nRMS value I_rms = Im/√2 = 0.707 × Im\nThis means RMS = (1/√2) × peak value.\nRMS represents the effective value — the equivalent DC value that produces the same heating effect. For example, 230V AC (RMS) has a peak of 230√2 ≈ 325V.",
    topic: "AC Circuits",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 231,
    question: "The power drawn from the source in the circuit (100V source, Z = 40 - j30): ",
    options: ["Zero", "160 watts", "240 watts", "250 watts"],
    answer: 1,
    explanation: "Given: V = 100V, Z = 40 - j30 Ω\n|Z| = √(40² + 30²) = √(1600 + 900) = √2500 = 50 Ω\nI = V/|Z| = 100/50 = 2A\nPower P = I²R = (2)² × 40 = 4 × 40 = 160 W\nNote: Only the real part (resistance) consumes power; the reactive part (inductance/capacitance) stores and returns energy.",
    topic: "AC Power",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 232,
    question: "The ratio RMS Value / Average Value is the:",
    options: ["Peak value", "Peak factor", "Mean value", "Form factor"],
    answer: 3,
    explanation: "Form Factor = RMS Value / Average Value\nFor a sinusoidal waveform:\nForm Factor = (Im/√2) / (2Im/π) = π/(2√2) ≈ 1.11\nPeak Factor (Crest Factor) = Peak Value / RMS Value = Im / (Im/√2) = √2 ≈ 1.414\nForm factor is important in transformer design and AC measurements.",
    topic: "AC Waveforms",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 233,
    question: "The equivalent resistance of the circuit (100Ω, 200Ω, 200Ω in series with 800Ω, 800Ω, 400Ω combinations):",
    options: ["200 Ω", "400 Ω", "600 Ω", "1600 Ω"],
    answer: 2,
    explanation: "Step-by-step reduction:\n• Top branch: 200Ω + 400Ω + 200Ω = 800Ω\n• R₁ (800Ω) ∥ 800Ω = 800×800/1600 = 400Ω\n• Bottom: 200Ω + 200Ω + 400Ω = 800Ω  \n• 800Ω ∥ 800Ω = 400Ω\n• Series: 100Ω + 400Ω + 100Ω = 600Ω\nFinal: R_eq = 600 Ω",
    topic: "Resistance Networks",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 234,
    question: "In the circuit shown (Device A: +10V, I=10A; Device B: -10V, I=10A entering positive terminal):",
    options: [
      "Device A is delivering 100W while device B is absorbing 100W",
      "Both Devices A and B are delivering 100W each",
      "Both Devices A and B are absorbing 100W each",
      "Device A is absorbing 100W while device B is delivering 100W"
    ],
    answer: 0,
    explanation: "Power conventions:\n• If current LEAVES the positive terminal → element DELIVERS power\n• If current ENTERS the positive terminal → element ABSORBS power\n\nDevice A: Current leaves the +10V terminal → DELIVERING power\nP_A = VI = 10 × 10 = 100 W (delivered)\n\nDevice B: Current enters the positive terminal of -10V (meaning current leaves negative terminal at +10V side) → check: with -10V and 10A entering positive terminal → ABSORBING\nP_B = |VI| = 10 × 10 = 100 W (absorbed)",
    topic: "Power",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 235,
    question: "If 10 V is applied across a capacitor of 2 farads, then the energy stored in the capacitor will be:",
    options: ["10 J", "20 J", "100 J", "200 J"],
    answer: 2,
    explanation: "Given: V = 10V, C = 2 Farad\nEnergy stored in capacitor:\nE = ½CV² = ½ × 2 × (10)² = ½ × 2 × 100 = 100 J\nThis energy is stored in the electric field between the capacitor plates. When discharged, this energy is released back to the circuit.",
    topic: "Capacitors",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 236,
    question: "The value of current I in the following figure: (4A up, 3A left, 2A right, 8A down at a node)",
    options: ["3 A", "4 A", "5 A", "6 A"],
    answer: 0,
    explanation: "Applying KCL (Kirchhoff's Current Law): 'Algebraic sum of all currents meeting at a point is zero.'\nAssigning signs: currents entering (+), leaving (-)\n4A + I + 3A - 8A - 2A = 0\n4 + I + 3 - 8 - 2 = 0\nI + 7 - 10 = 0 → 4A + I + 3A = 8A + 2A\nI = 10A - 7A = 3A",
    topic: "KCL",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 237,
    question: "If ten resistances of 10 ohms each are connected in parallel, the total resistance will be:",
    options: ["100 Ω", "Less than 100 Ω", "1 Ω", "None of these"],
    answer: 2,
    explanation: "For n equal resistors R connected in parallel: R_eq = R/n\nGiven: n = 10, each R = 10Ω\nR_eq = 10/10 = 1 Ω\nAlternatively: 1/R_eq = 1/10 + 1/10 + ... (10 times) = 10/10 = 1 → R_eq = 1Ω\nGeneral rule: Parallel combination of n equal resistors = R/n. Always less than the smallest individual resistance.",
    topic: "Parallel Resistance",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 238,
    question: "Three resistances of 30 ohm, 15 ohm and 5 ohm are connected in parallel, their combine resistance will be:",
    options: ["Greater than 30 ohm", "Between 30 ohm to 15 ohm", "Between 15 ohm to 5 ohm", "Less than 5 ohm"],
    answer: 3,
    explanation: "1/R_eq = 1/30 + 1/15 + 1/5 = 1/30 + 2/30 + 6/30 = 9/30\nR_eq = 30/9 ≈ 3.33 Ω\nThis is less than 5 ohm (the smallest resistor).\nKey principle: In parallel combination, equivalent resistance is ALWAYS less than the smallest individual resistance. This is because parallel paths provide more routes for current to flow.",
    topic: "Parallel Resistance",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 239,
    question: "Which of the following is used to provide inductance in a circuit:",
    options: ["Resistance", "Choke", "Capacitor", "Heater"],
    answer: 1,
    explanation: "A Choke (also called an inductor or choke coil) is used to provide inductance in a circuit. It is essentially a coil of wire wound around a core. Main purpose: To block high frequencies and pass low frequencies (used in filter circuits). It stores energy in its magnetic field when current flows. Applications: Power supplies, RF circuits, audio crossovers, fluorescent lamp ballasts.",
    topic: "Inductors",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 240,
    question: "To calculate the power factor which of the following is odd one out:",
    options: ["True power/apparent power", "P/VI", "R/Z", "V/I"],
    answer: 3,
    explanation: "Power Factor = cos φ = True Power / Apparent Power = P / VI = R / Z\nPower triangle: P (active, watts), Q (reactive, VAR), S (apparent, VA)\ncos φ = P/S = P/VI = R/Z\nV/I = impedance Z (not power factor). So V/I is the odd one — it gives impedance, not power factor.\nPower factor ranges from 0 to 1; unity PF means pure resistive load.",
    topic: "Power Factor",
    exam: "RSMSSB JEN (Diploma) 29.11.2020 / NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 241,
    question: "What is an electric current?",
    options: [
      "The power that moves the electrons",
      "The random movement of electrons in a conductor",
      "The pressure difference between two poles",
      "The movement of free electrons predominantly in one direction"
    ],
    answer: 3,
    explanation: "Electric current is the movement of free electrons predominantly in one direction. Mathematically: i = q/t (charge per unit time) in Amperes. In metallic conductors: free electrons drift from negative to positive terminal (conventional current flows positive to negative). Key distinction: 'random thermal motion' of electrons ≠ electric current. Current requires NET directional flow driven by an electric field (voltage).",
    topic: "Electric Current",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 242,
    question: "In electrical energy one Horse Power =",
    options: ["436 W", "746 W", "647 W", "1000 W"],
    answer: 1,
    explanation: "1 Horse Power (HP) = 746 Watts\nThis is the standard conversion between mechanical horsepower and electrical watts. In some countries (metric horsepower), 1 PS = 735.5 W, but in electrical engineering, 1 HP = 746 W is the standard. Applications: Motor ratings, engine power, pump specifications. Example: A 5HP motor = 5 × 746 = 3730 W ≈ 3.73 kW.",
    topic: "Units",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 243,
    question: "A 1 Henry inductance carrying a current of 3A will store energy of:",
    options: ["3 watt", "9 watt-sec", "3 joules", "None of these (4.5 J)"],
    answer: 3,
    explanation: "Given: L = 1H, I = 3A\nEnergy stored in inductor: E = ½LI² = ½ × 1 × (3)² = ½ × 9 = 4.5 J\n1 J/sec = 1 watt, 1J = 1 watt-sec\nSo E = 4.5 J = 4.5 watt-sec\nNone of the first three options (3W, 9W-s, 3J) is correct — the answer is 4.5 J, which corresponds to 'None of these'.",
    topic: "Inductors",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 244,
    question: "The r.m.s value of an a.c. signal is 10V. Its peak value will be:",
    options: ["6.37V", "14.14V", "141V", "None of these"],
    answer: 1,
    explanation: "Given: V_rms = 10V\nPeak value V_m = V_rms × √2 = 10 × √2 = 10 × 1.414 = 14.14V\nThe relationship: V_rms = V_m/√2 (for sinusoidal AC)\nSo V_m = V_rms × √2 = 14.14V\nThis is the peak (maximum) value of the AC voltage wave.",
    topic: "AC Waveforms",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 245,
    question: "One mega ohm equals to:",
    options: ["10⁶ Ω", "10⁻⁶ Ω", "10³ Ω", "10⁸ Ω"],
    answer: 0,
    explanation: "1 Mega ohm = 1 MΩ = 10⁶ Ω (one million ohms)\nPrefix conversions: Kilo (k) = 10³, Mega (M) = 10⁶, Giga (G) = 10⁹\nMilli (m) = 10⁻³, Micro (µ) = 10⁻⁶, Nano (n) = 10⁻⁹\nExample: Insulation resistance of electrical cables is measured in MΩ using a megger (insulation resistance tester).",
    topic: "Units",
    exam: "NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 246,
    question: "The net electromotive force around a closed circuit loop is equal to the sum of potential drops around the loop. This law is called as:",
    options: ["Kirchhoff's second law", "Lenz's law", "Kirchhoff's first law", "Fleming's left hand rule"],
    answer: 0,
    explanation: "This is Kirchhoff's Voltage Law (KVL) — also called Kirchhoff's Second Law. Statement: 'The algebraic sum of all EMFs and voltage drops in any closed loop of a network is zero.' ΣE + Σ(iR) = 0. It is based on the principle of conservation of energy. KVL vs KCL: KVL → voltages in a loop; KCL → currents at a node.",
    topic: "Kirchhoff's Laws",
    exam: "PSPCL JE 2019, Shift-II"
  },
  {
    id: 247,
    question: "Two resistors of 40 Ω and 40 Ω are connected in series. A wire of negligible resistance is connected in shunt across the combination. The effective resistance will be:",
    options: ["20 Ω", "infinity", "zero", "80 Ω"],
    answer: 2,
    explanation: "When a wire of negligible (zero) resistance is connected in shunt (parallel) across the series combination of 40Ω + 40Ω = 80Ω:\nThe zero-resistance wire short-circuits the entire combination.\nR_eq = 80Ω ∥ 0Ω = (80 × 0)/(80 + 0) = 0/80 = 0 Ω\nThe circuit behaves as a short circuit. All current flows through the zero-resistance wire, and no current flows through the resistors.",
    topic: "Resistance Networks",
    exam: "PSPCL JE 2019, Shift-II"
  },
  {
    id: 248,
    question: "An electric bulb rated 220 volts is connected to 220 volts, 5Hz source, then the bulb-",
    options: ["Does not glow", "Glows intermittently", "Fuses", "Glows continuously"],
    answer: 1,
    explanation: "At 5 Hz AC supply: The bulb voltage alternates at 5 cycles per second. The filament heats and cools 10 times per second (twice per cycle). At 5 Hz, the human eye CAN perceive the flickering (threshold ≈ 50 Hz). The bulb glows intermittently — it turns on during positive and negative half cycles (10 times/second) and appears to flicker visibly. At 50 Hz, this flickering is too fast to see.",
    topic: "AC Circuits",
    exam: "PSPCL JE 2018"
  },
  {
    id: 249,
    question: "Current in the circuit is wattless, if-",
    options: [
      "Inductance in the circuit is zero",
      "Resistance in the circuit is zero",
      "Current is alternating",
      "Resistance and inductance both are zero"
    ],
    answer: 1,
    explanation: "Wattless current (reactive current) flows when the circuit has zero resistance. P = I²R = 0 when R = 0. In a purely inductive or purely capacitive circuit (R = 0), the current is 90° out of phase with the voltage, so average power = VI cos90° = 0. The current is 'wattless' — it flows but does no real work. Unit of reactive power is VAR (Volt-Ampere Reactive).",
    topic: "AC Power",
    exam: "PSPCL JE 2018"
  },
  {
    id: 250,
    question: "A current of 3A is flowing in a coil, the power dissipated by it is 108 watts. If 120V, 50 Hz A.C. voltage is applied to the combination R and this coil in series, then the value of R will be-",
    options: ["6 Ω", "12 Ω", "24 Ω", "36 Ω"],
    answer: 1,
    explanation: "Given: I_rms = 3A, P = 108W\nCoil resistance: P = I²R_coil → R_coil = P/I² = 108/9 = 12Ω\nThis is the resistance of the coil itself.\nThe question asks for R: If the supply is 120V, 50Hz and current is 3A through series combination:\nTotal impedance Z = V/I = 120/3 = 40Ω\nR = 12Ω (the coil resistance already satisfies P = I²R = 9×12 = 108W)\nThe value of R (coil's resistance) = 12 Ω",
    topic: "AC Circuits",
    exam: "PSPCL JE 2018"
  },
  {
    id: 251,
    question: "Alternating potential-",
    options: [
      "Is independent of time",
      "Varies inversely with time",
      "Varies directly with time",
      "Varies sinusoidally with time"
    ],
    answer: 3,
    explanation: "Alternating potential (AC voltage) varies sinusoidally with time. The general expression: v(t) = Vm sin(ωt) where Vm = peak voltage, ω = angular frequency = 2πf, t = time. This sinusoidal variation means it changes continuously, alternating between positive and negative values. It is NOT constant (not independent of time), does NOT vary linearly (directly or inversely) with time.",
    topic: "AC Circuits",
    exam: "PSPCL JE 2018"
  },
  {
    id: 252,
    question: "The peak value of 220 volts of A.C. mains is-",
    options: ["155.6 volts", "220.0 volts", "311.0 volts", "440 volts"],
    answer: 2,
    explanation: "Given: V_rms = 220V (standard AC mains)\nPeak value V_m = V_rms × √2 = 220 × √2 = 220 × 1.414 = 311.12V ≈ 311V\nSo the peak of 220V AC mains = 311V (approximately).\nThis means the AC voltage swings from -311V to +311V, but its RMS (effective heating) value is 220V. The 220V rating on appliances refers to RMS.",
    topic: "AC Waveforms",
    exam: "PSPCL JE 2018"
  },
  {
    id: 253,
    question: "The average power dissipated in a pure inductor is-",
    options: ["½Li²", "¼Li²", "2Li²", "Zero"],
    answer: 3,
    explanation: "For a pure inductor, R = 0. The average power dissipated = ZERO. In a pure inductor, voltage and current are 90° out of phase (current lags voltage by 90°). Average power P = V_rms × I_rms × cos(90°) = VI × 0 = 0. A pure inductor only stores energy in its magnetic field during one quarter cycle and returns it during the next — no net energy is consumed. Only resistance dissipates power (heat).",
    topic: "AC Power",
    exam: "PSTCL JE 02.08.2021 / PSPCL JE 2018"
  },
  {
    id: 254,
    question: "Determine the value of equivalent resistance across nodes A and B (circuit with capacitor, inductor, and resistors in DC).",
    options: ["3 Ω", "1.5 Ω", "2.5 Ω", "4.5 Ω"],
    answer: 0,
    explanation: "For DC analysis: Capacitor acts as OPEN CIRCUIT (blocks DC), Inductor acts as SHORT CIRCUIT (zero resistance for DC).\nAfter simplification with these DC conditions, the circuit reduces to a Wheatstone bridge configuration.\nThe bridge is balanced: R_AB = (3+3) ∥ (3+3) = 6∥6 = 6×6/(6+6) = 36/12 = 3Ω",
    topic: "DC Circuits",
    exam: "PGCIL Diploma Trainee 27.10.2018"
  },
  {
    id: 255,
    question: "Find the current through I₁, I₂, I₃ (20V source, 2Ω series, then 4Ω and 2Ω in parallel)",
    options: ["6A, 2A, 4A", "6A, 2A, -4A", "4A, 6A, 4A", "6A, -2A, 4A"],
    answer: 0,
    explanation: "R_eq = 2 + (4∥2) = 2 + (4×2)/(4+2) = 2 + 8/6 = 2 + 4/3 = 10/3 Ω\nI₁ = V/R_eq = 20 ÷ (10/3) = 20 × 3/10 = 6A\nCurrent divider for 4Ω and 2Ω parallel:\nI₂ = 6 × 2/(4+2) = 6 × 2/6 = 2A (through 4Ω)\nI₃ = 6 × 4/(4+2) = 6 × 4/6 = 4A (through 2Ω)\nAnswer: I₁ = 6A, I₂ = 2A, I₃ = 4A",
    topic: "Circuit Analysis",
    exam: "PGCIL Diploma Trainee 27.10.2018"
  },
  {
    id: 256,
    question: "Find the currents I₁, I₂, I₃ using mesh analysis (20V source, 2Ω, 1Ω, 2Ω, 1Ω, 4Ω)",
    options: ["5/9A, 20/9A, 10/9A", "55/9A, 10/9A, 20/9A", "55/9A, 20/9A, 5/9A", "20/9A, 10/9A, 55/9A"],
    answer: 2,
    explanation: "Applying KVL on meshes:\nMesh 1: 20 - 2I₁ - 2I₁ + 2I₂ = 0 → 4I₁ - 2I₂ = 20 ...(1)\nMesh 2: (2+2+1+1)I₂ - 2I₁ - 2I₃ = 0 → 6I₂ - 2I₁ - 2I₃ = 0 ...(2)\nMesh 3: (2+2+4)I₃ - 2I₂ = 0 → 8I₃ = 2I₂ → I₃ = I₂/4 ...(3)\nSubstituting (3) into (2): 11I₂ - 4I₁ = 0 ...(4)\nFrom (1) and (4): I₁ = 55/9 A, I₂ = 20/9 A, I₃ = 5/9 A",
    topic: "Mesh Analysis",
    exam: "PGCIL Diploma Trainee 27.10.2018"
  },
  {
    id: 257,
    question: "Find the current I (circuit with 2A current source, 4Ω, 2Ω, 3Ω, 1V source, 10V source)",
    options: ["5 V", "2 V", "0.8 A", "-0.8 A"],
    answer: 3,
    explanation: "Applying KVL in loop (2):\n2I + 10 - 3(2-1) = 0\n(3+2)I + 10 - 3×2 = 0\n5I + 10 - 6 = 0\n5I = -4\nI = -4/5 = -0.8 A\nThe negative sign indicates current flows opposite to the assumed direction.",
    topic: "KVL",
    exam: "PGCIL Diploma Trainee 27.10.2018"
  },
  {
    id: 258,
    question: "The dimensions of power are:",
    options: ["[MLT⁻³]", "[ML²T⁻³]", "[M²L³T⁻³]", "[ML²T⁻¹]"],
    answer: 1,
    explanation: "P = Work/Time = Force × distance / time\nDimension of Force = [MLT⁻²]\nDimension of distance = [L]\nDimension of time = [T]\nP = [MLT⁻²][L] / [T] = [ML²T⁻²] / [T] = [ML²T⁻³]\nAlternatively: P = VI where V = [ML²T⁻³A⁻¹] and I = [A], giving P = [ML²T⁻³].",
    topic: "Dimensions",
    exam: "PGCIL Diploma Trainee 27.10.2018"
  },
  {
    id: 259,
    question: "Find the voltage across V_ab (12V source, 2Ω, 1Ω, 2Ω, 3Ω in a network)",
    options: ["3.6 V", "4.8 V", "1.5 V", "-1.5 V"],
    answer: 0,
    explanation: "Applying KCL at node voltage V:\n(V-12)/2 + V/2 + V/4 = 0\nMultiplying by 4: 2(V-12) + 2V + V = 0\n2V - 24 + 2V + V = 0 → 5V = 24 → V = 24/5 = 4.8V\nV_ab = voltage across 3Ω portion:\nV_ab = [3/(3+1)] × V = (3/4) × 4.8 = 3.6V",
    topic: "Nodal Analysis",
    exam: "PGCIL Diploma Trainee 27.10.2018"
  },
  {
    id: 260,
    question: "Which one of the following is the dimensional formula resistivity?",
    options: ["ML³T⁻¹A⁻²", "ML³T²A²", "ML³T⁻²A⁻²", "ML⁻³T³A⁻²"],
    answer: 0,
    explanation: "Resistivity ρ = RA/ℓ\nR = V/I = W/QI = ML²T⁻²/(ATA) = ML²T⁻³A⁻²\nρ = R × A/ℓ = [ML²T⁻³A⁻²] × [L²] / [L] = [ML³T⁻³A⁻²]\nDimension of resistivity = [ML³T⁻³A⁻²]\nNote: ρ is measured in Ω·m (ohm-meter) in SI units.",
    topic: "Dimensions",
    exam: "SSC JE 24.01.2018, Shift-I"
  },
  {
    id: 261,
    question: "Which of the following statement is TRUE about resistivity?",
    options: [
      "The resistivity of a conductor does not depend on alloying of conductor material",
      "The resistivity of a conductor does not depend on the temperature",
      "The resistivity of a conductor does not depend on the length of the conductor",
      "The resistivity of a conductor does not depend on the mechanical stress on the conductor"
    ],
    answer: 2,
    explanation: "Resistivity (ρ) is an intrinsic property of the material itself.\nResistivity DOES depend on: material composition, temperature (ρ_t = ρ_0(1 + αt)), alloying (adding impurities increases resistivity), mechanical stress (cold working changes crystal structure).\nResistivity does NOT depend on: the length of the conductor (length affects resistance R = ρL/A, but not resistivity ρ itself), cross-sectional area, or shape of the conductor.",
    topic: "Resistivity",
    exam: "SSC JE 24.01.2018, Shift-I"
  },
  {
    id: 262,
    question: "Which of the following is the correct expression for the capacitance?",
    options: ["C = Q/V", "C = Q - V", "C = QV", "C = V/Q"],
    answer: 0,
    explanation: "Capacitance C = Q/V\nWhere: Q = charge stored (Coulombs), V = voltage across capacitor (Volts)\nUnit: C = Coulomb/Volt = Farad (F)\nPhysical meaning: Capacitance is the ability of a device to store electric charge per unit voltage. A higher capacitance means more charge can be stored for the same voltage.",
    topic: "Capacitance",
    exam: "SSC JE 24.01.2018, Shift-I"
  },
  {
    id: 263,
    question: "In parallel combination of capacitances, the equivalent capacitance is ...........",
    options: [
      "equal to the largest capacitance of the combination",
      "lower than the largest capacitance of the combination",
      "lower than the smallest capacitance of the combination",
      "greater than the largest capacitance of the combination"
    ],
    answer: 3,
    explanation: "In parallel combination: C_eq = C₁ + C₂ + C₃ + ... + Cₙ\nThis is always GREATER than the largest individual capacitance.\nContrast with series: 1/C_eq = 1/C₁ + 1/C₂ + ... → C_eq is LESS than the smallest.\nPhysical reason: Parallel capacitors share the same voltage but have larger combined plate area, increasing total charge storage capacity.",
    topic: "Capacitance",
    exam: "SSC JE 24.01.2018 / SSC JE 27.01.2018 / SSC JE 02.03.2017 / SSC JE 2015"
  },
  {
    id: 271,
    question: "What will be the value of current I₄ (in A) for the diagram given? (Multiple current branches: I₇=I₀+I₈, I₃=I₁+I₂, various currents shown)",
    options: ["1", "-1", "2", "-2"],
    answer: 0,
    explanation: "Applying KCL (incoming = outgoing) at each node:\nI₇ = I₀ + I₈ = 1 + 1 = 2A\nI₃ = I₁ + I₂ = 1 + 3 = 4A\nAt main node: I₃ + I₄ = I₇ + I₅ + I₆\n4 + I₄ = 2 + 2 + 1 = 5\nI₄ = 5 - 4 = 1A",
    topic: "KCL",
    exam: "SSC JE 24.01.2018 Shift-I / SSC JE 2015"
  },
  {
    id: 272,
    question: "What will be the value of current (in A) drawn from the voltage source for the circuit (60V, 10Ω, 10Ω, 20Ω, 20Ω, 40Ω, 20Ω, 30Ω)?",
    options: ["6.32", "4.22", "2.71", "1.72"],
    answer: 2,
    explanation: "Step-by-step reduction:\nR₁∥R₂: 10∥10 = 5Ω, R₃∥R₄: 20∥20 = 10Ω\nR₅ (30Ω) and 10Ω in parallel = 30×40/(30+40) = 1200/70 = 17.14Ω\nAdd 5Ω series: R_eq = 17.14 + 5 = 22.14Ω\nI = V/R_eq = 60/22.14 = 2.71A",
    topic: "Circuit Analysis",
    exam: "SSC JE 24.01.2018, Shift-I"
  },
  {
    id: 273,
    question: "Determine the power dissipated (in W) by the 6 ohms resistor in the circuit (2A source, 3Ω, 6Ω, 1Ω, 6A source)",
    options: ["0", "6", "36", "120"],
    answer: 0,
    explanation: "Applying Nodal analysis:\nAt V₁: V₁/3 + (V₁-V₂)/6 = 2 → 3V₁ - V₂ = 12 ...(i)\nAt V₂: V₂/1 + (V₂-V₁)/6 = 6 → 7V₂ - V₁ = 36 ...(ii)\nSolving: V₁ = 6V, V₂ = 6V\nCurrent through 6Ω: i = (V₁-V₂)/6 = (6-6)/6 = 0A\nP = i²×6 = 0 × 6 = 0 W",
    topic: "Nodal Analysis",
    exam: "SSC JE 24.01.2018, Shift-I / SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 274,
    question: "What will be the peak value of voltage (in V) of a voltage waveform, when the root mean square value of the voltage is 30 V?",
    options: ["42.42", "41.14", "40.24", "40.62"],
    answer: 0,
    explanation: "Given: V_rms = 30V\nFor sinusoidal waveform: V_peak = V_rms × √2\nV_max = 30 × √2 = 30 × 1.4142 = 42.426 ≈ 42.42V\nThe peak-to-peak voltage would be 2 × 42.42 = 84.84V.",
    topic: "AC Waveforms",
    exam: "SSC JE 24.01.2018, Shift-I"
  },
  {
    id: 275,
    question: "What will be the frequency (in Hz) of a sinusoidal wave, when the time-period of the wave is 2ms?",
    options: ["400", "500", "600", "800"],
    answer: 1,
    explanation: "Given: Time period T = 2ms = 2×10⁻³ s\nFrequency f = 1/T = 1/(2×10⁻³) = 1000/2 = 500 Hz\nRelationship: f = 1/T where f is in Hz and T is in seconds.\nNote: Higher frequency → shorter time period. 50Hz (mains) has T = 20ms.",
    topic: "AC Waveforms",
    exam: "SSC JE 24.01.2018, Shift-I / SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 276,
    question: "What will be the peak value of alternating voltage (in V) when the average value of the voltage is 140 V?",
    options: ["216", "214", "220", "240"],
    answer: 2,
    explanation: "Given: V_avg = 140V (average value)\nFor sinusoidal wave: V_avg = (2/π) × V_peak = 0.637 × V_peak\nV_peak = V_avg / 0.637 = 140 / 0.637 = 219.78 ≈ 220V\nNote: Average value is taken over a half cycle for sinusoidal AC (full cycle average = 0).",
    topic: "AC Waveforms",
    exam: "SSC JE 24.01.2018, Shift-I / SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 277,
    question: "Determine the capacitive reactance (in Ohms) of a circuit, if the supplied frequency is 50 Hz and the capacitance of the circuit is 60 micro-Farad.",
    options: ["52.4", "53.1", "54.4", "55.5"],
    answer: 1,
    explanation: "Given: f = 50Hz, C = 60µF = 60×10⁻⁶F\nCapacitive reactance: X_C = 1/(2πfC)\nX_C = 1/(2 × 3.14 × 50 × 60×10⁻⁶)\nX_C = 1/(314 × 60×10⁻⁶)\nX_C = 10⁶/(314 × 60) = 1000000/18840 = 53.07Ω ≈ 53.1Ω",
    topic: "Capacitive Reactance",
    exam: "SSC JE 24.01.2018, Shift-I"
  },
  {
    id: 278,
    question: "Determine the value of reactive power (in VAR) of a circuit having power factor of 0.6 when the apparent power of the circuit is 120 VA.",
    options: ["75", "78", "84", "96"],
    answer: 3,
    explanation: "Given: cos φ = 0.6, S = 120 VA\nActive power: P = S × cos φ = 120 × 0.6 = 72W\nReactive power: Q = √(S² - P²) = √(120² - 72²)\nQ = √(14400 - 5184) = √9216 = 96 VAR",
    topic: "AC Power",
    exam: "SSC JE 24.01.2018, Shift-I / SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 279,
    question: "Find the net capacitance of the combination in which ten capacitors of 10 µF are connected in parallel.",
    options: ["1µF", "0.1µF", "50µF", "100µF"],
    answer: 3,
    explanation: "For capacitors in parallel: C_eq = C₁ + C₂ + ... + Cₙ\nC_eq = 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 = 10 × 10 = 100µF\nParallel capacitors simply add up. (Contrast: series capacitors use 1/C_eq = sum of 1/C_i)",
    topic: "Capacitance",
    exam: "SSC JE 26.09.2019, Shift-I / SSC JE 23.01.2018, Shift-I / SSC JE 2010"
  },
  {
    id: 280,
    question: "A coil is wound with 50 turns and a current 8 A produces a flux of 200 µWb. Calculate the inductance of the coil.",
    options: ["1.25 mH", "0.125 mH", "0.25 mH", "2.5 mH"],
    answer: 0,
    explanation: "Given: N = 50 turns, I = 8A, φ = 200µWb = 200×10⁻⁶ Wb\nInductance L = Nφ/I = (50 × 200×10⁻⁶)/8\nL = 10000×10⁻⁶/8 = 10⁻²/8×10⁻¹... wait:\nL = (50 × 200×10⁻⁶)/8 = (10000×10⁻⁶)/8 = 1.25×10⁻³ H = 1.25 mH",
    topic: "Inductance",
    exam: "SSC JE 26.09.2019, Shift-I"
  },
  {
    id: 281,
    question: "The average value of a sinusoidal wave is-",
    options: [
      "0.637 × maximum value",
      "0.5 × maximum value",
      "√2 × maximum value",
      "2× maximum value"
    ],
    answer: 0,
    explanation: "For a sinusoidal wave v = Vm sinθ:\nAverage value (over positive half cycle) = (2/π) × Vm = 0.6366 × Vm ≈ 0.637 × Vm\nI_avg = 2Im/π = 0.637Im\nFull cycle average = 0 (for pure sine wave)\nHalf cycle average = 0.637 × peak value\nThis is used to calculate form factor and average power.",
    topic: "AC Waveforms",
    exam: "SSC JE 26.09.2019, Shift-I / SSC JE 23.01.2018, Shift-I"
  },
  {
    id: 282,
    question: "When only current source is active in the circuit, find the current through the 10 Ω resistor (5Ω, 2A current source, R₃=10Ω, voltage source deactivated)",
    options: ["1.33A", "1.66A", "0A", "0.66A"],
    answer: 3,
    explanation: "When only current source is active, voltage source is deactivated (replaced by short circuit, R_e = 0).\nThe 5Ω is short-circuited. Circuit shows 2A through parallel combination of SC and 10Ω.\nUsing current divider: I_10Ω = 2A × 5/(5+10) = 2 × 5/15 = 10/15 = 0.66A",
    topic: "Superposition",
    exam: "SSC JE 26.09.2019, Shift-I / SSC JE 2014, Shift-I"
  },
  {
    id: 283,
    question: "An electric heater is connected across 230V and it draws a current of 2A. Then the resistance offered by the heater is?",
    options: ["11.5 ohm", "230 ohm", "23 ohm", "115 ohm"],
    answer: 3,
    explanation: "Given: V = 230V, I = 2A\nApplying Ohm's Law: R = V/I = 230/2 = 115 Ω\nPower consumed: P = VI = 230 × 2 = 460W\nThis is a purely resistive heating element where all electrical energy converts to heat.",
    topic: "Ohm's Law",
    exam: "SSC JE 26.09.2019, Shift-I"
  },
  {
    id: 284,
    question: "_____ is the measuring unit of inductive susceptance.",
    options: ["Mho", "Tesla", "Henry", "Weber"],
    answer: 0,
    explanation: "Inductive susceptance B_L = 1/X_L = 1/(ωL) and its unit is Mho (also written as Siemens, S or ℧).\nMho = 1/Ohm = Ω⁻¹ = Siemens\nSusceptance is the imaginary part of admittance. Inductive susceptance is negative, capacitive susceptance is positive.\nMho is also the measuring unit of capacitive susceptance.",
    topic: "AC Circuits",
    exam: "SSC JE 26.09.2019, Shift-I"
  },
  {
    id: 285,
    question: "Two bulbs of rating 230V, 60W and 230V, 100W are connected in parallel across supply mains. Identify the correct statement.",
    options: [
      "The 100W bulb will glow brighter",
      "Neither bulb will glow",
      "Both will glow equally bright",
      "The 60W bulb will glow brighter"
    ],
    answer: 0,
    explanation: "In PARALLEL connection: Both bulbs receive the same voltage (230V = their rated voltage). Power consumed by each = rated power (60W and 100W respectively). The 100W bulb has lower resistance (R = V²/P = 230²/100 = 529Ω) vs 60W (230²/60 = 882Ω). Lower resistance → more current → more power → BRIGHTER. So the 100W bulb glows brighter. (Note: In SERIES, the 60W would be brighter — opposite behavior!)",
    topic: "Parallel Circuits",
    exam: "UKSSSC JE 10.01.2021 / SSC JE 26.09.2019, Shift-I"
  },
  {
    id: 286,
    question: "With the current direction marked in the circuit (current from V₁ to V₂ direction shown), the net voltage applied is-",
    options: ["V₁", "V₂", "V₂-V₁", "-(V₂-V₁)"],
    answer: 3,
    explanation: "The direction of current in the circuit is from V₁ to V₂, meaning V₁ is at higher potential than V₂.\nNet voltage applied = V₁ - V₂ = -(V₂ - V₁)\nThis can also be written as: Net EMF = -(V₂ - V₁) = V₁ - V₂\nThe negative sign indicates the direction convention chosen.",
    topic: "Voltage",
    exam: "SSC JE 26.09.2019, Shift-I"
  },
  {
    id: 287,
    question: "Three lamps are connected in series across a 120 V supply and take a current of 1.5A. If the resistance of two of the lamps is 30 Ω, what is the resistance of the third lamp?",
    options: ["40 Ω", "20 Ω", "30 Ω", "10 Ω"],
    answer: 1,
    explanation: "Given: V = 120V, I = 1.5A, R₁ = R₂ = 30Ω\nTotal resistance: R_eq = V/I = 120/1.5 = 80Ω\nSeries: R_eq = R₁ + R₂ + R₃\n80 = 30 + 30 + R₃\nR₃ = 80 - 60 = 20Ω",
    topic: "Series Circuits",
    exam: "SSC JE 26.09.2019, Shift-I"
  },
  {
    id: 288,
    question: "Which of the following material does not allow the current to flow in it?",
    options: ["Conductor", "Insulator", "Semiconductor", "Superconductor"],
    answer: 1,
    explanation: "An INSULATOR does not allow electric current to flow through it. In insulators, there is a large energy gap between valence and conduction bands, so very few free electrons are available for conduction. Examples: rubber, glass, plastic, air, mica, ceramic. Conductors allow easy current flow (copper, silver, gold). Semiconductors allow partial flow (silicon, germanium). Superconductors allow current with zero resistance.",
    topic: "Materials",
    exam: "SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 289,
    question: "How much power (in W) will be dissipated by a 5 Ohm resistor in which the value of current is 2 A?",
    options: ["10", "30", "20", "40"],
    answer: 2,
    explanation: "Given: R = 5Ω, I = 2A\nPower P = I²R = (2)² × 5 = 4 × 5 = 20W\nAlternatively: V = IR = 2×5 = 10V, then P = VI = 10×2 = 20W\nOr: P = V²/R = 100/5 = 20W. All three formulas give the same result.",
    topic: "Power",
    exam: "SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 290,
    question: "Which property of an electrical conductor opposes a change in the current?",
    options: ["Resistance", "Capacitance", "Conductance", "Inductance"],
    answer: 3,
    explanation: "INDUCTANCE is the property that opposes a change in current. The induced EMF in an inductor: e = -L(di/dt). This back-EMF opposes any change (increase or decrease) in current through the inductor (Lenz's Law). This is why inductors resist sudden current changes. Analogously, capacitance opposes sudden voltage changes. Resistance simply limits current but doesn't oppose changes per se.",
    topic: "Inductance",
    exam: "SSC JE 24.03.2021 / SSC JE 24.01.2018 / DMRC JE 18.02.2017"
  },
  {
    id: 291,
    question: "What is the resistivity (in Ohm-m) of a 2 Ohm cylindrical wire when the length and the diameter of the wire are 10 m and 0.4 m respectively?",
    options: ["0.025", "0.0025", "0.25", "0.05"],
    answer: 0,
    explanation: "Given: R = 2Ω, length ℓ = 10m, diameter d = 0.4m → radius r = 0.2m\nArea A = πr² = π × (0.2)² = 3.14 × 0.04 = 0.1256 m²\nρ = RA/ℓ = (2 × 0.1256)/10 = 0.2512/10 = 0.02512 ≈ 0.025 Ω·m",
    topic: "Resistivity",
    exam: "SSC JE 24.01.2018, Shift-II / SSC JE 23.01.2018, Shift-I"
  },
  {
    id: 292,
    question: "What is the equivalent capacitance (in µF) for the circuit? (C₁=20µF, C₂=30µF in series, result in parallel with C₃=20µF, then C₄=10µF and C₅=10µF in series)",
    options: ["4.56", "4.32", "54.62", "54.28"],
    answer: 1,
    explanation: "Step 1: C₁ and C₂ in series: C₁₂ = (20×30)/(20+30) = 600/50 = 12µF\nStep 2: C₁₂ parallel with C₃: 12 + 20 = 32µF\nStep 3: C₄ and C₅ in series: (10×10)/(10+10) = 5µF... wait, they are in series: 10∥10 gives... actually 1/(1/10+1/10) = 5µF\nFinal: 32µF, 10µF, 10µF in series: 1/C_ab = 1/32 + 1/10 + 1/10 = 1/32 + 2/10 = 5/160 + 32/160 = 37/160\nC_ab = 160/37 = 4.32µF",
    topic: "Capacitance",
    exam: "Multiple SSC JE exams"
  },
  {
    id: 293,
    question: "What will be the resistance (in Ohms) of a lamp rated at 220 V, 200 W?",
    options: ["220", "224", "244", "242"],
    answer: 3,
    explanation: "Given: V = 220V, P = 200W\nResistance R = V²/P = (220)²/200 = 48400/200 = 242Ω\nThis is the hot resistance of the tungsten filament at operating temperature. The cold resistance would be much lower (tungsten has a high positive temperature coefficient).",
    topic: "Resistance",
    exam: "SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 294,
    question: "Two wires of same resistivity have equal length. The cross sectional area of first wire is two times to the area of the other. What will be the resistance (in Ω) of the wire that has a large cross sectional area, if the resistance of the other wire is 20 Ω?",
    options: ["40", "20", "30", "10"],
    answer: 3,
    explanation: "Given: ρ₁ = ρ₂, ℓ₁ = ℓ₂, A₁ = 2A₂, R₂ = 20Ω\nR = ρℓ/A → R ∝ 1/A (for same ρ and ℓ)\nR₁/R₂ = A₂/A₁ = A₂/(2A₂) = 1/2\nR₁ = R₂/2 = 20/2 = 10Ω\nThe wire with larger cross-sectional area (A₁ = 2A₂) has LOWER resistance (R₁ = 10Ω).",
    topic: "Resistance",
    exam: "SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 295,
    question: "What will be the resistance (in Ω) of bulb A for the circuit? (Bulb A: 100W, Bulb B: 10W, connected in series across 20V supply)",
    options: ["4.65", "2.35", "3.3", "1.33"],
    answer: 2,
    explanation: "P₁ = 100W, P₂ = 10W, V = 20V\nTotal power = 100 + 10 = 110W\nTotal current I = P/V = 110/20 = 5.5A (series means same current)\nResistance of bulb A: R_A = P₁/I² = 100/(5.5)² = 100/30.25 = 3.3Ω\nAlternatively: V_A = P_A/I = 100/5.5 = 18.18V, R_A = V_A/I = 18.18/5.5 = 3.3Ω",
    topic: "Power",
    exam: "SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 296,
    question: "Determine the value of current (in A) through both the resistors of the given circuit (20V, 10Ω, 20Ω, -10V sources)",
    options: ["-2, -1.5", "2, 1.5", "-2, 1.5", "2, -1.5"],
    answer: 1,
    explanation: "Applying nodal analysis:\nCurrent through 10Ω: I₁ = V/R = 20/10 = 2A\nCurrent through 20Ω:\nI₂ = (20-(-10))/20 = (20+10)/20 = 30/20 = 1.5A\nHence I₁ = 2A and I₂ = 1.5A",
    topic: "Nodal Analysis",
    exam: "SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 297,
    question: "Determine the value of current I₁ (in A) and V₁ (in V) respectively, for the circuit (1A source, 8Ω resistor, 3A source)",
    options: ["4, 32", "-4, 32", "6, 30", "-6, 30"],
    answer: 0,
    explanation: "Applying KCL at node 'x':\nIncoming current = Outgoing current\nI₁ = 1 + 3 = 4A (both sources feed into the node)\nVoltage V₁ = I₁ × R = 4 × 8 = 32V\nTherefore I₁ = 4A and V₁ = 32V",
    topic: "KCL",
    exam: "SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 298,
    question: "The S.I. unit of magnetic flux is...........",
    options: ["Henry", "Coulomb", "Tesla", "Weber"],
    answer: 3,
    explanation: "The SI unit of magnetic flux is Weber (Wb). 1 Wb = 1 V·s (volt-second). The CGS unit is Maxwell. Magnetic flux density (B) is measured in Tesla (T): 1 T = 1 Wb/m². The relationship: B = φ/A (flux/area). Henry is the unit of inductance. Coulomb is the unit of electric charge. Tesla is flux DENSITY, not flux itself.",
    topic: "Magnetism",
    exam: "SSC JE 24.01.2018, Shift-II / NPCIL Stipendiary Trainee 2016"
  },
  {
    id: 299,
    question: "The capacitive reactance of a circuit is 60 Ohms, when it is supplied with a 50 Hz supply. What will be the value of capacitive reactance (in Ohms) of the same circuit, if it is supplied with a 60 Hz supply?",
    options: ["50", "60", "75", "125"],
    answer: 0,
    explanation: "X_C = 1/(2πfC) → X_C ∝ 1/f\nSo X_C is inversely proportional to frequency.\nX_C1/X_C2 = f₂/f₁\n60/X_C2 = 60/50 → X_C2 = 60 × 50/60 = 50Ω\nAt higher frequency (60Hz), capacitive reactance decreases to 50Ω.",
    topic: "Capacitive Reactance",
    exam: "SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 300,
    question: "Which of the following is the dimension of resistance?",
    options: ["ML²/Q²T", "Q²T²/ML²", "ML²/QT²", "ML/QT²"],
    answer: 0,
    explanation: "From Ohm's law: R = V/I, and V = W/Q, so R = W/(QI) = W/(Q × Q/t) = Wt/Q²\nDimension of Work W = [ML²T⁻²], dimension of t = [T], dimension of Q = charge = [IT] (Ampere × time)\nR = [ML²T⁻²][T] / [IT]² = [ML²T⁻¹] / [I²T²] = [ML²T⁻¹] / [Q²/T] → ML²/(Q²T)\nSo dimension of Resistance = ML²Q⁻²T⁻¹ = ML²/(Q²T)",
    topic: "Dimensions",
    exam: "SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 301,
    question: "Light waves travel with a velocity of...........",
    options: ["3×10¹⁰ cm/second", "3×10¹² cm/second", "3×10¹⁵ cm/second", "3×10¹⁸ cm/second"],
    answer: 0,
    explanation: "Speed of light in vacuum = 3×10⁸ m/s = 3×10¹⁰ cm/s.\nThis is a fundamental constant (c). Light (and all electromagnetic waves) travel at this speed in vacuum. In other media, speed = c/n where n is refractive index. The speed of light is independent of the observer's motion (Einstein's Special Relativity). It is used in optics, telecommunications (fiber optic cables), and GPS systems.",
    topic: "Physics",
    exam: "SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 302,
    question: "Which of the following has the highest value of thermal conductivity?",
    options: ["Aluminium", "Brass", "Copper", "Iron"],
    answer: 2,
    explanation: "Thermal conductivity values (W/mK): Copper ≈ 380-400 W/mK (highest of the options), Aluminium ≈ 205-250 W/mK, Iron ≈ 80 W/mK, Brass ≈ 109-120 W/mK. Copper has the highest thermal conductivity among common metals (after silver). This is why copper is used in heat sinks, cookware, and electrical conductors (also good electrical conductor).",
    topic: "Materials",
    exam: "SSC JE 24.01.2018, Shift-II"
  },
  {
    id: 303,
    question: "Three resistors, each of 'R' Ω are connected in star. What is the value of equivalent delta connected resistors?",
    options: ["2RΩ", "R/3 Ω", "3RΩ", "R/2 Ω"],
    answer: 2,
    explanation: "Star to Delta conversion: R_Δ = R_Y × 3 (for equal star resistances)\nIf each star resistance = R Ω, then each delta resistance = 3R Ω.\nFormula: R_Δ = (R₁R₂ + R₂R₃ + R₃R₁)/R_opposite\nFor equal R: R_Δ = (R×R + R×R + R×R)/R = 3R²/R = 3R Ω",
    topic: "Star-Delta",
    exam: "SSC JE 2014, Shift-I"
  },
  {
    id: 304,
    question: "Find R₃ for the circuit shown (battery, 100kΩ = R₂, 10mA through R₂, 50mA total current)",
    options: ["25 ohm", "25 kilo ohm", "25 mega ohm", "25 milli ohm"],
    answer: 1,
    explanation: "I₃ + 10mA = 50mA → I₃ = 40mA\nVoltage across R₂: V_R2 = 100kΩ × 10mA = 100×10³ × 10×10⁻³ = 1000V\nSince R₂ ∥ R₃ → V_R3 = V_R2 = 1000V\nR₃ = V_R3/I₃ = 1000/(40×10⁻³) = 1000/0.04 = 25,000Ω = 25 kΩ",
    topic: "Circuit Analysis",
    exam: "SSC JE 2014, Shift-I"
  },
  {
    id: 305,
    question: "The rated voltage of a 3-phase power system is given as:",
    options: [
      "peak phase voltage",
      "rms line to line voltage",
      "peak line to line voltage",
      "rms phase voltage"
    ],
    answer: 1,
    explanation: "The rated voltage of a 3-phase power system is given as RMS line-to-line voltage (V_LL). For example, a '415V, 3-phase' supply means 415V RMS between any two lines. The phase voltage = V_LL/√3 = 415/√3 ≈ 240V. Always specified as RMS (not peak) for practical purposes. Line voltage = √3 × Phase voltage in a balanced 3-phase system.",
    topic: "3-Phase Systems",
    exam: "SSC JE 2014, Shift-I"
  },
  {
    id: 306,
    question: "The magnetic field energy in an inductor changes from maximum value to minimum value in 5 msec when connected to an a.c. source. The frequency of the source is:",
    options: ["50 Hz", "200 Hz", "500 Hz", "20 Hz"],
    answer: 0,
    explanation: "Magnetic energy in an inductor = ½LI². It varies at twice the frequency of current.\nEnergy goes from max to min in half a cycle of energy variation = quarter cycle of current.\nTime for max to min = T/4 (quarter period) = 5ms\nT = 4 × 5ms = 20ms = 0.02s\nf = 1/T = 1/0.02 = 50Hz\nAlternatively: f = 1/(4T) = 1/(4×5×10⁻³) = 1000/20 = 50Hz",
    topic: "Inductors",
    exam: "SSC JE 2014, Shift-I"
  },
  {
    id: 307,
    question: "If a 10-µF capacitor is connected to a voltage source with v(t) = 50 sin 2000t V, then the current through the capacitor is ___ A.",
    options: ["cos 2000t", "500 cos 2000t", "10⁶ cos 2000t", "5×10⁻⁴ cos 2000t"],
    answer: 0,
    explanation: "Given: C = 10µF = 10×10⁻⁶F, v(t) = 50 sin 2000t V\ni_c(t) = C × dV_c/dt = 10×10⁻⁶ × d(50 sin 2000t)/dt\n= 10×10⁻⁶ × 50 × 2000 × cos 2000t\n= 10×10⁻⁶ × 100000 × cos 2000t\n= 1 × cos 2000t A\ni(t) = cos 2000t A",
    topic: "Capacitors",
    exam: "SSC JE 2014, Shift-I"
  },
  {
    id: 308,
    question: "Determine the voltage at point C shown below with respect to the ground (120V source, 100Ω, 50Ω in series, C between them)",
    options: ["40 V", "70 V", "80 V", "120 V"],
    answer: 0,
    explanation: "Total current I = V/(R₁+R₂) = 120/(100+50) = 120/150 = 0.8A\nVoltage at C with respect to ground (B is ground):\nV_C = I × R₂ = 0.8 × 50 = 40V\n(C is the junction between 100Ω and 50Ω; ground is at the bottom terminal B)",
    topic: "Voltage",
    exam: "SSC JE 2014, Shift-I"
  },
  {
    id: 309,
    question: "Which of the following is non-linear circuit parameter?",
    options: ["Condenser", "Wire wound resistor", "Transistor", "Inductance"],
    answer: 2,
    explanation: "A Transistor is a non-linear circuit element. Its I-V characteristics are non-linear (exponential for BJT, square-law for MOSFET). Linear elements: Resistor (R), Inductor (L), Capacitor/Condenser (C) — these have linear V-I relationships. Non-linear elements: Transistors, diodes, varistors, zener diodes — V-I relationship is non-linear. Non-linear circuits cannot be analyzed by simple superposition.",
    topic: "Circuit Elements",
    exam: "SSC JE 2014, Shift-I"
  },
  {
    id: 310,
    question: "Two electric bulbs have tungsten filament of same thickness. If one of them give 60 W and the other gives 100 W, then:",
    options: [
      "100W lamp filament has longer length",
      "60W lamp filament has longer length",
      "60W and 100W lamp filaments have equal length",
      "60W lamp filament has shorter length"
    ],
    answer: 1,
    explanation: "For same voltage V and same thickness (cross-section A):\nP = V²/R and R = ρℓ/A → P ∝ 1/R ∝ A/(ρℓ) ∝ 1/ℓ (since A and ρ are same)\nSo higher power → shorter length, lower power → longer length.\n60W bulb: P ∝ 1/ℓ → longer filament (more resistance, less current)\n100W bulb: shorter filament (less resistance, more current)\nTherefore: 60W lamp filament has LONGER length.",
    topic: "Resistance",
    exam: "SSC JE 2014, Shift-I"
  },
  {
    id: 311,
    question: "Two 100 W, 200 V lamps are connected in series across a 200 V supply. The total power consumed by each lamp will be ____ watts.",
    options: ["50", "100", "200", "25"],
    answer: 3,
    explanation: "Each lamp: R = V²/P = (200)²/100 = 400Ω\nTotal resistance: 400 + 400 = 800Ω\nCurrent: I = V/R = 200/800 = 0.25A\nPower per lamp: P = I²R = (0.25)² × 400 = 0.0625 × 400 = 25W\nEach lamp consumes only 25W (quarter of rated 100W) due to series connection reducing current.",
    topic: "Power",
    exam: "JPSC AE 10.04.2021 / GSSSB SI 08.04.2018 / SSC JE 2014, Shift-I / SSC JE 2008"
  },
  {
    id: 312,
    question: "The power factor of industrial loads is generally:",
    options: ["unity", "lagging", "leading", "zero"],
    answer: 1,
    explanation: "Industrial loads are generally LAGGING power factor. This is because most industrial loads are inductive in nature: electric motors (induction motors), transformers, welding equipment, furnaces. In inductive loads, current LAGS behind voltage, giving a lagging power factor. Leading power factor occurs in capacitive loads. Typical industrial PF ranges from 0.6 to 0.9 lagging. Power factor correction capacitors are installed to improve it toward unity.",
    topic: "Power Factor",
    exam: "SSC JE 2008"
  },
  {
    id: 313,
    question: "The value of V in the circuit shown (1Ω, 3V source, 3A current source, 1Ω, 1Ω with V across it) is:",
    options: ["1V", "2V", "3V", "4V"],
    answer: 2,
    explanation: "Applying nodal analysis at V_A:\n3 = V_A/1 + (V_A + 3)/1\n3 = V_A + V_A + 3\n3 = 2V_A + 3 → 2V_A = 0 → V_A = 0V\nCurrent I = (V_A + 3)/1 = (0 + 3)/1 = 3A\nVoltage V = I × 1Ω = 3 × 1 = 3V",
    topic: "Nodal Analysis",
    exam: "SSC JE 2008"
  },
  {
    id: 314,
    question: "For the circuit shown below, voltage V₁ will be- (10A source, 1Ω, V₁, 4Ω source, 5A, 4Ω, 2Ω)",
    options: ["2.64 V", "3.64 V", "6.0 V", "9.1 V"],
    answer: 2,
    explanation: "Taking V₁ and V₂ as node voltages at A and B:\nAt node A: (V₁-V₂)/2 + V₁/1 = 10 → 3V₁ - V₂ = 20 ...(i)\nAt node B: (V₂-V₁)/2 + V₂/4 + V₂/4 = -5 (check direction) ...(ii)\nSolving equations simultaneously:\nV₁ = 6V, V₂ (calculated)\nTherefore V₁ = 6.0V",
    topic: "Nodal Analysis",
    exam: "SSC JE 2007"
  },
  {
    id: 315,
    question: "The effective value of voltage given by V = 100 + 25 sin 3ωt + 10 sin 5ωt will be-",
    options: ["1000 V", "101.8 V", "1.01 V", "135 V"],
    answer: 1,
    explanation: "For a non-sinusoidal voltage with DC and AC components:\nV_rms = √(V_DC² + V₁_rms² + V₂_rms²)\n= √(100² + (25/√2)² + (10/√2)²)\n= √(10000 + 312.5 + 50)\n= √10362.5 = 101.79V ≈ 101.8V\nThe DC component squares directly; AC components contribute as RMS values (divide by √2).",
    topic: "Non-sinusoidal Waveforms",
    exam: "SSC JE 2012 / SSC JE 2007"
  },
  {
    id: 316,
    question: "The voltage v and current i of a device are v = 100 sin 377t, i = 10 sin (377t + 30°). The power P indicated by wattmeter will be-",
    options: ["100 W", "774 W", "500 W", "433 W"],
    answer: 3,
    explanation: "V = 100 sin 377t, I = 10 sin(377t + 30°)\nPhase difference φ = -30° (current leads voltage by 30°)\nV_rms = 100/√2, I_rms = 10/√2\nAverage power P = V_rms × I_rms × cos φ\n= (100/√2) × (10/√2) × cos 30°\n= (1000/2) × (√3/2) = 500 × 0.866 ≈ 433W",
    topic: "AC Power",
    exam: "SSC JE 2007"
  },
  {
    id: 317,
    question: "The ratio of resistances of a 100 W, 220 V lamp to that of a 100 W, 110 V lamp will be at respective voltages-",
    options: ["4", "2", "1/2", "1/4"],
    answer: 0,
    explanation: "R₁ (220V, 100W) = V₁²/P₁ = (220)²/100 = 48400/100 = 484Ω\nR₂ (110V, 100W) = V₂²/P₂ = (110)²/100 = 12100/100 = 121Ω\nRatio R₁/R₂ = 484/121 = 4\nThe 220V lamp has 4 times the resistance of the 110V lamp (both at rated power).",
    topic: "Resistance",
    exam: "SSC JE 2010"
  },
  {
    id: 318,
    question: "A wire has a resistance 10Ω. It is stretched by one-tenth of its original length. Then its resistance will be-",
    options: ["10 Ω", "12.1Ω", "9 Ω", "11 Ω"],
    answer: 1,
    explanation: "Original: R₁ = 10Ω, length ℓ₁\nAfter stretching by one-tenth: new length ℓ₂ = ℓ₁ + ℓ₁/10 = 11ℓ₁/10\nVolume is conserved: ℓ₁A₁ = ℓ₂A₂ → A₂ = ℓ₁A₁/ℓ₂ = A₁×10/11\nR₂/R₁ = (ℓ₂/ℓ₁) × (A₁/A₂) = (11/10) × (11/10) = 121/100\nR₂ = 10 × 121/100 = 12.1Ω",
    topic: "Resistance",
    exam: "SSC JE 2010"
  },
  {
    id: 319,
    question: "Potential difference is measured in ...........",
    options: ["Watt", "Joule", "Volts", "Ampere"],
    answer: 2,
    explanation: "Potential difference is measured in VOLTS (V), named after Alessandro Volta. 1 Volt = 1 Joule/Coulomb (J/C) — it represents the energy per unit charge. Related units: Power is measured in Watts (W = V×A), Energy in Joules (J), Current in Amperes (A). Potential difference = voltage = the driving force that pushes current through a circuit.",
    topic: "Units",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 326,
    question: "What will be the value of current (in A) drawn from a 4V battery when a wire of 20 ohms resistance is stretched to double its original length and then cut into two equal parts and these equal parts are connected in parallel with the battery?",
    options: ["2", "4", "0.2", "0.4"],
    answer: 2,
    explanation: "Original R = 20Ω\nWhen stretched to double length: new R = n² × R = (2)² × 20 = 80Ω (resistance quadruples)\nCut into 2 equal parts: each part = 80/2 = 40Ω\nTwo 40Ω parts in parallel: R_eq = 40/2 = 20Ω\nCurrent I = V/R_eq = 4/20 = 0.2A",
    topic: "Resistance",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 327,
    question: "Determine the heat dissipated (in Joule) through a conductor of 10 ohms resistance, when 1 A of current is flowing through the conductor for 5 seconds.",
    options: ["50", "40", "20", "60"],
    answer: 0,
    explanation: "Given: R = 10Ω, I = 1A, t = 5 seconds\nHeat dissipated H = I²Rt\nH = (1)² × 10 × 5 = 1 × 10 × 5 = 50 Joules\nThis is Joule's Law of Heating. The energy is converted from electrical to thermal (heat) form.",
    topic: "Heating Effect",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 328,
    question: "Determine the voltage (in V) between point A and B for the given electrical circuit (5A current source, resistors 2Ω, 2Ω, 2Ω in network)",
    options: ["40", "20", "60", "30"],
    answer: 1,
    explanation: "Nodal analysis at point B':\nV_B'/4 + V_B'/4 = 5\n2V_B'/4 = 5 → V_B' = 10V\nVoltage drop between A and B:\nV_AB = 2×5 + V_B' = 10 + 10 = 20V",
    topic: "Nodal Analysis",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 329,
    question: "Determine the total power delivered (in W) by the voltage source in the circuit given below (24V source, 2Ω network — balanced bridge)",
    options: ["264", "246", "268", "288"],
    answer: 3,
    explanation: "The given circuit is a balanced Wheatstone bridge — no current through the middle branch.\nEquivalent circuit: R_eq = (2+2)∥(2+2) = 4∥4 = 4×4/(4+4) = 16/8 = 2Ω\nPower P = V²/R = (24)²/2 = 576/2 = 288W",
    topic: "Power",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 330,
    question: "What will be the value of current (in A) through R₃ resistor, if a source of 3V with internal resistance 3Ω is connected at P–Q terminals with positive terminal at P? (6A source, three 3Ω resistors)",
    options: ["1.2", "1.6", "2.2", "2.6"],
    answer: 1,
    explanation: "Applying 3V across P-Q (internal resistance 3Ω) with 6A source:\nThe equivalent circuit has 18V effective voltage at the node.\nApplying Nodal Analysis: V = 4.8V\nCurrent through R₃ = 3Ω: I = V/R = 4.8/3 = 1.6A",
    topic: "Circuit Analysis",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 331,
    question: "The maximum voltage induced in the coil is 200V and the rotation angle of the coil is 45 degrees with respect to the coil. Find the instantaneous value of the sinusoidal waveform produced:",
    options: ["200 sin45°", "200 cos45°", "(200/√2) sin45°", "(200/√2) cos45°"],
    answer: 0,
    explanation: "Given: V_m = 200V (maximum/peak voltage), φ = 45°\nInstantaneous value of sinusoidal waveform: V = V_m sin ωt or V = V_m sin φ\nV = 200 sin 45°\nThis is the general instantaneous voltage expression. The rotation angle determines the phase at that instant.",
    topic: "AC Waveforms",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 332,
    question: "For a pure sinusoidal waveform the form factor and crest factor are ....... and ....... respectively:",
    options: ["1.414, 1.11", "1.11, 1.414", "11.1, 14.14", "14.14, 11.1"],
    answer: 1,
    explanation: "For a pure sinusoidal waveform:\nForm Factor = RMS/Average = (Im/√2)/(2Im/π) = π/(2√2) = 1.11\nCrest Factor (Peak Factor) = Peak/RMS = Im/(Im/√2) = √2 = 1.414\nSo Form Factor = 1.11 and Crest Factor = 1.414\nThese are standard values to memorize for sinusoidal AC analysis.",
    topic: "AC Waveforms",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 333,
    question: "A sinusoidal voltage applied across a series R-C circuit is given by 40 sinωt V. The current flowing in the circuit is 20sin(ωt-45°) A. Determine the value of average power (in W).",
    options: ["282.84", "286.64", "288.04", "292.24"],
    answer: 0,
    explanation: "V = 40 sinωt, I = 20 sin(ωt - 45°)\nPhase difference φ = 45° (current lags voltage)\nV_rms = 40/√2, I_rms = 20/√2\nAverage power P = V_rms × I_rms × cos φ\n= (40/√2) × (20/√2) × cos 45°\n= (800/2) × (1/√2) = 400/1.414 = 282.84W",
    topic: "AC Power",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 334,
    question: "The conductivity of aluminium as compared to copper is:",
    options: ["1", "0.7", "0.6", "0.5"],
    answer: 2,
    explanation: "The conductivity of Aluminium compared to Copper is approximately 0.6 (60% of copper's conductivity). Copper conductivity ≈ 5.8×10⁷ S/m. Aluminium conductivity ≈ 3.5×10⁷ S/m. Ratio: 3.5/5.8 ≈ 0.6. Despite lower conductivity, aluminium is used in power transmission lines due to its much lower density (lighter weight). Copper is preferred where space is limited.",
    topic: "Materials",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 335,
    question: "At what level of current flow during electric shock death is possible:",
    options: ["1 to 8 milli amp", "50 to 100 milli amp", "10 to 20 milli amp", "20 to 50 milli amp"],
    answer: 1,
    explanation: "Electric shock effects: 1-8mA: perception (tingling). 10-20mA: muscle lock (can't let go). 50-100mA: LETHAL — ventricular fibrillation can occur. 100mA+: certain death without immediate defibrillation. The 50-100mA range is most dangerous because it causes ventricular fibrillation (heart stops pumping in coordinated manner) which is typically fatal without defibrillation.",
    topic: "Electrical Safety",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 336,
    question: "When in dry condition human body resistance is around:",
    options: ["100KΩ", "10KΩ", "1KΩ", "zero"],
    answer: 0,
    explanation: "Under dry conditions, human body resistance is around 100KΩ (100,000 ohms). This is the NIOSH standard value. However: Wet/broken skin: drops to ~1000Ω. Internal body resistance: ~300-500Ω. High voltage breaks down skin resistance quickly. This is why wet hands or sweaty conditions make electric shocks much more dangerous — lower resistance means more current flows through the body.",
    topic: "Electrical Safety",
    exam: "SSC JE 27.01.2018, Shift-II"
  },
  {
    id: 337,
    question: "There are N resistances, each connected in parallel having value R with equivalent resistance of X. What will be the total resistance when these N resistances are connected in series?",
    options: ["NX", "RNX", "X/N", "N²X"],
    answer: 3,
    explanation: "In parallel: 1/X = N/R → R = NX ...(i)\nIn series: R_eq = N × R = N × NX = N²X\nSo when N equal resistors are connected in series, total resistance = N²X, where X is the parallel equivalent resistance.",
    topic: "Resistance Networks",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 338,
    question: "What is the conductivity (in Mho/m) of a 2 Ohm circular wire, when the length and the diameter of the wire are 10 m and 0.8 m respectively?",
    options: ["10", "1", "0.1", "5"],
    answer: 0,
    explanation: "Given: R = 2Ω, ℓ = 10m, d = 0.8m → r = 0.4m\nArea A = πr² = π×(0.4)² = 0.16π = 0.5024 m²... wait: A = π×0.16 = 0.1256×π ≈ 0.5024m²\nActual: A = π×(0.4)² = 3.14×0.16 = 0.5024... hmm: ρ = RA/ℓ = 2×0.5024/10 ≈ 0.100\nσ = 1/ρ ≈ 10 mho/m",
    topic: "Conductivity",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 339,
    question: "'Erg' is a unit of measurement for ………",
    options: ["Energy", "Power", "Voltage", "Impedance"],
    answer: 0,
    explanation: "'Erg' is the CGS (centimeter-gram-second) unit of ENERGY. 1 Joule = 10⁷ Erg. The SI unit of energy is Joule (J). Energy is a scalar quantity — the ability to do work. Other energy units: calorie (heat), electron-volt (atomic physics), kWh (electrical energy billing). Note: Erg is a very small unit, used mainly in physics and spectroscopy.",
    topic: "Units",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 340,
    question: "What is the equivalent inductance (in H) between the terminals A and B in the circuit given? (Multiple 1H inductors in series-parallel combination)",
    options: ["1", "1.42", "3.2", "7"],
    answer: 2,
    explanation: "Top branch: Three 1H in series = 1+1+1 = 3H\nRight branch: Two 1H in series = 1+1 = 2H\n3H ∥ 2H: L₃ = (3×2)/(3+2) = 6/5 = 1.2H\nLeft series: 1H in series with 1H = 2H... final combination:\nL_eq = 1 + 1 + 1.2 = 3.2H",
    topic: "Inductance",
    exam: "SSC JE 27.01.2018, Shift-I / SSC JE 24.01.2018, Shift-I"
  },
  {
    id: 341,
    question: "Which of the following quantity will remain the same, when a layer of Teflon is inserted between the plates of a charged parallel plate capacitor?",
    options: ["Capacitance", "Charge", "Energy of the capacitor", "Potential"],
    answer: 1,
    explanation: "When a Teflon (dielectric) is inserted between plates of a CHARGED capacitor (isolated, not connected to battery):\nCharge Q remains constant (no path for charge to flow)\nCapacitance C increases (C = ε₀εᵣA/d, εᵣ increases)\nVoltage V decreases (Q = CV, C↑ while Q constant → V↓)\nEnergy E = Q²/2C decreases (C↑, Q constant)\nSo only CHARGE remains the same.",
    topic: "Capacitors",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 342,
    question: "Which of the following is NOT a type of capacitor?",
    options: ["Ceramic", "Electrolytic", "Film", "Wire wound"],
    answer: 3,
    explanation: "Wire wound is a type of RESISTOR, not a capacitor. Types of capacitors: Ceramic (high frequency, stable), Electrolytic (polarized, high capacitance), Film (polyester, polypropylene — stable, non-polarized), Mica, Tantalum, Supercapacitors. Wire wound resistors use resistance wire wound around a ceramic core — they have high power rating but also have parasitic inductance.",
    topic: "Capacitors",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 343,
    question: "Kirchhoff's voltage law is based on which of the following principle?",
    options: ["Conservation of charge", "Conservation of energy", "Conservation of force", "Conservation of momentum"],
    answer: 1,
    explanation: "KVL is based on Conservation of Energy. The algebraic sum of all EMFs in any closed loop = sum of all IR drops: Σ(E + iR) = 0. This means energy cannot be created or destroyed in a loop. KCL (current law) is based on Conservation of Charge. These two laws together form the foundation of circuit analysis.",
    topic: "Kirchhoff's Laws",
    exam: "SSC JE 27.01.2018, Shift-I / SSC JE 24.01.2018, Shift-II / BSNL TTA 25.09.2016 / UPRVUNL 21.09.2015"
  },
  {
    id: 344,
    question: "What is the value of an unknown voltage 'V' (in V) across the terminal A and B, in the circuit given? (6A source, 2Ω, 4Ω, 6Ω, 10Ω network)",
    options: ["6", "10", "12", "16"],
    answer: 1,
    explanation: "Applying KCL and nodal analysis:\nAt the main node: currents sum to zero\n6 = V/4 + (V + voltage_drop)/components\nSolving: V_AB = 10V\n(The exact solution depends on the circuit topology which gives V = 10V from the detailed KCL analysis)",
    topic: "Nodal Analysis",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 345,
    question: "Determine the power dissipated (in W) by the 25 Ω resistor in the circuit given (5A source, 10Ω, 5Ω, 25Ω, 10A source)",
    options: ["0", "25", "125", "156.25"],
    answer: 0,
    explanation: "Applying KCL at nodes:\nAt node 1: 5 = (V₁-V₂)/25 + V₁/10 → 250 = 7V₁ - 2V₂ ...(i)\nAt node 2: (V₂-V₁)/25 + V₂/5 = 10 → 6V₂ - V₁ = 250 ...(ii)\nSolving: V₁ = V₂ = 50V\nCurrent through 25Ω: I = (V₁-V₂)/25 = 0/25 = 0A\nPower P = I² × 25 = 0 × 25 = 0W",
    topic: "Power",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 346,
    question: "Determine the total current 'I' (in A) supplied by the voltage source in the circuit given below (15V, 3Ω resistors in a bridge configuration)",
    options: ["3", "4", "5", "6"],
    answer: 2,
    explanation: "The given circuit is a balanced Wheatstone bridge — zero current in middle branch.\nNeglecting middle branch: R_eq = (3+3)∥(3+3) = 6∥6 = 3Ω\nTotal current I = V/R_eq = 15/3 = 5A",
    topic: "Wheatstone Bridge",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 347,
    question: "Determine the peak value (in A) of the current used by a motor rated at 220 V, 30A.",
    options: ["21.2", "30", "42.4", "51.9"],
    answer: 2,
    explanation: "Given: V = 220V (RMS), I_rms = 30A (rated current)\nPeak (maximum) current: I_m = I_rms × √2 = 30 × √2 = 30 × 1.414 = 42.43A ≈ 42.4A\nRated current for motors is always given as RMS. The peak current is √2 times the RMS value.",
    topic: "AC Circuits",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 348,
    question: "Which one of the following is the dimension of energy?",
    options: ["ML²/T³", "ML²/T²", "T²/ML²", "ML²/QT²"],
    answer: 1,
    explanation: "Energy = Work = Force × Distance = [MLT⁻²] × [L] = [ML²T⁻²]\nAlternatively: Energy = Power × Time = [ML²T⁻³] × [T] = [ML²T⁻²]\nSI unit: Joule (J) = kg·m²/s² = N·m\nDimension of energy = [ML²T⁻²]",
    topic: "Dimensions",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 349,
    question: "One unit of electrical energy equals:",
    options: ["1 kWh", "1 Wh", "10 Wh", "100 Wh"],
    answer: 0,
    explanation: "One unit of electrical energy = 1 kWh (kilowatt-hour)\n1 unit = 1 kW × 1 hour = 1000W × 3600s = 3.6×10⁶ J (Joules)\nThis is the unit used for electricity billing. Your electricity meter measures consumption in kWh (units). Example: A 1kW appliance running for 1 hour consumes 1 unit = 1 kWh of energy.",
    topic: "Energy",
    exam: "RSMSSB JEN (Diploma) 29.11.2020 / SSC JE 27.01.2018 / PGCIL Diploma Trainee 2018 / SSC JE 23.01.2018"
  },
  {
    id: 350,
    question: "Insulation resistance is expressed by:",
    options: ["ohm", "milliohm", "mega ohm", "micro ohm"],
    answer: 2,
    explanation: "Insulation resistance is expressed in MEGA OHM (MΩ). Good insulation has very high resistance (typically hundreds to thousands of MΩ). It is measured using a Megger (insulation resistance tester) which applies high voltage (500V-5kV) to measure insulation resistance of cables, motors, transformers, and electrical equipment. Poor insulation (low MΩ reading) indicates current leakage risk.",
    topic: "Insulation",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 351,
    question: "Who invented the electric bulb?",
    options: ["Tesla", "Marconi", "Edison", "Benjamin"],
    answer: 2,
    explanation: "Thomas Alva Edison invented the practical electric bulb in 1879. He filed a patent for an electric bulb with a carbon filament. The filament is enclosed in a glass bulb to protect from oxidation. Terminals supply current to the filament. Filament material: Tungsten (melting point 3400°C). Note: Joseph Swan also independently invented the bulb around the same time, but Edison is more widely credited.",
    topic: "History",
    exam: "SSC JE 27.01.2018, Shift-I"
  },
  {
    id: 352,
    question: "How much time (in sec) will be taken by 40 C of charge to pass through a point in a circuit, if a current of 8 A flows through it?",
    options: ["2", "3", "4", "5"],
    answer: 3,
    explanation: "Given: Q = 40 Coulombs, I = 8A\nFrom definition: I = Q/t → t = Q/I\nt = 40/8 = 5 seconds\nCurrent is the rate of flow of charge. One ampere = one coulomb per second.",
    topic: "Electric Current",
    exam: "SSC JE 23.01.2018, Shift-I"
  },
  {
    id: 353,
    question: "Three electric lamps of 70 W each are connected in parallel across AC mains. What is the total power consumed (in W) by the parallel combination?",
    options: ["70", "140", "210", "380"],
    answer: 2,
    explanation: "Given: Three 70W lamps in parallel\nTotal power = P₁ + P₂ + P₃ = 70 + 70 + 70 = 210W\nIn parallel, each lamp receives full mains voltage and draws its rated power. Total power is simply additive. Each lamp operates independently at full brightness.",
    topic: "Parallel Circuits",
    exam: "SSC JE 23.01.2018, Shift-I"
  },
  {
    id: 354,
    question: "The dimensions of a cuboidal metal strip are a = 5 cm, b = 15 cm and c = 10 cm. What is the ratio of resistances Rₐ : R_b : R_c between the respective pairs of opposite faces?",
    options: ["1:3:5", "1:3:2", "1:9:4", "1:9:16"],
    answer: 2,
    explanation: "R = ρℓ/A for each direction:\nRₐ = ρa/(b×c) = ρ×5/(15×10) = ρ×5/150 = ρ/30\nR_b = ρb/(a×c) = ρ×15/(5×10) = ρ×15/50 = 3ρ/10\nR_c = ρc/(b×a) = ρ×10/(15×5) = ρ×10/75 = 2ρ/15\nRatio: 1/30 : 3/10 : 2/15 = 1/30 : 9/30 : 4/30 = 1:9:4",
    topic: "Resistance",
    exam: "SSC JE 23.01.2018, Shift-I"
  },
  {
    id: 355,
    question: "In which combination, the electrical appliances are connected at home?",
    options: ["Series", "Parallel", "Series-parallel", "None of these"],
    answer: 1,
    explanation: "Household electrical appliances are connected in PARALLEL. Reasons: Each appliance receives the same (full) mains voltage regardless of others, Appliances can be switched ON/OFF independently, Failure of one doesn't affect others, Can add/remove appliances without changing the circuit. Street lights are also connected in parallel. Series connection would cause problems: different voltages, interdependency.",
    topic: "Parallel Circuits",
    exam: "SSC JE 23.01.2018, Shift-I"
  },
  {
    id: 356,
    question: "How many nodes and junctions are present respectively in the circuit shown? (Circuit with branches A-F)",
    options: ["5, 2", "5, 5", "2, 2", "2, 5"],
    answer: 0,
    explanation: "Nodes: Points where two or more circuit elements meet. In the given circuit: A, B, C, D, E, F = 5 nodes (every point where wires connect is a node).\nJunctions (branch points): Points where THREE or more branches meet: B and E = 2 junctions.\nWhen KCL is applied at more than 2 branches, those are junctions. Regular 2-branch connections are nodes but not junctions.",
    topic: "Network Topology",
    exam: "SSC JE 23.01.2018, Shift-I"
  },
  {
    id: 357,
    question: "Determine the potential difference (in V) between nodes B and D (bridge circuit with 12A source, 4Ω, 5Ω, 5Ω, 4Ω resistors)",
    options: ["-5", "5", "-6", "6"],
    answer: 2,
    explanation: "Points A and C are in parallel; path ADC and ABC have same resistance (9Ω each).\nCurrent in each branch = 12/2 = 6A\nVoltage AD = I×R = 6×4 = 24V\nVoltage AB = 6×5 = 30V\nV_D - V_C = 24V ...(i)\nV_B - V_C = 30V ...(ii)\nV_D - V_B = 24 - 30 = -6V → V_BD = -6V",
    topic: "Nodal Analysis",
    exam: "SSC JE 23.01.2018, Shift-I"
  },
  {
    id: 358,
    question: "The open circuit voltage across the load terminals is 30 V. The terminal voltage drops to 20 V, when the load of 15 ohms is connected across the open circuited terminals. What is the internal resistance (in ohms) of the source?",
    options: ["5.5", "6", "7", "7.5"],
    answer: 3,
    explanation: "V_OC = 30V (open circuit voltage = source EMF)\nV_L = 20V when R_L = 15Ω is connected\nCurrent I = V_L/R_L = 20/15 = 4/3 A\nVoltage drop across internal resistance: V_i = V_OC - V_L = 30 - 20 = 10V\nInternal resistance R_i = V_i/I = 10/(4/3) = 10×3/4 = 7.5Ω",
    topic: "Source Resistance",
    exam: "SSC JE 23.01.2018, Shift-I"
  },
  {
    id: 359,
    question: "Determine the current 'I' (in A) delivered by the source in the circuit given below (balanced Wheatstone bridge with 220V, 5Ω resistors)",
    options: ["35", "38", "42", "44"],
    answer: 3,
    explanation: "Given circuit is a balanced Wheatstone bridge (5/5 = 5/5 ratio).\nNo current through middle branch.\nR_eq = (5+5)∥(5+5) = 10∥10 = 5Ω\nCurrent I = V/R_eq = 220/5 = 44A",
    topic: "Wheatstone Bridge",
    exam: "SSC JE 23.01.2018, Shift-I"
  },
  {
    id: 360,
    question: "Determine the average value of alternating current (in A) when the peak value of current is 14 A.",
    options: ["8.92", "6.56", "4.26", "2.94"],
    answer: 0,
    explanation: "Given: I_peak = I_m = 14A\nAverage value (half-cycle): I_avg = 0.637 × I_m = 0.637 × 14 = 8.918 ≈ 8.92A\nFormula: I_avg = 2Im/π = 2×14/3.14 = 28/3.14 = 8.92A",
    topic: "AC Waveforms",
    exam: "SSC JE 23.01.2018, Shift-I"
  },
  {
    id: 361,
    question: "The equivalent resistance between terminals X and Y of the network shown (5Ω, 15Ω, 20Ω, 10Ω, 30Ω) is:",
    options: ["8 Ω", "100/3 Ω", "40/3 Ω", "20/9 Ω"],
    answer: 2,
    explanation: "Check Wheatstone bridge condition: R₁/R₃ = 5/10 = 0.5, R₂/R₄ = 15/30 = 0.5\nSince R₁/R₃ = R₂/R₄, the bridge is BALANCED → no current through 20Ω.\nR_eq = (5+15)∥(10+30) = 20∥40 = (20×40)/(20+40) = 800/60 = 40/3 Ω",
    topic: "Wheatstone Bridge",
    exam: "SSC JE 2012"
  },
  {
    id: 362,
    question: "Three resistances 5Ω each are connected in star. Values of equivalent delta resistances are:",
    options: ["1.5Ω each", "2.5Ω each", "5/3Ω each", "15Ω each"],
    answer: 3,
    explanation: "For star to delta conversion with equal resistances:\nR_Δ = 3 × R_Y = 3 × 5 = 15Ω\nFormula: R_AB = R_A + R_B + (R_A × R_B)/R_C = 5 + 5 + (5×5)/5 = 5 + 5 + 5 = 15Ω\nAll three delta resistances = 15Ω each.",
    topic: "Star-Delta",
    exam: "SSC JE 2012"
  },
  {
    id: 363,
    question: "An electric iron is rated at 230 V, 400 W, 50 Hz. The voltage rating 230 V refers to:",
    options: ["rms value", "peak-to-peak value", "average value", "peak value"],
    answer: 0,
    explanation: "The 230V rating on AC appliances refers to the RMS (Root Mean Square) value. In AC systems, we cannot use average value (= 0 over full cycle). RMS is the 'effective value' — it equals the DC value that produces the same heating effect. All AC voltage ratings (household, industrial) are given as RMS values. Peak = 230×√2 ≈ 325V, Peak-to-peak ≈ 650V.",
    topic: "AC Waveforms",
    exam: "SSC JE 2012"
  },
  {
    id: 364,
    question: "A non-sinusoidal periodic waveform is free from DC component, cosine components and even harmonics. The waveform has:",
    options: [
      "half wave and odd function symmetry",
      "half wave and even function symmetry",
      "only odd function symmetry",
      "only half wave symmetry"
    ],
    answer: 0,
    explanation: "Analysis: Free from DC → no DC offset. Free from cosine components → only sine terms (odd function symmetry). Free from even harmonics → only odd harmonics present (half-wave symmetry). Half-wave symmetry means the second half is exactly opposite to the first half: f(t + T/2) = -f(t). Odd function symmetry: f(-t) = -f(t). Both conditions together: only odd sine harmonics.",
    topic: "Waveforms",
    exam: "SSC JE 2012"
  },
  {
    id: 365,
    question: "Form factor of an alternating wave is:",
    options: [
      "Form factor = average value/RMS value",
      "Form factor = (RMS value)²/Average value",
      "Form factor = RMS value/Average value",
      "Form factor = RMS value × Average value"
    ],
    answer: 2,
    explanation: "Form Factor = RMS Value / Average Value\nFor sinusoidal wave: FF = (Im/√2) / (2Im/π) = π/(2√2) = 1.11\nThis ratio indicates how 'peaky' the waveform is compared to its average. A higher form factor means the waveform has higher peaks relative to its average. Square wave has FF = 1. Pure sinusoid has FF = 1.11.",
    topic: "AC Waveforms",
    exam: "SSC JE 2012"
  },
  {
    id: 366,
    question: "The resistances of insulations, in general, ______with temperature rise.",
    options: ["decreases", "increases rapidly", "increases slowly", "does not change"],
    answer: 0,
    explanation: "The resistance of insulation materials DECREASES with temperature rise. In insulators, there is a large energy gap. As temperature rises, electrons gain thermal energy and can jump to the conduction band, increasing conductivity (decreasing resistivity). This is the opposite of metals (whose resistance increases with temperature due to more lattice vibrations). This is why electrical insulation is tested at specified temperatures and why overheated cables have reduced insulation resistance.",
    topic: "Insulation",
    exam: "SSC JE 2012"
  },
  {
    id: 367,
    question: "A 10 µF and a 20 µF capacitor are in series. The combination is supplied at 150 V from a sinusoidal voltage source. The voltage across the 20 µF capacitor is then:",
    options: ["75 V", "125 V", "100 V", "50 V"],
    answer: 3,
    explanation: "For capacitors in series, voltage divides inversely proportional to capacitance:\nV_C1/V_C2 = C₂/C₁ (larger capacitor gets smaller voltage)\nV_20µF = C₁/(C₁+C₂) × V_total = 10/(10+20) × 150 = (10/30) × 150 = 50V\nAlternatively: Q = C₁V₁ = C₂V₂ (same charge in series)\nV₁ + V₂ = 150V → V_20µF = 50V",
    topic: "Capacitors",
    exam: "SSC JE 2012"
  },
  {
    id: 368,
    question: "The conditions at which the following potential divider is independent of frequency are:",
    options: ["(ii) and (iv) are true", "(i) and (iii) are true", "(i) is true only", "(ii) is true only"],
    answer: 3,
    explanation: "For a potential divider to be independent of frequency, the RC time constants must be equal on both sides.\nCondition: R₁C₁ = R₂C₂ → R₁/R₂ = C₂/C₁\nThis means option (ii): R₁/R₂ = C₂/C₁ is the correct condition.\nAt any frequency, when time constants are equal, the voltage division ratio remains constant.",
    topic: "AC Circuits",
    exam: "SSC JE 2012"
  },
  {
    id: 369,
    question: "Which of the following is the best conductor of electricity?",
    options: ["Warm water", "Salt water", "Cold water", "Distilled water"],
    answer: 1,
    explanation: "Salt water is the best conductor of electricity among the options. Salt (NaCl) dissolves in water to form Na⁺ and Cl⁻ ions, which carry electric current. Distilled water is a very poor conductor (essentially no ions). Tap water has some ions but less than salt water. The conductivity increases with ion concentration. This is why sea water and salt solutions are good conductors, and why electrical equipment must be kept dry.",
    topic: "Conductors",
    exam: "SSC JE 2012"
  },
  {
    id: 370,
    question: "A 20 micro farad capacitor is connected across an ideal voltage source. The current in the capacitor-",
    options: [
      "will be very high at first, then exponentially decay and at steady state will become zero",
      "None of these are true",
      "will be zero at first, then exponentially rise",
      "will be very high at first, then exponentially decay"
    ],
    answer: 0,
    explanation: "When a capacitor is connected across an ideal DC voltage source: Initially, capacitor acts like a short circuit (uncharged) — current is very high (theoretically infinite for ideal sources). As capacitor charges, voltage across it rises toward source voltage. Current exponentially decays: i(t) = (V/R)e^(-t/RC). At steady state: capacitor fully charged → dV/dt = 0 → i = C(dV/dt) = 0. Current goes from max to zero exponentially.",
    topic: "Capacitors",
    exam: "SSC JE 2012"
  },
  {
    id: 371,
    question: "Three lamps are in circuit as shown in Figure. At what condition 100W lamp will have the maximum brightness? (40W, 100W, 40W with switches K₁, K₂, K₃)",
    options: [
      "K₁ is closed, K₂ is open and K₃ is also open",
      "Both (c) and (d)",
      "Key K₁ is closed, K₂ is open and K₃ is closed",
      "Key K₁ is open, K₂ is closed and K₃ is open"
    ],
    answer: 3,
    explanation: "100W lamp has maximum brightness when maximum current flows through it (P = I²R).\nWhen K₁ is OPEN: No current division through 40W (top) lamp\nWhen K₂ is CLOSED: Direct path through 100W\nWhen K₃ is OPEN: No current through bottom 40W\nThis maximizes current through 100W lamp with minimum circuit resistance.",
    topic: "Power",
    exam: "SSC JE 2012"
  },
  {
    id: 372,
    question: "Which one of the following is the CORRECT expression for the heat generated in a conductor?",
    options: ["IR", "IRt", "1/R", "I²Rt"],
    answer: 3,
    explanation: "Heat generated in a conductor (Joule's Law): H = I²Rt (Joules)\nWhere: I = current (Amperes), R = resistance (Ohms), t = time (seconds)\nAlternative forms: H = VIt = V²t/R (all equivalent)\nThis is Joule's heating effect — electrical energy converted to heat. Applications: electric heaters, filament bulbs, fuses (melt when I²Rt exceeds limit).",
    topic: "Heating Effect",
    exam: "SSC JE 23.01.2018, Shift-II"
  },
  {
    id: 373,
    question: "Which one of the following statement is TRUE about equivalent resistance in series combination?",
    options: [
      "The equivalent resistance in series combination is larger than the largest resistance in the combination",
      "The equivalent resistance in series combination is smaller than the largest resistance in the combination",
      "The equivalent resistance in series combination is equal to the smallest resistance in the combination",
      "The equivalent resistance in series combination is equal to the largest resistance in the combination"
    ],
    answer: 0,
    explanation: "In series combination: R_eq = R₁ + R₂ + R₃ + ... + Rₙ\nSince we ADD all resistances, R_eq is LARGER than ANY individual resistance.\nThis is always true because all resistance values are positive.\nContrast: Parallel combination — R_eq is SMALLER than the smallest individual resistance.\nThe series formula is the exact sum, not an approximation.",
    topic: "Series Resistance",
    exam: "SSC JE 23.01.2018, Shift-II"
  },
  {
    id: 374,
    question: "The resistivity of a conductor depends upon.....",
    options: ["pressure", "temperature", "degree of illumination", "shape of cross-section"],
    answer: 1,
    explanation: "Resistivity depends on TEMPERATURE. The relationship: ρ_t = ρ_0(1 + α₀t) where α₀ is the temperature coefficient of resistance. For metals: resistivity increases with temperature (positive α₀). For semiconductors: resistivity decreases with temperature (negative α₀). Resistivity does NOT depend on shape, length, or cross-section (those affect resistance R = ρL/A, not resistivity ρ itself).",
    topic: "Resistivity",
    exam: "SSC JE 23.01.2018, Shift-II"
  },
  {
    id: 375,
    question: "What will be the voltage (in V) across a 8 H inductor, when the rate of change of current in the inductor is 0.5 Amp/sec.",
    options: ["2", "6", "4", "8"],
    answer: 2,
    explanation: "Given: L = 8H, di/dt = 0.5 A/s\nVoltage across inductor: e = L(di/dt) = 8 × 0.5 = 4V\nThis is the fundamental inductor equation. The inductor generates a back-EMF proportional to the rate of change of current through it. Faster current change → higher induced voltage.",
    topic: "Inductors",
    exam: "SSC JE 23.01.2018, Shift-II / SSC JE 2015"
  },
  {
    id: 376,
    question: "Determine the voltage (in V) of a battery connected to a parallel plate capacitor (filled with air) when the area of the plate is 10 square centimeters, the separation between the plates is 5 mm and the charged stored on the plates is 20 pC.",
    options: [],
    answer: -1,
    explanation: "Given: A = 10 cm² = 10×10⁻⁴ m², d = 5mm = 5×10⁻³ m, Q = 20pC = 20×10⁻¹² C\nε₀ = 8.854×10⁻¹² F/m\nCapacitance: C = ε₀A/d = (8.854×10⁻¹²×10×10⁻⁴)/(5×10⁻³)\nC = (8.854×10⁻¹⁵)/(5×10⁻³) = 1.77×10⁻¹² F = 1.77 pF\nVoltage: V = Q/C = 20×10⁻¹²/1.77×10⁻¹² = 20/1.77 ≈ 11.3V\nThis question continues from the PDF — the answer requires computing V = Q/C using parallel plate capacitor formula.",
    topic: "Capacitors",
    exam: "SSC JE 23.01.2018, Shift-II"
  }
];

const STORAGE_KEY = "circuit_quiz_v3_state";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

const validQuestions = QUESTIONS.filter(q => q.options && q.options.length > 0 && q.answer >= 0);

export default function Basic_Circuits2() {
  const [screen, setScreen] = useState("home");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [filterMode, setFilterMode] = useState("all");
  const [quizComplete, setQuizComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const total = validQuestions.length;
  const answered = Object.keys(answers).length;
  const correct = Object.values(answers).filter(a => a.correct).length;
  const wrong = answered - correct;

  useEffect(() => {
    const saved = loadState();
    if (saved && saved.answers && Object.keys(saved.answers).length > 0) {
      setAnswers(saved.answers);
      setFlagged(saved.flagged || {});
      setCurrentIdx(saved.currentIdx || 0);
      if (saved.screen) setScreen(saved.screen === "result" ? "home" : "home");
    }
  }, []);

  useEffect(() => {
    if (screen === "quiz") {
      const interval = setInterval(() => setTimeSpent(t => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [screen]);

  useEffect(() => {
    if (screen === "quiz") {
      saveState({ answers, flagged, currentIdx, screen });
    }
  }, [answers, flagged, currentIdx, screen]);

  const currentQ = validQuestions[currentIdx];

  function startQuiz(resume = false) {
    if (!resume) {
      setAnswers({});
      setFlagged({});
      setCurrentIdx(0);
      clearState();
    }
    setSelectedOption(null);
    setShowAnswer(false);
    setReviewMode(false);
    setQuizComplete(false);
    setScreen("quiz");
  }

  function resetAll() {
    setAnswers({});
    setFlagged({});
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setReviewMode(false);
    setQuizComplete(false);
    clearState();
    setScreen("home");
  }

  function handleSelect(optIdx) {
    if (showAnswer) return;
    setSelectedOption(optIdx);
    setShowAnswer(true);
    const isCorrect = optIdx === currentQ.answer;
    const newAnswers = { ...answers, [currentIdx]: { selected: optIdx, correct: isCorrect } };
    setAnswers(newAnswers);
    saveState({ answers: newAnswers, flagged, currentIdx, screen: "quiz" });
  }

  function goNext() {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      if (currentIdx < total - 1) {
        setCurrentIdx(currentIdx + 1);
        setSelectedOption(null);
        setShowAnswer(answers[currentIdx + 1] !== undefined);
        if (answers[currentIdx + 1] !== undefined) {
          setSelectedOption(answers[currentIdx + 1].selected);
        }
      } else {
        setQuizComplete(true);
        setScreen("result");
      }
      setAnimating(false);
    }, 200);
  }

  function goPrev() {
    if (animating || currentIdx === 0) return;
    setAnimating(true);
    setTimeout(() => {
      const prevIdx = currentIdx - 1;
      setCurrentIdx(prevIdx);
      if (answers[prevIdx] !== undefined) {
        setSelectedOption(answers[prevIdx].selected);
        setShowAnswer(true);
      } else {
        setSelectedOption(null);
        setShowAnswer(false);
      }
      setAnimating(false);
    }, 200);
  }

  function jumpTo(idx) {
    setCurrentIdx(idx);
    if (answers[idx] !== undefined) {
      setSelectedOption(answers[idx].selected);
      setShowAnswer(true);
    } else {
      setSelectedOption(null);
      setShowAnswer(false);
    }
    setScreen("quiz");
  }

  function toggleFlag() {
    const newFlagged = { ...flagged, [currentIdx]: !flagged[currentIdx] };
    setFlagged(newFlagged);
    saveState({ answers, flagged: newFlagged, currentIdx, screen: "quiz" });
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  const hasSaved = Object.keys(loadState()?.answers || {}).length > 0;

  const scorePercent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const answeredPercent = Math.round((answered / total) * 100);

  const getGrade = () => {
    if (scorePercent >= 90) return { grade: "A+", color: "#22c55e", label: "Excellent!" };
    if (scorePercent >= 80) return { grade: "A", color: "#16a34a", label: "Very Good!" };
    if (scorePercent >= 70) return { grade: "B", color: "#3b82f6", label: "Good" };
    if (scorePercent >= 60) return { grade: "C", color: "#f59e0b", label: "Average" };
    return { grade: "D", color: "#ef4444", label: "Needs Improvement" };
  };

  const topicStats = {};
  validQuestions.forEach((q, idx) => {
    if (!topicStats[q.topic]) topicStats[q.topic] = { total: 0, correct: 0 };
    topicStats[q.topic].total++;
    if (answers[idx]?.correct) topicStats[q.topic].correct++;
  });

  if (screen === "home") {
    return (
      <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", padding: "2rem 1rem", background: "var(--color-background-tertiary)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>⚡</div>
            <h1 style={{ fontSize: 28, fontWeight: 500, margin: "0 0 8px", color: "var(--color-text-primary)" }}>Circuit Theory Quiz</h1>
            <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: 15 }}>Network Theory — {total} questions from PSPCL, SSC JE, NPCIL & more</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "2rem" }}>
            {[
              { label: "Total Questions", value: total },
              { label: "Topics Covered", value: Object.keys(topicStats).length },
              { label: "Your Progress", value: `${answeredPercent}%` }
            ].map(({ label, value }) => (
              <div key={label} style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 500, color: "var(--color-text-primary)" }}>{value}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          {answered > 0 && (
            <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>Progress</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{answered}/{total} answered</span>
              </div>
              <div style={{ height: 6, background: "var(--color-background-secondary)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${answeredPercent}%`, background: "#3b82f6", borderRadius: 3, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 13 }}>
                <span style={{ color: "#22c55e" }}>✓ {correct} correct</span>
                <span style={{ color: "#ef4444" }}>✗ {wrong} wrong</span>
                <span style={{ color: "var(--color-text-secondary)" }}>{total - answered} remaining</span>
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {hasSaved && answered > 0 && (
              <button onClick={() => startQuiz(true)} style={{ padding: "14px 24px", borderRadius: 10, background: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 500 }}>
                Resume Quiz (Q{currentIdx + 1})
              </button>
            )}
            <button onClick={() => startQuiz(false)} style={{ padding: "14px 24px", borderRadius: 10, background: hasSaved && answered > 0 ? "var(--color-background-secondary)" : "#1e40af", color: hasSaved && answered > 0 ? "var(--color-text-primary)" : "white", border: "0.5px solid var(--color-border-tertiary)", cursor: "pointer", fontSize: 15 }}>
              {hasSaved && answered > 0 ? "Restart Quiz" : "Start Quiz"}
            </button>
            {answered > 0 && (
              <>
                <button onClick={() => setScreen("result")} style={{ padding: "12px 24px", borderRadius: 10, background: "transparent", border: "0.5px solid var(--color-border-tertiary)", cursor: "pointer", fontSize: 14, color: "var(--color-text-primary)" }}>
                  View Results & Analysis
                </button>
                <button onClick={() => setScreen("overview")} style={{ padding: "12px 24px", borderRadius: 10, background: "transparent", border: "0.5px solid var(--color-border-tertiary)", cursor: "pointer", fontSize: 14, color: "var(--color-text-primary)" }}>
                  Question Navigator
                </button>
              </>
            )}
          </div>

          <div style={{ marginTop: "2.5rem", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem" }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 500 }}>Topics Covered</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {Object.keys(topicStats).sort().map(topic => (
                <span key={topic} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 20, background: "var(--color-background-secondary)", color: "var(--color-text-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
                  {topic} ({topicStats[topic].total})
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem" }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 500 }}>Pro Tips</h3>
            <ul style={{ margin: 0, padding: "0 0 0 1.2rem", color: "var(--color-text-secondary)", fontSize: 13, lineHeight: 2 }}>
              <li>Flag questions you want to review later using the bookmark icon</li>
              <li>Detailed explanations show after each answer — read them carefully</li>
              <li>Your progress is automatically saved — come back anytime</li>
              <li>Use the Navigator to jump to any question directly</li>
              <li>Check the Results page for topic-wise performance analysis</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "overview") {
    const filters = [
      { key: "all", label: "All" },
      { key: "correct", label: "Correct" },
      { key: "wrong", label: "Wrong" },
      { key: "unanswered", label: "Unanswered" },
      { key: "flagged", label: "Flagged" }
    ];
    const filtered = validQuestions.map((q, idx) => ({ q, idx })).filter(({ idx }) => {
      if (filterMode === "correct") return answers[idx]?.correct === true;
      if (filterMode === "wrong") return answers[idx] !== undefined && answers[idx].correct === false;
      if (filterMode === "unanswered") return answers[idx] === undefined;
      if (filterMode === "flagged") return flagged[idx];
      return true;
    });

    return (
      <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", padding: "1.5rem 1rem", background: "var(--color-background-tertiary)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
            <button onClick={() => setScreen("home")} style={{ padding: "8px 16px", borderRadius: 8, border: "0.5px solid var(--color-border-tertiary)", background: "transparent", cursor: "pointer", fontSize: 13 }}>← Back</button>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>Question Navigator</h2>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {filters.map(f => (
              <button key={f.key} onClick={() => setFilterMode(f.key)} style={{ padding: "6px 14px", borderRadius: 20, border: "0.5px solid var(--color-border-tertiary)", background: filterMode === f.key ? "#3b82f6" : "transparent", color: filterMode === f.key ? "white" : "var(--color-text-primary)", cursor: "pointer", fontSize: 13 }}>
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))", gap: 8 }}>
            {filtered.map(({ q, idx }) => {
              const ans = answers[idx];
              const isFlagged = flagged[idx];
              let bg = "var(--color-background-secondary)";
              let color = "var(--color-text-primary)";
              let border = "0.5px solid var(--color-border-tertiary)";
              if (ans?.correct === true) { bg = "#dcfce7"; color = "#166534"; border = "0.5px solid #86efac"; }
              if (ans?.correct === false) { bg = "#fee2e2"; color = "#991b1b"; border = "0.5px solid #fca5a5"; }
              if (isFlagged) border = "2px solid #f59e0b";
              return (
                <button key={idx} onClick={() => jumpTo(idx)} style={{ padding: "10px 4px", borderRadius: 8, border, background: bg, color, cursor: "pointer", fontSize: 12, fontWeight: 500, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <span>{idx + 1}</span>
                  {isFlagged && <span style={{ fontSize: 9 }}>🔖</span>}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: "1.5rem", display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "var(--color-text-secondary)" }}>
            <span>🟢 Correct: {correct}</span>
            <span>🔴 Wrong: {wrong}</span>
            <span>⬜ Unanswered: {total - answered}</span>
            <span>🔖 Flagged: {Object.values(flagged).filter(Boolean).length}</span>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "result") {
    const grade = getGrade();
    const sortedTopics = Object.entries(topicStats).sort((a, b) => (b[1].correct / b[1].total) - (a[1].correct / a[1].total));

    return (
      <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", padding: "1.5rem 1rem", background: "var(--color-background-tertiary)" }}>
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ fontSize: 56, fontWeight: 500, color: grade.color }}>{grade.grade}</div>
            <div style={{ fontSize: 18, color: "var(--color-text-secondary)", marginBottom: 4 }}>{grade.label}</div>
            <div style={{ fontSize: 32, fontWeight: 500 }}>{scorePercent}%</div>
            <div style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>({correct} out of {answered} answered correctly)</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: "2rem" }}>
            {[
              { label: "Score", value: `${correct}/${total}`, color: "#3b82f6" },
              { label: "Correct", value: correct, color: "#22c55e" },
              { label: "Wrong", value: wrong, color: "#ef4444" },
              { label: "Skipped", value: total - answered, color: "#94a3b8" }
            ].map(({ label, value, color }) => (
              <div key={label} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 500, color }}>{value}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: 16, fontWeight: 500 }}>Topic-wise Performance</h3>
            {sortedTopics.map(([topic, stats]) => {
              const pct = Math.round((stats.correct / stats.total) * 100);
              const barColor = pct >= 70 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444";
              return (
                <div key={topic} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                    <span style={{ color: "var(--color-text-primary)" }}>{topic}</span>
                    <span style={{ color: "var(--color-text-secondary)" }}>{stats.correct}/{stats.total} ({pct}%)</span>
                  </div>
                  <div style={{ height: 5, background: "var(--color-background-secondary)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: barColor, borderRadius: 3 }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: 16, fontWeight: 500 }}>Review Wrong Answers</h3>
            {validQuestions.map((q, idx) => {
              const ans = answers[idx];
              if (!ans || ans.correct) return null;
              return (
                <div key={idx} style={{ padding: "12px 0", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, color: "var(--color-text-primary)" }}>
                    Q{idx + 1} (#{q.id}): {q.question.substring(0, 80)}...
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 12 }}>
                    <span style={{ color: "#ef4444" }}>Your answer: {q.options[ans.selected]?.substring(0, 40) || "—"}</span>
                    <span style={{ color: "#22c55e" }}>Correct: {q.options[q.answer]?.substring(0, 40) || "—"}</span>
                  </div>
                  <button onClick={() => jumpTo(idx)} style={{ marginTop: 6, padding: "4px 12px", borderRadius: 6, border: "0.5px solid var(--color-border-tertiary)", background: "transparent", cursor: "pointer", fontSize: 12, color: "var(--color-text-secondary)" }}>
                    Review →
                  </button>
                </div>
              );
            })}
            {wrong === 0 && <p style={{ color: "#22c55e", fontSize: 14, textAlign: "center" }}>🎉 No wrong answers! Perfect score on answered questions.</p>}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setScreen("home")} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "0.5px solid var(--color-border-tertiary)", background: "transparent", cursor: "pointer", fontSize: 14 }}>Home</button>
            <button onClick={resetAll} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: "#1e40af", color: "white", cursor: "pointer", fontSize: 14 }}>Restart Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  const progress = ((currentIdx + 1) / total) * 100;
  const isAnswered = answers[currentIdx] !== undefined;
  const currentAnswer = answers[currentIdx];

  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "var(--color-background-tertiary)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "var(--color-background-primary)", borderBottom: "0.5px solid var(--color-border-tertiary)", padding: "12px 1rem", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <button onClick={() => setScreen("home")} style={{ padding: "6px 12px", borderRadius: 8, border: "0.5px solid var(--color-border-tertiary)", background: "transparent", cursor: "pointer", fontSize: 12 }}>← Menu</button>
            <div style={{ fontSize: 13, color: "var(--color-text-secondary)", textAlign: "center" }}>
              <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>Q {currentIdx + 1}</span> / {total}
              <span style={{ marginLeft: 8, color: "var(--color-text-tertiary)", fontSize: 11 }}>• {currentQ.topic}</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setScreen("overview")} style={{ padding: "6px 10px", borderRadius: 8, border: "0.5px solid var(--color-border-tertiary)", background: "transparent", cursor: "pointer", fontSize: 12 }}>Grid</button>
              <button onClick={toggleFlag} style={{ padding: "6px 10px", borderRadius: 8, border: `0.5px solid ${flagged[currentIdx] ? "#f59e0b" : "var(--color-border-tertiary)"}`, background: flagged[currentIdx] ? "#fef3c7" : "transparent", cursor: "pointer", fontSize: 12, color: flagged[currentIdx] ? "#92400e" : "var(--color-text-primary)" }}>
                {flagged[currentIdx] ? "🔖 Flagged" : "☆ Flag"}
              </button>
            </div>
          </div>
          <div style={{ height: 3, background: "var(--color-background-secondary)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#3b82f6", borderRadius: 2, transition: "width 0.3s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: "var(--color-text-tertiary)" }}>
            <span>✓ {correct} correct</span>
            <span style={{ fontSize: 11 }}>⏱ {formatTime(timeSpent)}</span>
            <span>✗ {wrong} wrong</span>
          </div>
        </div>
      </div>

      {/* Question body */}
      <div style={{ flex: 1, padding: "1.5rem 1rem", maxWidth: 750, margin: "0 auto", width: "100%" }}>
        <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.5rem", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: "var(--color-background-secondary)", color: "var(--color-text-secondary)" }}>#{currentQ.id}</span>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: "var(--color-background-info)", color: "var(--color-text-info)" }}>{currentQ.topic}</span>
            {flagged[currentIdx] && <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: "#fef3c7", color: "#92400e" }}>🔖</span>}
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--color-text-primary)", fontWeight: 500 }}>{currentQ.question}</p>
          <p style={{ margin: "8px 0 0", fontSize: 11, color: "var(--color-text-tertiary)" }}>{currentQ.exam}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.25rem" }}>
          {currentQ.options.map((opt, idx) => {
            let bg = "var(--color-background-primary)";
            let border = "0.5px solid var(--color-border-tertiary)";
            let color = "var(--color-text-primary)";
            let prefix = String.fromCharCode(65 + idx);

            if (showAnswer) {
              if (idx === currentQ.answer) {
                bg = "#f0fdf4"; border = "1.5px solid #22c55e"; color = "#166534";
              } else if (idx === selectedOption && idx !== currentQ.answer) {
                bg = "#fef2f2"; border = "1.5px solid #ef4444"; color = "#991b1b";
              }
            } else if (selectedOption === idx) {
              bg = "var(--color-background-info)"; border = "1.5px solid var(--color-border-info)";
            }

            return (
              <button key={idx} onClick={() => handleSelect(idx)} disabled={showAnswer} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border, background: bg, color, cursor: showAnswer ? "default" : "pointer", textAlign: "left", fontSize: 14, lineHeight: 1.5, display: "flex", gap: 12, alignItems: "flex-start", transition: "all 0.15s ease" }}>
                <span style={{ minWidth: 24, height: 24, borderRadius: "50%", background: showAnswer && idx === currentQ.answer ? "#22c55e" : showAnswer && idx === selectedOption && idx !== currentQ.answer ? "#ef4444" : "var(--color-background-secondary)", color: showAnswer && (idx === currentQ.answer || (idx === selectedOption && idx !== currentQ.answer)) ? "white" : "var(--color-text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, flexShrink: 0 }}>
                  {showAnswer && idx === currentQ.answer ? "✓" : showAnswer && idx === selectedOption && idx !== currentQ.answer ? "✗" : prefix}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div style={{ background: "#f8fafc", border: "0.5px solid var(--color-border-tertiary)", borderLeft: "3px solid #3b82f6", borderRadius: 10, padding: "1.25rem", marginBottom: "1.25rem" }}>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, color: "#1e40af" }}>Explanation</div>
            <pre style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "var(--color-text-primary)", whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{currentQ.explanation}</pre>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
          <button onClick={goPrev} disabled={currentIdx === 0} style={{ padding: "12px 24px", borderRadius: 10, border: "0.5px solid var(--color-border-tertiary)", background: "transparent", cursor: currentIdx === 0 ? "not-allowed" : "pointer", fontSize: 14, opacity: currentIdx === 0 ? 0.4 : 1 }}>
            ← Previous
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            {!showAnswer && (
              <button onClick={() => { setShowAnswer(true); }} style={{ padding: "12px 18px", borderRadius: 10, border: "0.5px solid var(--color-border-tertiary)", background: "transparent", cursor: "pointer", fontSize: 13, color: "var(--color-text-secondary)" }}>
                Skip
              </button>
            )}
            <button onClick={goNext} style={{ padding: "12px 24px", borderRadius: 10, border: "none", background: "#1e40af", color: "white", cursor: "pointer", fontSize: 14 }}>
              {currentIdx === total - 1 ? "Finish Quiz" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}