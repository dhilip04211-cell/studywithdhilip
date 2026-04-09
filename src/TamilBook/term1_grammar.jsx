import { useState, useEffect, useRef } from "react";

const NOTES_DATA = [
  {
    id: "iyal1",
    title: "இயல் ஒன்று – தமிழ் எழுத்துகளின் வகையும் தொகையும்",
    sections: [
      {
        heading: "இலக்கணம் என்றால் என்ன?",
        content: `உலகில் உள்ள ஒவ்வொரு பொருளையும் மனிதன் உற்றுநோக்கினான். அவற்றின் இயல்புகளை அறிந்துகொண்டான். இவ்வாறே மொழியையும் ஆழ்ந்து கவனித்தான். மொழியை எவ்வாறு பேசவும் எழுதவும் வேண்டும் என்பதை வரையறை செய்தான். அந்த வரையறைகளே இலக்கணம் எனப்படும்.`
      },
      {
        heading: "தமிழ் இலக்கண வகைகள் – ஐந்து",
        content: null,
        list: [
          "எழுத்து இலக்கணம்",
          "சொல் இலக்கணம்",
          "பொருள் இலக்கணம்",
          "யாப்பு இலக்கணம்",
          "அணி இலக்கணம்"
        ]
      },
      {
        heading: "எழுத்து",
        content: "ஒலி வடிவமாக எழுப்பப்படுவதும் வரிவடிவமாக எழுதப்படுவதும் எழுத்து எனப்படுகிறது."
      },
      {
        heading: "உயிர் எழுத்துகள்",
        content: `உயிருக்கு முதன்மையானது காற்று. இயல்பாகக் காற்று வெளிப்படும்போது உயிர் எழுத்துகள் பிறக்கின்றன. வாயைத் திறத்தல், உதடுகளை விரித்தல், உதடுகளைக் குவித்தல் ஆகிய எளிய செயல்பாடுகளால் 'அ' முதல் 'ஔ' வரையுள்ள பன்னிரண்டு உயிர் எழுத்துகளும் பிறக்கின்றன.`,
        table: {
          headers: ["வகை", "எழுத்துகள்", "எண்ணிக்கை"],
          rows: [
            ["உயிர் எழுத்துகள் (மொத்தம்)", "அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ", "12"],
            ["குறில் (1 மாத்திரை)", "அ இ உ எ ஒ", "5"],
            ["நெடில் (2 மாத்திரை)", "ஆ ஈ ஊ ஏ ஐ ஓ ஔ", "7"]
          ]
        }
      },
      {
        heading: "ஒலித்துப் பார்த்து உணர்வோம்!",
        content: null,
        list: [
          "அ, இ, உ, எ, ஒ – ஆகிய ஐந்தும் குறுகி ஒலிக்கின்றன. இவை குறில் எழுத்துகள்.",
          "ஆ, ஈ, ஊ, ஏ, ஐ, ஓ, ஔ – ஆகிய ஏழும் நீண்டு ஒலிக்கின்றன. இவை நெடில் எழுத்துகள்."
        ]
      },
      {
        heading: "மாத்திரை",
        content: `மாத்திரை என்பது இங்குக் கால அளவைக் குறிக்கிறது. ஒரு மாத்திரை என்பது ஒருமுறை கண் இமைக்கவோ ஒருமுறை கைநாடிக்கவோ ஆகும் கால அளவாகும்.`,
        table: {
          headers: ["எழுத்து வகை", "கால அளவு"],
          rows: [
            ["குறில் எழுத்தை ஒலிக்கும் கால அளவு", "1 மாத்திரை"],
            ["நெடில் எழுத்தை ஒலிக்கும் கால அளவு", "2 மாத்திரை"],
            ["மெய் எழுத்துகள் ஒலிக்கும் கால அளவு", "அரை மாத்திரை"],
            ["ஆயத எழுத்தை ஒலிக்க ஆகும் கால அளவு", "அரை மாத்திரை"]
          ]
        }
      },
      {
        heading: "மெய்யெழுத்துகள்",
        content: `மெய் என்பது உடம்பு எனப் பொருள்படும். மெய் எழுத்துகளை ஒலிக்க உடல் இயக்கத்தின் பங்கு இன்றியமையாதது. க், ங், ச், ஞ், ட், ண், த், ந், ப், ம், ய, ர், ல், வ், ழ், ள், ற், ன் ஆகிய பதினெட்டும் மெய்யெழுத்துகள் ஆகும்.`,
        table: {
          headers: ["இனம்", "எழுத்துகள்", "ஒலி இயல்பு"],
          rows: [
            ["வல்லினம்", "க், ச், ட், த், ப், ற்", "வன்மையாக ஒலிக்கின்றன"],
            ["மெல்லினம்", "ங், ஞ், ண், ந், ம், ன்", "மென்மையாக ஒலிக்கின்றன"],
            ["இடையினம்", "ய, ர், ல், வ், ழ், ள்", "வன்மையாகவும் இல்லாமல், மென்மையாகவும் இல்லாமல் இரண்டிற்கும் இடைப்பட்டு ஒலிக்கின்றன"]
          ]
        }
      },
      {
        heading: "உயிர்மெய்",
        content: "மெய் எழுத்துகள் பதினெட்டுடன் உயிர் எழுத்துகள் பன்னிரண்டும் சேர்வதால் தோன்றும் 216 எழுத்துகளும் உயிர்மெய் எழுத்துகள் ஆகும். மெய்யுடன் உயிர்க்குறில் சேர்ந்தால் உயிர்மெயக் குறில் தோன்றுகிறது. மெய்யுடன் உயிர் நெடில் சேர்ந்தால் உயிர்மெய் நெடில் தோன்றுகிறது. ஆகவே உயிர்மெய் எழுத்துகளையும் உயிர்மெயக் குறில், உயிர்மெய் நெடில் என இருவகைப்படுத்தலாம்."
      },
      {
        heading: "ஆயத எழுத்து",
        content: "தமிழ் மொழியில் உயிர், மெய், உயிர்மெய் எழுத்துகள் தவிர தனி எழுத்து ஒன்றும் உள்ளது. அது ஃ என்னும் ஆயத எழுத்தாகும். ஆயத எழுத்தை ஒலிக்க ஆகும் கால அளவு அரை மாத்திரை."
      },
      {
        heading: "மதிப்பீடு – கொடுக்கப்பட்டுள்ள மாத்திரை அளவுக்கேற்பச் சொற்களை எழுதுக",
        content: null,
        list: [
          "1. உயிரெழுத்தில் தொடங்கும் இரண்டு மாத்திரை அளவுள்ள சொல் (எ.கா: ஆம்)",
          "2. இரண்டு மாத்திரை அளவுள்ள ஓரெழுத்துச்சொல் (எ.கா: போ)",
          "3. ஆயத எழுத்து இடம்பெறும் இரண்டரை மாத்திரை அளவுள்ள சொல் (எ.கா: அஃது)"
        ]
      },
      {
        heading: "குறுவினா",
        content: null,
        list: [
          "1. தமிழ் இலக்கணம் எத்தனை வகைப்படும்? அவை யாவை?",
          "2. மெய்யெழுத்துகளை மூவகை இனங்களாக வகைப்படுத்தி எழுதுக.",
          "3. தமிழ் எழுத்துகளுக்குரிய மாத்திரை அளவுகளைக் குறிப்பிடுக."
        ]
      }
    ]
  },
  {
    id: "iyal2",
    title: "இயல் இரண்டு – முதலெழுத்தும் சார்பெழுத்தும்",
    sections: [
      {
        heading: "எழுத்துகள் இரண்டு வகைப்படும்",
        content: null,
        list: [
          "1. முதல் எழுத்துகள்",
          "2. சார்பு எழுத்துகள்"
        ]
      },
      {
        heading: "முதல் எழுத்துகள்",
        content: "உயிர் எழுத்துகள் பன்னிரண்டு, மெய்யெழுத்துகள் பதினெட்டு ஆகிய முப்பது எழுத்துகளும் முதல் எழுத்துகள் ஆகும். பிற எழுத்துகள் தோன்றுவதற்கும் இயங்குவதற்கும் முதற்காரணமாக இவை இருக்கின்றன. எனவே இவற்றை முதல் எழுத்துகள் என்பர்."
      },
      {
        heading: "சார்பு எழுத்துகள் – பத்து வகை",
        content: "முதல் எழுத்துகளைச் சார்ந்து வரும் எழுத்துகள் சார்பெழுத்துகள். இவை பத்து வகைப்படும்.",
        list: [
          "1. உயிர்மெய்",
          "2. ஆயதம்",
          "3. உயிரளபெடை",
          "4. ஒற்றளபெடை",
          "5. குற்றியலிகரம்",
          "6. குற்றியலுகரம்",
          "7. ஐகாரக்குறுக்கம்",
          "8. ஒளகாரக்குறுக்கம்",
          "9. மகரக்குறுக்கம்",
          "10. ஆயதக்குறுக்கம்"
        ]
      },
      {
        heading: "உயிர்மெய்",
        content: null,
        list: [
          "மெய் எழுத்துகளும் உயிர் எழுத்துகளும் ஒன்றுடன் ஒன்று சேர்வதால் உயிர்மெய் எழுத்துகள் தோன்றுகின்றன.",
          "உயிர்மெய் எழுத்தின் ஒலிவடிவம் மெய்யும் உயிரும் சேர்ந்ததாக இருக்கும்.",
          "வரிவடிவம் மெய்யெழுத்தை ஒத்திருக்கும். ஒலிக்கும் கால அளவு உயிர் எழுத்தை ஒத்திருக்கும்.",
          "முதல் எழுத்துகளைச் சார்ந்து வருவதால் இவை சார்பெழுத்து வகையுள் அடங்கும்."
        ]
      },
      {
        heading: "ஆய்தம்",
        content: null,
        list: [
          "மூன்று புள்ளிகளை உடைய தனித்த வடிவம் பெற்றது.",
          "முப்புள்ளி, முப்பாற்புள்ளி, தனிநிலை, அஃகேனம் என்ற வேறு பெயர்களும் இதற்கு உண்டு.",
          "நுட்பமான ஒலிப்புமுறையை உடையது.",
          "தனக்குமுன் ஒரு குறில் எழுத்தையும் தனக்குப்பின் ஒரு வல்லின உயிர்மெய் எழுத்தையும் பெற்றுச் சொல்லின் இடையில் மட்டுமே வரும்.",
          "தனித்து இயங்காது.",
          "முதல் எழுத்துகளாகிய உயிரையும், மெய்யயும் சார்ந்து இயங்குவதால் ஆயத எழுத்து சார்பெழுத்து ஆகும்."
        ]
      },
      {
        heading: "மதிப்பீடு",
        content: null,
        list: [
          "1. முதல் எழுத்துகள் என்பவை யாவை? அவை எதனால் அவ்வாறு அழைக்கப்படுகின்றன?",
          "2. சார்பெழுத்துகள் எத்தனை? அவை யாவை?",
          "3. சொற்களில் ஆயத எழுத்து எவ்வாறு இடம்பெறும்?"
        ]
      }
    ]
  },
  {
    id: "iyal3",
    title: "இயல் மூன்று – மொழி முதல், இறுதி எழுத்துகள்",
    sections: [
      {
        heading: "அறிமுகம்",
        content: "நம் தமிழ் மொழியின் சொற்கள் நாம் எளிதாக ஒலிக்கும் வகையில் உருவானவை. வேற்று மொழிச்சொற்களைப் பேசுகையில் நமக்குத் தடுமாற்றம் ஏற்படுகிறது. நம் மொழியின் சொற்களின் இயல்பையும் மரபையும் அறிந்து கொள்வது தேவையானது. சொல்லின் முதலிலும் இடையிலும் இறுதியிலும் எந்தந்த எழுத்துகள் வரும் என்பதை அறிந்து கொள்வதால் மொழியை நன்கு பேசமுடியும்."
      },
      {
        heading: "மொழி முதல் எழுத்துகள்",
        content: "மொழி என்பதற்குச் சொல் என்னும் பொருளும் உண்டு. சொல்லின் முதலில் வரும் எழுத்துகளை மொழிமுதல் எழுத்துகள் என்பர்.",
        list: [
          "உயிர் எழுத்துகள் பன்னிரண்டும் சொல்லின் முதலில் வரும்.",
          "க, ச, த, ந, ப, ம ஆகிய வரிசைகளில் உள்ள எல்லா உயிர்மெய் எழுத்துகளும் சொல்லின் முதலில் வரும்.",
          "ஞ – வரிசையில் ஞ, ஞா, ஞெ, ஞோ ஆகிய நான்கு எழுத்துகளும் சொல்லின் முதலில் வரும்.",
          "ய – வரிசையில் ய, யா, யு, யூ, யோ, யௌ ஆகிய ஆறு எழுத்துகளும் சொல்லின் முதலில் வரும்.",
          "வ – வரிசையில் வ, வா, வி, வீ, வெ, வே, வை, வௌ ஆகிய எட்டு எழுத்துகளும் சொல்லின் முதலில் வரும்.",
          "ங – வரிசையில் 'ங' என்னும் ஓர் எழுத்து மட்டுமே சொல்லில் முதல் எழுத்தாக வருகிறது. எ.கா: ஙனம்"
        ]
      },
      {
        heading: "மொழிக்கு முதலில் வராத எழுத்துகள்",
        content: null,
        list: [
          "மெய்யெழுத்துகள் பதினெட்டும் சொல்லின் முதலில் வாரா.",
          "ட, ண, ர, ல, ழ, ள, ற, ன ஆகிய எட்டு உயிர்மெய் எழுத்துகளின் வரிசையில் ஓர் எழுத்து கூடச் சொல்லின் முதலில் வராது.",
          "ஆயத எழுத்து சொல்லின் முதலில் வராது.",
          "ங, ஞ, ய, வ ஆகிய உயிர்மெய் எழுத்து வரிசைகளில் மொழி முதலில் வருவதாகக் குறிப்பிடப்பட்ட எழுத்துகள் தவிர பிற எழுத்துகள் சொல்லின் முதலில் வாரா."
        ]
      },
      {
        heading: "மொழி இறுதி எழுத்துகள்",
        content: "சொல்லின் இறுதியில் வரும் எழுத்துகளை மொழி இறுதி எழுத்துகள் என்பர்.",
        list: [
          "உயிர் எழுத்துகள் பன்னிரண்டும் மெய்யுடன் இணைந்து உயிர்மெய்யாக மட்டுமே மொழி இறுதியில் வரும்.",
          "ஞ், ண், ந், ம், ய, ர், ல், வ், ழ், ள், ன் ஆகிய மெய்யெழுத்துகள் பதினொன்றும் மொழியின் இறுதியில் வரும். (உரிஞ், வெரிந், அவ்)"
        ]
      },
      {
        heading: "மொழி இறுதியாகா எழுத்துகள்",
        content: null,
        list: [
          "சொல்லின் இறுதியில் உயிரெழுத்துகள் தனித்து வருவதில்லை.",
          "ஆயத எழுத்து சொல்லின் இறுதியில் வராது.",
          "க், ங், ச், ட், த், ப், ற் ஆகிய ஏழு மெய் எழுத்துகளும் சொல்லின் இறுதியில் வருவதில்லை.",
          "உயிர்மெய் எழுத்துகளுள் 'ங' எழுத்து வரிசை சொல்லின் இறுதியில் வராது.",
          "எகர வரிசையில் கெ முதல் னெ முடிய எந்த உயிர்மெய் எழுத்தும் மொழி இறுதியில் வருவதில்லை.",
          "ஒகர வரிசையில் நோ தவிர பிற உயிர்மெய் எழுத்துகள் மொழி இறுதியில் வருவதில்லை.",
          "நோ என்னும் எழுத்து ஓரெழுத்து ஒரு மொழியாகத் துன்பம் என்னும் பொருளில் வரும்."
        ]
      },
      {
        heading: "சொல்லின் இடையில் வரும் எழுத்துகள்",
        content: null,
        list: [
          "மெய் எழுத்துகள் பதினெட்டும் சொல்லின் இடையில் வரும்.",
          "உயிர்மெய் எழுத்துகள் சொல்லின் இடையில் வரும்.",
          "ஆயத எழுத்து சொல்லின் இடையில் மட்டுமே வரும்.",
          "அளபெடையில் மட்டுமே உயிர் எழுத்துகள் சொல்லின் இடையில் வரும்."
        ]
      },
      {
        heading: "மதிப்பீடு",
        content: null,
        list: [
          "1. மொழிக்கு முதலில் வரும் உயிர்மெய் எழுத்துகள் யாவை?",
          "2. மொழிக்கு இறுதியில் வாரா மெய்யெழுத்துகள் யாவை?",
          "3. சொல்லின் இடையில் மட்டுமே வரும் எழுத்துகள் எவை?"
        ]
      }
    ]
  }
];

const ALL_QUIZ = [
  { q: "தமிழ் இலக்கண வகைகள் எத்தனை?", opts: ["மூன்று", "நான்கு", "ஐந்து", "ஆறு"], ans: 2 },
  { q: "உயிர் எழுத்துகள் எத்தனை?", opts: ["10", "12", "18", "30"], ans: 1 },
  { q: "மெய்யெழுத்துகள் எத்தனை?", opts: ["12", "14", "18", "216"], ans: 2 },
  { q: "உயிர்மெய் எழுத்துகள் எத்தனை?", opts: ["18", "30", "216", "247"], ans: 2 },
  { q: "குறில் எழுத்தை ஒலிக்கும் கால அளவு எத்தனை மாத்திரை?", opts: ["அரை", "1", "2", "3"], ans: 1 },
  { q: "நெடில் எழுத்தை ஒலிக்கும் கால அளவு எத்தனை மாத்திரை?", opts: ["அரை", "1", "2", "3"], ans: 2 },
  { q: "மெய் எழுத்துகள் ஒலிக்கும் கால அளவு என்ன?", opts: ["1 மாத்திரை", "2 மாத்திரை", "அரை மாத்திரை", "கால் மாத்திரை"], ans: 2 },
  { q: "ஆயத எழுத்தை ஒலிக்க ஆகும் கால அளவு என்ன?", opts: ["1 மாத்திரை", "2 மாத்திரை", "அரை மாத்திரை", "இல்லை"], ans: 2 },
  { q: "வல்லின எழுத்துகள் எத்தனை?", opts: ["4", "5", "6", "8"], ans: 2 },
  { q: "வல்லின எழுத்துகள் எவை?", opts: ["ங் ஞ் ண் ந் ம் ன்", "க் ச் ட் த் ப் ற்", "ய ர் ல் வ் ழ் ள்", "அ இ உ எ ஒ"], ans: 1 },
  { q: "மெல்லின எழுத்துகள் எவை?", opts: ["க் ச் ட் த் ப் ற்", "ய ர் ல் வ் ழ் ள்", "ங் ஞ் ண் ந் ம் ன்", "அ ஆ இ ஈ"], ans: 2 },
  { q: "இடையின எழுத்துகள் எவை?", opts: ["க் ச் ட் த் ப் ற்", "ங் ஞ் ண் ந் ம் ன்", "ய ர் ல் வ் ழ் ள்", "அ இ உ எ ஒ"], ans: 2 },
  { q: "முதல் எழுத்துகள் மொத்தம் எத்தனை?", opts: ["12", "18", "30", "247"], ans: 2 },
  { q: "சார்பு எழுத்துகள் எத்தனை வகைப்படும்?", opts: ["5", "8", "10", "12"], ans: 2 },
  { q: "ஆயத எழுத்தின் வேறு பெயர் எது?", opts: ["குறில்", "முப்புள்ளி", "நெடில்", "வல்லினம்"], ans: 1 },
  { q: "ஆயத எழுத்து சொல்லில் எங்கே வரும்?", opts: ["முதலில் மட்டும்", "இறுதியில் மட்டும்", "இடையில் மட்டும்", "எங்கும் வரும்"], ans: 2 },
  { q: "தமிழ் மொழியில் மொத்த எழுத்துகள் எத்தனை?", opts: ["216", "247", "248", "30"], ans: 1 },
  { q: "ஒரு மாத்திரை என்பது என்ன?", opts: ["ஒரு நிமிடம்", "ஒருமுறை கண் இமைக்க ஆகும் நேரம்", "ஒரு வினாடி", "ஐந்து வினாடி"], ans: 1 },
  { q: "உயிர் எழுத்துகளில் குறில் எழுத்துகள் எவை?", opts: ["அ ஆ இ ஈ உ", "அ இ உ எ ஒ", "ஆ ஈ ஊ ஏ ஓ", "அ இ உ ஏ ஓ"], ans: 1 },
  { q: "மொழி முதலில் வாராத எழுத்துகள் எது?", opts: ["உயிர் எழுத்துகள்", "க வரிசை", "மெய்யெழுத்துகள்", "ச வரிசை"], ans: 2 },
  { q: "'ஃ' என்பது எந்த வகை எழுத்து?", opts: ["உயிர்", "மெய்", "உயிர்மெய்", "ஆயதம்"], ans: 3 },
  { q: "சொல்லின் இடையில் மட்டுமே வரும் எழுத்து எது?", opts: ["உயிர் எழுத்து", "வல்லினம்", "ஆயத எழுத்து", "மெல்லினம்"], ans: 2 },
  { q: "மொழி இறுதியில் வராத மெய்யெழுத்துகள் எத்தனை?", opts: ["5", "7", "6", "8"], ans: 1 },
  { q: "ட, ண, ர, ல, ழ, ள, ற, ன – இந்த எழுத்துகள் எத்தனை?", opts: ["6", "7", "8", "9"], ans: 2 },
  { q: "பொருள் இலக்கணம் என்பது தமிழ் இலக்கண வகைகளுள் எது?", opts: ["முதல் வகை", "இரண்டாம் வகை", "மூன்றாம் வகை", "நான்காம் வகை"], ans: 2 },
  { q: "ய – வரிசையில் சொல் முதலில் வரும் எழுத்துகள் எத்தனை?", opts: ["4", "5", "6", "8"], ans: 2 },
  { q: "வ – வரிசையில் சொல் முதலில் வரும் எழுத்துகள் எத்தனை?", opts: ["6", "7", "8", "9"], ans: 2 },
  { q: "ஞ – வரிசையில் சொல் முதலில் வரும் எழுத்துகள் எத்தனை?", opts: ["2", "3", "4", "5"], ans: 2 },
  { q: "மொழி இறுதியில் வரும் மெய்யெழுத்துகள் எத்தனை?", opts: ["9", "10", "11", "12"], ans: 2 },
  { q: "எகர வரிசையில் மொழி இறுதியில் வரும் எழுத்துகள் உண்டா?", opts: ["உண்டு", "இல்லை", "சில வரும்", "எல்லாம் வரும்"], ans: 1 },
];

const MATCH_DATA = [
  {
    title: "தமிழ் இலக்கண வகைகளை பொருத்துக",
    pairs: [
      { left: "எழுத்து இலக்கணம்", right: "எழுத்துகளின் வகை, தொகை பற்றி விவரிக்கும்" },
      { left: "சொல் இலக்கணம்", right: "சொற்களின் வகை, இயல்பு பற்றி விவரிக்கும்" },
      { left: "பொருள் இலக்கணம்", right: "சொற்களின் பொருள் பற்றி விவரிக்கும்" },
      { left: "யாப்பு இலக்கணம்", right: "கவிதையின் அமைப்பு பற்றி விவரிக்கும்" },
      { left: "அணி இலக்கணம்", right: "மொழி அழகு பற்றி விவரிக்கும்" },
    ]
  },
  {
    title: "மெய்யெழுத்து இனங்களை பொருத்துக",
    pairs: [
      { left: "வல்லினம்", right: "க் ச் ட் த் ப் ற்" },
      { left: "மெல்லினம்", right: "ங் ஞ் ண் ந் ம் ன்" },
      { left: "இடையினம்", right: "ய ர் ல் வ் ழ் ள்" },
    ]
  },
  {
    title: "மாத்திரை அளவுகளை பொருத்துக",
    pairs: [
      { left: "குறில் எழுத்து", right: "1 மாத்திரை" },
      { left: "நெடில் எழுத்து", right: "2 மாத்திரை" },
      { left: "மெய் எழுத்து", right: "அரை மாத்திரை" },
      { left: "ஆயத எழுத்து", right: "அரை மாத்திரை" },
    ]
  },
  {
    title: "எழுத்து வகைகளை பொருத்துக",
    pairs: [
      { left: "உயிர் எழுத்துகள்", right: "12 எழுத்துகள்" },
      { left: "மெய்யெழுத்துகள்", right: "18 எழுத்துகள்" },
      { left: "உயிர்மெய் எழுத்துகள்", right: "216 எழுத்துகள்" },
      { left: "முதல் எழுத்துகள்", right: "30 எழுத்துகள்" },
    ]
  }
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function term1_grammar() {
  const [tab, setTab] = useState("notes");
  const [noteIdx, setNoteIdx] = useState(0);
  const [quizTab, setQuizTab] = useState("mcq");

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  // Match state
  const [matchIdx, setMatchIdx] = useState(0);
  const [matchLeft, setMatchLeft] = useState([]);
  const [matchRight, setMatchRight] = useState([]);
  const [selLeft, setSelLeft] = useState(null);
  const [selRight, setSelRight] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState(null);
  const [matchDone, setMatchDone] = useState(false);
  const [matchScore, setMatchScore] = useState(0);

  function startQuiz() {
    const qs = shuffle(ALL_QUIZ).slice(0, 20);
    setQuizQuestions(qs);
    setQIdx(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setQuizStarted(true);
  }

  function handleOption(i) {
    if (selected !== null) return;
    setSelected(i);
    const correct = quizQuestions[qIdx].ans === i;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { q: quizQuestions[qIdx].q, selected: i, correct, ans: quizQuestions[qIdx].ans, opts: quizQuestions[qIdx].opts }]);
  }

  function nextQ() {
    if (qIdx + 1 >= quizQuestions.length) {
      setShowResult(true);
    } else {
      setQIdx(i => i + 1);
      setSelected(null);
    }
  }

  function initMatch(idx) {
    const data = MATCH_DATA[idx];
    setMatchLeft(shuffle(data.pairs.map((p, i) => ({ ...p, id: i }))));
    setMatchRight(shuffle(data.pairs.map((p, i) => ({ ...p, id: i }))));
    setSelLeft(null);
    setSelRight(null);
    setMatched([]);
    setWrongPair(null);
    setMatchDone(false);
    setMatchScore(0);
  }

  useEffect(() => { initMatch(matchIdx); }, [matchIdx]);

  function handleLeft(id) {
    if (matched.includes(id)) return;
    setSelLeft(id);
    if (selRight !== null) checkMatch(id, selRight);
  }
  function handleRight(id) {
    if (matched.includes(id)) return;
    setSelRight(id);
    if (selLeft !== null) checkMatch(selLeft, id);
  }
  function checkMatch(l, r) {
    if (l === r) {
      const newMatched = [...matched, l];
      setMatched(newMatched);
      setMatchScore(s => s + 1);
      if (newMatched.length === MATCH_DATA[matchIdx].pairs.length) setMatchDone(true);
    } else {
      setWrongPair([l, r]);
      setTimeout(() => setWrongPair(null), 800);
    }
    setSelLeft(null);
    setSelRight(null);
  }

  const styles = {
    app: { minHeight: "100vh", background: "#0f0f1a", color: "#e8e8f0", fontFamily: "'Noto Serif Tamil', 'Noto Sans Tamil', Georgia, serif" },
    header: { background: "linear-gradient(135deg, #1a0a2e 0%, #0d1b3e 100%)", borderBottom: "1px solid #2a1a4e", padding: "16px 20px", position: "sticky", top: 0, zIndex: 100 },
    title: { fontSize: "18px", fontWeight: 700, color: "#d4af37", letterSpacing: "0.5px", margin: 0 },
    subtitle: { fontSize: "12px", color: "#8888aa", margin: "2px 0 0" },
    tabs: { display: "flex", gap: 8, padding: "12px 20px", background: "#0f0f1a", borderBottom: "1px solid #1a1a2e" },
    tab: (active) => ({ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, fontFamily: "inherit", transition: "all 0.2s", background: active ? "#d4af37" : "#1a1a2e", color: active ? "#0f0f1a" : "#8888aa" }),
    content: { padding: "0 0 40px" },
    // Notes
    noteSidebar: { display: "flex", gap: 8, padding: "12px 20px", flexWrap: "wrap", borderBottom: "1px solid #1a1a2e", background: "#0a0a15" },
    noteBtn: (active) => ({ padding: "6px 14px", borderRadius: 12, border: `1px solid ${active ? "#d4af37" : "#2a2a4e"}`, cursor: "pointer", fontSize: 12, fontFamily: "inherit", background: active ? "#2a1a0e" : "transparent", color: active ? "#d4af37" : "#8888aa", fontWeight: active ? 700 : 400 }),
    noteCard: { margin: "16px 20px", background: "#12122a", borderRadius: 12, border: "1px solid #2a1a4e", overflow: "hidden" },
    noteTitle: { padding: "14px 20px", background: "linear-gradient(90deg, #1a0a2e, #0d1b3e)", fontSize: 16, fontWeight: 700, color: "#d4af37", borderBottom: "1px solid #2a1a4e" },
    section: { padding: "16px 20px", borderBottom: "1px solid #1a1a2e" },
    secHeading: { fontSize: 14, fontWeight: 700, color: "#a0a0ff", marginBottom: 8 },
    secText: { fontSize: 13, lineHeight: 1.8, color: "#c8c8e0" },
    secList: { margin: "6px 0 0 0", padding: "0 0 0 18px", fontSize: 13, lineHeight: 2, color: "#c8c8e0" },
    table: { width: "100%", borderCollapse: "collapse", fontSize: 12, marginTop: 10 },
    th: { background: "#1a1a3e", color: "#d4af37", padding: "8px 10px", textAlign: "left", borderBottom: "1px solid #2a2a5e" },
    td: { padding: "7px 10px", borderBottom: "1px solid #1a1a2e", color: "#c8c8e0", verticalAlign: "top" },
    // Quiz
    quizBox: { maxWidth: 620, margin: "20px auto", padding: "0 20px" },
    qCard: { background: "#12122a", borderRadius: 14, border: "1px solid #2a1a4e", padding: 24 },
    qNum: { fontSize: 12, color: "#8888aa", marginBottom: 8 },
    qText: { fontSize: 15, fontWeight: 700, color: "#e8e8f0", marginBottom: 20, lineHeight: 1.6 },
    opt: (sel, correct, isAns) => {
      let bg = "#1a1a2e", border = "#2a2a4e", color = "#c8c8e0";
      if (sel !== null) {
        if (isAns) { bg = "#0d2e0d"; border = "#2a7a2a"; color = "#7aee7a"; }
        else if (correct) { bg = "#2e0d0d"; border = "#7a2a2a"; color = "#ee7a7a"; }
      }
      return { padding: "12px 16px", borderRadius: 10, border: `1px solid ${border}`, margin: "8px 0", cursor: sel === null ? "pointer" : "default", background: bg, color, fontSize: 13, fontFamily: "inherit", textAlign: "left", width: "100%", transition: "all 0.2s", display: "block" };
    },
    startBtn: { background: "#d4af37", color: "#0f0f1a", border: "none", borderRadius: 10, padding: "12px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
    progress: { height: 4, background: "#1a1a2e", borderRadius: 4, margin: "0 0 16px" },
    progressFill: (pct) => ({ height: "100%", width: `${pct}%`, background: "#d4af37", borderRadius: 4, transition: "width 0.3s" }),
    nextBtn: { background: "#d4af37", color: "#0f0f1a", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 16 },
    // Result
    resultCard: { background: "#12122a", borderRadius: 14, border: "1px solid #d4af37", padding: 28, textAlign: "center" },
    resultScore: { fontSize: 48, fontWeight: 700, color: "#d4af37" },
    resultLabel: { fontSize: 16, color: "#8888aa", marginBottom: 20 },
    ansItem: (correct) => ({ padding: "10px 14px", borderRadius: 8, background: correct ? "#0d2e0d" : "#2e0d0d", border: `1px solid ${correct ? "#2a7a2a" : "#7a2a2a"}`, marginBottom: 8, fontSize: 12, textAlign: "left" }),
    // Match
    matchBox: { maxWidth: 700, margin: "20px auto", padding: "0 20px" },
    matchSelBtn: (active) => ({ padding: "6px 16px", borderRadius: 16, border: `1px solid ${active ? "#d4af37" : "#2a2a4e"}`, cursor: "pointer", fontSize: 12, fontFamily: "inherit", background: active ? "#2a1a0e" : "transparent", color: active ? "#d4af37" : "#8888aa" }),
    matchGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 },
    matchItem: (state) => {
      const states = { normal: ["#1a1a2e", "#2a2a4e", "#c8c8e0"], sel: ["#1a0a2e", "#d4af37", "#d4af37"], matched: ["#0d2e0d", "#2a7a2a", "#7aee7a"], wrong: ["#2e0d0d", "#7a2a2a", "#ee7a7a"] };
      const [bg, border, color] = states[state] || states.normal;
      return { padding: "12px 14px", borderRadius: 10, border: `1px solid ${border}`, background: bg, color, fontSize: 13, cursor: state === "matched" ? "default" : "pointer", transition: "all 0.15s", textAlign: "center", minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" };
    }
  };

  function getMatchState(side, id) {
    if (matched.includes(id)) return "matched";
    if (wrongPair && wrongPair.includes(id)) return "wrong";
    if (side === "left" && selLeft === id) return "sel";
    if (side === "right" && selRight === id) return "sel";
    return "normal";
  }

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={styles.title}>📚 6th New Book Term 1 – தமிழ் இலக்கணம்</div>
        <div style={styles.subtitle}>6ஆம் வகுப்பு தமிழ் – முதல் தவணை இலக்கண அலகுகள்</div>
      </div>

      <div style={styles.tabs}>
        {[["notes", "📖 Notes"], ["quiz", "🎯 Quiz"], ["game", "🎮 Quiz Game"]].map(([k, l]) => (
          <button key={k} style={styles.tab(tab === k)} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      <div style={styles.content}>
        {/* ===== NOTES ===== */}
        {tab === "notes" && (
          <>
            <div style={styles.noteSidebar}>
              {NOTES_DATA.map((n, i) => (
                <button key={n.id} style={styles.noteBtn(noteIdx === i)} onClick={() => setNoteIdx(i)}>இயல் {i + 1}</button>
              ))}
            </div>
            <div style={styles.noteCard}>
              <div style={styles.noteTitle}>{NOTES_DATA[noteIdx].title}</div>
              {NOTES_DATA[noteIdx].sections.map((sec, si) => (
                <div key={si} style={styles.section}>
                  <div style={styles.secHeading}>◆ {sec.heading}</div>
                  {sec.content && <div style={styles.secText}>{sec.content}</div>}
                  {sec.list && (
                    <ul style={styles.secList}>
                      {sec.list.map((item, ii) => <li key={ii}>{item}</li>)}
                    </ul>
                  )}
                  {sec.table && (
                    <table style={styles.table}>
                      <thead>
                        <tr>{sec.table.headers.map((h, hi) => <th key={hi} style={styles.th}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row, ri) => (
                          <tr key={ri}>
                            {row.map((cell, ci) => <td key={ci} style={{ ...styles.td, background: ri % 2 ? "#0d0d20" : "transparent" }}>{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== QUIZ ===== */}
        {tab === "quiz" && (
          <div style={styles.quizBox}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {[["mcq", "MCQ Quiz"], ["match", "Match the Following"]].map(([k, l]) => (
                <button key={k} style={styles.tab(quizTab === k)} onClick={() => setQuizTab(k)}>{l}</button>
              ))}
            </div>

            {quizTab === "mcq" && (
              <>
                {!quizStarted ? (
                  <div style={{ ...styles.qCard, textAlign: "center", padding: 40 }}>
                    <div style={{ fontSize: 40, marginBottom: 16 }}>🎯</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#d4af37", marginBottom: 8 }}>வினாடி வினா</div>
                    <div style={{ fontSize: 13, color: "#8888aa", marginBottom: 24 }}>{ALL_QUIZ.length} கேள்விகளில் 20 தேர்வு செய்யப்படும்<br />TNPSC நோக்கில் தயாரிக்கப்பட்ட கேள்விகள்</div>
                    <button style={styles.startBtn} onClick={startQuiz}>தொடங்கு →</button>
                  </div>
                ) : showResult ? (
                  <div style={styles.qCard}>
                    <div style={styles.resultCard}>
                      <div style={styles.resultScore}>{score}/{quizQuestions.length}</div>
                      <div style={styles.resultLabel}>{score >= 16 ? "மிகச் சிறந்தது! 🌟" : score >= 12 ? "நல்ல முயற்சி! 👍" : "மேலும் படியுங்கள் 📚"}</div>
                      <div style={{ fontSize: 13, color: "#8888aa", marginBottom: 20 }}>சதவீதம்: {Math.round(score / quizQuestions.length * 100)}%</div>
                      <button style={styles.startBtn} onClick={startQuiz}>மீண்டும் முயற்சி →</button>
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <div style={{ fontSize: 13, color: "#d4af37", fontWeight: 700, marginBottom: 10 }}>விடைகள்:</div>
                      {answers.map((a, i) => (
                        <div key={i} style={styles.ansItem(a.correct)}>
                          <div style={{ fontWeight: 700, marginBottom: 4 }}>{i + 1}. {a.q}</div>
                          <div style={{ color: a.correct ? "#7aee7a" : "#ee7a7a" }}>உங்கள் விடை: {a.opts[a.selected]}</div>
                          {!a.correct && <div style={{ color: "#7aee7a" }}>சரியான விடை: {a.opts[a.ans]}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={styles.qCard}>
                    <div style={styles.progress}><div style={styles.progressFill((qIdx + 1) / quizQuestions.length * 100)} /></div>
                    <div style={styles.qNum}>கேள்வி {qIdx + 1} / {quizQuestions.length} | மதிப்பெண்: {score}</div>
                    <div style={styles.qText}>{quizQuestions[qIdx].q}</div>
                    {quizQuestions[qIdx].opts.map((opt, i) => (
                      <button key={i} style={styles.opt(selected, selected === i && i !== quizQuestions[qIdx].ans, i === quizQuestions[qIdx].ans && selected !== null)} onClick={() => handleOption(i)}>{opt}</button>
                    ))}
                    {selected !== null && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ fontSize: 12, color: selected === quizQuestions[qIdx].ans ? "#7aee7a" : "#ee7a7a", marginBottom: 8 }}>
                          {selected === quizQuestions[qIdx].ans ? "✓ சரியான விடை!" : `✗ சரியான விடை: ${quizQuestions[qIdx].opts[quizQuestions[qIdx].ans]}`}
                        </div>
                        <button style={styles.nextBtn} onClick={nextQ}>{qIdx + 1 < quizQuestions.length ? "அடுத்து →" : "முடிவு →"}</button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {quizTab === "match" && (
              <>
                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                  {MATCH_DATA.map((m, i) => (
                    <button key={i} style={styles.matchSelBtn(matchIdx === i)} onClick={() => setMatchIdx(i)}>{i + 1}. {m.title.slice(0, 15)}...</button>
                  ))}
                </div>
                <div style={styles.qCard}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#d4af37", marginBottom: 12 }}>{MATCH_DATA[matchIdx].title}</div>
                  {matchDone ? (
                    <div style={{ textAlign: "center", padding: 20 }}>
                      <div style={{ fontSize: 32, color: "#d4af37", fontWeight: 700 }}>🎉 வாழ்த்துகள்!</div>
                      <div style={{ fontSize: 14, color: "#7aee7a", margin: "10px 0" }}>அனைத்தும் சரியாக பொருத்தினீர்கள்!</div>
                      <button style={styles.startBtn} onClick={() => initMatch(matchIdx)}>மீண்டும் →</button>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                        <div style={{ fontSize: 12, color: "#8888aa", textAlign: "center" }}>இடம் (Left)</div>
                        <div style={{ fontSize: 12, color: "#8888aa", textAlign: "center" }}>வலம் (Right)</div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {matchLeft.map(item => (
                            <div key={item.id} style={styles.matchItem(getMatchState("left", item.id))} onClick={() => handleLeft(item.id)}>{item.left}</div>
                          ))}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {matchRight.map(item => (
                            <div key={item.id} style={styles.matchItem(getMatchState("right", item.id))} onClick={() => handleRight(item.id)}>{item.right}</div>
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: "#8888aa", marginTop: 12 }}>
                        {matched.length} / {MATCH_DATA[matchIdx].pairs.length} பொருத்தப்பட்டன
                      </div>
                    </>
                  )}
                </div>

                {/* Table format */}
                <div style={{ ...styles.qCard, marginTop: 16 }}>
                  <div style={{ fontSize: 13, color: "#a0a0ff", fontWeight: 700, marginBottom: 10 }}>அட்டவணை வடிவில் காண்க:</div>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>வரிசை</th>
                        <th style={styles.th}>இடம் – கேள்வி</th>
                        <th style={styles.th}>வலம் – விடை</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MATCH_DATA[matchIdx].pairs.map((p, i) => (
                        <tr key={i}>
                          <td style={{ ...styles.td, background: i % 2 ? "#0d0d20" : "transparent", fontWeight: 700, color: "#d4af37" }}>{i + 1}</td>
                          <td style={{ ...styles.td, background: i % 2 ? "#0d0d20" : "transparent" }}>{p.left}</td>
                          <td style={{ ...styles.td, background: i % 2 ? "#0d0d20" : "transparent", color: "#7aee7a" }}>{p.right}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* ===== GAME TAB ===== */}
        {tab === "game" && <QuizGame styles={styles} ALL_QUIZ={ALL_QUIZ} />}
      </div>
    </div>
  );
}

function QuizGame({ styles, ALL_QUIZ }) {
  const [phase, setPhase] = useState("menu"); // menu, playing, result
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selected, setSelected] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

  function startGame() {
    const qs = shuffle(ALL_QUIZ);
    setQuestions(qs);
    setQIdx(0);
    setScore(0);
    setLives(3);
    setSelected(null);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(15);
    setPhase("playing");
    setTimerActive(true);
  }

  useEffect(() => {
    if (timerActive && phase === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            handleTimeout();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive, qIdx, phase]);

  function handleTimeout() {
    setTimerActive(false);
    setSelected(-1);
    setLives(l => {
      const nl = l - 1;
      if (nl <= 0) { setTimeout(() => setPhase("result"), 1200); }
      return nl;
    });
    setStreak(0);
  }

  function handleOpt(i) {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    setTimerActive(false);
    setSelected(i);
    const correct = questions[qIdx].ans === i;
    if (correct) {
      const ns = streak + 1;
      setScore(s => s + (ns >= 3 ? 20 : 10));
      setStreak(ns);
      setBestStreak(b => Math.max(b, ns));
    } else {
      setStreak(0);
      setLives(l => {
        const nl = l - 1;
        if (nl <= 0) { setTimeout(() => setPhase("result"), 1200); }
        return nl;
      });
    }
  }

  function next() {
    if (qIdx + 1 >= questions.length || lives <= 0) {
      setPhase("result");
      return;
    }
    setQIdx(i => i + 1);
    setSelected(null);
    setTimeLeft(15);
    setTimerActive(true);
  }

  const gs = {
    hero: { textAlign: "center", padding: "40px 20px" },
    heroIcon: { fontSize: 56, marginBottom: 12 },
    heroTitle: { fontSize: 24, fontWeight: 700, color: "#d4af37", marginBottom: 6 },
    heroSub: { fontSize: 13, color: "#8888aa", marginBottom: 24 },
    rules: { background: "#12122a", borderRadius: 12, padding: 16, margin: "0 20px 24px", fontSize: 12, color: "#c8c8e0", lineHeight: 2 },
    hud: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", background: "#0a0a15", borderBottom: "1px solid #1a1a2e" },
    stat: { textAlign: "center" },
    statVal: { fontSize: 18, fontWeight: 700, color: "#d4af37" },
    statLbl: { fontSize: 10, color: "#8888aa" },
    timer: (t) => ({ fontSize: 18, fontWeight: 700, color: t <= 5 ? "#ee7a7a" : "#7aee7a", transition: "color 0.3s" }),
    gCard: { maxWidth: 620, margin: "16px auto", padding: "0 20px" },
    streakBanner: (n) => ({ padding: "6px 14px", borderRadius: 20, background: n >= 3 ? "#2a1a0e" : "#1a1a2e", color: n >= 3 ? "#d4af37" : "#888", fontSize: 12, textAlign: "center", marginBottom: 10, border: `1px solid ${n >= 3 ? "#d4af37" : "#2a2a4e"}` }),
    resultHero: { textAlign: "center", padding: "30px 20px", background: "#12122a", borderRadius: 14, border: "1px solid #d4af37", margin: "20px" },
    trophy: { fontSize: 56, marginBottom: 12 },
    rScore: { fontSize: 42, fontWeight: 700, color: "#d4af37" },
    rSub: { fontSize: 14, color: "#8888aa", marginBottom: 16 },
    rGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, margin: "16px 0" },
    rStat: { background: "#1a1a2e", borderRadius: 10, padding: "12px 8px", textAlign: "center" },
    rStatV: { fontSize: 20, fontWeight: 700, color: "#a0a0ff" },
    rStatL: { fontSize: 11, color: "#8888aa" },
  };

  if (phase === "menu") return (
    <div>
      <div style={gs.hero}>
        <div style={gs.heroIcon}>🎮</div>
        <div style={gs.heroTitle}>Quiz Game – தமிழ் சவால்</div>
        <div style={gs.heroSub}>நேர வரம்பு • உயிர்கள் • ஸ்ட்ரீக் போனஸ்</div>
      </div>
      <div style={gs.rules}>
        <b style={{ color: "#d4af37" }}>விதிகள்:</b><br />
        ⏱ ஒவ்வொரு கேள்விக்கும் 15 வினாடிகள் மட்டுமே<br />
        ❤️ 3 உயிர்களுடன் தொடங்குவீர்கள்<br />
        ✓ சரியான விடை = 10 மதிப்பெண்கள்<br />
        🔥 3+ தொடர் சரி = 20 மதிப்பெண்கள் (போனஸ்!)<br />
        ✗ தவறான விடை அல்லது நேரம் முடிந்தால் = 1 உயிர் குறையும்
      </div>
      <div style={{ textAlign: "center" }}>
        <button style={styles.startBtn} onClick={startGame}>🎮 ஆட தொடங்கு!</button>
      </div>
    </div>
  );

  if (phase === "result") return (
    <div>
      <div style={gs.resultHero}>
        <div style={gs.trophy}>{score >= 150 ? "🏆" : score >= 80 ? "🥈" : "🎖️"}</div>
        <div style={gs.rScore}>{score}</div>
        <div style={gs.rSub}>மதிப்பெண்கள் பெற்றீர்கள்</div>
        <div style={gs.rGrid}>
          <div style={gs.rStat}><div style={gs.rStatV}>{qIdx + 1}</div><div style={gs.rStatL}>கேள்விகள்</div></div>
          <div style={gs.rStat}><div style={gs.rStatV}>{bestStreak}🔥</div><div style={gs.rStatL}>சிறந்த ஸ்ட்ரீக்</div></div>
          <div style={gs.rStat}><div style={gs.rStatV}>{lives}❤️</div><div style={gs.rStatL}>மீதமுள்ள உயிர்</div></div>
        </div>
        <button style={styles.startBtn} onClick={startGame}>மீண்டும் ஆடு →</button>
      </div>
    </div>
  );

  const q = questions[qIdx];
  return (
    <div>
      <div style={gs.hud}>
        <div style={gs.stat}><div style={gs.statVal}>{score}</div><div style={gs.statLbl}>மதிப்பெண்</div></div>
        <div style={gs.stat}><div style={gs.timer(timeLeft)}>{timeLeft}s</div><div style={gs.statLbl}>நேரம்</div></div>
        <div style={gs.stat}><div style={gs.statVal}>{"❤️".repeat(lives)}{"🖤".repeat(3 - lives)}</div><div style={gs.statLbl}>உயிர்கள்</div></div>
      </div>
      <div style={gs.gCard}>
        <div style={gs.streakBanner(streak)}>{streak >= 3 ? `🔥 ${streak} தொடர் சரி! +20 போனஸ்` : streak > 0 ? `✓ ${streak} தொடர் சரி` : "சரியான விடையைத் தேர்ந்தெடு"}</div>
        <div style={styles.qCard}>
          <div style={styles.qNum}>கேள்வி {qIdx + 1} | {ALL_QUIZ.length} கேள்விகள் உள்ளன</div>
          <div style={{ height: 4, background: "#1a1a2e", borderRadius: 4, margin: "0 0 16px" }}>
            <div style={{ height: "100%", width: `${timeLeft / 15 * 100}%`, background: timeLeft <= 5 ? "#ee7a7a" : "#d4af37", borderRadius: 4, transition: "width 1s linear" }} />
          </div>
          <div style={styles.qText}>{q.q}</div>
          {q.opts.map((opt, i) => {
            let bg = "#1a1a2e", border = "#2a2a4e", color = "#c8c8e0";
            if (selected !== null) {
              if (i === q.ans) { bg = "#0d2e0d"; border = "#2a7a2a"; color = "#7aee7a"; }
              else if (selected === i) { bg = "#2e0d0d"; border = "#7a2a2a"; color = "#ee7a7a"; }
            }
            return (
              <button key={i} onClick={() => handleOpt(i)} style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${border}`, margin: "8px 0", cursor: selected === null ? "pointer" : "default", background: bg, color, fontSize: 13, fontFamily: "inherit", textAlign: "left", width: "100%", display: "block" }}>
                {opt}
              </button>
            );
          })}
          {selected !== null && lives > 0 && (
            <button style={styles.nextBtn} onClick={next}>{qIdx + 1 < questions.length ? "அடுத்து →" : "முடிவு →"}</button>
          )}
        </div>
      </div>
    </div>
  );
}
