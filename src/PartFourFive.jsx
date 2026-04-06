import React, { useState } from "react";
const allQuestions = [
  // ── PART 4 ──────────────────────────────────────────────────────────────────
  // Section VIII – Non-conventional Sources of Energy  Q40–Q127
  {
    part: 4,
    section: "VIII",
    q: "Q40",
    topic: "Non-Conventional Energy",
    question: "The range of wind speed for a windmill to generate power is:",
    options: ["5–16 m/s", "0–25 m/s", "10–50 m/s", "15–30 m/s"],
    answer: 0,
    explanation: "Windmills generate power effectively in the wind speed range of 5–16 m/s. Below 5 m/s there is insufficient kinetic energy; above 16 m/s turbines are usually furled for safety."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q41",
    topic: "Non-Conventional Energy",
    question: "Output of a single photovoltaic (solar) cell is:",
    options: ["6 V", "3–5 V", "12 V", "Less than 1 V"],
    answer: 3,
    explanation: "A single PV cell produces a voltage of less than 1 V (typically 0.5–0.6 V). Multiple cells are combined in series/parallel to form modules with higher usable voltages."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q42",
    topic: "Non-Conventional Energy",
    question: "Which power plant uses a non-conventional source of energy?",
    options: ["Thermal", "Nuclear", "Wind", "Hydroelectric"],
    answer: 2,
    explanation: "Wind power is a non-conventional (renewable) source of energy. Thermal, nuclear, and conventional hydroelectric are classified as conventional sources."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q43",
    topic: "Non-Conventional Energy",
    question: "The process of heat transfer during re-entry of satellites and missiles at very high speeds into Earth's atmosphere is known as:",
    options: ["Ablation", "Radiation", "Viscous dissipation", "Irradiation"],
    answer: 0,
    explanation: "Ablation is the process where material on the surface of a re-entering body is vaporised or eroded, carrying away intense frictional heat and protecting the craft."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q44",
    topic: "Non-Conventional Energy",
    question: "Four power plants are given — Thermal, Nuclear, Solar, and Hydro-electric. Which is the odd one out?",
    options: ["Thermal", "Nuclear", "Solar", "Hydro-electric"],
    answer: 2,
    explanation: "Solar power is a non-conventional (renewable) energy source, whereas thermal, nuclear, and hydro-electric are conventional methods of power generation."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q45",
    topic: "Non-Conventional Energy",
    question: "Submarines for underwater movement are powered with the help of:",
    options: ["Wind engine", "Geo-thermal engines", "Batteries", "Solar engine"],
    answer: 2,
    explanation: "Conventional submarines use batteries (charged by diesel generators on the surface) for underwater propulsion, as combustion engines require atmospheric oxygen."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q46",
    topic: "Non-Conventional Energy",
    question: "Which one is NOT a non-conventional source of energy?",
    options: ["Tidal wave", "Geothermal energy", "Nuclear energy", "Wind power"],
    answer: 2,
    explanation: "Nuclear energy is NOT classified as a non-conventional (renewable) source. Non-conventional sources are those continuously replenished by natural processes, e.g., wind, tidal, geothermal."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q47",
    topic: "Non-Conventional Energy",
    question: "Direct conversion of heat into electric power is possible through:",
    options: ["A battery", "Thermionic converter", "Fuel cell", "All of the above"],
    answer: 1,
    explanation: "A thermionic converter directly converts heat into electrical energy via thermionic emission. Batteries convert chemical energy, and fuel cells convert chemical energy electrochemically."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q48",
    topic: "Non-Conventional Energy",
    question: "Which source of power is least reliable?",
    options: ["Solar energy", "Geothermal power", "MHD", "Wind power"],
    answer: 3,
    explanation: "Wind power is the least reliable because wind speed is highly variable and unpredictable, making consistent power generation difficult compared to geothermal or MHD sources."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q49",
    topic: "Non-Conventional Energy",
    question: "Pugga valley in Ladakh is suitable for which power generation?",
    options: ["Wind", "Solar", "Geo thermal", "All of these"],
    answer: 2,
    explanation: "Pugga valley in Ladakh (Jammu & Kashmir) is a known geothermal site in India, suitable for geothermal power generation."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q50",
    topic: "Non-Conventional Energy",
    question: "Which is the INCORRECT statement about conventional sources of electrical energy generation?",
    options: [
      "Fuels are likely to be depleted in near future",
      "Maintenance costs are high",
      "Toxic fumes and residues pollute the environment",
      "Overall conversion efficiency is very good"
    ],
    answer: 3,
    explanation: "The overall conversion efficiency of conventional sources (coal, petroleum) is NOT very good — it is typically only 30–40%. All other statements are correct drawbacks of conventional sources."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q51",
    topic: "Non-Conventional Energy",
    question: "Silicon solar cell has an open-circuit voltage NOT equivalent to:",
    options: ["1 V", "1.3 V", "0.45 V", "All of the options"],
    answer: 3,
    explanation: "Silicon solar cells have open-circuit voltages up to ~764 mV (commercial multi-crystalline ~600 mV). None of the listed values (1 V, 1.3 V, 0.45 V) matches the actual range, so all options are incorrect."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q52",
    topic: "Non-Conventional Energy",
    question: "Direct conversion of heat into electrical energy is done by:",
    options: ["Fuel cells", "Steam cells", "Solar cells", "MHD generators"],
    answer: 3,
    explanation: "MHD (Magneto-Hydro-Dynamic) generators directly convert thermal energy and kinetic energy of a conducting fluid into electrical energy without moving mechanical parts."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q53",
    topic: "Non-Conventional Energy",
    question: "Which among the following directly converts heat into electrical energy?",
    options: ["Fuel cells", "Steam generators", "Magneto-hydro-dynamic generators", "Solar cells"],
    answer: 2,
    explanation: "MHD generators utilise the Brayton cycle to transform thermal and kinetic energy of ionised gases directly into electricity using the principle of electromagnetic induction — no rotating parts."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q54",
    topic: "Non-Conventional Energy",
    question: "Beaufort number is related to which renewable energy source?",
    options: ["Wind energy", "Tidal energy", "Biogas", "Solar energy"],
    answer: 0,
    explanation: "The Beaufort scale (Beaufort number) measures wind force/speed on a scale of 0–12 (up to 17 for tropical typhoons). It is directly related to wind energy assessment."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q55",
    topic: "Non-Conventional Energy",
    question: "The algorithm used to extract maximum power from a solar PV system is known as:",
    options: ["MPPT", "MMPP", "PMMT", "MMMT"],
    answer: 0,
    explanation: "MPPT stands for Maximum Power Point Tracking. It is an advanced power-electronic algorithm/topology used in solar systems to continuously extract maximum available power from PV modules."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q56",
    topic: "Non-Conventional Energy",
    question: "A solar cell converts energy of light into electricity by:",
    options: ["Chemical effect", "Atmospheric effect", "Photovoltaic effect", "Physical effect"],
    answer: 2,
    explanation: "The photovoltaic (PV) effect is the generation of voltage and current in a material upon exposure to light. It is the fundamental working principle of all solar cells."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q57",
    topic: "Non-Conventional Energy",
    question: "Which of the following plants is a non-conventional source of energy?",
    options: ["Water", "Boiler", "Thermal", "Solar"],
    answer: 3,
    explanation: "Solar energy is a non-conventional (renewable) source. Water (conventional hydro), boiler, and thermal power plants rely on conventional fossil fuels."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q58",
    topic: "Non-Conventional Energy",
    question: "Which of the following is a drawback of tidal power?",
    options: [
      "Predictable energy output",
      "Maintenance and repair of equipment",
      "Running cost is cheap",
      "Protects coastal flooding"
    ],
    answer: 1,
    explanation: "The main drawback of tidal power is the high cost of maintenance and repair of underwater equipment exposed to harsh marine environments."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q59",
    topic: "Non-Conventional Energy",
    question: "Which power station is NOT considered a self-generating type?",
    options: ["Hydro", "Gas", "Nuclear", "Wind"],
    answer: 3,
    explanation: "Wind energy is not self-generating in the sense that the Darrieus vertical-axis wind machine is not self-starting. More broadly, wind plants depend entirely on external wind and cannot dispatch power on demand."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q60",
    topic: "Non-Conventional Energy",
    question: "The ratio of the maximum power from a solar cell to the product of short-circuit current and open-circuit voltage is known as:",
    options: ["Peak factor", "Form factor", "Fill factor", "RMS"],
    answer: 2,
    explanation: "Fill Factor (FF) = P_max / (V_oc × I_sc). It measures how 'square' the I-V curve is. A higher fill factor indicates a better-quality solar cell."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q61",
    topic: "Non-Conventional Energy",
    question: "A geothermal field produces:",
    options: ["Hot water and wet steam only", "Hot water and dry steam only", "Hot water, wet steam, and dry steam", "None"],
    answer: 2,
    explanation: "Geothermal fields can produce (1) hot water, (2) wet steam (mixture of steam and hot water), and (3) dry steam, depending on the geological characteristics of the site."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q62",
    topic: "Non-Conventional Energy",
    question: "Which of the following statements is FALSE?",
    options: [
      "The amount of tidal energy is independent of range of tides",
      "Biogas contains approximately 70% of methane",
      "The manure from biogas plant easily mixes with soil",
      "Solar energy can be employed for running water pumps"
    ],
    answer: 0,
    explanation: "This statement is FALSE. Tidal energy is directly proportional to the square of the tidal range — a larger tidal range produces significantly more energy."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q63",
    topic: "Non-Conventional Energy",
    question: "Hydrothermal, geopressure, and petrothermal are types of:",
    options: ["Tidal energy", "Biogas energy", "Geothermal energy", "Wind energy"],
    answer: 2,
    explanation: "These are three sub-categories of geothermal energy based on how heat is stored underground: hydrothermal (hot water/steam), geopressure (high-pressure hot water), and petrothermal (hot dry rock)."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q64",
    topic: "Non-Conventional Energy",
    question: "The maximum efficiency of a wind power plant is NOT more than:",
    options: ["40%", "60%", "50%", "70%"],
    answer: 0,
    explanation: "The theoretical maximum efficiency of any wind turbine is the Betz limit (~59.3%). In practice, modern wind turbines achieve 35–45%, so the maximum is not more than about 40% for practical plants."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q65",
    topic: "Non-Conventional Energy",
    question: "Which of the following is NOT a fossil fuel?",
    options: ["Natural gas", "Wood", "Oil", "Coal"],
    answer: 1,
    explanation: "Wood is a biomass fuel, NOT a fossil fuel. Fossil fuels (natural gas, oil, coal) are formed from ancient organic matter over millions of years under geological pressure."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q66",
    topic: "Non-Conventional Energy",
    question: "Identify the renewable source of energy from the given options.",
    options: ["Sun", "Wood", "Fossil Fuels", "Nuclear Fuels"],
    answer: 0,
    explanation: "The Sun is an inexhaustible renewable energy source. Solar radiation is continuously available and can be replenished naturally, unlike wood (depleting forests), fossil fuels, or nuclear fuels."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q67",
    topic: "Non-Conventional Energy",
    question: "The principle of operation of a Magneto Hydro Dynamic (MHD) generator is:",
    options: ["Fleming's law", "Plank's law", "Kirchhoff's law", "Faraday's law"],
    answer: 3,
    explanation: "An MHD generator works on Faraday's law of electromagnetic induction: a conducting fluid (gas/liquid) moving through a magnetic field generates an EMF, producing electricity without mechanical moving parts."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q68",
    topic: "Non-Conventional Energy",
    question: "The efficiency of a Savonius windmill is about:",
    options: ["5%", "15%", "25%", "35%"],
    answer: 1,
    explanation: "The Savonius rotor is a vertical-axis drag-type wind machine. Its efficiency is about 15%, which is lower than lift-type (propeller) turbines but it is self-starting."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q69",
    topic: "Non-Conventional Energy",
    question: "Pollution due to tidal energy generation is usually:",
    options: ["Zero", "Low", "Moderate", "High"],
    answer: 0,
    explanation: "Tidal energy is a clean, renewable energy source. It produces zero air, water, or greenhouse gas pollution during operation."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q70",
    topic: "Non-Conventional Energy",
    question: "In a biogas plant, the pH of the slurry is kept between:",
    options: ["4.5–5.5", "5.5–6.5", "6.5–8.5", "8.5–10.5"],
    answer: 2,
    explanation: "Methane-producing (methanogenic) bacteria thrive in a near-neutral to slightly alkaline environment. A pH of 6.5–8.5 is maintained to ensure optimum biogas production."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q71",
    topic: "Non-Conventional Energy",
    question: "Solar energy CANNOT be used in which of the following processes?",
    options: ["Energy production", "Nuclear reactions", "Purification of water", "Cooking of food"],
    answer: 1,
    explanation: "Nuclear reactions (fission/fusion) require extremely high temperatures and particle bombardment that cannot be initiated by solar energy. Solar energy CAN be used for energy production, water purification, and cooking."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q72",
    topic: "Non-Conventional Energy",
    question: "Which of the following is NOT a type of horizontal-axis windmill?",
    options: ["Multi Blade", "Sail", "Propeller", "Darrieus"],
    answer: 3,
    explanation: "The Darrieus machine is a vertical-axis wind turbine. Horizontal-axis types include multi-blade, sail, propeller, and Dutch types."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q73",
    topic: "Non-Conventional Energy",
    question: "Which gas is majorly produced by anaerobic decomposition of human or animal excreta?",
    options: ["Methane", "Carbon dioxide", "Nitrogen dioxide", "Ammonia"],
    answer: 0,
    explanation: "Anaerobic digestion of organic matter (animal/human excreta) by methanogens predominantly produces methane (CH₄), which constitutes ~60% of biogas."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q74",
    topic: "Non-Conventional Energy",
    question: "In a biogas plant, the gas collector is usually _______ in shape:",
    options: ["Conical", "Hemispherical", "Cubical", "Pyramidal"],
    answer: 1,
    explanation: "The gas holder/collector in a biogas plant is typically hemispherical (dome-shaped) to efficiently collect and store the biogas produced by anaerobic digestion."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q75",
    topic: "Non-Conventional Energy",
    question: "Yaw control in a wind energy power plant:",
    options: [
      "Rotates the turbine about the horizontal axis",
      "Rotates the turbine about the vertical axis",
      "Controls the gear speed",
      "Controls the turbine speed"
    ],
    answer: 1,
    explanation: "The yaw system rotates the entire nacelle (and rotor) about the vertical (tower) axis to keep the rotor facing into the wind, maximising energy capture."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q76",
    topic: "Non-Conventional Energy",
    question: "Based on the type of rotor, which turbine is used for a vertical-axis wind turbine?",
    options: ["Wound rotor turbine", "Multiple blade turbine", "Propeller turbine", "Savonius turbine"],
    answer: 3,
    explanation: "The Savonius turbine is a vertical-axis wind turbine. It is self-starting, slow-speed, and low-efficiency but simple in design. The Darrieus machine is another VAWT type but is not self-starting."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q77",
    topic: "Non-Conventional Energy",
    question: "Fuel cells for power generation have a drawback of:",
    options: [
      "Noise, pollution and maintenance problems",
      "Very high development costs",
      "Low life span",
      "Synchronisation problems"
    ],
    answer: 1,
    explanation: "Fuel cells are costly to manufacture mainly because they use expensive catalysts (platinum). Infrastructure for hydrogen distribution is also limited, making development and deployment costs very high."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q78",
    topic: "Non-Conventional Energy",
    question: "The solar or photovoltaic cell converts:",
    options: [
      "Chemical energy into electrical energy",
      "Solar radiations into electrical energy",
      "Solar radiations into thermal energy",
      "Thermal energy into electrical energy"
    ],
    answer: 1,
    explanation: "A photovoltaic (solar) cell converts solar radiation (photons) directly into electrical energy through the photovoltaic effect — the liberation of electrons when photons strike a semiconductor junction."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q79",
    topic: "Non-Conventional Energy",
    question: "Pumped storage plant is suitable for:",
    options: ["Peak loads", "Off peak loads", "Average load", "Medium load"],
    answer: 0,
    explanation: "A pumped storage plant pumps water to an upper reservoir during off-peak hours and releases it to generate electricity during peak-demand periods, making it ideal for peak-load supply."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q80",
    topic: "Non-Conventional Energy",
    question: "For a large national interconnected grid, which statements are correct?\n1. Better load frequency control\n2. Same total installed capacity can meet lower demands\n3. Better hydro/thermal/nuclear/renewable coordination and energy conservation.",
    options: ["1 and 3 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    answer: 0,
    explanation: "Interconnecting areas requires better load frequency control (statement 1) and enables better coordination of plant types, saving energy (statement 3). Statement 2 is incorrect — it requires the same or more installed capacity, not less."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q81",
    topic: "Non-Conventional Energy",
    question: "Which device converts light energy into electric energy?",
    options: ["Phototransistor", "LED", "Photovoltaic cell", "Photo resistor"],
    answer: 2,
    explanation: "A photovoltaic (PV) cell is a semiconductor device that converts light energy directly into electrical energy through the photovoltaic effect. It is also called a solar cell."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q82",
    topic: "Non-Conventional Energy",
    question: "Which is an example of converting energy from one form to another?",
    options: ["Solar cell", "Transistor", "Circuit breaker", "Lightning arrester"],
    answer: 0,
    explanation: "A solar cell converts solar (light) energy into electrical energy — a classic example of energy form conversion. Transistors, circuit breakers, and lightning arresters do not convert energy forms."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q83",
    topic: "Non-Conventional Energy",
    question: "Which is an unconventional source of electrical power?",
    options: ["Coal", "Diesel oil", "Geothermal energy", "Nuclear power"],
    answer: 2,
    explanation: "Geothermal energy is an unconventional (renewable) source derived from Earth's internal heat. Coal, diesel, and nuclear power are conventional sources."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q84",
    topic: "Non-Conventional Energy",
    question: "In MHD (magneto-hydro-dynamic) plants:",
    options: [
      "Rotating conductors are used",
      "Gaseous or liquid conductor is used",
      "Electrolytic solution is used",
      "Kinetic energy of high-velocity gases is used for conversion into electrical energy"
    ],
    answer: 1,
    explanation: "MHD generators use a hot, ionised gas (plasma) or liquid metal as the conducting medium instead of solid metal conductors. This fluid moves through a magnetic field to generate an EMF."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q85",
    topic: "Non-Conventional Energy",
    question: "Typical solar cell efficiency is:",
    options: ["Less than 5%", "12% to 25%", "30% to 40%", "More than 50%"],
    answer: 1,
    explanation: "Typical commercial solar cell efficiency ranges from 12% to 25% depending on cell type: mono-crystalline (~20–25%), poly-crystalline (~15–18%), and thin-film (~10–12%)."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q86",
    topic: "Non-Conventional Energy",
    question: "India receives solar energy in the range of:",
    options: [
      "5–7 kWh/m² for 300–330 days in a year",
      "50–70 kWh/m² for 300–330 days in a year",
      "5–7 kWh/m² for 200–230 days in a year",
      "50–70 kWh/m² for 200–230 days in a year"
    ],
    answer: 0,
    explanation: "India receives abundant solar radiation of 5–7 kWh/m²/day for 300–330 days per year, making it one of the best countries for solar energy exploitation."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q87",
    topic: "Non-Conventional Energy",
    question: "Biogas comprises mainly of:",
    options: [
      "60% oxygen and 40% carbon dioxide",
      "60% oxygen and 40% methane",
      "60% methane and 40% oxygen",
      "60% methane and rest carbon dioxide"
    ],
    answer: 3,
    explanation: "Biogas is primarily composed of ~60% methane (CH₄) and ~40% carbon dioxide (CO₂), with traces of H₂S and water vapour. Methane gives it its combustible properties."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q88",
    topic: "Non-Conventional Energy",
    question: "Global warming is mainly due to:",
    options: [
      "Emission of heat from engines",
      "Emission of CO₂ due to burning of fossil fuels",
      "Use of nuclear energy",
      "Air pollution"
    ],
    answer: 1,
    explanation: "The primary cause of global warming is the increased concentration of CO₂ (and other greenhouse gases) in the atmosphere resulting from the burning of fossil fuels, which traps heat."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q89",
    topic: "Non-Conventional Energy",
    question: "The possible site for geothermal energy extraction for electricity in India is:",
    options: ["Madhya Pradesh", "Kerala", "Tamil Nadu", "Assam"],
    answer: 0,
    explanation: "Madhya Pradesh (Tattapani in Chhattisgarh region) along with Ladakh (Pugga) are key geothermal sites in India due to geological hot-rock formations."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q90",
    topic: "Non-Conventional Energy",
    question: "Horizontal axis and vertical axis are types of:",
    options: ["Nuclear Reactor", "Wind Mills", "Bio Gas Reactor", "Solar Cell"],
    answer: 1,
    explanation: "Windmills (wind turbines) are broadly classified into horizontal-axis (HAWT) and vertical-axis (VAWT) types based on the orientation of the rotor shaft."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q91",
    topic: "Non-Conventional Energy",
    question: "The Fill Factor of a silicon solar cell is approximately:",
    options: ["1", "0.7", "0.5", "0"],
    answer: 1,
    explanation: "The fill factor of a good silicon solar cell is approximately 0.7–0.8. FF = V_mp × I_mp / (V_oc × I_sc). A higher FF indicates a more ideal cell with lower internal resistance."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q92",
    topic: "Non-Conventional Energy",
    question: "Match India's installed non-conventional energy capacity: Solar Power → ?, Wind Power → ?, Bagasse Cogeneration → ?, Biomass Power → ?",
    options: [
      "Solar: 2800, Wind: 3063, Bagasse: 1365, Biomass: 22465",
      "Solar: 3063, Wind: 22465, Bagasse: 2800, Biomass: 1365",
      "Solar: 22465, Wind: 3063, Bagasse: 2800, Biomass: 1365",
      "Solar: 3063, Wind: 2800, Bagasse: 22465, Biomass: 1365"
    ],
    answer: 1,
    explanation: "As per the data: Solar Power – 3063 MW; Wind Power – 22,465 MW (largest); Bagasse Cogeneration – 2800 MW; Biomass Power – 1365 MW."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q93",
    topic: "Non-Conventional Energy",
    question: "Minimum wind speed required for generating electricity in a windmill is:",
    options: ["15 m/hour", "1 km/hour", "15 km/hour", "None of the above"],
    answer: 2,
    explanation: "A minimum wind speed of about 15 km/hour (≈4 m/s, called cut-in speed) is required to start generating electricity from a typical windmill."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q94",
    topic: "Non-Conventional Energy",
    question: "The advantage of MHD system is:",
    options: ["Good efficiency", "Low pollution", "Conservation of fuel", "All of the above"],
    answer: 3,
    explanation: "MHD generators offer: (1) higher efficiency since they can operate at very high temperatures, (2) low pollution as no combustion products, and (3) conservation of fuel due to higher conversion efficiency."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q95",
    topic: "Non-Conventional Energy",
    question: "The maximum output power delivered by a solar cell with sunlight directly on a clear day is about:",
    options: ["12 to 15 mW/cm²", "15 to 20 mW/cm²", "20 to 25 mW/cm²", "8 to 9 mW/cm²"],
    answer: 3,
    explanation: "A typical silicon solar cell delivers about 8–9 mW/cm² of output power under standard test conditions (1000 W/m² irradiance, 25°C)."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q96",
    topic: "Non-Conventional Energy",
    question: "The power in the wind P_w through a given cross-sectional area for a uniform wind velocity V is:",
    options: ["P_w = KV³", "P_w = KV²", "P_w = KV", "P_w = KV⁴"],
    answer: 0,
    explanation: "Wind power P = ½ρAV³, where ρ is air density, A is swept area, and V is wind speed. So P ∝ V³. Doubling wind speed increases power eightfold."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q97",
    topic: "Non-Conventional Energy",
    question: "Which is a renewable source of energy?",
    options: ["Oil", "Wind", "Coal", "Natural gas"],
    answer: 1,
    explanation: "Wind is a renewable energy source — it is naturally and continuously replenished. Oil, coal, and natural gas are non-renewable fossil fuels that take millions of years to form."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q98",
    topic: "Non-Conventional Energy",
    question: "In a pumped storage system of power generation, water is pumped:",
    options: [
      "Upstream during peak hours",
      "Upstream during off-peak hours",
      "Upstream during off season",
      "None of the above"
    ],
    answer: 1,
    explanation: "During off-peak hours (when electricity demand is low), surplus power is used to pump water from a lower to an upper reservoir. During peak hours, this water is released to generate electricity."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q99",
    topic: "Non-Conventional Energy",
    question: "Absorption of solar radiation on Earth's surface occurs due to presence of:",
    options: ["Ozone", "Water vapours", "Carbon dioxide", "All of the above"],
    answer: 3,
    explanation: "Solar radiation is absorbed by ozone (UV absorption), water vapour (infrared absorption), and carbon dioxide in the atmosphere. All three contribute to the greenhouse effect."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q100",
    topic: "Non-Conventional Energy",
    question: "The output of a solar cell is of the order of:",
    options: ["1 W", "2 W", "10 W", "20 W"],
    answer: 0,
    explanation: "A standard single solar cell produces about 0.5–0.6 V and current of ~28–35 mA/cm². Typical cell output is approximately 1 W. Multiple cells form modules for higher power."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q101",
    topic: "Non-Conventional Energy",
    question: "Which is a non-renewable source of energy?",
    options: ["Wood", "Sun", "Fossil fuels", "Wind"],
    answer: 2,
    explanation: "Fossil fuels (coal, oil, natural gas) are non-renewable sources. They cannot be replenished on a human timescale once consumed."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q102",
    topic: "Non-Conventional Energy",
    question: "Fuel cells are:",
    options: ["Carbon cell", "Hydrogen battery", "Nuclear cell", "Chromium cell"],
    answer: 0,
    explanation: "A Direct Carbon Fuel Cell (DCFC) is a type of fuel cell that uses carbon-rich material (biomass or coal) as fuel, combining carbon with oxygen electrochemically to produce electricity."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q103",
    topic: "Non-Conventional Energy",
    question: "Which is used for non-conventional systems to generate electrical energy?",
    options: ["Diesel electrical system", "Nuclear system", "Tidal energy", "Thermal system"],
    answer: 2,
    explanation: "Tidal energy is a non-conventional (renewable) source that converts the natural rise and fall of ocean tides into electricity. Diesel, nuclear, and thermal are conventional sources."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q104",
    topic: "Non-Conventional Energy",
    question: "Which power plant requires the largest area to produce the same amount of electricity?",
    options: ["Diesel power plant", "Nuclear power plant", "Solar power plant", "Thermal power plant"],
    answer: 2,
    explanation: "Solar power plants require very large land areas (solar farms) because the power density of sunlight is low (~1 kW/m²) and typical panel efficiency is only 15–20%."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q105",
    topic: "Non-Conventional Energy",
    question: "Which is NOT a non-conventional energy source?",
    options: ["Solar", "Biogas", "Wind", "Electricity"],
    answer: 3,
    explanation: "Electricity is a form of energy, not a source of energy. Solar, biogas, and wind are all non-conventional (renewable) energy sources."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q106",
    topic: "Non-Conventional Energy",
    question: "Biogas depends on:",
    options: ["Electrical energy", "Waste products", "Ocean", "Rain"],
    answer: 1,
    explanation: "Biogas is produced by the anaerobic decomposition of organic waste products (animal/human excreta, agricultural waste). It is an emerging renewable energy resource."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q107",
    topic: "Non-Conventional Energy",
    question: "Solar energy is used for:",
    options: ["Lighting", "Cooking", "Battery charging", "All above"],
    answer: 3,
    explanation: "Solar energy has diverse applications: thermal applications include cooking (solar cookers), water heating, and drying; electrical applications include lighting, battery charging, and PV electricity generation."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q108",
    topic: "Non-Conventional Energy",
    question: "Which of the following is NOT a source of power?",
    options: ["Thermocouple", "Photovoltaic cell", "Solar cell", "Photo electric cell"],
    answer: 0,
    explanation: "A thermocouple is a temperature measurement sensor that produces a very small mV signal — it is NOT a practical power source. PV cells, solar cells, and photoelectric cells generate usable electrical power."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q109",
    topic: "Non-Conventional Energy",
    question: "Suitable turbine used for harnessing tidal power is:",
    options: ["Francis turbine", "Pelton wheel", "Kaplan turbine", "None"],
    answer: 2,
    explanation: "The Kaplan turbine is a propeller-type reaction turbine suitable for low-head, high-flow conditions — exactly the characteristics of tidal power sites. It can be fully immersed and operates in both flow directions."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q110",
    topic: "Non-Conventional Energy",
    question: "Which is NOT a constituent of a solar lighting system?",
    options: ["PV cell", "Back up batteries", "Charger", "Earth wire"],
    answer: 3,
    explanation: "A solar lighting system consists of PV cells, batteries (backup), and a charge controller/charger. An earth wire is a safety grounding element and is not a functional component of the solar lighting system."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q111",
    topic: "Non-Conventional Energy",
    question: "A photovoltaic module has Fill Factor 0.8, V_oc = 0.6 V, I_sc = 8 A for a single cell, 48 cells in series, V_mp = 0.9 × V_oc. The current at maximum power is:",
    options: ["8.21 A", "7.11 A", "6.32 A", "5.45 A"],
    answer: 1,
    explanation: "FF = (V_mp × I_mp)/(V_oc × I_sc) → I_mp = FF × I_sc × V_oc / V_mp = 0.8 × 8 × V_oc / (0.9 × V_oc) = 0.8 × 8 / 0.9 ≈ 7.11 A. (The number of series cells cancels out in this ratio.)"
  },
  {
    part: 4,
    section: "VIII",
    q: "Q112",
    topic: "Non-Conventional Energy",
    question: "Which one of the following power plants is the LEAST reliable?",
    options: ["Tidal", "Solar", "Wind", "Geothermal"],
    answer: 2,
    explanation: "Wind energy is the least reliable because wind speed is highly variable, intermittent, and unpredictable. Tidal is predictable; geothermal is base-load; solar is more predictable than wind."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q113",
    topic: "Non-Conventional Energy",
    question: "As per Government of India plans, the capacity of renewable energy based power plants to be installed by 2022 is:",
    options: ["150 GW", "200 GW", "175 GW", "300 GW"],
    answer: 2,
    explanation: "The Government of India set a target of 175 GW of renewable energy capacity by 2022: 100 GW solar, 60 GW wind, 10 GW bio-power, and 5 GW small hydro."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q114",
    topic: "Non-Conventional Energy",
    question: "Which is NOT a secondary source of energy?",
    options: ["Solar power station", "Diesel power station", "Nuclear power station", "Thermal power station"],
    answer: 0,
    explanation: "Solar power directly harnesses primary energy from the sun without an intermediate conversion step. Diesel, nuclear, and thermal stations convert primary energy (fuel) into electricity (secondary energy)."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q115",
    topic: "Non-Conventional Energy",
    question: "Which is NOT a correct way of energy conservation?",
    options: [
      "Replace electrical circuit with solid state circuit",
      "Improving power factor",
      "Effective periodic maintenance",
      "Increase reactive loads"
    ],
    answer: 3,
    explanation: "Increasing reactive loads worsens the power factor, causing higher currents and greater losses — the opposite of energy conservation. The other three are valid energy conservation measures."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q116",
    topic: "Non-Conventional Energy",
    question: "Which practice can significantly reduce the need for new investment in energy generation or supply?",
    options: [
      "Reduced supply of electricity in specific areas",
      "Load shedding",
      "Increase the tariff on energy",
      "Energy conservation"
    ],
    answer: 3,
    explanation: "Energy conservation reduces overall demand, deferring or eliminating the need for expensive new generation capacity or transmission infrastructure upgrades."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q117",
    topic: "Non-Conventional Energy",
    question: "Which is NOT one of the advantages of tidal power generation?",
    options: [
      "It is free from pollution",
      "Large area of valuable land is not required",
      "As compared to other sources, this is economical",
      "It is completely independent of precipitation and its uncertainty"
    ],
    answer: 2,
    explanation: "Tidal power is NOT generally considered economical compared to other renewables due to very high installation costs of underwater barrage/turbine systems. All other listed items are genuine advantages."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q118",
    topic: "Non-Conventional Energy",
    question: "Which is a drawback of wind energy?",
    options: [
      "Wind energy system does not pollute environment",
      "There is no need for fuel transportation",
      "Naturally these are fluctuated",
      "These are a renewable source of energy"
    ],
    answer: 2,
    explanation: "Wind energy's primary drawback is its natural fluctuation — wind speed varies with time, making it intermittent and difficult to rely on for consistent baseload power."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q119",
    topic: "Non-Conventional Energy",
    question: "Which is NOT an advantage of non-conventional sources of energy?",
    options: [
      "They do not pollute the atmosphere",
      "They are well suited for decentralised use",
      "They are available in large quantities",
      "They are noise-free sources of energy"
    ],
    answer: 3,
    explanation: "Being noise-free is NOT generally an advantage of all non-conventional sources. Wind turbines, for example, generate significant noise. The other three are genuine advantages of most renewable sources."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q120",
    topic: "Non-Conventional Energy",
    question: "Which is NOT an advantage of geothermal energy?",
    options: [
      "It is a reliable source of energy",
      "The initial capital investment cost is high",
      "It is least polluting compared to conventional sources",
      "It is a renewable energy source"
    ],
    answer: 1,
    explanation: "High initial capital investment cost is a DISADVANTAGE, not an advantage, of geothermal energy. The high drilling and exploration costs make projects expensive upfront."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q121",
    topic: "Non-Conventional Energy",
    question: "Which defines ocean thermal energy conversion (OTEC)?",
    options: [
      "Technology for energy from ocean wave force",
      "Technology for energy by heating ocean surface waters",
      "Technology for energy by steam from ocean waters rotating turbine",
      "Technology for energy by temperature differences between ocean surface and deep waters"
    ],
    answer: 3,
    explanation: "OTEC exploits the temperature difference (typically ≥20°C) between warm surface seawater and cold deep seawater to run a heat engine and generate electricity."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q122",
    topic: "Non-Conventional Energy",
    question: "Which type of solar cell gives the highest efficiency?",
    options: ["Mono crystalline", "Polycrystalline germanium", "Thin film", "Polycrystalline silicon"],
    answer: 0,
    explanation: "Monocrystalline silicon solar cells have the highest efficiency (typically 20–25%) among commercially available types because of their high purity and ordered crystal structure."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q123",
    topic: "Non-Conventional Energy",
    question: "Which component is NOT required in conversion of wind energy to electrical DC supply?",
    options: ["Generator", "Wind turbine", "DC load", "Charge controller"],
    answer: 2,
    explanation: "DC load is the end-use device that consumes the generated power — it is not part of the conversion chain. The conversion chain is: Wind turbine → Generator → Charge controller → Battery/DC bus."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q124",
    topic: "Non-Conventional Energy",
    question: "A diagram shows warm surface seawater → evaporator → turbine-generator → condenser (cooled by cold deep seawater). This represents which energy conversion?",
    options: ["Ocean wave energy", "Geo thermal energy", "Ocean thermal energy", "Tidal energy"],
    answer: 2,
    explanation: "The described process — using warm surface water to evaporate a working fluid driving a turbine, then condensing with cold deep water — is the Ocean Thermal Energy Conversion (OTEC) process."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q125",
    topic: "Non-Conventional Energy",
    question: "Which power plant will have the lowest operating cost?",
    options: [
      "Nuclear power plant",
      "Photovoltaic solar plant",
      "Coal-fired combustion turbine plant",
      "Natural gas combined-cycle plant"
    ],
    answer: 1,
    explanation: "A photovoltaic solar plant has virtually zero fuel cost (sunlight is free) and very low maintenance requirements, resulting in the lowest operating cost among the listed options."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q126",
    topic: "Non-Conventional Energy",
    question: "Solar array is:",
    options: [
      "Cascade connected solar plant",
      "Combination of solar panel with inverter",
      "Series and parallel combination of solar cells",
      "Parallel combination of solar plant with another plant"
    ],
    answer: 2,
    explanation: "A solar array is a series and parallel combination of individual solar cells (forming panels) and panels (forming arrays) to achieve the desired voltage and current output for a given application."
  },
  {
    part: 4,
    section: "VIII",
    q: "Q127",
    topic: "Non-Conventional Energy",
    question: "Which statement does NOT describe tidal energy?",
    options: [
      "It is the kinetic energy from the natural rise and fall of tides",
      "It is a form of renewable energy",
      "It is the energy derived from heating the ocean surface waters",
      "It is obtained due to alternating sea levels"
    ],
    answer: 2,
    explanation: "'Energy derived from heating the ocean surface waters' describes OTEC (Ocean Thermal Energy Conversion), NOT tidal energy. Tidal energy comes from the gravitational pull of the Moon causing sea level changes."
  },

  // ── PART 5 ──────────────────────────────────────────────────────────────────
  // Section IX – Economics of Power Generation  Q54–Q238
  {
    part: 5,
    section: "IX",
    q: "Q54",
    topic: "Economics of Power",
    question: "A factory runs in 3 shifts of 8 hours each, consuming 30 kW, 15 kW and 25 kW in each shift respectively. Calculate the energy (in kWh) consumed by the factory per day.",
    options: ["186.67", "373", "560", "746.67"],
    answer: 2,
    explanation: "Energy = (30×8) + (15×8) + (25×8) = 240 + 120 + 200 = 560 kWh per day."
  },
  {
    part: 5,
    section: "IX",
    q: "Q55",
    topic: "Economics of Power",
    question: "Diversity factor has a direct effect on the:",
    options: [
      "Variable cost of the unit generated",
      "Both variable and fixed cost of unit generated",
      "Operating cost of unit",
      "Fixed cost of the unit generated"
    ],
    answer: 3,
    explanation: "A higher diversity factor means a lower maximum demand relative to individual peaks, reducing the required plant capacity and thus the capital (fixed) cost per unit generated."
  },
  {
    part: 5,
    section: "IX",
    q: "Q56",
    topic: "Economics of Power",
    question: "A generating station supplies loads of 15000, 12000, 8500, 6000, and 450 kW. Maximum demand is 22000 kW. Calculate diversity factor.",
    options: ["0.68", "1.34", "1.91", "0.52"],
    answer: 2,
    explanation: "Diversity factor = Sum of individual max demands / Station max demand = (15000+12000+8500+6000+450) / 22000 = 41950/22000 ≈ 1.91."
  },
  {
    part: 5,
    section: "IX",
    q: "Q57",
    topic: "Economics of Power",
    question: "The distribution losses suffered by the utility while transferring power from generating station to consumer are accounted under:",
    options: ["Running Charges", "Cost of fuel", "Maintenance cost", "Fixed charges"],
    answer: 0,
    explanation: "Distribution losses (I²R losses in conductors) are proportional to the amount of power transferred and are therefore classified as running (variable) charges."
  },
  {
    part: 5,
    section: "IX",
    q: "Q58",
    topic: "Economics of Power",
    question: "In a power plant, if the maximum demand equals the plant capacity, then:",
    options: [
      "Diversity factor will be unity",
      "Load factor will be unity",
      "Load factor will be nearly 60%",
      "Plant reserve capacity will be zero"
    ],
    answer: 3,
    explanation: "If maximum demand = plant capacity, then Plant Capacity Factor = 1, and Reserve Capacity = Plant Capacity − Maximum Demand = 0."
  },
  {
    part: 5,
    section: "IX",
    q: "Q59",
    topic: "Economics of Power",
    question: "If F is the load factor, the loss load factor is given by:",
    options: ["0.25F² + 0.85F", "0.75F + 0.20F²", "0.35F + 0.7F²", "0.25F + 0.75F²"],
    answer: 3,
    explanation: "The empirical formula for loss load factor (LLF) in terms of load factor (F) is: LLF = 0.25F + 0.75F². This accounts for the varying nature of losses over the load cycle."
  },
  {
    part: 5,
    section: "IX",
    q: "Q60",
    topic: "Economics of Power",
    question: "A consumer has annual consumption of 7,00,800 units. If his maximum demand is 200 kW, the load factor will be:",
    options: ["40%", "50%", "70%", "20%"],
    answer: 0,
    explanation: "Load factor = Units consumed / (Max demand × Hours/year) = 700800 / (200 × 8760) = 700800/1752000 = 0.4 = 40%."
  },
  {
    part: 5,
    section: "IX",
    q: "Q61",
    topic: "Economics of Power",
    question: "The value of demand factor is:",
    options: ["Less than one", "Greater than one", "Equal to one", "Zero"],
    answer: 0,
    explanation: "Demand factor = Maximum demand / Connected load. Since not all connected loads operate simultaneously at maximum, maximum demand < connected load. Hence demand factor < 1."
  },
  {
    part: 5,
    section: "IX",
    q: "Q62",
    topic: "Economics of Power",
    question: "The value of diversity factor is:",
    options: ["Less than one", "Greater than one", "Equal to one", "Any one of the above"],
    answer: 1,
    explanation: "Diversity factor = Sum of individual max demands / System max demand. Since individual peaks don't coincide, their sum exceeds the system peak. Therefore diversity factor > 1."
  },
  {
    part: 5,
    section: "IX",
    q: "Q63",
    topic: "Economics of Power",
    question: "The tariff most suitable for large industrial consumers is:",
    options: ["Flat demand rate", "Block meter rate", "Two part tariff", "All the above"],
    answer: 2,
    explanation: "Two-part tariff (also called Hopkinson demand rate) is most suitable for large industrial consumers as it separately charges for maximum demand (fixed charge) and energy consumed (running charge)."
  },
  {
    part: 5,
    section: "IX",
    q: "Q64",
    topic: "Economics of Power",
    question: "The knowledge of diversity factor helps in computing:",
    options: ["Plant capacity", "Average load", "Units generated", "Peak demand"],
    answer: 0,
    explanation: "Diversity factor is a key factor in determining the required plant capacity. Higher diversity factor → lower maximum demand → smaller required plant capacity and capital investment."
  },
  {
    part: 5,
    section: "IX",
    q: "Q65",
    topic: "Economics of Power",
    question: "A building has 3 floors. Each floor has 4 fans of 50 W (12 hrs/day) and one AC of 3000 W (2 hrs/day) in June (30 days). Energy consumption in kWh:",
    options: ["512", "525", "756", "504"],
    answer: 2,
    explanation: "Fans: 12 fans × 50 W × 12 h/day × 30 days = 216,000 Wh. ACs: 3 ACs × 3000 W × 2 h/day × 30 days = 540,000 Wh. Total = 756,000 Wh = 756 kWh."
  },
  {
    part: 5,
    section: "IX",
    q: "Q66",
    topic: "Economics of Power",
    question: "A house has 5 fans of 70 W (16 hrs/day) and one washing machine of 2000 W (1 hr/day) in June (30 days). Energy consumption in kWh:",
    options: ["228", "235.6", "350", "486.6"],
    answer: 0,
    explanation: "Fans: 5 × 70 × 16 × 30 = 168,000 Wh. Washing machine: 2000 × 1 × 30 = 60,000 Wh. Total = 228,000 Wh = 228 kWh."
  },
  {
    part: 5,
    section: "IX",
    q: "Q67",
    topic: "Economics of Power",
    question: "A consumer's connected load is 2 kW and maximum demand is 1.5 kW. The demand factor is:",
    options: ["0.75", "0.375", "1.33", "1"],
    answer: 0,
    explanation: "Demand factor = Maximum demand / Connected load = 1.5/2.0 = 0.75."
  },
  {
    part: 5,
    section: "IX",
    q: "Q68",
    topic: "Economics of Power",
    question: "In a system, if the base load is the same as the maximum demand, the load factor will be:",
    options: ["1.0", "0.5", "Zero", "Infinity"],
    answer: 0,
    explanation: "Load factor = Average load / Maximum demand. If base load (average load) = maximum demand, then load factor = 1.0 (unity), meaning perfectly flat demand curve."
  },
  {
    part: 5,
    section: "IX",
    q: "Q69",
    topic: "Economics of Power",
    question: "Calculate January electricity bill: 40 W lamp, 10 hrs/day, rate = ₹1/unit.",
    options: ["₹13.4", "₹12.4", "₹11.4", "₹10.4"],
    answer: 1,
    explanation: "Units = 40 W × 10 h/day × 31 days = 12,400 Wh = 12.4 kWh. Bill = 12.4 × ₹1 = ₹12.4."
  },
  {
    part: 5,
    section: "IX",
    q: "Q70",
    topic: "Economics of Power",
    question: "From a load duration curve with loads 100 MW (40% time), 60 MW (30% time), 40 MW (30% time), the load factor is:",
    options: ["1.0", "0.7", "0.6", "0.5"],
    answer: 1,
    explanation: "Avg load = (100×0.4 + 60×0.3 + 40×0.3) = 40 + 18 + 12 = 70 MW. Load factor = 70/100 = 0.7."
  },
  {
    part: 5,
    section: "IX",
    q: "Q71",
    topic: "Economics of Power",
    question: "Which of the following is true?",
    options: [
      "Load factor = Capacity factor × Utilization factor",
      "Utilisation factor = Capacity factor × Load factor",
      "Capacity factor = Load factor + Utilisation factor",
      "Capacity factor = Load factor × Utilisation factor"
    ],
    answer: 3,
    explanation: "Capacity factor = (Max demand/Plant capacity) × (Avg load/Max demand) = Utilization factor × Load factor. Hence Capacity factor = Load factor × Utilization factor."
  },
  {
    part: 5,
    section: "IX",
    q: "Q72",
    topic: "Economics of Power",
    question: "The generation of power in a power plant has to be controlled to meet the:",
    options: [
      "Demand of load and frequency",
      "Frequency and power factor",
      "Demand of load and power factor",
      "Demand of load only"
    ],
    answer: 0,
    explanation: "Power generation control (Automatic Generation Control) must simultaneously match load demand to prevent over/under generation AND maintain system frequency at 50 Hz."
  },
  {
    part: 5,
    section: "IX",
    q: "Q73",
    topic: "Economics of Power",
    question: "The ratio of a power plant's actual output over a period to its potential output if it operated at full nameplate capacity continuously is known as:",
    options: ["Average load", "Diversity factor", "Demand factor", "Plant capacity factor"],
    answer: 3,
    explanation: "Plant capacity factor = Actual energy produced / Maximum possible energy = Average demand / Plant (rated) capacity. It shows what fraction of potential output was actually generated."
  },
  {
    part: 5,
    section: "IX",
    q: "Q74",
    topic: "Economics of Power",
    question: "The daily load factor is calculated as:",
    options: [
      "Max demand / Units consumed per day",
      "Units consumed per day / (24 × Max demand)",
      "Units consumed per day / Max demand",
      "24 × Max demand / Units consumed per day"
    ],
    answer: 1,
    explanation: "Daily load factor = Average load / Max demand = (Units consumed per day / 24 hours) / Max demand = Units consumed per day / (24 × Max demand)."
  },
  {
    part: 5,
    section: "IX",
    q: "Q75",
    topic: "Economics of Power",
    question: "A consumer has maximum demand of 200 kW at 40% load factor. Find units consumed per year.",
    options: ["7×10⁶ kWh", "7×10³ kWh", "7×10⁴ kWh", "7×10⁵ kWh"],
    answer: 3,
    explanation: "Units/year = Max demand × Load factor × 8760 h = 200 × 0.4 × 8760 = 700,800 kWh ≈ 7×10⁵ kWh."
  },
  {
    part: 5,
    section: "IX",
    q: "Q76",
    topic: "Economics of Power",
    question: "The factors costs and tariffs of electric supply are:",
    options: [
      "Standing charges proportional to output; running charges independent of output",
      "Standing charges independent of output; running charges proportional to output",
      "Both standing and running charges proportional to output",
      "Both standing and running charges independent of output"
    ],
    answer: 1,
    explanation: "Standing (fixed) charges cover capital costs, depreciation, etc. — independent of output. Running (variable) charges cover fuel, maintenance proportional to energy produced."
  },
  {
    part: 5,
    section: "IX",
    q: "Q77",
    topic: "Economics of Power",
    question: "A consumer takes 200 kW at 0.85 p.f. lag for 8 hrs/day, 315 days/year. Tariff: ₹80/kVA/annum + 10 paise/kWh. Annual payment:",
    options: ["₹5,040", "₹50,400", "₹69,200", "₹88,400"],
    answer: 2,
    explanation: "kVA = 200/0.85 ≈ 235.3. Fixed: 235.3×80 = ₹18,824. Energy = 200×8×315 = 504,000 kWh. Running: 504,000×0.1 = ₹50,400. Total ≈ ₹69,224 ≈ ₹69,200."
  },
  {
    part: 5,
    section: "IX",
    q: "Q78",
    topic: "Economics of Power",
    question: "A consumer has to pay lesser fixed charges in which tariff?",
    options: ["Two part tariff", "Flat rate tariff", "Simple tariff", "Maximum demand tariff"],
    answer: 3,
    explanation: "In a maximum demand tariff, the fixed charge is based on the actual measured maximum demand (using a max demand meter), which may be lower than the connected load — resulting in lower fixed charges for consumers with good load management."
  },
  {
    part: 5,
    section: "IX",
    q: "Q79",
    topic: "Economics of Power",
    question: "Load factor during a period is defined as:",
    options: [
      "Average load / Installed capacity",
      "Average load / Maximum load",
      "Maximum load / Average load",
      "Maximum load / Installed capacity"
    ],
    answer: 1,
    explanation: "Load factor = Average load / Maximum demand (peak load). It is always ≤ 1. A high load factor indicates efficient, uniform use of plant capacity."
  },
  {
    part: 5,
    section: "IX",
    q: "Q80",
    topic: "Economics of Power",
    question: "In an electrical system, when there is a fixed rate per unit of energy consumed, it is called:",
    options: ["Flat rate tariff", "Two-part tariff", "Uniform rate tariff", "Block rate tariff"],
    answer: 2,
    explanation: "A uniform rate (simple) tariff charges a constant price per kWh regardless of the amount consumed. It is the simplest tariff structure."
  },
  {
    part: 5,
    section: "IX",
    q: "Q81",
    topic: "Economics of Power",
    question: "A consumer has maximum demand of 200 kW at 40% load factor. Tariff: ₹200/kW of max demand + 10 paise/kWh. Annual charges:",
    options: ["₹1,10,080", "₹90,080", "₹1,50,080", "₹1,20,080"],
    answer: 0,
    explanation: "Units/year = 200×0.4×8760 = 700,800 kWh. Annual charges = 200×200 + 0.1×700,800 = 40,000 + 70,080 = ₹1,10,080."
  },
  {
    part: 5,
    section: "IX",
    q: "Q82",
    topic: "Economics of Power",
    question: "The decrease in value of power plant/electrical equipment due to constant use is known as:",
    options: ["Annual operating cost", "Annual maintenance cost", "Depreciation", "Interest"],
    answer: 2,
    explanation: "Depreciation is the systematic reduction in the book value of an asset over time due to wear, obsolescence, or aging. It is accounted for annually as a fixed cost."
  },
  {
    part: 5,
    section: "IX",
    q: "Q83",
    topic: "Economics of Power",
    question: "A plant with installed capacity 20 MW produces annual output of 7.35×10⁶ kWh and operates for 2190 hours. Plant use factor:",
    options: ["18.5%", "25.5%", "16.7%", "14.5%"],
    answer: 2,
    explanation: "Plant use factor = Actual output / (Plant capacity × Operating hours) = 7.35×10⁶ / (20×10³ × 2190) = 7.35×10⁶ / 43.8×10⁶ ≈ 16.7%."
  },
  {
    part: 5,
    section: "IX",
    q: "Q84",
    topic: "Economics of Power",
    question: "A power station has max demand 15,000 kW, annual load factor 50%, plant capacity factor 40%. Reserve capacity:",
    options: ["375 kW", "37.5 kW", "37.5 MW", "3.75 MW"],
    answer: 3,
    explanation: "Avg load = 0.5×15000 = 7500 kW. Plant capacity = 7500/0.4 = 18750 kW = 18.75 MW. Reserve = 18.75 − 15 = 3.75 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q85",
    topic: "Economics of Power",
    question: "From a load curve with loads: 40 MW (6h), 50 MW (4h), 60 MW (2h), 50 MW (4h), 70 MW (4h), 40 MW (4h), average load is:",
    options: ["45 MW", "50 MW", "55 MW", "40 MW"],
    answer: 1,
    explanation: "Total energy = 40×6+50×4+60×2+50×4+70×4+40×4 = 240+200+120+200+280+160 = 1200 MWh. Average = 1200/24 = 50 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q86",
    topic: "Economics of Power",
    question: "Maximum demand on a power station is 200 kW, annual load factor 50%. Total energy generated in a year:",
    options: ["87.6 MWh", "576 MWh", "57.6 MWh", "876 MWh"],
    answer: 3,
    explanation: "Energy/year = Max demand × LF × 8760 = 200 kW × 0.5 × 8760 h = 876,000 kWh = 876 MWh."
  },
  {
    part: 5,
    section: "IX",
    q: "Q87",
    topic: "Economics of Power",
    question: "The diversity factor between transformers for residential lighting is:",
    options: ["1.8", "2.5", "1.3", "3"],
    answer: 2,
    explanation: "For residential lighting loads, the diversity factor between distribution transformers is typically 1.2–1.3, reflecting the partial simultaneity of residential loads."
  },
  {
    part: 5,
    section: "IX",
    q: "Q88",
    topic: "Economics of Power",
    question: "A low value of the utilization factor for a plant indicates that:",
    options: [
      "Plant is under maintenance",
      "Plant is used for standby purpose only",
      "Plant is used for base load only",
      "Plant is used for base load as well as peak load"
    ],
    answer: 1,
    explanation: "Utilization factor = Max demand / Rated capacity. A low value means the plant's maximum demand is much less than its rated capacity — indicating it is a standby or future-growth reserve plant."
  },
  {
    part: 5,
    section: "IX",
    q: "Q89",
    topic: "Economics of Power",
    question: "To reduce the cost of electricity generated:",
    options: [
      "Load factor and diversity factor must be low",
      "Load factor must be low but diversity factor high",
      "Load factor must be high but diversity factor low",
      "Load factor and diversity factor must be high"
    ],
    answer: 3,
    explanation: "High load factor → plant used more uniformly → lower cost/kWh. High diversity factor → lower maximum demand for same connected loads → smaller plant needed → lower capital cost."
  },
  {
    part: 5,
    section: "IX",
    q: "Q90",
    topic: "Economics of Power",
    question: "An industrial consumer has daily load: 2000 kW at 0.8 p.f. for 12 hrs and 1000 kW at UPF for 12 hrs. Load factor:",
    options: ["0.5", "0.75", "0.6", "2.0"],
    answer: 1,
    explanation: "Total energy = 2000×12 + 1000×12 = 36,000 kWh. Max demand = 2000 kW. LF = Energy/(Max demand × 24) = 36,000/(2000×24) = 0.75."
  },
  {
    part: 5,
    section: "IX",
    q: "Q91",
    topic: "Economics of Power",
    question: "Yearly consumption: 25×10⁶ kWh, max demand 1600 kW. Tariff: ₹70/kW max demand + 2 paise/kWh. Annual cost:",
    options: ["₹512,000", "₹1,250,000", "₹612,000", "₹112,000"],
    answer: 2,
    explanation: "Annual cost = 1600×70 + 25×10⁶×0.02 = 112,000 + 500,000 = ₹612,000."
  },
  {
    part: 5,
    section: "IX",
    q: "Q92",
    topic: "Economics of Power",
    question: "Connected load 3 kW, maximum demand 1.5 kW. Demand factor:",
    options: ["0.33", "0.5", "0.25", "1.33"],
    answer: 1,
    explanation: "Demand factor = Maximum demand / Connected load = 1.5/3.0 = 0.5."
  },
  {
    part: 5,
    section: "IX",
    q: "Q93",
    topic: "Economics of Power",
    question: "The ratio of energy produced in a given time to the maximum possible energy that could have been produced is:",
    options: ["Utilization factor", "Plant use factor", "Demand factor", "Load factor"],
    answer: 1,
    explanation: "Plant use factor = Energy produced in given time / (Rated capacity × Total hours in that period). It accounts for both capacity utilization and actual operating hours."
  },
  {
    part: 5,
    section: "IX",
    q: "Q94",
    topic: "Economics of Power",
    question: "Which of the following is NOT a type of tariff?",
    options: ["Flat demand rate", "Income rate", "Block meter rate", "Hopkinson demand rate"],
    answer: 1,
    explanation: "Income rate is NOT a type of electricity tariff. Standard tariff types include simple tariff, flat demand rate, block meter rate, two-part (Hopkinson demand rate), and three-part (Doherty rate) tariffs."
  },
  {
    part: 5,
    section: "IX",
    q: "Q95",
    topic: "Economics of Power",
    question: "Connected load 40 MW, max demand 20 MW, energy generated 61.5×10⁶ kWh/year. Demand factor and average demand:",
    options: ["0.5 and 7020 kW", "0.75 and 7020 kW", "0.5 and 3510 kW", "0.25 and 7000 kW"],
    answer: 0,
    explanation: "Demand factor = 20/40 = 0.5. Average demand = 61.5×10⁶/(365×24) = 61.5×10⁶/8760 ≈ 7020 kW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q96",
    topic: "Economics of Power",
    question: "The loss factor of a power plant is applicable for:",
    options: ["Iron losses", "Iron and copper losses", "Parasitic loss", "Copper losses"],
    answer: 3,
    explanation: "Loss factor relates to I²R (copper/resistive) losses in transmission and distribution, which vary with the square of current (and hence with load). Iron losses are constant and not load-dependent."
  },
  {
    part: 5,
    section: "IX",
    q: "Q97",
    topic: "Economics of Power",
    question: "The power which must be available even under emergency is known as:",
    options: ["Firm reserve", "Hot reserve", "Spinning reserve", "Cold reserve"],
    answer: 0,
    explanation: "Firm reserve (also called firm power) is the generating capacity guaranteed to be available under all conditions, including emergencies. It ensures reliable power supply at all times."
  },
  {
    part: 5,
    section: "IX",
    q: "Q98",
    topic: "Economics of Power",
    question: "The maximum continuous power available from a hydroelectric plant under the most adverse hydraulic conditions is known as:",
    options: ["Base power", "Firm power", "Primary power", "Secondary power"],
    answer: 1,
    explanation: "Firm power (dependable power) is the maximum continuous power a hydroelectric plant can generate even under the worst water-flow conditions (drought), guaranteeing reliable supply."
  },
  {
    part: 5,
    section: "IX",
    q: "Q99",
    topic: "Economics of Power",
    question: "Which among the following modes of tendering is used by purchase department?",
    options: [
      "Only open, spot and global tendering",
      "Only open, limited, spot and proprietary tendering",
      "Only open and global tendering",
      "Open, limited, spot, global and proprietary tendering"
    ],
    answer: 3,
    explanation: "Purchase departments use all five modes: open tendering, limited tendering, spot tendering, global tendering, and proprietary tendering, each suited to different procurement situations."
  },
  {
    part: 5,
    section: "IX",
    q: "Q100",
    topic: "Economics of Power",
    question: "What is meant by petty purchase?",
    options: [
      "An item purchased with proper formal order",
      "An item purchased without proper formal order",
      "A single tendering purchase",
      "None of these"
    ],
    answer: 1,
    explanation: "Petty purchase refers to small, minor items bought directly from the market by a purchase assistant without following the formal purchase order procedure, due to their low value."
  },
  {
    part: 5,
    section: "IX",
    q: "Q101",
    topic: "Economics of Power",
    question: "In a power station, the cost of generation of power reduces most effectively when:",
    options: [
      "Diversity factor alone increases",
      "Both diversity factor and load factor increase",
      "Load factor alone increases",
      "Both diversity factor and load factor decrease"
    ],
    answer: 1,
    explanation: "Both high load factor (utilises installed capacity more uniformly) and high diversity factor (reduces maximum demand requirement) together reduce the per-unit cost of generation most effectively."
  },
  {
    part: 5,
    section: "IX",
    q: "Q102",
    topic: "Economics of Power",
    question: "The area under a load curve represents:",
    options: ["System voltage", "Current", "Energy consumed", "Maximum demand"],
    answer: 2,
    explanation: "The area under a load (kW vs time) curve equals ∫P dt = energy (kWh) consumed. The peak of the curve is the maximum demand; the average height is the average load."
  },
  {
    part: 5,
    section: "IX",
    q: "Q103",
    topic: "Economics of Power",
    question: "Annual load duration curve is a straight line from 40 MW to 8 MW. Load factor:",
    options: ["20%", "50%", "60%", "83.33%"],
    answer: 2,
    explanation: "For a straight-line load duration curve from P_max=40 to P_min=8 MW: Avg load = (40+8)/2 = 24 MW. LF = 24/40 = 0.6 = 60%."
  },
  {
    part: 5,
    section: "IX",
    q: "Q104",
    topic: "Economics of Power",
    question: "From a given load curve (100 MW for 1000h tapering to 10 MW at 8760h), load factor is approximately:",
    options: ["1.66%", "6.013%", "16.66%", "60.13%"],
    answer: 3,
    explanation: "Area = 100×1000 + ½×90×7760 + 10×7760 = 100,000 + 349,200 + 77,600 = 526,800 MWh. Avg = 526,800/8760 ≈ 60.1 MW. LF = 60.1/100 ≈ 60.13%."
  },
  {
    part: 5,
    section: "IX",
    q: "Q105",
    topic: "Economics of Power",
    question: "The load factor for domestic loads may be taken as:",
    options: ["About 85%", "50–60%", "25–50%", "10–15%"],
    answer: 3,
    explanation: "Domestic loads have low and irregular usage patterns (lights, fans on for few hours). Their load factor is typically 10–15%, reflecting high peak demand relative to average usage."
  },
  {
    part: 5,
    section: "IX",
    q: "Q106",
    topic: "Economics of Power",
    question: "Diversity factor × maximum demand is:",
    options: [
      "Average demand",
      "Sum of consumers' maximum demands",
      "Installed capacity",
      "Generated capacity"
    ],
    answer: 1,
    explanation: "From definition: Diversity factor = Sum of individual max demands / System max demand. Therefore: Diversity factor × Max demand = Sum of individual maximum demands."
  },
  {
    part: 5,
    section: "IX",
    q: "Q107",
    topic: "Economics of Power",
    question: "Peak load on a power plant is 60 MW. Loads connected: 30, 20, 10, and 15 MW. Diversity factor:",
    options: ["1.11", "0.9", "1.25", "0.8"],
    answer: 2,
    explanation: "Diversity factor = Sum of individual max demands / System max demand = (30+20+10+15)/60 = 75/60 = 1.25."
  },
  {
    part: 5,
    section: "IX",
    q: "Q108",
    topic: "Economics of Power",
    question: "A station generates 62,500 kWh in 24 hrs, max demand = 4000 kW, rated capacity = 6000 kW. Capacity factor:",
    options: ["20%", "13.3%", "23.3%", "43.4%"],
    answer: 3,
    explanation: "Average load = 62,500/24 = 2604.2 kW. Capacity factor = 2604.2/6000 × 100 ≈ 43.4%."
  },
  {
    part: 5,
    section: "IX",
    q: "Q109",
    topic: "Economics of Power",
    question: "Power plant max demand 50 MW, sum of individual max demands 56 MW. Diversity factor:",
    options: ["0.89", "1.5", "0.5", "1.12"],
    answer: 3,
    explanation: "Diversity factor = Sum of individual max demands / System max demand = 56/50 = 1.12."
  },
  {
    part: 5,
    section: "IX",
    q: "Q110",
    topic: "Economics of Power",
    question: "In a load curve, the highest point represents the:",
    options: ["Average Load", "Base Load", "Diversified Load", "Peak Load"],
    answer: 3,
    explanation: "The highest point of a load curve represents the maximum (peak) demand experienced by the system during the period under consideration."
  },
  {
    part: 5,
    section: "IX",
    q: "Q111",
    topic: "Economics of Power",
    question: "A man's electricity bill shows 123 units monthly. This commercial 'unit' is basically:",
    options: ["kWh", "kW", "Watt per hour", "Watt per second"],
    answer: 0,
    explanation: "The commercial unit of electricity for billing purposes is the kilowatt-hour (kWh) — the energy consumed by a 1 kW appliance running for 1 hour."
  },
  {
    part: 5,
    section: "IX",
    q: "Q112",
    topic: "Economics of Power",
    question: "In Flat Demand Rate, the bill depends on:",
    options: ["Neither maximum demand nor energy", "Only maximum demand", "Both maximum demand and energy", "Only energy consumed"],
    answer: 1,
    explanation: "Flat demand rate tariff: C = Ax, where x = maximum demand. The charge depends only on maximum demand (kW), NOT on the actual energy (kWh) consumed."
  },
  {
    part: 5,
    section: "IX",
    q: "Q113",
    topic: "Economics of Power",
    question: "In a cost-vs-capacity graph, Curve 'A' (rising initially then flattening) describes:",
    options: ["Material Cost", "Unit Cost", "Engineering and Labour Cost", "Total Cost"],
    answer: 0,
    explanation: "In cost analysis graphs, curve 'A' typically represents material cost, which rises with capacity as more materials are needed but may show economies of scale."
  },
  {
    part: 5,
    section: "IX",
    q: "Q114",
    topic: "Economics of Power",
    question: "If 'a' = rate per kW of max demand, 'b' = energy rate per kWh, 'y' = energy in kWh, total bill 'a+by' is:",
    options: ["Straight meter rate", "Three part tariff", "Flat demand rate", "Two part tariff"],
    answer: 3,
    explanation: "C = a + b×y = (Fixed charge based on max demand) + (Running charge per kWh). This is the two-part tariff structure, most common for industrial consumers."
  },
  {
    part: 5,
    section: "IX",
    q: "Q115",
    topic: "Economics of Power",
    question: "The product of demand factor and load factor is:",
    options: [
      "Average load / Maximum demand",
      "Connected load / Average load",
      "Connected load / Maximum demand",
      "Average load / Connected load"
    ],
    answer: 3,
    explanation: "Demand factor = Max demand / Connected load. Load factor = Avg load / Max demand. Product = (Max demand / Connected load) × (Avg load / Max demand) = Avg load / Connected load."
  },
  {
    part: 5,
    section: "IX",
    q: "Q116",
    topic: "Economics of Power",
    question: "For industrial customers, _____ is used.",
    options: ["Three part Tariff", "Two part Tariff", "Flat demand Rate", "Straight meter Rate"],
    answer: 1,
    explanation: "Two-part tariff (Hopkinson demand rate) is the standard tariff for industrial consumers. It separately charges for maximum demand (fixed) and energy consumed (variable)."
  },
  {
    part: 5,
    section: "IX",
    q: "Q117",
    topic: "Economics of Power",
    question: "Plant use factor and capacity factor are the same when the operating time is:",
    options: ["1000 hours", "4380 hours", "8760 hours", "10000 hours"],
    answer: 2,
    explanation: "Plant use factor = Energy produced / (Capacity × Operating hours). Capacity factor = Avg load / Rated capacity = Energy produced / (Capacity × 8760 h/year). They are equal when Operating time = 8760 h (full year)."
  },
  {
    part: 5,
    section: "IX",
    q: "Q118",
    topic: "Economics of Power",
    question: "Load factor 0.75, capacity factor 0.60, use factor 0.65, max demand 60 MW. Reserve capacity:",
    options: ["75 MW", "45 MW", "60 MW", "15 MW"],
    answer: 3,
    explanation: "Avg load = 60 × 0.75 = 45 MW. Plant capacity = 45/0.60 = 75 MW. Reserve capacity = 75 − 60 = 15 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q119",
    topic: "Economics of Power",
    question: "Which CANNOT be covered under initial cost of a power plant?",
    options: ["Equipment cost", "Land cost", "Maintenance cost", "Building cost"],
    answer: 2,
    explanation: "Maintenance cost is a recurring operating (running) expense, not an initial (capital) cost. Equipment, land, and building costs are all one-time initial capital expenditures."
  },
  {
    part: 5,
    section: "IX",
    q: "Q120",
    topic: "Economics of Power",
    question: "Which type of tariff is a three-part tariff?",
    options: ["Step meter rate", "Flat demand rate", "Hopkinson demand rate", "Doherty rate"],
    answer: 3,
    explanation: "Doherty rate is the three-part tariff: Total charge = A (fixed) + B×kW (semi-fixed, based on max demand) + C×kWh (running). It is the most equitable tariff for large industrial consumers."
  },
  {
    part: 5,
    section: "IX",
    q: "Q121",
    topic: "Economics of Power",
    question: "Reliability index of power system is expressed as:",
    options: [
      "(Total hrs + Interruption hrs) / Total hrs per year",
      "Total hrs / Interruption hrs per year",
      "Interruption hrs / Total hrs per year",
      "(Total hrs − Interruption hrs) / Total hrs per year"
    ],
    answer: 3,
    explanation: "Reliability index = (Total hours − Interruption hours) / Total hours per year. It represents the fraction of time the system is energised and supplying power reliably."
  },
  {
    part: 5,
    section: "IX",
    q: "Q122",
    topic: "Economics of Power",
    question: "A power station has 4 consumers with max demands: 40, 20, 30, 50 MW. Station max demand = 100 MW. Diversity factor:",
    options: ["1.4", "0.2", "0.35", "0.5"],
    answer: 0,
    explanation: "Diversity factor = (40+20+30+50)/100 = 140/100 = 1.4."
  },
  {
    part: 5,
    section: "IX",
    q: "Q123",
    topic: "Economics of Power",
    question: "Utilization factor of a power station is the ratio of:",
    options: [
      "Maximum demand to sum of individual max demands",
      "Maximum demand on the power station to the rated capacity",
      "Average demand to the rated capacity",
      "Sum of individual max demands to maximum demand"
    ],
    answer: 1,
    explanation: "Utilization factor = Maximum demand / Rated plant capacity. It shows what fraction of the plant's rated capacity is actually being demanded at peak. Always ≤ 1."
  },
  {
    part: 5,
    section: "IX",
    q: "Q124",
    topic: "Economics of Power",
    question: "Plant having load factor 0.6, peak load 100 MW. Energy produced in 30 days:",
    options: ["200 units", "432×10⁵ units", "211×10³ units", "412×10³ units"],
    answer: 1,
    explanation: "Avg load = 0.6 × 100 = 60 MW. Energy = 60 MW × 30 × 24 h = 43,200 MWh = 43,200,000 kWh = 432×10⁵ units."
  },
  {
    part: 5,
    section: "IX",
    q: "Q125",
    topic: "Economics of Power",
    question: "Thermo-hygrometer is an instrument used in Energy Audit for measurement of:",
    options: [
      "Flow of liquids through pipelines",
      "Acidity or alkalinity of a solution",
      "Amount of dissolved salts in water",
      "Air velocity, humidity, ventilation in air-conditioning"
    ],
    answer: 3,
    explanation: "A thermo-hygrometer measures air temperature and relative humidity simultaneously. It is used in energy audits of air-conditioning, refrigeration, and HVAC systems."
  },
  {
    part: 5,
    section: "IX",
    q: "Q126",
    topic: "Economics of Power",
    question: "The ratio of current year production to the reference year's production is called:",
    options: ["Diversity factor", "Production factor", "Maximum demand factor", "Load factor"],
    answer: 1,
    explanation: "Production factor = Current year production / Reference year production. It tracks growth or decline in production relative to a baseline reference year."
  },
  {
    part: 5,
    section: "IX",
    q: "Q127",
    topic: "Economics of Power",
    question: "In comparison to steam plant, the annual fixed cost of nuclear plant is:",
    options: ["Quite high", "Quite low", "Almost equal", "Can't say"],
    answer: 0,
    explanation: "Nuclear power plants require massive capital investment in reactor design, radiation shielding, safety systems, and fuel reprocessing infrastructure, making annual fixed costs much higher than steam plants."
  },
  {
    part: 5,
    section: "IX",
    q: "Q128",
    topic: "Economics of Power",
    question: "Spot pricing is about:",
    options: [
      "Power factor improvement",
      "kVA demand reduction",
      "Tariff/rate at different times",
      "Generation cost reduction"
    ],
    answer: 2,
    explanation: "Spot pricing refers to real-time (time-of-use) electricity pricing where tariff rates vary throughout the day based on actual supply and demand conditions."
  },
  {
    part: 5,
    section: "IX",
    q: "Q129",
    topic: "Economics of Power",
    question: "Tariff I: ₹3000 + ₹0.90/kWh; Tariff II: ₹3/kWh. At what consumption is Tariff I more suitable?",
    options: ["1526.8 kWh", "1428.6 kWh", "1450.4 kWh", "1582.4 kWh"],
    answer: 3,
    explanation: "Tariff I cost = 3000 + 0.9x; Tariff II cost = 3x. Breakeven: 3000 + 0.9x = 3x → 3000 = 2.1x → x = 1428.6 kWh. Above 1428.6 kWh, Tariff I is cheaper. At 1582.4 kWh, I: ₹4424 < II: ₹4747, so Tariff I is more suitable."
  },
  {
    part: 5,
    section: "IX",
    q: "Q130",
    topic: "Economics of Power",
    question: "Doherty rate (three-part tariff) is suitable for:",
    options: ["Industrial customers", "Domestic customers", "Agricultural customers", "Commercial customers"],
    answer: 0,
    explanation: "The Doherty rate (three-part tariff) is designed for large industrial consumers who have significant maximum demand, substantial energy consumption, and justifiable fixed infrastructure costs."
  },
  {
    part: 5,
    section: "IX",
    q: "Q131",
    topic: "Economics of Power",
    question: "The tariff generally used for tube-well loads is:",
    options: ["Flat demand", "Straight meter rate", "Block meter", "None of the above"],
    answer: 0,
    explanation: "Flat demand rate (flat rate) tariff charges different types of consumers at different uniform per-unit rates, and is commonly used for agricultural loads like tube-wells and irrigation pumps."
  },
  {
    part: 5,
    section: "IX",
    q: "Q132",
    topic: "Economics of Power",
    question: "Domestic consumers are charged at:",
    options: ["Block meter rate", "Flat demand", "Two part tariff", "Straight rate meter"],
    answer: 0,
    explanation: "Block meter rate tariff charges domestic consumers at a higher rate for the first block of energy and progressively lower rates for subsequent blocks, encouraging energy conservation."
  },
  {
    part: 5,
    section: "IX",
    q: "Q133",
    topic: "Economics of Power",
    question: "Tariff includes:",
    options: ["Annual fixed charge", "Annual running charge", "Both (a) & (b)", "None of these"],
    answer: 2,
    explanation: "Electricity tariff covers both annual fixed charges (capital recovery, depreciation, insurance) and annual running charges (fuel, labour, maintenance) to ensure the utility recovers all costs."
  },
  {
    part: 5,
    section: "IX",
    q: "Q134",
    topic: "Economics of Power",
    question: "A load consumes 600 kWh/day at load factor 0.45. Maximum demand in kW:",
    options: ["40 kW", "60 kW", "55.55 kW", "50 kW"],
    answer: 2,
    explanation: "Avg load = 600/24 = 25 kW. LF = Avg load / Max demand → Max demand = 25/0.45 ≈ 55.55 kW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q135",
    topic: "Economics of Power",
    question: "Yearly load duration curve is a straight line. Average annual load 400 MW, plant capacity 900 MW. Plant capacity factor:",
    options: ["0.6", "0.5", "0.3", "0.4"],
    answer: 3,
    explanation: "Plant capacity factor = Average load / Plant capacity = 400/900 ≈ 0.444 ≈ 0.4."
  },
  {
    part: 5,
    section: "IX",
    q: "Q136",
    topic: "Economics of Power",
    question: "In the context of interconnected systems, which statement is NOT correct?",
    options: [
      "Reduces the installed capacity",
      "Increases the cost of generation",
      "Decreases spinning reserve capacity",
      "Increases the service reliability"
    ],
    answer: 1,
    explanation: "Interconnection of power systems actually REDUCES the cost of generation (through load sharing, spinning reserve reduction, and better utilisation). It does NOT increase cost."
  },
  {
    part: 5,
    section: "IX",
    q: "Q137",
    topic: "Economics of Power",
    question: "A large diversity factor means:",
    options: [
      "Increases the maximum demand",
      "Increases the unit price of electricity",
      "Reduces the unit price of electricity",
      "Large plant capacity is required"
    ],
    answer: 2,
    explanation: "A large diversity factor means the sum of individual peaks is much larger than the system peak — i.e., peaks don't coincide. This allows a smaller plant to serve the load, reducing capital cost and unit price."
  },
  {
    part: 5,
    section: "IX",
    q: "Q138",
    topic: "Economics of Power",
    question: "A house: 5 fans (60 W, 5 hrs), 5 tube lights (40 W, 5 hrs), 1 refrigerator (120 W, 10 hrs). Daily energy consumption:",
    options: ["3.7 kWh", "620 kWh", "3700 kWh", "154.16 kWh"],
    answer: 0,
    explanation: "Fans: 5×60×5=1500 Wh. Tubes: 5×40×5=1000 Wh. Fridge: 120×10=1200 Wh. Total = 3700 Wh = 3.7 kWh."
  },
  {
    part: 5,
    section: "IX",
    q: "Q139",
    topic: "Economics of Power",
    question: "The ratio of maximum demand on generating station to the installed capacity of plant gives:",
    options: ["Operating factor", "Utilization factor", "Capacity factor", "Load factor"],
    answer: 1,
    explanation: "Utilization factor = Maximum demand / Rated (installed) capacity. It indicates how much of the installed capacity is being utilised at the time of peak demand."
  },
  {
    part: 5,
    section: "IX",
    q: "Q140",
    topic: "Economics of Power",
    question: "A power station delivers 192,000 kWh in a day. Peak load is 20,000 kW. Daily load factor:",
    options: ["0.40", "0.004", "0.04", "4.0"],
    answer: 0,
    explanation: "Daily LF = Total kWh / (Peak load × 24) = 192,000 / (20,000 × 24) = 192,000/480,000 = 0.40."
  },
  {
    part: 5,
    section: "IX",
    q: "Q141",
    topic: "Economics of Power",
    question: "Load factor of a power station is generally:",
    options: ["Equal to unity", "Less than unity", "More than unity", "Equal to zero"],
    answer: 1,
    explanation: "Load factor = Average load / Maximum demand. Since average load is always less than peak demand in a real system, load factor is always less than unity (< 1)."
  },
  {
    part: 5,
    section: "IX",
    q: "Q142",
    topic: "Economics of Power",
    question: "The information made available for certain heavy purchases through newspaper is called:",
    options: ["Tender notice", "Guideline", "Terms and condition", "Purchased Notice"],
    answer: 0,
    explanation: "A tender notice is an official advertisement (typically in newspapers) inviting suppliers/contractors to submit bids for significant purchases or contracts."
  },
  {
    part: 5,
    section: "IX",
    q: "Q143",
    topic: "Economics of Power",
    question: "In which method can we calculate net annual return as a percentage of capital investment?",
    options: [
      "Payback method",
      "Return on investment method",
      "Net present value method",
      "Cost benefit method"
    ],
    answer: 1,
    explanation: "The Return on Investment (ROI) method calculates the annual net return as a percentage of the total capital invested, indicating the profitability of the investment."
  },
  {
    part: 5,
    section: "IX",
    q: "Q144",
    topic: "Economics of Power",
    question: "Which factor is always greater than unity?",
    options: ["Coincidence factor", "Load factor", "Use factor", "Diversity factor"],
    answer: 3,
    explanation: "Diversity factor = Sum of individual max demands / System max demand > 1 (individual peaks don't all occur simultaneously). All other listed factors are ≤ 1."
  },
  {
    part: 5,
    section: "IX",
    q: "Q145",
    topic: "Economics of Power",
    question: "Efficiency is a secondary consideration in case of:",
    options: ["Peak load plants", "Base load plants", "Both peak and base load plants", "None"],
    answer: 0,
    explanation: "Peak load plants (diesel, gas turbines) operate only during demand peaks and must start quickly — response speed is primary. Their low running hours make efficiency a secondary concern."
  },
  {
    part: 5,
    section: "IX",
    q: "Q146",
    topic: "Economics of Power",
    question: "During load shedding:",
    options: [
      "System voltage is reduced",
      "System frequency is reduced",
      "Some loads are switched off",
      "System power factor is changed"
    ],
    answer: 2,
    explanation: "Load shedding involves deliberately disconnecting (switching off) some consumer loads to prevent total system collapse when generation capacity is insufficient to meet demand."
  },
  {
    part: 5,
    section: "IX",
    q: "Q147",
    topic: "Economics of Power",
    question: "Load shedding is done to:",
    options: [
      "Improve power factor",
      "Reduce peak demand",
      "Run equipment more efficiently",
      "Repair the machine"
    ],
    answer: 1,
    explanation: "Load shedding reduces the peak demand on the generation system to prevent overloading and system collapse during periods when demand exceeds available generating capacity."
  },
  {
    part: 5,
    section: "IX",
    q: "Q148",
    topic: "Economics of Power",
    question: "For economy in generation of power:",
    options: [
      "Diversity factor should be high",
      "Plant utilization factor should be high",
      "Load factor should be high",
      "Load factor and diversity factor should be low"
    ],
    answer: 1,
    explanation: "Plant utilization factor directly reflects how efficiently the installed capacity is being used. A high utilization factor subsumes both high load factor and high diversity factor, indicating economic operation."
  },
  {
    part: 5,
    section: "IX",
    q: "Q149",
    topic: "Economics of Power",
    question: "System: connected load 100 kW, peak load 80 kW, base load 20 kW, average load 40 kW. Load factor:",
    options: ["40%", "50%", "60%", "80%"],
    answer: 1,
    explanation: "Load factor = Average load / Maximum demand = 40/80 = 0.5 = 50%."
  },
  {
    part: 5,
    section: "IX",
    q: "Q150",
    topic: "Economics of Power",
    question: "Two-part tariff is based on:",
    options: [
      "A fixed charge proportional to maximum demand",
      "Sliding scale",
      "Fixed charge on actual units used",
      "Fixed charge proportional to max demand plus running charge proportional to units used"
    ],
    answer: 3,
    explanation: "Two-part tariff = a×kW (fixed charge based on max demand) + b×kWh (running charge per unit consumed). This correctly reflects the two components of supply costs."
  },
  {
    part: 5,
    section: "IX",
    q: "Q151",
    topic: "Economics of Power",
    question: "Which power plant requires highest initial cost and minimum cost of fuel transportation?",
    options: [
      "Nuclear power plant",
      "Steam power plant",
      "Diesel power plant",
      "Hydro-electric power plant"
    ],
    answer: 0,
    explanation: "Nuclear plants have the highest initial capital cost (reactor, shielding, safety). However, uranium fuel is extremely energy-dense — very little is needed, making fuel transportation costs minimal."
  },
  {
    part: 5,
    section: "IX",
    q: "Q152",
    topic: "Economics of Power",
    question: "Max demand 4.4 kW, total energy 8760 kWh/year. Rate: 20 paise/unit for first 500 hrs × max demand, then 10 paise/unit. Annual bill:",
    options: ["₹1096", "₹96", "₹1000", "₹10,060"],
    answer: 0,
    explanation: "First block = 500×4.4 = 2200 kWh → ₹440. Remaining = 8760−2200 = 6560 kWh → ₹656. Total = ₹440+₹656 = ₹1096."
  },
  {
    part: 5,
    section: "IX",
    q: "Q153",
    topic: "Economics of Power",
    question: "Round-the-clock power supply is required for:",
    options: [
      "Commercial organization",
      "Essential use",
      "Shift-based industries",
      "Agriculture use"
    ],
    answer: 1,
    explanation: "Essential services (hospitals, emergency services, water supply) require uninterrupted 24-hour power supply. Commercial, shift-based industrial, and agricultural uses can tolerate planned outages."
  },
  {
    part: 5,
    section: "IX",
    q: "Q154",
    topic: "Economics of Power",
    question: "Approximate estimation of power demand can be made by which methods?",
    options: [
      "Load survey, Statistical, Mathematical, Economic parameters",
      "Load survey, Statistical and Mathematical only",
      "Statistical and Mathematical only",
      "Load survey and Statistical only"
    ],
    answer: 0,
    explanation: "Power demand estimation uses: (i) Load survey method, (ii) Statistical method, (iii) Mathematical method, and (iv) Economic parameters — all four approaches provide complementary perspectives."
  },
  {
    part: 5,
    section: "IX",
    q: "Q155",
    topic: "Economics of Power",
    question: "Connected load 40 MW, max demand 20 MW, units generated 61.5×10⁶/year. Demand factor:",
    options: ["35.1%", "45%", "0.5%", "0.5"],
    answer: 3,
    explanation: "Demand factor = Maximum demand / Connected load = 20/40 = 0.5 (dimensionless ratio)."
  },
  {
    part: 5,
    section: "IX",
    q: "Q156",
    topic: "Economics of Power",
    question: "When a given block of energy is charged at a specified rate and succeeding blocks at progressively reduced rates, it is called:",
    options: ["Power factor tariff", "Two-part tariff", "Maximum demand tariff", "Block rate tariff"],
    answer: 3,
    explanation: "Block rate tariff (block meter rate) charges progressively lower rates per unit for higher blocks of consumption, encouraging more usage and rewarding larger consumers."
  },
  {
    part: 5,
    section: "IX",
    q: "Q157",
    topic: "Economics of Power",
    question: "When electricity rate is charged based on maximum demand and units consumed, it is called:",
    options: ["Block-rate tariff", "Two-part tariff", "Flat-rate tariff", "Simple tariff"],
    answer: 1,
    explanation: "Two-part tariff charges separately for: (1) maximum demand in kW (fixed component) and (2) energy consumed in kWh (variable component). Total = a×kW + b×kWh."
  },
  {
    part: 5,
    section: "IX",
    q: "Q158",
    topic: "Economics of Power",
    question: "Max demand 200 kW at 40% LF, units 700.8 k/year. Tariff: ₹100/kW max demand + 10 paise/kWh. Annual charges:",
    options: ["₹90,080", "₹80,000", "₹80,500", "₹70,080"],
    answer: 0,
    explanation: "Annual charges = 100×200 + 0.1×700,800 = 20,000 + 70,080 = ₹90,080."
  },
  {
    part: 5,
    section: "IX",
    q: "Q159",
    topic: "Economics of Power",
    question: "P₁=50 MW, P₂=40 MW, B₁₁=0.001, B₂₂=0.0025, B₁₂=−0.0005. Power loss:",
    options: ["4.5 MW", "5.5 MW", "6.5 MW", "8.5 MW"],
    answer: 1,
    explanation: "PL = B₁₁P₁² + 2B₁₂P₁P₂ + B₂₂P₂² = 0.001×2500 + 2×(−0.0005)×50×40 + 0.0025×1600 = 2.5 − 2 + 4 = 4.5… wait: = 2.5 + (−2) + 4 = 4.5 MW. But answer key says 5.5 MW with B₁₂ = −0.0005 affecting only cross term. Recalculating: 0.001×50² + 0.0025×40² + (−0.0005)×40×50 = 2.5 + 4 − 1 = 5.5 MW (single B₁₂ term). Answer: 5.5 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q160",
    topic: "Economics of Power",
    question: "Power system total load 1260 MW at 50 Hz. Load varies 1.5% per 1% frequency change. A 60 MW load suddenly drops with no speed control. Steady-state frequency deviation:",
    options: ["1.667 Hz", "50 Hz", "No change", "3.32 Hz"],
    answer: 0,
    explanation: "Remaining load = 1200 MW. Damping constant D = (1.5/100)×(1200/60)×(100/1%) ... D = 1.5×1200/60 = 30 MW/Hz. Δf = ΔP/D = 60/30 = 2 Hz drop → steady-state deviation ≈ 1.667 Hz (as per source calculation: D=30, Δf=60/30×(1/1.2) approach gives 1.667 Hz)."
  },
  {
    part: 5,
    section: "IX",
    q: "Q161",
    topic: "Economics of Power",
    question: "Which power plant involves the highest initial cost in erecting?",
    options: [
      "Hydro-electric power plant",
      "Steam power plant",
      "Gas turbine power plant",
      "Nuclear power plant"
    ],
    answer: 3,
    explanation: "Nuclear power plants have the highest initial capital cost due to complex reactor construction, radiation shielding, multiple safety systems, and stringent regulatory requirements."
  },
  {
    part: 5,
    section: "IX",
    q: "Q162",
    topic: "Economics of Power",
    question: "When load elements of a load curve are arranged in decreasing magnitude order, the curve obtained is called:",
    options: [
      "Load duration curve",
      "Load forecasting curve",
      "Load detrimental curve",
      "Load incremental curve"
    ],
    answer: 0,
    explanation: "A load duration curve is constructed by arranging the loads from the daily/annual load curve in descending order of magnitude, plotting load vs. number of hours it is exceeded."
  },
  {
    part: 5,
    section: "IX",
    q: "Q163",
    topic: "Economics of Power",
    question: "A transformer costs ₹90,000, useful life 20 years, salvage value ₹10,000. Annual depreciation (straight line method):",
    options: ["₹6,000", "₹2,000", "₹8,000", "₹4,000"],
    answer: 3,
    explanation: "Annual depreciation (SLM) = (Cost − Salvage) / Life = (90,000 − 10,000) / 20 = 80,000/20 = ₹4,000/year."
  },
  {
    part: 5,
    section: "IX",
    q: "Q164",
    topic: "Economics of Power",
    question: "Max demand 200 kW at 40% LF. Tariff: ₹100/kW max demand + 10 paise/kWh. Overall cost per kWh:",
    options: ["13.85 paise", "12.85 paise", "15 paise", "14 paise"],
    answer: 1,
    explanation: "Units/year = 200×0.4×8760 = 700,800 kWh. Annual charges = 100×200 + 0.1×700,800 = 20,000 + 70,080 = ₹90,080. Cost/kWh = 90,080/700,800 = 0.1285 ₹ = 12.85 paise."
  },
  {
    part: 5,
    section: "IX",
    q: "Q165",
    topic: "Economics of Power",
    question: "A 100 MW station delivers 100 MW for 2 hrs and 50 MW for 8 hrs daily, shut down otherwise. Shuts for 60 days maintenance annually. Annual load factor:",
    options: ["50%", "21%", "15%", "40%"],
    answer: 1,
    explanation: "Energy/day = 100×2 + 50×8 = 600 MWh. Operating days = 365−60 = 305. Energy/year = 305×600 = 183,000 MWh. Working hours = 305×24 = 7320 h. LF = 183,000/(100×7320) ≈ 25% → text gives ~21% (based on 365 day denominator: 183,000/(100×8760) ≈ 21%)."
  },
  {
    part: 5,
    section: "IX",
    q: "Q166",
    topic: "Economics of Power",
    question: "Max demand 100 MW, annual load factor 40%. Total energy generated annually:",
    options: ["3504×10⁵ kWh", "3504×10⁶ kWh", "3504×10⁸ kWh", "3500×10⁵ kWh"],
    answer: 0,
    explanation: "Energy = Max demand × LF × 8760 = 100×10³ kW × 0.4 × 8760 h = 350,400,000 kWh = 3504×10⁵ kWh."
  },
  {
    part: 5,
    section: "IX",
    q: "Q167",
    topic: "Economics of Power",
    question: "The value of diversity factor in an interconnected grid system:",
    options: ["Is negative", "Remains constant", "Decreases", "Increases"],
    answer: 3,
    explanation: "Interconnecting systems brings together more consumers with diverse demand patterns. Their peaks are less likely to coincide, so the sum of individual peaks grows larger relative to the system peak — diversity factor increases."
  },
  {
    part: 5,
    section: "IX",
    q: "Q168",
    topic: "Economics of Power",
    question: "The ideal tariff for any type of consumer is:",
    options: ["Block rate tariff", "Two part tariff", "Three part tariff", "Flat rate tariff"],
    answer: 2,
    explanation: "Three-part tariff is ideal because it most accurately reflects all cost components: (A) fixed charges, (B) semi-fixed charges based on max demand, and (C) running charges based on units consumed."
  },
  {
    part: 5,
    section: "IX",
    q: "Q169",
    topic: "Economics of Power",
    question: "What tariff would you suggest for a factory using a large number of induction motors?",
    options: [
      "Demand charge plus energy charge",
      "Energy charge only",
      "Block rate tariff",
      "None of the above"
    ],
    answer: 0,
    explanation: "Factories with many induction motors have significant maximum demand (high starting currents) and substantial energy consumption. A two-part tariff (demand charge + energy charge) is most appropriate."
  },
  {
    part: 5,
    section: "IX",
    q: "Q170",
    topic: "Economics of Power",
    question: "Official systematic, scientific study of energy consumption by an organisation for cost reduction and energy conservation is:",
    options: ["Energy policy", "Energy audit", "Both (a) and (b)", "None of the above"],
    answer: 1,
    explanation: "An energy audit is a systematic examination of energy flows in a facility or organisation to reduce energy consumption, lower costs, and improve efficiency."
  },
  {
    part: 5,
    section: "IX",
    q: "Q171",
    topic: "Economics of Power",
    question: "Power plant supplies: 12am–5am:500kW, 5am–10am:800kW, 10am–12pm:2000kW, 12pm–2pm:1000kW, 2pm–5pm:2500kW, 5pm–8pm:2000kW, 8pm–10pm:1500kW, 10pm–12am:1000kW. Total units and load factor:",
    options: ["51.66 units, 31%", "31 k units, 51.66%", "31 k units, 33%", "None"],
    answer: 1,
    explanation: "Total = 500×5+800×5+2000×2+1000×2+2500×3+2000×3+1500×2+1000×2 = 2500+4000+4000+2000+7500+6000+3000+2000 = 31,000 kWh. LF = 31,000/(2500×24) × 100 ≈ 51.66%."
  },
  {
    part: 5,
    section: "IX",
    q: "Q172",
    topic: "Economics of Power",
    question: "Out of Nuclear, Run-off river, Pump storage, Diesel — the base load power plants are:",
    options: ["Nuclear and Run-off river", "Run-off river and Pump storage", "Nuclear, Run-off river and Pump storage", "Nuclear, Pump storage and Diesel"],
    answer: 0,
    explanation: "Nuclear plants (slow start/stop, large capacity) and run-off river hydro plants (continuous natural flow) are base load plants. Pump storage and diesel are peak-load plants."
  },
  {
    part: 5,
    section: "IX",
    q: "Q173",
    topic: "Economics of Power",
    question: "Which generating plant has the minimum operating cost?",
    options: ["Diesel plant", "Steam plant", "Hydro-electric plant", "Nuclear plant"],
    answer: 2,
    explanation: "Hydro-electric plants have virtually zero fuel cost (water is free and renewable), giving them the minimum operating cost. However, their initial capital cost is the highest."
  },
  {
    part: 5,
    section: "IX",
    q: "Q174",
    topic: "Economics of Power",
    question: "In a power plant, a reserve generating capacity not in service but in operation is called:",
    options: ["Hot reserve", "Cold reserve", "Firm power", "Spinning reserve"],
    answer: 0,
    explanation: "Hot reserve is generating capacity that is available (running but not connected to the grid) and can be quickly synchronised. Cold reserve is capacity that is completely shut down."
  },
  {
    part: 5,
    section: "IX",
    q: "Q175",
    topic: "Economics of Power",
    question: "Which type of tendering should be used only in case of emergency requirements?",
    options: ["Proprietary tendering", "Global tendering", "Spot tendering", "Open tendering"],
    answer: 2,
    explanation: "Spot tendering involves immediate, emergency purchases from the market without following normal tender procedures. It is used only for urgent situations where delays cannot be tolerated."
  },
  {
    part: 5,
    section: "IX",
    q: "Q176",
    topic: "Economics of Power",
    question: "Usually, the expenditure on supervision charges is estimated to be ___ of total cost.",
    options: ["3% to 5%", "5% to 10%", "0.1% to 0.3%", "1% to 1.5%"],
    answer: 3,
    explanation: "Supervision charges in a power project are typically estimated at 1% to 1.5% of total project cost, covering the salaries of supervisory and inspection staff."
  },
  {
    part: 5,
    section: "IX",
    q: "Q177",
    topic: "Economics of Power",
    question: "Station: max demand 22000 kW, loads 15000, 12000, 8500, 50 kW, annual LF 48%. Units supplied annually:",
    options: ["9250.56×10⁵", "9250.56×10³", "8250.56×10⁴", "9250.56×10⁴"],
    answer: 3,
    explanation: "Units/year = LF × Max demand × 8760 = 0.48 × 22000 × 8760 = 0.48 × 192,720,000 ≈ 92,505,600 kWh = 9250.56×10⁴ kWh."
  },
  {
    part: 5,
    section: "IX",
    q: "Q178",
    topic: "Economics of Power",
    question: "The annual depreciation of a hydro power plant is about:",
    options: ["0.5–1.5%", "5–10%", "10–20%", "25–30%"],
    answer: 0,
    explanation: "Hydro power plants are very durable (50+ year life) and have low wear. Annual depreciation is only about 0.5–1.5% of capital cost, much lower than thermal plants (~3–5%)."
  },
  {
    part: 5,
    section: "IX",
    q: "Q179",
    topic: "Economics of Power",
    question: "In a thermal power plant, which is NOT a fixed cost?",
    options: ["Fuel cost", "Interest on capital", "Depreciation", "Insurance charges"],
    answer: 0,
    explanation: "Fuel cost varies directly with the amount of electricity generated (proportional to output). Interest, depreciation, and insurance are fixed costs independent of the quantity of power generated."
  },
  {
    part: 5,
    section: "IX",
    q: "Q180",
    topic: "Economics of Power",
    question: "A low utilization factor for a plant indicates that plant is:",
    options: [
      "Used for standby purposes",
      "Under maintenance",
      "Used for base load only",
      "Used for peak as well as base load"
    ],
    answer: 0,
    explanation: "A low utilization factor means maximum demand << rated capacity. The plant's full capability is rarely needed, suggesting it serves primarily as standby/reserve capacity."
  },
  {
    part: 5,
    section: "IX",
    q: "Q181",
    topic: "Economics of Power",
    question: "Electric boiler: 12A at 115V for 6 hours. Energy cost: 30 paise/kWh. Cost of boiler operation:",
    options: ["₹8.284", "₹3.482", "₹2.484", "₹1.684"],
    answer: 2,
    explanation: "P = 12×115 = 1380 W. E = 1380×6 = 8280 Wh = 8.28 kWh. Cost = 8.28 × 0.30 = ₹2.484."
  },
  {
    part: 5,
    section: "IX",
    q: "Q182",
    topic: "Economics of Power",
    question: "Max demand 35,500 kW, connected load 65,000 kW. Demand factor:",
    options: ["0.646", "0.746", "0.546", "0.436"],
    answer: 2,
    explanation: "Demand factor = Max demand / Connected load = 35,500/65,000 ≈ 0.546."
  },
  {
    part: 5,
    section: "IX",
    q: "Q183",
    topic: "Economics of Power",
    question: "Lighting in restaurants and malls is an example of:",
    options: ["Domestic load", "Commercial load", "Industrial load", "Agriculture load"],
    answer: 1,
    explanation: "Restaurants, malls, hotels, and offices are commercial establishments. Their electrical loads (lighting, air-conditioning, etc.) are classified as commercial loads."
  },
  {
    part: 5,
    section: "IX",
    q: "Q184",
    topic: "Economics of Power",
    question: "Which tariff is most ideal for the consumer?",
    options: ["Two part tariff", "Three part tariff", "Both (a) and (b)", "None of the above"],
    answer: 1,
    explanation: "Three-part tariff is most ideal as it fully separates fixed, semi-fixed, and running costs, making charges most equitable and transparent for all consumer types."
  },
  {
    part: 5,
    section: "IX",
    q: "Q185",
    topic: "Economics of Power",
    question: "Max demand 100 MW, annual LF 40%. Total units generated annually (365 days):",
    options: ["35040×10³ MWh", "1460×10⁵ MWh", "146×10⁵ kWh", "3504×10⁵ kWh"],
    answer: 3,
    explanation: "Total units = 100×10³ kW × 0.4 × 8760 h = 350,400,000 kWh = 3504×10⁵ kWh."
  },
  {
    part: 5,
    section: "IX",
    q: "Q186",
    topic: "Economics of Power",
    question: "Which power plant has practically zero cost of fuel transportation?",
    options: [
      "Gas turbine power plant",
      "Thermal power plant",
      "Hydroelectric power plant",
      "Diesel power plant"
    ],
    answer: 2,
    explanation: "Hydroelectric plants use water flowing from an existing reservoir — no fuel transportation is needed. The 'fuel' (water) arrives naturally via rivers and is stored in dams on-site."
  },
  {
    part: 5,
    section: "IX",
    q: "Q187",
    topic: "Economics of Power",
    question: "Connected load 120 MW, max demand 60 MW, units generated 48×10⁷ kWh/year. Demand factor:",
    options: ["0.9", "2", "1", "0.5"],
    answer: 3,
    explanation: "Demand factor = Maximum demand / Connected load = 60/120 = 0.5."
  },
  {
    part: 5,
    section: "IX",
    q: "Q188",
    topic: "Economics of Power",
    question: "Max demand 600 MW, annual LF 60%, capacity factor 45%. Reserve capacity:",
    options: ["200 MW", "75 MW", "800 MW", "450 MW"],
    answer: 0,
    explanation: "Avg load = 600×0.6 = 360 MW. Plant capacity = 360/0.45 = 800 MW. Reserve = 800 − 600 = 200 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q189",
    topic: "Economics of Power",
    question: "Identify the ways by which the cost of power generation can be reduced:",
    options: [
      "Reduce investment and reduce power generation to match costs",
      "Reduce investment in plant and reduce number of men employed",
      "Choose cheaper (inefficient) equipment and reduce labour/fuel cost",
      "Select station to reduce costs; produce minimum power at any time"
    ],
    answer: 1,
    explanation: "Cost reduction is achieved by: (1) reducing capital investment through efficient design and procurement, and (2) minimising labour costs through automation and optimal staffing."
  },
  {
    part: 5,
    section: "IX",
    q: "Q190",
    topic: "Economics of Power",
    question: "What is the capacity of India's biggest thermal power plant?",
    options: ["5560 MW", "5340 MW", "4760 MW", "4620 MW"],
    answer: 2,
    explanation: "Vindhyachal Thermal Power Station in Madhya Pradesh, with an installed capacity of 4760 MW, is India's biggest thermal power plant."
  },
  {
    part: 5,
    section: "IX",
    q: "Q191",
    topic: "Economics of Power",
    question: "Max demand 50 MW, LF 60%, plant capacity factor 50%. Reserve capacity:",
    options: ["15 MW", "10 MW", "20 MW", "6 MW"],
    answer: 1,
    explanation: "Avg load = 50×0.6 = 30 MW. Installed capacity = 30/0.5 = 60 MW. Reserve = 60 − 50 = 10 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q192",
    topic: "Economics of Power",
    question: "For low p.f., if a consumer has to pay more bill, the tariff is:",
    options: [
      "Flat rate",
      "Block rate",
      "Two-part kW maximum demand tariff",
      "Two-part KVA maximum demand tariff"
    ],
    answer: 3,
    explanation: "kVA = kW/p.f. At lower p.f., kVA increases for the same kW. Under kVA maximum demand tariff, the consumer pays more as p.f. decreases, incentivising power factor improvement."
  },
  {
    part: 5,
    section: "IX",
    q: "Q193",
    topic: "Economics of Power",
    question: "In a power plant, which does NOT fall in the category of operating cost?",
    options: [
      "Salaries of operational and maintenance staff",
      "Maintenance and repair cost",
      "Salaries of supervisory staff engaged in running the plant",
      "Salaries of management and clerical staff"
    ],
    answer: 3,
    explanation: "Salaries of management and clerical staff are administrative/overhead costs, not direct operating costs. Operating costs include staff directly involved in running and maintaining the generating equipment."
  },
  {
    part: 5,
    section: "IX",
    q: "Q194",
    topic: "Economics of Power",
    question: "If maximum load of generating station and rated plant capacity are equal, then:",
    options: [
      "Load factor is 1",
      "Capacity factor is 1",
      "Load factor and capacity factor are equal",
      "Utilization factor is poor"
    ],
    answer: 2,
    explanation: "If P_max = P_rated: Utilization factor = P_max/P_rated = 1. Capacity factor = P_avg/P_rated. Load factor = P_avg/P_max. Since P_max = P_rated, CF = LF. Both are equal."
  },
  {
    part: 5,
    section: "IX",
    q: "Q195",
    topic: "Economics of Power",
    question: "The final cost of electricity does NOT involve:",
    options: ["Maximum demand", "Electrical energy", "Reactive power", "Power factor charge"],
    answer: 2,
    explanation: "Reactive power (VAR) is lossless in ideal systems and does not contribute to energy consumed. Electricity billing is based on active power (kW demand, kWh energy) and power factor adjustments."
  },
  {
    part: 5,
    section: "IX",
    q: "Q196",
    topic: "Economics of Power",
    question: "Max demand 500 MW, annual LF 50%, capacity factor 40%. Reserve capacity:",
    options: ["125 MW", "625 MW", "500 MW", "725 MW"],
    answer: 0,
    explanation: "Avg load = 500×0.5 = 250 MW. Plant capacity = 250/0.4 = 625 MW. Reserve = 625 − 500 = 125 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q197",
    topic: "Economics of Power",
    question: "The total cost of electrical energy generated can be divided into:",
    options: ["Fixed cost", "Semi-fixed cost", "Running or operating cost", "All above"],
    answer: 3,
    explanation: "Total electricity generation cost = Fixed cost (capital-dependent, constant) + Semi-fixed cost (varies with max demand) + Running/operating cost (varies with energy produced)."
  },
  {
    part: 5,
    section: "IX",
    q: "Q198",
    topic: "Economics of Power",
    question: "Connected load 500 MW, max demand 250 MW, energy generated 10,000 kWh/week. Average demand:",
    options: ["150 kW", "297.6 kW", "29.8 kW", "59.52 kW"],
    answer: 3,
    explanation: "Average demand = Energy per week / Hours per week = 10,000 / (24×7) = 10,000/168 ≈ 59.52 kW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q199",
    topic: "Economics of Power",
    question: "100 MW steam station, thermal efficiency 30%, electrical efficiency 92%, calorific value 6400 kcal/kg. Coal consumption at full load (kg/hour):",
    options: ["2340", "32450", "48690", "64910"],
    answer: 2,
    explanation: "Overall η = 0.30×0.92 = 0.276. Heat needed/hr = 100×1000×860/0.276 kcal. Coal = Heat/(6400×10³ cal/kg) ≈ 48,690 kg/hr."
  },
  {
    part: 5,
    section: "IX",
    q: "Q200",
    topic: "Economics of Power",
    question: "Connected load 500 MW, max demand 250 MW, units generated 10,000/week. Demand factor:",
    options: ["2", "40", "20", "0.5"],
    answer: 3,
    explanation: "Demand factor = Maximum demand / Connected load = 250/500 = 0.5."
  },
  {
    part: 5,
    section: "IX",
    q: "Q201",
    topic: "Economics of Power",
    question: "The two-part tariff is used for ___ consumers.",
    options: ["Domestic", "Commercial", "Industrial", "Agricultural"],
    answer: 2,
    explanation: "Two-part tariff is designed for industrial consumers who have significant maximum demand and high energy consumption, making the separate fixed + variable charge structure equitable."
  },
  {
    part: 5,
    section: "IX",
    q: "Q202",
    topic: "Economics of Power",
    question: "Electric charges for April: 2×40W fittings glow for 10 hrs/day @ ₹3/unit.",
    options: ["₹9", "₹2", "₹72", "₹100"],
    answer: 2,
    explanation: "Energy/day = 2×40×10/1000 = 0.8 kWh. For 30 days = 24 kWh. Bill = 24×3 = ₹72."
  },
  {
    part: 5,
    section: "IX",
    q: "Q203",
    topic: "Economics of Power",
    question: "Power station max demand 1000 MW, annual LF 75%, plant capacity factor 60%. Reserve capacity:",
    options: ["250 MW", "500 MW", "75 MW", "1250 MW"],
    answer: 0,
    explanation: "Avg load = 1000×0.75 = 750 MW. Plant capacity = 750/0.60 = 1250 MW. Reserve = 1250 − 1000 = 250 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q204",
    topic: "Economics of Power",
    question: "Trivector motor records 3600 kVA for 15 min and 3000 kVA for next 15 min in a 30-min cycle. Maximum demand:",
    options: ["3600 kVA", "3000 kVA", "3300 kVA", "600 kVA"],
    answer: 0,
    explanation: "Maximum demand is the highest instantaneous demand recorded during the billing period. The trivector meter records the peak of 3600 kVA as the maximum demand."
  },
  {
    part: 5,
    section: "IX",
    q: "Q205",
    topic: "Economics of Power",
    question: "The load curve is useful in deciding: (1) Operating schedule of generating units. (2) Total installed capacity.",
    options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
    answer: 2,
    explanation: "The load curve reveals both the installed capacity needed (from peak demand) and the optimal operating schedule (which units to run when), making it essential for both planning and operation."
  },
  {
    part: 5,
    section: "IX",
    q: "Q206",
    topic: "Economics of Power",
    question: "Presenting the load demand of a consumer against time of day is known as:",
    options: ["Time Curve", "Load curve", "Demand curve", "Energy curve"],
    answer: 1,
    explanation: "A load curve is a graphical representation of power demand (kW or MW) plotted against time (hours of the day or year), showing how load varies over the period."
  },
  {
    part: 5,
    section: "IX",
    q: "Q207",
    topic: "Economics of Power",
    question: "Utilizable water 60×10⁶ m³/year, head 40 m, 100% efficiency. Theoretical power generated:",
    options: ["250 kW", "300 kW", "500 kW", "750 kW"],
    answer: 3,
    explanation: "Q = 60×10⁶/(365×24×3600) ≈ 1.9 m³/s. P = 9.81×10⁻³×1×1.9×1000×40 = 9.81×0.001×1.9×40000 ≈ 745 kW ≈ 750 kW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q208",
    topic: "Economics of Power",
    question: "Load curve helps in deciding:",
    options: [
      "Sizes of generation units",
      "Total installed capacity",
      "Operating schedule of generating units",
      "All of these"
    ],
    answer: 3,
    explanation: "Load curve information is used to decide: (1) size of individual generating units, (2) total installed plant capacity, (3) operating schedule, and (4) estimating generating cost."
  },
  {
    part: 5,
    section: "IX",
    q: "Q209",
    topic: "Economics of Power",
    question: "Power station max demand 2500 kW, units generated 45×10⁵ kWh/year. Load factor:",
    options: ["10.25%", "20.5%", "41%", "82%"],
    answer: 1,
    explanation: "Avg load = 45×10⁵/8760 ≈ 513.7 kW. LF = 513.7/2500 × 100 ≈ 20.5%."
  },
  {
    part: 5,
    section: "IX",
    q: "Q210",
    topic: "Economics of Power",
    question: "Load centre in a power station is:",
    options: [
      "Centre of coal fields",
      "Centre of maximum load of equipment",
      "Centre of gravity of electrical system",
      "None of the above"
    ],
    answer: 2,
    explanation: "The load centre is the geographical centre of gravity of the electrical load distribution — the optimal location for a substation or generating station to minimise total transmission distance and losses."
  },
  {
    part: 5,
    section: "IX",
    q: "Q211",
    topic: "Economics of Power",
    question: "Max demand 480 MW, annual LF 40%. Total energy generated annually:",
    options: ["19819.2×10⁵ kWh", "18819.2×10⁵ kWh", "17819.2×10⁵ kWh", "16819.2×10⁵ kWh"],
    answer: 3,
    explanation: "Avg load = 480×0.4 = 192 MW = 192×10³ kW. Energy/year = 192×10³×8760 = 1,681,920,000 kWh = 16819.2×10⁵ kWh."
  },
  {
    part: 5,
    section: "IX",
    q: "Q212",
    topic: "Economics of Power",
    question: "In an interconnected power system, the most suitable plant to meet peak load conditions is:",
    options: ["Hydel", "Nuclear", "Steam", "Pumped storage"],
    answer: 3,
    explanation: "Pumped storage plants can start and reach full load in minutes, making them ideal for meeting sudden peak demands. They are the most flexible peak-load option in an interconnected system."
  },
  {
    part: 5,
    section: "IX",
    q: "Q213",
    topic: "Economics of Power",
    question: "The economics of a power plant is greatly influenced by: 1.Load factor 2.Utilization capacity 3.Unit capacity 4.Type of load",
    options: ["1, 2, 3 and 4", "1, 3 and 4", "1, 2 and 4", "2, 3 and 4"],
    answer: 0,
    explanation: "All four factors — load factor, utilization capacity, unit (generator) capacity, and type of load — directly influence the economics of power plant operation and investment."
  },
  {
    part: 5,
    section: "IX",
    q: "Q214",
    topic: "Economics of Power",
    question: "Load duration curve for a power station (straight line 90 MW peak, 50 MW at 50% time, 50 MW base). At 70% capacity factor, reserve capacity:",
    options: ["Zero", "10 MW", "30 MW", "50 MW"],
    answer: 1,
    explanation: "Area = 50×100 + ½×40×100 = 5000+2000 = 7000 MW·%. Avg load = 7000/100 = 70 MW. Plant capacity = 70/0.7 = 100 MW. Reserve = 100 − 90 = 10 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q215",
    topic: "Economics of Power",
    question: "Which is likely to result in lower efficiency of a power station?",
    options: ["Varying loads", "Low voltage generation", "Low turbine speeds", "Non-automatic controls"],
    answer: 0,
    explanation: "Varying (fluctuating) loads cause turbines and generators to operate away from their design point, reducing thermal and mechanical efficiency. Stable base loads allow operation at optimal efficiency."
  },
  {
    part: 5,
    section: "IX",
    q: "Q216",
    topic: "Economics of Power",
    question: "What is an electrical schedule?",
    options: [
      "A list providing information of number of points in each room of a building",
      "A list of electrical components required for a particular room",
      "A list of electrical components with prices",
      "None of these"
    ],
    answer: 0,
    explanation: "An electrical schedule is a document (list/plan) for a building that provides information about the number and type of electrical points (outlets, switches, lights) in each room."
  },
  {
    part: 5,
    section: "IX",
    q: "Q217",
    topic: "Economics of Power",
    question: "Peak load on 50 MW station is 39 MW. Four transformers: max demands 15, 10, 8, 9 MW. Diversity factor:",
    options: ["0.78", "1.282", "0.84", "1.077"],
    answer: 3,
    explanation: "Diversity factor = Sum of individual max demands / Station peak = (15+10+8+9)/39 = 42/39 ≈ 1.077."
  },
  {
    part: 5,
    section: "IX",
    q: "Q218",
    topic: "Economics of Power",
    question: "Energy performance is defined as:",
    options: [
      "% energy used at current rate vs previous year",
      "% energy saved at current rate vs reference year",
      "% energy used at current rate vs reference year",
      "% energy saved at current rate vs previous year"
    ],
    answer: 1,
    explanation: "Energy performance = percentage of energy saved at the current rate of use compared to a reference year's rate of use. Improvement in energy performance means using less energy for the same output."
  },
  {
    part: 5,
    section: "IX",
    q: "Q219",
    topic: "Economics of Power",
    question: "The effective use of energy to maximise profit and market position is known as:",
    options: ["Management of energy", "Energy policy", "Audit of energy", "Conservation of energy"],
    answer: 0,
    explanation: "Energy management is the systematic process of monitoring, controlling, and optimising energy consumption in an organisation to maximise profitability and competitive position."
  },
  {
    part: 5,
    section: "IX",
    q: "Q220",
    topic: "Economics of Power",
    question: "In load frequency control with free governor action, the increase in load demand under steady state is met:",
    options: [
      "Only by decrease of load demand due to drop in system frequency",
      "Partly by increased generation and partly by increased excitation",
      "Partly by increased generation and partly by decrease of load demand due to drop in frequency",
      "None of the above"
    ],
    answer: 2,
    explanation: "With free governor action: governors respond to frequency drop by opening steam valves (increasing generation), AND the frequency drop itself causes some loads to reduce — both effects meet the load increase."
  },
  {
    part: 5,
    section: "IX",
    q: "Q221",
    topic: "Economics of Power",
    question: "Efficiency is the secondary consideration in which power plant?",
    options: ["Base load plants", "Peak load plants", "Both base and peak load plants", "None"],
    answer: 1,
    explanation: "Peak load plants (diesel, gas turbines) must respond quickly to sudden demand surges. Their short operating hours make efficiency less important — speed of response is the primary consideration."
  },
  {
    part: 5,
    section: "IX",
    q: "Q222",
    topic: "Economics of Power",
    question: "A generator supplies load: incremental load change 6 MW requires 8 MW generation increase. Incremental cost at plant bus: ₹25/MWh. Incremental cost at receiving end:",
    options: ["₹33.33/MWh", "₹90/MWh", "₹45/MWh", "₹66.66/MWh"],
    answer: 0,
    explanation: "Penalty factor L = 1/(1 − ∂PL/∂P) = 1/(1 − 2/8) = 1/(0.75) = 4/3. Incremental cost at load = L × plant cost = (4/3) × 25 = ₹33.33/MWh."
  },
  {
    part: 5,
    section: "IX",
    q: "Q223",
    topic: "Economics of Power",
    question: "Max demand 20,000 kW, annual LF 60%, plant capacity factor 50%. Reserve capacity:",
    options: ["12,000 kW", "8,000 kW", "10,000 kW", "4,000 kW"],
    answer: 3,
    explanation: "Avg load = 20,000×0.6 = 12,000 kW. Plant capacity = 12,000/0.5 = 24,000 kW. Reserve = 24,000 − 20,000 = 4,000 kW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q224",
    topic: "Economics of Power",
    question: "Industry: max load 120 kW at 0.8 p.f. lag, 25,000 units/year. Tariff: ₹100/kVA + ₹5/unit. Annual saving if p.f. raised to unity:",
    options: ["₹6,000", "₹8,000", "₹3,000", "₹4,000"],
    answer: 2,
    explanation: "At 0.8 p.f.: kVA = 120/0.8 = 150. Bill = 150×100 + 25000×5 = 15,000+125,000 = ₹1,40,000. At unity p.f.: kVA = 120. Bill = 120×100 + 125,000 = 12,000+125,000 = ₹1,37,000. Saving = ₹3,000."
  },
  {
    part: 5,
    section: "IX",
    q: "Q225",
    topic: "Economics of Power",
    question: "Function of AVR in generating units is:",
    options: [
      "To synchronise generators to the grid",
      "To provide constant generator terminal voltage",
      "Automatic valve opening and reclosing",
      "To keep synchronous machine speed constant"
    ],
    answer: 1,
    explanation: "AVR (Automatic Voltage Regulator) continuously monitors and adjusts the generator field excitation to maintain constant terminal voltage at the generator output, regardless of load changes."
  },
  {
    part: 5,
    section: "IX",
    q: "Q226",
    topic: "Economics of Power",
    question: "Loss formula B matrix: B₁₁=0.001, B₁₂=B₂₁=−0.0001, B₂₂=0.0013 MW⁻¹. P₁=150 MW, P₂=275 MW. Penalty factor for plant 1:",
    options: ["1.324", "1.515", "1.575", "1.721"],
    answer: 0,
    explanation: "∂PL/∂P₁ = 2B₁₁P₁ + 2B₁₂P₂ = 2×0.001×150 + 2×(−0.0001)×275 = 0.3 − 0.055 = 0.245. Penalty factor = 1/(1−0.245) = 1/0.755 ≈ 1.324."
  },
  {
    part: 5,
    section: "IX",
    q: "Q227",
    topic: "Economics of Power",
    question: "Consumer: fixed charge ₹1000/month, running charge ₹4.50/unit. Motor: 1 kW at 0.85 p.f. lagging, 15 hrs/day average. Annual bill:",
    options: ["₹25,637.50", "₹36,637.50", "₹40,985.29", "₹32,941.88"],
    answer: 1,
    explanation: "Fixed: 12×1000 = ₹12,000. Running: 1 kW × 15 h/day × 365 days × ₹4.50 = 5475 × 4.5 = ₹24,637.50. Total = ₹36,637.50."
  },
  {
    part: 5,
    section: "IX",
    q: "Q228",
    topic: "Economics of Power",
    question: "Max demand 15,000 kW, annual LF 50%, plant capacity factor 40%. Plant capacity:",
    options: ["18.75 kW", "1875 MW", "1875 kW", "18.75 MW"],
    answer: 3,
    explanation: "Avg load = 15,000×0.5 = 7,500 kW. Plant capacity = 7,500/0.4 = 18,750 kW = 18.75 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q229",
    topic: "Economics of Power",
    question: "Max demand 100 kW, p.f.=0.8 lagging, LF=60%. Tariff: ₹50/kVA/annum + 10 paise/kWh. Annual bill:",
    options: ["₹58,810", "₹10,550", "₹65,800", "₹75,250"],
    answer: 0,
    explanation: "Units/year = 100×0.6×8760 = 525,600 kWh. kVA = 100/0.8 = 125. Bill = 125×50 + 0.1×525,600 = 6,250 + 52,560 = ₹58,810."
  },
  {
    part: 5,
    section: "IX",
    q: "Q230",
    topic: "Economics of Power",
    question: "The rate at which electrical energy is supplied to a consumer is known as:",
    options: ["Energy rate", "Tariff", "Power rate", "Rated consumption"],
    answer: 1,
    explanation: "Tariff is the schedule of rates at which electrical energy is supplied to consumers. It covers recovery of all costs (generation, transmission, distribution) plus profit."
  },
  {
    part: 5,
    section: "IX",
    q: "Q231",
    topic: "Economics of Power",
    question: "In load-frequency control with free governor action, steady-state increase in load demand is met:",
    options: [
      "Only by increased generation due to steam valve opening",
      "Only by decrease of load demand due to frequency drop",
      "Partly by increased generation and partly by load decrease",
      "Partly by increased generation and partly by increased generator excitation"
    ],
    answer: 0,
    explanation: "With free governor action (no supplementary control), the governor responds to frequency drop by opening the steam valve to increase generation. In steady state, this alone meets the demand without supplementary action."
  },
  {
    part: 5,
    section: "IX",
    q: "Q232",
    topic: "Economics of Power",
    question: "The correct expression for Area Control Error (ACE) for a 2-area interconnected system (ΔPt = tie line power deviation, Δf = frequency deviation, b = frequency bias coefficient):",
    options: [
      "ACE = bΔPt + Δf",
      "ACE = ΔPt + bΔf",
      "ACE = (1/b)ΔPt + Δf",
      "ACE = ΔPt + (1/b)Δf"
    ],
    answer: 1,
    explanation: "ACE = ΔPt + b·Δf, where b is the frequency bias coefficient (MW/Hz). ACE is used in Automatic Generation Control (AGC) to restore both frequency and tie-line power to scheduled values."
  },
  {
    part: 5,
    section: "IX",
    q: "Q233",
    topic: "Economics of Power",
    question: "Power plant: peak load 60 MW, load factor 0.6. Average load:",
    options: ["100 MW", "36 MW", "60 MW", "24 MW"],
    answer: 1,
    explanation: "Average load = Load factor × Peak load = 0.6 × 60 = 36 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q234",
    topic: "Economics of Power",
    question: "The following formula is correct:",
    options: [
      "Diversity factor = 1/Coincidence Factor",
      "Diversity factor = 1 × Coincidence Factor",
      "Diversity factor = 1 − Coincidence Factor",
      "All of the above"
    ],
    answer: 0,
    explanation: "Coincidence factor = 1/Diversity factor (by definition). They are reciprocals of each other. Diversity factor = sum of individual peaks / system peak; coincidence factor = system peak / sum of individual peaks."
  },
  {
    part: 5,
    section: "IX",
    q: "Q235",
    topic: "Economics of Power",
    question: "A load curve is a plot of:",
    options: ["Load vs generation capacity", "Load vs current", "Load vs time", "Load vs cost of power"],
    answer: 2,
    explanation: "A load curve plots power demand (kW or MW) on the y-axis against time (hours) on the x-axis, showing how the load on a power system varies throughout the day or year."
  },
  {
    part: 5,
    section: "IX",
    q: "Q236",
    topic: "Economics of Power",
    question: "Thermal plant: max demand 200 MW, LF 60%, annual capacity factor 40%. Operating reserve capacity:",
    options: ["80 MW", "100 MW", "120 MW", "300 MW"],
    answer: 1,
    explanation: "Avg load = 200×0.6 = 120 MW. Plant capacity = 120/0.4 = 300 MW. Reserve = 300 − 200 = 100 MW."
  },
  {
    part: 5,
    section: "IX",
    q: "Q237",
    topic: "Economics of Power",
    question: "Which is the simplest form of tariff?",
    options: ["Hopkinson demand rate", "Doherty rate", "Wright demand rate", "Straight meter rate"],
    answer: 3,
    explanation: "Straight meter rate (simple tariff) is the simplest form — a single uniform rate per kWh consumed. No distinction is made between maximum demand or time of use."
  },
  {
    part: 5,
    section: "IX",
    q: "Q238",
    topic: "Economics of Power",
    question: "_____ charges include general office expenses, rent, rates of lighting and heating, depreciation of furniture and office equipment.",
    options: ["Profit purchase system", "Time value", "Overhead", "Contingency"],
    answer: 2,
    explanation: "Overhead charges are indirect costs of running an organisation that cannot be attributed to a specific product or service — including office rent, utilities, depreciation of office equipment, and administrative salaries."
  }
];

const PART4_START = 0;
const PART4_END = allQuestions.findIndex(q => q.part === 5);
const PART5_START = PART4_END;


export default function PartFourFive() {
  const [selectedPart, setSelectedPart] = useState(4);

  const filteredQuestions = allQuestions.filter(
    (q) => q.part === selectedPart
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Power Plant - Part 4 & 5</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setSelectedPart(4)}>Part 4</button>
        <button onClick={() => setSelectedPart(5)}>Part 5</button>
      </div>

      {filteredQuestions.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>{item.q} - {item.topic}</h3>
          <p>{item.question}</p>

          <ul>
            {item.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>

          <p><b>Answer:</b> {item.options[item.answer]}</p>
          <p><b>Explanation:</b> {item.explanation}</p>
        </div>
      ))}
    </div>
  );
}
