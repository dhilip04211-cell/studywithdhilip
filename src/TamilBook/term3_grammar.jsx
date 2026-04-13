import { useState, useEffect, useRef } from "react";

const CONTENT = {
  iyal1: {
    title: "இயல் ஒன்று – நால்வகைச் சொற்கள்",
    sections: [
      {
        heading: "சொல் – வரையறை",
        content: `தமிழில் சில எழுத்துகள் தனித்து நின்று பொருள் தரும். ஒன்றுக்கு மேற்பட்ட எழுத்துகள் தொடர்ந்து வந்தும் பொருள் தரும். இவ்வாறு பொருள் தருபவை சொல் எனப்படும்.

எ.கா.: ஈ, பூ, மை, கல், கடல், தங்கம்.

இலக்கண அடிப்படையில் சொற்கள் பெயர்ச்சொல், வினைச்சொல், இடைச்சொல், உரிச்சொல் என நான்கு வகைப்படும்.`,
      },
      {
        heading: "பெயர்ச்சொல்",
        content: `ஒன்றன் பெயரைக் குறிக்கும் சொல் பெயர்ச்சொல் எனப்படும்.

எ.கா.: பாரதி, பள்ளி, காலை, கண், நன்மை, ஓடுதல்.`,
      },
      {
        heading: "வினைச்சொல்",
        content: `வினை என்னும் சொல்லுக்குச் செயல் என்பது பொருள். செயலைக் குறிக்கும் சொல் வினைச்சொல் எனப்படும்.

எ.கா.: வா, போ, எழுது, விளையாடு.`,
      },
      {
        heading: "இடைச்சொல்",
        content: `பெயர்ச்சொல்லையும் வினைச்சொல்லையும் சார்ந்து வரும் சொல் இடைச்சொல் ஆகும். இது தனித்து இயங்காது.

எ.கா.:
• உம் – தந்தையும் தாயும்
• மற்று – மற்றொருவர்
• ஐ – திருக்குறளை`,
      },
      {
        heading: "உரிச்சொல்",
        content: `பெயர்ச்சொல், வினைச்சொல் ஆகியவற்றின் தன்மையை மிகுதிப்படுத்த வருவது உரிச்சொல் ஆகும்.

எ.கா.:
• மா – மாநகரம்
• சால – சாலச்சிறந்தது`,
      },
      {
        heading: "மதிப்பீடு – நால்வகைச் சொற்களை வகைப்படுத்துக",
        content: `1. வளவனும் தங்கையும் மாநகரப் பேருந்தில் ஏறினர்.
2. நாள்தோறும் திருக்குறளைப் படி.
3. "ஏழைக்கு உதவுதல் சாலச்சிறந்தது" என்றார் ஆசிரியர்.

கீழ்க்காணும் குறளில் உள்ள இடைச்சொல்லை எழுதுக:
மக்கள்மெய் தீண்டல் உடற்கின்பம் மற்றுஅவர்
சொற்கேட்டல் இன்பம் செவிக்கு.`,
      },
      {
        heading: "சொல்வகையை அறிந்து பொருந்தாச் சொல்லை வட்டமிடுக",
        isTable: true,
        tableData: {
          headers: ["வ.எண்", "அ", "ஆ", "இ", "ஈ"],
          rows: [
            ["1", "படித்தாள்", "ஐ", "மற்று", "கு"],
            ["2", "மதுரை", "கால்", "சித்திரை", "ஓடினான்"],
            ["3", "சென்றாள்", "வந்த", "சித்திரை", "நடந்து"],
            ["4", "மா", "ஐ", "உம்", "மற்று"],
          ],
        },
      },
      {
        heading: "குறுவினாக்கள்",
        content: `1. சொல் என்றால் என்ன?
2. சொற்களின் வகைகளை எழுதுக.
3. பெயரையும் வினையையும் சார்ந்து வரும் சொற்களை எவ்வாறு வழங்குகிறோம்?`,
      },
      {
        heading: "வ.உ.சிதம்பரனார் – பத்தி",
        content: `இந்திய விடுதலைக்குப் பாடுபட்டவர்களுள் ஒருவர் வ.உ.சிதம்பரனார். வ.உ.சி. அவர்கள் தமிழிலும் ஆங்கிலத்திலும் புலமை பெற்றிருந்தார். அவர், வழக்கறிஞர், எழுத்தாளர், பேச்சாளர், தொழிற்சங்கத் தலைவர் என்னும் பன்முகத்தன்மை பெற்றிருந்தார். ஆங்கிலேயரின் கப்பல்களுக்குப் போட்டியாக உள்நாட்டு இந்தியக் கப்பல் நிறுவனத்தைத் தொடங்கியவர். 1906 ஆம் ஆண்டு அக்டோபர் 16ஆம் நாள் "சுதேசி நாவாய்ச் சங்கம்" என்ற கப்பல் நிறுவனத்தைப் பதிவு செய்தார். வ.உ.சி. சென்னைக்குச் செல்லும்போது பாரதியாரைச் சந்திப்பதை வழக்கமாகக் கொண்டிருந்தார். மேலும், பாரதியார் பாடல்களை விரும்பிக் கேட்பார்.

வினாக்கள்:
1. சுதேசி நாவாய்ச் சங்கத்தை நிறுவியவர் யார்?
2. வ.உ.சி. சென்னைக்குச் செல்லும்போது யாரைச் சந்திப்பதை வழக்கமாகக் கொண்டிருந்தார்?
3. வ. உ.சி. அவர்கள் யாருடைய பாடல்களை விரும்பிக் கேட்பார்?
4. வ. உ. சி. அவர்களின் பன்முகத் தன்மைகள் யாவை?
5. வ. உ. சி. அவர்கள் புலமை பெற்றிருந்த மொழிகள் யாவை?`,
      },
      {
        heading: "இடம் அறிந்து பயன்படுத்துவோம் – ஓர் / ஒரு",
        content: `ஒன்று என்பதைக் குறிக்க ஓர், ஒரு ஆகிய இரண்டு சொற்களும் பயன்படுகின்றன.

• உயிரெழுத்தில் தொடங்கும் சொல்லுக்கு முன் ஓர் என்னும் சொல்லைப் பயன்படுத்த வேண்டும்.
• உயிர்மெய்யெழுத்தில் தொடங்கும் சொல்லுக்கு முன் ஒரு என்னும் சொல்லைப் பயன்படுத்த வேண்டும்.

எ.கா.:
• ஓர் ஊர் | ஓர் ஏரி
• ஒரு நகரம் | ஒரு கடல்

அது / அஃது:
• உயிரெழுத்தில் தொடங்கும் சொல்லுக்கு முன் – அஃது (எ.கா.: அஃது இங்கே உள்ளது)
• உயிர்மெய்யெழுத்தில் தொடங்கும் சொல்லுக்கு முன் – அது (எ.கா.: அது நன்றாக உள்ளது)

பிழைகளைத் திருத்துக:
1. ஒரு அழகிய சிற்றூரில் ஓர் குளம் இருந்தது. → ஓர் அழகிய சிற்றூரில் ஒரு குளம் இருந்தது.
2. ஒரு இரவும் ஓர் பகலும் → ஓர் இரவும் ஒரு பகலும்
3. அது இல்லாத இடத்தில் → அஃது இல்லாத இடத்தில்
4. அஃது நகரத்திற்குச் → அது நகரத்திற்குச்
5. அது ஒரு இனிய பாடல். → அஃது ஓர் இனிய பாடல்.`,
      },
      {
        heading: "அகரவரிசைப்படுத்துக",
        content: `பெண்கள், பாரதம், புதுமை, பீலி, பேருந்து, பூமி, பழங்கள், பொதுக்கூட்டம், பையன், போக்குவரத்து, பின்னிரவு`,
      },
      {
        heading: "கட்டங்களில் மறைந்துள்ள நால்வகைச் சொற்களை எழுதுக",
        isMatchTable: true,
        matchData: [
          { question: "பெயர்ச்சொல் (எ.கா.)", answer: "குமரன்" },
          { question: "இடைச்சொல்", answer: "உம், மற்று, ஐ, மா" },
          { question: "வினைச்சொல்", answer: "நடக்கிறாள்" },
          { question: "உரிச்சொல்", answer: "மா" },
        ],
      },
      {
        heading: "கட்டங்களில் உள்ள சொற்களைக் கொண்டு தொடர்கள் உருவாக்குக",
        isMatchTable: true,
        matchData: [
          { question: "பாரி + வீட்டுக்கு + வந்தன", answer: "பாரி வீட்டுக்கு வந்தனர்" },
          { question: "எழிலி + வீட்டுக்கு + வந்தாள்", answer: "எழிலி வீட்டுக்கு வந்தாள்" },
          { question: "மாணவர்கள் + வீட்டுக்கு + வந்தனர்", answer: "மாணவர்கள் வீட்டுக்கு வந்தனர்" },
          { question: "மாடு + வீட்டுக்கு + வந்தது", answer: "மாடு வீட்டுக்கு வந்தது" },
          { question: "மாடுகள் + வீட்டுக்கு + வந்தன", answer: "மாடுகள் வீட்டுக்கு வந்தன" },
        ],
      },
      {
        heading: "என் பொறுப்புகள்",
        content: `1. தாய் தந்தையின் வீட்டு வேலைகளில் என்னால் முடிந்த உதவிகளைச் செய்வேன்.
2. பள்ளி, பொது இடங்களில் உள்ள பொருட்களை உடைக்காமல் பாதுகாப்பேன்.
3. தமிழ்த்தாய் வாழ்த்து, நாட்டுப்பண், தேசியக்கொடி முதலியவற்றிற்கு உரிய மரியாதை தருவேன்.`,
      },
      {
        heading: "கலைச்சொல் அறிவோம்",
        isMatchTable: true,
        matchData: [
          { question: "நாட்டுப்பற்று", answer: "Patriotism" },
          { question: "இலக்கியம்", answer: "Literature" },
          { question: "கலைக்கூடம்", answer: "Art Gallery" },
          { question: "மெய்யுணர்வு", answer: "Knowledge of Reality" },
        ],
      },
    ],
  },
  iyal2: {
    title: "இயல் இரண்டு – பெயர்ச்சொல்",
    sections: [
      {
        heading: "பெயர்ச்சொல் – வரையறையும் வகைகளும்",
        content: `மரம், பள்ளிக்கூடம், சித்திரை, கிளை, இனிப்பு, பாடுதல் ஆகிய சொற்களைக் கவனியுங்கள். இவை அனைத்தும் பெயரைக் குறிக்கின்றன. இவ்வாறு ஒன்றன் பெயரைக் குறிக்கும் சொல் பெயர்ச்சொல் எனப்படும். பெயர்ச்சொல் ஆறு வகைப்படும்.

அவையாவன:
1. பொருட்பெயர்
2. இடப்பெயர்
3. காலப்பெயர்
4. சினைப்பெயர்
5. பண்புப்பெயர்
6. தொழிற்பெயர்`,
      },
      {
        heading: "அறுவகைப் பெயர்ச்சொற்கள் – விளக்கம்",
        isMatchTable: true,
        matchData: [
          { question: "பொருட்பெயர்", answer: "பொருளைக் குறிக்கும் பெயர். உயிருள்ள பொருள்களையும் உயிரற்ற பொருள்களையும் குறிக்கும். எ.கா.: மரம், செடி, மயில், பறவை, புத்தகம், நாற்காலி." },
          { question: "இடப்பெயர்", answer: "ஓர் இடத்தின் பெயரைக் குறிக்கும் பெயர். எ.கா.: சென்னை, பள்ளி, பூங்கா, தெரு." },
          { question: "காலப்பெயர்", answer: "காலத்தைக் குறிக்கும் பெயர். எ.கா.: நிமிடம், நாள், வாரம், சித்திரை, ஆண்டு." },
          { question: "சினைப்பெயர்", answer: "பொருளின் உறுப்பைக் குறிக்கும் பெயர். எ.கா.: கண், கை, இலை, கிளை." },
          { question: "பண்புப்பெயர்", answer: "பொருளின் பண்பைக் குறிக்கும் பெயர். எ.கா.: வட்டம், சதுரம், செம்மை, நன்மை." },
          { question: "தொழிற்பெயர்", answer: "தொழிலைக் குறிக்கும் பெயர். எ.கா.: படித்தல், ஆடுதல், நடித்தல்." },
        ],
      },
      {
        heading: "அறுவகைப் பெயர்ச்சொற்களுக்கான சான்றுகள் – தொடரில்",
        content: `காவியா புத்தகம் படித்தாள் – பொருட்பெயர்
காவியா பள்ளிக்குச் சென்றாள் – இடப்பெயர்
காவியா மாலையில் விளையாடினாள் – காலப்பெயர்
காவியா தலை அசைத்தாள் – சினைப்பெயர்
காவியா இனிமையாகப் பேசுவாள் – பண்புப்பெயர்
காவியாவுக்கு நடனம் ஆடுதல் பிடிக்கும் – தொழிற்பெயர்`,
      },
      {
        heading: "இடுகுறிப்பெயர் – வரையறை",
        content: `நம் முன்னோர் சில பொருள்களுக்குக் காரணம் கருதாமல் பெயரிட்டு வழங்கினர். அவ்வாறு இட்டு வழங்கிய பெயர்கள் இடுகுறிப்பெயர்கள் ஆகும்.

எ.கா.: மண், மரம், காற்று

இடுகுறிப்பெயர் இரண்டு வகைப்படும்:

1. இடுகுறிப் பொதுப்பெயர்:
ஓர் இடுகுறிப்பெயர் அத்தன்மை உடைய எல்லாப் பொருள்களையும் பொதுவாகக் குறிப்பது இடுகுறிப் பொதுப்பெயர் எனப்படும்.
எ.கா.: மரம், காடு.

2. இடுகுறிச் சிறப்புப்பெயர்:
ஓர் இடுகுறிப்பெயர் குறிப்பாக ஒரு பொருளை மட்டும் குறிப்பது இடுகுறிச் சிறப்புப்பெயர் எனப்படும்.
எ.கா.: மா, கருவேலங்காடு.`,
      },
      {
        heading: "காரணப்பெயர் – வரையறை",
        content: `நம் முன்னோர் சில பொருள்களுக்குக் காரணம் கருதிப் பெயரிட்டனர். இவ்வாறு காரணத்தோடு ஒரு பொருளுக்கு வழங்கும் பெயர் காரணப்பெயர் எனப்படும்.

எ.கா.: நாற்காலி, கரும்பலகை

காரணப்பெயர் இரு வகைப்படும்:

1. காரணப் பொதுப்பெயர்:
காரணப்பெயர் குறிப்பிட்ட காரணமுடைய எல்லாப் பொருள்களையும் பொதுவாகக் குறித்தால் அது காரணப்பொதுப்பெயர் எனப்படும்.
எ.கா.: பறவை, அணி.

2. காரணச் சிறப்புப்பெயர்:
குறிப்பிட்ட காரணமுடைய எல்லாப் பொருள்களுள் ஒன்றை மட்டும் சிறப்பாகக் குறிப்பது காரணச்சிறப்புப்பெயர் ஆகும்.
எ.கா.: வளையல், மரங்கொத்தி.`,
      },
      {
        heading: "மதிப்பீடு – சரியான விடையைத் தேர்ந்தெடு",
        content: `1. இடுகுறிப்பெயரை வட்டமிடுக:
அ) பறவை  ஆ) மண்  இ) முக்காலி  ஈ) மரங்கொத்தி
(விடை: ஆ – மண்)

2. காரணப்பெயரை வட்டமிடுக:
அ) மரம்  ஆ) வளையல்  இ) சுவர்  ஈ) யானை
(விடை: ஆ – வளையல்)

3. இடுகுறிச்சிறப்புப் பெயரை வட்டமிடுக:
அ) வயல்  ஆ) வாழை  இ) மீன்கொத்தி  ஈ) பறவை
(விடை: ஆ – வாழை)`,
      },
      {
        heading: "குறுவினா",
        content: `1. பெயர்ச்சொல் எத்தனை வகைப்படும்? அவை யாவை?
(விடை: ஆறு வகை – பொருட்பெயர், இடப்பெயர், காலப்பெயர், சினைப்பெயர், பண்புப்பெயர், தொழிற்பெயர்)

2. இடுகுறிப்பெயர் என்றால் என்ன?
(விடை: காரணம் கருதாமல் பெயரிட்டு வழங்கும் பெயர்)

3. காரணப்பெயர் என்றால் என்ன?
(விடை: காரணம் கருதிப் பெயரிட்டு வழங்கும் பெயர்)`,
      },
      {
        heading: "பின்வரும் தொடர்களில் உள்ள பெயர்ச்சொற்கள் எவ்வகைப் பெயர்கள்",
        isMatchTable: true,
        matchData: [
          { question: "கைகள் இரண்டும் பிறர்க்கு உதவவே எனச் சான்றோர் கருதினர்", answer: "சினைப்பெயர் (கைகள்)" },
          { question: "அறம், பொருள், இன்பம், வீடு அடைதல் நூலின் பயனாகும்", answer: "தொழிற்பெயர் (அடைதல்)" },
          { question: "குழந்தை தெருவில் விளையாடியது", answer: "இடப்பெயர் (தெருவில்)" },
          { question: "நீதிநூல் பயில் என்கிறார் பாரதியார்", answer: "பொருட்பெயர் (நூல்)" },
          { question: "மாலை முழுதும் விளையாட்டு", answer: "காலப்பெயர் (மாலை)" },
          { question: "அன்பு நிறைய உடையவர்கள் மேலோர்", answer: "பண்புப்பெயர் (அன்பு)" },
        ],
      },
      {
        heading: "பெயர்ச்சொற்கள் வகை – பாடல் வரிகளில்",
        isMatchTable: true,
        matchData: [
          { question: "விடியலில் துயில் எழுந்தேன்", answer: "காலப்பெயர் (விடியல்)" },
          { question: "இறைவனைக் கை தொழுதேன்", answer: "சினைப்பெயர் (கை)" },
          { question: "நான் மதுரைக்குச் சென்றேன்", answer: "இடப்பெயர் (மதுரை)" },
          { question: "புத்தகம் வாங்கி வந்தேன்", answer: "பொருட்பெயர் (புத்தகம்)" },
          { question: "கற்றலைத் தொடர்வோம் இனி", answer: "தொழிற்பெயர் (கற்றல்)" },
          { question: "நன்மைகள் பெருகும் நனி", answer: "பண்புப்பெயர் (நன்மை)" },
        ],
      },
      {
        heading: "கட்டங்களில் உள்ள வார்த்தைகளைக் கொண்டு தொடர்கள் அமைக்க",
        content: `யாதும் ஊரே யாவரும் கேளிர்
தீதும் நன்றும் பிறர்தர வாரா
வாய்மையே வெல்லும்`,
      },
      {
        heading: "சொற்றொடரை முறையாக வரிசைப்படுத்துக – மணிமேகலை",
        content: `1. மணிமேகலை மணிபல்லவத் தீவிற்குச் சென்றாள்.
2. அமுதசுரபியைப் பெற்றாள்.
3. ஆதிரையிடம் சென்று முதல் உணவைப் பெற்றாள்.
4. சிறைச் சாலைக்குச் சென்று உணவிட்டாள்.
5. சிறைக் கோட்டத்தை அறக்கோட்டமாக மாற்றுமாறு மன்னனிடம் வேண்டினாள்.`,
      },
      {
        heading: "ஒலி வேறுபாடறிந்து வாக்கியத்தில் அமைத்து எழுதுக",
        content: `1. அரம் – கொல்லன் கனலில் அரம் சூடேற்றினான்.
   அறம் – அறம் செய்வதே சிறந்த வாழ்க்கை.

2. மனம் – மனம் தூய்மையாக இருக்க வேண்டும்.
   மணம் – மலரின் மணம் கமழ்கிறது.`,
      },
      {
        heading: "இருபொருள் தருக",
        content: `எ.கா.: ஆறு – நதி / எண்

1. திங்கள் – வாரத்தின் ஒரு நாள் / நிலவு (சந்திரன்)
2. ஓடு – ஓடுவிக்கும் பாத்திரம் / வேகமாக நடத்தல்
3. நகை – ஆபரணம் / சிரிப்பு`,
      },
    ],
  },
  iyal3: {
    title: "இயல் மூன்று – அணி இலக்கணம்",
    sections: [
      {
        heading: "அணி இலக்கணம் – அறிமுகம்",
        content: `எதிலும் அழகைக் காண விரும்புவது மனிதர்களின் இயல்பு. நாம் நம்மை அணிகலன்களால் அழகுபடுத்திக் கொள்கிறோம். அதுபோல் கவிஞர்கள் தங்கள் கற்பனைத் திறத்தாலும் புலமையாலும் தாங்கள் இயற்றும் பாடல்களில் அழகைச் சேர்க்கின்றனர். இதனை விளக்குவது அணி இலக்கணம் ஆகும்.

அணி என்பதற்கு அழகு என்பது பொருள்.

கவிஞர் தமது கருத்தைச் சுவையோடு சொல்வதற்கு உதவுவது அணி. மருந்தைத் தேனில் கலந்து கொடுப்பது போல் கருத்துகளைச் சுவைபடக் கூறுவது அணியாகும்.`,
      },
      {
        heading: "இயல்பு நவிற்சி அணி",
        content: `ஒரு பொருளின் இயல்பை உள்ளது உள்ளபடியே அழகுடன் கூறுவது இயல்பு நவிற்சி அணி ஆகும். இதனைத் தன்மை நவிற்சி அணி என்றும் கூறுவர்.

எ.கா.:
தோட்டத்தில் மேயுது வெள்ளைப்பசு – அங்கே
துள்ளிக் குதிக்குது கன்றுக்குட்டி
அம்மா என்குது வெள்ளைப்பசு – உடன்
அண்டையில் ஓடுது கன்றுக்குட்டி
நாவால் நக்குது வெள்ளைப்பசு – பாலை
நன்றாய்க் குடிக்குது கன்றுக்குட்டி
                     – கவிமணி தேசிக விநாயகனார்

இப்பாடலில் கவிஞர் பசுவும் கன்றும் ஒன்றுடன் ஒன்று கொஞ்சி விளையாடுவதை இயல்பாக எடுத்துக் கூறியுள்ளார். எனவே இது இயல்பு நவிற்சி அணி ஆகும்.`,
      },
      {
        heading: "உயர்வு நவிற்சி அணி",
        content: `ஒரு பொருளின் இயல்பை மிகைப்படுத்தி அழகுடன் கூறுவது உயர்வு நவிற்சி அணி ஆகும்.

எ.கா.:
குளிர்நீரில் குளித்தால்
கூதல் அடிக்குமென்று
வெந்நீரில் குளித்தால்
மேலே கருக்குமென்று
ஆகாச கங்கை
அனல் உறைக்குமென்று
பாதாள கங்கையைப்
பாடி அழைத்தார் உன் தாத்தா

என்று ஒரு தாய் தாலாட்டுப் பாடுகிறாள். இதில் உயர்வு நவிற்சி அணி அமைந்துள்ளது.`,
      },
      {
        heading: "குறுவினா",
        content: `1. உள்ளதை உள்ளவாறு கூறும் அணியின் பெயர் யாது?
விடை: இயல்பு நவிற்சி அணி (தன்மை நவிற்சி அணி என்றும் கூறுவர்)

2. உயர்வு நவிற்சி அணி என்பது யாது?
விடை: ஒரு பொருளின் இயல்பை மிகைப்படுத்தி அழகுடன் கூறுவது உயர்வு நவிற்சி அணி ஆகும்.`,
      },
      {
        heading: "கற்பவை கற்றபின் – பாடல் பகுப்பாய்வு",
        content: `பின்வரும் பாடலைப் படித்து இதில் அமைந்துள்ள அணியைக் குறிப்பிடுக:

ஆறு சக்கரம் நூறு வண்டி
அழகான ரயிலு வண்டி
மாடு கன்னு இல்லாமத்தான்
மாயமாத்தான் ஓடுது
உப்புப் பாரம் ஏத்தும் வண்டி
உப்பிலிப் பாளையம் போகும் வண்டி

(இப்பாடலில் உயர்வு நவிற்சி அணி அமைந்துள்ளது – மாடு இல்லாமலே வண்டி மாயமாக ஓடுவது என்று மிகைப்படுத்தி கூறப்பட்டுள்ளது.)`,
      },
      {
        heading: "படித்து உணர்க – செல்வி கதை",
        content: `செல்வி பள்ளிக்கூட மைதானத்தில் அமர்ந்து இருந்தாள். அங்கு ஓடி வந்த முத்து, "செல்வி, உன்னைத் தலைமை ஆசிரியர் அழைக்கிறார்" என்று கூறியவாறே அவளுடைய சக்கர நாற்காலியைத் தலைமை ஆசிரியர் அறையை நோக்கித் தள்ளிக் கொண்டு போனான். தலைமை ஆசிரியர் செல்வியை ஆறாம் வகுப்பிற்கு அழைத்துச் சென்றார்.

வகுப்பறைக் கதவு மூடப்பட்டிருந்தது. கதவைத் திறந்ததும் மாணவர்கள் அனைவரும் பிறந்த நாள் வாழ்த்துக் கூறினர். மெழுகுவர்த்திகள் ஒளி வீசின. காகிதத் தோரணங்களால் வகுப்பறை அலங்கரிக்கப்பட்டு இருந்தது. பலூன்கள் 'பட்பட்' என வெடித்தன. மாணவர்கள் அவளுக்குப் பிறந்த நாள் வாழ்த்துப் பாடினர். செல்வியின் கண்களில் ஆனந்தக் கண்ணீர் வழிந்தது.`,
      },
      {
        heading: "மூன்று காலங்களை காட்டும் சொற்றொடர்கள்",
        isMatchTable: true,
        matchData: [
          { question: "நேற்று", answer: "எங்கள் ஊரில் மழை பெய்தது" },
          { question: "இன்று", answer: "எங்கள் ஊரில் மழை பெய்கிறது" },
          { question: "நாளை", answer: "எங்கள் ஊரில் மழை பெய்யும்" },
        ],
      },
      {
        heading: "அகரவரிசைப்படுத்துக",
        content: `ஒழுக்கம், உயிர், ஆடு, எளிமை, அன்பு, இரக்கம், ஓசை, ஐந்து, ஈதல், ஊக்கம், ஏது, ஔவை

(அகரவரிசை: அன்பு, ஆடு, இரக்கம், ஈதல், உயிர், ஊக்கம், எளிமை, ஏது, ஐந்து, ஒழுக்கம், ஓசை, ஔவை)`,
      },
      {
        heading: "கட்டங்களில் மறைந்துள்ள அணிகலன்களின் பெயர்களை எழுதுக",
        content: `எ.கா.: கம்மல்
(கட்டத்தில் மறைந்துள்ள அணிகலன்கள்: கம்மல், மோதிரம், சூடகம், மலர்மாலை, கடுக்கன்)`,
      },
      {
        heading: "கலைச்சொல் அறிவோம்",
        isMatchTable: true,
        matchData: [
          { question: "மனிதநேயம்", answer: "Humanity" },
          { question: "கருணை", answer: "Mercy" },
          { question: "உறுப்பு மாற்று அறுவைசிகிச்சை", answer: "Transplantation" },
          { question: "நோபல் பரிசு", answer: "Nobel Prize" },
          { question: "சரக்குந்து", answer: "Lorry" },
          { question: "அறக்கட்டளை", answer: "Trust" },
          { question: "தன்னார்வலர்", answer: "Volunteer" },
          { question: "இளம் செஞ்சிலுவைச் சங்கம்", answer: "Junior Red Cross" },
          { question: "சாரண சாரணியர்", answer: "Scouts & Guides" },
          { question: "சமூகப் பணியாளர்", answer: "Social Worker" },
        ],
      },
      {
        heading: "என் பொறுப்புகள்",
        content: `1. உணவை வீணாக்க மாட்டேன்.
2. நீரைச் சிக்கனமாகப் பயன்படுத்துவேன்.
3. பயணம் செய்யும் போது தேவைப்படுவோருக்கு எழுந்து இடம் தருவேன்.
4. எல்லா உயிர்களிடத்தும் அன்பு செலுத்துவேன்.
5. நான் எல்லாரிடமும் அன்பு காட்டுவேன்.
6. உறுப்புக்கொடையின் இன்றியமையாமையை எனக்குத் தெரிந்தவர்களிடம் எடுத்துச் சொல்வேன்.
7. பிறருக்கு என்னால் இயன்ற உதவியைச் செய்வேன்.
8. பிற உயிர்களைத் துன்புறுத்த மாட்டேன்.
9. எப்போதும் மனிதநேயத்துடன் நடந்து கொள்வேன்.`,
      },
    ],
  },
};

const QUIZ_QUESTIONS = [
  { q: "தமிழில் பொருள் தருபவை எவ்வாறு அழைக்கப்படும்?", opts: ["வாக்கியம்", "சொல்", "எழுத்து", "தொடர்"], ans: 1 },
  { q: "இலக்கண அடிப்படையில் சொற்கள் எத்தனை வகைப்படும்?", opts: ["மூன்று", "ஐந்து", "நான்கு", "ஆறு"], ans: 2 },
  { q: "ஒன்றன் பெயரைக் குறிக்கும் சொல் எவ்வாறு அழைக்கப்படும்?", opts: ["வினைச்சொல்", "இடைச்சொல்", "உரிச்சொல்", "பெயர்ச்சொல்"], ans: 3 },
  { q: "செயலைக் குறிக்கும் சொல் எது?", opts: ["பெயர்ச்சொல்", "வினைச்சொல்", "இடைச்சொல்", "உரிச்சொல்"], ans: 1 },
  { q: "இடைச்சொல்லின் தன்மை என்ன?", opts: ["தனித்து இயங்கும்", "தனித்து இயங்காது", "பொருள் தராது", "எழுத்தாக இருக்கும்"], ans: 1 },
  { q: "பெயர்ச்சொல், வினைச்சொல் ஆகியவற்றின் தன்மையை மிகுதிப்படுத்த வருவது எது?", opts: ["இடைச்சொல்", "உரிச்சொல்", "வினைச்சொல்", "சொல்"], ans: 1 },
  { q: "'மாநகரம்' என்பதில் 'மா' எவ்வகைச் சொல்?", opts: ["பெயர்ச்சொல்", "வினைச்சொல்", "இடைச்சொல்", "உரிச்சொல்"], ans: 3 },
  { q: "'தந்தையும் தாயும்' என்பதில் 'உம்' எவ்வகைச் சொல்?", opts: ["பெயர்ச்சொல்", "வினைச்சொல்", "இடைச்சொல்", "உரிச்சொல்"], ans: 2 },
  { q: "பெயர்ச்சொல் எத்தனை வகைப்படும்?", opts: ["நான்கு", "ஐந்து", "ஆறு", "ஏழு"], ans: 2 },
  { q: "பொருளைக் குறிக்கும் பெயர் எது?", opts: ["இடப்பெயர்", "காலப்பெயர்", "பொருட்பெயர்", "சினைப்பெயர்"], ans: 2 },
  { q: "ஓர் இடத்தின் பெயரைக் குறிக்கும் பெயர் எது?", opts: ["பொருட்பெயர்", "இடப்பெயர்", "காலப்பெயர்", "தொழிற்பெயர்"], ans: 1 },
  { q: "காலத்தைக் குறிக்கும் பெயர் எது?", opts: ["பண்புப்பெயர்", "சினைப்பெயர்", "தொழிற்பெயர்", "காலப்பெயர்"], ans: 3 },
  { q: "பொருளின் உறுப்பைக் குறிக்கும் பெயர் எது?", opts: ["சினைப்பெயர்", "பண்புப்பெயர்", "பொருட்பெயர்", "காலப்பெயர்"], ans: 0 },
  { q: "பொருளின் பண்பைக் குறிக்கும் பெயர் எது?", opts: ["சினைப்பெயர்", "இடப்பெயர்", "பண்புப்பெயர்", "தொழிற்பெயர்"], ans: 2 },
  { q: "தொழிலைக் குறிக்கும் பெயர் எது?", opts: ["காலப்பெயர்", "சினைப்பெயர்", "பண்புப்பெயர்", "தொழிற்பெயர்"], ans: 3 },
  { q: "'படித்தல்' என்பது எவ்வகைப் பெயர்?", opts: ["பொருட்பெயர்", "இடப்பெயர்", "தொழிற்பெயர்", "காலப்பெயர்"], ans: 2 },
  { q: "'சித்திரை' என்பது எவ்வகைப் பெயர்?", opts: ["பொருட்பெயர்", "காலப்பெயர்", "இடப்பெயர்", "சினைப்பெயர்"], ans: 1 },
  { q: "'கண்' என்பது எவ்வகைப் பெயர்?", opts: ["பண்புப்பெயர்", "தொழிற்பெயர்", "சினைப்பெயர்", "பொருட்பெயர்"], ans: 2 },
  { q: "'நன்மை' என்பது எவ்வகைப் பெயர்?", opts: ["பண்புப்பெயர்", "சினைப்பெயர்", "இடப்பெயர்", "காலப்பெயர்"], ans: 0 },
  { q: "'சென்னை' என்பது எவ்வகைப் பெயர்?", opts: ["பொருட்பெயர்", "காலப்பெயர்", "இடப்பெயர்", "சினைப்பெயர்"], ans: 2 },
  { q: "காரணம் கருதாமல் பெயரிட்டு வழங்கும் பெயர் எது?", opts: ["காரணப்பெயர்", "இடுகுறிப்பெயர்", "சிறப்புப்பெயர்", "பொதுப்பெயர்"], ans: 1 },
  { q: "காரணம் கருதிப் பெயரிட்டு வழங்கும் பெயர் எது?", opts: ["இடுகுறிப்பெயர்", "சிறப்புப்பெயர்", "காரணப்பெயர்", "பொதுப்பெயர்"], ans: 2 },
  { q: "'மண்' என்பது எவ்வகைப் பெயர்?", opts: ["காரணப்பெயர்", "இடுகுறிப்பெயர்", "சிறப்புப்பெயர்", "காரணச்சிறப்புப்பெயர்"], ans: 1 },
  { q: "'நாற்காலி' என்பது எவ்வகைப் பெயர்?", opts: ["இடுகுறிப்பெயர்", "இடுகுறிச்சிறப்புப்பெயர்", "காரணப்பொதுப்பெயர்", "காரணச்சிறப்புப்பெயர்"], ans: 3 },
  { q: "'மரங்கொத்தி' என்பது எவ்வகைப் பெயர்?", opts: ["இடுகுறிப்பொதுப்பெயர்", "இடுகுறிச்சிறப்புப்பெயர்", "காரணப்பொதுப்பெயர்", "காரணச்சிறப்புப்பெயர்"], ans: 3 },
  { q: "'மரம்' என்பது எவ்வகைப் பெயர்?", opts: ["இடுகுறிப்பொதுப்பெயர்", "காரணச்சிறப்புப்பெயர்", "காரணப்பொதுப்பெயர்", "இடுகுறிச்சிறப்புப்பெயர்"], ans: 0 },
  { q: "'மா' என்பது எவ்வகைப் பெயர்?", opts: ["இடுகுறிப்பொதுப்பெயர்", "இடுகுறிச்சிறப்புப்பெயர்", "காரணப்பொதுப்பெயர்", "காரணச்சிறப்புப்பெயர்"], ans: 1 },
  { q: "அணி என்பதற்கு என்ன பொருள்?", opts: ["செல்வம்", "அழகு", "வலிமை", "சொல்"], ans: 1 },
  { q: "ஒரு பொருளின் இயல்பை உள்ளது உள்ளபடியே அழகுடன் கூறுவது எந்த அணி?", opts: ["உயர்வு நவிற்சி அணி", "இயல்பு நவிற்சி அணி", "உவமை அணி", "உருவக அணி"], ans: 1 },
  { q: "இயல்பு நவிற்சி அணிக்கு வேறு பெயர் என்ன?", opts: ["உயர்வு நவிற்சி அணி", "உவமை அணி", "தன்மை நவிற்சி அணி", "இயல்பு அணி"], ans: 2 },
  { q: "ஒரு பொருளின் இயல்பை மிகைப்படுத்தி அழகுடன் கூறுவது எந்த அணி?", opts: ["இயல்பு நவிற்சி அணி", "உயர்வு நவிற்சி அணி", "உவமை அணி", "தன்மை நவிற்சி அணி"], ans: 1 },
  { q: "கவிமணி தேசிக விநாயகனாரின் 'பசு-கன்று' பாடல் எந்த அணிக்கு எடுத்துக்காட்டு?", opts: ["உயர்வு நவிற்சி அணி", "உவமை அணி", "இயல்பு நவிற்சி அணி", "உருவக அணி"], ans: 2 },
  { q: "சுதேசி நாவாய்ச் சங்கத்தை நிறுவியவர் யார்?", opts: ["பாரதியார்", "வ.உ.சிதம்பரனார்", "காந்தியடிகள்", "வேலுநாச்சியார்"], ans: 1 },
  { q: "சுதேசி நாவாய்ச் சங்கம் எந்த ஆண்டு பதிவு செய்யப்பட்டது?", opts: ["1905", "1907", "1906", "1908"], ans: 2 },
  { q: "சுதேசி நாவாய்ச் சங்கம் எந்த நாளில் பதிவு செய்யப்பட்டது?", opts: ["அக்டோபர் 15", "அக்டோபர் 16", "அக்டோபர் 17", "அக்டோபர் 18"], ans: 1 },
  { q: "உயிரெழுத்தில் தொடங்கும் சொல்லுக்கு முன் எந்த சொல் வரும்?", opts: ["ஒரு", "ஓர்", "அது", "அஃது"], ans: 1 },
  { q: "உயிர்மெய்யெழுத்தில் தொடங்கும் சொல்லுக்கு முன் எந்த சொல் வரும்?", opts: ["ஓர்", "ஒரு", "அஃது", "அது"], ans: 1 },
  { q: "உயிரெழுத்தில் தொடங்கும் சொல்லுக்கு முன் எந்த வடிவம் வரும்?", opts: ["அது", "ஒரு", "அஃது", "ஓர்"], ans: 2 },
  { q: "'கு' என்பது எவ்வகைச் சொல்?", opts: ["பெயர்ச்சொல்", "வினைச்சொல்", "இடைச்சொல்", "உரிச்சொல்"], ans: 2 },
  { q: "'ஓடினான்' என்பது எவ்வகைச் சொல்?", opts: ["பெயர்ச்சொல்", "வினைச்சொல்", "இடைச்சொல்", "உரிச்சொல்"], ans: 1 },
  { q: "'சித்திரை' என்பது நால்வகைச் சொற்களுள் எது?", opts: ["வினைச்சொல்", "இடைச்சொல்", "உரிச்சொல்", "பெயர்ச்சொல்"], ans: 3 },
  { q: "வ.உ.சி. அவர்கள் புலமை பெற்றிருந்த மொழிகள் எவை?", opts: ["தமிழ் மட்டும்", "ஆங்கிலம் மட்டும்", "தமிழும் ஆங்கிலமும்", "தமிழ், ஆங்கிலம், சமஸ்கிருதம்"], ans: 2 },
  { q: "'வளையல்' என்பது எவ்வகைப் பெயர்?", opts: ["இடுகுறிப்பெயர்", "காரணச்சிறப்புப்பெயர்", "காரணப்பொதுப்பெயர்", "இடுகுறிப்பொதுப்பெயர்"], ans: 1 },
  { q: "Patriotism என்பதன் தமிழ் கலைச்சொல் என்ன?", opts: ["மனிதநேயம்", "நாட்டுப்பற்று", "இலக்கியம்", "கலைக்கூடம்"], ans: 1 },
  { q: "Humanity என்பதன் தமிழ் கலைச்சொல் என்ன?", opts: ["கருணை", "மனிதநேயம்", "உதவி", "அன்பு"], ans: 1 },
  { q: "Art Gallery என்பதன் தமிழ் கலைச்சொல் என்ன?", opts: ["நாட்டுப்பற்று", "இலக்கியம்", "கலைக்கூடம்", "மெய்யுணர்வு"], ans: 2 },
  { q: "Literature என்பதன் தமிழ் கலைச்சொல் என்ன?", opts: ["கலைக்கூடம்", "இலக்கியம்", "நாட்டுப்பற்று", "மனிதநேயம்"], ans: 1 },
  { q: "இடுகுறிப்பொதுப்பெயருக்கு எடுத்துக்காட்டு எது?", opts: ["மா", "கருவேலங்காடு", "மரம்", "வளையல்"], ans: 2 },
  { q: "காரணப்பொதுப்பெயருக்கு எடுத்துக்காட்டு எது?", opts: ["மரங்கொத்தி", "வளையல்", "பறவை", "மா"], ans: 2 },
  { q: "அணி இலக்கணம் என்பது எதை விளக்குகிறது?", opts: ["இசையை", "கவிதையில் அழகை", "இலக்கணத்தை", "எழுத்துகளை"], ans: 1 },
  { q: "Volunteer என்பதன் தமிழ் கலைச்சொல் என்ன?", opts: ["அறக்கட்டளை", "தன்னார்வலர்", "சமூகப்பணியாளர்", "இளம் செஞ்சிலுவை"], ans: 1 },
  { q: "Nobel Prize என்பதன் தமிழ் கலைச்சொல் என்ன?", opts: ["கருணை", "மனிதநேயம்", "நோபல் பரிசு", "சரக்குந்து"], ans: 2 },
  { q: "Transplantation என்பதன் தமிழ் கலைச்சொல் என்ன?", opts: ["உறுப்பு மாற்று அறுவைசிகிச்சை", "கருணை", "நோபல் பரிசு", "மனிதநேயம்"], ans: 0 },
];

const GAME_TIME = 15;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tiro+Tamil:ital@0;1&family=Baloo+Thambi+2:wght@400;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    font-family: 'Baloo Thambi 2', 'Tiro Tamil', sans-serif;
    color: #f0eaff;
  }

  .app-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 16px 40px;
  }

  .app-header {
    text-align: center;
    padding: 32px 16px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 24px;
  }

  .app-title {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(90deg, #f9d423, #ff4e50, #fc67fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 6px;
  }

  .app-subtitle {
    font-size: 1rem;
    color: rgba(255,255,255,0.55);
    font-weight: 400;
  }

  .tab-bar {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }

  .tab-btn {
    padding: 10px 24px;
    border-radius: 50px;
    border: 1.5px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.7);
    font-size: 1rem;
    font-family: inherit;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab-btn:hover { background: rgba(255,255,255,0.14); }
  .tab-btn.active {
    background: linear-gradient(135deg, #f9d423, #ff4e50);
    border-color: transparent;
    color: #1a0a00;
  }

  /* NOTES */
  .notes-nav {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 24px;
    justify-content: center;
  }

  .iyal-btn {
    padding: 8px 18px;
    border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.75);
    font-size: 0.9rem;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s;
  }

  .iyal-btn.active {
    background: rgba(252,103,250,0.25);
    border-color: #fc67fa;
    color: #fc67fa;
  }

  .section-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 16px;
  }

  .section-heading {
    font-size: 1.1rem;
    font-weight: 700;
    color: #f9d423;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(249,212,35,0.2);
  }

  .section-content {
    font-size: 1rem;
    line-height: 1.9;
    color: rgba(255,255,255,0.88);
    white-space: pre-line;
  }

  .notes-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    margin-top: 4px;
  }

  .notes-table th {
    background: rgba(249,212,35,0.15);
    color: #f9d423;
    padding: 10px 14px;
    text-align: left;
    border: 1px solid rgba(255,255,255,0.12);
  }

  .notes-table td {
    padding: 10px 14px;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.85);
    vertical-align: top;
  }

  .notes-table tr:nth-child(even) td {
    background: rgba(255,255,255,0.03);
  }

  .match-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }

  .match-table th {
    background: rgba(252,103,250,0.15);
    color: #fc67fa;
    padding: 10px 14px;
    border: 1px solid rgba(255,255,255,0.12);
  }

  .match-table td {
    padding: 10px 14px;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.85);
    vertical-align: top;
  }

  .match-table tr:nth-child(even) td { background: rgba(255,255,255,0.03); }
  .match-table .col-q { color: #f9d423; font-weight: 600; width: 40%; }
  .match-table .col-a { color: #a8ffba; }

  /* QUIZ */
  .quiz-container { max-width: 700px; margin: 0 auto; }

  .quiz-progress {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
  }

  .progress-bar-wrap {
    flex: 1;
    height: 6px;
    background: rgba(255,255,255,0.12);
    border-radius: 99px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #f9d423, #ff4e50);
    border-radius: 99px;
    transition: width 0.3s;
  }

  .quiz-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px;
    padding: 28px;
    margin-bottom: 16px;
  }

  .quiz-q-num {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.4);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .quiz-q-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: #f0eaff;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .quiz-opts { display: flex; flex-direction: column; gap: 10px; }

  .quiz-opt-btn {
    text-align: left;
    padding: 14px 18px;
    border-radius: 12px;
    border: 1.5px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.85);
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s;
    font-weight: 500;
  }

  .quiz-opt-btn:hover:not(:disabled) { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.3); }
  .quiz-opt-btn.correct { background: rgba(34,197,94,0.2); border-color: #22c55e; color: #a8ffba; }
  .quiz-opt-btn.wrong { background: rgba(239,68,68,0.2); border-color: #ef4444; color: #fca5a5; }
  .quiz-opt-btn.reveal { background: rgba(249,212,35,0.12); border-color: #f9d423; color: #f9d423; }
  .quiz-opt-btn:disabled { cursor: default; }

  .answer-feedback {
    margin-top: 16px;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
  }
  .answer-feedback.correct { background: rgba(34,197,94,0.15); color: #a8ffba; border: 1px solid rgba(34,197,94,0.3); }
  .answer-feedback.wrong { background: rgba(239,68,68,0.15); color: #fca5a5; border: 1px solid rgba(239,68,68,0.3); }

  .quiz-nav { display: flex; gap: 10px; justify-content: space-between; align-items: center; margin-top: 8px; }

  .btn-primary {
    padding: 12px 28px;
    border-radius: 50px;
    border: none;
    background: linear-gradient(135deg, #f9d423, #ff4e50);
    color: #1a0a00;
    font-size: 1rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .btn-primary:hover { opacity: 0.88; }

  .btn-ghost {
    padding: 10px 22px;
    border-radius: 50px;
    border: 1.5px solid rgba(255,255,255,0.2);
    background: transparent;
    color: rgba(255,255,255,0.7);
    font-size: 0.95rem;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.08); }

  /* RESULTS */
  .results-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 24px;
    padding: 36px;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
  }

  .score-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f9d423, #ff4e50);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }

  .score-num { font-size: 2rem; font-weight: 800; color: #1a0a00; }
  .score-total { font-size: 0.85rem; color: rgba(26,10,0,0.7); font-weight: 600; }
  .score-label { font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; color: #f9d423; }
  .score-pct { font-size: 1rem; color: rgba(255,255,255,0.6); margin-bottom: 24px; }

  /* GAME */
  .game-container { max-width: 700px; margin: 0 auto; }

  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
  }

  .game-stat {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    padding: 8px 18px;
    text-align: center;
  }

  .game-stat-label { font-size: 0.7rem; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 1px; }
  .game-stat-val { font-size: 1.2rem; font-weight: 700; color: #f9d423; }

  .timer-ring { font-size: 1.5rem; font-weight: 800; }
  .timer-ring.danger { color: #ef4444; }
  .timer-ring.warn { color: #fb923c; }
  .timer-ring.ok { color: #22c55e; }

  .game-streak {
    background: linear-gradient(135deg, #f9d423, #fc67fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1rem;
    font-weight: 700;
  }

  .start-screen {
    text-align: center;
    padding: 40px 20px;
  }

  .start-icon { font-size: 4rem; margin-bottom: 16px; }
  .start-title { font-size: 1.8rem; font-weight: 800; color: #f9d423; margin-bottom: 10px; }
  .start-desc { color: rgba(255,255,255,0.6); font-size: 1rem; margin-bottom: 28px; line-height: 1.7; }

  .leaderboard {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 20px;
    margin-top: 20px;
  }

  .lb-title { font-size: 1rem; font-weight: 700; color: #fc67fa; margin-bottom: 14px; }
  .lb-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.95rem; }
  .lb-rank { color: #f9d423; font-weight: 700; width: 28px; }
  .lb-name { flex: 1; color: rgba(255,255,255,0.85); }
  .lb-score { color: #a8ffba; font-weight: 700; }

  .resume-banner {
    background: rgba(249,212,35,0.1);
    border: 1px solid rgba(249,212,35,0.3);
    border-radius: 12px;
    padding: 12px 18px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .resume-text { font-size: 0.9rem; color: #f9d423; }

  @media (max-width: 600px) {
    .app-title { font-size: 1.4rem; }
    .section-card { padding: 16px; }
    .quiz-card { padding: 20px; }
    .tab-btn { padding: 8px 16px; font-size: 0.9rem; }
  }
`;

function MatchTable({ data }) {
  return (
    <table className="match-table">
      <thead>
        <tr>
          <th>சொல் / வினா</th>
          <th>விளக்கம் / விடை</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td className="col-q">{row.question}</td>
            <td className="col-a">{row.answer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DataTable({ headers, rows }) {
  return (
    <table className="notes-table">
      <thead>
        <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

function NotesTab() {
  const [activeIyal, setActiveIyal] = useState("iyal1");
  const iyalKeys = Object.keys(CONTENT);
  const iyal = CONTENT[activeIyal];

  return (
    <div>
      <div className="notes-nav">
        {iyalKeys.map(k => (
          <button key={k} className={`iyal-btn ${activeIyal === k ? "active" : ""}`} onClick={() => setActiveIyal(k)}>
            {CONTENT[k].title.split("–")[0].trim()}
          </button>
        ))}
      </div>
      <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 20 }}>
        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fc67fa" }}>{iyal.title}</div>
      </div>
      {iyal.sections.map((sec, i) => (
        <div key={i} className="section-card">
          <div className="section-heading">{sec.heading}</div>
          {sec.isMatchTable ? (
            <MatchTable data={sec.matchData} />
          ) : sec.isTable ? (
            <DataTable headers={sec.tableData.headers} rows={sec.tableData.rows} />
          ) : (
            <div className="section-content">{sec.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function QuizTab() {
  const STORAGE_KEY = "tamil_quiz_progress";
  const saved = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; } })();

  const [current, setCurrent] = useState(saved?.current ?? 0);
  const [answers, setAnswers] = useState(saved?.answers ?? {});
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const questions = QUIZ_QUESTIONS;
  const total = questions.length;
  const q = questions[current];
  const answered = answers[current] !== undefined;
  const isCorrect = answered && answers[current] === q.ans;

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ current, answers })); } catch {}
  }, [current, answers]);

  useEffect(() => {
    setSelected(answered ? answers[current] : null);
    setRevealed(false);
  }, [current]);

  const score = Object.entries(answers).filter(([qi, a]) => QUIZ_QUESTIONS[qi]?.ans === a).length;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswers(prev => ({ ...prev, [current]: idx }));
  };

  const resetQuiz = () => {
    setCurrent(0); setAnswers({}); setSelected(null); setShowResult(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const hasSavedProgress = saved && (saved.current > 0 || Object.keys(saved.answers || {}).length > 0);

  if (showResult) {
    const pct = Math.round((score / total) * 100);
    const medal = pct >= 90 ? "🏆" : pct >= 70 ? "🥈" : pct >= 50 ? "🥉" : "📚";
    const msg = pct >= 90 ? "அருமை! மிகவும் சிறப்பு!" : pct >= 70 ? "நன்று! தொடர்ந்து படிக்கவும்" : pct >= 50 ? "நடுத்தரம். மீண்டும் முயற்சிக்கவும்." : "மீண்டும் கற்கவும்!";
    return (
      <div className="quiz-container">
        <div className="results-card">
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>{medal}</div>
          <div className="score-circle">
            <div className="score-num">{score}</div>
            <div className="score-total">/ {total}</div>
          </div>
          <div className="score-label">{msg}</div>
          <div className="score-pct">{pct}% சரியான விடைகள்</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={resetQuiz}>மீண்டும் தொடங்கு</button>
            <button className="btn-ghost" onClick={() => { setShowResult(false); setCurrent(0); }}>மதிப்பாய்வு</button>
          </div>
        </div>
        <div className="leaderboard" style={{ marginTop: 24 }}>
          <div className="lb-title">உங்கள் முடிவு</div>
          <div style={{ textAlign: "center", padding: "12px 0", color: "rgba(255,255,255,0.7)" }}>
            சரியான விடைகள்: <span style={{ color: "#a8ffba", fontWeight: 700 }}>{score}</span> / {total}
            <br />தவறான விடைகள்: <span style={{ color: "#fca5a5", fontWeight: 700 }}>{total - score}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {hasSavedProgress && (
        <div className="resume-banner">
          <span className="resume-text">📌 முன்பு {saved.current + 1}ஆம் வினாவில் நிறுத்தியிருந்தீர்கள்</span>
          <button className="btn-ghost" onClick={resetQuiz} style={{ padding: "6px 14px", fontSize: "0.85rem" }}>புதிதாக தொடங்கு</button>
        </div>
      )}

      <div className="quiz-progress">
        <span>{current + 1} / {total}</span>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${((current + 1) / total) * 100}%` }} />
        </div>
        <span style={{ color: "#a8ffba", fontWeight: 700 }}>✓ {score}</span>
      </div>

      <div className="quiz-card">
        <div className="quiz-q-num">வினா {current + 1}</div>
        <div className="quiz-q-text">{q.q}</div>
        <div className="quiz-opts">
          {q.opts.map((opt, i) => {
            let cls = "quiz-opt-btn";
            if (answered) {
              if (i === q.ans) cls += " correct";
              else if (i === selected && selected !== q.ans) cls += " wrong";
            } else if (revealed && i === q.ans) cls += " reveal";
            return (
              <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>
                <span style={{ color: "rgba(255,255,255,0.4)", marginRight: 8 }}>{["அ", "ஆ", "இ", "ஈ"][i]})</span>
                {opt}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className={`answer-feedback ${isCorrect ? "correct" : "wrong"}`}>
            {isCorrect ? "✓ சரியான விடை!" : `✗ சரியான விடை: ${q.opts[q.ans]}`}
          </div>
        )}
        {!answered && !revealed && (
          <button className="btn-ghost" style={{ marginTop: 12, fontSize: "0.85rem" }} onClick={() => setRevealed(true)}>
            விடை காட்டு
          </button>
        )}
      </div>

      <div className="quiz-nav">
        <button className="btn-ghost" disabled={current === 0} onClick={() => setCurrent(c => c - 1)}>← முந்தைய</button>
        {current < total - 1 ? (
          <button className="btn-primary" onClick={() => setCurrent(c => c + 1)}>அடுத்தது →</button>
        ) : (
          <button className="btn-primary" onClick={() => setShowResult(true)}>முடிவு காண</button>
        )}
      </div>
    </div>
  );
}

function GameTab() {
  const [phase, setPhase] = useState("start");
  const [gameQs, setGameQs] = useState([]);
  const [gi, setGi] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const timerRef = useRef(null);

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const startGame = () => {
    const qs = shuffle(QUIZ_QUESTIONS).slice(0, 20);
    setGameQs(qs); setGi(0); setScore(0); setStreak(0); setTimeLeft(GAME_TIME);
    setSelected(null); setRevealed(false); setPhase("playing");
  };

  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setRevealed(true);
          setTimeout(() => nextQ(), 1500);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gi, phase]);

  const nextQ = () => {
    setGi(prev => {
      const next = prev + 1;
      if (next >= gameQs.length) { setPhase("end"); return prev; }
      setSelected(null); setRevealed(false); setTimeLeft(GAME_TIME);
      return next;
    });
  };

  const handleSelect = (i) => {
    if (selected !== null || revealed) return;
    clearInterval(timerRef.current);
    setSelected(i);
    const q = gameQs[gi];
    if (i === q.ans) {
      const bonus = timeLeft > 10 ? 3 : timeLeft > 5 ? 2 : 1;
      setScore(s => s + bonus);
      setStreak(s => { const ns = s + 1; if (ns > best) setBest(ns); return ns; });
    } else {
      setStreak(0);
    }
    setRevealed(true);
    setTimeout(() => nextQ(), 1200);
  };

  if (phase === "start") {
    return (
      <div className="game-container">
        <div className="start-screen">
          <div className="start-icon">🎮</div>
          <div className="start-title">வினா விளையாட்டு</div>
          <div className="start-desc">
            20 வினாக்கள் · {GAME_TIME} வினாடி நேரம் · வேகமாக விடை சொன்னால் கூடுதல் மதிப்பெண்கள்<br />
            தங்க விடை = 3 pts · வெள்ளி = 2 pts · வெண்கலம் = 1 pt
          </div>
          <button className="btn-primary" style={{ fontSize: "1.1rem", padding: "14px 36px" }} onClick={startGame}>
            விளையாட்டு தொடங்கு!
          </button>
        </div>
      </div>
    );
  }

  if (phase === "end") {
    const medal = score >= 45 ? "🏆" : score >= 30 ? "🥈" : score >= 15 ? "🥉" : "📚";
    return (
      <div className="game-container">
        <div className="results-card">
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>{medal}</div>
          <div className="score-circle">
            <div className="score-num">{score}</div>
            <div className="score-total">pts</div>
          </div>
          <div className="score-label">விளையாட்டு முடிந்தது!</div>
          <div className="score-pct" style={{ marginBottom: 8 }}>அதிகபட்ச வரிசை: {best}</div>
          <div className="score-pct">மொத்த மதிப்பெண்: {score} / 60</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
            <button className="btn-primary" onClick={startGame}>மீண்டும் விளையாடு</button>
            <button className="btn-ghost" onClick={() => setPhase("start")}>முகப்பு</button>
          </div>
        </div>
      </div>
    );
  }

  const q = gameQs[gi];
  const timerClass = timeLeft <= 5 ? "danger" : timeLeft <= 9 ? "warn" : "ok";

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-stat">
          <div className="game-stat-label">மதிப்பெண்</div>
          <div className="game-stat-val">{score}</div>
        </div>
        <div className="game-stat">
          <div className="game-stat-label">நேரம்</div>
          <div className={`timer-ring ${timerClass}`}>{timeLeft}s</div>
        </div>
        <div className="game-stat">
          <div className="game-stat-label">வினா</div>
          <div className="game-stat-val">{gi + 1}/{gameQs.length}</div>
        </div>
        <div className="game-stat">
          <div className="game-stat-label">வரிசை</div>
          <div className="game-stat-val game-streak">{streak > 1 ? `🔥${streak}` : streak}</div>
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-q-num">வினா {gi + 1}</div>
        <div className="quiz-q-text">{q.q}</div>
        <div className="quiz-opts">
          {q.opts.map((opt, i) => {
            let cls = "quiz-opt-btn";
            if (revealed) {
              if (i === q.ans) cls += " correct";
              else if (i === selected) cls += " wrong";
            }
            return (
              <button key={i} className={cls} disabled={revealed} onClick={() => handleSelect(i)}>
                <span style={{ color: "rgba(255,255,255,0.4)", marginRight: 8 }}>{["அ", "ஆ", "இ", "ஈ"][i]})</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function term3_grammar() {
  const [tab, setTab] = useState("notes");

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrapper">
        <div className="app-header">
          <div className="app-title">6th New Book – Term 3</div>
          <div className="app-subtitle">ஆறாம் வகுப்பு தமிழ் மூன்றாம் தவணை – இலக்கணம்</div>
        </div>
        <div className="tab-bar">
          {[["notes", "📖 குறிப்புகள்"], ["quiz", "✏️ வினா-விடை"], ["game", "🎮 விளையாட்டு"]].map(([id, label]) => (
            <button key={id} className={`tab-btn ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>
        {tab === "notes" && <NotesTab />}
        {tab === "quiz" && <QuizTab />}
        {tab === "game" && <GameTab />}
      </div>
    </>
  );
}
