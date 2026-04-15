import { useState, useEffect, useCallback } from "react";

const QUESTIONS = [
  {
    id: 1,
    q: "Which law states that in any electrical network, the algebraic sum of currents meeting at a point is zero?",
    opts: ["Ohm's law", "Kirchhoff's Voltage Law (KVL)", "Faraday's law", "Kirchhoff's Current Law (KCL)"],
    ans: 3,
    exp: "Kirchhoff's Current Law (KCL) is based on the law of conservation of charge. It states that the algebraic sum of currents at any node equals zero: Σi = 0. This means all current entering a node must equal all current leaving it.",
    topic: "Kirchhoff's Laws"
  },
  {
    id: 2,
    q: "The SI unit of conductivity is:",
    opts: ["Ohm-m", "Ohm/m", "Mho-m", "Mho/m"],
    ans: 3,
    exp: "Conductivity σ = ℓ/(R·A) = meter / (ohm × meter²) = (ohm·meter)⁻¹ = mho/meter. Since Ω⁻¹ = mho, the SI unit of conductivity is Mho/m (also written as S/m or Siemens per meter).",
    topic: "Basic Units"
  },
  {
    id: 3,
    q: "For an ideal current source, the internal resistance is:",
    opts: ["Infinite and connected in parallel", "Zero and connected in parallel", "Infinite and connected in series", "Zero and connected in series"],
    ans: 0,
    exp: "An ideal current source has infinite internal resistance connected in parallel. This ensures it delivers constant current regardless of the load — the infinite parallel resistance means no current is diverted away from the load path.",
    topic: "Sources"
  },
  {
    id: 4,
    q: "Which of the following conductors has the lowest resistivity?",
    opts: ["Aluminium", "Copper", "Gold", "Silver"],
    ans: 3,
    exp: "Descending conductivity order: Ag > Cu > Au > Al. Since resistivity ρ ∝ 1/conductivity, ascending resistivity order is Ag < Cu < Au < Al. Silver (Ag) has the lowest resistivity and is the best conductor.",
    topic: "Material Properties"
  },
  {
    id: 5,
    q: "The energy used by a 1.5 kW heater in 5 minutes is:",
    opts: ["450,000 J", "450 J", "7500 J", "4.5 J"],
    ans: 0,
    exp: "E = P × t = 1.5 × 1000 W × 5 × 60 s = 1500 × 300 = 450,000 J. Always convert kW to W and minutes to seconds before calculating energy.",
    topic: "Power & Energy"
  },
  {
    id: 6,
    q: "Ohm's law is applicable to:",
    opts: ["Semiconductors", "Metallic conductors", "Insulators", "Electrolytes"],
    ans: 1,
    exp: "Ohm's law (V = IR) states that at constant temperature, potential difference is directly proportional to current for a conducting wire. It applies to metallic conductors that maintain linearity. It does NOT apply to semiconductors, insulators, or electrolytes due to non-linear V-I characteristics.",
    topic: "Ohm's Law"
  },
  {
    id: 7,
    q: "Resistance of a conductor is directly proportional to its:",
    opts: ["Length", "Area", "Velocity", "Pressure"],
    ans: 0,
    exp: "R = ρℓ/(σA). Resistance is directly proportional to length (ℓ) and inversely proportional to cross-sectional area (A). Doubling the length doubles resistance; doubling the area halves resistance.",
    topic: "Resistance"
  },
  {
    id: 8,
    q: "A two-coil heater gives maximum heat output when the coils are in:",
    opts: ["Series", "Series parallel", "Parallel", "OFF"],
    ans: 2,
    exp: "For a given voltage, parallel connection gives maximum heat because each coil receives full supply voltage. In series, voltage is shared, reducing current and power. P = V²/R — parallel has lower equivalent resistance, thus higher power.",
    topic: "Power & Energy"
  },
  {
    id: 9,
    q: "Conventional flow of electric current is from:",
    opts: ["+ve to −ve", "−ve to +ve", "Phase to neutral", "Neutral to phase"],
    ans: 0,
    exp: "By convention, electric current flows from positive terminal to negative terminal (high potential to low potential). This is opposite to the actual electron flow. The conventional direction was established before electrons were discovered.",
    topic: "Basic Concepts"
  },
  {
    id: 10,
    q: "Complicated series-parallel combination of resistances are also known as:",
    opts: ["Electrical Networks", "Combinations", "Reactive Circuits", "Tuned Circuits"],
    ans: 0,
    exp: "Complex series-parallel resistor combinations are called Electrical Networks. They involve multiple resistors connected in various combinations and require systematic analysis using network theorems.",
    topic: "Networks"
  },
  {
    id: 11,
    q: "If capacitors are connected in series, effective capacitance is:",
    opts: ["C = C₁ + C₂ + C₃ + …", "1/C = 1/C₁ + 1/C₂ + 1/C₃ + …", "C = 1/C₁ + 1/C₂ + 1/C₃ + …", "C = 1/C₁ − 1/C₂ + 1/C₃"],
    ans: 1,
    exp: "For series capacitors: 1/C_eff = 1/C₁ + 1/C₂ + 1/C₃ + … + 1/Cₙ. This is opposite to resistors in series. The effective capacitance is always less than the smallest individual capacitance in the series combination.",
    topic: "Capacitance"
  },
  {
    id: 12,
    q: "Which of the following is correct for power?",
    opts: ["P = V×I", "P = I²×R", "P = V²/R", "All of the above"],
    ans: 3,
    exp: "All three are correct: P = VI (basic definition). Since V = IR → P = (IR)×I = I²R. Also I = V/R → P = V×(V/R) = V²/R. These are equivalent forms derived from Ohm's law.",
    topic: "Power & Energy"
  },
  {
    id: 13,
    q: "Electric charge is equal to:",
    opts: ["I·t", "I/t", "I²·t", "I²/t"],
    ans: 0,
    exp: "Q = I·t (Coulombs). Electric charge is the product of current (Amperes) and time (seconds). One Coulomb = current of 1 Ampere flowing for 1 second. This is the fundamental relationship between charge, current, and time.",
    topic: "Basic Concepts"
  },
  {
    id: 14,
    q: "The reactance of 1 farad capacitance when connected to DC circuit is:",
    opts: ["Infinite", "1Ω", "0.5Ω", "0Ω"],
    ans: 0,
    exp: "Capacitive reactance Xc = 1/(2πfC). For DC, frequency f = 0, so Xc = 1/(2π×0×1) = ∞ (infinite). A capacitor acts as an open circuit for DC — no steady-state current flows through it.",
    topic: "Capacitance"
  },
  {
    id: 15,
    q: "Unit of electric charge is:",
    opts: ["Tesla", "Henry", "Coulomb", "Farad"],
    ans: 2,
    exp: "The SI unit of electric charge is the Coulomb (C), defined as an ampere-second (A·s). Henry is inductance, Tesla is magnetic flux density, and Farad is capacitance.",
    topic: "Basic Units"
  },
  {
    id: 16,
    q: "In a series combination of resistances, total resistance is given by:",
    opts: ["R = R₁R₂/(R₁+R₂)", "R = 1/R₁ + 1/R₂ + …", "R = R₁ + R₂ + …", "R = V/I"],
    ans: 2,
    exp: "For series resistors: R_total = R₁ + R₂ + R₃ + … + Rₙ. The total resistance is simply the sum of all individual resistances. Current is the same through all, but voltage divides proportionally.",
    topic: "Resistance"
  },
  {
    id: 17,
    q: "A 10Ω resistor connected in parallel with 15Ω, and this combination in series with 12Ω. The equivalent resistance is:",
    opts: ["37 ohm", "27 ohm", "18 ohm", "20 ohm"],
    ans: 2,
    exp: "Step 1: 10Ω ∥ 15Ω = (10×15)/(10+15) = 150/25 = 6Ω. Step 2: 6Ω + 12Ω = 18Ω. Always simplify parallel branches first, then add series resistances.",
    topic: "Resistance"
  },
  {
    id: 18,
    q: "Unit of reactive power is:",
    opts: ["Watt", "KW", "VAR", "VA"],
    ans: 2,
    exp: "Reactive power Q = VI·sinφ, measured in VAR (Volt-Ampere Reactive). True/Active power P = VI·cosφ in Watts. Apparent power S = VI in VA. VAR represents power stored and released by inductors/capacitors.",
    topic: "AC Power"
  },
  {
    id: 19,
    q: "An energy source flows 2A for 10s in a bulb emitting 2.3 kJ. Find voltage drop.",
    opts: ["130 V", "260 V", "115 V", "230 V"],
    ans: 2,
    exp: "H = i²Rt = 2300 J. R = H/(i²t) = 2300/(4×10) = 57.5Ω. Voltage drop = iR = 2×57.5 = 115V. This uses Joule's heating law H = I²Rt to find resistance first.",
    topic: "Power & Energy"
  },
  {
    id: 20,
    q: "Which type of resistor has highest value of temperature coefficient?",
    opts: ["Wire wound", "Carbon film", "Metal film", "Carbon composition"],
    ans: 2,
    exp: "Metal film resistors have the highest temperature coefficient among the given options. They also offer better stability and precision than carbon types. Wire-wound have low TC, carbon types are moderate.",
    topic: "Resistors"
  },
  {
    id: 21,
    q: "If current through conductor is 5A, electrons per second flowing are:",
    opts: ["6.25×10¹⁸", "31.35×10¹⁷", "31.35×10¹⁹", "31.35×10¹⁸"],
    ans: 3,
    exp: "Q = ne → n = Q/e. With I=5A, t=1s: Q = 5C. n = 5/(1.6×10⁻¹⁹) = 31.25×10¹⁸ ≈ 31.35×10¹⁸ electrons/second. Each electron carries charge e = 1.6×10⁻¹⁹ Coulombs.",
    topic: "Basic Concepts"
  },
  {
    id: 22,
    q: "R₁=10Ω, R₂=20Ω in series across 30V DC. Find ratio P₁/P₂:",
    opts: ["1/3", "1/4", "1/2", "2/1"],
    ans: 2,
    exp: "In series, same current flows. I = 30/(10+20) = 1A. P₁ = I²R₁ = 10W, P₂ = I²R₂ = 20W. P₁/P₂ = 10/20 = 1/2. Power ratio equals resistance ratio for series-connected resistors.",
    topic: "Power & Energy"
  },
  {
    id: 23,
    q: "How much energy will a 100W electric bulb spend in two hours?",
    opts: ["72 kJ", "7200 J", "720 J", "720 kJ"],
    ans: 3,
    exp: "E = P×t = 100W × (2×3600s) = 100 × 7200 = 720,000 J = 720 kJ. Convert hours to seconds: 2 hrs = 7200 seconds. Energy is always in Joules = Watts × Seconds.",
    topic: "Power & Energy"
  },
  {
    id: 24,
    q: "A 100W light bulb turned on for 8 hours uses:",
    opts: ["80 Wh", "0.8 kWh", "8 kWh", "None of the above"],
    ans: 1,
    exp: "E = P×t = 0.1kW × 8h = 0.8 kWh. In commercial units, 1 unit = 1 kWh. A 100W = 0.1kW bulb running 8 hours consumes 0.8 kWh (units) of electrical energy.",
    topic: "Power & Energy"
  },
  {
    id: 25,
    q: "About how many times longer can a 10W bulb burn compared to 100W with same energy?",
    opts: ["10 times longer", "100 times longer", "Same time", "None"],
    ans: 0,
    exp: "t = E/P. For same energy E: t₁₀/t₁₀₀ = (E/10)/(E/100) = 100/10 = 10. A 10W bulb burns 10 times longer than a 100W bulb using the same energy — lower wattage means slower energy consumption.",
    topic: "Power & Energy"
  },
  {
    id: 26,
    q: "Capacitance is the ability of a body to store an:",
    opts: ["Electrical charge", "Electric current", "Voltage", "All of the above"],
    ans: 0,
    exp: "Capacitance C = Q/V is the ability of a body to store electrical charge. A capacitor stores energy in the electric field between its plates. Q = CV relates stored charge to voltage and capacitance.",
    topic: "Capacitance"
  },
  {
    id: 27,
    q: "The SI unit of energy is:",
    opts: ["Joule", "Newton", "Coulomb", "Henry"],
    ans: 0,
    exp: "The SI unit of energy is Joule (J). Commercial unit is kWh (kilowatt-hour). 1 kWh = 1000W × 3600s = 3.6×10⁶ J. Newton is force, Coulomb is charge, Henry is inductance.",
    topic: "Basic Units"
  },
  {
    id: 28,
    q: "A 17-inch PC uses ~150W/hour. On for 4 minutes only — power consumption?",
    opts: ["0.1 kW", "0.04 kW", "0.01 kW", "None"],
    ans: 2,
    exp: "60 min → 150W, so 1 min → 150/60 = 2.5W, 4 min → 10W = 0.01 kW. Power is constant at 150W, but energy consumed in 4 min = 150W × (4/60)h = 10 Wh = 0.01 kWh.",
    topic: "Power & Energy"
  },
  {
    id: 29,
    q: "One kilowatt-hour is:",
    opts: ["3.6 mega joules", "2.6 mega joules", "1.6 mega joules", "None"],
    ans: 0,
    exp: "1 kWh = 1000W × 3600s = 3,600,000 J = 3.6×10⁶ J = 3.6 mega joules. This is the standard commercial electrical energy unit — one 'unit' on your electricity bill.",
    topic: "Basic Units"
  },
  {
    id: 30,
    q: "1 Joule of electrical energy equals:",
    opts: ["1 watt·sec", "1 watt", "1 watt/sec", "1 volt·ampere"],
    ans: 0,
    exp: "E = P×t → Joule = Watt × second = watt·sec. Power is energy per unit time: P = E/t, so E = Pt. One joule is the energy consumed when 1 watt of power is used for 1 second.",
    topic: "Basic Units"
  },
  {
    id: 31,
    q: "A varistor is made of:",
    opts: ["Copper", "Carbon film", "Carborundum crystals", "Aluminium"],
    ans: 2,
    exp: "A varistor (Voltage Dependent Resistor/VDR) is made of carborundum (silicon carbide) crystals. Its resistance varies with applied voltage non-linearly. Used for overvoltage protection in circuits.",
    topic: "Resistors"
  },
  {
    id: 32,
    q: "In a circuit with 8A source, 10Ω ∥ 10Ω in series with R, voltage = 100V. Value of R:",
    opts: ["10.0 Ω", "7.5 Ω", "5.0 Ω", "2.5 Ω"],
    ans: 1,
    exp: "10Ω ∥ 10Ω = 5Ω. I=8A, V=100V. Total R = V/I = 100/8 = 12.5Ω. So R = 12.5 - 5 = 7.5Ω. Use voltage divider/Ohm's law after simplifying parallel combination.",
    topic: "Resistance"
  },
  {
    id: 33,
    q: "Two resistors 4Ω and 6Ω in series, supplied by 50V DC. Voltage across 6Ω resistor?",
    opts: ["50V", "20V", "10V", "30V"],
    ans: 3,
    exp: "By voltage divider: V₂ = Vs × R₂/(R₁+R₂) = 50 × 6/(4+6) = 50 × 0.6 = 30V. Voltage divides proportionally to resistance in a series circuit.",
    topic: "Resistance"
  },
  {
    id: 34,
    q: "In circuit with 2Ω, 3Ω, 5Ω in series, if 3Ω across A-B is disconnected, find V_AB:",
    opts: ["100V", "Zero", "50V", "150V"],
    ans: 0,
    exp: "When the 3Ω resistor is disconnected, terminals A-B become open circuit. No current flows, so no voltage drop across other resistors. The full supply voltage (100V) appears across the open terminals A-B.",
    topic: "Networks"
  },
  {
    id: 35,
    q: "For a conductor, if cross-sectional area increases, then:",
    opts: ["Resistance increases", "Resistance decreases", "Current rating decreases", "Resistance unchanged"],
    ans: 1,
    exp: "R = ρℓ/A. Resistance is inversely proportional to cross-sectional area. If area doubles, resistance halves. Larger wires have lower resistance and can carry more current safely.",
    topic: "Resistance"
  },
  {
    id: 36,
    q: "Circuit has 4 resistors (5Ω, 10Ω, 20Ω, 30Ω) in parallel with 100V. Which has least current?",
    opts: ["30Ω", "5Ω", "10Ω", "20Ω"],
    ans: 0,
    exp: "In parallel, same voltage across all. I = V/R → I ∝ 1/R. Higher resistance → lower current. The 30Ω resistor has maximum resistance, so minimum current I = 100/30 = 3.33A.",
    topic: "Resistance"
  },
  {
    id: 37,
    q: "Two bulbs rated same voltage with powers 400W and 100W. Relation between R₁ and R₂?",
    opts: ["R₁ = 4R₂", "R₂ = 4R₁", "R₁ = 2R₂", "R₂ = 2R₁"],
    ans: 1,
    exp: "P = V²/R → R = V²/P. For same voltage: R ∝ 1/P. P₁/P₂ = R₂/R₁ → 400/100 = R₂/R₁ → R₂ = 4R₁. The 100W bulb has 4× the resistance of the 400W bulb.",
    topic: "Power & Energy"
  },
  {
    id: 38,
    q: "Two equal resistors: series then parallel across DC. Ratio of heat dissipated (series:parallel)?",
    opts: ["2:3", "1:2", "4:1", "3:2"],
    ans: 2,
    exp: "Series: Req = 2R, H₁ = i²(2R)t. Parallel: Req = R/2, H₂ = i²(R/2)t. H₁/H₂ = 2R/(R/2) = 4. Heat ratio series:parallel = 4:1 for same current.",
    topic: "Power & Energy"
  },
  {
    id: 39,
    q: "Capacitance of a parallel plate capacitor is given by:",
    opts: ["C = ε₀εᵣd/A", "C = μA/d", "C = A/d", "C = ε₀εᵣA/d"],
    ans: 3,
    exp: "C = ε₀εᵣA/d where ε₀ = absolute permittivity, εᵣ = relative permittivity, A = plate area, d = plate separation. Capacitance increases with area and decreases with plate separation.",
    topic: "Capacitance"
  },
  {
    id: 40,
    q: "An ideal voltage source has:",
    opts: ["Infinite internal resistance", "Zero internal resistance", "Very high internal resistance", "Very low internal resistance"],
    ans: 1,
    exp: "An ideal voltage source has zero internal resistance, so it maintains constant terminal voltage regardless of load current. An ideal voltmeter has infinite resistance. Real voltage sources have small but non-zero internal resistance.",
    topic: "Sources"
  },
  {
    id: 41,
    q: "Estimate the resistance of filament of a 50W, 100V bulb:",
    opts: ["200Ω", "100Ω", "50Ω", "150Ω"],
    ans: 0,
    exp: "R = V²/P = (100)²/50 = 10000/50 = 200Ω. This is the hot resistance of the filament. Note: cold resistance is much lower because tungsten has positive temperature coefficient.",
    topic: "Power & Energy"
  },
  {
    id: 42,
    q: "Two filament lamps 200W/200V and 50W/200V in series across 200V AC. Total power?",
    opts: ["160 W", "80 W", "20 W", "40 W"],
    ans: 3,
    exp: "R₁ = 200²/200 = 200Ω, R₂ = 200²/50 = 800Ω. Series: R_total = 1000Ω. P = V²/R = 200²/1000 = 40W. In series, total power is less than either individual rating.",
    topic: "Power & Energy"
  },
  {
    id: 43,
    q: "Battery: open circuit voltage 2V, terminal voltage 1V supplying 5A. Internal resistance?",
    opts: ["0.6Ω", "0.4Ω", "0.2Ω", "0.1Ω"],
    ans: 2,
    exp: "r = (Voc − Vt)/I = (2−1)/5 = 1/5 = 0.2Ω. The voltage drop across internal resistance = Voc − Vt. Internal resistance causes voltage drop under load condition.",
    topic: "Sources"
  },
  {
    id: 44,
    q: "Three resistances in parallel, total current = 6A. G₁=1S, G₂=3S, G₃=2S. Current through G₃?",
    opts: ["4A", "1A", "6A", "2A"],
    ans: 3,
    exp: "By current division using conductances: I₃ = I_total × G₃/(G₁+G₂+G₃) = 6 × 2/(1+3+2) = 6×2/6 = 2A. Conductance-based current division: current splits proportional to conductance.",
    topic: "Networks"
  },
  {
    id: 45,
    q: "N equal resistors in parallel give 1Ω, in series give 100Ω. Find N and each resistance R:",
    opts: ["20, 10Ω", "5, 20Ω", "20, 5Ω", "10, 10Ω"],
    ans: 3,
    exp: "Parallel: R/n = 1 → R = n. Series: nR = 100 → n×n = 100 → n² = 100 → n = 10. Then R = 10Ω. So 10 resistors each of 10Ω. Verify: parallel = 10/10 = 1Ω ✓, series = 10×10 = 100Ω ✓",
    topic: "Resistance"
  },
  {
    id: 46,
    q: "Circuit has three 9Ω resistors in parallel with 3V source. Power delivered by source?",
    opts: ["12 W", "6 W", "3 W", "9 W"],
    ans: 2,
    exp: "1/Req = 1/9+1/9+1/9 = 3/9 → Req = 3Ω. P = V²/R = 3²/3 = 9/3 = 3W. Parallel combination reduces equivalent resistance, increasing current and power.",
    topic: "Power & Energy"
  },
  {
    id: 47,
    q: "A wire of 12Ω bent into equilateral triangle. Effective resistance between any two corners?",
    opts: ["8/3Ω", "12/3Ω", "2Ω", "10/3Ω"],
    ans: 0,
    exp: "Each arm = 12/3 = 4Ω. Between A-B: one arm (4Ω) in parallel with two arms in series (8Ω). R_eq = (4×8)/(4+8) = 32/12 = 8/3Ω ≈ 2.67Ω.",
    topic: "Networks"
  },
  {
    id: 48,
    q: "Find Req for given complex network: (given answer is 14.4Ω from ESIC JE 2019)",
    opts: ["10Ω", "8Ω", "10Ω", "14.4Ω"],
    ans: 3,
    exp: "Req = [(6∥(3+2)) ∥ (1+5)] + 4 + 8 = [(6×5/11) ∥ 6] + 12 = [30/11 ∥ 6] + 12 = 2.4 + 12 = 14.4Ω. Solve inside-out, simplifying parallel combinations step by step.",
    topic: "Networks"
  },
  {
    id: 49,
    q: "Three capacitors of 10μF connected in series. Equivalent capacitance?",
    opts: ["10 μF", "30 μF", "3/10 μF", "10/3 μF"],
    ans: 3,
    exp: "1/C_eq = 1/10+1/10+1/10 = 3/10 → C_eq = 10/3 μF ≈ 3.33μF. Series capacitors: reciprocal sum. Result is always less than smallest capacitor. Three equal capacitors in series = C/n.",
    topic: "Capacitance"
  },
  {
    id: 50,
    q: "The symbol ⌇⌇⌇ (coil symbol) represents:",
    opts: ["Transformer", "Capacitor", "Resistor", "Inductor"],
    ans: 3,
    exp: "The coil/solenoid symbol represents an inductor. An inductor stores energy in its magnetic field. Inductance L = Nφ/I where N = turns, φ = flux, I = current. Unit is Henry (H).",
    topic: "Components"
  },
  {
    id: 51,
    q: "1 megawatt = ___ watt:",
    opts: ["10³", "10⁶", "10⁵", "10⁴"],
    ans: 1,
    exp: "1 megawatt = 10⁶ watts = 1,000,000 W. Prefixes: kilo(k)=10³, mega(M)=10⁶, giga(G)=10⁹. Similarly 1kW = 10³W. Megawatt is commonly used for power plant outputs.",
    topic: "Basic Units"
  },
  {
    id: 52,
    q: "Which is an example of a vector quantity?",
    opts: ["Magnetic flux density", "Speed", "Power", "Temperature"],
    ans: 0,
    exp: "Magnetic flux density (B = φ/A, in Weber/m²) is a vector — it has both magnitude and direction. Speed, power, and temperature are scalar quantities (magnitude only, no direction).",
    topic: "Basic Concepts"
  },
  {
    id: 53,
    q: "Select correct SI unit matching: Resistance-Ohm, Capacitance-Farad, Energy-Joule, Inductance-Henry:",
    opts: ["1-iv, 2-iii, 3-ii, 4-i", "1-ii, 2-iv, 3-i, 4-iii", "1-i, 2-ii, 3-iii, 4-iv", "1-iv, 2-i, 3-ii, 4-iii"],
    ans: 1,
    exp: "Correct matches: Resistance → Ohm (Ω), Capacitance → Farad (F), Energy → Joule (J), Inductance → Henry (H). These are the fundamental SI units in electrical engineering.",
    topic: "Basic Units"
  },
  {
    id: 54,
    q: "A light bulb rated 100W for 230V supply. Peak voltage of source?",
    opts: ["230 V", "162.65 V", "100 V", "325.22 V"],
    ans: 3,
    exp: "Vm = √2 × Vrms = √2 × 230 = 325.22V. The 230V is the RMS value of AC supply. Peak voltage is always √2 times the RMS value for sinusoidal waveforms.",
    topic: "AC Circuits"
  },
  {
    id: 55,
    q: "1 Wh = ___ J:",
    opts: ["2400", "3600", "1200", "7200"],
    ans: 1,
    exp: "1 Wh = 1W × 3600s = 3600 J. Convert hours to seconds: 1 hour = 60×60 = 3600 seconds. So 1 Watt-hour = 3600 Joules of energy.",
    topic: "Basic Units"
  },
  {
    id: 56,
    q: "How much energy does a 100W bulb consume in one day?",
    opts: ["1200 Wh", "100 Wh", "600 Wh", "2400 Wh"],
    ans: 3,
    exp: "E = P×t = 100W × 24h = 2400 Wh = 2.4 kWh. One day = 24 hours. This means a 100W bulb running all day uses 2.4 units of electricity.",
    topic: "Power & Energy"
  },
  {
    id: 57,
    q: "The symbol shown (circle with arrow pointing up) is:",
    opts: ["Dependent voltage source", "Dependent current source", "Independent current source", "Voltage source"],
    ans: 2,
    exp: "A circle symbol with an arrow represents an independent current source. Independent sources don't depend on other circuit variables. Dependent sources are shown as diamond shapes and their values depend on voltage/current elsewhere in the circuit.",
    topic: "Sources"
  },
  {
    id: 58,
    q: "Ohm's law is NOT valid for:",
    opts: ["Resistors in parallel", "Resistors in series", "Linear inductors", "Zener diode in zener region"],
    ans: 3,
    exp: "Ohm's law (V=IR, linear relationship) is NOT valid for a zener diode in the zener region. In that region, voltage is nearly constant regardless of current — highly non-linear. Resistors (series/parallel) and linear inductors follow Ohm's law.",
    topic: "Ohm's Law"
  },
  {
    id: 59,
    q: "V=−1.6mA across resistor, terminal voltage −6.3V. Calculate R:",
    opts: ["39.4 kΩ", "3.94 kΩ", "394Ω", "394 kΩ"],
    ans: 1,
    exp: "R = V/I = −6.3/(−1.6×10⁻³) = 6.3/0.0016 = 3937.5Ω ≈ 3.94 kΩ. Negative signs cancel. Always check units: mA must be converted to A before dividing.",
    topic: "Ohm's Law"
  },
  {
    id: 60,
    q: "1 kWh is equal to how many kcals (approximately)?",
    opts: ["86 kcals", "8.6 kcals", "860 kcals", "8600 kcal"],
    ans: 2,
    exp: "1 kWh = 3600 kJ. 1 kcal = 4.184 kJ. Therefore: 3600/4.184 ≈ 860.42 kcal ≈ 860 kcal. This conversion is useful for comparing electrical and thermal energy.",
    topic: "Basic Units"
  },
  {
    id: 61,
    q: "Circuit supplied +4V DC with −5A input current. Statement about power?",
    opts: ["Consumes 20W", "Power loss is 20W", "Generates 20W", "Power cannot be computed"],
    ans: 2,
    exp: "P = VI = 4×(−5) = −20W. Negative power means the element is generating (delivering) power, not consuming it. The element acts as a source. Positive power = consuming, Negative power = generating.",
    topic: "Power & Energy"
  },
  {
    id: 62,
    q: "Four resistors in parallel, equivalent = 20Ω. Currents: 0.6, 0.3, 0.2, 0.1A. Each resistor value?",
    opts: ["40Ω, 80Ω, 120Ω, 240Ω", "240Ω each", "40Ω each", "4Ω, 8Ω, 12Ω, 24Ω"],
    ans: 0,
    exp: "Parallel voltage V = I_total × Req = (0.6+0.3+0.2+0.1)×20 = 1.2×20 = 24V. R₁=24/0.6=40Ω, R₂=24/0.3=80Ω, R₃=24/0.2=120Ω, R₄=24/0.1=240Ω. Parallel: same voltage across all.",
    topic: "Resistance"
  },
  {
    id: 63,
    q: "100W/100V lamp to be operated on 250V supply. Additional series resistance needed?",
    opts: ["250 ohms", "100 ohms", "150 ohms", "None of these"],
    ans: 2,
    exp: "Bulb resistance = V²/P = 100²/100 = 100Ω. Rated current = P/V = 1A. For 250V supply with 1A: R_total = 250Ω. External R = 250−100 = 150Ω must be added in series.",
    topic: "Resistance"
  },
  {
    id: 64,
    q: "Three resistances 30Ω, 15Ω, 5Ω in parallel. Combined resistance?",
    opts: ["Greater than 30Ω", "Between 30Ω and 15Ω", "Between 15Ω and 5Ω", "Less than 5Ω"],
    ans: 3,
    exp: "Parallel equivalent is always less than the smallest resistor. 1/Req = 1/30+1/15+1/5 = 1/30+2/30+6/30 = 9/30 → Req = 30/9 = 3.33Ω. This is less than 5Ω (smallest).",
    topic: "Resistance"
  },
  {
    id: 65,
    q: "In resistor with silver color band, tolerance is:",
    opts: ["±5%", "±10%", "±15%", "±20%"],
    ans: 1,
    exp: "Resistor color code tolerance: Gold = ±5%, Silver = ±10%, No band = ±20%. Silver band indicates the resistor value may vary by ±10% from nominal. Gold is more precise than silver.",
    topic: "Resistors"
  },
  {
    id: 66,
    q: "Which type of resistor is used for over-voltage protection?",
    opts: ["Sensistors", "Thermistors", "Varistors", "Inductor"],
    ans: 2,
    exp: "Varistors (VDR — Voltage Dependent Resistors) are used for overvoltage protection. Made of zinc oxide, their resistance drops drastically at high voltages, clamping the voltage and protecting circuits from transients and surges.",
    topic: "Resistors"
  },
  {
    id: 67,
    q: "The ratio of voltage to current in a closed circuit:",
    opts: ["Varies", "Remains constant", "Increases", "Decreases"],
    ans: 1,
    exp: "According to Ohm's law, R = V/I = constant (at constant temperature). The ratio of voltage to current always remains constant for a resistor in a closed circuit — this constant ratio IS the resistance.",
    topic: "Ohm's Law"
  },
  {
    id: 68,
    q: "Frequency of AC emf induced equals:",
    opts: ["Frequency = Time period", "Frequency = 1/2 Time period", "Frequency = 1/Time period", "None"],
    ans: 2,
    exp: "f = 1/T where T is the time period. In AC: 1 revolution = 2π electrical degrees. Time period T = 2π/ω, so f = 1/T = ω/2π. Frequency is the reciprocal of time period.",
    topic: "AC Circuits"
  },
  {
    id: 69,
    q: "Which has negative temperature coefficient of resistance?",
    opts: ["Silver", "Copper", "Aluminum", "Silicon"],
    ans: 3,
    exp: "Ag, Cu, Al are conductors with positive temperature coefficient (resistance increases with temperature). Silicon is a semiconductor with negative temperature coefficient — resistance decreases as temperature rises.",
    topic: "Material Properties"
  },
  {
    id: 70,
    q: "In given circuit with C₁=1μF, C₂=2μF in series across 300V. Voltage across C₁?",
    opts: ["100V", "200V", "150V", "300V"],
    ans: 1,
    exp: "For series capacitors, voltage divides inversely with capacitance: Vc₁ = V×C₂/(C₁+C₂) = 300×2/(1+2) = 200V. Smaller capacitor gets larger voltage share — opposite to resistors.",
    topic: "Capacitance"
  },
  {
    id: 71,
    q: "Which equation does NOT follow Ohm's law?",
    opts: ["R = V/I", "V = IR", "I = V/R", "R = I/V"],
    ans: 3,
    exp: "Ohm's law: V = IR → R = V/I → I = V/R. All three are equivalent forms. R = I/V is dimensionally incorrect and violates Ohm's law (correct form is R = V/I, not I/V).",
    topic: "Ohm's Law"
  },
  {
    id: 72,
    q: "Conductors have ___ specific resistance:",
    opts: ["High", "Low", "Very high", "No"],
    ans: 1,
    exp: "Good conductors (Gold, Copper, Aluminium) have low specific resistance (resistivity). Low resistivity means they allow current to flow easily. Insulators have very high resistivity; semiconductors are in between.",
    topic: "Material Properties"
  },
  {
    id: 73,
    q: "Colour code for 47Ω resistors with ±5% tolerance:",
    opts: ["Yellow-Violet-Black-Gold", "Yellow-Black-Violet-Gold", "Yellow-Violet-Brown-Gold", "Yellow-Violet-Brown-Silver"],
    ans: 0,
    exp: "47Ω = 4,7,×10⁰ → Yellow(4), Violet(7), Black(×1=10⁰), Gold(±5%). 47×1 = 47Ω. Color sequence: Yellow-Violet-Black-Gold. Tolerance band is last: Gold=5%, Silver=10%.",
    topic: "Resistors"
  },
  {
    id: 74,
    q: "Time period of 240V AC supply in India is:",
    opts: ["0.02 seconds", "50 Hz", "0.002 seconds", "55 Hz"],
    ans: 0,
    exp: "Indian supply frequency = 50 Hz. T = 1/f = 1/50 = 0.02 seconds. The frequency of 50 Hz means the current completes 50 cycles per second, each cycle taking 20 milliseconds.",
    topic: "AC Circuits"
  },
  {
    id: 75,
    q: "When two resistors are connected in series: total R = 8Ω; in parallel: equivalent = 2Ω. Values?",
    opts: ["5Ω and 3Ω", "6Ω and 2Ω", "4Ω and 4Ω", "7Ω and 1Ω"],
    ans: 2,
    exp: "Series: R₁+R₂ = 8. Parallel: R₁R₂/(R₁+R₂) = 2 → R₁R₂ = 16. From R₁+R₂=8: (R₁-R₂)² = (R₁+R₂)²-4R₁R₂ = 64-64 = 0 → R₁=R₂=4Ω.",
    topic: "Resistance"
  },
  {
    id: 76,
    q: "One cycle corresponds to ___ electrical degrees:",
    opts: ["180", "270", "90", "360"],
    ans: 3,
    exp: "One complete AC cycle (positive + negative half) = 360 electrical degrees = 2π radians. A sinusoidal wave completing one set of positive and negative values constitutes one cycle = 360°.",
    topic: "AC Circuits"
  },
  {
    id: 77,
    q: "A 200W and 100W bulb at 220V in series across 220V. Power consumed?",
    opts: ["33 W", "100 W", "66 W", "300 W"],
    ans: 2,
    exp: "Series: P_total = P₁×P₂/(P₁+P₂) = (200×100)/(200+100) = 20000/300 = 66.67W ≈ 66W. In series combination, power is less than either individual rating.",
    topic: "Power & Energy"
  },
  {
    id: 78,
    q: "Two capacitors 3μF and 6μF in series total capacitance:",
    opts: ["9 μF", "2 μF", "18 μF", "24 μF"],
    ans: 1,
    exp: "C_total = C₁C₂/(C₁+C₂) = (3×6)/(3+6) = 18/9 = 2μF. For two capacitors in series: product over sum formula. Result (2μF) is less than smallest capacitor (3μF) — always true for series.",
    topic: "Capacitance"
  },
  {
    id: 79,
    q: "If length and area of cross-section both doubled, new resistance of wire?",
    opts: ["Increases 4 times", "Decreases 4 times", "Remains constant", "Changes at random"],
    ans: 2,
    exp: "R = ρℓ/A. New R = ρ(2ℓ)/(2A) = ρℓ/A = R. Resistance remains the same! Doubling both length and area has equal and opposite effects that cancel out perfectly.",
    topic: "Resistance"
  },
  {
    id: 80,
    q: "Energy stored in an inductor is:",
    opts: ["Li/2", "Li²/4", "Li²/2", "Li²/8"],
    ans: 2,
    exp: "Energy stored in inductor: W = ½Li² Joules. This energy is stored in the magnetic field. Compare: capacitor stores ½CV² in electric field. Both store energy proportional to square of their respective quantities.",
    topic: "Inductance"
  },
];

const STORAGE_KEY = "bc1_quiz_state_v2";

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

const initState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  const order = shuffle(QUESTIONS.map((_, i) => i));
  return { order, current: 0, answers: {}, started: false, finished: false, mode: "quiz" };
};

const saveState = state => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
};

const topicColors = {
  "Kirchhoff's Laws": "#4f46e5", "Basic Units": "#0891b2", "Sources": "#7c3aed",
  "Material Properties": "#059669", "Power & Energy": "#d97706", "Ohm's Law": "#dc2626",
  "Resistance": "#2563eb", "Capacitance": "#7c2d12", "Networks": "#1d4ed8",
  "AC Circuits": "#0f766e", "Resistors": "#9333ea", "Basic Concepts": "#15803d",
  "Components": "#c2410c", "AC Power": "#b45309", "Inductance": "#6d28d9"
};

export default function Basic_Circuits1() {
  const [st, setSt] = useState(initState);
  const [reveal, setReveal] = useState(false);
  const [view, setView] = useState("home");
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => { saveState(st); }, [st]);

  const questions = st.order.map(i => QUESTIONS[i]);
  const q = questions[st.current];
  const totalQ = questions.length;
  const answered = Object.keys(st.answers).length;
  const correct = Object.values(st.answers).filter(a => a.correct).length;
  const pct = answered ? Math.round((correct / answered) * 100) : 0;

  const hasSaved = (() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return s.started && !s.finished && Object.keys(s.answers || {}).length > 0;
    } catch { return false; }
  })();

  const startFresh = () => {
    const order = shuffle(QUESTIONS.map((_, i) => i));
    const ns = { order, current: 0, answers: {}, started: true, finished: false };
    setSt(ns); setReveal(false); setView("quiz"); setAnimKey(k => k + 1);
  };

  const resume = () => { setSt(s => ({ ...s, started: true })); setReveal(false); setView("quiz"); };

  const selectAns = idx => {
    if (st.answers[st.current] !== undefined) return;
    const correct = idx === q.ans;
    setSt(s => ({ ...s, answers: { ...s.answers, [s.current]: { chosen: idx, correct } } }));
    setReveal(true);
  };

  const next = () => {
    if (st.current + 1 >= totalQ) {
      setSt(s => ({ ...s, finished: true })); setView("result");
    } else {
      setSt(s => ({ ...s, current: s.current + 1 }));
      setReveal(false); setAnimKey(k => k + 1);
    }
  };

  const prev = () => {
    if (st.current > 0) { setSt(s => ({ ...s, current: s.current - 1 })); setReveal(!!st.answers[st.current - 1]); setAnimKey(k => k + 1); }
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    const ns = initState(); setSt(ns); setReveal(false); setView("home");
  };

  const jumpTo = i => { setSt(s => ({ ...s, current: i })); setReveal(!!st.answers[i]); setView("quiz"); setAnimKey(k => k + 1); };

  if (view === "result") return <ResultView st={st} questions={questions} correct={correct} totalQ={totalQ} pct={pct} onReset={reset} onJump={jumpTo} />;
  if (view === "review") return <ReviewView st={st} questions={questions} onBack={() => setView("quiz")} onJump={jumpTo} />;

  if (view === "home") return (
    <div style={styles.root}>
      <div style={styles.homeWrap}>
        <div style={styles.homeBadge}>⚡ CIRCUIT THEORY</div>
        <h1 style={styles.homeTitle}>Network Theory<br /><span style={{ color: "#6366f1" }}>Quiz Master</span></h1>
        <p style={styles.homeSub}>{QUESTIONS.length} MCQs • Detailed Explanations • Smart Resume</p>

        <div style={styles.statsRow}>
          {[["Questions", QUESTIONS.length], ["Topics", 15], ["From Exams", "SSC/JE/PSC"]].map(([l, v]) => (
            <div key={l} style={styles.statCard}><div style={styles.statVal}>{v}</div><div style={styles.statLbl}>{l}</div></div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {hasSaved && (
            <button style={{ ...styles.btn, background: "#6366f1", color: "#fff" }} onClick={resume}>
              ▶ Resume Quiz ({Object.keys(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}").answers || {}).length}/{QUESTIONS.length} done)
            </button>
          )}
          <button style={{ ...styles.btn, background: hasSaved ? "transparent" : "#6366f1", color: hasSaved ? "#6366f1" : "#fff", border: hasSaved ? "1.5px solid #6366f1" : "none" }} onClick={startFresh}>
            {hasSaved ? "↺ Start Fresh" : "Start Quiz"}
          </button>
        </div>

        <div style={styles.tipBox}>
          <div style={{ fontWeight: 600, marginBottom: 6, color: "#6366f1" }}>💡 Pro Tips</div>
          {["Read each question fully before selecting", "Check explanations to understand the concept", "Attempt all — no negative marking", "Review wrong answers in Result page"].map(t => (
            <div key={t} style={{ fontSize: 13, color: "#94a3b8", marginBottom: 3 }}>• {t}</div>
          ))}
        </div>
      </div>
    </div>
  );

  const ans = st.answers[st.current];
  const progress = ((st.current + (ans ? 1 : 0)) / totalQ) * 100;

  return (
    <div style={styles.root}>
      <div style={styles.quizWrap}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={styles.iconBtn} onClick={() => setView("home")}>⌂</button>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>Network Theory</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={styles.iconBtn} onClick={() => setView("review")}>☰ Review</button>
            <button style={{ ...styles.iconBtn, color: "#f87171" }} onClick={reset}>↺ Reset</button>
          </div>
        </div>

        {/* Progress */}
        <div style={styles.progressWrap}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>

        {/* Stats bar */}
        <div style={styles.statsBar}>
          <span style={{ color: "#94a3b8", fontSize: 13 }}>Q {st.current + 1} / {totalQ}</span>
          <span style={{ ...styles.topicPill, background: topicColors[q.topic] + "22", color: topicColors[q.topic] }}>{q.topic}</span>
          <span style={{ fontSize: 13, color: "#94a3b8" }}>{correct}/{answered} ✓ {pct}%</span>
        </div>

        {/* Question Card */}
        <div key={animKey} style={styles.qCard}>
          <div style={styles.qNum}>Question {st.current + 1}</div>
          <div style={styles.qText}>{q.q}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.opts.map((opt, i) => {
              let bg = "transparent", border = "1.5px solid #1e293b", color = "#e2e8f0";
              if (ans !== undefined) {
                if (i === q.ans) { bg = "#14532d22"; border = "1.5px solid #22c55e"; color = "#4ade80"; }
                else if (i === ans.chosen && !ans.correct) { bg = "#7f1d1d22"; border = "1.5px solid #ef4444"; color = "#f87171"; }
                else { color = "#475569"; }
              }
              return (
                <button key={i} onClick={() => selectAns(i)} disabled={ans !== undefined}
                  style={{ ...styles.optBtn, background: bg, border, color }}>
                  <span style={styles.optLetter}>{["A", "B", "C", "D"][i]}</span>
                  <span style={{ fontSize: 14, textAlign: "left", flex: 1 }}>{opt}</span>
                  {ans !== undefined && i === q.ans && <span style={{ color: "#4ade80", fontSize: 16 }}>✓</span>}
                  {ans !== undefined && i === ans.chosen && !ans.correct && <span style={{ color: "#f87171", fontSize: 16 }}>✗</span>}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {(reveal || ans !== undefined) && (
            <div style={styles.expBox}>
              <div style={{ fontWeight: 600, color: "#6366f1", marginBottom: 8, fontSize: 13 }}>📖 Explanation</div>
              <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>{q.exp}</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={styles.navRow}>
          <button style={{ ...styles.navBtn, opacity: st.current === 0 ? 0.3 : 1 }} onClick={prev} disabled={st.current === 0}>← Prev</button>
          {ans === undefined
            ? <button style={{ ...styles.navBtn, background: "#1e293b", color: "#475569" }} disabled>Select answer</button>
            : st.current + 1 >= totalQ
              ? <button style={{ ...styles.navBtn, background: "#6366f1", color: "#fff" }} onClick={next}>Finish Quiz →</button>
              : <button style={{ ...styles.navBtn, background: "#6366f1", color: "#fff" }} onClick={next}>Next →</button>
          }
        </div>
      </div>
    </div>
  );
}

function ResultView({ st, questions, correct, totalQ, pct, onReset, onJump }) {
  const wrong = questions.filter((_, i) => st.answers[i] && !st.answers[i].correct);
  const skipped = totalQ - Object.keys(st.answers).length;
  const topicStats = {};
  questions.forEach((q, i) => {
    if (!topicStats[q.topic]) topicStats[q.topic] = { correct: 0, total: 0 };
    topicStats[q.topic].total++;
    if (st.answers[i]?.correct) topicStats[q.topic].correct++;
  });
  const grade = pct >= 90 ? ["🏆 Excellent!", "#fbbf24"] : pct >= 70 ? ["✅ Good Job!", "#22c55e"] : pct >= 50 ? ["📚 Keep Practicing", "#6366f1"] : ["💪 Need More Study", "#f87171"];

  return (
    <div style={styles.root}>
      <div style={{ ...styles.quizWrap, maxWidth: 720 }}>
        <div style={{ textAlign: "center", padding: "2rem 0 1rem" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>
            {pct >= 90 ? "🏆" : pct >= 70 ? "⭐" : pct >= 50 ? "📘" : "💡"}
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: grade[1], margin: "0 0 8px" }}>{grade[0]}</h2>
          <div style={{ fontSize: 52, fontWeight: 800, color: "#e2e8f0", marginBottom: 4 }}>{pct}%</div>
          <div style={{ color: "#94a3b8", fontSize: 14 }}>Score: {correct}/{totalQ} correct</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, margin: "1.5rem 0" }}>
          {[["✅ Correct", correct, "#22c55e"], ["❌ Wrong", totalQ - correct - skipped, "#f87171"], ["⏭ Skipped", skipped, "#f59e0b"]].map(([l, v, c]) => (
            <div key={l} style={{ ...styles.statCard, borderColor: c + "44" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: c }}>{v}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Topic breakdown */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", marginBottom: 10 }}>TOPIC BREAKDOWN</div>
          {Object.entries(topicStats).map(([topic, { correct: c, total: t }]) => {
            const tp = Math.round((c / t) * 100);
            const col = topicColors[topic] || "#6366f1";
            return (
              <div key={topic} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "#cbd5e1" }}>{topic}</span>
                  <span style={{ color: col }}>{c}/{t} ({tp}%)</span>
                </div>
                <div style={{ height: 5, background: "#1e293b", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${tp}%`, background: col, borderRadius: 3, transition: "width 1s ease" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Wrong answers review */}
        {wrong.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#f87171", marginBottom: 10 }}>REVIEW WRONG ANSWERS</div>
            {wrong.map((q, idx) => {
              const qi = questions.indexOf(q);
              const ua = st.answers[qi];
              return (
                <div key={q.id} style={{ background: "#1e293b", borderRadius: 10, padding: "14px 16px", marginBottom: 10, border: "1px solid #7f1d1d44" }}>
                  <div style={{ fontSize: 13, color: "#e2e8f0", marginBottom: 8 }}>Q{qi + 1}. {q.q}</div>
                  <div style={{ fontSize: 12, color: "#f87171", marginBottom: 4 }}>✗ Your answer: {q.opts[ua.chosen]}</div>
                  <div style={{ fontSize: 12, color: "#4ade80", marginBottom: 8 }}>✓ Correct: {q.opts[q.ans]}</div>
                  <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{q.exp}</div>
                  <button onClick={() => onJump(qi)} style={{ ...styles.navBtn, marginTop: 8, fontSize: 12, padding: "6px 14px", background: "#6366f1", color: "#fff" }}>Review this question</button>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ ...styles.btn, flex: 1, background: "#6366f1", color: "#fff" }} onClick={onReset}>↺ New Quiz</button>
        </div>
      </div>
    </div>
  );
}

function ReviewView({ st, questions, onBack, onJump }) {
  const topics = [...new Set(questions.map(q => q.topic))];
  const [filter, setFilter] = useState("all");
  const filtered = questions.filter((q, i) => {
    if (filter === "correct") return st.answers[i]?.correct;
    if (filter === "wrong") return st.answers[i] && !st.answers[i].correct;
    if (filter === "unanswered") return st.answers[i] === undefined;
    if (filter !== "all") return q.topic === filter;
    return true;
  });

  return (
    <div style={styles.root}>
      <div style={{ ...styles.quizWrap, maxWidth: 720 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
          <button style={styles.iconBtn} onClick={onBack}>← Back</button>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#e2e8f0" }}>Question Review</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "1.5rem" }}>
          {[["all", "All"], ["correct", "✅ Correct"], ["wrong", "❌ Wrong"], ["unanswered", "⬜ Unanswered"], ...topics.map(t => [t, t])].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)}
              style={{ fontSize: 12, padding: "5px 12px", borderRadius: 20, border: "1px solid", borderColor: filter === v ? "#6366f1" : "#1e293b", background: filter === v ? "#6366f1" : "transparent", color: filter === v ? "#fff" : "#64748b", cursor: "pointer" }}>
              {l}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(48px, 1fr))", gap: 8 }}>
          {filtered.map((q) => {
            const i = questions.indexOf(q);
            const a = st.answers[i];
            const col = a ? (a.correct ? "#22c55e" : "#f87171") : "#1e293b";
            return (
              <button key={i} onClick={() => onJump(i)}
                style={{ aspectRatio: "1", borderRadius: 8, border: `1.5px solid ${col}`, background: col + "22", color: a ? col : "#475569", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {i + 1}
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && <div style={{ textAlign: "center", color: "#475569", padding: "2rem" }}>No questions match this filter.</div>}
      </div>
    </div>
  );
}

const styles = {
  root: { minHeight: "100vh", background: "#0f172a", padding: "1rem", fontFamily: "'DM Mono', 'Fira Code', monospace" },
  homeWrap: { maxWidth: 500, margin: "0 auto", paddingTop: "2rem" },
  quizWrap: { maxWidth: 640, margin: "0 auto" },
  homeBadge: { display: "inline-block", background: "#6366f122", color: "#818cf8", fontSize: 12, fontWeight: 700, letterSpacing: 2, padding: "4px 12px", borderRadius: 20, border: "1px solid #6366f144", marginBottom: 16 },
  homeTitle: { fontSize: 36, fontWeight: 800, color: "#e2e8f0", lineHeight: 1.2, marginBottom: 8 },
  homeSub: { fontSize: 14, color: "#64748b", marginBottom: 24 },
  statsRow: { display: "flex", gap: 10, marginBottom: 24 },
  statCard: { flex: 1, background: "#1e293b", borderRadius: 10, padding: "14px 10px", textAlign: "center", border: "1px solid #334155" },
  statVal: { fontSize: 20, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 },
  statLbl: { fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 },
  btn: { padding: "14px 24px", borderRadius: 10, border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "opacity .2s" },
  tipBox: { marginTop: 24, background: "#1e293b", borderRadius: 12, padding: 16, border: "1px solid #334155" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, marginBottom: 12 },
  iconBtn: { background: "transparent", border: "1px solid #1e293b", color: "#94a3b8", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer" },
  progressWrap: { height: 4, background: "#1e293b", borderRadius: 2, marginBottom: 12, overflow: "hidden" },
  progressBar: { height: "100%", background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 2, transition: "width .4s ease" },
  statsBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  topicPill: { fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, letterSpacing: 0.5 },
  qCard: { background: "#1e293b", borderRadius: 14, padding: "20px", border: "1px solid #334155", marginBottom: 14, animation: "fadeIn .25s ease" },
  qNum: { fontSize: 11, color: "#6366f1", fontWeight: 700, letterSpacing: 1, marginBottom: 8 },
  qText: { fontSize: 16, color: "#e2e8f0", lineHeight: 1.6, marginBottom: 20, fontWeight: 500 },
  optBtn: { width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, cursor: "pointer", transition: "all .15s", fontFamily: "inherit" },
  optLetter: { width: 26, height: 26, borderRadius: 6, background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#64748b", flexShrink: 0 },
  expBox: { marginTop: 16, background: "#0f172a", borderRadius: 10, padding: 14, borderLeft: "3px solid #6366f1" },
  navRow: { display: "flex", gap: 10 },
  navBtn: { flex: 1, padding: "13px", borderRadius: 10, border: "1px solid #334155", background: "transparent", color: "#e2e8f0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
};
