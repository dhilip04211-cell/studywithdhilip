import { useState, useEffect, useRef } from "react";

// ─── ALL 100 QUESTIONS FROM PDF ───────────────────────────────────────────────
// Answers verified from PDF tick marks (✓). "null" = TNPSC did not clarify answer.
const ALL_QUESTIONS = [
  {
    id: 1,
    tamil: "ஒற்றுப்பிழை கண்டறிக.",
    english: "Find the spelling error (single-letter mistake).",
    options: ["கனாக் கண்டேன்", "ஓடா குதிரை", "திருவளர் செல்வன்", "குதிரை தாண்டியது"],
    answer: 1,
    explanation: "\"ஓடா குதிரை\" is the correct spelling. The phrase refers to a horse that does not run – a common Tamil proverb phrase. The other options contain spelling/grammatical inconsistencies. In TNPSC Tamil, single-letter errors (ஒற்றுப்பிழை) involve misplacement or omission of consonant endings.",
    topic: "ஒற்றுப்பிழை (Spelling Error)",
  },
  {
    id: 2,
    tamil: "எழுத்துப் பிழையற்ற தொடரைத் தேர்ந்தெடு.",
    english: "Choose the sentence without spelling errors.",
    options: ["கிணரில் போட்டேன்", "சுவற்றில் வரைந்தேன்", "பூமியை வளம் வருவேன்", "வயிறு பசிக்கிறது"],
    answer: 3,
    explanation: "\"வயிறு பசிக்கிறது\" (The stomach is hungry) is grammatically and orthographically correct. \"கிணரில்\" should be \"கிணற்றில்\"; \"சுவற்றில்\" correct form but context awkward; \"வளம் வருவேன்\" has verb form issue. TNPSC tests awareness of correct Tamil spelling conventions.",
    topic: "எழுத்துப் பிழை (Spelling Mistakes)",
  },
  {
    id: 3,
    tamil: "சரியான வினைசொல்லைத் தோர்ந்தெடு.",
    english: "Choose the correct verb.",
    options: ["ஓடுதல்", "மா", "போ", "நன்மை"],
    answer: 2,
    explanation: "\"போ\" is a verb (imperative form meaning 'go'). \"ஓடுதல்\" is a verbal noun (infinitive), \"மா\" is a noun (mango/change), \"நன்மை\" is an abstract noun (goodness). In Tamil grammar, வினைசொல் (verb) expresses action or state and must be selected carefully from mixed word-type options.",
    topic: "வினைச்சொல் (Verb)",
  },
  {
    id: 4,
    tamil: "செயலைக் குறிக்கும் சொல் __________ எனப்படும்.",
    english: "The word that denotes action is called __________.",
    options: ["பெயர்ச்சொல்", "வினைச்சொல்", "இடைச்சொல்", "உரிச்சொல்"],
    answer: 1,
    explanation: "\"வினைச்சொல்\" (verb) is the word that denotes action. In Tamil grammar: பெயர்ச்சொல் = noun, வினைச்சொல் = verb, இடைச்சொல் = particle/conjunction, உரிச்சொல் = adverb/qualifier. Verbs express actions, states, or occurrences – a fundamental grammatical concept in TNPSC exams.",
    topic: "வினைச்சொல் (Verb Definition)",
  },
  {
    id: 5,
    tamil: "'தேடு' என்னும் வேர்ச்சொல்லின் வினையெச்சத்தைத் தேர்வு செய்க.",
    english: "Find the verbal participle (வினையெச்சம்) of the root word 'தேடு'.",
    options: ["தேடுகிறான்", "தேடிய", "தேடுகின்றன", "தேடி"],
    answer: 3,
    explanation: "\"தேடி\" is the verbal participle (வினையெச்சம்) of \"தேடு\" (to search). வினையெச்சம் is a non-finite verb form that functions as an adverb, describing when or how another action occurs. E.g., \"தேடி வந்தான்\" (He came searching). Other options: தேடுகிறான் = present tense finite verb; தேடிய = past adjectival participle; தேடுகின்றன = plural present tense.",
    topic: "வினையெச்சம் (Verbal Participle)",
  },
  {
    id: 6,
    tamil: "வேர்ச்சொல்லில் இருந்து வினைமுற்று சொல்லைக் கண்டறிக. கேள்",
    english: "Find the finite verb from the root word 'கேள்' (Listen/Ask).",
    options: ["கேட்டு", "கேட்டான்", "கேட்ட", "கேட்கும்"],
    answer: 1,
    explanation: "\"கேட்டான்\" is the finite verb (வினைமுற்று) – past tense, third person masculine singular meaning 'He asked/listened'. வினைமுற்று is a complete verb that indicates person, number, gender, and tense. \"கேட்டு\" = verbal participle; \"கேட்ட\" = adjectival participle; \"கேட்கும்\" = future tense but future is also finite – however \"கேட்டான்\" is the clearest வினைமுற்று answer here.",
    topic: "வினைமுற்று (Finite Verb)",
  },
  {
    id: 7,
    tamil: "'தணிந்தது' – வேர்ச்சொல் அறிக.",
    english: "Find the root word of 'தணிந்தது'.",
    options: ["தணிந்த", "தணிந்து", "தணி", "தணிக்கப்பட்டு"],
    answer: 2,
    explanation: "\"தணி\" is the root word (வேர்ச்சொல்) of \"தணிந்தது\". In Tamil, வேர்ச்சொல் is the base/stem from which all verb forms derive. \"தணி\" means to subside/reduce/cool down. \"தணிந்தது\" = It subsided (past tense neuter). The root never carries tense markers on its own.",
    topic: "வேர்ச்சொல் (Root Word)",
  },
  {
    id: 8,
    tamil: "ஒருமை பன்மை அறிந்து சரியான தொடரைத் தேர்க.",
    english: "Understanding singular and plural, choose the correct sentence.",
    options: ["நான் அவன் அல்ல", "எழுதியது இவள் அல்ல", "இவை பூக்கள் அல்ல", "அவர்கள் கவிஞர்கள் அல்ல"],
    answer: 2,
    explanation: "\"இவை பூக்கள் அல்ல\" correctly uses plural subject \"இவை\" (these) with plural noun \"பூக்கள்\" (flowers). In Tamil grammar, ஒருமை (singular) and பன்மை (plural) must agree. \"இவை\" is the neuter plural pronoun, and \"பூக்கள்\" correctly pluralizes \"பூ\" with the suffix \"-கள்\".",
    topic: "ஒருமை-பன்மை (Singular-Plural)",
  },
  {
    id: 9,
    tamil: "குறில் – நெடில் மாற்றம் பொருள் வேறுபாடு அறிக. கொள் – கோள்",
    english: "Identify meaning difference by short-long vowel change: கொள் – கோள்",
    options: ["பெற்றுக்கொள் – கோள் சொல்லல்", "கொழுப்பான – சொல்லல்", "கம்பு – பெறுதல்", "எழுதுகோல் – விடுதல்"],
    answer: 0,
    explanation: "கொள் (short vowel) means 'to take/receive' (பெற்றுக்கொள்), and கோள் (long vowel) means 'to tell tales/gossip' (கோள் சொல்லல்). This illustrates how changing a குறில் (short vowel) to a நெடில் (long vowel) completely changes the meaning. This is a key TNPSC concept in Tamil phonology.",
    topic: "குறில்-நெடில் மாற்றம் (Vowel Length Change)",
  },
  {
    id: 10,
    tamil: "குறில்சொல்லை நெடில்சொல்லாக மாற்றி பொருள் வேறுபாடு வருமாறு ஒரே தொடரில் அமைத்து எழுதுக. மலை",
    english: "Change the short-vowel word to long-vowel and write in one sentence showing meaning difference. மலை (mountain)",
    options: [
      "மலை – மழை / இமயமலையில் பனிமழை பொழிந்தது.",
      "மலை – மாளை / மலையில் வளர்ந்த மரத்திலிருந்து மாளை பிரித்து எடுத்தனர்.",
      "மலை – மாலை / மக்கள் மலையில் மாலை நேரத்தில் ஏறினர்.",
      "மலை – மழலை / தாய் தந்தையர் கொடைக்கானல் மலைக்கு இன்பச்சுற்றுலா செல்லும்போது தங்கள் மழலையை தவற விட்டனர்."
    ],
    answer: 2,
    explanation: "\"மலை – மாலை\" with sentence \"மக்கள் மலையில் மாலை நேரத்தில் ஏறினர்\" correctly uses both words in one sentence. மலை = mountain (short vowel), மாலை = evening/garland (long vowel). The sentence cleverly incorporates both: people climbed the mountain (மலை) in the evening (மாலை).",
    topic: "குறில்-நெடில் வேறுபாடு (Vowel Length Distinction)",
  },
  {
    id: 11,
    tamil: "பிழை திருத்தம், சந்திப்பிழை. வண்ணம் + படங்கள் என்னும் சொல்லைச் சேர்க்கும் போது கிடைப்பது.",
    english: "Sandhi correction: What is obtained when combining வண்ணம் + படங்கள்?",
    options: ["வண்ணம்படங்கள்", "வண்ணமயமான படங்கள்", "வண்ணப் படங்கள்", "வண்ணமான படங்கள்"],
    answer: 2,
    explanation: "\"வண்ணப் படங்கள்\" is correct. When a word ending in \"ம்\" joins another word, the \"ம்\" becomes \"ப்\" (ஆனந்தாக்கம் = Sandhi rule). வண்ணம் + படங்கள் → வண்ணப் படங்கள் (colourful pictures). This is the புணர்ச்சி (Sandhi) rule in Tamil grammar – a frequent TNPSC topic.",
    topic: "சந்திப்பிழை / புணர்ச்சி (Sandhi)",
  },
  {
    id: 12,
    tamil: "பொருள் தரும் ஓர் எழுத்து. உயர்வு",
    english: "A single letter that gives meaning. (Context: உயர்வு - elevation/superiority)",
    options: ["தே", "பே", "சே", "பை"],
    answer: 2,
    explanation: "\"சே\" is the single-letter word (ஓரெழுத்து ஒரு மொழி) that means red/reddish-brown colour (சிவப்பு), and also relates to உயர்வு context. In Tamil, ஓரெழுத்து ஒரு மொழி refers to words made of a single letter/syllable. Examples: மா (mango), தீ (fire), நா (tongue), சே (red bull).",
    topic: "ஓரெழுத்து ஒரு மொழி (Single Letter Words)",
  },
  {
    id: 13,
    tamil: "பேச்சு வழக்குத் தொடர்களிலுள்ள பிழை திருத்தம் கண்டறிக. எனக்கு 'சிலக் சட்டை' இருக்கிறது.",
    english: "Find the correction for the colloquial error: 'எனக்கு சிலக் சட்டை இருக்கிறது.'",
    options: ["பருத்தி சட்டை", "காவி சட்டை", "பட்டு சட்டை", "கதர் சட்டை"],
    answer: 2,
    explanation: "\"பட்டு சட்டை\" is the correct literary/formal Tamil. \"சிலக்\" is the colloquial/anglicised form of 'silk'. In formal Tamil (செந்தமிழ்), 'silk' is written as \"பட்டு\". TNPSC Tamil tests the ability to convert பேச்சு வழக்கு (colloquial speech) to எழுத்து வழக்கு (written/literary form).",
    topic: "பேச்சு வழக்கு திருத்தம் (Colloquial Correction)",
  },
  {
    id: 14,
    tamil: "கீழ்காணும் தொடரில் உள்ள பிழையைத் திருத்தி எழுதுக. அது ஒரு இனிய பாடல்",
    english: "Correct the error in the sentence: 'அது ஒரு இனிய பாடல்'",
    options: ["அஃது ஒரு இனிய பாடல்", "ஒரு அஃது இனிய பாடல்", "அது ஒரு இனிய பாடல்", "ஒரு இனிய பாடல் அது"],
    answer: 0,
    explanation: "\"அஃது ஒரு இனிய பாடல்\" is correct. When \"அது\" refers to an inanimate object (neuter), the formal written Tamil uses \"அஃது\" before a vowel-initial word. Since \"ஒரு\" starts with a vowel, \"அது\" should become \"அஃது\". This is the sandhi rule of pronouns before vowels in classical Tamil.",
    topic: "பிழை திருத்தம் (Error Correction)",
  },
  {
    id: 15,
    tamil: "ஊர்ப்பெயரின் மரூஉவை எழுதுக. 'மன்னார்குடி'",
    english: "Write the colloquial/abbreviated form of the place name 'மன்னார்குடி'",
    options: ["மன்னார்", "குடிமன்னார்", "மன்னை", "மன்னையூர்"],
    answer: 2,
    explanation: "\"மன்னை\" is the மரூஉ (colloquial/shortened form) of மன்னார்குடி. மரூஉ refers to the shortened or colloquially pronounced form of a word or place name. Place names in Tamil often have well-known shortened forms used in everyday speech – \"மன்னார்குடி\" → \"மன்னை\".",
    topic: "மரூஉ (Colloquial Form of Place Names)",
  },
  {
    id: 16,
    tamil: "ஒரு பொருள் பன்மொழியைக் கண்டறிக. உலகம்",
    english: "Find the synonyms (words with same meaning) for: உலகம் (world)",
    options: ["இயம்பு, உரை", "பரிதி, கதிரவன்", "தரணி, நானிலம்", "மகவு, சேய்"],
    answer: 2,
    explanation: "\"தரணி, நானிலம்\" are both synonyms of உலகம் (world/earth). தரணி = the earth, நானிலம் = the four-soil earth (another name for the world). In TNPSC Tamil, ஒரு பொருள் பல சொல் (synonyms) is a key topic. உலகம், தரணி, நானிலம், புவி, மண்ணுலகம் are all synonyms for 'earth/world'.",
    topic: "ஒரு பொருள் பன்மொழி (Synonyms)",
  },
  {
    id: 17,
    tamil: "பொருந்தாச் சொல்லைத் தேர்ந்து எடுத்து எழுதுக. மேதி என்பது",
    english: "Choose the word that does not belong. 'மேதி' refers to:",
    options: ["எருமை", "பகடு", "மாடு", "வேரி"],
    answer: 3,
    explanation: "\"வேரி\" does not belong. மேதி = buffalo (எருமை). பகடு = bull/ox, மாடு = cattle – all are bovine animals related to மேதி. But \"வேரி\" means fragrance/perfume, which is completely unrelated to the category of cattle. This tests knowledge of Tamil word meanings and category grouping.",
    topic: "பொருந்தாச் சொல் (Odd One Out)",
  },
  {
    id: 18,
    tamil: "ஒரே பொருளைத் தரும் இரு சொற்களைக் கண்டறிக. விசும்பு",
    english: "Find two words that mean the same as விசும்பு (sky).",
    options: ["பகலவன், வானம்", "ஆகாயம், வானம்", "ஆம்பல், விண்", "சூரியன், சந்திரன்"],
    answer: 1,
    explanation: "\"ஆகாயம், வானம்\" are both synonyms of விசும்பு (sky). All three – விசும்பு, ஆகாயம், வானம் – mean sky/heavens in Tamil. This tests synonym knowledge (ஒரு பொருள் பல சொல்). Other sky synonyms: அம்பரம், விண், சேய்வான், விண்ணகம்.",
    topic: "ஒரு பொருள் பல சொல் (Multiple Words, Same Meaning)",
  },
  {
    id: 19,
    tamil: "கும்பி என்பதன் பொருள்",
    english: "What is the meaning of 'கும்பி'?",
    options: ["கால்", "வயிறு", "உடல்", "கண்"],
    answer: 1,
    explanation: "\"வயிறு\" (stomach/belly) is the meaning of \"கும்பி\". கும்பி is a Tamil word for stomach/abdomen, derived from classical Tamil usage. Knowing archaic/classical Tamil word meanings is essential for TNPSC. Other body-part archaic words: நுதல் = forehead, மருங்கு = waist, செவி = ear.",
    topic: "சொற்பொருள் (Word Meaning)",
  },
  {
    id: 20,
    tamil: "சரியான தொடரைக் கண்டறிக.",
    english: "Identify the correct sentence.",
    options: [
      "நிலம் நீர், தீ காற்று, வான் என்பன ஐம்பூதங்கள்.",
      "நிலம், நீர், தீ, காற்று வான், என்பன ஐம்பூதங்கள்.",
      "நிலம், நீர், தீ, காற்று, வான் என்பன ஐம்பூதங்கள்.",
      "நிலம், நீர் தீ, காற்று, வான் என்பன ஐம்பூதங்கள்."
    ],
    answer: 2,
    explanation: "\"நிலம், நீர், தீ, காற்று, வான் என்பன ஐம்பூதங்கள்.\" is correct with proper comma placement. The five elements (ஐம்பூதங்கள்) are: நிலம் (earth), நீர் (water), தீ (fire), காற்று (air), வான் (space/sky). Correct punctuation is critical in TNPSC Tamil grammar questions.",
    topic: "நிறுத்தற்குறி (Punctuation)",
  },
  {
    id: 21,
    tamil: "மரபுப் பிழையற்ற தொடரைத் தேர்வு செய்க.",
    english: "Choose the sentence without conventional usage error (மரபுப் பிழை).",
    options: ["யானை கர்ஜிக்கும்", "யானை பிளிரும்", "யானை கத்தும்", "யானை கூச்சலிடும்"],
    answer: 1,
    explanation: "\"யானை பிளிரும்\" is the correct conventional expression. In Tamil, each animal has a specific verb for its sound – this is மரபு வழக்கு (conventional usage). யானை (elephant) → பிளிறும்; சிங்கம் (lion) → கர்ஜிக்கும்; நாய் (dog) → குலைக்கும்; பசு (cow) → கதறும். Using the wrong animal-sound verb is a மரபுப் பிழை.",
    topic: "மரபு வழக்கு (Conventional Usage)",
  },
  {
    id: 22,
    tamil: "பொருத்தமானதைத் தேர்ந்தெடு.",
    english: "Choose the appropriate form.",
    options: [
      "நேற்று மழை பெய்யும்",
      "நேற்று மழை பெய்தது",
      "நேற்று மழை பெய்கிறது",
      "நேற்று மழை பெய்து கொண்டிருக்கிறது"
    ],
    answer: 1,
    explanation: "\"நேற்று மழை பெய்தது\" is correct. \"நேற்று\" (yesterday) requires past tense. \"பெய்தது\" = it rained (past tense). The other options use present tense (பெய்கிறது) or future (பெய்யும்) which contradict the past-time adverb நேற்று. Tense consistency is a key TNPSC grammar concept.",
    topic: "காலம் (Tense Consistency)",
  },
  {
    id: 23,
    tamil: "பலவின்பால் சொல்லைக் கண்டறிக.",
    english: "Find the neuter plural (பலவின்பால்) word.",
    options: ["வந்தார்கள்", "மாடுகள்", "வந்தான்", "காடு"],
    answer: 1,
    explanation: "\"மாடுகள்\" (cattle/cows) is a பலவின்பால் (neuter plural) word. In Tamil, gender classification: ஆண்பால் (masculine), பெண்பால் (feminine), பலர்பால் (rational plural), ஒன்றன்பால் (neuter singular), பலவின்பால் (neuter plural). Animals are neuter, and \"மாடுகள்\" is the plural neuter form. \"வந்தார்கள்\" = rational plural (people).",
    topic: "பால் வகை (Gender Classification)",
  },
  {
    id: 24,
    tamil: "பலர்பாலைக் குறிக்கும் சொல் எது?",
    english: "Which word refers to பலர்பால் (rational plural)?",
    options: ["அவன்", "மாடுகள்", "அது", "அவர்கள்"],
    answer: 3,
    explanation: "\"அவர்கள்\" (they – rational/human plural) is பலர்பால். In Tamil's திணை-பால் system: உயர்திணை (rational beings = humans + deities) has ஆண்பால், பெண்பால், பலர்பால்; அஃறிணை (irrational beings = animals, objects) has ஒன்றன்பால், பலவின்பால். \"அவர்கள்\" = rational plural pronoun.",
    topic: "திணை-பால் (Tier-Gender System)",
  },
  {
    id: 25,
    tamil: "தன்வினைத் தொடரைக் கண்டறிக:",
    english: "Identify the reflexive/intransitive verb sentence (தன்வினை):",
    options: ["அவன் திருந்தினான்", "அவன் திருத்தப்பட்டான்", "அவன் திருத்தினான்", "அவன் திருத்துகிறான்"],
    answer: 0,
    explanation: "\"அவன் திருந்தினான்\" (He reformed himself) is தன்வினை (intransitive/reflexive verb). The action affects the subject itself. \"திருந்தினான்\" = he reformed (by himself). Compare: \"திருத்தினான்\" = he corrected (something else) = பிறவினை (transitive verb). \"திருத்தப்பட்டான்\" = he was corrected = செயப்பாட்டு வினை (passive voice).",
    topic: "தன்வினை / பிறவினை (Intransitive/Transitive Verb)",
  },
  {
    id: 26,
    tamil: "செய்வினைத் தொடரைக் கண்டறிக:",
    english: "Identify the active voice sentence (செய்வினை):",
    options: ["கவிதா உரை படிப்பித்தாள்", "கவிதாவால் படிக்கப்பட்டது", "கவிதா உரை படித்தாள்", "கவிதா படிக்காதே"],
    answer: 2,
    explanation: "\"கவிதா உரை படித்தாள்\" is செய்வினை (active voice) – Kavitha read the speech (subject performs the action directly). \"படிக்கப்பட்டது\" = passive voice (செயப்பாட்டு வினை). \"படிப்பித்தாள்\" = causative voice (செய்வித்தல் வினை). Active voice: Subject + Object + Verb where subject is the doer.",
    topic: "செய்வினை (Active Voice)",
  },
  {
    id: 27,
    tamil: "சொற்களை ஒழுங்குபடுத்தி சொற்றொடராக்குதல்: சொற்களை ஒழுங்குபடுத்துக. பகைவரை வென்றதை பாடும் இலக்கியம் பரணி ஆகும்.",
    english: "Rearrange words to form correct sentence about பரணி literary genre.",
    options: [
      "வென்றதைப் பகைவரை ஆகும் பாடும் இலக்கியம்.",
      "வென்றதைப் பகைவரை பாடும் இலக்கியம் ஆகும் பரணி.",
      "பகைவரை வென்றதைப் பாடும் இலக்கியம் பரணி ஆகும்.",
      "பகைவரை வென்றதைப் பரணி பாடும் இலக்கியம் ஆகும்."
    ],
    answer: 2,
    explanation: "\"பகைவரை வென்றதைப் பாடும் இலக்கியம் பரணி ஆகும்\" is correct: 'The literature that sings about defeating enemies is called Parani'. பரணி is a classical Tamil literary genre that celebrates military victories. The five Tamil epic genres are: புறநானூறு, பரணி, கலம்பகம், உலா, குறவஞ்சி.",
    topic: "சொற்றொடர் அமைப்பு (Sentence Formation)",
  },
  {
    id: 28,
    tamil: "சரியான தொடர் எது? கண்டறிந்து எழுதுக:",
    english: "Which is the correct sentence? Identify and write:",
    options: [
      "பாரதியார் பாடினார் எங்கள் சாதி காக்கை குருவி",
      "காக்கை குருவி பாரதியார் பாடினார் எங்கள் சாதி",
      "பாரதியார் எங்கள் சாதி காக்கை குருவி என்று பாடினார்",
      "காக்கை குருவி எங்கள் சாதி – என்று பாரதியார் பாடினார்"
    ],
    answer: 3,
    explanation: "\"காக்கை குருவி எங்கள் சாதி – என்று பாரதியார் பாடினார்\" is correct. This refers to Bharathiyar's famous poem line \"காக்கை குருவி எங்கள் சாதி\" (Crows and sparrows are our caste) – expressing universal brotherhood. The sentence structure correctly attributes the quote to Bharathiyar with proper Tamil sentence order.",
    topic: "சரியான தொடர் (Correct Sentence Structure)",
  },
  {
    id: 29,
    tamil: "கலைச்சொல் தருக: Irrigation Technology",
    english: "Give the Tamil technical term for: Irrigation Technology",
    options: ["அறிவியல் தொழில்நுட்பம்", "விண்வெளி தொழில்நுட்பம்", "இரசாயனத் தொழில்நுட்பம்", "பாசனத் தொழில்நுட்பம்"],
    answer: 3,
    explanation: "\"பாசனத் தொழில்நுட்பம்\" is the correct Tamil term for Irrigation Technology. பாசனம் = irrigation (watering of fields). தொழில்நுட்பம் = technology. TNPSC expects candidates to know கலைச்சொற்கள் (technical terms) in Tamil. Other examples: Computer = கணினி, Mobile = கைபேசி, Internet = இணையம்.",
    topic: "கலைச்சொல் (Technical Terms)",
  },
  {
    id: 30,
    tamil: "'FICTION' என்பதன் கலைச்சொல்.",
    english: "What is the Tamil technical term for 'FICTION'?",
    options: ["இசைவு", "நுழைவு", "விளைவு", "புனைவு"],
    answer: 3,
    explanation: "\"புனைவு\" is the Tamil term for FICTION. புனைவு comes from 'புனை' meaning to create/fabricate. Fiction refers to imaginary/invented stories. In Tamil literature: புனைவிலக்கியம் = fiction literature, அகநானூறு/புறநானூறு = non-fiction classical literature. Non-fiction = நேர்மை இலக்கியம்.",
    topic: "கலைச்சொல் (Technical Term - Fiction)",
  },
  {
    id: 31,
    tamil: "கலைச்சொல்லுக்கு நேரான தமிழ்ச்சொல்லைத் தெரிவு செய்க. Classical Literature",
    english: "Choose the correct Tamil equivalent for: Classical Literature",
    options: ["செவ்விலக்கியம்", "பக்தி இலக்கியம்", "பண்டைய இலக்கியம்", "நவீன இலக்கியம்"],
    answer: 0,
    explanation: "\"செவ்விலக்கியம்\" is the Tamil term for Classical Literature. செவ்வி = perfection/excellence/classical nature; இலக்கியம் = literature. Tamil classical literature (செவ்விலக்கியம்) includes Sangam literature (சங்க இலக்கியம்), Thirukkural, etc. TNPSC frequently tests these Tamil equivalents of English literary terms.",
    topic: "கலைச்சொல் (Classical Literature)",
  },
  {
    id: 32,
    tamil: "கலைச்சொல்லுக்கு நேரான தமிழ்ச்சொல் அறிக. Satellite",
    english: "Find the Tamil equivalent of: Satellite",
    options: ["மின்னணுக் கருவிகள்", "பதிவிறக்கம்", "போர்க் கருவிகள்", "செயற்கைக்கோள்"],
    answer: 3,
    explanation: "\"செயற்கைக்கோள்\" is the Tamil term for Satellite. செயற்கை = artificial/man-made; கோள் = planet/celestial body. A satellite is an artificial object placed in orbit around Earth. Natural satellites like the moon are called இயற்கைக்கோள். TNPSC science terminology in Tamil is a frequent exam topic.",
    topic: "கலைச்சொல் (Satellite)",
  },
  {
    id: 33,
    tamil: "கலைச்சொல் அறிக: Sailor",
    english: "What is the Tamil term for: Sailor",
    options: ["சிறைக்காப்பாளர்", "மாலுமி", "போர்வீரன்", "விமானி"],
    answer: 1,
    explanation: "\"மாலுமி\" is the Tamil word for Sailor. மாலுமி refers to a person who navigates/pilots a ship. Related words: கப்பல் = ship, துறைமுகம் = harbour/port, மீனவர் = fishermen. TNPSC tests Tamil occupational terminology. விமானி = pilot (aircraft), சிறைக்காப்பாளர் = prison guard.",
    topic: "கலைச்சொல் (Sailor)",
  },
  {
    id: 34,
    tamil: "அகவை முதிர்ந்த தமிழறிஞர்களுக்கு உதவித்தொகை வழங்கும் திட்டம் 1978ஆம் ஆண்டு முதல் செயல்படுத்தப்பட்டு வருகிறது. இத்திட்டத்தின்படி, எந்த வயது நிறைவடைந்த தமிழறிஞர்கள் விண்ணப்பிக்கலாம்?",
    english: "The scheme providing financial aid to elderly Tamil scholars runs since 1978. At what age can Tamil scholars apply?",
    options: ["61", "60", "59", "58"],
    answer: 3,
    explanation: "Scholars who have completed age 58 can apply under this Tamil scholar welfare scheme. The Tamil Nadu Government scheme (1978) provides financial assistance to Tamil scholars (தமிழறிஞர்கள்) who have dedicated their lives to Tamil language and literature. This scheme supports senior scholars who may not have institutional support.",
    topic: "தமிழறிஞர் நலத்திட்டம் (Tamil Scholar Welfare Scheme)",
  },
  {
    id: 35,
    tamil: "மரபுத் தொடருக்கு ஏற்ற பொருளைத் தேர்வு செய்க. பால் ——————.",
    english: "Choose the correct conventional word for the blank. பால் (milk) ______.",
    options: ["குடி", "பருகு", "சாப்பிடு", "உண்"],
    answer: 1,
    explanation: "\"பருகு\" is the conventional verb for drinking milk (பால் பருகு). In Tamil மரபு வழக்கு (conventional usage), different verbs are used for consuming different things: நீர் குடி (drink water), பால் பருகு (drink milk), சோறு உண் (eat rice), பழம் தின் (eat fruit). Using the wrong verb is a மரபுப் பிழை.",
    topic: "மரபு வழக்கு (Conventional Usage - Drinking)",
  },
  {
    id: 36,
    tamil: "மரபுத் தொடரின் பொருளைத் தேர்வு செய்க. சேவல் ————.",
    english: "Choose the correct conventional word. சேவல் (rooster) ______.",
    options: ["கொக்கரிக்கும்", "அகவும்", "கூவும்", "கரையும்"],
    answer: 2,
    explanation: "\"கூவும்\" is the conventional verb for a rooster's crow. சேவல் கூவும் = The rooster crows. மரபு வழக்கு for bird sounds: கோழி கொக்கரிக்கும், காகம் கரையும், குயில் கூவும், மயில் ஆலும்/கூவும். The rooster (சேவல்) specifically uses \"கூவும்\" in Tamil conventional usage.",
    topic: "மரபு வழக்கு (Bird Sounds)",
  },
  {
    id: 37,
    tamil: "உவமைத் தொடர் உணர்த்தும் பொருத்தமான பொருளைத் தேர்ந்தெடுத்து எழுதுக. 'கிணறு வெட்டப் பூதம் கிளம்பியது போல'",
    english: "Find the meaning of the simile: 'Like a demon arising when a well is dug'",
    options: ["எதிர்பாரா நிகழ்வு", "தற்செயல் நிகழ்வு", "எதிர்பார்த்த நிகழ்வு", "எதிர்பார்க்கும் நிகழ்வு"],
    answer: 0,
    explanation: "\"எதிர்பாரா நிகழ்வு\" (unexpected event) is the meaning. The proverb \"கிணறு வெட்டப் பூதம் கிளம்பியது\" means that while digging a well for water, a demon unexpectedly appeared – symbolizing an unforeseen complication arising from a good-intentioned effort. Tamil proverbs and their meanings are key TNPSC topics.",
    topic: "உவமை (Simile/Proverb Meaning)",
  },
  {
    id: 38,
    tamil: "உவமைத் தொடரின் பொருள் தருக. வாழையடி வாழையாக",
    english: "Give the meaning of the simile: வாழையடி வாழையாக (like banana plant from banana plant)",
    options: ["நீண்டகாலம் வாழ்தல்", "தலைமுறை தலைமுறையாக", "சிறப்பு பெறுதல்", "பேணிக் காத்தல்"],
    answer: 1,
    explanation: "\"தலைமுறை தலைமுறையாக\" (generation after generation) is the meaning. வாழையடி வாழை refers to how banana plants continuously sprout new shoots from the base – symbolizing something continuing across generations unbroken. This Tamil proverb describes hereditary traditions, skills, or traits passed down through generations.",
    topic: "உவமை பொருள் (Simile Meaning)",
  },
  {
    id: 39,
    tamil: "உவமைத் தொடரின் பொருள் எழுதுக. ஆயிரங்காலத்துப் பயிர்",
    english: "Write the meaning of: ஆயிரங்காலத்துப் பயிர் (crop of a thousand ages)",
    options: ["நீண்ட காலமாக இருப்பது", "ஆயிரம் வருடம் வளரும் தானியம்", "நீண்ட காலம் வாழாமை", "ஆயிரம் மரங்களின் தொகுதி"],
    answer: 0,
    explanation: "\"நீண்ட காலமாக இருப்பது\" (something that has been existing for a very long time) is the meaning. ஆயிரங்காலத்துப் பயிர் literally means 'crop of a thousand ages' – used to describe something very ancient, deeply rooted, or enduring for extremely long periods. Often used to describe long-standing traditions or institutions.",
    topic: "உவமை பொருள் (Proverb Meaning)",
  },
  {
    id: 40,
    tamil: "குற்றமுறையீட்டு மனுவை ஆங்கிலத்தில் எவ்வாறு அழைப்பர்?",
    english: "What is the English term for குற்றமுறையீட்டு மனு (complaint petition)?",
    options: ["Review Petition", "Requesting Petition", "Common Petition", "Complaint Petition"],
    answer: 3,
    explanation: "\"Complaint Petition\" is the English equivalent of குற்றமுறையீட்டு மனு. மனு = petition/application; குற்றம் = complaint/offence; முறையீடு = formal complaint. In Tamil Nadu administration and legal usage: மனு = petition, வழக்கு = case, குற்றப்பத்திரிகை = charge sheet, தீர்ப்பு = verdict.",
    topic: "கலைச்சொல் (Legal/Administrative Terms)",
  },
  {
    id: 41,
    tamil: "ஆங்கிலச் சொல்லுக்கு நிகரான தமிழ்ச்சொல்லைத் தேர்ந்தெழுதுக. Dubbing",
    english: "Choose the Tamil equivalent for: Dubbing",
    options: ["ஒலிச்சேர்க்கை", "பட வீழ்த்தி", "ஒளிசோகை", "பார்வை நிலைப்பு"],
    answer: 0,
    explanation: "\"ஒலிச்சேர்க்கை\" is the Tamil term for Dubbing. Dubbing in film refers to replacing the original dialogue with a different language's audio – literally adding/merging sound (ஒலி + சேர்க்கை). In Tamil cinema context, when a Hindi or English film is dubbed in Tamil, the process is called ஒலிச்சேர்க்கை.",
    topic: "கலைச்சொல் (Film/Media Terms)",
  },
  {
    id: 42,
    tamil: "ஆங்கிலச் சொல்லுக்கு நேரான தமிழ்ச்சொல்லை அறிதல். Excavation – நேரான தமிழ்ச்சொல் எது?",
    english: "Find the Tamil equivalent for: Excavation",
    options: ["அகழாய்வு", "கல்வெட்டியல்", "பொறிப்பு", "சிற்பக்கலை"],
    answer: 0,
    explanation: "\"அகழாய்வு\" is the Tamil term for Excavation. அகழ் = to dig; ஆய்வு = research/investigation. Archaeological excavation = தொல்லியல் அகழாய்வு. Tamil Nadu has many important archaeological sites: கீழடி (Keeladi), ஆதிச்சநல்லூர் (Adichanallur), etc., where excavations have revealed ancient Tamil civilization.",
    topic: "கலைச்சொல் (Archaeology Terms)",
  },
  {
    id: 43,
    tamil: "ஆங்கிலச் சொல்லுக்குப் பொருத்தமான மொழிபெயர்ப்பைத் தோர்ந்தெடுக்க. Ultraviolet Rays",
    english: "Find the correct Tamil translation for: Ultraviolet Rays",
    options: ["அகசிவப்புக் கதிர்கள்", "புற சிவப்புக் கதிர்கள்", "புற ஊதாக் கதிர்கள்", "சூரிய ஒளிக்கதிர்கள்"],
    answer: 2,
    explanation: "\"புற ஊதாக் கதிர்கள்\" is the Tamil translation of Ultraviolet Rays. Ultra = புற (beyond); Violet = ஊதா (purple/violet colour). Ultraviolet rays are beyond the violet end of the visible spectrum. Compare: Infrared = அகச்சிவப்பு (infra = அக = inner; red = சிவப்பு). These science terms in Tamil are tested in TNPSC.",
    topic: "கலைச்சொல் (Science Terms)",
  },
  {
    id: 44,
    tamil: "\"Cave Paintings\" என்னும் ஆங்கிலச் சொல்லுக்கிணையான தமிழ்ச்சொல்லைத் தேர்க.",
    english: "Find the Tamil equivalent for \"Cave Paintings\"",
    options: ["புதர் ஒவியங்கள்", "துளை ஒவியங்கள்", "மலை ஒவியங்கள்", "குகை ஒவியங்கள்"],
    answer: 3,
    explanation: "\"குகை ஒவியங்கள்\" is the Tamil term for Cave Paintings. குகை = cave; ஒவியம் = painting/drawing. Famous Indian cave paintings: அஜந்தா (Ajanta), எல்லோரா (Ellora). In Tamil Nadu, Mesolithic cave paintings have been found at places like Azhagar Malai. குகை ஒவியங்கள் are prehistoric art works found on cave walls.",
    topic: "கலைச்சொல் (Art/Culture Terms)",
  },
  {
    id: 45,
    tamil: "நடுவணரசு, உ.வே.சா. அவர்களின் தமிழ்த் தொண்டினைப் பெருமைப்படுத்தும் வகையில் 2006 ஆம் ஆண்டு __________ வெளியிட்டுச் சிறப்பித்துள்ளது.",
    english: "The Central Government honoured U.V. Swaminatha Iyer's Tamil service in 2006 by releasing __________.",
    options: ["நூல்நிலையம்", "பதிப்பகம்", "ஓலைச்சுவடி", "அஞ்சல் தலை"],
    answer: 3,
    explanation: "The Central Government released an \"அஞ்சல் தலை\" (postage stamp) in 2006 to honour U.Ve. Swaminatha Iyer (உ.வே.சா.). U.Ve. Swaminatha Iyer (1855-1942) is considered the pioneer of Tamil manuscript research. He discovered and published many ancient Tamil manuscripts including Cilappatikaram, Manimekalai, and Purananuru from palm leaf manuscripts.",
    topic: "தமிழறிஞர் (Tamil Scholar - U.Ve. Swaminatha Iyer)",
  },
  {
    id: 46,
    tamil: "துரை. மாணிக்கம் என்ற இயற்பெயர் கொண்ட கவிஞர் யார்?",
    english: "Which poet has the real name துரை. மாணிக்கம்?",
    options: ["சி. இலக்குவனார்", "முடியரசன்", "கண்ணதாசன்", "பாவலரேறு பெருஞ்சித்திரனார்"],
    answer: 3,
    explanation: "\"பாவலரேறு பெருஞ்சித்திரனார்\" had the real name துரை. மாணிக்கம். He was a celebrated Tamil poet and scholar known for his works on Tamil literature and his advocacy for pure Tamil. பாவலரேறு is an honorific meaning 'king among poets'. He contributed significantly to neo-classical Tamil poetry.",
    topic: "தமிழ் கவிஞர்கள் (Tamil Poets - Pen Names)",
  },
  {
    id: 47,
    tamil: "'தமிழ்ச் சொல்லாராய்ச்சியில் உச்சம் தொட்டவர்' எனப் புகழப்படுவர் யார்?",
    english: "Who is praised as 'one who reached the peak in Tamil word research'?",
    options: ["தெ.பொ. மீனாட்சி சுந்தரனார்", "பாவலரேறு பெருஞ்சித்திரனார்", "தேவநேயப்பாவாணர்", "சி. இலக்குவனார்"],
    answer: 2,
    explanation: "\"தேவநேயப்பாவாணர்\" is renowned as the greatest Tamil etymologist. His real name was குமாரசாமி தேவநேயம். He wrote \"தமிழர் மதம்\" and extensively researched Tamil word origins, arguing that Tamil is the mother of all languages. His works on Tamil linguistics and Dravidian etymology are monumental contributions.",
    topic: "தமிழறிஞர் (Tamil Scholar - Devaneyappaavaanar)",
  },
  {
    id: 48,
    tamil: "'ஏலாதி' – என்ற நூலின் ஆசிரியர்",
    english: "Who is the author of 'ஏலாதி'?",
    options: ["நல்லாதனார்", "நப்பூதனார்", "கணிமேதாவியார்", "ஔவையார்"],
    answer: 2,
    explanation: "\"கணிமேதாவியார்\" is the author of ஏலாதி. ஏலாதி is one of the 18 minor Tamil ethical works (பதினெண்கீழ்க்கணக்கு). It contains 80 verses dealing with ethics and moral philosophy. The title ஏலாதி refers to a type of cardamom (ஏலம்), suggesting that moral knowledge is as precious as spice.",
    topic: "தமிழ் இலக்கிய நூல்கள் (Tamil Literary Works)",
  },
  {
    id: 49,
    tamil: "ஏழு சீர்களைக் கொண்ட ஈரடி வெண்பாக்களால் ஆன நூல்",
    english: "Which book is composed of two-line வெண்பா verses with seven சீர் (metrical units)?",
    options: ["திருக்குறள்", "அந்தாதி", "இரட்டைக் கலம்பகம்", "இரட்டைக் காப்பியம்"],
    answer: 0,
    explanation: "\"திருக்குறள்\" is composed of ஈரடி வெண்பாக்கள் (two-line குறள் வெண்பா). Each குறட்பா has two lines: first line with 4 சீர் and second with 3 சீர் (totaling 7 சீர்). Thirukkural has 1330 couplets divided into 133 chapters of 10 couplets each. Written by Thiruvalluvar, it covers Aram (virtue), Porul (wealth), and Inbam (love).",
    topic: "திருக்குறள் (Thirukkural Prosody)",
  },
  {
    id: 50,
    tamil: "விடுபட்ட சீர் கண்டறிக. ஆக்கம் அதர்வினாய்ச் செல்லும் அசைவுஇலா ஊக்கம் __________ உழை.",
    english: "Find the missing word in this Thirukkural line: ஆக்கம் அதர்வினாய்ச் செல்லும் அசைவுஇலா ஊக்கம் _____ உழை.",
    options: ["உடையான்", "உடைமை", "போல", "குழையும்"],
    answer: 0,
    explanation: "The missing word is \"உடையான்\" – Thirukkural 594: \"ஆக்கம் அதர்வினாய்ச் செல்லும் அசைவிலா ஊக்கம் உடையான் உழை.\" Meaning: Wealth moves toward one who has unwavering determination. This is a couplet from Thirukkural's chapter on determination (ஊக்கமுடைமை). உடையான் = one who possesses (determination).",
    topic: "திருக்குறள் (Thirukkural Fill in the Blank)",
  },
  {
    id: 51,
    tamil: "நிரப்புக. வள்ளுவர் வழி நின்று விடை தருக. ஒழுக்கமாக வாழும் அனைவரும் __________ அடைவர்.",
    english: "Fill in blank based on Thirukkural: Those who live with discipline/virtue will attain __________.",
    options: ["பெருமை", "பொருள் வசதி", "சீரும் சிறப்பும்", "மேன்மை"],
    answer: 3,
    explanation: "\"மேன்மை\" (excellence/nobility) is the answer. This refers to Thirukkural's emphasis on ஒழுக்கம் (discipline/ethics): \"ஒழுக்கம் உடைமை குடிமை இழுக்கம் இழிந்த பிறப்பாய் விடும்\" – Having discipline elevates one's status; lack of it lowers it. Thirukkural consistently links ethical conduct (ஒழுக்கம்) to மேன்மை (moral excellence).",
    topic: "திருக்குறள் (Thirukkural - Virtue)",
  },
  {
    id: 52,
    tamil: "இருவினைகளின் பொருள் வேறுபாடறிந்து சரியான தொடரைத் தேர்ந்தெடுக்க. சேர்ந்து – சேர்த்து",
    english: "Understanding meaning difference of two verbs: சேர்ந்து vs சேர்த்து - choose correct sentence.",
    options: [
      "நானும் என் தம்பியும் சேர்த்து பணத்தைச் சேர்த்து மகிழ்ந்தோம்",
      "நானும் என் தம்பியும் சேர்ந்து பணத்தைச் சேர்த்து மகிழ்ந்தோம்",
      "நானும் என் தம்பியும் சேர்ந்து பணத்தைச் சேர்ந்து மகிழ்ந்தோம்",
      "நானும் என் தம்பியும் சேர்த்து பணத்தைச் சேர்ந்து மகிழ்ந்தோம்"
    ],
    answer: 1,
    explanation: "\"நானும் என் தம்பியும் சேர்ந்து பணத்தைச் சேர்த்து மகிழ்ந்தோம்\" is correct. சேர்ந்து = together (intransitive - joined together); சேர்த்து = having collected/gathered (transitive - collected money). My brother and I (சேர்ந்து = together) collected money (சேர்த்து = accumulated). The two verbs have different transitivity.",
    topic: "இருவினை வேறுபாடு (Two Verbs - Meaning Difference)",
  },
  {
    id: 53,
    tamil: "சரியான தொடரைத் தேர்ந்தெடு. (விரிந்து – விரித்து)",
    english: "Choose correct sentences using விரிந்து and விரித்து:",
    options: [
      "I & II correct",
      "III & IV correct",
      "I & III correct",
      "II & IV correct"
    ],
    answer: 2,
    explanation: "I (விரித்த நூலால் அறிவு விரிந்தது) and III (பூவிதழ் விரிந்தது; மயில்தோகை விரித்தது) are correct. விரிந்து/விரிந்தது = spread/expanded on its own (intransitive - தன்வினை); விரித்து/விரித்தது = spread/expanded something else (transitive - பிறவினை). Flowers bloom on their own (விரிந்தது); peacock spreads its feathers intentionally (விரித்தது).",
    topic: "தன்வினை / பிறவினை (Intransitive/Transitive)",
  },
  {
    id: 54,
    tamil: "ஒற்றுப்பிழையற்ற தொடரைத் தெரிவு செய்க.",
    english: "Choose the sentence without single-letter spelling error:",
    options: ["வாழக்கை படகு", "வெண்டைக்காய்ப் பொரியல்", "தண்ணீர் தொட்டி", "மோர்குழம்பு"],
    answer: 1,
    explanation: "\"வெண்டைக்காய்ப் பொரியல்\" is correctly spelled. வெண்டைக்காய் (ladies' finger/okra) + பொரியல் (stir-fry) with correct sandhi. வாழக்கை should be வாழ்க்கை; தண்ணீர் தொட்டி may have sandhi issues; மோர்குழம்பு should be மோர்க்குழம்பு. Correct spelling with proper consonant doubling is tested.",
    topic: "ஒற்றுப்பிழை திருத்தம் (Spelling Error Correction)",
  },
  {
    id: 55,
    tamil: "எதிர்ச்சொல் தருக. ஈதல்",
    english: "Give the antonym of: ஈதல் (giving/donating)",
    options: ["தருதல்", "வழங்கல்", "ஏற்றல்", "மறுத்தல்"],
    answer: 2,
    explanation: "\"ஏற்றல்\" (receiving/accepting) is the antonym of ஈதல் (giving). ஈதல் means to give/donate (literary Tamil), so its opposite is ஏற்றல் (to receive/accept). TNPSC tests எதிர்ச்சொற்கள் (antonyms) frequently. Other pairs: கொடு-வாங்கு, தா-எடு, பெய்-விடு.",
    topic: "எதிர்ச்சொல் (Antonym)",
  },
  {
    id: 56,
    tamil: "பிறமொழிச் சொற்களுக்கு இணையான தமிழ்ச் சொற்களைக் கண்டறிதல். சரியான இணையைத் தேர்ந்தெடு. கீர்த்தி என்பது",
    english: "Find the correct Tamil equivalent for the Sanskrit-borrowed word 'கீர்த்தி':",
    options: ["கீர்த்தி – வானம்", "கீர்த்தி – இராஜராஜ சோழன்", "கீர்த்தி – புகழ்", "கீர்த்தி – நீரோடை"],
    answer: 2,
    explanation: "\"கீர்த்தி – புகழ்\" is correct. கீர்த்தி is a Sanskrit loanword meaning fame/glory; its pure Tamil equivalent is புகழ் (fame/renown). TNPSC promotes use of pure Tamil words over Sanskrit/English borrowings. Other Sanskrit→Tamil pairs: விஜயம்→வெற்றி, ஆரோக்யம்→நலம், ஸத்யம்→உண்மை.",
    topic: "தமிழ் இணைச்சொல் (Tamil Equivalents for Loanwords)",
  },
  {
    id: 57,
    tamil: "'அழகிய மரம்' – எச்ச வகையை தெரிவு செய்க.",
    english: "What type of participle/relative is 'அழகிய மரம' (beautiful tree)?",
    options: ["தெரிநிலை பெயரெச்சம்", "எதிர்கால பெயரெச்சம்", "குறிப்பு பெயரெச்சம்", "இறந்தகால பெயரெச்சம்"],
    answer: 2,
    explanation: "\"குறிப்பு பெயரெச்சம்\" (implied adjectival participle) is correct. \"அழகிய\" describes the tree without indicating when it was beautiful – it's a permanent quality. குறிப்பு பெயரெச்சம் is a non-finite adjectival form that implies a state without a specific tense reference. Compare: தெரிநிலை பெயரெச்சம் has clear tense (past/present/future).",
    topic: "பெயரெச்சம் (Adjectival Participle)",
  },
  {
    id: 58,
    tamil: "'நில்' என்ற வேர்ச்சொல்லின் வினையாலணையும் பெயரைத் தேர்க.",
    english: "Find the verbal noun (வினையாலணையும் பெயர்) of the root 'நில்' (to stand):",
    options: ["நின்றான்", "நின்றவன்", "நிற்பான்", "நிற்பாய்"],
    answer: 1,
    explanation: "\"நின்றவன்\" (the one who stood) is the வினையாலணையும் பெயர் (deverbal noun/participial noun). It refers to a person/thing by their action. நின்றவன் = the one who stood (past tense participial noun, masculine). வினையாலணையும் பெயர் functions as a noun but derives from a verb, indicating the doer of an action.",
    topic: "வினையாலணையும் பெயர் (Deverbal Noun)",
  },
  {
    id: 59,
    tamil: "எ, யா, ஆ, ஓ, ஏ ஆகிய வினா எழுத்துகளுள் மொழியின் முதலில் வருபவை",
    english: "Among the question letters எ, யா, ஆ, ஓ, ஏ – which ones appear at the beginning of words?",
    options: ["ஓ, யா, ஏ", "ஆ, ஓ, ஏ", "ஆ, ஓ", "எ, யா, ஏ"],
    answer: 3,
    explanation: "\"எ, யா, ஏ\" are the question letters (வினா எழுத்துகள்) that can appear at the beginning of words in Tamil. For example: எது (what), யார் (who), ஏன் (why). ஆ and ஓ are question particles but appear at the end of sentences/words rather than at the beginning. This tests Tamil phonological rules.",
    topic: "வினா எழுத்துகள் (Question Letters)",
  },
  {
    id: 60,
    tamil: "தமிழ் எழுத்துகளில் இன எழுத்து இல்லாத எழுத்து எது?",
    english: "Which Tamil letter has no paired letter (இன எழுத்து)?",
    options: ["உயிர் எழுத்து", "ஆய்த எழுத்து", "மெய் எழுத்து", "நெடில் எழுத்து"],
    answer: 1,
    explanation: "\"ஆய்த எழுத்து\" (ஃ) has no paired letter (இன எழுத்து). The Tamil alphabet has உயிர் (vowels), மெய் (consonants), and உயிர்மெய் (combined). Consonants are grouped into pairs (இனங்கள்) like வல்லினம்-மெல்லினம்-இடையினம். But ஆய்த எழுத்து (ஃ) is unique and standalone with no pair or group affiliation.",
    topic: "ஆய்த எழுத்து (The Tamil Aaytham Letter)",
  },
  {
    id: 61,
    tamil: "ஒலி வேறுபாடிறந்து பொருத்தமானதைத் தேர்ந்தெடு. அரம் – அறம்",
    english: "Understanding sound difference: choose the correct meaning pair for அரம் – அறம்",
    options: ["தருமம் – ஒரு கருவி", "பாதி – தருமம்", "பாம்பு – பாதி", "ஒரு கருவி – தருமம்"],
    answer: 3,
    explanation: "அரம் = ஒரு கருவி (a file/tool used for smoothing), அறம் = தருமம் (virtue/righteousness). The sound difference between \"ர\" and \"ற\" completely changes the meaning. This tests awareness of Tamil consonant pairs: ர (ra) vs ற (ṟa). In Tamil, ர and ற are distinct phonemes with different meanings.",
    topic: "ஒலி வேறுபாடு (Sound Distinction)",
  },
  {
    id: 62,
    tamil: "பின்வரும் சொற்களைத் திருத்தி எழுதுக. பிழையான சொல்: 1. தெண்றல் 2. கன்டம் 3. மன்டபம்",
    english: "Correct the spellings: 1. தெண்றல் 2. கன்டம் 3. மன்டபம்",
    options: [
      "தென்றல், கண்டம், மன்டபம்",
      "தென்றல், கன்டம், மண்டபம்",
      "தென்றல், கண்டம், மண்டபம்",
      "தெண்றல், கனடம், மனபம்"
    ],
    answer: 2,
    explanation: "Correct spellings: தென்றல் (southern breeze), கண்டம் (section/portion), மண்டபம் (hall/mandapam). The errors involve misuse of ண vs ன: தெண்றல்→தென்றல் (ண should be ன before ற); கன்டம்→கண்டம் (ன should be ண before ட); மன்டபம்→மண்டபம் (ன should be ண before ட). Tamil orthography rule: ண appears before ட/ண/த.",
    topic: "ஒற்று திருத்தம் (Consonant Spelling Correction)",
  },
  {
    id: 63,
    tamil: "சேர்த்தெழுதல். 'நீள் + உழைப்பு' – என்னும் சொல்லை சேர்த்து எழுதக் கிடைப்பது.",
    english: "Word combination: What is formed by combining நீள் + உழைப்பு?",
    options: ["நீலுழைப்பு", "நீணுழைப்பு", "நீடுழைப்பு", "நீளுழைப்பு"],
    answer: 3,
    explanation: "\"நீளுழைப்பு\" is correct. Wait – actually the correct answer per PDF tick is (D) நீளுழைப்பு. However grammatically, நீள் + உழைப்பு should apply sandhi rules. நீள் ending in ள் before உ: the ள் is retained and combined → நீளுழைப்பு (long/prolonged labour/effort). This compound word means extended or sustained hard work.",
    topic: "சேர்த்தெழுதல் (Word Combination/Sandhi)",
  },
  {
    id: 64,
    tamil: "பிரித்தெழுதல். இடமெல்லாம்",
    english: "Split the compound word: இடமெல்லாம்",
    options: ["இடம் + மெல்லாம்", "இடம் + எல்லாம்", "இட + எல்லாம்", "இட + மெல்லாம்"],
    answer: 1,
    explanation: "\"இடம் + எல்லாம்\" is correct. இடமெல்லாம் splits into இடம் (place) + எல்லாம் (everywhere/all). Sandhi rule: இடம் ending in ம் + எ beginning → the ம் changes and combines as மெ → இடமெல்லாம். Meaning: everywhere, in all places. Splitting compound words (பிரித்தெழுதல்) is a key TNPSC grammar skill.",
    topic: "பிரித்தெழுதல் (Word Splitting)",
  },
  {
    id: 65,
    tamil: "பிரித்தெழுதுக. 'வெண்குடை' என்னும் சொல்லைப் பிரித்து எழுதக் கிடைப்பது.",
    english: "Split the word வெண்குடை:",
    options: ["வெண் + குடை", "வெண்மை + குடை", "வெள்ளை + குடை", "வெம்மை + குடை"],
    answer: 1,
    explanation: "\"வெண்மை + குடை\" is correct. வெண்குடை splits into வெண்மை (whiteness) + குடை (umbrella). வெண்குடை = white umbrella (symbol of royalty). When வெண்மை combines with குடை, the \"மை\" portion undergoes elision: வெண்மை + குடை → வெண்குடை. This is the sandhi rule of மெய் elision in Tamil.",
    topic: "பிரித்தெழுதல் (Word Splitting with Sandhi)",
  },
  {
    id: 66,
    tamil: "தாவரங்களின் இளம் பருவத்திற்கான சொற்கள்.",
    english: "Words for the young/early stage of plants:",
    options: ["தாறு, குலை, பிள்ளை", "பிள்ளை, குலை, பைங்கூழ்", "குலை, மடலி, பிள்ளை", "பிள்ளை, மடலி, பைங்கூழ்"],
    answer: 3,
    explanation: "\"பிள்ளை, மடலி, பைங்கூழ்\" are the terms for young plants. மரபு வழக்கு for plant stages: பிள்ளை = young plant/sapling; மடலி = young shoot/sprout; பைங்கூழ் = young green crop/seedling. Tamil conventional usage assigns specific terms for each stage of a plant's growth, unlike in colloquial speech.",
    topic: "மரபு வழக்கு - தாவரம் (Plant Terminology)",
  },
  {
    id: 67,
    tamil: "பொருத்தமான பொருளைத் தெரிவு செய்தல். வெற்பு",
    english: "Choose the correct meaning of: வெற்பு",
    options: ["கழனி", "பரிதி", "மலை", "முகில்"],
    answer: 2,
    explanation: "\"மலை\" (mountain) is the meaning of வெற்பு. வெற்பு is a classical Tamil synonym for mountain. Other classical words for mountain: மலை, குன்று, கிரி, சைலம், அத்திரி, வரை, கோட்டு. Tamil classical literature (Sangam) uses these terms in திணை (ecological zone) descriptions – குறிஞ்சி திணை is the mountain region.",
    topic: "சொற்பொருள் (Classical Word Meaning)",
  },
  {
    id: 68,
    tamil: "சரணாலயம் என்பதன் வேறுபெயர்.",
    english: "What is another name for சரணாலயம் (sanctuary/refuge)?",
    options: ["வலசைபோதல்", "வாழ்விடம்", "புகலிடம்", "காப்பகம்"],
    answer: 2,
    explanation: "\"புகலிடம்\" is another word for சரணாலயம் (refuge/sanctuary). சரணம் = surrender/refuge; ஆலயம் = abode/place. புகலிடம் = place of refuge/shelter. In wildlife context, சரணாலயம் = wildlife sanctuary. In humanitarian context, it means a place of safety/asylum for refugees.",
    topic: "சொற்பொருள் / வேறுபெயர் (Word Meaning/Synonyms)",
  },
  {
    id: 69,
    tamil: "சரியான பொருளை அறிக. முரலும்",
    english: "Find the correct meaning of: முரலும்",
    options: ["இசை", "கலை", "மத யானைகள்", "முழங்கும்"],
    answer: 3,
    explanation: "\"முழங்கும்\" (resounds/reverberates) is the meaning of முரலும். முரல் = to sound/resonate; முரலும் = that which sounds/makes noise. In Tamil poetry, முரலும் is used for the sound of waves, animals, music instruments. It refers to a resonant, reverberating sound.",
    topic: "சொற்பொருள் (Classical Word Meaning)",
  },
  {
    id: 70,
    tamil: "இரு பொருள் தருக. சொல்",
    english: "Give two meanings of the word: சொல் (sol)",
    options: ["மொழி – நெல்", "நெல் – வழி", "சோறு – நெடிது", "சொல் – பதர்"],
    answer: 0,
    explanation: "\"மொழி – நெல்\" are two meanings of சொல். சொல் (1) = word/speech (மொழி); சொல் (2) = rice plant/paddy (நெல்) in classical usage. This tests knowledge of பல பொருள் சொற்கள் (polysemous words) – words with multiple meanings in Tamil. Other examples: கை = hand/trunk (elephant), அம்பு = arrow/water.",
    topic: "பல பொருள் சொல் (Polysemy)",
  },
  {
    id: 71,
    tamil: "கை – என்பதன் பொருளைத் தேர்க.",
    english: "Find the meaning of: கை (kai)",
    options: ["அஞ்சனம்", "உண்", "ஒழுக்கம்", "இளமை"],
    answer: 2,
    explanation: "\"ஒழுக்கம்\" (discipline/conduct) is one meaning of கை. கை has multiple meanings: hand (உடல் உறுப்பு), elephant's trunk, conduct/behaviour (ஒழுக்கம்), gain/profit. In the context of this question, கை = ஒழுக்கம் refers to the idiomatic meaning of 'manner of conduct'. This tests multi-meaning word knowledge.",
    topic: "பல பொருள் சொல் (Multiple Meanings)",
  },
  {
    id: 72,
    tamil: "எதிர்ச்சொல்லை எடுத்து எழுதுதல். சேர்த்தல் என்னும் சொல்லின் எதிர்ச்சொல்",
    english: "Give the antonym of: சேர்த்தல் (combining/joining)",
    options: ["நீக்குதல்", "அழித்தல்", "தள்ளுதல்", "போக்குதல்"],
    answer: 0,
    explanation: "\"நீக்குதல்\" (removing/separating) is the antonym of சேர்த்தல் (adding/combining). சேர்த்தல் = to add/join/combine; நீக்குதல் = to remove/separate/exclude. TNPSC tests antonyms (எதிர்ச்சொற்கள்) extensively. Common pairs: சேர்-நீக்கு, கொடு-வாங்கு, இல்-உள், உயர்-தாழ்.",
    topic: "எதிர்ச்சொல் (Antonym)",
  },
  {
    id: 73,
    tamil: "எங்கே, எதற்கு, எப்படி, எவை, என்ன ஆகிய சொற்களுக்குப்பின் எவ்வகை நிறுத்தற்குறி இடம்பெற வேண்டும்?",
    english: "After question words like எங்கே, எதற்கு, எப்படி, எவை, என்ன – what punctuation mark should be placed?",
    options: ["வினாக்குறி", "வியப்புக்குறி", "ஒற்றை மேற்கோள்குறி", "இரட்டை மேற்கோள்குறி"],
    answer: 0,
    explanation: "\"வினாக்குறி\" (?) is the punctuation that follows question words. After எங்கே, எதற்கு, எப்படி, எவை, என்ன – a question mark (வினாக்குறி) must be placed. Tamil punctuation rules: வினாக்குறி (?) for questions, வியப்புக்குறி (!) for exclamations, முற்றுப்புள்ளி (.) for statements.",
    topic: "நிறுத்தற்குறி (Punctuation Marks)",
  },
  {
    id: 74,
    tamil: "ஒரே எழுவாயில் பல தொடர்கள் வருகின்ற இடங்களில் எவ்வகை நிறுத்தற்குறி இடுதல் வேண்டும்?",
    english: "When multiple sentences share one subject, what punctuation should be used to separate them?",
    options: ["அரைப்புள்ளி (;)", "முற்றுப்புள்ளி (.)", "முக்காற்புள்ளி (:)", "காற்புள்ளி (,)"],
    answer: 0,
    explanation: "\"அரைப்புள்ளி\" (;) semicolon is used to separate multiple clauses sharing one subject. For example: \"அவன் படிக்கிறான்; விளையாடுகிறான்; தூங்குகிறான்\" – all three actions by one subject, separated by semicolons. Tamil grammar rules: அரைப்புள்ளி separates related independent clauses.",
    topic: "நிறுத்தற்குறி - அரைப்புள்ளி (Semicolon)",
  },
  {
    id: 75,
    tamil: "'அவன்' என்ற ஆண்பால் பெயர்ச்சொல்லின் சரியான வினைமுடிவைத் தெரிவு செய்க.",
    english: "Choose the correct verb ending for the masculine pronoun 'அவன்':",
    options: ["அவன் வந்தது", "அவன் வந்தார்", "அவன் வந்தாள்", "அவன் வந்தான்"],
    answer: 3,
    explanation: "\"அவன் வந்தான்\" is correct. In Tamil, verb endings must agree with the subject's gender and number: அவன் (he-singular) → verb ends in ஆன் (வந்தான்); அவள் (she) → ஆள் (வந்தாள்); அவர் (honorific/plural) → ஆர் (வந்தார்); அது (neuter) → து (வந்தது). Subject-verb agreement is fundamental Tamil grammar.",
    topic: "வினைமுற்று இணக்கம் (Subject-Verb Agreement)",
  },
  {
    id: 76,
    tamil: "'அவரல பிறவே' என்று தொல்காப்பியம் குறிப்பிடும் திணை எது?",
    english: "Which tier (திணை) does Tolkappiyam refer to as 'அவரல பிறவே'?",
    options: ["விரவுத்திணை", "உயர்திணை", "பொதுத்திணை", "அஃறிணை"],
    answer: 3,
    explanation: "\"அஃறிணை\" (irrational tier) is referred to as 'அவரல பிறவே' in Tolkappiyam. Tolkappiyam's திணை system: உயர்திணை = rational beings (humans, gods) referred to as 'அவர்'; அஃறிணை = irrational beings (animals, objects) referred to as 'அவை/அவரல பிறவே' (those that are not people). This is fundamental Tamil grammar classification.",
    topic: "திணை - தொல்காப்பியம் (Tolkappiyam - Tier Classification)",
  },
  {
    id: 77,
    tamil: "சொல்லையும் பொருளையும் பொருத்துக.",
    english: "Match the words with their meanings:",
    options: [
      "(a)-1, (b)-2, (c)-3, (d)-4",
      "(a)-2, (b)-1, (c)-3, (d)-4",
      "(a)-3, (b)-1, (c)-2, (d)-4",
      "(a)-1, (b)-3, (c)-2, (d)-4"
    ],
    answer: 0,
    explanation: "Match: (a) தீர்வன = 1. நீங்குபவை (things that go away/cease); (b) தெளிவு = 2. நற்காட்சி (good vision/clarity); (c) ஓர்தல் = 3. நல்லறிவு (good wisdom/discernment); (d) கூற்றவா = 4. பிரிவுகளாக (as divisions/sections). This tests classical Tamil vocabulary matching ability.",
    topic: "சொல்-பொருள் பொருத்தம் (Word-Meaning Matching)",
  },
  {
    id: 78,
    tamil: "தொடர்வகை அறிந்து சரியான விடையைத் தெரிவு செய்க. அப்துல் நேற்று வருவித்தான் __________.",
    english: "Identify the type of sentence: 'Abdul brought (someone) yesterday __________.'",
    options: ["செய்தித் தொடர்", "வினாத் தொடர்", "தன்வினைத் தொடர்", "பிறவினைத் தொடர்"],
    answer: 3,
    explanation: "\"பிறவினைத் தொடர்\" (causative/transitive sentence) is correct. \"வருவித்தான்\" = caused (someone) to come (causative verb). In Tamil, வினை types: தன்வினை = intransitive (action on self), பிறவினை = transitive (action on object), செய்வித்தல் வினை = causative. வருவித்தான் = he made someone come (causative).",
    topic: "தொடர் வகை (Sentence Type Classification)",
  },
  {
    id: 79,
    tamil: "கலைச்சொல் அறிக. Transparent",
    english: "Find the Tamil term for: Transparent",
    options: ["ஒளி ஊடுருவக் காட்சி", "ஒளிபரப்பு", "ஒளிபரப்புக் கோபுரம்", "அலைவரிசை"],
    answer: 0,
    explanation: "\"ஒளி ஊடுருவக் காட்சி\" is the Tamil term for Transparent. ஒளி = light; ஊடுருவ = to penetrate through; காட்சி = view/sight. Transparent = allowing light to pass through completely. Compare: Translucent = ஒளி ஊடுருவல் (partial); Opaque = ஒளி ஊடுருவாத (light cannot pass through).",
    topic: "கலைச்சொல் (Science Terms - Optics)",
  },
  {
    id: 80,
    tamil: "கலைச்சொல்லுக்கு நேரான தமிழ்ச்சொல்லைத் தெரிவு செய்க. Nanotechnology",
    english: "Choose the correct Tamil term for: Nanotechnology",
    options: ["உயிரித் தொழில்நுட்பம்", "மீநுண் தொழில்நுட்பம்", "விண்வெளித் தொழில்நுட்பம்", "விண்வெளிக் கதிர்கள்"],
    answer: 1,
    explanation: "\"மீநுண் தொழில்நுட்பம்\" is the Tamil term for Nanotechnology. Nano = மீநுண் (ultra-tiny/extremely small); தொழில்நுட்பம் = technology. Nanotechnology deals with materials at the nanoscale (1-100 nanometers). மீ = ultra/super; நுண் = tiny/minute. This science terminology is increasingly tested in TNPSC.",
    topic: "கலைச்சொல் (Nanotechnology)",
  },
  {
    id: 81,
    tamil: "கலைச்சொல்லுக்கு நேரான தமிழ்ச்சொல். Valley",
    english: "Find the Tamil equivalent for: Valley",
    options: ["மலை", "அருவி", "பள்ளத்தாக்கு", "காடு"],
    answer: 2,
    explanation: "\"பள்ளத்தாக்கு\" is the Tamil term for Valley. பள்ளம் = low-lying area/depression; தாக்கு = region/zone. A valley is a low area between mountains or hills. Famous valleys: காவிரி பள்ளத்தாக்கு (Kaveri Valley), கோதாவரி பள்ளத்தாக்கு. In geography terminology for TNPSC, பள்ளத்தாக்கு is the standard Tamil term.",
    topic: "கலைச்சொல் (Geography Terms)",
  },
  {
    id: 82,
    tamil: "Advocate என்பதன் கலைச்சொல்:",
    english: "What is the Tamil term for: Advocate",
    options: ["வழக்கறிஞர்", "பதிவுரு வழக்குரைஞர்", "வழக்குரைஞர்", "முதுநிலை வழக்குரைஞர்"],
    answer: 2,
    explanation: "\"வழக்குரைஞர்\" is the Tamil term for Advocate. வழக்கு = case/lawsuit; உரைஞர் = one who speaks/argues. An advocate is a person who pleads cases in court. வழக்கறிஞர் = legal expert (general), வழக்குரைஞர் = advocate (specifically one who argues in court). The distinction is important for TNPSC administrative terminology.",
    topic: "கலைச்சொல் (Legal Terms)",
  },
  {
    id: 83,
    tamil: "Directing என்பதற்குத் தமிழில் __________ எனப்படும்.",
    english: "Directing in Tamil is called __________.",
    options: ["இயங்குதல்", "இசைவளித்தல்", "இயக்குதல்", "இயங்காமை"],
    answer: 2,
    explanation: "\"இயக்குதல்\" is the Tamil term for Directing. இயக்கு = to direct/operate/manage; இயக்குதல் = the act of directing. In film industry: இயக்குனர் = director; இயக்குதல் = directing. In administrative context: இயக்குதல் = to direct/manage operations. TNPSC tests film industry terminology in Tamil.",
    topic: "கலைச்சொல் (Film Direction)",
  },
  {
    id: 84,
    tamil: "பழமொழியின் பொருளைத் தேர்வு செய்து எழுதுக. அளவுக்கு __________.",
    english: "Choose the correct meaning of the proverb: அளவுக்கு ________ (Everything has a measure/limit)",
    options: ["மிஞ்சினால் அமிர்தமும் நஞ்சு", "மிஞ்சினால் அமிர்தமும் பஞ்சு", "மிஞ்சினால் அமிர்தமும் மஞ்சு", "அமிர்தமும் நஞ்சு மிஞ்சினால்"],
    answer: 0,
    explanation: "\"மிஞ்சினால் அமிர்தமும் நஞ்சு\" completes the proverb. Full proverb: \"அளவுக்கு மிஞ்சினால் அமிர்தமும் நஞ்சு\" – Even nectar (ambrosia) becomes poison if taken in excess. This teaches the virtue of moderation. In medicine, dosage is critical; even beneficial substances harm when overdosed. A timeless wisdom applicable to all aspects of life.",
    topic: "பழமொழி (Proverb)",
  },
  {
    id: 85,
    tamil: "பழமொழியின் பொருளைத் தேர்வு செய்க. விருந்தும் __________.",
    english: "Complete the proverb: விருந்தும் ________ (A feast/guest and...)",
    options: ["மருந்தும் இரண்டு நாள்", "மருந்தும் மூன்று நாள்", "மருந்தும் ஐந்து நாள்", "மருந்தும் ஒரு நாள்"],
    answer: 1,
    explanation: "\"மருந்தும் மூன்று நாள்\" completes the proverb. \"விருந்தும் மருந்தும் மூன்று நாள்\" – Both a feast/guest and medicine are (good) only for three days. This proverb means: guests should not overstay their welcome, and medicine should not be taken indefinitely. It emphasizes knowing when to stop/leave.",
    topic: "பழமொழி (Proverb)",
  },
  {
    id: 86,
    tamil: "பழமொழி உணர்த்தும் சரியான பொருளைக் கூறுக. மண்குதிரையை நம்பி, ஆற்றில் இறங்கலாமா?",
    english: "What meaning does the proverb convey: 'Can one enter the river trusting a clay horse?'",
    options: [
      "தகுதியுள்ளவரை நம்பி, நாம் செயலில் இறங்குவது",
      "தகுதியில்லாதவரை நம்பி, நாம் செயலில் இறங்கலாமா",
      "நாம் ஆற்றில் இறங்குவது",
      "நாம் செயலில் செய்வது"
    ],
    answer: 1,
    explanation: "\"தகுதியில்லாதவரை நம்பி, நாம் செயலில் இறங்கலாமா\" (Should we undertake action trusting someone unqualified?) is the meaning. A clay horse dissolves in water – it's useless for crossing a river. The proverb warns against depending on incompetent/unreliable people for important tasks. It's about due diligence in choosing helpers.",
    topic: "பழமொழி பொருள் (Proverb Meaning)",
  },
  {
    id: 87,
    tamil: "மரபுத் தொடருக்கு ஏற்ற பொருளைத் தேர்வு செய்க. ஆ __________.",
    english: "Choose the correct conventional word for: ஆ (cow) ________",
    options: ["மந்தை", "கூட்டம்", "நிரை", "குவியல்"],
    answer: 2,
    explanation: "\"நிரை\" is the conventional collective noun for cows (ஆ நிரை). In Tamil மரபு வழக்கு, collective nouns are specific to each animal: ஆ நிரை = herd of cows; யானை கூட்டம் = herd of elephants; மீன் திரள் = school of fish; பறவை திரள் = flock of birds. Using the wrong collective noun is a மரபுப் பிழை.",
    topic: "மரபு வழக்கு - திரட்டுப் பெயர் (Collective Nouns)",
  },
  {
    id: 88,
    tamil: "நாளந்தா பல்கலைக்கழகம் அமைந்திருந்த ஊர் எது?",
    english: "In which town was the Nalanda University located?",
    options: ["ராஜகிர்", "ராசுகிர்", "ராகிர்", "கிர் ராஜ்"],
    answer: 0,
    explanation: "\"ராஜகிர்\" (Rajgir) is where Nalanda University was located, near Nalanda in present-day Bihar. Nalanda was the world's first residential university (5th century CE). It had 2,000 teachers and 10,000 students. Subjects taught included theology, philosophy, logic, grammar, medicine, and mathematics. Chinese scholar Xuanzang studied here.",
    topic: "நாளந்தா பல்கலைக்கழகம் (Nalanda University)",
  },
  {
    id: 89,
    tamil: "நாளந்தா பல்கலைக்கழகத்தில் இருந்த மாணவர்களின் எண்ணிக்கை.",
    english: "How many students were there in Nalanda University?",
    options: ["1,000", "10,000", "1,00,000", "2,000"],
    answer: 1,
    explanation: "Nalanda University had 10,000 students at its peak. It also had 2,000 teachers. The university's library (\"Dharmaganj\") had 9-storey buildings containing 90 lakh (9 million) manuscripts. When destroyed by Bakhtiyar Khilji in 1193 CE, it burned for months. Modern Nalanda University was revived in 2014 at Rajgir.",
    topic: "நாளந்தா பல்கலைக்கழகம் (Nalanda University Students)",
  },
  {
    id: 90,
    tamil: "நாளந்தா பல்கலைக்கழகம் யார் காலத்தில் கட்டப்பட்டது?",
    english: "During whose reign was Nalanda University built?",
    options: ["பல்லவர்கள்", "முகலாயர்கள்", "குப்தர்கள்", "சோமர்கள்"],
    answer: 2,
    explanation: "Nalanda University was built during the \"குப்தர்கள்\" (Gupta) period (5th century CE). The Gupta Empire (320-550 CE) is called the Golden Age of India. Emperor Kumaragupta I founded Nalanda. The Guptas patronized arts, science, and education. Aryabhata, Kalidasa, and Varahamihira flourished during this period.",
    topic: "நாளந்தா - குப்த பேரரசு (Nalanda - Gupta Empire)",
  },
  {
    id: 91,
    tamil: "முதல் உண்டு உறைவிடப் பல்கலைக்கழகம் எது?",
    english: "Which was the world's first residential university?",
    options: ["சென்னைப் பல்கலைக்கழகம்", "அண்ணாப் பல்கலைக்கழகம்", "நாளந்தா பல்கலைக்கழகம்", "அண்ணாமலைப் பல்கலைக்கழகம்"],
    answer: 2,
    explanation: "\"நாளந்தா பல்கலைக்கழகம்\" (Nalanda University) was the world's first residential university. Located in Bihar, India, it was established in the 5th century CE. Students from China, Korea, Japan, Tibet, Mongolia, Turkey, and Sri Lanka came to study here. It was a self-contained campus with dormitories, temples, libraries, and classrooms.",
    topic: "நாளந்தா (World's First Residential University)",
  },
  {
    id: 92,
    tamil: "நாளந்தா பல்கலைக்கழக நூலகத்தில் உள்ள நூல்களின் எண்ணிக்கை.",
    english: "How many books were in the Nalanda University library?",
    options: ["10,000", "2,000", "80 லட்சம்", "90 லட்சம்"],
    answer: 3,
    explanation: "The Nalanda University library had 90 லட்சம் (9 million = 90 lakh) books/manuscripts. The library complex was called \"Dharmaganj\" and consisted of three large buildings: Ratnasagara, Ratnodadhi, and Ratnaranjaka. When destroyed, the manuscripts burned for months. This illustrates the immense knowledge repository of ancient India.",
    topic: "நாளந்தா நூலகம் (Nalanda Library)",
  },
  {
    id: 93,
    tamil: "புரட்கொடி என்னும் காவியத்துக்காக __________ இல் தமிழக அரசு முடியரசன் அவர்களுக்கு பரிசு வழங்கியது.",
    english: "The Tamil Nadu Government gave Mudiyarasan award for the epic 'Puratkodi' in year __________.",
    options: ["1965", "1960", "1980", "1966"],
    answer: 3,
    explanation: "The Tamil Nadu Government awarded Mudiyarasan for \"புரட்கொடி\" in 1966. Mudiyarasan (முடியரசன்) is a celebrated Tamil poet known for progressive and revolutionary poetry. புரட்கொடி (Flag of Revolution) is his epic poem celebrating social reform and Tamil renaissance values.",
    topic: "தமிழ் கவிஞர் - முடியரசன் (Tamil Poet - Mudiyarasan)",
  },
  {
    id: 94,
    tamil: "\"கலங்காதிரு மனமே\" என்ற பாடலை எழுதியவரைக் கண்டறிக.",
    english: "Who wrote the song \"கலங்காதிரு மனமே\" (Don't be troubled, my heart)?",
    options: ["பாரதிதாசன்", "கண்ணதாசன்", "வைரமுத்து", "நாகூர் ரூமி"],
    answer: 1,
    explanation: "\"கண்ணதாசன்\" wrote \"கலங்காதிரு மனமே\". Kannadasan (1927-1981) was one of Tamil cinema's greatest lyricists, writing over 5000 songs. He was also a novelist and philosopher. His philosophical songs like \"கலங்காதிரு மனமே\" reflect deep spiritual and existential wisdom. He is called கவியரசர் (King of Poets) in Tamil cinema.",
    topic: "தமிழ் கவிஞர் - கண்ணதாசன் (Kannadasan)",
  },
  {
    id: 95,
    tamil: "'தமிழ் முனிவர்களுள் ஒருவராக விளங்குகின்றார்' என வீரமாமுனிவருக்குப் புகழாரம் சூட்டியவர் யார்?",
    english: "Who praised Veeramamunivar as 'one shining among Tamil sages'?",
    options: ["தேவநேயப்பாவாணர்", "பாரதியார்", "மஸ்தான் சாகிபு", "ரா.பி. சேதுப்பிள்ளை"],
    answer: 3,
    explanation: "\"ரா.பி. சேதுப்பிள்ளை\" praised Veeramamunivar (வீரமாமுனிவர்). Veeramamunivar (Constantius Joseph Beschi, 1680-1747) was an Italian Jesuit missionary who mastered Tamil and wrote \"தேம்பாவாணி\" (the first Tamil Christian epic). He also wrote Tamil dictionaries and grammar works, greatly contributing to Tamil literary tradition.",
    topic: "வீரமாமுனிவர் (Veeramamunivar)",
  },
  {
    id: 96,
    tamil: "சென்னையிலுள்ள எப்பகுதியில் சமயப்பணி ஆற்றினார் ஜி.யு. போப்?",
    english: "In which area of Chennai did G.U. Pope do his religious work?",
    options: ["அடையாறு", "திருவல்லிக்கேணி", "சாந்தோம்", "பெசண்ட் நகர்"],
    answer: 2,
    explanation: "G.U. Pope (George Uglow Pope, 1820-1908) did his religious work in \"சாந்தோம்\" (Santhome) area of Chennai. He was a British missionary and Tamil scholar who translated Thirukkural and Naladiyar into English. His Tamil translations greatly helped Western academics understand Tamil literature. சாந்தோம் is famous for the Santhome Cathedral.",
    topic: "ஜி.யு. போப் (G.U. Pope - Tamil Scholar)",
  },
  {
    id: 97,
    tamil: "நிரப்புக. சிறுபஞ்சமூலத்தின் ஒவ்வொரு பாடலிலும் __________ கருத்துகள் இடம்பெற்றுள்ளன.",
    english: "Fill in blank: Each poem in சிறுபஞ்சமூலம் contains __________ thoughts/ideas.",
    options: ["மூன்று", "நான்கு", "ஐந்து", "ஆறு"],
    answer: 2,
    explanation: "Each poem in சிறுபஞ்சமூலம் contains 5 (ஐந்து) thoughts/ideas. சிறுபஞ்சமூலம் is one of the 18 minor classical Tamil ethical works (பதினெண்கீழ்க்கணக்கு), authored by காரியாசான். It contains 100 verses (வெண்பாக்கள்), each encoding five moral ideas. The title itself means 'five small roots' – a medicinal metaphor for five-fold wisdom.",
    topic: "சிறுபஞ்சமூலம் (Classical Tamil Work)",
  },
  {
    id: 98,
    tamil: "பொருத்தமானதைத் தேர்ந்தெடுத்து எழுதுக. திரிகடுகத்திலுள்ள ஒவ்வொரு பாடலிலும் __________ கருத்துகள் இடம் பெற்றுள்ளன.",
    english: "Fill in blank: Each poem in திரிகடுகம் contains __________ thoughts.",
    options: ["மூன்று", "ஐந்து", "பத்து", "ஏழு"],
    answer: 0,
    explanation: "Each poem in திரிகடுகம் contains 3 (மூன்று) thoughts/moral ideas. திரிகடுகம் is one of the 18 minor classical Tamil ethical works (பதினெண்கீழ்க்கணக்கு), written by நல்லாதனார். It contains 100 verses. The title திரிகடுகம் refers to three medicinal herbs (கடுக்காய், நெல்லிக்காய், தான்றிக்காய்) – symbolizing three-fold moral wisdom per verse.",
    topic: "திரிகடுகம் (Classical Tamil Work)",
  },
  {
    id: 99,
    tamil: "கீழ்க்கண்ட குறளின் விடுபட்ட சீர் கண்டறிக. உளரெனும் மாத்திரையர் அல்லால் பயவாக களரனையர் __________ தவர்.",
    english: "Find the missing word in this Thirukkural: உளரெனும் மாத்திரையர் அல்லால் பயவாக களரனையர் __________ தவர்.",
    options: ["அல்லா", "தல்லா", "மல்லா", "கல்லா"],
    answer: 3,
    explanation: "The missing word is \"கல்லா\" – Thirukkural: \"உளரெனும் மாத்திரையர் அல்லால் பயவாக களரனையர் கல்லா தவர்.\" Meaning: The unlearned exist merely to say they exist; they are like barren saline land – yielding no fruit. கல்லா = those who have not learned/studied. This couplet is from the chapter on learning (கல்வி), emphasizing the emptiness of an uneducated existence.",
    topic: "திருக்குறள் - கல்வி அதிகாரம் (Thirukkural - Education Chapter)",
  },
  {
    id: 100,
    tamil: "சீர்களை முறைப்படுத்தி எழுதுக.",
    english: "Arrange the சீர் (metrical units) in correct order:",
    options: [
      "செல்வத்துள் செல்வம் பொருட்செல்வம் அருட்செல்வம்",
      "செல்வத்துள் செல்வம் அருட்செல்வம் பொருட்செல்வம்",
      "பொருட்செல்வம் செல்வத்துள் செல்வம் அருட்செல்வம்",
      "அருட்செல்வம் செல்வத்துள் செல்வம் பொருட்செல்வம்"
    ],
    answer: 3,
    explanation: "Correct order: \"அருட்செல்வம் செல்வத்துள் செல்வம் பொருட்செல்வம்\" – This is Thirukkural 400: \"அருட்செல்வம் செல்வத்துள் செல்வம் பொருட்செல்வம் நின்றன்மை நீர அரிது.\" Meaning: Wealth of grace (அருள்) is the true wealth; material wealth (பொருள்) is unstable/impermanent. Thirukkural prioritizes moral/spiritual wealth over material possessions.",
    topic: "திருக்குறள் - சீர் வரிசை (Thirukkural - Metrical Order)",
  },
];

// ─── TOPIC COLORS ────────────────────────────────────────────────────────────
const TOPIC_COLORS = [
  "#FF6B6B","#FF8E53","#FFC300","#52D726","#00C9FF",
  "#845EC2","#F9A1BC","#00B4D8","#4CC9F0","#E76F51",
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function Technical_Exam_Diploma_2025() {
  const [activeTab, setActiveTab] = useState("study");
  const [quizState, setQuizState] = useState("idle"); // idle | playing | result
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [studyQ, setStudyQ] = useState(0);
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

  // Topics for filter
  const topics = ["all", ...Array.from(new Set(ALL_QUESTIONS.map(q => q.topic.split("(")[0].trim())))];

  const filtered = ALL_QUESTIONS.filter(q => {
    const matchSearch = searchText === "" ||
      q.tamil.includes(searchText) ||
      q.english.toLowerCase().includes(searchText.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchText.toLowerCase());
    const matchFilter = filter === "all" || q.topic.startsWith(filter);
    return matchSearch && matchFilter;
  });

  // Timer effect
  useEffect(() => {
    if (timerActive && quizState === "playing") {
      timerRef.current = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            handleAutoNext();
            return 60;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive, currentQ, quizState]);

  function startQuiz(useTimer) {
    setQuizState("playing");
    setCurrentQ(0);
    setSelected(null);
    setShowExp(false);
    setScore(0);
    setAnswers([]);
    setTimerActive(useTimer);
    setTimer(60);
  }

  function handleAutoNext() {
    const q = ALL_QUESTIONS[currentQ];
    const newAnswers = [...answers, { qid: q.id, chosen: null, correct: false }];
    setAnswers(newAnswers);
    if (currentQ + 1 < ALL_QUESTIONS.length) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowExp(false);
      setTimer(60);
    } else {
      finishQuiz(newAnswers);
    }
  }

  function handleSelect(idx) {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    setSelected(idx);
    setShowExp(true);
    const q = ALL_QUESTIONS[currentQ];
    const correct = q.answer === idx;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { qid: q.id, chosen: idx, correct }]);
  }

  function handleNext() {
    if (currentQ + 1 < ALL_QUESTIONS.length) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowExp(false);
      setTimer(60);
      if (timerActive) setTimerActive(true);
    } else {
      finishQuiz(answers);
    }
  }

  function finishQuiz(ans) {
    clearInterval(timerRef.current);
    setQuizState("result");
    setTimerActive(false);
  }

  const pct = ALL_QUESTIONS.length > 0 ? Math.round((score / ALL_QUESTIONS.length) * 100) : 0;
  const grade = pct >= 90 ? "A+" : pct >= 75 ? "A" : pct >= 60 ? "B" : pct >= 40 ? "C" : "D";

  const styles = {
    app: {
      fontFamily: "'Noto Serif Tamil', 'Noto Sans Tamil', Georgia, serif",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0d1117 100%)",
      color: "#e8e0ff",
    },
    header: {
      background: "linear-gradient(90deg, #1a0a2e 0%, #2d1b69 50%, #0d1b39 100%)",
      borderBottom: "2px solid #6c3fc5",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "12px",
    },
    logo: {
      fontSize: "1.4rem",
      fontWeight: "700",
      background: "linear-gradient(90deg, #c084fc, #818cf8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "0.05em",
    },
    badge: {
      background: "#2d1b69",
      border: "1px solid #6c3fc5",
      borderRadius: "20px",
      padding: "4px 14px",
      fontSize: "0.75rem",
      color: "#c084fc",
    },
    tabs: {
      display: "flex",
      borderBottom: "2px solid #2d1b69",
      background: "#0f0f1f",
    },
    tab: (active) => ({
      flex: 1,
      padding: "14px 8px",
      border: "none",
      background: active ? "linear-gradient(180deg, #2d1b69 0%, #1a0a2e 100%)" : "transparent",
      color: active ? "#c084fc" : "#6b7280",
      fontFamily: "inherit",
      fontSize: "0.85rem",
      fontWeight: active ? "700" : "400",
      cursor: "pointer",
      borderBottom: active ? "3px solid #c084fc" : "3px solid transparent",
      transition: "all 0.2s",
      letterSpacing: "0.05em",
    }),
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "24px 16px",
    },
    card: {
      background: "linear-gradient(135deg, #1a0a2e 0%, #0d1117 100%)",
      border: "1px solid #2d1b69",
      borderRadius: "16px",
      padding: "24px",
      marginBottom: "20px",
      boxShadow: "0 4px 24px rgba(108,63,197,0.15)",
    },
    qNumber: {
      fontSize: "0.75rem",
      color: "#6c3fc5",
      fontWeight: "700",
      letterSpacing: "0.1em",
      marginBottom: "8px",
    },
    qTamil: {
      fontSize: "1.15rem",
      lineHeight: "1.7",
      marginBottom: "6px",
      color: "#e8e0ff",
      fontWeight: "600",
    },
    qEnglish: {
      fontSize: "0.85rem",
      color: "#9ca3af",
      marginBottom: "20px",
      fontStyle: "italic",
    },
    optionBtn: (state) => ({
      width: "100%",
      textAlign: "left",
      padding: "12px 16px",
      margin: "6px 0",
      borderRadius: "10px",
      border: `2px solid ${state === "correct" ? "#22c55e" : state === "wrong" ? "#ef4444" : state === "reveal" ? "#f59e0b" : "#2d1b69"}`,
      background: state === "correct" ? "rgba(34,197,94,0.1)" : state === "wrong" ? "rgba(239,68,68,0.08)" : state === "reveal" ? "rgba(245,158,11,0.08)" : "rgba(45,27,105,0.2)",
      color: state === "correct" ? "#4ade80" : state === "wrong" ? "#f87171" : state === "reveal" ? "#fbbf24" : "#c4b5fd",
      fontSize: "0.95rem",
      cursor: selected !== null ? "default" : "pointer",
      transition: "all 0.2s",
      fontFamily: "inherit",
      lineHeight: "1.5",
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
    }),
    expBox: {
      background: "rgba(108,63,197,0.08)",
      border: "1px solid #6c3fc5",
      borderRadius: "12px",
      padding: "16px",
      marginTop: "16px",
    },
    expTitle: {
      fontSize: "0.8rem",
      fontWeight: "700",
      color: "#c084fc",
      marginBottom: "8px",
      letterSpacing: "0.05em",
    },
    expText: {
      fontSize: "0.9rem",
      lineHeight: "1.7",
      color: "#d1d5db",
    },
    topicTag: {
      display: "inline-block",
      background: "rgba(192,132,252,0.12)",
      border: "1px solid rgba(192,132,252,0.3)",
      borderRadius: "20px",
      padding: "2px 10px",
      fontSize: "0.72rem",
      color: "#c084fc",
      marginTop: "8px",
    },
    btn: {
      padding: "12px 28px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg, #7c3aed, #6c3fc5)",
      color: "#fff",
      fontFamily: "inherit",
      fontSize: "0.95rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.2s",
      letterSpacing: "0.05em",
    },
    btnGhost: {
      padding: "10px 22px",
      borderRadius: "10px",
      border: "1px solid #6c3fc5",
      background: "transparent",
      color: "#c084fc",
      fontFamily: "inherit",
      fontSize: "0.9rem",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    progressBar: {
      height: "6px",
      background: "#2d1b69",
      borderRadius: "3px",
      marginBottom: "20px",
      overflow: "hidden",
    },
    timerCircle: {
      width: "52px",
      height: "52px",
      borderRadius: "50%",
      background: timer <= 10 ? "rgba(239,68,68,0.2)" : "rgba(108,63,197,0.2)",
      border: `3px solid ${timer <= 10 ? "#ef4444" : "#6c3fc5"}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      fontWeight: "700",
      color: timer <= 10 ? "#ef4444" : "#c084fc",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "0.9rem",
    },
    th: {
      padding: "10px 14px",
      background: "#2d1b69",
      color: "#c084fc",
      textAlign: "left",
      fontWeight: "700",
      fontSize: "0.8rem",
      letterSpacing: "0.05em",
    },
    td: (alt) => ({
      padding: "10px 14px",
      background: alt ? "rgba(45,27,105,0.15)" : "transparent",
      borderBottom: "1px solid #1f1038",
      color: "#d1d5db",
      verticalAlign: "top",
    }),
    statBox: {
      textAlign: "center",
      padding: "20px",
      background: "rgba(45,27,105,0.3)",
      borderRadius: "12px",
      border: "1px solid #2d1b69",
    },
  };

  function getOptionState(qIdx, optIdx) {
    if (selected === null) return "default";
    const q = ALL_QUESTIONS[qIdx];
    if (q.answer === null) {
      return optIdx === selected ? "wrong" : "default";
    }
    if (optIdx === q.answer) return "correct";
    if (optIdx === selected && selected !== q.answer) return "wrong";
    return "default";
  }

  // ── STUDY TAB ──────────────────────────────────────────────────────────────
  function StudyTab() {
    const q = filtered[studyQ] || ALL_QUESTIONS[0];
    const qIdx = ALL_QUESTIONS.indexOf(q);

    return (
      <div style={styles.container}>
        {/* Search & filter */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          <input
            value={searchText}
            onChange={e => { setSearchText(e.target.value); setStudyQ(0); }}
            placeholder="🔍 Search questions..."
            style={{
              flex: 1, minWidth: "160px", padding: "10px 14px", borderRadius: "10px",
              background: "#1a0a2e", border: "1px solid #2d1b69", color: "#e8e0ff",
              fontFamily: "inherit", fontSize: "0.9rem",
            }}
          />
          <select
            value={filter}
            onChange={e => { setFilter(e.target.value); setStudyQ(0); }}
            style={{
              padding: "10px 14px", borderRadius: "10px", background: "#1a0a2e",
              border: "1px solid #2d1b69", color: "#c084fc", fontFamily: "inherit",
            }}
          >
            <option value="all">All Topics</option>
            {topics.slice(1).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div style={{ ...styles.card, textAlign: "center", color: "#6b7280" }}>No questions match.</div>
        ) : (
          <>
            {/* Nav */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
              <button style={styles.btnGhost} onClick={() => setStudyQ(s => Math.max(0, s - 1))} disabled={studyQ === 0}>← Prev</button>
              <span style={{ color: "#9ca3af", fontSize: "0.85rem" }}>{studyQ + 1} / {filtered.length}</span>
              <button style={styles.btnGhost} onClick={() => setStudyQ(s => Math.min(filtered.length - 1, s + 1))} disabled={studyQ === filtered.length - 1}>Next →</button>
              <span style={{ marginLeft: "auto", ...styles.badge }}>Q {q.id} of 100</span>
            </div>

            {/* Question card */}
            <div style={styles.card}>
              <div style={styles.qNumber}>QUESTION {q.id} · {q.topic}</div>
              <div style={styles.qTamil}>{q.tamil}</div>
              <div style={styles.qEnglish}>{q.english}</div>

              {/* Options Table */}
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Opt</th>
                      <th style={styles.th}>Tamil Option</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {q.options.map((opt, i) => {
                      const isAns = q.answer === i;
                      const isUnclear = q.answer === null;
                      return (
                        <tr key={i}>
                          <td style={{ ...styles.td(i % 2 === 0), fontWeight: "700", color: "#c084fc", whiteSpace: "nowrap" }}>
                            {["A","B","C","D","E"][i]}
                          </td>
                          <td style={{ ...styles.td(i % 2 === 0), color: isAns ? "#4ade80" : isUnclear ? "#d1d5db" : "#d1d5db" }}>
                            {opt}
                          </td>
                          <td style={styles.td(i % 2 === 0)}>
                            {isUnclear ? (
                              <span style={{ fontSize: "0.75rem", color: "#f59e0b", background: "rgba(245,158,11,0.1)", padding: "2px 8px", borderRadius: "6px" }}>Answer not clarified by TNPSC</span>
                            ) : isAns ? (
                              <span style={{ fontSize: "0.75rem", color: "#4ade80", background: "rgba(34,197,94,0.1)", padding: "2px 8px", borderRadius: "6px" }}>✓ Correct Answer</span>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Explanation */}
              <div style={{ ...styles.expBox, marginTop: "20px" }}>
                <div style={styles.expTitle}>📚 DETAILED EXPLANATION</div>
                <div style={styles.expText}>{q.explanation}</div>
                <div style={styles.topicTag}>🏷️ {q.topic}</div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // ── QUIZ TAB ───────────────────────────────────────────────────────────────
  function QuizTab() {
    if (quizState === "idle") {
      return (
        <div style={styles.container}>
          <div style={{ ...styles.card, textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🎯</div>
            <h2 style={{ color: "#c084fc", marginBottom: "8px", fontSize: "1.4rem" }}>TNPSC Tamil Quiz</h2>
            <p style={{ color: "#9ca3af", marginBottom: "24px", fontSize: "0.9rem" }}>100 questions from CTSDITET&GS/2025 Diploma exam</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              <div style={styles.statBox}>
                <div style={{ fontSize: "2rem", fontWeight: "700", color: "#c084fc" }}>100</div>
                <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Total Questions</div>
              </div>
              <div style={styles.statBox}>
                <div style={{ fontSize: "2rem", fontWeight: "700", color: "#4ade80" }}>150</div>
                <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Total Marks</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button style={styles.btn} onClick={() => startQuiz(false)}>▶ Start Quiz (No Timer)</button>
              <button style={{ ...styles.btn, background: "linear-gradient(90deg, #dc2626, #b91c1c)" }} onClick={() => startQuiz(true)}>⏱ Timed Mode (60s/Q)</button>
            </div>
          </div>
        </div>
      );
    }

    if (quizState === "result") {
      const correct = answers.filter(a => a.correct).length;
      const wrong = answers.filter(a => !a.correct && a.chosen !== null).length;
      const skipped = answers.filter(a => a.chosen === null).length;

      return (
        <div style={styles.container}>
          <div style={{ ...styles.card, textAlign: "center" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "8px" }}>{pct >= 60 ? "🏆" : "📝"}</div>
            <h2 style={{ color: "#c084fc", fontSize: "1.6rem", marginBottom: "4px" }}>Quiz Complete!</h2>
            <div style={{ fontSize: "3rem", fontWeight: "900", color: pct >= 60 ? "#4ade80" : "#f87171", marginBottom: "4px" }}>{pct}%</div>
            <div style={{ fontSize: "1.1rem", color: "#9ca3af", marginBottom: "24px" }}>Grade: <strong style={{ color: "#c084fc" }}>{grade}</strong></div>

            <div style={{ overflowX: "auto", marginBottom: "20px" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Metric</th>
                    <th style={styles.th}>Count</th>
                    <th style={styles.th}>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td(false)}>✅ Correct</td>
                    <td style={{ ...styles.td(false), color: "#4ade80", fontWeight: "700" }}>{correct}</td>
                    <td style={{ ...styles.td(false), color: "#4ade80" }}>{Math.round(correct / 100 * 100)}%</td>
                  </tr>
                  <tr>
                    <td style={styles.td(true)}>❌ Wrong</td>
                    <td style={{ ...styles.td(true), color: "#f87171", fontWeight: "700" }}>{wrong}</td>
                    <td style={{ ...styles.td(true), color: "#f87171" }}>{Math.round(wrong / 100 * 100)}%</td>
                  </tr>
                  <tr>
                    <td style={styles.td(false)}>⏭ Skipped</td>
                    <td style={{ ...styles.td(false), color: "#f59e0b", fontWeight: "700" }}>{skipped}</td>
                    <td style={{ ...styles.td(false), color: "#f59e0b" }}>{Math.round(skipped / 100 * 100)}%</td>
                  </tr>
                  <tr>
                    <td style={{ ...styles.td(true), fontWeight: "700", color: "#c084fc" }}>📊 Score</td>
                    <td style={{ ...styles.td(true), fontWeight: "700", color: "#c084fc" }}>{score}/100</td>
                    <td style={{ ...styles.td(true), fontWeight: "700", color: "#c084fc" }}>{pct}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Detailed review */}
            <h3 style={{ color: "#c084fc", textAlign: "left", marginBottom: "12px" }}>Answer Review</h3>
            <div style={{ overflowX: "auto", marginBottom: "20px" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Q#</th>
                    <th style={styles.th}>Question (Tamil)</th>
                    <th style={styles.th}>Your Answer</th>
                    <th style={styles.th}>Correct</th>
                    <th style={styles.th}>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {answers.map((a, i) => {
                    const q = ALL_QUESTIONS.find(q => q.id === a.qid);
                    if (!q) return null;
                    return (
                      <tr key={i}>
                        <td style={styles.td(i % 2 === 0)}>{q.id}</td>
                        <td style={{ ...styles.td(i % 2 === 0), maxWidth: "220px", fontSize: "0.82rem" }}>{q.tamil.substring(0, 60)}{q.tamil.length > 60 ? "..." : ""}</td>
                        <td style={{ ...styles.td(i % 2 === 0), fontSize: "0.82rem", color: "#9ca3af" }}>
                          {a.chosen !== null ? `(${["A","B","C","D"][a.chosen]}) ${q.options[a.chosen]?.substring(0, 25)}` : "–"}
                        </td>
                        <td style={{ ...styles.td(i % 2 === 0), fontSize: "0.82rem", color: "#4ade80" }}>
                          {q.answer !== null ? `(${["A","B","C","D"][q.answer]}) ${q.options[q.answer]?.substring(0, 25)}` : "Unclear"}
                        </td>
                        <td style={styles.td(i % 2 === 0)}>
                          {a.correct ? "✅" : a.chosen === null ? "⏭" : "❌"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button style={styles.btn} onClick={() => startQuiz(false)}>🔄 Retry</button>
              <button style={styles.btnGhost} onClick={() => setActiveTab("study")}>📚 Study Mode</button>
            </div>
          </div>
        </div>
      );
    }

    // Playing
    const q = ALL_QUESTIONS[currentQ];
    const progress = ((currentQ) / ALL_QUESTIONS.length) * 100;

    return (
      <div style={styles.container}>
        {/* Progress */}
        <div style={styles.progressBar}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #7c3aed, #c084fc)", borderRadius: "3px", transition: "width 0.3s" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ color: "#9ca3af", fontSize: "0.85rem" }}>Question {currentQ + 1} of {ALL_QUESTIONS.length}</span>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span style={{ color: "#4ade80", fontSize: "0.85rem" }}>✓ {score}</span>
            {timerActive && <div style={styles.timerCircle}>{timer}</div>}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.qNumber}>Q{q.id} · {q.topic}</div>
          <div style={styles.qTamil}>{q.tamil}</div>
          <div style={styles.qEnglish}>{q.english}</div>

          {q.options.map((opt, i) => {
            const state = selected !== null ? (
              q.answer === null ? (i === selected ? "wrong" : "default") :
              i === q.answer ? "correct" : (i === selected ? "wrong" : "default")
            ) : "default";

            return (
              <button key={i} style={styles.optionBtn(state)} onClick={() => handleSelect(i)}>
                <span style={{ fontWeight: "700", color: "#6c3fc5", minWidth: "20px" }}>{["A","B","C","D","E"][i]}.</span>
                <span>{opt}</span>
                {state === "correct" && <span style={{ marginLeft: "auto" }}>✓</span>}
                {state === "wrong" && <span style={{ marginLeft: "auto" }}>✗</span>}
              </button>
            );
          })}

          {showExp && (
            <div style={styles.expBox}>
              <div style={styles.expTitle}>
                {q.answer === null ? "⚠️ ANSWER NOT CLARIFIED BY TNPSC" :
                 selected === q.answer ? "✅ CORRECT!" : "❌ INCORRECT"}
              </div>
              <div style={styles.expText}>{q.explanation}</div>
              <div style={styles.topicTag}>🏷️ {q.topic}</div>

              <button style={{ ...styles.btn, marginTop: "16px", width: "100%" }} onClick={handleNext}>
                {currentQ + 1 < ALL_QUESTIONS.length ? "Next Question →" : "See Results 🏆"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── INSTANT ANSWERS TAB ────────────────────────────────────────────────────
  function InstantTab() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h3 style={{ color: "#c084fc", marginBottom: "4px" }}>📋 Instant Answer Reference</h3>
          <p style={{ color: "#9ca3af", fontSize: "0.82rem", marginBottom: "16px" }}>All 100 questions with answers at a glance</p>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Q#</th>
                  <th style={styles.th}>Topic</th>
                  <th style={styles.th}>Question (Tamil)</th>
                  <th style={styles.th}>Correct Option</th>
                  <th style={styles.th}>Answer</th>
                </tr>
              </thead>
              <tbody>
                {ALL_QUESTIONS.map((q, i) => (
                  <tr key={q.id}>
                    <td style={{ ...styles.td(i % 2 === 0), fontWeight: "700", color: "#6c3fc5", whiteSpace: "nowrap" }}>{q.id}</td>
                    <td style={{ ...styles.td(i % 2 === 0), fontSize: "0.75rem", color: "#9ca3af", whiteSpace: "nowrap" }}>{q.topic.split("(")[0].trim()}</td>
                    <td style={{ ...styles.td(i % 2 === 0), fontSize: "0.82rem", maxWidth: "200px" }}>{q.tamil.substring(0, 70)}{q.tamil.length > 70 ? "..." : ""}</td>
                    <td style={{ ...styles.td(i % 2 === 0), fontWeight: "700", color: "#c084fc", whiteSpace: "nowrap" }}>
                      {q.answer !== null ? ["A","B","C","D","E"][q.answer] : "–"}
                    </td>
                    <td style={{ ...styles.td(i % 2 === 0), fontSize: "0.82rem", color: q.answer !== null ? "#4ade80" : "#f59e0b" }}>
                      {q.answer !== null ? q.options[q.answer] : "⚠️ Not clarified by TNPSC"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ── FULL EXPLANATION TABLE TAB ─────────────────────────────────────────────
  function ExplainTab() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h3 style={{ color: "#c084fc", marginBottom: "4px" }}>📖 Full Explanations Table</h3>
          <p style={{ color: "#9ca3af", fontSize: "0.82rem", marginBottom: "16px" }}>Detailed explanation for every question</p>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Q#</th>
                  <th style={styles.th}>Topic</th>
                  <th style={styles.th}>Answer</th>
                  <th style={styles.th}>Explanation</th>
                </tr>
              </thead>
              <tbody>
                {ALL_QUESTIONS.map((q, i) => (
                  <tr key={q.id}>
                    <td style={{ ...styles.td(i % 2 === 0), fontWeight: "700", color: "#6c3fc5", verticalAlign: "top", whiteSpace: "nowrap" }}>{q.id}</td>
                    <td style={{ ...styles.td(i % 2 === 0), fontSize: "0.75rem", color: "#9ca3af", verticalAlign: "top", maxWidth: "130px" }}>{q.topic}</td>
                    <td style={{ ...styles.td(i % 2 === 0), color: q.answer !== null ? "#4ade80" : "#f59e0b", fontWeight: "700", verticalAlign: "top", whiteSpace: "nowrap", fontSize: "0.82rem" }}>
                      {q.answer !== null ? `(${["A","B","C","D"][q.answer]}) ${q.options[q.answer]?.substring(0, 20)}` : "⚠️ Unclear"}
                    </td>
                    <td style={{ ...styles.td(i % 2 === 0), fontSize: "0.82rem", lineHeight: "1.6", maxWidth: "350px" }}>{q.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div>
          <div style={styles.logo}>TNPSC Tamil TET 2025</div>
          <div style={{ fontSize: "0.72rem", color: "#6b7280", marginTop: "2px" }}>Technical Diploma · Part-A · CTSDITET&GS/2025 · Beta Set</div>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span style={styles.badge}>100 Questions</span>
          <span style={styles.badge}>150 Marks</span>
        </div>
      </div>

      <div style={styles.tabs}>
        {[
          { key: "study", label: "📚 Study" },
          { key: "quiz", label: "🎯 Quiz Game" },
          { key: "instant", label: "⚡ Instant Answers" },
          { key: "explain", label: "📖 All Explanations" },
        ].map(t => (
          <button key={t.key} style={styles.tab(activeTab === t.key)} onClick={() => setActiveTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "study" && <StudyTab />}
      {activeTab === "quiz" && <QuizTab />}
      {activeTab === "instant" && <InstantTab />}
      {activeTab === "explain" && <ExplainTab />}
    </div>
  );
}
