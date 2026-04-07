import { useState, useEffect } from "react";

const notesData = [
  {
    date: "01 Jan 2026",
    color: "#e74c3c",
    topics: [
      {
        title: "International Days – Jan 1",
        points: [
          "International Year of the Woman Farmer (IYWF 2026)",
          "International Year of Rangelands and Pastoralists (IYRP 2026)",
          "International Year of Volunteers for Sustainable Development (IVD 2026)",
          "Global Family Day – Jan 01",
          "Sarvaseva Veshti Varam – Jan 1 to 7",
          "World Day of Peace – Jan 01",
        ],
      },
      {
        title: "Union Cabinet Approvals",
        points: [
          "Maharashtra: Nashik-Solapur's Akkal Kot – 6-lane green highway – ₹19,142 crore",
          "South India connectivity – Chennai-Surat high-speed corridor – 374 km stretch",
          "Chennai Port – Hazira Port, Surat",
          "Vodafone – Jio: ₹87,695 crore FDI freeze lifted",
        ],
      },
      {
        title: "Test Run (Sodhana Otam)",
        points: [
          "Vande Bharat sleeper train – final high-speed test run successful",
          "Kotta-Naka railway safety commissioner's first trial – 180 km/h speed",
        ],
      },
      {
        title: "Test Success – Pralay Missile",
        points: [
          "Indigenously made Pralay surface-to-surface missile test success – Odisha",
          "Shortest time gap – tested consecutively",
          "Surface-to-surface short-range ballistic missile – advanced navigation",
          "DRDO – 1000 km range – 500 km strike range – advanced guidance system",
        ],
      },
      {
        title: "Awards",
        points: [
          "Israel's highest civilian honor – Israel Peace Award – first time in 80 years to non-Israeli",
          "US President Donald Trump – recognized for his contribution to Israeli and Jewish people",
        ],
      },
      {
        title: "Chess 2025",
        points: [
          "World Blitz Chess Championship 2025 – Qatar",
          "Open category – Magnus Carlsen (Norway champion) – 9th consecutive / Rapid title",
          "Nodirbek Abdusattorov (Uzbekistan) – 2nd / Arjun Erigaisi – 3rd (Rapid)",
          "Women's category – Bibisara Assaubayeva (Kazakhstan) – Champion",
        ],
      },
    ],
  },
  {
    date: "02 Jan 2026",
    color: "#2980b9",
    topics: [
      {
        title: "Special Days",
        points: [
          "DRDO Day – Jan 01 (1958) | HQ: Delhi | Chairman: SV Kamat",
          "World Introvert Day – Jan 02 | Theme: Quietly Changing Tomorrow",
        ],
      },
      {
        title: "Assam",
        points: [
          "8th Pay Commission formed to revise salary structure of central government employees",
          "Committee head: Former CM Subhash Das / Ranjana Prakash Desai",
        ],
      },
      {
        title: "Vande Bharat",
        points: [
          "Vande Bharat sleeper train service launched for first time in country",
          "West Bengal, Kolkata – Assam, Guwahati – 16 coaches – 823 passengers – 120-130 km/h speed",
        ],
      },
      {
        title: "Appointments",
        points: [
          "Air Marshal Nagesh Kapoor / Namtheshwar Tiwari Ola – Air Force appointment",
          "Soran Manthani – New York's 112th Mayor",
          "Old City Hall Café – Queen's legislator / first South Asian Muslim woman",
        ],
      },
      {
        title: "Tiger Deaths",
        points: [
          "Total 166 tigers died in India last year (31 cubs) – highest among tigers",
          "Madhya Pradesh (55), Maharashtra (38), Kerala (13)",
          "2022 total count: 3682 tigers",
        ],
      },
      {
        title: "Exchange",
        points: [
          "India exchanged list of nuclear production facilities with Pakistan – 35th year – 1988 Dec 31 agreement – effective from 1992 Jan 01",
          "Prisoners list exchange – from 2008 – 58 Indian common prisoners, 199 fishermen",
        ],
      },
      {
        title: "Publication",
        points: [
          "Pandit Madan Mohan Malaviya's collected works and speeches final 12-volume collection released",
          "Mahamana Vangmay – Union deputy leader",
        ],
      },
    ],
  },
  {
    date: "03 Jan 2026",
    color: "#8e44ad",
    topics: [
      {
        title: "Special Days",
        points: [
          "International Mind-Body Wellness Day – Jan 03",
          "Savitribai Phule Jayanti & Velunachiyar Birthday (1730) & Veera Pandiya Kattabomman Birthday – Jan 03",
        ],
      },
      {
        title: "Awards",
        points: [
          "Ramnath Goenka Sahitya Samman – The New Indian Express, Chennai – Deputy CM Udhayanidhi Stalin",
          "Lifelong achievement – Chandrashekar Kambara",
          "Welfare category – Subi Thapa, Arunachal Pradesh",
          "Associate category – Sufi Chakravarti",
          "First woman writer – Neha Dixit",
        ],
      },
      {
        title: "Union Cabinet Approvals",
        points: [
          "₹41,863 crore for electricity goods production – central government approved 22 projects",
          "33,791 new jobs – ₹2,58,152 crore worth goods production",
          "2025 Nov: ₹7172 crore / Oct: ₹5532 crore",
          "Export incentive scheme: ₹7295 crore in two projects",
          "₹5181 crore – interest subsidy / ₹2114 crore – loan guarantee scheme",
          "MSME – 2.75% discount – ₹50 lakh per year",
        ],
      },
      {
        title: "Guinness Record",
        points: [
          "2026 Sarvathesha Malar Exhibition – Sabarmati riverbank, Ahmedabad, Gujarat",
          "Most magnificent Malar Kolam & Sardar Vallabhbhai Patel's biggest flower depiction",
        ],
      },
      {
        title: "Chennai IIT",
        points: [
          "International Research Foundation formed – External Affairs Minister S. Jaishankar",
          "Higher education, knowledge property, research and improvement, new industry",
        ],
      },
      {
        title: "Appointment",
        points: [
          "Jord Moran (Netherlands) – India women's hockey team head coach",
          "2017 to 2021 served",
        ],
      },
      {
        title: "Retirement",
        points: [
          "Usman Khawaja – Australia team's oldest batter",
          "87 Tests – 6206 runs / 40 ODIs – 1554 runs / 9 T20 – 241 runs",
        ],
      },
    ],
  },
  {
    date: "04 Jan 2026",
    color: "#27ae60",
    topics: [
      {
        title: "Special Days",
        points: [
          "World Braille Day – Jan 04 | Theme: Braille from Touch to Empowerment",
          "World Hypnotism Day – Jan 04",
        ],
      },
      {
        title: "World in Your Hands",
        points: [
          "Scheme to provide tablets to 20 lakh students – Chennai – CM M.K. Stalin",
          "Students to gain digital skills for modern world needs – Dell, Samsung, HP – advanced software",
        ],
      },
      {
        title: "Thamirabarani",
        points: [
          "Scheme to clean the river bank",
          "Order to study – Rajasthan Water Conservation Expert Rajendra Singh",
        ],
      },
      {
        title: "Andaman",
        points: [
          "Srivijaypuram – 3 new criminal laws awareness exhibition / Amit Shah participation",
          "Indian Penal Code, Indian Civil Protection Code, Indian Evidence Act – 2024",
        ],
      },
      {
        title: "New Delhi",
        points: [
          "Buddha's sacred memorial symbols and ancient objects international exhibition – Rashtrapati Bhavan cultural complex",
          "Black objects: Eluiyum Thamrarayum's memorial symbols",
          "Bhibruva (Kapilavastu) 1898 discovered Buddha's memorial symbols",
        ],
      },
      {
        title: "Test Success",
        points: [
          "Taimur missile launched from aircraft – Pakistan Air Force",
          "Pakistan's first aircraft-launched missile test – 600 km range",
          "Non-nuclear heavy explosives – advanced guidance system",
        ],
      },
    ],
  },
  {
    date: "05 Jan 2026",
    color: "#e67e22",
    topics: [
      {
        title: "Special Days",
        points: ["National Bird Day – Jan 05"],
      },
      {
        title: "TAPS – Tamil Nadu Assured Pension Scheme",
        points: [
          "For those who joined service after 1.4.2004",
          "Last month salary: 50% pension / employees contribute 10%",
          "Enhanced once every 6 months",
          "Family benefit: 60% of pension for family",
          "Salary less than ₹25 lakh – no contribution",
        ],
      },
      {
        title: "Launch",
        points: [
          "G.D. Naidu's rare documents digital library launch – https://tamildigitallibrary.in/gdn",
          "Articles, biography, books, photos",
        ],
      },
      {
        title: "Telangana",
        points: [
          "Those with 2 or more children can contest local body elections – Telangana Panchayati Raj Act 2018 amended",
          "1994 – two children rule",
          "Total fertility rate: 1.7",
        ],
      },
      {
        title: "Somnath – Millennium Celebration",
        points: [
          "1000 years of unbroken faith (1026-2026)",
          "Prabhas Patan, Gujarat – Somnath Temple – first Jyotirlinga location",
          "1026 – Ghazni attack",
          "1951 May 11 – temple reopened – President Rajendra Prasad",
        ],
      },
      {
        title: "Attack",
        points: [
          "US airstrike on Venezuela – Venezuelan President Nicolas Maduro arrested",
          "Caught for drug trafficking – Operation Absolute Resolve",
          "Caribbean and Pacific Ocean region – US continued strike",
          "Interim President – Delcy Rodriguez (Deputy President)",
        ],
      },
      {
        title: "Launch",
        points: [
          "Khelo India – 2nd coastal games – Daman & Diu, Dadra & Nagar Haveli",
          "Indian Games Association national conferences",
          "1000 participants and above",
          "2025 Diu – Manipur, Maharashtra, Nagaland",
        ],
      },
    ],
  },
  {
    date: "06 Jan 2026",
    color: "#c0392b",
    topics: [
      {
        title: "Special Days",
        points: ["World War Orphans Day – Jan 06"],
      },
      {
        title: "Achievement",
        points: [
          "World's first Ramjet engine-based 155mm artillery shells – Indian Army",
          "Chennai IIT & Ranovu Industry collaboration",
          "Through this technology, artillery shells can hit long range",
        ],
      },
      {
        title: "Agreement",
        points: [
          "Tamil Nadu signed MoU with UN Women's Committee",
          "Objective: Improving women's nutrition and timely programs",
          "UNICEF – economic assistance, development and improvement, public transparency – agreed",
          "Library improvement, new innovative public services, research, evaluation",
        ],
      },
      {
        title: "Curriculum",
        points: [
          "Tamil Nadu Education Policy 2025 / Minister Anbil Mahesh Poyyamozhi leading committee, Sultan Ahmed Ismail",
          "Phase 1 – grades 1-5 new curriculum draft released – State Education Research (https://tnschools.gov.in)",
        ],
      },
      {
        title: "Ship Dedication",
        points: [
          "Indian Coast Guard – Maritime Heritage – Pollution Control Ship – more than 60% locally made – India's largest built ship",
          "114.5m length – 4200 ton weight – 22 knots speed – Goa shipbuilding company",
        ],
      },
      {
        title: "Karnataka",
        points: [
          "Karnataka's longest-serving CM – Siddaramaiah (2013-2018 / 2023-2026)",
          "Devaraj Urs – 7 years 238 days (1972-1980)",
        ],
      },
      {
        title: "First",
        points: [
          "China surpassed India as world's largest rice producing country – Sivaraj Swaminathan",
          "25 paddy varieties 184 new varieties released – high yield, high revenue",
          "2024-25 – India – 150.18 million tons rice production / China – 145.28 million tons",
        ],
      },
      {
        title: "Death",
        points: [
          "Manoj Kothari – former world billiards champion (1990)",
          "Current head coach – 2005 tsunami / Argentina award",
        ],
      },
    ],
  },
  {
    date: "07-08 Jan 2026",
    color: "#16a085",
    topics: [
      {
        title: "Special Days",
        points: [
          "African National Congress Foundation Day – Jan 08 (1912)",
          "Earth's Rotation Day – Jan 08 (1851)",
        ],
      },
      {
        title: "New Scheme",
        points: [
          "Jan 09, Pondicherry, Thiruvannamalai – 'Tell Your Dream' program",
          "Each family to share their dreams – State Dream Portal for research",
          "50,000 volunteers – personalized identity card for each family",
          "Young people's dream fulfillment separate team / overseas Tamil diaspora",
        ],
      },
      {
        title: "Chennai Book Fair (49th)",
        points: [
          "South India Publishers and Publishers Association (PABASI)",
          "Best publisher – Kumaran (Indira Publishing)",
          "Best seller – Sivaguru Publishing",
          "Best children's writer – M. Murugesan",
          "Best Tamil writer – Karp-korai Matha Vilas Angatham",
          "Best women writer – J. Deepa",
          "Best children's non-fiction – A. Lokamadevi",
          "Poetry literature award – S.P. Sivarasan",
          "Best self-confidence book – Munivar. Sundar Aavudaiyapan",
        ],
      },
      {
        title: "Elephant Ambassador Scheme",
        points: [
          "All schools in Thenkasi district – forest department collaboration",
          "Awareness about forests to be conserved, human – animal conflict, mountain importance",
          "25 trained schools – teacher training / 20 students training",
        ],
      },
      {
        title: "Beach Games 2026",
        points: [
          "Beach volleyball – V. Srikant – Gold",
          "Beach volleyball (Women) – Tamil Nadu women's team – Silver",
        ],
      },
      {
        title: "Economic Growth",
        points: [
          "Central Statistics Department – first national income estimate report",
          "2025-26 economic growth 7.4% (previously 7.3%)",
          "2024-25 economic growth – 6.5%",
          "Country's total domestic production: ₹357.14 lakh crore / 2024-25: ₹330.68 lakh crore",
        ],
      },
      {
        title: "Death",
        points: [
          "Suresh Kalmadi – former Union minister, Congress president",
          "1944 Chennai – Indian Air Force pilot – 1971 India-Pakistan war",
          "1995-96 Railway Minister and Rail Budget",
          "1991-2011 Indian Olympic Association president",
        ],
      },
    ],
  },
  {
    date: "09 Jan 2026",
    color: "#d35400",
    topics: [
      {
        title: "Special Days",
        points: ["Pravasi Bharatiya Divas (NRI Day) – Jan 09 (1915)"],
      },
      {
        title: "America",
        points: [
          "Oil importing countries from Russia – 500% tariff imposed – US Congress announcement",
          "Russia Economic Sanctions Act 2025 – Trump signed",
          "66 international organizations removed from US – UN body 31 organizations, 35 other international organizations",
          "Working against economic growth, sovereignty, security",
        ],
      },
      {
        title: "Identity Symbol – Udai",
        points: [
          "Udai – easy identity for Aadhaar services – announced",
          "Thiruvananthapuram – Indian identity Authority head – Nilkanth Mishra",
          "Design – Arunagoel, Kerala",
          "Name – Riyaajein, Madhya Pradesh",
        ],
      },
      {
        title: "Somnath Swabhiman Parv",
        points: [
          "1000-year anniversary celebrations of Somnath Temple – Gujarat",
          "1026 Ghazni attack – 1951 reopened / 75th year celebration",
        ],
      },
      {
        title: "Chennai",
        points: [
          "Umagine TN 2026 – IT summit – CM M.K. Stalin",
          "IT and digital services",
          "₹9,820 crore investment – 4250 jobs created",
          "AI research, space technology, new business ideas",
        ],
      },
      {
        title: "Chennai Book Award",
        points: [
          "First Tamil writer artist Mu. Karunanidhi award – Pokkidam",
          "Sukumaran (poem), Aadavan Deetchanya (short story), Ra. Murugan (novel), Baradhi Puthiran (editorial), K.S. Karunapirasath (drama), Va. Gita (translation)",
        ],
      },
      {
        title: "Death",
        points: [
          "Madhav Kaskil – famous geologist",
          "Geological research and protection policy",
          "Geological science and Indian Science Education Institution, Bengaluru",
          "Western mountain geology head / People's mass protest, environment protection, growth work",
          "2024 Champions of Earth Award – UN",
        ],
      },
      {
        title: "Beach Games 2026",
        points: [
          "Volleyball – Men's and Women's category – Gold, Silver, 2 Bronze",
          "Beach silat (Regu category) – Tamil Nadu team – Gold",
        ],
      },
    ],
  },
  {
    date: "10 Jan 2026",
    color: "#2c3e50",
    topics: [
      {
        title: "Special Days",
        points: [
          "World Hindi Day – Jan 10 | Theme: Hindi from Traditional Knowledge to Artificial Intelligence",
        ],
      },
      {
        title: "Iran",
        points: [
          "Public protest against price hike",
          "Rial value decline, food shortage",
          "Internet service shutdown",
        ],
      },
      {
        title: "100 Books",
        points: [
          "100 books about forests published",
          "Forest Minister R.S. Raja Kannappan",
          "Tamil Nadu's current forest coverage – 24.47%",
          "2021 onwards 25 new forest areas in Tamil Nadu – Protected area 135 sq km",
          "10 districts: 13,494.95 hectares / Theni – 2836.33 hectares",
        ],
      },
      {
        title: "Namma Arasu WhatsApp Service",
        points: [
          "Local government, Hindu religious foundations, electricity including 16 departments' 51 services via WhatsApp – 78 45 25 2525",
          "Chat bot: Tamil, English (IVR)",
          "Free, safe and wide service access",
        ],
      },
      {
        title: "Awards",
        points: [
          "International conference on dairy and technology – New Delhi – Indian Trade Center",
          "State government award for promotion of dairy farmers' welfare – Avid Niruvhanam",
          "Dairy Titan Award – Dairy Minister Mano Thangaraj",
        ],
      },
      {
        title: "Appointment",
        points: [
          "Anand Swarup – Central Home Ministry's new Special Secretary (Internal Security)",
          "1992 UP IPS officer / Praveen Vasishta – IB",
          "Neeraj Santhira – Human Rights Commission head (Promoted) / 1994 IAS officer – Shashtra Seema Bal Special head",
        ],
      },
      {
        title: "Economic Growth",
        points: [
          "World economic forum opportunities and jobs 2026 / UN economic and social analysis department",
          "India's economic growth this fiscal – 6.6% (previously 7.4%)",
          "Fastest growing major economy globally",
          "Current fiscal world economic growth – 2.7%",
        ],
      },
      {
        title: "Delhi",
        points: [
          "3rd International Indian Languages Conference",
          "Republic Deputy President C.P. Radhakrishnan inaugurated",
        ],
      },
    ],
  },
  {
    date: "11 Jan 2026",
    color: "#7f8c8d",
    topics: [
      {
        title: "Special Days",
        points: [
          "National Human Trafficking Awareness Day – Jan 11",
          "National Road Safety Week – Jan 11-17, 2026",
          "Lal Bahadur Shastri Death Anniversary – Jan 11, 1966 & Thiruppur Kumaran (1932) Memorial Day",
        ],
      },
      {
        title: "Uttar Pradesh",
        points: [
          "As part of Kashi Tamil Sangamam – Tamil language classes started in schools, colleges",
          "To strengthen cultural and language exchange",
          "50 Hindi teachers came to Tamil Nadu to promote language exchange",
        ],
      },
      {
        title: "Launch",
        points: [
          "NSG (National Security Guard) created National Bomb Data Center (NBDC) – Union Minister Amit Shah",
          "To accurately research all types of explosives / One nation, one format guidebook",
          "National Law University, Gujarat – Delhi IIT – National Cyber Crime Prevention Hub",
        ],
      },
      {
        title: "Paris",
        points: [
          "Weimar Triangle foreign ministers conference",
          "France, Germany, Poland – 1991",
          "India External Affairs Minister S. Jaishankar – first time a non-European country rep participated",
        ],
      },
      {
        title: "Beach Games 2026",
        points: [
          "Sepaktakraw – Tamil Nadu team Gold",
          "Kabaddi – Karnataka (3+2+6-11) first",
          "Tamil Nadu – 2nd place (3+2+3–8)",
          "Manipur, Madhya Pradesh, Haryana",
        ],
      },
    ],
  },
  {
    date: "12 Jan 2026",
    color: "#1abc9c",
    topics: [
      {
        title: "Special Days",
        points: [
          "National Youth Day – Jan 12 | Theme: Ignite the Self, Impact the World",
          "Ayalagan Tamil Day – January 12",
        ],
      },
      {
        title: "Sea Turtles",
        points: [
          "Alive leatherback sea turtle – December to April – Tamil Nadu coast beaches – laying eggs",
          "Tracker devices on sea turtles – Tamil Nadu forest department, Indian Wildlife Institute and improved wildlife protection",
          "Research on micro-movement locations",
        ],
      },
      {
        title: "Joint Military Exercise",
        points: [
          "13th Inspired Combat – America & Pakistan joint military exercise",
          "Location: Pakistan",
          "EL-8 aircraft 80 tested – aircraft from runway to air targets",
        ],
      },
      {
        title: "Virat Kohli",
        points: [
          "Second player to score most runs in all formats of international cricket – 2nd place (624 innings)",
          "First: Sachin Tendulkar – 34,357 runs (644 innings)",
          "Kumar Sangakkara – 28,106 runs (666 innings)",
        ],
      },
      {
        title: "Tennis 2026",
        points: [
          "Brisbane International Tennis",
          "Men's – Daniil Medvedev champion (Russia) / Brandon Nakashima (USA)",
          "Women's – Aryna Sabalenka champion (Belarus) / Martha Kostyuk (Ukraine)",
          "United Cup – first time Poland team champion / Switzerland – 2nd",
          "Auckland Open – Women's – Elena Svitolina champion (Ukraine) / Wang Xinyu (China)",
          "Hong Kong Open – Men's – Alexander Bublik champion (Kazakhstan) / Lorenzo Musetti (Italy)",
        ],
      },
    ],
  },
  {
    date: "13 Jan 2026",
    color: "#e91e63",
    topics: [
      {
        title: "Special Days",
        points: ["Lohri Day (Punjab) – Jan 13"],
      },
      {
        title: "Tamil Nadu Government Awards",
        points: [
          "2026 Thiruvalluvar Award – Mu.Pe. Sathiyavel Muruganaar",
          "2025 Periyar Award – A. Arulmozhi",
          "Ambedkar Award – Sindhanaich Selvan",
          "Annai Award – Dhurai Murugan",
          "Kamarajar Award – S.M. Iyayathulla",
          "Bharathiyar Award – Nellai Jayanth",
          "Bharathidasan Award – Yukabharathi",
          "ThiruVi.Ka Award – Ve. Iraiyambu",
          "K.A.P. Viswanadham Award – S. Chellaapa",
          "Kalaignar Award – Viduthalai Virumbi",
        ],
      },
      {
        title: "America",
        points: [
          "More than 25% tariff on countries trading with Iran – Trump announcement",
          "2000 people died in Iran protests",
        ],
      },
      {
        title: "Tamil Nadu",
        points: [
          "Order to recruit 50 transgender people in police department – CM Stalin",
          "Equal opportunities and equal jobs for transgender people",
        ],
      },
      {
        title: "Bus Service",
        points: [
          "Chennai – Double decker electric bus service – Tamil Americans & Ashok Leyland company – ₹1.89 crore investment",
          "Panoramic view with cultural tour",
          "To improve traditional cultural environment",
        ],
      },
      {
        title: "Conference",
        points: [
          "Ayalagan Tamil Day conference – Chennai – MK Stalin – 4 MoUs signed",
          "Tamil Mamani Award – Dr. Annamalai, Australia",
          "Kaniyan Pungundranar Award – Dr. Mohamed Hanifa Bin Abdullah, Malaysia",
          "Best Ambassador Award – Deeparani alias Sanku Dushar, Myanmar",
        ],
      },
    ],
  },
  {
    date: "14 Jan 2026",
    color: "#ff9800",
    topics: [
      {
        title: "Special Days",
        points: [
          "World Logic Day – Jan 14",
          "Mahar Sakaranthi – Jan 14 (Pongal)",
        ],
      },
      {
        title: "Agreement",
        points: [
          "Tamil Nadu's separate AI research center – ₹10,000 crore – agreement signed in Chennai",
          "SARM Edge company, Chennai IIT & Tamil Nadu Government",
          "Tamil Nadu's data stays in Tamil Nadu – first time in India",
        ],
      },
      {
        title: "Failure",
        points: [
          "PSLV-C62 Rocket – Jan 12 – Sriharikota – third stage technical failure",
          "ILS-N.01 (Analog) – DRDO – Solar observation satellite – failed",
          "Ayul Sat – Airpilot company / kit – Spain including 15 satellite missions",
          "PSLV-C61 / ILS 09 satellite 1 meter ground observation mission",
        ],
      },
      {
        title: "Meeting",
        points: [
          "PM Narendra Modi & Germany PM Olaf Scholz",
          "Defense, trade, technology including various fields – 19 key agreements signed",
          "National Maritime Authority, Gujarat – Germany Maritime Exhibition",
          "Ahmedabad – Germany consul opening",
          "International Wind Energy Festival – Sabarmati riverside",
        ],
      },
    ],
  },
  {
    date: "15 Jan 2026",
    color: "#795548",
    topics: [
      {
        title: "Special Days",
        points: [
          "Indian Army Day – January 15 | Theme: Year of Networking and Data Centricity",
          "Key content: Year of networking and data centricity",
          "1949 Jan 15 – K.M. Kariappa – Indian Army Commander-in-Chief",
        ],
      },
      {
        title: "Opening",
        points: [
          "Suriyur, Tiruchi – permanent flood lights stadium inauguration – ₹3 crore – Deputy CM Udhayanidhi Stalin",
          "Second flood lights stadium in Tamil Nadu after Madurai",
        ],
      },
      {
        title: "Appointment",
        points: [
          "Rakesh Agarwal – National Investigation Agency (NIA) – head / until Aug 31, 2028",
          "1994 Himachal Pradesh IPS officer",
          "Giorgio Cour – India's new American ambassador – Trump's personal director",
        ],
      },
      {
        title: "NITI Aayog",
        points: [
          "4th Export Readiness Index 2024",
          "Export policies, trade environment, quality and infrastructure, export products",
          "First three: Maharashtra, Tamil Nadu, Gujarat",
          "Small states, Union Territories – Uttarakhand, J&K, Nagaland",
        ],
      },
      {
        title: "Withdrawal",
        points: [
          "Israel withdrew from various international organizations including main UN organizations",
          "Operating against Israel",
          "International Court of Justice genocide case, anti-war boycott",
        ],
      },
    ],
  },
  {
    date: "16-17 Jan 2026",
    color: "#673ab7",
    topics: [
      {
        title: "Special Days",
        points: [
          "National Startup Day – January 16 | Theme: Inclusive Growth: Women and MSME Empowerment",
          "Content: Inclusive development – women and MSME empowerment",
          "2016 Jan 16 – Startup India launched",
        ],
      },
      {
        title: "Opening",
        points: [
          "Thyagi Imanuel Sekaranar Memorial Hall – Paramakudi, Ramanathapuram – ₹3 crore – CM MK Stalin",
          "1924 Selaur Village – Indian Independence struggle – 3 months imprisonment",
          "1950 – Untouchables Liberation Movement – double kuvela method, anti-untouchability / Sep 11, 1957 death",
        ],
      },
      {
        title: "Zimbabwe",
        points: [
          "U19 Men's Cricket World Cup (16th)",
          "India including 16 teams participated – India 5-time champion",
        ],
      },
      {
        title: "Nobel Prize",
        points: [
          "Peace Nobel Prize 2025 – Maria Corina Machado (Venezuela former opposition leader)",
          "Trump-supported Venezuela opposition leader",
          "Cannot be revoked, shared, or transferred",
        ],
      },
      {
        title: "New Delhi",
        points: [
          "28th Commonwealth Parliamentary Association speakers and presiding officers conference",
          "PM Narendra Modi, People's leader Omprakash participated",
          "29th head responsibility – Britain",
          "India-Japan 18th high-level strategic dialogue – External Affairs",
          "India-Japan collaboration in minerals sector",
        ],
      },
    ],
  },
  {
    date: "18 Jan 2026",
    color: "#00bcd4",
    topics: [
      {
        title: "Special Days",
        points: [
          "World Snow Day – Jan 18 (3rd Sunday)",
          "World Religion Day – Jan 18 (3rd Sunday)",
        ],
      },
      {
        title: "Chennai",
        points: [
          "Chennai Multi-language Book Festival 2026 – 84 books published – CM MK Stalin",
          "Tamil State award for best books in Indian languages – Tamil, Telugu, Kannada, Malayalam, Odia, Bengali, Marathi",
          "Sahitya Akademi Nigara Chemmozhi Literary Award – ₹5 lakh",
        ],
      },
      {
        title: "Opening",
        points: [
          "Vellore, Erode – Kalingaiyar full statue inauguration – 7 feet height – Nulakam – CM Stalin",
          "River Connection Front – 1270 Kalingaiyar feet – Bhavani to Kodumudi – 90 km – 15,000 plus acres paddy cultivation",
        ],
      },
      {
        title: "Success Path",
        points: [
          "New training path scheme for youth joining fire service – Thirunelveli District Administration",
          "Tamil Nadu Fire Department, Indian Army, Madhya Pradesh Fire Department, Akni Veer",
        ],
      },
      {
        title: "Assam",
        points: [
          "Kaziranga overpass scheme laid – ₹6957 crore – PM Narendra Modi",
          "National Highway 715 – 34 km length to protect animals",
          "Dibrugarh-Lucknow (UP), Kamakhya-Ropat (Guwahati) / Amrut Bharat railway service",
        ],
      },
      {
        title: "Tennis 2026",
        points: [
          "Adelaide International Tennis",
          "Men's – Tomas Masak (Czech Republic) champion / Hugo Humbert (France)",
          "Women's – Mira Andreeva (Russia) champion / Victoria Pogoc (Canada)",
        ],
      },
    ],
  },
  {
    date: "19 Jan 2026",
    color: "#ff5722",
    topics: [
      {
        title: "Special Days",
        points: [
          "NDRF Raising Day – Jan 19 (2006) – National Disaster Response Force",
          "Kokborok Day – Jan 19 – Tripura's state language (1979 – official language)",
        ],
      },
      {
        title: "Uganda",
        points: [
          "East African country – President election",
          "7th consecutive win – Yoweri Museveni – 71.65% votes – since 1986 – 40 years",
        ],
      },
      {
        title: "Andaman",
        points: [
          "First in the country – Mid-Sea Fish Farm scheme – Union Science, Technology, Earth Science Minister Jitendra Singh",
          "Central Earth Science Department, National Big Fish Technology Institution",
          "Fish farming & cage production",
        ],
      },
      {
        title: "Launch",
        points: [
          "India's first Vande Bharat sleeper train service – West Bengal – PM Narendra Modi – January 17",
          "Howrah (West Bengal) to Guwahati (Assam)",
          "New Jalpaiguri-Nagacoil, New Jalpaiguri-Tiruchi, Alipur port – Bengaluru, Alipur port – Mumbai / 4 new Amrut Bharat railway launched",
        ],
      },
      {
        title: "Gaza Peace",
        points: [
          "Recreating peace in Gaza and establishing peace – 'Amaithi Variyam' high-level committee",
          "Committee head: US President Donald Trump",
          "Members: World Bank former president Ajay Banga, Britain former PM Tony Blair",
          "Arms ceasefire, Hamas disarmament",
        ],
      },
    ],
  },
  {
    date: "20 Jan 2026",
    color: "#9c27b0",
    topics: [
      {
        title: "Special Days",
        points: [
          "International Day of Acceptance – Jan 20",
          "Penguin Awareness Day – Jan 20",
        ],
      },
      {
        title: "Foundation",
        points: [
          "Mamallapuram water reservoir scheme – ₹342.60 crore – Nemam, Sengalpattu – CM Stalin",
          "170 million liters of drinking water per day",
        ],
      },
      {
        title: "Awards",
        points: [
          "New India Literacy Program – target to teach 5 crore people by 2022/2027",
          "Tamil Nadu – 30 lakh people received basic education in last 4 years",
          "342 special centers – State Literacy Award",
          "Kerala Congress Committee – Partition study – Indira Gandhi memorial partition literary award",
          "Famous writer Leelavathi, Kerala",
          "Ajanta – El-Lora International Award – Maharashtra",
          "Padmabani Award – Music composer Ilayaraja / ₹2 lakh prize",
          "Javeth Akbar, Sai Paranjpe, Om Puri",
        ],
      },
      {
        title: "China",
        points: [
          "Birth rate history unseen decline – 2025 / 5.63% birth rate",
          "Children born last year: 79.2 lakh (17% decline from previous year)",
          "Population: 140.4 crore",
        ],
      },
      {
        title: "Appointment",
        points: [
          "BJP new national president – Nitin Naveen (45 years old)",
          "Youngest national president taking responsibility",
          "Dr. Susan Jacob – Global Medical Organization (JAMSSS) head for retinal surgery",
          "Dr. Agarwal's Hospital first-level medical expert",
        ],
      },
    ],
  },
  {
    date: "21 Jan 2026",
    color: "#3f51b5",
    topics: [
      {
        title: "Special Days",
        points: [
          "Meghalaya, Tripura, Manipur Foundation Day – Jan 21 (1972)",
        ],
      },
      {
        title: "Parliament Session 2026",
        points: [
          "First session – Governor's address",
          "Expelled from Assembly – 13 accused re-entered",
          "Article 176 of Indian Constitution – Governor must give address at start of state assembly session",
          "Economic growth – 11.19%",
          "2.23 crore families – ₹3 ayiram crore benefit package",
          "1.30 crore women – Women's rights fund – ₹33,464 crore",
          "Implementation pension scheme",
          "Women's travel – monthly ₹888 limit",
          "4.9 lakh self-help groups – ₹1.34 lakh crore bank loan",
          "Children's morning food – 19.34 lakh children benefit",
          "1176 cooperation agreements – 36 lakh jobs – ₹12.16 lakh crore investment",
          "19 job categories (40.3% women employees)",
        ],
      },
      {
        title: "Launch",
        points: [
          "Forest education – quality school scheme – environment and forest transformation",
          "Deputy Minister Thangam Thennarasu & School Education Minister Anbil Mahesh Poyyamozhi",
          "Urban heat island effect – cooling solution – Kamarajar Women's High School, Ambattur",
        ],
      },
      {
        title: "Visit",
        points: [
          "UAE President Mohammed bin Zayed Al Nahyan & Indian PM Narendra Modi meeting",
          "Target to increase trade to 200 billion USD by 2032",
          "5 lakh metric ton LNG – Hindustan Petroleum",
          "Space infrastructure agreement",
        ],
      },
      {
        title: "Sports",
        points: [
          "Khelo India 6th Winter Sports started in Ladakh",
          "Leh, Ladakh & Kulmarg, J&K",
        ],
      },
    ],
  },
  {
    date: "22 Jan 2026",
    color: "#ff4081",
    topics: [
      {
        title: "State Exam Center",
        points: [
          "To provide teachers professional learning experience – objective",
          "School system – Chennai – integrated school education fund – ₹5 crore",
          "Language research, language change skills, children's section",
        ],
      },
      {
        title: "Union Cabinet Approvals",
        points: [
          "Atal Pension Scheme extended to 2030-31",
          "Non-organized sector employees 18 to 40 – 60 years and above monthly ₹1000 to 5000 pension – May 9, 2015 launch – 8.66 crore subscribers",
          "Small businesses MSME fund increase – India MSME ₹5 lakh crore bank capital support",
          "Central Finance Services – 3 institutions – 2028 financial year 1.02 crore institution loan target",
        ],
      },
      {
        title: "Ayodhya",
        points: [
          "233 years (1792) ago, very old Valmiki Ramayana manuscript copy (5 volumes) collection – Ramayana State Heritage head",
          "International Rama Story Museum – Ayodhya",
        ],
      },
      {
        title: "New Delhi",
        points: [
          "JSCIEM (India's International Democracy and Election Management Conference) – head election commissioner Gyanesh Kumar",
          "Election commission internet launch",
          "All election commission services internet introduced",
          "40 and above activities integrated",
          "22 scheduled languages & English",
        ],
      },
      {
        title: "Republic Day",
        points: [
          "77th Republic Day parade – content: Vande Mataram 150 years",
          "Tamil Nadu – strength mantiram: Tharpapu India",
          "Dino – Jelly fish / Tunnel theme / improved electric vehicle production",
          "Natural and environmental friendly living, navigation and nature",
        ],
      },
      {
        title: "Ladakh",
        points: [
          "6th Winter Khelo India Winter Games",
          "Speed skating long track 500m – Avikshit Vijay Vishwanath – Gold",
        ],
      },
    ],
  },
  {
    date: "23 Jan 2026",
    color: "#009688",
    topics: [
      {
        title: "Special Days",
        points: [
          "Parakram Diwas Day – Jan 23 | Netaji Subhas Chandra Bose – 129th Birth Anniversary",
        ],
      },
      {
        title: "Scheme Launch",
        points: [
          "18 services including home document registration, clubs, associations, organizations registration – CM MK Stalin",
          "Traditional, religious sites 160 years of registration – digital preservation scheme",
          "STAR 3.0 Portal – https://tnreginet.gov.in – Kaathimillana document registration, direct visit document registration, digital signatures",
        ],
      },
      {
        title: "Telangana",
        points: [
          "Providing facilities to affected crime victims' homes – first time nationally",
          "Police cases, SC/ST cases, domestic violence, child marriages, trafficking",
        ],
      },
      {
        title: "Awards",
        points: [
          "2025 Indira Gandhi Peace, Disarmament and Development Award – ₹1 crore – Indira Gandhi memorial foundation",
          "Mozambique Olympic team Verrasa Machel",
          "Education, health, nutrition, economic development in various fields – women, children, all marginalized people services",
          "1975 Mozambique country's first education and culture minister",
          "1990 Landmine Disarmament – UN Award – 1997",
        ],
      },
      {
        title: "Kerala",
        points: [
          "Street vendors' welfare scheme – PM's SVAnidhi Scheme – no expiry loan scheme – 1 lakh people",
          "Thiruvananthapuram – fresh Anjali shop opening",
          "Printing, digital printing – trade improvement & Radio Surgeon Center",
          "4 new Amrut Bharat railway scheme – Thrampram-Thiruvananthapuram",
        ],
      },
      {
        title: "Sunita Williams",
        points: [
          "Indian descent US astronaut – Sunita Williams – 1965 Sep 19 America",
          "1998 astronaut selection",
          "2006 Dec 09 – STS-116 mission – 195 days",
          "2012 July 14 – 127 days",
          "2024 June – Starliner – Boeing – 286 days",
          "62 hour 6 minutes spacewalk – first marathon runner in space",
          "27 years work – 608 days in space – record",
        ],
      },
    ],
  },
  {
    date: "24 Jan 2026",
    color: "#f44336",
    topics: [
      {
        title: "Special Days",
        points: [
          "International Day of Education – Jan 24 | Theme: The Power of Youth in Co-creating Education",
          "National Girl Child Day – Jan 24",
          "International Mobile Phone Recycling Day – Jan 24",
          "Uttar Pradesh Foundation Day – Jan 24 (1950)",
        ],
      },
      {
        title: "Dissolution",
        points: [
          "Japan's Parliament dissolved",
          "Japan's first woman PM – Sane Takaichi – February 08 election",
        ],
      },
      {
        title: "Resolution",
        points: [
          "Continue Mahatma Gandhi's National Rural Employment Guarantee Scheme as before – Union government said and parliament passed single resolution",
          "Ground water management authority to create ground water selling, collecting tax – Tamil Nadu Water Resources Master Plan passed",
          "District water resources group formation, water management authority to plan, white pond management",
          "Kalaignar Dream House Scheme – ₹3500 crore – 1 lakh new houses for poor",
          "First rural road improvement scheme – ₹1088 crore – 2200 km rural road improvement",
          "Social safety scheme – more 1.80 lakh people monthly pension",
        ],
      },
    ],
  },
  {
    date: "25 Jan 2026",
    color: "#4caf50",
    topics: [
      {
        title: "Special Days",
        points: [
          "National Tourism Day – Jan 25",
          "Mozhippor Thiyagigal Naal (Language Martyrs Day) – January 25",
          "Himachal Pradesh Statehood Day – Jan 25 (1971)",
          "World Leprosy Day – Jan 25 (Last Sunday) | Theme: Leprosy is curable, the real challenge is stigma",
          "National Voters Day – Jan 25 | Theme: Nothing Like Voting, I Vote for Sure",
        ],
      },
      {
        title: "Museums",
        points: [
          "Minister – Thangam Thennarasu",
          "Alagan Kulam – Navai museum",
          "Tanjore & Gangaikonda Cholapuram – Cholar museum",
          "Dharmapuri – Nadukal museum",
          "Kodumanel – Noyyal museum",
          "Mamallapuram – Kalaachar museum",
        ],
      },
      {
        title: "Committee",
        points: [
          "Andhra – Committee to evaluate banning children under 16 from social media",
          "3 ministers committee",
        ],
      },
    ],
  },
  {
    date: "26 Jan 2026",
    color: "#ff6f00",
    topics: [
      {
        title: "Special Days",
        points: [
          "World Environmental Education Day – Jan 26",
          "International Day of Clean Energy – Jan 26 | Theme: Clean Energy for People and Planet",
          "Republic Day – Jan 26 | Theme: 150 Years of Vande Mataram",
          "International Customs Day – Jan 26 | Theme: Customs Protecting Society through Vigilance and Commitment",
        ],
      },
      {
        title: "Padma Awards 2026 (131 Total)",
        points: [
          "Padma Vibhushan – 5: Late Kerala former CM V.S. Achuthanandan (public service), Late former judge K.T. Thomas (public service), Late actor Dharmendra (arts) Maharashtra, Landscape artist N. Rajam (arts) UP, Malay journalist P. Narayanan (literary-education) Kerala",
          "Padma Bhushan – 13: Dr. K.R. Palanisami (medicine) Tamil Nadu, Industrialist S.K.M. Mailananthan (social service) Tamil Nadu",
          "Padma Shri – 113: Dr. Hasi Wande (medicine) Tamil Nadu, Writer Sivasankari (literary, education) Tamil Nadu, Chennai IIT Director V. Kamakoti (science, engineering) Tamil Nadu, Karnataka musician sisters Ranjani Balapuramaniyan, Gayatri Balapuramaniyan (arts) Tamil Nadu, Veterinary researcher K. Ramasami (science, engineering) Tamil Nadu, Former IPS officer K. Vijayakumar (public service) Tamil Nadu, Sridhavar Thiruthani Swaminathar (arts) Tamil Nadu, Late palm sugar farmer Olivia R. Krishnan (arts) Tamil Nadu, Rajasthani folk singer Thiruvaleeru Pagavasalam (arts) Tamil Nadu, Silambam trainer K. Pazhanivel (sports-adventure) Puducherry, Maharashtra CM Madhavenu awarded Padma Shri",
          "Rohit Sharma, Harmanpreet, Savitha Poonia, Subhanshe Shukla – Ashoka Chakra Award",
        ],
      },
    ],
  },
  {
    date: "27 Jan 2026",
    color: "#607d8b",
    topics: [
      {
        title: "Special Days",
        points: [
          "International Holocaust Remembrance Day – Jan 27 | Theme: Holocaust Remembrance for Dignity and Human Rights",
        ],
      },
      {
        title: "Tamil Nadu",
        points: [
          "77th Republic Day parade – Governor R.N. Ravi",
          "Brave act awards – Vi. Sangkar, P. Suresh, S. Ramesh Kumar & Peter John (late)",
          "Kotai Amir Madom goodwill award – M. Galimulla, Tiruppoor",
          "C.N. Narayana Sami Nayer rice cultivation award – J. Veeramani, Thanjavur",
          "Best police stations – Madurai, Tiruppoor city, Coimbatore district",
        ],
      },
      {
        title: "India",
        points: [
          "77th Republic Day parade – Delhi – President Draupadi Murmu",
          "Special guests – European Council President Antonio Costa, EU Agency head Ursula von der Leyen",
          "Military strength display – T-90 Bhishma and Arjun tanks, Apachi 64 combat helicopters, Suryastra missiles, Divyastra drones, Nag missiles, Drone units",
          "Rivers named after states – Vaigai, Yamuna, Periyaru, Kaveri",
          "CRP.F. women first female officer – Simran Bala (Jammu Commander), Kashmir",
          "Subhanshi Shukla – Ashoka Chakra",
        ],
      },
      {
        title: "Mann Ki Baat",
        points: [
          "PM's 130th Mann Ki Baat radio program – January 25",
          "Tamil Nadu women farmers – Kallakkurichi small honey production",
          "Malaysia 500 plus Tamil schools",
          "Thailand planting trees – 200 crore plus trees",
        ],
      },
      {
        title: "Myanmar",
        points: [
          "Military support party won general election – Union Solidarity and Development Party – Min Aung Hlaing",
          "2021 Aung San Suu Kyi-led government overthrown",
        ],
      },
      {
        title: "Sports",
        points: [
          "Khelo India 6th Winter Games – Ladakh – first phase completed",
          "Haryana – first (4+1+2-7), Ladakh, Maharashtra",
          "Tamil Nadu – 6th place (1+1+1-3)",
        ],
      },
      {
        title: "Death",
        points: [
          "Mutha Tamizh writer – G. Gnanasundaram",
          "College professor, literary researcher, wordsmith",
          "Chemmozhi Tamil language and literature central head",
          "Mu. Varadarasanarin disciple / 14+ award recipient – literary Mamani Award",
        ],
      },
    ],
  },
  {
    date: "28 Jan 2026",
    color: "#1565c0",
    topics: [
      {
        title: "Special Days",
        points: [
          "Data Privacy Day – January 28 | Theme: Take Control of Your Data",
          "International Day of Peaceful Coexistence – Jan 28",
          "International Reducing CO2 Emissions Day – Jan 28",
        ],
      },
      {
        title: "New Delhi",
        points: [
          "India's biggest regional airport manufacturing factory agreement",
          "Adani group & Embraer company, Brazil",
        ],
      },
      {
        title: "India-Europe Agreement",
        points: [
          "16th India-European Union summit",
          "Key defense cooperation agreement & free movement of people agreement",
          "Free trade agreement with 27 EU countries finalized",
          "EU 90% goods duty-free",
          "93% Indian goods tax-free",
          "Carbon tax dispute – no compromise",
          "India's 22nd free trade agreement – EU",
        ],
      },
      {
        title: "Scheme Launch",
        points: [
          "HPV vaccine for school students – Tamil Nadu Cancer Prevention and Primary Care Agency",
          "First phase – Dharmapuri, Perambalur, Thiruvannamalai, Ariyalur – 30,209 children – ₹38 crore",
          "Human Papillomavirus – Tamil Nadu total cervical cancer total 1 lakh 14 affected",
        ],
      },
      {
        title: "Chennai",
        points: [
          "World Women's Summit started",
          "Tamilnadu WE Safe / World Bank ₹1250 crore loan assistance – ₹5000 crore scheme for women's safety growth",
        ],
      },
    ],
  },
  {
    date: "29-30 Jan 2026",
    color: "#4e342e",
    topics: [
      {
        title: "Special Days",
        points: [
          "Indian Newspaper Day – January 29 (1780 – Hicky's Bengal Gazette)",
          "World NTD (Neglected Tropical Diseases) Day – January 30",
          "Gandhi Death Anniversary – January 30 (1948)",
        ],
      },
      {
        title: "Budget Session 2026",
        points: [
          "President Droupadi Murmu's Parliament address",
          "Last 10 years – 25 crore people came out of poverty",
          "Social safety net team 95 crore people",
          "Ayushman Bharat free medical coverage – 11 crore plus beneficiaries",
          "Last 35 years 15 crore ton rice production",
          "Metro rail construction – 1000 km – world's largest metro construction",
        ],
      },
      {
        title: "Coimbatore",
        points: [
          "First International Textile Summit – Tamil Nadu government textile & Indian industry cooperation",
          "₹915 crore – 55 agreements",
          "Tamil Nadu's integrated new textile policy 2025-26 – Deputy CM",
          "Advanced fabric, knitting machines purchase – 20% subsidy",
        ],
      },
      {
        title: "Chennai",
        points: [
          "India World Education Conference 2026 – CM participation",
          "Tamil Nadu Scientist City foundation – Thiruvanur Maayakkar – 872 acres",
          "Higher education, research and improvement, technology, industry cooperation",
        ],
      },
      {
        title: "Awards",
        points: [
          "Republic Day 2026 – New Delhi",
          "State Decorative City – Maharashtra (Vinayak Chaturthi) / J&K (Film House / Kerala (Thenneer Metro & 100% literacy)",
          "144 young soldiers participated – Indian Navy coast guard parade",
          "Central government – National Cultural Association (Vande Mataram 150 years)",
        ],
      },
      {
        title: "Economic Survey 2026",
        points: [
          "Chief Economic Advisor V. Anant Nageshvaran – Finance Ministry Economic Analysis Department – Rama Ramanan",
          "2026-27 India's economic growth 6.8% to 7.2%",
          "Agricultural products production value – world's 2nd place",
          "Banks' bad debts 2.2% decrease",
          "Jan Dhan Scheme – 55.02 crore bank accounts",
          "14.71 lakh schools – 24.69 crore students – 1.01 crore teachers",
        ],
      },
    ],
  },
  {
    date: "31 Jan 2026",
    color: "#006064",
    topics: [
      {
        title: "Special Days",
        points: [
          "International Zebra Day – Jan 31",
          "Mooknayak Marathi Vara Itazh launch – January 31, 1920 – Ambedkar (voice for oppressed people, social justice)",
        ],
      },
      {
        title: "Fundamental Right",
        points: [
          "Right to health included under Article 21 of Constitution",
          "Free sanitary napkins for students in government and private schools – Supreme Court order",
        ],
      },
      {
        title: "Nuclear Arms Treaty",
        points: [
          "Current nuclear arms reduction treaty between USA-Russia – New START – expired Feb 5",
          "2010 – only 1550 nuclear weapons can be kept",
        ],
      },
      {
        title: "World Bank",
        points: [
          "India's next 5 years – annual ₹73,000 crore to ₹91,000 crore loan",
          "New country cooperation scheme – World Bank & India discussions",
        ],
      },
      {
        title: "Appointment",
        points: [
          "Federal Reserve Central Bank new head – Kevin Walsh",
          "Jerome Powell's term ending May",
        ],
      },
      {
        title: "Nirmala Sitharaman",
        points: [
          "Continuing as Finance Minister for a very long time – 9th consecutive budget presented",
          "2019 May 31 – first full time woman Finance Minister",
          "P. Chidambaram's record equaled / most budget presentations – Morarji Desai – 10 times",
          "First time after independence – Saturday budget presentation",
        ],
      },
    ],
  },
];

const quizData = [
  // International Days & Events
  { q: "What is the theme of World Braille Day 2026 (Jan 4)?", options: ["Touch and Learn", "Braille from Touch to Empowerment", "See the World", "Feel the Future"], ans: 1, exp: "World Braille Day 2026 on January 4 had the theme 'Braille from Touch to Empowerment', highlighting the importance of Braille literacy for empowerment." },
  { q: "What is the theme of World Hindi Day 2026 (Jan 10)?", options: ["Hindi for All", "Hindi from Traditional Knowledge to Artificial Intelligence", "Hindi and Science", "Modern Hindi"], ans: 1, exp: "World Hindi Day 2026 theme was 'Hindi from Traditional Knowledge to Artificial Intelligence', connecting tradition with technology." },
  { q: "What is the theme of National Youth Day 2026 (Jan 12)?", options: ["Youth Power", "Rise and Shine", "Ignite the Self, Impact the World", "Young India"], ans: 2, exp: "National Youth Day 2026 (Jan 12) theme was 'Ignite the Self, Impact the World', celebrated on Swami Vivekananda's birthday." },
  { q: "What is the theme of Indian Army Day 2026?", options: ["Year of Strength", "Year of Networking and Data Centricity", "Year of Digital India", "Year of Innovation"], ans: 1, exp: "Indian Army Day 2026 theme was 'Year of Networking and Data Centricity', celebrated on Jan 15 – the day K.M. Kariappa became India's first Army C-in-C in 1949." },
  { q: "What is the theme of National Startup Day 2026?", options: ["Digital Startup India", "Inclusive Growth: Women and MSME Empowerment", "India First Startup", "Innovation Nation"], ans: 1, exp: "National Startup Day 2026 (Jan 16) theme was 'Inclusive Growth: Women and MSME Empowerment', marking 10 years of Startup India (launched Jan 16, 2016)." },
  { q: "What is the theme of Republic Day 2026?", options: ["Viksit Bharat", "150 Years of Vande Mataram", "Jai Hind 77", "India Rising"], ans: 1, exp: "Republic Day 2026 theme was '150 Years of Vande Mataram', marking 150 years of the patriotic song Vande Mataram." },
  { q: "What is the theme of International Day of Education 2026?", options: ["Education for All", "AI in Education", "The Power of Youth in Co-creating Education", "Digital Learning"], ans: 2, exp: "International Day of Education 2026 (Jan 24) theme was 'The Power of Youth in Co-creating Education'." },
  { q: "What is the theme of National Voters Day 2026?", options: ["Vote Today", "Nothing Like Voting, I Vote for Sure", "Every Vote Counts", "Democracy First"], ans: 1, exp: "National Voters Day 2026 (Jan 25) theme was 'Nothing Like Voting, I Vote for Sure'." },
  { q: "What is the theme of World Leprosy Day 2026?", options: ["Leprosy Free India", "Leprosy is curable, the real challenge is stigma", "End Leprosy Now", "Cure and Care"], ans: 1, exp: "World Leprosy Day 2026 (Jan 25, Last Sunday) theme was 'Leprosy is curable, the real challenge is stigma'." },
  { q: "What is the theme of International Holocaust Remembrance Day 2026?", options: ["Never Again", "Holocaust Remembrance for Dignity and Human Rights", "Remembering Victims", "Humanity First"], ans: 1, exp: "International Holocaust Remembrance Day 2026 theme was 'Holocaust Remembrance for Dignity and Human Rights'." },
  { q: "What is the theme of Data Privacy Day 2026?", options: ["Privacy Matters", "Take Control of Your Data", "Secure Your Data", "Digital Safety First"], ans: 1, exp: "Data Privacy Day 2026 (January 28) theme was 'Take Control of Your Data'." },
  { q: "What is the theme of International Customs Day 2026?", options: ["Trade and Security", "Customs Protecting Society through Vigilance and Commitment", "Border Protection First", "Customs for All"], ans: 1, exp: "International Customs Day 2026 theme was 'Customs Protecting Society through Vigilance and Commitment'." },
  { q: "What is the theme of International Day of Clean Energy 2026?", options: ["Green Future", "Clean Energy for People and Planet", "Solar Power Now", "Zero Carbon Energy"], ans: 1, exp: "International Day of Clean Energy 2026 (Jan 26) theme was 'Clean Energy for People and Planet'." },
  { q: "World Introvert Day (Jan 2) 2026 theme was?", options: ["Think Before You Speak", "Quietly Changing Tomorrow", "Silence is Golden", "Inner Strength"], ans: 1, exp: "World Introvert Day 2026 theme was 'Quietly Changing Tomorrow', celebrating the quiet power of introverts." },

  // Sports
  { q: "Who won the World Blitz Chess Championship 2025 in Qatar (Open category)?", options: ["Arjun Erigaisi", "Nodirbek Abdusattorov", "Magnus Carlsen", "Fabiano Caruana"], ans: 2, exp: "Magnus Carlsen (Norway) won the World Blitz Chess 2025 in Qatar – his 9th consecutive title. Nodirbek Abdusattorov was 2nd and Arjun Erigaisi 3rd in Rapid." },
  { q: "Who won the Women's World Blitz Chess Championship 2025?", options: ["Bibisara Assaubayeva", "Ju Wenjun", "Koneru Humpy", "Alexandra Kosteniuk"], ans: 0, exp: "Bibisara Assaubayeva from Kazakhstan won the Women's World Blitz Chess Championship 2025." },
  { q: "How many total Tigers died in India in 2025?", options: ["166", "180", "150", "200"], ans: 0, exp: "Total 166 tigers (31 cubs) died in India in 2025. Madhya Pradesh had the highest with 55 deaths." },
  { q: "What is India's total tiger count as of 2022?", options: ["3000", "3500", "3682", "4000"], ans: 2, exp: "India's total tiger count in the 2022 census was 3682 tigers." },
  { q: "Virat Kohli became the 2nd highest run scorer in international cricket. Who holds the 1st place?", options: ["Kumar Sangakkara", "Ricky Ponting", "Sachin Tendulkar", "Brian Lara"], ans: 2, exp: "Sachin Tendulkar holds 1st place with 34,357 runs in 644 innings. Virat Kohli is 2nd with 624 innings. Kumar Sangakkara is 3rd with 28,106 runs in 666 innings." },
  { q: "Who won the Brisbane International Tennis 2026 (Women's)?", options: ["Aryna Sabalenka", "Elena Svitolina", "Mira Andreeva", "Iga Swiatek"], ans: 0, exp: "Aryna Sabalenka (Belarus) won the Brisbane International Tennis 2026 Women's title, defeating Martha Kostyuk (Ukraine)." },
  { q: "Who won the Adelaide International Tennis 2026 (Men's)?", options: ["Carlos Alcaraz", "Tomas Masak", "Hugo Humbert", "Novak Djokovic"], ans: 1, exp: "Tomas Masak (Czech Republic) won the Adelaide International Men's Tennis 2026, defeating Hugo Humbert (France)." },
  { q: "Usman Khawaja retired from cricket. How many Test matches did he play?", options: ["75", "80", "87", "90"], ans: 2, exp: "Usman Khawaja (Australia) played 87 Tests scoring 6206 runs, 40 ODIs scoring 1554 runs, and 9 T20 matches scoring 241 runs." },
  { q: "Who was appointed as India's Women Hockey Team head coach in January 2026?", options: ["Harbinder Singh", "Jord Moran", "Sjoerd Marijne", "Tushar Khandekar"], ans: 1, exp: "Jord Moran (Netherlands) was appointed as India Women's Hockey Team head coach. He had previously served from 2017 to 2021." },
  { q: "Which country won the U19 Men's Cricket World Cup (16th edition) held in Zimbabwe?", options: ["India", "Australia", "Pakistan", "England"], ans: 0, exp: "India participated in the 16th U19 Men's Cricket World Cup held in Zimbabwe along with 15 other teams. India is a 5-time champion in U19 World Cup." },
  { q: "Who won Beach volleyball Gold at Beach Games 2026 (Men's)?", options: ["Tamil Nadu", "Karnataka", "V. Srikant", "V. Srikant"], ans: 2, exp: "V. Srikant won Gold in Beach Volleyball at Beach Games 2026. Tamil Nadu Women's team won Silver." },
  { q: "Who won Speed Skating Long Track 500m gold at Khelo India Winter Games?", options: ["Harmanpreet", "Avikshit Vijay Vishwanath", "Rohit Sharma", "Subhanshe Shukla"], ans: 1, exp: "Avikshit Vijay Vishwanath won Gold in Speed Skating Long Track 500m at the 6th Khelo India Winter Games in Ladakh." },

  // Defense & Science
  { q: "What is the strike range of India's Pralay missile?", options: ["300 km", "500 km", "1000 km", "200 km"], ans: 1, exp: "India's Pralay surface-to-surface ballistic missile has a range of 1000 km and can strike targets up to 500 km with advanced guidance systems." },
  { q: "Pakistan's Taimur missile was launched from which platform?", options: ["Ground", "Ship", "Aircraft", "Submarine"], ans: 2, exp: "Pakistan's Taimur missile was launched from an aircraft by the Pakistan Air Force. It has a range of 600 km and is Pakistan's first aircraft-launched missile." },
  { q: "What was the speed achieved during India's Vande Bharat sleeper train final test run?", options: ["130 km/h", "150 km/h", "180 km/h", "200 km/h"], ans: 2, exp: "The Kotta-Naka railway safety commissioner's trial achieved 180 km/h during the Vande Bharat sleeper train's final test run." },
  { q: "The first Vande Bharat sleeper train service was launched between which cities?", options: ["Delhi-Mumbai", "Chennai-Bengaluru", "Howrah-Guwahati", "Mumbai-Pune"], ans: 2, exp: "The first Vande Bharat sleeper train service was launched between Howrah (West Bengal) and Guwahati (Assam) on January 17 by PM Modi." },
  { q: "PSLV-C62 rocket failed due to which stage failure?", options: ["First stage", "Second stage", "Third stage", "Fourth stage"], ans: 2, exp: "PSLV-C62 rocket launched from Sriharikota on January 12 failed at the third stage. It was carrying ILS-N.01 satellite for solar observation." },
  { q: "DRDO was founded in which year? (DRDO Day – Jan 1)", options: ["1947", "1950", "1958", "1962"], ans: 2, exp: "DRDO (Defence Research and Development Organisation) was founded in 1958. DRDO Day is celebrated on January 1. HQ is in Delhi with Chairman SV Kamat." },
  { q: "What is the length of India's newly dedicated Coast Guard Pollution Control ship?", options: ["95 m", "100 m", "114.5 m", "120 m"], ans: 2, exp: "The new Indian Coast Guard Pollution Control Ship is 114.5 m long, weighs 4200 tons, travels at 22 knots speed, and was built by Goa Shipbuilding." },
  { q: "What was the name of India's identity mascot 'Udai' announced by?", options: ["UIDAI", "DRDO", "ISRO", "NIC"], ans: 0, exp: "Udai was the identity mascot announced for Aadhaar services. The Indian Identity Authority (UIDAI) head Nilkanth Mishra announced it. Design came from Arunagoel, Kerala." },

  // Economy & Finance
  { q: "What is India's GDP growth rate projection for 2025-26 as per Economic Survey 2026?", options: ["5.5%", "6.8% to 7.2%", "7.5%", "8%"], ans: 1, exp: "Economic Survey 2026 projected India's GDP growth for 2026-27 at 6.8% to 7.2%, with India remaining the fastest growing major economy globally." },
  { q: "India's economic growth rate for the current fiscal year (2025-26) as per UN/World Economic Forum?", options: ["5.5%", "6.6%", "7.4%", "8%"], ans: 1, exp: "India's economic growth for 2025-26 is 6.6% (down from previously projected 7.4%), but India still remains the fastest growing major economy globally." },
  { q: "How much is the economic growth projection for 2025-26 as per Jan 7-8 report?", options: ["7.0%", "7.4%", "7.6%", "6.5%"], ans: 1, exp: "The first national income estimate (Jan 7-8) projected India's economic growth for 2025-26 at 7.4% (up from previously 7.3%). 2024-25 actual was 6.5%." },
  { q: "What is the World Bank's annual loan amount agreed for India for the next 5 years?", options: ["₹50,000 to ₹60,000 crore", "₹73,000 to ₹91,000 crore", "₹1,00,000 crore", "₹40,000 crore"], ans: 1, exp: "The World Bank agreed to provide India ₹73,000 crore to ₹91,000 crore annually for the next 5 years under the new country cooperation scheme." },
  { q: "Total Jan Dhan accounts as per Economic Survey 2026?", options: ["40 crore", "50 crore", "55.02 crore", "60 crore"], ans: 2, exp: "Economic Survey 2026 reported 55.02 crore Jan Dhan Scheme bank accounts in India." },
  { q: "India's total domestic production (GDP) for 2024-25 was?", options: ["₹280 lakh crore", "₹300 lakh crore", "₹330.68 lakh crore", "₹357.14 lakh crore"], ans: 2, exp: "India's total domestic production for 2024-25 was ₹330.68 lakh crore. For 2025-26 it is projected at ₹357.14 lakh crore." },
  { q: "The Atal Pension Scheme was extended until which year?", options: ["2028-29", "2030-31", "2032-33", "2035"], ans: 1, exp: "The Union Cabinet approved extending the Atal Pension Scheme to 2030-31. It was launched on May 9, 2015 and has 8.66 crore subscribers." },
  { q: "Tamil Nadu Assured Pension Scheme (TAPS) – family benefit is what percentage of pension?", options: ["40%", "50%", "60%", "70%"], ans: 2, exp: "Under TAPS (Tamil Nadu Assured Pension Scheme), the family benefit is 60% of the pension amount." },

  // Appointments & Politics
  { q: "Who was appointed as the new BJP national president in January 2026?", options: ["Nitin Gadkari", "Nitin Naveen", "JP Nadda", "Amit Shah"], ans: 1, exp: "Nitin Naveen (45 years old) was appointed as the new BJP national president in January 2026, becoming the youngest national president." },
  { q: "Who is the 112th Mayor of New York City?", options: ["Eric Adams", "Bill de Blasio", "Soran Manthani", "Michael Bloomberg"], ans: 2, exp: "Soran Manthani was appointed as New York City's 112th Mayor in January 2026." },
  { q: "Who was appointed as India's new US Ambassador?", options: ["Ajit Doval", "Giorgio Cour", "Rakesh Agarwal", "Vikram Misri"], ans: 1, exp: "Giorgio Cour was appointed as India's new American Ambassador. He is Trump's personal director." },
  { q: "Rakesh Agarwal was appointed as head of which organization?", options: ["CBI", "RAW", "NIA", "IB"], ans: 2, exp: "Rakesh Agarwal was appointed as head of NIA (National Investigation Agency) until August 31, 2028. He is a 1994 Himachal Pradesh IPS officer." },
  { q: "Who is UIDAI head announced for the new Udai mascot?", options: ["Nitin Naveen", "Nilkanth Mishra", "Rakesh Agarwal", "Anand Swarup"], ans: 1, exp: "Nilkanth Mishra is the Indian Identity Authority (UIDAI) head who announced the Udai mascot for Aadhaar services." },
  { q: "Who is the new Federal Reserve (US Central Bank) head appointed in Jan 2026?", options: ["Jerome Powell", "Janet Yellen", "Kevin Walsh", "Ben Bernanke"], ans: 2, exp: "Kevin Walsh was appointed as the new Federal Reserve Central Bank head in January 2026, replacing Jerome Powell whose term is ending in May." },
  { q: "Who was elected as Uganda President for the 7th consecutive time?", options: ["Paul Kagame", "Yoweri Museveni", "Uhuru Kenyatta", "Robert Mugabe"], ans: 1, exp: "Yoweri Museveni won Uganda's presidential election for the 7th consecutive time with 71.65% votes. He has been in power since 1986 – 40 years." },
  { q: "Who won Japan's first woman Prime Minister election (scheduled Feb 08 2026)?", options: ["Yoshihide Suga", "Sane Takaichi", "Fumio Kishida", "Shinzo Abe"], ans: 1, exp: "Sane Takaichi was set to become Japan's first woman Prime Minister in the February 08, 2026 election after Japan's Parliament was dissolved in January." },
  { q: "Who was appointed as DRDO Chairman?", options: ["Dr. Samir Kamat", "SV Kamat", "G. Satheesh Reddy", "Avinash Chander"], ans: 1, exp: "SV Kamat is the DRDO Chairman. DRDO headquarters is in Delhi. DRDO Day is celebrated on January 1 (founded 1958)." },

  // Awards & Recognition
  { q: "How many Padma Awards were announced in 2026?", options: ["100", "121", "131", "150"], ans: 2, exp: "131 Padma Awards were announced for 2026, including 5 Padma Vibhushan, 13 Padma Bhushan, and 113 Padma Shri." },
  { q: "Who received the Padma Vibhushan for Public Service from Kerala (former CM)?", options: ["Oommen Chandy", "V.S. Achuthanandan", "K. Karunakaran", "A.K. Antony"], ans: 1, exp: "Late Kerala former CM V.S. Achuthanandan received the Padma Vibhushan posthumously for Public Service in Padma Awards 2026." },
  { q: "Who received the Nobel Peace Prize 2025?", options: ["Greta Thunberg", "Malala Yousafzai", "Maria Corina Machado", "Narges Mohammadi"], ans: 2, exp: "Nobel Peace Prize 2025 was awarded to Maria Corina Machado, Venezuela's former opposition leader. The prize cannot be revoked, shared, or transferred." },
  { q: "Who received the 2025 Indira Gandhi Peace Award?", options: ["Greta Thunberg", "Verrasa Machel", "Ban Ki-moon", "Malala Yousafzai"], ans: 1, exp: "2025 Indira Gandhi Peace, Disarmament and Development Award (₹1 crore) was given to Mozambique's Olympic team member Verrasa Machel." },
  { q: "Israel's Peace Award was given to whom for the first time in 80 years?", options: ["Angela Merkel", "Donald Trump", "Narendra Modi", "Joe Biden"], ans: 1, exp: "US President Donald Trump was given Israel's highest civilian honor – the Israel Peace Award – for the first time in 80 years given to a non-Israeli for his contribution to Israeli and Jewish people." },
  { q: "Who won the Padmabani Award (Music Composer)?", options: ["A.R. Rahman", "Ilayaraja", "Anirudh", "Harris Jayaraj"], ans: 1, exp: "Music composer Ilayaraja won the Padmabani Award (₹2 lakh prize) in January 2026." },
  { q: "The Ramnath Goenka Sahitya Samman award event was held where?", options: ["Delhi", "Mumbai", "Chennai – The New Indian Express", "Bengaluru"], ans: 2, exp: "The Ramnath Goenka Sahitya Samman award was held at The New Indian Express, Chennai, with Deputy CM Udhayanidhi Stalin participating." },
  { q: "Who won the 2026 Thiruvalluvar Award (Tamil Nadu Government)?", options: ["A. Arulmozhi", "Mu.Pe. Sathiyavel Muruganaar", "Sindhanaich Selvan", "Nellai Jayanth"], ans: 1, exp: "Mu.Pe. Sathiyavel Muruganaar won the 2026 Thiruvalluvar Award. The 2025 Periyar Award went to A. Arulmozhi." },

  // International Affairs
  { q: "India signed its 22nd Free Trade Agreement with which entity?", options: ["ASEAN", "SAARC", "European Union", "African Union"], ans: 2, exp: "India signed a Free Trade Agreement with the European Union at the 16th India-EU Summit. This is India's 22nd free trade agreement. EU 90% goods duty-free, 93% Indian goods tax-free." },
  { q: "India-Germany signed how many key agreements when PM Modi met Germany PM Scholz?", options: ["10", "15", "19", "25"], ans: 2, exp: "PM Narendra Modi and Germany PM Olaf Scholz signed 19 key agreements covering defense, trade, and technology sectors." },
  { q: "The Weimar Triangle foreign ministers conference in Paris included which countries?", options: ["India, France, Germany", "France, Germany, Poland", "UK, France, Germany", "France, Italy, Germany"], ans: 1, exp: "The Weimar Triangle (formed 1991) includes France, Germany, and Poland. External Affairs Minister S. Jaishankar was the first non-European representative to participate." },
  { q: "India-UAE targeted bilateral trade to reach how much by 2032?", options: ["100 billion USD", "150 billion USD", "200 billion USD", "250 billion USD"], ans: 2, exp: "UAE President Mohammed bin Zayed Al Nahyan and Indian PM Modi agreed to target trade of 200 billion USD by 2032." },
  { q: "The Gaza Peace committee (Amaithi Variyam) is headed by?", options: ["Joe Biden", "Donald Trump", "Ajay Banga", "Tony Blair"], ans: 1, exp: "The Gaza Peace high-level committee (Amaithi Variyam) is headed by US President Donald Trump. Members include World Bank former president Ajay Banga and Britain former PM Tony Blair." },
  { q: "Uganda's Yoweri Museveni won the election with what percentage of votes?", options: ["60.5%", "65%", "71.65%", "75%"], ans: 2, exp: "Yoweri Museveni won Uganda's presidential election with 71.65% of votes for his 7th consecutive term since 1986." },

  // Tamil Nadu Specific
  { q: "What is the current forest coverage of Tamil Nadu as per 2026 data?", options: ["20%", "22%", "24.47%", "26%"], ans: 2, exp: "Tamil Nadu's current forest coverage is 24.47%. From 2021, 25 new forest areas were added covering 135 sq km." },
  { q: "The Namma Arasu WhatsApp service number is?", options: ["78 45 25 2525", "94 44 94 4444", "1800 180 1234", "104"], ans: 0, exp: "Namma Arasu WhatsApp Service number is 78 45 25 2525, providing 51 services from 16 departments including local government and electricity." },
  { q: "Kalingaiyar statue height inaugurated in Vellore/Erode was?", options: ["5 feet", "6 feet", "7 feet", "8 feet"], ans: 2, exp: "A 7-feet tall Kalingaiyar statue was inaugurated in Vellore/Erode by CM Stalin in January 2026." },
  { q: "How many transgender people were ordered to be recruited in Tamil Nadu police?", options: ["25", "50", "75", "100"], ans: 1, exp: "CM Stalin ordered recruitment of 50 transgender people in the police department, ensuring equal opportunities and equal jobs." },
  { q: "The HPV vaccine was launched in Tamil Nadu – how many children in the first phase?", options: ["20,000", "25,000", "30,209", "40,000"], ans: 2, exp: "The HPV vaccine program first phase covered 30,209 children in Dharmapuri, Perambalur, Thiruvannamalai, and Ariyalur districts at a cost of ₹38 crore." },
  { q: "Which Padma Shri winner is a Chennai IIT Director?", options: ["K. Ramasami", "V. Kamakodi", "V. Kamakoti", "Sivasankari"], ans: 2, exp: "V. Kamakoti, Chennai IIT Director, received Padma Shri in the Science and Engineering category representing Tamil Nadu." },
  { q: "Thamirabarani river cleaning study was ordered to whom?", options: ["G.D. Naidu", "Rajendra Singh", "Nilkanth Mishra", "SV Kamat"], ans: 1, exp: "Rajasthan Water Conservation Expert Rajendra Singh was ordered to study the Thamirabarani river cleaning scheme." },
  { q: "The Umagine TN 2026 IT summit was chaired by?", options: ["Udhayanidhi Stalin", "M.K. Stalin", "Thangam Thennarasu", "Anbil Mahesh"], ans: 1, exp: "Umagine TN 2026 IT summit was chaired by CM M.K. Stalin. It involved ₹9,820 crore investment creating 4250 jobs in IT, AI, and space technology." },
  { q: "Kalaignar Dream House Scheme aims to build how many new houses?", options: ["50,000", "75,000", "1 lakh", "2 lakh"], ans: 2, exp: "Kalaignar Dream House Scheme has ₹3500 crore allocated to build 1 lakh new houses for the poor." },
  { q: "Mamallapuram water reservoir will supply how many million liters per day?", options: ["100 million", "140 million", "170 million", "200 million"], ans: 2, exp: "The Mamallapuram water reservoir scheme (₹342.60 crore, Nemam, Sengalpattu) will supply 170 million liters of drinking water per day." },

  // National Affairs
  { q: "India's first Mid-Sea Fish Farm scheme was launched in?", options: ["Kerala", "Tamil Nadu", "Andaman & Nicobar", "Lakshadweep"], ans: 2, exp: "India's first Mid-Sea Fish Farm scheme was launched in Andaman & Nicobar by Union Science Minister Jitendra Singh, involving National Big Fish Technology Institution." },
  { q: "The Suriyur (Tiruchi) stadium inauguration cost was?", options: ["₹1 crore", "₹2 crore", "₹3 crore", "₹5 crore"], ans: 2, exp: "The permanent flood lights stadium in Suriyur, Tiruchi was inaugurated at a cost of ₹3 crore by Deputy CM Udhayanidhi Stalin. It's Tamil Nadu's 2nd such stadium." },
  { q: "India-Pakistan nuclear facility list exchange is done since which year?", options: ["1985", "1988", "1990", "1992"], ans: 1, exp: "India and Pakistan exchange the list of nuclear production facilities annually under a 1988 December 31 agreement, effective from January 1, 1992. This was the 35th year exchange." },
  { q: "How many total Padma Vibhushan were awarded in 2026?", options: ["3", "5", "7", "10"], ans: 1, exp: "5 Padma Vibhushan awards were given in 2026, including to Late VS Achuthanandan, Late KT Thomas, Late Dharmendra, N. Rajam, and P. Narayanan." },
  { q: "Nirmala Sitharaman presented the budget for how many consecutive times in February 2026?", options: ["7th", "8th", "9th", "10th"], ans: 2, exp: "Nirmala Sitharaman presented her 9th consecutive budget in February 2026. She became India's first full-time woman Finance Minister on May 31, 2019." },
  { q: "Morarji Desai holds the record for maximum budget presentations with?", options: ["8", "9", "10", "11"], ans: 2, exp: "Morarji Desai holds the record for presenting 10 budgets. Nirmala Sitharaman equaled P. Chidambaram's record with her presentations." },
  { q: "The Atal Pension Scheme was launched on?", options: ["Jan 1, 2015", "May 9, 2015", "Jun 1, 2015", "Aug 15, 2015"], ans: 1, exp: "The Atal Pension Scheme was launched on May 9, 2015 and has 8.66 crore subscribers. It was extended to 2030-31 by Union Cabinet in January 2026." },
  { q: "India's National Bomb Data Center (NBDC) was inaugurated by?", options: ["Narendra Modi", "Amit Shah", "Rajnath Singh", "Nitin Gadkari"], ans: 1, exp: "NSG (National Security Guard) created the National Bomb Data Center (NBDC), inaugurated by Union Minister Amit Shah for accurate research of all types of explosives." },

  // China & World Economy
  { q: "China's birth rate in 2025 was?", options: ["3.5%", "4.5%", "5.63%", "6.5%"], ans: 2, exp: "China's birth rate in 2025 was 5.63% – historically the lowest ever. Children born: 79.2 lakh (17% decline). Population: 140.4 crore." },
  { q: "China surpassed India in which agricultural production in 2024-25?", options: ["Wheat", "Rice", "Sugarcane", "Cotton"], ans: 1, exp: "China became the world's largest rice producing country in 2024-25 with 145.28 million tons, surpassing India's 150.18 million tons (India still slightly ahead). G.D. Naidu was mentioned in this context." },
  { q: "World's overall economic growth in the current fiscal year is?", options: ["1.5%", "2.7%", "3.5%", "4%"], ans: 1, exp: "World's overall economic growth in the current fiscal year is 2.7% as per UN/World Economic Forum data." },

  // History & Anniversaries
  { q: "DRDO Day is celebrated on January 1 because DRDO was founded in?", options: ["1947", "1950", "1958", "1965"], ans: 2, exp: "DRDO (Defence Research and Development Organisation) was founded on January 1, 1958. Hence DRDO Day is celebrated on January 1." },
  { q: "Somnath Temple was reopened in which year?", options: ["1947", "1951", "1956", "1960"], ans: 1, exp: "Somnath Temple was reopened on May 11, 1951 by President Rajendra Prasad after being rebuilt. The 1026 Ghazni attack had destroyed it. 2026 marks its 75th reopening anniversary and 1000-year milestone." },
  { q: "The New START treaty between USA-Russia allowed how many nuclear weapons?", options: ["1000", "1550", "2000", "500"], ans: 1, exp: "The New START (2010) treaty allowed USA and Russia to keep only 1550 nuclear weapons each. The treaty expired on February 5, 2026." },
  { q: "Mooknayak Marathi newspaper was launched by Ambedkar in?", options: ["1918", "1920", "1925", "1930"], ans: 1, exp: "Mooknayak Marathi newspaper was launched by Dr. B.R. Ambedkar on January 31, 1920 as a voice for oppressed people and social justice." },
  { q: "Parakram Diwas (Jan 23) marks which birth anniversary of Netaji Subhas Chandra Bose in 2026?", options: ["125th", "127th", "129th", "130th"], ans: 2, exp: "Parakram Diwas 2026 (Jan 23) marks Netaji Subhas Chandra Bose's 129th Birth Anniversary." },
  { q: "African National Congress was founded in which year? (ANC Foundation Day – Jan 8)", options: ["1910", "1912", "1920", "1930"], ans: 1, exp: "The African National Congress (ANC) was founded in 1912. ANC Foundation Day is celebrated on January 8." },
  { q: "Earth's Rotation Day (Jan 8) marks the discovery year?", options: ["1845", "1851", "1858", "1865"], ans: 1, exp: "Earth's Rotation Day is celebrated on January 8, 1851, marking the year Leon Foucault demonstrated Earth's rotation using his pendulum." },

  // Infrastructure
  { q: "The Metro Rail construction target mentioned in Budget Session 2026 is?", options: ["500 km", "750 km", "1000 km", "1500 km"], ans: 2, exp: "Budget Session 2026 mentioned Metro Rail construction of 1000 km – world's largest metro construction project." },
  { q: "The Nashik-Solapur Akkal Kot green highway project cost is?", options: ["₹10,000 crore", "₹15,000 crore", "₹19,142 crore", "₹25,000 crore"], ans: 2, exp: "The Nashik-Solapur's Akkal Kot 6-lane green highway project was approved for ₹19,142 crore by the Union Cabinet." },
  { q: "The Chennai-Surat high-speed corridor length is?", options: ["250 km", "300 km", "374 km", "400 km"], ans: 2, exp: "The South India connectivity high-speed corridor between Chennai and Surat is 374 km long, approved by Union Cabinet." },
  { q: "India's first Vande Bharat sleeper operating speed between Kolkata-Guwahati is?", options: ["100-110 km/h", "110-120 km/h", "120-130 km/h", "130-140 km/h"], ans: 2, exp: "The first Vande Bharat sleeper train between West Bengal (Kolkata) and Assam (Guwahati) operates at 120-130 km/h speed with 16 coaches and 823 passengers capacity." },

  // Sunita Williams
  { q: "Astronaut Sunita Williams was born on?", options: ["Sep 19, 1960", "Sep 19, 1965", "Sep 19, 1970", "Sep 19, 1975"], ans: 1, exp: "Sunita Williams, Indian descent US astronaut, was born on September 19, 1965 in America." },
  { q: "How many total days has Sunita Williams spent in space?", options: ["400 days", "500 days", "608 days", "700 days"], ans: 2, exp: "Sunita Williams has spent a total of 608 days in space over 27 years of work, setting a record." },
  { q: "Sunita Williams became the first to do what in space?", options: ["First spacewalk", "First marathon runner in space", "First woman pilot", "First Indian in space"], ans: 1, exp: "Sunita Williams became the first marathon runner in space, completing a space marathon in 62 hours and 6 minutes spacewalk." },

  // Misc
  { q: "G.D. Naidu's digital library website is?", options: ["https://gdnaidu.gov.in", "https://tamildigitallibrary.in/gdn", "https://gdn.tn.gov.in", "https://naidu.library.in"], ans: 1, exp: "G.D. Naidu's rare documents digital library is available at https://tamildigitallibrary.in/gdn, containing articles, biography, books, and photos." },
  { q: "TAPS (Tamil Nadu Assured Pension Scheme) is for employees who joined after?", options: ["1.1.2000", "1.4.2002", "1.4.2004", "1.1.2006"], ans: 2, exp: "TAPS (Tamil Nadu Assured Pension Scheme) is for employees who joined government service after April 1, 2004." },
  { q: "The 49th Chennai Book Fair Best Seller award was won by?", options: ["Kumaran", "Sivaguru Publishing", "M. Murugesan", "J. Deepa"], ans: 1, exp: "Sivaguru Publishing won the Best Seller award at the 49th Chennai Book Fair. Best Publisher was Kumaran (Indira Publishing)." },
  { q: "India's Kaziranga overpass scheme (National Highway 715) length is?", options: ["20 km", "27 km", "34 km", "40 km"], ans: 2, exp: "National Highway 715 – Kaziranga overpass scheme is 34 km long, costing ₹6957 crore, inaugurated by PM Modi to protect wildlife." },
  { q: "The new US-India Free Trade Agreement – what percentage of EU goods are duty-free to India?", options: ["75%", "80%", "90%", "95%"], ans: 2, exp: "Under the India-EU Free Trade Agreement signed at the 16th India-EU Summit, 90% of EU goods are duty-free in India, and 93% of Indian goods are tax-free in EU." },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("notes");
  const [expandedDate, setExpandedDate] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [quizDone, setQuizDone] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [filter, setFilter] = useState("");

  const filtered = notesData.filter(d =>
    filter === "" || d.date.toLowerCase().includes(filter.toLowerCase()) ||
    d.topics.some(t => t.title.toLowerCase().includes(filter.toLowerCase()) ||
      t.points.some(p => p.toLowerCase().includes(filter.toLowerCase())))
  );

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setShowExp(true);
    if (i === quizData[currentQ].ans) setScore(s => s + 1);
    setAnswered(a => [...a, { q: currentQ, sel: i, correct: i === quizData[currentQ].ans }]);
  };

  const nextQ = () => {
    if (currentQ + 1 >= quizData.length) { setQuizDone(true); return; }
    setCurrentQ(q => q + 1);
    setSelected(null);
    setShowExp(false);
  };

  const restartQuiz = () => {
    setCurrentQ(0); setSelected(null); setScore(0);
    setAnswered([]); setQuizDone(false); setShowExp(false); setQuizStarted(false);
  };

  const toggleTopic = (dateIdx, topicIdx) => {
    const key = `${dateIdx}-${topicIdx}`;
    setExpandedTopic(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const pct = Math.round((score / quizData.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", fontFamily: "'Segoe UI', sans-serif", color: "#fff" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(90deg, #b8860b, #daa520, #b8860b)", padding: "20px 24px", textAlign: "center", boxShadow: "0 4px 20px rgba(218,165,32,0.4)" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#1a1a1a", fontWeight: 700, marginBottom: 4 }}>TAF IAS Academy</div>
        <h1 style={{ margin: 0, fontSize: "clamp(18px, 4vw, 28px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: 1 }}>📚 January 2026 Current Affairs</h1>
        <div style={{ fontSize: "12px", color: "#2c2c2c", marginTop: 6, fontWeight: 600 }}>UPSC · TNPSC · Police · Railway · SSC · TET · TRB</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, padding: "20px 16px 0" }}>
        {[
          { id: "notes", label: "📖 Notes", count: notesData.length + " days" },
          { id: "quiz", label: "🎯 Quiz", count: quizData.length + " Qs" }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "12px 28px", borderRadius: "50px", border: "none", cursor: "pointer",
              background: activeTab === tab.id ? "linear-gradient(135deg, #daa520, #b8860b)" : "rgba(255,255,255,0.1)",
              color: activeTab === tab.id ? "#1a1a1a" : "#ddd",
              fontWeight: 700, fontSize: "15px", transition: "all 0.3s",
              boxShadow: activeTab === tab.id ? "0 4px 15px rgba(218,165,32,0.5)" : "none"
            }}>
            {tab.label} <span style={{ fontSize: "11px", opacity: 0.8, marginLeft: 4 }}>({tab.count})</span>
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px 60px" }}>
        {/* NOTES TAB */}
        {activeTab === "notes" && (
          <div>
            <div style={{ marginBottom: 20, position: "relative" }}>
              <input
                placeholder="🔍 Search topics, events, names..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{
                  width: "100%", padding: "14px 20px", borderRadius: "12px",
                  border: "1px solid rgba(218,165,32,0.4)", background: "rgba(255,255,255,0.08)",
                  color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box",
                  backdropFilter: "blur(10px)"
                }}
              />
            </div>

            <div style={{ marginBottom: 12, color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
              Showing {filtered.length} of {notesData.length} dates · Click to expand
            </div>

            {filtered.map((day, di) => (
              <div key={di} style={{
                marginBottom: 16, borderRadius: 16, overflow: "hidden",
                border: `1px solid ${day.color}44`, background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(10px)"
              }}>
                <div
                  onClick={() => setExpandedDate(expandedDate === di ? null : di)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "16px 20px", cursor: "pointer",
                    background: `linear-gradient(135deg, ${day.color}22, ${day.color}11)`,
                    borderBottom: expandedDate === di ? `1px solid ${day.color}44` : "none"
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: day.color, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "13px", fontWeight: 900,
                      color: "#fff", flexShrink: 0, boxShadow: `0 0 12px ${day.color}66`
                    }}>
                      {day.date.split(" ")[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "16px", color: "#fff" }}>{day.date}</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: 2 }}>
                        {day.topics.length} topics · {day.topics.reduce((a, t) => a + t.points.length, 0)} points
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: "20px", transition: "transform 0.3s", transform: expandedDate === di ? "rotate(180deg)" : "none", color: day.color }}>▼</div>
                </div>

                {expandedDate === di && (
                  <div style={{ padding: "12px 16px 16px" }}>
                    {day.topics.map((topic, ti) => {
                      const key = `${di}-${ti}`;
                      const open = expandedTopic[key];
                      return (
                        <div key={ti} style={{ marginBottom: 10, borderRadius: 10, overflow: "hidden", border: `1px solid ${day.color}33` }}>
                          <div
                            onClick={() => toggleTopic(di, ti)}
                            style={{
                              padding: "10px 16px", cursor: "pointer", display: "flex",
                              justifyContent: "space-between", alignItems: "center",
                              background: open ? `${day.color}22` : "rgba(255,255,255,0.03)",
                              transition: "background 0.3s"
                            }}>
                            <span style={{ fontWeight: 700, fontSize: "14px", color: day.color }}>{topic.title}</span>
                            <span style={{ color: day.color, fontSize: "14px" }}>{open ? "−" : "+"}</span>
                          </div>
                          {open && (
                            <div style={{ padding: "10px 16px 14px", background: "rgba(0,0,0,0.2)" }}>
                              {topic.points.map((pt, pi) => (
                                <div key={pi} style={{
                                  display: "flex", gap: 10, padding: "6px 0",
                                  borderBottom: pi < topic.points.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                                  alignItems: "flex-start"
                                }}>
                                  <span style={{ color: day.color, flexShrink: 0, marginTop: 2, fontSize: "10px" }}>◆</span>
                                  <span style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.88)" }}>{pt}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* QUIZ TAB */}
        {activeTab === "quiz" && !quizStarted && !quizDone && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "80px", marginBottom: 20 }}>🎯</div>
            <h2 style={{ fontSize: "28px", fontWeight: 900, marginBottom: 12, background: "linear-gradient(135deg, #daa520, #fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              January 2026 Quiz
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>Test your knowledge with</p>
            <div style={{ fontSize: "48px", fontWeight: 900, color: "#daa520", marginBottom: 8 }}>{quizData.length}</div>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 32 }}>carefully crafted questions from all topics</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
              {["Defense & Science", "Sports", "Awards", "Economy", "Appointments", "International Affairs"].map(c => (
                <span key={c} style={{ padding: "6px 14px", borderRadius: "20px", background: "rgba(218,165,32,0.2)", border: "1px solid rgba(218,165,32,0.4)", fontSize: "12px", color: "#daa520" }}>{c}</span>
              ))}
            </div>
            <button onClick={() => setQuizStarted(true)}
              style={{
                padding: "16px 48px", borderRadius: "50px", border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #daa520, #b8860b)", color: "#1a1a1a",
                fontSize: "18px", fontWeight: 900, boxShadow: "0 8px 30px rgba(218,165,32,0.4)",
                transition: "transform 0.2s"
              }}>
              Start Quiz →
            </button>
          </div>
        )}

        {activeTab === "quiz" && quizStarted && !quizDone && (
          <div>
            {/* Progress */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                <span>Question {currentQ + 1} of {quizData.length}</span>
                <span>Score: {score}/{currentQ + (selected !== null ? 1 : 0)}</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3 }}>
                <div style={{
                  height: "100%", borderRadius: 3,
                  background: "linear-gradient(90deg, #daa520, #b8860b)",
                  width: `${((currentQ + 1) / quizData.length) * 100}%`,
                  transition: "width 0.3s"
                }} />
              </div>
            </div>

            {/* Question Card */}
            <div style={{
              background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "28px 24px",
              marginBottom: 20, border: "1px solid rgba(218,165,32,0.3)", backdropFilter: "blur(10px)"
            }}>
              <div style={{ fontSize: "12px", color: "#daa520", marginBottom: 12, letterSpacing: 2, textTransform: "uppercase" }}>Question {currentQ + 1}</div>
              <h3 style={{ fontSize: "clamp(15px, 3vw, 18px)", lineHeight: 1.6, fontWeight: 700, color: "#fff", margin: 0 }}>
                {quizData[currentQ].q}
              </h3>
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {quizData[currentQ].options.map((opt, i) => {
                let bg = "rgba(255,255,255,0.06)";
                let border = "1px solid rgba(255,255,255,0.12)";
                let color = "#fff";
                if (selected !== null) {
                  if (i === quizData[currentQ].ans) { bg = "rgba(39,174,96,0.25)"; border = "1px solid #27ae60"; color = "#2ecc71"; }
                  else if (i === selected && i !== quizData[currentQ].ans) { bg = "rgba(231,76,60,0.25)"; border = "1px solid #e74c3c"; color = "#e74c3c"; }
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)}
                    style={{
                      padding: "16px 20px", borderRadius: 12, border, background: bg, color,
                      textAlign: "left", cursor: selected !== null ? "default" : "pointer",
                      fontSize: "14px", fontWeight: 500, lineHeight: 1.5, transition: "all 0.3s",
                      display: "flex", alignItems: "center", gap: 12
                    }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                      background: selected !== null && i === quizData[currentQ].ans ? "#27ae60" :
                        selected !== null && i === selected ? "#e74c3c" : "rgba(255,255,255,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: 800, color: "#fff"
                    }}>
                      {selected !== null && i === quizData[currentQ].ans ? "✓" :
                        selected !== null && i === selected ? "✗" : "ABCD"[i]}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExp && (
              <div style={{
                background: "rgba(52,152,219,0.15)", border: "1px solid rgba(52,152,219,0.4)",
                borderRadius: 12, padding: "16px 20px", marginBottom: 20
              }}>
                <div style={{ fontSize: "12px", color: "#3498db", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>💡 EXPLANATION</div>
                <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.85)" }}>
                  {quizData[currentQ].exp}
                </p>
              </div>
            )}

            {selected !== null && (
              <button onClick={nextQ}
                style={{
                  width: "100%", padding: "16px", borderRadius: 12, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #daa520, #b8860b)", color: "#1a1a1a",
                  fontSize: "16px", fontWeight: 900, boxShadow: "0 4px 15px rgba(218,165,32,0.4)"
                }}>
                {currentQ + 1 >= quizData.length ? "See Results 🏆" : "Next Question →"}
              </button>
            )}
          </div>
        )}

        {/* Quiz Done */}
        {activeTab === "quiz" && quizDone && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "80px", marginBottom: 16 }}>
              {pct >= 80 ? "🏆" : pct >= 60 ? "🥈" : pct >= 40 ? "🥉" : "📚"}
            </div>
            <h2 style={{ fontSize: "32px", fontWeight: 900, marginBottom: 8, background: "linear-gradient(135deg, #daa520, #fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {pct >= 80 ? "Excellent!" : pct >= 60 ? "Good Job!" : pct >= 40 ? "Keep Practicing!" : "Need More Study!"}
            </h2>
            <div style={{
              display: "inline-block", padding: "24px 48px", borderRadius: 20,
              background: "rgba(218,165,32,0.15)", border: "2px solid rgba(218,165,32,0.5)", marginBottom: 32
            }}>
              <div style={{ fontSize: "64px", fontWeight: 900, color: "#daa520" }}>{pct}%</div>
              <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)" }}>{score} / {quizData.length} correct</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
              {answered.slice(-10).map((a, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", padding: "8px 16px",
                  background: a.correct ? "rgba(39,174,96,0.15)" : "rgba(231,76,60,0.15)",
                  borderRadius: 8, fontSize: "12px", color: a.correct ? "#2ecc71" : "#e74c3c"
                }}>
                  <span>Q{quizData.length - 10 + i + 1}: {quizData[a.q].q.substring(0, 40)}...</span>
                  <span>{a.correct ? "✓" : "✗"}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={restartQuiz}
                style={{
                  padding: "14px 36px", borderRadius: "50px", border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #daa520, #b8860b)", color: "#1a1a1a",
                  fontSize: "16px", fontWeight: 900
                }}>
                🔄 Try Again
              </button>
              <button onClick={() => { setActiveTab("notes"); restartQuiz(); }}
                style={{
                  padding: "14px 36px", borderRadius: "50px", cursor: "pointer",
                  background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "16px",
                  fontWeight: 700, border: "1px solid rgba(255,255,255,0.2)"
                }}>
                📖 Review Notes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
