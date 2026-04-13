import { useState, useEffect, useRef } from "react";

// ─── ALL 100 QUESTIONS FROM PDF ───────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    tamil: "இரு வினைகளின் பொருள் வேறுபாடு. உன்னுதல் – உண்ணுதல்",
    english: "Meaning difference between two verbs: உன்னுதல் – உண்ணுதல்",
    options: [
      { label: "A", text: "முடித்தல் – சாப்பிடுதல்" },
      { label: "B", text: "நினைத்தல் – சாப்பிடுதல்" },
      { label: "C", text: "எடுத்தல் – சாப்பிடுதல்" },
      { label: "D", text: "வழங்கல் – சாப்பிடுதல்" },
    ],
    answer: "B",
    explanation: "உன்னுதல் என்பது 'நினைத்தல்' என்று பொருள்படும். உண்ணுதல் என்பது 'சாப்பிடுதல்' என்று பொருள்படும். எனவே இரு வினைகளின் பொருள் வேறுபாடு: நினைத்தல் – சாப்பிடுதல்.",
    explanation_en: "உன்னுதல் means 'to think/contemplate' and உண்ணுதல் means 'to eat/consume'. So the meaning difference is: thinking – eating.",
  },
  {
    id: 2,
    tamil: "இருவினைகளின் பொருள் வேறுபாட்டிற்கு சரியான தொடரைத் தேர்ந்தெடுக்க. பொருந்து – பொருத்து",
    english: "Choose the correct sentence showing meaning difference between: பொருந்து – பொருத்து",
    options: [
      { label: "A", text: "தவறாகப் பொருந்திய சொல்லை எடுத்து சரியான சொல்லைப் பொருந்தினேன்" },
      { label: "B", text: "தவறாகப் பொருத்திய சொல்லை எடுத்து சரியான சொல்லைப் பொருந்தினேன்" },
      { label: "C", text: "தவறாகப் பொருந்திய சொல்லை எடுத்து சரியான சொல்லைப் பொருத்தினேன்" },
      { label: "D", text: "தவறாகப் பொருத்திய சொல்லை எடுத்து சரியான சொல்லைப் பொருத்தினேன்" },
    ],
    answer: "C",
    explanation: "பொருந்து என்பது தானாகப் பொருத்தமாக இருத்தல் (intransitive - செய்வினை இல்லாத வினை). பொருத்து என்பது ஒன்றை ஒன்றில் பொருத்துதல் (transitive - செய்வினை). எனவே 'தவறாகப் பொருந்திய சொல்லை எடுத்து சரியான சொல்லைப் பொருத்தினேன்' என்பது சரியான தொடர்.",
    explanation_en: "பொருந்து is intransitive (to fit naturally), while பொருத்து is transitive (to fit something). Option C correctly uses both in context.",
  },
  {
    id: 3,
    tamil: "பிழையற்ற தொடரைக் கண்டறிக.",
    english: "Find the error-free sentence.",
    options: [
      { label: "A", text: "எனக்குக் கொடையாக ஒரு பொருளை தர வேண்டும்" },
      { label: "B", text: "எனக்குக் கொடையாக ஒரு பொருளைத் தர வேண்டும்" },
      { label: "C", text: "எனக்கு கொடையாக ஒரு பொருளைத் தர வேண்டும்" },
      { label: "D", text: "எனக்கு கொடையாக ஒரு பொருளை தர வேண்டும்" },
    ],
    answer: "B",
    explanation: "'எனக்குக்' என்பதில் குற்றியலுகரம் வரும்போது 'க்' சேர்க்கப்படுகிறது. 'பொருளைத்' என்பதில் 'த்' சேர்க்கப்படுவது புணர்ச்சி விதிப்படி சரியானது. எனவே விடை B சரியானது.",
    explanation_en: "Option B correctly applies Tamil sandhi (புணர்ச்சி) rules: 'எனக்குக்' and 'பொருளைத்' are correctly formed with proper consonant additions.",
  },
  {
    id: 4,
    tamil: "ஒற்றுப்பிழையற்ற விடையைக் கண்டறிக. 'மனத்து கண் மாசிலன் ஆதல்' என்று திருக்குறள் அறத்தை கூறுகிறது.",
    english: "Find the sentence without spelling errors.",
    options: [
      { label: "A", text: "மனத்துகண் மாசிலன் ஆதல் என்று திருக்குறள் அறத்தைக் கூறுகிறது" },
      { label: "B", text: "மனத்துக்கண் மாசிலன் ஆதல் என்று திருக்குறள் அறத்தை கூறுகிறது" },
      { label: "C", text: "மனத்து கண் மாசிலன் ஆதல் என்று திருக்குறள் அறத்தைக் கூறுகிறது" },
      { label: "D", text: "மனத்துக்கண் மாசிலன் ஆதல் என்று திருக்குறள் அறத்தைக் கூறுகிறது" },
    ],
    answer: "D",
    explanation: "'மனத்துக்கண்' என்பது சரியான புணர்ச்சி வடிவம். 'மனத்து + கண்' = 'மனத்துக்கண்'. 'அறத்தைக்' என்பதும் சரியான புணர்ச்சி வடிவம். எனவே D சரியானது.",
    explanation_en: "Option D has the correct sandhi forms: 'மனத்துக்கண்' (மனத்து + கண்) and 'அறத்தைக்' are properly formed per Tamil grammar rules.",
  },
  {
    id: 5,
    tamil: "எழுத்துப்பிழை நீங்கிய தொடரைத் தெரிவு செய்க.",
    english: "Choose the sentence free from spelling errors.",
    options: [
      { label: "A", text: "ஒரு அழகிய சிற்றூரில் ஒர் குளம் இருந்தது" },
      { label: "B", text: "ஒர் அழகிய சிற்றூரில் ஒர் குளம் இருந்தது" },
      { label: "C", text: "ஒரு அழகிய சிற்றூரில் ஒரு குளம் இருந்தது" },
      { label: "D", text: "ஒர் அழகிய சிற்றூரில் ஒரு குளம் இருந்தது" },
    ],
    answer: "D",
    explanation: "'ஒர்' என்பது மெய்யெழுத்தில் தொடங்கும் சொல்லுக்கு முன் வரும் (ஒர் அழகிய). 'ஒரு' என்பது உயிரெழுத்தில் தொடங்கும் சொல்லுக்கு முன் வரும் (ஒரு குளம்). 'அழகிய' - அ என்ற உயிரில் தொடங்குவதால் 'ஒர்' வரும். 'குளம்' - க என்ற மெய்யில் தொடங்குவதால் 'ஒரு' வரும்.",
    explanation_en: "'ஒர்' is used before words beginning with vowels, 'ஒரு' before consonants. 'அழகிய' starts with vowel 'அ' so 'ஒர்' is correct; 'குளம்' starts with consonant 'க்' so 'ஒரு' is correct.",
  },
  {
    id: 6,
    tamil: "எழுத்துப்பிழை நீங்கிய தொடரைத் தெரிவு செய்க.",
    english: "Choose the sentence free from spelling errors.",
    options: [
      { label: "A", text: "மதியழகன் தீக்காயம் ஏற்பட்ட இடத்தில் உடனடியாகத் தன்னீர் கொண்டு குளிர வைத்தது" },
      { label: "B", text: "மதியழகன் தீக்காயம் ஏற்பட்ட இடத்தில் உடனடியாகத் தண்ணீர்க்கொண்டு குளிர வைத்தான்" },
      { label: "C", text: "மதியழகன் தீக்காயம் ஏற்பட்ட இடத்தில் உடனடியாகத் தண்ணீர் கொண்டு குளிர வைத்தாள்" },
      { label: "D", text: "மதியழகன் தீக்காயம் ஏற்பட்ட இடத்தில் உடனடியாகத் தண்ணீர் கொண்டு குளிர வைத்தானா?" },
    ],
    answer: "B",
    explanation: "'மதியழகன்' என்பது ஆண்பால் பெயர். ஆண்பாலுக்கு 'வைத்தான்' என்பது சரியான வினைமுற்று. 'தண்ணீர்க்கொண்டு' என்பதில் புணர்ச்சி சரியாக உள்ளது. எனவே B சரியானது.",
    explanation_en: "'மதியழகன்' is a masculine name, so 'வைத்தான்' (he did) is correct. Option B has proper spelling and gender agreement.",
  },
  {
    id: 7,
    tamil: "நீக்குதல் என்னும் சொல்லின் எதிர்ச்சொல்",
    english: "Antonym of நீக்குதல் (to remove)",
    options: [
      { label: "A", text: "போக்குதல்" },
      { label: "B", text: "தள்ளுதல்" },
      { label: "C", text: "அழித்தல்" },
      { label: "D", text: "சேர்த்தல்" },
    ],
    answer: "D",
    explanation: "நீக்குதல் என்பது 'அகற்றுதல்' என்று பொருள். இதன் எதிர்ச்சொல் 'சேர்த்தல்' ஆகும். நீக்குதல் - சேர்த்தல் என்பது எதிர்ச்சொல் ஜோடி.",
    explanation_en: "நீக்குதல் means 'to remove/eliminate'. Its antonym is சேர்த்தல் (to add/combine). Remove ↔ Add.",
  },
  {
    id: 8,
    tamil: "சரியான இணையைத் தேர்வு செய்க.",
    english: "Choose the correct pair (synonym pairs).",
    options: [
      { label: "A", text: "நிறை – பொறுமை" },
      { label: "B", text: "மையல் – விருப்பம்" },
      { label: "C", text: "மதம் – சோர்வு" },
      { label: "D", text: "பொறை – மேன்மை" },
    ],
    answer: "B",
    explanation: "மையல் என்பது 'விருப்பம், காதல், ஆர்வம்' என்று பொருள்படும். எனவே மையல் – விருப்பம் சரியான இணை. நிறை என்பது 'நிரம்புதல்', பொறுமை என்பது தாங்குதல் - இவை சரியான இணை அல்ல.",
    explanation_en: "மையல் means 'desire/love/passion', which is synonymous with விருப்பம் (desire/wish). This is the correct synonym pair.",
  },
  {
    id: 9,
    tamil: "சரியான குறிப்புப் பெயரெச்சத்தைத் தெரிவு செய்க.",
    english: "Choose the correct adjectival participle (குறிப்புப் பெயரெச்சம்).",
    options: [
      { label: "A", text: "எழுதிய கடிதம்" },
      { label: "B", text: "பார்த்த கடிதம்" },
      { label: "C", text: "சிறிய கடிதம்" },
      { label: "D", text: "படித்த கடிதம்" },
    ],
    answer: "C",
    explanation: "குறிப்புப் பெயரெச்சம் என்பது காலம் காட்டாமல் குணம் அல்லது தன்மையை மட்டும் காட்டும் பெயரெச்சம். 'சிறிய கடிதம்' என்பதில் 'சிறிய' என்னும் சொல் காலம் காட்டாமல் குணத்தை மட்டும் காட்டுகிறது. எனவே இது குறிப்புப் பெயரெச்சம்.",
    explanation_en: "குறிப்புப் பெயரெச்சம் (attributive participle) shows quality without tense. 'சிறிய' (small/little) describes quality without any tense, making 'சிறிய கடிதம்' the correct answer.",
  },
  {
    id: 10,
    tamil: "சரியான விடையைத் தேர்க. 'ஆற்று' என்ற வேர்ச்சொல்லின் வினையாலணையும் பெயரைத் தெரிவு செய்க.",
    english: "Choose the verbal noun (வினையாலணையும் பெயர்) from the root 'ஆற்று'.",
    options: [
      { label: "A", text: "ஆற்றுதல்" },
      { label: "B", text: "ஆற்றாமை" },
      { label: "C", text: "ஆற்றுவான்" },
      { label: "D", text: "ஆற்றுகின்றான்" },
    ],
    answer: "C",
    explanation: "வினையாலணையும் பெயர் என்பது வினையினால் குறிக்கப்படும் உயர்திணைப் பெயர். 'ஆற்றுவான்' என்பது 'ஆற்றுகிறவன்' என்ற பொருளில் ஒரு செயலை செய்பவனை குறிக்கும் வினையாலணையும் பெயர்.",
    explanation_en: "வினையாலணையும் பெயர் (deverbal noun) refers to a person who performs the action. 'ஆற்றுவான்' means 'one who accomplishes/performs' - a deverbal noun in the masculine gender.",
  },
  {
    id: 11,
    tamil: "சரியான விடையைத் தேர்க. 'வளர்' என்ற வேர்ச்சொல்லின் வினையெச்சத்தைக் கண்டறிக.",
    english: "Find the verbal participle (வினையெச்சம்) from the root 'வளர்'.",
    options: [
      { label: "A", text: "வளர்த்து" },
      { label: "B", text: "வளர்ந்த" },
      { label: "C", text: "வளரும்" },
      { label: "D", text: "வளரா" },
    ],
    answer: "A",
    explanation: "வினையெச்சம் என்பது ஒரு வினையின் முடிவைக் காட்டி, அடுத்த வினைக்கு இணைப்பாக வரும் சொல். 'வளர்த்து' என்பது வளர்க்கும் செயலை முடித்து அடுத்த செயலுக்கு வழிகோலும் வினையெச்சம். (வளர்த்து + வேறு வினை = வினையெச்ச தொடர்)",
    explanation_en: "வினையெச்சம் (adverbial participle) shows completion of one action before another begins. 'வளர்த்து' means 'having grown/raised' and connects to the next verb in the sentence.",
  },
  {
    id: 12,
    tamil: "சரியான விடையைத் தேர்க. 'பணி' என்ற வேர்ச்சொல்லின் வினையெச்சத்தைக் கண்டறிக.",
    english: "Find the verbal participle (வினையெச்சம்) from the root 'பணி'.",
    options: [
      { label: "A", text: "பணிந்திலன்" },
      { label: "B", text: "பணியா" },
      { label: "C", text: "பணிந்த" },
      { label: "D", text: "பணிந்து" },
    ],
    answer: "D",
    explanation: "வினையெச்சம் என்பது '-து', '-உ', '-இ' போன்ற விகுதிகளில் முடியும். 'பணிந்து' என்பது 'பணிந்து + வேறு வினை' என்று இணைக்கும் வினையெச்சம் ஆகும். உதாரணம்: 'பணிந்து வணங்கினான்'.",
    explanation_en: "வினையெச்சம் ends in '-து', '-உ', '-இ'. 'பணிந்து' (having bowed/served) is the adverbial participle form of பணி, used to connect actions: 'பணிந்து வணங்கினான்'.",
  },
  {
    id: 13,
    tamil: "வேர்ச்சொல்லைத் தேர்வு செய்க. படித்தான்",
    english: "Find the root word (வேர்ச்சொல்) of 'படித்தான்'.",
    options: [
      { label: "A", text: "படித்" },
      { label: "B", text: "படித்தா" },
      { label: "C", text: "படி" },
      { label: "D", text: "பா" },
    ],
    answer: "C",
    explanation: "படித்தான் என்பதை பகுத்தால்: படி (வேர்ச்சொல்) + த்த் (இறந்தகால இடைநிலை) + ஆன் (ஆண்பால் வினைமுற்று விகுதி) = படித்தான். எனவே வேர்ச்சொல் 'படி'.",
    explanation_en: "Breaking down படித்தான்: படி (root) + த்த் (past tense marker) + ஆன் (masculine ending). The root word is 'படி' meaning 'to study/read'.",
  },
  {
    id: 14,
    tamil: "வினைமுற்றுக்கு உரிய வேர்ச்சொல்லை எழுதுக. நடக்கிறது",
    english: "Write the root word (வேர்ச்சொல்) for நடக்கிறது.",
    options: [
      { label: "A", text: "நட" },
      { label: "B", text: "நடந்து" },
      { label: "C", text: "நடக்கும்" },
      { label: "D", text: "நடந்து செல" },
    ],
    answer: "A",
    explanation: "நடக்கிறது என்பதை பகுத்தால்: நட (வேர்ச்சொல்) + க்கிற் (நிகழ்கால இடைநிலை) + து (ஒன்றன்பால் விகுதி). எனவே வேர்ச்சொல் 'நட'.",
    explanation_en: "Breaking நடக்கிறது: நட (root) + க்கிற் (present tense marker) + து (neuter singular ending). Root word is 'நட' meaning 'to walk/happen'.",
  },
  {
    id: 15,
    tamil: "ஒருமை பன்மை அறிந்து தவறான தொடரைத் தோக.",
    english: "Identify the incorrect sentence regarding singular/plural agreement.",
    options: [
      { label: "A", text: "அது புத்தகம் அல்ல" },
      { label: "B", text: "அவன் கோழை அல்லன்" },
      { label: "C", text: "இவள் குழந்தை அல்லள்" },
      { label: "D", text: "அவர்கள் விருந்தினர் அல்லர்" },
    ],
    answer: "A",
    explanation: "'அது புத்தகம் அல்ல' என்பது சரியானதாகத் தோன்றும். ஆனால் ஒருமை-பன்மை விதிப்படி 'அல்ல' என்பது அஃறிணை ஒருமைக்கு சரி. இருப்பினும் கேள்வி 'தவறான' தொடரை கேட்கிறது. உயர்திணை பன்மைக்கு அல்லர், ஆண்பாலுக்கு அல்லன், பெண்பாலுக்கு அல்லள் - இவை சரியே. 'அது புத்தகம் அல்ல' - இதில் 'அல்ல' சரியான வடிவம்.",
    explanation_en: "This question tests singular/plural agreement: 'அல்லன்' for masculine singular, 'அல்லள்' for feminine singular, 'அல்லர்' for honorific plural, 'அல்ல' for neuter. Option A appears to be the answer per the PDF marking.",
  },
  {
    id: 16,
    tamil: "சரியான வினாச்சொல்லைத் தேர்ந்தெடு. நீர் ___________ தேங்கி இருக்கிறது?",
    english: "Choose the correct interrogative word. Where is the water stagnant?",
    options: [
      { label: "A", text: "இங்கே" },
      { label: "B", text: "எது" },
      { label: "C", text: "எங்கே" },
      { label: "D", text: "என்ன" },
    ],
    answer: "C",
    explanation: "இடத்தைக் கேட்கும் வினாச்சொல் 'எங்கே'. 'நீர் எங்கே தேங்கி இருக்கிறது?' என்பது இடம் கேட்கும் கேள்வி. 'இங்கே' - இடத்தை காட்டும் சுட்டுச்சொல். 'எது' - பொருளைக் கேட்கும் வினாச்சொல். 'என்ன' - தன்மையைக் கேட்கும் வினாச்சொல்.",
    explanation_en: "'எங்கே' is the interrogative word for place (where). The question asks about the location where water is stagnant.",
  },
  {
    id: 17,
    tamil: "கோடிட்ட இடத்தை நிரப்பி சரியான விடையை எழுதுக. விடை நேரடி விடையாக இருப்பதால் அது __________ விடை எனப்படும்.",
    english: "Fill in the blank: A direct answer is called __________ விடை.",
    options: [
      { label: "A", text: "இனமொழி விடை" },
      { label: "B", text: "குறிப்பு விடை" },
      { label: "C", text: "வெளிப்படை விடை" },
      { label: "D", text: "ஏவல் விடை" },
    ],
    answer: "C",
    explanation: "தமிழ் இலக்கணத்தில் விடைகளின் வகைகள்: வெளிப்படை விடை (நேரடி விடை), குறிப்பு விடை (மறைமுகமான விடை), இனமொழி விடை (ஒத்த சொல்லால் விடை), ஏவல் விடை (கட்டளையால் விடை). நேரடியாக கேட்டதற்கு நேரடியாக பதில் சொல்வது 'வெளிப்படை விடை'.",
    explanation_en: "In Tamil grammar, types of answers: வெளிப்படை விடை = direct answer, குறிப்பு விடை = indirect/implied, இனமொழி விடை = synonym answer. A direct answer is called வெளிப்படை விடை.",
  },
  {
    id: 18,
    tamil: "'ஔ' என்னும் எழுத்துக்கு இன எழுத்து __________.",
    english: "The cognate letter of 'ஔ' is __________.",
    options: [
      { label: "A", text: "உ" },
      { label: "B", text: "ஓ" },
      { label: "C", text: "ஐ" },
      { label: "D", text: "ஏ" },
    ],
    answer: "A",
    explanation: "தமிழ் உயிரெழுத்துக்களில் இன எழுத்துக்கள்: அ-ஆ, இ-ஈ, உ-ஊ, எ-ஏ, ஐ, ஒ-ஓ, ஔ. 'ஔ' என்பது 'உ' வொத்த குறில் எழுத்தின் இன நெடிலாக கருதப்படும். ஔ = அ + உ என்ற சேர்க்கையால் உருவானது. ஆனால் இன எழுத்தாக 'உ' கருதப்படுகிறது.",
    explanation_en: "'ஔ' is formed from the combination of 'அ+உ'. Its cognate short vowel is 'உ'. In Tamil phonology, ஔ corresponds to the vowel உ.",
  },
  {
    id: 19,
    tamil: "சரியான விடையைத் தேர்ந்தெடுத்து எழுதுக. கடலுக்கு வேறு பெயர் __________.",
    english: "Another name for the sea (கடல்) is __________.",
    options: [
      { label: "A", text: "பரவை" },
      { label: "B", text: "பறவை" },
      { label: "C", text: "பருவை" },
      { label: "D", text: "பறுவை" },
    ],
    answer: "A",
    explanation: "கடலுக்கு பல பெயர்கள் உண்டு: பரவை, வேலை, கடல், ஆழி, திரை, புணரி, நீர், உப்புநீர். 'பரவை' என்பது கடலின் மறுபெயர்களில் ஒன்று. 'பறவை' என்பது பறக்கும் பறவை, இரண்டும் ஒலியில் ஒத்திருந்தாலும் பொருளில் வேறுபட்டவை.",
    explanation_en: "'பரவை' is one of the many Tamil synonyms for sea (கடல்). Other synonyms include வேலை, ஆழி, திரை, புணரி. Don't confuse with பறவை (bird).",
  },
  {
    id: 20,
    tamil: "பின்வரும் சந்தக் கவிதையில் வந்தப் பிழைகளைத் திருத்துக. 'காலமலைத் தூறலிலே கழையாய்ப் பிறப்பெடுத்தோம்'",
    english: "Correct the errors in the metrical poem: 'காலமலைத் தூறலிலே கழையாய்ப் பிறப்பெடுத்தோம்'",
    options: [
      { label: "A", text: "மழை, தூறல், களை" },
      { label: "B", text: "மலை, தூறல், கலை" },
      { label: "C", text: "மழை, தூறழ், களை" },
      { label: "D", text: "மலை, தூரல், கலை" },
    ],
    answer: "A",
    explanation: "கவிதையில் உள்ள சொற்களை திருத்துக: 'காலமலை' → 'காலமழை' (மழை), 'தூறலிலே' → சரியே (தூறல்), 'கழையாய்' → 'களையாய்' (களை). எனவே திருத்தப்பட்ட சொற்கள்: மழை, தூறல், களை.",
    explanation_en: "The poem needs corrections: 'மலை' should be 'மழை' (rain), தூறல் is correct (drizzle), 'கழை' should be 'கழை' (reed/bamboo - actually 'களை' means weeds). Corrected words: மழை, தூறல், களை.",
  },
  {
    id: 21,
    tamil: "குறில் – நெடில் மாற்றம் பொருள் வேறுபாடு அறிக. விடு – வீடு",
    english: "Understand meaning difference through short-long vowel change: விடு – வீடு",
    options: [
      { label: "A", text: "சேருதல் – மலை" },
      { label: "B", text: "பிரிந்துபோதல் – குடியிருப்பு" },
      { label: "C", text: "சேருதல் – அருவி" },
      { label: "D", text: "பிரிந்துபோதல் – மாலை" },
    ],
    answer: "B",
    explanation: "விடு என்பது 'பிரிந்து போதல், விட்டு வை' என்று பொருள். வீடு என்பது 'குடியிருப்பு, இல்லம்' என்று பொருள். குறில் 'இ' நெடிலாகும்போது பொருள் மாறுகிறது. விடு (to leave/release) – வீடு (house/abode).",
    explanation_en: "விடு (short vowel 'இ') = to release/let go/leave. வீடு (long vowel 'ஈ') = house/home/abode. This shows how vowel length changes meaning completely.",
  },
  {
    id: 22,
    tamil: "விழித்து + எழும் – என்னும் சொல்லைச் சேர்த்தெழுதக் கிடைக்கும் சொல்",
    english: "What word is formed by combining விழித்து + எழும்?",
    options: [
      { label: "A", text: "விழி எழும்" },
      { label: "B", text: "விழிதெழும்" },
      { label: "C", text: "விழித்து எழும்" },
      { label: "D", text: "விழிதெழும்" },
    ],
    answer: "D",
    explanation: "விழித்து + எழும் என்பதை சேர்த்தெழுதும்போது: விழித்து + எழும் = விழித்தெழும். 'து' என்ற வல்லொற்று, 'எ' என்ற உயிரெழுத்துக்கு முன் 'த்' ஆகி சேர்கிறது. விழித்தெழும் என்பது 'விழித்து எழுகிறது' என்ற பொருள்.",
    explanation_en: "விழித்து + எழும் = விழித்தெழும் (waking up and rising). The 'து' combines with 'எ' through sandhi to form 'தெ'.",
  },
  {
    id: 23,
    tamil: "நீலம் + வான் சேர்த்தெழுதுக.",
    english: "Combine நீலம் + வான்.",
    options: [
      { label: "A", text: "நீலம்வான்" },
      { label: "B", text: "நீளம்வான்" },
      { label: "C", text: "நீலவான்" },
      { label: "D", text: "நீலவ்வான்" },
    ],
    answer: "C",
    explanation: "நீலம் + வான் = நீலவான். புணர்ச்சி விதிப்படி: 'நீலம்' என்ற சொல்லின் இறுதி மகரம் (ம்) மறைந்து, 'வ்' என்ற இணைப்பெழுத்து வந்து, நீல + வ் + வான் = நீலவான் ஆகிறது. நீலவான் என்பது 'நீல நிற வானம்' என்று பொருள்.",
    explanation_en: "நீலம் + வான்: The final 'ம்' is dropped and 'வ்' serves as a linking consonant. நீல + வான் = நீலவான் (blue sky).",
  },
  {
    id: 24,
    tamil: "இவை + எட்டும் சேர்த்தெழுதுக.",
    english: "Combine இவை + எட்டும்.",
    options: [
      { label: "A", text: "இடைஎட்டும்" },
      { label: "B", text: "இவையெட்டும்" },
      { label: "C", text: "இவ்வெட்டும்" },
      { label: "D", text: "இவ்எட்டும்" },
    ],
    answer: "B",
    explanation: "இவை + எட்டும் = இவையெட்டும். புணர்ச்சி விதிப்படி: இவை என்ற சொல் உயிரில் முடிகிறது (ஐ), எட்டும் என்ற சொல் உயிரில் தொடங்குகிறது (எ). யகர விகுதி வராமல் நேரடியாக சேரும்: இவை + எட்டும் = இவையெட்டும்.",
    explanation_en: "இவை + எட்டும் = இவையெட்டும் (all these eight). When a word ending in 'ஐ' combines with one starting with 'எ', they merge as இவையெட்டும்.",
  },
  {
    id: 25,
    tamil: "பிரித்தெழுதுக. 'வானமளந்தது' என்னும் சொல்லைப் பிரித்து எழுதக் கிடைப்பது",
    english: "Split the word 'வானமளந்தது'.",
    options: [
      { label: "A", text: "வானம் + அளந்தது" },
      { label: "B", text: "வானம் + மளந்தது" },
      { label: "C", text: "வான் + அளந்தது" },
      { label: "D", text: "வான் + மளந்தது" },
    ],
    answer: "A",
    explanation: "வானமளந்தது = வானம் + அளந்தது. வானம் என்ற சொல் 'ம்' ஐ இழந்து, அளந்தது என்ற சொல் 'அ' உயிரில் தொடங்குவதால் புணர்ச்சி ஏற்பட்டது. வானம் + அளந்தது = வானமளந்தது.",
    explanation_en: "வானமளந்தது splits as வானம் + அளந்தது (the sky measured/reached). The final 'ம்' of வானம் merges with initial 'அ' of அளந்தது.",
  },
  {
    id: 26,
    tamil: "பூவின் நிலைகளைக் குறிக்கும் சொற்கள்",
    english: "Words indicating the stages of a flower.",
    options: [
      { label: "A", text: "தாள், செம்மல், போது" },
      { label: "B", text: "அரும்பு, செம்மல், போது" },
      { label: "C", text: "தட்டு, போது, அரும்பு" },
      { label: "D", text: "கழி, அரும்பு, போது" },
    ],
    answer: "B",
    explanation: "பூவின் நிலைகள்: அரும்பு (மொட்டு - bud), போது (அரும்பும் நிலை - blooming), செம்மல் (மலர்ந்த நிலை - bloomed flower). இந்த மூன்று சொற்களும் பூவின் வளர்ச்சி நிலைகளை குறிக்கும் சொற்கள்.",
    explanation_en: "Stages of a flower: அரும்பு (bud), போது (half-bloomed), செம்மல் (fully bloomed). These three words represent the growth stages of flowers in Tamil.",
  },
  {
    id: 27,
    tamil: "அவன் நன்கு படித்தான் __________ தேர்வில் நல்ல மதிப்பெண் பெற்றான்.",
    english: "He studied well __________ scored good marks in the exam.",
    options: [
      { label: "A", text: "ஆகவே" },
      { label: "B", text: "ஏரெனில்" },
      { label: "C", text: "அதனால்" },
      { label: "D", text: "அதுபோல" },
    ],
    answer: "C",
    explanation: "'அதனால்' என்பது காரண-விளைவு இணைப்பைக் காட்டும் இடைச்சொல். 'படித்தான், அதனால் மதிப்பெண் பெற்றான்' என்பது காரண-விளைவு தொடர்பை சரியாக காட்டுகிறது. 'ஆகவே' - முடிவு காட்டும், 'ஏரெனில்' - காரணம் கேட்கும், 'அதுபோல' - ஒப்பிடும்.",
    explanation_en: "'அதனால்' (therefore/because of that) shows cause-and-effect relationship. He studied well, therefore he scored well marks - this is a causal connection.",
  },
  {
    id: 28,
    tamil: "பேச்சு வழக்குச் சொல்லுக்கு இணையான தமிழ்ச்சொல். உத்தியோகம்",
    english: "Find the formal Tamil equivalent of the colloquial word: உத்தியோகம்",
    options: [
      { label: "A", text: "வேலை" },
      { label: "B", text: "அதிகாரி" },
      { label: "C", text: "வல்லுநர்" },
      { label: "D", text: "பணி" },
    ],
    answer: "D",
    explanation: "உத்தியோகம் என்பது வட மொழிச் சொல் (உத்யோக). இதற்கு இணையான தூய தமிழ்ச்சொல் 'பணி'. வேலை என்பதும் பொதுவான சொல், ஆனால் 'உத்தியோகம்' என்ற வடசொல்லுக்கு நேரடி கலைச்சொல் 'பணி'.",
    explanation_en: "உத்தியோகம் is from Sanskrit 'உத்யோக' (occupation/job). The pure Tamil equivalent is 'பணி' (duty/service/job).",
  },
  {
    id: 29,
    tamil: "ஊர்ப்பெயரின் மருவை எழுதுக. உதகமண்டலம்",
    english: "Write the colloquial form of the place name: உதகமண்டலம்",
    options: [
      { label: "A", text: "ஊட்டி" },
      { label: "B", text: "உதகு" },
      { label: "C", text: "உதகை" },
      { label: "D", text: "உதகம்" },
    ],
    answer: "C",
    explanation: "உதகமண்டலம் என்பது ஊட்டியின் தமிழ் பெயர். இதன் மருவிய (சுருக்கப்பட்ட) வடிவம் 'உதகை'. உதகம் = நீர், மண்டலம் = பகுதி. ஊட்டி என்பது ஆங்கிலேயர்கள் சுருக்கிய வடிவம் (Udhagamandalam → Ooty).",
    explanation_en: "உதகமண்டலம் is the full Tamil name of Ooty (Udagamandalam). Its shortened colloquial form is 'உதகை'. உதகம் = water, மண்டலம் = region.",
  },
  {
    id: 30,
    tamil: "புகழாலும் பழியாலும் அறியப்படுவது",
    english: "What is known by both praise and blame?",
    options: [
      { label: "A", text: "அடக்கமுடைமை" },
      { label: "B", text: "நாணுடைமை" },
      { label: "C", text: "நடுவுநிலைமை" },
      { label: "D", text: "பொருளுடைமை" },
    ],
    answer: "C",
    explanation: "திருக்குறளில் 'நடுவுநிலைமை' அதிகாரத்தில் புகழாலும் பழியாலும் நடுவுநிலை அறியப்படும் என்று கூறப்படுகிறது. நடுவுநிலைமை (neutrality/impartiality) புகழ்ந்தாலும் பழித்தாலும் மாறாமல் இருப்பதால் அறியப்படுகிறது.",
    explanation_en: "நடுவுநிலைமை (impartiality/neutrality) is known through both praise and blame - one who remains impartial is recognized by both their admirers and critics. This is from Thirukkural's chapter on impartiality.",
  },
  {
    id: 31,
    tamil: "புள் என்பதன் வேறு பெயர்",
    english: "Another name for 'புள்' (bird).",
    options: [
      { label: "A", text: "மனிதன்" },
      { label: "B", text: "பூச்சிக்கொல்லி" },
      { label: "C", text: "விலங்கு" },
      { label: "D", text: "பறவை" },
    ],
    answer: "D",
    explanation: "'புள்' என்பது பறவைக்கு பழந்தமிழில் உள்ள சொல். புள் = பறவை. தொல்காப்பியம் மற்றும் சங்க இலக்கியங்களில் பறவைகள் 'புள்' என்று அழைக்கப்பட்டன. பறவை என்பதே புள்ளின் நவீன தமிழ் சொல்.",
    explanation_en: "'புள்' is the classical Tamil word for bird. In Sangam literature and Tolkappiyam, birds were called 'புள்'. Its modern equivalent is 'பறவை'.",
  },
  {
    id: 32,
    tamil: "எழுது வழக்கு. ஒத்தடம் – எழுது வழக்குச் சொல்லைத் தேர்க.",
    english: "Find the literary/written form of the spoken word 'ஒத்தடம்'.",
    options: [
      { label: "A", text: "ஒள்ளடம்" },
      { label: "B", text: "ஒல்லடம்" },
      { label: "C", text: "ஒற்றடம்" },
      { label: "D", text: "ஒற்று" },
    ],
    answer: "C",
    explanation: "ஒத்தடம் என்பது பேச்சு வழக்கு. இதன் எழுத்து வழக்கு 'ஒற்றடம்'. ஒற்று என்பது 'ஒரே ஒரு' என்ற பொருளில், அடம் என்பது 'ஒட்டுதல், ஒற்றுதல்'. சூடான ஒற்றடம் கொடுத்தல் என்பது வலியை போக்கும் முறை.",
    explanation_en: "ஒத்தடம் is a colloquial/spoken form. Its literary equivalent is 'ஒற்றடம்' (fomentation/hot compress), a traditional pain relief method.",
  },
  {
    id: 33,
    tamil: "இருபொருள் தரும் சரியான விடையைத் தெரிவு செய்க. திங்கள்",
    english: "Find the word that gives two meanings for 'திங்கள்'.",
    options: [
      { label: "A", text: "வாரம், சூரியன்" },
      { label: "B", text: "நாள், விண்மீன்" },
      { label: "C", text: "கிழமை, செவ்வாய்" },
      { label: "D", text: "மாதம், சந்திரன்" },
    ],
    answer: "D",
    explanation: "திங்கள் என்ற சொல்லுக்கு இரண்டு பொருள்கள் உண்டு: 1) மாதம் (month) - ஒரு மாதம் என்று பொருள், 2) சந்திரன் (moon) - நிலவு என்று பொருள். திங்கட்கிழமை = திங்கள் + கிழமை = Monday (moon's day).",
    explanation_en: "திங்கள் has two meanings: 1) மாதம் (month) and 2) சந்திரன் (moon/Monday). திங்கட்கிழமை = Monday (Day of the Moon).",
  },
  {
    id: 34,
    tamil: "ஒரு பொருள் பன்மொழி. சூரியன்",
    english: "Multiple words for one meaning - synonyms of சூரியன் (Sun).",
    options: [
      { label: "A", text: "குழவி, பிள்ளை" },
      { label: "B", text: "புவி, தரணி" },
      { label: "C", text: "பரிதி, வெய்யோன்" },
      { label: "D", text: "கூறு, விளம்பு" },
    ],
    answer: "C",
    explanation: "சூரியனின் தமிழ் பன்மொழி (synonyms): பரிதி, வெய்யோன், ஞாயிறு, கதிரவன், திங்கள் (சில பொருள்களில்), ஆதவன், செங்கோன், தினகரன். 'பரிதி' = சூரியன், 'வெய்யோன்' = வெம்மையுடையவன் (சூரியன்).",
    explanation_en: "Synonyms of சூரியன் (Sun): பரிதி (the hot one), வெய்யோன் (the fiery one), ஞாயிறு, கதிரவன், ஆதவன். Option C has two correct synonyms.",
  },
  {
    id: 35,
    tamil: "அகர வரிசைப்படி சொற்களைச் சீர் செய்க. காப்பு, செங்கீரை, தால், சப்பாணி, மூத்தம், வருகை",
    english: "Arrange in alphabetical (அகர) order: காப்பு, செங்கீரை, தால், சப்பாணி, மூத்தம், வருகை",
    options: [
      { label: "A", text: "வருகை, சப்பாணி, காப்பு, தால், மூத்தம், செங்கீரை" },
      { label: "B", text: "சப்பாணி, வருகை, காப்பு, தால், மூத்தம், செங்கீரை" },
      { label: "C", text: "காப்பு, சப்பாணி, செங்கீரை, தால், மூத்தம், வருகை" },
      { label: "D", text: "காப்பு, தால், சப்பாணி, செங்கீரை, மூத்தம், வருகை" },
    ],
    answer: "C",
    explanation: "அகர வரிசை (Tamil alphabetical order): க, ச, த, ந, ப, ம, ய, ர, ல, வ, ழ, ள, ற, ன. எனவே: காப்பு (க), சப்பாணி (ச), செங்கீரை (ச - சப்பாணிக்கு பிறகு), தால் (த), மூத்தம் (ம), வருகை (வ). சரியான வரிசை: காப்பு, சப்பாணி, செங்கீரை, தால், மூத்தம், வருகை.",
    explanation_en: "Tamil alphabetical order follows க, ச, த, ந, ப, ம, ய, ர, ல, வ... So: காப்பு(க), சப்பாணி(ச), செங்கீரை(ச), தால்(த), மூத்தம்(ம), வருகை(வ).",
  },
  {
    id: 36,
    tamil: "பொருந்தாச் சொல்லைக் கண்டறிக.",
    english: "Find the word that does not belong.",
    options: [
      { label: "A", text: "சென்றாள்" },
      { label: "B", text: "வந்த" },
      { label: "C", text: "சித்திரை" },
      { label: "D", text: "நடந்து" },
    ],
    answer: "C",
    explanation: "சென்றாள், வந்த, நடந்து - இவை மூன்றும் வினை (verb) வடிவங்கள். சித்திரை என்பது தமிழ் மாதத்தின் பெயர் (April-May), இது பெயர்ச்சொல் (noun). எனவே வினைச்சொற்களில் பொருந்தாத சொல் 'சித்திரை'.",
    explanation_en: "சென்றாள், வந்த, நடந்து are all verb forms. சித்திரை is a noun (Tamil month - April/May). So it doesn't belong with the verb group.",
  },
  {
    id: 37,
    tamil: "ஆனைக்கொம்பன், குண்டு, குதிரை வாலி, சிறுமணி ஆகிய சொற்கள் எதனைக் குறிக்கும்?",
    english: "What do the words ஆனைக்கொம்பன், குண்டு, குதிரை வாலி, சிறுமணி refer to?",
    options: [
      { label: "A", text: "சம்பா நெல் வகை" },
      { label: "B", text: "சம்பா கோதுமை வகை" },
      { label: "C", text: "தினண அரிசி வகை" },
      { label: "D", text: "சிறு சாமை வகை" },
    ],
    answer: "A",
    explanation: "ஆனைக்கொம்பன், குண்டு, குதிரை வாலி, சிறுமணி - இவை தமிழ்நாட்டில் விளைவிக்கப்படும் சம்பா நெல் வகைகளின் பெயர்கள். சம்பா என்பது சாதாரண வகை நெல். இந்த பெயர்கள் நெல் கதிரின் தோற்றத்தை வைத்து பெயரிடப்பட்டவை.",
    explanation_en: "These are traditional names of different varieties of Samba rice (சம்பா நெல்): ஆனைக்கொம்பன் (elephant tusk-shaped), குண்டு (round/fat), குதிரை வாலி (horse tail-shaped), சிறுமணி (small grain).",
  },
  {
    id: 38,
    tamil: "பசுமையான __________ ஐக் __________ கண்ணுக்கு நல்லது.",
    english: "Green __________ is good for the __________ eyes.",
    options: [
      { label: "A", text: "காணுதல் / காட்சி" },
      { label: "B", text: "புதையல் / புதைத்தல்" },
      { label: "C", text: "தொடுத்தல் / தொடுதல்" },
      { label: "D", text: "சுட்டல் / சுடுதல்" },
    ],
    answer: "A",
    explanation: "பசுமையான காட்சியை காணுதல் கண்ணுக்கு நல்லது. 'காணுதல்' என்பது பார்க்கும் செயல், 'காட்சி' என்பது பார்க்கப்படும் பொருள். பசுமையான காட்சியை (காணுதல்) கண்ணுக்கு நல்லது - இது சரியான தொடர்.",
    explanation_en: "Seeing (காணுதல்) green scenery (காட்சி) is good for the eyes. 'காணுதல்' = the act of seeing, 'காட்சி' = the sight/scene.",
  },
  {
    id: 39,
    tamil: "ஒரெழுத்து ஒரு மொழியின் பொருளைக் கண்டறிக. வெள",
    english: "Find the meaning of the one-letter word 'வெள'.",
    options: [
      { label: "A", text: "மேகம்" },
      { label: "B", text: "வான்" },
      { label: "C", text: "அகலம்" },
      { label: "D", text: "கவர்" },
    ],
    answer: "D",
    explanation: "தமிழில் ஒரெழுத்து ஒரு மொழி என்பது ஒரே எழுத்தில் உள்ள சொல். 'வெள' என்பதற்கு 'கவர்' என்று பொருள். ஒரெழுத்து ஒரு மொழிகளின் உதாரணங்கள்: தீ = fire, நீ = you, வா = come, வெள = attract/charm.",
    explanation_en: "'வெள' is a one-letter word (ஒரெழுத்து ஒரு மொழி) meaning 'கவர்' (to attract/fascinate). Tamil has many such single-letter words with distinct meanings.",
  },
  {
    id: 40,
    tamil: "'இளமை' என்னும் சொல்லின் எதிர்ச்சொல்",
    english: "Antonym of இளமை (youth/young age).",
    options: [
      { label: "A", text: "வளமை" },
      { label: "B", text: "முதுமை" },
      { label: "C", text: "தனிமை" },
      { label: "D", text: "எளிமை" },
    ],
    answer: "B",
    explanation: "இளமை என்பது 'young age, youth'. இதன் எதிர்ச்சொல் முதுமை (old age). இளமை – முதுமை என்பது எதிர்ச்சொல் ஜோடி. வளமை = abundance, தனிமை = solitude, எளிமை = simplicity - இவை எதிர்ச்சொற்கள் அல்ல.",
    explanation_en: "இளமை (youth/young age) ↔ முதுமை (old age) are antonyms. These represent the two extremes of human life stages.",
  },
  {
    id: 41,
    tamil: "என்னே, இதன் பெருமை! இதில் எவ்வகை உணர்ச்சிக்குரிய வியப்புக்குறி இடம்பெற்றுள்ளது?",
    english: "In 'என்னே, இதன் பெருமை!' - what emotion does the exclamation mark indicate?",
    options: [
      { label: "A", text: "அவலம்" },
      { label: "B", text: "வியப்பு" },
      { label: "C", text: "வரவேற்றல்" },
      { label: "D", text: "வாழ்த்து" },
    ],
    answer: "B",
    explanation: "'என்னே, இதன் பெருமை!' என்பது வியப்பு உணர்வை வெளிப்படுத்துகிறது. 'என்னே' என்னும் வியப்பு இடைச்சொல்லும், வியப்புக்குறியும் (!) வியப்பு உணர்ச்சியை காட்டுகின்றன. 'எவ்வளவு பெரிய விஷயம் இது!' என்ற ஆச்சரியம் வெளிப்படுகிறது.",
    explanation_en: "'என்னே, இதன் பெருமை!' expresses wonder/amazement (வியப்பு). 'என்னே' is an exclamatory word expressing surprise at the greatness being described.",
  },
  {
    id: 42,
    tamil: "பொருந்தகா இணையைத் தேர்ந்தெடு.",
    english: "Choose the incorrect matching pair.",
    options: [
      { label: "A", text: "முற்றுப்புள்ளி = பொருள்களை எண்ணும் நிலை" },
      { label: "B", text: "முக்காற்புள்ளி = சிறுதலைப்பு" },
      { label: "C", text: "காற்புள்ளி = ஆகவே முதலிய சொற்களின்பின்" },
      { label: "D", text: "அரைப்புள்ளி = ஒரே எழுவாயில் பல தொடர்கள் தொடர்ந்து வரும் இடங்கள்" },
    ],
    answer: "A",
    explanation: "முற்றுப்புள்ளி (.) என்பது வாக்கியம் முடியும் இடத்தில் வரும். 'பொருள்களை எண்ணும் நிலை' என்பது கோட்டுப்புள்ளி (:) க்கான பயன்பாடு. எனவே முற்றுப்புள்ளி = பொருள்களை எண்ணும் நிலை என்பது தவறான இணை.",
    explanation_en: "முற்றுப்புள்ளி (full stop) is used at sentence endings, not for listing items. Listing items uses கோட்டுப்புள்ளி (:). So Option A is the incorrect pair.",
  },
  {
    id: 43,
    tamil: "வாக்கிய அமைப்பினைக் கண்டறிக. திருக்குறள் கயல்விழியால் படிக்கப்பட்டது.",
    english: "Identify the sentence construction type of: திருக்குறள் கயல்விழியால் படிக்கப்பட்டது.",
    options: [
      { label: "A", text: "செய்யப்பாட்டு வினை" },
      { label: "B", text: "செய்வினை" },
      { label: "C", text: "தன்வினை" },
      { label: "D", text: "பிறவினை" },
    ],
    answer: "A",
    explanation: "இந்த வாக்கியத்தில் 'படிக்கப்பட்டது' என்பது செய்யப்பாட்டு வினை (passive voice). செய்யப்பாட்டு வினையில் செயல்பட்ட பொருள் (திருக்குறள்) எழுவாயாக வரும், செய்தவர் (கயல்விழி) ஆல் என்ற உருபினோடு வரும்.",
    explanation_en: "This is passive voice (செய்யப்பாட்டு வினை). 'படிக்கப்பட்டது' is the passive form. The object (திருக்குறள்) becomes the subject, and the doer (கயல்விழி) takes the 'ஆல்' (by) suffix.",
  },
  {
    id: 44,
    tamil: "சரியான தொகைமரபைத் தேர்ந்தெடு.",
    english: "Choose the correct compound word formation (தொகை மரபு).",
    options: [
      { label: "A", text: "மக்கள்கொத்து" },
      { label: "B", text: "ஆட்டுநிரை" },
      { label: "C", text: "ஆமந்தை" },
      { label: "D", text: "கற்குவியல்" },
    ],
    answer: "D",
    explanation: "கற்குவியல் = கல் (stone) + குவியல் (heap/pile) = heap of stones. இது சரியான தொகைமரபு வடிவம். கற்குவியல் என்பது கல்லின் குவியலை குறிக்கும் சரியான தொகை (compound formation).",
    explanation_en: "கற்குவியல் = கல் + குவியல் (heap of stones). This is the correct compound word formation (தொகை மரபு). The others have grammatical errors in their compound formation.",
  },
  {
    id: 45,
    tamil: "பொருந்தாத இணையைத் தேர்ந்தெடு.",
    english: "Choose the incorrect pair.",
    options: [
      { label: "A", text: "பூ = கொய்" },
      { label: "B", text: "இலை = பறி" },
      { label: "C", text: "கூடை = முடை" },
      { label: "D", text: "பானை = செய்" },
    ],
    answer: "D",
    explanation: "பூ = கொய் (pluck flowers - correct), இலை = பறி (pluck leaves - correct), கூடை = முடை (weave basket - correct). பானை = வனை (make/shape pot on wheel). 'செய்' என்பது பொதுவான சொல். பானைக்கு உரிய வினை 'வனை' (to shape/mould clay). எனவே பானை = செய் என்பது பொருந்தாத இணை.",
    explanation_en: "பூ = கொய் (pluck flowers ✓), இலை = பறி (pluck leaves ✓), கூடை = முடை (weave basket ✓). But பானை (pot) is made by வனை (to mould/shape on wheel), not just செய் (to make). So D is incorrect.",
  },
  {
    id: 46,
    tamil: "மரபுப் பிழையற்ற தொடரைத் தேர்வு செய்க.",
    english: "Choose the sentence free from conventional usage errors (மரபுப் பிழை).",
    options: [
      { label: "A", text: "புரா கத்தும்" },
      { label: "B", text: "புரா குழறும்" },
      { label: "C", text: "புரா குனுகும்" },
      { label: "D", text: "புரா கூவும்" },
    ],
    answer: "C",
    explanation: "மரபுப்படி விலங்குகளின் ஒலிகளுக்கு குறிப்பிட்ட சொற்கள் உண்டு. புரா (pigeon/dove) குனுகும் என்பது சரியான மரபு வழக்கு. குனுகுதல் = புறாவின் ஒலி (cooing sound). கத்துதல் = dog/cat sounds, கூவுதல் = cock crows.",
    explanation_en: "Traditional usage: புரா (pigeon/dove) குனுகும் (coos). குனுகுதல் specifically refers to the cooing sound of pigeons/doves. Each animal has its specific sound verb in Tamil.",
  },
  {
    id: 47,
    tamil: "'கத்திரி'யின் இளநிலை எவ்வாறு அழைக்கப்படுகிறது?",
    english: "What is the young one of 'கத்திரி' (a type of animal) called?",
    options: [
      { label: "A", text: "கன்று" },
      { label: "B", text: "நாற்று" },
      { label: "C", text: "குருக்கு" },
      { label: "D", text: "பிள்ளை" },
    ],
    answer: "B",
    explanation: "கத்திரி (brinjal/eggplant plant - கத்திரிச்செடி) யின் இளநிலை 'நாற்று' என்று அழைக்கப்படுகிறது. நாற்று என்பது நடவுக்கு தயாரான சிறிய செடி. கன்று = calf (cow's young), குருக்கு = young bird.",
    explanation_en: "கத்திரி (brinjal/eggplant plant)'s young stage is called 'நாற்று' (seedling). நாற்று refers to seedlings ready for transplanting. This is plant terminology in Tamil.",
  },
  {
    id: 48,
    tamil: "சரியான தொடரைத் தேர்ந்தெடு.",
    english: "Choose the correct sentence.",
    options: [
      { label: "A", text: "நேற்று மழை பெய்யும்" },
      { label: "B", text: "நேற்று மழைபெய்தது" },
      { label: "C", text: "நேற்று வருவேன்" },
      { label: "D", text: "நேற்று மழை பெய்கிறது" },
    ],
    answer: "B",
    explanation: "'நேற்று' என்பது இறந்தகாலத்தை குறிக்கும் காலக்கட்ட சொல். எனவே 'நேற்று' உள்ள வாக்கியத்தில் இறந்தகால வினைமுற்று வர வேண்டும். 'மழைபெய்தது' என்பது இறந்தகால வினைமுற்று. 'பெய்யும்' - எதிர்காலம், 'பெய்கிறது' - நிகழ்காலம் - இவை தவறு.",
    explanation_en: "'நேற்று' (yesterday) requires past tense. 'மழைபெய்தது' (it rained) is past tense - correct. 'பெய்யும்' (will rain) and 'பெய்கிறது' (is raining) are wrong tenses for 'yesterday'.",
  },
  {
    id: 49,
    tamil: "ஒன்றன்பாலைக் குறிக்கும் சொல்லைக் கண்டறிக.",
    english: "Find the neuter singular (ஒன்றன்பால்) form.",
    options: [
      { label: "A", text: "வந்தன" },
      { label: "B", text: "வந்தார்கள்" },
      { label: "C", text: "வந்தது" },
      { label: "D", text: "வந்தாள்" },
    ],
    answer: "C",
    explanation: "ஒன்றன்பால் என்பது அஃறிணை ஒருமை (neuter singular). 'வந்தது' என்பது ஒன்றன்பால் வினைமுற்று. வந்தன = பலவின்பால் (neuter plural), வந்தார்கள் = உயர்திணை பன்மை (honorific plural), வந்தாள் = பெண்பால் (feminine singular).",
    explanation_en: "ஒன்றன்பால் is neuter singular. 'வந்தது' (it came) is neuter singular. வந்தன = neuter plural, வந்தார்கள் = honorific plural, வந்தாள் = feminine singular.",
  },
  {
    id: 50,
    tamil: "அஃறிணை அல்லாத சொல்லைக் கண்டறிக.",
    english: "Find the word that is NOT of அஃறிணை (non-human/lower class) category.",
    options: [
      { label: "A", text: "காடு" },
      { label: "B", text: "காற்று" },
      { label: "C", text: "தளபதி" },
      { label: "D", text: "ஆந்தைகள்" },
    ],
    answer: "C",
    explanation: "தமிழில் திணை இரண்டு வகை: உயர்திணை (humans + gods) மற்றும் அஃறிணை (animals, plants, objects). தளபதி என்பது மனிதனைக் குறிக்கும் சொல் - உயர்திணை. காடு, காற்று, ஆந்தைகள் - இவை அஃறிணை.",
    explanation_en: "Tamil has two genders: உயர்திணை (human/divine) and அஃறிணை (non-human). தளபதி (army commander) is a human title - உயர்திணை. காடு (forest), காற்று (wind), ஆந்தைகள் (owls) are all அஃறிணை.",
  },
  {
    id: 51,
    tamil: "ஒருமை – பன்மை பிழை. உயர்ந்தோர் ——————— புகழ்ந்து கொள்ள மாட்டார்கள்.",
    english: "Singular-plural error. Choose the correct word: உயர்ந்தோர் ——— புகழ்ந்து கொள்ள மாட்டார்கள்.",
    options: [
      { label: "A", text: "தம்மைத் தாமே" },
      { label: "B", text: "தன்னைத் தாமே" },
      { label: "C", text: "நின்னைத் தானே" },
      { label: "D", text: "எம்மைத் தானே" },
    ],
    answer: "A",
    explanation: "'உயர்ந்தோர்' என்பது பன்மை (plural). எனவே 'தம்மைத் தாமே' என்பது பன்மைக்கு ஏற்ற வடிவம். 'தன்னை' என்பது ஒருமை. 'உயர்ந்தோர் தம்மைத் தாமே புகழ்ந்து கொள்ள மாட்டார்கள்' - சரியான தொடர்.",
    explanation_en: "'உயர்ந்தோர்' is plural (noble persons). 'தம்மைத் தாமே' is the reflexive plural form (themselves). 'தன்னை' would be singular, which doesn't agree with the plural subject.",
  },
  {
    id: 52,
    tamil: "வாக்கிய அமைப்பினைக் கண்டறிக. கயல்விழி திருக்குறளைப் படித்தாள்.",
    english: "Identify the sentence structure of: கயல்விழி திருக்குறளைப் படித்தாள்.",
    options: [
      { label: "A", text: "எதிர் வினைத் தொடர்" },
      { label: "B", text: "பிறவினைத் தொடர்" },
      { label: "C", text: "செய்வினைத் தொடர்" },
      { label: "D", text: "செய்யப்பாட்டு வினைத் தொடர்" },
    ],
    answer: "C",
    explanation: "கயல்விழி (subject) திருக்குறளை (object) படித்தாள் (verb) - இது செய்வினைத் தொடர் (active voice sentence). செய்வினையில் செய்யும் ஆள் (கயல்விழி) எழுவாயாக வருகிறது, செய்யப்படும் பொருள் (திருக்குறள்) செயப்படுபொருளாக வருகிறது.",
    explanation_en: "கயல்விழி (subject) + திருக்குறளை (object) + படித்தாள் (verb) = Active voice sentence (செய்வினைத் தொடர்). The subject performs the action.",
  },
  {
    id: 53,
    tamil: "எவ்வகை வாக்கியம்? புத்தகம் காணாமல் போயிற்று.",
    english: "What type of sentence is: புத்தகம் காணாமல் போயிற்று?",
    options: [
      { label: "A", text: "செய்வினை வாக்கியம்" },
      { label: "B", text: "பிற வினை வாக்கியம்" },
      { label: "C", text: "வினை முற்று" },
      { label: "D", text: "செய்யப்பாட்டு வினை வாக்கியம்" },
    ],
    answer: "D",
    explanation: "'புத்தகம் காணாமல் போயிற்று' என்பது செய்யப்பாட்டு வினை வாக்கியம் (passive voice). புத்தகம் (non-human object) எழுவாயாக வந்து, செய்யப்படும் செயல் (காணாமல் போதல்) வினையாக வருகிறது. இது செய்யப்பாட்டு வினை அமைப்பு.",
    explanation_en: "'புத்தகம் காணாமல் போயிற்று' (The book disappeared/was lost) is passive voice. The book (object) is the subject, and the action is expressed in passive form.",
  },
  {
    id: 54,
    tamil: "சொற்களை ஒழுங்குபடுத்தி சொற்றொடராக்குதல். சரியான சொற்றொடரைத் தெரிவு செய்க.",
    english: "Arrange words into a correct sentence.",
    options: [
      { label: "A", text: "வாய்மை சொற்களைச் சொல்லுதல் மற்றவர்க்குத் தராத தீங்கு எனப்படுவது" },
      { label: "B", text: "தீங்கு சொற்களைச் சொல்லுதல் எனப்படுவது மற்றவர்க்கு வாய்மை" },
      { label: "C", text: "வாய்மை எனப்படுவது மற்றவர்க்குத் தீங்கு தராத சொற்களைச் சொல்லுதல்" },
      { label: "D", text: "சொற்களைச் சொல்லுதல் எனப்படுவது மற்றவர்க்குத் தீங்கு தராத வாய்மை" },
    ],
    answer: "C",
    explanation: "திருக்குறள் 291: 'வாய்மை எனப்படுவது யாதெனின் யாதொன்றும் தீமை இலாத சொலல்'. வாய்மை எனப்படுவது மற்றவர்க்குத் தீங்கு தராத சொற்களைச் சொல்லுதல் - இதுவே சரியான வரிசை.",
    explanation_en: "From Thirukkural: 'வாய்மை எனப்படுவது' (what is called truth) 'மற்றவர்க்குத் தீங்கு தராத சொற்களைச் சொல்லுதல்' (speaking words that cause no harm to others). Option C is the correct sentence arrangement.",
  },
  {
    id: 55,
    tamil: "கீழ்க்காணும் தொடர்களில் ஒரு பொருளைத் தரும் இணை நேரிணை சுட்டும் சரியான தொடர்",
    english: "Find the sentence where two words point to the same object/person.",
    options: [
      { label: "A", text: "குழந்தையை தாய் வளர்த்தாள் சீராட்டி பாராட்டி" },
      { label: "B", text: "தாய் பாராட்டி சீராட்டி குழந்தையை வளர்த்தாள்" },
      { label: "C", text: "தாய் குழந்தையைப் பாராட்டிச் சீராட்டி வளர்த்தாள்" },
      { label: "D", text: "பாராட்டி சீராட்டி வளர்த்தாள் தாய் குழந்தையை" },
    ],
    answer: "C",
    explanation: "சரியான தமிழ் வாக்கிய அமைப்பில் எழுவாய் முன்னும், வினை பின்னும், செயப்படுபொருள் நடுவிலும் வரும். 'தாய் குழந்தையைப் பாராட்டிச் சீராட்டி வளர்த்தாள்' - இது சரியான வாக்கிய வரிசை.",
    explanation_en: "Option C: 'தாய் குழந்தையைப் பாராட்டிச் சீராட்டி வளர்த்தாள்' has the correct Tamil sentence order: Subject (தாய்) + Object (குழந்தையை) + Verb participles + Main verb (வளர்த்தாள்).",
  },
  {
    id: 56,
    tamil: "கலைச் சொல் அறிக. Weather",
    english: "Find the Tamil technical term for 'Weather'.",
    options: [
      { label: "A", text: "வானிலை" },
      { label: "B", text: "காலநிலை" },
      { label: "C", text: "பருவநிலை" },
      { label: "D", text: "மழைப்பொழிவு" },
    ],
    answer: "A",
    explanation: "'Weather' என்பதன் தமிழ் கலைச்சொல் 'வானிலை'. வான் = sky, நிலை = condition/state. Weather forecast = வானிலை அறிக்கை. Climate = காலநிலை (long-term weather patterns). Season = பருவம்/பருவகாலம்.",
    explanation_en: "'Weather' = வானிலை (sky condition). Weather forecast = வானிலை அறிக்கை. Note: Climate = காலநிலை (long-term), Season = பருவம், Rain = மழை.",
  },
  {
    id: 57,
    tamil: "Internet என்பதன் தமிழ்ச்சொல்.",
    english: "Tamil word for 'Internet'.",
    options: [
      { label: "A", text: "இணையம்" },
      { label: "B", text: "புலனம்" },
      { label: "C", text: "மென்பொருள்" },
      { label: "D", text: "இசுகை" },
    ],
    answer: "A",
    explanation: "'Internet' என்பதன் தமிழ்ச்சொல் 'இணையம்'. இணை = link/connect, இணையம் = the interconnected network. மென்பொருள் = Software, வன்பொருள் = Hardware, தரவு = Data.",
    explanation_en: "'Internet' = இணையம் (the interconnected/linked network). இணை = link/pair. Other tech terms: மென்பொருள் (software), வன்பொருள் (hardware), தரவு (data).",
  },
  {
    id: 58,
    tamil: "Art Critic என்பதன் கலைச் சொல்லைத் தேர்க.",
    english: "Find the Tamil term for 'Art Critic'.",
    options: [
      { label: "A", text: "கலை விமர்சகர்" },
      { label: "B", text: "கலை வித்தகர்" },
      { label: "C", text: "கலை ஆர்வலர்" },
      { label: "D", text: "கலை நிபுணர்" },
    ],
    answer: "A",
    explanation: "'Art Critic' = கலை விமர்சகர். விமர்சனம் = criticism/review, விமர்சகர் = critic/reviewer. கலை வித்தகர் = art expert/master, கலை ஆர்வலர் = art enthusiast, கலை நிபுணர் = art expert/specialist.",
    explanation_en: "Art Critic = கலை விமர்சகர் (கலை = art, விமர்சகர் = critic/reviewer). Film critic = திரைப்படவிமர்சகர். Literary critic = இலக்கிய விமர்சகர்.",
  },
  {
    id: 59,
    tamil: "கலைச் சொல்லுக்கு நேரான தமிழ்ச் சொல்லைத் தெரிவு செய்க. Space Technology",
    english: "Find the Tamil equivalent of 'Space Technology'.",
    options: [
      { label: "A", text: "மீனுண் தொழில்நுட்பம்" },
      { label: "B", text: "உயிரித் தொழில்நுட்பம்" },
      { label: "C", text: "விண்வெளித் தொழில்நுட்பம்" },
      { label: "D", text: "மண்வெளித் தொழில்நுட்பம்" },
    ],
    answer: "C",
    explanation: "'Space Technology' = விண்வெளித் தொழில்நுட்பம். விண்வெளி = outer space, தொழில்நுட்பம் = technology. Biotechnology = உயிரித் தொழில்நுட்பம், Marine technology = கடல்சார் தொழில்நுட்பம்.",
    explanation_en: "Space Technology = விண்வெளித் தொழில்நுட்பம் (விண்வெளி = outer space + தொழில்நுட்பம் = technology). ISRO is called இஸ்ரோ or விண்வெளி ஆராய்ச்சி நிறுவனம்.",
  },
  {
    id: 60,
    tamil: "கலைச் சொல் அறிக. Space",
    english: "Find the Tamil term for 'Space'.",
    options: [
      { label: "A", text: "திறந்தவெளி" },
      { label: "B", text: "சமவெளி" },
      { label: "C", text: "பொதுவெளி" },
      { label: "D", text: "வான்வெளி" },
    ],
    answer: "D",
    explanation: "'Space' (outer space) = வான்வெளி. வான் = sky/heavens, வெளி = space/expanse. திறந்தவெளி = open space/ground, சமவெளி = plain/plateau, பொதுவெளி = public space.",
    explanation_en: "'Space' (cosmic/outer space) = வான்வெளி (sky space). Other 'வெளி' compounds: திறந்தவெளி (open space), சமவெளி (plain), பொதுவெளி (public sphere).",
  },
  {
    id: 61,
    tamil: "கலைச்சொல் அறிந்து எழுதுக. Round Table Conference",
    english: "Find the Tamil term for 'Round Table Conference'.",
    options: [
      { label: "A", text: "நம்பிக்கை" },
      { label: "B", text: "இரட்டை வாக்குரிமை" },
      { label: "C", text: "அரசியலமைப்பு" },
      { label: "D", text: "வட்ட மேசை மாநாடு" },
    ],
    answer: "D",
    explanation: "'Round Table Conference' = வட்ட மேசை மாநாடு. வட்டம் = circle/round, மேசை = table, மாநாடு = conference. இந்திய சுதந்திரப் போராட்ட வரலாற்றில் வட்ட மேசை மாநாடுகள் 1930-32 ஆண்டுகளில் லண்டனில் நடந்தன.",
    explanation_en: "Round Table Conference = வட்ட மேசை மாநாடு. In Indian history, these were held in London (1930-32) regarding India's constitutional future.",
  },
  {
    id: 62,
    tamil: "பின்வருவனவற்றுள் எது Allocation என்ற ஆங்கிலச் சொல்லுக்குத் தமிழ்க் கலைச்சொல் அல்ல.",
    english: "Which is NOT the Tamil equivalent of 'Allocation'?",
    options: [
      { label: "A", text: "பங்கீடு" },
      { label: "B", text: "ஒதுக்கீடு" },
      { label: "C", text: "ஒதுக்கப்பற்று" },
      { label: "D", text: "மதிப்பீடு" },
    ],
    answer: "B",
    explanation: "Allocation என்பதன் தமிழ்ச் சொற்கள்: பங்கீடு (distribution/allotment), ஒதுக்கப்பற்று (reserved amount). மதிப்பீடு என்பது 'Estimation/Valuation'. ஒதுக்கீடு என்பது 'Reservation' (as in reservation/quota policy). எனவே ஒதுக்கீடு = Reservation, Allocation அல்ல.",
    explanation_en: "Allocation = பங்கீடு or ஒதுக்கப்பற்று. ஒதுக்கீடு = Reservation (quota system). மதிப்பீடு = Estimation/Valuation. So 'ஒதுக்கீடு' is NOT the Tamil for Allocation.",
  },
  {
    id: 63,
    tamil: "கலைச் சொல் தேர்க. Transplantation",
    english: "Find the Tamil term for 'Transplantation'.",
    options: [
      { label: "A", text: "மெய்யுணர்வு" },
      { label: "B", text: "கருணை" },
      { label: "C", text: "உறுப்பு மாற்று அறுவை சிகிச்சை" },
      { label: "D", text: "மனநல சிகிச்சை" },
    ],
    answer: "C",
    explanation: "'Transplantation' (organ transplantation) = உறுப்பு மாற்று அறுவை சிகிச்சை. உறுப்பு = organ, மாற்று = replace/transplant, அறுவை சிகிச்சை = surgery. Brain transplant = மூளை மாற்று, Heart transplant = இதய மாற்று.",
    explanation_en: "Transplantation = உறுப்பு மாற்று அறுவை சிகிச்சை (organ replacement surgery). உறுப்பு = organ, மாற்று = replace, அறுவை சிகிச்சை = surgery.",
  },
  {
    id: 64,
    tamil: "கலைச் சொல்லுக்கு நேரான தமிழ்ச் சொல்லைத் தேர்வு செய்க. Prosody",
    english: "Find the Tamil equivalent of 'Prosody'.",
    options: [
      { label: "A", text: "சொல்லிலக்கணம்" },
      { label: "B", text: "எழுத்திலக்கணம்" },
      { label: "C", text: "யாப்பிலக்கணம்" },
      { label: "D", text: "அணியிலக்கணம்" },
    ],
    answer: "C",
    explanation: "'Prosody' = யாப்பிலக்கணம். யாப்பு என்பது கவிதை இயற்றும் விதிகளை கற்பிக்கும் இலக்கண பிரிவு. இது மாத்திரை, அடி, தளை, ஒழுகல் போன்ற விதிகளை உள்ளடக்கியது. தமிழ் யாப்பிலக்கணம் = Agattiyam, Tolkappiyam.",
    explanation_en: "Prosody = யாப்பிலக்கணம் (science of Tamil meter and verse). யாப்பு covers rules of Tamil poetry: மாத்திரை (measure), அடி (line), தளை (meter), ஒழுகல் (flow).",
  },
  {
    id: 65,
    tamil: "கலைச்சொல்லுக்கு நேரான தமிழ்ச்சொல்லைத் தெரிவு செய்க. Agronomy",
    english: "Find the Tamil equivalent of 'Agronomy'.",
    options: [
      { label: "A", text: "சூழலியல்" },
      { label: "B", text: "வனவியல்" },
      { label: "C", text: "உளவியல்" },
      { label: "D", text: "உழவியல்" },
    ],
    answer: "D",
    explanation: "'Agronomy' = உழவியல். உழவு = farming/ploughing, உழவியல் = science of farming (agronomy). சூழலியல் = Ecology, வனவியல் = Forestry, உளவியல் = Psychology.",
    explanation_en: "Agronomy = உழவியல் (science of farming). உழவு = farming/ploughing. Other '-இயல்' words: சூழலியல் (ecology), வனவியல் (forestry), உளவியல் (psychology).",
  },
  {
    id: 66,
    tamil: "திருக்குறளில் கூறியுள்ள அறநெறிக் கருத்துகளை அனைவருக்கும் எடுத்துரைத்து விழிப்புணர்வூட்டும் வகையில் செயலாற்றிவரும் நேரியாளர் ஒருவருக்கு 1986 ஆம் ஆண்டு முதல் அய்யன் திருவள்ளுவர் விருது யாரால் வழங்கப்படுகிறது?",
    english: "Who awards the Aiyyan Thiruvalluvar Award since 1986 to those spreading Thirukkural's ethical teachings?",
    options: [
      { label: "A", text: "இந்திய ஒன்றிய அரசு" },
      { label: "B", text: "தமிழ்நாடு அரசு" },
      { label: "C", text: "சாகித்திய அகாதெமி" },
      { label: "D", text: "நோபல் பரிசு அமைப்பு" },
    ],
    answer: "B",
    explanation: "1986 ஆம் ஆண்டு முதல் தமிழ்நாடு அரசு 'அய்யன் திருவள்ளுவர் விருது' வழங்கி வருகிறது. திருக்குறளின் அறநெறிகளை பரப்புவோருக்கு இந்த விருது வழங்கப்படுகிறது. இது தமிழ்நாட்டின் உயரிய இலக்கிய விருதுகளில் ஒன்று.",
    explanation_en: "Tamil Nadu Government has been awarding the 'Aiyyan Thiruvalluvar Award' since 1986 to those who spread the ethical teachings of Thirukkural among people worldwide.",
  },
  {
    id: 67,
    tamil: "பழமொழியின் பொருளைத் தேர்வு செய்க. உப்பிலலாப் ————————",
    english: "Meaning of the proverb: உப்பிலலாப் ————————",
    options: [
      { label: "A", text: "பண்டம் குப்பையிலே" },
      { label: "B", text: "பாண்டம் தெருவிலே" },
      { label: "C", text: "குப்பையிலே பண்டம்" },
      { label: "D", text: "கடையிலே பண்டம்" },
    ],
    answer: "A",
    explanation: "பழமொழி: 'உப்பிலலாப் பண்டம் குப்பையிலே'. பொருள்: உப்பு இல்லாத உணவு சுவையற்றது, குப்பையில் போட வேண்டியதே. அதாவது, அடிப்படையான விஷயம் இல்லாமல் எந்தப் பொருளும் மதிப்பற்றது.",
    explanation_en: "Proverb: 'உப்பிலலாப் பண்டம் குப்பையிலே' (Food without salt belongs in the trash). Meaning: Anything lacking its essential quality is worthless.",
  },
  {
    id: 68,
    tamil: "பழமொழியின் பொருளைத் தேர்வு செய்க. ஒரு பானை ————————",
    english: "Meaning of the proverb: ஒரு பானை ————————",
    options: [
      { label: "A", text: "சோற்றுக்கு ஒரு சோறு பதம்" },
      { label: "B", text: "சோற்றுக்கு இரு சோறு பதம்" },
      { label: "C", text: "சோற்றுக்கு மூன்று சோறு பதம்" },
      { label: "D", text: "ஒரு சோருக்கு இரண்டு சோறு பதம்" },
    ],
    answer: "A",
    explanation: "பழமொழி: 'ஒரு பானை சோற்றுக்கு ஒரு சோறு பதம்'. பொருள்: ஒரு குழுவின் தன்மையை ஒருவரை பார்த்தே அறிந்துகொள்ளலாம். ஒரு பானை சாதத்தில் ஒரு சோற்றை பார்த்தால் அனைத்தும் சமைந்ததா என்று தெரியும்.",
    explanation_en: "Proverb: 'ஒரு பானை சோற்றுக்கு ஒரு சோறு பதம்' (One grain shows if the whole pot is cooked). Meaning: You can judge the whole from examining one part.",
  },
  {
    id: 69,
    tamil: "பழமொழியின் பொருளைத் தேர்வு செய்க. உப்பிட்ட வரை ————————",
    english: "Meaning of the proverb: உப்பிட்ட வரை ————————",
    options: [
      { label: "A", text: "உள்ளளவும் திணை" },
      { label: "B", text: "உள்ளளவும் பனை" },
      { label: "C", text: "உள்ளளவும் நினை" },
      { label: "D", text: "உள்ளளவும் வினை" },
    ],
    answer: "C",
    explanation: "பழமொழி: 'உப்பிட்ட வரை உள்ளளவும் நினை'. பொருள்: உணவு கொடுத்து உதவியவரை வாழ்நாள் முழுவதும் நினைவில் வைத்திரு (நன்றி மறவாமை). உப்பிட்டவர் = உணவளித்தவர், உதவியவர்.",
    explanation_en: "Proverb: 'உப்பிட்ட வரை உள்ளளவும் நினை' (Remember as long as you live those who fed you). Meaning: Be grateful to those who helped/fed you throughout your life.",
  },
  {
    id: 70,
    tamil: "மரபுத் தொடர்களைப் பொருளோடு பொருத்துக. கானல் நீர்",
    english: "Match the conventional phrase with its meaning: கானல் நீர் (mirage)",
    options: [
      { label: "A", text: "எண்ணிச் செயல்படாமை" },
      { label: "B", text: "விரைந்து வெளியேறுதல்" },
      { label: "C", text: "இருப்பது போல் தோன்றும், ஆனால் இருக்காது" },
      { label: "D", text: "இயலாத செயல்" },
    ],
    answer: "C",
    explanation: "கானல் நீர் என்பது 'நீர் ஆவி' என்ற இயற்கை நிகழ்வு. பாலைவனத்தில் தூரத்தில் நீர் இருப்பது போல் தோன்றும் ஆனால் நெருங்கினால் இல்லாமல் போகும். இதனால் 'இருப்பது போல் தோன்றும், ஆனால் இருக்காது' என்று பொருள்படுகிறது.",
    explanation_en: "கானல் நீர் (mirage) = something that appears to exist but doesn't. Used metaphorically to describe illusions or false hopes that disappear when examined closely.",
  },
  {
    id: 71,
    tamil: "மரபுத் தொடருக்கு உரியப்பொருளைத் தேர்வு செய்க. அவசரக் குடுக்கை ————————.",
    english: "Meaning of the idiomatic phrase: அவசரக் குடுக்கை",
    options: [
      { label: "A", text: "ஆராய்ந்து பாராமை" },
      { label: "B", text: "எண்ணிச் செயல்படாமை" },
      { label: "C", text: "புகழ்பெற்று விளங்குதல்" },
      { label: "D", text: "விரைந்து வெளியேறுதல்" },
    ],
    answer: "B",
    explanation: "அவசரக் குடுக்கை என்பது அவசரப்படும் குணமுடையவரை குறிக்கும் இயங்காட்டு மரபுத் தொடர். பொருள்: சரியாக சிந்திக்காமல், ஆராயாமல் அவசரமாக செயல்படுபவர். 'எண்ணிச் செயல்படாமை' என்பது இதன் பொருள்.",
    explanation_en: "அவசரக் குடுக்கை = someone who acts hastily without thinking. Meaning: acting without proper thought or consideration. குடுக்கை is a pot metaphor for an impulsive person.",
  },
  {
    id: 72,
    tamil: "சரியான மரபுத் தொடரால் நிரப்புக. திண்டுக்கல், பூக்கள் உற்பத்தியில் __________ நகரமாக விளங்குகிறது.",
    english: "Fill with correct idiom: Dindigul is known as __________ in flower production.",
    options: [
      { label: "A", text: "எட்டாக்கனி" },
      { label: "B", text: "கல்லில் நார் உரித்தல்" },
      { label: "C", text: "கொடி கட்டிப் பறக்கும்" },
      { label: "D", text: "வாழையடி வாழையாக" },
    ],
    answer: "C",
    explanation: "'கொடி கட்டிப் பறக்கும்' என்பது 'மிகவும் புகழ்பெற்று விளங்குகிறது' என்று பொருள். திண்டுக்கல் பூக்கள் உற்பத்தியில் கொடி கட்டிப் பறக்கும் நகரமாக விளங்குகிறது - அதாவது மிகவும் பெயர்பெற்ற நகரமாக உள்ளது.",
    explanation_en: "'கொடி கட்டிப் பறக்கும்' means 'to be widely renowned/famous'. Dindigul is flying high/excelling in flower production - meaning it's the most famous city for flower production.",
  },
  {
    id: 73,
    tamil: "பின்வரும் உவமைத் தொடரின் பொருளறிக. கண்ணினைக் காக்கும் இமை போல",
    english: "Meaning of the simile: கண்ணினைக் காக்கும் இமை போல (like an eyelid protecting the eye)",
    options: [
      { label: "A", text: "கோவமாக" },
      { label: "B", text: "அக்கறையாக" },
      { label: "C", text: "வேகமாக" },
      { label: "D", text: "பணிவாக" },
    ],
    answer: "B",
    explanation: "கண்ணினைக் காக்கும் இமை போல என்பது கண்ணை பாதுகாக்கும் இமையைப் போல என்று பொருள். இமை கண்ணை மிகவும் அக்கறையோடு, கவலையோடு பாதுகாக்கிறது. எனவே 'அக்கறையாக' என்பது இதன் பொருள்.",
    explanation_en: "Like an eyelid protecting the eye - the eyelid protects with care and concern. The metaphor means 'with great care/concern (அக்கறையாக)' - protecting something precious.",
  },
  {
    id: 74,
    tamil: "பின்வரும் உவமைத் தொடரின் பொருளறிக. கிணற்றுத் தவளை போல",
    english: "Meaning of the simile: கிணற்றுத் தவளை போல (like a frog in a well)",
    options: [
      { label: "A", text: "பார்க்காமல் இருப்பது" },
      { label: "B", text: "சிரித்துக்கொண்டே இருப்பது" },
      { label: "C", text: "மறைப்பது" },
      { label: "D", text: "வெளி உலகம் தெரியாமல் இருப்பது" },
    ],
    answer: "D",
    explanation: "கிணற்றுத் தவளை போல என்பது ஒரு பிரசித்தமான உவமை. கிணற்றில் வாழும் தவளைக்கு கிணற்றுக்கு வெளியே உலகம் தெரியாது. அதைப் போல 'வெளி உலகம் தெரியாமல் இருப்பது' - குறுகிய மனப்பான்மை கொண்டவரை குறிக்கும்.",
    explanation_en: "கிணற்றுத் தவளை போல (like a frog in a well) = having a narrow worldview, being ignorant of the outside world. The frog only knows its well and thinks that's the whole world.",
  },
  {
    id: 75,
    tamil: "பின்வரும் உவமைத் தொடரின் பொருளறிக. எலியும் பூனையும் போல",
    english: "Meaning of the simile: எலியும் பூனையும் போல (like a cat and mouse)",
    options: [
      { label: "A", text: "நண்பனாக" },
      { label: "B", text: "வீரனாக" },
      { label: "C", text: "எதிரியாக" },
      { label: "D", text: "கலைஞனாக" },
    ],
    answer: "C",
    explanation: "எலியும் பூனையும் எப்பொழுதும் எதிரிகளாகவே இருக்கும். பூனை எலியை வேட்டையாடும், எலி ஓடும். இந்த உவமை 'எதிரிகளாக' என்று பொருள்படுகிறது. இரண்டு பேர் எப்பொழுதும் சண்டையிட்டுக்கொண்டிருப்பதை குறிக்கும்.",
    explanation_en: "எலியும் பூனையும் போல (like cat and mouse) = being enemies/adversaries. Cats chase mice - they are natural enemies. Used to describe two people who are always at odds with each other.",
  },
  {
    id: 76,
    tamil: "கண்ணாடி ——————— கடத்தாது.",
    english: "A mirror does not transmit ___________.",
    options: [
      { label: "A", text: "அகச்சிவப்புக் கதிர்கள்" },
      { label: "B", text: "புறஊதாக் கதிர்கள்" },
      { label: "C", text: "சூரியக் கதிர்கள்" },
      { label: "D", text: "காரிமவளி" },
    ],
    answer: "A",
    explanation: "கண்ணாடி (mirror/glass) அகச்சிவப்புக் கதிர்களை (infrared rays) கடத்தாது. கண்ணாடி புறஊதாக் கதிர்களையும் (UV rays) கடத்தாது. ஆனால் இந்தக் கேள்வியில் கொடுத்த பத்தியில் 'அகச்சிவப்புக் கதிர்களை கடத்தாது' என்று குறிப்பிடப்பட்டுள்ளது.",
    explanation_en: "Glass/mirrors do not transmit infrared rays (அகச்சிவப்புக் கதிர்கள்). Glass blocks most infrared radiation. This is why glass greenhouses trap heat but don't let it escape easily.",
  },
  {
    id: 77,
    tamil: "சூரியக் குடும்பத்திலேயே மிகவும் வெப்பமான கோள் ————————",
    english: "The hottest planet in the solar system is ————————.",
    options: [
      { label: "A", text: "செவ்வாய்க் கோள்" },
      { label: "B", text: "பூமிக் கோள்" },
      { label: "C", text: "வெள்ளிக் கோள்" },
      { label: "D", text: "புதன் கோள்" },
    ],
    answer: "C",
    explanation: "வெள்ளிக் கோள் (Venus) சூரியக் குடும்பத்திலேயே மிகவும் வெப்பமான கோள். புதன் கோள் சூரியனுக்கு அருகில் இருந்தாலும், வெள்ளியின் அடர்த்தியான CO2 வளிமண்டலம் வெப்பத்தை மிகவும் சிறப்பாக தக்கவைக்கிறது. வெள்ளியின் மேற்பரப்பு வெப்பநிலை சுமார் 465°C.",
    explanation_en: "Venus (வெள்ளிக் கோள்) is the hottest planet. Though Mercury is closer to the Sun, Venus's thick CO2 atmosphere creates an extreme greenhouse effect, maintaining ~465°C surface temperature.",
  },
  {
    id: 78,
    tamil: "வெளிமண்டலத்திலுள்ள கரிம வளி, அகச்சிவப்புக் கதிரை சிறைபடுத்தி ——————— சூடாக்குகிறது",
    english: "Greenhouse gases trap infrared radiation and heat ———————.",
    options: [
      { label: "A", text: "செவ்வாய்" },
      { label: "B", text: "பூமி" },
      { label: "C", text: "வெள்ளி" },
      { label: "D", text: "சூரியன்" },
    ],
    answer: "B",
    explanation: "வளிமண்டலத்திலுள்ள கரியமில வாயு (CO2), மீத்தேன் போன்ற கீழ்க்காண்தக் கதிர்களை (greenhouse gases) அகச்சிவப்புக் கதிர்களை சிறைப்படுத்தி பூமியை சூடாக்குகின்றன. இதுவே 'பசுமை இல்ல விளைவு' (Greenhouse Effect).",
    explanation_en: "Greenhouse gases (CO2, methane, etc.) in the atmosphere trap infrared radiation and heat the Earth (பூமி). This is the Greenhouse Effect - responsible for global warming.",
  },
  {
    id: 79,
    tamil: "மலைப்பகுதிகளில் ————————— தாக்குப்பிடிக்க முடியாத அரிய வகை தாவரங்களை கண்ணாடி அறைகளில் வைத்திருப்பர்.",
    english: "In mountain regions, rare plants that cannot withstand ————— are kept in glass enclosures.",
    options: [
      { label: "A", text: "வெயில்" },
      { label: "B", text: "மழை" },
      { label: "C", text: "குளிர்" },
      { label: "D", text: "காற்று" },
    ],
    answer: "C",
    explanation: "மலைப்பகுதிகளில் மிகவும் குளிர் அதிகமாக இருக்கும். குளிரைத் தாங்காத அரிய வகை தாவரங்களை கண்ணாடி அறைகளில் (greenhouses) வைத்து பாதுகாப்பர். கண்ணாடி அகச்சிவப்புக் கதிர்களை கடத்தாது என்பதால் அறை சூடாக இருக்கும்.",
    explanation_en: "In mountain regions, rare plants that cannot withstand cold (குளிர்) are kept in glass rooms/greenhouses. Glass traps heat by blocking infrared radiation from escaping.",
  },
  {
    id: 80,
    tamil: "வளிமண்டலத்திலுள்ள கரிம வளி ——————— போல செயல்படுகிறது.",
    english: "Greenhouse gases in the atmosphere act like ———————.",
    options: [
      { label: "A", text: "அறை" },
      { label: "B", text: "அகச் சிவப்புக் கதிர்" },
      { label: "C", text: "ஜன்னல்" },
      { label: "D", text: "கண்ணாடி" },
    ],
    answer: "D",
    explanation: "வளிமண்டலத்திலுள்ள கரிமலவாயுக்கள் (greenhouse gases) கண்ணாடி போல செயல்படுகின்றன. சூரிய ஒளி உள்ளே வர விடுகின்றன (கண்ணாடி போல), ஆனால் அகச்சிவப்புக் கதிர்களை வெளியே போக விடுவதில்லை. இதுவே 'பசுமை இல்ல விளைவு'.",
    explanation_en: "Greenhouse gases act like glass (கண்ணாடி) - they allow sunlight in but trap infrared radiation (heat) inside, just like a glass greenhouse. This is the basis of the greenhouse effect.",
  },
  {
    id: 81,
    tamil: "From the candidates என்ற தொடரின் தமிழாக்கம் தருக.",
    english: "Translate 'From the candidates' into Tamil.",
    options: [
      { label: "A", text: "தகவல் தருபவரிடமிருந்து" },
      { label: "B", text: "காவல் துறையாளரிடமிருந்து" },
      { label: "C", text: "வேட்பாளரிடமிருந்து" },
      { label: "D", text: "குறையாளரிடமிருந்து" },
    ],
    answer: "C",
    explanation: "Candidate = வேட்பாளர். 'From the candidates' = வேட்பாளரிடமிருந்து. தேர்தலில் போட்டியிடுபவர் = வேட்பாளர். Candidates (plural) = வேட்பாளர்கள். 'From' = இடமிருந்து.",
    explanation_en: "Candidate = வேட்பாளர் (one who campaigns/seeks). 'From the candidates' = வேட்பாளரிடமிருந்து. Used in elections and competitive examinations.",
  },
  {
    id: 82,
    tamil: "ஆங்கிலச் சொல்லுக்கு நேரான தமிழ்ச் சொல்லை அறிந்து எழுதுக. 'PATENT'",
    english: "Find the Tamil equivalent of 'PATENT'.",
    options: [
      { label: "A", text: "சொத்துரிமை" },
      { label: "B", text: "ஆவணம்" },
      { label: "C", text: "காப்புரிமை" },
      { label: "D", text: "பாசனம்" },
    ],
    answer: "C",
    explanation: "'PATENT' = காப்புரிமை. காப்பு = protection, உரிமை = right. ஒரு கண்டுபிடிப்புக்கு அரசால் வழங்கப்படும் சட்டப்பூர்வமான பாதுகாப்பு உரிமை. Copyright = பதிப்புரிமை, Trademark = வணிக முத்திரை.",
    explanation_en: "PATENT = காப்புரிமை (protection right). காப்பு = protection, உரிமை = right. Other IP terms: Copyright = பதிப்புரிமை, Trademark = வணிகமுத்திரை.",
  },
  {
    id: 83,
    tamil: "ஆங்கிலச் சொல்லுக்கு நேரான தமிழ்ச் சொல்லறிதல். MIGRATION",
    english: "Find the Tamil equivalent of 'MIGRATION'.",
    options: [
      { label: "A", text: "புரிசை" },
      { label: "B", text: "புகலிடம்" },
      { label: "C", text: "வலசை" },
      { label: "D", text: "வானிலை" },
    ],
    answer: "C",
    explanation: "'MIGRATION' = வலசை. பறவைகள் வலசை போவது (bird migration) பிரசித்தமான நிகழ்வு. மனிதர்களின் இடப்பெயர்வும் வலசை என்று சொல்லப்படும். புகலிடம் = refugee camp/shelter.",
    explanation_en: "MIGRATION = வலசை. Bird migration = பறவை வலசை. Human migration = மனித வலசை. Migratory birds are called வலசை பறவைகள். Refugee = அகதி.",
  },
  {
    id: 84,
    tamil: "REVIVALISM – ஆங்கிலச் சொல்லுக்கு நேரான தமிழ்ச் சொல் எது?",
    english: "Find the Tamil equivalent of 'REVIVALISM'.",
    options: [
      { label: "A", text: "மெய்யியலாளர்" },
      { label: "B", text: "மீட்டுருவாக்கம்" },
      { label: "C", text: "செயல்திறன்" },
      { label: "D", text: "நம்பிக்கை" },
    ],
    answer: "B",
    explanation: "'REVIVALISM' = மீட்டுருவாக்கம். மீட்டு = revive/restore, உருவாக்கம் = creation/formation. தமிழ் மொழி மீட்டுருவாக்கம், கலாச்சார மீட்டுருவாக்கம் என்று பயன்படுத்தப்படுகிறது. Revival = மீட்டெழுச்சி.",
    explanation_en: "REVIVALISM = மீட்டுருவாக்கம் (revival/restoration). மீட்டு = to revive, உருவாக்கம் = creation. Tamil language revival = தமிழ் மொழி மீட்டுருவாக்கம்.",
  },
  {
    id: 85,
    tamil: "RENAISSANCE – நேரான தமிழ்ச் சொல் எது?",
    english: "Find the Tamil equivalent of 'RENAISSANCE'.",
    options: [
      { label: "A", text: "ஆய்வேடு" },
      { label: "B", text: "நம்பிக்கை" },
      { label: "C", text: "புரட்சி" },
      { label: "D", text: "மறுமலர்ச்சி" },
    ],
    answer: "D",
    explanation: "'RENAISSANCE' = மறுமலர்ச்சி. மறு = again/re-, மலர்ச்சி = blossoming/flourishing. ஐரோப்பிய மறுமலர்ச்சி (European Renaissance 14th-17th century) = கலை, இலக்கியம், அறிவியல் மீண்டும் மலர்ந்த காலகட்டம்.",
    explanation_en: "RENAISSANCE = மறுமலர்ச்சி (re-flowering/revival). The European Renaissance (14th-17th century) was a period of rebirth in arts, literature, and science. மறு = re/again, மலர்ச்சி = blooming.",
  },
  {
    id: 86,
    tamil: "'அறிக அறிவியல்' எனனும் அறிவியல் இதழை நடத்திய ஆன்மீகத் துறவி யார்?",
    english: "Which spiritual leader ran the science journal 'அறிக அறிவியல்'?",
    options: [
      { label: "A", text: "குன்றக்குடி அடிகளார்" },
      { label: "B", text: "வள்ளலார்" },
      { label: "C", text: "அமுதன் அடிகள்" },
      { label: "D", text: "ஊரன் அடிகள்" },
    ],
    answer: "A",
    explanation: "குன்றக்குடி அடிகளார் (1925-1995) ஆன்மீகத் துறவியாக இருந்தும் அறிவியல் இயக்கத்தில் ஆர்வம் கொண்டிருந்தார். 'அறிக அறிவியல்' என்ற அறிவியல் இதழை நடத்தினார். ஆன்மீகம், தமிழ் இலக்கியம், சமூக சேவை என்று பல துறைகளில் பணியாற்றினார்.",
    explanation_en: "Kundrakkudi Adigalar (1925-1995), despite being a spiritual leader, ran the science journal 'அறிக அறிவியல்'. He worked in spirituality, Tamil literature, and social service.",
  },
  {
    id: 87,
    tamil: "'குற்றாலமுனிவர்' எனப் புகழப்படுகின்ற கவிஞரைக் கண்டறிக.",
    english: "Who is the poet celebrated as 'குற்றாலமுனிவர்'?",
    options: [
      { label: "A", text: "சி. இலக்குவனார்" },
      { label: "B", text: "கண்ணதாசன்" },
      { label: "C", text: "முடியரசன்" },
      { label: "D", text: "டி.கே. சிதம்பரநாதர்" },
    ],
    answer: "D",
    explanation: "டி.கே. சிதம்பரநாதர் 'குற்றாலமுனிவர்' என்று போற்றப்படுகிறார். குற்றாலம் என்பது தமிழ்நாட்டில் ஒரு புகழ்பெற்ற அருவி மலை பகுதி. சிதம்பரநாதர் அந்த பகுதியோடு ஆழ்ந்த தொடர்பு கொண்டிருந்ததால் இந்த சிறப்புப் பெயர் பெற்றார்.",
    explanation_en: "T.K. Chithambaranather is celebrated as 'குற்றாலமுனிவர்' (Sage of Courtallam). Courtallam (குற்றாலம்) is a famous waterfall region in Tamil Nadu with which this poet had deep connections.",
  },
  {
    id: 88,
    tamil: "'இருண்ட வீடு' என்ற நூலை இயற்றியவர் யார்?",
    english: "Who wrote the book 'இருண்ட வீடு'?",
    options: [
      { label: "A", text: "பாரதிதாசன்" },
      { label: "B", text: "கண்ணதாசன்" },
      { label: "C", text: "தாரா பாரதி" },
      { label: "D", text: "முடியரசன்" },
    ],
    answer: "A",
    explanation: "'இருண்ட வீடு' என்ற நூலை பாரதிதாசன் (1891-1964) இயற்றினார். பாரதிதாசன் தமிழ்நாட்டின் புகழ்பெற்ற கவிஞர். 'பாரதியார் தாசன்' என்று தன்னை அழைத்துக்கொண்டார். சமூக சீர்திருத்தம், பெண்ணுரிமை பற்றி நிறைய எழுதினார்.",
    explanation_en: "பாரதிதாசன் (1891-1964) wrote 'இருண்ட வீடு'. He was a great Tamil poet who called himself 'Bharatidasan' (devotee of Bharati). He wrote extensively on social reform and women's rights.",
  },
  {
    id: 89,
    tamil: "தாயகத்துக்குச் சென்ற போப், 1885 முதல் 1908 ஆம் ஆண்டு வரை இருபத்து மூன்றாண்டுகளாக இங்கிலாந்துப் பல்கலைக்கழகத்தில் எவ்விரு மொழிகளைக் கற்பிக்கும் பேராசிரியராகப் பணியாற்றினார்?",
    english: "From 1885 to 1908, at which university did Pope serve as Professor teaching which two languages?",
    options: [
      { label: "A", text: "தமிழ், சமஸ்கிருதம்" },
      { label: "B", text: "தமிழ், தெலுங்கு" },
      { label: "C", text: "தமிழ், கன்னடம்" },
      { label: "D", text: "தமிழ், மலையாளம்" },
    ],
    answer: "B",
    explanation: "G.U. Pope (1820-1908) ஒரு மிஷனரி மற்றும் தமிழ் அறிஞர். 1885 முதல் 1908 வரை Oxford University (ஆக்ஸ்ஃபோர்டு பல்கலைக்கழகம்) அல்லது இங்கிலாந்துப் பல்கலைக்கழகத்தில் தமிழ் மற்றும் தெலுங்கு மொழிகளை கற்பித்தார். திருக்குறளை ஆங்கிலத்தில் மொழிபெயர்த்தார்.",
    explanation_en: "G.U. Pope (1820-1908), the missionary and Tamil scholar, taught Tamil and Telugu at an English university from 1885-1908. He is famous for translating Thirukkural and Naladiyar into English.",
  },
  {
    id: 90,
    tamil: "'கண்' என்ற அடிச்சொல் தோடா மொழியில் எவ்வாறு அமைநதுளது?",
    english: "How does the root word 'கண்' appear in the Toda language?",
    options: [
      { label: "A", text: "கெண்" },
      { label: "B", text: "கண்" },
      { label: "C", text: "கொண்" },
      { label: "D", text: "கண்ணு" },
    ],
    answer: "C",
    explanation: "தோடா மொழி (Toda language) நீலகிரி மலையில் வாழும் தோடா பழங்குடியினரின் மொழி. 'கண்' என்ற தமிழ்ச் சொல் தோடா மொழியில் 'கொண்' என்று வழங்கப்படுகிறது. இது திராவிட மொழிகளின் தொடர்பை காட்டுகிறது.",
    explanation_en: "The Toda language is spoken by the Toda tribal community in Nilgiris. The Tamil root word 'கண்' (eye) appears as 'கொண்' in Toda language, demonstrating Dravidian language connections.",
  },
  {
    id: 91,
    tamil: "'தென்மொழி, தமிழ்ச்சிட்டு' இதழ்களின் வாயிலாகத் தமிழுணர்வை உலகெங்கும் பரப்பியவர் யார்?",
    english: "Who spread Tamil consciousness worldwide through the journals 'தென்மொழி' and 'தமிழ்ச்சிட்டு'?",
    options: [
      { label: "A", text: "பாரதியார்" },
      { label: "B", text: "பாவேந்தர்" },
      { label: "C", text: "திரு.வி.க" },
      { label: "D", text: "பாவலரேறு பெருஞ்சித்திரனார்" },
    ],
    answer: "D",
    explanation: "பாவலரேறு பெருஞ்சித்திரனார் (1931-2011) 'தென்மொழி' மற்றும் 'தமிழ்ச்சிட்டு' என்ற இதழ்களை நடத்தி தமிழ் உணர்வை உலகெங்கும் பரப்பினார். தமிழ் ஒளி, சொல்லின் செல்வர் என்றும் போற்றப்படுகிறார்.",
    explanation_en: "பாவலரேறு பெருஞ்சித்திரனார் (1931-2011) ran 'தென்மொழி' and 'தமிழ்ச்சிட்டு' journals to spread Tamil consciousness worldwide. He is also known as சொல்லின் செல்வர் (master of words).",
  },
  {
    id: 92,
    tamil: "'மொழி ஞாயிறு' என்று அழைக்கப்படுபவர் யார்?",
    english: "Who is called 'மொழி ஞாயிறு' (Sun of Language)?",
    options: [
      { label: "A", text: "பாவலரேறு பெருஞ்சித்திரனார்" },
      { label: "B", text: "வீரமாமுனிவர்" },
      { label: "C", text: "கம்பர்" },
      { label: "D", text: "தேவநேயப்பாவாணர்" },
    ],
    answer: "D",
    explanation: "தேவநேயப்பாவாணர் (1902-1981) 'மொழி ஞாயிறு' என்று போற்றப்படுகிறார். தமிழ் மொழியின் தொன்மை, தமிழ் எழுத்துக்களின் வரலாறு பற்றி ஆழமாக ஆராய்ந்தார். 'தமிழ்ச் சொல் வரலாறு' என்ற நூலை இயற்றினார்.",
    explanation_en: "தேவநேயப்பாவாணர் (1902-1981) is called 'மொழி ஞாயிறு' (Sun of Language). He deeply researched Tamil's antiquity and the history of Tamil script. Wrote 'தமிழ்ச் சொல் வரலாறு'.",
  },
  {
    id: 93,
    tamil: "இந்தியாவின் தொன்மையான கல்வெட்டுகளில் காணப்படும் மொழி எது?",
    english: "Which language is found in the most ancient inscriptions of India?",
    options: [
      { label: "A", text: "தமிழ்" },
      { label: "B", text: "இந்தி" },
      { label: "C", text: "தெலுங்கு" },
      { label: "D", text: "துளு" },
    ],
    answer: "A",
    explanation: "இந்தியாவின் மிகவும் தொன்மையான கல்வெட்டுகளில் தமிழ் மொழி காணப்படுகிறது. சிந்து சமவெளி நாகரிகம் (Indus Valley Civilization) தொடர்பாக ஆராய்ச்சியாளர்கள் தமிழ் மொழியை மிகவும் தொன்மையான மொழியாக கருதுகின்றனர்.",
    explanation_en: "Tamil is found in the most ancient inscriptions of India. Tamil Brahmi inscriptions date back to around 3rd century BCE. Tamil is considered one of the oldest living languages in the world.",
  },
  {
    id: 94,
    tamil: "கடல்கோளால் கொள்ளப்பட்ட பழந்தமிழ்க் சுமரிக்கண்டம்",
    english: "The ancient Tamil land submerged by the sea is called ——————.",
    options: [
      { label: "A", text: "இலெமூரியாக் கண்டம்" },
      { label: "B", text: "ஆசியாக் கண்டம்" },
      { label: "C", text: "இலங்கை" },
      { label: "D", text: "சுமத்ரா, ஜாவா" },
    ],
    answer: "A",
    explanation: "தமிழ் இலக்கிய மரபின்படி கடல்கோளால் (தலைப்பெரும் கடல் கோல்) கொள்ளப்பட்ட பழந்தமிழ்ச் சுமரிக்கண்டம் 'இலெமூரியா' என்று அழைக்கப்படுகிறது. இது தமிழ் நாகரிகத்தின் தொட்டில் என்று சில ஆராய்ச்சியாளர்கள் கருதுகின்றனர்.",
    explanation_en: "The ancient Tamil land submerged by the sea is called 'Lemuria' (இலெமூரியாக் கண்டம்). Tamil literary tradition mentions a great deluge (கடல்கோள்) that submerged a vast Tamil civilization.",
  },
  {
    id: 95,
    tamil: "சரியான விடையைத் தேர்க. 'வேளாண் வேதம்' என்று அழைக்கப்படும் நூலினைச் சுட்டுக.",
    english: "Which book is called 'வேளாண் வேதம்' (Farmer's Veda)?",
    options: [
      { label: "A", text: "சிறுபஞ்சமூலம்" },
      { label: "B", text: "ஆசாரக்கோவை" },
      { label: "C", text: "முதுமொழிக்காஞ்சி" },
      { label: "D", text: "நாலடியார்" },
    ],
    answer: "D",
    explanation: "நாலடியார் 'வேளாண் வேதம்' என்று போற்றப்படுகிறது. இது 400 வெண்பாக்களை கொண்ட நீதிநூல். வைணவ முனிவர்களால் (ஜைன முனிவர்கள் என்றும் சொல்லுவர்) இயற்றப்பட்டது. நாலடி = 4 அடிகள் கொண்ட வெண்பா.",
    explanation_en: "நாலடியார் is called 'வேளாண் வேதம்' (Farmer's scripture). It contains 400 four-line poems (வெண்பா) on ethics and morality, attributed to Jain monks.",
  },
  {
    id: 96,
    tamil: "பண்ணென்னாம் பாடற் கியைபின்றேல்; கண்ணென்னாம் கண்ணோட்டம் இல்லாத கண். மேற்கண்ட குறட்பாவில் பயின்று வந்துள்ள அணி யாது?",
    english: "Which figure of speech (அணி) is used in this Thirukkural couplet?",
    options: [
      { label: "A", text: "உவமையணி" },
      { label: "B", text: "எடுத்துக்காட்டு உவமையணி" },
      { label: "C", text: "உயர்வு நவிற்சியணி" },
      { label: "D", text: "இல்பொருள் உவமையணி" },
    ],
    answer: "B",
    explanation: "'பண்ணென்னாம்... கண்ணென்னாம்...' என்பது இரண்டு எடுத்துக்காட்டுகளை முன்வைத்து கருத்தை விளக்குகிறது. கண்ணோட்டம் இல்லாத கண் கண்ணல்ல என்று எடுத்துக்காட்டு மூலம் விளக்குவதால் இது 'எடுத்துக்காட்டு உவமையணி'.",
    explanation_en: "This Thirukkural couplet uses 'எடுத்துக்காட்டு உவமையணி' (simile by example). What good is music without rhythm? What good are eyes without compassion? - These are illustrative examples.",
  },
  {
    id: 97,
    tamil: "சரியாக சீர் அமையப்பெற்ற குறள் அடியைக் கண்டறிக.",
    english: "Find the correctly metered Kural line.",
    options: [
      { label: "A", text: "செல சொல்லு வார் கற்ற" },
      { label: "B", text: "சொல்லுச்செல வார் கற்ற" },
      { label: "C", text: "வார் கற்ற செலச்சொல்லு" },
      { label: "D", text: "கற்ற செலச்சொல்லு வார்" },
    ],
    answer: "D",
    explanation: "திருக்குறள் 723: 'கற்றவர் கற்ற செலச்சொல்லு வார்'. அல்லது 'கற்ற செலச்சொல்லு வார்' என்பது சரியான சீர் வரிசை. குறள் வெண்பாவின் சீர் அமைப்பு விதிகளின்படி D சரியானது.",
    explanation_en: "The correctly metered Kural line is 'கற்ற செலச்சொல்லு வார்'. This follows the kuRaL venpa meter rules with proper சீர் (metrical feet) arrangement.",
  },
  {
    id: 98,
    tamil: "வினையால் வினையாக்கிக் கோடல் நலனகவுள் யானையால் யானையாத் தற்று. இக்குறட்பாவில் குறிப்பிடப்படும் விலங்கு யாது?",
    english: "What animal is mentioned in this Thirukkural couplet about taming with craft?",
    options: [
      { label: "A", text: "நீர் நாய்" },
      { label: "B", text: "நீர் யானை" },
      { label: "C", text: "கவரிமான்" },
      { label: "D", text: "யானை" },
    ],
    answer: "D",
    explanation: "திருக்குறள் 677: 'வினையால் வினையாக்கி கோடல் நலனகவுள் யானையால் யானையாத் தற்று'. யானையை யானையால் அடக்குவது போல, வினையால் வினையை முடிக்க வேண்டும் என்பது இதன் பொருள். இங்கே 'யானை' குறிப்பிடப்படுகிறது.",
    explanation_en: "Thirukkural 677 mentions யானை (elephant). The couplet means: Using action to accomplish action is like using a captive elephant to capture wild elephants.",
  },
  {
    id: 99,
    tamil: "சரியான குறட்பாவினைத் தேர்வு செய்க.",
    english: "Choose the correctly written Thirukkural couplet.",
    options: [
      { label: "A", text: "வறியார்குளொன் றேகமற்று எல்லாம் குறியெதிர்ப்பை நீரது உடைத்து" },
      { label: "B", text: "வறியார்குளொன் றேக மற்று எல்லாம் குறியெதிர்ப்பை நீரது உடைத்து" },
      { label: "C", text: "வறியார்குளொன் றேகமேற்று எல்லாம் குறியெதிர்ப்பை உடைத்து நீரது" },
      { label: "D", text: "வறியார்க்குளொன் றேகமற்று எல்லாம் குறியெதிர்ப்பை நீரது உடைத்து" },
    ],
    answer: "A",
    explanation: "திருக்குறளின் சரியான வாசிப்பு: 'வறியார்க்குளொன்று ஈகமற்று எல்லாம் குறியெதிர்ப்பை நீரதுவுடைத்து'. ஏழைகளுக்கு ஒன்று கொடுப்பதும் மற்றெல்லாவற்றும் குறித்து விளைவை நோக்கி செய்வதும் நீரினது தன்மை போன்றது என்பது பொருள்.",
    explanation_en: "This Thirukkural couplet about charity states: Giving to the poor even one thing, while all other acts look for results, is pure like water. Option A has the correct spelling per the PDF marking.",
  },
  {
    id: 100,
    tamil: "குறட்பாவில் விடுபட்ட சீரினை இட்டு நிரப்புக. ஒழுக்கம் விழுப்பம் தரலான் ஒழுக்கம் ——————— ஓம்பப் படும்.",
    english: "Fill in the missing word: ஒழுக்கம் விழுப்பம் தரலான் ஒழுக்கம் ——— ஓம்பப் படும்.",
    options: [
      { label: "A", text: "வாழ்வினும்" },
      { label: "B", text: "இயல்பினும்" },
      { label: "C", text: "உயிரினும்" },
      { label: "D", text: "நன்மையினும்" },
    ],
    answer: "C",
    explanation: "திருக்குறள் 131: 'ஒழுக்கம் விழுப்பம் தரலான் ஒழுக்கம் உயிரினும் ஓம்பப் படும்'. பொருள்: ஒழுக்கம் உயர்வை தருவதால், ஒழுக்கம் உயிரை விட மதிக்கப்பட வேண்டும். இது 'ஒழுக்காறுடைமை' அதிகாரத்தில் உள்ளது.",
    explanation_en: "Thirukkural 131: 'ஒழுக்கம் விழுப்பம் தரலான் ஒழுக்கம் உயிரினும் ஓம்பப் படும்' (Since discipline brings excellence, discipline should be guarded more than life itself).",
  },
];

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function technical_exam_interview_2025() {
  const [tab, setTab] = useState("study"); // "study" | "game" | "results"
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [gameAnswers, setGameAnswers] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSubmitted, setGameSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [filter, setFilter] = useState("all");
  const timerRef = useRef(null);

  // Timer for game mode
  useEffect(() => {
    if (gameStarted && !gameSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { clearInterval(timerRef.current); setGameSubmitted(true); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStarted, gameSubmitted]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // Study mode
  const q = QUESTIONS[currentQ];
  const handleStudyOption = (label) => {
    setSelected(label);
    setShowExp(true);
  };

  // Game mode
  const handleGameOption = (qid, label) => {
    if (!gameSubmitted) setGameAnswers((prev) => ({ ...prev, [qid]: label }));
  };
  const submitGame = () => { clearInterval(timerRef.current); setGameSubmitted(true); };

  // Results
  const score = QUESTIONS.reduce((acc, q) => {
    if (q.answer === "?" ) return acc;
    return acc + (gameAnswers[q.id] === q.answer ? 1 : 0);
  }, 0);
  const total = QUESTIONS.filter(q => q.answer !== "?").length;

  const filteredStudy = filter === "all" ? QUESTIONS : filter === "answered" ? QUESTIONS.filter((_, i) => gameAnswers[QUESTIONS[i].id]) : QUESTIONS;

  return (
    <div style={{ fontFamily: "'Noto Serif Tamil', 'Segoe UI', serif", minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", color: "#f0e6d3" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Tamil:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #1a1a2e; } ::-webkit-scrollbar-thumb { background: #6c63ff; border-radius: 3px; }
        .tab-btn { padding: 10px 24px; border-radius: 30px; border: 2px solid #6c63ff; cursor: pointer; font-size: 15px; font-weight: 700; transition: all 0.3s; letter-spacing: 1px; }
        .tab-btn.active { background: linear-gradient(90deg, #6c63ff, #e040fb); color: white; border-color: transparent; box-shadow: 0 4px 20px #6c63ff88; }
        .tab-btn:not(.active) { background: transparent; color: #b0a8ff; }
        .tab-btn:hover:not(.active) { background: #6c63ff22; }
        .opt-btn { width: 100%; text-align: left; padding: 13px 18px; border-radius: 12px; border: 2px solid #3a3060; background: #1e1b4b; color: #e0d8ff; cursor: pointer; font-size: 14.5px; margin-bottom: 10px; transition: all 0.2s; line-height: 1.6; }
        .opt-btn:hover:not(:disabled) { border-color: #6c63ff; background: #2d2870; transform: translateX(4px); }
        .opt-btn.correct { border-color: #00e676; background: #00431a; color: #b9ffda; }
        .opt-btn.wrong { border-color: #ff5252; background: #4a0000; color: #ffb3b3; }
        .opt-btn.selected-neutral { border-color: #6c63ff; background: #2d2870; }
        .opt-btn.unanswered-correct { border-color: #ffd600; background: #3d3000; color: #fff9c4; }
        .card { background: #1a1742; border-radius: 20px; padding: 28px; box-shadow: 0 8px 32px #0008; border: 1px solid #3a3060; margin-bottom: 20px; }
        .badge { display: inline-block; padding: 3px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-right: 8px; }
        .nav-btn { padding: 9px 22px; border-radius: 25px; border: none; cursor: pointer; font-size: 14px; font-weight: 700; transition: all 0.2s; }
        .progress-bar-bg { background: #2d2870; border-radius: 10px; height: 8px; overflow: hidden; }
        .progress-bar-fill { height: 100%; border-radius: 10px; background: linear-gradient(90deg, #6c63ff, #e040fb); transition: width 0.4s; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { background: #2d2870; color: #b0a8ff; padding: 10px 14px; text-align: left; font-weight: 700; }
        td { padding: 10px 14px; border-bottom: 1px solid #2a2560; vertical-align: top; line-height: 1.7; }
        tr:nth-child(even) td { background: #1e1b4b22; }
        .exp-box { background: #0d0b2a; border-left: 4px solid #6c63ff; padding: 18px 20px; border-radius: 0 12px 12px 0; margin-top: 14px; font-size: 14px; line-height: 1.8; color: #c9c3f5; }
        .score-ring { width: 150px; height: 150px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-direction: column; font-size: 36px; font-weight: 700; background: conic-gradient(#6c63ff 0%, #e040fb 60%, #2d2870 60%); box-shadow: 0 0 40px #6c63ff66; margin: 0 auto 20px; }
        .chip { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; margin: 2px; }
        .chip-green { background: #00432222; border: 1px solid #00e676; color: #00e676; }
        .chip-red { background: #4a000022; border: 1px solid #ff5252; color: #ff5252; }
        .chip-yellow { background: #3d300022; border: 1px solid #ffd600; color: #ffd600; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#0f0c29", borderBottom: "1px solid #3a3060", padding: "16px 20px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 12, color: "#b0a8ff", letterSpacing: 2, marginBottom: 4 }}>503 • TNPSC EXAM</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: "#e0d8ff" }}>Tamil Eligibility Test 2025</h1>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["study", "game", "results"].map((t) => (
                <button key={t} className={`tab-btn${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
                  {t === "study" ? "📖 Study" : t === "game" ? "🎯 Quiz" : "📊 Results"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {/* ── STUDY TAB ── */}
        {tab === "study" && (
          <div>
            {/* Progress */}
            <div className="card" style={{ padding: "18px 24px", marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ color: "#b0a8ff", fontSize: 13 }}>Question {currentQ + 1} of {QUESTIONS.length}</span>
                <span style={{ color: "#6c63ff", fontWeight: 700 }}>{Math.round(((currentQ + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }} /></div>
            </div>

            {/* Question Card */}
            <div className="card">
              <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <span className="badge" style={{ background: "#6c63ff22", border: "1px solid #6c63ff", color: "#6c63ff" }}>Q{q.id}</span>
                <span className="badge" style={{ background: "#e040fb22", border: "1px solid #e040fb", color: "#e040fb" }}>Part-A Tamil</span>
                {q.answer === "?" && <span className="badge" style={{ background: "#ff572222", border: "1px solid #ff5722", color: "#ff5722" }}>⚠ Answer Unclear</span>}
              </div>
              <div style={{ fontSize: 16.5, lineHeight: 1.9, marginBottom: 6, color: "#f0e6d3" }}>{q.tamil}</div>
              {q.english !== q.tamil && <div style={{ fontSize: 13, color: "#9188cc", marginBottom: 18, fontStyle: "italic" }}>{q.english}</div>}

              {/* Options */}
              <div style={{ marginTop: 18 }}>
                {q.options.map((opt) => {
                  const isCorrect = opt.label === q.answer;
                  const isSelected = selected === opt.label;
                  let cls = "opt-btn";
                  if (showExp) {
                    if (isCorrect) cls += " correct";
                    else if (isSelected && !isCorrect) cls += " wrong";
                  } else if (isSelected) cls += " selected-neutral";
                  return (
                    <button key={opt.label} className={cls} disabled={showExp} onClick={() => handleStudyOption(opt.label)}>
                      <span style={{ fontWeight: 700, marginRight: 10, fontSize: 13 }}>({opt.label})</span>{opt.text}
                      {showExp && isCorrect && <span style={{ float: "right", fontSize: 18 }}>✓</span>}
                      {showExp && isSelected && !isCorrect && <span style={{ float: "right", fontSize: 18 }}>✗</span>}
                    </button>
                  );
                })}
                {q.answer === "?" && <div style={{ color: "#ff9800", padding: "10px 0", fontSize: 13 }}>⚠ The answer to this question is not clearly marked in the TNPSC paper. Please verify with official answer key.</div>}
              </div>

              {/* Explanation */}
              {showExp && (
                <div className="exp-box">
                  <div style={{ fontWeight: 700, color: "#6c63ff", marginBottom: 8, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>📚 Explanation</div>
                  <div style={{ marginBottom: 12 }}><strong style={{ color: "#e040fb" }}>Tamil:</strong> {q.explanation}</div>
                  <div><strong style={{ color: "#00e676" }}>English:</strong> {q.explanation_en}</div>
                  {/* Answer Table */}
                  <div style={{ marginTop: 14, overflowX: "auto" }}>
                    <table>
                      <thead><tr><th>Option</th><th>Text</th><th>Status</th></tr></thead>
                      <tbody>
                        {q.options.map((opt) => (
                          <tr key={opt.label}>
                            <td style={{ fontWeight: 700 }}>{opt.label}</td>
                            <td>{opt.text}</td>
                            <td>{opt.label === q.answer ? <span className="chip chip-green">✓ Correct</span> : <span className="chip chip-red">✗</span>}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Nav */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <button className="nav-btn" style={{ background: currentQ === 0 ? "#2d2870" : "#6c63ff", color: "#fff" }} disabled={currentQ === 0}
                onClick={() => { setCurrentQ((c) => c - 1); setSelected(null); setShowExp(false); }}>← Previous</button>
              <div style={{ display: "flex", gap: 8 }}>
                {!showExp && <button className="nav-btn" style={{ background: "#e040fb22", border: "1px solid #e040fb", color: "#e040fb" }} onClick={() => setShowExp(true)}>Show Answer</button>}
              </div>
              <button className="nav-btn" style={{ background: currentQ === QUESTIONS.length - 1 ? "#2d2870" : "#6c63ff", color: "#fff" }} disabled={currentQ === QUESTIONS.length - 1}
                onClick={() => { setCurrentQ((c) => c + 1); setSelected(null); setShowExp(false); }}>Next →</button>
            </div>

            {/* Quick Jump */}
            <div className="card" style={{ marginTop: 24 }}>
              <div style={{ color: "#b0a8ff", fontSize: 13, marginBottom: 14, fontWeight: 700 }}>QUICK JUMP</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {QUESTIONS.map((_, i) => (
                  <button key={i} onClick={() => { setCurrentQ(i); setSelected(null); setShowExp(false); }}
                    style={{ width: 36, height: 36, borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12,
                      background: i === currentQ ? "linear-gradient(135deg,#6c63ff,#e040fb)" : "#2d2870", color: i === currentQ ? "#fff" : "#b0a8ff" }}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── GAME TAB ── */}
        {tab === "game" && (
          <div>
            {!gameStarted ? (
              <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ fontSize: 60, marginBottom: 20 }}>🎯</div>
                <h2 style={{ fontSize: 24, marginBottom: 12, color: "#e040fb" }}>Quiz Challenge Mode</h2>
                <p style={{ color: "#9188cc", marginBottom: 8 }}>100 Questions • Tamil Eligibility Test</p>
                <p style={{ color: "#9188cc", marginBottom: 30, fontSize: 14 }}>60 minutes timer • Attempt all questions</p>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 30 }}>
                  {[["📝", "100 Qs", "All questions covered"], ["⏱", "60 min", "Time limit"], ["🏆", "Score", "Instant results"]].map(([ico, t, d]) => (
                    <div key={t} style={{ background: "#2d2870", borderRadius: 14, padding: "16px 20px", minWidth: 120 }}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>{ico}</div>
                      <div style={{ fontWeight: 700, color: "#e0d8ff" }}>{t}</div>
                      <div style={{ fontSize: 12, color: "#9188cc" }}>{d}</div>
                    </div>
                  ))}
                </div>
                <button className="nav-btn" style={{ background: "linear-gradient(90deg,#6c63ff,#e040fb)", color: "#fff", padding: "14px 40px", fontSize: 16 }}
                  onClick={() => { setGameStarted(true); setGameAnswers({}); setGameSubmitted(false); setTimeLeft(3600); }}>
                  Start Quiz →
                </button>
              </div>
            ) : (
              <div>
                {/* Timer Bar */}
                <div className="card" style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 70, zIndex: 50 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, color: timeLeft < 300 ? "#ff5252" : "#00e676", fontWeight: 700 }}>
                    ⏱ {formatTime(timeLeft)}
                  </div>
                  <div style={{ color: "#b0a8ff", fontSize: 14 }}>
                    {Object.keys(gameAnswers).length}/{QUESTIONS.length} answered
                  </div>
                  {!gameSubmitted && (
                    <button className="nav-btn" style={{ background: "linear-gradient(90deg,#6c63ff,#e040fb)", color: "#fff" }} onClick={submitGame}>
                      Submit
                    </button>
                  )}
                </div>

                {/* All Questions */}
                {QUESTIONS.map((q, idx) => {
                  const userAns = gameAnswers[q.id];
                  const isCorrect = userAns === q.answer;
                  return (
                    <div key={q.id} className="card" id={`gq-${q.id}`}>
                      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                        <span className="badge" style={{ background: "#6c63ff22", border: "1px solid #6c63ff", color: "#6c63ff" }}>Q{q.id}</span>
                        {gameSubmitted && userAns && <span className={`badge ${isCorrect ? "chip-green" : "chip-red"}`}>{isCorrect ? "✓ Correct" : "✗ Wrong"}</span>}
                        {gameSubmitted && !userAns && q.answer !== "?" && <span className="badge chip-yellow">Unattempted</span>}
                      </div>
                      <div style={{ fontSize: 15.5, lineHeight: 1.9, marginBottom: 16 }}>{q.tamil}</div>
                      <div>
                        {q.options.map((opt) => {
                          let cls = "opt-btn";
                          if (gameSubmitted) {
                            if (opt.label === q.answer) cls += " correct";
                            else if (opt.label === userAns && !isCorrect) cls += " wrong";
                          } else if (opt.label === userAns) cls += " selected-neutral";
                          return (
                            <button key={opt.label} className={cls} disabled={gameSubmitted}
                              onClick={() => handleGameOption(q.id, opt.label)}>
                              <span style={{ fontWeight: 700, marginRight: 10 }}>({opt.label})</span>{opt.text}
                            </button>
                          );
                        })}
                      </div>
                      {gameSubmitted && (
                        <div className="exp-box" style={{ marginTop: 10 }}>
                          <div style={{ fontWeight: 700, color: "#6c63ff", marginBottom: 6, fontSize: 12, textTransform: "uppercase" }}>Explanation</div>
                          <div style={{ marginBottom: 8 }}><strong style={{ color: "#e040fb" }}>Tamil:</strong> {q.explanation}</div>
                          <div><strong style={{ color: "#00e676" }}>English:</strong> {q.explanation_en}</div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {!gameSubmitted && (
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <button className="nav-btn" style={{ background: "linear-gradient(90deg,#6c63ff,#e040fb)", color: "#fff", padding: "14px 40px", fontSize: 16 }} onClick={submitGame}>
                      Submit Answers
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── RESULTS TAB ── */}
        {tab === "results" && (
          <div>
            {!gameSubmitted ? (
              <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
                <p style={{ color: "#9188cc" }}>Complete the quiz to see results.</p>
                <button className="nav-btn" style={{ background: "#6c63ff", color: "#fff", marginTop: 20 }} onClick={() => setTab("game")}>Go to Quiz</button>
              </div>
            ) : (
              <div>
                {/* Score Card */}
                <div className="card" style={{ textAlign: "center", padding: "40px 24px" }}>
                  <div className="score-ring" style={{ background: `conic-gradient(#6c63ff 0%, #e040fb ${(score / total) * 100}%, #2d2870 ${(score / total) * 100}%)` }}>
                    <div style={{ background: "#1a1742", width: 110, height: 110, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                      <div style={{ fontSize: 30, fontWeight: 700, color: "#e0d8ff" }}>{score}</div>
                      <div style={{ fontSize: 13, color: "#9188cc" }}>/ {total}</div>
                    </div>
                  </div>
                  <h2 style={{ fontSize: 28, marginBottom: 8 }}>{score >= 80 ? "🏆 Excellent!" : score >= 60 ? "👍 Good!" : score >= 40 ? "📖 Keep Studying" : "💪 Try Again"}</h2>
                  <p style={{ color: "#9188cc", marginBottom: 24 }}>Score: {Math.round((score / total) * 100)}%</p>
                  <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
                    {[["✅ Correct", score, "chip-green"], ["❌ Wrong", QUESTIONS.filter(q => gameAnswers[q.id] && gameAnswers[q.id] !== q.answer).length, "chip-red"],
                      ["⬜ Skipped", QUESTIONS.filter(q => !gameAnswers[q.id]).length, "chip-yellow"]].map(([label, val, cls]) => (
                      <div key={label} style={{ background: "#2d2870", borderRadius: 14, padding: "16px 24px", minWidth: 100 }}>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#e0d8ff" }}>{val}</div>
                        <div style={{ fontSize: 13, color: "#9188cc" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Answer Summary Table */}
                <div className="card">
                  <div style={{ fontWeight: 700, color: "#b0a8ff", fontSize: 14, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Complete Answer Summary</div>
                  <div style={{ overflowX: "auto" }}>
                    <table>
                      <thead>
                        <tr><th>#</th><th>Question (Tamil)</th><th>Correct Answer</th><th>Your Answer</th><th>Result</th></tr>
                      </thead>
                      <tbody>
                        {QUESTIONS.map((q) => {
                          const ua = gameAnswers[q.id];
                          const ic = ua === q.answer;
                          return (
                            <tr key={q.id}>
                              <td style={{ fontWeight: 700, color: "#6c63ff" }}>{q.id}</td>
                              <td style={{ maxWidth: 320, fontSize: 13 }}>{q.tamil.slice(0, 80)}{q.tamil.length > 80 ? "..." : ""}</td>
                              <td><span className="chip chip-green">{q.answer}</span> — {q.options.find(o => o.label === q.answer)?.text?.slice(0, 30)}</td>
                              <td>{ua ? <span className={`chip ${ic ? "chip-green" : "chip-red"}`}>{ua}</span> : <span className="chip chip-yellow">—</span>}</td>
                              <td>{!ua ? <span className="chip chip-yellow">Skipped</span> : ic ? <span className="chip chip-green">✓</span> : <span className="chip chip-red">✗</span>}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Retry */}
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <button className="nav-btn" style={{ background: "linear-gradient(90deg,#6c63ff,#e040fb)", color: "#fff", padding: "14px 32px", fontSize: 15 }}
                    onClick={() => { setGameAnswers({}); setGameSubmitted(false); setGameStarted(false); setTab("game"); }}>
                    Retry Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
