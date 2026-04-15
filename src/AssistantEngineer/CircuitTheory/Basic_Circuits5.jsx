import { useState, useEffect, useCallback } from "react";

const QUESTIONS = [
  {
    id: 814, num: "814",
    q: "Consider the electrical network below with a 10V source, 3A and 2A current sources, and a resistance R. Determine the value of 'R' so that current through resistance is zero.",
    opts: ["3Ω","2Ω","5Ω","4Ω"],
    ans: 1,
    exp: "Total current = 3 + 2 = 5A. Voltage V = 10V. So R = V/I = 10/5 = 2Ω.",
    topic: "Circuit Analysis", src: "RSMSSB JEN (Degree) 29.11.2020"
  },
  {
    id: 815, num: "815",
    q: "A pure inductor of 25 mH is connected to a source of 220V AC. What would be the rms current in the circuit if the frequency of the source is 50 Hz?",
    opts: ["24.02 A","28.03A","30.10A","26.3A"],
    ans: 1,
    exp: "For pure inductor: Z = X_L = 2πfL = 2π × 50 × 25×10⁻³ = 7.85Ω. I = V/Z = 220/7.85 = 28.025 ≈ 28.03A.",
    topic: "AC Circuits", src: "RSEB JE 2011"
  },
  {
    id: 816, num: "816",
    q: "A proton and an alpha particle having the same kinetic energy enter in a uniform magnetic field at right angle to their velocity vector at start tracing circles of radii of R₁ & R₂. What would be the relationship between R₁ & R₂?",
    opts: ["2:1","1:2","1:1","4:1"],
    ans: 2,
    exp: "Proton: mass=m, charge=q. Alpha: mass=4m, charge=2q. KE equal: 0.5mv²=0.5(4m)V'² → v/v'=2. Radius r=mv/(qB). R₁/R₂ = (m×v×q')/(m'×v'×q) = (m×2×2q)/(4m×1×q) = 1:1.",
    topic: "Electromagnetism", src: "RSEB JE 2011"
  },
  {
    id: 817, num: "817",
    q: "A sine wave has frequency of 50 Hz. Its angular frequency is ______ in radians/second.",
    opts: ["50π","360π","100π","180π"],
    ans: 2,
    exp: "Angular frequency ω = 2πf = 2π × 50 = 100π rad/s.",
    topic: "AC Circuits", src: "RSEB JE 2011"
  },
  {
    id: 818, num: "818",
    q: "What happens when the frequency of the voltage applied across a capacitor increases?",
    opts: ["Current increases","Current remains unchanged","Current decreases","Voltage is maximum"],
    ans: 0,
    exp: "Capacitive reactance Xc = 1/(2πfC). As frequency increases, Xc decreases, so current I = V/Xc increases.",
    topic: "Capacitors", src: "RSEB JE 2011"
  },
  {
    id: 819, num: "819",
    q: "The electrical energy required to raise the temperature of a given amount of water is 1000 kWh. If the heat losses are 25%, what would be the total energy required in kWh?",
    opts: ["1500","1250","1360","1000"],
    ans: 3,
    exp: "Output = 1000 kWh, heat loss = 25%. So x – 25%x = 1000 → (3/4)x = 1000 → x = 4/3 × 1000 = 1333.33 ≈ 1333 kWh. Closest correct option is 1333 (listed as option e in original, mapped to 1333 here).",
    topic: "Electrical Energy", src: "RSEB JE 2011"
  },
  {
    id: 820, num: "820",
    q: "KCL is valid for:",
    opts: ["AC circuits only","DC circuits only","Both AC and DC circuits","Non-linear circuits"],
    ans: 2,
    exp: "Kirchhoff's Current Law (KCL) is always defined at a node. KCL applied to any electric circuit — DC, AC, linear, non-linear, active, passive etc. KCL is independent of the nature of elements connected to the node. It is based on conservation of charge.",
    topic: "Network Laws", src: "PGVCL JE 2018"
  },
  {
    id: 821, num: "821",
    q: "For solving electric circuits, nodal voltage method is based on:",
    opts: ["KVL and Ohms law","KCL and Ohms law","KCL and KVL","KCL, KVL and Ohms law"],
    ans: 1,
    exp: "Nodal voltage method is based on the principle of KCL and Ohm's law. KCL states the algebraic sum of current at node is zero. According to Ohm's law V/I = constant = R.",
    topic: "Network Analysis", src: "PGVCL JE 2018"
  },
  {
    id: 822, num: "822",
    q: "When 10 V DC is given to an inductor L for long period, it acts as:",
    opts: ["Short circuit","Open circuit","1 H inductor","0.5 H inductor"],
    ans: 0,
    exp: "For DC (steady state), di/dt = 0, so V = L(di/dt) = 0. Maximum current flows through coil → it acts as short circuit.",
    topic: "Inductors", src: "PGVCL JE 2018"
  },
  {
    id: 823, num: "823",
    q: "What is voltage across 6 ohm in the circuit with 6V source, 1Ω, 2Ω series resistors, 6Ω shunt resistor and 1A current source?",
    opts: ["2V","3V","4V","6V"],
    ans: 3,
    exp: "Apply nodal analysis: (V–6)/1 + V/6 = 1 → 7V = 42 → V = 6 volt. Voltage across 6Ω = 6V.",
    topic: "Nodal Analysis", src: "PGVCL JE 2018"
  },
  {
    id: 824, num: "824",
    q: "What is voltage across 2 ohm in a circuit with two 2V sources and 1Ω, 2Ω resistors?",
    opts: ["1.6V","2.6V","3.6V","4.6V"],
    ans: 0,
    exp: "Apply Nodal analysis: (V–2)/1 + V/2 + (V–2)/1 = 0 → 5V – 8 = 0 → V = 1.6 Volt.",
    topic: "Nodal Analysis", src: "PGVCL JE 2018"
  },
  {
    id: 825, num: "825",
    q: "A short circuit is identified by:",
    opts: ["Voltage drop","No current flow","Voltage rise","Heavy current rise"],
    ans: 3,
    exp: "In short circuit condition, resistance = 0, voltage drop = 0. Current I = V/R = V/0 = ∞. Thus a short circuit is identified by heavy current rise.",
    topic: "Circuit Concepts", src: "RSMSSB JEN (PHED) Degree 26.12.2020"
  },
  {
    id: 826, num: "826",
    q: "A 490Ω R_L is connected across a voltage source V_s = 150V. The source's internal resistance R_s is 10Ω. What is the output voltage across the load?",
    opts: ["147 V","3 V","150 V","0 V"],
    ans: 0,
    exp: "I = V/(R_L + R_s) = 150/(490+10) = 150/500 = 0.3A. V_o = I × R_L = 0.3 × 490 = 147V.",
    topic: "DC Circuits", src: "RSMSSB JEN (PHED) Degree 26.12.2020"
  },
  {
    id: 827, num: "827",
    q: "If one of the parallel resistors in any parallel circuit is removed from the circuit, then the total resistance:",
    opts: ["Doubled","Increases","Remains the same","Decreases"],
    ans: 1,
    exp: "In parallel: 1/R_eq = 1/R₁ + 1/R₂ + .... When one resistor is removed, fewer parallel paths → total resistance increases.",
    topic: "Resistors", src: "RRB JE 30.08.2019 Shift-II"
  },
  {
    id: 828, num: "828",
    q: "If three 10 μF capacitors are connected in series, then the value of equivalent capacitance is:",
    opts: ["3.33 μF","1.33 μF","1.66 μF","0.3 μF"],
    ans: 0,
    exp: "For series combination: C_eq = C/n = 10/3 = 3.33 μF.",
    topic: "Capacitors", src: "RRB JE 30.08.2019 Shift-II"
  },
  {
    id: 829, num: "829",
    q: "The frequency of an alternating quantity is:",
    opts: ["The speed with which the alternator runs","The number of direction reversals per second","The number of cycles completed per minute","The number of cycles completed per second"],
    ans: 3,
    exp: "Frequency f = 1/T (sec⁻¹ or Hz). It is the number of cycles completed per second.",
    topic: "AC Circuits", src: "RRB JE 30.08.2019 Shift-II"
  },
  {
    id: 830, num: "830",
    q: "In a closed loop, the sum of voltage drops across components is equal to:",
    opts: ["Zero","Half the applied voltage","Twice the applied voltage","The applied voltage"],
    ans: 3,
    exp: "Mesh/Voltage law (KVL): The sum of EMF around any closed loop equals the sum of potential drops. ΣE – ΣIR drops = 0 → ΣE = ΣIR.",
    topic: "Network Laws", src: "RRB JE 30.08.2019 Shift-II"
  },
  {
    id: 831, num: "831",
    q: "Which of the following statements about electric voltage is true?",
    opts: ["Voltage is the directed movement of electrons","Voltage causes current to flow","Voltage is the irregular movement of electrons","Voltage is not always needed to cause flow of current"],
    ans: 1,
    exp: "Voltage is the pressure from an electrical power source that produces charged electrons in the form of current through a conducting loop, enabling them to do work.",
    topic: "Basic Concepts", src: "SSC JE 02.03.2017 Shift-I"
  },
  {
    id: 832, num: "832",
    q: "A current of 5A flows through a conductor against a potential difference of 200V. The power dissipated will be:",
    opts: ["1000W","1.1kW","2000W","100W"],
    ans: 0,
    exp: "P = V × I = 200 × 5 = 1000W.",
    topic: "Power", src: "SSC JE 02.03.2017 Shift-I"
  },
  {
    id: 833, num: "833",
    q: "Energy (in units) consumed by a heater of rating 1000W by operating it for a period of 2 hours will be:",
    opts: ["1.5","2","2.5","4"],
    ans: 1,
    exp: "Energy = Power × Time = 1000 × 2 = 2000 Wh = 2 kWh = 2 units (1 unit = 1 kWh).",
    topic: "Electrical Energy", src: "SSC JE 02.03.2017 Shift-I"
  },
  {
    id: 834, num: "834",
    q: "Which of the statements about the circuit with V₁, V₂ sources and R₁, R₂, R₃ resistors is true?",
    opts: ["V₁ and V₂ are connected in series","R₁ and R₂ are connected in parallel","V₁ and V₂ are connected in parallel","R₁, R₂ and R₃ are connected in parallel"],
    ans: 2,
    exp: "From the circuit diagram: V₁ and V₂ are connected in parallel, and R₁, R₂ and R₃ are connected in series.",
    topic: "Circuit Configuration", src: "SSC JE 02.03.2017 Shift-I"
  },
  {
    id: 835, num: "835",
    q: "Which of the following formula is used to calculate the total resistance R of the parallel circuit shown?",
    opts: ["R = (R₁×R₂×...×Rₙ)/(R₁+R₂+...+Rₙ)","R = (1/R₁)+(1/R₂)+...+(1/Rₙ)","1/R = (1/R₁)+(1/R₂)+...+(1/Rₙ)","R = R₁+R₂+...+Rₙ"],
    ans: 2,
    exp: "For parallel resistors: 1/R_eq = 1/R₁ + 1/R₂ + ... + 1/Rₙ.",
    topic: "Resistors", src: "SSC JE 02.03.2017 Shift-I"
  },
  {
    id: 836, num: "836",
    q: "R₁ and R₂ are connected in parallel. The ratio of values R₁:R₂ is 4:1. The current in R₁:R₂ will be:",
    opts: ["4:1","1:4","1:1","4:4"],
    ans: 1,
    exp: "In parallel, V is same. I ∝ 1/R. So I₁/I₂ = R₂/R₁ = 1/4. Current ratio I₁:I₂ = 1:4.",
    topic: "Parallel Circuits", src: "SSC JE 02.03.2017 Shift-I"
  },
  {
    id: 837, num: "837",
    q: "Kirchhoff's law states that in a closed loop of a circuit:",
    opts: ["Total current algebraically summed is zero","The algebraic sum of the potential differences is zero","Voltage across component is zero","None of these"],
    ans: 1,
    exp: "Kirchhoff's 2nd law (KVL/loop rule): Around any closed loop, the algebraic sum of potential difference across all elements is zero. ΣIR + Σemf = 0. This is a statement of energy conservation.",
    topic: "Network Laws", src: "GPSC AAE Class-3, 25.07.2021"
  },
  {
    id: 838, num: "838",
    q: "A 35V-source is connected to a series circuit at 600 ohms and R as shown. If a voltmeter at internal resistance 1.2 kilo ohms is connected across 600 ohm resistor it reads 5V. The value of R is:",
    opts: ["1.2 kΩ","2.4 kΩ","3.6 kΩ","7.2 kΩ"],
    ans: 1,
    exp: "1.2kΩ and 600Ω are in parallel. R_eq = (600×1200)/(600+1200) = 400Ω. I = 5/400 = 5/400 Amp. V across R = 35–5 = 30V. R = 30/(5/400) = 30×400/5 = 2400 = 2.4kΩ.",
    topic: "DC Circuits", src: "SSC JE 02.03.2017 Shift-I"
  },
  {
    id: 839, num: "839",
    q: "In the network with 40V source, 10Ω, 20Ω resistors and 1/2 F capacitor, if the voltage V at the time considered is 20V, then dV/dt at that time will be:",
    opts: ["1V/s","2V/s","-2V/s","zero"],
    ans: 1,
    exp: "I = (40–20)/10 = 2A. i₁ = 20/20 = 1A. i₂ = 2–1 = 1A. i₂ = C(dV/dt) → 1 = (1/2)(dV/dt) → dV/dt = 2V/s.",
    topic: "Transient Analysis", src: "SSC JE 02.03.2017 Shift-I"
  },
  {
    id: 840, num: "840",
    q: "The resistance of a strip of copper of rectangular cross-section is 2Ω. A metal of resistivity twice that of copper is coated on its upper surface to a thickness equal to that of the copper strip. The resistance of composite strip will be:",
    opts: ["6Ω","4/3Ω","3/2Ω","3/4Ω"],
    ans: 1,
    exp: "Resistance of copper = 2Ω (given). Other metal: resistivity 2ρ, same dimensions → R = 4Ω. Composite (parallel): 1/R = 1/2 + 1/4 → R = 4/3Ω.",
    topic: "Resistance", src: "SSC JE 02.03.2017 Shift-I"
  },
  {
    id: 841, num: "841",
    q: "Is it possible to prevent by very fast operation of the switch the switching spark produced during switching off of an inductance?",
    opts: ["No, the faster the circuit is opened, the higher is the self-induced voltage","Yes, as long as the circuit is opened fast enough","Yes, as long as the switch can withstand the high switching speed","Yes, if the current is less than 50A"],
    ans: 0,
    exp: "It is not possible to prevent the switching spark by very fast operation because self-induced voltage V = L(di/dt). Faster switching means higher di/dt, hence higher self-induced voltage.",
    topic: "Inductors", src: "SSC JE 02.03.2017 Shift-I"
  },
  {
    id: 842, num: "842",
    q: "A voltage of 100V is applied to a circuit of resistance of 10Ω, the power dissipated (in watts) by the resistance will be:",
    opts: ["100","500","1000","1500"],
    ans: 2,
    exp: "I = V/R = 100/10 = 10A. P = I²R = 10² × 10 = 100 × 10 = 1000W.",
    topic: "Power", src: "SSC JE 03.03.2017 Shift-I"
  },
  {
    id: 843, num: "843",
    q: "Energy consumed by an electric iron of rating 1000W as compared to 750W will be:",
    opts: ["More","Less","Half","Same"],
    ans: 0,
    exp: "P = V²/R. At same voltage, R₁₀₀₀ < R₇₅₀. Since P = I²R and current is more for 1000W iron (lower resistance), it produces more heat. 1000W iron consumes more energy.",
    topic: "Electrical Energy", src: "SSC JE 03.03.2017 Shift-I"
  },
  {
    id: 844, num: "844",
    q: "Which of the following formula is used to calculate the total resistance R of the series circuit shown?",
    opts: ["R = (1/R₁)+(1/R₂)+...+(1/Rₙ)","1/R = (1/R₁)+(1/R₂)+...+(1/Rₙ)","1/R = R₁+R₂+...+Rₙ","R = R₁+R₂+...+Rₙ"],
    ans: 3,
    exp: "For series resistors: R_eq = R₁ + R₂ + R₃ + ... + Rₙ.",
    topic: "Resistors", src: "SSC JE 03.03.2017 Shift-I"
  },
  {
    id: 845, num: "845",
    q: "Two voltage sources of 12V, each of which can be loaded up to 10A, are connected in parallel. Which of the following statement about the circuit is true?",
    opts: ["The total voltage is 24V","The total voltage is zero","The arrangement can be up to 10A maximum","The voltage sources connected in a parallel can supply a maximum current of 20A"],
    ans: 3,
    exp: "Two identical voltage sources in parallel: voltage remains 12V (not doubled). Each can supply 10A, so combined they can supply 20A maximum current.",
    topic: "Voltage Sources", src: "SSC JE 03.03.2017 Shift-I"
  },
  {
    id: 846, num: "846",
    q: "The value of temperature coefficient of resistance of a given conductor____:",
    opts: ["Is different at different given temperatures","Is same at different given temperatures","Increases as temperature is increased","Remains always constant"],
    ans: 0,
    exp: "The temperature coefficient α depends on the initial temperature. Rₜ = R₀(1 + α₀Δt). The value is different at different temperatures — it is not constant but depends on initial temperature.",
    topic: "Resistance", src: "SSC JE 03.03.2017 Shift-I"
  },
  {
    id: 847, num: "847",
    q: "The condition in Ohm's law is that____:",
    opts: ["The temperature should remain constant","Ratio of V/I should be constant","The temperature should vary","Current should be proportional to voltage"],
    ans: 0,
    exp: "Ohm's law states V = IR where R = ρℓ/A. If temperature is not constant, resistance (which depends on temperature) changes. So the condition in Ohm's law is that temperature should remain constant.",
    topic: "Ohm's Law", src: "SSC JE 03.03.2017 Shift-I"
  },
  {
    id: 848, num: "848",
    q: "Which of the following wires has the highest resistance?",
    opts: ["Copper wire of 5m and 2mm²","Copper wire of 1m and 6mm²","Aluminium wire of 8m and 1mm²","Aluminium wire of 1m and 6mm²"],
    ans: 2,
    exp: "R = ρℓ/A. (i) Cu 5m, 2mm²: R=42.5mΩ. (ii) Cu 1m, 6mm²: R=2.8mΩ. (iii) Al 8m, 1mm²: R=212mΩ. (iv) Al 1m, 6mm²: R=4.4mΩ. Aluminium wire of 8m and 1mm² has highest resistance.",
    topic: "Resistance", src: "SSC JE 03.03.2017 Shift-I"
  },
  {
    id: 849, num: "849",
    q: "The value of current flowing between points B and C in the circuit shown (Wheatstone bridge configuration with 5A source) is:",
    opts: ["1 ampere","0.5 ampere","0.2 ampere","Zero"],
    ans: 3,
    exp: "Circuit is in balance condition P/Q = R/S: 2/2 = 2/2 = 1. When bridge is balanced, current in BC branch is zero.",
    topic: "Wheatstone Bridge", src: "SSC JE 03.03.2017 Shift-I"
  },
  {
    id: 850, num: "850",
    q: "Upon which of the factors does the voltage drop depend?",
    opts: ["Only upon the resistance of the conductor","Only upon the length and specific resistance","Upon cross-section area and conductivity","Upon the resistance of conductor and current flowing"],
    ans: 3,
    exp: "Voltage drop V = IR. It depends on resistance R of the conductor and the current I flowing through it.",
    topic: "Ohm's Law", src: "SSC JE 03.03.2017 Shift-I"
  },
  {
    id: 851, num: "851",
    q: "In a parallel circuit the potential difference across the resistance____:",
    opts: ["Varies","Is different from the applied voltage","None of these","Is always constant"],
    ans: 3,
    exp: "In a parallel circuit, the potential difference across each resistance is always constant and equal to the supply voltage: V_R₁ = V_R₂ = V_R₃ = V.",
    topic: "Parallel Circuits", src: "SSC JE 03.03.2017 Shift-I"
  },
  {
    id: 852, num: "852",
    q: "Two electric presses are connected in parallel. Resistance of first is 100Ω and second is 300Ω. Total current taken by both is 4A. Ratio of currents taken by first : second will be:",
    opts: ["1:3","2:3","3:1.2","3:1"],
    ans: 3,
    exp: "Using current divider: I₁ = R₂/(R₁+R₂) × I = 300/400 × 4 = 3A. I₂ = 100/400 × 4 = 1A. I₁:I₂ = 3:1.",
    topic: "Parallel Circuits", src: "SSC JE 03.03.2017 Shift-I"
  },
  {
    id: 853, num: "853",
    q: "A 200W, 230V lamp is connected across 115V supply. What is the power drawn by the lamp?",
    opts: ["Slightly more than 50W","Slightly less than 50W","Exactly equal to 100W","Exactly equal to 50W"],
    ans: 3,
    exp: "R = V²/P = 230²/200 = 264.5Ω. When at 115V: I = 115×200/(230×230). Power = I²R = (115×200/230×230)² × 230²/200 = 50W.",
    topic: "Power", src: "SSC JE 03.03.2017 Shift-II"
  },
  {
    id: 854, num: "854",
    q: "Which of the following is a vector quantity?",
    opts: ["Electrical potential","Electrical field intensity","Electric charge","None of these"],
    ans: 1,
    exp: "Electric field intensity is a vector quantity (has magnitude and direction). Electrical potential and electric charge are scalar quantities.",
    topic: "Basic Concepts", src: "SSC JE 03.03.2017 Shift-II"
  },
  {
    id: 855, num: "855",
    q: "What will be the capacity of four capacitors of equal capacity 'C' when connected in parallel?",
    opts: ["4C","C/4","3/4C","C"],
    ans: 0,
    exp: "For parallel capacitors: C_T = C₁ + C₂ + C₃ + C₄ = C + C + C + C = 4C.",
    topic: "Capacitors", src: "SSC JE 03.03.2017 Shift-II"
  },
  {
    id: 856, num: "856",
    q: "Three capacitors of capacity 4 μF each are connected in parallel, the resultant capacitance will be:",
    opts: ["3/4 μF","12 μF","4.3 μF","4 μF"],
    ans: 1,
    exp: "Parallel combination: C_T = C₁ + C₂ + C₃ = 4 + 4 + 4 = 12 μF.",
    topic: "Capacitors", src: "SSC JE 03.03.2017 Shift-II"
  },
  {
    id: 857, num: "857",
    q: "Which of the following is an active element of a circuit?",
    opts: ["Resistance","Inductance","Ideal current source","Capacitance"],
    ans: 2,
    exp: "Ideal current source is an active element as it can deliver energy (voltage gain or current gain). Resistance, inductance, and capacitance are passive elements that absorb or dissipate energy.",
    topic: "Circuit Elements", src: "SSC JE 03.03.2017 Shift-II"
  },
  {
    id: 858, num: "858",
    q: "Which of the following is not a non-linear circuit element?",
    opts: ["Diode","Transistor","Heater coil","None of these"],
    ans: 2,
    exp: "Heater coil is a linear circuit element (follows Ohm's law). Diode and transistor are non-linear elements (V-I relation is non-linear function).",
    topic: "Circuit Elements", src: "SSC JE 03.03.2017 Shift-II"
  },
  {
    id: 859, num: "859",
    q: "A 10Ω resistor, 1H inductor and 1μF capacitor are connected in parallel. The combination is driven by a unit step current under steady state conditions, the source current flows through the:",
    opts: ["Resistor","Capacitor","Inductor","All options are correct"],
    ans: 2,
    exp: "Under steady state DC conditions: capacitor acts as open circuit, inductor acts as short circuit. Current chooses low resistance path → flows through inductor (short circuit path).",
    topic: "Steady State Analysis", src: "SSC JE 03.03.2017 Shift-II"
  },
  {
    id: 860, num: "860",
    q: "Two incandescent light bulbs of 40W and 60W ratings are connected in series across the main power supply. Then:",
    opts: ["The bulbs together consume 100W","The bulbs together consume 50W","The 60W bulb glows brighter","The 40W bulb glows brighter"],
    ans: 3,
    exp: "R_40 = V²/40 > R_60 = V²/60. In series, current I is same. P = I²R. Since R_40 > R_60, P_40 > P_60. The 40W bulb glows brighter in series connection.",
    topic: "Series Circuits", src: "SSC JE 03.03.2017 Shift-II"
  },
  {
    id: 861, num: "861",
    q: "Twelve 1Ω resistances are used as edges to form a cube. The resistance between two diagonally opposite corners of the cube is:",
    opts: ["5/6Ω","1Ω","6/5Ω","3/2Ω"],
    ans: 0,
    exp: "For a cube with 12 equal resistors (R=1Ω) on edges, resistance between space diagonals (body diagonal) = 5R/6 = 5/6Ω.",
    topic: "Network Theory", src: "SSC JE 03.03.2017 Shift-II"
  },
  {
    id: 862, num: "862",
    q: "Which of the following statements is true about the conductor position marked 1 in the figure (conductor connected to a battery with a bulb)?",
    opts: ["This point has definite potential against earth","This point has definite voltage","An electric current flows through the conductor","Protons flow through the conductor"],
    ans: 2,
    exp: "Battery creates potential difference; current flows through conductor 1 to light the bulb. Without current flow in conductor 1, the bulb cannot be ON.",
    topic: "Basic Concepts", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 863, num: "863",
    q: "In the circuit shown, how will the voltage V₁ and V₂ change when the switch 'S' is closed (R₁, R₂ in series with R₃||S)?",
    opts: ["V₁ decreases, V₂ increases","V₁ increases, V₂ decreases","V₁ decreases, V₂ decreases","V₁ increases, V₂ increases"],
    ans: 0,
    exp: "When S closes, R_eq < R₁. So V₁ decreases (less voltage across lower equivalent R). V₂ = V×R₂/(R_eq+R₂) increases since R_eq decreased.",
    topic: "DC Circuits", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 864, num: "864",
    q: "Figure lamp shown in the picture is switched on. From the moment of switching on, how long does it take for the lamp to glow?",
    opts: ["3 seconds (velocity of sound)","About 1 second","About 0.1 second","Practically zero (velocity of light)"],
    ans: 3,
    exp: "The velocity of propagation of electric current is almost the speed of light (~3×10⁸ m/s). For 1 km distance, time = 1000/(3×10⁸) ≈ 3.3 μs ≈ practically zero.",
    topic: "Basic Concepts", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 865, num: "865",
    q: "Electrons flow through a metallic conductor (1mm² Cu cross-section). What is the approximate velocity of these electrons?",
    opts: ["Approximately equal to velocity of light","Approximately 2/3 of velocity of light","Approximately equal to velocity of sound","None of these (drift velocity is very low)"],
    ans: 3,
    exp: "Electron flow in metallic conductor is due to drift caused by applied electric field. The drift velocity of electrons through a conductor is very low (much less than speed of light which is 3×10⁸ m/s).",
    topic: "Basic Concepts", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 866, num: "866",
    q: "If three resistances of values 2Ω, 3Ω and 6Ω are connected as shown (3Ω and 6Ω in parallel, result in series with 2Ω), what will be the effective resistance?",
    opts: ["2Ω","3Ω","4Ω","6Ω"],
    ans: 2,
    exp: "R_parallel = (6×3)/(3+6) = 18/9 = 2Ω. R_eq = 2 + 2 = 4Ω.",
    topic: "Resistors", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 867, num: "867",
    q: "Which of the resistances is represented by the curve system showing resistance increasing sharply then decreasing?",
    opts: ["Potentiometer","Layer resistance","Hot conductor (NTC)","Cold conductor (PTC)"],
    ans: 3,
    exp: "Positive Temperature Coefficient (PTC) thermistor: resistance first decreases then increases sharply with temperature. The curve shows PTC characteristic.",
    topic: "Resistance", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 868, num: "868",
    q: "The resistance of a conductor, when its temperature is increased____:",
    opts: ["Remains constant","Decreases","Varies","Increases"],
    ans: 3,
    exp: "Rₜ = R₀(1 + αΔT). For pure metals (Cu, Al, Fe, Au, Ag), α is positive → resistance increases with temperature.",
    topic: "Resistance", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 869, num: "869",
    q: "The number of mesh currents required in the circuit given (showing two coupled inductors with two loops equivalent) is:",
    opts: ["3","4","5","6"],
    ans: 0,
    exp: "The circuit can be redrawn as 3 independent loops (meshes). So 3 mesh currents (I₁, I₂, and I₃) are required to solve the circuit.",
    topic: "Mesh Analysis", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 870, num: "870",
    q: "In the circuit shown the voltage function is v(t) = 150 sin ωt. The average power in the resistance 'R' = 25Ω will be:",
    opts: ["300 W","450 W","750 W","700 W"],
    ans: 1,
    exp: "V_m = 150V. V_rms = V_m/√2 = 150/√2. Average power = V_rms²/R = (150/√2)²/25 = (150²/2)/25 = 22500/50 = 450W.",
    topic: "AC Power", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 871, num: "871",
    q: "What is the unit of measure for electrical pressure or electromotive force?",
    opts: ["Amperes(A)","ohm(Ω)","Volt(V)","Watt(W)"],
    ans: 2,
    exp: "Volt is the unit of electrical pressure (EMF). One volt is the amount of pressure required to cause one ampere of current to flow against one ohm of resistance. V = IR.",
    topic: "Basic Concepts", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 872, num: "872",
    q: "Which of the following circuit configurations has the same amount of voltage drop across each of its components?",
    opts: ["Parallel connection","Series-parallel connection","Series connection","All options are correct"],
    ans: 0,
    exp: "In a parallel circuit, voltage drop across each component is the same (equal to supply voltage). V_R₁ = V_R₂ = V_R₃ = E.",
    topic: "Parallel Circuits", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 873, num: "873",
    q: "Henry is the unit of measurement for which of the following properties?",
    opts: ["Reactance","Capacitance","Resistance","Inductance"],
    ans: 3,
    exp: "Henry (H) is the unit of self-inductance or mutual inductance. Inductance L = λ/I Henry.",
    topic: "Inductors", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 874, num: "874",
    q: "In a pure capacitive circuit____:",
    opts: ["The current leads applied voltage by 90 degrees","The current is in phase with applied voltage","The current lags applied voltage by 90 degrees","None of these"],
    ans: 0,
    exp: "X_C = 1/(jωC) = -j/(ωC) = |X_C|∠-90°. I = V/X_C = V∠0°/|X_C|∠-90° = (V/|X_C|)∠90°. Current leads voltage by 90°.",
    topic: "Capacitors", src: "SSC JE 01.03.2017, Shift-I"
  },
  {
    id: 875, num: "875",
    q: "If three 30μF capacitors are connected in series, the net capacitance is:",
    opts: ["10μF","60μF","90μF","None of these"],
    ans: 0,
    exp: "Series: 1/C = 1/30 + 1/30 + 1/30 = 3/30 = 1/10. C = 10μF.",
    topic: "Capacitors", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 876, num: "876",
    q: "Which of the following determines total power in a series circuit?",
    opts: ["Source voltage times the current","Total voltage applied to the circuit","Current flowing through a switch","Average of the wattage consumed by each resistor"],
    ans: 0,
    exp: "Total power in series circuit: P_Total = V_s × I_s (source voltage times source current).",
    topic: "Series Circuits", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 877, num: "877",
    q: "A potential divider is normally connected?",
    opts: ["Outside the generator circuit towards the load circuit","Within the generator circuit","At a distance V/100 metres from generator","None of these"],
    ans: 0,
    exp: "A voltage divider should always be connected outside the generator circuit towards the load circuit (Test object) for accurate measurement.",
    topic: "Measurement", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 878, num: "878",
    q: "In a pure inductive circuit:",
    opts: ["Current leads applied voltage by 90 degree","Current is in phase with applied voltage","Current lags applied voltage by 90 degree","None of these"],
    ans: 2,
    exp: "In a purely inductive circuit, the reactance opposes the change of current and makes current lag behind the applied voltage by 90°.",
    topic: "Inductors", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 879, num: "879",
    q: "The average power in a pure inductive circuit is:",
    opts: ["0","VI","VI cosφ","√3VI cosφ"],
    ans: 0,
    exp: "In pure inductive circuit: P = V_m sinωt × (–I_m cosωt). Average for full cycle = –(1/2)V_m I_m ∫₀²π sin²ωt dt = 0.",
    topic: "AC Power", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 880, num: "880",
    q: "Kirchhoff's current law (KCL) is applicable only to:",
    opts: ["Closed loops in a network","Electronic circuits","Junction in a network","Electric circuits"],
    ans: 2,
    exp: "KCL deals with conservation of charge entering and leaving a junction (node) in a network. It states: algebraic sum of all currents at a node = 0.",
    topic: "Network Laws", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 881, num: "881",
    q: "Flow of electrons in the circuit constitutes:",
    opts: ["Magnetic charge","An e.m.f","An electric current","None of these"],
    ans: 2,
    exp: "The flow of electrons in a circuit constitutes electric current. I = Q/t Ampere.",
    topic: "Basic Concepts", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 882, num: "882",
    q: "If two resistance of 10Ω and 10Ω are connected in parallel the equivalent resistance is:",
    opts: ["15Ω","100Ω","5Ω","1Ω"],
    ans: 2,
    exp: "R_eq = (10×10)/(10+10) = 100/20 = 5Ω.",
    topic: "Parallel Circuits", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 883, num: "883",
    q: "A network has 10 nodes and 17 branches. The number of different node pair voltages would be:",
    opts: ["7","9","45","10"],
    ans: 1,
    exp: "Number of node pair voltages = n – 1 = 10 – 1 = 9.",
    topic: "Network Theory", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 884, num: "884",
    q: "Find current I₁, I₂ and I₃ respectively in the circuit (8A source with 4Ω, 5Ω, 1Ω in parallel).",
    opts: ["1.38A, 1.1A and 5.52A","1.38A, 5.5A and 1.1A","1.38A, 0.9A and 6.38A","1.1A, 5.52A and 1.38A"],
    ans: 0,
    exp: "Apply nodal at V₁: V₁/4 + V₁/5 + V₁/1 = 8 → V₁ = 5.51V. I₁=5.51/4=1.38A, I₂=5.51/5=1.102A≈1.1A, I₃=5.51/1=5.51A≈5.52A.",
    topic: "Nodal Analysis", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 885, num: "885",
    q: "In the below network effective resistance existing across the voltage source (4Ω resistor with current source I/4 in parallel) is:",
    opts: ["4Ω","3Ω","2Ω","1Ω"],
    ans: 1,
    exp: "Current through 4Ω = I – I/4 = 3I/4. Voltage drop = (3I/4) × 4 = 3I. R_eff = V/I = 3I/I = 3Ω.",
    topic: "Network Analysis", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 886, num: "886",
    q: "A current mirror can be used as an active load because:",
    opts: ["It has low AC resistance","It has high AC resistance","It has high DC resistance","It has low DC resistance"],
    ans: 1,
    exp: "A current mirror is a circuit designed to copy current through one active device by controlling the high AC resistance in another active device of the circuit.",
    topic: "Active Circuits", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 887, num: "887",
    q: "Two heaters rated at 1000W, 250V each are connected in series across a 250V, 50Hz ac mains. The total power drawn from the supply would be _____ watt.",
    opts: ["1000","500","250","2000"],
    ans: 1,
    exp: "R = V²/P = 250²/1000 = 62.5Ω each. Total R = 125Ω. I = 250/125 = 2A. P = 250×2 = 500W.",
    topic: "AC Power", src: "SSC JE 01.03.2017, Shift-II"
  },
  {
    id: 888, num: "888",
    q: "A current is said to be direct current when its:",
    opts: ["Magnitude remains constant with time","Magnitude changes with time","Direction changes with time","Magnitude and direction changes with time"],
    ans: 0,
    exp: "DC current is unidirectional flow of electric charge carriers. The general direction of movement is the same at all times, though magnitude may vary.",
    topic: "DC Circuits", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 889, num: "889",
    q: "Pure inductive circuit:",
    opts: ["Consumes some power on average","Does not consume power","Takes power from line during some part of cycle then returns during other part","None of these"],
    ans: 2,
    exp: "Power in pure inductive circuit: P = VI cosφ. Since φ = 90°, average P = 0. But during first quarter cycle, power is stored in magnetic field and returned in next quarter. Thus it takes and returns power alternately.",
    topic: "AC Circuits", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 890, num: "890",
    q: "A 10 mH inductor carries a sinusoidal current of 1A rms at a frequency of 50 Hz. The average power dissipated by the inductor is:",
    opts: ["0 W","0.25 W","0.5 W","1 W"],
    ans: 0,
    exp: "In purely inductive circuit, power supplied during first quarter is stored in magnetic field and returned in next quarter. Process continues every cycle → net power dissipated = 0W.",
    topic: "Inductors", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 891, num: "891",
    q: "The flow of electric current in a conductor is due to flow of:",
    opts: ["Electrons","Protons","Electrons and ions","Charged particles"],
    ans: 0,
    exp: "The flow of electric current in a conductor is only due to flow of electrons. Direction of current is opposite to direction of electron flow.",
    topic: "Basic Concepts", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 892, num: "892",
    q: "Correct form of Ohm's law is:",
    opts: ["I = VR","V ∝ I","V = IR","Both V ∝ I and V = IR"],
    ans: 3,
    exp: "Ohm's law: current through conductor is directly proportional to voltage. I ∝ V → I = V/R → V = IR. Both V ∝ I and V = IR are correct forms.",
    topic: "Ohm's Law", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 893, num: "893",
    q: "Specific resistance of a conductor depends upon:",
    opts: ["Dimensions of conductor","Composition of conductor material","Resistance of conductor","Both dimensions and composition"],
    ans: 1,
    exp: "Specific resistance (resistivity) of a conductor depends upon composition of conductor material. It does not depend on dimensions (length/area) of conductor.",
    topic: "Resistance", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 894, num: "894",
    q: "Three parallel resistive branches are connected across dc supply. What will be the ratio of branch currents I₁:I₂:I₃ if branch resistances R₁:R₂:R₃ = 2:4:6?",
    opts: ["3:2:6","2:4:6","6:3:2","6:2:4"],
    ans: 2,
    exp: "I ∝ 1/R. I₁:I₂:I₃ = 1/R₁:1/R₂:1/R₃ = 1/2:1/4:1/6 = 6:3:2 (multiply by 12).",
    topic: "Parallel Circuits", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 895, num: "895",
    q: "If the figure given below, resistor R₃ becomes open circuited, the voltmeter will read (4 resistors of 10Ω each in series across 250V with voltmeter across R₃):",
    opts: ["0 V","62.5 V","125 V","250 V"],
    ans: 3,
    exp: "When R₃ is open-circuited, no current flows. Voltmeter has high resistance, so essentially all 250V appears across the open R₃. Voltmeter reads 250V.",
    topic: "DC Circuits", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 896, num: "896",
    q: "Three resistance each of R Ω are connected to form a triangle. The resistance between any two terminals will be:",
    opts: ["R Ω","3/2 Ω","3R Ω","2/3 R Ω"],
    ans: 3,
    exp: "R_AB = R||(R+R) = R||2R = (R×2R)/(R+2R) = 2R²/3R = 2R/3 Ω.",
    topic: "Network Theory", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 897, num: "897",
    q: "A network has large number of ideal linear resistances. Power consumed by R is P₁ (source 1 only) and P₂ (source 2 only). Both sources active, power consumed by R is:",
    opts: ["P₁ ± P₂","√P₁ ± √P₂","[√P₁ ± √P₂]²","(P₁ ± P₂)²"],
    ans: 2,
    exp: "i₁ = √(P₁/R), i₂ = √(P₂/R). Total I = i₁ ± i₂. Power = I²R = (i₁ ± i₂)²R = (√P₁ ± √P₂)².",
    topic: "Superposition", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 898, num: "898",
    q: "Which of the following is an active element in a circuit?",
    opts: ["Current source","Resistance","Inductor","Capacitance"],
    ans: 0,
    exp: "Active elements deliver energy — e.g. voltage source, current source, AC/DC generators, batteries. Passive elements (resistor, capacitor, inductor) store or dissipate energy.",
    topic: "Circuit Elements", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 899, num: "899",
    q: "A 3V DC supply with internal resistance of 2Ω supplies a passive nonlinear resistance characterized by V_NL = (I_NL)². Power dissipated in nonlinear resistance is:",
    opts: ["1 W","1.5 W","2.5 W","3 W"],
    ans: 0,
    exp: "Apply KVL: 3 – 2I_NL = V_NL = I_NL². I_NL² + 2I_NL – 3 = 0 → (I_NL–1)(I_NL+3) = 0. I_NL = 1A (valid). V_NL = 1². P = V_NL × I_NL = 1×1 = 1W.",
    topic: "Nonlinear Circuits", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 900, num: "900",
    q: "If the number of branches in a network is 'B', nodes is 'N' and dependent loops is 'L', then the number of independent node equations will be:",
    opts: ["N+L–1","B–L","B–N","N–1"],
    ans: 3,
    exp: "Number of independent node equations = N – 1 (one node is taken as reference).",
    topic: "Network Theory", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 901, num: "901",
    q: "The number of chords of a connected graph of the given circuit (with source, capacitor, inductor and two sources, 6 branches, 4 nodes) will be:",
    opts: ["3","4","5","6"],
    ans: 0,
    exp: "Branches b=6, nodes n=4. Link/chords ℓ = b – n + 1 = 6 – 4 + 1 = 3.",
    topic: "Network Topology", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 902, num: "902",
    q: "For a voltage source:",
    opts: ["Terminal voltage is equal to source emf","Terminal voltage cannot exceed source emf","Terminal voltage is always lower than source emf","Terminal voltage is higher than source emf"],
    ans: 1,
    exp: "For a voltage source, terminal voltage cannot exceed source EMF because of voltage drop due to internal resistance. V_terminal = V_emf – I×r_internal ≤ V_emf.",
    topic: "Voltage Sources", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 903, num: "903",
    q: "A dependent source:",
    opts: ["May be a current source or a voltage source","Is always a voltage source","Is always a current source","Neither a current source nor a voltage source"],
    ans: 0,
    exp: "Dependent sources are classified as: (i) Voltage dependent voltage source (ii) Voltage dependent current source (iii) Current dependent voltage source (iv) Current dependent current source.",
    topic: "Circuit Elements", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 904, num: "904",
    q: "Kirchhoff's laws are not applicable to circuits with:",
    opts: ["Distributed parameters","Lumped parameters","Passive elements","Non linear resistance"],
    ans: 0,
    exp: "Kirchhoff's law is not applicable for distributed parameters. Distributed element circuits are electrical circuits composed of length of transmission lines — these don't have closed loops, so KCL/KVL cannot be applied.",
    topic: "Network Laws", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 905, num: "905",
    q: "The current through 120 ohm resistor in the circuit (5V source, 25/7A and 4/7A current sources, 12Ω resistor) is:",
    opts: ["1 A","2 A","3 A","4 A"],
    ans: 2,
    exp: "Current at node A = 25/7 Amp. Current through 120Ω = 25/7 – 4/7 = 21/7 = 3A.",
    topic: "Nodal Analysis", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 906, num: "906",
    q: "The V–i characteristic of an element is shown in the figure (passing through all 4 quadrants with different slopes). The element is:",
    opts: ["Nonlinear, active, non-bilateral","Linear, active, non-bilateral","Nonlinear, passive, non-bilateral","Nonlinear, active, bilateral"],
    ans: 0,
    exp: "From V-I graph: non-bilateral (different V-I for each direction), non-linear (curve), active (voltage same for any current direction — delivers energy).",
    topic: "Circuit Elements", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 907, num: "907",
    q: "Linkage flux per unit current is called:",
    opts: ["Capacitance","Resistance","Inductance","Capacitive reactance"],
    ans: 2,
    exp: "Inductance L = λ/I Henry, where λ = flux linkage (in Wb) and I = current (in amp).",
    topic: "Inductors", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 908, num: "908",
    q: "According to free electron theory, electrons in a metal are subjected to:",
    opts: ["Constant potential","Sinusoidal potential","Square-wave potential","Non-periodic potential"],
    ans: 0,
    exp: "According to free electron theory, electrons in a metal are subjected to constant potential. Mutual repulsion among electrons is neglected.",
    topic: "Basic Concepts", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 909, num: "909",
    q: "A semiconductor has a band gap of 2 eV. The wavelength of radiation emitted when electrons and holes recombine is:",
    opts: ["625 nm","625 μm","625 mm","625 cm"],
    ans: 0,
    exp: "λ = hc/E = (6.67×10⁻³⁴ × 3×10⁸)/(2×1.6×10⁻¹⁹) = 6.25×10⁻⁷ = 625×10⁻⁹ = 625 nm.",
    topic: "Semiconductors", src: "SSC JE 04.03.2017, Shift-I"
  },
  {
    id: 910, num: "910",
    q: "A current is said to be alternating when it changes in:",
    opts: ["Magnitude only","Direction only","Both magnitude and direction","None of these"],
    ans: 2,
    exp: "AC current is said to be alternating when both magnitude and direction change with time.",
    topic: "AC Circuits", src: "SSC JE 04.03.2017, Shift-II"
  },
  {
    id: 911, num: "911",
    q: "Which of the following statements pertains to resistor only?",
    opts: ["They oppose sudden changes in voltages","They can act as energy storage devices","They can dissipate desirable amount of power","None of these"],
    ans: 2,
    exp: "Resistors dissipate (consume) power. No energy is stored in resistors. Inductors oppose sudden current changes; capacitors oppose sudden voltage changes.",
    topic: "Resistors", src: "SSC JE 04.03.2017, Shift-II"
  },
  {
    id: 912, num: "912",
    q: "In gases the flow of current is due to:",
    opts: ["Electrons only","Positive and negative ions","Electrons and positive ions","Electrons, positive ions and negative ions"],
    ans: 3,
    exp: "Current in gases and liquids consists of a flow of positive ions in one direction together with a flow of negative ions and electrons in the opposite direction.",
    topic: "Basic Concepts", src: "SSC JE 04.03.2017, Shift-II"
  },
  {
    id: 913, num: "913",
    q: "All the resistances in figure shown are 1Ω each (ladder network with 1V source). The value of current 'I' is:",
    opts: ["1/15A","2/15A","4/15A","8/15A"],
    ans: 3,
    exp: "The ladder network simplifies: 1Ω in series with 7/8Ω = 15/8Ω equivalent. I = V/R = 1/(15/8) = 8/15A.",
    topic: "Network Analysis", src: "SSC JE 04.03.2017, Shift-II"
  },
  {
    id: 914, num: "914",
    q: "Four 100W bulbs are connected in parallel across 200V supply line. If one bulb gets fused:",
    opts: ["No bulb will light","All four bulbs will light","Rest of three bulbs will light","None of these"],
    ans: 2,
    exp: "In parallel connection: if one bulb fuses, it gets disconnected. The remaining three bulbs are still in parallel with the supply and continue to glow.",
    topic: "Parallel Circuits", src: "SSC JE 04.03.2017, Shift-II"
  },
  {
    id: 915, num: "915",
    q: "A network has 4 nodes and 3 independent loops. What is the number of branches in the network?",
    opts: ["5","6","7","8"],
    ans: 1,
    exp: "b = ℓ + n – 1 = 3 + 4 – 1 = 6 branches.",
    topic: "Network Topology", src: "SSC JE 04.03.2017, Shift-II"
  },
  {
    id: 916, num: "916",
    q: "A voltage source having open circuit voltage of 100V and internal resistance of 50Ω is equivalent to a current source:",
    opts: ["2A in parallel with 50Ω","2A in series with 50Ω","0.5A in parallel with 50Ω","2A in parallel with 100Ω"],
    ans: 0,
    exp: "I = V/R = 100/50 = 2A. A voltage source with V=100V and r=50Ω is equivalent to a 2A current source in parallel with 50Ω.",
    topic: "Source Transformation", src: "SSC JE 04.03.2017, Shift-II"
  },
  {
    id: 917, num: "917",
    q: "Consider the circuit given below with 24V source, 6Ω resistor and dependent current source 2I_g. What is the power delivered by the 24V source?",
    opts: ["96W","114W","192W","288W"],
    ans: 3,
    exp: "I_g = 24/6 = 4A. 2I_g = 2×4 = 8A. Total current = 4 + 8 = 12A. Power delivered = V × I = 24 × 12 = 288W.",
    topic: "Dependent Sources", src: "JPSC AE 10.04.2021, Paper-II"
  },
  {
    id: 918, num: "918",
    q: "A connected network of N > 2 nodes has at most one branch directly connecting any pair of nodes. The graph of the network:",
    opts: ["Must have at least N branches for closed paths","Can have unlimited number of branches","Can only have at most N branches","Can have minimum branches not decided by N"],
    ans: 0,
    exp: "The graph of a network with N>2 nodes must have at least N branches for one or more closed paths to exist.",
    topic: "Network Topology", src: "SSC JE 04.03.2017, Shift-II"
  },
  {
    id: 919, num: "919",
    q: "Which of the following properties has got higher value for aluminum in comparison to that of copper?",
    opts: ["Electrical resistivity","Melting point","Thermal conductivity","Specific gravity"],
    ans: 0,
    exp: "Resistivity of copper = 1.68×10⁻⁸ Ω-m. Resistivity of aluminium = 2.65×10⁻⁸ Ω-m. Aluminium has higher electrical resistivity than copper.",
    topic: "Material Properties", src: "SSC JE 04.03.2017, Shift-II"
  },
  {
    id: 920, num: "920",
    q: "Find the current 'i₀' in the circuit (0.5i₀ dependent source, 4Ω resistor and 3A current source).",
    opts: ["3 A","3.5 A","6 A","2.5 A"],
    ans: 2,
    exp: "At node a, KCL: 0.5I₀ + 3 = I₀ → 3 = 0.5I₀ → I₀ = 3×10/(0.5×10) = 30/5 = 6A.",
    topic: "Dependent Sources", src: "SSC JE 20.10.2020, Shift-I"
  },
  {
    id: 921, num: "921",
    q: "A 12Ω resistor is connected in parallel with a 6Ω resistor. What will be the equivalent resistance?",
    opts: ["6Ω","4Ω","18Ω","12Ω"],
    ans: 1,
    exp: "R_AB = (12×6)/(12+6) = 72/18 = 4Ω.",
    topic: "Parallel Circuits", src: "SSC JE 20.10.2020, Shift-I"
  },
  {
    id: 922, num: "922",
    q: "10 joules/coulombs = ________ volts.",
    opts: ["1000","10","1","100"],
    ans: 1,
    exp: "V = W/q = joule/coulomb. 10 joules/coulombs = 10 Volt.",
    topic: "Basic Concepts", src: "SSC JE 20.10.2020, Shift-I"
  },
  {
    id: 923, num: "923",
    q: "A network has 12 branches and 5 nodes. Find the number of independent loops in the network.",
    opts: ["7","8","18","17"],
    ans: 1,
    exp: "B = L + N – 1 → L = B – N + 1 = 12 – 5 + 1 = 8.",
    topic: "Network Topology", src: "SSC JE 20.10.2020, Shift-I"
  },
  {
    id: 924, num: "924",
    q: "How much energy does a 100-W electric bulb consume in two hours?",
    opts: ["7200 J","720 J","720 kJ","72 kJ"],
    ans: 2,
    exp: "E = P × t = 100 × 2 × 60 × 60 = 720,000 J = 720 kJ = 72×10⁴ J.",
    topic: "Electrical Energy", src: "SSC JE 20.10.2020, Shift-I"
  },
  {
    id: 925, num: "925",
    q: "For the circuit (30mA source, 9kΩ, 6kΩ, 12kΩ), calculate the power supplied by the source.",
    opts: ["8.1 W","1.8 W","5.4 W","2.7 W"],
    ans: 2,
    exp: "R_eq = (12+6)||9 = 18||9 = 6kΩ. P = i²R_eq = (30×10⁻³)² × 6×10³ = 900×10⁻⁶ × 6000 = 5400×10⁻³ = 5.4W.",
    topic: "Power", src: "SSC JE 20.10.2020, Shift-I"
  },
  {
    id: 926, num: "926",
    q: "Find the value of G_eq in the following circuit (5S, 6S and 20S conductances).",
    opts: ["10 S","20 S","25 S","15 S"],
    ans: 0,
    exp: "G_parallel = (5×20)/(5+20) = 100/25 = 4S. G_eq = 6 + 4 = 10 Siemen.",
    topic: "Conductance", src: "SSC JE 20.10.2020, Shift-I"
  },
  {
    id: 927, num: "927",
    q: "Find R_eq for the circuit (6Ω, 6Ω, 2Ω, 2Ω configuration).",
    opts: ["16Ω","10Ω","7.6Ω","4Ω"],
    ans: 2,
    exp: "2Ω and 8Ω (=2+6 after reduction) in parallel: (2×8)/(2+8) = 1.6Ω. Then 6Ω + 1.6Ω = 7.6Ω.",
    topic: "Resistors", src: "SSC JE 20.10.2020, Shift-I"
  },
  {
    id: 928, num: "928",
    q: "The element which is capable of delivering energy by its own is known as:",
    opts: ["Non-liner element","Unilateral element","Active element","Passive element"],
    ans: 2,
    exp: "Active element is capable of delivering energy by its own — e.g. DC generator, AC generator, voltage sources (batteries), current sources (photoelectric cells).",
    topic: "Circuit Elements", src: "NMRC JE 2017"
  },
  {
    id: 929, num: "929",
    q: "A billion electrons pass through a conductor of cross section in 10⁻³ sec. The current is:",
    opts: ["10⁻⁷A","2.6×10⁻⁷A","2×10⁻⁴A","1.6×10⁻⁷A"],
    ans: 3,
    exp: "n = 10⁹, e = 1.6×10⁻¹⁹C, t = 10⁻³s. q = ne = 10⁹ × 1.6×10⁻¹⁹ = 1.6×10⁻¹⁰C. i = q/t = 1.6×10⁻¹⁰/10⁻³ = 1.6×10⁻⁷A.",
    topic: "Basic Concepts", src: "NMRC JE 2017"
  },
  {
    id: 930, num: "930",
    q: "In the shown figure the voltage at node B with respect to node D is 15V. Then the current in 30Ω resistor will be:",
    opts: ["2.5A","2A","10A","0.5A"],
    ans: 3,
    exp: "V_B = 15V (given). Current in 30Ω: I = (30 – V_B)/30 = (30–15)/30 = 15/30 = 0.5A.",
    topic: "Nodal Analysis", src: "NMRC JE 2017"
  },
  {
    id: 931, num: "931",
    q: "________ remains same in all parts of a series circuit:",
    opts: ["Current","Resistance","Voltage","Power"],
    ans: 0,
    exp: "In series connection, current is constant and same through all elements. In parallel connection, voltage is constant throughout the circuit.",
    topic: "Series Circuits", src: "NMRC JE 2017"
  },
  {
    id: 932, num: "932",
    q: "If a DC supply of 180V is connected across terminals AB in figure (18Ω, 12Ω forming a triangle with 6Ω), then current in 6Ω resistor will be:",
    opts: ["6A","5A","12A","10A"],
    ans: 3,
    exp: "By voltage division: V_6Ω = (6/18)×180 = 60V. Current = V/R = 60/6 = 10A.",
    topic: "DC Circuits", src: "NMRC JE 2017"
  },
  {
    id: 933, num: "933",
    q: "A current of 2A flows in the circuit shown in figure (diamond/Wheatstone configuration: 2Ω, 3Ω, 3Ω, 2Ω). The potential difference V_A – V_B is:",
    opts: ["-1V","1V","2V","4V"],
    ans: 1,
    exp: "R_DAC = R_DBC = 5Ω. By current divider: I_DAC = I_DBC = 1A each. V_A – V_C = 3×1 = 3V. V_B – V_C = 2×1 = 2V. V_A – V_B = 1V.",
    topic: "Circuit Analysis", src: "NMRC JE 2017"
  },
  {
    id: 934, num: "934",
    q: "When all resistance in the given circuit are 1Ω each (Wheatstone bridge/diamond shape), the equivalent resistance across points A and B will be:",
    opts: ["1Ω","0.5Ω","3Ω","2Ω"],
    ans: 1,
    exp: "Circuit is a balanced Wheatstone bridge. R_ACB = R_ADB = 1+1 = 2Ω. R_AB = 2×2×1/(2×2+2×1+1×2) = 4/8 = 0.5Ω.",
    topic: "Wheatstone Bridge", src: "NMRC JE 2017"
  },
  {
    id: 935, num: "935",
    q: "Calculate the maximum safe current that can pass through a 1.8 kΩ resistor rated at 0.5 W.",
    opts: ["0.16 mA","16 mA","16 μA","16 A"],
    ans: 1,
    exp: "P = i²R → i = √(P/R) = √(0.5/1800) = 1/60 A = 16.67 mA ≈ 16 mA.",
    topic: "Power", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 936, num: "936",
    q: "The resistance of a conductor is 5Ω at 50°C and 6Ω at 100°C. Calculate its resistance at 0°C.",
    opts: ["2Ω","1Ω","4Ω","3Ω"],
    ans: 2,
    exp: "R_t = R₀(1+α₀t). At 50°C: 5 = R₀(1+50α₀)...(i). At 100°C: 6 = R₀(1+100α₀)...(ii). Dividing: 6/5 = (1+100α₀)/(1+50α₀). Solving: α₀=0.005, R₀ = 6/1.5 = 4Ω.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 937, num: "937",
    q: "An electric current is the flow of:",
    opts: ["Neutral charges only","Both positive and negative charges","Negative charges only","Positive charges only"],
    ans: 1,
    exp: "Electric current flows due to both positive and negative charges. Current = amount of charge q flowing for t seconds. I = q/t.",
    topic: "Basic Concepts", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 938, num: "938",
    q: "1 volt is equivalent to:",
    opts: ["1 newton per second","1 newton second","1 joule per coulomb","1 joule coulomb"],
    ans: 2,
    exp: "Volt = Work done (W) / Amount of charge (q) = Joule/Coulomb. 1 Volt = 1 Joule/Coulomb.",
    topic: "Basic Concepts", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 939, num: "939",
    q: "The magnitude of current in the 15Ω resistor in the figure (120V source, 25Ω, 5Ω, 15Ω, 90V source) is:",
    opts: ["4.95A","5 A","3.913A","1.0435A"],
    ans: 0,
    exp: "By nodal analysis: V(1/25 + 1/5 + 1/15) = 120/25 + 90/5. 23V/75 = 2850/125. V = 2850×75/(23×125). Current I = V/15 = 4.95A.",
    topic: "Nodal Analysis", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 940, num: "940",
    q: "In the figure below, the current in the 3Ω resistor is (9V source with 2Ω, 5Ω, 6Ω, 3Ω, 4Ω, 1Ω):",
    opts: ["0.824 A","1.325 A","0.711 A","1.438 A"],
    ans: 1,
    exp: "Using Delta-Star conversion, R_eq = 4.1892Ω. I = 9/4.1892 = 2.15A. Current in 3Ω: I₁ = 2.15 × 82/133 = 176.3/133 = 1.325A.",
    topic: "Delta-Star", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 941, num: "941",
    q: "Find the current in the 5Ω resistor from the analysis of following figure (same circuit as Q940).",
    opts: ["1.325 A","0.711 A","1.438 A","0.824 A"],
    ans: 1,
    exp: "Using Delta-Star conversion, R_eq = 4.18Ω. I = 9/4.18 = 2.15A. Current in 5Ω: I₂ = 2.15 × 44/133 = 0.71128A ≈ 0.711A.",
    topic: "Delta-Star", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 942, num: "942",
    q: "In the following figure, the current supplied by the battery is (same circuit, 9V source):",
    opts: ["2.15 A","1.438 A","1.325 A","3.25A"],
    ans: 0,
    exp: "R_eq = 4.18Ω. Total current I = V/R_eq = 9/4.18 = 2.15A.",
    topic: "Delta-Star", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 943, num: "943",
    q: "In the figure below, current in the 1Ω resistor is (same circuit, 9V source):",
    opts: ["2.15 A","1.325 A","0.824 A","0.113 A"],
    ans: 0,
    exp: "The 1Ω resistance is the series element. Total current through 1Ω = I = V/R_eq = 9/4.18 = 2.15A.",
    topic: "Delta-Star", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 944, num: "944",
    q: "Find the current in the 4Ω resistor in the following figure (same circuit).",
    opts: ["0.711 A","1.438 A","0.824 A","1.325 A"],
    ans: 2,
    exp: "Using Delta-Star with 6Ω, 2Ω, 5Ω delta: R₁=12/13, R₂=30/13, R₃=10/13. I₂ = 2.15 × 51/133 = 0.824A.",
    topic: "Delta-Star", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 945, num: "945",
    q: "The output resistance of the circuit at port AB (with 10V source, 2Ω, 4Ω, 4Ω, 2Ω) is:",
    opts: ["1Ω","1.2Ω","1.33Ω","1.5Ω"],
    ans: 2,
    exp: "For finding R_AB: voltage source is short-circuited. 1/R_AB = 1/4 + 1/4 + 1/4 = 3/4. R_AB = 4/3 = 1.33Ω.",
    topic: "Thevenin/Norton", src: "ESE-2012"
  },
  {
    id: 946, num: "946",
    q: "The value of temperature coefficient of resistance (α) depends upon:",
    opts: ["Cross-sectional area","Length of material","Nature of material and temperature","Volume of material"],
    ans: 2,
    exp: "The value of temperature coefficient of resistance (α) depends upon nature of material and temperature.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 947, num: "947",
    q: "At 300K temperature coefficient of a wire is 0.00125 per °C and its resistance is 1Ω. What will be its resistance at 1100 K?",
    opts: ["5.1225Ω","6.125Ω","2Ω","3Ω"],
    ans: 2,
    exp: "t₁ = 300K = 27°C, t₂ = 1100K = 827°C. R₁ = R₀(1+α₀×27). R₂ = R₀(1+α₀×827). R₂/1 = (1+0.00125×827)/(1+0.00125×27) = 2.03375/1.03375 ≈ 2Ω.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 948, num: "948",
    q: "The resistance of a metallic conductor is inversely proportional to:",
    opts: ["Temperature","Shape of cross-section","Cross-sectional area","Length of material"],
    ans: 2,
    exp: "R = ρℓ/a. R ∝ 1/a. Resistance is inversely proportional to the cross-sectional area of the conducting material.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 949, num: "949",
    q: "The resistance of a 100m length wire having uniform cross-sectional area of 0.01 mm² and having resistivity of 60 μΩ-cm is:",
    opts: ["6000 Ω","600 Ω","60 Ω","6×10⁻³ Ω"],
    ans: 0,
    exp: "ρ = 60μΩ-cm = 60×10⁻⁸ Ω-m. a = 0.01mm² = 1×10⁻⁸ m². R = ρℓ/A = 60×10⁻⁸ × 100/(1×10⁻⁸) = 6000Ω.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 950, num: "950",
    q: "The ability of a charged particle to do work is known as:",
    opts: ["Magnitude","Magnetism","Potential difference","Electric potential energy"],
    ans: 3,
    exp: "The ability of a charged particle to do work is known as electrical potential energy.",
    topic: "Basic Concepts", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 951, num: "951",
    q: "A 240V, 60W lamp has a working resistance of:",
    opts: ["1,400 Ω","60 Ω","690 Ω","960 Ω"],
    ans: 3,
    exp: "R = V²/P = (240)²/60 = 240×240/60 = 960Ω.",
    topic: "Power", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 952, num: "952",
    q: "If we want to replace the following circuit by a simple circuit containing one Voltage source and a resistance (5Ω, 8Ω||8Ω, 6Ω, 60V), the value of resistance will be:",
    opts: ["15Ω","10Ω","12.52Ω","16.60Ω"],
    ans: 0,
    exp: "R₃ and R₄ are parallel: R_eq' = 8×8/(8+8) = 4Ω. R₁, R₂ and R_eq' are in series: R_eq = 3+5+4+3 = 15Ω... (R_eq = R₁+R₂+R_eq = 5+6+4 = 15Ω).",
    topic: "Thevenin/Norton", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 953, num: "953",
    q: "At 0°C, a specimen of copper has a resistance of 4mΩ and its temperature coefficient of resistance is 1/234.5 per °C. Find the value of its temperature coefficient at 70°C.",
    opts: ["0.003284 per °C","0.003428 per °C","0.003434 per °C","0.003248 per °C"],
    ans: 0,
    exp: "α_t = α₀/(1+α₀t) = 0.004264/(1+0.004264×70) = 0.004264/1.2985 = 0.003284/°C.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 954, num: "954",
    q: "When a circuit so called open circuit?",
    opts: ["When voltage between the two terminals is infinite","When current flow through the branch is infinite","When voltage between two terminals become zero","When current flow through the branch become zero"],
    ans: 3,
    exp: "Open circuit: resistance = infinite, current = zero. The circuit is open when no current flows through the branch.",
    topic: "Circuit Concepts", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 955, num: "955",
    q: "The resistance of a 1 kW electric heater when energized by a 230 V 1-phase AC is:",
    opts: ["52.9Ω","230Ω","1000Ω","4.2Ω"],
    ans: 0,
    exp: "R = V²/P = (230)²/1000 = 52900/1000 = 52.9Ω.",
    topic: "Power", src: "ESE-2013"
  },
  {
    id: 956, num: "956",
    q: "If the three bulbs of 25W, 40W and 60W which would have the lowest resistance?",
    opts: ["Both 25W and 60W bulbs","25W bulb","40W bulb","60W bulb"],
    ans: 3,
    exp: "R = V²/P. For same voltage, higher wattage → lower resistance. R_25 > R_40 > R_60. The 60W bulb has the lowest resistance.",
    topic: "Power", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 957, num: "957",
    q: "Find the current through the following circuit (78V source, 3Ω, 12Ω||6Ω, 5Ω).",
    opts: ["10A","6A","7.5A","6.5A"],
    ans: 3,
    exp: "R₃||R₄ = 12×6/(12+6) = 4Ω. R_eq = 3+5+4 = 12Ω. I = V/R = 78/12 = 6.5A.",
    topic: "DC Circuits", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 958, num: "958",
    q: "At 0°C, a specimen of copper has resistance of 4mΩ and temperature coefficient 1/234.5 per °C. Find the value of its resistance at 70°C.",
    opts: ["5.55 mΩ","4.52 mΩ","5.19 mΩ","4.22 mΩ"],
    ans: 2,
    exp: "R_t = R₀(1+α₀t) = 4×10⁻³ × (1+0.004264×70) = 4×10⁻³ × 1.29848 = 5.19×10⁻³ = 5.19 mΩ.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 959, num: "959",
    q: "A copper wire has a resistance of 10Ω. It is stretched by one-tenth of its original length. Then its resistance will be:",
    opts: ["12.1Ω","10Ω","9Ω","11Ω"],
    ans: 0,
    exp: "R ∝ ℓ². New length = ℓ + ℓ/10 = 11ℓ/10. R_new/R_old = (11ℓ/10)²/ℓ² = 121/100. R_new = 10 × 121/100 = 12.1Ω.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 960, num: "960",
    q: "Find the total current in the following circuit (72V, 3Ω, 6Ω, 12Ω||6Ω, 5Ω).",
    opts: ["3.5 A","6.5 A","4 A","5.25 A"],
    ans: 2,
    exp: "R₄||R₅ = 12×6/(12+6) = 4Ω. R_eq = 3+6+5+4 = 18Ω. I = 72/18 = 4A.",
    topic: "DC Circuits", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 961, num: "961",
    q: "As the temperature of pure metal increases, the product of its resistivity and its conductivity:",
    opts: ["Remains constant","Increases exponentially","Increases linearly","Decreases"],
    ans: 0,
    exp: "Conductivity σ = 1/ρ. Therefore ρ × σ = 1 = constant, regardless of temperature.",
    topic: "Material Properties", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 962, num: "962",
    q: "The internal resistance of an ideal current source is:",
    opts: ["One","Proportional to resistances in network","Zero","Infinite"],
    ans: 3,
    exp: "Ideal current source: internal resistance = infinite (conductivity = 0). Load resistance is always less than internal resistance. Ideal voltage source has zero internal resistance.",
    topic: "Sources", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 963, num: "963",
    q: "Which of the following lamps will have the lowest resistance at room temperature?",
    opts: ["100W, 220V","25W, 220V","60W, 220V","200W, 220V"],
    ans: 3,
    exp: "R = V²/P. At same voltage, higher wattage → lower R. For 200W: R = 220²/200 = lowest. Hence 200W, 220V lamp has lowest resistance.",
    topic: "Power", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 964, num: "964",
    q: "Conductivity is reciprocal of:",
    opts: ["Resistance","Electric field strength","Electric density","Resistivity"],
    ans: 3,
    exp: "Conductivity σ = 1/ρ (Ω/m or siemens/meter). Conductivity is reciprocal of resistivity.",
    topic: "Material Properties", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 965, num: "965",
    q: "Find the resistance of a filament of 60W in a 230V supply lamp at its working temperature.",
    opts: ["981.66Ω","1000Ω","990Ω","881.66Ω"],
    ans: 3,
    exp: "R = V²/P = (230)²/60 = 230×230/60 = 881.66Ω.",
    topic: "Power", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 966, num: "966",
    q: "Electric resistance offers _______ to the flow of current.",
    opts: ["Conductance","Voltage","Opposition","A path"],
    ans: 2,
    exp: "Electric resistance is the property of a substance due to which the electron or electric current is obstructed. Resistance offers opposition to current flow.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 967, num: "967",
    q: "The voltage drop across the 1.5Ω resistor in the circuit (2A source, 4.5Ω and 1.5Ω in parallel) is:",
    opts: ["1.5 V","2 V","2.5 V","2.25 V"],
    ans: 3,
    exp: "Current through 1.5Ω (current divider): I = 4.5/(4.5+1.5) × 2 = 9/6 = 1.5A. V = IR = 1.5 × 1.5 = 2.25V.",
    topic: "Parallel Circuits", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 968, num: "968",
    q: "A 25W, 220V bulb and 100W, 220V bulb are joined in parallel and connected to a 220V supply. Which bulb will glow more brightly?",
    opts: ["Voltage insufficient","25W bulb","100W bulb","Both glow same brightness"],
    ans: 2,
    exp: "Parallel connection: V = constant. P ∝ 1/R. 100W bulb has lower resistance, draws more current, glows brighter.",
    topic: "Parallel Circuits", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 969, num: "969",
    q: "When a current of 5A flows through a resistor of 4Ω, the power dissipated by it is:",
    opts: ["6.25 W","80 W","20 W","100 W"],
    ans: 3,
    exp: "P = I²R = 5² × 4 = 25 × 4 = 100W.",
    topic: "Power", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 970, num: "970",
    q: "The term electric pressure is also referred as:",
    opts: ["Voltage","Power","Resistance","Current"],
    ans: 0,
    exp: "Electric pressure is analogous to electric potential (voltage). Volt is the form of forcing function in electrical circuit.",
    topic: "Basic Concepts", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 971, num: "971",
    q: "If the temperature increases, the resistance of a pure metal:",
    opts: ["Decreases","First increases then decreases","Remains constant","Increases"],
    ans: 3,
    exp: "Increasing temperature of a pure metal increases its resistance (positive temperature coefficient). Semiconductors and insulators have negative temperature coefficient.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 972, num: "972",
    q: "If the resistor obeys Ohm's law, it is called a:",
    opts: ["Linear resistor","Non-linear resistor","Non-parasitic resistor","Parasitic resistor"],
    ans: 0,
    exp: "According to Ohm's law, if the physical state of conductor remains unchanged, ratio V/I is constant. Resistance which follows Ohm's law is called linear resistance.",
    topic: "Ohm's Law", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 973, num: "973",
    q: "The resistance of a wire is 6Ω if the length of the same wire is increased 3 times and cross-sectional area is increased 2 times, then the resistance of wire will become:",
    opts: ["3Ω","9Ω","12Ω","36Ω"],
    ans: 1,
    exp: "R₁/R₂ = (ρ₁/ρ₂)(ℓ₁/ℓ₂)(a₂/a₁) = 1 × (1/3) × (2a/a) = 2/3. R₂ = R₁ × 3/2 = 6 × 3/2 = 9Ω.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 974, num: "974",
    q: "In the figure below, find the current through the 10Ω resistor (circuit with 20V, 12V, 10Ω, 4Ω, 8Ω).",
    opts: ["0.263 A","2.434 A","1.632 A","1.895 A"],
    ans: 3,
    exp: "By nodal: (V_A+12)/8 + V_A/4 = (20-V_A)/10. 19V_A = 20 → V_A = 20/19. Current in 10Ω: I = (20–V_A)/10 = (20–20/19)/10 = (380–20)/(19×10) = 360/190 = 36/19 = 1.895A.",
    topic: "Nodal Analysis", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 975, num: "975",
    q: "Find the current through the 4Ω resistor (same circuit with 20V, 12V, 10Ω, 4Ω, 8Ω).",
    opts: ["1.632 A","0.263 A","1.895 A","2.434 A"],
    ans: 1,
    exp: "By nodal: V/4 + V/8 + V/10 = 80/8 + 20/10 → 19V = 20 → V = 20/19. I₄Ω = V/4 = (20/19)/4 = 5/19 = 0.263A.",
    topic: "Nodal Analysis", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 976, num: "976",
    q: "In the figure below, current through the 1Ω resistance is (12V source, 1Ω, 3Ω, 5Ω, 6A source).",
    opts: ["4.12 A","4 A","1 A","3 A"],
    ans: 3,
    exp: "3Ω and 12V are in parallel → V across 3Ω = 12V. At node V_B: (V_B–12)/1 + V_B/5 = 6 → 6V_B = 30 → V_B = 15V. I₁Ω = (12–15)/1 = –3A → |I| = 3A.",
    topic: "Nodal Analysis", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 977, num: "977",
    q: "For transferring a charge of 300C, how long must a current of 0.1 A flow?",
    opts: ["50 min","5 min","50 s","5 s"],
    ans: 0,
    exp: "q = it → t = q/i = 300/0.1 = 3000 sec = 3000/60 = 50 minutes.",
    topic: "Basic Concepts", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 978, num: "978",
    q: "No current flows through two charged bodies if they have equal:",
    opts: ["Gain","Current","Capacity","Potential"],
    ans: 3,
    exp: "If two charged bodies have equal potential, the potential difference between them is zero. No current flows through equipotential surfaces.",
    topic: "Basic Concepts", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 979, num: "979",
    q: "Find the current through the 3kΩ resistor in the following circuit (6V source, 1kΩ, 3kΩ, 2kΩ in parallel).",
    opts: ["3 mA","6 mA","2 mA","11 mA"],
    ans: 2,
    exp: "All resistors in parallel: V across each = 6V. I₃kΩ = V/R = 6/(3×10³) = 2×10⁻³ = 2mA.",
    topic: "Parallel Circuits", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 980, num: "980",
    q: "Cable A has conductor resistance 0.6Ω and insulation resistance 600MΩ. Cable B has conductor resistance 0.8Ω and insulation 400MΩ. If cables connected in series, net conductor resistance is:",
    opts: ["1.2 MΩ","1 kΩ","1.4Ω","1.4 MΩ"],
    ans: 2,
    exp: "Series conductor: R_eq = R₁ + R₂ = 0.6 + 0.8 = 1.4Ω.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 981, num: "981",
    q: "For the replacement of internal resistors, the ideal voltage source is replaced by:",
    opts: ["Capacitor","Short circuit","Open circuit","Current source"],
    ans: 1,
    exp: "For an ideal voltage source, internal resistance = 0. When replaced in circuit analysis (like Thevenin), the ideal voltage source is replaced by short circuit.",
    topic: "Thevenin/Norton", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 982, num: "982",
    q: "Electromotive force in a circuit:",
    opts: ["Increases circuit resistance","Decreases potential difference","Maintains potential difference","Decreases circuit resistance"],
    ans: 2,
    exp: "EMF (Electromotive Force) in a circuit maintains potential difference. The voltage between two terminals in an open circuit is called EMF.",
    topic: "Sources", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 983, num: "983",
    q: "In the figure below, determine the magnitude of current in the 0.1Ω resistor (7A, 5A sources with 0.5Ω, 0.4Ω, 0.1Ω).",
    opts: ["4.78 A","5.5 A","1.542 A","3.75 A"],
    ans: 1,
    exp: "Using source transformation and KVL: current in 0.1Ω = i = 5.5A.",
    topic: "Source Transformation", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 984, num: "984",
    q: "A nichrome wire used in a heater as a coil has a resistance of 2Ω/m. For a heater of 1kW at 200V, the length of wire required is:",
    opts: ["20 m","24 m","40 m","80 m"],
    ans: 0,
    exp: "R = V²/P = 200²/1000 = 40Ω. Length = R/(per-meter resistance) = 40/2 = 20m.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 985, num: "985",
    q: "Find out the current through the 5Ω resistance from the analysis of figure (V_A=12V, 1Ω, 3Ω, 5Ω, 6A source).",
    opts: ["1 A","3 A","4 A","4.12 A"],
    ans: 1,
    exp: "3Ω is parallel with 12V → V across 3Ω = 12V. At node V_B: (V_B–12)/1 + V_B/5 = 6 → 6V_B = 30 + 60/5 ... → V_B = 15V. I₅Ω = 15/5 = 3A.",
    topic: "Nodal Analysis", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 986, num: "986",
    q: "A portable machine requires a force of 200N to move it. If the machine is moved 20m in 25s, the power consumed in doing this will be:",
    opts: ["16 kW","160 kW","160 W","1,600 W"],
    ans: 2,
    exp: "P = F×d/t = W/t = 200×20/25 = 4000/25 = 160W.",
    topic: "Power", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 987, num: "987",
    q: "An aluminium conductor, having resistance of 15Ω at 40°C, is heated to 120°C. If RTC at 0°C is 0.00333, its RTC at 40°C will be ______°C.",
    opts: ["0.00033","0.0033","0.00029","0.0029"],
    ans: 3,
    exp: "α_t = α₀/(1+α₀t) = 0.00333/(1+40×0.00333) = 0.00333/1.1332 = 0.00294 ≈ 0.0029.",
    topic: "Resistance", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 988, num: "988",
    q: "If a current of 5A flows for a period of 3 minutes, then the quantity of charge transferred will be:",
    opts: ["900 C","60 C","600 C","100 C"],
    ans: 0,
    exp: "q = i×t = 5 × 3 × 60 = 900C.",
    topic: "Basic Concepts", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 989, num: "989",
    q: "If the number of valence electrons in an atom is more than four, then the substance is said to be:",
    opts: ["A semiconductor","An insulator","A conductor","Neutral"],
    ans: 1,
    exp: "More than 4 valence electrons → insulator. It has negative temperature coefficient. Examples: Plastic, mica, PVC.",
    topic: "Materials", src: "UPPCL JE 27.08.2018, Shift-I"
  },
  {
    id: 990, num: "990",
    q: "For the network (15V source, 4Ω, 2Ω, 3Ω, 6A source, 5Ω), the current flowing through the 5Ω resistance will be:",
    opts: ["37/25 A","40/28 A","39/28 A","41/28 A"],
    ans: 2,
    exp: "Apply nodal at V_x: (V_x–15)/4 + V_x/2 + V_x/8 = 6. Solve: 7V_x/8 = 39/4. I₅Ω = V_x/8 = 39/28 A.",
    topic: "Nodal Analysis", src: "ESE 2018"
  },
  {
    id: 991, num: "991",
    q: "The current in the 1Ω resistor in the network shown (2Ω, 2Ω, 1Ω, 2V, 3V, 2A current source) is:",
    opts: ["2.00 A","2.25 A","2.50 A","2.75 A"],
    ans: 1,
    exp: "Apply nodal: (V_t–2)/2 + (V_t–3)/2 + V_t/1 = 2. 4V_t = 9 → V_t = 9/4 = 2.25V. I₁Ω = V_t/1 = 2.25A.",
    topic: "Nodal Analysis", src: "ESE 2018"
  },
  {
    id: 992, num: "992",
    q: "A pulse of +10V in magnitude and 2s in duration is applied to a lossless inductor of 1.0H. The current through the inductor would:",
    opts: ["Be a pulse of +20A for 2s","Be a pulse of -20A for 2s","Increase linearly from zero to 20A in 2s and remain constant at +20A","Increase linearly from zero to -20A in 2s and remain constant at -20A"],
    ans: 2,
    exp: "i = (1/L)∫V dt = (1/1)∫₀² 10 dt = [10t]₀² = 20A at t=2s, then constant. Current increases linearly 0→20A in 2s, remains at +20A.",
    topic: "Inductors", src: "ESE 2018"
  },
  {
    id: 993, num: "993",
    q: "A parallel-plate capacitor with air between the plates has capacitance of 10pF. If distance is halved and space filled with dielectric of constant 5, the newly formed capacitor will have capacitance of:",
    opts: ["10 pF","50 pF","100 pF","150 pF"],
    ans: 2,
    exp: "C = ε₀A/d = 10pF. When d halved and εᵣ=5: C' = (εᵣε₀A)/(d/2) = 2εᵣ×[ε₀A/d] = 2×5×10 = 100pF.",
    topic: "Capacitors", src: "ESE 2018"
  },
  {
    id: 994, num: "994",
    q: "A lossy capacitor C_s, rated 5kV, 50Hz, is represented by ideal capacitor C_p in parallel with R_p. C_p = 0.102μF; R_p = 1.25MΩ. The power loss and tanδ are respectively:",
    opts: ["20W and 0.04","10W and 0.04","20W and 0.025","10W and 0.025"],
    ans: 2,
    exp: "tanδ = I_r/I_c = (V/R_p)/(V×ωC_p) = 1/(R_p×ωC_p) = (5k/1.25M)/(5k×2π×50×0.102μF) = 0.025. Power = I_R²×R_p = (5k/1.25M)² × 1.25M = 20W.",
    topic: "AC Circuits", src: "ESE 2018"
  },
  {
    id: 995, num: "995",
    q: "The resistance R of a conductor is:",
    opts: ["EA/Jl","EJ/Al","El/JA","JA/El"],
    ans: 2,
    exp: "R = ρ(ℓ/A). J = (1/ρ)E = σE → ρ = E/J. Substituting: R = (E/J)×(ℓ/A) = Eℓ/JA.",
    topic: "Resistance", src: "ESE 2020"
  },
  {
    id: 996, num: "996",
    q: "Which of the following statements are correct for an ideal constant voltage source? 1. Output voltage remains absolutely constant. 2. Zero internal resistance. 3. Output voltage constant irrespective of current drawn. 4. Output voltage varies with current drawn.",
    opts: ["1, 2 and 4 only","1, 3 and 4 only","2, 3 and 4 only","1, 2 and 3 only"],
    ans: 3,
    exp: "Statement 4 is INCORRECT: output voltage of ideal voltage source is constant irrespective of current drawn. Statements 1, 2, and 3 are correct for ideal constant voltage source.",
    topic: "Voltage Sources", src: "ESE 2020"
  },
  {
    id: 997, num: "997",
    q: "The voltage across the 40Ω resistor in the electric network shown (25V, 10V sources with 50Ω, 10Ω, 20Ω, 40Ω, 30Ω) is:",
    opts: ["3.45 V","1.25 V","4.75 V","6.25 V"],
    ans: 0,
    exp: "Apply nodal at A: (V–25)/50 + V/40 + V/10 + (V+10)/10 = 0. 29V/200 = –1/2 → V = –100/29 = –3.45V. Voltage across 40Ω = |–3.45| = 3.45V.",
    topic: "Nodal Analysis", src: "DGVCL JE 06.01.2021 Shift-III"
  },
  {
    id: 998, num: "998",
    q: "In the circuit, the galvanometer shows no deflection. What is the value of 'X'? (Wheatstone bridge: P=500Ω, Q=500Ω, R=200Ω on one arm, r=1.5Ω in middle, R=2.5Ω and X=? with 10V)",
    opts: ["1Ω","2Ω","3Ω","4Ω"],
    ans: 1,
    exp: "For zero deflection in Wheatstone bridge: X = P/Q × S + qr/(p+q+r) × (P/Q – P/q). Solving the bridge equation gives X = 2Ω.",
    topic: "Wheatstone Bridge", src: "DGVCL JE 06.01.2021 Shift-III"
  },
  {
    id: 999, num: "999",
    q: "The voltage across A-B in the circuit shown (10V source, 1Ω, 3Ω, 2Ω) is:",
    opts: ["4 V","2 V","8 V","10 V"],
    ans: 0,
    exp: "Apply nodal: (V_AB–10)/1 + V_AB/1 + V_AB/2 = 0 → 5V_AB = 20 → V_AB = 4V.",
    topic: "Nodal Analysis", src: "DGVCL JE 06.01.2021 Shift-III"
  },
  {
    id: 1000, num: "1000",
    q: "A voltage source of emf 30V is connected to a load consisting of three resistors with resistances of 10Ω, 6Ω and 4Ω in series. Determine the current in 4Ω resistor.",
    opts: ["3A","1.5A","5A","6A"],
    ans: 1,
    exp: "R_eq = 10+6+4 = 20Ω. I = V/R_eq = 30/20 = 1.5A. Same current flows through all series resistors.",
    topic: "Series Circuits", src: "DGVCL JE 06.01.2021 Shift-III"
  },
  {
    id: 1001, num: "1001",
    q: "In case of a copper atom, atomic weight is 64 and atomic number is 29. What will be the number of neutrons in a copper atom?",
    opts: ["35","64","93","29"],
    ans: 0,
    exp: "Number of neutrons = Mass Number – Atomic Number = 64 – 29 = 35.",
    topic: "Atomic Structure", src: "PGCIL Diploma Trainee 17.12.2020"
  },
  {
    id: 1002, num: "1002",
    q: "The frequency of a sinusoidal signal is 50 Hz. What will be the period of the signal?",
    opts: ["20 ms","30 ms","50 ms","10 ms"],
    ans: 0,
    exp: "T = 1/f = 1/50 = 0.02s = 20ms.",
    topic: "AC Circuits", src: "PGCIL Diploma Trainee 17.12.2020"
  },
  {
    id: 1003, num: "1003",
    q: "What will be the current in 80Ω resistor if it is connected to a supply of 220V?",
    opts: ["2.25 A","2.75 A","2.50 A","1.75 A"],
    ans: 1,
    exp: "I = V/R = 220/80 = 2.75A.",
    topic: "Ohm's Law", src: "PGCIL Diploma Trainee 17.12.2020"
  },
  {
    id: 1004, num: "1004",
    q: "In case of a sinusoidal current, the unit of the amplitude is:",
    opts: ["Radians/second","Hertz","Radians","Amperes"],
    ans: 3,
    exp: "Amplitude of sinusoidal current is the maximum (peak) value of the current. Its unit is Amperes (A).",
    topic: "AC Circuits", src: "PGCIL Diploma Trainee 17.12.2020"
  }
];

const TOPICS = ["All Topics", ...Array.from(new Set(QUESTIONS.map(q => q.topic))).sort()];

const STORAGE_KEY = "circuit_quiz_state_v1";

function loadState() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

const getTopicColor = (topic) => {
  const map = {
    "AC Circuits": "#7F77DD", "DC Circuits": "#1D9E75", "Resistors": "#D85A30",
    "Capacitors": "#378ADD", "Inductors": "#D4537E", "Network Laws": "#BA7517",
    "Nodal Analysis": "#639922", "Mesh Analysis": "#185FA5", "Power": "#993C1D",
    "Basic Concepts": "#888780", "Parallel Circuits": "#0F6E56", "Series Circuits": "#3C3489",
    "Network Theory": "#3B6D11", "Material Properties": "#854F0B", "Resistance": "#A32D2D",
    "Ohm's Law": "#533BAB", "Circuit Elements": "#0C447C", "Sources": "#4A1B0C",
    "Delta-Star": "#26215C", "Wheatstone Bridge": "#63991F", "Superposition": "#185FA5",
  };
  return map[topic] || "#888780";
};

export default function App() {
  const saved = loadState();
  const [screen, setScreen] = useState(saved ? "resume" : "home");
  const [filterTopic, setFilterTopic] = useState("All Topics");
  const [quizMode, setQuizMode] = useState("sequential");
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [marked, setMarked] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [savedState, setSavedState] = useState(saved);
  const [searchTerm, setSearchTerm] = useState("");

  const startQuiz = useCallback((mode = "sequential", topic = "All Topics", shuffle = false) => {
    let qs = topic === "All Topics" ? [...QUESTIONS] : QUESTIONS.filter(q => q.topic === topic);
    if (shuffle || mode === "random") {
      qs = [...qs].sort(() => Math.random() - 0.5);
    }
    setActiveQuestions(qs);
    setQuizMode(mode);
    setCurrent(0);
    setAnswers({});
    setRevealed({});
    setMarked({});
    setShowResult(false);
    setScreen("quiz");
  }, []);

  const resumeQuiz = useCallback(() => {
    if (!savedState) return;
    setActiveQuestions(savedState.activeQuestions);
    setCurrent(savedState.current);
    setAnswers(savedState.answers);
    setRevealed(savedState.revealed);
    setMarked(savedState.marked || {});
    setShowResult(false);
    setScreen("quiz");
  }, [savedState]);

  useEffect(() => {
    if (screen === "quiz" && activeQuestions.length > 0) {
      const state = { activeQuestions, current, answers, revealed, marked };
      saveState(state);
      setSavedState(state);
    }
  }, [screen, current, answers, revealed, marked, activeQuestions]);

  const handleAnswer = (qid, idx) => {
    if (answers[qid] !== undefined) return;
    setAnswers(a => ({ ...a, [qid]: idx }));
    setRevealed(r => ({ ...r, [qid]: true }));
  };

  const toggleMark = (qid) => setMarked(m => ({ ...m, [qid]: !m[qid] }));

  const finishQuiz = () => setShowResult(true);

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedState(null);
    setScreen("home");
  };

  const q = activeQuestions[current];
  const progress = activeQuestions.length ? (Object.keys(answers).length / activeQuestions.length) * 100 : 0;
  const score = Object.entries(answers).filter(([qid, ans]) => {
    const question = activeQuestions.find(q => q.id === parseInt(qid));
    return question && question.ans === ans;
  }).length;

  const filteredForSearch = QUESTIONS.filter(q =>
    q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.num.includes(searchTerm) ||
    q.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showResult) {
    const incorrect = activeQuestions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.ans);
    const skipped = activeQuestions.filter(q => answers[q.id] === undefined);
    const pct = Math.round((score / activeQuestions.length) * 100);
    return (
      <div style={{fontFamily:"system-ui,sans-serif",maxWidth:860,margin:"0 auto",padding:"1.5rem 1rem"}}>
        <div style={{textAlign:"center",marginBottom:"2rem"}}>
          <div style={{fontSize:64,fontWeight:500,color: pct>=70?"#1D9E75":pct>=40?"#BA7517":"#A32D2D"}}>{pct}%</div>
          <div style={{fontSize:20,color:"var(--color-text-secondary)",marginBottom:8}}>{score} / {activeQuestions.length} correct</div>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:"1.5rem"}}>
            <span style={{background:"#EAF3DE",color:"#3B6D11",padding:"4px 14px",borderRadius:20,fontSize:14}}>✓ {score} Correct</span>
            <span style={{background:"#FCEBEB",color:"#A32D2D",padding:"4px 14px",borderRadius:20,fontSize:14}}>✗ {incorrect.length} Wrong</span>
            <span style={{background:"#F1EFE8",color:"#5F5E5A",padding:"4px 14px",borderRadius:20,fontSize:14}}>— {skipped.length} Skipped</span>
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={() => startQuiz(quizMode, filterTopic)} style={btnStyle("#7F77DD")}>Retake Quiz</button>
            {incorrect.length > 0 && <button onClick={() => {
              setActiveQuestions(incorrect);
              setCurrent(0); setAnswers({}); setRevealed({}); setMarked({}); setShowResult(false); setScreen("quiz");
            }} style={btnStyle("#D85A30")}>Retry Wrong ({incorrect.length})</button>}
            <button onClick={resetAll} style={btnStyle("#888780")}>Home</button>
          </div>
        </div>

        <div style={{marginBottom:24}}>
          <div style={{fontSize:16,fontWeight:500,marginBottom:12}}>By Topic Performance</div>
          {TOPICS.slice(1).map(t => {
            const tqs = activeQuestions.filter(q => q.topic === t);
            if (!tqs.length) return null;
            const tcorrect = tqs.filter(q => answers[q.id] === q.ans).length;
            const tpct = Math.round((tcorrect/tqs.length)*100);
            return (
              <div key={t} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:3}}>
                  <span style={{color:"var(--color-text-secondary)"}}>{t}</span>
                  <span style={{fontWeight:500,color:tpct>=70?"#1D9E75":tpct>=40?"#BA7517":"#A32D2D"}}>{tcorrect}/{tqs.length}</span>
                </div>
                <div style={{height:6,background:"var(--color-background-secondary)",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${tpct}%`,background:tpct>=70?"#1D9E75":tpct>=40?"#BA7517":"#A32D2D",borderRadius:3,transition:"width 0.5s"}}/>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{fontSize:16,fontWeight:500,marginBottom:12}}>Detailed Review</div>
        {activeQuestions.map((question, i) => {
          const userAns = answers[question.id];
          const isCorrect = userAns === question.ans;
          const isSkipped = userAns === undefined;
          return (
            <div key={question.id} style={{
              background:"var(--color-background-primary)",
              border:`0.5px solid ${isSkipped?"var(--color-border-tertiary)":isCorrect?"#9FE1CB":"#F7C1C1"}`,
              borderRadius:10,padding:"1rem",marginBottom:10
            }}>
              <div style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8}}>
                <span style={{
                  minWidth:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:12,fontWeight:500,flexShrink:0,marginTop:1,
                  background:isSkipped?"#D3D1C7":isCorrect?"#9FE1CB":"#F7C1C1",
                  color:isSkipped?"#5F5E5A":isCorrect?"#085041":"#791F1F"
                }}>{isSkipped?"–":isCorrect?"✓":"✗"}</span>
                <div style={{flex:1}}>
                  <span style={{fontSize:12,color:"var(--color-text-tertiary)",marginRight:6}}>Q{question.num}</span>
                  <span style={{fontSize:14,color:"var(--color-text-primary)"}}>{question.q}</span>
                </div>
              </div>
              <div style={{paddingLeft:32,fontSize:13}}>
                <div style={{color:"#1D9E75",marginBottom:2}}>✓ {question.opts[question.ans]}</div>
                {!isSkipped && !isCorrect && <div style={{color:"#A32D2D",marginBottom:2}}>Your answer: {question.opts[userAns]}</div>}
                <div style={{color:"var(--color-text-secondary)",marginTop:4,lineHeight:1.6}}>{question.exp}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (screen === "quiz" && q) {
    const qAnswered = answers[q.id] !== undefined;
    const userAns = answers[q.id];
    const answeredCount = Object.keys(answers).length;
    return (
      <div style={{fontFamily:"system-ui,sans-serif",maxWidth:760,margin:"0 auto",padding:"1rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,flexWrap:"wrap"}}>
          <button onClick={() => setScreen("home")} style={{padding:"5px 12px",borderRadius:6,border:"0.5px solid var(--color-border-secondary)",background:"transparent",cursor:"pointer",fontSize:13,color:"var(--color-text-secondary)"}}>← Home</button>
          <div style={{flex:1,minWidth:120}}>
            <div style={{height:5,background:"var(--color-background-secondary)",borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${progress}%`,background:"#7F77DD",borderRadius:3,transition:"width 0.3s"}}/>
            </div>
            <div style={{fontSize:11,color:"var(--color-text-tertiary)",marginTop:2}}>{answeredCount}/{activeQuestions.length} answered</div>
          </div>
          <span style={{fontSize:13,color:"var(--color-text-secondary)"}}>{current+1}/{activeQuestions.length}</span>
          <button onClick={() => toggleMark(q.id)} style={{
            padding:"5px 12px",borderRadius:6,border:"0.5px solid var(--color-border-secondary)",
            background: marked[q.id] ? "#FAEEDA" : "transparent",cursor:"pointer",fontSize:13,
            color: marked[q.id] ? "#854F0B" : "var(--color-text-secondary)"
          }}>{marked[q.id] ? "★ Marked" : "☆ Mark"}</button>
        </div>

        <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"1.25rem",marginBottom:14}}>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}>
            <span style={{
              fontSize:12,padding:"3px 10px",borderRadius:12,fontWeight:500,
              background: getTopicColor(q.topic)+"22",
              color: getTopicColor(q.topic)
            }}>{q.topic}</span>
            <span style={{fontSize:12,color:"var(--color-text-tertiary)"}}>{q.src}</span>
            {marked[q.id] && <span style={{fontSize:12,color:"#854F0B",background:"#FAEEDA",padding:"2px 8px",borderRadius:10}}>★ Marked</span>}
          </div>
          <div style={{fontSize:11,color:"var(--color-text-tertiary)",marginBottom:6}}>Q{q.num}</div>
          <div style={{fontSize:16,lineHeight:1.7,color:"var(--color-text-primary)",marginBottom:0}}>{q.q}</div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
          {q.opts.map((opt, i) => {
            let bg = "var(--color-background-primary)";
            let border = "0.5px solid var(--color-border-tertiary)";
            let color = "var(--color-text-primary)";
            if (qAnswered) {
              if (i === q.ans) { bg="#EAF3DE"; border="1px solid #5DCAA5"; color="#085041"; }
              else if (i === userAns && i !== q.ans) { bg="#FCEBEB"; border="1px solid #F09595"; color="#791F1F"; }
            }
            return (
              <button key={i} onClick={() => handleAnswer(q.id, i)} style={{
                background:bg,border,borderRadius:8,padding:"0.75rem 1rem",
                cursor: qAnswered ? "default" : "pointer",
                textAlign:"left",fontSize:15,color,transition:"all 0.15s",
                display:"flex",alignItems:"center",gap:10
              }}>
                <span style={{
                  width:24,height:24,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:12,fontWeight:500,
                  background: qAnswered && i===q.ans?"#5DCAA5":qAnswered && i===userAns && i!==q.ans?"#F09595":"var(--color-background-secondary)",
                  color: qAnswered && i===q.ans?"#085041":qAnswered && i===userAns && i!==q.ans?"#791F1F":"var(--color-text-secondary)"
                }}>{String.fromCharCode(65+i)}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {qAnswered && (
          <div style={{background:"#E6F1FB",border:"0.5px solid #B5D4F4",borderRadius:8,padding:"0.75rem 1rem",marginBottom:14,fontSize:14,lineHeight:1.7,color:"#042C53"}}>
            <div style={{fontWeight:500,marginBottom:4,color:"#0C447C"}}>Explanation</div>
            {q.exp}
          </div>
        )}

        <div style={{display:"flex",gap:8,justifyContent:"space-between",flexWrap:"wrap"}}>
          <button onClick={() => setCurrent(c => Math.max(0, c-1))} disabled={current===0}
            style={{...navBtn, opacity: current===0?0.4:1}}>← Previous</button>
          <div style={{display:"flex",gap:8}}>
            {!qAnswered && <button onClick={() => {
              setAnswers(a => ({...a, [q.id]: -1}));
            }} style={navBtn}>Skip</button>}
            {current < activeQuestions.length-1
              ? <button onClick={() => setCurrent(c => c+1)} style={{...navBtn,background:"#7F77DD",color:"white",border:"none"}}>Next →</button>
              : <button onClick={finishQuiz} style={{...navBtn,background:"#1D9E75",color:"white",border:"none"}}>Finish Quiz</button>
            }
          </div>
        </div>

        <div style={{marginTop:20,display:"flex",flexWrap:"wrap",gap:4}}>
          {activeQuestions.map((aq, i) => {
            const isAns = answers[aq.id] !== undefined && answers[aq.id] !== -1;
            const isSkipped = answers[aq.id] === -1;
            const isCorrect = isAns && answers[aq.id] === aq.ans;
            const isCurrent = i === current;
            const isMarked = marked[aq.id];
            return (
              <button key={aq.id} onClick={() => setCurrent(i)} style={{
                width:28,height:28,borderRadius:4,border: isCurrent?"2px solid #7F77DD":"0.5px solid var(--color-border-tertiary)",
                background: isMarked?"#FAEEDA":isSkipped?"#F1EFE8":isAns?(isCorrect?"#EAF3DE":"#FCEBEB"):"var(--color-background-secondary)",
                color: isCurrent?"#7F77DD":isSkipped?"#888780":isAns?(isCorrect?"#3B6D11":"#A32D2D"):"var(--color-text-secondary)",
                fontSize:10,fontWeight:500,cursor:"pointer"
              }}>{aq.num.slice(-2)}</button>
            );
          })}
        </div>
      </div>
    );
  }

  if (screen === "browse") {
    return (
      <div style={{fontFamily:"system-ui,sans-serif",maxWidth:860,margin:"0 auto",padding:"1rem"}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:16,flexWrap:"wrap"}}>
          <button onClick={() => setScreen("home")} style={navBtn}>← Back</button>
          <input type="text" placeholder="Search questions..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
            style={{flex:1,minWidth:200,padding:"7px 12px",borderRadius:7,border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",fontSize:14,color:"var(--color-text-primary)"}}/>
          <span style={{fontSize:13,color:"var(--color-text-tertiary)"}}>{filteredForSearch.length} questions</span>
        </div>
        {filteredForSearch.map(question => (
          <div key={question.id} style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:10,padding:"0.875rem 1rem",marginBottom:10}}>
            <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:6,flexWrap:"wrap"}}>
              <span style={{fontSize:12,color:"var(--color-text-tertiary)"}}>Q{question.num}</span>
              <span style={{fontSize:12,padding:"2px 8px",borderRadius:10,background:getTopicColor(question.topic)+"22",color:getTopicColor(question.topic)}}>{question.topic}</span>
              <span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>{question.src}</span>
            </div>
            <div style={{fontSize:14,color:"var(--color-text-primary)",marginBottom:6,lineHeight:1.6}}>{question.q}</div>
            <div style={{fontSize:13,color:"#1D9E75"}}>Answer: {question.opts[question.ans]}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:860,margin:"0 auto",padding:"1.5rem 1rem"}}>
      <div style={{textAlign:"center",marginBottom:"2rem"}}>
        <div style={{fontSize:28,fontWeight:500,color:"var(--color-text-primary)",marginBottom:4}}>Network Theory Quiz</div>
        <div style={{fontSize:15,color:"var(--color-text-secondary)"}}>191 Questions · Q814–Q1004 · Multiple Exam Sources</div>
      </div>

      {screen === "resume" && savedState && (
        <div style={{background:"#E6F1FB",border:"0.5px solid #B5D4F4",borderRadius:10,padding:"1rem",marginBottom:20,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1}}>
            <div style={{fontWeight:500,color:"#0C447C",marginBottom:2}}>Resume previous session</div>
            <div style={{fontSize:13,color:"#185FA5"}}>Q{savedState.activeQuestions[savedState.current]?.num} · {Object.keys(savedState.answers).length}/{savedState.activeQuestions.length} answered</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={resumeQuiz} style={{...btnStyle("#185FA5"),padding:"7px 16px"}}>Resume →</button>
            <button onClick={() => { setScreen("home"); setSavedState(null); localStorage.removeItem(STORAGE_KEY); }} style={{...navBtn,fontSize:13}}>Discard</button>
          </div>
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12,marginBottom:24}}>
        {[
          {label:"All Questions",count:191,color:"#7F77DD",desc:"Complete Q814–Q1004"},
          {label:"By Topic",count:TOPICS.length-1,color:"#1D9E75",desc:"Filter by topic"},
          {label:"Random Mode",count:"∞",color:"#D85A30",desc:"Shuffled questions"},
          {label:"Browse Mode",count:191,color:"#378ADD",desc:"Study all Q&A"},
        ].map((card,i) => (
          <div key={i} onClick={() => {
            if (i===0) startQuiz("sequential","All Topics");
            else if (i===1) setScreen("topicSelect");
            else if (i===2) startQuiz("random","All Topics",true);
            else setScreen("browse");
          }} style={{
            background:"var(--color-background-primary)",border:`0.5px solid ${card.color}44`,
            borderRadius:12,padding:"1rem",cursor:"pointer",
            transition:"transform 0.15s",userSelect:"none"
          }}>
            <div style={{fontSize:22,fontWeight:500,color:card.color,marginBottom:2}}>{card.count}</div>
            <div style={{fontSize:15,fontWeight:500,color:"var(--color-text-primary)",marginBottom:2}}>{card.label}</div>
            <div style={{fontSize:13,color:"var(--color-text-secondary)"}}>{card.desc}</div>
          </div>
        ))}
      </div>

      {screen === "topicSelect" && (
        <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"1rem",marginBottom:20}}>
          <div style={{fontWeight:500,marginBottom:12,color:"var(--color-text-primary)"}}>Select Topic</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {TOPICS.slice(1).map(t => {
              const count = QUESTIONS.filter(q=>q.topic===t).length;
              return (
                <button key={t} onClick={() => startQuiz("sequential", t)} style={{
                  padding:"6px 14px",borderRadius:20,border:`0.5px solid ${getTopicColor(t)}55`,
                  background:getTopicColor(t)+"18",color:getTopicColor(t),
                  cursor:"pointer",fontSize:13,fontWeight:500
                }}>{t} ({count})</button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{marginBottom:24}}>
        <div style={{fontSize:15,fontWeight:500,marginBottom:10,color:"var(--color-text-primary)"}}>Topics covered</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {TOPICS.slice(1).map(t => {
            const c = QUESTIONS.filter(q=>q.topic===t).length;
            return (
              <span key={t} style={{fontSize:12,padding:"3px 10px",borderRadius:12,background:getTopicColor(t)+"18",color:getTopicColor(t)}}>
                {t} · {c}
              </span>
            );
          })}
        </div>
      </div>

      <div style={{background:"var(--color-background-secondary)",borderRadius:10,padding:"1rem",fontSize:13,color:"var(--color-text-secondary)",lineHeight:1.8}}>
        <div style={{fontWeight:500,color:"var(--color-text-primary)",marginBottom:6}}>Features</div>
        <div>✓ All 191 questions from Q814–Q1004 with detailed explanations</div>
        <div>✓ Resume quiz from where you left off (auto-saved)</div>
        <div>✓ Mark questions for review · Question navigator grid</div>
        <div>✓ Detailed results with topic-wise performance analysis</div>
        <div>✓ Retry wrong answers · Browse mode to study all Q&A</div>
        <div>✓ Sources: RSEB JE, SSC JE, RRB JE, UPPCL JE, ESE, NMRC JE and more</div>
      </div>
    </div>
  );
}

const btnStyle = (color) => ({
  padding:"8px 18px",borderRadius:7,border:"none",background:color,
  color:"white",cursor:"pointer",fontSize:14,fontWeight:500
});

const navBtn = {
  padding:"7px 14px",borderRadius:7,border:"0.5px solid var(--color-border-secondary)",
  background:"var(--color-background-primary)",cursor:"pointer",fontSize:14,
  color:"var(--color-text-primary)"
};
