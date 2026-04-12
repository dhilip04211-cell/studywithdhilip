import { useState } from "react";

const notesData = {
  title: "நால்வகைக் குறுக்கங்கள்",
  sections: [
    {
      heading: "மாத்திரை & குறுக்கங்கள் - அறிமுகம்",
      content: `ஒவ்வோர் எழுத்துக்கும் அதை ஒலிப்பதற்கு உரிய கால அளவு உண்டு. இதை மாத்திரை என்பர். ஆனால் எல்லா எழுத்துகளும் எல்லா இடங்களிலும் தமக்குரிய மாத்திரை அளவில் முழுமையாக ஒலிப்பதில்லை. சில எழுத்துகள் சில இடங்களில் தமக்குரிய கால அளவைவிடக் குறைவாக ஒலிக்கும். இவ்வாறு குறைந்து ஒலிக்கும் எழுத்துக்களை குறுக்கங்கள் என்கிறோம்.`,
      highlight: "நால்வகை குறுக்கங்கள்: ஐகாரக்குறுக்கம், ஔகாரக்குறுக்கம், மகரக்குறுக்கம், ஆய்தக்குறுக்கம்",
    },
    {
      heading: "நால்வகை குறுக்கங்கள் - ஒப்பீட்டுப் பட்டியல்",
      table: {
        headers: ["வகை", "இயல்பான ஒலி", "குறுக்கம் பெறும் இடம்", "குறுக்கப்பட்ட ஒலி"],
        rows: [
          ["ஐகாரக்குறுக்கம்", "2 மாத்திரை", "சொல் முதல், இடை, இறுதி", "முதல்: 1½, இடை/இறுதி: 1 மாத்திரை"],
          ["ஔகாரக்குறுக்கம்", "2 மாத்திரை", "சொல் முதல் மட்டும்", "1½ மாத்திரை"],
          ["மகரக்குறுக்கம்", "½ மாத்திரை", "வ, ன், ண் வரும் முன்", "¼ மாத்திரை"],
          ["ஆய்தக்குறுக்கம்", "½ மாத்திரை", "வல்லினம் வரும் முன் (சந்தி)", "¼ மாத்திரை"],
        ],
      },
    },
    {
      heading: "ஐகாரக்குறுக்கம் - விளக்கம்",
      content: `ஐ, கை, பை என ஐகார எழுத்து, தனித்து வரும் இடங்களில் தனக்குரிய இரண்டு மாத்திரை அளவில் முழுமையாக ஒலிக்கிறது.

வையம், சமையல், பறவை என சொற்களின் முதல், இடை, இறுதி ஆகிய இடங்களில் வரும்போது தனக்குரிய இரண்டு மாத்திரை அளவிலிருந்து குறைந்து ஒலிக்கிறது. இவ்வாறு குறைந்து ஒலிக்கும் ஐகாரம் ஐகாரக்குறுக்கம் எனப்படும்.`,
      table: {
        headers: ["ஐகாரம் வரும் இடம்", "ஒலி அளவு", "எடுத்துக்காட்டு"],
        rows: [
          ["தனித்து வரும்போது", "2 மாத்திரை (முழு ஒலி)", "ஐ, கை, பை"],
          ["சொல் முதலில்", "1½ மாத்திரை", "வையம், ஐம்பது"],
          ["சொல் இடையில்", "1 மாத்திரை", "சமையல், கைவினை"],
          ["சொல் இறுதியில்", "1 மாத்திரை", "பறவை, அரவை"],
        ],
      },
    },
    {
      heading: "ஔகாரக்குறுக்கம் - விளக்கம்",
      content: `ஔ, வௌ என ஔகார எழுத்து, தனித்து வரும் இடங்களில் தனக்குரிய இரண்டு மாத்திரை அளவில் முழுமையாக ஒலிக்கிறது.

ஔவையார், வௌவால் எனச் சொற்களின் முதலில் வரும்போது தனக்குரிய இரண்டு மாத்திரை அளவிலிருந்து குறைந்து ஒன்றரை மாத்திரை அளவில் ஒலிக்கிறது. இவ்வாறு குறைந்து ஒலிக்கும் ஔகாரம் ஔகாரக்குறுக்கம் எனப்படும்.`,
      table: {
        headers: ["ஔகாரம் வரும் இடம்", "ஒலி அளவு", "குறிப்பு"],
        rows: [
          ["தனித்து வரும்போது", "2 மாத்திரை", "ஔ, வௌ"],
          ["சொல் முதலில்", "1½ மாத்திரை", "ஔவையார், வௌவால்"],
          ["சொல் இடையில்", "வராது", "ஔகாரம் சொல் இடையில் வராது"],
          ["சொல் இறுதியில்", "வராது", "ஔகாரம் சொல் இறுதியில் வராது"],
        ],
      },
      note: "ஔகாரம் சொல்லின் இடையிலும் இறுதியிலும் வராது.",
    },
    {
      heading: "ஐகாரம் vs ஔகாரம் - ஒப்பீடு",
      table: {
        headers: ["அம்சம்", "ஐகாரம்", "ஔகாரம்"],
        rows: [
          ["இயல்பான மாத்திரை", "2 மாத்திரை", "2 மாத்திரை"],
          ["குறுக்கம் பெறும் இடங்கள்", "முதல், இடை, இறுதி", "முதல் மட்டும்"],
          ["குறுக்கம் பெற்ற ஒலி (முதல்)", "1½ மாத்திரை", "1½ மாத்திரை"],
          ["குறுக்கம் பெற்ற ஒலி (இடை/இறுதி)", "1 மாத்திரை", "வராது"],
          ["எடுத்துக்காட்டு", "வையம், பறவை", "ஔவையார், வௌவால்"],
        ],
      },
    },
    {
      heading: "மகரக்குறுக்கம் - விளக்கம்",
      content: `அம்மா, பாடம் படித்தான் ஆகிய சொற்களில் மகர மெய்யெழுத்து தனக்குரிய அரை மாத்திரை அளவில் முழுமையாக ஒலிக்கிறது.

வலம் வந்தான் என்பதில் மகர மெய்யெழுத்தை அடுத்து வகர எழுத்து வருவதால் மகரமெய்யானது தனக்குரிய அரை மாத்திரை அளவிலிருந்து குறைந்து கால் மாத்திரை அளவில் ஒலிக்கிறது.

போலும் → போன்ம், மருளும் → மருண்ம் - இவற்றில் மகரமெய்யானது ன், ண் ஆகிய எழுத்துக்களை அடுத்து வருவதால் கால் மாத்திரையில் ஒலிக்கிறது. இவ்வாறு குறைந்து ஒலிக்கும் மகரம் மகரக்குறுக்கம் எனப்படும்.`,
      table: {
        headers: ["மகரத்தை அடுத்து வரும் எழுத்து", "ஒலி அளவு", "எடுத்துக்காட்டு"],
        rows: [
          ["வகரம் (வ)", "¼ மாத்திரை", "வலம் வந்தான்"],
          ["ன் (ன்)", "¼ மாத்திரை", "போன்ம் (போலும்→)"],
          ["ண் (ண்)", "¼ மாத்திரை", "மருண்ம் (மருளும்→)"],
          ["வேறு இடங்கள்", "½ மாத்திரை (முழு ஒலி)", "அம்மா, பாடம்"],
        ],
      },
      note: "மகரக்குறுக்கம் பழழ்ச் செய்யுளில் ஓசை சீர்மைக்காக பயன்படுத்தப்பட்டது.",
    },
    {
      heading: "ஆய்தக்குறுக்கம் - விளக்கம்",
      content: `அஃது, எஃகு ஆகிய சொற்களில் ஆய்த எழுத்து, தனக்குரிய அரை மாத்திரை அளவில் முழுமையாக ஒலிக்கிறது.

முள் + தீது = முஃடீது என்று சேரும். கல் + தீது = கஃறீது என்று சேரும். இச்சொற்களில் உள்ள ஆய்த எழுத்து, தனக்குரிய அரை மாத்திரை அளவிலிருந்து குறைந்து கால் மாத்திரை அளவில் ஒலிக்கிறது. இவ்வாறு குறைந்து ஒலிக்கும் ஆய்தம் ஆய்தக்குறுக்கம் எனப்படும்.`,
      table: {
        headers: ["இடம்", "ஒலி அளவு", "எடுத்துக்காட்டு"],
        rows: [
          ["தனித்து வரும் சொற்கள்", "½ மாத்திரை", "அஃது, எஃகு"],
          ["சந்தியில் வல்லினம் அடுத்து வரும்போது", "¼ மாத்திரை", "முஃடீது (முள்+தீது), கஃறீது (கல்+தீது)"],
        ],
      },
    },
    {
      heading: "நால்வகை குறுக்கங்கள் - விரிவான ஒப்பீடு",
      table: {
        headers: ["குறுக்கம்", "எழுத்து", "இயல்பான ஒலி", "குறுக்கம் ஒலி", "எடுத்துக்காட்டு"],
        rows: [
          ["ஐகாரக்குறுக்கம்", "ஐ/கை/பை", "2 மாத்திரை", "1½ / 1 மாத்திரை", "வையம், சமையல்"],
          ["ஔகாரக்குறுக்கம்", "ஔ/வௌ", "2 மாத்திரை", "1½ மாத்திரை", "ஔவையார்"],
          ["மகரக்குறுக்கம்", "ம் (மெய்)", "½ மாத்திரை", "¼ மாத்திரை", "வலம் வந்தான்"],
          ["ஆய்தக்குறுக்கம்", "ஃ (ஆய்தம்)", "½ மாத்திரை", "¼ மாத்திரை", "முஃடீது"],
        ],
      },
    },
    {
      heading: "பால் வகைகள் (Gender Classification)",
      content: "பால் ஐந்து வகைப்படும். தமிழ் இலக்கணத்தில் திணை இரண்டு வகை: உயர்திணை, அஃறிணை.",
      table: {
        headers: ["பால்", "வகை", "விளக்கம்", "எடுத்துக்காட்டு"],
        rows: [
          ["ஆண்பால்", "உயர்திணை", "ஓர் ஆணைக் குறிப்பது", "மாணவன், செல்வன்"],
          ["பெண்பால்", "உயர்திணை", "ஒரு பெண்ணைக் குறிப்பது", "ஆதினி, மாணவி"],
          ["பலர்பால்", "உயர்திணை", "ஒன்றுக்கு மேற்பட்டவர்", "மாணவர்கள், மக்கள்"],
          ["ஒன்றன்பால்", "அஃறிணை", "ஒன்றைக் குறிப்பது", "கல், பசு"],
          ["பலவின்பால்", "அஃறிணை", "ஒன்றுக்கு மேற்பட்டவை", "மண் புழுக்கள், பசுக்கள்"],
        ],
      },
    },
    {
      heading: "திணை வகைகள் (Classification of Living Beings)",
      table: {
        headers: ["திணை", "விளக்கம்", "எடுத்துக்காட்டு"],
        rows: [
          ["உயர்திணை", "ஆறு அறிவுடைய மனிதர்கள்", "நீலன், கோமதி, மக்கள்"],
          ["அஃறிணை", "பறவைகள், விலங்கினங்கள், தாவரங்கள், உயிரற்ற பொருள்கள்", "குதிரை, பூ, கல், மரம்"],
        ],
      },
    },
  ],
};

const quizData = [
  { q: "நால்வகைக் குறுக்கங்கள் யாவை?", opts: ["ஐகாரம், ஔகாரம், மகரம், ஆய்தம்", "குறில், நெடில், மெய், உயிர்", "வல்லினம், மெல்லினம், இடையினம், சார்பு", "உயிர், மெய், ஆய்தம், குறுக்கம்"], ans: 0, exp: "நால்வகைக் குறுக்கங்கள்: ஐகாரக்குறுக்கம், ஔகாரக்குறுக்கம், மகரக்குறுக்கம், ஆய்தக்குறுக்கம்." },
  { q: "ஐகாரம் தனித்து வரும்போது எத்தனை மாத்திரை ஒலிக்கும்?", opts: ["1 மாத்திரை", "1½ மாத்திரை", "2 மாத்திரை", "½ மாத்திரை"], ans: 2, exp: "ஐ, கை, பை என ஐகார எழுத்து தனித்து வரும்போது தனக்குரிய 2 மாத்திரை அளவில் முழுமையாக ஒலிக்கிறது." },
  { q: "ஐகாரக்குறுக்கம் சொல் முதலில் எத்தனை மாத்திரை?", opts: ["2 மாத்திரை", "1½ மாத்திரை", "1 மாத்திரை", "½ மாத்திரை"], ans: 1, exp: "ஐகாரம் சொல்லின் முதலில் வரும்போது ஒன்றரை மாத்திரை அளவில் ஒலிக்கும்." },
  { q: "ஐகாரக்குறுக்கம் சொல் இடையிலும் இறுதியிலும் எத்தனை மாத்திரை?", opts: ["2 மாத்திரை", "1½ மாத்திரை", "1 மாத்திரை", "½ மாத்திரை"], ans: 2, exp: "ஐகாரம் சொல்லின் இடையிலும் இறுதியிலும் வரும்போது ஒரு மாத்திரை அளவில் ஒலிக்கும்." },
  { q: "ஔகாரம் தனித்து வரும்போது எத்தனை மாத்திரை?", opts: ["1 மாத்திரை", "1½ மாத்திரை", "2 மாத்திரை", "½ மாத்திரை"], ans: 2, exp: "ஔ, வௌ என ஔகார எழுத்து தனித்து வரும்போது 2 மாத்திரை அளவில் முழுமையாக ஒலிக்கிறது." },
  { q: "ஔகாரக்குறுக்கம் சொல்லின் எந்த இடத்தில் மட்டும் வரும்?", opts: ["இறுதியில் மட்டும்", "இடையில் மட்டும்", "முதலில் மட்டும்", "எல்லா இடத்திலும்"], ans: 2, exp: "ஔகாரம் சொல்லின் முதலில் மட்டுமே குறுக்கம் பெறும். இடையிலும் இறுதியிலும் வராது." },
  { q: "ஔகாரக்குறுக்கம் எத்தனை மாத்திரை?", opts: ["2 மாத்திரை", "1½ மாத்திரை", "1 மாத்திரை", "½ மாத்திரை"], ans: 1, exp: "ஔகாரம் சொல்லின் முதலில் வரும்போது 1½ மாத்திரை அளவில் ஒலிக்கும்." },
  { q: "'வையம்' என்னும் சொல்லில் ஐகாரக்குறுக்கம் உள்ள இடம் எது?", opts: ["இறுதி", "இடை", "முதல்", "இல்லை"], ans: 2, exp: "'வை' என்பது வையம் என்னும் சொல்லின் முதலில் வருகிறது. ஆதலால் ஐகாரக்குறுக்கம் பெறும் மாத்திரை 1½." },
  { q: "மகர மெய்யெழுத்தின் இயல்பான ஒலி அளவு எத்தனை?", opts: ["1 மாத்திரை", "¼ மாத்திரை", "½ மாத்திரை", "2 மாத்திரை"], ans: 2, exp: "மகர மெய்யெழுத்து (ம்) இயல்பாக ½ மாத்திரை அளவில் ஒலிக்கும்." },
  { q: "மகரக்குறுக்கம் எத்தனை மாத்திரை?", opts: ["½ மாத்திரை", "1 மாத்திரை", "¼ மாத்திரை", "1½ மாத்திரை"], ans: 2, exp: "மகரக்குறுக்கம் கால் (¼) மாத்திரை அளவில் ஒலிக்கும்." },
  { q: "'வலம் வந்தான்' என்பதில் மகரக்குறுக்கம் ஏற்படுவதற்கு காரணம் என்ன?", opts: ["மகரத்தை அடுத்து ண் வருவதால்", "மகரத்தை அடுத்து வ வருவதால்", "மகரத்தை அடுத்து ன் வருவதால்", "மகரத்தை அடுத்து ல் வருவதால்"], ans: 1, exp: "'வலம்' என்னும் சொல்லில் மகர மெய்யெழுத்தை அடுத்து 'வ' வருவதால் மகரம் ¼ மாத்திரையாக குறுகும்." },
  { q: "ஆய்தம் இயல்பாக எத்தனை மாத்திரை ஒலிக்கும்?", opts: ["1 மாத்திரை", "¼ மாத்திரை", "½ மாத்திரை", "2 மாத்திரை"], ans: 2, exp: "ஆய்தம் (ஃ) இயல்பாக ½ மாத்திரை அளவில் ஒலிக்கும்." },
  { q: "ஆய்தக்குறுக்கம் எத்தனை மாத்திரை?", opts: ["½ மாத்திரை", "1 மாத்திரை", "¼ மாத்திரை", "1½ மாத்திரை"], ans: 2, exp: "ஆய்தக்குறுக்கம் கால் (¼) மாத்திரை அளவில் ஒலிக்கும்." },
  { q: "முள் + தீது = ?", opts: ["முள்தீது", "முட்டீது", "முஃடீது", "முட்டி"], ans: 2, exp: "முள் + தீது = முஃடீது. இதில் ஆய்த எழுத்து வல்லினம் முன் வருவதால் ¼ மாத்திரையாக குறுகும் - இதுவே ஆய்தக்குறுக்கம்." },
  { q: "கல் + தீது = ?", opts: ["கல்தீது", "கட்டீது", "கஃறீது", "கற்றீது"], ans: 2, exp: "கல் + தீது = கஃறீது. இதிலும் ஆய்தக்குறுக்கம் பெறும்." },
  { q: "'வேட்கை' என்னும் சொல்லில் ஐகாரக்குறுக்கம் பெறும் மாத்திரை அளவு என்ன?", opts: ["2 மாத்திரை", "½ மாத்திரை", "1 மாத்திரை", "1½ மாத்திரை"], ans: 2, exp: "'வேட்கை' என்னும் சொல்லில் 'கை' என்பது சொல்லின் இறுதியில் வருகிறது. ஐகாரக்குறுக்கம் சொல் இறுதியில் 1 மாத்திரை." },
  { q: "ஔகாரக்குறுக்கம் ஏற்படும் நிலை எது?", opts: ["ஔகாரம் சொல் இடையில் வரும்போது", "ஔகாரம் சொல் இறுதியில் வரும்போது", "ஔகாரம் சொல் முதலில் வரும்போது", "ஔகாரம் தனித்து வரும்போது"], ans: 2, exp: "ஔகாரக்குறுக்கம் சொல்லின் முதலில் மட்டும் ஏற்படும். இடை, இறுதியில் ஔகாரமே வராது." },
  { q: "'ஔவையார்' என்பதில் ஔகாரக்குறுக்கம் பெறும் மாத்திரை?", opts: ["2 மாத்திரை", "1 மாத்திரை", "1½ மாத்திரை", "½ மாத்திரை"], ans: 2, exp: "ஔகாரம் சொல்லின் முதலில் வரும்போது 1½ மாத்திரை அளவில் ஒலிக்கும்." },
  { q: "மகரக்குறுக்கம் எந்த எழுத்து முன் வரும்போது ஏற்படும்?", opts: ["க், ச், ட்", "வ, ன், ண்", "ய, ர, ல", "எல்லா எழுத்துகளும்"], ans: 1, exp: "மகர மெய்யை அடுத்து வ, ன், ண் ஆகிய எழுத்துகள் வரும்போது மகரக்குறுக்கம் ஏற்படும்." },
  { q: "குறுக்கங்கள் என்றால் என்ன?", opts: ["புதிய எழுத்துகள்", "குறைந்து ஒலிக்கும் எழுத்துகள்", "நீண்டு ஒலிக்கும் எழுத்துகள்", "இரட்டிப்பாக ஒலிக்கும் எழுத்துகள்"], ans: 1, exp: "சில எழுத்துகள் சில இடங்களில் தமக்குரிய கால அளவைவிடக் குறைவாக ஒலிக்கும். இவ்வாறு குறைந்து ஒலிக்கும் எழுத்துக்களை குறுக்கங்கள் என்பர்." },
  { q: "மாத்திரை என்றால் என்ன?", opts: ["எழுத்தின் வடிவம்", "எழுத்தை ஒலிப்பதற்கு உரிய கால அளவு", "எழுத்தின் பொருள்", "எழுத்தின் வகை"], ans: 1, exp: "ஒவ்வோர் எழுத்துக்கும் அதை ஒலிப்பதற்கு உரிய கால அளவு உண்டு. இதை மாத்திரை என்பர்." },
  { q: "ஔகாரம் சொல்லின் இடையிலும் இறுதியிலும் வருமா?", opts: ["ஆம், வரும்", "இல்லை, வராது", "சில நேரம் வரும்", "இலக்கியத்தில் மட்டும் வரும்"], ans: 1, exp: "ஔகாரம் சொல்லின் இடையிலும் இறுதியிலும் வராது என்பது விதிவிலக்கு." },
  { q: "பால் எத்தனை வகைகள்?", opts: ["மூன்று", "நான்கு", "ஐந்து", "ஆறு"], ans: 2, exp: "பால் ஐந்து வகைப்படும்: ஆண்பால், பெண்பால், பலர்பால், ஒன்றன்பால், பலவின்பால்." },
  { q: "உயர்திணை என்பது யாரை குறிக்கும்?", opts: ["பறவைகள் மட்டும்", "ஆறு அறிவுடைய மனிதர்கள்", "விலங்குகள் மட்டும்", "தாவரங்கள்"], ans: 1, exp: "ஆறு அறிவுடைய மனிதர்களை உயர்திணை என்பர்." },
  { q: "அஃறிணை என்பது எதை குறிக்கும்?", opts: ["மனிதர்கள் மட்டும்", "தெய்வங்கள்", "பறவைகள், விலங்கினங்கள், தாவரங்கள் மற்றும் உயிரற்ற பொருள்கள்", "ஆண்மக்கள் மட்டும்"], ans: 2, exp: "பறவைகள், விலங்கினங்கள், தாவரங்கள் மற்றும் உயிரற்ற பொருள்களை அஃறிணை என்பர்." },
  { q: "'மக்கள்' என்பது எந்த பால்?", opts: ["ஆண்பால்", "பெண்பால்", "பலர்பால்", "பலவின்பால்"], ans: 2, exp: "'மக்கள்' என்பது ஒன்றுக்கு மேற்பட்ட உயர்திணை உயிர்களை குறிக்கிறது. எனவே இது பலர்பால்." },
  { q: "'பசு' என்பது எந்த பால்?", opts: ["ஆண்பால்", "பெண்பால்", "ஒன்றன்பால்", "பலவின்பால்"], ans: 2, exp: "'பசு' என்பது ஒரு அஃறிணை பொருளை குறிக்கிறது. எனவே இது ஒன்றன்பால்." },
  { q: "'மாணவர்கள்' என்பது எந்த பால்?", opts: ["ஆண்பால்", "பெண்பால்", "பலர்பால்", "பலவின்பால்"], ans: 2, exp: "'மாணவர்கள்' என்பது ஒன்றுக்கு மேற்பட்ட உயர்திணை உயிர்களை குறிக்கிறது. எனவே இது பலர்பால்." },
  { q: "'மண் புழுக்கள்' என்பது எந்த பால்?", opts: ["பலர்பால்", "பெண்பால்", "ஒன்றன்பால்", "பலவின்பால்"], ans: 3, exp: "'மண் புழுக்கள்' என்பது ஒன்றுக்கு மேற்பட்ட அஃறிணை பொருட்களை குறிக்கிறது. எனவே இது பலவின்பால்." },
  { q: "ஐகாரம் எத்தனை இடங்களில் குறுக்கம் பெறும்?", opts: ["ஒரு இடம்", "இரண்டு இடங்கள்", "மூன்று இடங்கள்", "நான்கு இடங்கள்"], ans: 2, exp: "ஐகாரம் சொல்லின் முதல், இடை, இறுதி என மூன்று இடங்களிலும் குறுக்கம் பெறும்." },
  { q: "ஔகாரம் எத்தனை இடங்களில் குறுக்கம் பெறும்?", opts: ["மூன்று இடங்கள்", "இரண்டு இடங்கள்", "ஒரு இடம்", "நான்கு இடங்கள்"], ans: 2, exp: "ஔகாரம் சொல்லின் முதலில் மட்டும் ஒரு இடத்தில் குறுக்கம் பெறும்." },
  { q: "'போலும்' என்னும் சொல் செய்யுளில் எவ்வாறு மாறும்?", opts: ["போல்மம்", "போன்ம்", "போலுவம்", "போல்வம்"], ans: 1, exp: "போலும் → போன்ம் என மாறும். மகர மெய்யானது ன் ஆகிய எழுத்தை அடுத்து வருவதால் ¼ மாத்திரையாக குறுகும்." },
  { q: "'மருளும்' என்னும் சொல் செய்யுளில் எவ்வாறு மாறும்?", opts: ["மருள்மம்", "மருண்ம்", "மருளுவம்", "மருட்டும்"], ans: 1, exp: "மருளும் → மருண்ம் என மாறும். மகர மெய்யானது ண் ஆகிய எழுத்தை அடுத்து வருவதால் ¼ மாத்திரையாக குறுகும்." },
  { q: "'அஃது' என்னும் சொல்லில் ஆய்தம் எத்தனை மாத்திரை?", opts: ["¼ மாத்திரை", "½ மாத்திரை", "1 மாத்திரை", "2 மாத்திரை"], ans: 1, exp: "'அஃது' என்னும் சொல்லில் ஆய்தம் தனக்குரிய ½ மாத்திரை அளவில் முழுமையாக ஒலிக்கிறது. குறுக்கம் பெறவில்லை." },
  { q: "'மாணவி' என்பது எந்த திணை, பால்?", opts: ["அஃறிணை - ஒன்றன்பால்", "உயர்திணை - பெண்பால்", "உயர்திணை - பலர்பால்", "அஃறிணை - பலவின்பால்"], ans: 1, exp: "'மாணவி' என்பது ஒரு பெண்ணை குறிக்கிறது. மனிதர்கள் உயர்திணை, ஒரு பெண் என்பதால் பெண்பால்." },
  { q: "குதிரை என்பது எந்த திணை, பால்?", opts: ["உயர்திணை - ஒன்றன்பால்", "அஃறிணை - ஒன்றன்பால்", "அஃறிணை - பலவின்பால்", "உயர்திணை - பலர்பால்"], ans: 1, exp: "குதிரை என்பது விலங்கு, எனவே அஃறிணை. ஒரு குதிரை என்பதால் ஒன்றன்பால்." },
  { q: "மாத்திரைகளின் அளவு சரியான வரிசை எது?", opts: ["குறில்=1, நெடில்=2, மெய்=½", "குறில்=2, நெடில்=1, மெய்=½", "குறில்=½, நெடில்=1, மெய்=2", "குறில்=1, நெடில்=3, மெய்=1"], ans: 0, exp: "குறில் எழுத்து = 1 மாத்திரை, நெடில் எழுத்து = 2 மாத்திரை, மெய் எழுத்து = ½ மாத்திரை என்பது மாத்திரை விதி." },
  { q: "ஐகாரக்குறுக்கம் 'வேட்கை' என்னும் சொல்லில் எந்த இடத்தில் வருகிறது?", opts: ["முதல்", "இடை", "இறுதி", "முதலும் இறுதியும்"], ans: 2, exp: "'வேட்கை' என்னும் சொல்லில் 'கை' என்பது இறுதியில் வருகிறது. எனவே ஐகாரக்குறுக்கம் இறுதியில் - 1 மாத்திரை." },
  { q: "மகரக்குறுக்கம் எந்த வகை இலக்கியத்தில் பயன்படுத்தப்பட்டது?", opts: ["உரைநடை", "செய்யுள்", "வழக்காடு மன்றம்", "கட்டுரை"], ans: 1, exp: "மகரக்குறுக்கம் செய்யுளில் ஓசை சீர்மைக்காக பயன்படுத்தப்பட்டது." },
  { q: "'சமையல்' என்னும் சொல்லில் ஐகாரக்குறுக்கம் எந்த மாத்திரை?", opts: ["2 மாத்திரை", "1½ மாத்திரை", "1 மாத்திரை", "½ மாத்திரை"], ans: 2, exp: "'சமையல்' என்னும் சொல்லில் 'மை' என்பது சொல்லின் இடையில் வருகிறது. ஐகாரக்குறுக்கம் இடையில் - 1 மாத்திரை." },
  { q: "நால்வகை குறுக்கங்களில் இரண்டும் ¼ மாத்திரை ஒலிக்கும் குறுக்கங்கள் எவை?", opts: ["ஐகாரம், ஔகாரம்", "மகரம், ஆய்தம்", "ஐகாரம், மகரம்", "ஔகாரம், ஆய்தம்"], ans: 1, exp: "மகரக்குறுக்கம் மற்றும் ஆய்தக்குறுக்கம் ஆகிய இரண்டும் ¼ மாத்திரை அளவில் ஒலிக்கும்." },
  { q: "நால்வகை குறுக்கங்களில் இரண்டும் ½ மாத்திரையில் இருந்து குறையும் எவை?", opts: ["ஐகாரம், ஔகாரம்", "மகரம், ஆய்தம்", "ஐகாரம், மகரம்", "ஔகாரம், ஆய்தம்"], ans: 1, exp: "மகரம் (½→¼) மற்றும் ஆய்தம் (½→¼) ஆகிய இரண்டும் ½ மாத்திரையிலிருந்து ¼ மாத்திரையாக குறையும்." },
  { q: "நால்வகை குறுக்கங்களில் 2 மாத்திரையிலிருந்து குறையும் எவை?", opts: ["மகரம், ஆய்தம்", "ஐகாரம், ஔகாரம்", "ஐகாரம், மகரம்", "ஔகாரம், ஆய்தம்"], ans: 1, exp: "ஐகாரம் (2→1½ அல்லது 1) மற்றும் ஔகாரம் (2→1½) ஆகிய இரண்டும் 2 மாத்திரையிலிருந்து குறையும்." },
  { q: "'ஆதினி' என்பது எந்த திணை, பால்?", opts: ["அஃறிணை - பெண்பால்", "உயர்திணை - பெண்பால்", "உயர்திணை - ஆண்பால்", "அஃறிணை - ஒன்றன்பால்"], ans: 1, exp: "'ஆதினி' என்பது ஒரு பெண்ணை குறிக்கிறது. மனிதர்கள் உயர்திணை, ஒரு பெண் என்பதால் பெண்பால்." },
  { q: "'செல்வன்' என்பது எந்த திணை, பால்?", opts: ["அஃறிணை - ஆண்பால்", "உயர்திணை - ஆண்பால்", "உயர்திணை - பலர்பால்", "அஃறிணை - பலவின்பால்"], ans: 1, exp: "'செல்வன்' என்பது ஒரு ஆண்மகனை குறிக்கிறது. மனிதர்கள் உயர்திணை, ஒரு ஆண் என்பதால் ஆண்பால்." },
  { q: "குறுக்கம் என்பது எப்போது ஏற்படும்?", opts: ["எழுத்து நீண்டு ஒலிக்கும்போது", "எழுத்து தமக்குரிய கால அளவைவிடக் குறைவாக ஒலிக்கும்போது", "எழுத்து இரட்டிப்பாகும்போது", "புது எழுத்து உண்டாகும்போது"], ans: 1, exp: "சில எழுத்துகள் சில இடங்களில் தமக்குரிய கால அளவைவிடக் குறைவாக ஒலிக்கும். இதுவே குறுக்கம்." },
  { q: "அஃறிணையில் ஒன்றுக்கு மேற்பட்ட பொருட்களை குறிப்பது எந்த பால்?", opts: ["பலர்பால்", "ஒன்றன்பால்", "பலவின்பால்", "பெண்பால்"], ans: 2, exp: "அஃறிணையில் ஒன்றுக்கு மேற்பட்டவற்றைக் குறிப்பது பலவின்பால். எ.கா: மண் புழுக்கள், பசுக்கள்." },
  { q: "ஐகாரக்குறுக்கம் - மொத்தம் எத்தனை வித மாத்திரை அளவுகள்?", opts: ["ஒன்று", "இரண்டு", "மூன்று", "நான்கு"], ans: 1, exp: "ஐகாரக்குறுக்கம் இரண்டு வகை மாத்திரை அளவுகளில் வரும்: முதலில் 1½, இடை/இறுதியில் 1 மாத்திரை." },
  { q: "'பசுக்கள்' என்பது எந்த பால்?", opts: ["ஒன்றன்பால்", "பலவின்பால்", "பலர்பால்", "ஆண்பால்"], ans: 1, exp: "'பசுக்கள்' என்பது ஒன்றுக்கு மேற்பட்ட அஃறிணை விலங்குகளை குறிக்கிறது. எனவே பலவின்பால்." },
  { q: "மகரக்குறுக்கம் எங்கு பயன்படுகிறது?", opts: ["தற்கால உரைநடையில்", "செய்யுளில் ஓசை சீர்மைக்காக", "பேச்சு வழக்கில்", "நாட்டுப்புற பாடல்களில் மட்டும்"], ans: 1, exp: "மகரக்குறுக்கம் செய்யுளில் ஓசை சீர்மைக்காக பயன்படுத்தப்பட்டது. இது பழம் நூல்களில் உள்ளது." },
  { q: "'ஐம்பது' என்னும் சொல்லில் ஐகாரக்குறுக்கம் எத்தனை மாத்திரை?", opts: ["2 மாத்திரை", "1½ மாத்திரை", "1 மாத்திரை", "½ மாத்திரை"], ans: 1, exp: "'ஐம்பது' என்னும் சொல்லில் 'ஐ' என்பது முதலில் வருகிறது. ஐகாரக்குறுக்கம் முதலில் 1½ மாத்திரை." },
  { q: "'வௌவால்' என்பதில் ஔகாரக்குறுக்கம் எத்தனை மாத்திரை?", opts: ["2 மாத்திரை", "1½ மாத்திரை", "1 மாத்திரை", "½ மாத்திரை"], ans: 1, exp: "'வௌவால்' என்னும் சொல்லில் 'வௌ' என்பது முதலில் வருகிறது. ஔகாரக்குறுக்கம் முதலில் 1½ மாத்திரை." },
];

const gameQuestions = quizData.slice(0, 20);

const COLORS = {
  primary: "#0d1b2a",
  secondary: "#1b263b",
  accent: "#00b4d8",
  gold: "#ffd166",
  emerald: "#06d6a0",
  light: "#eef2f7",
  card: "#1e3a5f",
  success: "#2ecc71",
  error: "#e74c3c",
  warning: "#f39c12",
  purple: "#7b2d8b",
};

const styles = {
  app: { minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 60%, ${COLORS.card} 100%)`, fontFamily: "'Noto Sans Tamil', 'Segoe UI', sans-serif", color: COLORS.light },
  header: { background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", padding: "16px 20px", borderBottom: `2px solid ${COLORS.accent}`, position: "sticky", top: 0, zIndex: 100 },
  headerTitle: { fontSize: "clamp(14px, 3vw, 22px)", fontWeight: 800, color: COLORS.gold, margin: 0 },
  headerSub: { fontSize: "clamp(10px, 2vw, 14px)", color: COLORS.accent, margin: 0 },
  tabBar: { display: "flex", gap: 4, padding: "12px 16px", background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.1)" },
  tab: (active) => ({ flex: 1, padding: "10px 8px", border: "none", borderRadius: 8, cursor: "pointer", fontSize: "clamp(11px, 2vw, 14px)", fontWeight: 700, transition: "all 0.3s", background: active ? COLORS.accent : "rgba(255,255,255,0.07)", color: active ? COLORS.primary : COLORS.light }),
  content: { padding: "16px", maxWidth: 900, margin: "0 auto" },
  card: { background: "rgba(30,58,95,0.7)", border: `1px solid rgba(0,180,216,0.3)`, borderRadius: 12, padding: "16px", marginBottom: 16 },
  sectionTitle: { fontSize: "clamp(14px, 2.5vw, 18px)", fontWeight: 800, color: COLORS.gold, marginBottom: 12, borderLeft: `4px solid ${COLORS.accent}`, paddingLeft: 10 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "clamp(11px, 1.8vw, 14px)" },
  th: { background: `linear-gradient(135deg, #0077b6, #023e8a)`, color: "#fff", padding: "10px 12px", textAlign: "left", fontWeight: 700 },
  td: { padding: "9px 12px", borderBottom: "1px solid rgba(0,180,216,0.15)", verticalAlign: "top" },
  trEven: { background: "rgba(0,180,216,0.06)" },
  trOdd: { background: "rgba(0,0,0,0.1)" },
  highlight: { background: "rgba(255,209,102,0.15)", border: "1px solid rgba(255,209,102,0.4)", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: "clamp(12px, 2vw, 15px)", fontWeight: 700, color: COLORS.gold },
  note: { background: "rgba(6,214,160,0.1)", border: "1px solid rgba(6,214,160,0.3)", borderRadius: 8, padding: "10px 14px", marginTop: 10, fontSize: "clamp(11px, 1.8vw, 13px)", color: "#a8ffdf" },
  para: { fontSize: "clamp(12px, 1.8vw, 14px)", lineHeight: 1.8, color: "#d0e8ff", marginBottom: 10 },
  qCard: (selected, correct, ans, idx) => ({
    background: selected !== null ? (idx === ans ? "rgba(46,204,113,0.2)" : idx === selected ? "rgba(231,76,60,0.2)" : "rgba(30,58,95,0.5)") : "rgba(30,58,95,0.5)",
    border: `2px solid ${selected !== null ? (idx === ans ? COLORS.success : idx === selected ? COLORS.error : "rgba(0,180,216,0.2)") : "rgba(0,180,216,0.2)"}`,
    borderRadius: 8, padding: "10px 14px", cursor: selected !== null ? "default" : "pointer", marginBottom: 8, fontSize: "clamp(11px, 1.8vw, 14px)", transition: "all 0.3s",
  }),
  btn: (color) => ({ background: color, border: "none", borderRadius: 8, padding: "10px 20px", color: "#fff", fontWeight: 700, fontSize: "clamp(12px, 1.8vw, 14px)", cursor: "pointer" }),
  progress: { height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", marginBottom: 16 },
  progressFill: (pct) => ({ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.gold})`, borderRadius: 3, transition: "width 0.5s" }),
  scoreBox: { textAlign: "center", padding: 32 },
  scoreBig: { fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 900, color: COLORS.gold },
  gameGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginTop: 12 },
  gameBtn: (state) => ({ padding: "12px", borderRadius: 10, border: `2px solid ${state === "correct" ? COLORS.success : state === "wrong" ? COLORS.error : state === "missed" ? COLORS.warning : "rgba(0,180,216,0.4)"}`, background: state === "correct" ? "rgba(46,204,113,0.2)" : state === "wrong" ? "rgba(231,76,60,0.2)" : state === "missed" ? "rgba(243,156,18,0.2)" : "rgba(30,58,95,0.6)", color: "#fff", fontSize: "clamp(11px, 1.8vw, 13px)", fontWeight: 600, cursor: state ? "default" : "pointer", transition: "all 0.3s", textAlign: "center" }),
  timer: (t) => ({ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: t <= 5 ? "rgba(231,76,60,0.3)" : "rgba(0,180,216,0.2)", color: t <= 5 ? COLORS.error : COLORS.accent, fontWeight: 900, border: `1px solid ${t <= 5 ? COLORS.error : COLORS.accent}55`, fontSize: "clamp(13px, 2vw, 16px)" }),
};

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
                <thead><tr>{sec.table.headers.map((h, i) => <th key={i} style={styles.th}>{h}</th>)}</tr></thead>
                <tbody>
                  {sec.table.rows.map((row, ri) => (
                    <tr key={ri} style={ri % 2 === 0 ? styles.trEven : styles.trOdd}>
                      {row.map((cell, ci) => <td key={ci} style={{ ...styles.td, color: ci === 0 ? COLORS.accent : "#d0e8ff", fontWeight: ci === 0 ? 700 : 400 }}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {sec.note && <div style={styles.note}>📌 {sec.note}</div>}
        </div>
      ))}
    </div>
  );
}

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
    if (idx === q.ans) setScore(s => s + 1);
    setAnswers(a => [...a, { q: q.q, selected: idx, ans: q.ans, correct: idx === q.ans, exp: q.exp }]);
  };
  const next = () => { if (current + 1 >= quizData.length) setFinished(true); else { setCurrent(c => c + 1); setSelected(null); } };
  const reset = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]); setReview(false); };

  if (finished && !review) {
    const pct = Math.round((score / quizData.length) * 100);
    return (
      <div style={styles.content}><div style={styles.card}><div style={styles.scoreBox}>
        <div style={{ fontSize: 48 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚"}</div>
        <div style={styles.scoreBig}>{score}/{quizData.length}</div>
        <div style={{ fontSize: "clamp(16px, 3vw, 20px)", color: COLORS.accent, marginBottom: 16 }}>{pct}% சரி</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={styles.btn(COLORS.accent)} onClick={() => setReview(true)}>விளக்கம் பார்</button>
          <button style={styles.btn("#e74c3c")} onClick={reset}>மீண்டும்</button>
        </div>
      </div></div></div>
    );
  }

  if (review) {
    return (
      <div style={styles.content}>
        <button style={{ ...styles.btn(COLORS.card), marginBottom: 16 }} onClick={() => setReview(false)}>← திரும்பு</button>
        {answers.map((a, i) => (
          <div key={i} style={{ ...styles.card, borderColor: a.correct ? "#2ecc7155" : "#e74c3c55" }}>
            <div style={{ fontSize: "clamp(12px, 2vw, 14px)", color: COLORS.gold, marginBottom: 8, fontWeight: 700 }}>Q{i + 1}: {a.q}</div>
            <div style={{ fontSize: "clamp(11px, 1.8vw, 13px)", marginBottom: 4, color: a.correct ? COLORS.success : COLORS.error }}>
              {a.correct ? "✅ சரி" : "❌ தவறு"} — விடை: {quizData[i].opts[a.ans]}
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
        <span style={{ color: COLORS.accent, fontSize: "clamp(12px, 2vw, 14px)", fontWeight: 700 }}>வினா {current + 1}/{quizData.length}</span>
        <span style={{ color: COLORS.gold, fontSize: "clamp(12px, 2vw, 14px)", fontWeight: 700 }}>மதிப்பெண்: {score}</span>
      </div>
      <div style={styles.progress}><div style={styles.progressFill((current / quizData.length) * 100)} /></div>
      <div style={styles.card}>
        <div style={{ fontSize: "clamp(13px, 2.2vw, 16px)", color: "#fff", fontWeight: 700, marginBottom: 16, lineHeight: 1.6 }}>{q.q}</div>
        {q.opts.map((opt, idx) => (
          <div key={idx} style={styles.qCard(selected, q.ans === idx, q.ans, idx)} onClick={() => handleSelect(idx)}>
            <span style={{ marginRight: 8, color: COLORS.accent }}>{["அ", "ஆ", "இ", "ஈ"][idx]})</span>{opt}
          </div>
        ))}
        {selected !== null && (
          <div style={{ marginTop: 12 }}>
            <div style={styles.note}>💡 {q.exp}</div>
            <button style={{ ...styles.btn(COLORS.accent), marginTop: 12, width: "100%" }} onClick={next}>{current + 1 >= quizData.length ? "முடிவு" : "அடுத்து →"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function GameTab() {
  const [gameIdx, setGameIdx] = useState(0);
  const [btnStates, setBtnStates] = useState([null, null, null, null]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(false);
  const q = gameQuestions[gameIdx % gameQuestions.length];

  useState(() => {
    if (gameOver || answered) return;
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(interval);
          setBtnStates(q.opts.map((_, i) => i === q.ans ? "missed" : null));
          setLives(l => { if (l - 1 <= 0) setGameOver(true); return l - 1; });
          setAnswered(true);
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
    setBtnStates(q.opts.map((_, i) => i === q.ans ? "correct" : i === idx && idx !== q.ans ? "wrong" : null));
    if (idx === q.ans) setScore(s => s + 1);
    else setLives(l => { if (l - 1 <= 0) setGameOver(true); return l - 1; });
  };

  const nextQ = () => {
    if (gameIdx + 1 >= gameQuestions.length) { setGameOver(true); return; }
    setGameIdx(gi => gi + 1); setBtnStates([null, null, null, null]); setTimer(15); setAnswered(false);
  };

  const reset = () => { setGameIdx(0); setBtnStates([null, null, null, null]); setScore(0); setLives(3); setTimer(15); setGameOver(false); setAnswered(false); };

  if (gameOver) return (
    <div style={styles.content}><div style={styles.card}><div style={styles.scoreBox}>
      <div style={{ fontSize: 48 }}>{score >= 15 ? "🏆" : "🎯"}</div>
      <div style={styles.scoreBig}>{score}</div>
      <div style={{ color: COLORS.accent, marginBottom: 16 }}>மொத்த மதிப்பெண்கள்</div>
      <button style={styles.btn("#e74c3c")} onClick={reset}>மீண்டும்</button>
    </div></div></div>
  );

  return (
    <div style={styles.content}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <div>{[...Array(3)].map((_, i) => <span key={i} style={{ fontSize: 20 }}>{i < lives ? "❤️" : "🖤"}</span>)}</div>
        <span style={styles.timer(timer)}>⏱ {timer}s</span>
        <span style={{ color: COLORS.gold, fontWeight: 800 }}>🏆 {score}</span>
      </div>
      <div style={styles.progress}><div style={styles.progressFill((gameIdx / gameQuestions.length) * 100)} /></div>
      <div style={styles.card}>
        <div style={{ fontSize: "clamp(13px, 2.2vw, 16px)", color: "#fff", fontWeight: 700, marginBottom: 16, lineHeight: 1.6 }}>{q.q}</div>
        <div style={styles.gameGrid}>
          {q.opts.map((opt, idx) => (
            <button key={idx} style={styles.gameBtn(btnStates[idx])} onClick={() => handleAnswer(idx)}>
              <span style={{ display: "block", color: COLORS.gold, marginBottom: 2, fontSize: "clamp(11px, 1.5vw, 13px)" }}>{["அ", "ஆ", "இ", "ஈ"][idx]}</span>{opt}
            </button>
          ))}
        </div>
        {answered && (
          <div style={{ marginTop: 12 }}>
            <div style={styles.note}>💡 {q.exp}</div>
            <button style={{ ...styles.btn(COLORS.accent), marginTop: 12, width: "100%" }} onClick={nextQ}>{gameIdx + 1 >= gameQuestions.length ? "முடிவு" : "அடுத்து →"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Chapter2() {
  const [tab, setTab] = useState(0);
  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={styles.headerTitle}>📚 இயல் இரண்டு</h1>
            <p style={styles.headerSub}>நால்வகைக் குறுக்கங்கள் • 7th Std Tamil Term 1</p>
          </div>
          <div style={{ background: `${COLORS.accent}33`, border: `1px solid ${COLORS.accent}55`, borderRadius: 8, padding: "4px 10px", fontSize: "clamp(10px, 1.5vw, 12px)", color: COLORS.accent, fontWeight: 700 }}>Ch.2</div>
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
