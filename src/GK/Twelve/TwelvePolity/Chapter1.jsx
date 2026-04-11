import { useState, useEffect, useCallback } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const NOTES_SECTIONS = [
  {
    id: "intro",
    title: "1.1 அரசமைப்பின் பொருள், பணிகள் மற்றும் முக்கியத்துவம்",
    subtitle: "Meaning, Functions & Importance of Constitution",
    content: [
      {
        type: "para",
        text: "காலனி ஆட்சிக்காலத்தில் உருவான நமது தேசியத்தன்மை அரசியல் விடுதலைக்காக மட்டுமல்லாமல் பல்வேறு பகுதிகளின் ஒருங்கிணைப்பு, அரசமைப்புமையமாதல் மற்றும் மக்களாட்சிமயம் ஆகியவற்றுக்காகவும் போராடி வந்துள்ளது."
      },
      {
        type: "para",
        text: "ஒரு அரசமைப்பின் மிக முக்கியச் செயல்பாடு என்பது அந்த அரசின் குடிமக்கள் அனைவரையும் ஒருங்கிணைக்கக்கூடிய அடிப்படை விதிகளை வழங்குவதுதான். ஒரு அரசு அமைக்கப்பட்டு, அது ஆட்சி செய்வதற்குத் தேவையான விதிகளைக் கொண்டதே அரசமைப்பு ஆகும்."
      },
      {
        type: "table",
        title: "அரசமைப்பின் முக்கிய பணிகள் | Key Functions of Constitution",
        headers: ["பணி (Function)", "விளக்கம் (Explanation)"],
        rows: [
          ["ஒருங்கிணைப்பு", "அனைத்து குடிமக்களையும் இணைக்கும் அடிப்படை விதிகள் வழங்குதல்"],
          ["அதிகாரப் பகிர்வு", "சட்டமன்றம், நிர்வாகம், நீதித்துறை இடையே அதிகாரங்களை பகிர்தல்"],
          ["உரிமைகள் பாதுகாப்பு", "குடிமக்களின் அடிப்படை உரிமைகளை பாதுகாத்தல்"],
          ["கட்டமைப்பு வழங்குதல்", "மத்திய-மாநில உறவுகளுக்கான சட்டகத்தை உருவாக்குதல்"],
          ["அடையாளம் வெளிப்படுத்தல்", "நாட்டின் மக்களின் அடிப்படை அடையாளங்களை வெளிப்படுத்துதல்"],
          ["அரசாங்க அதிகாரம்", "சமூக விருப்பங்களை நிறைவேற்ற அரசாங்கத்திற்கு அதிகாரம் வழங்குதல்"]
        ]
      },
      {
        type: "highlight",
        label: "மதச்சார்பு அரசு என்றால் என்ன? (Theocratic State)",
        text: "மதச்சார்பினமை கோட்பாட்டினை பின்பற்றாத அரசு மதச்சார்பு அரசு எனப்படும். உதாரணங்கள்: பாகிஸ்தான், வாடிகன் நகரம். இந்தியா மதச்சார்பற்ற நாடு — அனைத்து மதங்களும் சமம்."
      },
      {
        type: "para",
        text: "காலனியாட்சிக்காலத்தில் இந்தியா சாசனங்கள் (Charters), ஆட்சிக்குழு சட்டங்கள் (Council Acts), காலனியாட்சிக்கால இந்திய அரசாங்கச் சட்டம் (Government of India Act) ஆகியவற்றை அடிப்படையாகக் கொண்டே ஆளப்பட்டது."
      },
      {
        type: "para",
        text: "பொதுவாக்கெடுப்பு (Referendum): சட்டமன்றங்களில் விவாதிக்கப்பட்டு நிறைவேற்றப்படுவதற்கு மாறாக ஒன்று அல்லது பல கேள்விகளின் தொகுப்பின் மீது வாக்காளர்களின் ஒப்புதல் பெற நேரடி வாக்கெடுப்பு நடத்துவது பொதுவாக்கெடுப்பு ஆகும். இந்திய அரசமைப்பு திருத்தங்களில் ஒன்றிற்குக்கூட இதுவரை பொதுவாக்கெடுப்பு விடப்பட்டதில்லை."
      }
    ]
  },
  {
    id: "sources",
    title: "1.2 இந்திய அரசமைப்பின் மூல ஆதாரங்கள்",
    subtitle: "Sources of Indian Constitution",
    content: [
      {
        type: "para",
        text: "இந்திய அரசாங்கச் சட்டம், 1935-லிருந்து கூட்டாட்சி விதிகள், ஆளுநர் பதவி, நீதித்துறை, பொதுத் தேர்வாணையங்கள், நெருக்கடிகால விதிகள், நிர்வாக விவரங்கள் ஆகியன எடுத்துக்கொள்ளப்பட்டன."
      },
      {
        type: "table",
        title: "அரசமைப்பின் மூல ஆதாரங்கள் | Sources of the Constitution",
        headers: ["நாடு (Country)", "எடுத்துக்கொள்ளப்பட்ட அம்சங்கள் (Features Borrowed)"],
        rows: [
          ["பிரிட்டன்", "நாடாளுமன்ற அரசு, ஒற்றைக் குடியுரிமை, சட்டத்தின் ஆட்சி, நாடாளுமன்ற செயல்முறைகள், இடைக்கால தடையாணைகள்"],
          ["அமெரிக்க அரசமைப்பு", "அடிப்படை உரிமைகள், நீதி சீராய்வு, குடியரசுத்தலைவர் மீதான பதவிநீக்க தீர்மானம், உச்ச/உயர் நீதிமன்ற நீதிபதிகள் பதவி நீக்கம் முறை"],
          ["அயர்லாந்து", "அரசின் வழிகாட்டு நெறிமுறைகள் (DPSP)"],
          ["கனடா", "வலுவான மத்திய அரசுடன் கூடிய கூட்டாட்சி, பொதுப் பட்டியல், மாநில ஆளுநர் நியமனம், உச்சநீதிமன்றத்தின் அறிவுரை அதிகார வரம்பு"],
          ["ஆஸ்திரேலியா", "வணிகம், வர்த்தக சுதந்திரம், நாடாளுமன்றத்தின் ஈரவைகளின் கூட்டுக்கூட்டம்"],
          ["ஜெர்மனி வெய்மர் அரசமைப்பு", "நெருக்கடிநிலை காலத்தில் அடிப்படை உரிமைகள் பறிப்பு"],
          ["சோவியத் யூனியன்", "அடிப்படைக் கடமைகள், முகப்புரையில் சமூக, பொருளாதார, அரசியல் நீதியின் மாண்புகள் (42வது திருத்தத்தில் உறுதிபடுத்தப்பட்டது)"],
          ["பிரான்சு", "குடியரசு, முகப்புரையில் சுதந்திரம், சமத்துவம், சகோதரத்துவம்"],
          ["தென் ஆப்பிரிக்கா", "அரசமைப்புத் திருத்தமுறை, மாநிலங்களவை உறுப்பினர்கள் தேர்வு"]
        ]
      },
      {
        type: "highlight",
        label: "நடைமுறைக்கு வந்த தேதி",
        text: "இறுதிபடுத்தப்பட்ட, திருத்தப்பட்ட வரைவு 1950 ஜனவரி 26 அன்று நடைமுறைக்கு வந்தது."
      }
    ]
  },
  {
    id: "assembly",
    title: "அரசமைப்பு நிர்ணயசபை",
    subtitle: "Constituent Assembly",
    content: [
      {
        type: "para",
        text: "அரசமைப்பு நிர்ணயசபையின் முதல் கூட்டம் 9 டிசம்பர் 1946 அன்று கூடியது. பாகிஸ்தான் பிரிவினைக்குப் பின்னர் மீதமுள்ள இந்தியாவுக்கான அரசமைப்பு நிர்ணயச் சபை 14 ஆகஸ்ட் 1947 அன்று மீண்டும் கூடியது."
      },
      {
        type: "table",
        title: "அரசமைப்பு நிர்ணயசபை — முக்கிய தகவல்கள் | Constituent Assembly Key Facts",
        headers: ["விவரம்", "தகவல்"],
        rows: [
          ["முதல் கூட்டம்", "9 டிசம்பர் 1946, புதுதில்லி அரசமைப்பு அரங்கு"],
          ["தற்காலிக தலைவர்", "டாக்டர் சச்சிதானந்த சின்ஹா"],
          ["கோரிக்கை வழிகாட்டி", "ஆச்சார்ய ஜே.பி. கிருபாளினி"],
          ["மாகாணங்களில் இருந்து உறுப்பினர்கள்", "292 உறுப்பினர்கள்"],
          ["சுதேச அரசுகளிலிருந்து", "93 உறுப்பினர்கள்"],
          ["கேபினட் மிஷன் திட்டம்", "பிரிட்டானிய அமைச்சரவைக் குழு முன்மொழிந்த அடிப்படையில் அமைந்தது"],
          ["விகிதம்", "10 லட்சத்திற்கு ஒருவர் என்ற விகிதம்"],
          ["அரசமைப்பு கையெழுத்திட்ட நாள்", "26.11.1949 — 284 உறுப்பினர்கள்"],
          ["இறுதி ஒப்புதல் கூட்டம்", "24.01.1950 — டாக்டர் ராஜேந்திர பிரசாத் தலைமை"],
          ["மொத்த விவாத தொகுதிகள்", "12 தொகுதிகள் (9 டிசம்பர் 1946 – 24 ஜனவரி 1950)"]
        ]
      },
      {
        type: "table",
        title: "விவாத தொகுதிகள் | Debate Volumes",
        headers: ["தொகுதி", "காலம்"],
        rows: [
          ["தொகுதி 1", "9 டிசம்பர் – 23 டிசம்பர் 1946"],
          ["தொகுதி 2", "20 ஜனவரி – 25 ஜனவரி 1947"],
          ["தொகுதி 3", "28 ஏப்ரல் – 2 மே 1947"],
          ["தொகுதி 4", "14 ஜூலை – 31 ஜூலை 1947"],
          ["தொகுதி 5", "14 ஆகஸ்ட் – 30 ஆகஸ்ட் 1947"],
          ["தொகுதி 6", "27 ஜனவரி 1948"],
          ["தொகுதி 7", "4 நவம்பர் 1948 – 8 ஜனவரி 1949"],
          ["தொகுதி 8", "16 மே – 16 ஜூன் 1949"],
          ["தொகுதி 9", "30 ஜூலை – 18 செப்டம்பர் 1949"],
          ["தொகுதி 10", "6 அக்டோபர் – 17 அக்டோபர் 1949"],
          ["தொகுதி 11", "14 நவம்பர் – 26 நவம்பர் 1949"],
          ["தொகுதி 12", "24 ஜனவரி 1950"]
        ]
      }
    ]
  },
  {
    id: "features",
    title: "1.3 இந்திய அரசமைப்பின் சிறப்பியல்புகள்",
    subtitle: "Special Features of Indian Constitution",
    content: [
      {
        type: "table",
        title: "சிறப்பியல்புகள் | Special Features",
        headers: ["சிறப்பியல்பு (Feature)", "விளக்கம் (Explanation)"],
        rows: [
          ["நீளமான எழுதப்பட்ட அரசமைப்பு", "உலகிலேயே நீளமான எழுதப்பட்ட அரசமைப்பு. மாநிலங்கள், மத்திய அரசு மற்றும் அவற்றுக்கு இடையிலான உறவுகள் குறித்த விரிவான விதிகளை கொண்டுள்ளது."],
          ["இறுக்கம் & நெகிழ்வுத் தன்மை", "அமலாக்கச் செயல்முறைகளின் அடிப்படையில் இறுக்கமும் நெகிழ்வும் கொண்டதாக இந்திய அரசமைப்பு அழைக்கப்படலாம்."],
          ["இறையாண்மை", "தனது உள்நாட்டு, வெளிநாட்டு விவகாரங்களை எந்த வெளிநாட்டின் தலையீடு இன்றி நிர்வகிப்பது."],
          ["சமதர்மம் (Socialism)", "42-வது திருத்தச்சட்டம் மூலம் இணைக்கப்பட்டது. சமதர்மம், முதலாளித்துவம் இணைந்த கலப்புப் பொருளாதார முறை."],
          ["மதச்சார்பின்மை (Secularism)", "இந்தியாவில் அரசு மதம் என ஒன்றில்லை; அனைத்து மதங்களும் சமம். 42வது திருத்தம் மூலம் சேர்க்கப்பட்டது."],
          ["மக்களாட்சி (Democracy)", "வயதுவந்த அனைவருக்கும் வாக்குரிமை வழங்கப்பட்டு தேர்ந்தெடுக்கப்படும் மக்கள் பிரதிநிதிகள் மூலம் மக்களே ஆள்கிறார்கள்."],
          ["குடியரசு (Republic)", "முடியரசு மூலமாக அல்லாமல் தேர்தல் மூலமாக அரசின் தலைவர் தேர்ந்தெடுக்கப்படுகிறார்."],
          ["நாடாளுமன்ற ஆட்சி முறை", "அமைச்சரவை குழு செயல்பாடுகளை நாடாளுமன்றம் கட்டுப்படுத்துகிறது."],
          ["ஒற்றைக் குடியுரிமை", "ஒன்றிய அரசு வழங்கும் குடியுரிமையே அனைத்து மாநிலங்களுக்குமானது."],
          ["வயது வந்தோர் வாக்குரிமை", "'ஒரு நபர், ஒரு வாக்குரிமை' — 18 வயது நிறைவடைந்தோர். சாதி, மதம், பால், இனம் அடிப்படையில் பாகுபாடு இல்லை."],
          ["சுதந்திரமான நீதி அமைப்பு", "நிர்வாகத் தலையீடோ அல்லது சட்டமன்றங்களின் தலையீடோ இல்லாமல் இயங்கும் தன்னாட்சி அமைப்பு."],
          ["கூட்டாட்சி அல்லது ஒற்றையாட்சி", "சிதைக்க முடியாத ஒன்றியமும் (மத்திய அரசும்) சிதைக்கத்தக்க மாநிலங்களும் கொண்ட ஆட்சி முறை."],
          ["நீதி சீராய்வு", "நாடாளுமன்றத்தில் இயற்றப்பட்ட சட்டம் அரசமைப்பின் அடிப்படை தத்துவத்திற்கு முரணாக இருந்தால், அதை செல்லாததாக்கும் அதிகாரம்."]
        ]
      },
      {
        type: "table",
        title: "அடிப்படை உரிமைகள் | Fundamental Rights (Part III)",
        headers: ["உரிமை", "விளக்கம்"],
        rows: [
          ["சமத்துவத்துக்கான உரிமை", "அனைத்து குடிமக்களுக்கும் சமத்துவம்"],
          ["சுதந்திரத்துக்கான உரிமை", "பேச்சு, கூட்டம் கொள்ளும் சுதந்திரம் உட்பட"],
          ["சுரண்டலுக்கு எதிரான உரிமை", "மனித கடத்தல், குழந்தை தொழிலாளர் தடை"],
          ["மத வழிபாட்டுக்கான உரிமை", "எந்த மதத்தையும் பின்பற்றும் உரிமை"],
          ["கல்வி, பண்பாட்டு உரிமை", "சிறுபான்மையினரின் கல்வி மற்றும் பண்பாட்டு உரிமை"],
          ["அரசமைப்புப்படி நிவாரணம் கோரும் உரிமை", "உறுப்பு 32 — உச்ச நீதிமன்றத்தை நேரடியாக நாடும் உரிமை"]
        ]
      },
      {
        type: "highlight",
        label: "சொத்து உரிமை (Right to Property)",
        text: "தொடக்கத்தில் சொத்து உரிமை அடிப்படை உரிமையாக இருந்தது. 44-வது திருத்தச்சட்டம் (1978) சொத்து உரிமையை அடிப்படை உரிமையிலிருந்து நீக்கி உறுப்பு 300(அ)-வாக சட்ட உரிமையாக மாற்றியது."
      },
      {
        type: "highlight",
        label: "கல்வி உரிமை — 86வது திருத்தம் (2002)",
        text: "இந்திய அரசமைப்பு உறுப்பு 21அ-வில், 6 முதல் 14 வயதுவரையான அனைத்துச் சிறார்களுக்கும் இலவச, கட்டாயக் கல்வி வழங்குவதை அடிப்படை உரிமையாக இணைத்துள்ளது. சிறார் இலவச கட்டாயக் கல்வி சட்டம் 2009 இதன் அடிப்படையில் இயற்றப்பட்டது."
      },
      {
        type: "table",
        title: "அடிப்படைக் கடமைகள் | Fundamental Duties (42வது திருத்தம், Part IVA, Article 51A)",
        headers: ["எண்", "கடமை"],
        rows: [
          ["அ", "அரசமைப்பிற்கு கீழ்ப்படிந்து தேசியக் கொடி, தேசிய கீதம் ஆகியவற்றிற்கு மரியாதை அளிக்க வேண்டும்"],
          ["ஆ", "விடுதலை போராட்டத்தின் போது பின்பற்றப்பட்ட உன்னதமான மாண்புகளை ஏற்று பின்பற்ற வேண்டும்"],
          ["இ", "இந்தியாவில் இறையாண்மை, ஒற்றுமை, ஒருமைப்பாடு ஆகியவற்றைப் பாதுகாக்க வேண்டும்"],
          ["ஈ", "தேவையான காலங்களில் நாட்டைப் பாதுகாக்கவும் சேவைபுரியவும் முன்வர வேண்டும்"],
          ["உ", "மதம், மொழி, சாதி வேறுபாடுகளைக் கடந்து ஒருமைப்பாட்டினையும் சகோதரத்துவத்தினையும் உருவாக்க வேண்டும்; பெண்களின் மாண்பிற்குப் பாதிப்பு ஏற்படுத்தும் நடவடிக்கைகளைக் கைவிட வேண்டும்"],
          ["ஊ", "நமது பன்மைத்துவப் பண்பாட்டின் வளமான மரபினை மதித்துப் பாதுகாக்க வேண்டும்"],
          ["எ", "வனங்கள், ஏரிகள், ஆறுகள், வன உயிரினங்கள் உள்ளிட்ட இயற்கை வளங்களைப் பாதுகாக்க வேண்டும்"],
          ["ஏ", "அறிவியல் ஆர்வம், மனிதநேயம், தேடல் நெறி, சீர்த்திருத்தம் ஆகியவற்றை உருவாக்கிக் கொள்ள வேண்டும்"],
          ["ஐ", "பொதுச் சொத்துகளை சேதப்படுத்தாமல் பாதுகாக்க வேண்டும்"],
          ["ஒ", "தனிநபர் மற்றும் கூட்டு செயல்பாடுகளில் சிறப்புத்திறன் பெற்று முன்னேற வேண்டும்"],
          ["ஓ", "6-14 வயதுக்குட்பட்ட சிறார்கள் கல்வி கற்பதற்கான வாய்ப்புகளை பெற்றோர் வழங்க வேண்டும்"]
        ]
      }
    ]
  },
  {
    id: "parliament",
    title: "1.4 இந்தியாவில் நாடாளுமன்ற மக்களாட்சி",
    subtitle: "Parliamentary Democracy in India",
    content: [
      {
        type: "para",
        text: "உறுப்பு 79-இன் கீழ் இந்திய ஒன்றியத்தின் நாடாளுமன்றம் குடியரசுத்தலைவர் மற்றும் ஈரவைகளைக் கொண்டது ஆகும். ஈரவைகள் — மாநிலங்களவை (மேலவை) மற்றும் மக்களவை (கீழவை)."
      },
      {
        type: "table",
        title: "நாடாளுமன்றம் — விரிவான தகவல்கள் | Parliament Details",
        headers: ["அமைப்பு", "விவரம்"],
        rows: [
          ["மாநிலங்களவை — மொத்த உறுப்பினர்கள்", "250 (238 தேர்ந்தெடுக்கப்பட்டோர் + 12 குடியரசுத்தலைவர் நியமனம்)"],
          ["மாநிலங்களவை — தேர்வு", "238 உறுப்பினர்கள் மாநிலங்கள் மற்றும் ஒன்றிய ஆளுகைக்குட்பட்ட பகுதி சட்டமன்றங்கள் மூலம்"],
          ["மாநிலங்களவை — காலம்", "நிரந்தரமான அமைப்பு, கலைக்கப்பட முடியாது; உறுப்பினர் காலம் 6 ஆண்டுகள்"],
          ["மாநிலங்களவை — சுழற்சி", "மொத்த உறுப்பினர்களில் 1/3 பங்கினர் ஒவ்வொரு 2 ஆண்டுக்கும் தேர்வு"],
          ["மக்களவை — மொத்த உறுப்பினர்கள்", "545 (543 தேர்ந்தெடுக்கப்பட்டோர் + 2 குடியரசுத்தலைவர் நியமனம் — ஆங்கிலோ-இந்திய சமுதாயம்)"],
          ["மக்களவை — காலம்", "5 ஆண்டுகள்; குடியரசுத்தலைவர் கலைக்கும் அதிகாரம் பெற்றுள்ளார்"],
          ["குடியரசுத்தலைவர் தேர்வு", "நாடாளுமன்றத்தின் ஈரவை உறுப்பினர்கள் மற்றும் மாநில/ஒன்றிய ஆளுகைக்குட்பட்ட பகுதி சட்டமன்றங்களின் உறுப்பினர்கள் வாக்காளர்கள்"]
        ]
      },
      {
        type: "table",
        title: "நாடாளுமன்ற முறை vs குடியரசுத்தலைவர் முறை | Parliamentary vs Presidential System",
        headers: ["அம்சம்", "நாடாளுமன்ற முறை (இந்தியா)", "குடியரசுத்தலைவர் முறை (அமெரிக்கா)"],
        rows: [
          ["நிர்வாக தலைவர்", "பிரதமர் (Prime Minister)", "குடியரசுத்தலைவர் (President)"],
          ["பொறுப்புணர்வு", "நாடாளுமன்றத்திற்கு பொறுப்பு", "நாடாளுமன்றத்திற்கு நேரடிப் பொறுப்பு இல்லை"],
          ["நிர்வாக காலம்", "நாடாளுமன்ற பெரும்பான்மை இருக்கும் வரை", "நிலையான 4 ஆண்டு காலம்"],
          ["தலைவர் தேர்வு", "மறைமுக தேர்வு", "நேரடி மக்கள் தேர்வு"],
          ["உதாரணம்", "இந்தியா, பிரிட்டன்", "அமெரிக்க ஐக்கிய மாநிலங்கள்"]
        ]
      },
      {
        type: "table",
        title: "தமிழ்நாடு மாநிலச் சட்டமன்றம் | Tamil Nadu State Legislature",
        headers: ["விவரம்", "தகவல்"],
        rows: [
          ["மொத்த உறுப்பினர்கள்", "234"],
          ["பொது தொகுதிகளிலிருந்து", "189 உறுப்பினர்கள்"],
          ["தனித் தொகுதிகளிலிருந்து", "45 உறுப்பினர்கள்"],
          ["முதல் கூட்டத் தொடர் தொடக்கம்", "3.5.1952 (முதல் பொதுத் தேர்தலைத் தொடர்ந்து)"],
          ["ஆங்கிலோ-இந்திய பிரதிநிதி", "உறுப்பு 333-இன் கீழ் ஒருவர் ஆளுநரால் நியமிக்கப்படுகிறார்"],
          ["16வது தமிழக சட்டமன்றம்", "07.05.2021 அன்று அமைக்கப்பட்டது (06.04.2021 தேர்தல்)"]
        ]
      },
      {
        type: "highlight",
        label: "பொதுக் கணக்குக்குழு (Public Accounts Committee)",
        text: "மக்களவை உறுப்பினர்களிலிருந்து ஒருவர் பொது கணக்குக் குழுத்தலைவராக மக்களவைத் தலைவரால் நியமிக்கப்படுகிறார். 1967-68ல் முதன்முறையாக எதிர்க்கட்சி உறுப்பினர் நியமிக்கப்பட்டார். 1950 ஜனவரி முதல் 2018 ஏப்ரல் வரை 1596 அறிக்கைகளை தாக்கல் செய்துள்ளது."
      },
      {
        type: "highlight",
        label: "உறுப்பு 370 — ஜம்மு-காஷ்மீர்",
        text: "அரசமைப்பு உறுப்பு 370 என்பது ஜம்மு - காஷ்மீர் பகுதிக்கு சிறப்பு தன்னாட்சி தகுதி வழங்குவது ஆகும். இந்திய அரசு 5 ஆகஸ்டு 2019 அன்று ஜம்மு காஷ்மீருக்கு வழங்கப்பட்ட சிறப்பு தகுதியை ரத்துசெய்தது."
      },
      {
        type: "highlight",
        label: "42வது திருத்தம் — 'குறு அரசமைப்பு'",
        text: "42வது திருத்தச்சட்டம் முந்நாள் பிரதமர் இந்திரா காந்தி 1976-இல் தேசிய அவசரநிலைக் காலத்தில் கொண்டு வந்தார். 'இறையாண்மை கொண்ட குடியரசு' என்பதை 'இறையாண்மை, சமதர்மம், மதச்சார்பற்ற மக்களாட்சி குடியரசு' என மாற்றியது."
      },
      {
        type: "highlight",
        label: "சங்கரலிங்கனார் (Shankaralingnar)",
        text: "காந்திய வாதியும் தமிழ் வீரருமான சங்கரலிங்கனார் (பிறப்பு: 1895, விருதுநகர்) 1956 ஜூலை 27 முதல் மதராஸ் மாகாணத்தை 'தமிழகம்' என பெயர் மாற்றக் கோரி உண்ணாவிரதம் தொடங்கினார். 76ஆம் நாளான 1956 அக்டோபர் 13 அன்று உயிர் நீத்தார். மதராஸ் மாநிலம் 14 ஜனவரி 1969 அன்று தமிழ்நாடு என பெயர் மாற்றம் பெற்றது."
      }
    ]
  },
  {
    id: "terms",
    title: "கலைச்சொற்கள் & முக்கிய சட்டங்கள்",
    subtitle: "Key Terms & Important Laws",
    content: [
      {
        type: "table",
        title: "கலைச்சொற்கள் | Key Legal Terms",
        headers: ["சொல்", "விளக்கம்"],
        rows: [
          ["சட்டம் (Act)", "ஒரு சட்ட முன்வரைவு நாடாளுமன்றத்தில் ஈரவைகளிலும் ஏற்கப்பட்டு குடியரசுத்தலைவர் ஒப்புதல் பெறும்போது சட்டம் எனப்படுகிறது"],
          ["உட்பிரிவு (Clause)", "ஒரு சட்ட முன்வரைவில் வரிசை எண்ணிடப்பட்ட பத்தி"],
          ["தீர்மானம் (Motion/Resolution)", "நாடாளுமன்றத்தின் தீர்வு, நடவடிக்கை, கருத்து கோரி எந்த உறுப்பினராலும் முன்வைக்கப்படுவது"],
          ["பதவி பிராமணம் (Oath)", "புதிதாக தேர்ந்தெடுக்கப்பட்ட நாடாளுமன்ற உறுப்பினர்கள் அரசமைப்பிற்கும் நாட்டின் இறையாண்மை மற்றும் ஒருமைப்பாட்டிற்கும் உறுதி மொழி ஏற்றுக்கொள்வது"],
          ["நிலைக்குழு (Standing Committee)", "ஒவ்வொரு ஆண்டும் அவையால் தேர்ந்தெடுக்கப்படும் அல்லது அவைத் தலைவரால் நியமிக்கப்படும் குழு"],
          ["அரசு (State)", "மத்திய அரசாங்கம், நாடாளுமன்றம், மாநில அரசாங்கங்கள், மாநிலச் சட்டமன்றங்கள், உள்ளூர் அதிகார அமைப்புகள் இவை அனைத்தையும் உள்ளடக்கியது"],
          ["பொதுவாக்கெடுப்பு (Referendum)", "வாக்காளர்களின் ஒப்புதல் பெற நேரடி வாக்கெடுப்பு நடத்துவது"],
          ["தேர்வுக்குழு (Select Committee)", "வெஸ்ட்மினிஸ்டர் நாடாளுமன்ற மக்களாட்சி முறையிலிருந்து பிறந்தது; குறிப்பிட்ட சட்ட முன்வரைவை ஆய்வுசெய்ய நியமிக்கப்படும் குழு"],
          ["நீதி சீராய்வு (Judicial Review)", "நாடாளுமன்றத்தில் இயற்றப்பட்ட சட்டம் அரசமைப்பிற்கு முரணானால் அதை செல்லாததாக்கும் அதிகாரம்"]
        ]
      },
      {
        type: "table",
        title: "முக்கிய திருத்தங்கள் | Important Amendments",
        headers: ["திருத்தம்", "ஆண்டு", "முக்கிய மாற்றம்"],
        rows: [
          ["42வது திருத்தம்", "1976", "சமதர்மம், மதச்சார்பின்மை, ஒருமைப்பாடு சேர்ப்பு; அடிப்படைக் கடமைகள் சேர்ப்பு"],
          ["44வது திருத்தம்", "1978", "சொத்து உரிமையை அடிப்படை உரிமையிலிருந்து நீக்கி உறுப்பு 300(அ)-வாக்கியது"],
          ["86வது திருத்தம்", "2002", "6-14 வயது சிறார்களுக்கு கட்டாயக் கல்வி அடிப்படை உரிமையாக (உறுப்பு 21அ)"]
        ]
      }
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "இந்திய அரசமைப்புச் சட்ட வரைவுக் குழுத்தலைவர் யார்?",
    questionEn: "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
    options: ["இராஜேந்திர பிரசாத்", "சி.இராஜாஜி", "தேச் பகதூர் சப்புரு", "பி.ஆர். அம்பேத்கர்"],
    answer: 3,
    explanation: "டாக்டர் பி.ஆர். அம்பேத்கர் இந்திய அரசமைப்பின் வரைவுக் குழுத்தலைவராக இருந்தார். அவர் 'இந்திய அரசமைப்பின் தந்தை' என அழைக்கப்படுகிறார்.",
    explanationEn: "Dr. B.R. Ambedkar was the Chairman of the Drafting Committee and is called the 'Father of the Indian Constitution'."
  },
  {
    id: 2,
    question: "அரசமைப்பு நிர்ணயசபையின் முதல் கூட்டம் எப்போது கூடியது?",
    questionEn: "When did the first meeting of the Constituent Assembly take place?",
    options: ["9 டிசம்பர் 1946", "15 ஆகஸ்ட் 1947", "26 நவம்பர் 1949", "26 ஜனவரி 1950"],
    answer: 0,
    explanation: "அரசமைப்பு நிர்ணயசபையின் முதல் கூட்டம் 9 டிசம்பர் 1946 அன்று புதுதில்லி அரசமைப்பு அரங்கில் 11 மணி அளவில் கூடியது.",
    explanationEn: "The first meeting of the Constituent Assembly was held on December 9, 1946 at the Constitution Hall, New Delhi."
  },
  {
    id: 3,
    question: "284 உறுப்பினர்கள் அரசமைப்பினை ஏற்று கையொப்பமிட்ட நாள் எது?",
    questionEn: "On which date did 284 members sign and adopt the Constitution?",
    options: ["9 டிசம்பர் 1946", "14 ஆகஸ்ட் 1947", "26 நவம்பர் 1949", "26 ஜனவரி 1950"],
    answer: 2,
    explanation: "284 உறுப்பினர்கள் 26.11.1949 அன்று அரசமைப்பினை ஏற்று கையொப்பமிட்டு அரசமைப்பை நிறைவேற்றினர்.",
    explanationEn: "284 members signed and adopted the Constitution on November 26, 1949."
  },
  {
    id: 4,
    question: "இந்திய அரசமைப்பு எந்த நாட்டிலிருந்து 'வழிகாட்டு நெறிமுறைகள்' (DPSP) பெற்றது?",
    questionEn: "India borrowed 'Directive Principles of State Policy' from which country?",
    options: ["பிரிட்டன்", "அமெரிக்கா", "அயர்லாந்து", "கனடா"],
    answer: 2,
    explanation: "அரசின் வழிகாட்டு நெறிமுறைகள் (DPSP) அயர்லாந்து அரசமைப்பிலிருந்து எடுத்துக்கொள்ளப்பட்டது.",
    explanationEn: "Directive Principles of State Policy (DPSP) was borrowed from the Irish Constitution."
  },
  {
    id: 5,
    question: "இந்திய அரசமைப்பில் 'அடிப்படைக் கடமைகள்' எந்த திருத்தம் மூலம் சேர்க்கப்பட்டன?",
    questionEn: "Through which amendment were 'Fundamental Duties' added to the Indian Constitution?",
    options: ["42வது திருத்தம்", "44வது திருத்தம்", "86வது திருத்தம்", "73வது திருத்தம்"],
    answer: 0,
    explanation: "42-வது திருத்தத்தின் வாயிலாக அடிப்படைக் கடமைகள் சேர்க்கப்பட்டுள்ளன. இவை அரசமைப்பு பகுதி IVஅ உறுப்பு 51அ-வில் இடம் பெற்றுள்ளன.",
    explanationEn: "Fundamental Duties were added through the 42nd Constitutional Amendment and are in Part IVA, Article 51A."
  },
  {
    id: 6,
    question: "சொத்து உரிமையை அடிப்படை உரிமையிலிருந்து நீக்கியது எந்த திருத்தம்?",
    questionEn: "Which amendment removed the Right to Property from Fundamental Rights?",
    options: ["42வது திருத்தம்", "44வது திருத்தம்", "86வது திருத்தம்", "73வது திருத்தம்"],
    answer: 1,
    explanation: "44-வது திருத்தச்சட்டம் (1978) சொத்து உரிமையை அடிப்படை உரிமையிலிருந்து நீக்கிவிட்டு உறுப்பு 300(அ)-வாக சட்ட உரிமையாகக் கருதப்படுகிறது.",
    explanationEn: "The 44th Amendment Act (1978) removed the Right to Property from Fundamental Rights and made it a legal right under Article 300(A)."
  },
  {
    id: 7,
    question: "மாநிலங்களவையில் குடியரசுத்தலைவர் நியமிக்கும் உறுப்பினர்களின் எண்ணிக்கை?",
    questionEn: "How many members does the President nominate to the Rajya Sabha?",
    options: ["6", "10", "12", "14"],
    answer: 2,
    explanation: "மாநிலங்களவையில் 238 உறுப்பினர்கள் தேர்ந்தெடுக்கப்படுவார்கள். இதைத்தவிர 12 உறுப்பினர்களை குடியரசுத்தலைவர் நியமனம் செய்வார். மொத்தம் 250.",
    explanationEn: "The President nominates 12 members to the Rajya Sabha. Total strength is 250 (238 elected + 12 nominated)."
  },
  {
    id: 8,
    question: "மதராஸ் மாநிலம் தமிழ்நாடு என பெயர் மாற்றம் பெற்ற ஆண்டு?",
    questionEn: "In which year was Madras State renamed as Tamil Nadu?",
    options: ["1967", "1968", "1969", "1971"],
    answer: 2,
    explanation: "மதராஸ் மாநில பெயர்மாற்றச் சட்டம் 14 ஜனவரி 1969 ஆண்டு தமிழ்நாடு என பெயர் மாற்றம் செய்யப்பட்டது. தியாகி சங்கரலிங்கனார் இதற்காக 76 நாட்கள் உண்ணாவிரதம் இருந்து உயிர் நீத்தார்.",
    explanationEn: "The Madras State Renaming Act renamed it as Tamil Nadu on January 14, 1969. Martyr Shankaralingnar fasted for 76 days demanding this."
  },
  {
    id: 9,
    question: "'கல்வி உரிமை' எந்த திருத்தம் மூலம் அடிப்படை உரிமையாக அங்கீகரிக்கப்பட்டது?",
    questionEn: "Through which amendment was 'Right to Education' made a Fundamental Right?",
    options: ["42வது திருத்தம்", "73வது திருத்தம்", "86வது திருத்தம்", "44வது திருத்தம்"],
    answer: 2,
    explanation: "இந்திய அரசமைப்பின் 86-வது திருத்தம் (2002) உறுப்பு 21அ-வில் 6 முதல் 14 வயதுவரையான சிறார்களுக்கு இலவச, கட்டாயக் கல்வி அடிப்படை உரிமையாக இணைத்தது.",
    explanationEn: "The 86th Amendment (2002) added Article 21A making free and compulsory education for children aged 6-14 a Fundamental Right."
  },
  {
    id: 10,
    question: "இந்திய அரசமைப்பு நிர்ணயசபையில் விவாதங்கள் எத்தனை தொகுதிகளில் தொகுக்கப்பட்டுள்ளன?",
    questionEn: "The debates of the Constituent Assembly were compiled into how many volumes?",
    options: ["8", "10", "12", "14"],
    answer: 2,
    explanation: "9 டிசம்பர் 1946 முதல் 24 ஜனவரி 1950 வரை அரசமைப்பு நிர்ணயச்சபையின் விவாதங்களின் தொகுப்பு 12 தொகுதிகளைக் கொண்டதாகும்.",
    explanationEn: "The debates of the Constituent Assembly from December 9, 1946 to January 24, 1950 were compiled into 12 volumes."
  },
  {
    id: 11,
    question: "இந்திய அரசமைப்பு 'அடிப்படை உரிமைகள்' எந்தப் பகுதியில் உள்ளன?",
    questionEn: "In which Part of the Indian Constitution are 'Fundamental Rights' found?",
    options: ["பகுதி II", "பகுதி III", "பகுதி IV", "பகுதி IVA"],
    answer: 1,
    explanation: "இந்திய அரசமைப்பு, பகுதி III-ல் அடிப்படை உரிமைகளுக்கான பிரிவுகள் குறிப்பிடப்பட்டுள்ளன. அடிப்படை உரிமைகள் ஆறு தலைப்புகளில் வகைப்படுத்தப்பட்டுள்ளன.",
    explanationEn: "Fundamental Rights are found in Part III of the Indian Constitution. They are classified under 6 heads."
  },
  {
    id: 12,
    question: "'வழிகாட்டு நெறிகள்' (DPSP) எந்தப் பகுதியில் உள்ளன?",
    questionEn: "In which Part of the Constitution are Directive Principles of State Policy (DPSP)?",
    options: ["பகுதி II", "பகுதி III", "பகுதி IV", "பகுதி IVA"],
    answer: 2,
    explanation: "அரசாட்சி தொடர்பாக அரசு கடைபிடிக்க வேண்டிய வழிகாட்டு நெறிகள் இந்திய அரசமைப்பின் நான்காவது பகுதியில் (Part IV) இடம் பெற்றுள்ளன.",
    explanationEn: "Directive Principles of State Policy are found in Part IV of the Indian Constitution."
  },
  {
    id: 13,
    question: "தமிழ்நாடு மாநிலச் சட்டமன்றத்தின் மொத்த உறுப்பினர்கள் எத்தனை?",
    questionEn: "What is the total number of members in the Tamil Nadu State Legislature?",
    options: ["189", "200", "234", "250"],
    answer: 2,
    explanation: "தமிழ்நாடு மாநிலச் சட்டமன்றம் 234 உறுப்பினர்களைக் கொண்டது. 189 பொது தொகுதிகளிலிருந்தும் 45 தனித் தொகுதிகளிலிருந்தும் தேர்ந்தெடுக்கப்படுகின்றனர்.",
    explanationEn: "Tamil Nadu State Legislature has 234 members — 189 from general constituencies and 45 from reserved constituencies."
  },
  {
    id: 14,
    question: "மக்களவையின் மொத்த உறுப்பினர்கள் எத்தனை?",
    questionEn: "What is the total strength of Lok Sabha?",
    options: ["543", "545", "550", "560"],
    answer: 1,
    explanation: "மக்களவையின் மொத்த உறுப்பினர்கள் 545. 543 உறுப்பினர்கள் தேர்ந்தெடுக்கப்பட்ட மக்கள் பிரதிநிதிகள். இரண்டு உறுப்பினர்கள் குடியரசுத்தலைவரால் நியமிக்கப்படும் ஆங்கிலோ-இந்திய சமுதாயத்தினர்.",
    explanationEn: "Total strength of Lok Sabha is 545 — 543 elected + 2 Anglo-Indian nominated by the President."
  },
  {
    id: 15,
    question: "42வது திருத்தசட்டம் எந்த ஆண்டு கொண்டுவரப்பட்டது? யாரால்?",
    questionEn: "Which year was the 42nd Constitutional Amendment enacted and by whom?",
    options: ["1975 — ராஜீவ் காந்தி", "1976 — இந்திரா காந்தி", "1977 — மொரார்ஜி தேசாய்", "1978 — இந்திரா காந்தி"],
    answer: 1,
    explanation: "42-வது திருத்தச்சட்டம் முந்நாள் பிரதமர் இந்திரா காந்தி 1976-இல் தேசிய அவசரநிலைக் காலத்தில் கொண்டு வந்தார். இது 'குறு அரசமைப்பு' என அழைக்கப்படுகிறது.",
    explanationEn: "The 42nd Amendment was enacted in 1976 during the National Emergency by Prime Minister Indira Gandhi. It is called the 'Mini Constitution'."
  },
  {
    id: 16,
    question: "இந்திய அரசமைப்பில் 'நீதி சீராய்வு' (Judicial Review) எந்த நாட்டிலிருந்து எடுக்கப்பட்டது?",
    questionEn: "From which country was 'Judicial Review' borrowed for the Indian Constitution?",
    options: ["பிரிட்டன்", "அமெரிக்கா", "கனடா", "ஆஸ்திரேலியா"],
    answer: 1,
    explanation: "நீதி சீராய்வு (Judicial Review) அமெரிக்க அரசமைப்பிலிருந்து எடுத்துக்கொள்ளப்பட்டது. நாடாளுமன்றத்தில் இயற்றப்பட்ட சட்டம் அரசமைப்பிற்கு முரணானால் நீதிமன்றம் அதை செல்லாததாக்கலாம்.",
    explanationEn: "Judicial Review was borrowed from the US Constitution. Courts can nullify laws passed by Parliament if they violate the Constitution."
  },
  {
    id: 17,
    question: "வயது வந்தோர் வாக்குரிமை (Adult Suffrage) என்றால் என்ன வயது?",
    questionEn: "What is the voting age under Adult Suffrage in India?",
    options: ["16 வயது", "18 வயது", "21 வயது", "25 வயது"],
    answer: 1,
    explanation: "'ஒரு நபர், ஒரு வாக்குரிமை' எனும் கோட்பாட்டின் அடிப்படையில் 18 வயது நிறைவடைந்தோர் தேர்தலில் வாக்களிக்கும் தகுதி பெறுகிறார்கள்.",
    explanationEn: "Based on the principle of 'One Person, One Vote', those who have completed 18 years of age are eligible to vote."
  },
  {
    id: 18,
    question: "உறுப்பு 370 எதனுடன் தொடர்புடையது?",
    questionEn: "Article 370 is related to which state/region?",
    options: ["அசாம்", "நாகாலாந்து", "ஜம்மு - காஷ்மீர்", "மணிப்பூர்"],
    answer: 2,
    explanation: "அரசமைப்பு உறுப்பு 370 என்பது ஜம்மு - காஷ்மீர் பகுதிக்கு சிறப்பு தன்னாட்சி தகுதி வழங்குவது ஆகும். 5 ஆகஸ்டு 2019 அன்று இந்திய அரசு இதை ரத்துசெய்தது.",
    explanationEn: "Article 370 provided special autonomous status to Jammu & Kashmir. It was revoked by the Indian government on August 5, 2019."
  },
  {
    id: 19,
    question: "இந்திய அரசமைப்பு எந்த நாட்டிலிருந்து 'கூட்டாட்சி' (Federation) கொள்கையை பெற்றது?",
    questionEn: "From which country did India borrow the Federal System concept?",
    options: ["அமெரிக்கா", "ஆஸ்திரேலியா", "கனடா", "ஜெர்மனி"],
    answer: 2,
    explanation: "கனடாவிலிருந்து ஒரு வலுவான மத்திய அரசுடன் கூடிய கூட்டாட்சி, மத்திய அரசிடம் பொதுப் பட்டியல், மத்திய அரசால் மாநில ஆளுநர் நியமனம் ஆகிய அம்சங்கள் எடுக்கப்பட்டன.",
    explanationEn: "From Canada, India borrowed the Federal System with a strong Centre, residuary powers with Centre, and appointment of State Governors by the Centre."
  },
  {
    id: 20,
    question: "சங்கரலிங்கனார் எத்தனை நாட்கள் உண்ணாவிரதம் இருந்து உயிர் நீத்தார்?",
    questionEn: "For how many days did Shankaralingnar fast unto death?",
    options: ["66 நாட்கள்", "72 நாட்கள்", "76 நாட்கள்", "86 நாட்கள்"],
    answer: 2,
    explanation: "சங்கரலிங்கனார் 1956 ஜூலை 27 அன்று உண்ணாவிரதம் தொடங்கி 76ஆம் நாளான 1956 அக்டோபர் 13 அன்று உயிர் நீத்தார். மதராஸ் மாகாணத்தை தமிழகம் என பெயர் மாற்றக் கோரி 12 கோரிக்கைகளை வலியுறுத்தினார்.",
    explanationEn: "Shankaralingnar fasted for 76 days from July 27, 1956 and passed away on October 13, 1956, demanding the renaming of Madras Province as Tamil Nadu along with 12 other demands."
  }
];

// ─── STYLES ─────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Noto+Sans+Tamil:wght@300;400;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

  :root {
    --bg: #0a0c10;
    --surface: #111520;
    --surface2: #161c2a;
    --border: #1e2a42;
    --accent: #c8922a;
    --accent2: #e8b84b;
    --accent3: #7ec8e3;
    --text: #e8e0d0;
    --text2: #a09880;
    --green: #4caf7d;
    --red: #e05252;
    --tab-h: 60px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Noto Sans Tamil', 'Rajdhani', sans-serif;
    min-height: 100vh;
  }

  .app {
    max-width: 960px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* HEADER */
  .header {
    background: linear-gradient(135deg, #0d1117 0%, #1a1f30 50%, #0d1117 100%);
    border-bottom: 1px solid var(--accent);
    padding: 18px 20px 14px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 30px rgba(200,146,42,0.15);
  }

  .header-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: 13px;
    color: var(--accent);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .header-sub {
    font-size: 11px;
    color: var(--text2);
    letter-spacing: 1px;
  }

  /* TABS */
  .tabs {
    display: flex;
    gap: 4px;
    padding: 12px 20px 0;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 73px;
    z-index: 99;
  }

  .tab-btn {
    padding: 10px 20px;
    border: 1px solid transparent;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    background: transparent;
    color: var(--text2);
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .tab-btn:hover { color: var(--accent2); border-color: var(--border); }

  .tab-btn.active {
    background: var(--bg);
    color: var(--accent2);
    border-color: var(--accent);
    border-bottom-color: var(--bg);
    position: relative;
    bottom: -1px;
  }

  .tab-icon { font-size: 16px; }

  /* CONTENT */
  .content { flex: 1; padding: 24px 20px; }

  /* NOTES */
  .notes-nav {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .notes-nav-btn {
    padding: 6px 14px;
    border: 1px solid var(--border);
    border-radius: 20px;
    background: transparent;
    color: var(--text2);
    cursor: pointer;
    font-size: 11px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .notes-nav-btn:hover, .notes-nav-btn.active {
    background: var(--accent);
    color: #000;
    border-color: var(--accent);
  }

  .section-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  .section-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: 13px;
    color: var(--accent2);
    margin-bottom: 4px;
    line-height: 1.5;
  }

  .section-subtitle {
    font-size: 11px;
    color: var(--accent3);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }

  .para {
    font-size: 13.5px;
    color: var(--text);
    line-height: 1.9;
    margin-bottom: 14px;
    padding-left: 14px;
    border-left: 2px solid var(--accent);
  }

  /* TABLE */
  .table-wrap {
    overflow-x: auto;
    margin: 16px 0;
    border-radius: 10px;
    border: 1px solid var(--border);
  }

  .table-title {
    background: linear-gradient(90deg, var(--accent) 0%, transparent 100%);
    padding: 10px 16px;
    font-size: 12px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    color: #000;
    letter-spacing: 0.5px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12.5px;
  }

  thead tr { background: var(--surface2); }

  thead th {
    padding: 10px 14px;
    text-align: left;
    color: var(--accent2);
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.5px;
    border-bottom: 1px solid var(--border);
  }

  tbody tr {
    border-bottom: 1px solid rgba(30,42,66,0.6);
    transition: background 0.15s;
  }

  tbody tr:hover { background: rgba(200,146,42,0.05); }

  tbody tr:nth-child(even) { background: rgba(22,28,42,0.6); }
  tbody tr:nth-child(even):hover { background: rgba(200,146,42,0.08); }

  td {
    padding: 9px 14px;
    color: var(--text);
    line-height: 1.6;
    vertical-align: top;
  }

  td:first-child { color: var(--accent2); font-weight: 600; }

  .highlight-box {
    background: linear-gradient(135deg, rgba(200,146,42,0.08), rgba(126,200,227,0.05));
    border: 1px solid rgba(200,146,42,0.3);
    border-left: 3px solid var(--accent);
    border-radius: 8px;
    padding: 14px 16px;
    margin: 14px 0;
  }

  .highlight-label {
    font-family: 'Rajdhani', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .highlight-text {
    font-size: 13px;
    color: var(--text);
    line-height: 1.8;
  }

  /* QUIZ */
  .quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
  }

  .quiz-progress {
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px;
    color: var(--text2);
    letter-spacing: 1px;
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: var(--border);
    border-radius: 2px;
    margin-bottom: 24px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    border-radius: 2px;
    transition: width 0.4s ease;
  }

  .question-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
    animation: fadeIn 0.3s ease;
  }

  .question-num {
    font-family: 'Rajdhani', sans-serif;
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .question-text {
    font-size: 15px;
    color: var(--text);
    line-height: 1.7;
    margin-bottom: 6px;
  }

  .question-en {
    font-size: 12px;
    color: var(--text2);
    margin-bottom: 20px;
    font-style: italic;
  }

  .options-grid {
    display: grid;
    gap: 10px;
  }

  .option-btn {
    padding: 12px 18px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface2);
    color: var(--text);
    cursor: pointer;
    font-size: 13.5px;
    font-family: 'Noto Sans Tamil', sans-serif;
    text-align: left;
    transition: all 0.2s;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .option-btn:hover:not(:disabled) {
    border-color: var(--accent);
    background: rgba(200,146,42,0.08);
  }

  .option-btn.correct {
    border-color: var(--green);
    background: rgba(76,175,125,0.12);
    color: var(--green);
  }

  .option-btn.wrong {
    border-color: var(--red);
    background: rgba(224,82,82,0.1);
    color: var(--red);
  }

  .option-btn:disabled { cursor: default; }

  .option-letter {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 13px;
    min-width: 22px;
    color: var(--accent2);
    padding-top: 1px;
  }

  .explanation-box {
    background: rgba(126,200,227,0.06);
    border: 1px solid rgba(126,200,227,0.2);
    border-radius: 8px;
    padding: 14px 16px;
    margin-top: 14px;
    animation: fadeIn 0.3s ease;
  }

  .explanation-box h4 {
    font-family: 'Rajdhani', sans-serif;
    font-size: 11px;
    color: var(--accent3);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .explanation-box p {
    font-size: 13px;
    color: var(--text);
    line-height: 1.7;
    margin-bottom: 6px;
  }

  .explanation-box .en { font-size: 12px; color: var(--text2); font-style: italic; }

  .quiz-nav {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 10px 22px;
    border: 1px solid var(--accent);
    border-radius: 8px;
    background: transparent;
    color: var(--accent2);
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    transition: all 0.2s;
  }

  .btn:hover { background: var(--accent); color: #000; }
  .btn.primary { background: var(--accent); color: #000; }
  .btn.primary:hover { background: var(--accent2); }
  .btn.ghost { border-color: var(--border); color: var(--text2); }
  .btn.ghost:hover { border-color: var(--accent); color: var(--accent2); background: transparent; }

  /* RESULT */
  .result-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 36px;
    text-align: center;
    animation: fadeIn 0.5s ease;
  }

  .result-score {
    font-family: 'Cinzel Decorative', serif;
    font-size: 56px;
    color: var(--accent2);
    margin: 16px 0 8px;
    line-height: 1;
  }

  .result-label {
    font-size: 13px;
    color: var(--text2);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  .result-grade {
    display: inline-block;
    padding: 8px 24px;
    border-radius: 24px;
    font-family: 'Rajdhani', sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 28px;
  }

  .result-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 28px 0;
  }

  .stat-box {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 12px;
  }

  .stat-num { font-family: 'Cinzel Decorative', serif; font-size: 28px; }
  .stat-lbl { font-size: 11px; color: var(--text2); margin-top: 4px; letter-spacing: 0.5px; }

  /* GAME */
  .game-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 18px;
  }

  .timer-ring {
    position: relative;
    width: 54px;
    height: 54px;
  }

  .timer-ring svg {
    transform: rotate(-90deg);
    position: absolute;
    top: 0; left: 0;
  }

  .timer-number {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Rajdhani', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--accent2);
  }

  .score-display {
    text-align: center;
  }

  .score-big {
    font-family: 'Cinzel Decorative', serif;
    font-size: 24px;
    color: var(--accent2);
  }

  .score-lbl {
    font-size: 10px;
    color: var(--text2);
    letter-spacing: 1px;
  }

  .streak-display {
    text-align: center;
  }

  .streak-num {
    font-family: 'Rajdhani', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--accent3);
  }

  .game-start {
    text-align: center;
    padding: 60px 20px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
  }

  .game-start h2 {
    font-family: 'Cinzel Decorative', serif;
    font-size: 20px;
    color: var(--accent2);
    margin-bottom: 12px;
  }

  .game-start p {
    color: var(--text2);
    font-size: 13px;
    margin-bottom: 24px;
    line-height: 1.7;
  }

  .game-feedback {
    text-align: center;
    font-family: 'Rajdhani', sans-serif;
    font-size: 20px;
    font-weight: 700;
    padding: 10px;
    border-radius: 8px;
    animation: feedAnim 0.4s ease;
  }

  @keyframes feedAnim {
    0% { transform: scale(0.8); opacity: 0; }
    60% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); }
  }

  .game-end {
    text-align: center;
    padding: 40px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
  }

  /* RESPONSIVE */
  @media (max-width: 600px) {
    .tabs { padding: 10px 12px 0; gap: 2px; }
    .tab-btn { padding: 8px 12px; font-size: 11px; }
    .content { padding: 16px 12px; }
    .result-stats { grid-template-columns: repeat(3, 1fr); }
    table { font-size: 11.5px; }
    td { padding: 7px 10px; }
    .game-header { padding: 10px 12px; }
  }
`;

// ─── UTILS ──────────────────────────────────────────────────────────────────

const OPTION_LETTERS = ["அ", "ஆ", "இ", "ஈ"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── SUB-COMPONENTS ─────────────────────────────────────────────────────────

function NoteSection({ section }) {
  return (
    <div className="section-card">
      <div className="section-title">{section.title}</div>
      <div className="section-subtitle">{section.subtitle}</div>
      {section.content.map((block, i) => {
        if (block.type === "para") return <p key={i} className="para">{block.text}</p>;
        if (block.type === "highlight") return (
          <div key={i} className="highlight-box">
            <div className="highlight-label">{block.label}</div>
            <div className="highlight-text">{block.text}</div>
          </div>
        );
        if (block.type === "table") return (
          <div key={i} className="table-wrap">
            {block.title && <div className="table-title">{block.title}</div>}
            <table>
              <thead>
                <tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((row, j) => (
                  <tr key={j}>
                    {row.map((cell, k) => <td key={k}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        return null;
      })}
    </div>
  );
}

function NotesTab() {
  const [active, setActive] = useState("intro");
  const section = NOTES_SECTIONS.find(s => s.id === active);

  return (
    <div>
      <div className="notes-nav">
        {NOTES_SECTIONS.map(s => (
          <button
            key={s.id}
            className={`notes-nav-btn${active === s.id ? " active" : ""}`}
            onClick={() => setActive(s.id)}
          >{s.subtitle.split(" ").slice(0, 3).join(" ")}</button>
        ))}
      </div>
      {section && <NoteSection section={section} />}
    </div>
  );
}

function QuizTab() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  const q = QUIZ_QUESTIONS[current];
  const total = QUIZ_QUESTIONS.length;

  function handleSelect(idx) {
    if (selected !== null) return;
    setSelected(idx);
    setAnswers(prev => [...prev, { q: current, chosen: idx, correct: idx === q.answer }]);
  }

  function handleNext() {
    if (current < total - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setReviewMode(false);
    setReviewIdx(0);
  }

  const score = answers.filter(a => a.correct).length;

  function getGrade(s, t) {
    const pct = (s / t) * 100;
    if (pct >= 90) return { label: "🏆 சிறந்தது | Excellent", col: "#4caf7d" };
    if (pct >= 75) return { label: "⭐ நல்லது | Good", col: "#e8b84b" };
    if (pct >= 50) return { label: "📚 திரும்பி படிக்க | Needs Review", col: "#7ec8e3" };
    return { label: "🔄 மீண்டும் படிக்கவும் | Study More", col: "#e05252" };
  }

  if (showResult && !reviewMode) {
    const grade = getGrade(score, total);
    return (
      <div className="result-card">
        <div style={{ fontSize: 13, color: "var(--text2)", letterSpacing: 2 }}>TNPSC QUIZ — RESULT</div>
        <div className="result-score">{score}/{total}</div>
        <div className="result-label">மொத்த விடைகள் சரி | Correct Answers</div>
        <div className="result-grade" style={{ background: grade.col + "22", color: grade.col, border: `1px solid ${grade.col}44` }}>
          {grade.label}
        </div>
        <div className="result-stats">
          <div className="stat-box">
            <div className="stat-num" style={{ color: "var(--green)" }}>{score}</div>
            <div className="stat-lbl">சரி | Correct</div>
          </div>
          <div className="stat-box">
            <div className="stat-num" style={{ color: "var(--red)" }}>{total - score}</div>
            <div className="stat-lbl">தவறு | Wrong</div>
          </div>
          <div className="stat-box">
            <div className="stat-num" style={{ color: "var(--accent2)" }}>{Math.round((score / total) * 100)}%</div>
            <div className="stat-lbl">சதவீதம் | Percent</div>
          </div>
        </div>
        <div className="quiz-nav" style={{ justifyContent: "center", gap: 12 }}>
          <button className="btn primary" onClick={() => setReviewMode(true)}>📖 மதிப்பாய்வு | Review</button>
          <button className="btn" onClick={handleRestart}>🔄 மீண்டும் | Restart</button>
        </div>
      </div>
    );
  }

  if (reviewMode) {
    const rq = QUIZ_QUESTIONS[reviewIdx];
    const ra = answers.find(a => a.q === reviewIdx);
    return (
      <div>
        <div className="quiz-header">
          <div className="quiz-progress">மதிப்பாய்வு | Review: {reviewIdx + 1}/{total}</div>
          <button className="btn ghost" onClick={() => setReviewMode(false)}>← திரும்பு</button>
        </div>
        <div className="question-card">
          <div className="question-num">கேள்வி {reviewIdx + 1}</div>
          <div className="question-text">{rq.question}</div>
          <div className="question-en">{rq.questionEn}</div>
          <div className="options-grid">
            {rq.options.map((opt, i) => (
              <div key={i} className={`option-btn ${i === rq.answer ? "correct" : ra && ra.chosen === i && i !== rq.answer ? "wrong" : ""}`}
                style={{ cursor: "default" }}>
                <span className="option-letter">{OPTION_LETTERS[i]}</span>
                <span>{opt}</span>
              </div>
            ))}
          </div>
          <div className="explanation-box">
            <h4>📌 விளக்கம் | Explanation</h4>
            <p>{rq.explanation}</p>
            <p className="en">{rq.explanationEn}</p>
          </div>
        </div>
        <div className="quiz-nav">
          <button className="btn ghost" onClick={() => setReviewIdx(i => Math.max(0, i - 1))} disabled={reviewIdx === 0}>← முந்தைய</button>
          {reviewIdx < total - 1
            ? <button className="btn primary" onClick={() => setReviewIdx(i => i + 1)}>அடுத்தது →</button>
            : <button className="btn primary" onClick={handleRestart}>🔄 மீண்டும் தொடங்கு</button>
          }
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="quiz-header">
        <div className="quiz-progress">கேள்வி {current + 1} / {total}</div>
        <div style={{ fontSize: 13, color: "var(--accent2)", fontFamily: "Rajdhani" }}>
          {answers.filter(a => a.correct).length} சரி
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((current) / total) * 100}%` }} />
      </div>
      <div className="question-card">
        <div className="question-num">கேள்வி {current + 1} — இந்திய அரசமைப்பு</div>
        <div className="question-text">{q.question}</div>
        <div className="question-en">{q.questionEn}</div>
        <div className="options-grid">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`option-btn ${selected !== null ? (i === q.answer ? "correct" : selected === i ? "wrong" : "") : ""}`}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
            >
              <span className="option-letter">{OPTION_LETTERS[i]}</span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="explanation-box">
            <h4>{selected === q.answer ? "✅ சரியான விடை! | Correct!" : "❌ தவறான விடை | Wrong Answer"}</h4>
            <p>{q.explanation}</p>
            <p className="en">{q.explanationEn}</p>
          </div>
        )}
      </div>
      <div className="quiz-nav">
        {selected !== null && (
          <button className="btn primary" onClick={handleNext}>
            {current < total - 1 ? "அடுத்தது →" : "முடிவு காண →"}
          </button>
        )}
      </div>
    </div>
  );
}

function GameTab() {
  const GAME_TIME = 20;
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [feedback, setFeedback] = useState(null);
  const [total, setTotal] = useState(0);

  const timerRef = useState(null);

  const startGame = useCallback(() => {
    const shuffled = shuffle(QUIZ_QUESTIONS).slice(0, 15);
    setQuestions(shuffled);
    setQIdx(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(GAME_TIME);
    setFeedback(null);
    setTotal(0);
    setStarted(true);
    setGameOver(false);
  }, []);

  useEffect(() => {
    if (!started || gameOver || selected !== null) return;
    const t = setInterval(() => {
      setTimeLeft(tl => {
        if (tl <= 1) {
          clearInterval(t);
          handleTimeout();
          return 0;
        }
        return tl - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, gameOver, selected, qIdx]);

  function handleTimeout() {
    if (selected !== null) return;
    setSelected(-1);
    setFeedback({ type: "wrong", text: "⏰ நேரம் முடிந்தது! | Time Up!" });
    setStreak(0);
    setTotal(t => t + 1);
    setTimeout(nextQ, 1500);
  }

  function handleSelect(i) {
    if (selected !== null || gameOver) return;
    const q = questions[qIdx];
    const correct = i === q.answer;
    setSelected(i);
    setTotal(t => t + 1);
    if (correct) {
      const pts = 10 + Math.floor(timeLeft / 2);
      setScore(s => s + pts);
      const ns = streak + 1;
      setStreak(ns);
      setBestStreak(b => Math.max(b, ns));
      setFeedback({ type: "correct", text: `+${pts} 🔥 ${ns > 2 ? `Streak x${ns}!` : ""}` });
    } else {
      setStreak(0);
      setFeedback({ type: "wrong", text: "❌ தவறு!" });
    }
    setTimeout(nextQ, 1500);
  }

  function nextQ() {
    setSelected(null);
    setFeedback(null);
    setTimeLeft(GAME_TIME);
    if (qIdx + 1 >= questions.length) {
      setGameOver(true);
    } else {
      setQIdx(qi => qi + 1);
    }
  }

  if (!started) return (
    <div className="game-start">
      <h2>⚡ Quiz Game</h2>
      <p>
        நேரத்திற்கு எதிராக விளையாடு!<br />
        ஒவ்வொரு கேள்விக்கும் {GAME_TIME} வினாடிகள்.<br />
        விரைவாக பதில் சொன்னால் அதிக மதிப்பெண்!<br /><br />
        <em>Race against time! {GAME_TIME} seconds per question.<br />Faster answers = More points!</em>
      </p>
      <button className="btn primary" style={{ fontSize: 16 }} onClick={startGame}>
        🚀 தொடங்கு | Start Game
      </button>
    </div>
  );

  if (gameOver) {
    const pct = Math.round((questions.filter((q, i) => { const a = true; return a; }).length > 0 ? score / (total * 10) * 100 : 0));
    return (
      <div className="game-end">
        <div style={{ fontFamily: "Cinzel Decorative", fontSize: 16, color: "var(--accent2)", marginBottom: 8 }}>GAME OVER</div>
        <div style={{ fontFamily: "Cinzel Decorative", fontSize: 52, color: "var(--accent2)", marginBottom: 4 }}>{score}</div>
        <div style={{ fontSize: 12, color: "var(--text2)", letterSpacing: 2, marginBottom: 24 }}>TOTAL SCORE</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
          <div className="stat-box"><div className="stat-num" style={{ color: "var(--accent2)" }}>{score}</div><div className="stat-lbl">மதிப்பெண் | Score</div></div>
          <div className="stat-box"><div className="stat-num" style={{ color: "var(--accent3)" }}>{bestStreak}</div><div className="stat-lbl">சிறந்த தொடர் | Best Streak</div></div>
          <div className="stat-box"><div className="stat-num" style={{ color: "var(--green)" }}>{total}</div><div className="stat-lbl">கேள்விகள் | Questions</div></div>
        </div>
        <button className="btn primary" onClick={startGame}>🔄 மீண்டும் விளையாடு | Play Again</button>
      </div>
    );
  }

  const q = questions[qIdx];
  const circ = 2 * Math.PI * 22;
  const dashOffset = circ - (timeLeft / GAME_TIME) * circ;
  const timeColor = timeLeft > 10 ? "var(--green)" : timeLeft > 5 ? "var(--accent2)" : "var(--red)";

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="timer-ring">
          <svg width="54" height="54">
            <circle cx="27" cy="27" r="22" fill="none" stroke="var(--border)" strokeWidth="4" />
            <circle cx="27" cy="27" r="22" fill="none" stroke={timeColor} strokeWidth="4"
              strokeDasharray={circ} strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }} />
          </svg>
          <div className="timer-number" style={{ color: timeColor }}>{timeLeft}</div>
        </div>
        <div className="score-display">
          <div className="score-big">{score}</div>
          <div className="score-lbl">SCORE</div>
        </div>
        <div className="streak-display">
          <div className="streak-num">🔥{streak}</div>
          <div style={{ fontSize: 10, color: "var(--text2)" }}>STREAK</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "Rajdhani", fontSize: 14, color: "var(--text2)" }}>{qIdx + 1}/{questions.length}</div>
          <div style={{ fontSize: 10, color: "var(--text2)" }}>கேள்வி</div>
        </div>
      </div>

      {feedback && (
        <div className="game-feedback" style={{
          color: feedback.type === "correct" ? "var(--green)" : "var(--red)",
          background: feedback.type === "correct" ? "rgba(76,175,125,0.1)" : "rgba(224,82,82,0.1)"
        }}>{feedback.text}</div>
      )}

      <div className="question-card">
        <div className="question-num">கேள்வி {qIdx + 1} — TNPSC Style</div>
        <div className="question-text">{q.question}</div>
        <div className="question-en">{q.questionEn}</div>
        <div className="options-grid">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`option-btn ${selected !== null ? (i === q.answer ? "correct" : selected === i && i !== q.answer ? "wrong" : "") : ""}`}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
            >
              <span className="option-letter">{OPTION_LETTERS[i]}</span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function Chapter1() {
  const [tab, setTab] = useState("notes");

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-title">✦ 12th Political Science — Unit 1 ✦</div>
          <div className="header-sub">இந்திய அரசமைப்பு | Indian Constitution — TNPSC Prep</div>
        </div>
        <div className="tabs">
          {[
            { id: "notes", icon: "📜", label: "குறிப்புகள் | Notes" },
            { id: "quiz", icon: "🎯", label: "வினாடி வினா | Quiz" },
            { id: "game", icon: "⚡", label: "Game Mode" }
          ].map(t => (
            <button key={t.id} className={`tab-btn${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
              <span className="tab-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
        <div className="content">
          {tab === "notes" && <NotesTab />}
          {tab === "quiz" && <QuizTab />}
          {tab === "game" && <GameTab />}
        </div>
      </div>
    </>
  );
}
