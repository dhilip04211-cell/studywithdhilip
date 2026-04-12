import { useState } from "react";

const NOTES_DATA = {
  title: "தொழிற்பெயர்",
  subtitle: "Verbal Nouns (Infinitives in Tamil)",
  sections: [
    {
      id: "intro",
      heading: "தொழிற்பெயர் என்றால் என்ன?",
      icon: "🎯",
      content: "உழவர் செய்யும் தொழில் உழுதல். தையல்காரர் செய்யும் தொழில் தைத்தல். இத்தொடர்களில் உழுதல், தைத்தல் என்பன செயல்களின் பெயர்களாக அமைகின்றன. இவ்வாறு ஒரு செயலின் அல்லது வினையின் பெயராக அமைவது தொழிற்பெயர் எனப்படும்.",
      subsections: [
        {
          title: "தொழிற்பெயரின் சிறப்பு",
          content: "தொழிற்பெயர் எண், இடம், காலம், பால் ஆகியவற்றைக் காட்டாது. படர்க்கை இடத்தில் மட்டும் வரும்."
        },
        {
          title: "எடுத்துக்காட்டுகள்",
          content: "படித்தல், ஆடல், நடிப்பு, எழுதுதல், பொறுத்தல் — இவை அனைத்தும் தொழிற்பெயர்கள்."
        }
      ]
    },
    {
      id: "types",
      heading: "தொழிற்பெயரின் வகைகள்",
      icon: "📂",
      content: "தொழிற்பெயரை விகுதி பெற்ற தொழிற்பெயர், முதனிலைத் தொழிற்பெயர், முதனிலை திரிந்த தொழிற்பெயர் என வகைப்படுத்துவர்.",
      table: {
        headers: ["வகை", "விளக்கம்", "எடுத்துக்காட்டு"],
        rows: [
          ["விகுதி பெற்ற தொழிற்பெயர்", "வினைப்பகுதியுடன் தொழிற்பெயர் விகுதி சேர்ந்து வருவது", "நடத்தல், உண்ணல், வாழ்வு, வாழ்க்கை"],
          ["முதனிலைத் தொழிற்பெயர்", "ஏவல் ஒருமை வினையாக அமையும் வினைச்சொற்களின் பகுதியை மாற்றமின்றி தொழிற்பெயராக அமைவது", "இடி, கொதி"],
          ["முதனிலை திரிந்த தொழிற்பெயர்", "முதலெழுத்து நீண்டு திரிந்து தொழிற்பெயர்களாக மாறுவது", "பேறு, சூடு"]
        ]
      }
    },
    {
      id: "vikuthi",
      heading: "விகுதி பெற்ற தொழிற்பெயர்",
      icon: "🔤",
      content: "நடத்தல், உண்ணல், வாழ்வு, வாழ்க்கை ஆகிய பெயர்களைக் கவனியுங்கள். இவற்றில் நட, உண், வாழ் ஆகிய வினைப்பகுதிகள் தல், அல், வு, கை ஆகிய விகுதிகளோடு சேர்ந்து தொழிற்பெயர்களாக அமைகின்றன.",
      table: {
        headers: ["வினைப்பகுதி", "விகுதி", "தொழிற்பெயர்"],
        rows: [
          ["தரு", "தல்", "தருதல்"],
          ["கூறு", "அல்", "கூறல்"],
          ["ஆட்", "அம்", "ஆட்டம்"],
          ["விடு", "ஐ", "விலை"],
          ["வரு", "கை", "வருகை"],
          ["பார்", "வை", "பார்வை"],
          ["போ", "க்கு", "போக்கு"],
          ["நட்பு", "பு", "நட்பு"],
          ["மறை", "வு", "மறைவு"],
          ["மற", "தி", "மறதி"],
          ["உணர்", "ச்சி", "உணர்ச்சி"],
          ["கல்", "வி", "கல்வி"],
          ["செய்யா", "மை", "செய்யாமை"]
        ]
      }
    },
    {
      id: "muthal",
      heading: "முதனிலைத் தொழிற்பெயர்",
      icon: "🌱",
      content: "வானில் இடி இடித்தது. சோறு கொதி வந்தது. — இத்தொடர்களில் இடி, கொதி என்னும் சொற்களை கவனியுங்கள். இடித்தல், கொதித்தல் என்னும் சொற்களின் பகுதிகளாகும். இவ்வாறு ஏவல் ஒருமை வினையாக அமையும் வினைச்சொற்களின் பகுதியை எவ்வகை மாற்றமும் பெறாமல் தொழிற்பெயராக அமைவது முதனிலைத் தொழிற்பெயர் எனப்படும்.",
      subsections: [
        {
          title: "எடுத்துக்காட்டுகள்",
          content: "செல்லமாக ஓர் அடி அடித்தான் — 'அடி' முதனிலைத் தொழிற்பெயர். அறிஞர் அண்ணா தம் பேச்சால் புகழ் பெற்றார் — 'புகழ்' முதனிலைத் தொழிற்பெயர்."
        }
      ]
    },
    {
      id: "muthalthiri",
      heading: "முதனிலை திரிந்த தொழிற்பெயர்",
      icon: "🔄",
      content: "தமிழ் படிக்கும் பேறு பெற்றேன். உணவின் சூடு குறையவில்லை. — இத்தொடர்களில் பேறு, சூடு ஆகிய சொற்களைக் கவனியுங்கள். பெறு, சுடு என்னும் பகுதிகளின் முதலெழுத்து நீண்டு, பேறு, சூடு எனத் திரிந்து தொழிற்பெயர்களாக மாறி உள்ளன. இவ்வாறு முதனிலை திரிவதால் உருவாகும் தொழிற்பெயர் முதனிலை திரிந்த தொழிற்பெயர் எனப்படும்.",
      table: {
        headers: ["வினைப்பகுதி", "முதனிலை திரிந்த தொழிற்பெயர்"],
        rows: [
          ["விடு", "வீடு"],
          ["மின்", "மீன்"],
          ["கொள்", "கோள்"],
          ["உடன்படு", "உடன்பாடு"],
          ["பெறு", "பேறு"],
          ["சுடு", "சூடு"]
        ]
      }
    },
    {
      id: "comparison",
      heading: "மூன்று வகைகளின் ஒப்பீடு",
      icon: "⚖️",
      content: "மூன்று வகை தொழிற்பெயர்களையும் ஒரே இடத்தில் பார்க்கலாம்:",
      table: {
        headers: ["வகை", "அமைப்பு", "எடுத்துக்காட்டு", "குறிப்பு"],
        rows: [
          ["விகுதி பெற்ற தொழிற்பெயர்", "பகுதி + விகுதி", "தருதல், கல்வி, வருகை", "விகுதிகள்: தல், அல், அம், ஐ, கை, வை, கு, பு, வு, தி, சி, வி, மை"],
          ["முதனிலைத் தொழிற்பெயர்", "வினைப்பகுதி (மாற்றமின்றி)", "இடி, கொதி, அடி, புகழ்", "ஏவல் ஒருமை வினைப்பகுதியே தொழிற்பெயர்"],
          ["முதனிலை திரிந்த தொழிற்பெயர்", "முதலெழுத்து நீண்டு", "வீடு, மீன், பேறு, சூடு", "குறில் → நெடில் மாறுதல்"]
        ]
      }
    },
    {
      id: "vikuthilist",
      heading: "தொழிற்பெயர் விகுதிகள் (All Suffixes)",
      icon: "📋",
      content: "தொழிற்பெயர் விகுதிகளாக வருவன: தல், அல், அம், ஐ, கை, வை, கு, பு, வு, தி, சி, வி, மை போன்றவை.",
      table: {
        headers: ["விகுதி", "எடுத்துக்காட்டு", "விகுதி", "எடுத்துக்காட்டு"],
        rows: [
          ["தல்", "தருதல்", "கை", "வருகை"],
          ["அல்", "கூறல்", "வை", "பார்வை"],
          ["அம்", "ஆட்டம்", "கு", "போக்கு"],
          ["ஐ", "விலை", "பு", "நட்பு"],
          ["வு", "மறைவு", "தி", "மறதி"],
          ["சி", "உணர்ச்சி", "வி", "கல்வி"],
          ["மை", "செய்யாமை", "—", "—"]
        ]
      }
    }
  ]
};

const QUIZ_DATA = [
  { q: "தொழிற்பெயர் என்றால் என்ன?", options: ["பெயரைக் குறிக்கும் சொல்", "ஒரு செயலின் அல்லது வினையின் பெயராக அமைவது", "இடத்தைக் குறிக்கும் சொல்", "காலத்தைக் குறிக்கும் சொல்"], ans: 1, exp: "ஒரு செயலின் அல்லது வினையின் பெயராக அமைவது தொழிற்பெயர் எனப்படும். உழுதல், தைத்தல் போன்றவை தொழிற்பெயர்கள்." },
  { q: "பின்வருவனவற்றுள் விகுதி பெற்ற தொழிற்பெயர் எது?", options: ["எழுது", "பாடு", "படித்தல்", "நடி"], ans: 2, exp: "படித்தல் என்பது படி என்னும் வினைப்பகுதியுடன் தல் என்னும் விகுதி சேர்ந்து உருவான விகுதி பெற்ற தொழிற்பெயர்." },
  { q: "பின்வருவனவற்றுள் முதனிலை திரிந்த தொழிற்பெயர் எது?", options: ["ஊறு", "நடு", "விழு", "எழுதல்"], ans: 0, exp: "ஊறு என்பது முதலெழுத்து திரிந்து உருவான தொழிற்பெயர் ஆகும் — இது முதனிலை திரிந்த தொழிற்பெயர்." },
  { q: "தொழிற்பெயர் எத்தனை வகைப்படும்?", options: ["இரண்டு", "மூன்று", "நான்கு", "ஐந்து"], ans: 1, exp: "தொழிற்பெயரை விகுதி பெற்ற தொழிற்பெயர், முதனிலைத் தொழிற்பெயர், முதனிலை திரிந்த தொழிற்பெயர் என மூன்று வகையாகப் பிரிப்பர்." },
  { q: "தொழிற்பெயர் எந்த இடத்தில் மட்டும் வரும்?", options: ["தன்மை", "முன்னிலை", "படர்க்கை", "எல்லா இடங்களிலும்"], ans: 2, exp: "தொழிற்பெயர் எண், இடம், காலம், பால் காட்டாது. படர்க்கை இடத்தில் மட்டும் வரும்." },
  { q: "'வீடு' என்னும் சொல் எவ்வகை தொழிற்பெயர்?", options: ["விகுதி பெற்ற தொழிற்பெயர்", "முதனிலைத் தொழிற்பெயர்", "முதனிலை திரிந்த தொழிற்பெயர்", "திரிசொல்"], ans: 2, exp: "விடு என்னும் வினைப்பகுதியின் முதலெழுத்து நீண்டு வீடு எனத் திரிந்து தொழிற்பெயராக மாறுவதால் இது முதனிலை திரிந்த தொழிற்பெயர்." },
  { q: "'இடி' என்னும் சொல் தொடரில் எவ்வகை தொழிற்பெயர்?", options: ["விகுதி பெற்ற", "முதனிலை", "முதனிலை திரிந்த", "வினைப்பகுதி"], ans: 1, exp: "வானில் இடி இடித்தது என்னும் தொடரில் 'இடி' என்பது எவ்வகை மாற்றமும் பெறாமல் தொழிற்பெயராக அமைவதால் இது முதனிலைத் தொழிற்பெயர்." },
  { q: "கூறல் என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["தல்", "அல்", "வு", "கை"], ans: 1, exp: "கூறல் = கூறு (பகுதி) + அல் (விகுதி). எனவே 'அல்' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'ஆட்டம்' என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["தல்", "கை", "அம்", "வை"], ans: 2, exp: "ஆட்டம் = ஆட் (பகுதி) + அம் (விகுதி). எனவே 'அம்' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'வருகை' என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["வு", "கை", "தி", "சி"], ans: 1, exp: "வருகை = வரு (பகுதி) + கை (விகுதி). எனவே 'கை' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'பார்வை' என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["கை", "தல்", "வை", "அம்"], ans: 2, exp: "பார்வை = பார் (பகுதி) + வை (விகுதி). எனவே 'வை' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'போக்கு' என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["வு", "கு", "பு", "தி"], ans: 1, exp: "போக்கு = போ (பகுதி) + க்கு (விகுதி). எனவே 'கு' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'மறைவு' என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["பு", "கை", "வு", "தி"], ans: 2, exp: "மறைவு = மறை (பகுதி) + வு (விகுதி). எனவே 'வு' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'உணர்ச்சி' என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["தி", "சி", "வி", "மை"], ans: 1, exp: "உணர்ச்சி = உணர் (பகுதி) + ச்சி (விகுதி). எனவே 'சி' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'கல்வி' என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["கை", "வி", "தி", "சி"], ans: 1, exp: "கல்வி = கல் (பகுதி) + வி (விகுதி). எனவே 'வி' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'செய்யாமை' என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["தல்", "மை", "அல்", "வு"], ans: 1, exp: "செய்யாமை = செய்யா (பகுதி) + மை (விகுதி). எனவே 'மை' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'மீன்' என்னும் தொழிற்பெயர் எந்த வினைப்பகுதியிலிருந்து உருவானது?", options: ["மீ", "மின்", "மீண்", "மினு"], ans: 1, exp: "மின் என்னும் வினைப்பகுதியின் முதலெழுத்து நீண்டு மீன் என மாறியது. இது முதனிலை திரிந்த தொழிற்பெயர்." },
  { q: "'கோள்' என்னும் தொழிற்பெயர் எந்த வினைப்பகுதியிலிருந்து உருவானது?", options: ["கொல்", "கொள்", "கோ", "கொண்"], ans: 1, exp: "கொள் என்னும் வினைப்பகுதியின் முதலெழுத்து நீண்டு கோள் என மாறியது. இது முதனிலை திரிந்த தொழிற்பெயர்." },
  { q: "'உடன்பாடு' என்னும் தொழிற்பெயர் எந்த வினைப்பகுதியிலிருந்து உருவானது?", options: ["உடன்படு", "உடன்படி", "உடன்பண்", "உடன்வா"], ans: 0, exp: "உடன்படு என்னும் வினைப்பகுதியின் முதலெழுத்து திரிந்து உடன்பாடு என மாறியது. முதனிலை திரிந்த தொழிற்பெயர்." },
  { q: "வளர்தல், பேசுதல் — இவை எவ்வகைப் பெயர்கள்?", options: ["பண்புப்பெயர்", "தொழிற்பெயர்", "இடப்பெயர்", "காலப்பெயர்"], ans: 1, exp: "வளர்தல், பேசுதல் என்பன வினைகளின் பெயர்களாக அமைவதால் தொழிற்பெயர்கள் ஆகும்." },
  { q: "முதனிலை திரிந்த தொழிற்பெயர் என்றால் என்ன?", options: ["விகுதி சேர்ந்து வருவது", "முதலெழுத்து நீண்டு திரிவது", "பகுதியே மாறாமல் வருவது", "வேறு மொழியிலிருந்து வருவது"], ans: 1, exp: "வினைப்பகுதியின் முதலெழுத்து (குறில்) நீண்டு திரிவதால் உருவாகும் தொழிற்பெயர் முதனிலை திரிந்த தொழிற்பெயர் எனப்படும்." },
  { q: "முதனிலைத் தொழிற்பெயர் என்றால் என்ன?", options: ["விகுதி சேர்ந்து வருவது", "முதலெழுத்து திரிவது", "ஏவல் ஒருமை வினைப்பகுதியே மாறாமல் தொழிற்பெயராவது", "வேர்ச்சொல்"], ans: 2, exp: "ஏவல் ஒருமை வினையாக அமையும் வினைச்சொற்களின் பகுதி எவ்வகை மாற்றமும் பெறாமல் தொழிற்பெயராக அமைவது முதனிலைத் தொழிற்பெயர் எனப்படும்." },
  { q: "தொழிற்பெயர் எதைக் காட்டாது?", options: ["செயல்", "எண், இடம், காலம், பால்", "வினை", "பொருள்"], ans: 1, exp: "தொழிற்பெயர் எண், இடம், காலம், பால் ஆகியவற்றைக் காட்டாது என்பது இலக்கண விதி." },
  { q: "'மறதி' என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["சி", "தி", "வி", "மை"], ans: 1, exp: "மறதி = மற (பகுதி) + தி (விகுதி). எனவே 'தி' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'நட்பு' என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["பு", "வு", "கு", "தி"], ans: 0, exp: "நட்பு = நட் (பகுதி) + பு (விகுதி). எனவே 'பு' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'விலை' என்பதில் உள்ள தொழிற்பெயர் விகுதி எது?", options: ["கை", "ஐ", "வை", "தல்"], ans: 1, exp: "விலை = விடு (பகுதி) + ஐ (விகுதி) → விலை. எனவே 'ஐ' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'தருதல்' என்பதில் வினைப்பகுதி எது?", options: ["தல்", "தரு", "ருத", "தரு+தல்"], ans: 1, exp: "தருதல் = தரு (பகுதி) + தல் (விகுதி). வினைப்பகுதி தரு ஆகும்." },
  { q: "பேறு என்பது எந்த வினைப்பகுதியிலிருந்து உருவானது?", options: ["பேர்", "பெறு", "பேசு", "பெரு"], ans: 1, exp: "பெறு என்னும் வினைப்பகுதியின் முதலெழுத்து (பெ) நீண்டு 'பே' ஆகி பேறு என மாறியது. முதனிலை திரிந்த தொழிற்பெயர்." },
  { q: "சூடு என்பது எந்த வினைப்பகுதியிலிருந்து உருவானது?", options: ["சூர்", "சோர்", "சுடு", "சூழ்"], ans: 2, exp: "சுடு என்னும் வினைப்பகுதியின் முதலெழுத்து (சு) நீண்டு 'சூ' ஆகி சூடு என மாறியது. முதனிலை திரிந்த தொழிற்பெயர்." },
  { q: "'அடி' என்னும் சொல் தொடரில் எவ்வகை தொழிற்பெயர்?", options: ["விகுதி பெற்ற", "முதனிலை", "முதனிலை திரிந்த", "திரிசொல்"], ans: 1, exp: "'செல்லமாக ஓர் அடி அடித்தான்' என்னும் தொடரில் அடி என்பது எவ்வகை மாற்றமும் பெறாமல் தொழிற்பெயராக வருவதால் முதனிலைத் தொழிற்பெயர்." },
  { q: "தொழிற்பெயர் எத்தனை விகுதிகளைப் பெறும்?", options: ["5", "10", "13 அல்லது அதிகம்", "7"], ans: 2, exp: "தல், அல், அம், ஐ, கை, வை, கு, பு, வு, தி, சி, வி, மை போன்ற 13 க்கும் மேற்பட்ட விகுதிகளை தொழிற்பெயர் பெறும்." },
  { q: "உழுதல் என்பதில் 'தல்' எந்த வகை?", options: ["பகுதி", "சந்தி", "விகுதி", "இடைநிலை"], ans: 2, exp: "உழுதல் = உழு (பகுதி) + தல் (விகுதி). தல் என்பது தொழிற்பெயர் விகுதி ஆகும்." },
  { q: "தொழிற்பெயரை யாரிடம் கேட்டு அறியலாம் என பாடம் கூறுகிறது?", options: ["நண்பர்களிடம்", "கோட்டோவியம் பற்றிய செய்திகளை பள்ளி ஓவிய ஆசிரியரிடம்", "தாயிடம்", "மாமாவிடம்"], ans: 1, exp: "பாடப்பகுதியில் கோட்டோவியம் பற்றிய செய்திகளை உங்கள் பள்ளி ஓவிய ஆசிரியரிடம் கேட்டு அறிக என்று கூறப்பட்டுள்ளது." },
  { q: "தொழிற்பெயர் எந்த இலக்கண வகையில் சேர்க்கப்படும்?", options: ["எழுத்து இலக்கணம்", "சொல் இலக்கணம்", "பொருள் இலக்கணம்", "யாப்பு இலக்கணம்"], ans: 1, exp: "தொழிற்பெயர் சொல் இலக்கணத்தின் ஒரு பகுதியாகும். பெயர்ச்சொல்லின் ஒரு வகையே தொழிற்பெயர்." },
  { q: "உழவர் செய்யும் தொழில் எது என்று பாடம் கூறுகிறது?", options: ["உழவு", "உழுதல்", "உழு", "உழவி"], ans: 1, exp: "உழவர் செய்யும் தொழில் உழுதல் — இது தொழிற்பெயருக்கு பாடத்தில் தரப்பட்ட முதல் எடுத்துக்காட்டு." },
  { q: "தையல்காரர் செய்யும் தொழில் பெயர் என்ன?", options: ["தை", "தைத்தல்", "தையல்", "தைத்து"], ans: 1, exp: "தையல்காரர் செய்யும் தொழில் தைத்தல் — இது பாடத்தில் தரப்பட்ட இரண்டாவது எடுத்துக்காட்டு." },
  { q: "'கொதி' என்னும் சொல் தொடரில் எவ்வகை தொழிற்பெயர்?", options: ["விகுதி பெற்ற", "முதனிலை", "முதனிலை திரிந்த", "பகாப்பதம்"], ans: 1, exp: "சோறு கொதி வந்தது என்னும் தொடரில் கொதி என்பது கொதித்தல் என்னும் சொல்லின் பகுதி. மாற்றமின்றி தொழிற்பெயராக வருவதால் முதனிலைத் தொழிற்பெயர்." },
  { q: "பேசும் ஓவியங்கள் பற்றி வகுப்பறையில் என்ன செய்யச் சொல்கிறது?", options: ["படிக்கச் சொல்கிறது", "பேசச் சொல்கிறது", "எழுதச் சொல்கிறது", "வரையச் சொல்கிறது"], ans: 1, exp: "நீங்கள் கண்டு வியந்த ஓவியங்கள் மற்றும் சிற்பங்கள் பற்றி வகுப்பறையில் பேசுக என்று பாடம் கூறுகிறது." },
  { q: "வளர்தல் என்பது எவ்வகை தொழிற்பெயர்?", options: ["முதனிலை", "முதனிலை திரிந்த", "விகுதி பெற்ற", "பகாப்பதம்"], ans: 2, exp: "வளர்தல் = வளர் (பகுதி) + தல் (விகுதி). வினைப்பகுதியுடன் தல் விகுதி சேர்ந்ததால் விகுதி பெற்ற தொழிற்பெயர்." },
  { q: "பேசுதல் என்பது எவ்வகை தொழிற்பெயர்?", options: ["முதனிலை", "முதனிலை திரிந்த", "விகுதி பெற்ற", "பகாப்பதம்"], ans: 2, exp: "பேசுதல் = பேசு (பகுதி) + தல் (விகுதி). விகுதி பெற்ற தொழிற்பெயர்." },
  { q: "எழுது என்னும் பகாப்பதத்திலிருந்து உருவான தொழிற்பெயர் எது?", options: ["எழுதல்", "எழுதுதல்", "எழுதிட", "எழுதல்-எழுதுதல் இரண்டும்"], ans: 3, exp: "எழுதுதல் என்பது (எழுது + தல்) விகுதி பெற்ற தொழிற்பெயர். ஆனால் 'எழுதல்' என்பதும் சில சமயம் வழங்கும்." },
  { q: "தொழிற்பெயர் அமைப்பில் முதலில் வருவது எது?", options: ["விகுதி", "வினைப்பகுதி", "இடைநிலை", "சந்தி"], ans: 1, exp: "தொழிற்பெயர் அமைப்பில் முதலில் வினைப்பகுதி வரும். அதன் பிறகு தொழிற்பெயர் விகுதி சேரும்." },
  { q: "'ஆடல்' என்பதில் தொழிற்பெயர் விகுதி எது?", options: ["தல்", "அல்", "ஆட்", "டல்"], ans: 1, exp: "ஆடல் = ஆட் (பகுதி) + அல் (விகுதி). 'அல்' என்பது தொழிற்பெயர் விகுதி." },
  { q: "'நடிப்பு' என்பது எவ்வகை தொழிற்பெயர்?", options: ["முதனிலை", "முதனிலை திரிந்த", "விகுதி பெற்ற", "பகுபதம்"], ans: 2, exp: "நடிப்பு = நடி (பகுதி) + ப்பு (விகுதி). விகுதி பெற்ற தொழிற்பெயர்." },
  { q: "'புகழ்' என்னும் சொல் எந்த வகை தொழிற்பெயர்?", options: ["விகுதி பெற்ற", "முதனிலை", "முதனிலை திரிந்த", "வடசொல்"], ans: 1, exp: "'அறிஞர் அண்ணா தம் பேச்சால் புகழ் பெற்றார்' என்னும் தொடரில் 'புகழ்' என்பது எவ்வகை மாற்றமும் பெறாமல் தொழிற்பெயராக வருவதால் முதனிலைத் தொழிற்பெயர்." },
  { q: "தொழிற்பெயர் தொடரில் எங்கு வரும்?", options: ["எழுவாயாக", "பயனிலையாக", "படர்க்கை இடத்தில்", "முன்னிலை இடத்தில்"], ans: 2, exp: "தொழிற்பெயர் படர்க்கை இடத்தில் மட்டும் வரும்." },
  { q: "பொறுத்தல் என்பது எவ்வகை தொழிற்பெயர்?", options: ["முதனிலை", "முதனிலை திரிந்த", "விகுதி பெற்ற", "பகாப்பதம்"], ans: 2, exp: "பொறுத்தல் = பொறு (பகுதி) + த்தல் (விகுதி). விகுதி பெற்ற தொழிற்பெயர்." },
  { q: "தொழிற்பெயர் எதன் வகைகளில் ஒன்று?", options: ["வினைச்சொல்", "இடைச்சொல்", "பெயர்ச்சொல்", "உரிச்சொல்"], ans: 2, exp: "தொழிற்பெயர் என்பது பெயர்ச்சொல்லின் ஒரு வகையாகும். வினையின் பெயராக அமைவதே தொழிற்பெயர்." },
  { q: "தொழிற்பெயரில் காலம் காட்டப்படுமா?", options: ["ஆமாம்", "இல்லை", "சில நேரம் மட்டும்", "எதிர்காலம் மட்டும்"], ans: 1, exp: "தொழிற்பெயர் எண், இடம், காலம், பால் ஆகியவற்றைக் காட்டாது என்பது இலக்கண விதி." },
  { q: "விகுதி பெற்ற தொழிற்பெயரில் வினைப்பகுதிக்கு என்ன சேர்க்கப்படுகிறது?", options: ["இடைநிலை", "சந்தி", "தொழிற்பெயர் விகுதி", "சாரியை"], ans: 2, exp: "விகுதி பெற்ற தொழிற்பெயரில் வினைப்பகுதியுடன் தொழிற்பெயர் விகுதி (தல், அல், வு, கை போன்றவை) சேர்க்கப்படுகிறது." },
  { q: "முதனிலை திரிந்த தொழிற்பெயரில் என்ன மாறுகிறது?", options: ["இறுதி எழுத்து", "முதல் எழுத்து (குறில் → நெடில்)", "விகுதி", "பகுதி மட்டும்"], ans: 1, exp: "முதனிலை திரிந்த தொழிற்பெயரில் வினைப்பகுதியின் முதல் எழுத்து குறிலாக இருந்தால் அது நெடிலாக மாறுகிறது." }
];

const GAME_LEVELS = [
  { level: 1, name: "தொடக்கம்", qCount: 5, time: 30, color: "#10b981" },
  { level: 2, name: "இடைநிலை", qCount: 8, time: 25, color: "#f59e0b" },
  { level: 3, name: "மேம்பட்ட", qCount: 10, time: 20, color: "#ef4444" }
];

export default function Chapter6() {
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

  const startGame = (level) => {
    const shuffled = [...QUIZ_DATA].sort(() => Math.random() - 0.5).slice(0, level.qCount);
    setGameLevel(level);
    setGameQuestions(shuffled);
    setGameIdx(0);
    setGameScore(0);
    setGameSelected(null);
    setGameTimeLeft(level.time);
    setGameState("playing");
    tick(level.time, shuffled, 0, 0, level);
  };

  const tick = (time, questions, idx, score, level) => {
    if (gameTimer) clearInterval(gameTimer);
    let t = time;
    const iv = setInterval(() => {
      t--;
      setGameTimeLeft(t);
      if (t <= 0) { clearInterval(iv); go(questions, idx, score, level, null); }
    }, 1000);
    setGameTimer(iv);
  };

  const pick = (i) => {
    if (gameSelected !== null) return;
    if (gameTimer) clearInterval(gameTimer);
    setGameSelected(i);
    const correct = gameQuestions[gameIdx].ans === i;
    const ns = correct ? gameScore + 1 : gameScore;
    setGameScore(ns);
    setTimeout(() => go(gameQuestions, gameIdx, ns, gameLevel, i), 1500);
  };

  const go = (questions, idx, score, level, sel) => {
    const ni = idx + 1;
    if (ni >= questions.length) setGameState("result");
    else { setGameIdx(ni); setGameSelected(null); tick(level?.time || 25, questions, ni, score, level); }
  };

  const handleQ = (i) => {
    if (quizSelected !== null) return;
    setQuizSelected(i);
    if (QUIZ_DATA[quizIdx].ans === i) setQuizScore(s => s + 1);
    else setWrongAnswers(w => [...w, quizIdx]);
  };

  const nextQ = () => {
    if (quizIdx + 1 >= QUIZ_DATA.length) setQuizDone(true);
    else { setQuizIdx(i => i + 1); setQuizSelected(null); }
  };

  const resetQ = () => { setQuizIdx(0); setQuizSelected(null); setQuizScore(0); setQuizDone(false); setWrongAnswers([]); };
  const pct = Math.round((quizScore / QUIZ_DATA.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)", fontFamily: "'Segoe UI', sans-serif", color: "#e2e8f0" }}>
      <div style={{ background: "linear-gradient(90deg, #d97706, #b45309, #f59e0b)", padding: "20px 16px", textAlign: "center", boxShadow: "0 4px 20px rgba(217,119,6,0.4)" }}>
        <div style={{ fontSize: "clamp(18px,4vw,26px)", fontWeight: 900, color: "#fff" }}>📚 Chapter 6 — Term 2</div>
        <div style={{ fontSize: "clamp(13px,3vw,18px)", color: "#fef3c7", marginTop: 4 }}>தொழிற்பெயர் · Verbal Nouns</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "16px 12px", flexWrap: "wrap" }}>
        {[["notes","📝 Notes"],["quiz","❓ Quiz"],["game","🎮 Game"]].map(([id,label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "10px 24px", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 700, fontSize: "clamp(13px,2.5vw,15px)", background: activeTab===id ? "linear-gradient(90deg,#d97706,#b45309)" : "rgba(255,255,255,0.08)", color: activeTab===id ? "#fff" : "#94a3b8", boxShadow: activeTab===id ? "0 4px 15px rgba(217,119,6,0.4)" : "none", transition: "all 0.3s" }}>{label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 12px 40px" }}>

        {activeTab === "notes" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ display: "inline-block", background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.3)", borderRadius: 16, padding: "12px 24px" }}>
                <div style={{ fontSize: 32 }}>🎯</div>
                <div style={{ fontSize: "clamp(16px,3vw,20px)", fontWeight: 800, color: "#fbbf24" }}>தொழிற்பெயர் — Verbal Nouns</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>7th Grade Tamil, Term 2 — Chapter 6</div>
              </div>
            </div>

            {/* Visual Mind Map */}
            <div style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <div style={{ fontWeight: 800, color: "#fbbf24", marginBottom: 14, fontSize: 15, textAlign: "center" }}>🗺️ தொழிற்பெயர் வகை வரைபடம்</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
                {[
                  ["🔤","விகுதி பெற்ற","வினைப்பகுதி + விகுதி","படித்தல், கல்வி, வருகை","#d97706"],
                  ["🌱","முதனிலை","மாற்றமின்றி வினைப்பகுதியே","இடி, கொதி, அடி","#059669"],
                  ["🔄","முதனிலை திரிந்த","முதலெழுத்து குறில் → நெடில்","வீடு, மீன், பேறு, சூடு","#7c3aed"]
                ].map(([icon,name,rule,ex,bg]) => (
                  <div key={name} style={{ background: bg+"18", border: `1px solid ${bg}44`, borderRadius: 12, padding: 14 }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontWeight: 800, color: "#fff", fontSize: 14 }}>{name}</div>
                    <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{rule}</div>
                    <div style={{ color: bg === "#d97706" ? "#fbbf24" : bg === "#059669" ? "#34d399" : "#c084fc", fontSize: 12, marginTop: 6, fontStyle: "italic" }}>எ.கா: {ex}</div>
                  </div>
                ))}
              </div>
            </div>

            {NOTES_DATA.sections.map((sec) => (
              <div key={sec.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{sec.icon}</span>
                  <div style={{ fontWeight: 800, fontSize: "clamp(15px,3vw,18px)", color: "#fbbf24" }}>{sec.heading}</div>
                </div>
                <div style={{ color: "#cbd5e1", lineHeight: 1.8, marginBottom: 12, fontSize: "clamp(13px,2.5vw,15px)" }}>{sec.content}</div>
                {sec.subsections && sec.subsections.map((sub, si) => (
                  <div key={si} style={{ background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 10, padding: 12, marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, color: "#fbbf24", marginBottom: 6, fontSize: 14 }}>💡 {sub.title}</div>
                    <div style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7 }}>{sub.content}</div>
                  </div>
                ))}
                {sec.table && (
                  <div style={{ overflowX: "auto", marginTop: 12 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "clamp(11px,2vw,13px)" }}>
                      <thead>
                        <tr style={{ background: "linear-gradient(90deg,#d97706,#b45309)" }}>
                          {sec.table.headers.map((h,i) => <th key={i} style={{ padding: "9px 10px", textAlign: "left", color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row, ri) => (
                          <tr key={ri} style={{ background: ri%2===0?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            {row.map((cell, ci) => <td key={ci} style={{ padding: "8px 10px", color: ci===0?"#fbbf24":"#cbd5e1", fontWeight: ci===0?700:400 }}>{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}

            {/* Suffix Quick Reference */}
            <div style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontWeight: 800, color: "#fbbf24", marginBottom: 14, fontSize: 15 }}>⚡ தொழிற்பெயர் விகுதிகள் — Quick Reference</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["தல்","அல்","அம்","ஐ","கை","வை","கு","பு","வு","தி","சி","வி","மை"].map(v => (
                  <span key={v} style={{ background: "rgba(217,119,6,0.2)", border: "1px solid rgba(217,119,6,0.4)", borderRadius: 8, padding: "6px 14px", fontWeight: 700, color: "#fbbf24", fontSize: 14 }}>{v}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "quiz" && !quizDone && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>கேள்வி {quizIdx+1}/{QUIZ_DATA.length}</div>
              <div style={{ fontWeight: 700, color: "#fbbf24" }}>மதிப்பெண்: {quizScore}</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 6, marginBottom: 20, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${((quizIdx+1)/QUIZ_DATA.length)*100}%`, background: "linear-gradient(90deg,#d97706,#f59e0b)", transition: "width 0.3s" }} />
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
                return <button key={i} onClick={() => handleQ(i)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 18px", textAlign: "left", color: col, fontSize: "clamp(13px,2.5vw,15px)", cursor: quizSelected!==null?"default":"pointer", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ background: "rgba(255,255,255,0.1)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{["அ","ஆ","இ","ஈ"][i]}</span>{opt}
                </button>;
              })}
            </div>
            {quizSelected !== null && (
              <div>
                <div style={{ background: "rgba(217,119,6,0.15)", border: "1px solid rgba(217,119,6,0.3)", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, color: "#fbbf24", marginBottom: 6 }}>💡 விளக்கம்</div>
                  <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7 }}>{QUIZ_DATA[quizIdx].exp}</div>
                </div>
                <button onClick={nextQ} style={{ width: "100%", padding: 14, background: "linear-gradient(90deg,#d97706,#b45309)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                  {quizIdx+1>=QUIZ_DATA.length ? "முடிவு காண →" : "அடுத்த கேள்வி →"}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "quiz" && quizDone && (
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{pct>=80?"🏆":pct>=60?"👍":"📖"}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#fbbf24", marginBottom: 8 }}>Quiz முடிந்தது!</div>
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
            <button onClick={resetQ} style={{ padding: "14px 32px", background: "linear-gradient(90deg,#d97706,#b45309)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>மீண்டும் செய்</button>
          </div>
        )}

        {activeTab === "game" && gameState === "select" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48 }}>🎮</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fbbf24", marginTop: 8 }}>Quiz Game</div>
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

        {activeTab === "game" && gameState === "playing" && gameQuestions.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ color: "#94a3b8" }}>கேள்வி {gameIdx+1}/{gameQuestions.length}</div>
              <div style={{ fontWeight: 700, color: gameTimeLeft<=10?"#ef4444":"#fbbf24", fontSize: 18 }}>⏱ {gameTimeLeft}s</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 6, marginBottom: 16, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(gameTimeLeft/(gameLevel?.time||25))*100}%`, background: gameTimeLeft<=10?"#ef4444":"#d97706", transition: "width 1s linear" }} />
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
                return <button key={i} onClick={() => pick(i)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 10px", color: "#e2e8f0", fontSize: "clamp(12px,2.5vw,14px)", cursor: "pointer", textAlign: "center" }}>{opt}</button>;
              })}
            </div>
          </div>
        )}

        {activeTab === "game" && gameState === "result" && (
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#fbbf24", marginBottom: 8 }}>Game Over!</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", marginBottom: 8 }}>{gameScore}/{gameQuestions.length}</div>
            <div style={{ color: "#94a3b8", marginBottom: 24 }}>நிலை: {gameLevel?.name}</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => startGame(gameLevel)} style={{ padding: "12px 24px", background: "linear-gradient(90deg,#d97706,#b45309)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, cursor: "pointer" }}>மீண்டும்</button>
              <button onClick={() => setGameState("select")} style={{ padding: "12px 24px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, color: "#fff", fontWeight: 700, cursor: "pointer" }}>நிலை மாற்று</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
