import { useState } from "react";

// ============================================================
// CHAPTER 9 — ஆகுபெயர், இரட்டைக்கிளவி, அடுக்குத்தொடர் (இயல் மூன்று)
// ============================================================

const NOTES = [
  {
    id: 1, title: "ஆகுபெயர் என்றால் என்ன?", icon: "🏷️", color: "#14b8a6",
    content: [
      {
        type: "text",
        value: "ஒன்றன் **பெயர்** அதனைக் குறிக்காமல் அதனோடு **தொடர்புடைய வேறு ஒன்றிற்கு** ஆகி வருவது **ஆகுபெயர்** எனப்படும்."
      },
      {
        type: "example",
        title: "விளக்க எடுத்துக்காட்டு",
        verse: "தோட்டத்தில் மேயுது வெள்ளைப்பசு. (இயல்பான பெயர்)\nவீட்டுக்கு வெள்ளை அடித்தான். (ஆகுபெயர்)",
        meaning: "முதல் தொடரில் வெள்ளை = வெண்மை நிறம். இரண்டாம் தொடரில் வெள்ளை = சுண்ணாம்பு (வெண்மை நிறமுடைய பொருள்). வெண்மையின் பெயர் வெண்மை நிறமுடைய சுண்ணாம்புக்கு ஆகி வந்தது — ஆகுபெயர்.",
        analysis: [
          ["இயல்பான பெயர்", "வெண்மை நிறம்"],
          ["ஆகுபெயர்", "வெண்மை நிறமுடைய சுண்ணாம்பு"],
          ["வகை", "பண்பாகுபெயர்"],
        ]
      },
      {
        type: "table",
        headers: ["ஆகுபெயர் வகை", "விளக்கம்", "எடுத்துக்காட்டு"],
        rows: [
          ["பொருளாகுபெயர்", "பொருளின் பெயர் அதன் சினையாகிய உறுப்புக்கு ஆகிவருவது", "மல்லிகை சூடினாள் (மல்லிகை = மலர்)"],
          ["இடவாகுபெயர்", "இடப்பெயர் அவ்விடத்தைச் சேர்ந்த பொருளுக்கு ஆகிவருவது", "சடுகுடு போட்டியில் தமிழ்நாடு வெற்றி (தமிழ்நாடு = விளையாட்டு அணி)"],
          ["காலவாகுபெயர்", "காலப்பெயர் அக்காலத்தில் மலரும் பூவுக்கு ஆகிவருவது", "திசம்பர் சூடினாள் (திசம்பர் = திசம்பரில் மலரும் பூ)"],
          ["சினையாகுபெயர்", "சினையின் பெயர் முதலாகிய பொருளுக்கு ஆகிவருவது", "தலைக்கு ஒரு பழம் கொடு (தலை = ஒருவர்)"],
          ["பண்பாகுபெயர்", "பண்புப் பெயர் அப்பண்பு உள்ள பொருளுக்கு ஆகிவருவது", "இனிப்பு தின்றான் (இனிப்பு = இனிப்பான பொருள்)"],
          ["தொழிலாகுபெயர்", "தொழிற்பெயர் அத்தொழிலால் உருவான பொருளுக்கு ஆகிவருவது", "பொங்கல் உண்பான் (பொங்கல் = பொங்கும் உணவு)"],
        ]
      }
    ]
  },
  {
    id: 2, title: "ஆகுபெயர் வகைகள் — விரிவான விளக்கம்", icon: "📌", color: "#3b82f6",
    content: [
      {
        type: "text",
        value: "ஆகுபெயர்கள் **ஆறு வகை**: பொருளாகுபெயர், இடவாகுபெயர், காலவாகுபெயர், சினையாகுபெயர், பண்பாகுபெயர், தொழிலாகுபெயர்."
      },
      {
        type: "example",
        title: "பொருளாகுபெயர் (முதலாகுபெயர்)",
        verse: "மல்லிகை சூடினாள்.",
        meaning: "மல்லிகை என்னும் ஒரு முழுப்பொருளின் பெயர் அதன் ஓர் உறுப்பாகிய மலரைக் குறிக்கிறது.",
        analysis: [
          ["மூலப்பொருள்", "மல்லிகை செடி (முழுமை)"],
          ["ஆகுபெயர் குறிப்பது", "மல்லிகை மலர் (உறுப்பு)"],
          ["மற்றொரு பெயர்", "முதலாகு பெயர்"],
        ]
      },
      {
        type: "example",
        title: "இடவாகுபெயர்",
        verse: "சடுகுடு போட்டியில் தமிழ்நாடு வெற்றி பெற்றது.",
        meaning: "தமிழ்நாடு என்னும் இடப்பெயர் அவ்விடத்தைச் சேர்ந்த விளையாட்டு அணியைக் குறிப்பதால் இடவாகுபெயர்.",
        analysis: [
          ["இடப்பெயர்", "தமிழ்நாடு"],
          ["குறிப்பது", "தமிழ்நாடு விளையாட்டு அணி"],
        ]
      },
      {
        type: "example",
        title: "காலவாகுபெயர்",
        verse: "திசம்பர் சூடினாள்.",
        meaning: "திசம்பர் என்னும் காலப்பெயர் அக்காலத்தில் மலரும் பூவைக் குறிப்பதால் காலவாகுபெயர்.",
        analysis: [
          ["காலப்பெயர்", "திசம்பர் (மாதம்)"],
          ["குறிப்பது", "திசம்பரில் மலரும் பூ"],
        ]
      },
      {
        type: "example",
        title: "சினையாகுபெயர்",
        verse: "தலைக்கு ஒரு பழம் கொடு.",
        meaning: "தலை என்னும் சினையின் (உறுப்பின்) பெயர் முதலாகிய ஆளுக்கு ஆகிவருவதால் சினையாகுபெயர்.",
        analysis: [
          ["சினை (உறுப்பு)", "தலை"],
          ["குறிப்பது", "ஒருவர் (முழு மனிதர்)"],
        ]
      },
      {
        type: "example",
        title: "பண்பாகுபெயர்",
        verse: "இனிப்பு தின்றான்.",
        meaning: "இனிப்பு என்னும் பண்புப் பெயர் அப்பண்பு உள்ள தின்பண்டத்தைக் குறிப்பதால் பண்பாகுபெயர்.",
        analysis: [
          ["பண்பு", "இனிப்பு (taste)"],
          ["குறிப்பது", "இனிப்பான பண்டம்"],
        ]
      },
      {
        type: "example",
        title: "தொழிலாகுபெயர்",
        verse: "பொங்கல் உண்பான்.",
        meaning: "பொங்கல் என்னும் தொழிற்பெயர் அத்தொழிலால் உருவான உணவினைக் குறிப்பதால் தொழிலாகுபெயர்.",
        analysis: [
          ["தொழில்", "பொங்குதல்"],
          ["குறிப்பது", "பொங்கும் உணவு"],
        ]
      }
    ]
  },
  {
    id: 3, title: "இரட்டைக்கிளவி", icon: "🔄", color: "#ec4899",
    content: [
      {
        type: "text",
        value: "ஒரு வார்த்தையில் **அச்சொற்கள் இரண்டிரண்டாக இணைந்து** வந்து, **பிரித்தால் தனிப்பொருள் தராத** சொற்களை **இரட்டைக்கிளவி** என்பர்."
      },
      {
        type: "examples_list",
        title: "இரட்டைக்கிளவி எடுத்துக்காட்டுகள்",
        items: [
          { sent: "விறுவிறு", note: "விறு + விறு = விரைவாக என்ற பொருளை தருகிறது. 'விறு' மட்டும் தனிப்பொருள் தராது" },
          { sent: "கள்கள்", note: "கள் + கள் = சிரிக்கும் ஒலி. 'கள்' மட்டும் தனிப்பொருள் தராது" },
          { sent: "மலமல", note: "மல + மல = மேலும் மேலும் என்ற குறிப்பு. 'மல' மட்டும் தனிப்பொருள் தராது" },
          { sent: "கிலுகிலு", note: "கிலு + கிலு = ஒலி பொருள். 'கிலு' மட்டும் தனிப்பொருள் தராது" },
          { sent: "சலசல", note: "சல + சல = நீர் ஒடும் ஒலி. 'சல' மட்டும் தனிப்பொருள் தராது" },
        ]
      },
      {
        type: "comparison",
        title: "இரட்டைக்கிளவி vs அடுக்குத்தொடர்",
        left: {
          label: "இரட்டைக்கிளவி",
          points: [
            "பிரித்தால் பொருள் தராது",
            "இரண்டு முறை மட்டும் வரும்",
            "சொற்கள் இணைந்து நிற்கும்",
            "வினைக்கு அடைமொழியாக வரும்"
          ]
        },
        right: {
          label: "அடுக்குத்தொடர்",
          points: [
            "பிரித்தாலும் பொருள் தரும்",
            "2 முதல் 4 முறை வரும்",
            "சொற்கள் தனித்தனியாக நிற்கும்",
            "அச்சம், விரைவு, சினம் காரணமாக வரும்"
          ]
        }
      }
    ]
  },
  {
    id: 4, title: "அடுக்குத்தொடர்", icon: "🔁", color: "#f59e0b",
    content: [
      {
        type: "text",
        value: "அச்சம், வேகம், உவகை, சினம், அவமை ஆகிய காரணங்களால் **ஒரு சொல் ஒன்றுக்கு மேற்பட்ட முறை** தொடர்ந்து வருவதை **அடுக்குத்தொடர்** என்பர். அடுக்குத்தொடரில் ஒவ்வொரு சொல்லும் பொருளுடையது."
      },
      {
        type: "examples_list",
        title: "அடுக்குத்தொடர் எடுத்துக்காட்டுகள்",
        items: [
          { sent: "பாம்பு பாம்பு பாம்பு என்று கத்தினான்", note: "அச்சம் காரணமாக மூன்று முறை வருகிறது" },
          { sent: "இல்லை இல்லை என்று சொல்லி ஓடினான்", note: "வேகம்/உறுதி காரணமாக இரண்டு முறை" },
          { sent: "அவனைப் பிடி பிடி பிடி பிடி என்று கத்தினார்கள்", note: "வேகம் காரணமாக நான்கு முறை" },
        ]
      },
      {
        type: "table",
        headers: ["அடுக்குத்தொடர் வருவதற்கான காரணம்", "எடுத்துக்காட்டு"],
        rows: [
          ["அச்சம்", "பாம்பு பாம்பு பாம்பு"],
          ["விரைவு", "ஓடு ஓடு"],
          ["உவகை/மகிழ்ச்சி", "சிரி சிரி"],
          ["சினம்", "நில் நில் நில்"],
          ["அவமை", "எதற்கு எதற்கு"],
        ]
      }
    ]
  },
  {
    id: 5, title: "அடுக்குத்தொடர் — இரட்டைக்கிளவி ஒப்பீட்டு அட்டவணை", icon: "📊", color: "#6366f1",
    content: [
      {
        type: "table",
        headers: ["அம்சம்", "அடுக்குத்தொடர்", "இரட்டைக்கிளவி"],
        rows: [
          ["பொருள்", "தனியாக பிரித்தாலும் பொருள் தரும்", "தனியாக பிரித்தால் பொருள் தராது"],
          ["வரும் முறை", "2 முதல் 4 முறை வரும்", "இரண்டு முறை மட்டும்"],
          ["நிலை", "சொற்கள் தனித்தனியாக நிற்கும்", "சொற்கள் இணைந்து நிற்கும்"],
          ["காரணம்", "அச்சம், விரைவு, சினம், உவகை, அவமை", "வினைக்கு அடைமொழி — குறிப்பு பொருள்"],
          ["எடுத்துக்காட்டு", "பாம்பு பாம்பு பாம்பு", "விறுவிறு, மலமல, சலசல"],
        ]
      }
    ]
  }
];

const QUIZ_QUESTIONS = [
  { q: "ஆகுபெயர் என்றால் என்ன?", opts: ["பெயரின் அழகு", "ஒன்றன் பெயர் தொடர்புடைய வேறொன்றிற்கு ஆகி வருவது", "வினையின் பெயர்", "இடத்தின் பெயர்"], ans: 1, exp: "ஒன்றன் பெயர் அதனைக் குறிக்காமல் அதனோடு தொடர்புடைய வேறு ஒன்றிற்கு ஆகி வருவது ஆகுபெயர் எனப்படும்." },
  { q: "ஆகுபெயர் எத்தனை வகைகள் உள்ளன?", opts: ["நான்கு", "ஐந்து", "ஆறு", "ஏழு"], ans: 2, exp: "ஆகுபெயர் ஆறு வகைகள்: பொருளாகுபெயர், இடவாகுபெயர், காலவாகுபெயர், சினையாகுபெயர், பண்பாகுபெயர், தொழிலாகுபெயர்." },
  { q: "'மல்லிகை சூடினாள்' — இத்தொடரில் எந்த ஆகுபெயர்?", opts: ["இடவாகுபெயர்", "பொருளாகுபெயர்", "காலவாகுபெயர்", "சினையாகுபெயர்"], ans: 1, exp: "மல்லிகை என்னும் முழுப்பொருளின் பெயர் அதன் உறுப்பாகிய மலரைக் குறிக்கிறது — பொருளாகுபெயர் (முதலாகுபெயர்)." },
  { q: "'சடுகுடு போட்டியில் தமிழ்நாடு வெற்றி' — எந்த ஆகுபெயர்?", opts: ["பொருளாகுபெயர்", "காலவாகுபெயர்", "இடவாகுபெயர்", "தொழிலாகுபெயர்"], ans: 2, exp: "தமிழ்நாடு என்னும் இடப்பெயர் அவ்விடத்தைச் சேர்ந்த விளையாட்டு அணியைக் குறிப்பதால் இடவாகுபெயர்." },
  { q: "'திசம்பர் சூடினாள்' — எந்த ஆகுபெயர்?", opts: ["பொருளாகுபெயர்", "இடவாகுபெயர்", "காலவாகுபெயர்", "சினையாகுபெயர்"], ans: 2, exp: "திசம்பர் என்னும் காலப்பெயர் அக்காலத்தில் மலரும் பூவைக் குறிப்பதால் காலவாகுபெயர்." },
  { q: "'தலைக்கு ஒரு பழம்' — எந்த ஆகுபெயர்?", opts: ["பொருளாகுபெயர்", "சினையாகுபெயர்", "பண்பாகுபெயர்", "காலவாகுபெயர்"], ans: 1, exp: "தலை என்னும் சினையின் (உறுப்பின்) பெயர் முதலாகிய ஒருவரை குறிக்கிறது — சினையாகுபெயர்." },
  { q: "'இனிப்பு தின்றான்' — எந்த ஆகுபெயர்?", opts: ["பொருளாகுபெயர்", "இடவாகுபெயர்", "தொழிலாகுபெயர்", "பண்பாகுபெயர்"], ans: 3, exp: "இனிப்பு என்னும் பண்புப் பெயர் அப்பண்பு உள்ள தின்பண்டத்தைக் குறிக்கிறது — பண்பாகுபெயர்." },
  { q: "'பொங்கல் உண்பான்' — எந்த ஆகுபெயர்?", opts: ["பொருளாகுபெயர்", "காலவாகுபெயர்", "தொழிலாகுபெயர்", "பண்பாகுபெயர்"], ans: 2, exp: "பொங்கல் என்னும் தொழிற்பெயர் அத்தொழிலால் உருவான உணவினைக் குறிக்கிறது — தொழிலாகுபெயர்." },
  { q: "இரட்டைக்கிளவியை பிரித்தால் என்ன ஆகும்?", opts: ["பொருள் தரும்", "தனிப்பொருள் தராது", "வேறு சொல் கிடைக்கும்", "குறில் கிடைக்கும்"], ans: 1, exp: "இரட்டைக்கிளவியில் அச்சொற்களை பிரித்தால் தனிப்பொருள் தராது. இது அடுக்குத்தொடரிலிருந்து வேறுபடுவதற்கான முக்கிய காரணம்." },
  { q: "அடுக்குத்தொடரை பிரித்தால் என்ன ஆகும்?", opts: ["தனிப்பொருள் தராது", "தனிப்பொருள் தரும்", "வேறு சொல் கிடைக்கும்", "ஒலி கிடைக்கும்"], ans: 1, exp: "அடுக்குத்தொடரில் ஒவ்வொரு சொல்லும் பொருளுடையது. பிரித்தாலும் பொருள் தரும் — இது இரட்டைக்கிளவியிலிருந்து வேறுபடும்." },
  { q: "'விறுவிறு' என்பது எவ்வகை சொல்?", opts: ["அடுக்குத்தொடர்", "இரட்டைக்கிளவி", "பண்பாகுபெயர்", "வினைச்சொல்"], ans: 1, exp: "விறு என்ற சொல் தனியாக பொருள் தராது. இரண்டிரண்டாக இணைந்து வந்துள்ளதால் இரட்டைக்கிளவி." },
  { q: "'பாம்பு பாம்பு பாம்பு என்று கத்தினான்' — எவ்வகை சொல்?", opts: ["இரட்டைக்கிளவி", "அடுக்குத்தொடர்", "ஆகுபெயர்", "வினைச்சொல்"], ans: 1, exp: "பாம்பு என்ற சொல் தனியாக பொருள் தரும். அச்சம் காரணமாக மூன்று முறை வந்துள்ளதால் அடுக்குத்தொடர்." },
  { q: "அடுக்குத்தொடரில் ஒரு சொல் எத்தனை முறை வரும்?", opts: ["ஒரு முறை மட்டும்", "இரண்டு முறை மட்டும்", "2 முதல் 4 முறை", "5 முறை வரை"], ans: 2, exp: "அடுக்குத்தொடரில் ஒரு சொல் 2 முதல் 4 முறை வரை அடுக்கி வரும்." },
  { q: "இரட்டைக்கிளவியில் ஒரு சொல் எத்தனை முறை வரும்?", opts: ["ஒரு முறை", "இரண்டு முறை மட்டும்", "மூன்று முறை", "நான்கு முறை"], ans: 1, exp: "இரட்டைக்கிளவியில் ஒரு சொல் இரண்டு முறை மட்டும் வரும்." },
  { q: "பொருளாகுபெயரின் மற்றொரு பெயர் என்ன?", opts: ["சினையாகுபெயர்", "முதலாகுபெயர்", "காலவாகுபெயர்", "தொழிலாகுபெயர்"], ans: 1, exp: "பொருளாகுபெயரை 'முதலாகுபெயர்' என்றும் கூறுவர்." },
  { q: "அடுக்குத்தொடர் வருவதற்கான காரணங்களில் சேராதது எது?", opts: ["அச்சம்", "விரைவு", "சினம்", "காதல்"], ans: 3, exp: "அடுக்குத்தொடர் அச்சம், வேகம், உவகை, சினம், அவமை ஆகிய காரணங்களால் வரும். 'காதல்' இதில் சேராது." },
  { q: "'கிலுகிலுப்பை' என்பது எவ்வகை சொல்?", opts: ["அடுக்குத்தொடர்", "இரட்டைக்கிளவி", "பொருளாகுபெயர்", "வினைச்சொல்"], ans: 1, exp: "கிலு என்ற சொல் தனியாக பொருள் தராது. இரண்டிரண்டாக இணைந்து வருவதால் இரட்டைக்கிளவி." },
  { q: "'மழை சடசட வென்று பெய்தது' — எவ்வகை சொல்?", opts: ["அடுக்குத்தொடர்", "இரட்டைக்கிளவி", "ஆகுபெயர்", "வினைச்சொல்"], ans: 1, exp: "சட என்ற சொல் தனியாக பொருள் தராது. இரண்டிரண்டாக இணைந்து வருவதால் இரட்டைக்கிளவி." },
  { q: "இடவாகுபெயரில் எந்த வகைப் பெயர் ஆகுபெயராக வரும்?", opts: ["காலப்பெயர்", "பண்புப்பெயர்", "இடப்பெயர்", "தொழிற்பெயர்"], ans: 2, exp: "இடவாகுபெயரில் இடப்பெயர் அவ்விடத்தைச் சேர்ந்த பொருளுக்கு ஆகிவரும்." },
  { q: "சினையாகுபெயரில் 'சினை' என்றால் என்ன?", opts: ["மரம்", "உறுப்பு / கிளை", "வேர்", "பழம்"], ans: 1, exp: "சினை என்பது உறுப்பு அல்லது கிளை என்ற பொருளில் பயன்படுகிறது. சினையின் பெயர் முதலாகிய பொருளுக்கு ஆகிவருவது சினையாகுபெயர்." },
  { q: "'வெள்ளை அடித்தான்' — இத்தொடரில் வெள்ளை என்ன குறிக்கிறது?", opts: ["வெண்மை நிறம்", "சுண்ணாம்பு", "பனி", "பால்"], ans: 1, exp: "வீட்டுக்கு வெள்ளை அடித்தான் என்றால் சுண்ணாம்பு அடித்தான் என்று பொருள். வெண்மை நிறத்தின் பெயர் வெண்மை நிறமுடைய சுண்ணாம்புக்கு ஆகி வந்தது — பண்பாகுபெயர்." },
  { q: "ஆகுபெயர் எவ்வகை பெயர்ச்சொற்களில் உண்டு?", opts: ["பொருள் மட்டும்", "இடம் மட்டும்", "பொருள், இடம், காலம், சினை, பண்பு, தொழில் ஆறிலும்", "பண்பு மட்டும்"], ans: 2, exp: "பொருள், இடம், காலம், சினை, பண்பு, தொழில் ஆகிய ஆறு வகையான பெயர்ச்சொற்களிலும் ஆகுபெயர்கள் உண்டு." },
  { q: "அடுக்குத்தொடரும் இரட்டைக்கிளவியும் வேறுபடுவது எதனால்?", opts: ["ஒலியால்", "பொருள் தருவதால்", "நிலையால்", "வருவதால்"], ans: 1, exp: "அடுக்குத்தொடரில் சொற்கள் தனியாக பொருள் தரும். இரட்டைக்கிளவியில் பிரித்தால் தனிப்பொருள் தராது." },
  { q: "'சலசல' என்பது எவ்வகை சொல்?", opts: ["அடுக்குத்தொடர்", "இரட்டைக்கிளவி", "ஆகுபெயர்", "வினைச்சொல்"], ans: 1, exp: "சல என்ற சொல் தனியாக பொருள் தராது. இரண்டிரண்டாக இணைந்து வந்து நீர் ஒடும் ஒலியைக் குறிக்கிறது — இரட்டைக்கிளவி." },
  { q: "மல்லிகை என்னும் ஆகுபெயர் எதைக் குறிக்கிறது?", opts: ["மல்லிகை செடி", "மல்லிகை மலர்", "மல்லிகை வேர்", "மல்லிகை இலை"], ans: 1, exp: "மல்லிகை சூடினாள் என்பதில் மல்லிகை என்னும் முழுப்பொருளின் பெயர் அதன் உறுப்பாகிய மலரைக் குறிக்கிறது." },
  { q: "காலவாகுபெயரில் எந்த வகைப் பெயர் ஆகுபெயராக வரும்?", opts: ["இடப்பெயர்", "காலப்பெயர்", "பண்புப்பெயர்", "தொழிற்பெயர்"], ans: 1, exp: "காலவாகுபெயரில் காலப்பெயர் அக்காலத்தில் மலரும் பூவுக்கு ஆகிவரும்." },
  { q: "இரட்டைக்கிளவியில் சொற்கள் எவ்வாறு நிற்கும்?", opts: ["தனித்தனியாக", "இணைந்து", "வெவ்வேறு இடத்தில்", "தலைகீழாக"], ans: 1, exp: "இரட்டைக்கிளவியின் சொற்கள் இணைந்து நிற்கும். அடுக்குத்தொடரில் சொற்கள் தனித்தனியாக நிற்கும்." },
  { q: "அடுக்குத்தொடரில் சொற்கள் எவ்வாறு நிற்கும்?", opts: ["இணைந்து", "தனித்தனியாக", "கலந்து", "மாறிமாறி"], ans: 1, exp: "அடுக்குத்தொடரில் சொற்கள் தனித்தனியாக நிற்கும். இரட்டைக்கிளவியில் சொற்கள் இணைந்து நிற்கும்." },
  { q: "தொழிலாகுபெயரில் எந்த வகைப் பெயர் ஆகுபெயராக வரும்?", opts: ["இடப்பெயர்", "காலப்பெயர்", "பண்புப்பெயர்", "தொழிற்பெயர்"], ans: 3, exp: "தொழிலாகுபெயரில் தொழிற்பெயர் அத்தொழிலால் உருவான பொருளுக்கு ஆகிவரும்." },
  { q: "'இல்லை இல்லை' என்று சொல்வது எவ்வகை?", opts: ["இரட்டைக்கிளவி", "அடுக்குத்தொடர்", "ஆகுபெயர்", "உவமை"], ans: 1, exp: "இல்லை என்ற சொல் தனியாக பொருள் தரும். உறுதியாக சொல்வதற்காக இரண்டு முறை வந்துள்ளது — அடுக்குத்தொடர்." },
  { q: "பொருளாகுபெயரையும் சினையாகுபெயரையும் வேறுபடுத்துவது எது?", opts: ["பொருளாகுபெயர் = முழுமை → உறுப்பு; சினையாகுபெயர் = உறுப்பு → முழுமை", "இரண்டும் ஒரே மாதிரி", "பொருளாகுபெயர் = இடம், சினையாகுபெயர் = காலம்", "வேறுபாடு இல்லை"], ans: 0, exp: "பொருளாகுபெயர்: முழுப்பொருளின் பெயர் → உறுப்பை குறிக்கும். சினையாகுபெயர்: உறுப்பின் பெயர் → முழுமையை குறிக்கும்." },
  { q: "'மழை சடசட வென்று' — இத்தொடரில் 'சடசட' எவ்வகை?", opts: ["அடுக்குத்தொடர்", "இரட்டைக்கிளவி", "ஆகுபெயர்", "உவமை"], ans: 1, exp: "சட என்ற சொல் தனியாக பொருள் தராது. இரண்டிரண்டாக இணைந்து வந்துள்ளதால் இரட்டைக்கிளவி." },
  { q: "7ஆம் வகுப்பு இயல் மூன்றில் கற்கப்படும் இலக்கண வகைகள் எவை?", opts: ["உவமை அணி மட்டும்", "ஆகுபெயர் மட்டும்", "ஆகுபெயர், இரட்டைக்கிளவி, அடுக்குத்தொடர்", "வினாச்சொற்கள் மட்டும்"], ans: 2, exp: "இயல் மூன்றில் ஆகுபெயர், இரட்டைக்கிளவி, அடுக்குத்தொடர் ஆகிய மூன்று வகை இலக்கணங்கள் கற்கப்படுகின்றன." },
  { q: "ஆகுபெயர் எத்தனை வகை பெயர்ச்சொற்களில் உண்டு?", opts: ["நான்கு", "ஐந்து", "ஆறு", "ஏழு"], ans: 2, exp: "பொருள், இடம், காலம், சினை, பண்பு, தொழில் ஆகிய ஆறு வகையான பெயர்ச்சொற்களிலும் ஆகுபெயர்கள் உண்டு." },
  { q: "'நில் நில் நில்' என்று கத்தினான் — இது எந்த வகை?", opts: ["இரட்டைக்கிளவி", "அடுக்குத்தொடர்", "ஆகுபெயர்", "உவமை"], ans: 1, exp: "நில் என்ற சொல் தனியாக பொருள் தரும். சினம் காரணமாக மூன்று முறை வந்துள்ளதால் அடுக்குத்தொடர்." },
  { q: "பண்பாகுபெயரில் எந்த வகைப் பெயர் ஆகுபெயராக வரும்?", opts: ["இடப்பெயர்", "காலப்பெயர்", "பண்புப்பெயர்", "சினைப்பெயர்"], ans: 2, exp: "பண்பாகுபெயரில் பண்புப்பெயர் அப்பண்பு உள்ள பொருளுக்கு ஆகிவரும்." },
  { q: "இரட்டைக்கிளவி வினைக்கு எவ்வாறு வரும்?", opts: ["விளைவாக வரும்", "அடைமொழியாக வரும்", "பொருளாக வரும்", "இடமாக வரும்"], ans: 1, exp: "இரட்டைக்கிளவி வினைக்கு அடைமொழியாக குறிப்பு பொருளில் வரும்." },
  { q: "'மலமலவென்று சிரித்தாள்' — இத்தொடரில் 'மலமல' எவ்வகை?", opts: ["அடுக்குத்தொடர்", "இரட்டைக்கிளவி", "ஆகுபெயர்", "உவமை"], ans: 1, exp: "மல என்ற சொல் தனியாக பொருள் தராது. இரண்டிரண்டாக இணைந்து வந்துள்ளதால் இரட்டைக்கிளவி." },
  { q: "ஆகுபெயரில் 'ஆகு' என்பதன் பொருள் என்ன?", opts: ["செய்தல்", "ஆதல்/வருதல்", "போதல்", "கொள்ளுதல்"], ans: 1, exp: "ஆகுபெயரில் 'ஆகு' என்பது 'ஆதல் / வருதல்' என்ற பொருளில் பயன்படுகிறது. ஒரு பெயர் வேறொன்றுக்கு 'ஆகி வருவது' என்று பொருள்படும்." },
  { q: "காலவாகுபெயரின் எடுத்துக்காட்டு எது?", opts: ["மல்லிகை சூடினாள்", "இனிப்பு தின்றான்", "திசம்பர் சூடினாள்", "தமிழ்நாடு வெற்றி"], ans: 2, exp: "திசம்பர் சூடினாள் என்பதில் திசம்பர் என்னும் காலப்பெயர் அக்காலத்தில் மலரும் பூவைக் குறிக்கிறது — காலவாகுபெயர்." },
  { q: "ஒரு சொல் இரண்டு முறை வந்து பிரித்தால் பொருள் தரும் — இது எது?", opts: ["இரட்டைக்கிளவி", "அடுக்குத்தொடர்", "ஆகுபெயர்", "உவமை"], ans: 1, exp: "அடுக்குத்தொடரில் சொற்கள் பிரித்தாலும் பொருள் தரும். இரண்டு முறை மட்டும் வந்தாலும் அது அடுக்குத்தொடர் ஆகும்." },
  { q: "சினையாகுபெயரில் 'சினை' எதைக் குறிக்கிறது?", opts: ["முழுமை", "உறுப்பு", "மரம்", "வேர்"], ans: 1, exp: "சினை என்பது உறுப்பை (part) குறிக்கும். சினையின் பெயர் முதலாகிய முழுப்பொருளுக்கு ஆகிவருவது சினையாகுபெயர்." },
  { q: "'இனிப்பு' என்ற சொல் 'இனிப்பான பண்டம்' என்று பொருள்படுவது எந்த ஆகுபெயர்?", opts: ["பொருளாகுபெயர்", "தொழிலாகுபெயர்", "பண்பாகுபெயர்", "சினையாகுபெயர்"], ans: 2, exp: "இனிப்பு என்னும் பண்புப்பெயர் அப்பண்பு உள்ள பண்டத்தைக் குறிக்கிறது — பண்பாகுபெயர்." },
  { q: "அடுக்குத்தொடரில் ஒரு சொல் அதிகபட்சம் எத்தனை முறை வரும்?", opts: ["2", "3", "4", "5"], ans: 2, exp: "அடுக்குத்தொடரில் ஒரு சொல் 2 முதல் 4 முறை வரும். அதிகபட்சம் 4 முறை." },
  { q: "பொங்கல் என்னும் தொழிற்பெயர் எதை குறிக்கிறது?", opts: ["பொங்கும் செயல்", "பொங்கல் விழா", "பொங்கலால் உருவான உணவு", "பொங்கும் பாத்திரம்"], ans: 2, exp: "பொங்கல் என்னும் தொழிற்பெயர் அத்தொழிலால் உருவான உணவினைக் குறிக்கிறது — தொழிலாகுபெயர்." },
  { q: "இரட்டைக்கிளவியில் உள்ள சொல் எவ்வாறு இருக்கும்?", opts: ["தனியாக நிற்கும்", "இணைந்து நிற்கும்", "வேறு சொல்லோடு நிற்கும்", "கலந்து நிற்கும்"], ans: 1, exp: "இரட்டைக்கிளவியின் சொற்கள் இணைந்து நிற்கும். பிரித்தால் தனிப்பொருள் தராது." },
  { q: "ஆகுபெயரில் பெயர்ச்சொல் யாருக்கு 'ஆகி வருகிறது'?", opts: ["தனக்கே வருகிறது", "தொடர்புடைய வேறொன்றுக்கு வருகிறது", "எல்லாவற்றிற்கும் வருகிறது", "யாருக்கும் வராது"], ans: 1, exp: "ஆகுபெயரில் ஒன்றன் பெயர் அதனைக் குறிக்காமல் அதனோடு தொடர்புடைய வேறு ஒன்றிற்கு ஆகி வருகிறது." },
  { q: "7ஆம் வகுப்பு இயல் மூன்றில் கற்கப்படும் இலக்கண தலைப்பு என்ன?", opts: ["அணி இலக்கணம்", "ஆகுபெயர்", "யாப்பிலக்கணம்", "சொல்லிலக்கணம்"], ans: 1, exp: "7ஆம் வகுப்பு தமிழ் மூன்றாம் பருவம் இயல் மூன்றில் ஆகுபெயர், இரட்டைக்கிளவி, அடுக்குத்தொடர் கற்கப்படுகின்றன." },
  { q: "'இனிப்பு' என்பது நேரடியாக என்ன பொருள் தருகிறது?", opts: ["இனிப்பான தன்மை (பண்பு)", "இனிப்பான பண்டம்", "இனிப்பை செய்வது", "இனிக்கும் நேரம்"], ans: 0, exp: "இனிப்பு என்பது நேரடியாக இனிப்பான தன்மை (பண்பு) என்று பொருள்படும். ஆனால் 'இனிப்பு தின்றான்' என்று வரும்போது ஆகுபெயராக இனிப்பான பண்டத்தைக் குறிக்கும்." },
  { q: "ஆகுபெயரை உணர்த்த எந்த தொடரைப் பார்க்கலாம்?", opts: ["மயில் போல் ஆடினாள்", "மல்லிகை சூடினாள்", "அறிவு விளக்கம்", "தமிழ்த்தேன்"], ans: 1, exp: "மல்லிகை சூடினாள் என்பதில் மல்லிகை = மல்லிகை மலர் என்று ஆகுபெயர் அமைந்துள்ளது. பொருளாகுபெயர் / முதலாகுபெயர்." },
];

const GAME_LEVELS = [
  { level: 1, name: "துவக்கம்", color: "#14b8a6", questions: [0,1,2,3,4] },
  { level: 2, name: "வளர்ச்சி", color: "#3b82f6", questions: [5,6,7,8,9] },
  { level: 3, name: "மேம்பாடு", color: "#ec4899", questions: [10,11,12,13,14] },
  { level: 4, name: "நிபுணர்", color: "#f59e0b", questions: [15,16,17,18,19] },
  { level: 5, name: "மாஸ்டர்", color: "#6366f1", questions: [20,21,22,23,24] },
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
                    <div key={j} style={{ flex: "1 1 200px", background: j === 0 ? "rgba(236,72,153,0.15)" : "rgba(245,158,11,0.15)", borderRadius: 10, padding: 12, border: `1px solid ${j === 0 ? "#ec489940" : "#f59e0b40"}` }}>
                      <div style={{ color: j === 0 ? "#ec4899" : "#f59e0b", fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 13, marginBottom: 8 }}>{side.label}</div>
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
  const handleSelect = (i) => { if (selected !== null) return; setSelected(i); if (i === q.ans) setScore(s => s + 1); };
  const handleNext = () => { if (current + 1 >= QUIZ_QUESTIONS.length) { setFinished(true); return; } setCurrent(c => c + 1); setSelected(null); };
  const handleRestart = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); };
  if (finished) return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{score >= QUIZ_QUESTIONS.length * 0.8 ? "🏆" : "📚"}</div>
      <div style={{ color: "#fbbf24", fontSize: 28, fontWeight: 900, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>முடிந்தது!</div>
      <div style={{ color: "#e2e8f0", fontSize: 22, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>{score} / {QUIZ_QUESTIONS.length}</div>
      <div style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 24 }}>{score >= QUIZ_QUESTIONS.length * 0.8 ? "🌟 சிறப்பான செயல்திறன்!" : score >= QUIZ_QUESTIONS.length * 0.5 ? "👌 நல்ல முயற்சி!" : "📖 மேலும் படிக்கவும்"}</div>
      <button onClick={handleRestart} style={{ background: "linear-gradient(135deg,#14b8a6,#6366f1)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>மீண்டும் தொடங்கு</button>
    </div>
  );
  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14 }}>கேள்வி {current + 1} / {QUIZ_QUESTIONS.length}</span>
        <span style={{ background: "rgba(20,184,166,0.3)", color: "#5eead4", borderRadius: 20, padding: "4px 14px", fontSize: 14, fontFamily: "'Noto Sans Tamil', sans-serif" }}>மதிப்பெண்: {score}</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 20, marginBottom: 18 }}>
        <p style={{ color: "#e2e8f0", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 17, lineHeight: 1.7, margin: 0 }}>{q.q}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.06)"; let border = "1px solid rgba(255,255,255,0.1)"; let color = "#e2e8f0";
          if (selected !== null) { if (i === q.ans) { bg = "rgba(16,185,129,0.25)"; border = "1.5px solid #10b981"; color = "#6ee7b7"; } else if (i === selected && i !== q.ans) { bg = "rgba(239,68,68,0.2)"; border = "1.5px solid #ef4444"; color = "#fca5a5"; } }
          return <button key={i} onClick={() => handleSelect(i)} style={{ background: bg, border, borderRadius: 10, padding: "12px 16px", color, cursor: selected !== null ? "default" : "pointer", textAlign: "left", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 15 }}><span style={{ marginRight: 10, opacity: 0.6 }}>{["அ", "ஆ", "இ", "ஈ"][i]})</span>{opt}</button>;
        })}
      </div>
      {selected !== null && <div style={{ marginTop: 16, background: "rgba(20,184,166,0.15)", border: "1px solid #14b8a640", borderRadius: 10, padding: 14 }}><div style={{ color: "#5eead4", fontWeight: 700, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 6 }}>📝 விளக்கம்</div><div style={{ color: "#cbd5e1", fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 14, lineHeight: 1.7 }}>{q.exp}</div></div>}
      {selected !== null && <button onClick={handleNext} style={{ marginTop: 16, background: "linear-gradient(135deg,#14b8a6,#6366f1)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 15, cursor: "pointer", width: "100%", fontFamily: "'Noto Sans Tamil', sans-serif" }}>{current + 1 >= QUIZ_QUESTIONS.length ? "முடிவு பார்க்க →" : "அடுத்த கேள்வி →"}</button>}
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
  if (gameOver) return <div style={{ textAlign: "center", padding: 40 }}><div style={{ fontSize: 64, marginBottom: 12 }}>{lives <= 0 ? "💔" : "🏆"}</div><div style={{ color: "#fbbf24", fontSize: 26, fontWeight: 900, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>{lives <= 0 ? "விளையாட்டு முடிந்தது!" : "வாழ்த்துக்கள்!"}</div><div style={{ color: "#e2e8f0", fontSize: 20, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 24 }}>மொத்தம்: {totalScore}</div><button onClick={restart} style={{ background: "linear-gradient(135deg,#14b8a6,#6366f1)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>மீண்டும் விளையாடு</button></div>;
  if (levelComplete) return <div style={{ textAlign: "center", padding: 40 }}><div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div><div style={{ color: level.color, fontSize: 24, fontWeight: 900, fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 8 }}>நிலை {level.level} முடிந்தது!</div><div style={{ color: "#e2e8f0", fontFamily: "'Noto Sans Tamil', sans-serif", marginBottom: 24 }}>மொத்தம்: {totalScore}</div>{levelIdx + 1 < GAME_LEVELS.length ? <button onClick={nextLevel} style={{ background: `linear-gradient(135deg,${level.color},#6366f1)`, border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>அடுத்த நிலை →</button> : <button onClick={() => setGameOver(true)} style={{ background: "linear-gradient(135deg,#fbbf24,#ef4444)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 16, cursor: "pointer", fontFamily: "'Noto Sans Tamil', sans-serif" }}>முடிவு 🏆</button>}</div>;
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

export default function Chapter9() {
  const [tab, setTab] = useState("notes");
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#042f2e 0%,#0c4a6e 50%,#1e1b4b 100%)", fontFamily: "'Noto Sans Tamil','Segoe UI',sans-serif", padding: "0 0 40px" }}>
      <div style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
            <div style={{ background: "linear-gradient(135deg,#14b8a6,#6366f1)", borderRadius: 12, padding: "8px 14px", fontSize: 22 }}>🏷️</div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>7ஆம் வகுப்பு தமிழ் • இயல் 3</div>
              <h1 style={{ color: "#fff", fontSize: "clamp(18px,4vw,26px)", fontWeight: 900, margin: 0, fontFamily: "'Noto Sans Tamil',sans-serif" }}>ஆகுபெயர், இரட்டைக்கிளவி, அடுக்குத்தொடர்</h1>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: "24px auto 0", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 28, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 6 }}>
          {[["notes","📒 குறிப்புகள்"],["quiz","✍️ வினாடி வினா"],["game","🎮 விளையாட்டு"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: "clamp(12px,3vw,15px)", fontFamily: "'Noto Sans Tamil',sans-serif", fontWeight: 700, transition: "all 0.25s", background: tab === id ? "linear-gradient(135deg,#14b8a6,#6366f1)" : "transparent", color: tab === id ? "#fff" : "#94a3b8" }}>{label}</button>
          ))}
        </div>
        {tab === "notes" && (
          <div>
            <div style={{ color: "#94a3b8", fontFamily: "'Noto Sans Tamil',sans-serif", fontSize: 14, marginBottom: 18, textAlign: "center" }}>📌 ஒவ்வொரு தலைப்பையும் கிளிக் செய்து விரிவாகப் படியுங்கள்</div>
            {NOTES.map(n => <NoteCard key={n.id} note={n} />)}
            {/* Master Summary Table */}
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 20, marginTop: 10 }}>
              <div style={{ color: "#14b8a6", fontWeight: 700, fontFamily: "'Noto Sans Tamil',sans-serif", fontSize: 16, marginBottom: 14 }}>📊 ஆகுபெயர் வகைகள் — முழு அட்டவணை</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Noto Sans Tamil',sans-serif", fontSize: 13 }}>
                  <thead><tr>{["வகை","ஆகுபெயர் பெயர்","குறிப்பது","எடுத்துக்காட்டு"].map((h,i) => <th key={i} style={{ background: "rgba(20,184,166,0.15)", color: "#14b8a6", padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #14b8a640" }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[
                      ["பொருள்","பொருளாகுபெயர் (முதலாகுபெயர்)","முழுமையின் பெயர் → உறுப்பு","மல்லிகை சூடினாள்"],
                      ["இடம்","இடவாகுபெயர்","இடப்பெயர் → அவ்விடத்தைச் சேர்ந்த பொருள்","தமிழ்நாடு வெற்றி"],
                      ["காலம்","காலவாகுபெயர்","காலப்பெயர் → அக்காலத்தில் மலரும் பூ","திசம்பர் சூடினாள்"],
                      ["சினை","சினையாகுபெயர்","உறுப்பின் பெயர் → முழுமை","தலைக்கு ஒரு பழம்"],
                      ["பண்பு","பண்பாகுபெயர்","பண்புப்பெயர் → அப்பண்பு உள்ள பொருள்","இனிப்பு தின்றான்"],
                      ["தொழில்","தொழிலாகுபெயர்","தொழிற்பெயர் → அத்தொழிலால் உருவான பொருள்","பொங்கல் உண்பான்"],
                    ].map((row,j) => <tr key={j} style={{ background: j%2===0?"rgba(255,255,255,0.03)":"transparent" }}>{row.map((cell,k) => <td key={k} style={{ padding:"10px 12px",color:"#cbd5e1",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{cell}</td>)}</tr>)}
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
