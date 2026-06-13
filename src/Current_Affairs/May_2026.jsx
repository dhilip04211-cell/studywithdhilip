import React, { useState } from "react";

const QUESTIONS = [
  {
    q: "When is International Labour Day observed?",
    options: ["April 01", "August 01", "May 01", "June 01"],
    answer: 2,
  },
  {
    q: "Examine the following statements:\n1) In the 2025-26 financial year, Tamil Nadu recorded an economic growth of 10.83%.\n2) The per capita income of Tamil Nadu has currently risen to ₹5.08 lakhs.\n3) The Gross State Domestic Product (GSDP) of Tamil Nadu has increased to ₹35.29 lakh crore.",
    options: ["All are correct", "1, 3 are correct; 2 is wrong", "2, 3 are correct; 1 is wrong", "1, 2 are correct; 3 is wrong"],
    answer: 1,
  },
  {
    q: "In which year was the Ayushman Bharat health insurance scheme launched?",
    options: ["2018", "2016", "2014", "2020"],
    answer: 0,
  },
  {
    q: "Examine the following statements:\n1) In 2025, marine fish production in India increased to 35.7 lakh tonnes.\n2) Tamil Nadu has secured the first position by surpassing Kerala with a fish production of 6.85 lakh tonnes.\n3) Gujarat holds the 3rd position with a fish production of 6.24 lakh tonnes.",
    options: ["3 is correct; 1 and 2 are wrong", "All are correct", "1 is correct; 2 and 3 are wrong", "2 is correct; 1 and 3 are wrong"],
    answer: 2,
  },
  {
    q: "When is International Jazz Day observed?",
    options: ["April 28", "April 27", "April 30", "April 29"],
    answer: 3,
  },
  {
    q: "Which country has returned 657 ancient artifacts stolen from India, valued at ₹133 crore?",
    options: ["France", "Russia", "Britain", "USA"],
    answer: 3,
  },
  {
    q: "When is Ayushman Bharat Diwas observed?",
    options: ["April 30", "April 28", "April 26", "April 24"],
    answer: 0,
  },
  {
    q: "Statement 1: Prime Minister Narendra Modi flagged off a Vande Bharat train service with 20 coaches between Jammu and Srinagar.\nStatement 2: This is the first direct train service connecting the twin capitals of Jammu and Kashmir, Jammu and Srinagar.",
    options: ["Only 1 is wrong", "Only 2 is wrong", "Both are correct", "Both are wrong"],
    answer: 2,
  },
  {
    q: "Where will the 23rd Commonwealth Games be held in 2026?",
    options: ["Dhaka", "Glasgow", "Tokyo", "Ahmedabad"],
    answer: 1,
  },
  {
    q: "Who won the title at the 2026 IBSF World Billiards Championship?",
    options: ["Johann Chua", "Carlo Biado", "Sourav Kothari", "Pankaj Advani"],
    answer: 3,
  },
  {
    q: "When is Maharashtra State Formation Day observed?",
    options: ["May 04", "May 01", "May 02", "May 03"],
    answer: 1,
  },
  {
    q: "Statement 1: Multilingual Artificial Intelligence-based police services have been introduced for the first time in the country in Bengaluru.\nStatement 2: This project is called the \"Namma 112\" project.",
    options: ["Only 2 is correct", "Both are wrong", "Only 1 is correct", "Both are correct"],
    answer: 3,
  },
  {
    q: "When is Gujarat State Formation Day observed?",
    options: ["May 02", "April 28", "April 30", "May 01"],
    answer: 3,
  },
  {
    q: "Which country has provided full tax exemption until April 30, 2028, for import goods from 20 African countries with which it has smooth diplomatic relations?",
    options: ["Australia", "China", "India", "USA"],
    answer: 2,
  },
  {
    q: "In which year was the states of Maharashtra and Gujarat created?",
    options: ["1960", "1956", "1949", "1953"],
    answer: 0,
  },
  {
    q: "Who is the author of the book 'The Curious and the Classified'?",
    options: ["M.M. Naravane", "Upendra Dwivedi", "Anil Chauhan", "K. Vijay Kumar"],
    answer: 3,
  },
  {
    q: "What is the free helpline number introduced for the 2027 Population Census?",
    options: ["1558", "1855", "1955", "1585"],
    answer: 2,
  },
  {
    q: "Examine the following statements:\nStatement 1: Shekha Lake has been selected as India's 99th Ramsar site.\nStatement 2: This lake is located in Rajasthan.",
    options: ["Both are correct", "Both are incorrect", "Only 2 is incorrect", "Only 1 is incorrect"],
    answer: 0,
  },
  {
    q: "When is World Tuna Day observed?",
    options: ["April 02", "July 02", "May 02", "June 02"],
    answer: 2,
  },
  {
    q: "Examine the following statements:\n1) In April 2026, GST collection reached ₹2.43 lakh crore.\n2) This is the highest GST amount collected in a single month.\n3) GST was introduced in India on April 1, 2017.",
    options: ["1 is incorrect; 2 and 3 are correct", "2 is incorrect; 1 and 3 are correct", "All are correct", "3 is incorrect; 1 and 2 are correct"],
    answer: 2,
  },
  {
    q: "Examine the following statements:\nStatement 1: India's first multi-lane free-flow toll system has been launched in Gujarat.\nStatement 2: This Choryasi toll plaza is located on the Surat-Bharuch National Highway 48 route.",
    options: ["Only 2 is correct", "Both are correct", "Both are incorrect", "Only 1 is correct"],
    answer: 1,
  },
  {
    q: "When is International Scurvy Awareness Day observed?",
    options: ["May 03", "April 04", "March 02", "May 02"],
    answer: 3,
  },
  {
    q: "Which state has the highest number of Ramsar sites in India?",
    options: ["Rajasthan", "Kerala", "Tamil Nadu", "Uttar Pradesh"],
    answer: 3,
  },
  {
    q: "In which state is the Shekha Lake Bird Sanctuary located?",
    options: ["Madhya Pradesh", "Uttarakhand", "Sikkim", "Uttar Pradesh"],
    answer: 0,
  },
  {
    q: "When was International Drone Day 2026 observed?",
    options: ["May 02", "May 03", "May 04", "April 05"],
    answer: 0,
  },
  {
    q: "What was India's position in the badminton Thomas Cup 2026?",
    options: ["4th place", "3rd place", "2nd place", "1st place"],
    answer: 1,
  },
  {
    q: "Who won the 2026 Miami Open Men's Singles title?",
    options: ["Jannik Sinner", "Carlos Alcaraz", "Novak Djokovic", "Alexander Zverev"],
    answer: 1,
  },
  {
    q: "Consider the statements:\n1. The world's first \"OptoSAR\" satellite launched by ISRO\n2. The world's first \"OptoSAR\" satellite name is Vikram.\n3. This satellite was launched to know about the origin of the Earth.",
    options: ["1, 2 correct, 3 incorrect", "2, 3 correct, 1 incorrect", "1, 3 correct, 2 incorrect", "All are correct"],
    answer: 2,
  },
  {
    q: "World Press Freedom Day is observed annually on?",
    options: ["May 05", "May 06", "May 03", "May 04"],
    answer: 2,
  },
  {
    q: "Statement 1: The world's first \"OptoSAR\" satellite name is Drishti.\nStatement 2: Developed by Indian space-tech startup Galax Eye, Bengaluru.",
    options: ["1 only correct", "2 only correct", "Both are correct", "Both are incorrect"],
    answer: 2,
  },
  {
    q: "Statement 1: Rohit Jain has been appointed as a new Deputy Governor of the Reserve Bank of India.\nStatement 2: According to the Reserve Bank of India Act, 1944, RBI should have five Deputy Governors.",
    options: ["2 only incorrect", "1 only incorrect", "Both are incorrect", "Both are correct"],
    answer: 3,
  },
  {
    q: "Who is appointed as the new Chairman of Prasar Bharati?",
    options: ["J. Swaminathan", "S.C. Murmu", "Prasoon Joshi", "Poonam Gupta"],
    answer: 0,
  },
  {
    q: "Statement 1: Sea shells, beads, Pit-dwellings were founded in Coimbatore district Molampalayam.\nStatement 2: They are previous to Keezhadi.",
    options: ["2 only correct", "Both are correct", "Both are incorrect", "1 only correct"],
    answer: 1,
  },
  {
    q: "International Cheetah Day is celebrated annually on?",
    options: ["May 02", "May 06", "May 05", "May 03"],
    answer: 0,
  },
  {
    q: "Statement 1: The Indian government launched an indigenous Cell Broadcast Alert System to send real-time, geo-targeted disaster alerts directly to mobile phones.\nStatement 2: People will get alerts without internet.",
    options: ["Both are incorrect", "1 only correct", "2 only correct", "Both are correct"],
    answer: 3,
  },
  {
    q: "Who won the women's category at the 2026 Madrid Open tennis tournament?",
    options: ["Naomi Osaka", "Marta Kostyuk", "Mirra Andreeva", "Iga Świątek"],
    answer: 2,
  },
  {
    q: "When was World Asthma Day observed in 2026?",
    options: ["May 04", "May 03", "May 06", "May 05"],
    answer: 3,
  },
  {
    q: "Examine the following statements:\n1) The Pulitzer Prize is awarded annually by Columbia University in the United States.\n2) An awareness cartoon series titled \"trapped\" was released in a leading media outlet regarding Digital Arrest scams.\n3) Anand RK, Suparna Sharma, and Natalie Obiko Pearson from Japan have been announced as Pulitzer Prize winners for this work.",
    options: ["All are correct", "1, 2 correct, 3 incorrect", "2, 3 correct, 1 incorrect", "3, 1 correct, 2 incorrect"],
    answer: 1,
  },
  {
    q: "DIVEX 2026 is a joint naval exercise between which two countries?",
    options: ["India & France", "India & Australia", "India & Japan", "India & Sri Lanka"],
    answer: 3,
  },
  {
    q: "When was World Laughter Day observed in 2026?",
    options: ["May 03", "May 04", "May 05", "May 02"],
    answer: 2,
  },
  {
    q: "Where was the DIVEX 2026 joint naval exercise held?",
    options: ["Tokyo", "Paris", "Colombo", "Andaman"],
    answer: 2,
  },
  {
    q: "Examine the statements:\nStatement 1: In the full financial year 2025-26, a net direct tax of ₹23.40 lakh crore has been collected in the country.\nStatement 2: Net direct tax collection has currently increased by 6.12% compared to the previous financial year (2024-25).",
    options: ["1 only is incorrect", "2 only is incorrect", "Both are incorrect", "Both are correct"],
    answer: 3,
  },
  {
    q: "When is International Firefighters' Day observed?",
    options: ["May 04", "May 02", "May 06", "May 05"],
    answer: 0,
  },
  {
    q: "Who has been awarded the 2026 Sukumar Azhikode National Award?",
    options: ["Romila Thapar & Medha Patkar", "Perumal Murugan & Aravind Adiga", "Ramachandra Guha & Aravind Adiga", "Medha Patkar & Perumal Murugan"],
    answer: 3,
  },
  {
    q: "When is Coal Miners' Day observed?",
    options: ["May 03", "May 02", "May 04", "May 05"],
    answer: 2,
  },
  {
    q: "Who secured first place in the 2026 Miami Grand Prix F1 car race?",
    options: ["Lando Norris", "Oscar Piastri", "Lewis Hamilton", "Kimi Antonelli"],
    answer: 1,
  },
  {
    q: "When is African World Heritage Day observed?",
    options: ["May 04", "May 05", "May 03", "May 08"],
    answer: 1,
  },
  {
    q: "Examine the statements:\nStatement 1: India has emerged as the country receiving the highest amount of remittances (money sent from abroad) in the world.\nStatement 2: In the year 2024, individuals who went to work in other countries from India sent ₹10.8 lakh crore back to their homeland.",
    options: ["1 only is correct", "2 only is correct", "Both are correct", "Both are incorrect"],
    answer: 2,
  },
  {
    q: "When is World Portuguese Language Day observed?",
    options: ["May 05", "May 06", "May 07", "May 02"],
    answer: 0,
  },
  {
    q: "Examine the statements:\nStatement 1: In the year 2024, Saudi Arabia stands as the top country globally in the list of countries sending the most money abroad, with ₹9.4 lakh crore.\nStatement 2: The next positions are held by the USA, Switzerland, and Germany.",
    options: ["Both are correct", "1 only is correct", "Both are incorrect", "2 only is correct"],
    answer: 0,
  },
  {
    q: "When is World Hand Hygiene Day observed?",
    options: ["May 02", "May 04", "May 05", "May 06"],
    answer: 2,
  },
  {
    q: "Examine the statements:\nStatement 1: The Union Cabinet has approved increasing the sanctioned strength of judges in the Supreme Court from 34 to 38.\nStatement 2: When the Supreme Court (Number of Judges) Act was enacted in 1956, the total number of judges in the Supreme Court, excluding the Chief Justice, was fixed at only 10.",
    options: ["Both are incorrect", "Both are correct", "1 only is correct", "2 only is correct"],
    answer: 1,
  },
  {
    q: "When is International Day of the Midwife observed?",
    options: ["May 02", "May 01", "May 05", "May 04"],
    answer: 1,
  },
  {
    q: "Examine the statements:\nStatement 1: The Union Cabinet has approved the creation of 2 more semiconductor manufacturing centers with an investment of ₹3936 crore.\nStatement 2: These 2 manufacturing centers are to be located in Uttar Pradesh.",
    options: ["Both are correct", "Both are incorrect", "1 only is incorrect", "2 only is incorrect"],
    answer: 3,
  },
  {
    q: "On which day is International No Diet Day observed?",
    options: ["May 04", "May 06", "May 08", "May 02"],
    answer: 1,
  },
  {
    q: "Statement 1: World Migratory Bird Day 2026 is celebrated on May 9.\nStatement 2: This day was celebrated on second Friday of May and October month.",
    options: ["1 only correct", "2 only correct", "Both are correct", "Both are incorrect"],
    answer: 1,
  },
  {
    q: "World Fair Trade Day is celebrated on?",
    options: ["May 06", "May 04", "May 09", "May 08"],
    answer: 2,
  },
  {
    q: "Statement 1: North Korea officially revised its constitution.\nStatement 2: According to this, President Kim Jong Un is now explicitly designated as the \"Head of State.\"",
    options: ["Both are incorrect", "1 only correct", "2 only correct", "Both are correct"],
    answer: 3,
  },
  {
    q: "The Border Roads Organisation (BRO) celebrates its Raising Day on?",
    options: ["May 08", "May 09", "May 06", "May 07"],
    answer: 3,
  },
  {
    q: "Statement 1: The 16th Tamil Nadu Legislative Assembly was officially dissolved by Governor R.N Ravi.\nStatement 2: The tenure of 16th Tamil Nadu Legislative Assembly was ended on May 10.",
    options: ["Both are correct", "Both are incorrect", "2 only correct", "1 only correct"],
    answer: 0,
  },
  {
    q: "World Red Cross and Red Crescent Day is observed annually on?",
    options: ["May 02", "May 08", "May 07", "May 09"],
    answer: 1,
  },
  {
    q: "Statement 1: Following the official visit of Bhutan's president To Lam to India, 13 agreements were signed.\nStatement 2: India and Bhutan have formalized a roadmap to increase bilateral trade to $25 billion by 2030.",
    options: ["2 only correct", "Both are incorrect", "Both are correct", "1 only correct"],
    answer: 2,
  },
  {
    q: "Which is India's first space-tech unicorn?",
    options: ["Skyroot Aerospace", "Agnikul Cosmos", "Mahindra Aerospace", "Dynamatic Technologies"],
    answer: 0,
  },
  {
    q: "World Thalassemia Day is observed annually on?",
    options: ["May 09", "May 10", "May 06", "May 08"],
    answer: 1,
  },
  {
    q: "Hanta virus is primarily spread by?",
    options: ["Mouse", "Bat", "Dog", "Cat"],
    answer: 0,
  },
  {
    q: "Bangladesh government requested ___________ involvement and support for the Teesta River restoration.",
    options: ["India", "Nepal", "Pakistan", "China"],
    answer: 3,
  },
  {
    q: "India's first dedicated Government Special Child Care Institution (GSCCI) within a prison was launched in?",
    options: ["Ahmadabad", "Bengaluru", "Chennai", "New Delhi"],
    answer: 2,
  },
  {
    q: "Statement 1: DRDO successfully conducted the maiden flight-trial of the TARA weapon system in Andaman.\nStatement 2: TARA means TACTICAL ADVANCED RANGE AUGMENTATION.",
    options: ["Both are correct", "Both are incorrect", "2 only correct", "1 only correct"],
    answer: 0,
  },
  {
    q: "World Athletics Day was observed on?",
    options: ["May 05", "May 04", "May 07", "May 08"],
    answer: 0,
  },
  {
    q: "Statement 1: The Association of Southeast Asian Nations (ASEAN) Summit 2026 held in Philippines.\nStatement 2: ASEAN organization established in 1987.",
    options: ["2 only incorrect", "1 only incorrect", "Both are incorrect", "Both are correct"],
    answer: 0,
  },
  {
    q: "Which state has been declared India's first fully paperless judiciary?",
    options: ["Rajasthan", "Sikkim", "Kerala", "Punjab"],
    answer: 1,
  },
  {
    q: "World Password Day, 2026 observed on?",
    options: ["May 09", "May 10", "May 07", "May 08"],
    answer: 2,
  },
  {
    q: "Janani digital portal is related to?",
    options: ["Third gender", "Senior citizen", "Maternal and child healthcare", "Persons with disabilities"],
    answer: 2,
  },
  {
    q: "In the recently concluded 2026 West Bengal Legislative Assembly election, voting was conducted for the ____ Assembly.",
    options: ["20th", "16th", "22nd", "18th"],
    answer: 3,
  },
  {
    q: "The Border Roads Organisation (BRO) was formed in India on?",
    options: ["May 07, 1960", "May 07, 1962", "May 07, 1950", "May 07, 1958"],
    answer: 1,
  },
  {
    q: "Statement 1: India observes National Technology Day on 11 May each year.\nStatement 2: The day commemorates India's successful nuclear tests Operation Shakti conducted on this date in 1999.",
    options: ["Both are incorrect", "1 only correct", "2 only correct", "Both are correct"],
    answer: 3,
  },
  {
    q: "Who won the bronze medal in the men's individual compound event at the Archery World Cup 2026 in China?",
    options: ["Sahil Jadhav", "Abhishek Verma", "Atanu Das", "Tarundeep Rai"],
    answer: 1,
  },
  {
    q: "Statement 1: Prime Minister Narendra Modi inaugurated India's first functional PM MITRA Park in Warangal, Karnataka, with total cost of ₹1,695 crore.\nStatement 2: The park has attracted over ₹6,000 crore expected investment in India's textile department development.",
    options: ["2 only incorrect", "Both are incorrect", "Both are correct", "1 only incorrect"],
    answer: 3,
  },
  {
    q: "World Lupus Day is observed globally every year on?",
    options: ["May 07", "May 11", "May 10", "May 09"],
    answer: 1,
  },
  {
    q: "Statement 1: India successfully flight-tested an advanced Agni missile equipped with MIRV technology from Odisha.\nStatement 2: MIRV allows one missile to deliver multiple warheads to different locations.",
    options: ["2 only correct", "Both are correct", "Both are incorrect", "1 only correct"],
    answer: 1,
  },
  {
    q: "Statement 1: N.S. Raja Subramani has been appointed as India's 3rd Chief of Defence Staff.\nStatement 2: Anil Chauhan was India's first Chief of Defence Staff.",
    options: ["Both are correct", "Both are incorrect", "1 only correct", "2 only correct"],
    answer: 0,
  },
  {
    q: "The International Day of Argania (or International Day of the Argan Tree) is celebrated annually on?",
    options: ["May 10", "May 08", "May 05", "May 12"],
    answer: 2,
  },
  {
    q: "Who is appointed as the new Chief of the Naval Staff of India?",
    options: ["Krishna Swaminathan", "Dinesh K Tripathi", "Raja Subramani", "Anil Chauhan"],
    answer: 1,
  },
  {
    q: "Suvendu Adhikari was sworn in as the first BJP's Chief Minister of which state?",
    options: ["Assam", "Manipur", "Sikkim", "West Bengal"],
    answer: 3,
  },
  {
    q: "Consider the statements:\n1. C. Joseph Vijay becomes new Chief Minister of Tamil Nadu.\n2. He was sworn in by Governor Rajendra Vishwanath Arlekar.\n3. Article 164(3) of the Constitution of India mandates the oath of the Chief Minister.",
    options: ["1, 3 correct, 2 incorrect", "All are correct", "2, 3 correct, 1 incorrect", "1, 2 correct, 3 incorrect"],
    answer: 1,
  },
  {
    q: "When was World Mother's Day observed in 2026?",
    options: ["May 11", "May 08", "May 09", "May 10"],
    answer: 3,
  },
  {
    q: "Statement 1: International Nurses Day is observed annually on May 12.\nStatement 2: This day commemorates the birth anniversary of Mother Teresa.",
    options: ["2 only is correct", "Both are correct", "Both are incorrect", "1 only is correct"],
    answer: 3,
  },
  {
    q: "When is International Day of Plant Health observed?",
    options: ["May 10", "May 08", "May 12", "May 11"],
    answer: 2,
  },
  {
    q: "Who has won the bronze medal in the women's 48 kg category at the 2026 Asian Weightlifting Championships?",
    options: ["Komal Kohar", "Vinesh Phogat", "Pooja Gehlot", "Geeta Phogat"],
    answer: 0,
  },
  {
    q: "Which team has won the La Liga football championship title for the 29th time in 2026?",
    options: ["Girona FC", "Barcelona FC", "Real Madrid", "Celta"],
    answer: 2,
  },
  {
    q: "Statement 1: On May 11, 1951, the Somnath Temple was renovated and inaugurated by Sardar Vallabhbhai Patel.\nStatement 2: Prime Minister Narendra Modi released a commemorative postage stamp to mark the 75th anniversary of this temple.",
    options: ["Both are incorrect", "Both are correct", "1 only is incorrect", "2 only is incorrect"],
    answer: 1,
  },
  {
    q: "Statement 1: The new Rural Employment Act (VB G Ram G) comes into effect from July 1, 2026.\nStatement 2: Under this scheme, the number of working days has been increased to 150.",
    options: ["1 only is incorrect", "Both are incorrect", "Both are correct", "2 only is incorrect"],
    answer: 2,
  },
  {
    q: "Who served as the Pro-tem Speaker (Interim Speaker) of the 17th Legislative Assembly of Tamil Nadu?",
    options: ["J.C.D. Prabhakar", "M.V. Karuppiah", "M. Ravishankar", "K.A. Sengottaiyan"],
    answer: 3,
  },
  {
    q: "In which state is the famous Somnath Temple located?",
    options: ["Uttar Pradesh", "Uttarakhand", "Gujarat", "Maharashtra"],
    answer: 2,
  },
  {
    q: "In which year was the new Rural Employment Act (VB G Ram G) introduced?",
    options: ["2025", "2026", "2024", "2022"],
    answer: 1,
  },
  {
    q: "Consider the following statements:\nStatement 1: Himanta Biswa Sarma has taken charge as the Chief Minister of Assam for the 2nd consecutive term.\nStatement 2: Ajanta Neog is the longest-serving female MLA of this state.",
    options: ["Both are correct", "Both are incorrect", "1 only is correct", "2 only is correct"],
    answer: 0,
  },
  {
    q: "Who has been appointed as the new Director of the CBI?",
    options: ["U.S. Misra", "Praveen Sood", "Anil Sinha", "Alok Verma"],
    answer: 1,
  },
  {
    q: "What is the name of India's first private orbital rocket?",
    options: ["Kalam 11", "Vikram 11", "Vikram 1", "Kalam 1"],
    answer: 2,
  },
  {
    q: "Consider the following statements:\nStatement 1: Asra Garg has been appointed as the IG of Intelligence for the Tamil Nadu Police.\nStatement 2: P.S. Raman has been appointed as the Advocate General of the Government of Tamil Nadu.",
    options: ["Both are correct", "Both are incorrect", "2 only is incorrect", "1 only is incorrect"],
    answer: 0,
  },
  {
    q: "Who from Tamil Nadu received the 2026 National Florence Nightingale Award?",
    options: ["Anthony Raj", "Shankar Shanmugam", "Senthil Kumaran", "Ramesh Prabha"],
    answer: 3,
  },
  {
    q: "What was India's retail inflation in April 2026?",
    options: ["4.20%", "3.21%", "3.48%", "2.75%"],
    answer: 1,
  },
  {
    q: "Who has taken charge as the new Chief Minister of the Union Territory of Puducherry?",
    options: ["N. Rangasamy", "N. Narayanasamy", "K. Kailashnathan", "A. Namassivayam"],
    answer: 0,
  },
  {
    q: "Consider the following statements:\nStatement 1: The Union Cabinet has approved the implementation of a partial double railway line project between Ahmedabad and Dholera, capable of traveling at a speed of 280 km/h.\nStatement 2: This is the first partial high-speed railway project of Indian Railways planned with the help of indigenous technology.",
    options: ["2 only is correct", "Both are correct", "Both are incorrect", "1 only is correct"],
    answer: 1,
  },
  {
    q: "Under whose chairmanship has the Supreme Court ordered the formation of a high-level committee to prepare draft rules related to the modernization of courts in the country?",
    options: ["Naga Rathna", "Vikram Nath", "Sandeep Mehta", "Arvind Kumar"],
    answer: 1,
  },
  {
    q: "Examine the following statements:\n1) The Union Government has released the 2025 Logistics Ease Across Different States (LEADS) report.\n2) According to the report, Kerala is included in the category of coastal states that acted as role models.\n3) In that same category, Madhya Pradesh is included among the landlocked states.",
    options: ["All are correct", "1 correct; 2, 3 are incorrect", "2 correct; 1, 3 are incorrect", "3 correct; 1, 2 are incorrect"],
    answer: 0,
  },
  {
    q: "When was the UN Global Road Safety Week 2026 observed?",
    options: ["May 06 - 12", "May 10 - 16", "May 12 - 18", "May 08 - 14"],
    answer: 1,
  },
  {
    q: "Examine the following statements regarding the Drug Control Force:\n1) This force will function under the direct supervision of the Chief Minister.\n2) 65 Police stations are being created across the state for this force.\n3) A total of 720 officers and police personnel are being appointed for these 65 police stations.",
    options: ["2, 3 are correct; 1 is incorrect", "All are correct", "1, 2 correct, 3 incorrect", "1, 3 are correct; 2 is incorrect"],
    answer: 1,
  },
  {
    q: "Where was the 2026 Asian Weightlifting Championships held?",
    options: ["Gujarat", "Tamil Nadu", "Odisha", "Uttar Pradesh"],
    answer: 1,
  },
  {
    q: "Examine the following statements regarding the \"Singapen\" (Lioness) Special Action Force:\n1) This force will be created with prevention and security strategies as its primary and sole target to enhance the safety of women.\n2) The headquarters of this force will operate out of the DGP office. A high-ranking officer of IG rank will lead it.\n3) This force, with a total of 63 police personnel, will operate under the direct supervision of the Chief Minister.",
    options: ["2, 3 are correct; 1 is incorrect", "1, 3 are correct; 2 is incorrect", "All are incorrect", "1, 2 are correct; 3 is incorrect"],
    answer: 3,
  },
  {
    q: "Where is the 2026 International Big Cats Alliance Summit being held?",
    options: ["Japan", "India", "Russia", "Australia"],
    answer: 1,
  },
  {
    q: "When is International Day of Families observed?",
    options: ["May 13", "May 19", "May 15", "May 17"],
    answer: 2,
  },
  {
    q: "Consider the following statements:\nStatement 1: Following the meeting between Prime Minister Modi and the President of the United Arab Emirates (UAE), 12 agreements were signed for cooperation in various sectors, including energy and security.\nStatement 2: Under investment sector cooperation, the UAE has committed to investments worth 500 crore dollars (₹47,870 crore) in India.",
    options: ["1 only is correct", "Both are correct", "Both are incorrect", "2 only is correct"],
    answer: 1,
  },
  {
    q: "When is National Dengue Day observed in India?",
    options: ["May 16", "May 14", "May 18", "May 15"],
    answer: 3,
  },
  {
    q: "Consider the following statements:\nStatement 1: India's Wholesale Price Index (WPI) inflation has increased to 8.3% in April 2026.\nStatement 2: This inflation, which stood at 3.88% in March 2026, has reached a 42-month high within a single month.",
    options: ["2 only is correct", "Both are correct", "Both are incorrect", "1 only is correct"],
    answer: 1,
  },
  {
    q: "When is Sikkim Statehood Day observed?",
    options: ["May 16, 1987", "May 16, 1975", "May 16, 1957", "May 16, 1965"],
    answer: 1,
  },
  {
    q: "Consider the following statements:\nStatement 1: India chairs the BRICS alliance for the year 2026.\nStatement 2: The 2026 BRICS Foreign Ministers' Meeting was held in Surat.",
    options: ["1 only is correct", "2 only is correct", "Both are correct", "Both are incorrect"],
    answer: 2,
  },
  {
    q: "When is the International Day of Living Together in Peace observed?",
    options: ["May 15", "May 14", "May 16", "May 17"],
    answer: 2,
  },
  {
    q: "Examine the following statements:\n1) The foundation stone has been laid in Andhra Pradesh for a factory to manufacture 5th-generation light combat aircraft.\n2) The Agnyashtra company is setting up a facility here to manufacture underwater-launched torpedoes.\n3) In Puttaparthi, 8 drone manufacturing companies are jointly setting up a 'Drone City' under the Make in India initiative.",
    options: ["All are correct", "1 correct; 2, 3 are incorrect", "2 correct; 1, 3 are incorrect", "3 correct; 1, 2 are incorrect"],
    answer: 0,
  },
  {
    q: "When is International Day of Light observed?",
    options: ["May 15", "May 14", "May 17", "May 16"],
    answer: 2,
  },
  {
    q: "In which year was the National Disaster Response Force (NDRF), which recently received the President's award, established?",
    options: ["1998", "2010", "2001", "2006"],
    answer: 2,
  },
  {
    q: "Analyze the statements:\n1) The Leyden copper plates of Aanaimangalam, which were preserved at Leiden University in the Netherlands, have been handed back to India.\n2) The 21 copper plates, containing text in Tamil and Sanskrit, weigh approximately 30 kg and are bound together by a copper ring. The seal of Rajendra Chola is inscribed on that ring.\n3) The copper plates contain information about the grants made by Raja Raja Chola to a Jain monastery.",
    options: ["1, 2 are correct; 3 is incorrect", "2, 3 are correct; 1 is incorrect", "1, 3 are correct; 2 is incorrect", "All are incorrect"],
    answer: 0,
  },
  {
    q: "When is World Hypertension Day observed?",
    options: ["May 18", "May 15", "May 17", "May 19"],
    answer: 2,
  },
  {
    q: "Which state government has announced an incentive of ₹40,000 for couples having a fourth child?",
    options: ["Kerala", "Andhra Pradesh", "Karnataka", "Telangana"],
    answer: 1,
  },
  {
    q: "When is World AIDS Vaccine Day observed?",
    options: ["May 18", "May 19", "May 16", "May 15"],
    answer: 1,
  },
  {
    q: "Find the incorrect pair:\n1) Aadhav Arjuna - Public Works and Sports Department\n2) K.G. Arunraj - School Education, Tamil Development, Information and Publicity Department\n3) Rajmohan - Health, Medical Education and Family Welfare Department\n4) T.K. Prabhu - Natural Resources Department",
    options: ["2 and 4", "2 and 3", "1 and 2", "1 and 4"],
    answer: 0,
  },
  {
    q: "When is the International Day for Women in Maritime observed?",
    options: ["May 19", "May 17", "May 20", "May 18"],
    answer: 3,
  },
  {
    q: "What is 'Operation Raqeeb' associated with?",
    options: ["Anti-narcotics operation (Drug control measure)", "Eradication of black money", "Anti-Naxalite operation", "Evacuation/Rescue of Indians from Iran"],
    answer: 3,
  },
  {
    q: "When is World Fair Play Day observed?",
    options: ["May 18", "May 19", "May 20", "May 17"],
    answer: 1,
  },
  {
    q: "Which Indian has received 'The Royal Order of the Polar Star - Degree of Commander Grand Cross' award for the year 2026?",
    options: ["Sonia Gandhi", "Narendra Modi", "Droupadi Murmu", "C. P. Radhakrishnan"],
    answer: 2,
  },
  {
    q: "When is World Inflammatory Bowel Disease (IBD) Day observed?",
    options: ["May 19", "May 18", "May 17", "May 20"],
    answer: 1,
  },
  {
    q: "Where is the Afsluitdijk dam, a massive 32 km long flood protection dam visited by Prime Minister Narendra Modi, located?",
    options: ["France", "Egypt", "Netherlands", "Sweden"],
    answer: 2,
  },
  {
    q: "Statement 1: Coco Gauff has won the women's singles title at the 2026 Italian Open tennis tournament.\nStatement 2: Jannik Sinner has won the men's singles title at the 2026 Italian Open tennis tournament.",
    options: ["Statement 2 alone is incorrect", "Both are correct", "Both are incorrect", "Statement 1 alone is incorrect"],
    answer: 1,
  },
  {
    q: "Who has taken charge as the new Chief Minister of Kerala?",
    options: ["Sunny Joseph", "K. Muraleedharan", "V. D. Satheesan", "Ramesh Chennithala"],
    answer: 2,
  },
  {
    q: "Statement 1: The 'Grand Cross of the Royal Norwegian Order of Merit' award for 2026 has been conferred upon Prime Minister Narendra Modi.\nStatement 2: This award marks the 35th international honor bestowed upon Prime Minister Modi.",
    options: ["1 alone is correct", "2 alone is correct", "Both are correct", "Both are incorrect"],
    answer: 2,
  },
  {
    q: "In which state has the 'Annapurna Scheme' been launched to provide ₹3000 monthly to women?",
    options: ["Tamil Nadu", "West Bengal", "Assam", "Kerala"],
    answer: 1,
  },
];

const LETTERS = ["A", "B", "C", "D"];

export default function MayCAQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(Array(QUESTIONS.length).fill(null));
  const [finished, setFinished] = useState(false);

  const q = QUESTIONS[current];
  const total = QUESTIONS.length;

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const newAnswered = [...answered];
    newAnswered[current] = idx;
    setAnswered(newAnswered);
    if (idx === q.answer) {
      setScore((s) => s + 1);
    }
  };

  const goNext = () => {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setSelected(answered[current + 1]);
    } else {
      setFinished(true);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
      setSelected(answered[current - 1]);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswered(Array(QUESTIONS.length).fill(null));
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h1>
          <p className="text-slate-300 mb-6">May Month Current Affairs 2026</p>
          <div className="text-6xl font-extrabold text-emerald-400 mb-2">
            {score} / {total}
          </div>
          <p className="text-slate-400 mb-6">
            {Math.round((score / total) * 100)}% correct
          </p>
          <button
            onClick={restart}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-xl p-6 max-w-2xl w-full border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-400">
            Question {current + 1} of {total}
          </span>
          <span className="text-sm font-semibold text-emerald-400">
            Score: {score}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>

        {/* Question */}
        <h2 className="text-lg font-semibold text-white mb-6 whitespace-pre-line leading-relaxed">
          {q.q}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {q.options.map((opt, idx) => {
            let style =
              "border-slate-600 bg-slate-700 text-slate-200 hover:border-slate-400";
            if (selected !== null) {
              if (idx === q.answer) {
                style = "border-emerald-500 bg-emerald-500/20 text-emerald-300";
              } else if (idx === selected) {
                style = "border-red-500 bg-red-500/20 text-red-300";
              } else {
                style = "border-slate-700 bg-slate-800 text-slate-500";
              }
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${style}`}
              >
                <span className="font-bold flex-shrink-0">{LETTERS[idx]})</span>
                <span className="flex-1">{opt}</span>
                {selected !== null && idx === q.answer && (
                  <span className="text-emerald-400 font-bold flex-shrink-0">✓</span>
                )}
                {selected !== null && idx === selected && idx !== q.answer && (
                  <span className="text-red-400 font-bold flex-shrink-0">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {selected !== null && (
          <div
            className={`mb-6 p-3 rounded-lg text-sm font-medium ${
              selected === q.answer
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                : "bg-red-500/10 text-red-300 border border-red-500/30"
            }`}
          >
            {selected === q.answer
              ? "Correct!"
              : `Incorrect. Correct answer: ${LETTERS[q.answer]}) ${q.options[q.answer]}`}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="flex-1 py-3 rounded-xl font-semibold border-2 border-slate-600 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-slate-400 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={goNext}
            disabled={selected === null}
            className="flex-1 py-3 rounded-xl font-semibold bg-emerald-500 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors"
          >
            {current === total - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
