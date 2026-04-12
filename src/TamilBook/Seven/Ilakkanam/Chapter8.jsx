import { useState } from "react";

// ============================================================
// CHAPTER 8 — உருவக அணி + திருக்குறள் (இயல் இரண்டு)
// ============================================================

const NOTES = [
  {
    id: 1, title: "உருவக அணி விளக்கம்", icon: "🔥", color: "#f97316",
    content: [
      {
        type: "text",
        value: "உவமை வேறு உவமிக்கப்படும் பொருள் வேறு என்று இல்லாமல் **இரண்டும் ஒன்றே** என்பது தோன்றுமபடி கூறுவது **உருவக அணி** ஆகும்."
      },
      {
        type: "diagram",
        title: "உவமை அணி vs உருவக அணி",
        items: [
          { label: "உவமை அணி", desc: "தமிழ் போன்ற தேன் — தமிழ் வேறு, தேன் வேறு" },
          { label: "உருவக அணி", desc: "தமிழ்த்தேன் — தமிழே தேன் என்று இரண்டும் ஒன்றாகக் கூறப்படும்" },
        ]
      },
      {
        type: "examples_list",
        title: "உருவக அணி எடுத்துக்காட்டுகள்",
        items: [
          { sent: "தமிழ்த்தேன்", note: "தமிழ் = தேன் என்று இரண்டையும் ஒன்றாக இணைத்துக் கூறப்படுகிறது" },
          { sent: "இன்பவெள்ளம்", note: "இன்பம் = வெள்ளம் என்று இரண்டும் ஒன்றாகக் கூறப்படுகிறது" },
          { sent: "துன்பக்கடல்", note: "துன்பம் = கடல் என்று இரண்டும் ஒன்றாகக் கூறப்படுகிறது" },
          { sent: "அறிவு விளக்கம்", note: "அறிவு = விளக்கு என்று ஒன்றாகக் கூறப்படுகிறது" },
        ]
      },
      {
        type: "table",
        headers: ["உவமைத் தொடர்", "உருவகம்"],
        rows: [
          ["தமிழ் போன்ற தேன்", "தமிழ்த்தேன்"],
          ["வெள்ளம் போன்ற இன்பம்", "இன்பவெள்ளம்"],
          ["கடல் போன்ற துன்பம்", "துன்பக்கடல்"],
          ["மலர் போன்ற முகம்", "முகமலர்"],
        ]
      }
    ]
  },
  {
    id: 2, title: "ஏகதேச உருவக அணி", icon: "💡", color: "#8b5cf6",
    content: [
      {
        type: "text",
        value: "கூறப்படும் இரு பொருள்களில் **ஒன்றை மட்டும்** உருவகப்படுத்தி, மற்றொன்றை உருவகப்படுத்தாமல் விடுவது **ஏகதேச உருவக அணி** ஆகும். (ஏகதேசம் = ஒரு பகுதி)"
      },
      {
        type: "example",
        title: "எடுத்துக்காட்டு",
        verse: "அறிவு என்னும் விளக்கைக் கொண்டு அறியாமையை நீக்க வேண்டும்.",
        meaning: "அறிவு விளக்காக உருவகப்படுத்தப்பட்டுள்ளது. அறியாமை இருளாக உருவகப்படுத்தப்படவில்லை.",
        analysis: [
          ["உருவகப்படுத்தியது", "அறிவு → விளக்கு"],
          ["உருவகப்படுத்தாதது", "அறியாமை (இருளாக வரவில்லை)"],
          ["வகை", "ஏகதேச உருவக அணி"],
        ]
      },
      {
        type: "example",
        title: "குறள் எடுத்துக்காட்டு",
        verse: "பெருமைக்கும் ஏனைச் சிறுமைக்கும் தத்தம்\nகருமமே கட்டளைக் கல்.",
        meaning: "வள்ளுவர் மக்களின் செயல்களைப் பொன்னின் தரத்தை அறிய உதவும் உரைகல்லாக உருவகம் செய்துவிட்டு, மக்களது உயர்வையும் தாழ்வையும் பொன்னாக உருவகம் செய்யவில்லை.",
        analysis: [
          ["உருவகப்படுத்தியது", "கருமம் → கட்டளைக்கல்"],
          ["உருவகப்படுத்தாதது", "மக்கள் (பொன்னாக வரவில்லை)"],
          ["வகை", "ஏகதேச உருவக அணி"],
        ]
      },
      {
        type: "comparison",
        title: "உருவக அணி vs ஏகதேச உருவக அணி",
        left: { label: "உருவக அணி", points: ["இரு பொருள்களும் உருவகப்படுத்தப்படும்", "எ.கா: இன்பவெள்ளம் (இன்பம்=வெள்ளம்)"] },
        right: { label: "ஏகதேச உருவக அணி", points: ["ஒரு பொருள் மட்டும் உருவகப்படுத்தப்படும்", "மற்றொன்று உருவகப்படுத்தப்படாது"] }
      }
    ]
  },
  {
    id: 3, title: "திருக்குறள் — வினைசெயல் வகை", icon: "⚡", color: "#06b6d4",
    content: [
      {
        type: "text",
        value: "**திருக்குறள்** — இயல் இரண்டு, வாழ்வியல் பகுதியில் உள்ள குறட்பாக்கள்."
      },
      {
        type: "table",
        headers: ["குறள் எண்", "அதிகாரம்", "குறட்பா", "பொருள் சுருக்கம்"],
        rows: [
          ["1","வினைசெயல் வகை","பொருள்கருவி காலம் விலனெனோடு ஐந்தும் இருள்தீர எண்ணிச் செயல்","வேண்டிய பொருள், ஏற்ற கருவி, தகுந்த காலம், செயலின் தன்மை, உரிய இடம் ஐந்தையும் ஆராய்ந்து செய்க"],
          ["2","வினைசெயல் வகை","வினையால் வினையாக்கிக் கோடல் நனைகவுள் யானையால் யானையாத் தற்று","ஒரு செயலைச் செய்யும்போதே அச்செயலால் மற்றொரு செயலும் செய்து முடித்துக்கொள்க — உவமை அணி"],
          ["3","அவை அஞ்சாமை","கற்றாருள் கற்றார் எனப்படுவர் கற்றார்முன் கற்ற செலச்சொல்லு வார்","கற்றவர்முன் தெளிவாகச் சொல்ல வல்லவர் மிகவும் கற்றவராக மதிக்கப்படுவார்"],
          ["4","அவை அஞ்சாமை","கற்றார்முன் கற்ற செலச்சொல்லித் தாம்கற்ற மிக்காருள் மிக்க கொளல்","கற்றவர் முன் சொல்லி, அவர்கள் கற்றவற்றையும் கேட்டு அறிந்துகொள்க"],
        ]
      }
    ]
  },
  {
    id: 4, title: "திருக்குறள் — நாடு, அரண், பெருமை", icon: "🏛️", color: "#10b981",
    content: [
      {
        type: "table",
        headers: ["குறள் எண்", "அதிகாரம்", "குறட்பா", "பொருள் சுருக்கம்"],
        rows: [
          ["5","நாடு","உறுபசியும் ஓவாப் பிணியும் செறுபகையும் சேராது இயல்வது நாடு","மிகப் பசியும், ஓயாத நோயும், அழிவு செய்யும் பகையும் சேராமல் நல்ல வகையில் நடைபெறுவதே நாடு"],
          ["6","நாடு","நாடென்ப நாடா வளத்தன நாடல்ல நாட வளம்தரு நாடு","முயற்சி இல்லாமல் வளம்தரும் நாடே சிறந்த நாடு"],
          ["7","அரண்","மணிநீரும் மண்ணும் மலையும் அணிநிழல் காடும் உடையது அரண்","தெளிந்த நீரும், நிலமும், மலையும், அழகிய நிழல் உடைய காடும் ஆகிய நான்கும் உள்ளதே அரண்"],
          ["8","அரண்","எனைமாட்சித்து ஆகியக் கண்ணும் வினைமாட்சி இல்லார்கண் இல்லது அரண்","அரண் எவ்வளவு பெருமையுடையதாக இருந்தாலும் செயல் சிறப்பு இல்லாதவரிடத்தில் அது பயனில்லாதது"],
          ["9","பெருமை","பிறப்பொக்கும் எல்லா உயிர்க்கும் சிறப்பொவ்வா செய்தொழில் வேற்றுமை யான்","பிறப்பால் மக்கள் அனைவரும் ஒத்த இயல்புடையவர்கள். செயல்களால் சிறப்பியல்புகள் வேறுபடும்"],
          ["10","பெருமை","பெருமை உடையவர் ஆற்றுவார் ஆற்றின் அருமை உடைய செயல்","உயர்ந்த பண்புகளை உடையவர் அரிய செயல்களை உரிய நெறிமுறையில் செய்து முடிப்பர்"],
        ]
      }
    ]
  },
  {
    id: 5, title: "வினாச்சொற்கள்", icon: "❓", color: "#f59e0b",
    content: [
      {
        type: "text",
        value: "ஏதேனும் ஒன்றை அறிந்துகொள்வதற்காக வினவப்படுவது **வினா** ஆகும். வினா கேட்கப் பயன்படுத்தும் சொற்கள் **வினாச்சொற்கள்** எனப்படும்."
      },
      {
        type: "table",
        headers: ["வினாச்சொல்", "எப்போது பயன்படுத்துவோம்", "எடுத்துக்காட்டு"],
        rows: [
          ["எது", "ஒரு பொருளை வினவ", "எது சரியான வழி?"],
          ["என்ன", "விவரம் வினவ", "என்ன சாப்பிட்டாய்?"],
          ["எங்கு", "இடம் வினவ", "எங்கு சென்றாய்?"],
          ["எப்படி", "முறை வினவ", "எப்படி சென்றாய்?"],
          ["எத்தனை", "எண்ணிக்கை வினவ", "எத்தனை பேர் வந்தனர்?"],
          ["எப்பொழுது", "காலம் வினவ", "எப்பொழுது வருவாய்?"],
          ["எவற்றை", "பல பொருள் வினவ", "எவற்றை வாங்கினாய்?"],
          ["எதற்கு", "காரணம் வினவ", "எதற்கு படிக்கிறாய்?"],
          ["ஏன்", "காரணம் வினவ", "ஏன் அழுகிறாய்?"],
          ["யார்", "நபர் வினவ", "யார் வந்தார்?"],
          ["யாது", "பொருள் வினவ", "யாது உண்மை?"],
          ["யாவை", "பல பொருள் வினவ", "யாவை தேவை?"],
        ]
      }
    ]
  }
];

const QUIZ_QUESTIONS = [
  { q: "உருவக அணியில் என்ன சிறப்பு உள்ளது?", opts: ["உவமை வெளிப்படையாக வரும்", "உவமை மட்டும் வரும்", "உவமையும் உவமேயமும் ஒன்றாக அமையும்", "உவம உருபு வரும்"], ans: 2, exp: "உவமை வேறு உவமிக்கப்படும் பொருள் வேறு என்று இல்லாமல் இரண்டும் ஒன்றே என்பது தோன்றுமபடி கூறுவது உருவக அணி." },
  { q: "'தமிழ்த்தேன்' என்பது எந்த அணிக்கு எடுத்துக்காட்டு?", opts: ["உவமை அணி", "உருவக அணி", "இல்பொருள் அணி", "எடுத்துக்காட்டு அணி"], ans: 1, exp: "தமிழ்த்தேன் என்பது உருவக அணிக்கு எடுத்துக்காட்டு. தமிழ் = தேன் என்று இரண்டும் ஒன்றாகக் கூறப்படுகிறது." },
  { q: "'இன்பவெள்ளம்' என்பது எந்த அணி?", opts: ["உவமை அணி", "உருவக அணி", "ஏகதேச உருவக அணி", "இல்பொருள் அணி"], ans: 1, exp: "இன்பம் = வெள்ளம் என்று இரண்டும் ஒன்றாகக் கூறப்படுவதால் உருவக அணி." },
  { q: "ஏகதேச உருவக அணியில் 'ஏகதேசம்' என்பதன் பொருள் என்ன?", opts: ["ஒரு நாடு", "ஒரு பகுதி", "ஒரு பாடல்", "ஒரு அணி"], ans: 1, exp: "ஏகதேசம் என்பதற்கு 'ஒரு பகுதி' என்று பொருள். இரு பொருள்களில் ஒன்றை மட்டும் உருவகப்படுத்துவதால் இப்பெயர்." },
  { q: "'அறிவு என்னும் விளக்கைக் கொண்டு அறியாமையை நீக்க வேண்டும்' — எந்த அணி?", opts: ["உருவக அணி", "ஏகதேச உருவக அணி", "உவமை அணி", "இல்பொருள் அணி"], ans: 1, exp: "அறிவு விளக்காக உருவகப்படுத்தப்பட்டுள்ளது. அறியாமை இருளாக உருவகப்படுத்தப்படவில்லை. ஒரு பகுதி மட்டும் உருவகம் — ஏகதேச உருவக அணி." },
  { q: "ஒரு செயலைச் செய்யும்போதே மற்றொரு செயலும் செய்வது என்று கூறும் குறளில் எந்த அணி?", opts: ["உவமை அணி", "உருவக அணி", "ஏகதேச உருவக அணி", "எடுத்துக்காட்டு அணி"], ans: 0, exp: "யானையால் யானையாத் தற்று என்று உவமை உருபுடன் வருவதால் உவமை அணி." },
  { q: "'வினையால் வினையாக்கிக் கோடல்' — இக்குறள் எந்த அதிகாரத்தில் உள்ளது?", opts: ["நாடு", "அரண்", "வினைசெயல் வகை", "பெருமை"], ans: 2, exp: "வினையால் வினையாக்கிக் கோடல் — இக்குறள் வினைசெயல் வகை அதிகாரத்தில் உள்ளது." },
  { q: "திருக்குறளில் ஒரு செயலைச் செய்ய ஐந்து விஷயங்கள் ஆராய வேண்டும் — அவை எவை?", opts: ["பொருள், கருவி, காலம், விலை, இடம்", "பொருள், கருவி, காலம், விலன், இடம்", "காலம், இடம், மனிதர், பொருள், அமைப்பு", "கருவி, இடம், காலம், பணம், பயன்"], ans: 1, exp: "பொருள்கருவி காலம் விலனெனோடு ஐந்தும் — பொருள், கருவி, காலம், விலன் (செயலின் தன்மை), இடம் ஆகிய ஐந்தையும் ஆராய வேண்டும்." },
  { q: "கற்றார்முன் கற்ற செலச்சொல்லுவார் — இவர்கள் எப்படி மதிக்கப்படுவார்?", opts: ["கம்மியவர் என்று", "மிகவும் கற்றவர் என்று", "முட்டாள் என்று", "பேச்சாளர் என்று"], ans: 1, exp: "கற்றாருள் கற்றார் எனப்படுவர் — கற்றவர்முன் தெளிவாகச் சொல்ல வல்லவர் மிகவும் கற்றவராக மதிக்கப்படுவார்." },
  { q: "சிறந்த நாட்டின் இலக்கணம் என்ன?", opts: ["பெரிய நாடு", "அதிக மக்கள்", "பசி, நோய், பகை சேராமல் நடைபெறுவது", "அதிக செல்வம்"], ans: 2, exp: "உறுபசியும் ஓவாப் பிணியும் செறுபகையும் சேராது இயல்வது நாடு — பசி, நோய், பகை சேராமல் நடைபெறுவதே நாடு." },
  { q: "முயற்சி இல்லாமல் வளம்தரும் நாட்டைப் பற்றி எந்த குறள் கூறுகிறது?", opts: ["நாடென்ப நாடா வளத்தன நாடல்ல", "மணிநீரும் மண்ணும் மலையும்", "பிறப்பொக்கும் எல்லா உயிர்க்கும்", "எனைமாட்சித்து ஆகியக் கண்ணும்"], ans: 0, exp: "நாடென்ப நாடா வளத்தன நாடல்ல நாட வளம்தரு நாடு — முயற்சி இல்லாமல் வளம்தரும் நாடே சிறந்த நாடு என்று இக்குறள் கூறுகிறது." },
  { q: "அரணுக்கு நான்கு இயல்புகள் என்ன?", opts: ["மணிநீர், மண், மலை, அணிநிழல் காடு", "மலை, கடல், காடு, ஆறு", "நீர், நிலம், வான், கடல்", "பொன், மண், வெள்ளி, தாமிரம்"], ans: 0, exp: "மணிநீரும் மண்ணும் மலையும் அணிநிழல் காடும் உடையது அரண் — தெளிந்த நீர், நிலம், மலை, அழகிய நிழல் உடைய காடு நான்கும் உள்ளதே அரண்." },
  { q: "அரண் எவ்வளவு பெருமையுடையதாக இருந்தாலும் பயன்படாது — ஏன்?", opts: ["மக்கள் இல்லாவிடில்", "செயல் சிறப்பு இல்லாதவரிடம்", "தண்ணீர் இல்லாவிடில்", "பணம் இல்லாவிடில்"], ans: 1, exp: "எனைமாட்சித்து ஆகியக் கண்ணும் வினைமாட்சி இல்லார்கண் இல்லது அரண் — செயல் சிறப்பு இல்லாதவரிடத்தில் அரண் பயனில்லாதது." },
  { q: "பிறப்பால் மக்கள் எவ்வாறு உள்ளனர்?", opts: ["வேறுபட்டவர்கள்", "ஒத்த இயல்புடையவர்கள்", "மேலானவர்கள்", "கீழானவர்கள்"], ans: 1, exp: "பிறப்பொக்கும் எல்லா உயிர்க்கும் — பிறப்பால் மக்கள் அனைவரும் ஒத்த இயல்புடையவர்கள்." },
  { q: "மக்களின் சிறப்பியல்புகள் எதனால் வேறுபடும்?", opts: ["பிறப்பால்", "குடும்பத்தால்", "செயல்களால்", "வயதால்"], ans: 2, exp: "சிறப்பொவ்வா செய்தொழில் வேற்றுமை யான் — செயல்களால் சிறப்பியல்புகள் வேறுபடும்." },
  { q: "பெருமை உடையவர் என்ன செய்வர்?", opts: ["சாதாரண செயல்", "அரிய செயல்களை உரிய நெறியில் செய்வர்", "பணம் சேர்ப்பர்", "மட்டும் பேசுவர்"], ans: 1, exp: "பெருமை உடையவர் ஆற்றுவார் ஆற்றின் அருமை உடைய செயல் — அரிய செயல்களை உரிய நெறிமுறையில் செய்து முடிப்பர்." },
  { q: "'துன்பக்கடல்' என்பது எந்த அணி?", opts: ["உவமை அணி", "உருவக அணி", "ஏகதேச உருவக அணி", "இல்பொருள் அணி"], ans: 1, exp: "துன்பம் = கடல் என்று இரண்டும் ஒன்றாகக் கூறப்படுவதால் உருவக அணி." },
  { q: "'முகமலர்' என்பது எந்த அணி?", opts: ["உவமை அணி", "உருவக அணி", "ஏகதேச உருவக அணி", "இல்பொருள் அணி"], ans: 1, exp: "முகம் = மலர் என்று இரண்டும் ஒன்றாகக் கூறப்படுவதால் உருவக அணி." },
  { q: "வினாச்சொற்கள் எதற்கு பயன்படுகின்றன?", opts: ["பதில் சொல்ல", "கேள்வி கேட்க", "வழிகாட்ட", "அழைக்க"], ans: 1, exp: "ஏதேனும் ஒன்றை அறிந்துகொள்வதற்காக வினவப்படுவது வினா. வினா கேட்கப் பயன்படுத்தும் சொற்கள் வினாச்சொற்கள்." },
  { q: "'எப்படி' என்ற வினாச்சொல் எதை வினவ பயன்படுகிறது?", opts: ["இடம்", "காலம்", "முறை", "எண்ணிக்கை"], ans: 2, exp: "'எப்படி' என்ற வினாச்சொல் முறை அல்லது விதம் குறித்து வினவ பயன்படுகிறது. எ.கா: எப்படி சென்றாய்?" },
  { q: "'எங்கு' என்ற வினாச்சொல் எதை வினவ பயன்படுகிறது?", opts: ["காலம்", "இடம்", "முறை", "நபர்"], ans: 1, exp: "'எங்கு' என்ற வினாச்சொல் இடம் குறித்து வினவ பயன்படுகிறது. எ.கா: எங்கு சென்றாய்?" },
  { q: "'யார்' என்ற வினாச்சொல் எதை வினவ பயன்படுகிறது?", opts: ["பொருள்", "நபர்", "இடம்", "முறை"], ans: 1, exp: "'யார்' என்ற வினாச்சொல் நபர் குறித்து வினவ பயன்படுகிறது. எ.கா: யார் வந்தார்?" },
  { q: "ஒரு செயலை செய்யும் போது ஐந்தையும் ஆராய வேண்டும் என்று கூறும் குறள் எந்த அதிகாரத்தில்?", opts: ["நாடு", "வினைசெயல் வகை", "அரண்", "பெருமை"], ans: 1, exp: "பொருள்கருவி காலம் விலன் இடன் ஐந்தையும் ஆராய்ந்து செய் என்ற குறள் வினைசெயல் வகை அதிகாரத்தில் உள்ளது." },
  { q: "உருவக அணியில் உவமை உருபு வருமா?", opts: ["ஆம், வரும்", "இல்லை, வராது", "சில நேரம் வரும்", "எப்போதும் வரும்"], ans: 1, exp: "உருவக அணியில் உவமை உருபு வராது. இரண்டும் ஒன்றாக இணைந்து வரும்." },
  { q: "உவமைத் தொடரை உருவகமாக மாற்றுவது எப்படி?", opts: ["உவம உருபை நீக்குவதால்", "பொருளை மாற்றுவதால்", "இரண்டையும் ஒன்றாக இணைப்பதால்", "இரண்டும் ஒன்றே என்று கூறுவதால்"], ans: 3, exp: "உவமையும் உவமேயமும் வேறு வேறு இல்லாமல் இரண்டும் ஒன்றே என்பது தோன்றுமபடி கூறுவது உருவக அணி." },
  { q: "'கல்வி' குறட்பாவில் எந்த அணி பயன்படுத்தப்பட்டுள்ளது?", opts: ["உவமை அணி", "உருவக அணி", "ஏகதேச உருவக அணி", "இல்பொருள் அணி"], ans: 2, exp: "கற்றனைத்து ஊறும் அறிவு — கருமம் (செயல்) கட்டளைக்கல்லாக உருவகப்படுத்தப்பட்டுள்ளது. ஒரு பகுதி மட்டும் உருவகம் — ஏகதேச உருவக அணி." },
  { q: "ஏகதேச உருவக அணியில் கூறப்படும் இரு பொருள்களில் எத்தனை உருவகப்படும்?", opts: ["இரண்டும்", "ஒன்று மட்டும்", "எதுவும் இல்லை", "மூன்று"], ans: 1, exp: "ஏகதேச உருவக அணியில் இரு பொருள்களில் ஒன்றை மட்டும் உருவகப்படுத்தி, மற்றொன்றை உருவகப்படுத்தாமல் விடுவது." },
  { q: "யானையால் யானையாத் தற்று — இக்குறளில் எந்த அணி?", opts: ["உவமை அணி", "உருவக அணி", "ஏகதேச உருவக அணி", "இல்பொருள் அணி"], ans: 0, exp: "யானையால் யானையாத் தற்று என்று உவமை உருபுடன் ஒப்பீடு செய்யப்படுவதால் உவமை அணி." },
  { q: "நாட்டை பற்றி திருக்குறளில் எத்தனை குறட்பாக்கள் உள்ளன?", opts: ["2", "4", "6", "8"], ans: 0, exp: "இயல் இரண்டில் நாடு பற்றி 2 குறட்பாக்கள் (5 மற்றும் 6 குறள்கள்) பயிலப்படுகின்றன." },
  { q: "அரண் என்றால் என்ன?", opts: ["இல்லம்", "பாதுகாப்பான அரண்", "பண்ணை", "நகரம்"], ans: 1, exp: "அரண் என்பது ஒரு நாட்டின் பாதுகாப்பை மேற்கொள்ளும் அமைப்பு. நீர், நிலம், மலை, காடு இவை அரணுக்கு இயல்புகள்." },
  { q: "'எத்தனை' என்ற வினாச்சொல் எதை வினவ பயன்படுகிறது?", opts: ["இடம்", "காலம்", "எண்ணிக்கை", "நபர்"], ans: 2, exp: "'எத்தனை' என்ற வினாச்சொல் எண்ணிக்கை குறித்து வினவ பயன்படுகிறது. எ.கா: எத்தனை பேர் வந்தனர்?" },
  { q: "மக்கள் சமத்துவம் பற்றி கூறும் குறள் எந்த அதிகாரத்தில்?", opts: ["நாடு", "அரண்", "பெருமை", "வினைசெயல் வகை"], ans: 2, exp: "பிறப்பொக்கும் எல்லா உயிர்க்கும் — இக்குறள் பெருமை அதிகாரத்தில் உள்ளது." },
  { q: "உருவக அணியில் எத்தனை வகைகள் உள்ளன?", opts: ["ஒன்று", "இரண்டு", "மூன்று", "நான்கு"], ans: 1, exp: "உருவக அணியில் இரண்டு வகைகள்: உருவக அணி மற்றும் ஏகதேச உருவக அணி." },
  { q: "'எவற்றை' என்ற வினாச்சொல் எதை வினவ பயன்படுகிறது?", opts: ["ஒரு பொருள்", "பல பொருள்", "ஒரு நபர்", "ஒரு இடம்"], ans: 1, exp: "'எவற்றை' என்ற வினாச்சொல் பல பொருள் குறித்து வினவ பயன்படுகிறது. எ.கா: எவற்றை வாங்கினாய்?" },
  { q: "ஏன் என்ற வினாச்சொல் எதை வினவ பயன்படுகிறது?", opts: ["இடம்", "காலம்", "காரணம்", "முறை"], ans: 2, exp: "'ஏன்' என்ற வினாச்சொல் காரணம் குறித்து வினவ பயன்படுகிறது. எ.கா: ஏன் அழுகிறாய்?" },
  { q: "நாடென்ப நாடா வளத்தன நாடல்ல — இக்குறளின் கருத்து என்ன?", opts: ["முயற்சி செய்து வளம் பெறு", "வளம் தேடவேண்டாம்", "முயற்சி இல்லாமல் வளம்தரும் நாடே சிறந்தது", "மக்கள் வளமே நாட்டின் வளம்"], ans: 2, exp: "முயற்சி இல்லாமல் இயற்கையாகவே வளம்தரும் நாடே சிறந்த நாடு — முயற்சி செய்து சேரும் வளம் இல்லாத நாடு சிறந்த நாடு ஆகாது." },
  { q: "வினாச்சொற்கள் தொகுப்பில் இல்லாதது எது?", opts: ["எது", "என்ன", "இனி", "ஏன்"], ans: 2, exp: "எது, என்ன, எங்கு, எப்படி, எத்தனை, எப்பொழுது, எவற்றை, எதற்கு, ஏன், யார், யாது, யாவை என்பவை வினாச்சொற்கள். 'இனி' வினாச்சொல் அல்ல." },
  { q: "கற்றவர் முன் சொல்லிய பின் என்ன செய்ய வேண்டும்?", opts: ["திரும்பி போக வேண்டும்", "அவர்கள் கற்றதையும் கேட்டு அறிந்துகொள்ள வேண்டும்", "பொற்கால கொண்டாட வேண்டும்", "தொடர்ந்து பேச வேண்டும்"], ans: 1, exp: "கற்றார்முன் கற்ற செலச்சொல்லித் தாம்கற்ற மிக்காருள் மிக்க கொளல் — கற்றவர்கள் கற்றவற்றையும் கேட்டு அறிந்துகொள்க." },
  { q: "உவமைத் தொடரை 'முகமலர்' என்று உருவகமாக மாற்றும்போது என்ன நிகழ்கிறது?", opts: ["உவம உருபு சேர்கிறது", "இரண்டு சொற்களும் ஒன்றாக இணைக்கப்படுகின்றன", "உவமேயம் நீங்குகிறது", "உவமை நீங்குகிறது"], ans: 1, exp: "மலர் போன்ற முகம் (உவமை) → முகமலர் (உருவகம்). இரண்டும் ஒன்றாக இணைக்கப்படுகின்றன." },
  { q: "இயல் இரண்டில் எத்தனை திருக்குறள் பயிலப்படுகின்றன?", opts: ["5", "8", "10", "12"], ans: 2, exp: "இயல் இரண்டில் வினைசெயல் வகை, அவை அஞ்சாமை, நாடு, அரண், பெருமை ஆகிய அதிகாரங்களில் 10 திருக்குறள்கள் பயிலப்படுகின்றன." },
  { q: "'யாவை' என்ற வினாச்சொல் எதை வினவ பயன்படுகிறது?", opts: ["ஒரு பொருள்", "பல பொருள்", "ஒரு நபர்", "ஒரு இடம்"], ans: 1, exp: "'யாவை' என்ற வினாச்சொல் பல பொருள் குறித்து வினவ பயன்படுகிறது. எ.கா: யாவை தேவை?" },
  { q: "பெரும் புகழ் உடைய அரண் எப்போது பயனற்றதாகிறது?", opts: ["தண்ணீர் இல்லாமல்", "வீரர்கள் இல்லாமல்", "செயல் சிறப்பு இல்லாதவரிடம்", "மலை இல்லாமல்"], ans: 2, exp: "வினைமாட்சி இல்லார்கண் இல்லது அரண் — செயல் சிறப்பு இல்லாதவரிடத்தில் அரண் எவ்வளவு பெரியதாக இருந்தாலும் பயனில்லாதது." },
  { q: "உருவக அணியில் என்ன நிகழ்கிறது?", opts: ["உவமை வெளிப்படும்", "உவமேயம் தனியாக நிற்கும்", "உவமையும் உவமேயமும் ஒன்றாக இணையும்", "உவம உருபு வரும்"], ans: 2, exp: "உவமையும் உவமேயமும் வேறு வேறு இல்லாமல் இரண்டும் ஒன்றே என்பது தோன்றுமபடி கூறுவது உருவக அணி." },
  { q: "வினைசெயல் வகை குறளில் கூறப்படும் ஐந்தாவது விஷயம் எது?", opts: ["பொருள்", "கருவி", "காலம்", "இடம்"], ans: 3, exp: "பொருள், கருவி, காலம், விலன் (செயலின் தன்மை), இடம் ஆகிய ஐந்து. இடம் ஐந்தாவது." },
  { q: "'எதற்கு' என்ற வினாச்சொல் எதை வினவ பயன்படுகிறது?", opts: ["இடம்", "காரணம்", "முறை", "நபர்"], ans: 1, exp: "'எதற்கு' என்ற வினாச்சொல் காரணம் குறித்து வினவ பயன்படுகிறது. எ.கா: எதற்கு படிக்கிறாய்?" },
  { q: "ஏகதேச உருவக அணியில் எத்தனை பொருள்கள் உருவகப்படும்?", opts: ["இரண்டும்", "ஒன்று மட்டும்", "மூன்று", "எதுவும் இல்லை"], ans: 1, exp: "இரு பொருள்களில் ஒன்றை மட்டும் உருவகப்படுத்தி மற்றொன்றை உருவகப்படுத்தாமல் விடுவது ஏகதேச உருவக அணி." },
  { q: "'யாது' என்ற வினாச்சொல் எதை வினவ பயன்படுகிறது?", opts: ["நபர்", "பொருள்", "இடம்", "காலம்"], ans: 1, exp: "'யாது' என்ற வினாச்சொல் பொருள் குறித்து வினவ பயன்படுகிறது. எ.கா: யாது உண்மை?" },
  { q: "இயல் இரண்டு அணி இலக்கணத்தில் கற்ற அணிகள் எவை?", opts: ["உவமை அணி மட்டும்", "உருவக அணி மட்டும்", "உருவக அணி, ஏகதேச உருவக அணி", "இல்பொருள் அணி மட்டும்"], ans: 2, exp: "இயல் இரண்டு அணி இலக்கணத்தில் உருவக அணி மற்றும் ஏகதேச உருவக அணி கற்கப்படுகின்றன." },
  { q: "'எப்பொழுது' என்ற வினாச்சொல் எதை வினவ பயன்படுகிறது?", opts: ["இடம்", "காலம்", "முறை", "நபர்"], ans: 1, exp: "'எப்பொழுது' என்ற வினாச்சொல் காலம் குறித்து வினவ பயன்படுகிறது. எ.கா: எப்பொழுது வருவாய்?" },
  { q: "கருமமே கட்டளைக்கல் — இந்தக் குறட்பாவில் எந்த அணி?", opts: ["உவமை அணி", "உருவக அணி", "ஏகதேச உருவக அணி", "இல்பொருள் அணி"], ans: 2, exp: "கருமம் கட்டளைக்கல்லாக உருவகப்படுத்தப்பட்டுள்ளது. மக்கள் உயர்வு/தாழ்வு (பொன்னாக) உருவகப்படுத்தப்படவில்லை. ஒரு பகுதி மட்டும் — ஏகதேச உருவக அணி." },
];

const GAME_LEVELS = [
  { level: 1, name: "துவக்கம்", color: "#f97316", questions: [0,1,2,3,4] },
  { level: 2, name: "வளர்ச்சி", color: "#8b5cf6", questions: [5,6,7,8,9] },
  { level: 3, name: "மேம்பாடு", color: "#06b6d4", questions: [10,11,12,13,14] },
  { level: 4, name: "நிபுணர்", color: "#10b981", questions: [15,16,17,18,19] },
  { level: 5, name: "மாஸ்டர்", color: "#ef4444", questions: [20,21,22,23,24] },
];

function NoteCard({ note }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 16, border: `1.5px solid ${note.color}40`, marginBottom: 16, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", cursor: "pointer", background: open ? `${note.color}15` : "transparent" }}>
        <span style={{ fontSize: 28 }}>{note.icon}</span>
        <span style={{ flex: 1, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 17, fontWeight: 700, color: note.color }}>{note.title}</span>
        <span style={{ color: note.color, fontSize: 20 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: "0 20px 20px" }}>
          {note.content.map((c, i) => {
            if (c.type === "text") return <p key={i} style={{ color: "#e2e8f0", lineHeight: 1.8, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 15, marginTop: 12 }} dangerouslySetInnerHTML={{ __html: c.value.replace(/\*\*(.*?)\*\*/g, `<strong style="color:${note.color}">$1</strong>`) }} />;
            if (c.type === "table") return (
              <div key={i} style={{ overflowX: "auto", marginTop: 14 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13 }}>
                  <thead><tr>{c.headers.map((h, j) => <th key={j} style={{ background: `${note.color}30`, color: note.color, padding: "10px 14px", textAlign: "left", borderBottom: `2px solid ${note.color}` }}>{h}</th>)}</tr></thead>
                  <tbody>{c.rows.map((row, j) => <tr key={j} style={{ background: j % 2 === 0 ? "rgba(255,255,255,0.04)" : "transparent" }}>{row.map((cell, k) => <td key={k} style={{ padding: "10px 14px", color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            );
            if (c.type === "diagram") return (
              <div key={i} style={{ marginTop: 14 }}>
                <div style={{ color: note.color, fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>{c.title}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {c.items.map((item, j) => (
                    <div key={j} style={{ flex: "1 1 200px", background: `${note.color}15`, border: `1px solid ${note.color}40`, borderRadius: 10, padding: 12 }}>
                      <div style={{ color: note.color, fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 12 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
            if (c.type === "example") return (
              <div key={i} style={{ marginTop: 14, background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: 14, borderLeft: `3px solid ${note.color}` }}>
                <div style={{ color: note.color, fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>{c.title}</div>
                <div style={{ color: "#fbbf24", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14, whiteSpace: "pre-line", fontStyle: "italic", marginBottom: 10 }}>{c.verse}</div>
                <div style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13, marginBottom: 10 }}>{c.meaning}</div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  {c.analysis.map((row, j) => <tr key={j}><td style={{ color: note.color, fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13, padding: "4px 10px 4px 0", whiteSpace: "nowrap" }}>{row[0]}</td><td style={{ color: "#cbd5e1", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13, padding: "4px 0" }}>{row[1]}</td></tr>)}
                </table>
              </div>
            );
            if (c.type === "examples_list") return (
              <div key={i} style={{ marginTop: 14 }}>
                <div style={{ color: note.color, fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>{c.title}</div>
                {c.items.map((item, j) => (
                  <div key={j} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: 10, marginBottom: 8 }}>
                    <div style={{ color: "#fbbf24", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{item.sent}</div>
                    <div style={{ color: note.color, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 12 }}>💡 {item.note}</div>
                  </div>
                ))}
              </div>
            );
            if (c.type === "comparison") return (
              <div key={i} style={{ marginTop: 14 }}>
                <div style={{ color: note.color, fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>{c.title}</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[c.left, c.right].map((side, j) => (
                    <div key={j} style={{ flex: "1 1 200px", background: j === 0 ? "rgba(249,115,22,0.15)" : "rgba(139,92,246,0.15)", borderRadius: 10, padding: 12, border: `1px solid ${j === 0 ? "#f9731640" : "#8b5cf640"}` }}>
                      <div style={{ color: j === 0 ? "#f97316" : "#8b5cf6", fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13, marginBottom: 8 }}>{side.label}</div>
                      {side.points.map((p, k) => <div key={k} style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 12, marginBottom: 4 }}>• {p}</div>)}
                    </div>
                  ))}
                </div>
              </div>
            );
            return null;
          })}
        </div>
      )}
    </div>
  );
}

function QuizTab() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = QUIZ_QUESTIONS[current];
  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.ans) setScore(s => s + 1);
  };
  const handleNext = () => {
    if (current + 1 >= QUIZ_QUESTIONS.length) { setFinished(true); return; }
    setCurrent(c => c + 1); setSelected(null);
  };
  const handleRestart = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); };
  if (finished) return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{score >= QUIZ_QUESTIONS.length * 0.8 ? "🏆" : "📚"}</div>
      <div style={{ color: "#fbbf24", fontSize: 28, fontWeight: 900, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>முடிந்தது!</div>
      <div style={{ color: "#e2e8f0", fontSize: 22, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 24 }}>{score} / {QUIZ_QUESTIONS.length}</div>
      <button onClick={handleRestart} style={{ background: "linear-gradient(135deg,#f97316,#8b5cf6)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>மீண்டும் தொடங்கு</button>
    </div>
  );
  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14 }}>கேள்வி {current + 1} / {QUIZ_QUESTIONS.length}</span>
        <span style={{ background: "rgba(249,115,22,0.3)", color: "#fdba74", borderRadius: 20, padding: "4px 14px", fontSize: 14, fontFamily: "'Noto Sans Tamil', sans-serif" }}>மதிப்பெண்: {score}</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 20, marginBottom: 18 }}>
        <p style={{ color: "#e2e8f0", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 17, lineHeight: 1.7, margin: 0 }}>{q.q}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.06)"; let border = "1px solid rgba(255,255,255,0.1)"; let color = "#e2e8f0";
          if (selected !== null) {
            if (i === q.ans) { bg = "rgba(16,185,129,0.25)"; border = "1.5px solid #10b981"; color = "#6ee7b7"; }
            else if (i === selected && i !== q.ans) { bg = "rgba(239,68,68,0.2)"; border = "1.5px solid #ef4444"; color = "#fca5a5"; }
          }
          return <button key={i} onClick={() => handleSelect(i)} style={{ background: bg, border, borderRadius: 10, padding: "12px 16px", color, cursor: selected !== null ? "default" : "pointer", textAlign: "left", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 15 }}><span style={{ marginRight: 10, opacity: 0.6 }}>{["அ", "ஆ", "இ", "ஈ"][i]})</span>{opt}</button>;
        })}
      </div>
      {selected !== null && <div style={{ marginTop: 16, background: "rgba(249,115,22,0.15)", border: "1px solid #f9731640", borderRadius: 10, padding: 14 }}><div style={{ color: "#fdba74", fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 6 }}>📝 விளக்கம்</div><div style={{ color: "#cbd5e1", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14, lineHeight: 1.7 }}>{q.exp}</div></div>}
      {selected !== null && <button onClick={handleNext} style={{ marginTop: 16, background: "linear-gradient(135deg,#f97316,#8b5cf6)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 15, cursor: "pointer", width: "100%", fontFamily: "'Noto Sans Tamil', sans-serif" }}>{current + 1 >= QUIZ_QUESTIONS.length ? "முடிவு பார்க்க →" : "அடுத்த கேள்வி →"}</button>}
    </div>
  );
}

function GameTab() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [lives, setLives] = useState(3);
  const [levelScore, setLevelScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const level = GAME_LEVELS[levelIdx];
  const q = QUIZ_QUESTIONS[level.questions[qIdx]];
  const handleSelect = (i) => {
    if (selected !== null || gameOver) return;
    setSelected(i);
    if (i === q.ans) { setLevelScore(s => s + 10); setTotalScore(s => s + 10); }
    else { const nl = lives - 1; setLives(nl); if (nl <= 0) { setGameOver(true); return; } }
    setTimeout(() => { const nq = qIdx + 1; if (nq >= level.questions.length) { setLevelComplete(true); } else { setQIdx(nq); setSelected(null); } }, 900);
  };
  const nextLevel = () => { if (levelIdx + 1 >= GAME_LEVELS.length) { setGameOver(true); return; } setLevelIdx(l => l + 1); setQIdx(0); setSelected(null); setLevelScore(0); setLevelComplete(false); };
  const restart = () => { setLevelIdx(0); setQIdx(0); setSelected(null); setLives(3); setLevelScore(0); setTotalScore(0); setGameOver(false); setLevelComplete(false); };
  if (gameOver) return <div style={{ textAlign: "center", padding: 40 }}><div style={{ fontSize: 64, marginBottom: 12 }}>{lives <= 0 ? "💔" : "🏆"}</div><div style={{ color: "#fbbf24", fontSize: 26, fontWeight: 900, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>{lives <= 0 ? "விளையாட்டு முடிந்தது!" : "வாழ்த்துக்கள்!"}</div><div style={{ color: "#e2e8f0", fontSize: 20, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 24 }}>மொத்தம்: {totalScore}</div><button onClick={restart} style={{ background: "linear-gradient(135deg,#f97316,#8b5cf6)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>மீண்டும் விளையாடு</button></div>;
  if (levelComplete) return <div style={{ textAlign: "center", padding: 40 }}><div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div><div style={{ color: level.color, fontSize: 24, fontWeight: 900, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>நிலை {level.level} முடிந்தது!</div><div style={{ color: "#e2e8f0", fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 24 }}>மொத்தம்: {totalScore}</div>{levelIdx + 1 < GAME_LEVELS.length ? <button onClick={nextLevel} style={{ background: `linear-gradient(135deg,${level.color},#10b981)`, border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>அடுத்த நிலை →</button> : <button onClick={() => setGameOver(true)} style={{ background: "linear-gradient(135deg,#fbbf24,#ef4444)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>முடிவு 🏆</button>}</div>;
  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <span style={{ color: level.color, fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14 }}>நிலை {level.level}: {level.name} • கேள்வி {qIdx+1}/{level.questions.length}</span>
        <div style={{ display: "flex", gap: 12 }}><span style={{ color: "#fbbf24", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14 }}>⭐ {totalScore}</span><span>{"❤️".repeat(lives)}{"🖤".repeat(3-lives)}</span></div>
      </div>
      <div style={{ background: `${level.color}15`, border: `1.5px solid ${level.color}50`, borderRadius: 14, padding: 20, marginBottom: 18 }}>
        <p style={{ color: "#e2e8f0", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 16, lineHeight: 1.7, margin: 0 }}>{q.q}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.06)"; let border = "1px solid rgba(255,255,255,0.12)";
          if (selected !== null) { if (i === q.ans) { bg = "rgba(16,185,129,0.25)"; border = "1.5px solid #10b981"; } else if (i === selected && i !== q.ans) { bg = "rgba(239,68,68,0.2)"; border = "1.5px solid #ef4444"; } }
          return <button key={i} onClick={() => handleSelect(i)} style={{ background: bg, border, borderRadius: 10, padding: "12px 14px", color: "#e2e8f0", cursor: selected !== null ? "default" : "pointer", textAlign: "left", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14 }}><span style={{ color: level.color, marginRight: 8, fontWeight: 700 }}>{["அ","ஆ","இ","ஈ"][i]})</span>{opt}</button>;
        })}
      </div>
    </div>
  );
}

export default function Chapter8() {
  const [tab, setTab] = useState("notes");
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1a0533 0%,#2d1b69 50%,#0f172a 100%)", fontFamily: "'Noto Sans Tamil','Segoe UI',sans-serif", padding: "0 0 40px" }}>
      <div style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
            <div style={{ background: "linear-gradient(135deg,#f97316,#8b5cf6)", borderRadius: 12, padding: "8px 14px", fontSize: 22 }}>🔥</div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>7ஆம் வகுப்பு தமிழ் • இயல் 2</div>
              <h1 style={{ color: "#fff", fontSize: "clamp(18px,4vw,26px)", fontWeight: 900, margin: 0, fontFamily: "'Noto Sans Tamil',sans-serif" }}>உருவக அணி + திருக்குறள்</h1>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: "24px auto 0", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 28, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 6 }}>
          {[["notes","📒 குறிப்புகள்"],["quiz","✍️ வினாடி வினா"],["game","🎮 விளையாட்டு"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: "clamp(12px,3vw,15px)", fontFamily: "'Noto Sans Tamil',sans-serif", fontWeight: 700, transition: "all 0.25s", background: tab === id ? "linear-gradient(135deg,#f97316,#8b5cf6)" : "transparent", color: tab === id ? "#fff" : "#94a3b8" }}>{label}</button>
          ))}
        </div>
        {tab === "notes" && (
          <div>
            <div style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil',sans-serif", fontSize: 14, marginBottom: 18, textAlign: "center" }}>📌 ஒவ்வொரு தலைப்பையும் கிளிக் செய்து விரிவாகப் படியுங்கள்</div>
            {NOTES.map(n => <NoteCard key={n.id} note={n} />)}
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 20, marginTop: 10 }}>
              <div style={{ color: "#f97316", fontWeight: 700, fontFamily: "'Noto Sans Tamil',sans-serif", fontSize: 16, marginBottom: 14 }}>📊 அணி வகைகள் — ஒப்பீட்டு அட்டவணை</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Noto Sans Tamil',sans-serif", fontSize: 13 }}>
                  <thead><tr>{["அணி","இரண்டும் உருவகம்","ஒன்று உருவகம்","எடுத்துக்காட்டு"].map((h,i) => <th key={i} style={{ background: "rgba(249,115,22,0.15)", color: "#f97316", padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #f9731640" }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[["உருவக அணி","✅","❌","தமிழ்த்தேன், இன்பவெள்ளம்"],["ஏகதேச உருவக அணி","❌","✅","அறிவு விளக்கம், கருமமே கட்டளைக்கல்"]].map((row,j) => <tr key={j} style={{ background: j%2===0?"rgba(255,255,255,0.03)":"transparent" }}>{row.map((cell,k) => <td key={k} style={{ padding:"10px 12px",color:"#cbd5e1",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{cell}</td>)}</tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {tab === "quiz" && <QuizTab />}
        {tab === "game" && <GameTab />}
      </div>
    </div>
  );
}
