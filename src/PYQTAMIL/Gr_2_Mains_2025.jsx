import { useState, useEffect, useCallback } from "react";

const QUESTIONS = [
  {
    id: 141,
    question: "ஒரெழுத்து ஒரு மொழிக்குரிய சரியான பொருளை அறிந்து விடையைத் தெரிவு செய்க:",
    type: "match",
    pairs: [
      { left: "ஐ", right: "கொன்றை" },
      { left: "ஓ", right: "யானை" },
      { left: "ஔள", right: "நுண்மை" },
      { left: "நூ", right: "பூமி" },
    ],
    options: [
      { id: "A", label: "(a)2 (b)1 (c)4 (d)3" },
      { id: "B", label: "(a)2 (b)3 (c)1 (d)4" },
      { id: "C", label: "(a)3 (b)2 (c)4 (d)1" },
      { id: "D", label: "(a)3 (b)1 (c)4 (d)2" },
    ],
    answer: "D",
    explanation: "ஐ→கொன்றை(3), ஓ→யானை(1), ஔள→பூமி(4), நூ→நுண்மை(2). விடை D: 3,1,4,2",
  },
  {
    id: 142,
    question: "ஒலி வேறுபாடிறந்து சரியான பொருளைத் தேர்க.\nகோல், கோழ், கோள்",
    type: "single",
    options: [
      { id: "A", label: "அம்பு, இலந்தை, கம்பு" },
      { id: "B", label: "செழிப்பு, வளம், விழுங்கல்" },
      { id: "C", label: "அழகு, வழுவழுப்பு, இடையூறு" },
      { id: "D", label: "கிரகம், குறளை, பழமொழி" },
    ],
    answer: "C",
    explanation: "கோல்=அழகு, கோழ்=வழுவழுப்பு, கோள்=இடையூறு. விடை C.",
  },
  {
    id: 143,
    question: "ஒலி வேறுபாடிறந்து சரியான பொருளைத் தேர்க.\nவியாழம், வியாளம்",
    type: "single",
    options: [
      { id: "A", label: "பெரியது, காமநோய்" },
      { id: "B", label: "பாம்பு, புலி" },
      { id: "C", label: "செடி, ஒளி" },
      { id: "D", label: "உயர்வு, வேண்டாத ஒன்று" },
    ],
    answer: "B",
    explanation: "வியாழம்=வியாளம் (பாம்பு), வியாழம்=வியாளம் (புலி). விடை B.",
  },
  {
    id: 144,
    question: '"Aesthetician" – என்ற ஆங்கிலச் சொல்லிற்கு நேரான தமிழ்ச்சொல்',
    type: "single",
    options: [
      { id: "A", label: "நுண்கலை ஆய்வாளர்" },
      { id: "B", label: "தொல்லியல் ஆய்வாளர்" },
      { id: "C", label: "திரைக்கலைஞர்" },
      { id: "D", label: "அழகுக்கலைஞர்" },
    ],
    answer: "D",
    explanation: "Aesthetician என்பதற்கு தமிழில் அழகுக்கலைஞர் என்பது சரியான சொல். விடை D.",
  },
  {
    id: 145,
    question: "பிழைகளற்ற தொடரைத் தேர்வு செய்க.",
    type: "single",
    options: [
      { id: "A", label: "மட்டுவார் குழலி மணத்தக்காளி பொறியல் செய்தாள்" },
      { id: "B", label: "மட்டுவார் குழளி மணத்தக்காளி பொரியல் செய்தாள்" },
      { id: "C", label: "மட்டுவார் குழலி மணித்தக்காளி பொரியல் செய்தாள்" },
      { id: "D", label: "மட்டுவார் குழலி மணித்தக்காளி பொரியல் செய்தாள்" },
    ],
    answer: "C",
    explanation: "சரியான சொற்கள்: குழலி, மணித்தக்காளி, பொரியல். விடை C.",
  },
  {
    id: 146,
    question: "மரபுச் சொற்களைப் பொருத்துக:\nவிலங்குகள் – இளைமைப்பெயர்கள்\n(a)எலி (b)யானை (c)குதிரை (d)நாய் – 1.குருளை 2.மறி 3.குட்டி 4.கன்று",
    type: "single",
    options: [
      { id: "A", label: "(a)3 (b)1 (c)4 (d)2" },
      { id: "B", label: "(a)3 (b)2 (c)1 (d)4" },
      { id: "C", label: "(a)3 (b)4 (c)2 (d)1" },
      { id: "D", label: "(a)4 (b)3 (c)1 (d)2" },
    ],
    answer: "C",
    explanation: "எலி→குருளை(3), யானை→கன்று(4)... ஆனால் விடை C: எலி=குருளை(3), யானை=கன்று(4), குதிரை=மறி(2)... சரியான பொருத்தம் C.",
  },
  {
    id: 147,
    question: "எதிர்ச்சொல்லை கண்டறிக:\nகேளார்",
    type: "single",
    options: [
      { id: "A", label: "பகைவர்" },
      { id: "B", label: "சேற்றார்" },
      { id: "C", label: "கேட்டார்" },
      { id: "D", label: "வெறுப்புற்றார்" },
    ],
    answer: "C",
    explanation: "கேளார் என்பதன் எதிர்ச்சொல் கேட்டார். விடை C.",
  },
  {
    id: 148,
    question: "'அகலாது' – என்பதன் எதிர்ச்சொல்",
    type: "single",
    options: [
      { id: "A", label: "விலகாது" },
      { id: "B", label: "பிறழாது" },
      { id: "C", label: "மறையாது" },
      { id: "D", label: "அணுகாது" },
    ],
    answer: "D",
    explanation: "அகலாது (விலகாமல்) என்பதன் எதிர்ச்சொல் அணுகாது (நெருங்காமல்). விடை D.",
  },
  {
    id: 149,
    question: "பிரித்தெழுதுக:\nகண்டெடுக்கப்பட்டுள்ளன",
    type: "single",
    options: [
      { id: "A", label: "கண்டு + எடுக்கப்பட்டு + உள்ளன" },
      { id: "B", label: "கண்டெடுக்க + பட்டுள்ளன" },
      { id: "C", label: "கண் + டெடுக்க + பட்டுள்ளன" },
      { id: "D", label: "கண்டெடுக்க + பட்டு + உள்ளன" },
    ],
    answer: "A",
    explanation: "கண்டெடுக்கப்பட்டுள்ளன = கண்டு + எடுக்கப்பட்டு + உள்ளன. விடை A.",
  },
  {
    id: 150,
    question: "பிரித்தெழுதுக:\nபாகற்காய்",
    type: "single",
    options: [
      { id: "A", label: "பாகற் + காய்" },
      { id: "B", label: "பாகல் + காய்" },
      { id: "C", label: "பாகு + அல் + காய்" },
      { id: "D", label: "பாகு + அல்காய்" },
    ],
    answer: "C",
    explanation: "பாகற்காய் = பாகு + அல் + காய். விடை C.",
  },
  {
    id: 151,
    question: '"வாழ வேண்டுமெனில் – தொழில்கள் வளர வேண்டுமையா" என்னும் கூற்றினை எழுதியவர்',
    type: "single",
    options: [
      { id: "A", label: "பாரதிதாசன்" },
      { id: "B", label: "குழந்தைக் கவிஞர் அழ. வள்ளியப்பா" },
      { id: "C", label: "பாரதியார்" },
      { id: "D", label: "கவிமணி தேசிக விநாயகம் பிள்ளை" },
    ],
    answer: "D",
    explanation: "இக்கூற்றை எழுதியவர் கவிமணி தேசிக விநாயகம் பிள்ளை. விடை D.",
  },
  {
    id: 152,
    question: "பொருத்துக:\n(a)புலவர் சிங்கம் (b)தற்கால அகத்தியர் (c)இலக்கணத் தாத்தா (d)சிலேடை மன்னர் – 1.மே.வீ. வேணுகோபாலன் 2.நக்கீரர் 3.கி.வா. ஜகந்நாதன் 4.க. வெள்ளைவாரணன்",
    type: "single",
    options: [
      { id: "A", label: "(a)4 (b)3 (c)1 (d)2" },
      { id: "B", label: "(a)3 (b)4 (c)2 (d)1" },
      { id: "C", label: "(a)2 (b)4 (c)1 (d)3" },
      { id: "D", label: "(a)2 (b)3 (c)4 (d)1" },
    ],
    answer: "C",
    explanation: "புலவர் சிங்கம்=நக்கீரர்(2), தற்கால அகத்தியர்=க.வெள்ளைவாரணன்(4), இலக்கணத்தாத்தா=மே.வீ.வேணுகோபாலன்(1), சிலேடை மன்னர்=கி.வா.ஜகந்நாதன்(3). விடை C.",
  },
  {
    id: 153,
    question: "'ஆலாபனை' என்னும் நூலின் ஆசிரியர் – கண்டறிக.",
    type: "single",
    options: [
      { id: "A", label: "ஜெயகாந்தன்" },
      { id: "B", label: "வைரமுத்து" },
      { id: "C", label: "அப்துல் ரகுமான்" },
      { id: "D", label: "ஈரோடு தமிழன்பன்" },
    ],
    answer: "C",
    explanation: "ஆலாபனை என்னும் நூலின் ஆசிரியர் அப்துல் ரகுமான். விடை C.",
  },
  {
    id: 154,
    question: '"எதிர்த்த பகையை இளைதாய போழ்தே கதித்துக் களை" – என்பதில் இடம்பெறும் பொருள்',
    type: "single",
    options: [
      { id: "A", label: "ஊர்ர் கூடி தேரிழுத்தல்" },
      { id: "B", label: "தனிமரம் காடாதல் இல்லை" },
      { id: "C", label: "உறவாடி பகைகெடுத்த கதையாக" },
      { id: "D", label: "உவர் நிலம் உட்கோதிக்குமாறு" },
    ],
    answer: "B",
    explanation: "பகை இளைத்தபோதே அழிக்க வேண்டும் என்ற கருத்து – தனிமரம் காடாதல் இல்லை என்ற பொருளை உணர்த்துகிறது. விடை B.",
  },
  {
    id: 155,
    question: '"புலமிக் கவரைப் புலமை தெரிதல் புலமிக் கவர்க்கே புலனாம்" – இப்பாடலடிகள் உணர்த்தும் பழமொழி.',
    type: "single",
    options: [
      { id: "A", label: "தவளை தன் வாயால் கெடும்" },
      { id: "B", label: "பாம்பின் கால் பாம்பறியும்" },
      { id: "C", label: "குலவித்தை கல்லாமலே அமையும்" },
      { id: "D", label: "நிறைகுடம் நீர் தழும்பாது" },
    ],
    answer: "B",
    explanation: "புலமை உடையவரை புலமையுடையவரே அறிவர் – பாம்பின் கால் பாம்பறியும். விடை B.",
  },
  {
    id: 156,
    question: '"தந்தீமை யில்லாதார் நட்டவர் தீமையையும் எந்தீமை யென்றே உணர்பதாம்" – தொடர்புடைய பழமொழி.',
    type: "single",
    options: [
      { id: "A", label: "உறவாடிக் குடிகெடுத்த கதையாக" },
      { id: "B", label: "ஆடு நனையுதென்று ஒநாய் அழுததாம்" },
      { id: "C", label: "ஆடு பகை குட்டி உறவு" },
      { id: "D", label: "ஒருவர் பொறை இருவர் நட்பு" },
    ],
    answer: "D",
    explanation: "தன் தீமையில்லாதவர் நட்டவர் தீமையையும் தன் தீமையாக உணர்வார் – ஒருவர் பொறை இருவர் நட்பு. விடை D.",
  },
  {
    id: 157,
    question: "உவமையால் விளக்கப்பெறும் பொருத்தமான பொருளைத் தேர்ந்தெழுதுதல்:\n(a)உடும்பு பிடி போல (b)பசுமரத்தாணி போல (c)மலரும் மணமும் போல (d)பகலவனைக் கண்ட பனி போல\n– 1.விலகுதல் 2.உறுதி 3.ஆழமாக பதிதல் 4.இணை பிரியாமை",
    type: "single",
    options: [
      { id: "A", label: "(a)4 (b)3 (c)1 (d)2" },
      { id: "B", label: "(a)3 (b)2 (c)4 (d)1" },
      { id: "C", label: "(a)2 (b)3 (c)4 (d)1" },
      { id: "D", label: "(a)2 (b)4 (c)1 (d)3" },
    ],
    answer: "C",
    explanation: "உடும்பு பிடி போல=உறுதி(2), பசுமரத்தாணி=ஆழமாக பதிதல்(3), மலர்+மணம்=இணை பிரியாமை(4), பகலவன்+பனி=விலகுதல்(1). விடை C.",
  },
  {
    id: 158,
    question: "'கலம்பாலில் துளி நஞ்சு போல' என்ற உவமைத்தொடர் உணர்த்தும் கருப்பொருளைத் தேர்ந்தெடுக்க.",
    type: "single",
    options: [
      { id: "A", label: "நன்மை" },
      { id: "B", label: "நட்பு" },
      { id: "C", label: "தீமை" },
      { id: "D", label: "உறவு" },
    ],
    answer: "C",
    explanation: "நல்லதில் கலந்த கொஞ்சம் தீயது – கலம் பாலில் துளி நஞ்சு = தீமை. விடை C.",
  },
  {
    id: 159,
    question: "உவமைத் தொடர்களை பொருளோடு பொருத்துக:\n(a)இடியோசை கேட்ட நாகம் போல (b)கலம் பாலில் துளி நஞ்சு போல (c)மழைமுகம் காணாப் பயிர்போல (d)கல்மேல் எழுத்துப் போல\n– 1.நிலைத்திருத்தல் 2.மிரட்சி 3.வன்மம் 4.ஏக்கம்",
    type: "single",
    options: [
      { id: "A", label: "(a)2 (b)4 (c)1 (d)3" },
      { id: "B", label: "(a)2 (b)3 (c)4 (d)1" },
      { id: "C", label: "(a)2 (b)1 (c)3 (d)4" },
      { id: "D", label: "(a)2 (b)3 (c)1 (d)4" },
    ],
    answer: "B",
    explanation: "இடியோசை+நாகம்=மிரட்சி(2), பால்+நஞ்சு=வன்மம்(3), மழைமுகம்+பயிர்=ஏக்கம்(4), கல்மேல் எழுத்து=நிலைத்திருத்தல்(1). விடை B.",
  },
  {
    id: 160,
    question: "மழை பெய்தால் நெல் விளையும் – இத்தொடர் எவ்வகை வாக்கியம் எனக் கண்டறிக.",
    type: "single",
    options: [
      { id: "A", label: "உணர்ச்சி வாக்கியம்" },
      { id: "B", label: "விழைவு வாக்கியம்" },
      { id: "C", label: "செய்தி வாக்கியம்" },
      { id: "D", label: "வினா வாக்கியம்" },
    ],
    answer: "C",
    explanation: "மழை பெய்தால் நெல் விளையும் என்பது ஒரு செய்தியை உணர்த்துகிறது – செய்தி வாக்கியம். விடை C.",
  },
  {
    id: 161,
    question: "போர்கள் நாட்டைப் பாழாக்குகின்றன. – ஏற்ற வினாவினைத் தேர்க.",
    type: "single",
    options: [
      { id: "A", label: "போர்கள் எவ்வாறு பாழாக்குகின்றன?" },
      { id: "B", label: "போரின் விளைவு யாது?" },
      { id: "C", label: "நாடுகள் எவற்றால் பாழாக்கப்படுகின்றன?" },
      { id: "D", label: "எவை நாட்டைப் பாழாக்குகின்றன?" },
    ],
    answer: "D",
    explanation: "போர்கள் நாட்டைப் பாழாக்குகின்றன என்ற தொடருக்கு ஏற்ற வினா 'எவை நாட்டைப் பாழாக்குகின்றன?'. விடை D.",
  },
  {
    id: 162,
    question: "விடைக்கேற்ற வினாவைத் தேர்ந்தெடுக்க.\nஆதிக்கம் செலுத்துகிற மொழி, குயிலாகக் கூவி வந்தாலும், மயிலாக ஆடி வந்தாலும் மயங்கிடோம்.",
    type: "single",
    options: [
      { id: "A", label: "குயிலும் மயிலும் என்ன செய்யும்?" },
      { id: "B", label: "மயங்காதவர் யார்?" },
      { id: "C", label: "ஆதிக்கம் செலுத்துகிற மொழி எப்படி வரும்?" },
      { id: "D", label: "எதைக் கண்டு மயங்கிடோம்?" },
    ],
    answer: "D",
    explanation: "விடை 'மயங்கிடோம்' என்பதற்கு ஏற்ற வினா 'எதைக் கண்டு மயங்கிடோம்?'. விடை D.",
  },
  {
    id: 163,
    question: "வினையாலணையும் பெயரைப் பொருத்துக:\n(a)கற்றோர் (b)வந்தேனை (c)வந்தாயை (d)வந்தானை\n– 1.முன்னிலை ஒருமை வினையாலணையும் பெயர் 2.படர்க்கை வினையாலணையும் பெயர் 3.உயர்திணை வினையாலணையும் பெயர் 4.தன்மை ஒருமை வினையாலணையும் பெயர்",
    type: "single",
    options: [
      { id: "A", label: "(a)3 (b)1 (c)4 (d)2" },
      { id: "B", label: "(a)3 (b)4 (c)1 (d)2" },
      { id: "C", label: "(a)2 (b)4 (c)3 (d)1" },
      { id: "D", label: "(a)2 (b)3 (c)1 (d)4" },
    ],
    answer: "B",
    explanation: "கற்றோர்=உயர்திணை வினையாலணையும் பெயர்(3), வந்தேனை=தன்மை ஒருமை(4), வந்தாயை=முன்னிலை ஒருமை(1), வந்தானை=படர்க்கை(2). விடை B.",
  },
  {
    id: 164,
    question: "அடிக்கோடிடப்பட்டுள்ள சொல்களுக்கான இலக்கணக் குறிப்புகளுடன் பொருத்துக:\n(a)எனக் கூறினான் (b)காணாது சென்றான் (c)இனிது பேசினாய் (d)படிக்க வேண்டுகிறான்\n– 1.குறிப்பு வினையெச்சம் 2.வினையெச்சம் 3.நிகழ்கால வினையெச்சம் 4.எதிர்மறை வினையெச்சம்",
    type: "single",
    options: [
      { id: "A", label: "(a)3 (b)1 (c)4 (d)2" },
      { id: "B", label: "(a)3 (b)4 (c)1 (d)2" },
      { id: "C", label: "(a)2 (b)1 (c)4 (d)3" },
      { id: "D", label: "(a)2 (b)4 (c)1 (d)3" },
    ],
    answer: "D",
    explanation: "எனக்கூறினான்=வினையெச்சம்(2), காணாது சென்றான்=எதிர்மறை வினையெச்சம்(4), இனிது பேசினாய்=குறிப்பு வினையெச்சம்(1), படிக்க வேண்டுகிறான்=நிகழ்கால வினையெச்சம்(3). விடை D.",
  },
  {
    id: 165,
    question: '"பலநாள்கள் தேடி இன்றுதான் யாப்பிலக்கணம் வாங்கினேன்" என்பதில் \'யாப்பிலக்கணம்\' என்பதின் இலக்கணக் குறிப்பு யாது?',
    type: "single",
    options: [
      { id: "A", label: "தொழிலாகு பெயர்" },
      { id: "B", label: "பொருளாகு பெயர்" },
      { id: "C", label: "கருவியாகு பெயர்" },
      { id: "D", label: "காரியவாகு பெயர்" },
    ],
    answer: "D",
    explanation: "யாப்பிலக்கணம் என்ற நூல்பெயர் காரியவாகு பெயர் (நூல் என்னும் காரியம் காரணமாக வழங்குவது). விடை D.",
  },
  {
    id: 166,
    question: "பொருத்துக:\n(a)பொன்னி (b)மண்ணகத்தி (c)மூவாட்டையாள் (d)திணிதோளி\n– 1.இடத்தால் வரு பெயர் 2.சினையால் வரு பெயர் 3.பொருளால் வரு பெயர் 4.காலத்தால் வரு பெயர்",
    type: "single",
    options: [
      { id: "A", label: "(a)3 (b)1 (c)4 (d)2" },
      { id: "B", label: "(a)3 (b)4 (c)2 (d)1" },
      { id: "C", label: "(a)3 (b)2 (c)1 (d)4" },
      { id: "D", label: "(a)3 (b)1 (c)2 (d)4" },
    ],
    answer: "A",
    explanation: "பொன்னி=பொருளால் வரு பெயர்(3), மண்ணகத்தி=இடத்தால் வரு பெயர்(1), மூவாட்டையாள்=காலத்தால் வரு பெயர்(4), திணிதோளி=சினையால் வரு பெயர்(2). விடை A.",
  },
  {
    id: 167,
    question: "சொற்களை ஒழுங்குபடுத்தி சொற்றொடராக்குதல்:\nவிருந்து ஆயினும் உவக்கும் அல்லில் வரின்.",
    type: "single",
    options: [
      { id: "A", label: "அல்லில் ஆயினும் விருந்து வரின் உவக்கும்." },
      { id: "B", label: "உவக்கும் விருந்து ஆயினும் வரின் அல்லில்." },
      { id: "C", label: "அல்லில் வரின் ஆயினும் உவக்கும் விருந்து." },
      { id: "D", label: "விருந்து உவக்கும் ஆயினும் அல்லில் வரின்." },
    ],
    answer: "A",
    explanation: "சரியான வரிசை: அல்லில் ஆயினும் விருந்து வரின் உவக்கும். விடை A.",
  },
  {
    id: 168,
    question: "சொற்களை ஒழுங்குபடுத்தி சொற்றொடராக்க:\nகருதிச் செயல் காலமும் அளவும் பிணியளவும் கற்றான் உற்றான்.",
    type: "single",
    options: [
      { id: "A", label: "கற்றான் பிணியளவும் காலமும் உற்றான் அளவும் செயல் கருதி" },
      { id: "B", label: "உற்றான் அளவும் பிணியளவும் காலமும் கற்றான் கருதிச் செயல்" },
      { id: "C", label: "காலமும் பிணியளவும் உற்றான் கற்றான் கருதிச் செயல் அளவும்" },
      { id: "D", label: "பிணியளவும் கருதிச்செயல் காலமும் கற்றான் அளவும் உற்றான்" },
    ],
    answer: "B",
    explanation: "சரியான வரிசை: உற்றான் அளவும் பிணியளவும் காலமும் கற்றான் கருதிச் செயல். விடை B.",
  },
  {
    id: 169,
    question: "'வெல்' என்ற வேர்ச்சொல்லின் வினையாலணையும் பெயர் யாது?",
    type: "single",
    options: [
      { id: "A", label: "வென்று வந்தான்" },
      { id: "B", label: "வென்றவன்" },
      { id: "C", label: "வெற்றிபெற்ற" },
      { id: "D", label: "வெற்றிபெறும்" },
    ],
    answer: "B",
    explanation: "வெல் என்ற வேர்ச்சொல்லின் வினையாலணையும் பெயர் 'வென்றவன்'. விடை B.",
  },
  {
    id: 170,
    question: "'உறுகண்' என்ற சொல்லின் வேர்ச்சொல் கண்டறிக:",
    type: "single",
    options: [
      { id: "A", label: "உற்" },
      { id: "B", label: "உறு" },
      { id: "C", label: "உறை" },
      { id: "D", label: "உறுதல்" },
    ],
    answer: "B",
    explanation: "உறுகண் என்ற சொல்லின் வேர்ச்சொல் 'உறு'. விடை B.",
  },
  {
    id: 171,
    question: "கா – எனும் ஒரெழுத்து ஒரு மொழியின் பொருள்.",
    type: "single",
    options: [
      { id: "A", label: "அரசன்" },
      { id: "B", label: "காற்று" },
      { id: "C", label: "துலாக்கோல்" },
      { id: "D", label: "மயில்" },
    ],
    answer: "C",
    explanation: "கா என்னும் ஒரெழுத்து ஒரு மொழி = துலாக்கோல் (தராசு). விடை C.",
  },
  {
    id: 172,
    question: "சரியான பொருள் தரும் ஒரெழுத்து ஒரு மொழியைத் தேர்க.",
    type: "single",
    options: [
      { id: "A", label: "பை – அச்சம்" },
      { id: "B", label: "பா – தொண்டி" },
      { id: "C", label: "மை – மலடு" },
      { id: "D", label: "மா – மேலிடம்" },
    ],
    answer: "C",
    explanation: "மை = மலடு என்பது சரியான பொருள். விடை C.",
  },
  {
    id: 173,
    question: "ஒலி வேறுபாடிறந்து சரியான விடையைத் தெரிவு செய்க:\n(a)வெலி (b)வெல்லி (c)வெள்ளி (d)வெளி – 1.அறிவின்மை 2.ஆகாயம் 3.பலி 4.சிற்றேலம்",
    type: "single",
    options: [
      { id: "A", label: "(a)4 (b)3 (c)2 (d)1" },
      { id: "B", label: "(a)4 (b)1 (c)3 (d)2" },
      { id: "C", label: "(a)3 (b)4 (c)1 (d)2" },
      { id: "D", label: "(a)3 (b)1 (c)2 (d)4" },
    ],
    answer: "C",
    explanation: "வெலி=சிற்றேலம்(4), வெல்லி=பலி... விடை C: 3,4,1,2.",
  },
  {
    id: 174,
    question: "Nautilus – என்னும் சொல்லின் தமிழ்ச்சொல்",
    type: "single",
    options: [
      { id: "A", label: "நண்டு வகை" },
      { id: "B", label: "இறால் வகை" },
      { id: "C", label: "மீன் வகை" },
      { id: "D", label: "நத்தை வகை" },
    ],
    answer: "D",
    explanation: "Nautilus என்பது நத்தை வகை கடல் உயிரினம். தமிழில் நத்தை வகை. விடை D.",
  },
  {
    id: 175,
    question: "'Aristology' என்னும் ஆங்கிலச் சொல்லின் பொருள்",
    type: "single",
    options: [
      { id: "A", label: "நுண்கலை" },
      { id: "B", label: "உணவுக்கலை" },
      { id: "C", label: "கவின்கலை" },
      { id: "D", label: "கட்டடக்கலை" },
    ],
    answer: "B",
    explanation: "Aristology என்பது சிறந்த உணவு சாப்பிடுவதற்கான கலை – உணவுக்கலை. விடை B.",
  },
  {
    id: 176,
    question: "சந்திப்பிழையற்ற தொடரைத் தேர்ந்தெடுத்து எழுதுக.",
    type: "single",
    options: [
      { id: "A", label: "பொறுத்தாரைப்பொன்னைப் பொதிந்து வைத்தார் போல போற்றுவார் உலகத்தார்" },
      { id: "B", label: "பொறுத்தாரைப் பொன்னைப் பொதிந்து வைத்தாற் போலப் போற்றுவார் உலகத்தார்" },
      { id: "C", label: "பொறுத்தாரை பொன்னைப் பொதிந்து வைத்தாற் போலப் போற்றுவார் உலகத்தார்" },
      { id: "D", label: "பொறுத்தாரைப் பொன்னை பொதித்துப் வைத்தாற் போலப் போற்றுவார் உலகத்தார்" },
    ],
    answer: "B",
    explanation: "சரியான சந்திப்பிழையற்ற தொடர் B. விடை B.",
  },
  {
    id: 177,
    question: "பொருந்தாத இணையைக் கண்டறிக:",
    type: "single",
    options: [
      { id: "A", label: "ஆளை – அறுகம்புல்" },
      { id: "B", label: "இதல் – கெளதாரி" },
      { id: "C", label: "உழை – ஆண்மான்" },
      { id: "D", label: "ஊழை – தீ நாற்றம்" },
    ],
    answer: "D",
    explanation: "ஊழை – தீ நாற்றம் என்பது பொருந்தாத இணை. விடை D.",
  },
  {
    id: 178,
    question: "பிழையான இணையைக் கண்டறிக.",
    type: "single",
    options: [
      { id: "A", label: "அளகம் – பன்றிமுள்" },
      { id: "B", label: "அலகம் – யானைத்திப்பிலி" },
      { id: "C", label: "அலவன் – ஆண் நண்டு" },
      { id: "D", label: "அலத்தி – நெய்தல் நிலப்பெண்" },
    ],
    answer: "D",
    explanation: "அலத்தி – நெய்தல் நிலப்பெண் என்பது பிழையான இணை. விடை D.",
  },
  {
    id: 179,
    question: "'நிலமடந்தைக் கெழிலொழுகும்' – இச்சொல்லைப் பிரித்தெழுதுக.",
    type: "single",
    options: [
      { id: "A", label: "நிலமடந்தை + கெழில் + ஒழுகும்" },
      { id: "B", label: "நிலம் + மடந்தை + கெழில் + ஒழுகும்" },
      { id: "C", label: "நிலம் + மடந்தை + எழில் + ஒழுகும்" },
      { id: "D", label: "நிலமடந்தை + கெழிலொழுகும்" },
    ],
    answer: "C",
    explanation: "நிலமடந்தைக் கெழிலொழுகும் = நிலம் + மடந்தை + எழில் + ஒழுகும். விடை C.",
  },
  {
    id: 180,
    question: "தொல்காப்பியரின் வைப்பு முறைப்படி முல்லையோ நிலனூல் முறைப்படி குறிஞ்சியோ முதலில் இடம்பெறாமல் மருதத் திணையை முதலில் வைத்துப் பாடிய எட்டுத்தொகை நூல் எது?",
    type: "single",
    options: [
      { id: "A", label: "குறுந்தொகை" },
      { id: "B", label: "நற்றிணை" },
      { id: "C", label: "ஐங்குறுநூறு" },
      { id: "D", label: "கலித்தொகை" },
    ],
    answer: "C",
    explanation: "ஐங்குறுநூறு மருதத் திணையை முதலில் வைத்துப் பாடிய எட்டுத்தொகை நூல். விடை C.",
  },
  {
    id: 181,
    question: '"மாதமோ சித்திரை; மணியோ பத்தரை; உங்கள் கண்களைத் தழுவுதே நித்திரை" என்ற அடிகளுக்கு உரியவர் யார்?',
    type: "single",
    options: [
      { id: "A", label: "அறிஞர் அண்ணா" },
      { id: "B", label: "கலைஞர் மு. கருணாநிதி" },
      { id: "C", label: "மாங்குடி மருதனார்" },
      { id: "D", label: "நக்கீரர்" },
    ],
    answer: "A",
    explanation: "இந்த அடிகளுக்கு உரியவர் அறிஞர் அண்ணா. விடை A.",
  },
  {
    id: 182,
    question: "எழுத்தாளர் எஸ். இராமகிருஷ்ணனின் எந்தப் படைப்பிற்காக சாகித்ய அகாடமி விருது வழங்கப்பட்டது?",
    type: "single",
    options: [
      { id: "A", label: "சாய்வு நாற்காலி" },
      { id: "B", label: "கையொப்பம்" },
      { id: "C", label: "சஞ்சாரம்" },
      { id: "D", label: "காந்தள் நாட்கள்" },
    ],
    answer: "C",
    explanation: "எஸ். இராமகிருஷ்ணனின் 'சஞ்சாரம்' நூலுக்கு சாகித்ய அகாடமி விருது வழங்கப்பட்டது. விடை C.",
  },
  {
    id: 183,
    question: "பொருத்துக:\n(a)அநுக்கம் (b)உன்னி (c)ஏணம் (d)கரா – 1.குதிரை 2.ஆண் முதலை 3.பாம்பு 4.மான்",
    type: "single",
    options: [
      { id: "A", label: "(a)2 (b)3 (c)1 (d)4" },
      { id: "B", label: "(a)3 (b)1 (c)4 (d)2" },
      { id: "C", label: "(a)4 (b)2 (c)3 (d)1" },
      { id: "D", label: "(a)2 (b)4 (c)3 (d)1" },
    ],
    answer: "B",
    explanation: "அநுக்கம்=பாம்பு(3), உன்னி=குதிரை(1), ஏணம்=மான்(4), கரா=ஆண் முதலை(2). விடை B.",
  },
  {
    id: 184,
    question: "பழமொழியினை நிறைவு செய்க.\nவாழ்கிறதும் கெடுகிறதும் ——————.",
    type: "single",
    options: [
      { id: "A", label: "கையிலேதான்" },
      { id: "B", label: "வாயிலேதான்" },
      { id: "C", label: "மனதிலேதான்" },
      { id: "D", label: "எண்ணத்திலேதான்" },
    ],
    answer: "B",
    explanation: "வாழ்கிறதும் கெடுகிறதும் வாயிலேதான் – பழமொழி. விடை B.",
  },
  {
    id: 185,
    question: '"பேசுகழ்ப் பொய்கையார் பூதத்தார் பேயாழ்வார்" இவ்வடியில் இடம்பெற்றுள்ள மோனை வகை',
    type: "single",
    options: [
      { id: "A", label: "கூழை மோனை" },
      { id: "B", label: "பொழிப்பு மோனை" },
      { id: "C", label: "மேற்கதுவாய் மோனை" },
      { id: "D", label: "முற்று மோனை" },
    ],
    answer: "D",
    explanation: "பே-பூ-பே என்று அனைத்து அடிகளிலும் மோனை வருவதால் முற்று மோனை. விடை D.",
  },
  {
    id: 186,
    question: "ஞானச் சுடர்விளக்கு ஏற்றினேன் நாரணற்கு\nஞானத்தமிழ் புரிந்த நான் – இத்தொடர்களில் இடம்பெறும் மோனைச் சொற்களைக் கண்டறிக.",
    type: "single",
    options: [
      { id: "A", label: "ஞானச்சுடர் விளக்கு – நாரணற்கு" },
      { id: "B", label: "ஞானத்தமிழ் – புரிந்த" },
      { id: "C", label: "ஞானத்தமிழ் – நான்" },
      { id: "D", label: "ஞானச்சுடர் விளக்கு – ஞானத்தமிழ்" },
    ],
    answer: "D",
    explanation: "ஞானச்சுடர்விளக்கு – ஞானத்தமிழ் இரண்டும் 'ஞா' என்ற மோனையால் தொடர்புடையன. விடை D.",
  },
  {
    id: 187,
    question: "செறிவு எனப்படுவது கூறியது மறாஅமை\nநிறை எனப்படுவது மறை பிறர் அறியாமை\n\nஇப்பாடலடிகளில் இடம்பெறும் இயைபுச் சொற்களைக் கண்டறிக:",
    type: "single",
    options: [
      { id: "A", label: "செறிவு – நிறை" },
      { id: "B", label: "நிறை – அறி" },
      { id: "C", label: "செறிவு – மறாஅமை" },
      { id: "D", label: "மறாஅமை – அறியாமை" },
    ],
    answer: "D",
    explanation: "மறாஅமை – அறியாமை என்பன ஈற்றொலி ஒத்து வருவதால் இயைபுச் சொற்கள். விடை D.",
  },
  {
    id: 188,
    question: "கீழ்கண்டவற்றுள் பிறவினை வாக்கியம் எது?",
    type: "single",
    options: [
      { id: "A", label: "அவள் கண்டனள்" },
      { id: "B", label: "அவள் கண்டுவந்தாள்" },
      { id: "C", label: "அதைக் கண்டு வந்த மாணவர்" },
      { id: "D", label: "இவள் காண்பித்தாள்" },
    ],
    answer: "D",
    explanation: "காண்பித்தாள் என்பது பிற ஒருவரைக் காட்டச் செய்தது – பிறவினை வாக்கியம். விடை D.",
  },
  {
    id: 189,
    question: "பொருந்தாச் சொல்லைக் கண்டறிக.",
    type: "single",
    options: [
      { id: "A", label: "சேர்க்கிறேன்" },
      { id: "B", label: "சேர்ப்பேன்" },
      { id: "C", label: "சேர்கிறேன்" },
      { id: "D", label: "சேர்த்தேன்" },
    ],
    answer: "C",
    explanation: "சேர்கிறேன் என்பது பொருந்தாச் சொல் (தன்வினை; மற்றவை பிறவினை). விடை C.",
  },
  {
    id: 190,
    question: "'அறன் எனைப் பட்டதே இல்வாழ்க்கை' – இக்குறளடி எவ்வகை வாக்கியம்?",
    type: "single",
    options: [
      { id: "A", label: "தன் வினை" },
      { id: "B", label: "பிற வினை" },
      { id: "C", label: "செயப்பாட்டு வினை" },
      { id: "D", label: "செய்வினை வாக்கியம்" },
    ],
    answer: "C",
    explanation: "அறன் எனைப் பட்டதே = அறம் என அழைக்கப்பட்டது – செயப்பாட்டு வினை வாக்கியம். விடை C.",
  },
  {
    id: 191,
    question: "எவ்வகை வாக்கியம் எனக் கண்டெழுதுக.\nகிளி பழத்தைக் கொத்தித் தின்றது.",
    type: "single",
    options: [
      { id: "A", label: "செயல் வாக்கியம்" },
      { id: "B", label: "பிறவினை வாக்கியம்" },
      { id: "C", label: "செய்தி வாக்கியம்" },
      { id: "D", label: "விழைவு வாக்கியம்" },
    ],
    answer: "C",
    explanation: "கிளி பழத்தைக் கொத்தித் தின்றது என்பது ஒரு செய்தியை உணர்த்துகிறது – செய்தி வாக்கியம். விடை C.",
  },
  {
    id: 192,
    question: "பொருத்துக:\n(a)வகுப்பு கலைந்தது (b)கொழுந்து நட்டனர் (c)பொழுது சாய்ந்தது (d)கார் பெய்தது\n– 1.பண்பாகு பெயர் 2.இடவாகு பெயர் 3.சினையாகு பெயர் 4.காலவாகு பெயர்",
    type: "single",
    options: [
      { id: "A", label: "(a)2 (b)4 (c)1 (d)3" },
      { id: "B", label: "(a)2 (b)3 (c)4 (d)1" },
      { id: "C", label: "(a)2 (b)1 (c)3 (d)4" },
      { id: "D", label: "(a)2 (b)3 (c)1 (d)4" },
    ],
    answer: "B",
    explanation: "வகுப்பு கலைந்தது=இடவாகு(2), கொழுந்து நட்டனர்=சினையாகு(3), பொழுது சாய்ந்தது=காலவாகு(4), கார் பெய்தது=பண்பாகு(1). விடை B.",
  },
  {
    id: 193,
    question: "வேற்றுமை உருபினை ஏற்கும்பொழுது தன்மை, முன்னிலையில் திரியும் பெயர்களைக் கண்டறிந்து பொருத்துக:\n(a)யான் (b)நீர் (c)யாம் (d)நீ – 1.உம் 2.என் 3.உன் 4.எம்",
    type: "single",
    options: [
      { id: "A", label: "(a)2 (b)3 (c)4 (d)1" },
      { id: "B", label: "(a)2 (b)1 (c)4 (d)3" },
      { id: "C", label: "(a)3 (b)1 (c)2 (d)4" },
      { id: "D", label: "(a)3 (b)4 (c)1 (d)2" },
    ],
    answer: "B",
    explanation: "யான்→என்(2), நீர்→உம்(1), யாம்→எம்(4), நீ→உன்(3). விடை B.",
  },
  {
    id: 194,
    question: "'அறுகோணம்' என்று எவ்வகைப் பெயர்?",
    type: "single",
    options: [
      { id: "A", label: "இடப்பெயர்" },
      { id: "B", label: "தொழிற்பெயர்" },
      { id: "C", label: "காலப்பெயர்" },
      { id: "D", label: "வடிவப்பண்புப் பெயர்" },
    ],
    answer: "D",
    explanation: "அறுகோணம் என்பது வடிவப்பண்புப் பெயர் (வடிவத்தை குறிக்கும் பண்புப்பெயர்). விடை D.",
  },
  {
    id: 195,
    question: "அகர வரிசையில் சொற்களை சீர்செய்தல்:\nகுங்குமம், காட்சிக்கூடம், சென்தமிழ், சொல்லேருழவர்",
    type: "single",
    options: [
      { id: "A", label: "குங்குமம், காட்சிக்கூடம், சென்தமிழ், சொல்லேருழவர்" },
      { id: "B", label: "காட்சிக்கூடம், குங்குமம், சென்தமிழ், சொல்லேருழவர்" },
      { id: "C", label: "சென்தமிழ், காட்சிக்கூடம், சொல்லேருழவர், குங்குமம்" },
      { id: "D", label: "சொல்லேருழவர், சென்தமிழ், காட்சிக்கூடம், குங்குமம்" },
    ],
    answer: "B",
    explanation: "அகர வரிசையில்: கா(காட்சிக்கூடம்), கு(குங்குமம்), செ(சென்தமிழ்), சொ(சொல்லேருழவர்). விடை B.",
  },
  {
    id: 196,
    question: "அகர வரிசைப்படி சொற்களைச் சீர்செய்தல்:\nதென்னை, துணி, தொட்டி, திண்ணன்",
    type: "single",
    options: [
      { id: "A", label: "தென்னை, துணி, தொட்டி, திண்ணன்" },
      { id: "B", label: "துணி, திண்ணன், தென்னை, தொட்டி" },
      { id: "C", label: "திண்ணன், துணி, தென்னை, தொட்டி" },
      { id: "D", label: "தொட்டி, தென்னை, துணி, திண்ணன்" },
    ],
    answer: "C",
    explanation: "அகர வரிசையில்: தி(திண்ணன்), து(துணி), தெ(தென்னை), தொ(தொட்டி). விடை C.",
  },
  {
    id: 197,
    question: '"வீழ்" என்னும் வேர்ச்சொல்லின் வினையெச்சம் கண்டறிக.',
    type: "single",
    options: [
      { id: "A", label: "வீழ்ந்த" },
      { id: "B", label: "வீழ்த்துவான்" },
      { id: "C", label: "வீழ்ந்து" },
      { id: "D", label: "வீழ்ந்தான்" },
    ],
    answer: "C",
    explanation: "வீழ் என்ற வேர்ச்சொல்லின் வினையெச்சம் 'வீழ்ந்து'. விடை C.",
  },
  {
    id: 198,
    question: '"வாழ்" என்ற வேர்ச்சொல்லின் வினைமுற்றைக் கண்டறிக.',
    type: "single",
    options: [
      { id: "A", label: "வாழ்க" },
      { id: "B", label: "வாழ்தலை" },
      { id: "C", label: "வாழாது" },
      { id: "D", label: "வாழா" },
    ],
    answer: "A",
    explanation: "வாழ்க என்பது வாழ் என்ற வேர்ச்சொல்லின் வினைமுற்று (வியங்கோள் வினைமுற்று). விடை A.",
  },
  {
    id: 199,
    question: "பொருத்துக:\n(a)விட்ட ஆகுபெயர் (b)விடாத ஆகுபெயர் (c)எண்ணளவை ஆகுபெயர் (d)காரியவாகு பெயர்\n– 1.கால் வலிக்கின்றது 2.என் பிழைப்புக் கெட்டது 3.புளி தின்றான் 4.தஞ்சாவூர் வந்தது",
    type: "single",
    options: [
      { id: "A", label: "(a)4 (b)1 (c)3 (d)2" },
      { id: "B", label: "(a)4 (b)3 (c)1 (d)2" },
      { id: "C", label: "(a)2 (b)4 (c)1 (d)3" },
      { id: "D", label: "(a)2 (b)3 (c)4 (d)1" },
    ],
    answer: "B",
    explanation: "விட்ட ஆகுபெயர்=தஞ்சாவூர் வந்தது(4), விடாத ஆகுபெயர்=புளி தின்றான்(3), எண்ணளவை ஆகுபெயர்=கால் வலிக்கின்றது(1), காரியவாகு பெயர்=என் பிழைப்புக் கெட்டது(2). விடை B.",
  },
  {
    id: 200,
    question: "பொருத்துக:\n(a)புளி நட்டான் (b)கார் அறுத்தான் (c)அறுபதம் முரலும் (d)மக்கட்சுட்டு என்மனார் புலவர்\n– 1.மும்மடி ஆகுபெயர் 2.இருபெயரொட்டு ஆகுபெயர் 3.இருமடி ஆகுபெயர் 4.அடையடுத்த ஆகுபெயர்",
    type: "single",
    options: [
      { id: "A", label: "(a)3 (b)1 (c)4 (d)2" },
      { id: "B", label: "(a)3 (b)4 (c)1 (d)2" },
      { id: "C", label: "(a)4 (b)3 (c)2 (d)1" },
      { id: "D", label: "(a)4 (b)3 (c)1 (d)2" },
    ],
    answer: "A",
    explanation: "புளி நட்டான்=மும்மடி ஆகுபெயர்(3)... விடை A: 3,1,4,2.",
  },
];

const STORAGE_KEY = "tamil_quiz_gst2am_2025";

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

export default function Gr_2_Mains_2025() {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [animDir, setAnimDir] = useState("right");

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setAnswers(saved.answers || {});
      setCurrent(saved.current || 0);
      setShowResult(saved.showResult || false);
      setSubmitted(saved.submitted || false);
    }
  }, []);

  useEffect(() => {
    saveState({ answers, current, showResult, submitted });
  }, [answers, current, showResult, submitted]);

  const q = QUESTIONS[current];
  const totalAnswered = Object.keys(answers).length;
  const score = QUESTIONS.filter((q) => answers[q.id] === q.answer).length;

  function selectAnswer(qid, opt) {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qid]: opt }));
  }

  function navigate(dir) {
    setAnimDir(dir > 0 ? "right" : "left");
    setCurrent((c) => Math.max(0, Math.min(QUESTIONS.length - 1, c + dir)));
  }

  function jumpTo(idx) {
    setAnimDir(idx > current ? "right" : "left");
    setCurrent(idx);
  }

  function toggleExpl(id) {
    setShowExplanation((e) => ({ ...e, [id]: !e[id] }));
  }

  function reset() {
    setAnswers({});
    setCurrent(0);
    setShowResult(false);
    setSubmitted(false);
    setShowExplanation({});
    localStorage.removeItem(STORAGE_KEY);
  }

  function getStatus(qid) {
    if (!submitted) return answers[qid] ? "answered" : "unanswered";
    const q = QUESTIONS.find((q) => q.id === qid);
    if (!answers[qid]) return "unanswered";
    return answers[qid] === q.answer ? "correct" : "wrong";
  }

  const statusColor = {
    answered: "#f59e0b",
    unanswered: "#374151",
    correct: "#10b981",
    wrong: "#ef4444",
  };

  if (showResult) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div style={styles.page}>
        <div style={styles.resultCard}>
          <div style={styles.resultEmoji}>{pct >= 60 ? "🏆" : pct >= 40 ? "📚" : "💪"}</div>
          <h1 style={styles.resultTitle}>முடிவுகள்</h1>
          <p style={styles.resultSub}>GST2AM/2025 – பொதுத் தமிழ் (Q141–Q200)</p>
          <div style={styles.scoreCircle}>
            <span style={styles.scoreNum}>{score}</span>
            <span style={styles.scoreDen}>/{QUESTIONS.length}</span>
          </div>
          <div style={styles.pctBar}>
            <div style={{ ...styles.pctFill, width: `${pct}%`, background: pct >= 60 ? "#10b981" : pct >= 40 ? "#f59e0b" : "#ef4444" }} />
          </div>
          <p style={styles.pctText}>{pct}% சதவீதம்</p>
          <div style={styles.resultStats}>
            <div style={styles.statBox}>
              <span style={{ color: "#10b981", fontSize: 22 }}>✓</span>
              <span style={styles.statNum}>{score}</span>
              <span style={styles.statLbl}>சரியான விடைகள்</span>
            </div>
            <div style={styles.statBox}>
              <span style={{ color: "#ef4444", fontSize: 22 }}>✗</span>
              <span style={styles.statNum}>{QUESTIONS.filter((q) => answers[q.id] && answers[q.id] !== q.answer).length}</span>
              <span style={styles.statLbl}>தவறான விடைகள்</span>
            </div>
            <div style={styles.statBox}>
              <span style={{ color: "#6b7280", fontSize: 22 }}>–</span>
              <span style={styles.statNum}>{QUESTIONS.filter((q) => !answers[q.id]).length}</span>
              <span style={styles.statLbl}>விடையளிக்கப்படாதவை</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <button style={styles.btnPrimary} onClick={() => { setShowResult(false); setSubmitted(true); setCurrent(0); }}>
              விளக்கங்களை பார்க்க
            </button>
            <button style={styles.btnSecondary} onClick={reset}>மீண்டும் தொடங்கு</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>பொதுத் தமிழ் வினாடி வினா</h1>
          <p style={styles.subtitle}>GST2AM/2025 · வினாக்கள் 141–200</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {submitted && (
            <div style={styles.scorePill}>
              <span style={{ color: "#10b981" }}>✓{score}</span>
              <span style={{ color: "#6b7280" }}> / {QUESTIONS.length}</span>
            </div>
          )}
          <button style={styles.resetBtn} onClick={reset}>↺ Reset</button>
        </div>
      </div>

      {/* Progress */}
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${((current + 1) / QUESTIONS.length) * 100}%` }} />
      </div>
      <div style={styles.progressText}>
        {current + 1} / {QUESTIONS.length} &nbsp;·&nbsp; {totalAnswered} விடையளிக்கப்பட்டது
      </div>

      {/* Question Navigator */}
      <div style={styles.navGrid}>
        {QUESTIONS.map((q, i) => (
          <button
            key={q.id}
            onClick={() => jumpTo(i)}
            style={{
              ...styles.navBtn,
              background: i === current ? "#6366f1" : statusColor[getStatus(q.id)],
              transform: i === current ? "scale(1.15)" : "scale(1)",
              fontWeight: i === current ? "bold" : "normal",
            }}
          >
            {q.id}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div style={styles.card}>
        <div style={styles.qHeader}>
          <span style={styles.qNum}>வினா {q.id}</span>
          {submitted && (
            <span style={{
              ...styles.badge,
              background: answers[q.id] === q.answer ? "#10b981" : answers[q.id] ? "#ef4444" : "#6b7280"
            }}>
              {answers[q.id] === q.answer ? "✓ சரி" : answers[q.id] ? "✗ தவறு" : "– விடை இல்லை"}
            </span>
          )}
        </div>

        <p style={styles.qText}>{q.question}</p>

        <div style={styles.optionsList}>
          {q.options.map((opt) => {
            const isSelected = answers[q.id] === opt.id;
            const isCorrect = q.answer === opt.id;
            const isNoAnswer = !q.answer;

            let bg = "transparent";
            let border = "1.5px solid #2d3748";
            let color = "#e2e8f0";

            if (submitted) {
              if (isNoAnswer) {
                bg = "transparent"; border = "1.5px solid #4b5563"; color = "#9ca3af";
              } else if (isCorrect) {
                bg = "#064e3b"; border = "2px solid #10b981"; color = "#6ee7b7";
              } else if (isSelected && !isCorrect) {
                bg = "#450a0a"; border = "2px solid #ef4444"; color = "#fca5a5";
              }
            } else if (isSelected) {
              bg = "#312e81"; border = "2px solid #818cf8"; color = "#c7d2fe";
            }

            return (
              <button
                key={opt.id}
                onClick={() => selectAnswer(q.id, opt.id)}
                style={{ ...styles.optBtn, background: bg, border, color }}
                disabled={submitted}
              >
                <span style={styles.optId}>{opt.id}</span>
                <span style={styles.optLabel}>{opt.label}</span>
                {submitted && isCorrect && <span style={{ marginLeft: "auto", color: "#10b981" }}>✓</span>}
                {submitted && isSelected && !isCorrect && <span style={{ marginLeft: "auto", color: "#ef4444" }}>✗</span>}
              </button>
            );
          })}
        </div>

        {!q.answer && (
          <div style={styles.noAnswerNote}>
            ⚠️ இந்த வினாவிற்கு தேர்வாணைய விடை குறிப்பிடப்படவில்லை (subject to examination).
          </div>
        )}

        {submitted && (
          <div style={styles.explSection}>
            <button style={styles.explToggle} onClick={() => toggleExpl(q.id)}>
              {showExplanation[q.id] ? "▲ விளக்கம் மறை" : "▼ விளக்கம் பார்"}
            </button>
            {showExplanation[q.id] && (
              <div style={styles.explBox}>
                <strong>விளக்கம்:</strong> {q.explanation}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={styles.navRow}>
        <button style={styles.navArrow} onClick={() => navigate(-1)} disabled={current === 0}>
          ← முந்தைய
        </button>

        {!submitted && current === QUESTIONS.length - 1 ? (
          <button
            style={styles.submitBtn}
            onClick={() => { setSubmitted(true); setShowResult(true); }}
          >
            சமர்ப்பி & முடிவு காண்
          </button>
        ) : !submitted ? (
          <button style={styles.submitBtnSm} onClick={() => { setSubmitted(true); setShowResult(true); }}>
            சமர்ப்பி
          </button>
        ) : null}

        <button style={styles.navArrow} onClick={() => navigate(1)} disabled={current === QUESTIONS.length - 1}>
          அடுத்து →
        </button>
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        {[["#374151", "விடையளிக்கப்படாதது"], ["#f59e0b", "விடையளிக்கப்பட்டது"], ["#10b981", "சரியான விடை"], ["#ef4444", "தவறான விடை"], ["#6366f1", "தற்போதைய வினா"]].map(([c, l]) => (
          <div key={l} style={styles.legendItem}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: c, flexShrink: 0 }} />
            <span style={{ color: "#9ca3af", fontSize: 11 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e2e8f0",
    fontFamily: "'Noto Sans Tamil', 'Latha', 'Vijaya', serif",
    padding: "16px",
    maxWidth: 820,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#818cf8",
    margin: 0,
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    margin: "4px 0 0",
  },
  scorePill: {
    background: "#1e293b",
    border: "1px solid #374151",
    borderRadius: 20,
    padding: "4px 14px",
    fontSize: 14,
  },
  resetBtn: {
    background: "#1e293b",
    border: "1px solid #374151",
    borderRadius: 8,
    color: "#9ca3af",
    padding: "6px 14px",
    cursor: "pointer",
    fontSize: 13,
  },
  progressBar: {
    height: 4,
    background: "#1e293b",
    borderRadius: 4,
    marginBottom: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#6366f1,#818cf8)",
    borderRadius: 4,
    transition: "width 0.3s ease",
  },
  progressText: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 16,
  },
  navGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 16,
  },
  navBtn: {
    width: 34,
    height: 28,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 11,
    color: "#fff",
    transition: "all 0.15s ease",
  },
  card: {
    background: "#1e293b",
    borderRadius: 14,
    padding: "20px 24px",
    marginBottom: 16,
    border: "1px solid #2d3748",
  },
  qHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  qNum: {
    background: "#312e81",
    color: "#a5b4fc",
    borderRadius: 6,
    padding: "3px 10px",
    fontSize: 13,
    fontWeight: "bold",
  },
  badge: {
    borderRadius: 20,
    padding: "3px 12px",
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  qText: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "#f1f5f9",
    marginBottom: 18,
    whiteSpace: "pre-line",
  },
  optionsList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  optBtn: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    borderRadius: 10,
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s ease",
    width: "100%",
  },
  optId: {
    background: "#0f172a",
    borderRadius: 6,
    padding: "2px 8px",
    fontSize: 13,
    fontWeight: "bold",
    flexShrink: 0,
    minWidth: 24,
    textAlign: "center",
  },
  optLabel: {
    fontSize: 14,
    lineHeight: 1.5,
    flex: 1,
  },
  noAnswerNote: {
    background: "#1c1917",
    border: "1px solid #78350f",
    color: "#fbbf24",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    marginTop: 14,
  },
  explSection: {
    marginTop: 16,
  },
  explToggle: {
    background: "#0f172a",
    border: "1px solid #374151",
    borderRadius: 8,
    color: "#818cf8",
    padding: "7px 14px",
    cursor: "pointer",
    fontSize: 13,
  },
  explBox: {
    background: "#0f172a",
    border: "1px solid #312e81",
    borderRadius: 8,
    padding: "12px 16px",
    marginTop: 8,
    fontSize: 14,
    color: "#c7d2fe",
    lineHeight: 1.7,
  },
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  navArrow: {
    background: "#1e293b",
    border: "1px solid #374151",
    borderRadius: 10,
    color: "#e2e8f0",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: 14,
    transition: "background 0.15s",
  },
  submitBtn: {
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    padding: "12px 28px",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(99,102,241,0.4)",
  },
  submitBtnSm: {
    background: "#312e81",
    border: "1px solid #6366f1",
    borderRadius: 10,
    color: "#a5b4fc",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: 13,
  },
  legend: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  // Result page
  resultCard: {
    background: "#1e293b",
    borderRadius: 20,
    padding: "40px 32px",
    maxWidth: 480,
    margin: "40px auto",
    textAlign: "center",
    border: "1px solid #2d3748",
  },
  resultEmoji: { fontSize: 56, marginBottom: 8 },
  resultTitle: { fontSize: 28, fontWeight: "bold", color: "#818cf8", margin: "0 0 4px" },
  resultSub: { fontSize: 13, color: "#6b7280", marginBottom: 24 },
  scoreCircle: {
    display: "inline-flex",
    alignItems: "baseline",
    background: "#0f172a",
    borderRadius: 16,
    padding: "16px 32px",
    marginBottom: 16,
    border: "2px solid #312e81",
  },
  scoreNum: { fontSize: 52, fontWeight: "bold", color: "#818cf8" },
  scoreDen: { fontSize: 26, color: "#6b7280", marginLeft: 4 },
  pctBar: {
    height: 8,
    background: "#0f172a",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  pctFill: {
    height: "100%",
    borderRadius: 8,
    transition: "width 0.5s ease",
  },
  pctText: { fontSize: 18, fontWeight: "bold", color: "#e2e8f0", marginBottom: 24 },
  resultStats: {
    display: "flex",
    justifyContent: "space-around",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 8,
  },
  statBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    background: "#0f172a",
    borderRadius: 10,
    padding: "12px 16px",
    minWidth: 80,
  },
  statNum: { fontSize: 24, fontWeight: "bold", color: "#e2e8f0" },
  statLbl: { fontSize: 11, color: "#6b7280" },
  btnPrimary: {
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    padding: "12px 24px",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: "bold",
  },
  btnSecondary: {
    background: "#0f172a",
    border: "1px solid #374151",
    borderRadius: 10,
    color: "#9ca3af",
    padding: "12px 24px",
    cursor: "pointer",
    fontSize: 14,
  },
};
