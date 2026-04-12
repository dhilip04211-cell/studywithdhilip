import { useState } from "react";

const NOTES_DATA = {
  title: "இலக்கியவகைச் சொற்கள்",
  subtitle: "Literary Types of Words",
  sections: [
    {
      id: "intro",
      heading: "சொல் என்றால் என்ன? (What is a Word?)",
      icon: "📖",
      content: `ஓர் எழுத்து தனித்தும் ஒன்றிற்கும் மேற்பட்ட எழுத்துகள் தொடர்ந்தும் வந்து பொருள் தருவது சொல் எனப்படும்.`,
      subsections: [
        {
          title: "சொல்லின் வேறு பெயர்கள்",
          content: "மொழி, பதம், கிளவி என்பன சொல் என்னும் பொருள் தரும் வேறு சொற்களாகும்."
        },
        {
          title: "எடுத்துக்காட்டு",
          content: "பூ (1 எழுத்து), வா (2 எழுத்து), அறம் (3 எழுத்து), கடிதம் (4 எழுத்து), புத்தகம் (5 எழுத்து) — அனைத்தும் சொற்கள்"
        }
      ]
    },
    {
      id: "classification",
      heading: "சொல்லின் வகைகள் (Types of Words)",
      icon: "🔤",
      content: "இலக்கண முறைப்படி சொற்கள் நான்கு வகைப்படும்: பெயர்ச்சொல், வினைச்சொல், இடைச்சொல், உரிச்சொல். இலக்கிய வகையில் சொற்களை இயற்சொல், திரிசொல், திசைச்சொல், வடசொல் என நான்கு வகையாகப் பிரிக்கலாம்.",
      table: {
        headers: ["வகை", "விளக்கம்", "எடுத்துக்காட்டு"],
        rows: [
          ["இயற்சொல்", "எளிதில் பொருள் விளங்கும் சொற்கள்", "கடல், கப்பல், படித்தான்"],
          ["திரிசொல்", "கற்றோர்க்கு மட்டும் விளங்கும் இலக்கியச் சொற்கள்", "வங்கூழ், அழுவம், சாற்றினான்"],
          ["திசைச்சொல்", "பிற மொழிகளிலிருந்து வந்த சொற்கள்", "சாவி, சன்னல், பண்டிகை"],
          ["வடசொல்", "வடமொழி (சமஸ்கிருதம்) சொற்கள்", "வருடம், மாதம், கமலம்"]
        ]
      }
    },
    {
      id: "iyal",
      heading: "இயற்சொல் (Natural Words)",
      icon: "🌿",
      content: "எளிதில் பொருள் விளங்கும் வகையில் அமைந்த சொற்கள் இயற்சொற்கள் எனப்படும். இயற்சொல் பெயர், வினை, இடை, உரி ஆகிய நான்கு வகையிலும் வரும்.",
      table: {
        headers: ["வகை", "எடுத்துக்காட்டு"],
        rows: [
          ["பெயர் இயற்சொல்", "மண், பொன்"],
          ["வினை இயற்சொல்", "நடந்தான், வந்தான்"],
          ["இடை இயற்சொல்", "அவனை, அவனால்"],
          ["உரி இயற்சொல்", "மாநகர்"]
        ]
      }
    },
    {
      id: "thiri",
      heading: "திரிசொல் (Literary Words)",
      icon: "📜",
      content: "கற்றோர்க்கு மட்டுமே விளங்குபவையாகவும் இலக்கியங்களில் மட்டுமே பயின்று வருபவையாகவும் அமையும் சொற்கள் திரிசொற்கள் எனப்படும்.",
      subsections: [
        {
          title: "திரிசொல்லின் வகைகள்",
          content: "திரிசொற்களை ஒரு பொருள் குறித்த பல திரிசொற்கள் என்றும், பல பொருள் குறித்த ஒரு திரிசொல் என்றும் இருவகைப்படுத்தலாம்."
        }
      ],
      table: {
        headers: ["வகை", "எடுத்துக்காட்டு", "பொருள்"],
        rows: [
          ["ஒரு பொருள் - பல திரிசொல்", "வங்கம், அம்பி, நாவாய்", "கப்பல் (ஒரே பொருள்)"],
          ["பல பொருள் - ஒரு திரிசொல்", "இதழ்", "பூவின் இதழ், உதடு, கண் இமை, படையேடு, நாளிதழ்"]
        ]
      },
      tableB: {
        headers: ["வகை", "எடுத்துக்காட்டு"],
        rows: [
          ["பெயர்த் திரிசொல்", "அழுவம், வங்கம்"],
          ["வினைத் திரிசொல்", "இயம்பினான், பயின்றாள்"],
          ["இடைத் திரிசொல்", "அன்ன, மான"],
          ["உரித் திரிசொல்", "கூர், கழி"]
        ]
      }
    },
    {
      id: "thisai",
      heading: "திசைச்சொல் (Regional/Borrowed Words)",
      icon: "🗺️",
      content: "வடமொழி தவிர, பிற மொழிகளிலிருந்து வந்து தமிழில் இடம்பெறும் சொற்கள் திசைச்சொற்கள் எனப்படும்.",
      subsections: [
        {
          title: "எடுத்துக்காட்டுகள்",
          content: "சாவி, சன்னல், பண்டிகை, இரயில் — இவை தமிழ்ச்சொற்கள் அல்ல; பிற மொழிகளிலிருந்து வந்தவை."
        },
        {
          title: "சிறப்பு குறிப்பு",
          content: "முற்காலத்தில் பாண்டிநாட்டைத் தவிர, தமிழ்நாட்டின் பிற பகுதிகளில் வழங்கிய கேணி (கிணறு), பெற்றம் (பசு) போன்ற சொற்களையும் திசைச்சொற்கள் என்றே வழங்கினர்."
        }
      ]
    },
    {
      id: "vada",
      heading: "வடசொல் (Sanskrit Words)",
      icon: "🏛️",
      content: "வடமொழி எனப்படும் சமஸ்கிருத மொழிச்சொற்களிலிருந்து வந்து தமிழில் இடம்பெறும் சொற்கள் வடசொற்கள் எனப்படும்.",
      table: {
        headers: ["வகை", "விளக்கம்", "எடுத்துக்காட்டு"],
        rows: [
          ["தற்சமம்", "வடமொழியில் இருப்பது போன்றே தமிழில் எழுதுவது", "கமலம், அலங்காரம்"],
          ["தற்பவம்", "தமிழ் எழுத்துகளால் மாற்றி எழுதுவது", "லக்ஷமி→இலக்குமி, விஷம்→விடம்"]
        ]
      }
    }
  ]
};

const QUIZ_DATA = [
  { q: "சொல் என்பதற்கான வேறு பெயர்கள் எவை?", options: ["மொழி, பதம், கிளவி", "எழுத்து, வரி, சொற்று", "வாக்கியம், தொடர், உரை", "நாமம், வினை, உரி"], ans: 0, exp: "மொழி, பதம், கிளவி என்பன சொல் என்னும் பொருள் தரும் வேறு சொற்களாகும்." },
  { q: "இலக்கிய வகையில் சொற்கள் எத்தனை வகைப்படும்?", options: ["மூன்று", "நான்கு", "ஐந்து", "இரண்டு"], ans: 1, exp: "இலக்கிய வகையில் சொற்களை இயற்சொல், திரிசொல், திசைச்சொல், வடசொல் என நான்கு வகையாகப் பிரிக்கலாம்." },
  { q: "எல்லாருக்கும் எளிதில் பொருள் விளங்கும் சொல் எது?", options: ["திரிசொல்", "திசைச்சொல்", "இயற்சொல்", "வடசொல்"], ans: 2, exp: "எளிதில் பொருள் விளங்கும் வகையில் அமைந்த சொற்கள் இயற்சொற்கள் எனப்படும்." },
  { q: "வடமொழி என்று அழைக்கப்படும் மொழி எது?", options: ["மலையாளம்", "கன்னடம்", "சமஸ்கிருதம்", "தெலுங்கு"], ans: 2, exp: "வடமொழி என்று அழைக்கப்படும் மொழி சமஸ்கிருதம் ஆகும்." },
  { q: "பல பொருள் தரும் ஒருசொல் எது?", options: ["இயற்சொல்", "திரிசொல்", "திசைச்சொல்", "வடசொல்"], ans: 1, exp: "திரிசொல்லை ஒரு பொருள் குறித்த பல திரிசொற்கள் என்றும், பல பொருள் குறித்த ஒரு திரிசொல் என்றும் இருவகைப்படுத்தலாம்." },
  { q: "'வங்கம், அம்பி, நாவாய்' என்பன எதன் எடுத்துக்காட்டு?", options: ["பல பொருள் ஒரு திரிசொல்", "ஒரு பொருள் பல திரிசொல்", "இயற்சொல்", "திசைச்சொல்"], ans: 1, exp: "வங்கம், அம்பி, நாவாய் என்பன கப்பல் என்னும் ஒரே பொருளைத் தருவதால் ஒரு பொருள் குறித்த பல திரிசொற்கள் எனப்படும்." },
  { q: "'இதழ்' என்னும் சொல் எத்தனை பொருள்களைத் தருகிறது?", options: ["ஒன்று", "இரண்டு", "மூன்று", "ஐந்து"], ans: 3, exp: "இதழ் என்னும் சொல் பூவின் இதழ், உதடு, கண் இமை, படையேடு, நாளிதழ் என ஐந்து பொருள்களைத் தருகிறது." },
  { q: "சாவி, சன்னல், பண்டிகை என்பன எவ்வகைச் சொற்கள்?", options: ["இயற்சொல்", "திரிசொல்", "திசைச்சொல்", "வடசொல்"], ans: 2, exp: "சாவி, சன்னல், பண்டிகை போன்றவை பிற மொழிகளிலிருந்து வந்து தமிழில் வழங்கி வருவதால் திசைச்சொற்கள் ஆகும்." },
  { q: "வருடம், மாதம், கமலம் என்பன எவ்வகைச் சொற்கள்?", options: ["திசைச்சொல்", "வடசொல்", "திரிசொல்", "இயற்சொல்"], ans: 1, exp: "வருடம், மாதம், கமலம் போன்றவை சமஸ்கிருத மொழிச்சொற்களிலிருந்து வந்தவை. இவை வடசொற்கள் எனப்படும்." },
  { q: "வடசொல்லின் வகைகள் யாவை?", options: ["இயற்சொல், திரிசொல்", "தற்சமம், தற்பவம்", "திசை, வடசொல்", "உரி, இடை"], ans: 1, exp: "வடசொற்களை தற்சமம், தற்பவம் என இருவகையாகப் பிரிப்பர்." },
  { q: "லக்ஷமி என்பதை இலக்குமி என்று எழுதுவது எவ்வகை வடசொல்?", options: ["தற்சமம்", "தற்பவம்", "திசைச்சொல்", "இயற்சொல்"], ans: 1, exp: "லக்ஷமி என்பதை தமிழ் எழுத்துகளால் மாற்றி இலக்குமி என எழுதுவது தற்பவம் எனப்படும்." },
  { q: "கமலம், அலங்காரம் என வடமொழியில் இருப்பது போன்றே எழுதுவது எது?", options: ["தற்பவம்", "தற்சமம்", "திசைச்சொல்", "திரிசொல்"], ans: 1, exp: "வடமொழியில் இருப்பது போன்றே தமிழில் எழுதுவது தற்சமம் என்பர்." },
  { q: "இயற்சொல் எத்தனை வகைகளில் வரும்?", options: ["மூன்று", "இரண்டு", "நான்கு", "ஐந்து"], ans: 2, exp: "இயற்சொல் பெயர், வினை, இடை, உரி ஆகிய நான்கு வகையிலும் வரும்." },
  { q: "'மண், பொன்' என்பன எவ்வகைச் சொற்கள்?", options: ["வினை இயற்சொல்", "பெயர் இயற்சொல்", "இடை இயற்சொல்", "உரி இயற்சொல்"], ans: 1, exp: "மண், பொன் என்பன பெயர் இயற்சொல் ஆகும்." },
  { q: "'நடந்தான், வந்தான்' என்பன எவ்வகைச் சொற்கள்?", options: ["பெயர் இயற்சொல்", "இடை இயற்சொல்", "வினை இயற்சொல்", "உரி இயற்சொல்"], ans: 2, exp: "நடந்தான், வந்தான் என்பன வினை இயற்சொல் ஆகும்." },
  { q: "இலக்கண முறைப்படி சொற்கள் எத்தனை வகைப்படும்?", options: ["இரண்டு", "மூன்று", "நான்கு", "ஆறு"], ans: 2, exp: "இலக்கண முறைப்படி பெயர்ச்சொல், வினைச்சொல், இடைச்சொல், உரிச்சொல் எனச் சொற்கள் நான்கு வகைப்படும்." },
  { q: "'அவனை, அவனால்' என்பன எவ்வகை இயற்சொற்கள்?", options: ["பெயர்", "வினை", "இடை", "உரி"], ans: 2, exp: "அவனை, அவனால் என்பன இடை இயற்சொல் ஆகும்." },
  { q: "திரிசொல் எத்தனை வகைகளில் வரும்?", options: ["இரண்டு", "மூன்று", "நான்கு", "ஐந்து"], ans: 2, exp: "திரிசொல் பெயர், வினை, இடை, உரி ஆகிய நான்கு வகையிலும் வரும்." },
  { q: "கேணி என்னும் சொல் எதன் பொருள்?", options: ["பசு", "கிணறு", "கப்பல்", "நீர்"], ans: 1, exp: "கேணி என்னும் திசைச்சொல் கிணறு என்னும் பொருளைத் தருகிறது." },
  { q: "பெற்றம் என்னும் திசைச்சொல் எதன் பொருள்?", options: ["பழம்", "பசு", "பயிர்", "நிலம்"], ans: 1, exp: "பெற்றம் என்னும் திசைச்சொல் பசு என்னும் பொருளைத் தருகிறது." },
  { q: "வங்கூழ் என்னும் திரிசொல் எதன் பொருள்?", options: ["கடல்", "காற்று", "மழை", "நெருப்பு"], ans: 1, exp: "வங்கூழ் என்னும் திரிசொல் காற்று என்னும் பொருளைத் தருகிறது." },
  { q: "அழுவம் என்னும் திரிசொல் எதன் பொருள்?", options: ["காற்று", "கடல்", "மழை", "மலை"], ans: 1, exp: "அழுவம் என்னும் திரிசொல் கடல் என்னும் பொருளைத் தருகிறது." },
  { q: "சாற்றினான் என்னும் திரிசொல் எதன் பொருள்?", options: ["சொன்னான்", "ஓடினான்", "வந்தான்", "படித்தான்"], ans: 0, exp: "சாற்றினான் என்னும் திரிசொல் சொன்னான் என்னும் பொருளைத் தருகிறது." },
  { q: "உறுபயன் என்னும் திரிசொல் எதன் பொருள்?", options: ["சிறிய பயன்", "மிகுந்த பயன்", "இல்லாத பயன்", "பொதுவான பயன்"], ans: 1, exp: "உறுபயன் என்னும் திரிசொல் மிகுந்த பயன் என்னும் பொருளைத் தருகிறது." },
  { q: "விடம் என்பது எவ்வகை வடசொல்?", options: ["தற்சமம்", "தற்பவம்", "திசைச்சொல்", "திரிசொல்"], ans: 1, exp: "விஷம் என்பதை தமிழ் எழுத்துகளால் மாற்றி விடம் என எழுதுவது தற்பவம் என்னும் வடசொல் வகையாகும்." },
  { q: "ஓர் எழுத்தே பொருள் தருவதற்கு எடுத்துக்காட்டு?", options: ["வா", "அறம்", "பூ", "கடல்"], ans: 2, exp: "பூ என்பது ஓர் எழுத்தே பொருள் தரும் சொல்லுக்கு எடுத்துக்காட்டு." },
  { q: "திரிசொல்லை கற்றோர் மட்டும் புரிந்துகொள்ள முடியுமா?", options: ["இல்லை", "ஆமாம்", "சில நேரம் மட்டுமே", "குழந்தைகளுக்கும் புரியும்"], ans: 1, exp: "திரிசொற்கள் கற்றோர்க்கு மட்டுமே விளங்குபவையாகவும் இலக்கியங்களில் மட்டுமே பயின்று வருபவையாகவும் அமையும்." },
  { q: "இலக்கிய வகைச் சொற்களில் முதல் வகை எது?", options: ["திரிசொல்", "வடசொல்", "இயற்சொல்", "திசைச்சொல்"], ans: 2, exp: "இலக்கிய வகையில் முதல் வகை இயற்சொல் ஆகும்." },
  { q: "'கூர், கழி' என்பன எவ்வகை திரிசொற்கள்?", options: ["பெயர்த் திரிசொல்", "வினைத் திரிசொல்", "இடைத் திரிசொல்", "உரித் திரிசொல்"], ans: 3, exp: "கூர், கழி என்பன உரித் திரிசொல் ஆகும்." },
  { q: "'அன்ன, மான' என்பன எவ்வகை திரிசொற்கள்?", options: ["பெயர்த் திரிசொல்", "வினைத் திரிசொல்", "இடைத் திரிசொல்", "உரித் திரிசொல்"], ans: 2, exp: "அன்ன, மான என்பன இடைத் திரிசொல் ஆகும்." },
  { q: "'இயம்பினான், பயின்றாள்' என்பன எவ்வகை திரிசொற்கள்?", options: ["பெயர்", "வினை", "இடை", "உரி"], ans: 1, exp: "இயம்பினான், பயின்றாள் என்பன வினைத் திரிசொல் ஆகும்." },
  { q: "சாவி என்னும் சொல் எந்த மொழியிலிருந்து வந்தது?", options: ["ஆங்கிலம்", "சமஸ்கிருதம்", "போர்த்துகீசியம்", "தெலுங்கு"], ans: 2, exp: "சாவி என்னும் சொல் போர்த்துகீசிய மொழியிலிருந்து வந்து தமிழில் வழங்கும் திசைச்சொல் ஆகும்." },
  { q: "மாநகர் என்பது எவ்வகை இயற்சொல்?", options: ["பெயர்", "வினை", "இடை", "உரி"], ans: 3, exp: "மாநகர் என்பது உரி இயற்சொல் ஆகும்." },
  { q: "சக்கரம் என்பது எவ்வகைச் சொல்?", options: ["இயற்சொல்", "திசைச்சொல்", "வடசொல்", "திரிசொல்"], ans: 2, exp: "சக்கரம் என்பது சமஸ்கிருதத்திலிருந்து வந்த வடசொல் ஆகும்." },
  { q: "பண்டிகை என்னும் சொல் எவ்வகை?", options: ["இயற்சொல்", "திரிசொல்", "திசைச்சொல்", "வடசொல்"], ans: 2, exp: "பண்டிகை என்னும் சொல் பிற மொழிகளிலிருந்து வந்த திசைச்சொல் ஆகும்." },
  { q: "இரயில் என்னும் சொல் எவ்வகை?", options: ["இயற்சொல்", "திரிசொல்", "திசைச்சொல்", "வடசொல்"], ans: 2, exp: "இரயில் என்னும் சொல் ஆங்கிலத்திலிருந்து வந்த திசைச்சொல் ஆகும்." },
  { q: "எழுதினான் என்னும் சொல் எவ்வகை இயற்சொல்?", options: ["பெயர்", "வினை", "இடை", "உரி"], ans: 1, exp: "எழுதினான் என்னும் சொல் வினை இயற்சொல் ஆகும்." },
  { q: "விடம் என்னும் சொல் எவ்வகை வடசொல்?", options: ["தற்சமம்", "தற்பவம்", "திசைச்சொல்", "இயற்சொல்"], ans: 1, exp: "விஷம் என்பதை தமிழ் எழுத்துகளால் மாற்றி விடம் என எழுவது தற்பவம் ஆகும்." },
  { q: "ஒரு பொருளைக் குறிக்கும் பல திரிசொற்களுக்கு எடுத்துக்காட்டு?", options: ["இதழ்", "வங்கம்-அம்பி-நாவாய்", "கேணி-பெற்றம்", "அழுவம்-வங்கூழ்"], ans: 1, exp: "வங்கம், அம்பி, நாவாய் என்பன கப்பல் என்னும் ஒரே பொருளைத் தருவதால் ஒரு பொருள் குறித்த பல திரிசொற்கள் ஆகும்." },
  { q: "நாளிதழ் செய்தியொன்றில் உள்ள நால்வகைச் சொற்களைக் கண்டறிவது எந்தப் பயிற்சி?", options: ["கற்றபின் செய்தல்", "மதிப்பீடு", "கற்பவை கற்றபின்", "மொழியோடு விளையாடு"], ans: 2, exp: "நாளிதழ் செய்தியொன்றை எடுத்துக்கொண்டு அதிலுள்ள நால்வகைச் சொற்களையும் வகைப்படுத்திப் பட்டியல் உருவாக்குக என்பது கற்பவை கற்றபின் பயிற்சியாகும்." },
  { q: "அடுத்த சொல் 'புத்தகம்' எத்தனை எழுத்துகள் கொண்டது?", options: ["மூன்று", "நான்கு", "ஐந்து", "ஆறு"], ans: 2, exp: "புத்தகம் என்னும் சொல் ப+உ+த்+த+க+ம் என ஐந்து அல்லது ஆறு எழுத்துகளைக் கொண்டது — ஐந்து எழுத்துகள் (மூல எழுத்து அடிப்படையில் ஐந்து)." },
  { q: "திசைச்சொல்லும் வடசொல்லும் ஒரே வகை என்று சொல்லலாமா?", options: ["ஆமாம்", "இல்லை", "சில நேரம் ஒன்றே", "நூல்களில் ஒன்றாக சொல்கிறார்கள்"], ans: 1, exp: "திசைச்சொல் என்பது பிற மொழிகளிலிருந்து (வடமொழி தவிர) வந்தவை. வடசொல் என்பது சமஸ்கிருதத்திலிருந்து மட்டும் வந்தவை. இவை வெவ்வேறு வகை." },
  { q: "மாதம் என்பது எவ்வகைச் சொல்?", options: ["இயற்சொல்", "திரிசொல்", "திசைச்சொல்", "வடசொல்"], ans: 3, exp: "மாதம் என்பது சமஸ்கிருத மொழியிலிருந்து வந்த வடசொல் ஆகும்." },
  { q: "கடல், கப்பல் என்பன எவ்வகைச் சொற்கள்?", options: ["திரிசொல்", "இயற்சொல்", "திசைச்சொல்", "வடசொல்"], ans: 1, exp: "கடல், கப்பல் என்பன எளிதில் பொருள் விளங்கும் இயற்சொற்கள் ஆகும்." },
  { q: "சாற்றினான் என்பது எவ்வகிச் சொல்?", options: ["இயற்சொல்", "திசைச்சொல்", "திரிசொல்", "வடசொல்"], ans: 2, exp: "சாற்றினான் என்பது கற்றோர்க்கு மட்டுமே விளங்கும் திரிசொல் ஆகும்." },
  { q: "இலக்கண முறைப்படி சொற்களின் முதல் வகை எது?", options: ["இடைச்சொல்", "உரிச்சொல்", "பெயர்ச்சொல்", "வினைச்சொல்"], ans: 2, exp: "இலக்கண முறைப்படி சொற்களின் முதல் வகை பெயர்ச்சொல் ஆகும்." },
  { q: "திரிசொல்லை யார் புரிந்துகொள்ள இயலும்?", options: ["அனைவரும்", "குழந்தைகள்", "கற்றோர் மட்டும்", "கல்லாதோர்"], ans: 2, exp: "திரிசொற்கள் கற்றோர்க்கு மட்டுமே விளங்கும்." },
  { q: "வா என்னும் சொல் எத்தனை எழுத்துகள் கொண்டது?", options: ["ஒன்று", "இரண்டு", "மூன்று", "நான்கு"], ans: 1, exp: "வா என்னும் சொல் இரண்டு எழுத்துகளைக் கொண்டது." },
  { q: "இடைச்சொல் எந்த வகையைச் சார்ந்தது?", options: ["இலக்கியம்", "இலக்கணம்", "இரண்டும்", "ஒன்றுமில்லை"], ans: 1, exp: "இடைச்சொல் என்பது இலக்கண முறைப்படியான வகைப்பாடு." },
  { q: "வடசொற்கள் எத்தனை வகைப்படும்?", options: ["மூன்று", "நான்கு", "இரண்டு", "ஒன்று"], ans: 2, exp: "வடசொற்களைத் தற்சமம், தற்பவம் என இருவகையாகப் பிரிப்பர்." },
  { q: "பாண்டிநாட்டில் வழங்காத திசைச்சொல்லுக்கு எடுத்துக்காட்டு?", options: ["கமலம்", "கேணி", "சாவி", "பண்டிகை"], ans: 1, exp: "முற்காலத்தில் பாண்டிநாட்டைத் தவிர மற்ற பகுதிகளில் வழங்கிய கேணி (கிணறு) திசைச்சொல்லுக்கு எடுத்துக்காட்டு." },
  { q: "நாவாய் என்னும் திரிசொல் எதன் பொருள்?", options: ["தோணி", "கப்பல்", "இரயில்", "வண்டி"], ans: 1, exp: "நாவாய் என்னும் திரிசொல் கப்பல் என்னும் பொருளைத் தருகிறது." },
  { q: "பாடப்பகுதியில் கூறப்படும் மதிப்பீட்டு வகை எது?", options: ["கட்டுரை", "சரியான விடையைத் தேர்ந்தெடுத்து எழுதுக", "வரைபடம்", "பேச்சு"], ans: 1, exp: "பாடப்பகுதியில் சரியான விடையைத் தேர்ந்தெடுத்து எழுதுக என்ற வகையில் மதிப்பீடு கொடுக்கப்பட்டுள்ளது." }
];

const GAME_LEVELS = [
  { level: 1, name: "தொடக்கம்", qCount: 5, time: 30, color: "#10b981" },
  { level: 2, name: "இடைநிலை", qCount: 8, time: 25, color: "#f59e0b" },
  { level: 3, name: "மேம்பட்ட", qCount: 10, time: 20, color: "#ef4444" }
];

export default function Chapter4() {
  const [activeTab, setActiveTab] = useState("notes");
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [gameState, setGameState] = useState("select");
  const [gameLevel, setGameLevel] = useState(null);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [gameIdx, setGameIdx] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameSelected, setGameSelected] = useState(null);
  const [gameTimeLeft, setGameTimeLeft] = useState(0);
  const [gameTimer, setGameTimer] = useState(null);
  const [gameDone, setGameDone] = useState(false);
  const [showExp, setShowExp] = useState(false);

  const startGame = (level) => {
    const shuffled = [...QUIZ_DATA].sort(() => Math.random() - 0.5).slice(0, level.qCount);
    setGameLevel(level);
    setGameQuestions(shuffled);
    setGameIdx(0);
    setGameScore(0);
    setGameSelected(null);
    setGameTimeLeft(level.time);
    setGameDone(false);
    setGameState("playing");
    startTimer(level.time, shuffled, 0, 0);
  };

  const startTimer = (time, questions, idx, score) => {
    if (gameTimer) clearInterval(gameTimer);
    let t = time;
    const interval = setInterval(() => {
      t--;
      setGameTimeLeft(t);
      if (t <= 0) {
        clearInterval(interval);
        handleGameNext(questions, idx, score, null);
      }
    }, 1000);
    setGameTimer(interval);
  };

  const handleGameAnswer = (optIdx, questions, idx, score) => {
    if (gameSelected !== null) return;
    if (gameTimer) clearInterval(gameTimer);
    setGameSelected(optIdx);
    const correct = questions[idx].ans === optIdx;
    const newScore = correct ? score + 1 : score;
    setGameScore(newScore);
    setTimeout(() => handleGameNext(questions, idx, newScore, optIdx), 1500);
  };

  const handleGameNext = (questions, idx, score, selected) => {
    const nextIdx = idx + 1;
    if (nextIdx >= questions.length) {
      setGameDone(true);
      setGameState("result");
    } else {
      setGameIdx(nextIdx);
      setGameSelected(null);
      startTimer(gameLevel?.time || 25, questions, nextIdx, score);
    }
  };

  const handleQuizAnswer = (optIdx) => {
    if (quizSelected !== null) return;
    setQuizSelected(optIdx);
    const correct = QUIZ_DATA[quizIdx].ans === optIdx;
    if (correct) setQuizScore(s => s + 1);
    else setWrongAnswers(w => [...w, quizIdx]);
  };

  const nextQuiz = () => {
    if (quizIdx + 1 >= QUIZ_DATA.length) setQuizDone(true);
    else { setQuizIdx(i => i + 1); setQuizSelected(null); setShowExp(false); }
  };

  const resetQuiz = () => { setQuizIdx(0); setQuizSelected(null); setQuizScore(0); setQuizDone(false); setWrongAnswers([]); setShowExp(false); };

  const pct = Math.round((quizScore / QUIZ_DATA.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", fontFamily: "'Segoe UI', sans-serif", color: "#e2e8f0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(90deg, #7c3aed, #4f46e5, #0ea5e9)", padding: "20px 16px", textAlign: "center", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}>
        <div style={{ fontSize: "clamp(18px,4vw,26px)", fontWeight: 900, color: "#fff", letterSpacing: "1px" }}>📚 Chapter 4 — Term 2</div>
        <div style={{ fontSize: "clamp(13px,3vw,18px)", color: "#e0e7ff", marginTop: 4 }}>இலக்கியவகைச் சொற்கள் · Literary Types of Words</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "16px 12px", flexWrap: "wrap" }}>
        {[["notes","📝 Notes"],["quiz","❓ Quiz"],["game","🎮 Game"]].map(([id,label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{
            padding: "10px 24px", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 700, fontSize: "clamp(13px,2.5vw,15px)",
            background: activeTab === id ? "linear-gradient(90deg,#7c3aed,#4f46e5)" : "rgba(255,255,255,0.08)",
            color: activeTab === id ? "#fff" : "#94a3b8",
            boxShadow: activeTab === id ? "0 4px 15px rgba(124,58,237,0.4)" : "none",
            transition: "all 0.3s"
          }}>{label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 12px 40px" }}>

        {/* NOTES TAB */}
        {activeTab === "notes" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ display: "inline-block", background: "linear-gradient(135deg,#7c3aed22,#4f46e522)", border: "1px solid #7c3aed44", borderRadius: 16, padding: "12px 24px" }}>
                <div style={{ fontSize: 32 }}>📖</div>
                <div style={{ fontSize: "clamp(16px,3vw,20px)", fontWeight: 800, color: "#a78bfa", marginTop: 4 }}>இலக்கியவகைச் சொற்கள்</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>Literary Types of Words — 7th Grade Tamil, Term 2</div>
              </div>
            </div>

            {/* Visual Map */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <div style={{ textAlign: "center", fontWeight: 800, fontSize: 15, color: "#f0abfc", marginBottom: 16 }}>🗺️ சொல் வகை படவரைப்பு (Word Type Mind Map)</div>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
                <div style={{ textAlign: "center", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", borderRadius: 12, padding: "12px 20px", minWidth: 140 }}>
                  <div style={{ fontSize: 24 }}>🔤</div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "#fff" }}>சொல்</div>
                  <div style={{ fontSize: 11, color: "#c4b5fd" }}>Word / மொழி / பதம்</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[["🌿","இயற்சொல்","எளிதில் விளங்கும்","#059669"],["📜","திரிசொல்","கற்றோர்க்கு மட்டும்","#d97706"],["🗺️","திசைச்சொல்","பிற மொழியிலிருந்து","#0891b2"],["🏛️","வடசொல்","சமஸ்கிருதம்","#dc2626"]].map(([icon,name,desc,bg]) => (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, background: bg+"22", border: `1px solid ${bg}44`, borderRadius: 8, padding: "6px 12px" }}>
                      <span style={{ fontSize: 18 }}>{icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>{name}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {NOTES_DATA.sections.map((sec) => (
              <div key={sec.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{sec.icon}</span>
                  <div style={{ fontWeight: 800, fontSize: "clamp(15px,3vw,18px)", color: "#a78bfa" }}>{sec.heading}</div>
                </div>
                <div style={{ color: "#cbd5e1", lineHeight: 1.8, marginBottom: 12, fontSize: "clamp(13px,2.5vw,15px)" }}>{sec.content}</div>
                {sec.subsections && sec.subsections.map((sub, si) => (
                  <div key={si} style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 10, padding: 12, marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, color: "#c084fc", marginBottom: 6, fontSize: 14 }}>💡 {sub.title}</div>
                    <div style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7 }}>{sub.content}</div>
                  </div>
                ))}
                {sec.table && (
                  <div style={{ overflowX: "auto", marginTop: 12 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "clamp(12px,2vw,14px)" }}>
                      <thead>
                        <tr style={{ background: "linear-gradient(90deg,#7c3aed,#4f46e5)" }}>
                          {sec.table.headers.map((h, i) => (
                            <th key={i} style={{ padding: "10px 12px", textAlign: "left", color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row, ri) => (
                          <tr key={ri} style={{ background: ri % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            {row.map((cell, ci) => (
                              <td key={ci} style={{ padding: "9px 12px", color: ci === 0 ? "#c084fc" : "#cbd5e1", fontWeight: ci === 0 ? 700 : 400 }}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {sec.tableB && (
                  <div style={{ overflowX: "auto", marginTop: 12 }}>
                    <div style={{ fontWeight: 700, color: "#f0abfc", marginBottom: 8, fontSize: 14 }}>திரிசொல் வகைகள் (Sub-types)</div>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "clamp(12px,2vw,14px)" }}>
                      <thead>
                        <tr style={{ background: "linear-gradient(90deg,#d97706,#b45309)" }}>
                          {sec.tableB.headers.map((h, i) => (
                            <th key={i} style={{ padding: "10px 12px", textAlign: "left", color: "#fff", fontWeight: 700 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.tableB.rows.map((row, ri) => (
                          <tr key={ri} style={{ background: ri % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            {row.map((cell, ci) => (
                              <td key={ci} style={{ padding: "9px 12px", color: ci === 0 ? "#fbbf24" : "#cbd5e1", fontWeight: ci === 0 ? 700 : 400 }}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}

            {/* Summary Box */}
            <div style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.1),rgba(5,150,105,0.1))", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontWeight: 800, color: "#34d399", marginBottom: 12, fontSize: 16 }}>✅ முக்கிய சுருக்கம் (Key Summary)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                {[
                  ["இயற்சொல்","எளிதில் அனைவரும் புரிந்துகொள்ளும் சொற்கள்"],
                  ["திரிசொல்","கற்றோர்க்கு மட்டுமே விளங்கும் இலக்கியச் சொற்கள்"],
                  ["திசைச்சொல்","வடமொழி தவிர பிற மொழிகளிலிருந்து வந்தவை"],
                  ["வடசொல்","சமஸ்கிருதத்திலிருந்து வந்தவை (தற்சமம்/தற்பவம்)"]
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: 12 }}>
                    <div style={{ fontWeight: 700, color: "#34d399", fontSize: 14, marginBottom: 4 }}>{k}</div>
                    <div style={{ color: "#94a3b8", fontSize: 13 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUIZ TAB */}
        {activeTab === "quiz" && !quizDone && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>கேள்வி {quizIdx + 1} / {QUIZ_DATA.length}</div>
              <div style={{ fontWeight: 700, color: "#a78bfa" }}>மதிப்பெண்: {quizScore}</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 6, marginBottom: 20, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${((quizIdx + 1) / QUIZ_DATA.length) * 100}%`, background: "linear-gradient(90deg,#7c3aed,#4f46e5)", transition: "width 0.3s" }} />
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: "clamp(15px,3vw,18px)", color: "#e2e8f0", lineHeight: 1.6 }}>{QUIZ_DATA[quizIdx].q}</div>
            </div>
            <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
              {QUIZ_DATA[quizIdx].options.map((opt, i) => {
                let bg = "rgba(255,255,255,0.05)";
                let border = "rgba(255,255,255,0.1)";
                let col = "#e2e8f0";
                if (quizSelected !== null) {
                  if (i === QUIZ_DATA[quizIdx].ans) { bg = "rgba(16,185,129,0.2)"; border = "#10b981"; col = "#34d399"; }
                  else if (i === quizSelected && i !== QUIZ_DATA[quizIdx].ans) { bg = "rgba(239,68,68,0.2)"; border = "#ef4444"; col = "#fca5a5"; }
                }
                return (
                  <button key={i} onClick={() => handleQuizAnswer(i)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 18px", textAlign: "left", color: col, fontSize: "clamp(13px,2.5vw,15px)", cursor: quizSelected !== null ? "default" : "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ background: "rgba(255,255,255,0.1)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{["அ","ஆ","இ","ஈ"][i]}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {quizSelected !== null && (
              <div>
                <div style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, color: "#c084fc", marginBottom: 6 }}>💡 விளக்கம் (Explanation)</div>
                  <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7 }}>{QUIZ_DATA[quizIdx].exp}</div>
                </div>
                <button onClick={nextQuiz} style={{ width: "100%", padding: "14px", background: "linear-gradient(90deg,#7c3aed,#4f46e5)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                  {quizIdx + 1 >= QUIZ_DATA.length ? "முடிவு காண →" : "அடுத்த கேள்வி →"}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "quiz" && quizDone && (
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📖"}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#a78bfa", marginBottom: 8 }}>Quiz முடிந்தது!</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", marginBottom: 8 }}>{quizScore}/{QUIZ_DATA.length}</div>
            <div style={{ fontSize: 20, color: pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f87171", marginBottom: 24 }}>
              {pct >= 80 ? "அருமை! சிறப்பான செயல்திறன்!" : pct >= 60 ? "நன்று! மேலும் படிக்கவும்" : "மீண்டும் படித்து முயற்சிக்கவும்"}
            </div>
            {wrongAnswers.length > 0 && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 16, padding: 16, marginBottom: 20, textAlign: "left" }}>
                <div style={{ fontWeight: 700, color: "#f87171", marginBottom: 10 }}>❌ தவறான கேள்விகள்:</div>
                {wrongAnswers.map(wi => (
                  <div key={wi} style={{ marginBottom: 8, fontSize: 13, color: "#cbd5e1" }}>
                    <span style={{ color: "#f87171" }}>• </span>{QUIZ_DATA[wi].q} → <span style={{ color: "#34d399" }}>{QUIZ_DATA[wi].options[QUIZ_DATA[wi].ans]}</span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={resetQuiz} style={{ padding: "14px 32px", background: "linear-gradient(90deg,#7c3aed,#4f46e5)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>மீண்டும் செய்</button>
          </div>
        )}

        {/* GAME TAB */}
        {activeTab === "game" && gameState === "select" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48 }}>🎮</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#a78bfa", marginTop: 8 }}>Quiz Game</div>
              <div style={{ color: "#64748b", fontSize: 14 }}>நிலை தேர்ந்தெடுக்கவும்</div>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {GAME_LEVELS.map(level => (
                <button key={level.level} onClick={() => startGame(level)} style={{ background: `linear-gradient(135deg,${level.color}22,${level.color}11)`, border: `1px solid ${level.color}44`, borderRadius: 16, padding: 20, cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>நிலை {level.level}: {level.name}</div>
                    <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>{level.qCount} கேள்விகள் • {level.time} வினாடி/கேள்வி</div>
                  </div>
                  <div style={{ fontSize: 32 }}>{["🌱","⚡","🔥"][level.level - 1]}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "game" && gameState === "playing" && gameQuestions.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ color: "#94a3b8" }}>கேள்வி {gameIdx + 1}/{gameQuestions.length}</div>
              <div style={{ fontWeight: 700, color: gameTimeLeft <= 10 ? "#ef4444" : "#34d399", fontSize: 18 }}>⏱ {gameTimeLeft}s</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 6, marginBottom: 16, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(gameTimeLeft / (gameLevel?.time || 25)) * 100}%`, background: gameTimeLeft <= 10 ? "#ef4444" : "#10b981", transition: "width 1s linear" }} />
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 20, marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: "clamp(14px,3vw,17px)", color: "#e2e8f0", lineHeight: 1.6 }}>{gameQuestions[gameIdx].q}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {gameQuestions[gameIdx].options.map((opt, i) => {
                let bg = "rgba(255,255,255,0.07)";
                let border = "rgba(255,255,255,0.12)";
                if (gameSelected !== null) {
                  if (i === gameQuestions[gameIdx].ans) { bg = "rgba(16,185,129,0.25)"; border = "#10b981"; }
                  else if (i === gameSelected && i !== gameQuestions[gameIdx].ans) { bg = "rgba(239,68,68,0.25)"; border = "#ef4444"; }
                }
                return (
                  <button key={i} onClick={() => handleGameAnswer(i, gameQuestions, gameIdx, gameScore)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 10px", color: "#e2e8f0", fontSize: "clamp(12px,2.5vw,14px)", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "game" && gameState === "result" && (
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{gameScore >= gameQuestions.length * 0.8 ? "🏆" : "🎯"}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#a78bfa", marginBottom: 8 }}>Game Over!</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", marginBottom: 8 }}>{gameScore}/{gameQuestions.length}</div>
            <div style={{ color: "#94a3b8", marginBottom: 24 }}>நிலை: {gameLevel?.name}</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => startGame(gameLevel)} style={{ padding: "12px 24px", background: "linear-gradient(90deg,#7c3aed,#4f46e5)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, cursor: "pointer" }}>மீண்டும் விளை</button>
              <button onClick={() => setGameState("select")} style={{ padding: "12px 24px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, color: "#fff", fontWeight: 700, cursor: "pointer" }}>நிலை மாற்று</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
