import { useState } from "react";

const NOTES_DATA = {
  title: "ஒரெழுத்து ஒருமொழி, பகுபதம், பகாப்பதம்",
  subtitle: "Single Letter Words, Divisible & Indivisible Words",
  sections: [
    {
      id: "orey",
      heading: "ஒரெழுத்து ஒருமொழி (Single-Letter Words)",
      icon: "🔡",
      content: "ஓர் எழுத்தே பொருள் தரும் சொல்லாக அமைவதை ஒரெழுத்து ஒருமொழி என்பர். நன்னூல் என்னும் இலக்கண நூலை எழுதிய பவணந்தி முனிவர் தமிழில் நாற்பத்திரண்டு ஒரெழுத்து ஒருமொழிகள் உள்ளன என்று குறிப்பிட்டுள்ளார்.",
      table: {
        headers: ["எழுத்து", "பொருள்", "எழுத்து", "பொருள்", "எழுத்து", "பொருள்"],
        rows: [
          ["ஆ", "பசு", "கா", "சோலை", "தா", "கொடு"],
          ["ஈ", "கொடு", "கூ", "பூமி", "தீ", "நெருப்பு"],
          ["ஊ", "இறைச்சி", "கை", "ஒழுக்கம்", "தூ", "தூய்மை"],
          ["ஏ", "அம்பு", "கோ", "அரசன்", "தே", "கடவுள்"],
          ["ஐ", "தலைவன்", "சா", "இறந்துபோ", "தை", "தைத்தல்"],
          ["ஓ", "மதகுநீர் தாங்கும் பலகை", "சீ", "இகழ்ச்சி", "நா", "நாவு"],
          ["நீ", "முன்னிலை ஒருமை", "சே", "உயர்வு", "நே", "அன்பு"],
          ["நை", "இழிவு", "சோ", "மதில்", "நோ", "வறுமை"],
          ["பா", "பாடல்", "பூ", "மலர்", "பே", "மேகம்"],
          ["பை", "இளமை", "போ", "செல்", "மா", "மாமரம்"],
          ["மீ", "வான்", "மூ", "மூப்பு", "மே", "அன்பு"],
          ["மை", "அஞ்சனம்", "மோ", "மோத்தல்", "யா", "அகலம்"],
          ["வா", "அழைத்தல்", "வீ", "மலர்", "வை", "புல்"],
          ["வெள்", "கவர்", "நொ", "நோய்", "து", "உண்"]
        ]
      },
      subsections: [
        {
          title: "சிறப்பு குறிப்பு",
          content: "நொ, து ஆகிய இரண்டு சொற்களைத் தவிர ஏனைய நாற்பது சொற்களும் நெடில் எழுத்துகளாக அமைந்தவை ஆகும்."
        }
      ]
    },
    {
      id: "pakupam",
      heading: "பகுபதம் (Divisible Words)",
      icon: "🔧",
      content: "சிறுசிறு உறுப்புகளாகப் பிரிக்கும் வகையில் அமையும் சொற்களைப் பகுபதங்கள் என்பர். பிரிக்கப்படும் உறுப்புகளைப் பகுபத உறுப்புகள் என்று குறிப்பிடுவர்.",
      subsections: [
        {
          title: "எடுத்துக்காட்டு",
          content: "வேலன் → வேல் + அன் | படித்தான் → படி + த் + த் + ஆன்"
        }
      ]
    },
    {
      id: "types",
      heading: "பகுபதம் — வகைகள் (Types of Divisible Words)",
      icon: "📂",
      content: "பகுபதமாக அமையும் பெயர்ச்சொல் பெயர்ப்பகுபதம் ஆகும். பகுபதமாக அமையும் வினைச்சொல் வினைப்பகுபதம் ஆகும்.",
      table: {
        headers: ["வகை", "விளக்கம்", "எடுத்துக்காட்டு", "பிரிப்பு"],
        rows: [
          ["பெயர்ப்பகுபதம்", "பகுபதமாக அமையும் பெயர்ச்சொல்", "பொன்னன் (பொருள்)", "பொன் + அன்"],
          ["பெயர்ப்பகுபதம்", "இடம் குறிக்கும்", "நாடன் (இடம்)", "நாடு + அன்"],
          ["பெயர்ப்பகுபதம்", "காலம் குறிக்கும்", "சித்திரையான் (காலம்)", "சித்திரை + ஆன்"],
          ["பெயர்ப்பகுபதம்", "சினை குறிக்கும்", "கண்ணன் (சினை)", "கண் + அன்"],
          ["பெயர்ப்பகுபதம்", "பண்பு குறிக்கும்", "இனியன் (பண்பு)", "இனிமை + அன்"],
          ["பெயர்ப்பகுபதம்", "தொழில் குறிக்கும்", "உழவன் (தொழில்)", "உழவு + அன்"],
          ["வினைப்பகுபதம்", "பகுபதமாக அமையும் வினைச்சொல்", "உண்கின்றான்", "உண் + கின்று + ஆன்"]
        ]
      }
    },
    {
      id: "components",
      heading: "பகுபத உறுப்புகள் (Components of Divisible Words)",
      icon: "🔩",
      content: "பகுபத உறுப்புகள் ஆறு வகைப்படும்:",
      table: {
        headers: ["உறுப்பு", "விளக்கம்", "சிறப்பு குறிப்பு"],
        rows: [
          ["பகுதி", "பகுபதத்தின் முதலில் அமைந்து முதன்மையான பொருளைத் தருவது", "வினைப்பகுபதத்தின் பகுதி கட்டளையாகவே அமையும்"],
          ["விகுதி", "பகுபதத்தின் இறுதியில் அமைந்து திணை, பால், எண், இடம் ஆகியவற்றைக் காட்டுவது", "முற்று, எச்சம் ஆகியவற்றையும் காட்டும்"],
          ["இடைநிலை", "பகுதிக்கும் விகுதிக்கும் இடையில் அமைந்து காலம் அல்லது எதிர்மறையைக் காட்டுவது", "காலத்தைக் குறிக்கும் முக்கிய உறுப்பு"],
          ["சந்தி", "பெரும்பாலும் பகுதிக்கும் இடைநிலைக்கும் இடையே இடம்பெறும் மெய்யெழுத்து", "சந்தி என்பது இணைப்பு எழுத்து"],
          ["சாரியை", "பெரும்பாலும் இடைநிலைக்கும் விகுதிக்கும் இடையே இடம்பெறும் அச்சொல்", "அச்சொல்லாக இருக்கும்"],
          ["விகாரம்", "பகுதி, சந்தி, இடைநிலை முதலியவற்றில் ஏற்படும் மாற்றம்", "வடிவ மாற்றம்"]
        ]
      },
      subsections: [
        {
          title: "முழு எடுத்துக்காட்டு: வந்தனன்",
          content: "வந்தனன் = வா(வ) + த்(ந்) + த் + அன் + அன் | வா → பகுதி (வ எனக் குறுகியது = விகாரம்) | த் → சந்தி (ந் எனத் திரிந்தது = விகாரம்) | த் → இறந்தகால இடைநிலை | அன் → சாரியை | அன் → ஆண்பால் வினைமுற்று விகுதி"
        }
      ]
    },
    {
      id: "pakap",
      heading: "பகாப்பதம் (Indivisible Words)",
      icon: "🔒",
      content: "மேலும் சிறிய உறுப்புகளாகப் பிரிக்க முடியாத சொல் பகாப்பதம் எனப்படும். இவை அடிச்சொல் அல்லது வேர்ச்சொல்லாக இருக்கும். பெயர், வினை, இடை, உரி ஆகிய நான்கு வகைச் சொற்களிலும் பகாப்பதங்கள் உண்டு.",
      table: {
        headers: ["வகை", "எடுத்துக்காட்டு"],
        rows: [
          ["பெயர்ப் பகாப்பதம்", "நிலம், நீர், நெருப்பு, காற்று"],
          ["வினைப் பகாப்பதம்", "நட, வா, படி, வாழ்"],
          ["இடைப் பகாப்பதம்", "மன், கொல், தில், போல்"],
          ["உரிப் பகாப்பதம்", "உறு, தவ, நனி, கழி"]
        ]
      }
    },
    {
      id: "compare",
      heading: "பகுபதம் vs பகாப்பதம் (Comparison)",
      icon: "⚖️",
      content: "பகுபதம் மற்றும் பகாப்பதம் இடையேயான வேறுபாடுகள்:",
      table: {
        headers: ["பகுபதம்", "பகாப்பதம்"],
        rows: [
          ["உறுப்புகளாகப் பிரிக்கலாம்", "உறுப்புகளாகப் பிரிக்க முடியாது"],
          ["வேலன், படித்தான், உழவன்", "மரம், கழனி, உண், எழுது"],
          ["பகுதி+விகுதி+இடைநிலை+சந்தி+சாரியை+விகாரம் கொண்டது", "அடிச்சொல் / வேர்ச்சொல்"],
          ["பெயர்ப்பகுபதம், வினைப்பகுபதம் என வகைப்படும்", "நான்கு வகைகளிலும் வரும்"]
        ]
      }
    }
  ]
};

const QUIZ_DATA = [
  { q: "நன்னூலின்படி தமிழிலுள்ள ஒரெழுத்து ஒருமொழிகளின் எண்ணிக்கை எத்தனை?", options: ["40", "42", "44", "46"], ans: 1, exp: "நன்னூல் என்னும் இலக்கண நூலை எழுதிய பவணந்தி முனிவர் தமிழில் நாற்பத்திரண்டு (42) ஒரெழுத்து ஒருமொழிகள் உள்ளன என்று குறிப்பிட்டுள்ளார்." },
  { q: "'எழுதினான்' என்பது எவ்வகை பகுபதம்?", options: ["பெயர்ப் பகுபதம்", "வினைப் பகுபதம்", "பெயர்ப் பகாப்பதம்", "வினைப் பகாப்பதம்"], ans: 1, exp: "எழுதினான் என்பது வினைச்சொல் பகுபதமாக உள்ளது. எழுது + இன் + ஆன் என பிரிக்கலாம். எனவே வினைப் பகுபதம்." },
  { q: "பெயர்ப்பகுபதம் எத்தனை வகைப்படும்?", options: ["நான்கு", "ஐந்து", "ஆறு", "ஏழு"], ans: 2, exp: "பெயர்ப்பகுபதம் பொருள், இடம், காலம், சினை, பண்பு, தொழில் என ஆறு வகைப்படும்." },
  { q: "காலத்தைக் காட்டும் பகுபத உறுப்பு எது?", options: ["பகுதி", "விகுதி", "இடைநிலை", "சந்தி"], ans: 2, exp: "பகுதிக்கும் விகுதிக்கும் இடையில் அமைந்து காலம் அல்லது எதிர்மறையைக் காட்டுவது இடைநிலை ஆகும்." },
  { q: "'மரம்' என்பது எவ்வகை சொல்?", options: ["பெயர்ப் பகுபதம்", "வினைப் பகுபதம்", "பெயர்ப் பகாப்பதம்", "வினைப் பகாப்பதம்"], ans: 2, exp: "மரம் என்பதை மேலும் சிறிய உறுப்புகளாகப் பிரிக்க முடியாது. எனவே இது பெயர்ப் பகாப்பதம்." },
  { q: "ஒரெழுத்து ஒருமொழிகளில் நெடில் எழுத்துகளாக அமைந்தவை எத்தனை?", options: ["38", "40", "42", "44"], ans: 1, exp: "நொ, து ஆகிய இரண்டை தவிர ஏனைய நாற்பது சொற்களும் நெடில் எழுத்துகளாக அமைந்தவை." },
  { q: "பகுபத உறுப்புகள் எத்தனை வகைப்படும்?", options: ["நான்கு", "ஐந்து", "ஆறு", "ஏழு"], ans: 2, exp: "பகுபத உறுப்புகள் பகுதி, விகுதி, இடைநிலை, சந்தி, சாரியை, விகாரம் என ஆறு வகைப்படும்." },
  { q: "'ஆ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் என்ன?", options: ["மலர்", "பசு", "அம்பு", "அழைத்தல்"], ans: 1, exp: "'ஆ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் பசு ஆகும்." },
  { q: "'பூ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் என்ன?", options: ["பசு", "நெருப்பு", "மலர்", "அம்பு"], ans: 2, exp: "'பூ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் மலர் ஆகும்." },
  { q: "'தீ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் என்ன?", options: ["நெருப்பு", "மலர்", "பசு", "அம்பு"], ans: 0, exp: "'தீ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் நெருப்பு ஆகும்." },
  { q: "'ஏ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் என்ன?", options: ["அரசன்", "அம்பு", "மலர்", "நாவு"], ans: 1, exp: "'ஏ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் அம்பு ஆகும்." },
  { q: "'கோ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் என்ன?", options: ["சோலை", "பூமி", "அரசன்", "மதில்"], ans: 2, exp: "'கோ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் அரசன் ஆகும்." },
  { q: "'கை' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் என்ன?", options: ["ஒழுக்கம்", "பூமி", "சோலை", "அரசன்"], ans: 0, exp: "'கை' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் ஒழுக்கம் ஆகும்." },
  { q: "'மீ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் என்ன?", options: ["மூப்பு", "வான்", "அன்பு", "அஞ்சனம்"], ans: 1, exp: "'மீ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் வான் ஆகும்." },
  { q: "'நா' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் என்ன?", options: ["வறுமை", "நாவு", "அன்பு", "இழிவு"], ans: 1, exp: "'நா' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் நாவு ஆகும்." },
  { q: "பகாப்பதம் என்பது எது?", options: ["பிரிக்கக்கூடிய சொல்", "பிரிக்க முடியாத சொல்", "இலக்கியச் சொல்", "வடமொழிச் சொல்"], ans: 1, exp: "மேலும் சிறிய உறுப்புகளாகப் பிரிக்க முடியாத சொல் பகாப்பதம் எனப்படும். இவை அடிச்சொல் அல்லது வேர்ச்சொல்லாக இருக்கும்." },
  { q: "வினைப் பகாப்பதத்திற்கு எடுத்துக்காட்டு?", options: ["நிலம், நீர்", "நட, வா, படி", "மன், கொல்", "உறு, தவ"], ans: 1, exp: "நட, வா, படி, வாழ் என்பன வினைப் பகாப்பதங்கள் ஆகும்." },
  { q: "இடைப் பகாப்பதத்திற்கு எடுத்துக்காட்டு?", options: ["நிலம், நீர்", "நட, வா", "மன், கொல், தில், போல்", "உறு, தவ"], ans: 2, exp: "மன், கொல், தில், போல் என்பன இடைப் பகாப்பதங்கள் ஆகும்." },
  { q: "உரிப் பகாப்பதத்திற்கு எடுத்துக்காட்டு?", options: ["நிலம்", "நட", "மன்", "உறு, தவ, நனி, கழி"], ans: 3, exp: "உறு, தவ, நனி, கழி என்பன உரிப் பகாப்பதங்கள் ஆகும்." },
  { q: "வேலன் என்பதை பிரிக்கும்போது என்ன கிடைக்கும்?", options: ["வேல் + அன்", "வேல + அன்", "வேலன் + ஆ", "வேல் + உன்"], ans: 0, exp: "வேலன் என்னும் சொல்லை வேல் + அன் எனப் பிரிக்கலாம். வேல் பகுதி; அன் விகுதி." },
  { q: "படித்தான் என்பதை பிரிக்கும்போது என்ன கிடைக்கும்?", options: ["படி + ஆன்", "படி + த் + த் + ஆன்", "படித் + தான்", "படி + தன்"], ans: 1, exp: "படித்தான் என்னும் சொல்லை படி + த் + த் + ஆன் எனப் பிரிக்கலாம்." },
  { q: "பகுபதத்தின் முதலில் அமைந்து முதன்மையான பொருளைத் தருவது எது?", options: ["விகுதி", "இடைநிலை", "பகுதி", "சந்தி"], ans: 2, exp: "பகுபதத்தின் முதலில் அமைந்து முதன்மையான பொருளைத் தருவது பகுதி ஆகும். வினைப்பகுபதத்தின் பகுதி கட்டளையாகவே அமையும்." },
  { q: "பகுபதத்தின் இறுதியில் அமைந்து திணை, பால் காட்டுவது எது?", options: ["பகுதி", "விகுதி", "இடைநிலை", "சாரியை"], ans: 1, exp: "பகுபதத்தின் இறுதியில் அமைந்து திணை, பால், எண், இடம் ஆகியவற்றைக் காட்டுவது விகுதி ஆகும்." },
  { q: "பகுதிக்கும் இடைநிலைக்கும் இடையே இடம்பெறும் மெய்யெழுத்து எது?", options: ["விகுதி", "பகுதி", "சந்தி", "சாரியை"], ans: 2, exp: "பெரும்பாலும் பகுதிக்கும் இடைநிலைக்கும் இடையே இடம்பெறும் மெய்யெழுத்து சந்தி எனப்படும்." },
  { q: "இடைநிலைக்கும் விகுதிக்கும் இடையே இடம்பெறும் அச்சொல் எது?", options: ["சந்தி", "சாரியை", "பகுதி", "விகாரம்"], ans: 1, exp: "பெரும்பாலும் இடைநிலைக்கும் விகுதிக்கும் இடையே இடம்பெறும் அச்சொல் சாரியை எனப்படும்." },
  { q: "பகுதி, சந்தி, இடைநிலை முதலியவற்றில் ஏற்படும் மாற்றம் எது?", options: ["சாரியை", "பகுதி", "விகாரம்", "விகுதி"], ans: 2, exp: "பகுதி, சந்தி, இடைநிலை முதலியவற்றில் ஏற்படும் மாற்றம் விகாரம் எனப்படும்." },
  { q: "'நட' என்பது எவ்வகை சொல்?", options: ["பெயர்ப் பகுபதம்", "வினைப் பகுபதம்", "பெயர்ப் பகாப்பதம்", "வினைப் பகாப்பதம்"], ans: 3, exp: "நட என்பதை மேலும் சிறிய உறுப்புகளாகப் பிரிக்க முடியாது. எனவே இது வினைப் பகாப்பதம்." },
  { q: "'கழனி' என்பது எவ்வகை சொல்?", options: ["பகுபதம்", "பகாப்பதம்", "திரிசொல்", "இயற்சொல்"], ans: 1, exp: "கழனி என்பதை சிறிய உறுப்புகளாகப் பிரிக்க முடியாது. எனவே இது பகாப்பதம் (வேர்ச்சொல்)." },
  { q: "'நோ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["வறுமை", "நோய்", "இழிவு", "அன்பு"], ans: 0, exp: "'நோ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் வறுமை ஆகும்." },
  { q: "'நொ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["வறுமை", "அன்பு", "நோய்", "இழிவு"], ans: 2, exp: "'நொ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் நோய் ஆகும்." },
  { q: "'கா' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["பசு", "சோலை", "பூமி", "நெருப்பு"], ans: 1, exp: "'கா' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் சோலை ஆகும்." },
  { q: "'கூ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["சோலை", "அரசன்", "பூமி", "ஒழுக்கம்"], ans: 2, exp: "'கூ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் பூமி ஆகும்." },
  { q: "பவணந்தி முனிவர் எழுதிய இலக்கண நூல் எது?", options: ["தொல்காப்பியம்", "நன்னூல்", "புறப்பொருள் வெண்பாமாலை", "இலக்கண விளக்கம்"], ans: 1, exp: "நன்னூல் என்னும் இலக்கண நூலை பவணந்தி முனிவர் எழுதினார். இந்த நூலில் 42 ஒரெழுத்து ஒருமொழிகள் குறிப்பிடப்பட்டுள்ளன." },
  { q: "'ஊ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["பசு", "இறைச்சி", "மலர்", "நெருப்பு"], ans: 1, exp: "'ஊ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் இறைச்சி ஆகும்." },
  { q: "'ஐ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["தலைவன்", "அம்பு", "பசு", "மதகுநீர் தாங்கும் பலகை"], ans: 0, exp: "'ஐ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் தலைவன் ஆகும்." },
  { q: "'மூ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["வான்", "அன்பு", "மூப்பு", "அஞ்சனம்"], ans: 2, exp: "'மூ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் மூப்பு ஆகும்." },
  { q: "உழவன் என்னும் பெயர்ப்பகுபதம் எந்த வகை?", options: ["பொருள்", "இடம்", "காலம்", "தொழில்"], ans: 3, exp: "உழவன் என்பது உழவு என்னும் தொழிலை அடிப்படையாகக் கொண்டு உருவானது. எனவே இது தொழில் குறிக்கும் பெயர்ப்பகுபதம்." },
  { q: "நாடன் என்னும் பெயர்ப்பகுபதம் எந்த வகை?", options: ["பொருள்", "இடம்", "காலம்", "சினை"], ans: 1, exp: "நாடன் என்பது நாடு என்னும் இடத்தை அடிப்படையாகக் கொண்டு உருவானது. எனவே இது இடம் குறிக்கும் பெயர்ப்பகுபதம்." },
  { q: "இனியன் என்னும் பெயர்ப்பகுபதம் எந்த வகை?", options: ["தொழில்", "சினை", "பண்பு", "காலம்"], ans: 2, exp: "இனியன் என்பது இனிமை என்னும் பண்பை அடிப்படையாகக் கொண்டு உருவானது. எனவே இது பண்பு குறிக்கும் பெயர்ப்பகுபதம்." },
  { q: "சித்திரையான் என்னும் பெயர்ப்பகுபதம் எந்த வகை?", options: ["பொருள்", "காலம்", "இடம்", "தொழில்"], ans: 1, exp: "சித்திரையான் என்பது சித்திரை என்னும் மாதம் (காலம்) அடிப்படையில் உருவானது. எனவே காலம் குறிக்கும் பெயர்ப்பகுபதம்." },
  { q: "'வீ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["மலர்", "கவர்", "புல்", "செல்"], ans: 0, exp: "'வீ' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் மலர் ஆகும்." },
  { q: "'வை' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["அழைத்தல்", "மலர்", "புல்", "கவர்"], ans: 2, exp: "'வை' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் புல் ஆகும்." },
  { q: "'பா' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["மேகம்", "இளமை", "பாடல்", "செல்"], ans: 2, exp: "'பா' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் பாடல் ஆகும்." },
  { q: "'மா' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["மூப்பு", "மாமரம்", "அன்பு", "வான்"], ans: 1, exp: "'மா' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் மாமரம் ஆகும்." },
  { q: "வந்தனன் என்பதில் 'அன்' (இரண்டாவது) என்பது எந்த உறுப்பு?", options: ["பகுதி", "சாரியை", "இடைநிலை", "விகுதி"], ans: 3, exp: "வந்தனன் = வா + த் + த் + அன் + அன். கடைசி அன் என்பது ஆண்பால் வினைமுற்று விகுதி ஆகும்." },
  { q: "வந்தனன் என்பதில் 'த்' (இரண்டாவது) என்பது எந்த உறுப்பு?", options: ["சந்தி", "இடைநிலை", "சாரியை", "விகுதி"], ans: 1, exp: "வந்தனன் = வா + த் + த் + அன் + அன். இரண்டாவது த் என்பது இறந்தகால இடைநிலை ஆகும்." },
  { q: "பாவாள் என்பதை பிரிக்கும்போது பா என்னும் பகுதி எந்த வகை?", options: ["பகுதி", "விகுதி", "இடைநிலை", "சந்தி"], ans: 0, exp: "போவாள் = போ + வ் + ஆள். போ என்பது பகுதி ஆகும்." },
  { q: "'நட + க் + கின்று + ஆன்' என்பது எந்த வினைமுற்றின் பகுபதம்?", options: ["நடந்தான்", "நடக்கிறான்", "நடப்பான்", "நடக்கின்றான்"], ans: 3, exp: "நட + க் + கின்று + ஆன் என்பது நடக்கின்றான் என்னும் வினைமுற்றின் பகுபதம்." },
  { q: "'சாரியை' என்றால் என்ன?", options: ["காலம் காட்டும் உறுப்பு", "திணை, பால் காட்டும் உறுப்பு", "இடைநிலை-விகுதி இடையே வரும் அச்சொல்", "இணைப்பு மெய்யெழுத்து"], ans: 2, exp: "பெரும்பாலும் இடைநிலைக்கும் விகுதிக்கும் இடையே இடம்பெறும் அச்சொல் சாரியை எனப்படும்." },
  { q: "'மை' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["அன்பு", "அஞ்சனம்", "மூப்பு", "வான்"], ans: 1, exp: "'மை' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் அஞ்சனம் ஆகும்." },
  { q: "'யா' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["புல்", "அகலம்", "மலர்", "கவர்"], ans: 1, exp: "'யா' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் அகலம் ஆகும்." },
  { q: "'நை' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள்?", options: ["அன்பு", "வறுமை", "இழிவு", "நோய்"], ans: 2, exp: "'நை' என்னும் ஒரெழுத்து ஒருமொழியின் பொருள் இழிவு ஆகும்." },
  { q: "'நீ' என்னும் ஒரெழுத்து ஒருமொழி எதைக் குறிக்கிறது?", options: ["தலைவன்", "முன்னிலை ஒருமை", "நாவு", "பசு"], ans: 1, exp: "'நீ' என்னும் ஒரெழுத்து ஒருமொழி முன்னிலை ஒருமையைக் குறிக்கிறது." }
];

const GAME_LEVELS = [
  { level: 1, name: "தொடக்கம்", qCount: 5, time: 30, color: "#10b981" },
  { level: 2, name: "இடைநிலை", qCount: 8, time: 25, color: "#f59e0b" },
  { level: 3, name: "மேம்பட்ட", qCount: 10, time: 20, color: "#ef4444" }
];

export default function Chapter5() {
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
  const [gameState2, setGameState2] = useState("select");

  const startGame = (level) => {
    const shuffled = [...QUIZ_DATA].sort(() => Math.random() - 0.5).slice(0, level.qCount);
    setGameLevel(level);
    setGameQuestions(shuffled);
    setGameIdx(0);
    setGameScore(0);
    setGameSelected(null);
    setGameTimeLeft(level.time);
    setGameState2("playing");
    runTimer(level.time, shuffled, 0, 0, level);
  };

  const runTimer = (time, questions, idx, score, level) => {
    if (gameTimer) clearInterval(gameTimer);
    let t = time;
    const iv = setInterval(() => {
      t--;
      setGameTimeLeft(t);
      if (t <= 0) {
        clearInterval(iv);
        moveNext(questions, idx, score, level, null);
      }
    }, 1000);
    setGameTimer(iv);
  };

  const handleGamePick = (optIdx) => {
    if (gameSelected !== null) return;
    if (gameTimer) clearInterval(gameTimer);
    setGameSelected(optIdx);
    const correct = gameQuestions[gameIdx].ans === optIdx;
    const ns = correct ? gameScore + 1 : gameScore;
    setGameScore(ns);
    setTimeout(() => moveNext(gameQuestions, gameIdx, ns, gameLevel, optIdx), 1500);
  };

  const moveNext = (questions, idx, score, level, selected) => {
    const ni = idx + 1;
    if (ni >= questions.length) { setGameState2("result"); }
    else { setGameIdx(ni); setGameSelected(null); runTimer(level?.time || 25, questions, ni, score, level); }
  };

  const handleQuizAnswer = (i) => {
    if (quizSelected !== null) return;
    setQuizSelected(i);
    if (QUIZ_DATA[quizIdx].ans === i) setQuizScore(s => s + 1);
    else setWrongAnswers(w => [...w, quizIdx]);
  };

  const nextQuiz = () => {
    if (quizIdx + 1 >= QUIZ_DATA.length) setQuizDone(true);
    else { setQuizIdx(i => i + 1); setQuizSelected(null); }
  };

  const resetQuiz = () => { setQuizIdx(0); setQuizSelected(null); setQuizScore(0); setQuizDone(false); setWrongAnswers([]); };
  const pct = Math.round((quizScore / QUIZ_DATA.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a1628 0%, #1a2744 50%, #0a1628 100%)", fontFamily: "'Segoe UI', sans-serif", color: "#e2e8f0" }}>
      <div style={{ background: "linear-gradient(90deg, #0891b2, #0e7490, #06b6d4)", padding: "20px 16px", textAlign: "center", boxShadow: "0 4px 20px rgba(8,145,178,0.4)" }}>
        <div style={{ fontSize: "clamp(18px,4vw,26px)", fontWeight: 900, color: "#fff" }}>📚 Chapter 5 — Term 2</div>
        <div style={{ fontSize: "clamp(13px,3vw,18px)", color: "#cffafe", marginTop: 4 }}>ஒரெழுத்து ஒருமொழி, பகுபதம், பகாப்பதம்</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "16px 12px", flexWrap: "wrap" }}>
        {[["notes","📝 Notes"],["quiz","❓ Quiz"],["game","🎮 Game"]].map(([id,label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "10px 24px", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 700, fontSize: "clamp(13px,2.5vw,15px)", background: activeTab === id ? "linear-gradient(90deg,#0891b2,#0e7490)" : "rgba(255,255,255,0.08)", color: activeTab === id ? "#fff" : "#94a3b8", boxShadow: activeTab === id ? "0 4px 15px rgba(8,145,178,0.4)" : "none", transition: "all 0.3s" }}>{label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 12px 40px" }}>

        {activeTab === "notes" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ display: "inline-block", background: "rgba(8,145,178,0.1)", border: "1px solid rgba(8,145,178,0.3)", borderRadius: 16, padding: "12px 24px" }}>
                <div style={{ fontSize: 32 }}>🔡</div>
                <div style={{ fontSize: "clamp(16px,3vw,20px)", fontWeight: 800, color: "#22d3ee" }}>ஒரெழுத்து ஒருமொழி | பகுபதம் | பகாப்பதம்</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>7th Grade Tamil, Term 2 — Chapter 5</div>
              </div>
            </div>

            {/* Visual Overview */}
            <div style={{ background: "rgba(8,145,178,0.08)", border: "1px solid rgba(8,145,178,0.2)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <div style={{ fontWeight: 800, color: "#22d3ee", marginBottom: 14, fontSize: 15, textAlign: "center" }}>🗺️ கருத்து வரைபடம்</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10 }}>
                {[["🔡","ஒரெழுத்து ஒருமொழி","42 சொற்கள் (நன்னூல்)","#0891b2"],["🔧","பகுபதம்","பிரிக்கக்கூடிய சொல்","#7c3aed"],["🔒","பகாப்பதம்","பிரிக்க முடியாத சொல்","#059669"]].map(([icon,name,desc,bg]) => (
                  <div key={name} style={{ background: bg+"22", border: `1px solid ${bg}44`, borderRadius: 12, padding: 14, textAlign: "center" }}>
                    <div style={{ fontSize: 28 }}>{icon}</div>
                    <div style={{ fontWeight: 800, color: "#fff", fontSize: 14, marginTop: 6 }}>{name}</div>
                    <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {NOTES_DATA.sections.map((sec) => (
              <div key={sec.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{sec.icon}</span>
                  <div style={{ fontWeight: 800, fontSize: "clamp(15px,3vw,18px)", color: "#22d3ee" }}>{sec.heading}</div>
                </div>
                <div style={{ color: "#cbd5e1", lineHeight: 1.8, marginBottom: 12, fontSize: "clamp(13px,2.5vw,15px)" }}>{sec.content}</div>
                {sec.subsections && sec.subsections.map((sub, si) => (
                  <div key={si} style={{ background: "rgba(8,145,178,0.1)", border: "1px solid rgba(8,145,178,0.2)", borderRadius: 10, padding: 12, marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, color: "#38bdf8", marginBottom: 6, fontSize: 14 }}>💡 {sub.title}</div>
                    <div style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7 }}>{sub.content}</div>
                  </div>
                ))}
                {sec.table && (
                  <div style={{ overflowX: "auto", marginTop: 12 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "clamp(11px,2vw,13px)" }}>
                      <thead>
                        <tr style={{ background: "linear-gradient(90deg,#0891b2,#0e7490)" }}>
                          {sec.table.headers.map((h,i) => <th key={i} style={{ padding: "9px 10px", textAlign: "left", color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row, ri) => (
                          <tr key={ri} style={{ background: ri%2===0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            {row.map((cell, ci) => <td key={ci} style={{ padding: "8px 10px", color: ci===0 ? "#22d3ee" : "#cbd5e1", fontWeight: ci===0 ? 700 : 400 }}>{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}

            {/* Pagupatham Components Visual */}
            <div style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontWeight: 800, color: "#c084fc", marginBottom: 14, fontSize: 15 }}>🔩 பகுபத உறுப்புகள் — நினைவூட்டல் (Memory Aid)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10 }}>
                {[["பகுதி","Root / Stem","முதலில்","#4f46e5"],["விகுதி","Suffix","இறுதியில்","#7c3aed"],["இடைநிலை","Tense Marker","மத்தியில்","#059669"],["சந்தி","Connective","பகுதி-இடைநிலை","#d97706"],["சாரியை","Auxiliary","இடைநிலை-விகுதி","#0891b2"],["விகாரம்","Transformation","மாற்றம்","#dc2626"]].map(([t,e,p,c]) => (
                  <div key={t} style={{ background: c+"22", border: `1px solid ${c}44`, borderRadius: 10, padding: 12, textAlign: "center" }}>
                    <div style={{ fontWeight: 800, color: "#fff", fontSize: 14 }}>{t}</div>
                    <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 2 }}>{e}</div>
                    <div style={{ color: c, fontSize: 11, marginTop: 4, fontStyle: "italic" }}>{p}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "quiz" && !quizDone && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>கேள்வி {quizIdx+1}/{QUIZ_DATA.length}</div>
              <div style={{ fontWeight: 700, color: "#22d3ee" }}>மதிப்பெண்: {quizScore}</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 6, marginBottom: 20, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${((quizIdx+1)/QUIZ_DATA.length)*100}%`, background: "linear-gradient(90deg,#0891b2,#06b6d4)", transition: "width 0.3s" }} />
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: "clamp(15px,3vw,18px)", color: "#e2e8f0", lineHeight: 1.6 }}>{QUIZ_DATA[quizIdx].q}</div>
            </div>
            <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
              {QUIZ_DATA[quizIdx].options.map((opt, i) => {
                let bg = "rgba(255,255,255,0.05)", border = "rgba(255,255,255,0.1)", col = "#e2e8f0";
                if (quizSelected !== null) {
                  if (i === QUIZ_DATA[quizIdx].ans) { bg = "rgba(16,185,129,0.2)"; border = "#10b981"; col = "#34d399"; }
                  else if (i === quizSelected) { bg = "rgba(239,68,68,0.2)"; border = "#ef4444"; col = "#fca5a5"; }
                }
                return <button key={i} onClick={() => handleQuizAnswer(i)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 18px", textAlign: "left", color: col, fontSize: "clamp(13px,2.5vw,15px)", cursor: quizSelected!==null?"default":"pointer", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ background: "rgba(255,255,255,0.1)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{["அ","ஆ","இ","ஈ"][i]}</span>{opt}
                </button>;
              })}
            </div>
            {quizSelected !== null && (
              <div>
                <div style={{ background: "rgba(8,145,178,0.15)", border: "1px solid rgba(8,145,178,0.3)", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, color: "#22d3ee", marginBottom: 6 }}>💡 விளக்கம்</div>
                  <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7 }}>{QUIZ_DATA[quizIdx].exp}</div>
                </div>
                <button onClick={nextQuiz} style={{ width: "100%", padding: 14, background: "linear-gradient(90deg,#0891b2,#0e7490)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                  {quizIdx+1>=QUIZ_DATA.length ? "முடிவு காண →" : "அடுத்த கேள்வி →"}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "quiz" && quizDone && (
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{pct>=80?"🏆":pct>=60?"👍":"📖"}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#22d3ee", marginBottom: 8 }}>Quiz முடிந்தது!</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", marginBottom: 8 }}>{quizScore}/{QUIZ_DATA.length}</div>
            <div style={{ fontSize: 20, color: pct>=80?"#34d399":pct>=60?"#fbbf24":"#f87171", marginBottom: 24 }}>
              {pct>=80?"அருமை!":pct>=60?"நன்று! மேலும் படிக்கவும்":"மீண்டும் படித்து முயற்சிக்கவும்"}
            </div>
            {wrongAnswers.length > 0 && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 16, padding: 16, marginBottom: 20, textAlign: "left" }}>
                <div style={{ fontWeight: 700, color: "#f87171", marginBottom: 10 }}>❌ தவறான கேள்விகள்:</div>
                {wrongAnswers.map(wi => (
                  <div key={wi} style={{ marginBottom: 8, fontSize: 13, color: "#cbd5e1" }}>• {QUIZ_DATA[wi].q} → <span style={{ color: "#34d399" }}>{QUIZ_DATA[wi].options[QUIZ_DATA[wi].ans]}</span></div>
                ))}
              </div>
            )}
            <button onClick={resetQuiz} style={{ padding: "14px 32px", background: "linear-gradient(90deg,#0891b2,#0e7490)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>மீண்டும் செய்</button>
          </div>
        )}

        {activeTab === "game" && gameState2 === "select" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48 }}>🎮</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#22d3ee", marginTop: 8 }}>Quiz Game</div>
              <div style={{ color: "#64748b", fontSize: 14 }}>நிலை தேர்ந்தெடுக்கவும்</div>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {GAME_LEVELS.map(level => (
                <button key={level.level} onClick={() => startGame(level)} style={{ background: `linear-gradient(135deg,${level.color}22,${level.color}11)`, border: `1px solid ${level.color}44`, borderRadius: 16, padding: 20, cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>நிலை {level.level}: {level.name}</div>
                    <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>{level.qCount} கேள்விகள் • {level.time}s/கேள்வி</div>
                  </div>
                  <div style={{ fontSize: 32 }}>{["🌱","⚡","🔥"][level.level-1]}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "game" && gameState2 === "playing" && gameQuestions.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ color: "#94a3b8" }}>கேள்வி {gameIdx+1}/{gameQuestions.length}</div>
              <div style={{ fontWeight: 700, color: gameTimeLeft<=10?"#ef4444":"#34d399", fontSize: 18 }}>⏱ {gameTimeLeft}s</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 6, marginBottom: 16, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(gameTimeLeft/(gameLevel?.time||25))*100}%`, background: gameTimeLeft<=10?"#ef4444":"#0891b2", transition: "width 1s linear" }} />
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 20, marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: "clamp(14px,3vw,17px)", color: "#e2e8f0", lineHeight: 1.6 }}>{gameQuestions[gameIdx].q}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {gameQuestions[gameIdx].options.map((opt, i) => {
                let bg = "rgba(255,255,255,0.07)", border = "rgba(255,255,255,0.12)";
                if (gameSelected !== null) {
                  if (i === gameQuestions[gameIdx].ans) { bg = "rgba(16,185,129,0.25)"; border = "#10b981"; }
                  else if (i === gameSelected) { bg = "rgba(239,68,68,0.25)"; border = "#ef4444"; }
                }
                return <button key={i} onClick={() => handleGamePick(i)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 10px", color: "#e2e8f0", fontSize: "clamp(12px,2.5vw,14px)", cursor: "pointer", textAlign: "center" }}>{opt}</button>;
              })}
            </div>
          </div>
        )}

        {activeTab === "game" && gameState2 === "result" && (
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#22d3ee", marginBottom: 8 }}>Game Over!</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", marginBottom: 8 }}>{gameScore}/{gameQuestions.length}</div>
            <div style={{ color: "#94a3b8", marginBottom: 24 }}>நிலை: {gameLevel?.name}</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => startGame(gameLevel)} style={{ padding: "12px 24px", background: "linear-gradient(90deg,#0891b2,#0e7490)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, cursor: "pointer" }}>மீண்டும்</button>
              <button onClick={() => setGameState2("select")} style={{ padding: "12px 24px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, color: "#fff", fontWeight: 700, cursor: "pointer" }}>நிலை மாற்று</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
