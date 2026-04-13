import { useState, useEffect, useRef } from "react";

// ─── ALL 100 QUESTIONS FROM PDF ───────────────────────────────────────────────
// Answer key: black tick (✓) = correct answer as marked in PDF
// "NOT_CLARIFIED" = no tick visible in PDF (answer not clarified by TNPSC)
const ALL_QUESTIONS = [
  {
    id: 1,
    tamil: "இரு வினைகளின் பொருள் வேறுபாடு\nஅருந்து – அறுந்து",
    english: "Distinguish the meaning of two verbs: அருந்து – அறுந்து",
    options: [
      { id: "A", text: "கூடி – துண்டுபட்டு" },
      { id: "B", text: "குடி – துண்டுபட்டு" },
      { id: "C", text: "துண்டுபட்டு – குடி" },
      { id: "D", text: "துண்டுபட்டு – கூடி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "அருந்து = குடி (to drink/consume), அறுந்து = துண்டுபட்டு (to be cut/severed). இரு வினைகளின் பொருள் வேற்றுமை இவ்வாறு அமையும். 'அருந்து' என்பது உணவு அல்லது நீர் உட்கொள்வதைக் குறிக்கும், 'அறுந்து' என்பது வெட்டுதல் அல்லது துண்டாவதைக் குறிக்கும்.",
    category: "Tamil Grammar - Verb Meanings",
  },
  {
    id: 2,
    tamil: "ஒற்றுப்பிழையற்ற தொடரைக் கண்டறிக.",
    english: "Identify the sentence without spelling error.",
    options: [
      { id: "A", text: "ஆற்று மணலுடன் சுண்ணாம்பைச் சேர்த்துச் சுவரைச் சமப்படுத்துவர்" },
      { id: "B", text: "ஆற்று மணலுடன் சுண்ணாம்பைச் சேர்து சுவரை சமப்படுத்துவர்" },
      { id: "C", text: "ஆற்று மணலுடன் சுண்ணாம்பை சேர்த்துச் சுவரை சமப்படுத்துவர்" },
      { id: "D", text: "ஆற்று மணலுடன் சுண்ணாம்பை சேர்த்துச் சுவரைச் சமப்படுத்துவர்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "விடை (A) சரியான ஒற்றுப்பிழையற்ற தொடர். தமிழ் இலக்கணத்தில் புணர்ச்சி விதிகளின்படி 'சேர்த்துச்', 'சுவரைச்', 'சமப்படுத்துவர்' என்ற வடிவங்கள் சரியானவை. மற்ற விடைகளில் ஒற்றுப் பிழைகள் உள்ளன.",
    category: "Tamil Grammar - Spelling",
  },
  {
    id: 3,
    tamil: "எழுத்துப் பிழையற்ற தொடரினைத் தெரிவு செய்க.\nகுழலை பாடத் தெரியும் / குழலியும் பாடத் தெரியும் / குழலியால் பாடத் தெரியும் / குழலிக்குப் பாடத் தெரியும்",
    english: "Choose the sentence without spelling errors.",
    options: [
      { id: "A", text: "குழலை பாடத் தெரியும்" },
      { id: "B", text: "குழலியும் பாடத் தெரியும்" },
      { id: "C", text: "குழலியால் பாடத் தெரியும்" },
      { id: "D", text: "குழலிக்குப் பாடத் தெரியும்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "'குழலிக்குப் பாடத் தெரியும்' என்பது இலக்கண ரீதியாக சரியானது. 'குழலி' என்னும் பெண்ணின் பெயருக்குரிய வேற்றுமை உருபு 'க்கு' ஆகும். 'குழலிக்கு' என்பது நான்காம் வேற்றுமை. மற்றவை இலக்கணப் பிழைகள் கொண்டவை.",
    category: "Tamil Grammar - Case (Vibhakthi)",
  },
  {
    id: 4,
    tamil: "அடைப்புக்குள் உள்ள சொற்களைக் கோடிட்ட இடங்களில் நிரப்புக.\nஇந்திய மொழிகளின் மூலமும் வேருமாகத் தமிழ் __________ (திகழ்)",
    english: "Fill in the blank with correct verb form of 'திகழ்'",
    options: [
      { id: "A", text: "திகழ்கிறது" },
      { id: "B", text: "திகழும்" },
      { id: "C", text: "திகழ்ந்த" },
      { id: "D", text: "திகழாது" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'திகழ்கிறது' என்பது நிகழ்கால வினைமுற்று. வாக்கியம் தற்போதைய உண்மையை உரைக்கிறது, எனவே நிகழ்காலம் பொருத்தமானது. இந்திய மொழிகளின் மூலமும் வேருமாக தமிழ் இன்றும் திகழ்கிறது என்பது உண்மை.",
    category: "Tamil Grammar - Tense",
  },
  {
    id: 5,
    tamil: '"நீர்வளம் பெருக்கி நிலவளம் விரிக்க......' இதில் பெருக்கி என்பதன் எதிர்ச்சொல் யாது?',
    english: "What is the antonym of 'பெருக்கி' in the given sentence?",
    options: [
      { id: "A", text: "சுருக்கி" },
      { id: "B", text: "உருக்கி" },
      { id: "C", text: "நறுக்கி" },
      { id: "D", text: "சிறுக்கி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'பெருக்கி' என்பதன் எதிர்ச்சொல் 'சுருக்கி'. பெருக்குதல் = அதிகப்படுத்துதல், சுருக்குதல் = குறைத்தல். இவை நேர் எதிரான பொருளை உடையன. TNPSC தமிழ் தகுதித் தேர்வில் எதிர்ச்சொற்கள் முக்கியமான தலைப்பு.",
    category: "Tamil Vocabulary - Antonyms",
  },
  {
    id: 6,
    tamil: "'மேதி' என்பதன் எதிர்ச்சொல்",
    english: "What is the antonym of 'மேதி'?",
    options: [
      { id: "A", text: "பசு" },
      { id: "B", text: "கரடி" },
      { id: "C", text: "சிங்கம்" },
      { id: "D", text: "புலி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'மேதி' என்பது எருமை (Buffalo). 'பசு' (Cow) என்பது எருமைக்கு உரிய எதிர்ச்சொல்லாக வழங்கும். இரண்டும் கால்நடைகள் என்றாலும், மேதி = எருமை, பசு = கோ என்று வேறுபடும். TNPSC தமிழ் இலக்கியத்தில் 'மேதி' என்ற சொல் பழைய இலக்கியங்களில் காணப்படும்.",
    category: "Tamil Vocabulary - Antonyms",
  },
  {
    id: 7,
    tamil: "ஆங்கிலச் சொல்லுக்கு நிகரான தமிழ்ச் சொல் அறிக.",
    english: "Find the correct Tamil equivalent: Factory – ?",
    options: [
      { id: "A", text: "Thread – தையல்" },
      { id: "B", text: "Stitch – நூல்" },
      { id: "C", text: "Factory – ஆலை" },
      { id: "D", text: "Loom – பதனிடுதல்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "Factory = ஆலை (Manufacturing plant). Thread = நூல், Stitch = தையல், Loom = தறி. இவற்றில் C மட்டுமே சரியான சொல்-பொருள் இணை. TNPSC தமிழ் கலைச்சொல் வினாக்களில் ஆங்கிலம்-தமிழ் சொல் இணைகள் முக்கியம்.",
    category: "Tamil - English Word Equivalents",
  },
  {
    id: 8,
    tamil: "ஆங்கிலச் சொல்லுக்கு நிகரான தமிழ்ச் சொல் அறிக.",
    english: "Find the correct Tamil equivalent: Blackboard – ?",
    options: [
      { id: "A", text: "Morpheme – ஒலியன்" },
      { id: "B", text: "Phoneme – உருபன்" },
      { id: "C", text: "Blackboard – கரும்பலகை" },
      { id: "D", text: "Conical Stone – நடுகல்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "Blackboard = கரும்பலகை. Morpheme = உருபன் (smallest unit of meaning), Phoneme = ஒலியன் (smallest unit of sound), Conical Stone = கூம்பு கல். விடை (C) மட்டுமே சரியான இணை. கரும்பலகை என்பது வகுப்பறையில் உபயோகிக்கப்படும் கருப்பு பலகை.",
    category: "Tamil - English Word Equivalents",
  },
  {
    id: 9,
    tamil: "கீழ்க்காணும் சொற்களில் பெயரெச்சம் கண்டுபிடித்து சரியான விடையைத் தேர்வு செய்க.\nநல்ல, படுத்து, மாட்டிய, கடந்து",
    english: "From the given words, identify the 'Peyarechham' (Verbal Noun/Adjectival Participle).",
    options: [
      { id: "A", text: "படுத்து, நல்ல" },
      { id: "B", text: "நல்ல, மாட்டிய" },
      { id: "C", text: "மாட்டிய, கடந்து" },
      { id: "D", text: "படுத்து, கடந்து" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "பெயரெச்சம் என்பது வினையடியில் இருந்து உருவாகி பெயரை அடையும் இலக்கண வடிவம். 'நல்ல' (பண்புப் பெயரெச்சம்) மற்றும் 'மாட்டிய' (இறந்தகாலப் பெயரெச்சம்) ஆகியவை பெயரெச்சங்கள். 'படுத்து', 'கடந்து' ஆகியவை வினையெச்சங்கள் (Verbal Participles).",
    category: "Tamil Grammar - Peyarechham",
  },
  {
    id: 10,
    tamil: "சரியான விடையைத் தேர்ந்தெடுத்து எழுதுக.\nபெயரைக் கொண்டு முடியும் எச்சம் பெயரெச்சம். இது __________ காலத்திலும் வரும்.",
    english: "Peyarechham (Adjectival Participle) can appear in how many tenses?",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "2" },
      { id: "C", text: "3" },
      { id: "D", text: "1" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "பெயரெச்சம் மூன்று காலங்களிலும் வரும்: (1) இறந்தகாலப் பெயரெச்சம் (e.g., வந்த), (2) நிகழ்காலப் பெயரெச்சம் (e.g., வரும்), (3) எதிர்காலப் பெயரெச்சம் (e.g., வரும்/வருகின்ற). மூன்று காலங்களிலும் வரும் என்பது தமிழ் இலக்கண விதி.",
    category: "Tamil Grammar - Tense",
  },
  {
    id: 11,
    tamil: "வேர்ச்சொல்லுக்கேற்ற வினையாலணையும் பெயரைத் தேர்ந்தெடுத்தெழுதுக.\nபடி —",
    english: "Choose the correct 'Vinaiyal Anaiyum Peyar' (Verbal Noun) for the root 'படி'",
    options: [
      { id: "A", text: "படித்த" },
      { id: "B", text: "படித்து" },
      { id: "C", text: "படித்தவர்" },
      { id: "D", text: "படிய" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "வினையாலணையும் பெயர் என்பது வினையடியிலிருந்து உருவாகி திணை-பால் உணர்த்தும் பெயர். 'படி' என்ற வேர்ச்சொல்லில் இருந்து 'படித்தவர்' என்பது மனித திணையை உணர்த்தும் வினையாலணையும் பெயர். இது உயர்திணைப் பெயர்.",
    category: "Tamil Grammar - Verbal Noun",
  },
  {
    id: 12,
    tamil: "படி — வேர்ச்சொல்லை வினையெச்சமாக்குக.",
    english: "Convert the root word 'படி' into Vinai Echham (Verbal Participle).",
    options: [
      { id: "A", text: "படித்து" },
      { id: "B", text: "படித்த" },
      { id: "C", text: "படிக்கின்ற" },
      { id: "D", text: "படித்தல்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'படி' என்ற வேர்ச்சொல்லின் வினையெச்சம் 'படித்து'. வினையெச்சம் என்பது ஒரு வினையை அடுத்த வினையோடு இணைக்கும் வடிவம். 'படித்துப் போனான்' என்பதில் 'படித்து' வினையெச்சம். இறந்தகால வினையெச்சம் 'து' விகுதி பெறும்.",
    category: "Tamil Grammar - Verbal Participle",
  },
  {
    id: 13,
    tamil: "வேர்ச்சொல்லை வினையெச்சமாக மாற்றுக : \"பார்\"",
    english: "Convert the root word 'பார்' into Verbal Participle (Vinai Echham).",
    options: [
      { id: "A", text: "பார்த்த" },
      { id: "B", text: "பார்த்து" },
      { id: "C", text: "பார்த்தல்" },
      { id: "D", text: "பார்த்தான்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "'பார்' என்ற வேர்ச்சொல்லின் வினையெச்சம் 'பார்த்து'. வினையெச்சம் 'து' விகுதியோடு முடியும். 'பார்த்த' = பெயரெச்சம், 'பார்த்தல்' = தொழிற்பெயர், 'பார்த்தான்' = வினைமுற்று. இவற்றில் 'பார்த்து' மட்டுமே வினையெச்சம்.",
    category: "Tamil Grammar - Verbal Participle",
  },
  {
    id: 14,
    tamil: "கேட்டான் – வேர்ச்சொல் தருக.",
    english: "Give the root word for 'கேட்டான்'.",
    options: [
      { id: "A", text: "கேட்டு" },
      { id: "B", text: "கேட்டல்" },
      { id: "C", text: "கேள்வி" },
      { id: "D", text: "கேள்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "'கேட்டான்' என்ற வினைமுற்றின் வேர்ச்சொல் (root word) 'கேள்'. வேர்ச்சொல் என்பது எல்லா வினை வடிவங்களுக்கும் அடிப்படையாக இருக்கும் சொல். கேள் → கேட்டான் (இறந்தகால வினைமுற்று), கேட்கிறான் (நிகழ்காலம்), கேட்பான் (எதிர்காலம்).",
    category: "Tamil Grammar - Root Word",
  },
  {
    id: 15,
    tamil: "கீழ்க்கண்டவற்றுள் தவறான வேர்ச்சொல் இணையைக் கண்டறிக.",
    english: "Identify the wrong root word pair.",
    options: [
      { id: "A", text: "வாழ்க – வாழ்க்கை" },
      { id: "B", text: "கேள் – கேட்டார்" },
      { id: "C", text: "போ – போனான்" },
      { id: "D", text: "நட – நடக்கிறது" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'வாழ்க – வாழ்க்கை' என்பது தவறான வேர்ச்சொல் இணை. 'வாழ்க்கை' என்பது 'வாழ்' என்ற வேர்ச்சொல்லிலிருந்து வருகிறது, 'வாழ்க' என்பது வேர்ச்சொல் அல்ல; அது வாழ்த்தும் வினைமுற்று வடிவம். மற்ற இணைகள் சரியான வேர்ச்சொல் – வினை இணைகள்.",
    category: "Tamil Grammar - Root Word",
  },
  {
    id: 16,
    tamil: "ஒருமை பன்மை அறிந்து சரியான தொடரைத் தெரிவு செய்க.",
    english: "Choose the grammatically correct sentence (Singular/Plural agreement).",
    options: [
      { id: "A", text: "அது மரம் அல்ல; கம்பம்" },
      { id: "B", text: "அவை பறவைகள் அனறு; பூக்கள்" },
      { id: "C", text: "அவர்கள் அடிமைகள் அல்லர்; போராளிகள்" },
      { id: "D", text: "அவன் திருடன் அல்ல; தீரன்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "'அவர்கள் அடிமைகள் அல்லர்; போராளிகள்' என்பது சரியான ஒருமை-பன்மை இணக்கம். 'அவர்கள்' (பன்மை) + 'அல்லர்' (பன்மை எதிர்மறை) + 'போராளிகள்' (பன்மை) – அனைத்தும் பன்மையில் ஒத்திருக்கின்றன. மற்ற விடைகளில் ஒருமை-பன்மை முரண்பாடுகள் உள்ளன.",
    category: "Tamil Grammar - Number Agreement",
  },
  {
    id: 17,
    tamil: "சரியான வினாச் சொல்லைத் தேர்ந்தெடு.\nவினா __________ வகைப்படும்.",
    english: "Choose the correct interrogative word: Questions are classified into __ types.",
    options: [
      { id: "A", text: "எத்தனை" },
      { id: "B", text: "யாருக்கு" },
      { id: "C", text: "எப்படி" },
      { id: "D", text: "யாது" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'வினா எத்தனை வகைப்படும்?' என்பது சரியான இலக்கண வினா. 'எத்தனை' என்பது எண்ணிக்கையை வினவும் வினாச்சொல். வினாக்கள் 6 வகைப்படும்: அறிவினா, அனுமதி வினா, கொளல் வினா, கொடுத்தல் வினா, ஐயவினா, வியப்பு வினா.",
    category: "Tamil Grammar - Question Words",
  },
  {
    id: 18,
    tamil: "மெல்லினத்திற்கான இன எழுத்து இடம் பெறாத சொல் எது?",
    english: "Which word does NOT have a soft consonant (மெல்லினம்) pair letter?",
    options: [
      { id: "A", text: "திங்கள்" },
      { id: "B", text: "சந்தனம்" },
      { id: "C", text: "கிண்ணம்" },
      { id: "D", text: "அம்பு" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "தமிழில் மெல்லினம் = ங, ஞ, ண, ந, ம, ன ஆகிய 6 எழுத்துகள். 'கிண்ணம்' என்ற சொல்லில் 'ண்' (ண-வின் சுருக்கம்) உள்ளது, ஆனால் அதன் இன எழுத்து இடம் பெறவில்லை. 'திங்கள்' = ங, 'சந்தனம்' = ந, 'அம்பு' = ம் ஆகியவற்றில் மெல்லின இன எழுத்துக்கள் உண்டு.",
    category: "Tamil Grammar - Letters (Ezhutthu)",
  },
  {
    id: 19,
    tamil: "சரியான விடையைத் தேர்ந்தெடுத்து எழுதுக.\n(1) கடலுக்கு வேறு பெயர் (பரவை/பறவை)\n(2) கதவை மெல்லத் __________ (திறந்தான்/திறந்தான்)",
    english: "Choose the correct words: sea alternative name AND opened softly.",
    options: [
      { id: "A", text: "பறவை, திறந்தான்" },
      { id: "B", text: "பரவை, திறந்தான்" },
      { id: "C", text: "பறவை, திரண்டான்" },
      { id: "D", text: "பரவை, திறந்தான்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "பரவை = கடலுக்கு வேறு பெயர் (another name for sea). பறவை = Bird (bird - completely different). 'கதவை மெல்லத் திறந்தான்' – 'திறந்தான்' சரியான வடிவம். திறந்தான் = opened. திரண்டான் = gathered/assembled, இவை வேறு வேறு பொருள் கொண்டவை.",
    category: "Tamil Vocabulary - Word Meaning",
  },
  {
    id: 20,
    tamil: "சரியான விடையைத தோர்நதெடுத்து எழுதுக.\n'தானொரு' என்னும் சொல்லைப் பிரித்து எழுதக் கிடைப்பது __________",
    english: "Split the word 'தானொரு' correctly.",
    options: [
      { id: "A", text: "தாண் + ஒரு" },
      { id: "B", text: "தான் + ஒரு" },
      { id: "C", text: "தாண் + னொரு" },
      { id: "D", text: "தாநே + ஒரு" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "'தானொரு' = 'தான்' + 'ஒரு'. புணர்ச்சி விதிப்படி 'தான் + ஒரு' இணையும்போது 'தானொரு' என்று ஆகும். 'தான்' என்பது reflexive pronoun, 'ஒரு' என்பது numeral/article. இது நிலை மயக்கப் புணர்ச்சி.",
    category: "Tamil Grammar - Word Splitting (Piritthu Ezhuthal)",
  },
  {
    id: 21,
    tamil: "குறில் – நெடில் மாற்றம் பொருள் வேறுபாடு எழுதுக.\nமுளை – மூளை",
    english: "Short-long vowel change: meaning difference between முளை and மூளை",
    options: [
      { id: "A", text: "செடி – தலைக்குள் உள்ள பகுதி" },
      { id: "B", text: "இடம் – தலைக்குள் உள்ள பகுதி" },
      { id: "C", text: "விதையின் முளை – தலைக்குள் உள்ள பகுதி" },
      { id: "D", text: "அறுவடை – தலைக்குள் உள்ள பகுதி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "முளை (குறில் உ) = விதையின் முளை, Sprout/Shoot of a seed. மூளை (நெடில் ஊ) = Brain (தலைக்குள் உள்ள பகுதி). குறில்-நெடில் மாற்றம் சொல்லின் பொருளை முழுவதும் மாற்றும். இது தமிழ் மொழியின் தனித்தன்மை.",
    category: "Tamil Grammar - Kuril-Nedil (Short-Long Vowel)",
  },
  {
    id: 22,
    tamil: "சரியான மரபுச் சொல்லை தேர்வு செய்க.\nகூகை __________",
    english: "Choose the correct 'Marabu Sol' (Conventional word) for owl's sound: கூகை __",
    options: [
      { id: "A", text: "கூவும்" },
      { id: "B", text: "கொக்கரிக்கும்" },
      { id: "C", text: "அகவும்" },
      { id: "D", text: "குழறும்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "கூகை (ஆந்தை/Owl) குழறும். மரபுச் சொல்கள்: கோழி கொக்கரிக்கும், குயில் கூவும், காகம் கரையும், ஆந்தை குழறும். TNPSC தேர்வில் விலங்குகள்/பறவைகளின் ஒலிகளுக்குரிய மரபுச் சொற்கள் அடிக்கடி கேட்கப்படும்.",
    category: "Tamil Grammar - Marabu Sol (Conventional Words)",
  },
  {
    id: 23,
    tamil: "சரியான விடையைத் தேர்க.\nமண் + அழகு = ?",
    english: "Find the correct sandhi (word joining): மண் + அழகு = ?",
    options: [
      { id: "A", text: "மண்ணளகு" },
      { id: "B", text: "மண்ணலகு" },
      { id: "C", text: "மண்ணிழகு" },
      { id: "D", text: "மண்ணழகு" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "மண் + அழகு = மண்ணழகு. இது இயல்பு புணர்ச்சி (Natural Sandhi). 'ண்' என்ற ஆய்தத்திற்கு அடுத்து உயிர் வரும்போது ண் இரட்டிக்கும். எனவே மண் + அழகு → மண் + ண் + அழகு → மண்ணழகு என்று ஆகும்.",
    category: "Tamil Grammar - Sandhi (Punarchi)",
  },
  {
    id: 24,
    tamil: "சேர்த்தெழுதுக.\nகுற்றம் + இல்லாதவர்",
    english: "Join the words: குற்றம் + இல்லாதவர் = ?",
    options: [
      { id: "A", text: "குற்றமில்லாதவர்" },
      { id: "B", text: "குற்றம் இல்லாதவர்" },
      { id: "C", text: "குற்றமல்லாதவர்" },
      { id: "D", text: "குற்றம் அல்லாதவர்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "குற்றம் + இல்லாதவர் = குற்றமில்லாதவர். இது வேற்றுமைப் புணர்ச்சி (Genitive Sandhi). 'குற்றம்' என்ற ஆகார விகுதியில் முடியும் சொல் + 'இல்லாதவர்' புணரும்போது 'குற்றமில்லாதவர்' என்று ஆகும். Meaning = One who is without fault.",
    category: "Tamil Grammar - Sandhi (Punarchi)",
  },
  {
    id: 25,
    tamil: "பிரித்தெழுதுக.\n'அவ்வுருவம்' என்னும் சொல்லைப் பிரித்து எழுதக் கிடைப்பது __________",
    english: "Split 'அவ்வுருவம்' correctly.",
    options: [
      { id: "A", text: "அவ்வு + உருவம்" },
      { id: "B", text: "அவ் + வுருவம்" },
      { id: "C", text: "அ + உருவம்" },
      { id: "D", text: "அ + வுருவம்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "'அவ்வுருவம்' = அ + உருவம். 'அ' என்பது demonstrative pronoun (அந்த), 'உருவம்' = form/image. புணர்ச்சியில் 'அ + உருவம்' → 'அவ்வுருவம்' என்று ஆகும். 'வ்வ்' என்பது இடைச்சொல் சேர்க்கையால் உண்டாகும்.",
    category: "Tamil Grammar - Word Splitting",
  },
  {
    id: 26,
    tamil: "நாவாய் என்னும் சொல்லுக்கு உரிய பெயர்கள்",
    english: "Which words are synonyms of 'நாவாய்' (boat/ship)?",
    options: [
      { id: "A", text: "கமலம், கஞ்சம், முளரி" },
      { id: "B", text: "பங்கயம், தோணி, கமலம்" },
      { id: "C", text: "வங்கம், கஞ்சம், பங்கயம்" },
      { id: "D", text: "வங்கம், தோணி, கலம்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "நாவாய் என்பது கப்பல்/படகுக்கான சொல். நாவாயின் ஒத்த சொற்கள்: வங்கம் (ship), தோணி (small boat), கலம் (vessel). கமலம், பங்கயம், கஞ்சம், முளரி ஆகியவை தாமரைப் பூவின் பெயர்கள். இவை குழப்பமாக கேட்கப்படுவதால் TNPSC முக்கிய தலைப்பு.",
    category: "Tamil Vocabulary - Synonyms",
  },
  {
    id: 27,
    tamil: "சொற்களை இணைத்துப் புதிய சொற்களை உருவாக்கு.\nநான் என்னுடைய பாடப் புத்தகத்தை முதல் பக்கம் முதல் கடைசிப்பக்கம் __________ முழுவதும் படித்து முடித்தேன்.",
    english: "Choose the word that best fills the blank in the context of reading a book cover to cover.",
    options: [
      { id: "A", text: "வரை" },
      { id: "B", text: "ஆனாலும்" },
      { id: "C", text: "எனினும்" },
      { id: "D", text: "மற்றும்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'முதல் பக்கம் முதல் கடைசிப்பக்கம் வரை முழுவதும்' – இங்கே 'வரை' என்பது 'till/up to' என்ற பொருளில் வருகிறது. 'கடைசி பக்கம் வரை' = up to the last page. இது சரியான இடைச்சொல் பயன்பாடு.",
    category: "Tamil Grammar - Connective Words",
  },
  {
    id: 28,
    tamil: "கப்பல் என்னும் பொருள் தரும் சொற்களைத் தேர்க",
    english: "Choose words that mean 'ship/boat'.",
    options: [
      { id: "A", text: "வருடம், மாதம்" },
      { id: "B", text: "நாவாய், வங்கம்" },
      { id: "C", text: "விடம், சக்கரம்" },
      { id: "D", text: "சிற்பி, முத்து" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "கப்பலுக்கு (ship) நிகரான சொற்கள்: நாவாய் மற்றும் வங்கம். நாவாய் = Large boat/ship, வங்கம் = Ship/vessel. மற்றவை: வருடம்/மாதம் = time words, விடம்/சக்கரம் = poison/wheel, சிற்பி/முத்து = sculptor/pearl.",
    category: "Tamil Vocabulary - Synonyms",
  },
  {
    id: 29,
    tamil: "ஒரு – ஒர் சரியாக அமைந்த தொடரைத் தேர்ந்தெடுக்க.",
    english: "Identify the sentence with correct usage of ஒரு/ஒர்.",
    options: [
      { id: "A", text: "ஒன்று ஆசிரியர் எல்லா மாணவர்களுக்கும் பாடம் சொல்லிக் கொடுத்தார்." },
      { id: "B", text: "ஒரு ஆசிரியர் எல்லா மாணவர்களுக்கும் பாடம் சொல்லிக் கொடுத்தார்." },
      { id: "C", text: "ஒர் ஆசிரியர் எல்லா மாணவர்களுக்கும் பாடம் சொல்லிக் கொடுத்தார்." },
      { id: "D", text: "ஒர் ஆசிரியர் எல்லா மாணவர்களுக்கும் பாடம் சொல்லிக் கொடுத்தனர்." },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "'ஒர்' என்பது உயிரெழுத்தில் தொடங்கும் சொல்லுக்கு முன் வரும். 'ஆசிரியர்' உயிர் 'ஆ' வில் தொடங்குவதால் 'ஒர் ஆசிரியர்' சரி. 'ஒரு' என்பது மெய்யெழுத்தில் தொடங்கும் சொல்லுக்கு முன் வரும். விடை (C) சரியான வடிவம்.",
    category: "Tamil Grammar - Oru/Or Usage",
  },
  {
    id: 30,
    tamil: "ஊர் பெயர்களின் மரூஉவை எழுதுக.\nபுதுச்சேரி",
    english: "Write the standard Tamil form (Maruvu) of the place name 'புதுச்சேரி'.",
    options: [
      { id: "A", text: "புதுகை" },
      { id: "B", text: "புதுவை" },
      { id: "C", text: "புதுமை" },
      { id: "D", text: "புத்தூர்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "புதுச்சேரியின் தமிழ் மரூஉ = புதுவை. Puducherry was historically called 'Puthuvaai' in Tamil. இது தமிழ் இலக்கிய வழக்கு. TNPSC தேர்வில் ஊர்ப்பெயர் மரூஉக்கள் முக்கியமானவை.",
    category: "Tamil - Place Names",
  },
  {
    id: 31,
    tamil: "பொருத்தமான பொருளைத் தெரிவு செய்க.\nமேலலார் செல்வமே போல்",
    english: "Choose the correct meaning of the idiom 'மேலலார் செல்வமே போல்'.",
    options: [
      { id: "A", text: "தலைநிமிர்ந்து நிற்பது போல்" },
      { id: "B", text: "தலை தாழ்த்தி வணங்குவது போல்" },
      { id: "C", text: "மேசை மேல் வைக்கப்பட்ட செல்வத்தைப் போல்" },
      { id: "D", text: "மேலாளரின் செல்வத்தைப் போல" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'மேலலார் செல்வமே போல்' என்பது 'மேலே அமர்ந்தோரின் செல்வம் போல்' என்று பொருள்படும். இது உயர்ந்தோர் செல்வம் போல் தலைநிமிர்ந்து நிற்பது என்ற பொருளில் வரும். இது தமிழ் இலக்கியத்தில் உவமை வழக்கு.",
    category: "Tamil - Idioms & Phrases",
  },
  {
    id: 32,
    tamil: "சொல்லிற்கு இணையான வேறு சொல் கண்டறிக.\nநனி",
    english: "Find the synonym for 'நனி'.",
    options: [
      { id: "A", text: "விளம்பு" },
      { id: "B", text: "பார்" },
      { id: "C", text: "குழவி" },
      { id: "D", text: "தவ" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "'நனி' என்பதன் பொருள் 'மிகவும்' / 'நன்றாக' (very much/greatly). 'தவ' என்பதும் 'மிகவும்' என்ற பொருளிலேயே வரும். இரண்டும் உரிச்சொற்கள் (Degree Words). தமிழ் சங்க இலக்கியங்களில் 'நனி' அடிக்கடி பயன்படுத்தப்படும்.",
    category: "Tamil Vocabulary - Synonyms",
  },
  {
    id: 33,
    tamil: "நாட்டு மக்களுடைய __________ ஒழிக்க வேண்டும்.",
    english: "Fill in the blank: We must eliminate people's ____ (poverty).",
    options: [
      { id: "A", text: "வறுமைகளை" },
      { id: "B", text: "வறுமை" },
      { id: "C", text: "வறுமையை" },
      { id: "D", text: "ஏழ்மைகளை" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "'நாட்டு மக்களுடைய வறுமையை ஒழிக்க வேண்டும்' – இங்கே இரண்டாம் வேற்றுமை உருபு 'ஐ' சேர்ந்து 'வறுமையை' என்று வரும். வறுமை என்பது ஒருமை சொல் என்பதால் 'வறுமைகளை' பன்மை தவறு. 'வறுமை' ஐ உருபின்றி வரவில்லை.",
    category: "Tamil Grammar - Case Suffix (Vibhakthi)",
  },
  {
    id: 34,
    tamil: "இரு பொருள் தருக.\nமேவலால்",
    english: "Give two meanings of the word 'மேவலால்'.",
    options: [
      { id: "A", text: "விளித்தல், கேட்டல்" },
      { id: "B", text: "ஓடுதல், குதித்தல்" },
      { id: "C", text: "கற்றல், கேட்டல்" },
      { id: "D", text: "பொருந்துதலால், பெறுதலால்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "'மேவலால்' என்ற சொல் இரு பொருளில் வரும்: 1. பொருந்துதலால் (By fitting/suiting), 2. பெறுதலால் (By obtaining/receiving). இது பொருள்பல வகைப் (polysemy) சொல். தமிழ் சங்க இலக்கியத்தில் இச்சொல் பல இடங்களில் வரும்.",
    category: "Tamil Vocabulary - Multiple Meanings",
  },
  {
    id: 35,
    tamil: "அகர வரிசைப்படி சொற்களைச் சீர் செய்க.\nநீலம்; கோமேதகம்; மாணிக்கம்; வைரம்; பவளம்; வைடூரியம்; முத்து; புஷ்பராகம்; மரகதம்",
    english: "Arrange the gems in Tamil alphabetical order.",
    options: [
      { id: "A", text: "மரகதம்; நீலம்; பவளம்; முத்து; வைடூரியம்; புஷ்பராகம்; மாணிக்கம்; வைரம், கோமேதகம்" },
      { id: "B", text: "கோமேதகம்; நீலம்; பவளம்; புஷ்பராகம்; மரகதம்; மாணிக்கம்; முத்து; வைடூரியம்; வைரம்" },
      { id: "C", text: "மாணிக்கம்; வைரம்; புஷ்பராகம்; மரகதம்: வைடூரியம்; நீலம்: முத்து: கோமேதகம்; பவளம்" },
      { id: "D", text: "நீலம்; கோமேதகம்; முத்து: பவளம்; புஷ்பராகம்; மரகதம்; மாணிக்கம்; வைரம்; வைடூரியம்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "தமிழ் அகர வரிசை: க, ங, ச, ஞ, ட, ண, த, ந, ப, ம, ய, ர, ல, வ... கோமேதகம் (க), நீலம் (ந), பவளம் (ப), புஷ்பராகம் (ப), மரகதம் (ம), மாணிக்கம் (ம), முத்து (ம), வைடூரியம் (வ), வைரம் (வ). இது சரியான அகர வரிசை.",
    category: "Tamil - Alphabetical Order",
  },
  {
    id: 36,
    tamil: "பொருந்தாச் சொல்லை எடுத்தெழுதுக.",
    english: "Pick the odd word out: (context: modes of transport)",
    options: [
      { id: "A", text: "பொருள்" },
      { id: "B", text: "இடம்" },
      { id: "C", text: "காலம்" },
      { id: "D", text: "பேருந்து" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "'பொருள்', 'இடம்', 'காலம்' என்பவை வேற்றுமைகளில் வரும் கருத்துரு (abstract concepts). ஆனால் 'பேருந்து' என்பது ஒரு வாகனம் (concrete noun - bus). இந்தத் தொகுதியில் பேருந்து மட்டுமே பொருந்தாத சொல்.",
    category: "Tamil Vocabulary - Odd One Out",
  },
  {
    id: 37,
    tamil: "ஒரு பொருள் தரும் பல சொற்களை எழுதுக.",
    english: "Which option gives multiple words with the same meaning?",
    options: [
      { id: "A", text: "அண்டம், அகிலம்" },
      { id: "B", text: "வானம், நிலவு" },
      { id: "C", text: "பூமி, மண்" },
      { id: "D", text: "அண்டம், சூரியன்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "அண்டம் மற்றும் அகிலம் இரண்டும் 'Universe/World' என்ற ஒரே பொருளைத் தருகின்றன. இவை ஒருபொருள் தரும் பல சொற்கள் (Synonyms). வானம்/நிலவு, பூமி/மண் ஆகியவை வேறு வேறு பொருளைத் தருகின்றன.",
    category: "Tamil Vocabulary - Synonyms",
  },
  {
    id: 38,
    tamil: "கேள்வியினான் – என்பதன் சரியான பொருள்.",
    english: "What is the correct meaning of 'கேள்வியினான்'?",
    options: [
      { id: "A", text: "பொறுத்தருளுமாறு" },
      { id: "B", text: "ஞானமயமாகிய" },
      { id: "C", text: "சொற் சுவை" },
      { id: "D", text: "நூல் வல்லான்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "'கேள்வியினான்' என்பதன் பொருள் 'நூல் வல்லான்' (One who is proficient in scriptures/books). கேள்வி = நூல் (in classical Tamil, கேள்வி means learning/scholarship), ஆல் = by, ஆன் = one who. இது சங்க இலக்கிய வழக்கு.",
    category: "Tamil Literature - Classical Meaning",
  },
  {
    id: 39,
    tamil: "ஒரெழுத்து ஒரு மொழியின் பொருளைக் கண்டறிக.\nஏ",
    english: "Find the meaning of the single-letter word 'ஏ'.",
    options: [
      { id: "A", text: "அம்பு" },
      { id: "B", text: "சோலை" },
      { id: "C", text: "கடவுள்" },
      { id: "D", text: "மூப்பு" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'ஏ' என்ற ஒரெழுத்து ஒரு மொழியின் பொருள் 'அம்பு' (Arrow). தமிழில் சில ஒரெழுத்துச் சொற்கள்: ஏ = அம்பு, தா = கொடு, வா = வருக, ஆ = பசு. TNPSC தேர்வில் ஒரெழுத்து ஒரு மொழி வினாக்கள் அடிக்கடி வருகின்றன.",
    category: "Tamil Grammar - Single Letter Words",
  },
  {
    id: 40,
    tamil: "எதிர்ச்சொல்லை எடுத்தெழுதுக.\nஐயம்",
    english: "Give the antonym of 'ஐயம்' (doubt).",
    options: [
      { id: "A", text: "தெளிவு" },
      { id: "B", text: "பணிவு" },
      { id: "C", text: "பயம்" },
      { id: "D", text: "அச்சம்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "ஐயம் = சந்தேகம் (doubt/uncertainty). அதன் எதிர்ச்சொல் தெளிவு (clarity/certainty). பணிவு = humility, பயம் = fear, அச்சம் = fear – இவை வேறு பொருள் கொண்டவை. தெளிவு மட்டுமே ஐயத்தின் எதிர்ச்சொல்.",
    category: "Tamil Vocabulary - Antonyms",
  },
  {
    id: 41,
    tamil: "வினாக்குறி இடம் பெறும் தொடரைக் கண்டறிக.",
    english: "Identify the sentence that takes a question mark (?).",
    options: [
      { id: "A", text: "இராமன், \"நாளை வருகிறேன்\" என்றான்" },
      { id: "B", text: "'ஏ' என்று சொன்னான்" },
      { id: "C", text: "வருக வருக!" },
      { id: "D", text: "நீ வருவாயா?" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "'நீ வருவாயா?' என்பது கேள்வி வாக்கியம். வினாக்குறி (?) வினாக்களுக்கு மட்டுமே இடப்படும். (A) மேற்கோள் வாக்கியம், (B) ஆச்சரிய வாக்கியம், (C) வியப்பு வாக்கியம் (!) – இவை வேறு நிறுத்தக்குறிகளைப் பெறும்.",
    category: "Tamil Grammar - Punctuation",
  },
  {
    id: 42,
    tamil: "வியப்புக்குறியைப் பொருத்துக:\n(a) பாம்பு பாம்பு – 1. வியப்பு\n(b) வருக வருக – 2. வாழ்த்து\n(c) வாழ்க வாழ்க – 3. வரவேற்றல்\n(d) என்னே, இதன் பெருமை – 4. அவலம்",
    english: "Match the exclamation expressions with their types.",
    options: [
      { id: "A", text: "(a)1, (b)3, (c)4, (d)2" },
      { id: "B", text: "(a)2, (b)4, (c)3, (d)1" },
      { id: "C", text: "(a)4, (b)3, (c)1, (d)2" },
      { id: "D", text: "(a)4, (b)3, (c)2, (d)1" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "பாம்பு பாம்பு = அவலம் (4) - ஆபத்தில் கூறும் வார்த்தை; வருக வருக = வரவேற்றல் (3); வாழ்க வாழ்க = வாழ்த்து (2); என்னே, இதன் பெருமை = வியப்பு (1). இவ்வாறு வியப்பு சொற்களை வகைப்படுத்துவது TNPSC தேர்வில் வரும் இலக்கண வினா.",
    category: "Tamil Grammar - Exclamation Types",
  },
  {
    id: 43,
    tamil: "'முகவரி இறுதியில்' இடம் பெறும் நிறுத்தக்குறியைக் கண்டறிக.",
    english: "Which punctuation mark appears at the end of an address?",
    options: [
      { id: "A", text: "முக்காற்புள்ளி" },
      { id: "B", text: "முற்றுப்புள்ளி" },
      { id: "C", text: "காற்புள்ளி" },
      { id: "D", text: "அரைப்புள்ளி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "முகவரியின் இறுதியில் முற்றுப்புள்ளி (.) இடப்படும். நிறுத்தக்குறிகள்: காற்புள்ளி (,), அரைப்புள்ளி (;), முக்காற்புள்ளி (:), முற்றுப்புள்ளி (.). கடிதம் எழுதும்போது முகவரி முடிவில் முற்றுப்புள்ளி வரும்.",
    category: "Tamil Grammar - Punctuation",
  },
  {
    id: 44,
    tamil: "'ஆதலால்' என்னும் சொல்லின் எவ்வகை நிறுத்தக்குறி இடுதல் வேண்டும்?",
    english: "What punctuation mark should follow 'ஆதலால்'?",
    options: [
      { id: "A", text: "முற்றுப்புள்ளி" },
      { id: "B", text: "முக்காற்புள்ளி" },
      { id: "C", text: "அரைப்புள்ளி" },
      { id: "D", text: "காற்புள்ளி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "'ஆதலால்' என்பது இணைப்பு இடைச்சொல் (Conjunctive word = 'therefore'). இதற்கு முன் காற்புள்ளி (,) இடப்படும். உதாரணம்: 'அவன் கஷ்டப்பட்டான், ஆதலால் வெற்றி பெற்றான்'. ஆதலால், எனவே, ஆகையால் – இவற்றிற்கு முன் காற்புள்ளி.",
    category: "Tamil Grammar - Punctuation",
  },
  {
    id: 45,
    tamil: "சரியான தொகைமரபைக் கண்டறிக.",
    english: "Identify the correct collective noun (Thokai Marabu).",
    options: [
      { id: "A", text: "ஆநிரை" },
      { id: "B", text: "ஆத்திரள்" },
      { id: "C", text: "ஆக்கூட்டம்" },
      { id: "D", text: "ஆமந்தை" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "ஆநிரை = பசுக்களின் கூட்டம் (herd of cows). இது சரியான தொகைமரபுச் சொல். தொகைமரபுகள்: ஆநிரை (cows), யானை கூட்டம் = படை, புலிகளின் கூட்டம் = கூட்டம். TNPSC தேர்வில் விலங்குகளின் தொகைமரபு முக்கியமானது.",
    category: "Tamil Grammar - Collective Nouns",
  },
  {
    id: 46,
    tamil: "ஆண்பால் பெயர்ச்சொல்லைக் கண்டறிக",
    english: "Identify the masculine gender noun.",
    options: [
      { id: "A", text: "அவன்" },
      { id: "B", text: "அரசி" },
      { id: "C", text: "அவர்கள்" },
      { id: "D", text: "அது" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "அவன் = ஆண்பால் (Masculine gender – he/him). அரசி = பெண்பால் (Queen – feminine), அவர்கள் = பலர்பால் (Plural – they), அது = ஒன்றன்பால் (neuter singular). இவற்றில் 'அவன்' மட்டுமே ஆண்பால் பெயர்ச்சொல்.",
    category: "Tamil Grammar - Gender (Paal)",
  },
  {
    id: 47,
    tamil: "கால வழுவைக் கண்டறிக.",
    english: "Identify the tense error in the sentences.",
    options: [
      { id: "A", text: "கரிகாலன் நாளை வருவான்" },
      { id: "B", text: "கரிகாலன் நேற்று வந்தான்" },
      { id: "C", text: "கரிகாலன் இன்று வருகிறான்" },
      { id: "D", text: "கரிகாலன் நாளை வந்தான்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "'கரிகாலன் நாளை வந்தான்' – இங்கே 'நாளை' (tomorrow) என்ற எதிர்கால காலச்சொல்லுடன் 'வந்தான்' என்ற இறந்தகால வினைமுற்று வந்திருக்கிறது. இது கால வழு (Tense Error). 'நாளை' உடன் 'வருவான்' வரவேண்டும்.",
    category: "Tamil Grammar - Tense Error",
  },
  {
    id: 48,
    tamil: "சரியான ஒன்றன்பால் பெயர்ச்சொல்லைத் தேர்ந்தெடு.",
    english: "Choose the correct singular neuter gender sentence.",
    options: [
      { id: "A", text: "மலைப்பாம்பு ஊர்ந்தது" },
      { id: "B", text: "மலைப்பாம்புகள் ஊர்ந்தது" },
      { id: "C", text: "மலைப்பாம்பு ஊர்ந்தன" },
      { id: "D", text: "மலைப்பாம்புகள் ஊர்ந்தனர்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'மலைப்பாம்பு ஊர்ந்தது' – மலைப்பாம்பு (ஒருமை) + ஊர்ந்தது (ஒருமை அஃறிணை வினைமுற்று). இவை ஒருமை-பன்மை ஒத்திருக்கும் சரியான வாக்கியம். பாம்பு அஃறிணை (neuter gender), எனவே 'ஊர்ந்தது' சரி.",
    category: "Tamil Grammar - Number-Gender Agreement",
  },
  {
    id: 49,
    tamil: "பெண்பாலைத் தெரிவு செய்க.",
    english: "Choose the feminine gender word.",
    options: [
      { id: "A", text: "அது" },
      { id: "B", text: "அவை" },
      { id: "C", text: "அரிசி" },
      { id: "D", text: "அரசி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "அரசி = Queen (பெண்பால் - Feminine Gender). அது = ஒன்றன்பால் (neuter singular), அவை = பலவின்பால் (neuter plural), அரிசி = rice (அஃறிணை, neuter). இவற்றில் 'அரசி' மட்டுமே பெண்பால் உயர்திணை சொல்.",
    category: "Tamil Grammar - Gender",
  },
  {
    id: 50,
    tamil: "ஒருமை பன்மை பிழை:\nபன்மை சரியாகப் பயின்றுவரும் தொடரைத் தேர்க:",
    english: "Choose the sentence with correct plural usage.",
    options: [
      { id: "A", text: "விண்கலங்கள் விண்ணில் பறந்தன" },
      { id: "B", text: "விண்கலம் விண்ணில் பறந்தன" },
      { id: "C", text: "விண்கலங்கள் விண்ணில் பறந்தது" },
      { id: "D", text: "விண்கலம் விண்ணில் பறந்தது" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'விண்கலங்கள் விண்ணில் பறந்தன' – பன்மை பெயர்ச்சொல் (விண்கலங்கள்) + பன்மை வினைமுற்று (பறந்தன) சரியான ஒத்திசைவு. விண்கலம் = spacecraft (ஒருமை), விண்கலங்கள் = spacecrafts (பன்மை). பன்மைக்கு 'பறந்தன' வர வேண்டும்.",
    category: "Tamil Grammar - Number Agreement",
  },
  {
    id: 51,
    tamil: "ஒருமை – பன்மை பிழை\nஅம்பேத்கர் ஒடுக்கப்பட்ட மக்களின் உயர்வுக்காகத் __________ உழைப்பை நல்கினார்.",
    english: "Fill in the blank with the correct possessive form (Ambedkar's efforts).",
    options: [
      { id: "A", text: "தமது" },
      { id: "B", text: "எமது" },
      { id: "C", text: "எனது" },
      { id: "D", text: "உமது" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "மூன்றாம் புருஷ மரியாதை ஒருமை (Third Person Respectful Singular) = தமது. அம்பேத்கர் என்று மூன்றாம் நபரை (he/him) சொல்வதால் 'தமது' சரி. எமது = We/us (plural first person), எனது = I/my (first person singular), உமது = You/your (second person respectful).",
    category: "Tamil Grammar - Pronouns",
  },
  {
    id: 52,
    tamil: "'அவன் படித்தான்' – இது எவ்வகை வினை?",
    english: "What type of verb is used in 'அவன் படித்தான்'?",
    options: [
      { id: "A", text: "செய்வினை" },
      { id: "B", text: "பிறவினை" },
      { id: "C", text: "செயப்பாட்டு வினை" },
      { id: "D", text: "தன்வினை" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "'அவன் படித்தான்' – தன்வினை (Reflexive/Intransitive Verb). தன்வினை என்பது சொல்லும் கருத்தா தானே செய்யும் வினை. இங்கே 'அவன்' தானே படித்துக்கொண்டான். செய்வினை = Active Transitive, செயப்பாட்டுவினை = Passive Voice.",
    category: "Tamil Grammar - Verb Types",
  },
  {
    id: 53,
    tamil: "கவிதை சீதாவால் இயற்றப்பட்டது – இது எவ்வகை வாக்கியம்?",
    english: "What type of sentence is 'கவிதை சீதாவால் இயற்றப்பட்டது'?",
    options: [
      { id: "A", text: "தன் வினை" },
      { id: "B", text: "பிற வினை" },
      { id: "C", text: "செய் வினை" },
      { id: "D", text: "செயப்பாட்டு வினை" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "'கவிதை சீதாவால் இயற்றப்பட்டது' – செயப்பாட்டு வினை (Passive Voice). Passive voice-ல் செயல்பாட்டை பெறுவது (கவிதை) கர்த்தா நிலையில் வரும். 'ஆல்' உருபோடு கூடிய செய்பவர் (சீதா) வருவதும் இதன் அடையாளம்.",
    category: "Tamil Grammar - Passive Voice",
  },
  {
    id: 54,
    tamil: "சொற்களை ஒழுங்குபடுத்துக.",
    english: "Rearrange the words into a meaningful sentence (about not wasting well water).",
    options: [
      { id: "A", text: "கிணற்றுத் தண்ணீரை வெள்ளம் கொண்டு போகாது" },
      { id: "B", text: "தண்ணீரை கிணற்று வெள்ளம் கொண்டு போகாது" },
      { id: "C", text: "வெள்ளம் தண்ணீரை கிணற்றுக் கொண்டு போகாது" },
      { id: "D", text: "கொண்டு போகாது கிணற்று வெள்ளம் தண்ணீரை" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "சரியான வாக்கிய அமைப்பு: 'கிணற்றுத் தண்ணீரை வெள்ளம் கொண்டு போகாது' (Flood will not take away well water). தமிழ் வாக்கிய அமைப்பு: கர்மம் + கர்த்தா + வினைமுற்று. 'கிணற்றுத் தண்ணீரை' (object) + 'வெள்ளம்' (subject) + 'கொண்டு போகாது' (verb).",
    category: "Tamil Grammar - Sentence Structure",
  },
  {
    id: 55,
    tamil: "சொற்களை ஒழுங்குபடுத்தி சொற்றொடராக்குக; (சரியான வாக்கியம் கண்டறிதல்)",
    english: "Arrange words into correct sentence: Adhiyaman giving nelli fruit to Avvaiyar.",
    options: [
      { id: "A", text: "அதியமான் ஔவைக்கு நெல்லிக்கனி வழங்குதல்" },
      { id: "B", text: "நெல்லிக்கனி அதியமான் ஔவைக்கு வழங்குதல்" },
      { id: "C", text: "அதியமான் நெல்லிக்கனி வழங்குதல் ஔவைக்கு" },
      { id: "D", text: "அதியமான் நெல்லிக்கனி ஔவைக்கு வழங்குதல்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "சரியான வாக்கிய அமைப்பு: 'அதியமான் ஔவைக்கு நெல்லிக்கனி வழங்குதல்'. தமிழ் வாக்கியத்தில் கர்த்தா முதலில் வரும், பின் கர்மம், பின் வினை. இந்த வரலாற்று சம்பவம் – அதியமான் நெஞ்சு நலம் கருதி ஔவைக்கு அமரத்துவம் தரும் நெல்லிக்கனியை கொடுத்தார்.",
    category: "Tamil Grammar - Sentence Arrangement",
  },
  {
    id: 56,
    tamil: "கலைச் சொல் அறிக.\nEmbossed Sculpture",
    english: "Find the Tamil art term for 'Embossed Sculpture'.",
    options: [
      { id: "A", text: "அகழாய்வு" },
      { id: "B", text: "புடைப்புச் சிற்பம்" },
      { id: "C", text: "நடுகல்" },
      { id: "D", text: "பண்பாட்டுக் குறியீடு" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "Embossed Sculpture = புடைப்புச் சிற்பம் (Relief Sculpture). புடைப்பு = embossed/protruding, சிற்பம் = sculpture. இது மேடாக உருவாக்கப்படும் சிற்பக் கலை. அகழாய்வு = Excavation, நடுகல் = Memorial Stone (Hero Stone).",
    category: "Tamil Art Terms",
  },
  {
    id: 57,
    tamil: "கலைச்சொல்லுக்கு நிகரான தமிழ்ச் சொல்.\nTwitter",
    english: "What is the Tamil equivalent of 'Twitter'?",
    options: [
      { id: "A", text: "புலனம்" },
      { id: "B", text: "கீச்சகம்" },
      { id: "C", text: "கட்செவி" },
      { id: "D", text: "படவரி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "Twitter = கீச்சகம் (Official Tamil term). Twitter என்பது பறவையின் கீச்சிடும் ஒலியிலிருந்து வந்தது. கீச்சு = bird's chirping in Tamil, கீச்சகம் = place of chirping = Twitter. கட்செவி = TV/Telephone, படவரி = Reel/Film strip.",
    category: "Tamil Modern Terms (Kalai Sol)",
  },
  {
    id: 58,
    tamil: "E-learning Web Site என்பதன் கலைச் சொல் எழுதுக.",
    english: "What is the Tamil art term for 'E-learning Web Site'?",
    options: [
      { id: "A", text: "உலவி" },
      { id: "B", text: "இயங்கு இணைய தளம்" },
      { id: "C", text: "இணைய வரலாறு" },
      { id: "D", text: "மின்கற்றல் இணைய தளம்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "E-learning Web Site = மின்கற்றல் இணைய தளம். மின் = Electronic, கற்றல் = Learning, இணைய தளம் = Website. TNPSC நவீன கலைச்சொல் வினாக்களில் தகவல் தொழில்நுட்பம் சார்ந்த சொற்கள் முக்கியமானவை.",
    category: "Tamil Modern Terms (Kalai Sol)",
  },
  {
    id: 59,
    tamil: "கலைச் சொல் தேர்க.\nElectronic Effects",
    english: "Choose the Tamil term for 'Electronic Effects'.",
    options: [
      { id: "A", text: "பண்பலை" },
      { id: "B", text: "மின்னணு ஊடகம்" },
      { id: "C", text: "எதிரொலி" },
      { id: "D", text: "மின்னணு உத்திகள்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "Electronic Effects = மின்னணு உத்திகள். மின்னணு = Electronic, உத்திகள் = Effects/Techniques. பண்பலை = FM (Frequency Modulation), எதிரொலி = Echo, மின்னணு ஊடகம் = Electronic Media.",
    category: "Tamil Modern Terms (Kalai Sol)",
  },
  {
    id: 60,
    tamil: "கலைச் சொல்லை அறிக.\nForestry",
    english: "What is the Tamil term for 'Forestry'?",
    options: [
      { id: "A", text: "விலங்கியல்" },
      { id: "B", text: "காடு" },
      { id: "C", text: "வனவியல்" },
      { id: "D", text: "அளவீட்டியல்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "Forestry = வனவியல் (Forest Science). வனம் = Forest, இயல் = Science/Study. விலங்கியல் = Zoology, காடு = Forest (common word, not a technical term), அளவீட்டியல் = Metrology.",
    category: "Tamil Modern Terms (Kalai Sol)",
  },
  {
    id: 61,
    tamil: "கலைச் சொல் தேர்க.\nMember of Legislative Assembly",
    english: "What is the Tamil term for 'Member of Legislative Assembly'?",
    options: [
      { id: "A", text: "சட்டமன்ற உறுப்பினர்" },
      { id: "B", text: "சட்டமன்ற ஆய்வாளர்" },
      { id: "C", text: "சட்டமன்ற உதவியாளர்" },
      { id: "D", text: "சட்டமன்ற மேலாளர்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "Member of Legislative Assembly (MLA) = சட்டமன்ற உறுப்பினர். சட்டமன்றம் = Legislative Assembly, உறுப்பினர் = Member. இது அரசியல் சட்ட கலைச்சொல். TNPSC தேர்வில் அரசியல் சார்ந்த கலைச்சொற்கள் முக்கியமானவை.",
    category: "Tamil Political Terms",
  },
  {
    id: 62,
    tamil: "கலைச்சொல் – கண்டறிக.\n\"Symbolism\"",
    english: "Find the Tamil equivalent of 'Symbolism'.",
    options: [
      { id: "A", text: "புள்ளியியல்" },
      { id: "B", text: "வடிவியல்" },
      { id: "C", text: "வட்டவியல்" },
      { id: "D", text: "குறியீட்டியல்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "Symbolism = குறியீட்டியல். குறியீடு = Symbol, இயல் = ism/study. இது இலக்கிய, கலை இயக்கத்தில் பயன்படும் கலைச்சொல். புள்ளியியல் = Statistics, வடிவியல் = Geometry, வட்டவியல் = Circuitry.",
    category: "Tamil Literature Terms",
  },
  {
    id: 63,
    tamil: "கலைச்சொல் அறிக.\nBiotherapy",
    english: "What is the Tamil term for 'Biotherapy'?",
    options: [
      { id: "A", text: "உயிரியல்" },
      { id: "B", text: "உயிர்க்கூறியல்" },
      { id: "C", text: "உயிர் மருத்துவம்" },
      { id: "D", text: "உயிர் வகை" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "Biotherapy = உயிர் மருத்துவம். Bio = உயிர், Therapy = மருத்துவம்/சிகிச்சை. உயிரியல் = Biology, உயிர்க்கூறியல் = Biochemistry. Biotherapy என்பது உயிரியல் சார்ந்த சிகிச்சை முறை.",
    category: "Tamil Medical Terms",
  },
  {
    id: 64,
    tamil: "கலைச்சொல் அறிக.\nThesis",
    english: "What is the Tamil term for 'Thesis'?",
    options: [
      { id: "A", text: "கையேடு" },
      { id: "B", text: "ஆய்வேடு" },
      { id: "C", text: "அறிவாளர்" },
      { id: "D", text: "கின்னம்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "Thesis = ஆய்வேடு. ஆய்வு = Research, ஏடு = Book/Document. PhD Thesis என்பது ஆய்வேடு. கையேடு = Manual/Handbook, அறிவாளர் = Scholar. TNPSC தேர்வில் கல்வி சார்ந்த கலைச்சொற்கள் வரும்.",
    category: "Tamil Academic Terms",
  },
  {
    id: 65,
    tamil: "கலைச்சொல்லுக்கு நேரான தமிழ்ச் சொல்லைத் தெரிவு செய்க.\nMissile",
    english: "Choose the correct Tamil equivalent for 'Missile'.",
    options: [
      { id: "A", text: "ஏவுகணை" },
      { id: "B", text: "ஏவு ஊர்த்தி" },
      { id: "C", text: "கடல்மைல்" },
      { id: "D", text: "பதிவிறக்கம்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "Missile = ஏவுகணை. ஏவு = launched/fired, கணை = arrow/projectile. இது நவீன இராணுவக் கலைச்சொல். ஏவு ஊர்த்தி = Rocket (வேறுவேறு), கடல்மைல் = Nautical mile, பதிவிறக்கம் = Download.",
    category: "Tamil Military Terms",
  },
  {
    id: 66,
    tamil: "ஏழை இளம் விதவைகளுக்கு மறுவாழ்வு அளிக்கும் நோக்கத்துடன் டாக்டர் தர்மாம்பாள் அம்மையார் நினைவு விதவை மறுமண உதவித் திட்டம் செயல்பட்டு வருகிறது. இத்திட்டத்தில் பயனடைவதற்கான தகுதிகள்:\n(1) வருமான உச்ச வரம்பு உண்டு.\n(2) மறுமணத்தின் போது மணமகளின் குறைந்தபட்ச வயது 20-ஆக இருக்க வேண்டும்.\n(3) மறுமணம் செய்வதற்கான திருமண அழைப்பிதழ் தேவையில்லை.\n(4) மறுமண நாளிலிருந்து 6 மாதத்திற்குள் விண்ணப்பிக்க வேண்டும்.",
    english: "Regarding widow remarriage scheme, which statements (கூற்றுகள்) are correct?",
    options: [
      { id: "A", text: "கூற்று 3 மற்றும் கூற்று 2 சரி" },
      { id: "B", text: "கூற்று 2 மற்றும் கூற்று 4 சரி" },
      { id: "C", text: "கூற்று 1 மற்றும் கூற்று 3 சரி" },
      { id: "D", text: "கூற்று 4 மற்றும் கூற்று 1 சரி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "டாக்டர் தர்மாம்பாள் அம்மையார் நினைவு விதவை மறுமண உதவித் திட்டத்தின் தகுதிகள்: (2) மணமகளின் குறைந்தபட்ச வயது 20 = சரி, (4) மறுமண நாளிலிருந்து 6 மாதத்திற்குள் விண்ணப்பிக்க வேண்டும் = சரி. இது TN அரசின் சமூக நலத் திட்டம்.",
    category: "Tamil Comprehension - Government Schemes",
  },
  {
    id: 67,
    tamil: "கீழ்க்காணும் பழமொழியின் பொருளைத் தெரிவு செய்.\nசொப்பனத்தில் கண்ட அரிசி சோத்துக்கு ஆகுமா?",
    english: "What does this proverb mean? 'Will rice seen in a dream be enough for cooking?'",
    options: [
      { id: "A", text: "கனவு காணுங்கள்" },
      { id: "B", text: "உயர்வான எண்ணங்கள் அவசியம்" },
      { id: "C", text: "உழைப்பின்றி ஊதியமில்லை" },
      { id: "D", text: "நேர்மையை சிந்தனை அவசியம்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "'சொப்பனத்தில் கண்ட அரிசி சோத்துக்கு ஆகுமா?' என்ற பழமொழியின் பொருள் 'உழைப்பின்றி ஊதியமில்லை' (No reward without labor). கனவில் எண்ணினால் மட்டும் போதாது; உழைத்தால்தான் பலன் கிடைக்கும் என்பது இதன் கருத்து.",
    category: "Tamil Proverbs",
  },
  {
    id: 68,
    tamil: "கீழ்க்காணும் பழமொழியின் பொருளைத் தெரிவு செய்க.\nஅதிர அடிச்சா உதிர விளையும்",
    english: "What is the meaning of 'Hard blows yield abundant results'?",
    options: [
      { id: "A", text: "முயற்சி திருவினையாக்கும்" },
      { id: "B", text: "அடி உதவாமல் அண்ணன் தம்பி உதவ மாட்டார்கள்" },
      { id: "C", text: "நெற்பயிருக்கு மழை அவசியம்" },
      { id: "D", text: "கரும்பு தின்னக் கூலியா?" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'அதிர அடிச்சா உதிர விளையும்' = 'முயற்சி திருவினையாக்கும்' (Efforts bring success). கடினமாக உழைத்தால் (அதிர அடிச்சா) நல்ல பலன் கிடைக்கும் (உதிர விளையும்) என்பது கருத்து. இது முயற்சியின் அவசியத்தை போதிக்கும் பழமொழி.",
    category: "Tamil Proverbs",
  },
  {
    id: 69,
    tamil: "கீழ்க்கண்ட பழமொழியின் சரியான பொருளைக் கண்டறிக.\nஅவப்பொழுது போக்குவதிலும் தவப்பொழுது நல்லது.",
    english: "Find the correct meaning of 'Better to spend time in penance than waste it'.",
    options: [
      { id: "A", text: "பணத்தை வீணாக்காமை" },
      { id: "B", text: "உணவை வீணாக்காமை" },
      { id: "C", text: "நேரத்தை வீணாக்காமை" },
      { id: "D", text: "நல்ல நேரம் பார்ப்பது" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "'அவப்பொழுது போக்குவதிலும் தவப்பொழுது நல்லது' – நேரத்தை வீணாக்காமை என்பதே கருத்து. அவப் பொழுது = bad/wasted time, தவப்பொழுது = time spent in penance/good deeds. வீண் நேரம் கழிப்பதை விட நேரத்தை சரியாக பயன்படுத்துவது நல்லது.",
    category: "Tamil Proverbs",
  },
  {
    id: 70,
    tamil: "மரபுத் தொடரைப் பொருளோடு பொருத்தி எழுதுக.\nமுதலைக் கண்ணீர்",
    english: "Match the idiom 'Crocodile Tears' with its meaning.",
    options: [
      { id: "A", text: "இயலாத செயல்" },
      { id: "B", text: "உண்மையான அழுகை" },
      { id: "C", text: "பொய்யான அழுகை" },
      { id: "D", text: "விரைந்து சொல்லிடுதல்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "முதலைக் கண்ணீர் = பொய்யான அழுகை (Crocodile Tears = False/Fake crying). முதலை தன் இரையை தின்னும்போது கண்ணீர் வடிப்பது போல் தோன்றும், ஆனால் அது உண்மையான கண்ணீர் அல்ல. இது ஆங்கில idiom-ஐ தமிழில் சொல்வதுபோல் வழங்கும்.",
    category: "Tamil Idioms",
  },
  {
    id: 71,
    tamil: "மரபுத் தொடர்களைப் பொருளோடு எழுதுக.\nகொடிகட்டிப் பறத்தல்",
    english: "What does the idiom 'கொடிகட்டிப் பறத்தல்' mean?",
    options: [
      { id: "A", text: "புகழ்பெற்று விளங்குதல்" },
      { id: "B", text: "புகழ் இல்லாமை" },
      { id: "C", text: "நீண்ட காலமாக வாழ்தல்" },
      { id: "D", text: "விரைந்து பறத்தல்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'கொடிகட்டிப் பறத்தல்' = புகழ்பெற்று விளங்குதல் (To be supremely famous). கொடி கட்டி பறப்பது வெற்றியின் அடையாளம். இந்த மரபுத்தொடர் ஒருவர் உயர்ந்த புகழ் பெற்று விளங்குவதைக் குறிக்கும்.",
    category: "Tamil Idioms",
  },
  {
    id: 72,
    tamil: "மரபுத் தொடரைப் பொருளோடு பொருத்துக.\nகல்லில் நார் உரித்தல்",
    english: "What does the idiom 'கல்லில் நார் உரித்தல்' mean?",
    options: [
      { id: "A", text: "ஆராய்ந்து பாராமல்" },
      { id: "B", text: "இயலாத செயல்" },
      { id: "C", text: "எண்ணிச் செயல்படாமை" },
      { id: "D", text: "புகழ் பெறுதல்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "'கல்லில் நார் உரித்தல்' = இயலாத செயல் (An impossible task). கல்லிலிருந்து நார் உரிப்பது சாத்தியமற்றது. இது impossible, futile action என்ற பொருளில் வழங்கும் மரபுத்தொடர். 'இயலாத செயல்' = Impossible task.",
    category: "Tamil Idioms",
  },
  {
    id: 73,
    tamil: "உவமைத் தொடரின் பொருளைத் தெரிவு செய்க.\nவிழலுக்கு இறைத்த நீர் போல",
    english: "What is the meaning of the simile 'Like water poured on sand'?",
    options: [
      { id: "A", text: "பயனற்ற செயல்" },
      { id: "B", text: "பயனுள்ள செயல்" },
      { id: "C", text: "தற்செயல் நிகழ்வு" },
      { id: "D", text: "எதிர்பாரா நிகழ்வு" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'விழலுக்கு இறைத்த நீர் போல' = பயனற்ற செயல் (A futile/wasteful act). விழல் = sandy/porous ground, இறைத்த நீர் = poured water. மணலில் தண்ணீர் ஊற்றினால் உடனே உறிஞ்சப்படும், எந்த பயனும் இல்லை. இது வீண் முயற்சியை குறிக்கும் உவமை.",
    category: "Tamil Similes (Uvamaithodal)",
  },
  {
    id: 74,
    tamil: "'உள்ளங்கை நெல்லிக்கனி போல்' – என்னும் உவமைத்தொடர் விளக்கும் கருத்து என்ன?",
    english: "What does the simile 'Like a gooseberry on the palm of the hand' mean?",
    options: [
      { id: "A", text: "மறைந்திருப்பது" },
      { id: "B", text: "வெளிப்படையாக இருப்பது" },
      { id: "C", text: "சேர்ந்திருப்பது" },
      { id: "D", text: "பக்குவமாக நடப்பது" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "'உள்ளங்கை நெல்லிக்கனி போல்' = வெளிப்படையாக இருப்பது (Crystal clear/Evident). உள்ளங்கையில் வைத்த நெல்லிக்கனியை தெளிவாகப் பார்க்க முடியும். இது ஒரு விஷயம் முற்றிலும் தெளிவாக, வெளிப்படையாக இருப்பதை உணர்த்தும்.",
    category: "Tamil Similes",
  },
  {
    id: 75,
    tamil: "'எலியும் பூனையும் போல்' – என்ற உவமைத் தொடர் விளக்கும் கருத்து:",
    english: "What does 'Like cat and mouse' mean as a simile?",
    options: [
      { id: "A", text: "ஓடிவிளையாடுதல்" },
      { id: "B", text: "பகைமை பாராட்டுதல்" },
      { id: "C", text: "நட்புடன் பழகுதல்" },
      { id: "D", text: "ஒற்றுமையாக இருத்தல்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "'எலியும் பூனையும் போல்' = பகைமை பாராட்டுதல் (Bitter enmity). பூனை எலியை எப்போதும் துரத்தும், எலி பூனையை கண்டால் ஓடும். இவற்றுக்கு இடையே நிரந்தரமான பகை உண்டு. இது இரு தரப்பினரிடையே நிரந்தர பகையை குறிக்கும்.",
    category: "Tamil Similes",
  },
  {
    id: 76,
    tamil: "உலகுக்கு இந்தியா அளித்த மிகப் பெரிய கொடை எது? (பத்தியைப் படித்து விடை தேர்க)",
    english: "What is the greatest gift India has given to the world? (based on passage)",
    options: [
      { id: "A", text: "கால்பந்து" },
      { id: "B", text: "கபடி" },
      { id: "C", text: "யோகா" },
      { id: "D", text: "மட்டைப்பந்து" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "உலகுக்கு இந்தியா அளித்த மிகப்பெரிய கொடை யோகா என்று பத்தியில் கூறப்பட்டுள்ளது. யோகா என்பது உடல் நலம், மனநலம் மற்றும் ஆன்மிக வளர்ச்சிக்கான இந்திய அறிவியல். தற்போது உலகம் முழுவதும் யோகா வழக்கத்தில் உள்ளது.",
    category: "Tamil Comprehension - Passage",
  },
  {
    id: 77,
    tamil: "எப்பொழுது சர்வதேச யோகா தினம் கொண்டாடப்படுகிறது?",
    english: "When is International Yoga Day celebrated?",
    options: [
      { id: "A", text: "ஜூன் 24" },
      { id: "B", text: "ஜூன் 21" },
      { id: "C", text: "ஜூன் 26" },
      { id: "D", text: "ஜூன் 5" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "சர்வதேச யோகா தினம் = ஜூன் 21 (International Yoga Day = June 21). இந்தியாவின் பிரதமர் மோடி முயற்சியால் ஐக்கிய நாடுகள் சபை 2014-ல் இதை அங்கீகரித்தது. முதல் சர்வதேச யோகா தினம் 2015 ஜூன் 21 அன்று கொண்டாடப்பட்டது.",
    category: "General Knowledge - International Days",
  },
  {
    id: 78,
    tamil: "யார் புகழாரம் சூட்டியுள்ளார்?",
    english: "Who praised (India's yoga gift to the world, as per passage)?",
    options: [
      { id: "A", text: "மே-எவின் ஸ்டெனர்" },
      { id: "B", text: "கிரண் ரிஜிஜீ" },
      { id: "C", text: "விஜயதாரணி" },
      { id: "D", text: "பொன்முடி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "பத்தியின்படி, மே-எவின் ஸ்டெனர் (Norway's State Secretary Maiken Steiner?) இந்தியாவிற்கு புகழாரம் சூட்டியுள்ளார். இந்நபர் இந்தியாவுக்கான நார்வேயின் தூதர் புகழாரம் சூட்டியதாக பத்தியில் கூறப்பட்டுள்ளது.",
    category: "Tamil Comprehension - Passage",
  },
  {
    id: 79,
    tamil: "எந்த ஆண்டில் பிரதமர் யோகா பயிற்சியை முன்னிறுத்தி நடத்தினார்?",
    english: "In which year did the PM lead the Yoga session?",
    options: [
      { id: "A", text: "2020" },
      { id: "B", text: "2024" },
      { id: "C", text: "2021" },
      { id: "D", text: "2023" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "2023-ஆம் ஆண்டில் பிரதமர் மோடி நியூயார்க்கிலுள்ள ஐக்கிய நாடுகள் சபை தலைமையகத்தில் சிறப்பு யோகா பயிற்சியை முன்னிறுத்தி நடத்தினார். இது சர்வதேச யோகா தினமான ஜூன் 21 அன்று நடைபெற்றது.",
    category: "General Knowledge - Current Affairs",
  },
  {
    id: 80,
    tamil: "எந்த நாட்டின் சபையில் யோகா நடந்தது?",
    english: "In which country's assembly hall was Yoga performed (by PM Modi)?",
    options: [
      { id: "A", text: "அமெரிக்கா" },
      { id: "B", text: "நியூயார்க்" },
      { id: "C", text: "ஜப்பான்" },
      { id: "D", text: "ஸ்வீடன்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "நியூயார்க்கிலுள்ள ஐக்கிய நாடுகள் சபை தலைமையகத்தில் யோகா நடந்தது. UN Headquarters நியூயார்க்கில் அமைந்துள்ளது. நியூயார்க் அமெரிக்காவில் உள்ளது என்றாலும், கேள்வி 'நியூயார்க்' என்றே கேட்கிறது.",
    category: "General Knowledge - Geography",
  },
  {
    id: 81,
    tamil: "Distribution Register என்று அழைக்கப்படும் பதிவேடு",
    english: "Which register is called 'Distribution Register'?",
    options: [
      { id: "A", text: "நிலுவைப் பட்டியல்" },
      { id: "B", text: "பகிர்மானப் பதிவேடு" },
      { id: "C", text: "அலுவலக ஆணைப் பதிவேடு" },
      { id: "D", text: "திருத்தப் பதிவேடு" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "Distribution Register = பகிர்மானப் பதிவேடு. இது அலுவலக நடைமுறையில் பயன்படுத்தப்படும் பதிவேடு. அலுவல் ஆவணங்கள் பகிர்வதை பதிவு செய்யும். TNPSC தேர்வில் அலுவலக நடைமுறை சார்ந்த கலைச்சொற்கள் வரும்.",
    category: "Tamil Office Administration Terms",
  },
  {
    id: 82,
    tamil: "ஆங்கிலச் சொல்லுக்கு நேரான தமிழ்ச் சொல்லை அறிந்து எழுதுக.\n'CABINET'",
    english: "What is the Tamil equivalent for 'CABINET'?",
    options: [
      { id: "A", text: "அமைச்சரவை" },
      { id: "B", text: "மக்களவை" },
      { id: "C", text: "சட்ட சபை" },
      { id: "D", text: "மாநிலங்களவை" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "Cabinet = அமைச்சரவை (Council of Ministers). மக்களவை = Lok Sabha, மாநிலங்களவை = Rajya Sabha, சட்டசபை = Legislative Assembly. Cabinet என்பது பிரதமர் தலைமையிலான அமைச்சர்கள் குழு = அமைச்சரவை.",
    category: "Tamil Political Terms",
  },
  {
    id: 83,
    tamil: "Millets – ஆங்கிலச் சொல்லுக்கு நேரான தமிழ்ச் சொல்.",
    english: "What is the Tamil word for 'Millets'?",
    options: [
      { id: "A", text: "நோய்" },
      { id: "B", text: "ஒவ்வாமை" },
      { id: "C", text: "நுண்ணுயிர் முறி" },
      { id: "D", text: "சிறுதானியங்கள்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "Millets = சிறுதானியங்கள். சோளம், கம்பு, ராகி, வரகு, சாமை, குதிரைவாலி போன்றவை சிறுதானியங்கள். 2023 ஆண்டு சர்வதேச சிறுதானிய ஆண்டாக UN அறிவித்தது. இந்தியா சிறுதானிய உற்பத்தியில் முன்னணியில் உள்ளது.",
    category: "Tamil Agriculture Terms",
  },
  {
    id: 84,
    tamil: "Knitting – என்ற சொல்லின் தமிழ்ச் சொல்.",
    english: "What is the Tamil equivalent for 'Knitting'?",
    options: [
      { id: "A", text: "கைவினைஞர்" },
      { id: "B", text: "பின்னுதல்" },
      { id: "C", text: "கூடை முடைதல்" },
      { id: "D", text: "சடங்கு" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "Knitting = பின்னுதல் (Weaving/Knitting yarn). பின்னுதல் என்பது நூல் அல்லது கம்பிகளை ஒன்றிணைத்து ஆடை அல்லது பொருள்கள் செய்வது. கூடை முடைதல் = Basket weaving, கைவினைஞர் = Artisan.",
    category: "Tamil Craft Terms",
  },
  {
    id: 85,
    tamil: "Reform – என்ற சொல்லுக்குரிய தமிழ்ச் சொல்லை எழுதுக.",
    english: "What is the Tamil word for 'Reform'?",
    options: [
      { id: "A", text: "பகுத்தறிவு" },
      { id: "B", text: "தத்துவம்" },
      { id: "C", text: "சீர்திருத்தம்" },
      { id: "D", text: "நேர்மை" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "Reform = சீர்திருத்தம். சீர் = correction/improvement, திருத்தம் = amendment. சமூக சீர்திருத்தம் = Social Reform. பகுத்தறிவு = Rationalism, தத்துவம் = Philosophy, நேர்மை = Honesty.",
    category: "Tamil Social Terms",
  },
  {
    id: 86,
    tamil: "பறம்பு மலையில் நடந்த விழாவில், குன்றக்குடி அடிகளாரிடம் 'கவியரசு' என்ற பட்டத்தைப் பெற்றவர் யார்?",
    english: "Who received the title 'Kaviyarasu' from Kundrakkudi Adigalar at a festival on Parambu Hills?",
    options: [
      { id: "A", text: "பாவாணர்" },
      { id: "B", text: "முடியரசன்" },
      { id: "C", text: "பாரதிதாசன்" },
      { id: "D", text: "தாரா பாரதி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "கவிஞர் முடியரசன் பறம்பு மலையில் நடந்த விழாவில் குன்றக்குடி அடிகளாரிடம் 'கவியரசு' என்ற பட்டம் பெற்றார். முடியரசன் (1920-1982) புகழ்பெற்ற தமிழ்க் கவிஞர். 'மலர்க்காடு', 'முத்தமிழ் விளக்கு' போன்ற நூல்கள் படைத்தவர்.",
    category: "Tamil Literature - Poets",
  },
  {
    id: 87,
    tamil: "தாரா பாரதியின் இயற்பெயர் யாது?",
    english: "What is the real name of Thara Bharathi?",
    options: [
      { id: "A", text: "ராதாகிருஷ்ணன்" },
      { id: "B", text: "ரவிக்கிருஷ்ணன்" },
      { id: "C", text: "கோபிக்கிருஷ்ணன்" },
      { id: "D", text: "முத்தையா" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "தாரா பாரதியின் இயற்பெயர் ராதாகிருஷ்ணன். அவர் ஒரு புகழ்பெற்ற தமிழ் எழுத்தாளர். 'தாரா பாரதி' என்பது இலக்கிய பெயர் (pen name). TNPSC தேர்வில் இலக்கியவாதிகளின் இயற்பெயர்கள் முக்கியமானவை.",
    category: "Tamil Literature - Authors",
  },
  {
    id: 88,
    tamil: "'பாவேந்தர்' பாரதிதாசன் பிறந்த ஆண்டு எது?",
    english: "In which year was 'Paventhar' Bharathidasan born?",
    options: [
      { id: "A", text: "1881" },
      { id: "B", text: "1871" },
      { id: "C", text: "1891" },
      { id: "D", text: "1861" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "பாரதிதாசன் (Bharathidasan) 1891 ஆம் ஆண்டு ஏப்ரல் 29 அன்று புதுச்சேரியில் பிறந்தார். 1964 ஆம் ஆண்டு இறந்தார். இயற்பெயர் சுப்பிரமணியன். 'பாவேந்தர்' என்ற பட்டம் பெற்றவர். 'குடும்ப விளக்கு', 'பாண்டியன் பரிசு' போன்ற புகழ்பெற்ற படைப்புகள்.",
    category: "Tamil Literature - Poet Birthdays",
  },
  {
    id: 89,
    tamil: "பாவலரேறு பெருஞ்சித்திரனாரின் இயற்பெயர் யாது?",
    english: "What is the real name of Pavaleraru Perunchittiranaar?",
    options: [
      { id: "A", text: "ச. தண்டபாணி" },
      { id: "B", text: "மா. அரங்கநாதன்" },
      { id: "C", text: "முத்தையா" },
      { id: "D", text: "துரை. மாணிக்கம்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "பாவலரேறு பெருஞ்சித்திரனாரின் இயற்பெயர் துரை. மாணிக்கம். அவர் ஒரு புகழ்பெற்ற திராவிட இலக்கிய கவிஞர். 'பாவலரேறு' என்பது 'கவிஞர்களுக்கெல்லாம் மேலான கவிஞன்' என்ற பொருளில் வழங்கும் சிறப்புப் பட்டம்.",
    category: "Tamil Literature - Authors",
  },
  {
    id: 90,
    tamil: "பல்வேறு சிறப்பியல்புகளைக் கொண்டு, அனைத்து வளமும் உணடென்று சொன்னதோடு, தமிழ்ச்சொல் வளம் மிக்கது எனக் கூறியவர் யார்?",
    english: "Who said Tamil language is rich in various features and possesses all kinds of wealth?",
    options: [
      { id: "A", text: "பாவலரேறு பெருஞ்சித்திரனார்" },
      { id: "B", text: "சி. இலக்குவனார்" },
      { id: "C", text: "முடியரசன்" },
      { id: "D", text: "தேவநேயபாவாணர்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "D",
    explanation: "தமிழ் மொழியின் சிறப்புகளை ஆராய்ந்து 'அனைத்து வளமும் உண்டு' என்று கூறியவர் தேவநேயபாவாணர். அவர் தமிழ் மொழி ஆய்வில் முழ்கிய அறிஞர். 'தமிழ் மொழியின் தனிப்பெரும் சிறப்பு' பற்றி ஆவணங்கள் படைத்தவர்.",
    category: "Tamil Literature - Scholars",
  },
  {
    id: 91,
    tamil: "ஆற்றில் விட்டுச் சென்ற ஓலைசுவடிகளை தேடி எடுத்து வந்தவர் __________",
    english: "Who retrieved palm-leaf manuscripts thrown into the river?",
    options: [
      { id: "A", text: "பாரதியார்" },
      { id: "B", text: "அகத்தியலிங்கம்" },
      { id: "C", text: "உ.வே. சாமிநாதர்" },
      { id: "D", text: "பாரதிதாசன்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "உ.வே. சாமிநாதர் (U.V. Swaminatha Iyer, 1855-1942) ஆற்றில் விட்டுச் சென்ற ஓலைச்சுவடிகளை தேடி எடுத்து வந்தவர். 'தமிழ்த் தாத்தா' என்று அழைக்கப்படும் இவர் சிலம்பு, மணிமேகலை உட்பட பல சங்க இலக்கியங்களை மீட்டெடுத்தவர்.",
    category: "Tamil Literature - Scholars",
  },
  {
    id: 92,
    tamil: "பின்வருவனவற்றுள் எம்மொழி, தென் திராவிட மொழிகளில் ஒன்று?",
    english: "Which of the following is a South Dravidian language?",
    options: [
      { id: "A", text: "கன்னடம்" },
      { id: "B", text: "தெலுங்கு" },
      { id: "C", text: "கோண்டா" },
      { id: "D", text: "மண்டா" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "கன்னடம் தென் திராவிட மொழி. தென் திராவிட மொழிகள்: தமிழ், தெலுங்கு, கன்னடம், மலையாளம், துளு. கோண்டா மற்றும் மண்டா மத்திய திராவிட மொழிகள். TNPSC மொழியியல் வினாக்களில் திராவிட மொழி வகைகள் வரும்.",
    category: "Tamil Linguistics",
  },
  {
    id: 93,
    tamil: "உலகத் தமிழ் கழகத்தை நிறுவித் தலைவராக இருந்தவர் யார்?",
    english: "Who founded and led the World Tamil Federation (Ulagat Tamil Kazhagam)?",
    options: [
      { id: "A", text: "நாமக்கல் கவிஞர்" },
      { id: "B", text: "பாரதிதாசன்" },
      { id: "C", text: "தேவநேயபாவாணர்" },
      { id: "D", text: "கண்ணதாசன்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "C",
    explanation: "தேவநேயபாவாணர் உலகத் தமிழ் கழகத்தை நிறுவி தலைவராக இருந்தார். அவர் தமிழ் மொழியியல் அறிஞர். 'திராவிட மொழிகளின் ஒப்பிலக்கணம்', 'தமிழ் மொழியின் வரலாறு' போன்ற முக்கியமான நூல்கள் படைத்தவர்.",
    category: "Tamil Organizations",
  },
  {
    id: 94,
    tamil: "பொருத்தமான விடையைத் தெரிவு செய்க.\nசிறபஞ்சமூலத்தின் ஆசிரியர் __________",
    english: "Who is the author of 'Sirapanjamoolam'?",
    options: [
      { id: "A", text: "முன்றுரை அரையனார்" },
      { id: "B", text: "காரியாசான்" },
      { id: "C", text: "நக்கீரன்" },
      { id: "D", text: "வடுகநாதர்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "சிறபஞ்சமூலம் என்னும் நூலின் ஆசிரியர் காரியாசான். இது சிற்றிலக்கியங்களில் ஒன்று. TNPSC தேர்வில் சங்க இலக்கியங்கள் மற்றும் சிற்றிலக்கியங்களின் ஆசிரியர்கள் முக்கியமான தலைப்பு.",
    category: "Tamil Literature - Sitrailakkiyam",
  },
  {
    id: 95,
    tamil: "'முதுமொழிக்காஞ்சி' – நூலின் ஆசிரியர்",
    english: "Who is the author of 'Muthumozhi Kanji'?",
    options: [
      { id: "A", text: "நப்பூதனார்" },
      { id: "B", text: "மதுரைக் கூடலூர் கிழார்" },
      { id: "C", text: "முன்றுரை அரையனார்" },
      { id: "D", text: "அகத்தியர்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "'முதுமொழிக்காஞ்சி' நூலின் ஆசிரியர் மதுரைக் கூடலூர் கிழார். இது சங்க காலத்திய நூல். 400 பழமொழிகளை உள்ளடக்கியது. காஞ்சி என்பது பத்து பாட்டியல் நூல்களில் ஒன்று.",
    category: "Tamil Literature - Pathinenkilkkanakku",
  },
  {
    id: 96,
    tamil: "குறட்பாவின் அணியைக் கண்டறிக\nபண்ணென்னாம் பாடற் கியைபினேல்; கண்ணென்னாம்\nகண்ணோட்டம் இல்லாத கண்.",
    english: "Identify the figure of speech (Ani) in this Thirukkural couplet.",
    options: [
      { id: "A", text: "உவமையணி" },
      { id: "B", text: "எடுத்துக்காட்டு உவமையணி" },
      { id: "C", text: "உருவகம்" },
      { id: "D", text: "இல்பொருள் உவமையணி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "இந்த திருக்குறள் எடுத்துக்காட்டு உவமையணி (Illustrative Simile). 'பண் என்னாம்' என்பதை எடுத்துக்காட்டாக கொண்டு 'கண்ணோட்டமில்லாத கண்' என்ற விளக்கம் தரப்படுகிறது. கருணையில்லாத கண்கள் பாட்டோசையில்லாத பண்போல் பயனற்றவை.",
    category: "Tamil Literature - Thirukkural & Figures of Speech",
  },
  {
    id: 97,
    tamil: "சரியாக சீர் அமையப் பெற்ற குறளைக் கண்டறிக.",
    english: "Identify the Kural with correct meter (Venba meter - Seer).",
    options: [
      { id: "A", text: "செயல் எண்ணத்தீர இருள்" },
      { id: "B", text: "இருள்தீர எண்ணிச் செயல்" },
      { id: "C", text: "எண்ணிச் செயல் தீரிருள்" },
      { id: "D", text: "தீரிருள் செயல் எண்ணி" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "B",
    explanation: "'இருள்தீர எண்ணிச் செயல்' – இது திருக்குறளின் சரியான சீர் அமைப்பு. திருக்குறள் வெண்பா வடிவில் அமைந்தது. ஒவ்வொரு வரியும் 4 சீர்களைக் கொண்டிருக்கும். 'இருள்தீர' + 'எண்ணி' + 'செயல்' என்ற வரிசை சரியான வெண்பா சீர் அமைப்பு.",
    category: "Tamil Literature - Thirukkural Prosody",
  },
  {
    id: 98,
    tamil: "'அழுக்காறு' என்பதன் பொருள் __________",
    english: "What is the meaning of 'அழுக்காறு'?",
    options: [
      { id: "A", text: "பொறாமை" },
      { id: "B", text: "பேராசை" },
      { id: "C", text: "சினம்" },
      { id: "D", text: "பெருமை" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "'அழுக்காறு' என்பதன் பொருள் பொறாமை (Envy/Jealousy). திருக்குறளில் 'அழுக்காறு' அதிகாரம் உள்ளது (குறள் 161-170). பொறாமை என்பது மற்றவர்களின் நலனை விரும்பாத மனநிலை. 'அழுக்காறு' = அழுகிய காறு = அழுகிய மனநிலை = பொறாமை.",
    category: "Tamil Literature - Thirukkural Vocabulary",
  },
  {
    id: 99,
    tamil: "பொருத்தமானதைத் தேர்ந்தெடுத்தெழுதுக.\nவிருந்தினரின் முகம் எப்போது வாடும்?",
    english: "When does a guest's face wither (based on Thirukkural/classical text)?",
    options: [
      { id: "A", text: "நம் முகம் மாறினால்" },
      { id: "B", text: "நம் வீடு மாறினால்" },
      { id: "C", text: "நம் முகவரி மாறினால்" },
      { id: "D", text: "நாம் நன்கு வரவேற்றால்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "திருக்குறள் வழி: விருந்தினரை வரவேற்கும்போது நாம் முகம் சுளிக்கும் (முகம் மாறும்) போது விருந்தினரின் முகமும் வாடும். 'விருந்தோம்பல்' அதிகாரத்தில் இக்கருத்து காணப்படும். விருந்தினரை மகிழ்ச்சியாக வரவேற்க வேண்டும்.",
    category: "Tamil Literature - Thirukkural",
  },
  {
    id: 100,
    tamil: "எதிர்ச்சொல் தருக.\nஓழுக்கம் × __________",
    english: "Give the antonym: ஓழுக்கம் × __",
    options: [
      { id: "A", text: "இழுக்கம்" },
      { id: "B", text: "இரக்கம்" },
      { id: "C", text: "வலுக்கும்" },
      { id: "D", text: "விழுப்பம்" },
      { id: "E", text: "விடை தெரியவில்லை" },
    ],
    answer: "A",
    explanation: "ஓழுக்கம் (Discipline/Virtue) × இழுக்கம் (Disgrace/Ill-conduct). இவை நேர் எதிரான பொருளைக் கொண்டவை. ஓழுக்கம் = நல்ல நடத்தை, இழுக்கம் = கெட்ட நடத்தை/இழிவு. திருக்குறளில் ஓழுக்கம் அதிகாரம் (குறள் 131-140) உள்ளது.",
    category: "Tamil Vocabulary - Antonyms",
  },
];

// ─── CATEGORY COLORS ─────────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  "Tamil Grammar - Verb Meanings": "#e74c3c",
  "Tamil Grammar - Spelling": "#e67e22",
  "Tamil Grammar - Case (Vibhakthi)": "#f39c12",
  "Tamil Grammar - Tense": "#27ae60",
  "Tamil Vocabulary - Antonyms": "#16a085",
  "Tamil Vocabulary - Synonyms": "#2980b9",
  "Tamil - English Word Equivalents": "#8e44ad",
  "Tamil Grammar - Peyarechham": "#c0392b",
  "Tamil Grammar - Verbal Noun": "#d35400",
  "Tamil Grammar - Verbal Participle": "#1abc9c",
  "Tamil Grammar - Root Word": "#2c3e50",
  "Tamil Grammar - Number Agreement": "#7f8c8d",
  "Tamil Grammar - Question Words": "#e74c3c",
  "Tamil Grammar - Letters (Ezhutthu)": "#3498db",
  "Tamil Vocabulary - Word Meaning": "#9b59b6",
  "Tamil Grammar - Word Splitting (Piritthu Ezhuthal)": "#1abc9c",
  "Tamil Grammar - Kuril-Nedil (Short-Long Vowel)": "#e67e22",
  "Tamil Grammar - Marabu Sol (Conventional Words)": "#2ecc71",
  "Tamil Grammar - Sandhi (Punarchi)": "#e74c3c",
  "Tamil Grammar - Connective Words": "#95a5a6",
  "Tamil - Place Names": "#3498db",
  "Tamil - Idioms & Phrases": "#8e44ad",
  "Tamil Grammar - Punctuation": "#f1c40f",
  "Tamil Grammar - Exclamation Types": "#e74c3c",
  "Tamil Grammar - Oru/Or Usage": "#16a085",
  "Tamil Vocabulary - Multiple Meanings": "#e67e22",
  "Tamil - Alphabetical Order": "#27ae60",
  "Tamil Vocabulary - Odd One Out": "#c0392b",
  "Tamil Literature - Classical Meaning": "#8e44ad",
  "Tamil Grammar - Single Letter Words": "#1abc9c",
  "Tamil Grammar - Number-Gender Agreement": "#3498db",
  "Tamil Grammar - Gender (Paal)": "#e74c3c",
  "Tamil Grammar - Gender": "#9b59b6",
  "Tamil Grammar - Tense Error": "#c0392b",
  "Tamil Grammar - Pronouns": "#27ae60",
  "Tamil Grammar - Verb Types": "#e67e22",
  "Tamil Grammar - Passive Voice": "#16a085",
  "Tamil Grammar - Case Suffix (Vibhakthi)": "#2980b9",
  "Tamil Grammar - Sentence Structure": "#1abc9c",
  "Tamil Grammar - Sentence Arrangement": "#f39c12",
  "Tamil Art Terms": "#8e44ad",
  "Tamil Modern Terms (Kalai Sol)": "#3498db",
  "Tamil Political Terms": "#c0392b",
  "Tamil Literature Terms": "#e74c3c",
  "Tamil Medical Terms": "#27ae60",
  "Tamil Academic Terms": "#2980b9",
  "Tamil Military Terms": "#e67e22",
  "Tamil Office Administration Terms": "#95a5a6",
  "Tamil Agriculture Terms": "#2ecc71",
  "Tamil Craft Terms": "#f39c12",
  "Tamil Social Terms": "#16a085",
  "Tamil Comprehension - Government Schemes": "#8e44ad",
  "Tamil Proverbs": "#e67e22",
  "Tamil Idioms": "#3498db",
  "Tamil Similes (Uvamaithodal)": "#27ae60",
  "Tamil Similes": "#c0392b",
  "Tamil Comprehension - Passage": "#1abc9c",
  "General Knowledge - International Days": "#9b59b6",
  "General Knowledge - Current Affairs": "#e74c3c",
  "General Knowledge - Geography": "#2980b9",
  "Tamil Linguistics": "#f1c40f",
  "Tamil Organizations": "#8e44ad",
  "Tamil Literature - Poets": "#e67e22",
  "Tamil Literature - Authors": "#c0392b",
  "Tamil Literature - Poet Birthdays": "#3498db",
  "Tamil Literature - Scholars": "#27ae60",
  "Tamil Literature - Sitrailakkiyam": "#16a085",
  "Tamil Literature - Pathinenkilkkanakku": "#e74c3c",
  "Tamil Literature - Thirukkural & Figures of Speech": "#9b59b6",
  "Tamil Literature - Thirukkural Prosody": "#2ecc71",
  "Tamil Literature - Thirukkural Vocabulary": "#f39c12",
  "Tamil Literature - Thirukkural": "#8e44ad",
  "Tamil Comprehension - Passage": "#1abc9c",
};

const getCategoryColor = (cat) => CATEGORY_COLORS[cat] || "#3498db";

export default function Gr2_Mains_Eligibility_2025() {
  const [activeTab, setActiveTab] = useState("home");
  const [quizMode, setQuizMode] = useState("study"); // study | game
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameStreak, setGameStreak] = useState(0);
  const [gameAnswered, setGameAnswered] = useState(null);
  const [gameSelected, setGameSelected] = useState(null);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState(ALL_QUESTIONS);
  const timerRef = useRef(null);

  const categories = ["All", ...Array.from(new Set(ALL_QUESTIONS.map(q => q.category))).sort()];

  useEffect(() => {
    let qs = ALL_QUESTIONS;
    if (filterCategory !== "All") qs = qs.filter(q => q.category === filterCategory);
    if (searchText) qs = qs.filter(q =>
      q.tamil.toLowerCase().includes(searchText.toLowerCase()) ||
      q.english.toLowerCase().includes(searchText.toLowerCase()) ||
      q.category.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredQuestions(qs);
    setCurrentQ(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setQuizCompleted(false);
  }, [filterCategory, searchText]);

  useEffect(() => {
    if (quizMode === "game" && timerActive) {
      timerRef.current = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setTimerActive(false);
            setGameAnswered("timeout");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive, quizMode, currentQ]);

  const startGame = () => {
    setCurrentQ(0);
    setGameScore(0);
    setGameStreak(0);
    setGameAnswered(null);
    setGameSelected(null);
    setTimer(30);
    setTimerActive(true);
    setQuizCompleted(false);
    setActiveTab("quiz");
  };

  const handleStudyAnswer = (qId, optId) => {
    if (selectedAnswers[qId]) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optId }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  };

  const handleGameAnswer = (optId) => {
    if (gameAnswered) return;
    clearInterval(timerRef.current);
    setTimerActive(false);
    setGameSelected(optId);
    const q = filteredQuestions[currentQ];
    const correct = q.answer === optId;
    setGameAnswered(correct ? "correct" : "wrong");
    if (correct) {
      setGameScore(s => s + Math.max(10, timer * 3));
      setGameStreak(s => s + 1);
    } else {
      setGameStreak(0);
    }
  };

  const nextGameQuestion = () => {
    if (currentQ + 1 >= filteredQuestions.length) {
      setQuizCompleted(true);
      return;
    }
    setCurrentQ(c => c + 1);
    setGameAnswered(null);
    setGameSelected(null);
    setTimer(30);
    setTimerActive(true);
  };

  const nextStudyQuestion = () => {
    if (currentQ + 1 < filteredQuestions.length) setCurrentQ(c => c + 1);
    else setQuizCompleted(true);
  };

  const prevStudyQuestion = () => {
    if (currentQ > 0) setCurrentQ(c => c - 1);
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setQuizCompleted(false);
    setGameScore(0);
    setGameStreak(0);
    setGameAnswered(null);
    setGameSelected(null);
    setTimer(30);
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const totalCorrect = Object.entries(selectedAnswers).filter(([qId, ans]) => {
    const q = ALL_QUESTIONS.find(q => q.id === parseInt(qId));
    return q && q.answer === ans;
  }).length;

  const q = filteredQuestions[currentQ];

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Segoe UI', 'Noto Serif Tamil', serif",
      color: "#fff",
      padding: "0",
    }}>
      {/* ── HEADER ── */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "12px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ fontWeight: 900, fontSize: 18, color: "#f39c12", letterSpacing: 1 }}>
            🎓 TNPSC தமிழ் தகுதி தேர்வு 2026
          </div>
          <div style={{ flex: 1, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
            GR2 CTS (503) | 07.03.2026 | 100 வினாக்கள்
          </div>
          {/* TABS */}
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { id: "home", label: "🏠 Home" },
              { id: "quiz", label: "📚 Quiz" },
              { id: "game", label: "🎮 Game" },
              { id: "results", label: "📊 Results" },
            ].map(tab => (
              <button key={tab.id} onClick={() => {
                if (tab.id === "game") { setQuizMode("game"); startGame(); }
                else { setActiveTab(tab.id); if (tab.id === "quiz") setQuizMode("study"); }
              }} style={{
                background: activeTab === tab.id ? "#f39c12" : "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: 20,
                padding: "6px 14px",
                color: activeTab === tab.id ? "#000" : "#fff",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.2s",
              }}>{tab.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>

        {/* ════════════════════════════════ HOME ════════════════════════════ */}
        {activeTab === "home" && (
          <div>
            {/* Hero */}
            <div style={{
              background: "linear-gradient(135deg, rgba(243,156,18,0.2), rgba(231,76,60,0.2))",
              border: "1px solid rgba(243,156,18,0.4)",
              borderRadius: 20,
              padding: 32,
              textAlign: "center",
              marginBottom: 24,
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📜</div>
              <h1 style={{ fontSize: 26, fontWeight: 900, color: "#f39c12", margin: "0 0 8px" }}>
                பகுதி-அ: தமிழ் தகுதித் தேர்வு
              </h1>
              <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 16px", fontSize: 14 }}>
                Combined Technical Service Examination (Interview Posts)-II<br/>
                Date: 07.03.2026 | Marks: 150 | Questions: 100
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => { setActiveTab("quiz"); setQuizMode("study"); }} style={{
                  background: "#f39c12", border: "none", borderRadius: 12, padding: "12px 24px",
                  fontSize: 15, fontWeight: 800, cursor: "pointer", color: "#000",
                }}>📚 Study Mode</button>
                <button onClick={() => { setQuizMode("game"); startGame(); }} style={{
                  background: "#e74c3c", border: "none", borderRadius: 12, padding: "12px 24px",
                  fontSize: 15, fontWeight: 800, cursor: "pointer", color: "#fff",
                }}>🎮 Quiz Game</button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 24 }}>
              {[
                { label: "மொத்த வினாக்கள்", value: "100", icon: "📝", color: "#3498db" },
                { label: "மொத்த மதிப்பெண்கள்", value: "150", icon: "🎯", color: "#e74c3c" },
                { label: "வகைகள்", value: categories.length - 1, icon: "📂", color: "#27ae60" },
                { label: "உங்கள் முன்னேற்றம்", value: `${totalAnswered}/100`, icon: "📈", color: "#f39c12" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${s.color}44`,
                  borderRadius: 14,
                  padding: "16px 20px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Overview Table */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
            }}>
              <h3 style={{ margin: "0 0 16px", color: "#f39c12", fontSize: 16 }}>📋 Question Overview (Q1–Q100)</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "rgba(243,156,18,0.15)" }}>
                      {["#", "Category", "Answer", "Topic"].map(h => (
                        <th key={h} style={{ padding: "8px 10px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#f39c12" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ALL_QUESTIONS.map((q, i) => (
                      <tr key={q.id} style={{
                        background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                        cursor: "pointer",
                      }} onClick={() => { setCurrentQ(i); setActiveTab("quiz"); setQuizMode("study"); }}>
                        <td style={{ padding: "7px 10px", color: "#f39c12", fontWeight: 700 }}>{q.id}</td>
                        <td style={{ padding: "7px 10px" }}>
                          <span style={{
                            background: getCategoryColor(q.category) + "33",
                            border: `1px solid ${getCategoryColor(q.category)}55`,
                            borderRadius: 8,
                            padding: "2px 7px",
                            fontSize: 10,
                            color: getCategoryColor(q.category),
                          }}>{q.category}</span>
                        </td>
                        <td style={{ padding: "7px 10px" }}>
                          <span style={{
                            background: q.answer === "NOT_CLARIFIED" ? "#e74c3c33" : "#27ae6033",
                            border: `1px solid ${q.answer === "NOT_CLARIFIED" ? "#e74c3c" : "#27ae60"}55`,
                            borderRadius: 6,
                            padding: "2px 8px",
                            fontSize: 12,
                            fontWeight: 700,
                            color: q.answer === "NOT_CLARIFIED" ? "#e74c3c" : "#2ecc71",
                          }}>{q.answer === "NOT_CLARIFIED" ? "❓" : q.answer}</span>
                        </td>
                        <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{q.english.slice(0, 60)}...</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════ QUIZ (STUDY MODE) ══════════════ */}
        {activeTab === "quiz" && quizMode === "study" && (
          <div>
            {/* Filters */}
            <div style={{
              display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center",
            }}>
              <input
                placeholder="🔍 Search..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 20, padding: "8px 16px", color: "#fff", fontSize: 13,
                  outline: "none", flex: 1, minWidth: 180,
                }}
              />
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 20, padding: "8px 14px", color: "#fff", fontSize: 12,
                outline: "none", cursor: "pointer",
              }}>
                {categories.map(c => <option key={c} value={c} style={{ background: "#2c3e50" }}>{c === "All" ? "All Categories" : c}</option>)}
              </select>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6, color: "rgba(255,255,255,0.6)" }}>
                <span>வினா {currentQ + 1} / {filteredQuestions.length}</span>
                <span>{filteredQuestions.length} வினாக்கள் காட்டப்படுகின்றன</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${((currentQ + 1) / filteredQuestions.length) * 100}%`,
                  background: "linear-gradient(90deg, #f39c12, #e74c3c)",
                  borderRadius: 3,
                  transition: "width 0.3s",
                }} />
              </div>
            </div>

            {q && !quizCompleted ? (
              <div>
                {/* Question Card */}
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `2px solid ${getCategoryColor(q.category)}44`,
                  borderRadius: 20,
                  padding: 24,
                  marginBottom: 16,
                }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                    <span style={{
                      background: "#f39c1233",
                      border: "1px solid #f39c12",
                      borderRadius: 20,
                      padding: "3px 12px",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#f39c12",
                    }}>Q{q.id}</span>
                    <span style={{
                      background: getCategoryColor(q.category) + "22",
                      border: `1px solid ${getCategoryColor(q.category)}55`,
                      borderRadius: 20,
                      padding: "3px 12px",
                      fontSize: 11,
                      color: getCategoryColor(q.category),
                    }}>{q.category}</span>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.6, marginBottom: 10, color: "#fff" }}>
                    {q.tamil}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>
                    {q.english}
                  </div>
                </div>

                {/* Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                  {q.options.map(opt => {
                    const answered = !!selectedAnswers[q.id];
                    const isSelected = selectedAnswers[q.id] === opt.id;
                    const isCorrect = q.answer === opt.id;
                    let bg = "rgba(255,255,255,0.05)";
                    let border = "1px solid rgba(255,255,255,0.15)";
                    let color = "#fff";
                    if (answered) {
                      if (isCorrect) { bg = "rgba(39,174,96,0.2)"; border = "2px solid #27ae60"; color = "#2ecc71"; }
                      else if (isSelected && !isCorrect) { bg = "rgba(231,76,60,0.2)"; border = "2px solid #e74c3c"; color = "#e74c3c"; }
                    } else if (!answered) {
                      bg = "rgba(255,255,255,0.05)";
                    }
                    return (
                      <button key={opt.id} onClick={() => handleStudyAnswer(q.id, opt.id)} style={{
                        background: bg, border, borderRadius: 12,
                        padding: "14px 18px", textAlign: "left", cursor: answered ? "default" : "pointer",
                        color, fontSize: 15, display: "flex", alignItems: "flex-start", gap: 12,
                        transition: "all 0.2s",
                      }}>
                        <span style={{
                          minWidth: 28, height: 28, borderRadius: "50%",
                          background: answered && isCorrect ? "#27ae60" : answered && isSelected ? "#e74c3c" : "rgba(255,255,255,0.1)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 900, color: "#fff", flexShrink: 0,
                        }}>
                          {answered && isCorrect ? "✓" : answered && isSelected && !isCorrect ? "✗" : opt.id}
                        </span>
                        <span style={{ lineHeight: 1.5 }}>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showExplanation[q.id] && (
                  <div style={{
                    background: "rgba(39,174,96,0.1)",
                    border: "1px solid rgba(39,174,96,0.4)",
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                  }}>
                    <div style={{ fontWeight: 700, color: "#2ecc71", marginBottom: 8, fontSize: 14 }}>
                      💡 விளக்கம் (Explanation)
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontSize: 14 }}>
                      {q.explanation}
                    </div>
                    {q.answer === "NOT_CLARIFIED" && (
                      <div style={{
                        marginTop: 10, padding: "8px 12px",
                        background: "rgba(231,76,60,0.2)", borderRadius: 8,
                        fontSize: 12, color: "#e74c3c",
                      }}>
                        ⚠️ இந்த வினாவிற்கு TNPSC அதிகாரப்பூர்வமாக விடையை தெளிவுபடுத்தவில்லை.
                      </div>
                    )}
                  </div>
                )}

                {/* Nav Buttons */}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={prevStudyQuestion} disabled={currentQ === 0} style={{
                    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 10, padding: "10px 20px", color: "#fff", fontWeight: 700,
                    cursor: currentQ === 0 ? "not-allowed" : "pointer", opacity: currentQ === 0 ? 0.4 : 1,
                  }}>← முந்தைய</button>
                  {!selectedAnswers[q.id] && (
                    <button onClick={() => {
                      setSelectedAnswers(prev => ({ ...prev, [q.id]: q.answer }));
                      setShowExplanation(prev => ({ ...prev, [q.id]: true }));
                    }} style={{
                      background: "rgba(243,156,18,0.2)", border: "1px solid #f39c12",
                      borderRadius: 10, padding: "10px 20px", color: "#f39c12", fontWeight: 700, cursor: "pointer",
                    }}>💡 விடை காட்டு</button>
                  )}
                  <button onClick={nextStudyQuestion} style={{
                    background: "#f39c12", border: "none",
                    borderRadius: 10, padding: "10px 20px", color: "#000", fontWeight: 800, cursor: "pointer", flex: 1,
                  }}>{currentQ + 1 < filteredQuestions.length ? "அடுத்த →" : "முடி ✓"}</button>
                </div>
              </div>
            ) : quizCompleted ? (
              <ResultsPanel
                questions={filteredQuestions}
                selectedAnswers={selectedAnswers}
                onRestart={() => { restartQuiz(); }}
                isStudy
              />
            ) : <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.4)" }}>No questions found.</div>}
          </div>
        )}

        {/* ════════════════════════════════ GAME MODE ══════════════════════ */}
        {activeTab === "quiz" && quizMode === "game" && (
          <div>
            {!quizCompleted && q ? (
              <div>
                {/* Game HUD */}
                <div style={{
                  display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap",
                }}>
                  {[
                    { label: "Score", value: gameScore, icon: "🏆", color: "#f39c12" },
                    { label: "Streak", value: `🔥${gameStreak}`, icon: "", color: "#e74c3c" },
                    { label: "Q", value: `${currentQ + 1}/${filteredQuestions.length}`, icon: "📝", color: "#3498db" },
                  ].map(s => (
                    <div key={s.label} style={{
                      background: "rgba(255,255,255,0.07)",
                      border: `1px solid ${s.color}44`,
                      borderRadius: 12,
                      padding: "10px 16px",
                      flex: 1,
                      textAlign: "center",
                    }}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                    </div>
                  ))}
                  {/* Timer */}
                  <div style={{
                    background: timer <= 10 ? "rgba(231,76,60,0.2)" : "rgba(39,174,96,0.1)",
                    border: `2px solid ${timer <= 10 ? "#e74c3c" : "#27ae60"}`,
                    borderRadius: 12, padding: "10px 16px", flex: 1, textAlign: "center",
                  }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: timer <= 10 ? "#e74c3c" : "#2ecc71" }}>
                      ⏱ {timer}s
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Timer</div>
                  </div>
                </div>

                {/* Timer Bar */}
                <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                  <div style={{
                    height: "100%",
                    width: `${(timer / 30) * 100}%`,
                    background: timer <= 10 ? "#e74c3c" : "#27ae60",
                    borderRadius: 4,
                    transition: "width 1s linear, background 0.3s",
                  }} />
                </div>

                {/* Question */}
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 20,
                  padding: 24,
                  marginBottom: 16,
                }}>
                  <div style={{ fontSize: 11, color: "#f39c12", marginBottom: 10 }}>Q{q.id} | {q.category}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.6 }}>{q.tamil}</div>
                </div>

                {/* Options Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                  {q.options.filter(o => o.id !== "E").map(opt => {
                    let bg = "rgba(255,255,255,0.07)";
                    let border = "1px solid rgba(255,255,255,0.15)";
                    let color = "#fff";
                    if (gameAnswered) {
                      const isCorrect = q.answer === opt.id;
                      const isSelected = gameSelected === opt.id;
                      if (isCorrect) { bg = "rgba(39,174,96,0.25)"; border = "2px solid #27ae60"; color = "#2ecc71"; }
                      else if (isSelected) { bg = "rgba(231,76,60,0.25)"; border = "2px solid #e74c3c"; color = "#e74c3c"; }
                    }
                    return (
                      <button key={opt.id} onClick={() => handleGameAnswer(opt.id)} style={{
                        background: bg, border, borderRadius: 14,
                        padding: "16px 14px", cursor: gameAnswered ? "default" : "pointer",
                        color, fontSize: 14, textAlign: "left", fontWeight: 600,
                        lineHeight: 1.5, transition: "all 0.2s",
                        transform: !gameAnswered ? "scale(1)" : "scale(1)",
                      }}>
                        <span style={{ fontWeight: 900, color: "#f39c12", marginRight: 8 }}>{opt.id}.</span>
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                {/* Result feedback */}
                {gameAnswered && (
                  <div style={{
                    background: gameAnswered === "correct" ? "rgba(39,174,96,0.15)" : "rgba(231,76,60,0.15)",
                    border: `1px solid ${gameAnswered === "correct" ? "#27ae60" : "#e74c3c"}`,
                    borderRadius: 16, padding: 20, marginBottom: 16,
                  }}>
                    <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: gameAnswered === "correct" ? "#2ecc71" : "#e74c3c" }}>
                      {gameAnswered === "correct" ? "✅ சரி! +" + Math.max(10, timer * 3) + " pts" :
                        gameAnswered === "timeout" ? "⏰ நேரம் முடிந்தது!" : "❌ தவறு!"}
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                      <strong style={{ color: "#f39c12" }}>சரியான விடை: {q.answer}</strong><br />
                      {q.explanation}
                    </div>
                    <button onClick={nextGameQuestion} style={{
                      marginTop: 12, background: "#f39c12", border: "none",
                      borderRadius: 10, padding: "10px 24px", fontWeight: 800, cursor: "pointer", color: "#000",
                    }}>{currentQ + 1 < filteredQuestions.length ? "அடுத்து →" : "முடிவு 🏁"}</button>
                  </div>
                )}
              </div>
            ) : quizCompleted ? (
              <div>
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "2px solid #f39c12",
                  borderRadius: 20, padding: 32, textAlign: "center", marginBottom: 24,
                }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>🏆</div>
                  <h2 style={{ color: "#f39c12", margin: "0 0 8px" }}>விளையாட்டு முடிந்தது!</h2>
                  <div style={{ fontSize: 40, fontWeight: 900, color: "#fff", margin: "16px 0" }}>{gameScore} pts</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                    {filteredQuestions.length} வினாக்கள் முடிந்தன
                  </div>
                  <button onClick={() => { setQuizMode("game"); startGame(); }} style={{
                    marginTop: 20, background: "#e74c3c", border: "none", borderRadius: 12,
                    padding: "12px 28px", fontWeight: 800, cursor: "pointer", color: "#fff", fontSize: 15,
                  }}>🔄 மீண்டும் விளையாடு</button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ════════════════════════════════ RESULTS ════════════════════════ */}
        {activeTab === "results" && (
          <ResultsPanel
            questions={ALL_QUESTIONS}
            selectedAnswers={selectedAnswers}
            onRestart={restartQuiz}
            isStudy={false}
          />
        )}
      </div>
    </div>
  );
}

// ─── RESULTS PANEL ────────────────────────────────────────────────────────────
function ResultsPanel({ questions, selectedAnswers, onRestart, isStudy }) {
  const answered = Object.keys(selectedAnswers).length;
  const correct = Object.entries(selectedAnswers).filter(([qId, ans]) => {
    const q = questions.find(q => q.id === parseInt(qId));
    return q && q.answer === ans;
  }).length;
  const pct = answered ? Math.round((correct / answered) * 100) : 0;

  const categoryStats = {};
  questions.forEach(q => {
    if (!categoryStats[q.category]) categoryStats[q.category] = { total: 0, correct: 0 };
    categoryStats[q.category].total++;
    if (selectedAnswers[q.id] === q.answer) categoryStats[q.category].correct++;
  });

  return (
    <div>
      {/* Score Card */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        border: "2px solid rgba(243,156,18,0.5)",
        borderRadius: 20, padding: 28, textAlign: "center", marginBottom: 24,
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>
          {pct >= 80 ? "🏆" : pct >= 60 ? "🎯" : pct >= 40 ? "📚" : "💪"}
        </div>
        <h2 style={{ margin: "0 0 8px", color: "#f39c12" }}>உங்கள் முடிவு</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginTop: 16 }}>
          {[
            { label: "சரியான விடைகள்", value: correct, color: "#27ae60" },
            { label: "தவறான விடைகள்", value: answered - correct, color: "#e74c3c" },
            { label: "பதில் அளிக்காதவை", value: questions.length - answered, color: "#95a5a6" },
            { label: "மதிப்பெண் %", value: `${pct}%`, color: "#f39c12" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={onRestart} style={{
          marginTop: 20, background: "#f39c12", border: "none", borderRadius: 12,
          padding: "12px 28px", fontWeight: 800, cursor: "pointer", color: "#000", fontSize: 15,
        }}>🔄 மீண்டும் தொடங்கு</button>
      </div>

      {/* Category Breakdown Table */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16, padding: 20, marginBottom: 24,
      }}>
        <h3 style={{ margin: "0 0 16px", color: "#f39c12", fontSize: 16 }}>📊 வகைவாரியான செயல்திறன்</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "rgba(243,156,18,0.1)" }}>
                {["வகை", "மொத்தம்", "சரி", "முன்னேற்றம்"].map(h => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#f39c12" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(categoryStats).map(([cat, stats], i) => {
                const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                return (
                  <tr key={cat} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                    <td style={{ padding: "7px 10px" }}>
                      <span style={{
                        background: getCategoryColor(cat) + "22",
                        border: `1px solid ${getCategoryColor(cat)}44`,
                        borderRadius: 6, padding: "2px 7px", fontSize: 10, color: getCategoryColor(cat),
                      }}>{cat}</span>
                    </td>
                    <td style={{ padding: "7px 10px", fontWeight: 700 }}>{stats.total}</td>
                    <td style={{ padding: "7px 10px", color: "#2ecc71", fontWeight: 700 }}>{stats.correct}</td>
                    <td style={{ padding: "7px 10px", minWidth: 120 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3 }}>
                          <div style={{
                            width: `${pct}%`, height: "100%",
                            background: pct >= 80 ? "#27ae60" : pct >= 50 ? "#f39c12" : "#e74c3c",
                            borderRadius: 3,
                          }} />
                        </div>
                        <span style={{ fontSize: 11, color: pct >= 80 ? "#2ecc71" : pct >= 50 ? "#f39c12" : "#e74c3c", minWidth: 32 }}>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Answer Review Table */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16, padding: 20,
      }}>
        <h3 style={{ margin: "0 0 16px", color: "#f39c12", fontSize: 16 }}>📋 விடைகளின் விவரம்</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "rgba(243,156,18,0.1)" }}>
                {["#", "கேள்வி", "சரியான விடை", "உங்கள் விடை", "நிலை"].map(h => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#f39c12" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map((q, i) => {
                const ua = selectedAnswers[q.id];
                const isCorrect = ua === q.answer;
                const notAnswered = !ua;
                return (
                  <tr key={q.id} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                    <td style={{ padding: "7px 10px", color: "#f39c12", fontWeight: 700 }}>{q.id}</td>
                    <td style={{ padding: "7px 10px", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "rgba(255,255,255,0.7)" }}>
                      {q.tamil.slice(0, 60)}
                    </td>
                    <td style={{ padding: "7px 10px" }}>
                      <span style={{
                        background: "#27ae6033", border: "1px solid #27ae6055",
                        borderRadius: 6, padding: "2px 8px", fontWeight: 700, color: "#2ecc71",
                      }}>{q.answer}</span>
                    </td>
                    <td style={{ padding: "7px 10px" }}>
                      {ua ? (
                        <span style={{
                          background: isCorrect ? "#27ae6033" : "#e74c3c33",
                          border: `1px solid ${isCorrect ? "#27ae60" : "#e74c3c"}55`,
                          borderRadius: 6, padding: "2px 8px", fontWeight: 700,
                          color: isCorrect ? "#2ecc71" : "#e74c3c",
                        }}>{ua}</span>
                      ) : <span style={{ color: "rgba(255,255,255,0.3)" }}>–</span>}
                    </td>
                    <td style={{ padding: "7px 10px" }}>
                      {notAnswered ? <span style={{ color: "#95a5a6", fontSize: 11 }}>⬜ பதில் இல்லை</span>
                        : isCorrect ? <span style={{ color: "#2ecc71" }}>✅</span>
                          : <span style={{ color: "#e74c3c" }}>❌</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getCategoryColor(cat) {
  const COLORS = {
    "Tamil Grammar": "#3498db",
    "Tamil Vocabulary": "#e67e22",
    "Tamil Literature": "#9b59b6",
    "General Knowledge": "#27ae60",
  };
  for (const [key, col] of Object.entries(COLORS)) {
    if (cat.startsWith(key)) return col;
  }
  const hash = cat.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const palette = ["#3498db","#e74c3c","#2ecc71","#f39c12","#9b59b6","#1abc9c","#e67e22","#c0392b","#16a085","#8e44ad"];
  return palette[hash % palette.length];
}
