import { useState } from "react";

const notesData = {
  title: "குற்றியலுகரம், குற்றியலிகரம்",
  titleEn: "Kutriyalugaram & Kutriyaligaram",
  sections: [
    {
      heading: "எழுத்து வகைகள் (Types of Letters)",
      content: `தமிழ் எழுத்துக்களை முதலெழுத்து, சார்பெழுத்து என இரு வகையாகப் பிரிப்பர்.`,
      table: {
        headers: ["வகை", "எண்ணிக்கை", "விளக்கம்"],
        rows: [
          ["உயிர் எழுத்து", "12", "அ, ஆ, இ, ஈ, உ, ஊ, எ, ஏ, ஐ, ஒ, ஓ, ஔ"],
          ["மெய் எழுத்து", "18", "க், ச், ட், த், ப், ற் ..."],
          ["முதலெழுத்து மொத்தம்", "30", "உயிர் + மெய்"],
        ],
      },
    },
    {
      heading: "சார்பெழுத்து வகைகள் (Dependent Letters)",
      table: {
        headers: ["சார்பெழுத்து", "விளக்கம்"],
        rows: [
          ["உயிர்மெய்", "உயிர் + மெய் சேர்ந்தவை"],
          ["ஆய்தம்", "ஃ"],
          ["உயிரளபெடை", "உயிர் நீட்சி"],
          ["ஒற்றளபெடை", "மெய் நீட்சி"],
          ["குற்றியலுகரம்", "குறைந்து ஒலிக்கும் உகரம்"],
          ["குற்றியலிகரம்", "குறைந்து ஒலிக்கும் இகரம்"],
          ["ஐகாரக்குறுக்கம்", "ஐகார ஒலி குறைவு"],
          ["ஔகாரக்குறுக்கம்", "ஔகார ஒலி குறைவு"],
          ["மகரக்குறுக்கம்", "மகர ஒலி குறைவு"],
          ["ஆய்தக்குறுக்கம்", "ஆய்த ஒலி குறைவு"],
        ],
      },
    },
    {
      heading: "குற்றியலுகரம் - விளக்கம்",
      content: `கு, சு, டு, து, பு, று ஆகிய ஆறு வல்லின உகரங்களும் சொல்லின் இறுதியில் வரும்போது, ஒரு மாத்திரைக்குப் பதிலாக அரை மாத்திரை அளவே ஒலிக்கும். இவ்வாறு தனக்குரிய ஓசையில் குறைந்து ஒலிக்கும் உகரம் குற்றியலுகரம் ஆகும்.

குறுமை + இயல் + உகரம் = குற்றியலுகரம்`,
      highlight: "ஆறு வல்லின உகரங்கள்: கு, சு, டு, து, பு, று",
      examples: ["காசு", "எஃகு", "பயறு", "பாட்டு", "பந்து", "சால்பு"],
    },
    {
      heading: "முற்றியலுகரம் vs குற்றியலுகரம்",
      table: {
        headers: ["வகை", "ஒலி அளவு", "எடுத்துக்காட்டு"],
        rows: [
          ["முற்றியலுகரம்", "1 மாத்திரை (முழு ஒலி)", "புகு, பசு, விடு, அது, வறு, மாவு, ஏழு"],
          ["குற்றியலுகரம்", "½ மாத்திரை (குறை ஒலி)", "காசு, எஃகு, பயறு, பாட்டு, பந்து"],
        ],
      },
      note: "தனிக்குறில் எழுத்தை அடுத்து வரும் வல்லின உகரங்கள் ஒரு மாத்திரை அளவுக்கு முழுமையாக ஒலிக்கும்.",
    },
    {
      heading: "குற்றியலுகரத்தின் ஆறு வகைகள்",
      content: "குற்றியலுகரம் தனக்கு முன் உள்ள எழுத்தைக் கொண்டு ஆறு வகையாகப் பிரிக்கப்படும்.",
      table: {
        headers: ["வகை", "விளக்கம்", "எடுத்துக்காட்டு"],
        rows: [
          ["நெடில்தொடர்க் குற்றியலுகரம்", "தனி நெடிலை தொடர்ந்து வரும்; ஈரெழுத்துச் சொற்கள் மட்டும்", "பாகு, மாசு, பாடு, காது, ஆறு"],
          ["ஆய்தத்தொடர்க் குற்றியலுகரம்", "ஆய்த எழுத்தை தொடர்ந்து வரும்", "எஃகு, அஃது"],
          ["உயிர்த்தொடர்க் குற்றியலுகரம்", "தனிநெடில் அல்லாத உயிர்மெய் எழுத்தை தொடர்ந்து வரும்", "அரசு (ர=ர்+அ), கயிறு, ஒன்பது, வரலாறு"],
          ["வன்தொடர்க் குற்றியலுகரம்", "வல்லின (க்,ச்,ட்,த்,ப்,ற்) மெய் எழுத்துக்களை தொடர்ந்து வரும்", "பாக்கு, பேச்சு, பாட்டு, பத்து, உப்பு, பற்று"],
          ["மென்தொடர்க் குற்றியலுகரம்", "மெல்லின (ங்,ஞ்,ண்,ந்,ம்,ன்) மெய் எழுத்துக்களை தொடர்ந்து வரும்", "பங்கு, மஞ்சு, பண்பு, பந்து, அம்பு, கன்று"],
          ["இடைத்தொடர்க் குற்றியலுகரம்", "இடையின (ய,ர்,ல்,வ்,ழ,ள்) மெய் எழுத்துக்களை தொடர்ந்து வரும்", "எயது, மார்பு, சால்பு, மூழகு"],
        ],
      },
    },
    {
      heading: "தெரிந்து தெளிவோம் - எழுத்துச் சாரிகை",
      table: {
        headers: ["சாரிகை", "பயன்", "எடுத்துக்காட்டு"],
        rows: [
          ["கரம்", "குறில் எழுத்துகளை குறிக்க", "அகரம், இகரம், உகரம், ககரம், மகரம்"],
          ["கான்", "நெடில் எழுத்துகளை குறிக்க", "ஐகான், ஔகான்"],
          ["காரம்", "குறில், நெடில் எழுத்துகளை குறிக்க", "மகாரம், ஏகாரம், ஐகாரம், ஔகாரம்"],
          ["கேனம்", "ஆய்த எழுத்தை குறிக்க", "அஃகேனம்"],
        ],
      },
    },
    {
      heading: "குற்றியலிகரம் - விளக்கம்",
      content: `வரகு+யாது என்னும் இரு சொற்களையும் சேர்த்து விரைவாக ஒலித்துப் பாருங்கள். வரகியாது என ஒலிப்பதை அறியலாம். முதல் சொல்லின் இறுதியில் உள்ள 'கு' என்னும் எழுத்து 'கி' என்று ஒலிக்கிறது. அதுவும் முழுமையாக ஒரு மாத்திரை அளவில் ஒலிக்காமல் அரை மாத்திரை அளவாகக் குறைந்து ஒலிக்கிறது.

இவ்வாறு தன் ஒரு மாத்திரை அளவில் குறுகி ஒலிக்கும் இகரம் குற்றியலிகரம் எனப்படும்.
குறுமை + இயல் + இகரம் = குற்றியலிகரம்`,
    },
    {
      heading: "குற்றியலிகரம் - இரண்டு இடங்கள்",
      table: {
        headers: ["இடம்", "விளக்கம்", "எடுத்துக்காட்டு"],
        rows: [
          ["இடம் 1", "குற்றியலுகரச் சொற்களை தொடர்ந்து யகரத்தை முதல் எழுத்தாகக் கொண்ட சொற்கள் வரும்போது உகரம் இகரமாக மாறும்", "கொக்கு+யாது = கொக்கியாது\nதோப்பு+யாது = தோப்பியாது\nநாடு+யாது = நாடியாது\nபாடு+யாது = பாடியாது"],
          ["இடம் 2", "'மியா' என்பது ஓர் அசைச்சொல். இதில் 'மி'யில் உள்ள இகரம் குற்றியலிகரம்", "கேள்+மியா = கேண்மியா\nசெல்+மியா = சென்மியா"],
        ],
      },
      note: "குற்றியலிகரம் தற்போது உரைநடை வழக்கில் இல்லை. இலக்கியங்களில் மட்டுமே உள்ளது.",
    },
    {
      heading: "தெரிந்து தெளிவோம் - விதிவிலக்குகள்",
      content: "'வ' என்னும் எழுத்தை தொடர்ந்து வரும் குற்றியலுகரச் சொற்கள் இல்லை.\n\nமேலும் சு, டு, று ஆகியவை இறுதியாக அமையும் இடைத்தொடர் குற்றியலுகரச் சொற்களும் இல்லை.",
    },
  ],
};

const quizData = [
  { q: "குற்றியலுகரம் என்றால் என்ன?", opts: ["முழுமையாக ஒலிக்கும் உகரம்", "அரை மாத்திரை அளவில் குறைந்து ஒலிக்கும் உகரம்", "நெடில் அளவில் ஒலிக்கும் உகரம்", "இரண்டு மாத்திரை ஒலிக்கும் உகரம்"], ans: 1, exp: "கு, சு, டு, து, பு, று ஆகிய வல்லின உகரங்கள் சொல்லின் இறுதியில் அரை மாத்திரை அளவே ஒலிக்கும். இதுவே குற்றியலுகரம்." },
  { q: "குற்றியலுகரம் எத்தனை வகைகள் உண்டு?", opts: ["நான்கு", "ஐந்து", "ஆறு", "மூன்று"], ans: 2, exp: "குற்றியலுகரம் ஆறு வகைகள்: நெடில்தொடர், ஆய்தத்தொடர், உயிர்த்தொடர், வன்தொடர், மென்தொடர், இடைத்தொடர்." },
  { q: "வல்லின மெய் எழுத்துக்களை தொடர்ந்து வரும் குற்றியலுகரம் எது?", opts: ["மென்தொடர்க் குற்றியலுகரம்", "வன்தொடர்க் குற்றியலுகரம்", "இடைத்தொடர்க் குற்றியலுகரம்", "நெடில்தொடர்க் குற்றியலுகரம்"], ans: 1, exp: "க், ச், ட், த், ப், ற் ஆகிய வல்லின மெய் எழுத்துக்களை தொடர்ந்து வரும் குற்றியலுகரம் வன்தொடர்க் குற்றியலுகரம் எனப்படும். எ.கா: பாக்கு, பேச்சு, பாட்டு." },
  { q: "'பாகு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["ஆய்தத்தொடர்", "நெடில்தொடர்", "வன்தொடர்", "உயிர்த்தொடர்"], ans: 1, exp: "பாகு என்பதில் 'பா' என்னும் தனி நெடிலை தொடர்ந்து 'கு' வருவதால் இது நெடில்தொடர்க் குற்றியலுகரம்." },
  { q: "'எஃகு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["நெடில்தொடர்", "உயிர்த்தொடர்", "ஆய்தத்தொடர்", "மென்தொடர்"], ans: 2, exp: "எஃகு என்பதில் ஆய்த எழுத்தை தொடர்ந்து 'கு' வருவதால் இது ஆய்தத்தொடர்க் குற்றியலுகரம்." },
  { q: "'அரசு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["நெடில்தொடர்", "வன்தொடர்", "உயிர்த்தொடர்", "இடைத்தொடர்"], ans: 2, exp: "அரசு என்பதில் 'ர' (ர்+அ) என்னும் உயிர்மெய் எழுத்தை தொடர்ந்து 'சு' வருவதால் இது உயிர்த்தொடர்க் குற்றியலுகரம்." },
  { q: "'பந்து' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["வன்தொடர்", "மென்தொடர்", "இடைத்தொடர்", "நெடில்தொடர்"], ans: 1, exp: "பந்து என்பதில் 'ந்' என்னும் மெல்லின மெய் எழுத்தை தொடர்ந்து 'து' வருவதால் இது மென்தொடர்க் குற்றியலுகரம்." },
  { q: "'மார்பு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["வன்தொடர்", "மென்தொடர்", "இடைத்தொடர்", "உயிர்த்தொடர்"], ans: 2, exp: "மார்பு என்பதில் 'ர்' என்னும் இடையின மெய் எழுத்தை தொடர்ந்து 'பு' வருவதால் இது இடைத்தொடர்க் குற்றியலுகரம்." },
  { q: "குற்றியலுகரம் எத்தனை மாத்திரை அளவில் ஒலிக்கும்?", opts: ["1 மாத்திரை", "2 மாத்திரை", "½ மாத்திரை", "¼ மாத்திரை"], ans: 2, exp: "குற்றியலுகரம் அரை (½) மாத்திரை அளவில் குறைந்து ஒலிக்கும். முற்றியலுகரம் 1 மாத்திரை அளவில் ஒலிக்கும்." },
  { q: "முற்றியலுகரம் என்றால் என்ன?", opts: ["குறைந்து ஒலிக்கும் உகரம்", "ஒரு மாத்திரை அளவில் முழுமையாக ஒலிக்கும் உகரம்", "நெடிலாக ஒலிக்கும் உகரம்", "மெய்யோடு ஒலிக்கும் உகரம்"], ans: 1, exp: "ஒசை குறையாமல் ஒரு மாத்திரை அளவில் முழுமையாக ஒலிப்பதை முற்றியலுகரம் என்பர். எ.கா: புகு, பசு, விடு." },
  { q: "குற்றியலுகரத்தில் எத்தனை வல்லின உகரங்கள் உண்டு?", opts: ["நான்கு", "ஐந்து", "ஆறு", "மூன்று"], ans: 2, exp: "கு, சு, டு, து, பு, று என்னும் ஆறு வல்லின உகரங்கள் குற்றியலுகரம் ஆகும்." },
  { q: "'கயிறு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["வன்தொடர்", "மென்தொடர்", "உயிர்த்தொடர்", "நெடில்தொடர்"], ans: 2, exp: "கயிறு என்பதில் 'யி' (ய்+இ) என்னும் உயிர்மெய் எழுத்தை தொடர்ந்து 'று' வருவதால் இது உயிர்த்தொடர்க் குற்றியலுகரம்." },
  { q: "நெடில்தொடர்க் குற்றியலுகரம் எத்தனை எழுத்துச் சொற்களாக மட்டுமே அமையும்?", opts: ["மூவெழுத்துச் சொற்கள்", "ஈரெழுத்துச் சொற்கள்", "ஐந்தெழுத்துச் சொற்கள்", "எத்தனை வேண்டுமானாலும்"], ans: 1, exp: "நெடில்தொடர்க் குற்றியலுகரம் ஈரெழுத்துச் சொற்களாக மட்டுமே அமையும். எ.கா: பாகு, மாசு, ஆறு." },
  { q: "குற்றியலிகரம் எத்தனை இடங்களில் வரும்?", opts: ["மூன்று", "நான்கு", "இரண்டு", "ஐந்து"], ans: 2, exp: "குற்றியலிகரம் இரண்டு இடங்களில் மட்டுமே வரும்: 1) யகர ஒலியுடன் சேரும்போது, 2) 'மியா' என்னும் அசைச்சொல்லில்." },
  { q: "கொக்கு + யாது = ?", opts: ["கொக்குயாது", "கொக்கியாது", "கொக்கையாது", "கொக்காயது"], ans: 1, exp: "குற்றியலுகரச் சொற்களை தொடர்ந்து யகரம் வரும்போது உகரம் இகரமாக மாறும். எனவே கொக்கு+யாது = கொக்கியாது." },
  { q: "'மியா' என்னும் அசைச்சொல்லில் 'மி' என்பதில் உள்ள இகரம் என்னவாகும்?", opts: ["முற்றியலிகரம்", "குற்றியலுகரம்", "குற்றியலிகரம்", "ஆய்தக்குறுக்கம்"], ans: 2, exp: "'மியா' என்பது ஓர் அசைச்சொல். இதில் 'மி' (ம்+இ)யில் உள்ள இகரம் குற்றியலிகரம் ஆகும்." },
  { q: "கேள் + மியா = ?", opts: ["கேள்மியா", "கேண்மியா", "கேட்மியா", "கேல்மியா"], ans: 1, exp: "கேள்+மியா = கேண்மியா. இதில் 'மி'யில் உள்ள இகரம் குற்றியலிகரம் ஆகும்." },
  { q: "குற்றியலிகரம் எந்த வழக்கில் இல்லை?", opts: ["எழுத்து வழக்கு", "உரைநடை வழக்கு", "இலக்கிய வழக்கு", "பேச்சு வழக்கு"], ans: 1, exp: "குற்றியலிகரம் தற்போது உரைநடை வழக்கில் இல்லை. இலக்கியங்களில் மட்டுமே உள்ளது." },
  { q: "'வ' என்னும் எழுத்தை தொடர்ந்து வரும் குற்றியலுகரச் சொற்கள்...", opts: ["மிக அதிகம்", "இல்லை", "சில மட்டும் உண்டு", "நூறு உண்டு"], ans: 1, exp: "'வ' என்னும் எழுத்தை தொடர்ந்து வரும் குற்றியலுகரச் சொற்கள் இல்லை என்பது விதிவிலக்கு." },
  { q: "தமிழ் முதலெழுத்துகள் மொத்தம் எத்தனை?", opts: ["28", "30", "32", "247"], ans: 1, exp: "உயிர் 12 + மெய் 18 = முதலெழுத்துகள் 30." },
  { q: "சார்பெழுத்து எத்தனை வகைகள்?", opts: ["8", "9", "10", "12"], ans: 2, exp: "சார்பெழுத்து பத்து வகைப்படும்: உயிர்மெய், ஆய்தம், உயிரளபெடை, ஒற்றளபெடை, குற்றியலுகரம், குற்றியலிகரம், ஐகாரக்குறுக்கம், ஔகாரக்குறுக்கம், மகரக்குறுக்கம், ஆய்தக்குறுக்கம்." },
  { q: "'பங்கு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["வன்தொடர்", "இடைத்தொடர்", "மென்தொடர்", "ஆய்தத்தொடர்"], ans: 2, exp: "பங்கு என்பதில் 'ங்' என்னும் மெல்லின மெய் எழுத்தை தொடர்ந்து 'கு' வருவதால் இது மென்தொடர்க் குற்றியலுகரம்." },
  { q: "'உப்பு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["மென்தொடர்", "வன்தொடர்", "இடைத்தொடர்", "நெடில்தொடர்"], ans: 1, exp: "உப்பு என்பதில் 'ப்' என்னும் வல்லின மெய் எழுத்தை தொடர்ந்து 'பு' வருவதால் இது வன்தொடர்க் குற்றியலுகரம்." },
  { q: "'சால்பு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["நெடில்தொடர்", "உயிர்த்தொடர்", "இடைத்தொடர்", "வன்தொடர்"], ans: 2, exp: "சால்பு என்பதில் 'ல்' என்னும் இடையின மெய் எழுத்தை தொடர்ந்து 'பு' வருவதால் இது இடைத்தொடர்க் குற்றியலுகரம்." },
  { q: "குறில் எழுத்துகளை குறிக்கும் சாரிகை எது?", opts: ["கான்", "காரம்", "கரம்", "கேனம்"], ans: 2, exp: "குறில் எழுத்துகளை குறிக்க 'கரம்' என்னும் சாரிகை பயன்படுத்தப்படும். எ.கா: அகரம், இகரம், உகரம்." },
  { q: "ஆய்த எழுத்தை குறிக்கும் சாரிகை எது?", opts: ["கரம்", "கான்", "காரம்", "கேனம்"], ans: 3, exp: "ஆய்த எழுத்தை குறிக்க 'கேனம்' என்னும் சாரிகை பயன்படுத்தப்படும். எ.கா: அஃகேனம்." },
  { q: "நெடில் எழுத்துகளை குறிக்கும் சாரிகை எது?", opts: ["கரம்", "கான்", "காரம்", "கேனம்"], ans: 1, exp: "நெடில் எழுத்துகளை குறிக்க 'கான்' என்னும் சாரிகை பயன்படுத்தப்படும். எ.கா: ஐகான், ஔகான்." },
  { q: "'அம்பு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["வன்தொடர்", "மென்தொடர்", "இடைத்தொடர்", "நெடில்தொடர்"], ans: 1, exp: "அம்பு என்பதில் 'ம்' என்னும் மெல்லின மெய் எழுத்தை தொடர்ந்து 'பு' வருவதால் இது மென்தொடர்க் குற்றியலுகரம்." },
  { q: "குற்றியலுகரம் என்பதை பிரித்தால்?", opts: ["குறுமை+உகரம்", "குறுமை+இயல்+உகரம்", "குறை+உகரம்", "குறு+இயல்+உகரம்"], ans: 1, exp: "குறுமை + இயல் + உகரம் = குற்றியலுகரம். குறுமை என்பது குறுகுதல் (சிறுமை), இயல் என்பது இயல்பு." },
  { q: "'கன்று' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["வன்தொடர்", "இடைத்தொடர்", "மென்தொடர்", "உயிர்த்தொடர்"], ans: 2, exp: "கன்று என்பதில் 'ன்' என்னும் மெல்லின மெய் எழுத்தை தொடர்ந்து 'று' வருவதால் இது மென்தொடர்க் குற்றியலுகரம்." },
  { q: "மெல்லின மெய் எழுத்துக்கள் எத்தனை?", opts: ["ஆறு", "மூன்று", "ஒன்பது", "நான்கு"], ans: 0, exp: "மெல்லின மெய் எழுத்துக்கள் ஆறு: ங், ஞ், ண், ந், ம், ன்." },
  { q: "இடையின மெய் எழுத்துக்கள் எத்தனை?", opts: ["ஆறு", "மூன்று", "ஒன்பது", "நான்கு"], ans: 0, exp: "இடையின மெய் எழுத்துக்கள் ஆறு: ய், ர், ல், வ், ழ், ள்." },
  { q: "வல்லின மெய் எழுத்துக்கள் எத்தனை?", opts: ["ஆறு", "மூன்று", "ஒன்பது", "நான்கு"], ans: 0, exp: "வல்லின மெய் எழுத்துக்கள் ஆறு: க், ச், ட், த், ப், ற்." },
  { q: "'மஞ்சு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["வன்தொடர்", "மென்தொடர்", "இடைத்தொடர்", "நெடில்தொடர்"], ans: 1, exp: "மஞ்சு என்பதில் 'ஞ்' என்னும் மெல்லின மெய் எழுத்தை தொடர்ந்து 'சு' வருவதால் இது மென்தொடர்க் குற்றியலுகரம்." },
  { q: "தோப்பு + யாது = ?", opts: ["தோப்பையாது", "தோப்புயாது", "தோப்பியாது", "தோப்பாயது"], ans: 2, exp: "குற்றியலுகரச் சொற்களை தொடர்ந்து யகரம் வரும்போது உகரம் இகரமாக மாறும். தோப்பு+யாது = தோப்பியாது." },
  { q: "'மூழகு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["நெடில்தொடர்", "வன்தொடர்", "இடைத்தொடர்", "மென்தொடர்"], ans: 2, exp: "மூழகு என்பதில் 'ழ' (ழ்+அ என்னும் உயிர்மெய்) என்னும் இடையின எழுத்தை தொடர்ந்து 'கு' வருவதால் இது இடைத்தொடர்க் குற்றியலுகரம்." },
  { q: "நாடு + யாது = ?", opts: ["நாடையாது", "நாடியாது", "நாடியது", "நாட்யாது"], ans: 1, exp: "நாடு+யாது = நாடியாது. ட்+உ என்பது ட்+இ ஆகி இகரம் குற்றியலிகரமாக ஒலிக்கும்." },
  { q: "குற்றியலிகரம் என்பதை பிரித்தால்?", opts: ["குறுமை+இகரம்", "குறுமை+இயல்+இகரம்", "குறை+இகரம்", "குறு+இகரம்"], ans: 1, exp: "குறுமை + இயல் + இகரம் = குற்றியலிகரம்." },
  { q: "எந்த சொற்கள் நெடில்தொடர்க் குற்றியலுகரமாக வரும்?", opts: ["மூவெழுத்துச் சொற்கள்", "ஈரெழுத்துச் சொற்கள் மட்டும்", "ஐந்தெழுத்துச் சொற்கள்", "எல்லா நீளமும்"], ans: 1, exp: "நெடில்தொடர்க் குற்றியலுகரம் ஈரெழுத்துச் சொற்களாக மட்டுமே அமையும். காது, ஆறு, பாகு போன்றவை." },
  { q: "'பண்பு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["வன்தொடர்", "மென்தொடர்", "இடைத்தொடர்", "உயிர்த்தொடர்"], ans: 1, exp: "பண்பு என்பதில் 'ண்' என்னும் மெல்லின மெய் எழுத்தை தொடர்ந்து 'பு' வருவதால் இது மென்தொடர்க் குற்றியலுகரம்." },
  { q: "'வரலாறு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["நெடில்தொடர்", "வன்தொடர்", "உயிர்த்தொடர்", "இடைத்தொடர்"], ans: 2, exp: "வரலாறு என்பதில் 'லா' (ல்+ஆ) என்னும் உயிர்மெய் எழுத்தை தொடர்ந்து 'று' வருவதால் இது உயிர்த்தொடர்க் குற்றியலுகரம்." },
  { q: "'பற்று' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["மென்தொடர்", "வன்தொடர்", "இடைத்தொடர்", "நெடில்தொடர்"], ans: 1, exp: "பற்று என்பதில் 'ற்' என்னும் வல்லின மெய் எழுத்தை தொடர்ந்து 'று' வருவதால் இது வன்தொடர்க் குற்றியலுகரம்." },
  { q: "குற்றியலுகரம் சொல்லின் எந்த இடத்தில் மட்டும் வரும்?", opts: ["முதலில் மட்டும்", "இடையில் மட்டும்", "இறுதியில் மட்டும்", "எல்லா இடத்திலும்"], ans: 2, exp: "குற்றியலுகரம் சொல்லின் இறுதியில் மட்டுமே வரும். சொல்லின் முதல் மற்றும் இடையில் வரும்போது முழு மாத்திரையில் ஒலிக்கும்." },
  { q: "'ஒன்பது' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["நெடில்தொடர்", "வன்தொடர்", "உயிர்த்தொடர்", "மென்தொடர்"], ans: 2, exp: "ஒன்பது என்பதில் 'ப' (ப்+அ) என்னும் உயிர்மெய் எழுத்தை தொடர்ந்து 'து' வருவதால் இது உயிர்த்தொடர்க் குற்றியலுகரம்." },
  { q: "செல் + மியா = ?", opts: ["செல்மியா", "செற்மியா", "சென்மியா", "செய்மியா"], ans: 2, exp: "செல்+மியா = சென்மியா. இது குற்றியலிகரம் வரும் இரண்டாம் இடம்." },
  { q: "குற்றியலுகரத்துக்கு ஆறு வல்லின உகரங்கள் மட்டுமே ஏன் உரியவை?", opts: ["மென்மை ஒலிக்கு குறைவு இல்லை", "வல்லினம் மட்டுமே குறைவாக ஒலிக்கும்", "இடையினமும் குறைவாக ஒலிக்கும்", "உயிர் எழுத்துகள் குறைவாக ஒலிக்கும்"], ans: 1, exp: "வல்லினம் அல்லாத உகரங்கள் எப்போதும் முழுமையாகவே ஒலிக்கும். வல்லின உகரங்களே சொல் இறுதியில் குறைவாக ஒலிக்கும்." },
  { q: "'அஃது' என்னும் சொல்லில் குற்றியலுகரம் எது?", opts: ["அ", "ஃ", "தி", "து"], ans: 3, exp: "அஃது என்பதில் ஆய்த எழுத்தை தொடர்ந்து 'து' வருவதால் 'து' என்பது ஆய்தத்தொடர்க் குற்றியலுகரம்." },
  { q: "குற்றியலுகரம் என்னும் சொல்லில் 'இயல்' என்பது எதை குறிக்கும்?", opts: ["இயல்பு", "இயல்பற்றது", "விதிவிலக்கு", "சாரிகை"], ans: 0, exp: "'இயல்' என்பது இயல்பு என்பதைக் குறிக்கும். குறுமை + இயல் + உகரம் = குற்றியலுகரம் - இயல்பாக குறுகி ஒலிக்கும் உகரம்." },
  { q: "குற்றியலுகரம் சார்பெழுத்துகளில் எத்தனையாவது?", opts: ["முதல்", "இரண்டாம்", "ஐந்தாம்", "பத்தாம்"], ans: 2, exp: "சார்பெழுத்து பட்டியலில் குற்றியலுகரம் ஐந்தாவதாக வரும்: உயிர்மெய், ஆய்தம், உயிரளபெடை, ஒற்றளபெடை, குற்றியலுகரம்..." },
  { q: "'காது' என்பது எத்தனை மாத்திரை?", opts: ["2 மாத்திரை", "2.5 மாத்திரை", "3 மாத்திரை", "1.5 மாத்திரை"], ans: 1, exp: "காது = கா(2) + தி(½) = 2½ மாத்திரை. நெடிலான 'கா' 2 மாத்திரை + குற்றியலுகரம் 'து' ½ மாத்திரை." },
  { q: "'ஆறு' என்பது எந்த வகை குற்றியலுகரம்?", opts: ["உயிர்த்தொடர்", "நெடில்தொடர்", "இடைத்தொடர்", "மென்தொடர்"], ans: 1, exp: "ஆறு என்பதில் 'ஆ' என்னும் தனி நெடிலை தொடர்ந்து 'று' வருவதால் இது நெடில்தொடர்க் குற்றியலுகரம்." },
  { q: "குறில், நெடில் இரண்டையும் குறிக்கும் சாரிகை எது?", opts: ["கரம்", "கான்", "காரம்", "கேனம்"], ans: 2, exp: "குறில், நெடில் இரண்டையும் குறிக்க 'காரம்' என்னும் சாரிகை பயன்படுத்தப்படும். எ.கா: மகாரம், ஏகாரம்." },
  { q: "சு, டு, று ஆகியவை இடைத்தொடரில் வருமா?", opts: ["ஆம், வரும்", "இல்லை, வராது", "சில நேரம் வரும்", "நூலில் மட்டும் வரும்"], ans: 1, exp: "சு, டு, று ஆகியவை இறுதியாக அமையும் இடைத்தொடர் குற்றியலுகரச் சொற்கள் இல்லை என்பது விதிவிலக்கு." },
];

const gameQuestions = quizData.slice(0, 20);

const COLORS = {
  primary: "#1a1a2e",
  secondary: "#16213e",
  accent: "#e94560",
  gold: "#f0a500",
  teal: "#00b4d8",
  light: "#eaeaea",
  card: "#0f3460",
  success: "#2ecc71",
  error: "#e74c3c",
  warning: "#f39c12",
};

const styles = {
  app: { minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 50%, ${COLORS.card} 100%)`, fontFamily: "'Noto Sans Tamil', 'Segoe UI', sans-serif", color: COLORS.light },
  header: { background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)", padding: "16px 20px", borderBottom: `2px solid ${COLORS.accent}`, position: "sticky", top: 0, zIndex: 100 },
  headerTitle: { fontSize: "clamp(14px, 3vw, 22px)", fontWeight: 800, color: COLORS.gold, margin: 0, letterSpacing: 1 },
  headerSub: { fontSize: "clamp(10px, 2vw, 14px)", color: COLORS.teal, margin: 0 },
  tabBar: { display: "flex", gap: 4, padding: "12px 16px", background: "rgba(0,0,0,0.3)", borderBottom: `1px solid rgba(255,255,255,0.1)` },
  tab: (active) => ({ flex: 1, padding: "10px 8px", border: "none", borderRadius: 8, cursor: "pointer", fontSize: "clamp(11px, 2vw, 14px)", fontWeight: 700, transition: "all 0.3s", background: active ? COLORS.accent : "rgba(255,255,255,0.07)", color: active ? "#fff" : COLORS.light }),
  content: { padding: "16px", maxWidth: 900, margin: "0 auto" },
  card: { background: "rgba(15,52,96,0.7)", border: `1px solid rgba(0,180,216,0.3)`, borderRadius: 12, padding: "16px", marginBottom: 16, backdropFilter: "blur(5px)" },
  sectionTitle: { fontSize: "clamp(14px, 2.5vw, 18px)", fontWeight: 800, color: COLORS.gold, marginBottom: 12, borderLeft: `4px solid ${COLORS.accent}`, paddingLeft: 10 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "clamp(11px, 1.8vw, 14px)", overflowX: "auto" },
  th: { background: `linear-gradient(135deg, ${COLORS.accent}, #c0392b)`, color: "#fff", padding: "10px 12px", textAlign: "left", fontWeight: 700 },
  td: { padding: "9px 12px", borderBottom: `1px solid rgba(0,180,216,0.2)`, verticalAlign: "top" },
  trEven: { background: "rgba(0,180,216,0.06)" },
  trOdd: { background: "rgba(0,0,0,0.1)" },
  highlight: { background: `linear-gradient(135deg, ${COLORS.gold}22, ${COLORS.teal}22)`, border: `1px solid ${COLORS.gold}55`, borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: "clamp(12px, 2vw, 15px)", fontWeight: 700, color: COLORS.gold },
  note: { background: `rgba(231,76,60,0.15)`, border: `1px solid ${COLORS.error}55`, borderRadius: 8, padding: "10px 14px", marginTop: 10, fontSize: "clamp(11px, 1.8vw, 13px)", color: "#ffc3c3" },
  examples: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 },
  exTag: { background: `linear-gradient(135deg, ${COLORS.teal}33, ${COLORS.teal}11)`, border: `1px solid ${COLORS.teal}55`, borderRadius: 20, padding: "4px 12px", fontSize: "clamp(11px, 1.8vw, 13px)", color: COLORS.teal, fontWeight: 600 },
  para: { fontSize: "clamp(12px, 1.8vw, 14px)", lineHeight: 1.8, color: "#d0e8ff", marginBottom: 10 },
  qCard: (selected, correct, ans, idx) => ({
    background: selected !== null ? (idx === ans ? "rgba(46,204,113,0.2)" : idx === selected ? "rgba(231,76,60,0.2)" : "rgba(15,52,96,0.5)") : "rgba(15,52,96,0.5)",
    border: `2px solid ${selected !== null ? (idx === ans ? COLORS.success : idx === selected ? COLORS.error : "rgba(0,180,216,0.2)") : "rgba(0,180,216,0.2)"}`,
    borderRadius: 8, padding: "10px 14px", cursor: selected !== null ? "default" : "pointer", marginBottom: 8, fontSize: "clamp(11px, 1.8vw, 14px)", transition: "all 0.3s",
  }),
  btn: (color) => ({ background: color, border: "none", borderRadius: 8, padding: "10px 20px", color: "#fff", fontWeight: 700, fontSize: "clamp(12px, 1.8vw, 14px)", cursor: "pointer", transition: "all 0.3s" }),
  progress: { height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", marginBottom: 16 },
  progressFill: (pct) => ({ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.gold})`, borderRadius: 3, transition: "width 0.5s" }),
  scoreBox: { textAlign: "center", padding: 32 },
  scoreBig: { fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 900, color: COLORS.gold },
  gameGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginTop: 12 },
  gameBtn: (state) => ({ padding: "12px", borderRadius: 10, border: `2px solid ${state === "correct" ? COLORS.success : state === "wrong" ? COLORS.error : state === "missed" ? COLORS.warning : "rgba(0,180,216,0.4)"}`, background: state === "correct" ? "rgba(46,204,113,0.2)" : state === "wrong" ? "rgba(231,76,60,0.2)" : state === "missed" ? "rgba(243,156,18,0.2)" : "rgba(15,52,96,0.6)", color: "#fff", fontSize: "clamp(11px, 1.8vw, 13px)", fontWeight: 600, cursor: state ? "default" : "pointer", transition: "all 0.3s", textAlign: "center" }),
  timer: (t) => ({ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: t <= 5 ? "rgba(231,76,60,0.3)" : "rgba(0,180,216,0.2)", color: t <= 5 ? COLORS.error : COLORS.teal, fontSize: "clamp(13px, 2vw, 16px)", fontWeight: 900, border: `1px solid ${t <= 5 ? COLORS.error : COLORS.teal}55` }),
};

// Notes Tab
function NotesTab() {
  return (
    <div style={styles.content}>
      {notesData.sections.map((sec, si) => (
        <div key={si} style={styles.card}>
          <div style={styles.sectionTitle}>{sec.heading}</div>
          {sec.content && <p style={styles.para}>{sec.content}</p>}
          {sec.highlight && <div style={styles.highlight}>⭐ {sec.highlight}</div>}
          {sec.table && (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>{sec.table.headers.map((h, i) => <th key={i} style={styles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {sec.table.rows.map((row, ri) => (
                    <tr key={ri} style={ri % 2 === 0 ? styles.trEven : styles.trOdd}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ ...styles.td, color: ci === 0 ? COLORS.teal : "#d0e8ff", fontWeight: ci === 0 ? 700 : 400 }}>
                          {cell.split("\n").map((line, li) => <div key={li}>{line}</div>)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {sec.examples && (
            <div>
              <p style={{ ...styles.para, color: COLORS.gold, fontWeight: 700, marginBottom: 6 }}>எடுத்துக்காட்டுகள்:</p>
              <div style={styles.examples}>{sec.examples.map((e, i) => <span key={i} style={styles.exTag}>{e}</span>)}</div>
            </div>
          )}
          {sec.note && <div style={styles.note}>📌 {sec.note}</div>}
        </div>
      ))}
    </div>
  );
}

// Quiz Tab
function QuizTab() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [review, setReview] = useState(false);

  const q = quizData[current];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.ans;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { q: q.q, selected: idx, ans: q.ans, correct, exp: q.exp }]);
  };

  const next = () => {
    if (current + 1 >= quizData.length) setFinished(true);
    else { setCurrent(c => c + 1); setSelected(null); }
  };

  const reset = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]); setReview(false); };

  if (finished && !review) {
    const pct = Math.round((score / quizData.length) * 100);
    return (
      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.scoreBox}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚"}</div>
            <div style={styles.scoreBig}>{score}/{quizData.length}</div>
            <div style={{ fontSize: "clamp(16px, 3vw, 20px)", color: COLORS.teal, marginBottom: 16 }}>{pct}% சரியான விடைகள்</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button style={styles.btn(COLORS.teal)} onClick={() => setReview(true)}>விளக்கம் பார்</button>
              <button style={styles.btn(COLORS.accent)} onClick={reset}>மீண்டும் விளையாடு</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (review) {
    return (
      <div style={styles.content}>
        <button style={{ ...styles.btn(COLORS.card), marginBottom: 16 }} onClick={() => setReview(false)}>← திரும்பு</button>
        {answers.map((a, i) => (
          <div key={i} style={{ ...styles.card, borderColor: a.correct ? `${COLORS.success}55` : `${COLORS.error}55` }}>
            <div style={{ fontSize: "clamp(12px, 2vw, 14px)", color: COLORS.gold, marginBottom: 8, fontWeight: 700 }}>Q{i + 1}: {a.q}</div>
            <div style={{ fontSize: "clamp(11px, 1.8vw, 13px)", marginBottom: 4, color: a.correct ? COLORS.success : COLORS.error }}>
              {a.correct ? "✅ சரி" : "❌ தவறு"} — உங்கள் விடை: {quizData[i].opts[a.selected]} | சரியான விடை: {quizData[i].opts[a.ans]}
            </div>
            <div style={styles.note}>💡 {a.exp}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={styles.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ color: COLORS.teal, fontSize: "clamp(12px, 2vw, 14px)", fontWeight: 700 }}>வினா {current + 1}/{quizData.length}</span>
        <span style={{ color: COLORS.gold, fontSize: "clamp(12px, 2vw, 14px)", fontWeight: 700 }}>மதிப்பெண்: {score}</span>
      </div>
      <div style={styles.progress}><div style={styles.progressFill((current / quizData.length) * 100)} /></div>
      <div style={styles.card}>
        <div style={{ fontSize: "clamp(13px, 2.2vw, 16px)", color: "#fff", fontWeight: 700, marginBottom: 16, lineHeight: 1.6 }}>{q.q}</div>
        {q.opts.map((opt, idx) => (
          <div key={idx} style={styles.qCard(selected, q.ans === idx, q.ans, idx)} onClick={() => handleSelect(idx)}>
            <span style={{ marginRight: 8, color: selected !== null ? (idx === q.ans ? COLORS.success : idx === selected ? COLORS.error : COLORS.teal) : COLORS.teal }}>{["அ", "ஆ", "இ", "ஈ"][idx]})</span>
            {opt}
          </div>
        ))}
        {selected !== null && (
          <div style={{ marginTop: 12 }}>
            <div style={styles.note}>💡 {q.exp}</div>
            <button style={{ ...styles.btn(COLORS.accent), marginTop: 12, width: "100%" }} onClick={next}>
              {current + 1 >= quizData.length ? "முடிவைப் பார்" : "அடுத்த வினா →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Game Tab
function GameTab() {
  const [gameIdx, setGameIdx] = useState(0);
  const [btnStates, setBtnStates] = useState([null, null, null, null]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [timerActive, setTimerActive] = useState(true);

  const q = gameQuestions[gameIdx % gameQuestions.length];

  useState(() => {
    if (gameOver || answered) return;
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(interval);
          if (!answered) {
            const newStates = [null, null, null, null];
            newStates[q.ans] = "missed";
            q.opts.forEach((_, i) => { if (newStates[i] === null) newStates[i] = "neutral"; });
            setBtnStates(newStates.map((s, i) => i === q.ans ? "missed" : "neutral"));
            setLives(l => { if (l - 1 <= 0) { setGameOver(true); } return l - 1; });
            setAnswered(true);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  const handleAnswer = (idx) => {
    if (answered) return;
    setAnswered(true);
    const newStates = q.opts.map((_, i) => i === q.ans ? "correct" : i === idx && idx !== q.ans ? "wrong" : null);
    setBtnStates(newStates);
    if (idx === q.ans) setScore(s => s + 1);
    else setLives(l => { if (l - 1 <= 0) { setGameOver(true); } return l - 1; });
  };

  const nextQ = () => {
    if (gameIdx + 1 >= gameQuestions.length) { setGameOver(true); return; }
    setGameIdx(gi => gi + 1);
    setBtnStates([null, null, null, null]);
    setTimer(15);
    setAnswered(false);
  };

  const reset = () => { setGameIdx(0); setBtnStates([null, null, null, null]); setScore(0); setLives(3); setTimer(15); setGameOver(false); setAnswered(false); };

  if (gameOver) {
    return (
      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.scoreBox}>
            <div style={{ fontSize: 48 }}>{score >= 15 ? "🏆" : score >= 10 ? "🎯" : "💪"}</div>
            <div style={styles.scoreBig}>{score}</div>
            <div style={{ color: COLORS.teal, marginBottom: 16, fontSize: "clamp(14px, 2.5vw, 18px)" }}>மொத்த மதிப்பெண்கள்</div>
            <button style={styles.btn(COLORS.accent)} onClick={reset}>மீண்டும் விளையாடு</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[...Array(3)].map((_, i) => <span key={i} style={{ fontSize: 20 }}>{i < lives ? "❤️" : "🖤"}</span>)}
        </div>
        <span style={styles.timer(timer)}>⏱ {timer}s</span>
        <span style={{ color: COLORS.gold, fontWeight: 800, fontSize: "clamp(13px, 2vw, 16px)" }}>🏆 {score}</span>
      </div>
      <div style={styles.progress}><div style={styles.progressFill((gameIdx / gameQuestions.length) * 100)} /></div>
      <div style={styles.card}>
        <div style={{ fontSize: "clamp(12px, 2vw, 14px)", color: COLORS.teal, marginBottom: 8 }}>வினா {gameIdx + 1}/{gameQuestions.length}</div>
        <div style={{ fontSize: "clamp(13px, 2.2vw, 16px)", color: "#fff", fontWeight: 700, marginBottom: 16, lineHeight: 1.6 }}>{q.q}</div>
        <div style={styles.gameGrid}>
          {q.opts.map((opt, idx) => (
            <button key={idx} style={styles.gameBtn(btnStates[idx])} onClick={() => handleAnswer(idx)}>
              <span style={{ display: "block", fontSize: "clamp(11px, 1.5vw, 13px)", marginBottom: 2, color: COLORS.gold }}>{["அ", "ஆ", "இ", "ஈ"][idx]}</span>
              {opt}
            </button>
          ))}
        </div>
        {answered && (
          <div style={{ marginTop: 12 }}>
            <div style={styles.note}>💡 {q.exp}</div>
            <button style={{ ...styles.btn(COLORS.accent), marginTop: 12, width: "100%" }} onClick={nextQ}>
              {gameIdx + 1 >= gameQuestions.length ? "முடிவு" : "அடுத்து →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Chapter1() {
  const [tab, setTab] = useState(0);
  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={styles.headerTitle}>📚 இயல் ஒன்று</h1>
            <p style={styles.headerSub}>குற்றியலுகரம், குற்றியலிகரம் • 7th Std Tamil Term 1</p>
          </div>
          <div style={{ background: `${COLORS.accent}33`, border: `1px solid ${COLORS.accent}55`, borderRadius: 8, padding: "4px 10px", fontSize: "clamp(10px, 1.5vw, 12px)", color: COLORS.accent, fontWeight: 700 }}>Ch.1</div>
        </div>
      </div>
      <div style={styles.tabBar}>
        {["📝 குறிப்புகள்", "❓ வினாடி வினா", "🎮 விளையாட்டு"].map((t, i) => (
          <button key={i} style={styles.tab(tab === i)} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>
      {tab === 0 && <NotesTab />}
      {tab === 1 && <QuizTab />}
      {tab === 2 && <GameTab />}
    </div>
  );
}
