import { useState } from "react";

// ============================================================
// CHAPTER 7 — அணி இலக்கணம் (Figures of Speech)
// ============================================================

const NOTES = [
  {
    id: 1,
    title: "அணி என்றால் என்ன?",
    icon: "🌸",
    color: "#f59e0b",
    content: [
      {
        type: "text",
        value: "அணி என்னும சொல்லுக்கு **அழகு** என்பது பொருள். ஒரு செய்யுளைச் சொல்லாலும், பொருளாலும் அழகு பெறச் செய்தலை **அணி** என்பர்."
      },
      {
        type: "table",
        headers: ["அணி வகை", "விளக்கம்", "எடுத்துக்காட்டு"],
        rows: [
          ["உவமை அணி", "உவமையும் உவமேயமும் வந்து உவம உருபு வெளிப்படையாக வரும்", "மயில் போல் ஆடினாள்"],
          ["எடுத்துக்காட்டு உவமை அணி", "உவமை ஒரு தொடராக, உவமேயம் ஒரு தொடராக வந்து உவம உருபு மறைந்து வரும்", "தோட்டனைத்து ஊறும் மணற்கேணி..."],
          ["இல்பொருள் உவமை அணி", "உலகில் இல்லாத ஒன்றை உவமையாகக் கூறுவது", "பொன்மழை பொழிந்தது போல் தோன்றியது"],
        ]
      }
    ]
  },
  {
    id: 2,
    title: "உவமை அணி",
    icon: "🦚",
    color: "#10b981",
    content: [
      {
        type: "text",
        value: "ஒரு பாடலில் **உவமையும்**, **உவமேயமும்** வந்து உவம உருபு வெளிப்படையாக வந்தால் அது **உவமை அணி** எனப்படும்."
      },
      {
        type: "diagram",
        title: "உவமை அணி கட்டமைப்பு",
        items: [
          { label: "உவமை (Simile object)", desc: "ஒப்பிட்டுக் கூறப்படும் பொருள் (மயில், மீன்)" },
          { label: "உவமேயம் (Compared object)", desc: "உவமையால் விளக்கப்படும் பொருள் (ஆடும் பெண், கண்)" },
          { label: "உவம உருபு (Simile marker)", desc: "போல், போன்ற, அன்ன, இன்ன, அற்று, மான, கடுப்ப, ஒப்ப, உறழ" },
        ]
      },
      {
        type: "example",
        title: "குறள் எடுத்துக்காட்டு",
        verse: "அகழ்வாரைத் தாங்கும் நிலம்போலத் தம்மை\nஇகழ்வார்ப் பொறுத்தல் தலை",
        meaning: "பூமி தன்னைத் தோண்டுபவரைப் பொறுத்துக்கொள்வது போல் நாம் நம்மை இகழ்ந்து பேசுபவரைப் பொறுத்துக்கொள்ள வேண்டும்.",
        analysis: [
          ["உவமை", "பூமி தன்னைத் தோண்டுபவரைப் பொறுத்துக்கொள்ளுதல்"],
          ["உவமேயம்", "நாம் இகழ்ந்து பேசுபவரைப் பொறுத்துக்கொள்ள வேண்டும்"],
          ["உவம உருபு", "போல்"],
        ]
      }
    ]
  },
  {
    id: 3,
    title: "எடுத்துக்காட்டு உவமை அணி",
    icon: "📖",
    color: "#6366f1",
    content: [
      {
        type: "text",
        value: "உவமை **ஒரு தொடராக**வும் உவமேயம் **ஒரு தொடராக**வும் வந்து உவம உருபு **மறைந்து** வந்தால் அஃது **எடுத்துக்காட்டு உவமை அணி** எனப்படும்."
      },
      {
        type: "example",
        title: "குறள் எடுத்துக்காட்டு",
        verse: "தோட்டனைத்து ஊறும் மணற்கேணி மாந்தர்க்குக்\nகற்றனைத்து ஊறும் அறிவு",
        meaning: "மணற்கேணியில் தோண்டிய அளவிற்கு நீர் ஊறும். மனிதர்கள் கற்கும் அளவிற்கு ஏற்ப அறிவு பெருகும்.",
        analysis: [
          ["உவமை", "தோட்டனைத்து ஊறும் மணற்கேணி"],
          ["உவமேயம்", "மாந்தர்க்குக் கற்றனைத்து ஊறும் அறிவு"],
          ["உவம உருபு", "அதுபோல் — மறைந்து வருகிறது"],
        ]
      },
      {
        type: "comparison",
        title: "உவமை அணி vs எடுத்துக்காட்டு உவமை அணி",
        left: { label: "உவமை அணி", points: ["உவம உருபு வெளிப்படையாக வரும்", "போல், போன்ற என வெளிப்படும்"] },
        right: { label: "எடுத்துக்காட்டு உவமை அணி", points: ["உவம உருபு மறைந்து வரும்", "'அதுபோல்' என்பது இடையில் வராது"] }
      }
    ]
  },
  {
    id: 4,
    title: "இல்பொருள் உவமை அணி",
    icon: "✨",
    color: "#ec4899",
    content: [
      {
        type: "text",
        value: "உலகில் **இல்லாத** ஒன்றை உவமையாகக் கூறுவதை **இல்பொருள் உவமை அணி** என்பர்."
      },
      {
        type: "examples_list",
        title: "எடுத்துக்காட்டுகள்",
        items: [
          { sent: "மாலை வெயிலில் மழைத்தூறல் போன்மழை பொழிந்தது போல் தோன்றியது.", note: "உலகில் பொன்மழை பொழிவது இல்லை — இல்பொருள்" },
          { sent: "காளை கொம்பு முளைத்த குதிரை போலப் பாய்ந்து வந்தது.", note: "கொம்பு முளைத்த குதிரை இல்லை — இல்பொருள்" },
        ]
      },
      {
        type: "table",
        headers: ["தொடர்கள்", "உவமை", "உவமேயம்", "உவம உருபு"],
        rows: [
          ["மலரன்ன பாதம் மலர் பாதம் அன்ன", "மலர்", "பாதம்", "அன்ன"],
          ["தேன் போன்ற தமிழ்", "தேன்", "தமிழ்", "போன்ற"],
          ["புலி போலப் பாய்ந்தான் சோழன்", "புலி", "சோழன்", "போல"],
          ["மயிலோப்ப ஆடினாள் மாதவி", "மயில்", "மாதவி", "ஒப்ப"],
        ]
      }
    ]
  }
];

const QUIZ_QUESTIONS = [
  { q: "அணி என்னும் சொல்லுக்கு என்ன பொருள்?", opts: ["அழகு", "ஒப்பு", "வேறுபாடு", "சிறப்பு"], ans: 0, exp: "அணி என்னும் சொல்லுக்கு 'அழகு' என்பது பொருள். ஒரு செய்யுளைச் சொல்லாலும் பொருளாலும் அழகு பெறச் செய்தலை அணி என்பர்." },
  { q: "உவமை அணியில் உவம உருபு எவ்வாறு வரும்?", opts: ["மறைந்து வரும்", "வெளிப்படையாக வரும்", "இரண்டு வகையிலும் வரும்", "வராது"], ans: 1, exp: "உவமை அணியில் உவம உருபு வெளிப்படையாக வரும். போல், போன்ற போன்ற உவம உருபுகள் வெளிப்படையாகத் தெரியும்." },
  { q: "எடுத்துக்காட்டு உவமை அணியில் உவம உருபு எவ்வாறு வரும்?", opts: ["வெளிப்படையாக வரும்", "மறைந்து வரும்", "இரண்டு வகையிலும் வரும்", "வராது"], ans: 1, exp: "எடுத்துக்காட்டு உவமை அணியில் உவம உருபு மறைந்து வரும். இது உவமை அணிக்கும் இதற்கும் உள்ள முக்கிய வேறுபாடு." },
  { q: "'மயில் போல் ஆடினாள்' — இத்தொடரில் உவமை எது?", opts: ["ஆடினாள்", "மயில்", "போல்", "இல்லை"], ans: 1, exp: "மயில் என்பது உவமை (ஒப்பிட்டுக் கூறப்படும் பொருள்). ஆடினாள் என்பது உவமேயம்." },
  { q: "'மீன் போன்ற கண்' — இத்தொடரில் உவமேயம் எது?", opts: ["மீன்", "போன்ற", "கண்", "எதுவும் இல்லை"], ans: 2, exp: "கண் என்பது உவமேயம் (உவமையால் விளக்கப்படும் பொருள்). மீன் என்பது உவமை, போன்ற என்பது உவம உருபு." },
  { q: "உவமை உருபுகளில் இடம்பெறாதது எது?", opts: ["போல்", "புரைய", "அன்ன", "அவ்வாறு"], ans: 3, exp: "போல், புரைய, அன்ன, இன்ன, அற்று, மான, கடுப்ப, ஒப்ப, உறழ என்பவை உவம உருபுகள். 'அவ்வாறு' உவம உருபு அல்ல." },
  { q: "உலகில் இல்லாத ஒன்றை உவமையாகக் கூறுவது எந்த அணி?", opts: ["உவமை அணி", "எடுத்துக்காட்டு உவமை அணி", "இல்பொருள் உவமை அணி", "உருவக அணி"], ans: 2, exp: "உலகில் இல்லாத ஒன்றை உவமையாகக் கூறுவதை இல்பொருள் உவமை அணி என்பர்." },
  { q: "'பொன்மழை பொழிந்தது போல் தோன்றியது' — இது எந்த அணி?", opts: ["உவமை அணி", "எடுத்துக்காட்டு உவமை அணி", "இல்பொருள் உவமை அணி", "உருவக அணி"], ans: 2, exp: "உலகில் பொன்மழை பொழிவது இல்லை. இல்லாத பொருளை உவமையாகக் கூறுவதால் இது இல்பொருள் உவமை அணி." },
  { q: "'தோட்டனைத்து ஊறும் மணற்கேணி' என்ற குறளில் எந்த அணி?", opts: ["உவமை அணி", "எடுத்துக்காட்டு உவமை அணி", "இல்பொருள் உவமை அணி", "உருவக அணி"], ans: 1, exp: "உவம உருபு மறைந்து வந்துள்ளது. உவமை ஒரு தொடராக, உவமேயம் ஒரு தொடராக வந்துள்ளதால் இது எடுத்துக்காட்டு உவமை அணி." },
  { q: "'அகழ்வாரைத் தாங்கும் நிலம்போலத் தம்மை இகழ்வார்ப் பொறுத்தல் தலை' — இந்தக் குறளில் உவம உருபு எது?", opts: ["நிலம்", "அகழ்வாரைத்", "போல்", "பொறுத்தல்"], ans: 2, exp: "'போல்' என்பது உவம உருபு. நிலம் என்பது உவமை, நாம் பொறுத்தல் என்பது உவமேயம்." },
  { q: "உவமையால் விளக்கப்படும் பொருளை என்ன என்பர்?", opts: ["உவமை", "உவமேயம்", "உவம உருபு", "அணி"], ans: 1, exp: "உவமையால் விளக்கப்படும் பொருளை உவமேயம் என்பர். ஒப்பிட்டுக் கூறப்படும் பொருளை உவமை என்பர்." },
  { q: "ஒப்பிட்டுக் கூறப்படும் பொருளை என்ன என்பர்?", opts: ["உவமை", "உவமேயம்", "உவம உருபு", "அணி"], ans: 0, exp: "ஒப்பிட்டுக் கூறப்படும் பொருளை (மயில், மீன் போன்றவை) உவமை என்பர்." },
  { q: "கற்பவை கற்றபின் வேறுபடுத்துக — 'மலரன்ன பாதம்' — இதில் உவம உருபு எது?", opts: ["மலர்", "பாதம்", "அன்ன", "மலரன்ன"], ans: 2, exp: "'அன்ன' என்பது உவம உருபு. மலர் — உவமை, பாதம் — உவமேயம்." },
  { q: "'மயிலோப்ப ஆடினாள் மாதவி' — இதில் உவம உருபு எது?", opts: ["மயில்", "ஆடினாள்", "மாதவி", "ஒப்ப"], ans: 3, exp: "'ஒப்ப' என்பது உவம உருபு. மயில் — உவமை, மாதவி — உவமேயம்." },
  { q: "'புலி போலப் பாய்ந்தான் சோழன்' — உவமேயம் எது?", opts: ["புலி", "போல", "பாய்ந்தான்", "சோழன்"], ans: 3, exp: "சோழன் என்பது உவமேயம். புலி — உவமை, போல — உவம உருபு." },
  { q: "எடுத்துக்காட்டு உவமை அணியின் மற்றொரு பெயர் என்ன?", opts: ["முதலாகு பெயர்", "இல்பொருள் அணி", "குறிப்பு உவமை", "பொருள் உவமை"], ans: 0, exp: "எடுத்துக்காட்டு உவமை அணியில் உவமை ஒரு தொடராகவும் உவமேயம் ஒரு தொடராகவும் வந்து உவம உருபு மறைந்து வரும்." },
  { q: "உவமை அணியில் எத்தனை கூறுகள் உள்ளன?", opts: ["இரண்டு", "மூன்று", "நான்கு", "ஐந்து"], ans: 1, exp: "உவமை அணியில் மூன்று கூறுகள்: உவமை, உவமேயம், உவம உருபு." },
  { q: "'கொம்பு முளைத்த குதிரை போல' என்பது எந்த அணி?", opts: ["உவமை அணி", "இல்பொருள் உவமை அணி", "எடுத்துக்காட்டு உவமை அணி", "உருவக அணி"], ans: 1, exp: "கொம்பு முளைத்த குதிரை உலகில் இல்லாத பொருள். உலகில் இல்லாதை உவமையாக்குவது இல்பொருள் உவமை அணி." },
  { q: "அணி இலக்கணம் எந்த இயலில் இடம்பெற்றுள்ளது?", opts: ["இயல் ஒன்று", "இயல் இரண்டு", "இயல் மூன்று", "இயல் நான்கு"], ans: 0, exp: "7ஆம் வகுப்பு தமிழ் மூன்றாம் பருவம் இயல் ஒன்றில் அணி இலக்கணம் இடம்பெற்றுள்ளது." },
  { q: "உவமை உருபுகளில் சேராதது எது?", opts: ["இன்ன", "அற்று", "மான", "தகு"], ans: 3, exp: "போல், புரைய, அன்ன, இன்ன, அற்று, மான, கடுப்ப, ஒப்ப, உறழ என்பவை உவம உருபுகள். 'தகு' இல்லை." },
  { q: "தோட்டனைத்து ஊறும் மணற்கேணி — இக்குறளில் உவமை எது?", opts: ["மணற்கேணி", "மாந்தர்க்கு", "அறிவு", "கற்றல்"], ans: 0, exp: "தோட்டனைத்து ஊறும் மணற்கேணி என்பது உவமை. மாந்தர்க்குக் கற்றனைத்து ஊறும் அறிவு என்பது உவமேயம்." },
  { q: "'தேன் போன்ற தமிழ்' — இதில் உவமேயம் எது?", opts: ["தேன்", "போன்ற", "தமிழ்", "இல்லை"], ans: 2, exp: "தமிழ் என்பது உவமேயம். தேன் என்பது உவமை, போன்ற என்பது உவம உருபு." },
  { q: "உவமை அணியும் எடுத்துக்காட்டு உவமை அணியும் வேறுபடுவது எதனால்?", opts: ["உவமையால்", "உவமேயத்தால்", "உவம உருபினால்", "பொருளால்"], ans: 2, exp: "உவமை அணியில் உவம உருபு வெளிப்படையாக வரும். எடுத்துக்காட்டு உவமை அணியில் உவம உருபு மறைந்து வரும் — வேறுபாடு உவம உருபினால்." },
  { q: "மலரன்ன பாதம் — இத்தொடரில் அணி எது?", opts: ["உவமை அணி", "எடுத்துக்காட்டு உவமை அணி", "இல்பொருள் உவமை அணி", "உருவக அணி"], ans: 0, exp: "'அன்ன' என்ற உவம உருபு வெளிப்படையாக வந்துள்ளதால் இது உவமை அணி." },
  { q: "ஒரு பாடலில் உவமேயமும் உவமையும் ஒன்றாக அமைவது எந்த அணி?", opts: ["உவமை அணி", "எடுத்துக்காட்டு உவமை அணி", "இல்பொருள் உவமை அணி", "உருவக அணி"], ans: 3, exp: "உருவக அணியில் உவமேயமும் உவமையும் வேறு வேறு இல்லாமல் இரண்டும் ஒன்றே என்பது தோன்றுமபடி கூறப்படும்." },
  { q: "'போல்' என்பது எவ்வகை சொல்?", opts: ["பெயர்ச்சொல்", "வினைச்சொல்", "உவம உருபு", "இடைச்சொல்"], ans: 2, exp: "'போல்' என்பது உவம உருபு. இது ஒப்பீடு செய்யும்போது பயன்படுத்தப்படுகிறது." },
  { q: "அணி இலக்கணத்தில் ஆய்வு செய்யப்படுவது எது?", opts: ["ஒலி நயம்", "சொல் அழகு மற்றும் பொருள் அழகு", "யாப்பு", "எழுத்து அமைப்பு"], ans: 1, exp: "அணி இலக்கணம் சொல்லாலும் பொருளாலும் ஒரு செய்யுளை எவ்வாறு அழகுபடுத்துகிறோம் என்பதை ஆய்வு செய்கிறது." },
  { q: "'நகும் சலை இட்ட விளக்கு போல்' — இது எந்த அணி?", opts: ["உவமை அணி", "எடுத்துக்காட்டு உவமை அணி", "இல்பொருள் உவமை அணி", "நேர் உவமை"], ans: 0, exp: "உவம உருபு (போல்) வெளிப்படையாக வந்துள்ளதால் இது உவமை அணி." },
  { q: "மணற்கேணி உவமையில் என்ன நூல் காட்டப்படுகிறது?", opts: ["புறநானூறு", "திருக்குறள்", "அகநானூறு", "நற்றிணை"], ans: 1, exp: "தோட்டனைத்து ஊறும் மணற்கேணி என்ற குறள் திருக்குறளில் 'கல்வி' என்ற அதிகாரத்தில் உள்ளது." },
  { q: "உவமை அணியில் எத்தனை வகை உவம உருபுகள் குறிப்பிடப்பட்டுள்ளன?", opts: ["5", "7", "9", "11"], ans: 2, exp: "போல், புரைய, அன்ன, இன்ன, அற்று, மான, கடுப்ப, ஒப்ப, உறழ என ஒன்பது உவம உருபுகள் குறிப்பிடப்பட்டுள்ளன." },
  { q: "நிலம் போல் பொறுத்தல் — இந்தக் கருத்து எந்த குறட்பாவில் வருகிறது?", opts: ["பொறையுடைமை", "கல்வி", "நாடு", "அரண்"], ans: 0, exp: "அகழ்வாரைத் தாங்கும் நிலம்போலத் தம்மை இகழ்வார்ப் பொறுத்தல் தலை — இக்குறள் 'பொறையுடைமை' அதிகாரத்தில் உள்ளது." },
  { q: "உவமை ஒரு தொடராகவும் உவமேயம் ஒரு தொடராகவும் வருவது எந்த அணி?", opts: ["உவமை அணி", "எடுத்துக்காட்டு உவமை அணி", "இல்பொருள் உவமை அணி", "உருவக அணி"], ans: 1, exp: "உவமை ஒரு தொடராகவும் உவமேயம் ஒரு தொடராகவும் வந்து உவம உருபு மறைந்து வந்தால் அஃது எடுத்துக்காட்டு உவமை அணி." },
  { q: "'உறழ' என்பது எவ்வகை சொல்?", opts: ["பெயர்ச்சொல்", "உவம உருபு", "வினைச்சொல்", "இடைச்சொல்"], ans: 1, exp: "'உறழ' என்பது உவம உருபுகளில் ஒன்று. போல், புரைய, அன்ன, இன்ன, அற்று, மான, கடுப்ப, ஒப்ப, உறழ என்பவை உவம உருபுகள்." },
  { q: "ஒரு செய்யுளை அழகுபடுத்துவது எதன் வழியாக?", opts: ["மட்டும் சொல்லால்", "மட்டும் பொருளால்", "சொல்லாலும் பொருளாலும்", "யாப்பினால்"], ans: 2, exp: "ஒரு செய்யுளைச் சொல்லாலும் பொருளாலும் அழகு பெறச் செய்தலை அணி என்பர்." },
  { q: "இல்பொருள் உவமை அணியில் என்ன சிறப்பு உள்ளது?", opts: ["உவமை மட்டும் வரும்", "உலகில் இல்லாதது உவமையாக வரும்", "உவம உருபு வராது", "உவமேயம் வராது"], ans: 1, exp: "உலகில் இல்லாத ஒன்றை உவமையாகக் கூறுவது இல்பொருள் உவமை அணியின் சிறப்பியல்பு." },
  { q: "7ஆம் வகுப்பு இந்த இயலில் கற்ற அணிகள் எத்தனை?", opts: ["இரண்டு", "மூன்று", "நான்கு", "ஐந்து"], ans: 1, exp: "இயல் ஒன்றில் மூன்று அணிகள் கற்கப்படுகின்றன: உவமை அணி, எடுத்துக்காட்டு உவமை அணி, இல்பொருள் உவமை அணி." },
  { q: "'கடுப்ப' என்பது எந்த வகைச் சொல்?", opts: ["பெயர்ச்சொல்", "வினைச்சொல்", "உவம உருபு", "சாரியை"], ans: 2, exp: "'கடுப்ப' என்பது உவம உருபு. போல், புரைய, அன்ன, இன்ன, அற்று, மான, கடுப்ப, ஒப்ப, உறழ என்பவை உவம உருபுகள்." },
  { q: "மணற்கேணி குறளில் கல்வியின் மதிப்பு என்ன விளக்கப்படுகிறது?", opts: ["கல்வி பணம் தரும்", "கற்கும் அளவிற்கு அறிவு பெருகும்", "கல்வி நேரம் வீண்", "கல்வி கடினம்"], ans: 1, exp: "மணற்கேணியில் தோண்டிய அளவிற்கு நீர் ஊறுவது போல், மனிதர்கள் கற்கும் அளவிற்கு அறிவு பெருகும் என்பது கருத்து." },
  { q: "ஒரு பாடலில் உவமையும் உவமேயமும் ஒரு பொருளாக காட்டப்படுவது எந்த அணி?", opts: ["உவமை அணி", "இல்பொருள் அணி", "உருவக அணி", "எடுத்துக்காட்டு அணி"], ans: 2, exp: "உவமையும் உவமேயமும் வேறு வேறு இல்லாமல் இரண்டும் ஒன்றே என்பது தோன்றுமபடி கூறுவது உருவக அணி." },
  { q: "'மான' என்பது எந்த வகைச் சொல்?", opts: ["பெயர்ச்சொல்", "உவம உருபு", "வினைச்சொல்", "இடைச்சொல்"], ans: 1, exp: "'மான' என்பது உவம உருபுகளில் ஒன்று." },
  { q: "பொறையுடைமை குறளில் நிலத்தின் தன்மை என்ன?", opts: ["வளம் தரும்", "தோண்டுபவரைப் பொறுத்துக்கொள்ளும்", "மழை தரும்", "பயிர் வளர்க்கும்"], ans: 1, exp: "அகழ்வாரைத் தாங்கும் நிலம் போல் — நிலம் தன்னைத் தோண்டுபவரைப் பொறுத்துக்கொள்கிறது என்பது உவமை." },
  { q: "இல்பொருள் உவமை அணியில் 'இல்' என்பதன் பொருள் என்ன?", opts: ["இல்லம்", "இல்லாத", "இல்லை", "இலக்கு"], ans: 1, exp: "இல்பொருள் என்பது 'இல்லாத பொருள்' என்று பொருள்படும். உலகில் இல்லாத பொருளை உவமையாக்குவதால் இப்பெயர் வந்தது." },
  { q: "குறட்பாவில் அணி கண்டறிய என்ன தேவை?", opts: ["பொருள் அறிவு மட்டும்", "எழுத்தறிவு மட்டும்", "உவமை, உவமேயம், உவம உருபு இவற்றை அறிதல்", "யாப்பறிவு"], ans: 2, exp: "ஒரு குறட்பாவில் அணி கண்டறிய உவமை, உவமேயம், உவம உருபு என்ன என்று ஆராய வேண்டும்." },
  { q: "உவமை அணியை முதல் அறிமுகம் செய்த இலக்கண நூல் எது?", opts: ["நன்னூல்", "தொல்காப்பியம்", "யாப்பருங்கலம்", "வீரசோழியம்"], ans: 1, exp: "தொல்காப்பியம் என்பது தமிழின் மிகப் பழைய இலக்கண நூல். அதில் அணி இலக்கணம் விரிவாக ஆராயப்படுகிறது." },
  { q: "ஒரு செய்யுளில் அணியின் பயன் என்ன?", opts: ["யாப்பு சரிசெய்தல்", "சொல்லை அழகுபடுத்துதல் மற்றும் பொருளை விளக்குதல்", "எழுத்துகளை சரிசெய்தல்", "பொருளை மறைத்தல்"], ans: 1, exp: "அணி என்பது ஒரு செய்யுளைச் சொல்லாலும் பொருளாலும் அழகு பெறச் செய்கிறது." },
  { q: "'இன்ன' என்பது எந்த வகைச் சொல்?", opts: ["பெயர்ச்சொல்", "வினைச்சொல்", "உவம உருபு", "படர்க்கை"], ans: 2, exp: "'இன்ன' என்பது உவம உருபுகளில் ஒன்று. போல், புரைய, அன்ன, இன்ன போன்றவை உவம உருபுகள்." },
  { q: "அணி வகைகளில் 'பொருளாகு பெயர்' எந்த வகை?", opts: ["அணி", "ஆகுபெயர்", "உவமை", "வினை"], ans: 1, exp: "பொருளாகு பெயர் என்பது ஆகுபெயர் வகை. அணி என்பது வேறு; ஆகுபெயர் என்பது வேறு." },
  { q: "மாதவி மயில் போல் ஆடினாள் — இத்தொடரில் உவமை எது?", opts: ["மாதவி", "ஆடினாள்", "மயில்", "போல்"], ans: 2, exp: "மயில் என்பது உவமை (ஒப்பீட்டு பொருள்). மாதவி என்பது உவமேயம். போல் என்பது உவம உருபு." },
  { q: "உவமை அணி, எடுத்துக்காட்டு உவமை அணி ஆகியவற்றில் பொதுவான கூறு எது?", opts: ["உவம உருபு வெளிப்படுவது", "உவமை மட்டும்", "உவமை, உவமேயம் இரண்டும் இருத்தல்", "உவம உருபு இல்லாமல் இருத்தல்"], ans: 2, exp: "இரண்டு அணிகளிலும் உவமை மற்றும் உவமேயம் இரண்டும் இருக்கும். வேறுபாடு உவம உருபு வெளிப்படையாக வருவதிலும் மறைந்து வருவதிலும்." },
  { q: "தமிழ் அணி இலக்கணம் எந்த பிரிவில் அடங்கும்?", opts: ["எழுத்திலக்கணம்", "சொல்லிலக்கணம்", "பொருளிலக்கணம்", "யாப்பிலக்கணம்"], ans: 2, exp: "அணி இலக்கணம் பொருளிலக்கண வகையில் அடங்கும். ஒரு செய்யுளின் பொருளையும் சொல்லையும் அழகுபடுத்தும் முறையை ஆய்கிறது." },
  { q: "'அற்று' என்பது எந்த வகைச் சொல்?", opts: ["பெயர்ச்சொல்", "வினைச்சொல்", "உவம உருபு", "இடைச்சொல்"], ans: 2, exp: "'அற்று' என்பது உவம உருபுகளில் ஒன்று." },
];

// ============================================================
// GAME DATA
// ============================================================
const GAME_LEVELS = [
  { level: 1, name: "துவக்கம்", color: "#10b981", questions: [0,1,2,3,4] },
  { level: 2, name: "வளர்ச்சி", color: "#6366f1", questions: [5,6,7,8,9] },
  { level: 3, name: "மேம்பாடு", color: "#f59e0b", questions: [10,11,12,13,14] },
  { level: 4, name: "நிபுணர்", color: "#ec4899", questions: [15,16,17,18,19] },
  { level: 5, name: "மாஸ்டர்", color: "#ef4444", questions: [20,21,22,23,24] },
];

// ============================================================
// COMPONENTS
// ============================================================
function NoteCard({ note }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "rgba(255,255,255,0.07)", borderRadius: 16,
      border: `1.5px solid ${note.color}40`, marginBottom: 16,
      overflow: "hidden", transition: "all 0.3s"
    }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 12, padding: "16px 20px",
        cursor: "pointer", background: open ? `${note.color}15` : "transparent"
      }}>
        <span style={{ fontSize: 28 }}>{note.icon}</span>
        <span style={{ flex: 1, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 17, fontWeight: 700, color: note.color }}>{note.title}</span>
        <span style={{ color: note.color, fontSize: 20 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: "0 20px 20px" }}>
          {note.content.map((c, i) => {
            if (c.type === "text") return (
              <p key={i} style={{ color: "#e2e8f0", lineHeight: 1.8, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 15, marginTop: 12 }}
                dangerouslySetInnerHTML={{ __html: c.value.replace(/\*\*(.*?)\*\*/g, `<strong style="color:${note.color}">$1</strong>`) }} />
            );
            if (c.type === "table") return (
              <div key={i} style={{ overflowX: "auto", marginTop: 14 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13 }}>
                  <thead>
                    <tr>{c.headers.map((h, j) => (
                      <th key={j} style={{ background: `${note.color}30`, color: note.color, padding: "10px 14px", textAlign: "left", borderBottom: `2px solid ${note.color}` }}>{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {c.rows.map((row, j) => (
                      <tr key={j} style={{ background: j % 2 === 0 ? "rgba(255,255,255,0.04)" : "transparent" }}>
                        {row.map((cell, k) => (
                          <td key={k} style={{ padding: "10px 14px", color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
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
                  {c.analysis.map((row, j) => (
                    <tr key={j}>
                      <td style={{ color: note.color, fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13, padding: "4px 10px 4px 0", whiteSpace: "nowrap" }}>{row[0]}</td>
                      <td style={{ color: "#cbd5e1", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13, padding: "4px 0" }}>{row[1]}</td>
                    </tr>
                  ))}
                </table>
              </div>
            );
            if (c.type === "examples_list") return (
              <div key={i} style={{ marginTop: 14 }}>
                <div style={{ color: note.color, fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>{c.title}</div>
                {c.items.map((item, j) => (
                  <div key={j} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: 10, marginBottom: 8 }}>
                    <div style={{ color: "#e2e8f0", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14, marginBottom: 4 }}>{item.sent}</div>
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
                    <div key={j} style={{ flex: "1 1 200px", background: j === 0 ? "rgba(99,102,241,0.15)" : "rgba(236,72,153,0.15)", borderRadius: 10, padding: 12, border: `1px solid ${j === 0 ? "#6366f140" : "#ec489940"}` }}>
                      <div style={{ color: j === 0 ? "#6366f1" : "#ec4899", fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13, marginBottom: 8 }}>{side.label}</div>
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
  const [showExp, setShowExp] = useState(false);

  const q = QUIZ_QUESTIONS[current];

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setShowExp(true);
    if (i === q.ans) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= QUIZ_QUESTIONS.length) { setFinished(true); return; }
    setCurrent(c => c + 1);
    setSelected(null);
    setShowExp(false);
  };

  const handleRestart = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); setShowExp(false); };

  if (finished) return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{score >= QUIZ_QUESTIONS.length * 0.8 ? "🏆" : score >= QUIZ_QUESTIONS.length * 0.5 ? "👍" : "📚"}</div>
      <div style={{ color: "#fbbf24", fontSize: 28, fontWeight: 900, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>முடிந்தது!</div>
      <div style={{ color: "#e2e8f0", fontSize: 22, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 24 }}>{score} / {QUIZ_QUESTIONS.length} சரியான பதில்கள்</div>
      <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 32px", display: "inline-block", marginBottom: 24 }}>
        <div style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil', sans-serif" }}>
          {score >= QUIZ_QUESTIONS.length * 0.8 ? "🌟 சிறப்பான செயல்திறன்!" : score >= QUIZ_QUESTIONS.length * 0.5 ? "👌 நல்ல முயற்சி!" : "📖 மேலும் படிக்கவும்"}
        </div>
      </div>
      <br />
      <button onClick={handleRestart} style={{ background: "linear-gradient(135deg,#6366f1,#ec4899)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>மீண்டும் தொடங்கு</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
        <span style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14 }}>கேள்வி {current + 1} / {QUIZ_QUESTIONS.length}</span>
        <span style={{ background: "rgba(99,102,241,0.3)", color: "#a5b4fc", borderRadius: 20, padding: "4px 14px", fontSize: 14, fontFamily: "'Noto Sans Tamil', sans-serif" }}>மதிப்பெண்: {score}</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 20, marginBottom: 18 }}>
        <p style={{ color: "#e2e8f0", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 17, lineHeight: 1.7, margin: 0 }}>{q.q}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.06)";
          let border = "1px solid rgba(255,255,255,0.1)";
          let color = "#e2e8f0";
          if (selected !== null) {
            if (i === q.ans) { bg = "rgba(16,185,129,0.25)"; border = "1.5px solid #10b981"; color = "#6ee7b7"; }
            else if (i === selected && i !== q.ans) { bg = "rgba(239,68,68,0.2)"; border = "1.5px solid #ef4444"; color = "#fca5a5"; }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} style={{ background: bg, border, borderRadius: 10, padding: "12px 16px", color, cursor: selected !== null ? "default" : "pointer", textAlign: "left", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 15, transition: "all 0.2s" }}>
              <span style={{ marginRight: 10, opacity: 0.6 }}>{["அ", "ஆ", "இ", "ஈ"][i]})</span>{opt}
            </button>
          );
        })}
      </div>
      {showExp && (
        <div style={{ marginTop: 16, background: "rgba(99,102,241,0.15)", border: "1px solid #6366f140", borderRadius: 10, padding: 14 }}>
          <div style={{ color: "#a5b4fc", fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 6 }}>📝 விளக்கம்</div>
          <div style={{ color: "#cbd5e1", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14, lineHeight: 1.7 }}>{q.exp}</div>
        </div>
      )}
      {selected !== null && (
        <button onClick={handleNext} style={{ marginTop: 16, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 15, cursor: "pointer", width: "100%", fontFamily: "'Noto Sans Tamil', sans-serif" }}>
          {current + 1 >= QUIZ_QUESTIONS.length ? "முடிவு பார்க்க →" : "அடுத்த கேள்வி →"}
        </button>
      )}
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
  const qId = level.questions[qIdx];
  const q = QUIZ_QUESTIONS[qId];

  const handleSelect = (i) => {
    if (selected !== null || gameOver) return;
    setSelected(i);
    if (i === q.ans) {
      setLevelScore(s => s + 10);
      setTotalScore(s => s + 10);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) { setGameOver(true); return; }
    }
    setTimeout(() => {
      const nextQIdx = qIdx + 1;
      if (nextQIdx >= level.questions.length) {
        setLevelComplete(true);
      } else {
        setQIdx(nextQIdx);
        setSelected(null);
      }
    }, 900);
  };

  const nextLevel = () => {
    if (levelIdx + 1 >= GAME_LEVELS.length) { setGameOver(true); return; }
    setLevelIdx(l => l + 1);
    setQIdx(0);
    setSelected(null);
    setLevelScore(0);
    setLevelComplete(false);
  };

  const restart = () => { setLevelIdx(0); setQIdx(0); setSelected(null); setLives(3); setLevelScore(0); setTotalScore(0); setGameOver(false); setLevelComplete(false); };

  if (gameOver) return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <div style={{ fontSize: 64, marginBottom: 12 }}>{lives <= 0 ? "💔" : "🏆"}</div>
      <div style={{ color: "#fbbf24", fontSize: 26, fontWeight: 900, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>{lives <= 0 ? "விளையாட்டு முடிந்தது!" : "வாழ்த்துக்கள்!"}</div>
      <div style={{ color: "#e2e8f0", fontSize: 20, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 24 }}>மொத்த மதிப்பெண்: {totalScore}</div>
      <button onClick={restart} style={{ background: "linear-gradient(135deg,#10b981,#6366f1)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>மீண்டும் விளையாடு</button>
    </div>
  );

  if (levelComplete) return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div>
      <div style={{ color: level.color, fontSize: 24, fontWeight: 900, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>நிலை {level.level} முடிந்தது!</div>
      <div style={{ color: "#e2e8f0", fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>மதிப்பெண்: {levelScore}</div>
      <div style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 24 }}>மொத்தம்: {totalScore}</div>
      {levelIdx + 1 < GAME_LEVELS.length ? (
        <button onClick={nextLevel} style={{ background: `linear-gradient(135deg,${level.color},${GAME_LEVELS[Math.min(levelIdx+1,GAME_LEVELS.length-1)].color})`, border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>
          அடுத்த நிலை →
        </button>
      ) : (
        <button onClick={() => setGameOver(true)} style={{ background: "linear-gradient(135deg,#fbbf24,#ef4444)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>முடிவு பார்க்க 🏆</button>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {GAME_LEVELS.map((l, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i <= levelIdx ? l.color : "rgba(255,255,255,0.15)" }} />
          ))}
          <span style={{ color: level.color, fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14, marginLeft: 4 }}>நிலை {level.level}: {level.name}</span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ color: "#fbbf24", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14 }}>⭐ {totalScore}</span>
          <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14 }}>{"❤️".repeat(lives)}{"🖤".repeat(3 - lives)}</span>
        </div>
      </div>
      <div style={{ background: `${level.color}15`, border: `1.5px solid ${level.color}50`, borderRadius: 14, padding: 20, marginBottom: 18 }}>
        <div style={{ color: "#94a3b8", fontSize: 12, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>கேள்வி {qIdx + 1} / {level.questions.length}</div>
        <p style={{ color: "#e2e8f0", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 16, lineHeight: 1.7, margin: 0 }}>{q.q}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.06)";
          let border = "1px solid rgba(255,255,255,0.12)";
          if (selected !== null) {
            if (i === q.ans) { bg = "rgba(16,185,129,0.25)"; border = "1.5px solid #10b981"; }
            else if (i === selected && i !== q.ans) { bg = "rgba(239,68,68,0.2)"; border = "1.5px solid #ef4444"; }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} style={{ background: bg, border, borderRadius: 10, padding: "12px 14px", color: "#e2e8f0", cursor: selected !== null ? "default" : "pointer", textAlign: "left", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14, transition: "all 0.2s" }}>
              <span style={{ color: level.color, marginRight: 8, fontWeight: 700 }}>{["அ", "ஆ", "இ", "ஈ"][i]})</span>{opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Chapter7() {
  const [tab, setTab] = useState("notes");

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      fontFamily: "'Noto Sans Tamil', 'Segoe UI', sans-serif",
      padding: "0 0 40px"
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px"
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
            <div style={{ background: "linear-gradient(135deg,#f59e0b,#ec4899)", borderRadius: 12, padding: "8px 14px", fontSize: 22 }}>🌸</div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>7ஆம் வகுப்பு தமிழ் • இயல் 1</div>
              <h1 style={{ color: "#fff", fontSize: "clamp(18px,4vw,26px)", fontWeight: 900, margin: 0, fontFamily: "'Noto Sans Tamil', sans-serif" }}>அணி இலக்கணம்</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 760, margin: "24px auto 0", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 28, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 6 }}>
          {[["notes","📒 குறிப்புகள்"],["quiz","✍️ வினாடி வினா"],["game","🎮 விளையாட்டு"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: "clamp(12px,3vw,15px)",
              fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: 700, transition: "all 0.25s",
              background: tab === id ? "linear-gradient(135deg,#6366f1,#ec4899)" : "transparent",
              color: tab === id ? "#fff" : "#94a3b8"
            }}>{label}</button>
          ))}
        </div>

        {tab === "notes" && (
          <div>
            <div style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14, marginBottom: 18, textAlign: "center" }}>
              📌 ஒவ்வொரு தலைப்பையும் கிளிக் செய்து விரிவாகப் படியுங்கள்
            </div>
            {NOTES.map(n => <NoteCard key={n.id} note={n} />)}
            {/* Summary Table */}
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 20, marginTop: 10 }}>
              <div style={{ color: "#fbbf24", fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 16, marginBottom: 14 }}>📊 அணி வகைகள் — சுருக்க அட்டவணை</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13 }}>
                  <thead>
                    <tr>
                      {["அணி வகை","உவம உருபு","சிறப்பியல்பு","எடுத்துக்காட்டு"].map((h,i) => (
                        <th key={i} style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #fbbf2440" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["உவமை அணி","வெளிப்படையாக வரும்","போல், போன்ற தெரியும்","மயில் போல் ஆடினாள்"],
                      ["எடுத்துக்காட்டு உவமை அணி","மறைந்து வரும்","உவமை + உவமேயம் தனித்தனி தொடர்","தோட்டனைத்து ஊறும் மணற்கேணி..."],
                      ["இல்பொருள் உவமை அணி","வெளிப்படை / மறை","உலகில் இல்லாதது உவமை","பொன்மழை போல்"],
                    ].map((row,j) => (
                      <tr key={j} style={{ background: j%2===0?"rgba(255,255,255,0.03)":"transparent" }}>
                        {row.map((cell,k) => <td key={k} style={{ padding:"10px 12px",color:"#cbd5e1",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{cell}</td>)}
                      </tr>
                    ))}
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
