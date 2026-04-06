import { useState, useEffect } from "react";

const questions = [
  // SECTION I - Power Plant Cycle
  {
    id: 1, section: "I. Power Plant Cycle",
    q: "The frequency of emf generation in India is:",
    options: ["60 Hz", "230 Hz", "50 Hz", "55 Hz"],
    answer: 2,
    explanation: "The frequency of emf generation in India is 50 Hz. Different countries have different standards; for example, America uses 60 Hz."
  },
  {
    id: 2, section: "I. Power Plant Cycle",
    q: "What is the aim of all energy conservation techniques?",
    options: ["To promote non-renewable energy sources", "To replace old equipment with new ones", "To experiment with new energy sources", "To reduce energy losses"],
    answer: 3,
    explanation: "The main aim of energy conservation techniques is to reduce energy losses."
  },
  {
    id: 3, section: "I. Power Plant Cycle",
    q: "Base load of a power station stands for?",
    options: ["12–24 hours/day", "2–4 hours/day", "8–12 hours/day", "4–8 hours/day"],
    answer: 0,
    explanation: "Base load is the minimum level of demand on an electrical supply system over 24 hours. Base load power sources generate dependable power to consistently meet demand."
  },
  {
    id: 4, section: "I. Power Plant Cycle",
    q: "Which of the following power plants employs the Rankine cycle?",
    options: ["Nuclear power plant", "Solar power plant", "Thermal power plant", "Hydro-electric power plant"],
    answer: 2,
    explanation: "The Rankine cycle (or Rankine vapour cycle) is widely used in coal or thermal power plants, where fuel produces heat to convert water into steam which expands through a turbine. The efficiency of thermal power plants is 25–30%."
  },
  {
    id: 5, section: "I. Power Plant Cycle",
    q: "Which of them is peak load station?",
    options: ["Small capacity thermal plants", "Diesel stations", "Run off river plant", "All of them"],
    answer: 3,
    explanation: "Diesel stations, small capacity thermal plants and run-off-river plants are all used as peak load plants. Thermal, hydro and nuclear power plants are used as base load stations."
  },
  {
    id: 6, section: "I. Power Plant Cycle",
    q: "Gain in kinetic energy is equal to:",
    options: ["loss in P.E + work against friction", "loss in P.E × work against friction", "loss in P.E – work against friction", "loss in K.E – work against friction"],
    answer: 2,
    explanation: "Gain in kinetic energy = loss in P.E. – work against friction."
  },
  {
    id: 7, section: "I. Power Plant Cycle",
    q: "A generating station having a high investment cost and low operating cost is usually operated as a:",
    options: ["Peak load station", "Base load station", "Medium load station", "Fast load station"],
    answer: 1,
    explanation: "Base load power plants have low operating cost, capability of working continuously for long periods, and low maintenance cost. They are operated with high investment cost and low running cost."
  },
  {
    id: 8, section: "I. Power Plant Cycle",
    q: "Power generation of thermal power plant is based on:",
    options: ["Rankine Cycle", "Otto Cycle", "Diesel Cycle", "Carnot Cycle"],
    answer: 0,
    explanation: "The Rankine cycle is used to predict the performance of steam turbine systems. It is an idealized thermodynamic cycle of a heat engine that converts heat into mechanical work while undergoing phase change."
  },
  {
    id: 9, section: "I. Power Plant Cycle",
    q: "Which power plant may take several days to start up and shut down?",
    options: ["Peak load", "Base load", "Solar power plant", "None of these"],
    answer: 1,
    explanation: "Base load power plants (such as large coal or nuclear plants) do not change their output quickly and may take several days to start up and shut down."
  },
  {
    id: 10, section: "I. Power Plant Cycle",
    q: "Match List-I with List-II: (a) Base load – (b) Peak load; 1. nuclear power plant, 2. diesel power plant, 3. gas power plant",
    options: ["1-a, 2-b, 3-b", "1-a, 2-a, 3-b", "1-b, 2-b, 3-b", "1-a, 2-b, 3-a"],
    answer: 0,
    explanation: "Base load plants: Thermal power plant, Nuclear power plant. Peak load plants: Diesel power plant, Gas power plant."
  },
  {
    id: 11, section: "I. Power Plant Cycle",
    q: "Which of the following are the main parts of a power system? 1. Generating stations 2. Transmission systems 3. Distribution networks",
    options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3 only"],
    answer: 3,
    explanation: "Parts of a power system include: Generation System, Transmission System, and Distribution System."
  },
  {
    id: 12, section: "I. Power Plant Cycle",
    q: "Power plants using coal work closely on which of the following cycle?",
    options: ["Otto cycle", "Binary vapour cycle", "Brayton cycle", "Rankine cycle"],
    answer: 3,
    explanation: "A steam power station which converts heat energy of coal combustion into electrical energy basically works on the Rankine cycle."
  },
  {
    id: 13, section: "I. Power Plant Cycle",
    q: "Which of the following is usually NOT the generating voltage?",
    options: ["6.6 kV", "9.9 kV", "11 kV", "13.2 kV"],
    answer: 1,
    explanation: "Generating voltages are typically 6.6 kV, 11 kV, 13.2 kV or 33 kV. 9.9 kV is not a standard generating voltage."
  },
  {
    id: 14, section: "I. Power Plant Cycle",
    q: "Steam engine is based on which of the following thermodynamic cycles?",
    options: ["Rankine cycle", "Brayton cycle", "Stirling cycle", "Carnot cycle"],
    answer: 0,
    explanation: "Steam engine is based on the Rankine cycle. It is a cyclic process in which steam power plants are working and converts heat to useful work using liquid phase change."
  },
  {
    id: 15, section: "I. Power Plant Cycle",
    q: "The biggest unit size of steam plant in India is:",
    options: ["250 MW", "100 MW", "1000 MW", "500 MW"],
    answer: 3,
    explanation: "The biggest unit size of steam plant in India is 500 MW. It is located in Anpara (U.P.)."
  },
  {
    id: 16, section: "I. Power Plant Cycle",
    q: "Which of the following is NOT a type of generating station?",
    options: ["Thermal", "Nuclear", "Hydro", "Atmospheric"],
    answer: 3,
    explanation: "Thermal, Nuclear, and Hydro are conventional sources of power generation. 'Atmospheric' is not a type of generating station."
  },
  {
    id: 17, section: "I. Power Plant Cycle",
    q: "Super thermal power stations are being installed at all of the following places EXCEPT:",
    options: ["Singrauli", "Farraka", "Narora", "Ramagundam"],
    answer: 2,
    explanation: "Super thermal power stations are installed at Singrauli, Farraka and Ramagundam. Narora (Bulandshahr, UP) has a Nuclear Power Plant."
  },
  {
    id: 18, section: "I. Power Plant Cycle",
    q: "If the normal system frequency is 50 Hz and it is operated at 53 Hz, the equipment on the system most adversely affected is:",
    options: ["Power transformer", "Alternator", "Turbine", "Loads"],
    answer: 2,
    explanation: "If the normal system frequency is 50 Hz and it is operated at 53 Hz, the turbine is most adversely affected."
  },
  {
    id: 19, section: "I. Power Plant Cycle",
    q: "The generation voltage is usually:",
    options: ["Between 11 kV and 33 kV", "Between 132 kV and 400 kV", "Between 400 kV and 700 kV", "None of the above"],
    answer: 0,
    explanation: "Electrical energy generated at generating stations by synchronous generators is generally between 11 kV to 33 kV. This voltage is stepped up for transmission."
  },
  {
    id: 20, section: "I. Power Plant Cycle",
    q: "Which of the following is NOT a peak load power plant?",
    options: ["Diesel power plant", "Gas plant", "Solar and wind power plant", "Thermal power plant"],
    answer: 3,
    explanation: "Thermal power plant is a base load plant, not a peak load plant. Base load plants include nuclear power plants and thermal power plants. Peak load plants include diesel, hydro (with storage), and gas plants."
  },
  {
    id: 21, section: "I. Power Plant Cycle",
    q: "Which type of Hydel power plants can be used as both base and peak load plants?",
    options: ["Run–off–river plants with poundage", "Run–off–river plants without poundage", "Storage hydro type plants", "Pumped storage plants"],
    answer: 2,
    explanation: "Storage type hydro power plants can be used as both base and peak load plants."
  },
  {
    id: 22, section: "I. Power Plant Cycle",
    q: "Generators for peak load plants are usually designed for maximum efficiency at:",
    options: ["25 to 50% full load", "25% overload", "Full load", "50 to 75% full load"],
    answer: 3,
    explanation: "Generators for peak load plants are usually designed for maximum efficiency at 50% to 75% of full load. Examples include pumped storage plants and diesel electric plants."
  },
  {
    id: 23, section: "I. Power Plant Cycle",
    q: "Which of the following type of power plant is NOT used as a base load power plant?",
    options: ["Run off the river hydro power plant", "Nuclear power plant", "Pumped storage power plant", "None of these"],
    answer: 2,
    explanation: "Pumped storage power plant is a peak load power plant, not a base load power plant."
  },
  {
    id: 24, section: "I. Power Plant Cycle",
    q: "Which of the following plants is suitable for peak load?",
    options: ["Diesel engine plant", "Steam power plant", "Nuclear power plant", "Hydro-electric plant"],
    answer: 0,
    explanation: "Power plants for peak load include: Diesel engine plant, Solar power plant, Gas plant, and Wind turbine."
  },
  {
    id: 25, section: "I. Power Plant Cycle",
    q: "The unvarying load which occurs almost the whole day on the station is known as:",
    options: ["Peak load", "Bottom load", "Base load", "Top load"],
    answer: 2,
    explanation: "The unvarying load which occurs almost the whole day on the station is known as base load. Minimum continuous load on any substation for a given duration (whole day) is known as base load for that station."
  },
  {
    id: 26, section: "I. Power Plant Cycle",
    q: "Which of the following power station is mainly used to cover peak load on the system?",
    options: ["Coal based thermal power plant", "Nuclear power plant", "Gas based thermal power plant", "Pumped storage hydro power plant"],
    answer: 3,
    explanation: "Pumped storage hydro power plant is used mainly to cover peak load. Base load plants include nuclear, coal, hydroelectric, geothermal, biogas, solar thermal with storage. Peak load plants include gas, diesel, and pumped storage hydro."
  },
  {
    id: 27, section: "I. Power Plant Cycle",
    q: "A coal fired steam power plant is working at a plant load factor of 90%. It has one 400 MW generating unit. If the heat content of the coal is 2 kWh/kg, the overall plant efficiency is 60% and a trainload of coal is 900 metric tons, how many trainloads of coal are required daily?",
    options: ["1", "6", "8", "10"],
    answer: 2,
    explanation: "Generated energy/day = 400 × 24 = 9600 MWh. Input = 9600/0.6 = 16000 MWh. Total coal = 16000×10³/2 = 8000 metric tons. Trainloads = 8000/900 ≈ 8.88 ≈ 8 trainloads."
  },
  {
    id: 28, section: "I. Power Plant Cycle",
    q: "At times of peak loads, a power system needs:",
    options: ["Injection of lagging VAR's", "Injection of leading VAR", "None of (a) and (b)", "Both of (a) and (b) alternately"],
    answer: 0,
    explanation: "At times of peak loads, which are mainly lagging power factor loads, the power system needs injection of lagging VAR's."
  },
  {
    id: 29, section: "I. Power Plant Cycle",
    q: "Which of the following is an example of the conversion of heat energy to mechanical energy?",
    options: ["Steam engine", "Piezoelectric", "Photosynthesis in plants", "Geothermal power plant"],
    answer: 0,
    explanation: "Steam engine converts heat energy into mechanical energy. Coal is burnt, water is vaporized, and hot steam generates mechanical energy."
  },

  // SECTION II - Thermal Power Plant
  {
    id: 30, section: "II. Thermal Power Plant",
    q: "In a thermal power plant, Economiser is used to heat:",
    options: ["Air", "Flue Gases", "Feed Water", "Coal"],
    answer: 2,
    explanation: "In thermal power plants, the economizer heats feed water using flue gas. It can increase boiler thermal efficiency by 10–12% and save fuel by 5–15%."
  },
  {
    id: 31, section: "II. Thermal Power Plant",
    q: "The problematic pollutants in emission of coal based generating plants are:",
    options: ["SO₂", "NOx", "CO", "All of the above"],
    answer: 3,
    explanation: "Emissions from coal burning contain pollutants such as SO₂, SO₃, NOx, particulate matter, mercury, CO, trace metals, and radioactive nucleotides."
  },
  {
    id: 32, section: "II. Thermal Power Plant",
    q: "The part of the steam power plant that extracts heat from the flue gases before applying to the boiler is the:",
    options: ["Super heater", "Draught system", "Condenser", "Economiser"],
    answer: 3,
    explanation: "The economiser is a mechanical device intended to reduce energy consumption by preheating a fluid. It extracts heat from flue gases before the boiler."
  },
  {
    id: 33, section: "II. Thermal Power Plant",
    q: "Which of the following heat exchangers is used to raise the temperature of steam from normal to supersaturation level?",
    options: ["Air pre heater", "Economizer", "Superheater", "Condenser"],
    answer: 2,
    explanation: "Superheater converts saturated/wet steam into superheated steam for use in steam turbines for electricity generation."
  },
  {
    id: 34, section: "II. Thermal Power Plant",
    q: "Which of the following treatments for water is used to remove non-carbonate hardness?",
    options: ["Lime treatment", "Soda treatment", "Distillation", "Sedimentation"],
    answer: 1,
    explanation: "Soda treatment removes hardness from water. Adding lime (CaO) and soda (Na₂CO₃) precipitates calcium as carbonate and magnesium as hydroxide."
  },
  {
    id: 35, section: "II. Thermal Power Plant",
    q: "The hoppers in electrostatic precipitator are generally ________ in shape:",
    options: ["Cylindrical", "Pyramidal", "Conical", "Rectangular"],
    answer: 1,
    explanation: "A hopper is a large pyramidal or cone-shaped container used in industrial processes to hold particulate matter."
  },
  {
    id: 36, section: "II. Thermal Power Plant",
    q: "The purpose of cooling tower is:",
    options: ["To send cool water to boiler", "To reduce the flue gas temperature", "To cool the air to be sent to furnace", "To cool the steam in the condenser"],
    answer: 3,
    explanation: "Cooling tower converts hot water or steam coming from the condenser into cold water or cool steam."
  },
  {
    id: 37, section: "II. Thermal Power Plant",
    q: "Air pollution due to smoke around a thermal power station can be reduced by installing:",
    options: ["Induced draft fan", "Super heater", "Economizer", "Electrostatic precipitator"],
    answer: 3,
    explanation: "An electrostatic precipitator (ESP) is the most efficient device to capture dangerous particles of fly ash and reduce air pollution."
  },
  {
    id: 38, section: "II. Thermal Power Plant",
    q: "Which of the following is a conventional source of electricity generation?",
    options: ["Thermal", "Wind", "Fuel cell", "Solar"],
    answer: 0,
    explanation: "Thermal power plants are conventional (non-renewable) sources. Wind, solar, and fuel cells are non-conventional (renewable) sources."
  },
  {
    id: 39, section: "II. Thermal Power Plant",
    q: "In a thermal power station, for a large turbine and surface condenser taken together, the percentage distribution of heat energy in descending order is:",
    options: ["3, 4, 1 and 2", "2, 1, 4 and 3", "3, 1, 4 and 2", "2, 4, 1 and 3"],
    answer: 2,
    explanation: "Descending order: Heat to circulating water > Work done (thermal efficiency) > Heat in condensate retained to boiler > Friction and windage loss."
  },
  {
    id: 40, section: "II. Thermal Power Plant",
    q: "For a 3-element feed water control in a coal-fired thermal power station, measurements of water level in the boiler drums are made so that the water level does not:",
    options: ["Exceed a specified upper limit", "Fall below a specified lower limit", "Violate specified upper and lower limits", "Restrict to a specified limit"],
    answer: 2,
    explanation: "For a 3-element feed water control, the water level must not violate the specified upper and lower limits."
  },
  {
    id: 41, section: "II. Thermal Power Plant",
    q: "Maximum efficiency of modern coal-fired steam rising thermal power plants is restricted to about 0.35 (a low value), mainly because of:",
    options: ["Low alternator efficiency", "High energy loss in boilers", "Low steam turbine mechanical efficiency", "High energy loss from turbine exhaust to condenser"],
    answer: 3,
    explanation: "The maximum efficiency is restricted mainly because of high energy loss from turbine exhaust to condenser. This loss is unavoidable when steam enters the turbine and heat is rejected to the condenser."
  },
  {
    id: 42, section: "II. Thermal Power Plant",
    q: "Major share of power in India is produced through:",
    options: ["Thermal power plants", "Diesel power plants", "Nuclear power plants", "Hydroelectric power plants"],
    answer: 0,
    explanation: "Power generation capacity in India: Thermal 63%, Hydro 13%, Gas 7%, Non-conventional 12%, Nuclear 2%, Diesel 1%."
  },
  {
    id: 43, section: "II. Thermal Power Plant",
    q: "The economiser of steam turbine system is located in the:",
    options: ["Turbine circuit", "Feeding water circuit", "Coal handling plant", "Condenser circuit"],
    answer: 1,
    explanation: "The economiser is located in the feeding water circuit. It consists of horizontal water tubes through which feed water enters the boiler, absorbing residual heat from exhaust flue gases."
  },
  {
    id: 44, section: "II. Thermal Power Plant",
    q: "Which of the following generating power station requires lot of time for starting?",
    options: ["Steam power station", "Diesel power plant", "Hydro–electric power plant", "Nuclear power plant"],
    answer: 0,
    explanation: "Steam power station takes a lot of time for starting due to various energy conversion processes. It is quasi-static in nature."
  },
  {
    id: 45, section: "II. Thermal Power Plant",
    q: "The function of condenser in Thermal power plant is:",
    options: ["Purify steam", "Condense used steam into water", "Condense water", "Purify water"],
    answer: 1,
    explanation: "The function of condenser in thermal power plant is to condense the exhaust steam into water for reusing. Water is the working fluid in thermal power plant."
  },
  {
    id: 46, section: "II. Thermal Power Plant",
    q: "Which component is NOT a component of a thermal power plant?",
    options: ["Chimney", "Boiler", "Reactor", "Economiser"],
    answer: 2,
    explanation: "Reactor is a main part of nuclear power plant, not thermal power plant. Nuclear fission is done inside the reactor in a controlled manner."
  },
  {
    id: 47, section: "II. Thermal Power Plant",
    q: "Name the generating station where electrical energy is generated through steam.",
    options: ["Thermal power station", "Diesel power station", "Hydro power station", "Nuclear power station"],
    answer: 0,
    explanation: "A thermal power station uses steam or heat energy generated from burning coal to produce electrical energy. Its thermal efficiency is about 30% and it works on the Rankine cycle."
  },
  {
    id: 48, section: "II. Thermal Power Plant",
    q: "Which type of fan is used between dust collector and chimney in thermal power plant?",
    options: ["Forced draft", "Induced draft", "Ceiling fan", "Table fan"],
    answer: 1,
    explanation: "Induced draft fan is used between the dust collector and chimney. It creates a vacuum or negative pressure in the system, used to identify combustion process in large boilers."
  },
  {
    id: 49, section: "II. Thermal Power Plant",
    q: "The air preheater in thermal power plant is called as:",
    options: ["Safety device", "Efficiency increasing equipment", "Starting device", "Very essential device"],
    answer: 1,
    explanation: "Air preheater is a device designed to heat air before another process (e.g., combustion in a boiler) with primary objective of increasing thermal efficiency."
  },
  {
    id: 50, section: "II. Thermal Power Plant",
    q: "Forced draft fan handles which type of air?",
    options: ["Cold air", "Hot air", "Flue gas only", "Fresh air only"],
    answer: 0,
    explanation: "Forced draft fan handles cold air. Forced draft inserts cold air into the fan boiler."
  },
  {
    id: 51, section: "II. Thermal Power Plant",
    q: "The overall efficiency of a steam power plant is about:",
    options: ["66%", "29%", "56%", "45%"],
    answer: 1,
    explanation: "The total efficiency of a steam power plant is about 29%. Total efficiency = Thermal efficiency × Electrical efficiency."
  },
  {
    id: 52, section: "II. Thermal Power Plant",
    q: "A 100 MW steam station uses coal of calorific value 6400 kcal/kg. Thermal efficiency is 30% and electrical efficiency is 92%. Find the overall efficiency of the plant.",
    options: ["92%", "27.6%", "30%", "62%"],
    answer: 1,
    explanation: "Overall efficiency = Thermal efficiency × Electrical efficiency = 0.30 × 0.92 = 0.276 = 27.6%."
  },
  {
    id: 53, section: "II. Thermal Power Plant",
    q: "What is the name of the power generating station which uses coal as a fuel? / A generating station which converts heat energy of coal combustion into electrical energy is classified as:",
    options: ["Atomic power station", "Thermal power station", "Low pressure Mercury Voltage lamps", "Nuclear power station"],
    answer: 1,
    explanation: "A thermal power station converts heat energy of coal combustion into electrical energy. It basically works on the Rankine cycle."
  },
  {
    id: 54, section: "II. Thermal Power Plant",
    q: "In a thermal power plant, feed water heaters, super heaters and air preheaters are mainly used to:",
    options: ["Have a better dust removal in the plant", "Have a better ash removal in the plant", "Increase the efficiency of the plant", "None of the above"],
    answer: 2,
    explanation: "In thermal power plants, feed water heaters, superheaters and air preheaters are used to increase the efficiency of the power plant."
  },
  {
    id: 55, section: "II. Thermal Power Plant",
    q: "Coal used in power plant is also known as:",
    options: ["Steam coal", "Charcoal", "Coke", "Soft coal"],
    answer: 0,
    explanation: "Coal used in thermal power plant is also known as steam coal. For easy combustion, fine powder of coal (pulverized coal) is used."
  },
  {
    id: 56, section: "II. Thermal Power Plant",
    q: "Binary vapour cycles are used to:",
    options: ["Increase efficiency of the turbine", "Increase the efficiency of the plant", "Increase the performance of the condenser", "Balance the efficiency of turbine"],
    answer: 1,
    explanation: "Binary vapour cycles are defined as a combination of two cycles, one in a high temperature region, used to increase the overall efficiency of the plant."
  },
  {
    id: 57, section: "II. Thermal Power Plant",
    q: "The draught produced by chimney of given height at given outside temperature:",
    options: ["May increase or decrease", "Increases if the chimney gas temperature increases", "Decreases, if the chimney gas temperature decreases", "Remains same irrespective of chimney gas temperature"],
    answer: 1,
    explanation: "The draught produced by a chimney increases if the chimney gas temperature increases. Draught is the pressure difference causing air/gas flow due to density difference between hot flue gases and cold outside air."
  },
  {
    id: 58, section: "II. Thermal Power Plant",
    q: "The overall efficiency of the steam power plant is defined as:",
    options: ["Heat equivalent of mechanical output / heat of combustion of coal", "Heat equivalent of electrical output / heat of combustion of coal", "Heat equivalent electrical output / heat equivalent of mechanical output", "Electrical output / heat of combustion of coal"],
    answer: 1,
    explanation: "Overall efficiency = Heat equivalent of electrical output / Heat of combustion. For conventional steam electric power plants this is typically 33 to 48%."
  },
  {
    id: 59, section: "II. Thermal Power Plant",
    q: "The prime mover used in thermal power plant is:",
    options: ["Wind turbine", "Steam turbine", "PV cell", "Reaction turbine"],
    answer: 1,
    explanation: "Steam turbines are employed as prime movers in thermal power plants. A steam turbine extracts thermal energy from pressurized steam and uses it for mechanical work."
  },
  {
    id: 60, section: "II. Thermal Power Plant",
    q: "In a steam power plant, the condensate from the condenser is used:",
    options: ["To cool the generator", "As feed water to the boiler", "To cool the turbine", "To cool the boiler"],
    answer: 1,
    explanation: "The condensed water is extracted from the condenser by the condensate pump, forced to feed water heaters, and then pumped into the boiler."
  },
  {
    id: 61, section: "II. Thermal Power Plant",
    q: "A steam power station has thermal efficiency of 30% and electrical efficiency of 90%. What is the overall efficiency of the station?",
    options: ["27%", "33%", "90%", "30%"],
    answer: 0,
    explanation: "Overall efficiency = Thermal efficiency × Electrical efficiency = 30% × 90% = 0.3 × 0.9 = 0.27 = 27%."
  },
  {
    id: 62, section: "II. Thermal Power Plant",
    q: "A modern coal-fired thermal power station consumes about _____ of its power for supplying to the auxiliaries.",
    options: ["40%", "10%", "20%", "30%"],
    answer: 1,
    explanation: "The thermal power plant station consumes about 10% of its power supplying to the auxiliaries."
  },
  {
    id: 63, section: "II. Thermal Power Plant",
    q: "Which of the following fuels is used as a fossil fuel in electric power generation?",
    options: ["Coal", "Solar light", "Wind", "Water"],
    answer: 0,
    explanation: "Coal is a hard rock fossil fuel with mostly carbon. It can be burned for energy or heat and used in electric power generation."
  },
  {
    id: 64, section: "II. Thermal Power Plant",
    q: "Identify the non-renewable source of energy from the following. / Which of the following methods is a conventional method of electrical energy generation?",
    options: ["Photovoltaic cells", "Wind power plant", "Thermal power plant", "Fuel cells"],
    answer: 2,
    explanation: "Thermal power plant is a conventional (non-renewable) method. Conventional sources are non-renewable and will be exhausted. Non-conventional sources are renewable."
  },
  {
    id: 65, section: "II. Thermal Power Plant",
    q: "Which of the following devices is suitable for the removal of gaseous pollutants?",
    options: ["Cyclone separator", "Electrostatic precipitator", "Wet collector (scrubber)", "Fabric filter"],
    answer: 2,
    explanation: "Wet collectors (scrubbers) are used to remove gaseous pollutants from exhaust gases using a scrubbing liquid."
  },
  {
    id: 66, section: "II. Thermal Power Plant",
    q: "The term 'Live storage of coal' in a power plant relates to:",
    options: ["Coal ready for combustion and reusability", "Coal in transit requiring one year waiting period", "Preheated coal to be used and disposed always", "Storage of coal sufficient to meet 24 hour demand of the plant"],
    answer: 3,
    explanation: "Live storage of coal refers to storage sufficient to meet 24-hour demand of the plant. Storage is primarily protection against strikes, transportation failure, and coal shortages."
  },
  {
    id: 67, section: "II. Thermal Power Plant",
    q: "Which of the following is practically suitable for coal-fired thermal power plant?",
    options: ["(iv) only – Rankine and Carnot cycle", "(ii) only – Otto and Carnot cycle", "(i) only – Carnot cycle", "(iii) only – Rankine cycle"],
    answer: 3,
    explanation: "The Rankine cycle is practically suitable for coal-fired thermal power plant. The Rankine cycle consists of 2 Isothermal, 2 Adiabatic and 1 Isobaric process, with efficiency of 30–45%."
  },
  {
    id: 68, section: "II. Thermal Power Plant",
    q: "The draught produced by the chimney is called: / Natural draught in a steam power plant is produced by:",
    options: ["Balanced draught", "Forced draught", "Natural draught", "Induced draught"],
    answer: 2,
    explanation: "The draught produced by the chimney is called natural or chimney draught. It is due to the density difference between hot flue gases inside and cold air outside the chimney."
  },
  {
    id: 69, section: "II. Thermal Power Plant",
    q: "Which of the following power plant has least efficiency?",
    options: ["Steam Power Plant", "Diesel Power Plant", "Nuclear Power Plant", "Hydro Power Plant"],
    answer: 0,
    explanation: "Steam power plant has least efficiency at approximately 29%. Hydro: 85%, Diesel: 42%, Nuclear: 30–37%."
  },
  {
    id: 70, section: "II. Thermal Power Plant",
    q: "The optimal scheduling problem in case of a thermal plant can be completely solved at any desired instant:",
    options: ["With reference to the operation at other times", "Without reference to operation at other times", "Depends on the size of the plant", "None of these"],
    answer: 1,
    explanation: "The optimal scheduling problem in case of a thermal plant can be completely solved at any desired instant without reference to operation at other times."
  },
  {
    id: 71, section: "II. Thermal Power Plant",
    q: "Calculate the overall efficiency of a steam thermal power plant, if boiler efficiency is 85%, turbine efficiency is 40% and alternator efficiency is 95%:",
    options: ["73.3%", "32.3%", "43.5%", "25.3%"],
    answer: 1,
    explanation: "Overall efficiency = boiler efficiency × turbine efficiency × alternator efficiency = 0.85 × 0.40 × 0.95 = 0.323 = 32.3%."
  },
  {
    id: 72, section: "II. Thermal Power Plant",
    q: "Turbine efficiency of a steam thermal power plant varies between:",
    options: ["65 to 75%", "55 to 65%", "25 to 35%", "80 to 90%"],
    answer: 2,
    explanation: "The turbine efficiency of a steam thermal power plant varies between 25 to 35% and the total efficiency of steam power is about 29%."
  },
  {
    id: 73, section: "II. Thermal Power Plant",
    q: "For the proper combustion of fuel in a thermal power plant, a proper circulation of air is also needed. The same is provided with the help of:",
    options: ["Draft fan", "Economiser", "Condenser", "Cooling Tower"],
    answer: 0,
    explanation: "For proper combustion of fuel in thermal power plant, proper circulation of air is provided with the help of draft fan."
  },
  {
    id: 74, section: "II. Thermal Power Plant",
    q: "Superheater is employed to: 1. Remove moisture from the vapours 2. Increase the temperature of vapours 3. Heat the feed water. Which statement is INCORRECT?",
    options: ["2 and 3", "3", "1 and 2", "1"],
    answer: 1,
    explanation: "Superheater removes moisture from vapours and increases temperature of vapours. Heating feed water is done by economizer/feed water heater, not superheater. So statement 3 is incorrect."
  },
  {
    id: 75, section: "II. Thermal Power Plant",
    q: "What is separated with the help of magnetic separators in a coal preparation plant?",
    options: ["Pebbles", "Iron particles", "Dust", "Sand"],
    answer: 1,
    explanation: "Iron particles are separated with the help of magnetic separators in a coal preparation plant."
  },
  {
    id: 76, section: "II. Thermal Power Plant",
    q: "The exact direction of fan for completing the induced draught should be:",
    options: ["Anywhere", "Bottom of chimney", "Top of the chimney", "Near the bottom of chimney"],
    answer: 3,
    explanation: "To fulfill the purpose of induced draught, the fan should be placed near the bottom of the chimney."
  },
  {
    id: 77, section: "II. Thermal Power Plant",
    q: "In a steam power plant, the working fluid is:",
    options: ["Natural gas", "Water", "Diesel", "Oil"],
    answer: 1,
    explanation: "In a steam power plant, the working fluid is water. Availability and low cost are the 2 major reasons for using water over other fluids."
  },
  {
    id: 78, section: "II. Thermal Power Plant",
    q: "Which of the following is NOT a part of a steam power plant?",
    options: ["Boiler", "Super heater", "Diffuser", "Economiser"],
    answer: 2,
    explanation: "Diffuser is not part of steam power plant. Boiler, superheater, and economiser are all components of steam power plants."
  },
  {
    id: 79, section: "II. Thermal Power Plant",
    q: "With reference to steam electric power plant, which of the following is a pulverised fuel burner?",
    options: ["Weak type burner", "Rotating cup burner", "Recirculation burner", "Cyclone burner"],
    answer: 3,
    explanation: "In steam power plants, cyclone type burners are used for pulverised coal. Ball mills are used for pulverising coal."
  },
  {
    id: 80, section: "II. Thermal Power Plant",
    q: "In a power plant, efficiencies of electric generator, turbine, boiler, cycle and overall plant are 0.97, 0.95, 0.92, 0.42 and 0.33. What percentage of the total electricity generated is consumed in running the auxiliaries?",
    options: ["2.73%", "3.27%", "7.32%", "6.71%"],
    answer: 2,
    explanation: "Overall = 0.97 × 0.95 × 0.92 × 0.42 × ηa = 0.33 → ηa = 0.926. Auxiliaries = 1 – 0.926 = 0.074 ≈ 7.3%."
  },
  {
    id: 81, section: "II. Thermal Power Plant",
    q: "The efficiency of a wet electrostatic precipitator is:",
    options: ["99%", "50%", "80%", "99.5%"],
    answer: 3,
    explanation: "The efficiency of a wet electrostatic precipitator is 99.5%. Its function is to separate fine metal particles from gas and give clear gas to the atmosphere."
  },
  {
    id: 82, section: "II. Thermal Power Plant",
    q: "A pulverized coal boiler generates approximately ___ fly ash and ___ bottom ash.",
    options: ["60%; 40%", "70%; 30%", "50%; 50%", "80%; 20%"],
    answer: 3,
    explanation: "When pulverized coal is burnt in boilers, 80% of dust particles become fly ash and 20% become bottom ash."
  },
  {
    id: 83, section: "II. Thermal Power Plant",
    q: "Which of the following is the correct sequence for heat transfer of water in a generator?",
    options: ["Evaporator, Superheater, Economiser", "Economiser, Evaporator, Superheater", "Economiser, Superheater, Evaporator", "Superheater, Economiser, Evaporator"],
    answer: 1,
    explanation: "Economiser → Evaporator → Superheater is the correct sequence. Economiser heats water before the boiler; superheater dries the wet steam."
  },
  {
    id: 84, section: "II. Thermal Power Plant",
    q: "Which of the following impurities causes temporary hardness in feed water?",
    options: ["Nitrates", "Chlorides", "Sulphates", "Bicarbonates"],
    answer: 3,
    explanation: "Bicarbonate impurity causes temporary hardness in water. Sulphates and chlorides of calcium and magnesium cause permanent hardness."
  },
  {
    id: 85, section: "II. Thermal Power Plant",
    q: "For a thermal power plant, which of the following is the correct sequence of flue gas flow?",
    options: ["Boiler > Economizer > Air preheater > ID fan > Chimney", "Boiler > ID fan > Economizer > Air preheater > Chimney", "Boiler > ID fan > Air preheater > Economizer > Chimney", "Boiler > Air preheater > ID fan > Economizer > Chimney"],
    answer: 0,
    explanation: "Correct sequence: Boiler → Economiser → Air preheater → ID Fan → Chimney. Economiser heats feed water; air preheater heats air before it goes to the boiler furnace."
  },
  {
    id: 86, section: "II. Thermal Power Plant",
    q: "In a steam power plant, _____ heats the feed water on its way to the boiler by deriving heat from the flue gases:",
    options: ["Superheater", "Economizer", "Preheater", "Turbine"],
    answer: 1,
    explanation: "Economizers are mechanical devices intended to reduce energy consumption by preheating a fluid. They recover more heat from flue gases that a normal air preheater cannot."
  },
  {
    id: 87, section: "II. Thermal Power Plant",
    q: "Which of the following is NOT a part of steam power plant?",
    options: ["Switch Yard", "Ash precipitators", "Draught fan", "Surge Chamber"],
    answer: 3,
    explanation: "Surge chamber is a part of hydro power plant, not steam power plant. It controls water hammering in hydropower plants."
  },
  {
    id: 88, section: "II. Thermal Power Plant",
    q: "The first thermal power plant of India is:",
    options: ["Jharsuguda Thermal power plant", "Mundhra Ultra Mega power plant", "Vindhyachal Thermal power station", "Hussain sagar Thermal power station"],
    answer: 3,
    explanation: "Hussainsagar thermal power station is the first thermal power plant in India, located on the bank of Hussainsagar in Hyderabad, Telangana. It opened in 1920 with nameplate capacity of 22.5 MW."
  },
  {
    id: 89, section: "II. Thermal Power Plant",
    q: "Air forced into the tower in mechanical draft cooling towers by using:",
    options: ["Deckings", "Spray nozzles", "Propellers", "Louvers"],
    answer: 2,
    explanation: "Air is forced into the tower in mechanical draft cooling towers by using propellers."
  },
  {
    id: 90, section: "II. Thermal Power Plant",
    q: "The function of electrostatic precipitator in a coal based thermal power plant is to:",
    options: ["Collect dust from flue gas", "Collect dust at the air inlet", "Collect dust from the coal", "Clean the turbine blades"],
    answer: 0,
    explanation: "The electrostatic precipitator collects dust from flue gas. Dust-filled flue gas passes through conductors kept at 30,000 to 60,000 Volts."
  },
  {
    id: 91, section: "II. Thermal Power Plant",
    q: "_________ is present between air-preheater and induced fan in a thermal power plant.",
    options: ["Economizer", "Boiler furnace", "Electrostatic precipitator", "Super heater"],
    answer: 2,
    explanation: "Electrostatic precipitator (ESP) is present between air-preheater and induced fan. It removes dust, fine particles and smoke from flowing gas using electrostatic charge."
  },
  {
    id: 92, section: "II. Thermal Power Plant",
    q: "The efficiency of modern steam turbines is about:",
    options: ["50%", "85%", "75%", "90%"],
    answer: 1,
    explanation: "The efficiency of modern steam turbines is about 85%. The overall efficiency of modern steam power plant is less than 40%."
  },
  {
    id: 93, section: "II. Thermal Power Plant",
    q: "The overall efficiency of thermal station is:",
    options: ["40%", "Less than 40%", "More than 40%", "50%"],
    answer: 1,
    explanation: "The overall efficiency of modern thermal power plant is less than 40%."
  },
  {
    id: 94, section: "II. Thermal Power Plant",
    q: "The main function of economizer of a boiler in a plant is to:",
    options: ["Increase steam production", "Reduce fuel consumption", "Increase stem pressure", "Increase life of the boiler"],
    answer: 1,
    explanation: "The economizer takes heat from flue gas and heats up feed water. By this arrangement, overall efficiency of thermal power plant is increased, effectively reducing fuel consumption."
  },
  {
    id: 95, section: "II. Thermal Power Plant",
    q: "Super heater is used in thermal power plant:",
    options: ["To heat the feed water", "To reduce moisture contents of steam", "To condensate the steam", "To reduce the running cost"],
    answer: 1,
    explanation: "A superheater removes the last traces of moisture above the saturation temperature from steam."
  },
  {
    id: 96, section: "II. Thermal Power Plant",
    q: "Which of the following statements regarding steam boilers are correct? 1. Quick starting and loading. 2. No joints exposed to flames. 3. Burning low ash content coal efficiently.",
    options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    answer: 3,
    explanation: "All three are qualities required for steam boilers: quick starting and loading, efficient burning of coal, and proper design so no joints are exposed to flames."
  },
  {
    id: 97, section: "II. Thermal Power Plant",
    q: "Which of the following coals has the highest calorific value?",
    options: ["Lignite", "Bituminous", "Peat", "Anthracite"],
    answer: 3,
    explanation: "Anthracite has the highest calorific value at 7600–7800 kcal/kg. Bituminous: 4200–7000, Lignite: 4200, Peat: 3500 kcal/kg."
  },
  {
    id: 98, section: "II. Thermal Power Plant",
    q: "The quality of coal generally received by cement plants in the country has an ash content in the range of:",
    options: ["100 percent", "30–40 percent", "80–90 percent", "90 percent"],
    answer: 1,
    explanation: "The quality of coal generally received by cement plants has an ash content in the range of 30–40%."
  },
  {
    id: 99, section: "II. Thermal Power Plant",
    q: "Heating value of coal is approximately:",
    options: ["1000–2000 kcal/kg", "2000–4000 kcal/kg", "5000–6500 kcal/kg", "9000–10,500 kcal/kg"],
    answer: 2,
    explanation: "Heating value: Anthracite 7600–7800, Bituminous 4200–7000, Lignite 4200 kcal/kg. The approximate heating value of coal is 5000–6500 kcal/kg."
  },
  {
    id: 100, section: "II. Thermal Power Plant",
    q: "The equipment installed in power plants to reduce air pollution due to smoke is:",
    options: ["Induced draft fans", "De-super heaters", "Electrostatic precipitators", "Re-heaters"],
    answer: 2,
    explanation: "Electrostatic precipitators remove suspended dust particles from gas/exhaust by applying high voltage, used to reduce air pollution."
  },
  {
    id: 101, section: "II. Thermal Power Plant",
    q: "Most of the generators in thermal power plants run at:",
    options: ["3000 rpm", "1500 rpm", "1000 rpm", "750 rpm"],
    answer: 0,
    explanation: "Ns = 120f/P = 120×50/2 = 3000 rpm. Cylindrical-rotor construction is used for 2 or 4 pole steam-turbine generators (turbo generators)."
  },
  {
    id: 102, section: "II. Thermal Power Plant",
    q: "Synchronous generators used in thermal power plants have:",
    options: ["Cylindrical rotors", "Salient pole rotors", "Stator slots in multiple of 6", "All of these"],
    answer: 0,
    explanation: "Cylindrical-rotor construction is used for two or four pole steam-turbine generators (turbo-generators or turbo alternators). Cylindrical rotor has smaller diameter and large axial length."
  },
  {
    id: 103, section: "II. Thermal Power Plant",
    q: "A steam power station has an overall efficiency of 20% and 0.5 kg of coal is burnt per kWh of electrical energy generated. Calculate the calorific value of the fuel. (Heat equivalent of 1 kWh = 860 kcal)",
    options: ["860 kcal/kg", "2150 kcal/kg", "344 kcal/kg", "8600 kcal/kg"],
    answer: 3,
    explanation: "η = 860/(0.5x) = 0.2 → x = 860/(0.5 × 0.2) = 8600 kcal/kg."
  },
  {
    id: 104, section: "II. Thermal Power Plant",
    q: "Electrostatic precipitator is used for:",
    options: ["Particulate emission control", "Water pollution control", "Noise pollution control", "Energy pollution control"],
    answer: 0,
    explanation: "Electrostatic precipitator (ESP) is used for particulate emission control. It removes particles from gas stream by using electrical energy."
  },
  {
    id: 105, section: "II. Thermal Power Plant",
    q: "In steam power stations, the condenser creates a ________ at the exhaust of the turbine.",
    options: ["Very low temperature", "Very high temperature", "Very high pressure", "Very low pressure"],
    answer: 3,
    explanation: "The condenser creates a very low pressure at the exhaust of the turbine to create a vacuum, condensing steam and conserving condensate for reuse."
  },
  {
    id: 106, section: "II. Thermal Power Plant",
    q: "The advantage of using pulverized fuel include:",
    options: ["Higher boiler efficiency", "Easy and complete combustion", "Low air requirement", "All of the above"],
    answer: 3,
    explanation: "Advantages of pulverized fuel: higher boiler efficiency, easy and complete combustion, and low air requirement."
  },
  {
    id: 107, section: "II. Thermal Power Plant",
    q: "In thermal power plants, the pressure of working fluid cycle is developed by:",
    options: ["Condenser", "Superheater", "Feed water pump", "Turbine"],
    answer: 2,
    explanation: "In thermal power plants, the working fluid cycle pressure is developed by the feed water pump, which sends condensed water from the condenser to feed water heaters."
  },
  {
    id: 108, section: "II. Thermal Power Plant",
    q: "The pH value of water used for boiler of thermal power plant is:",
    options: ["Unity", "7", "Slightly more than 7", "10"],
    answer: 2,
    explanation: "The pH value of water used for boilers of thermal power plants is slightly higher than 7 (slightly alkaline)."
  },
  {
    id: 109, section: "II. Thermal Power Plant",
    q: "The location of steam generating station is determined by:",
    options: ["Centre of gravity of loads", "Availability of water", "Facilities for delivery of coal and removal of ashes", "All the above"],
    answer: 3,
    explanation: "Location is determined by centre of gravity of loads, availability of water, and facilities for delivery of coal and removal of ashes."
  },
  {
    id: 110, section: "II. Thermal Power Plant",
    q: "Which of the following feed water treatments is basically one type of thermal treatment?",
    options: ["Filtration", "Deaeration", "Sedimentation", "Coagulation"],
    answer: 1,
    explanation: "Deaeration is the feed water treatment that is basically a type of thermal treatment."
  },
  {
    id: 111, section: "II. Thermal Power Plant",
    q: "In a steam power plant, which of the following is NOT an artificial draught?",
    options: ["Forced draught", "Chimney draught", "Induced draught", "Balanced draught"],
    answer: 1,
    explanation: "Chimney draught is not an artificial draught. It produces natural draught. Forced, induced, and balanced draughts are artificial draughts."
  },
  {
    id: 112, section: "II. Thermal Power Plant",
    q: "A steam power station has an overall efficiency of 25% and 0.5 kg of coal is burnt per kWh of electrical energy generated. Determine the calorific value of fuel. (Heat equivalent of 1 kWh = 860 kcal)",
    options: ["4650 kcal/kg", "3400 kcal/kg", "1720 kcal/kg", "6880 kcal/kg"],
    answer: 3,
    explanation: "Calorific value = 860/(0.25 × 0.5) = 860/0.125 = 6880 kcal/kg."
  },
  {
    id: 113, section: "II. Thermal Power Plant",
    q: "Consider statements about thermal power stations: (i) They pollute atmosphere with smoke. (ii) They are costlier in running cost than hydroelectric plants. (iii) They require larger space than hydroelectric power stations. State true/false.",
    options: ["(i)True, (ii)True, (iii)False", "(i)True, (ii)True, (iii)True", "(i)True, (ii)False, (iii)True", "(i)False, (ii)True, (iii)False"],
    answer: 0,
    explanation: "Thermal plants: (i) TRUE – pollute atmosphere with smoke and fumes; (ii) TRUE – higher running cost than hydro; (iii) FALSE – they actually occupy less space than hydroelectric plants (which need reservoirs)."
  },
  {
    id: 114, section: "II. Thermal Power Plant",
    q: "Find the thermal efficiency of the station given: Maximum demand = 25 MW, Load factor = 0.4, Coal consumption = 0.88 kg/kWh, Boiler efficiency = 85%, Turbine efficiency = 90%.",
    options: ["76.5%", "62.32%", "65.2%", "99.8%"],
    answer: 0,
    explanation: "Thermal efficiency = Boiler efficiency × Turbine efficiency = 0.85 × 0.90 = 0.765 = 76.5%."
  },
  {
    id: 115, section: "II. Thermal Power Plant",
    q: "Which of the following units requires a boiler, a superheater, an economiser and an air preheater?",
    options: ["Coal and ash handling unit", "Cooling unit", "Turbine and alternator unit", "Steam generating unit"],
    answer: 3,
    explanation: "Steam generating unit consists of boiler, superheater, economiser, and air preheater. Economiser improves boiler efficiency by 10–12%."
  },
  {
    id: 116, section: "II. Thermal Power Plant",
    q: "In a steam power plant, blow down is basically nothing but wastage of ______ from the boiler.",
    options: ["Unburnt coal", "Flue gases", "Water", "Ash"],
    answer: 2,
    explanation: "In steam power plant, blow down is wastage of water from the boiler to avoid concentration of impurities during evaporation."
  },
  {
    id: 117, section: "II. Thermal Power Plant",
    q: "In a steam power plant, the value of the reheat factor is of the order of:",
    options: ["1.6 to 2.0", "0.5 to 1.0", "1.1 to 1.5", "2.1 to 3.0"],
    answer: 2,
    explanation: "Reheat factor = Cumulative heat drop (isentropic) / Isentropic heat drop (overall). Its value is in the range of 1.1 to 1.5."
  },
  {
    id: 118, section: "II. Thermal Power Plant",
    q: "In a steam power plant, the function of _____ is to utilise the waste heat of the flue gases for heating the feed water.",
    options: ["A superheater", "A condenser", "A boiler", "An economiser"],
    answer: 3,
    explanation: "An economiser recovers heat from flue gases and uses this heat to raise the temperature of feed water and air supplied for combustion."
  },
  {
    id: 119, section: "II. Thermal Power Plant",
    q: "In a thermal power plant a condenser is installed to condense exhaust steam coming out of:",
    options: ["Turbine", "Economiser", "Super-heater", "Boiler"],
    answer: 0,
    explanation: "In a thermal power plant, the condenser is installed to condense exhaust steam coming out of the turbine. A condenser is a water-cooled shell."
  },
  {
    id: 120, section: "II. Thermal Power Plant",
    q: "Which type of generating system converts heat energy of coal into electrical energy?",
    options: ["Diesel power station", "Nuclear power station", "Hydroelectric power station", "Steam power station"],
    answer: 3,
    explanation: "Steam power plant (thermal power plant) works on the Rankine cycle where heat energy from coal is converted into electrical energy."
  },
  {
    id: 121, section: "II. Thermal Power Plant",
    q: "Which one is the schematic arrangement of steam power station?",
    options: ["Coal and ash handling → Steam generating plant → Steam turbine → Alternator → Feed water → Cooling arrangement", "All of these", "Steam generating plant → Steam turbine → Feed water → Alternator → Cooling arrangement", "Cooling arrangement → Feed water → Alternator → Steam generating plant → Coal and ash handling"],
    answer: 0,
    explanation: "Correct arrangement: Coal → Ash handling → Steam generating → Steam turbine → Alternator → Feed water → Cooling arrangement."
  },
  {
    id: 122, section: "II. Thermal Power Plant",
    q: "Which one of the following is NOT a part of steam power station?",
    options: ["Prime mover", "None of these", "Condenser", "Water treatment plant"],
    answer: 1,
    explanation: "All main parts of steam power plant are prime mover, condenser, and water treatment plant. So 'None of these' implies all are parts."
  },
  {
    id: 123, section: "II. Thermal Power Plant",
    q: "The name 'Economizer' is related with one of the following Power Plants:",
    options: ["Solar Power", "Hydro power", "Diesel power", "Thermal power"],
    answer: 3,
    explanation: "The Economizer is related to thermal power plant. It heats feed water through flue gases and improves boiler efficiency."
  },
  {
    id: 124, section: "II. Thermal Power Plant",
    q: "In power systems the governors are generally used as an essential part of all types of turbines to control the:",
    options: ["Voltage phase angle", "Reactive power output", "Frequency", "Voltage magnitude"],
    answer: 2,
    explanation: "Governors in power systems control frequency/speed of machines. A governor controls the speed of the machine when the turbo-generator is not connected with bus-bar."
  },
  {
    id: 125, section: "II. Thermal Power Plant",
    q: "Economizer is used in thermal power stations in order to:",
    options: ["Reduce the initial cost of the plant", "Reduce the pollution", "Improve the efficiency of the plant", "Improve the power factor of plant"],
    answer: 2,
    explanation: "Economizer captures feed water and transfers it to boiler feed water, raising temperature and lowering energy input needed. It improves the overall efficiency of the plant."
  },
  {
    id: 126, section: "II. Thermal Power Plant",
    q: "Compounding of steam turbine is done for:",
    options: ["Reducing the work done", "Increasing the rotor speed", "Reducing the rotor speed", "Balancing the turbine"],
    answer: 2,
    explanation: "Compounding of steam turbine is done to reduce the rotor speed. Multiple rotors in series absorb steam pressure or velocity in stages."
  },
  {
    id: 127, section: "II. Thermal Power Plant",
    q: "The overall efficiency of thermal power plant is equal to:",
    options: ["Rankine cycle efficiency", "Carnot cycle efficiency", "Regenerative cycle efficiency", "Boiler efficiency × turbine efficiency × generator efficiency"],
    answer: 3,
    explanation: "The total efficiency of thermal power plant = Boiler efficiency × Turbine efficiency × Generator efficiency. The Rankine cycle efficiency is 30–45%."
  },
  {
    id: 128, section: "II. Thermal Power Plant",
    q: "The effect of considering friction in steam nozzles for the same pressure ratio leads to:",
    options: ["Increase in dryness fraction of exit steam", "Decrease in dryness fraction of exit steam", "No change in the quality of exit steam", "Decrease or increase depending on inlet quality"],
    answer: 0,
    explanation: "The effect of friction in steam nozzles for the same pressure ratio leads to increase in dryness fraction of exit steam."
  },
  {
    id: 129, section: "II. Thermal Power Plant",
    q: "In steam turbines the reheat factor:",
    options: ["Increases with the increase in number of stages", "Decreases with the increase in number of stages", "Remains same irrespective of number of stages", "None of the above"],
    answer: 0,
    explanation: "In steam turbines the reheat factor increases with the increase in number of stages."
  },
  {
    id: 130, section: "II. Thermal Power Plant",
    q: "Which of the following fuels has the lowest calorific value?",
    options: ["Anthracite coal", "Lignite", "Petrol", "Diesel oil"],
    answer: 1,
    explanation: "Lignite has the lowest calorific value at 4000–4200 kcal/kg. Anthracite: 7600–7800, Petrol: 11,110, Diesel: 10800 kcal/kg."
  },
  {
    id: 131, section: "II. Thermal Power Plant",
    q: "The pressure at the furnace is minimum in case of:",
    options: ["Force draught system", "Induced draught system", "Balanced draught system", "Natural draught system"],
    answer: 2,
    explanation: "The pressure at the furnace is minimum in case of balanced draught system."
  },
  {
    id: 132, section: "II. Thermal Power Plant",
    q: "The commonly used material of condenser tube is:",
    options: ["Aluminium", "Cast iron", "Admiralty brass", "Mild steel"],
    answer: 2,
    explanation: "The commonly used material of condenser tube is admiralty brass."
  },
  {
    id: 133, section: "II. Thermal Power Plant",
    q: "The formation of small and stable bubbles throughout the boiler water is called:",
    options: ["Priming", "Carryover", "Foaming", "Bagging"],
    answer: 2,
    explanation: "The formation of small and stable bubbles throughout the boiler water is called foaming."
  },
  {
    id: 134, section: "II. Thermal Power Plant",
    q: "In a grid system, the thermal plant operates:",
    options: ["As a base load plant", "As peak load plant", "Both as a base load plant and also as a peak load plant", "None of these"],
    answer: 0,
    explanation: "In a grid system, the thermal plant operates as a base load plant. Base load plants do not change their power output quickly."
  },
  {
    id: 135, section: "II. Thermal Power Plant",
    q: "Which type of coal is best suited for thermal power plant?",
    options: ["Peat", "Lignite", "Bituminous", "Anthracite"],
    answer: 3,
    explanation: "Anthracite coal is best suited for thermal power plant due to its highest carbon content (86–92%) and highest calorific value."
  },
  {
    id: 136, section: "II. Thermal Power Plant",
    q: "What is the relation between thermal efficiency, electrical efficiency and overall efficiency for a steam power station?",
    options: ["Overall efficiency = thermal efficiency × electrical efficiency", "Overall efficiency = electrical efficiency / thermal efficiency", "Overall efficiency = thermal efficiency / electrical efficiency", "Overall efficiency = (thermal efficiency + electrical efficiency) / 2"],
    answer: 0,
    explanation: "Overall efficiency for a steam power station = Thermal efficiency × Electrical efficiency."
  },
  {
    id: 137, section: "II. Thermal Power Plant",
    q: "In a thermal power plant, which of the following is NOT a mechanical draught?",
    options: ["Forced draught", "Induced draught", "Chimney draught", "Balanced draught"],
    answer: 2,
    explanation: "Chimney draught is NOT a mechanical draught. It is natural draught. Forced, induced, and balanced are mechanical draughts."
  },
  {
    id: 138, section: "II. Thermal Power Plant",
    q: "The loss in draught in a chimney is _______________ of the total draught produced by it.",
    options: ["20 percent", "40 percent", "10 percent", "5 percent"],
    answer: 0,
    explanation: "Normally the loss in draught in chimney is approximately 20% of the total draught produced by it."
  },
  {
    id: 139, section: "II. Thermal Power Plant",
    q: "Which of the following is the correct sequence of steps in a coal handling system?",
    options: ["Coal delivery, Preparation, Furnace firing, Inplant handling", "Inplant handling, Furnace firing, Coal delivery, Preparation", "Coal delivery, Preparation, Inplant handling, Furnace firing", "Preparation, Inplant handling, Furnace firing, Coal delivery"],
    answer: 2,
    explanation: "Correct sequence: Coal delivery → Preparation → Inplant handling → Furnace firing."
  },
  {
    id: 140, section: "II. Thermal Power Plant",
    q: "Which of the following systems is associated with ash handling in thermal power plants?",
    options: ["Superheater", "Electrostatic precipitator", "Economiser", "Condenser"],
    answer: 1,
    explanation: "Electrostatic precipitator (ESP) removes fine particles like dust and smoke from flue gases and is associated with ash handling in thermal power plants."
  },
  {
    id: 141, section: "II. Thermal Power Plant",
    q: "Which part of the steam power plant converts mechanical energy into electrical energy?",
    options: ["Turbine", "Generator", "Furnace", "Boiler"],
    answer: 1,
    explanation: "The generator converts mechanical energy into electrical energy in a steam power plant."
  },
];

const TOTAL = questions.length;

export default function PowerPlantQuizPart1() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const q = questions[current];

  function handleSelect(idx) {
    if (revealed) return;
    setSelected(idx);
  }

  function handleCheck() {
    if (selected === null) return;
    setRevealed(true);
    const correct = selected === q.answer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { qid: q.id, selected, correct }]);
  }

  function handleNext() {
    if (current + 1 >= TOTAL) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setShowReview(false);
    setReviewIndex(0);
  }

  const pct = Math.round((score / TOTAL) * 100);
  const progress = ((current) / TOTAL) * 100;

  const optionLabels = ["A", "B", "C", "D"];
  const sectionColor = {
    "I. Power Plant Cycle": "#e2773a",
    "II. Thermal Power Plant": "#3a8ce2"
  };
  const sec = q ? (sectionColor[q.section] || "#888") : "#888";

  if (finished && showReview) {
    const rq = questions[reviewIndex];
    const ra = answers[reviewIndex];
    return (
      <div style={{minHeight:"100vh",background:"#0f1117",color:"#e8e8e8",fontFamily:"'Georgia',serif",padding:"24px 16px"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <h2 style={{color:"#f0c060",fontSize:20,margin:0}}>Review – Q{reviewIndex+1}/{TOTAL}</h2>
            <button onClick={()=>setShowReview(false)} style={{background:"#222",color:"#ccc",border:"1px solid #444",borderRadius:8,padding:"6px 14px",cursor:"pointer"}}>← Back</button>
          </div>
          <div style={{background:"#191c24",borderRadius:12,padding:20,marginBottom:16}}>
            <div style={{fontSize:11,color:sectionColor[rq.section]||"#aaa",marginBottom:8,fontFamily:"monospace",letterSpacing:1}}>{rq.section}</div>
            <p style={{fontSize:15,lineHeight:1.6,marginBottom:16}}><b>Q{rq.id}.</b> {rq.q}</p>
            {rq.options.map((opt,i)=>{
              let bg="#23262f", border="1px solid #333", color="#ddd";
              if(i===rq.answer){bg="#1a3a1a";border="1px solid #4caf50";color="#a5d6a7";}
              if(ra.selected===i && i!==rq.answer){bg="#3a1a1a";border="1px solid #ef5350";color="#ef9a9a";}
              return (
                <div key={i} style={{background:bg,border,borderRadius:8,padding:"10px 14px",marginBottom:8,color}}>
                  <b>{optionLabels[i]}.</b> {opt}
                  {i===rq.answer && <span style={{float:"right",color:"#4caf50"}}>✓</span>}
                  {ra.selected===i && i!==rq.answer && <span style={{float:"right",color:"#ef5350"}}>✗</span>}
                </div>
              );
            })}
            <div style={{marginTop:14,background:"#1a2030",borderRadius:8,padding:12,fontSize:13,color:"#b0bec5",lineHeight:1.6}}>
              <b style={{color:"#f0c060"}}>Explanation:</b> {rq.explanation}
            </div>
          </div>
          <div style={{display:"flex",gap:12,justifyContent:"center"}}>
            <button onClick={()=>setReviewIndex(i=>Math.max(0,i-1))} disabled={reviewIndex===0} style={{background:"#333",color:"#ccc",border:"none",borderRadius:8,padding:"8px 20px",cursor:reviewIndex===0?"not-allowed":"pointer",opacity:reviewIndex===0?0.4:1}}>← Prev</button>
            <button onClick={()=>setReviewIndex(i=>Math.min(TOTAL-1,i+1))} disabled={reviewIndex===TOTAL-1} style={{background:"#333",color:"#ccc",border:"none",borderRadius:8,padding:"8px 20px",cursor:reviewIndex===TOTAL-1?"not-allowed":"pointer",opacity:reviewIndex===TOTAL-1?0.4:1}}>Next →</button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div style={{minHeight:"100vh",background:"#0f1117",color:"#e8e8e8",fontFamily:"'Georgia',serif",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
        <div style={{maxWidth:540,width:"100%",textAlign:"center"}}>
          <div style={{fontSize:64,marginBottom:8}}>⚡</div>
          <h1 style={{color:"#f0c060",fontSize:28,marginBottom:4}}>Part 1 Complete!</h1>
          <p style={{color:"#aaa",marginBottom:24,fontSize:14}}>Power Plant Cycle & Thermal Power Plant</p>
          <div style={{background:"#191c24",borderRadius:16,padding:32,marginBottom:24}}>
            <div style={{fontSize:56,fontWeight:"bold",color: pct>=70?"#4caf50":pct>=40?"#f0c060":"#ef5350"}}>{pct}%</div>
            <div style={{color:"#aaa",fontSize:16,marginTop:8}}>{score} / {TOTAL} correct</div>
            <div style={{marginTop:20,display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div style={{background:"#1a3a1a",borderRadius:10,padding:14}}>
                <div style={{color:"#4caf50",fontSize:24,fontWeight:"bold"}}>{score}</div>
                <div style={{color:"#a5d6a7",fontSize:12}}>Correct</div>
              </div>
              <div style={{background:"#3a1a1a",borderRadius:10,padding:14}}>
                <div style={{color:"#ef5350",fontSize:24,fontWeight:"bold"}}>{TOTAL-score}</div>
                <div style={{color:"#ef9a9a",fontSize:12}}>Incorrect</div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={restart} style={{background:"#e2773a",color:"#fff",border:"none",borderRadius:10,padding:"12px 28px",fontSize:15,cursor:"pointer",fontWeight:"bold"}}>Restart Quiz</button>
            <button onClick={()=>{setShowReview(true);setReviewIndex(0);}} style={{background:"#23262f",color:"#f0c060",border:"1px solid #444",borderRadius:10,padding:"12px 28px",fontSize:15,cursor:"pointer"}}>Review Answers</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:"#0f1117",color:"#e8e8e8",fontFamily:"'Georgia',serif",padding:"16px"}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        {/* Header */}
        <div style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <span style={{color:"#f0c060",fontSize:13,fontFamily:"monospace"}}>⚡ POWER PLANT QUIZ – PART 1</span>
            <span style={{color:"#888",fontSize:13}}>Q{current+1} / {TOTAL}</span>
          </div>
          <div style={{height:4,background:"#23262f",borderRadius:4,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#e2773a,#f0c060)",transition:"width 0.3s"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
            <span style={{fontSize:12,color:"#888"}}>Score: {score}/{current}</span>
            <span style={{fontSize:11,color:sec,fontFamily:"monospace",letterSpacing:0.5}}>{q.section}</span>
          </div>
        </div>

        {/* Question Card */}
        <div style={{background:"#191c24",borderRadius:14,padding:"20px 20px 16px",marginBottom:14,boxShadow:"0 4px 24px rgba(0,0,0,0.4)"}}>
          <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{background:sec,color:"#fff",borderRadius:8,padding:"2px 10px",fontSize:12,fontFamily:"monospace",whiteSpace:"nowrap",marginTop:2}}>Q{q.id}</span>
            <p style={{margin:0,fontSize:15,lineHeight:1.7,color:"#e0e0e0"}}>{q.q}</p>
          </div>
        </div>

        {/* Options */}
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
          {q.options.map((opt, i) => {
            let bg = "#191c24", border = "1px solid #2a2d38", color = "#d0d0d0", transform = "scale(1)";
            if (revealed) {
              if (i === q.answer) { bg="#1a3a1a"; border="1px solid #4caf50"; color="#a5d6a7"; }
              else if (i === selected) { bg="#3a1a1a"; border="1px solid #ef5350"; color="#ef9a9a"; }
            } else if (selected === i) {
              bg="#222840"; border=`1px solid ${sec}`; color="#fff";
            }
            return (
              <button key={i} onClick={()=>handleSelect(i)} style={{background:bg,border,borderRadius:10,padding:"12px 16px",textAlign:"left",cursor:revealed?"default":"pointer",display:"flex",gap:12,alignItems:"flex-start",transition:"all 0.15s",color}}>
                <span style={{minWidth:24,height:24,borderRadius:6,background: revealed?(i===q.answer?"#4caf50":i===selected?"#ef5350":"#2a2d38"):(selected===i?sec:"#2a2d38"),color:"#fff",fontSize:12,fontWeight:"bold",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace"}}>{optionLabels[i]}</span>
                <span style={{fontSize:14,lineHeight:1.5}}>{opt}</span>
                {revealed && i===q.answer && <span style={{marginLeft:"auto",color:"#4caf50",fontSize:16}}>✓</span>}
                {revealed && i===selected && i!==q.answer && <span style={{marginLeft:"auto",color:"#ef5350",fontSize:16}}>✗</span>}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div style={{background:"#1a2030",border:"1px solid #2a3a50",borderRadius:10,padding:"12px 16px",marginBottom:14,fontSize:13,color:"#b0bec5",lineHeight:1.7}}>
            <span style={{color:"#f0c060",fontWeight:"bold"}}>Explanation: </span>{q.explanation}
          </div>
        )}

        {/* Buttons */}
        <div style={{display:"flex",gap:12}}>
          {!revealed ? (
            <button onClick={handleCheck} disabled={selected===null} style={{flex:1,background:selected!==null?"#e2773a":"#2a2d38",color:selected!==null?"#fff":"#666",border:"none",borderRadius:10,padding:"13px",fontSize:15,fontWeight:"bold",cursor:selected!==null?"pointer":"not-allowed",transition:"background 0.2s"}}>
              Check Answer
            </button>
          ) : (
            <button onClick={handleNext} style={{flex:1,background:"#3a8ce2",color:"#fff",border:"none",borderRadius:10,padding:"13px",fontSize:15,fontWeight:"bold",cursor:"pointer"}}>
              {current+1>=TOTAL ? "See Results →" : "Next Question →"}
            </button>
          )}
        </div>

        <p style={{textAlign:"center",color:"#444",fontSize:11,marginTop:14}}>Part 1 of 5 · {TOTAL} questions · Sections I & II</p>
      </div>
    </div>
  );
}
