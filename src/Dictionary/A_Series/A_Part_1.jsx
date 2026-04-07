import { useState, useEffect, useRef } from "react";

// ══════════════════════════════════════════════════════════════
// ALL 575 WORDS — Pages 1–20, every single entry, no skips
// ══════════════════════════════════════════════════════════════
const ALL_WORDS = [
  { en: "a, an", ta: "ஒரு, ஓர்" },
  { en: "a battery", ta: "குறைவழுத்த மின்கலம்" },
  { en: "a few", ta: "ஒரு சில, சில" },
  { en: "a la carte", ta: "தெரிவுஉணவு வகை" },
  { en: "a little", ta: "குறைவான, கொஞ்சமான" },
  { en: "a one", ta: "முதல் தரமான" },
  { en: "a while", ta: "சிறிது நேரம்" },
  { en: "A.D. (anno domini)", ta: "கிறித்துவுக்குப் பின் (கி.பி.)" },
  { en: "A.M. (ante meridiem)", ta: "முற்பகல் (மு.ப.)" },
  { en: "A.T.R. (average true range)", ta: "எடுக்கப்பட்ட நடவடிக்கை பற்றிய அறிக்கை" },
  { en: "aadhar card", ta: "சான்றட்டை" },
  { en: "aaftaab", ta: "கதிரவ ஒளி" },
  { en: "aapis mellifica", ta: "வீட்டுத் தேனீ" },
  { en: "ab intestato", ta: "விருப்பாவணமிலி" },
  { en: "ab ovo", ta: "தொடக்கத்திலிருந்து" },
  { en: "aback", ta: "திகைப்புற்று, வியப்புற்று" },
  { en: "abactinal", ta: "குழற்பாதமற்ற" },
  { en: "abactor", ta: "ஆநிரை கவர்வோர்" },
  { en: "abalienation", ta: "மனக்குழப்பம்" },
  { en: "abandon", ta: "கைவிடு, விட்டுவிடு" },
  { en: "abandoned tank", ta: "பாழ்க்குளம்" },
  { en: "abandonee", ta: "கைவிடப்பட்டவர்" },
  { en: "abandoner", ta: "உரிமை விடுவோர்" },
  { en: "abandoning", ta: "கைவிடுதல்" },
  { en: "abandonment", ta: "ஈகம், கைவிடல், துறப்பு" },
  { en: "abandonment of revenue", ta: "வருவாயைக் கைவிடுதல்" },
  { en: "abandonware", ta: "கழிவுப்பொருள்" },
  { en: "abapical", ta: "உச்சி எதிர்ப்புறம்" },
  { en: "abapical pole", ta: "வளரெதிர்முனை" },
  { en: "abase", ta: "இகழ்ச்சி, இகழ்தல்" },
  { en: "abasia", ta: "நடக்க இயலாமை" },
  { en: "abate", ta: "கழி, குறை, தள்ளுபடிசெய், விலக்கி வை" },
  { en: "abatement", ta: "கழிப்பு, குறைப்பு, தள்ளுபடி, கட்டுப்படுத்துதல்" },
  { en: "abatement of charges", ta: "கட்டணக் குறைப்பு, செலவுக் குறைப்பு" },
  { en: "abatement of duty", ta: "வரிக் குறைப்பு" },
  { en: "abatement of purchase money", ta: "கொள்முதல் பணக் குறைப்பு" },
  { en: "abatement of rent", ta: "வாடகைக் குறைப்பு, வழக்கழிவு" },
  { en: "abater", ta: "விலக்குபவர்" },
  { en: "abattar dissement", ta: "குறிப்பிட்ட உயிரினம் அழிதல்" },
  { en: "abattoir", ta: "இறைச்சிக்கூடம்" },
  { en: "abattoir sanitation", ta: "இறைச்சி வெட்டுமிடத் துப்புரவு" },
  { en: "abaxial", ta: "விதையிலை மேற்புறம், இலைப்புறம்" },
  { en: "abbiocco", ta: "உண்டமயக்கம்" },
  { en: "abbot", ta: "திருமடத்தின் தலைவர்" },
  { en: "abbreviate", ta: "சுருக்கு" },
  { en: "abbreviated address", ta: "சுருக்கமுகவரி" },
  { en: "abbreviation", ta: "சுருக்கக் குறியீடு, சுருக்கம்" },
  { en: "abdication", ta: "உரிமையைத் துறத்தல், குடியுரிமையைத் துறத்தல்" },
  { en: "abditory", ta: "மறைப்பிடம்" },
  { en: "abdominal cramp", ta: "வயிற்றுப்பிடிப்பு" },
  { en: "abdominal pressure", ta: "வயிற்றுஅழுத்தம்" },
  { en: "abdominal respiration", ta: "வயிற்றுமூச்சு" },
  { en: "abdominal rib", ta: "அடிவயிற்றுவிலா என்பு, அடிவயிற்று எலும்பு" },
  { en: "abdominal vein", ta: "அடிவயிற்றுச் சிரை" },
  { en: "abdominal wall", ta: "அடிவயிற்றுச்சுவர்" },
  { en: "abduct", ta: "கடத்திச் செல்" },
  { en: "abduction", ta: "கருத்துக் கொணர்வு" },
  { en: "abductive", ta: "நிகழ்தகவுக் கொணர்வு" },
  { en: "abecedarian", ta: "அகரவரிசைப்படி, சீரான" },
  { en: "abend", ta: "இயல்பிலாமுடிவு" },
  { en: "abendrot", ta: "செந்நிற அந்தி வானம்" },
  { en: "aberrant", ta: "பிறழ்தல்" },
  { en: "aberrant behaviour", ta: "நடத்தைக் கோளாறு" },
  { en: "aberration", ta: "நிலையினின்று விலகுதல், பிறழ்ச்சி" },
  { en: "abet", ta: "உடந்தையாக இரு, குற்றச்செயலுக்குத் தூண்டுதல்" },
  { en: "abettor", ta: "குற்ற உடந்தையர்" },
  { en: "abeyance", ta: "காலம்தாழ்த்தி வைத்தல், ஒத்திவைத்தல்" },
  { en: "abhor", ta: "தள்ளு, வெறு, வெறுத்தொதுக்கு" },
  { en: "abhorrent", ta: "வெறுக்கத்தக்க" },
  { en: "abicaker", ta: "தூற்றுதல்" },
  { en: "abidance", ta: "நெறிகளைக் கடைப்பிடித்தல்" },
  { en: "abide (by)", ta: "நிறைவேற்று, கடைப்பிடி, பின்பற்று" },
  { en: "abide by rules", ta: "நெறிகளைக் கடைப்பிடி" },
  { en: "abiding", ta: "நிலையான" },
  { en: "abiding interest", ta: "நிலையான அக்கறை, தொடர்ந்த ஆர்வம்" },
  { en: "abidingly", ta: "நிலையாக" },
  { en: "ability", ta: "திறம், திறமை, ஆற்றல், வல்லமை" },
  { en: "ability test", ta: "திறனறி தேர்வு" },
  { en: "abiogenesis", ta: "உயிரிலிப் பிறப்பு" },
  { en: "abiology", ta: "உயிரிலி ஆய்வு" },
  { en: "abirritate", ta: "தணிப்பு" },
  { en: "abjection", ta: "தன்மதிப்பை இழந்த நிலை" },
  { en: "abjure", ta: "விட்டொழி" },
  { en: "abk lingen", ta: "மங்கொலி" },
  { en: "ablalion cone", ta: "தேய்கூம்பு" },
  { en: "ablation", ta: "அகற்றுதல், தேய்த்தல்" },
  { en: "ablation zone", ta: "பனியரிப்புப் பகுதி" },
  { en: "ablative of motion", ta: "நீங்கற்பொருள் (இலக்.)" },
  { en: "ablaze", ta: "சுடர்விடுகின்ற" },
  { en: "able", ta: "திறமையுள்ள, ஆற்றலுடைய" },
  { en: "able bodied", ta: "வல்லுடலான" },
  { en: "abligurition", ta: "உண்டி மிகைச் செலவு" },
  { en: "ablush", ta: "நாணமுற்று, நாணி" },
  { en: "ablution", ta: "நீராடல், கழுவுதல்" },
  { en: "ablutomania", ta: "கழுவுகை வெறி" },
  { en: "abnegation", ta: "அரசியல் அதிகாரத்தைத் துறத்தல், புறக்கணித்தொதுக்கல்" },
  { en: "abney level", ta: "கோண அளவி" },
  { en: "abnormal", ta: "இயல்புமீறிய, இயல்புக்கு மாறான" },
  { en: "abnormal fatigue", ta: "பிறழ் களைப்பு" },
  { en: "abnormal glow", ta: "பிறழ் ஒளிறல்" },
  { en: "abnormal method of finance", ta: "இயல்புக்கு மாறான நிதியுதவி முறை" },
  { en: "abnormal psychology", ta: "பிறழ்வு உளவியல்" },
  { en: "aboard", ta: "ஊர்தியில், கப்பலில், வானூர்தியில்" },
  { en: "abode", ta: "இருப்பிடம், இல்லம்" },
  { en: "aboil", ta: "கொதி நிலை" },
  { en: "abolish", ta: "ஒழித்துவிடு, நீக்கிவிடு" },
  { en: "abolishable", ta: "அழிக்கக்கூடிய" },
  { en: "abolisher", ta: "ஒழிப்பவர், நீக்குபவர்" },
  { en: "abolition", ta: "ஒழித்தல், நீக்குதல்" },
  { en: "abominable", ta: "வெறுப்பூட்டக்கூடிய" },
  { en: "aboriginal", ta: "தொன்முதிய, மூலக்குடி சார்ந்த" },
  { en: "aboriginal tribe", ta: "தொல்குடி" },
  { en: "aborigines", ta: "தொன்முதுவர், பழங்குடியினர்" },
  { en: "abortion", ta: "கருச்சிதைவு" },
  { en: "abortive", ta: "உருப்பெறாத, சிதைந்த, பயனற்ற" },
  { en: "abound", ta: "நிரம்பியிரு, மிகுந்திரு, மிகுதல்" },
  { en: "about", ta: "ஏறத்தாழ, குறித்து" },
  { en: "above given", ta: "மேற்கொடுக்கப்பட்ட" },
  { en: "above noted", ta: "மேற்குறிப்பிட்டுள்ள" },
  { en: "above said", ta: "மேற்கூறிய" },
  { en: "above all", ta: "எல்லாவற்றிற்கும் மேலாக" },
  { en: "above average", ta: "இயல்புக்கு மேலான" },
  { en: "above board", ta: "ஐயத்திற்கிடமில்லாத, களங்கமற்ற" },
  { en: "above cited", ta: "மேற்சுட்டிய, மேலே குறிப்பிடப்பட்டுள்ள" },
  { en: "above mentioned", ta: "மேற்குறிப்பிட்ட" },
  { en: "above normal", ta: "இயல்பினும் மேலான" },
  { en: "above par", ta: "அதிக விலையில்" },
  { en: "above par exchange", ta: "சமமாற்றுக்கு மேல்" },
  { en: "above par value", ta: "முகமதிப்புக்கு மேல்" },
  { en: "above quoted", ta: "மேலே எடுத்துரைக்கப்பட்ட" },
  { en: "above quoted reason", ta: "மேற்சுட்டிய கரணியம், மேற்சுட்டிய காரணம்" },
  { en: "above standard", ta: "தரத்திற்கு மேலான" },
  { en: "above the line", ta: "கோட்டுக்கு மேல், வரம்புக்கு மேல்" },
  { en: "above the signature", ta: "கையொப்பத்திற்கு மேல்" },
  { en: "above written", ta: "மேலே எழுதியுள்ள" },
  { en: "abracadabra", ta: "மறைமொழி" },
  { en: "abranchial", ta: "செவுளற்ற" },
  { en: "abrasion", ta: "கீறல், தேய்வு" },
  { en: "abrasion ground", ta: "சிதைவுற்ற பகுதி" },
  { en: "abrasion resistance index", ta: "உராய்வுத் தடையடைவு" },
  { en: "abrasive", ta: "சாணைக் கல்" },
  { en: "abrasive action", ta: "தேய்ப்புச்செயல்" },
  { en: "abrasive sand", ta: "தேய்ப்புமணல்" },
  { en: "abrazo", ta: "அரவணைப்பு" },
  { en: "abreast", ta: "இணையான, காலத்திற்கேற்றவாறு, பக்கம் பக்கமாக" },
  { en: "abridge", ta: "சுருக்கு" },
  { en: "abridged edition", ta: "சுருக்கப் பதிப்பு" },
  { en: "abridged form", ta: "சுருக்கிய வடிவம்" },
  { en: "abridged report", ta: "சுருக்க அறிக்கை" },
  { en: "abridgement", ta: "சுருக்கம்" },
  { en: "abroad", ta: "வெளிநாட்டிற்கு" },
  { en: "abrogable", ta: "ஒழிக்கத்தக்க" },
  { en: "abrogate", ta: "வழக்கொழியச்செய்" },
  { en: "abrogater", ta: "கழிப்பவர், முடிப்பவர்" },
  { en: "abrogation", ta: "தவிர்த்தல், தவிர்ப்பு, சிதைத்தல்" },
  { en: "abrogation of agreement", ta: "உடன்பாட்டைத் தீர்த்தல்" },
  { en: "abrupt", ta: "திடுமென" },
  { en: "abrupt changes", ta: "உடனடி மாற்றங்கள்" },
  { en: "abruptio placenta", ta: "தொப்புள்கொடி விலகல்" },
  { en: "abruption", ta: "முறிதல்" },
  { en: "abruptly", ta: "திடுமென்று" },
  { en: "abscess", ta: "சீழ்க்கட்டி" },
  { en: "abscissa", ta: "கிடை அச்சுத் தூரம்" },
  { en: "abscission", ta: "உதிர்தல்" },
  { en: "abscission zone", ta: "உதிரும் பகுதி" },
  { en: "abscond", ta: "தலைமறைவாகு, பதுங்கு" },
  { en: "absconder", ta: "தலைமறைவானவர், பதுங்கியவர்" },
  { en: "absconding", ta: "பதுங்கிய" },
  { en: "absconding culprit", ta: "தலைமறைவுக் குற்றவாளி" },
  { en: "absence", ta: "இல்லாதிருத்தல், வருகை தராதிருத்தல்" },
  { en: "absent", ta: "இராத, வருகை தராமை" },
  { en: "absentee", ta: "வராதவர்" },
  { en: "absentee land lord", ta: "இடத்தில் இல்லாத நில உரிமையாளர்" },
  { en: "absentee statement", ta: "வாராதோர் அறிக்கை" },
  { en: "absenteeism", ta: "தவிர்த்தொதுங்கல், பணிக்கு வராதிருத்தல்" },
  { en: "absent-minded", ta: "கவனக்குறைவான" },
  { en: "absolute", ta: "ஐயத்திற்கிடமற்ற, தனித்த, முற்றிலும்" },
  { en: "absolute activity", ta: "தனிவினைத்திறன்" },
  { en: "absolute assembler", ta: "பொறிமொழியாக்கி" },
  { en: "absolute authority", ta: "முழு அதிகாரம் பெற்ற" },
  { en: "absolute constipation", ta: "முழு மலக்கட்டு" },
  { en: "absolute discharge", ta: "முழுமையான விடுவிப்பு" },
  { en: "absolute displacements", ta: "சார்பிலா இடப்பெயர்ச்சிகள்" },
  { en: "absolute drought", ta: "கடும் வறட்சி" },
  { en: "absolute gravity", ta: "முழு ஈர்ப்பு" },
  { en: "absolute hardness", ta: "தனிவன்மை, முழுவன்மை" },
  { en: "absolute humidity", ta: "முழு ஈரப்பதம்" },
  { en: "absolute hydraulic gradient", ta: "முழு நீர்மட்டச் சரிவுவாட்டம்" },
  { en: "absolute instruction", ta: "நெறிக்கட்டளை" },
  { en: "absolute light requirement", ta: "தனியொளி தேவை" },
  { en: "absolute loader", ta: "நெறியேற்றி" },
  { en: "absolute majority", ta: "தனிப்பெரும்பான்மை" },
  { en: "absolute minimum", ta: "மிகக் குறுமம்" },
  { en: "absolute module", ta: "தனிமீள்நிலை" },
  { en: "absolute monopoly", ta: "முழுத் தனியுடைமை, ஈடில்லா விற்பனை" },
  { en: "absolute occupancy right", ta: "முழுக் கையுடைமை உரிமை" },
  { en: "absolute occupancy tenant", ta: "குடிக்கூலிக்காரர்" },
  { en: "absolute owner", ta: "முழு உரிமையாளர்" },
  { en: "absolute path", ta: "முழுப்பாதை, தனிவழி" },
  { en: "absolute power", ta: "முழு அதிகாரம்" },
  { en: "absolute priority", ta: "தனி முன்னுரிமை" },
  { en: "absolute risk", ta: "தனி இடர் வாய்ப்பு" },
  { en: "absolute space", ta: "பெருவெளி, தனித்த வெளி" },
  { en: "absolute temperature", ta: "முழு வெப்பநிலை" },
  { en: "absolute truth", ta: "நிலையுண்மை" },
  { en: "absolute zero", ta: "தனிச்சுழி" },
  { en: "absolutely", ta: "முற்றிலும்" },
  { en: "absolutely unavoidable", ta: "முற்றிலும் தவிர்க்க இயலாதது" },
  { en: "absolution", ta: "பாவக்கழுவாய்" },
  { en: "absolutist", ta: "தன்னைப் பற்றியே எண்ணுபவர்" },
  { en: "absolve", ta: "கடமையிலிருந்து வழுவியவரை மன்னித்துவிடு, விடுவி" },
  { en: "absolver", ta: "விடுவிப்பவர்" },
  { en: "absorb", ta: "ஈர்த்துக்கொள்" },
  { en: "absorbable", ta: "ஈர்க்கத்தக்க" },
  { en: "absorbance unit", ta: "உட்கவர் அலகு" },
  { en: "absorbed", ta: "சூழ்ந்த, மனம் ஒன்றி ஈடுபட்ட" },
  { en: "absorbed capital", ta: "ஈர்க்கப்பட்ட மூலதனம்" },
  { en: "absorbed in the post", ta: "அப்பணியிடத்தில் நிலையாக அமர்த்தப்பட்டார்" },
  { en: "absorbent", ta: "உறிஞ்சி, ஈர்க்கும் பொருள்" },
  { en: "absorbing", ta: "உட்கவரி" },
  { en: "absorbing duct", ta: "உறிஞ்சு குழாய்" },
  { en: "absorbing line", ta: "உறிஞ்சு கோடு" },
  { en: "absorbing screen", ta: "உறிஞ்சு திரை" },
  { en: "absorptiometer", ta: "உறிஞ்சு அளவி" },
  { en: "absorption", ta: "உட்கவர்ப்பு, மனம் ஒன்றிய நிலை" },
  { en: "absquatulate", ta: "திடுமென விலகு" },
  { en: "abstain", ta: "ஒதுங்கு, விட்டிரு" },
  { en: "abstemious", ta: "மிதமான" },
  { en: "abstentation", ta: "தவிர்த்திருத்தல்" },
  { en: "abstention", ta: "வினைத்தவிர்ப்பு" },
  { en: "abstinence", ta: "தவிர்ப்பு" },
  { en: "abstract", ta: "சுருக்கக்குறிப்பு, சுருக்கம்" },
  { en: "abstract bill", ta: "சுருக்கப் பட்டி" },
  { en: "abstract of accounts", ta: "கணக்குகளின் சுருக்கக் குறிப்பு" },
  { en: "abstract of teller's receipt", ta: "வரவுச்சுருக்கம், வரவுகளின் சுருக்கம்" },
  { en: "abstract statement", ta: "சுருக்க அறிக்கை" },
  { en: "abstraction", ta: "சுருக்கல், கருத்துப்பொருள்" },
  { en: "abstruse", ta: "அறிநுண்மை" },
  { en: "absurd", ta: "பொருந்தாத, பொருளற்ற" },
  { en: "abubble", ta: "மகிழ்ச்சிப் பெருக்கு, ஆர்வப் பெருக்கு" },
  { en: "abulia", ta: "மனவுறுதிக் குறைபாடு" },
  { en: "abundance", ta: "மிகுதி" },
  { en: "abundant", ta: "மிகுதியான" },
  { en: "abune", ta: "அப்பால், இழிதொழில், கெடுவழக்கம்" },
  { en: "abuse of powers", ta: "அதிகார மோசடி, அதிகாரத்தைத் தவறாகப் பயன்படுத்துதல்" },
  { en: "abuse of trust", ta: "நம்பிக்கைக் கேடு" },
  { en: "abusive language", ta: "வசைமொழி" },
  { en: "abutment", ta: "உதைவு, பாலத்தின் தாங்கு கட்டுமானம், முட்டிடம்" },
  { en: "abysmal", ta: "படுகீழான" },
  { en: "abysmal fracture", ta: "ஆழப்பிளவு" },
  { en: "abyssal", ta: "ஆழமான" },
  { en: "abyssal depth", ta: "மிகு ஆழம்" },
  { en: "abyssal fish", ta: "ஆழ்கடல் மீன்" },
  { en: "ac odometer", ta: "பார்வைத்திறன் அளவி" },
  { en: "academic", ta: "கல்விசார்" },
  { en: "academic council", ta: "கல்விக் குழு" },
  { en: "academic course", ta: "பாடநூற் கல்வி" },
  { en: "academic environment", ta: "கல்விச் சூழல்" },
  { en: "academic experience", ta: "கல்விப் பட்டறிவு" },
  { en: "academic qualification", ta: "கல்வித் தகுதி" },
  { en: "academician", ta: "கல்வியாளர்" },
  { en: "academy", ta: "கலைக் கழகம், கல்விச் சாலை" },
  { en: "academy of tamil culture", ta: "தமிழ்ப் பண்பாட்டுக் கழகம்" },
  { en: "acantholysis", ta: "மேல்தோல் இணைப்பு இழைம அழிவு" },
  { en: "acanthosis", ta: "தோல்தடிப்பு" },
  { en: "acapnia", ta: "கரிவளிக்குறை (குருதி)" },
  { en: "acardia", ta: "இதயமின்மை, இதயமற்ற உடல்" },
  { en: "acaricide", ta: "தோல் பூச்சிக்கொல்லி" },
  { en: "acarology", ta: "ஒட்டுண்ணியியல்" },
  { en: "acaronar", ta: "ஏற்றுக்கொள், அரவணைப்பு" },
  { en: "acarophobia", ta: "ஒவ்வாமையச்சம்" },
  { en: "acaryote", ta: "கருவகமில்லா உயிரி" },
  { en: "acatalepsy", ta: "அறியவியலாப் புடவி" },
  { en: "acataposis", ta: "விழுங்க இயலாமை" },
  { en: "acaudal", ta: "வாலற்ற" },
  { en: "acaulescence", ta: "தண்டிலி" },
  { en: "accede", ta: "இணங்கு, பதவி மேற்கொள்" },
  { en: "accelerate", ta: "முடுக்கிவிடு, விரைவுபடுத்து" },
  { en: "accelerated soil erosion", ta: "விரைவான மண்ணரிப்பு" },
  { en: "accelerating premium", ta: "விசைவுறும் தவணைக் கட்டணம்" },
  { en: "acceleration", ta: "முடுக்கம், விரைவு இயக்கம்" },
  { en: "acceleration board", ta: "முடுக்குப் பலகை" },
  { en: "acceleration test", ta: "முடுக்க ஆய்வு" },
  { en: "acceleration time", ta: "முடுக்கல் நேரம்" },
  { en: "accelerative", ta: "விரைவுபடுத்தும் பாங்கில் அமைந்த" },
  { en: "accelerator", ta: "விசை முடுக்கி" },
  { en: "accelerogram", ta: "முடுக்க வரைவி" },
  { en: "accent", ta: "அசை அழுத்தம், ஒலி எடுப்பு, ஒலி அழுத்தம்" },
  { en: "accent shift", ta: "ஒலியழுத்த நிலை மாற்றம்" },
  { en: "accentology", ta: "ஒலிப்பியல்" },
  { en: "accentuate", ta: "முகாமையாக்கு" },
  { en: "accept", ta: "ஏற்றுக்கொள், ஒப்புக்கொள்" },
  { en: "acceptability", ta: "ஏற்புத்திறன்" },
  { en: "acceptable", ta: "ஏற்கத்தக்க, இசைவு, ஏற்பு" },
  { en: "acceptance certificate", ta: "ஏற்புச் சான்றிதழ்" },
  { en: "acceptance clean", ta: "தெளிந்த ஏற்பு" },
  { en: "acceptance conditional", ta: "வரைக் கட்டுடனான ஏற்பு" },
  { en: "acceptance credit", ta: "கடனேற்பு" },
  { en: "acceptance for honour", ta: "மதிப்பிய ஏற்பு" },
  { en: "acceptance forged", ta: "போலி ஏற்பு" },
  { en: "acceptance general", ta: "பொது ஏற்பு" },
  { en: "acceptance local", ta: "உள்ளூர் ஏற்பு" },
  { en: "acceptance of bail", ta: "பிணை ஏற்பு" },
  { en: "acceptance of office", ta: "பதவி ஏற்பு" },
  { en: "acceptance of stock", ta: "இருப்புச் சரக்கு ஏற்பு" },
  { en: "acceptance of tender", ta: "ஒப்பந்தப்புள்ளி ஏற்பு" },
  { en: "acceptance partial", ta: "பகுதி ஏற்பு" },
  { en: "acceptance qualified", ta: "நிறைவுற்ற ஏற்பு" },
  { en: "acceptance rates", ta: "ஏற்பு விகிதம்" },
  { en: "accepted", ta: "ஏற்கப்பட்டது, ஏற்றுக்கொள்ளப்பட்டது" },
  { en: "accepted and countersigned", ta: "ஏற்புடன் மேலொப்பமிடப்பட்டது" },
  { en: "accepted in principle", ta: "கொள்கையளவில் ஏற்றுக்கொள்ளப்பட்டது" },
  { en: "acceptor", ta: "ஏற்பவர், ஏற்றுக்கொள்பவர்" },
  { en: "acceptor atom", ta: "ஏற்பணு" },
  { en: "acceptors ledger", ta: "ஏற்பவர் பேரேடு" },
  { en: "access", ta: "நுழைவு, நுழைவுரிமை, வழி, வாய்ப்பு" },
  { en: "access point", ta: "அணுகு நிலை" },
  { en: "accessibility", ta: "அணுக இயலும் தன்மை, காட்சிக்கு எளிமை" },
  { en: "accessible", ta: "அணுகத்தக்க, வாய்ப்பளிக்கத்தக்க" },
  { en: "accession", ta: "இணக்கம், உடைமையின் மேல் ஈட்டம், பதவியேற்பு" },
  { en: "accession rate", ta: "சேர் அளவியம், மேலீட்டக் கட்டணம்" },
  { en: "accession register", ta: "சேர்க்கைப் பதிவேடு" },
  { en: "accessory", ta: "துணைப் பொருள்" },
  { en: "accessory mineral", ta: "துணைக் கனிமம்" },
  { en: "accident", ta: "எதிர்பாரா நிகழ்ச்சி, ஏதம், நேர்ச்சி (விபத்து)" },
  { en: "accident insurance", ta: "நேர்ச்சிக் காப்பீடு" },
  { en: "accident leave", ta: "நேர்ச்சி விடுப்பு" },
  { en: "accident policy", ta: "நேர்ச்சிக் காப்பீட்டு ஆவணம்" },
  { en: "accident register", ta: "நேர்ச்சிப் பதிவேடு" },
  { en: "accident report", ta: "நேர்ச்சி அறிக்கை" },
  { en: "accident reserve fund", ta: "எதிர்பாரா நிகழ்வுகளுக்கான ஒதுக்கீட்டு நிதி" },
  { en: "accident risk", ta: "நேர்ச்சி நேரும் இடர்" },
  { en: "accident spot", ta: "நேர்ச்சி நிகழ்விடம், நேர்ச்சித் தளம்" },
  { en: "accidental", ta: "எதிர்பாராத, தற்செயலாய்" },
  { en: "accidial", ta: "அழையா அழைப்பு" },
  { en: "accite", ta: "சான்று காட்டு" },
  { en: "acclaim", ta: "ஆர்ப்பரி, பாராட்டு" },
  { en: "acclamation", ta: "பாராட்டுப் பேரொலி" },
  { en: "acclerometer", ta: "முடுக்க அளவி" },
  { en: "acclimatise", ta: "பழகிக்கொள், புதிய சூழலுக்குப் பழகிக்கொள்" },
  { en: "acclimatization", ta: "இணக்கப்பாடு" },
  { en: "accolade", ta: "சிறப்பித்தல்" },
  { en: "accombridgement", ta: "அடையா இலக்கு" },
  { en: "accommodating", ta: "உதவும் பான்மையுடைய, இட ஏந்து, ஒத்துப் போதல்" },
  { en: "accommodation control", ta: "குடியிருப்புக் கட்டுப்பாடு" },
  { en: "accommodation facility", ta: "குடியிருப்பு ஏந்து" },
  { en: "accommodation ladder", ta: "கப்பல் ஏணி" },
  { en: "accommodation party", ta: "உதவுநர்" },
  { en: "accommodative", ta: "ஒத்துப்போகும் இயல்புடைய" },
  { en: "accomodation", ta: "தங்கும் ஏற்பமைவு" },
  { en: "accompany", ta: "இணை சேர், உடன்செல், பின்தொடர்" },
  { en: "accomplice", ta: "உடந்தையாள், குற்றத்துணை, குற்றச்செயல் உடந்தையர்" },
  { en: "accomplish", ta: "நிறைவேற்று, முடித்துவிடு" },
  { en: "accomplishable", ta: "நிறைவேற்றத்தக்க" },
  { en: "accord", ta: "இசைவு, உடன்பாடு, ஒப்பந்தம், பொருத்தம்" },
  { en: "accord priority", ta: "முந்துரிமை அளி, முன்னுரிமை அளி" },
  { en: "accord sanction", ta: "ஒப்பளிப்பு வழங்கு" },
  { en: "accordance", ta: "இணக்கம், பொருத்தம், ஒத்த நிலை" },
  { en: "according", ta: "இசைய, ஏற்ப" },
  { en: "according to merit", ta: "திறமைக்கேற்ப" },
  { en: "accordingly", ta: "அதற்கிணங்க, அதன்படி, அவ்வண்ணமே" },
  { en: "accouchment", ta: "மகப்பேறு" },
  { en: "accouchur", ta: "மகப்பேற்று மருத்துவர்" },
  { en: "account", ta: "கணக்கு, கணிப்பு, மதிப்பீடு" },
  { en: "account adjusting", ta: "சரிக்கட்டல் கணக்கு" },
  { en: "account advances", ta: "முன் பணக் கணக்கு" },
  { en: "account bankers cheque", ta: "வங்கிக் காசோலைக் கணக்கு" },
  { en: "account blocked", ta: "முடக்கப்பட்ட கணக்கு" },
  { en: "account capital and revenue", ta: "மூலதனம், முதலீடு, வருவாய்க் கணக்கு" },
  { en: "account cash credit", ta: "பொருளீட்டுக் கடன் கணக்கு" },
  { en: "account charges", ta: "செலவுக் கணக்கு" },
  { en: "account chief", ta: "தலைமைக் கணக்காளர்" },
  { en: "account clerk", ta: "கணக்கெழுத்தர்" },
  { en: "account code", ta: "கணக்குவிதித் தொகுப்பு" },
  { en: "account commercial", ta: "வணிகக் கணக்கு" },
  { en: "account contra", ta: "எதிர்க் கணக்கு" },
  { en: "account current", ta: "நடப்புக் கணக்கு" },
  { en: "account days", ta: "கணக்கு நாள்கள்" },
  { en: "account deposit", ta: "வைப்பீட்டுக் கணக்கு" },
  { en: "account dept", ta: "கடன் கணக்கு" },
  { en: "account drafts", ta: "கேட்புறுதிக் காசோலைக் கணக்கு" },
  { en: "account for", ta: "கணக்குக் கொடு, காரணங் கூறு, விடை சொல்" },
  { en: "account individual", ta: "தனியாள் கணக்கு" },
  { en: "account joint", ta: "கூட்டுக் கணக்கு" },
  { en: "account judicial deposit", ta: "மன்ற வைப்புநிதிக் கணக்கு" },
  { en: "account liabilities", ta: "கணக்குப் பொறுப்புகள்" },
  { en: "account live", ta: "நடப்பிலுள்ள கணக்கு" },
  { en: "account loss", ta: "இழப்புக் கணக்கு" },
  { en: "account machine", ta: "கணக்குப் பொறி" },
  { en: "account maintanance", ta: "பேணுகைக் கணக்கு" },
  { en: "account matters", ta: "கணக்குத் தரவல்கள்" },
  { en: "account mutual", ta: "ஒன்றுக்கொன்றான கணக்கு" },
  { en: "account payee", ta: "கணக்காளரே தொகை பெறுநர்" },
  { en: "account profit", ta: "ஈட்டக் கணக்கு" },
  { en: "account public", ta: "அரசுக் கணக்கு" },
  { en: "account remittance", ta: "தொகை செலுத்தும் கணக்கு" },
  { en: "account sales", ta: "விற்பனைக் கணக்கு" },
  { en: "account security deposit", ta: "பிணையத் தொகைக்குக் கணக்கு" },
  { en: "account settled", ta: "தீர்க்கப்பட்ட கணக்கு" },
  { en: "account slip", ta: "கணக்குச் சீட்டு" },
  { en: "account stamp", ta: "முத்திரைக் கணக்கு" },
  { en: "account statement of", ta: "கணக்கு விளக்கப் பட்டியல்" },
  { en: "account sterling", ta: "மேலான கணக்கு" },
  { en: "account stock", ta: "இருப்புக் கணக்கு" },
  { en: "account transfer of", ta: "கணக்கு மாற்றம்" },
  { en: "accountability", ta: "பொறுப்புடைமை" },
  { en: "accountable", ta: "கணக்குப் பொறுப்புடைய" },
  { en: "accountancy", ta: "கணக்கியல்" },
  { en: "accountant", ta: "கணக்கர், கணக்காளர்" },
  { en: "accountant general", ta: "அரசுப் பொதுக் கணக்காய்வுத் தலைவர்" },
  { en: "accountant sub", ta: "சார் கணக்காளர்" },
  { en: "accounting", ta: "கணக்கு வைப்பு" },
  { en: "accounting procedure", ta: "கணக்கு வைப்பு முறை" },
  { en: "accounting professional", ta: "கணக்காயர்" },
  { en: "accounting year", ta: "கணக்காண்டு" },
  { en: "accounts military", ta: "படைத்துறைக் கணக்கு" },
  { en: "accounts of receivers", ta: "பொறுப்புரிமை பெறுவோர் கணக்குகள்" },
  { en: "accounts officer", ta: "கணக்கலுவலர்" },
  { en: "accounts payable", ta: "செலுத்த வேண்டிய கணக்குகள்" },
  { en: "accounts reconciliation of", ta: "கணக்கைச் சீர்செய்தல்" },
  { en: "accounts stated", ta: "குறிப்பிட்ட கணக்குகள்" },
  { en: "accredit", ta: "செல்வாக்களி, நம்பிக்கை அளி, மதிப்பேற்று" },
  { en: "accreditation", ta: "தகுதிக் குறியீடு, மதிப்புச் சான்றளிப்பு" },
  { en: "accredited agent", ta: "ஒப்புக்கொள்ளப்பட்ட முகவர்" },
  { en: "accretion", ta: "மேன்மேலும் வளர்ந்து கொண்டிருக்கிற" },
  { en: "accrual", ta: "இயல்பாகச் சேர்தல், தொகையேற்றம்" },
  { en: "accrue", ta: "சிறுகச் சிறுகச் சேர், தொகு" },
  { en: "acculturation", ta: "பண்பாட்டுப் பேறு" },
  { en: "accumulable", ta: "சேர்க்கத் தகுந்த" },
  { en: "accumulate", ta: "சேர், திரட்டு" },
  { en: "accumulated", ta: "திரட்டப்பட்ட" },
  { en: "accumulation stock", ta: "திறள் இருப்பு, இருப்புத் தேக்கம்" },
  { en: "accumulative", ta: "பெருகும், திரளும்" },
  { en: "accumulator", ta: "சேமிப்பவர்" },
  { en: "accumulator switchboard", ta: "சேமக்கலச் சொடுக்கிப் பலகை" },
  { en: "accupuncture", ta: "ஊசியழுத்தப் பண்டுவ வகை" },
  { en: "accuracy", ta: "துல்லியமான, நுட்பமான" },
  { en: "accurate", ta: "துல்லியம்" },
  { en: "accusation", ta: "குற்றச்சாட்டு" },
  { en: "accusatory", ta: "குற்றம் சாட்டக்கூடிய" },
  { en: "accuse", ta: "குற்றஞ்சாட்டு" },
  { en: "accused", ta: "குற்றஞ்சாட்டப்பட்டவர்" },
  { en: "accustom", ta: "பயிற்று, பழக்கு" },
  { en: "ace", ta: "திறனர்" },
  { en: "acedia", ta: "மந்தம்" },
  { en: "acellular", ta: "உயிரணுவற்ற" },
  { en: "acephalous", ta: "தலையற்ற" },
  { en: "acerbic", ta: "கூர்மையான பேச்சு" },
  { en: "acerbities", ta: "கடுமையான" },
  { en: "acerbity", ta: "சுடுசொல்" },
  { en: "acerose", ta: "கூர்முனை" },
  { en: "acerous", ta: "மோழை" },
  { en: "acetone", ta: "கறைநீக்கும் புளிமம்" },
  { en: "achalasia", ta: "உணவுக்குழாய் அலைவு" },
  { en: "acharne", ta: "முரட்டுத்தனம்" },
  { en: "achievable", ta: "சாதிக்கக்கூடிய" },
  { en: "achieve", ta: "இலக்கெய்துதல்" },
  { en: "achievement", ta: "அருஞ்செயல், இலக்கு அடைவு, அருவினை" },
  { en: "achiever", ta: "அருவினைஞர்" },
  { en: "achivement test", ta: "அடைவுத் தேர்வு" },
  { en: "acholia", ta: "பித்த நீரின்மை" },
  { en: "achromate", ta: "நிறக்குருடு, நிறம் காட்டாத" },
  { en: "achromatic combination", ta: "நிறமிலாக் கலவை" },
  { en: "achromatic lens", ta: "நிறநீக்கு ஆடி" },
  { en: "achromatic prism", ta: "நிறம் சேரா முப்பட்டகம்" },
  { en: "achromatically", ta: "வாய்மொழியான" },
  { en: "achromatism", ta: "நிறம் சேராத் தன்மை" },
  { en: "achromatopsia", ta: "நிறப்பார்வையின்மை" },
  { en: "achromotrichia", ta: "செம்பட்டை முடி" },
  { en: "achylia", ta: "பித்த நீரின்மை" },
  { en: "acicular", ta: "ஊசி வடிவான" },
  { en: "acicular texture", ta: "ஊசிப் படிவு" },
  { en: "acid", ta: "புளிமம் (அமிலம்)" },
  { en: "acid bath", ta: "காடிமுழுக்கு" },
  { en: "acid oil", ta: "வழலை நெய்" },
  { en: "acid rain", ta: "காடிமழை" },
  { en: "acid test", ta: "கடுந்தேர்வு, புளிம ஆய்வு" },
  { en: "acid dyes", ta: "காடிச் சாயம்" },
  { en: "acident", ta: "காடிக் கரைப்பான்" },
  { en: "acidimetry", ta: "காடியளவியல்" },
  { en: "acidity", ta: "புளிமத் தன்மை" },
  { en: "acidity constant", ta: "காடித்தன்மை மாறிலி" },
  { en: "acido meter", ta: "காடித்தன்மை அளவி" },
  { en: "acidolysis", ta: "காடிப் பகுப்பு" },
  { en: "acidometer", ta: "புளிம அளவி" },
  { en: "acid salt", ta: "காடி உப்பு" },
  { en: "acinesia", ta: "இயக்க நலிவு" },
  { en: "acknowledgement", ta: "ஒப்புகைச் சீட்டு" },
  { en: "acknowledgement of payee", ta: "தொகை பெறுபவர் ஒப்புகை" },
  { en: "aclasia", ta: "நோய் நிலை நீடிக்கும் பகுதி" },
  { en: "acme", ta: "உச்சி, முகடு" },
  { en: "acme zone", ta: "முகட்டு வெளி" },
  { en: "acne", ta: "முகப்பரு" },
  { en: "acne vulgaris", ta: "முகப்பருக் கட்டிகள்" },
  { en: "acoelomate", ta: "வயிற்றறையற்ற உடல்" },
  { en: "acolyte", ta: "திருமடத்துப் பணியாளர்" },
  { en: "aconian", ta: "நிலையான" },
  { en: "acorea", ta: "கண்மணி இன்மை" },
  { en: "acoria", ta: "இரைப்பை நிறை உணர்வு இழப்பு" },
  { en: "acosmist", ta: "இல்லையென்பவர்" },
  { en: "acoust", ta: "கற்பனை ஒலி கேட்டல்" },
  { en: "acoustic", ta: "ஒலிசார்" },
  { en: "acoustic amplifier", ta: "ஒலி பெருக்கி" },
  { en: "acoustic coupler", ta: "ஒலிப்பிணைப்பி" },
  { en: "acoustic dispersion", ta: "ஒலிச்சிதறல்" },
  { en: "acoustic energy", ta: "ஒலிசார் ஆற்றல்" },
  { en: "acoustic filter", ta: "ஒலிவடிப்பான்" },
  { en: "acoustic instrument", ta: "ஒலிக்கருவி, கேட்பொலிக் கருவி" },
  { en: "acoustic insulator", ta: "ஒலிசார் காப்பி" },
  { en: "acoustic meatus", ta: "செவிக் குழல்" },
  { en: "acoustic penertate", ta: "ஒலி ஊடுருவல்" },
  { en: "acoustic phonetics", ta: "கேட்பொலி ஒலியியல்" },
  { en: "acoustic relay", ta: "ஒலி அஞ்சல்" },
  { en: "acoustic resonance", ta: "கேட்பொலி ஒத்திசைவு" },
  { en: "acoustic saturation", ta: "கேட்பொலித் தெவிட்டுநிலை" },
  { en: "acoustic science", ta: "ஒலியியல்" },
  { en: "acoustic scientist", ta: "ஒலியியல் அறிவியலர்" },
  { en: "acoustic seal", ta: "ஒலி அடைப்பு" },
  { en: "acoustic spectrum", ta: "ஒலிசார் நிறமாலை" },
  { en: "acoustical sound enclosure", ta: "கேட்பொலித் தடுப்புறை" },
  { en: "acoustical tile", ta: "ஒலி ஈர்ப்பி" },
  { en: "acousticist", ta: "ஒலியியக்க இயலாளர்" },
  { en: "acousticophobia", ta: "ஒலியச்சம்" },
  { en: "acoustogram", ta: "மூட்டு இயக்க ஒலிவரைவு" },
  { en: "acpistoc coupler", ta: "கேட்பொலி இணைப்பி" },
  { en: "acquaint", ta: "அறிமுகமாக்கு, தெரிவி, பழக்கப்படுத்து" },
  { en: "acquaintance", ta: "அறிமுகமாயிருத்தல்" },
  { en: "acquest", ta: "பெறு பொருள்" },
  { en: "acquiesce", ta: "ஏற்றுக்கொள்" },
  { en: "acquiescence", ta: "உடன்படுதல், குறிப்பிசைவு" },
  { en: "acquirability", ta: "தேடிப் பெறுதல், முயன்று பெறுதல்" },
  { en: "acquirable", ta: "முயன்று பெறத்தக்க" },
  { en: "acquire", ta: "கையகப்படுத்து" },
  { en: "acquired character", ta: "ஈட்டுப்பண்பு" },
  { en: "acquired immunity", ta: "ஈட்டிய எதிர்ப்பாற்றல்" },
  { en: "acquisition", ta: "கையகப்படுத்துகை" },
  { en: "acquisition reference suit", ta: "பற்றுகை வழக்கு" },
  { en: "acquisitive", ta: "கவரும் ஆர்வமுடைய, கைப்பற்றும் ஆர்வமுடைய" },
  { en: "acquisitive society", ta: "ஈட்டற் குமுகம்" },
  { en: "acquisitiveness", ta: "ஈட்டற்பான்மை" },
  { en: "acquit", ta: "கட்டணத் தள்ளுபடி" },
  { en: "acquittal", ta: "கடன் விடுவிப்பு, குற்ற விடுதலை" },
  { en: "acquittance", ta: "பற்றொப்பம், கடன் தீர்த்தல், பெறுகைச் சீட்டு" },
  { en: "acquittance register", ta: "பற்றொப்பப் பதிவேடு" },
  { en: "acquittance roll", ta: "பற்றொப்பப் பட்டியல்" },
  { en: "acquried immunity", ta: "ஈட்டிய எதிர்ப்பாற்றல்" },
  { en: "acral", ta: "புறமுனை, புறமுனை சார்ந்த" },
  { en: "acratia", ta: "நலிவு" },
  { en: "acre", ta: "குறுக்கம்" },
  { en: "acreage", ta: "ஏக்கரில் நிலப் பரப்பளவு" },
  { en: "acrescent", ta: "மேன்மேலும் வளர்தல்" },
  { en: "acridology", ta: "பெயரும் கானியல்" },
  { en: "acrilan", ta: "செயற்கை கம்பளி வகை இழை" },
  { en: "acrimonious", ta: "எரிச்சலான, கடுமையான" },
  { en: "acrimony", ta: "கசப்புணர்வு" },
  { en: "acrisia", ta: "நோய்மூலம் அறியாமை" },
  { en: "acritochromacy", ta: "நிறப் பார்வை" },
  { en: "acrobat", ta: "கழைக்கூத்தாடி" },
  { en: "acrobatics", ta: "வானூர்தி கரண வேடிக்கை" },
  { en: "acrobranching", ta: "கிளைதாவி ஆட்டம்" },
  { en: "acrolith", ta: "தலையுரு" },
  { en: "acromatic", ta: "வாய்மொழியான" },
  { en: "acromegaly", ta: "உறுப்பு வீக்கம்" },
  { en: "acropathology", ta: "விரல் நோயியல்" },
  { en: "acropathy", ta: "கைகால் வலி" },
  { en: "acropetal", ta: "நுனிநோக்கிய" },
  { en: "acrophobe", ta: "கீழ்நோக்கு அச்சம்" },
  { en: "acropora", ta: "கடற்காஞ்சொறி" },
  { en: "acropora genes", ta: "கடற்காஞ்சொறி மரபணுக்கள்" },
  { en: "across", ta: "குறுக்காக" },
  { en: "across the board", ta: "நான்கு திசைகளிலும்" },
  { en: "acrostic", ta: "கரந்துறைப்பாட்டு" },
  { en: "acroteria", ta: "உச்சி மேடை, உயர்பீடம்" },
  { en: "acrylic paint", ta: "உடனுலர் வண்ணம்" },
  { en: "act", ta: "சட்டம், செயல்" },
];

// ── Deduplicate by English key ────────────────────────────────
const seen = new Set();
const WORDS = ALL_WORDS.filter(w => {
  if (seen.has(w.en)) return false;
  seen.add(w.en);
  return true;
});

// ── Split into exactly 5 rounds ───────────────────────────────
const ROUND_SIZE = Math.ceil(WORDS.length / 5);
const ROUNDS = Array.from({ length: 5 }, (_, i) =>
  WORDS.slice(i * ROUND_SIZE, (i + 1) * ROUND_SIZE)
);

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function buildOptions(correct, pool) {
  const wrong = shuffle(pool.filter(w => w.ta !== correct.ta)).slice(0, 3);
  return shuffle([correct, ...wrong]);
}

// ══════════════════════════════════════════════════════════════
export default function A_Part_1() {
  const [screen, setScreen] = useState("home");
  const [round, setRound] = useState(0);
  const [mode, setMode] = useState("en2ta");
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [flash, setFlash] = useState(null); // 'right' | 'wrong'
  const timer = useRef(null);

  const startQuiz = (r, m) => {
    const pool = ROUNDS[r];
    const qs = shuffle(pool).map(word => ({ word, options: buildOptions(word, pool) }));
    setRound(r); setMode(m); setQuestions(qs);
    setQIdx(0); setSelected(null); setScore(0); setAnswers([]);
    setFlash(null); setScreen("quiz");
  };

  const current = questions[qIdx];

  const handleSelect = opt => {
    if (selected) return;
    setSelected(opt);
    const ok = mode === "en2ta" ? opt.ta === current.word.ta : opt.en === current.word.en;
    setFlash(ok ? "right" : "wrong");
    setAnswers(p => [...p, { word: current.word, chosen: opt, ok }]);
    if (ok) setScore(s => s + 1);
    timer.current = setTimeout(() => {
      setFlash(null);
      if (qIdx + 1 < questions.length) { setQIdx(i => i + 1); setSelected(null); }
      else setScreen("result");
    }, 1200);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const progress = questions.length ? ((qIdx + 1) / questions.length) * 100 : 0;

  // ── HOME ─────────────────────────────────────────────────────
  if (screen === "home") return (
    <div style={S.bg}>
      <div style={S.card}>
        <div style={S.bigEmoji}>📚</div>
        <h1 style={S.h1}>ஆட்சிச் சொல்லகராதி</h1>
        <p style={S.subtitle}>Administrative Glossary Quiz</p>
        <div style={S.pill}>{WORDS.length} words · 5 rounds · ~{ROUND_SIZE} per round</div>

        <p style={S.sectionLabel}>Quiz Mode</p>
        <div style={S.modeRow}>
          {[["en2ta","🇬🇧 → 🇮🇳  English to Tamil"],["ta2en","🇮🇳 → 🇬🇧  Tamil to English"]].map(([m,label]) => (
            <button key={m} style={{...S.modeBtn,...(mode===m?S.modeBtnOn:{})}} onClick={() => setMode(m)}>{label}</button>
          ))}
        </div>

        <p style={S.sectionLabel}>Select Round</p>
        <div style={S.roundGrid}>
          {ROUNDS.map((r, i) => (
            <button key={i} style={S.roundBtn} onClick={() => startQuiz(i, mode)}>
              <span style={S.roundNum}>Round {i+1}</span>
              <span style={S.roundMeta}>{r.length} words</span>
              <span style={S.roundRange}>{r[0].en.slice(0,10)}…</span>
            </button>
          ))}
        </div>
      </div>
      <style>{FONTS}</style>
    </div>
  );

  // ── RESULT ───────────────────────────────────────────────────
  if (screen === "result") return (
    <div style={S.bg}>
      <div style={S.card}>
        <div style={S.bigEmoji}>{pct>=80?"🏆":pct>=50?"👏":"📖"}</div>
        <h2 style={S.h1}>Round {round+1} Complete!</h2>
        <div style={S.scoreBig}>{score} / {questions.length}</div>
        <div style={S.barWrap}><div style={{...S.barFill, width:`${pct}%`}}/></div>
        <p style={S.pctTxt}>{pct}% correct</p>

        <div style={S.reviewWrap}>
          {answers.map((a,i) => (
            <div key={i} style={{...S.reviewRow, background: a.ok?"rgba(0,200,80,.18)":"rgba(220,50,50,.18)", borderColor: a.ok?"#00c850":"#dd3333"}}>
              <span style={{color:"#c9a0ff",fontWeight:700}}>{a.word.en}</span>
              <span style={{color:"#888",margin:"0 6px"}}>→</span>
              <span style={{color:"#e0f0ff"}}>{a.word.ta}</span>
              {!a.ok && <div style={{color:"#ff9999",fontSize:11,marginTop:3}}>✗ You chose: {mode==="en2ta"?a.chosen.ta:a.chosen.en}</div>}
            </div>
          ))}
        </div>

        <div style={S.btnRow}>
          <button style={S.btnPrimary} onClick={() => startQuiz(round,mode)}>🔄 Retry</button>
          <button style={S.btnGhost} onClick={() => setScreen("home")}>🏠 Home</button>
        </div>
      </div>
      <style>{FONTS}</style>
    </div>
  );

  // ── QUIZ ─────────────────────────────────────────────────────
  const isCorrect = opt => mode==="en2ta" ? opt.ta===current.word.ta : opt.en===current.word.en;
  const question  = mode==="en2ta" ? current.word.en : current.word.ta;

  return (
    <div style={{...S.bg, background: flash==="right"?"linear-gradient(135deg,#0a2e1a,#0d2e4a)": flash==="wrong"?"linear-gradient(135deg,#2e0a0a,#1a0d1a)":"linear-gradient(135deg,#1a0533,#0d1f4a,#0a2e2a)", transition:"background .3s"}}>
      <div style={S.card}>
        <div style={S.header}>
          <button style={S.backBtn} onClick={() => { clearTimeout(timer.current); setScreen("home"); }}>← Home</button>
          <span style={S.progTxt}>{qIdx+1} / {questions.length}</span>
          <span style={S.scoreChip}>⭐ {score}</span>
        </div>
        <div style={S.barWrap}><div style={{...S.barFill, width:`${progress}%`}}/></div>

        <div style={S.modeTag}>Round {round+1} · {mode==="en2ta"?"English → Tamil":"Tamil → English"}</div>

        <div style={{...S.qBox, borderColor: flash==="right"?"#00c850": flash==="wrong"?"#dd3333":"rgba(160,100,255,.3)", boxShadow: flash==="right"?"0 0 24px rgba(0,200,80,.3)": flash==="wrong"?"0 0 24px rgba(220,50,50,.3)":"none"}}>
          <p style={S.qLabel}>What is the meaning of</p>
          <p style={S.qWord}>{question}</p>
        </div>

        <div style={S.optGrid}>
          {current.options.map((opt, i) => {
            const label = mode==="en2ta" ? opt.ta : opt.en;
            let extra = {};
            if (selected) {
              if (isCorrect(opt)) extra = S.optRight;
              else if (opt===selected) extra = S.optWrong;
            }
            return (
              <button key={i} style={{...S.opt,...extra}} onClick={() => handleSelect(opt)}>
                <span style={S.optLetter}>{String.fromCharCode(65+i)}</span>
                <span style={S.optTxt}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <style>{FONTS}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700&family=Libre+Baskerville:wght@700&display=swap');`;

const S = {
  bg: { minHeight:"100vh", background:"linear-gradient(135deg,#1a0533,#0d1f4a,#0a2e2a)", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"16px 8px 48px", fontFamily:"'Noto Sans Tamil','Libre Baskerville',serif", transition:"background .3s" },
  card: { width:"100%", maxWidth:520, background:"rgba(255,255,255,.045)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding:"22px 18px", color:"#fff", backdropFilter:"blur(12px)" },
  bigEmoji: { fontSize:52, textAlign:"center", marginBottom:4 },
  h1: { fontFamily:"'Libre Baskerville',serif", fontSize:21, textAlign:"center", margin:"0 0 4px", color:"#f5e6ff" },
  subtitle: { textAlign:"center", color:"#aab8ff", fontSize:13, margin:"0 0 10px" },
  pill: { display:"block", textAlign:"center", background:"rgba(160,100,255,.15)", border:"1px solid rgba(160,100,255,.25)", borderRadius:20, padding:"4px 14px", fontSize:12, color:"#c9a0ff", margin:"0 auto 18px", width:"fit-content" },
  sectionLabel: { fontSize:11, color:"#88a", textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" },
  modeRow: { display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" },
  modeBtn: { flex:1, padding:"10px 8px", borderRadius:10, border:"1.5px solid rgba(255,255,255,.18)", background:"rgba(255,255,255,.05)", color:"#bbb", cursor:"pointer", fontSize:12, fontWeight:600 },
  modeBtnOn: { background:"rgba(130,60,220,.45)", borderColor:"#9955ff", color:"#fff" },
  roundGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 },
  roundBtn: { display:"flex", flexDirection:"column", alignItems:"flex-start", padding:"13px 14px", borderRadius:12, border:"1.5px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.055)", color:"#fff", cursor:"pointer", textAlign:"left" },
  roundNum: { fontSize:14, fontWeight:700, color:"#c9a0ff" },
  roundMeta: { fontSize:11, color:"#88aacc", margin:"2px 0" },
  roundRange: { fontSize:10, color:"#556" },
  header: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 },
  backBtn: { background:"none", border:"none", color:"#aac", cursor:"pointer", fontSize:13 },
  progTxt: { color:"#ccc", fontSize:13, fontWeight:600 },
  scoreChip: { background:"rgba(200,160,255,.15)", padding:"3px 10px", borderRadius:20, fontSize:13, color:"#d4aaff" },
  barWrap: { height:5, background:"rgba(255,255,255,.1)", borderRadius:4, overflow:"hidden", marginBottom:14 },
  barFill: { height:"100%", background:"linear-gradient(90deg,#7c3aed,#a855f7)", borderRadius:4, transition:"width .4s" },
  modeTag: { textAlign:"center", fontSize:11, color:"#88a", marginBottom:14, letterSpacing:.5 },
  qBox: { background:"rgba(120,60,200,.18)", border:"1.5px solid rgba(160,100,255,.3)", borderRadius:14, padding:"18px 16px", marginBottom:16, textAlign:"center", transition:"border-color .3s, box-shadow .3s" },
  qLabel: { fontSize:11, color:"#aac", margin:"0 0 8px", textTransform:"uppercase", letterSpacing:.5 },
  qWord: { fontSize:21, fontWeight:700, color:"#f0e0ff", margin:0, lineHeight:1.4 },
  optGrid: { display:"flex", flexDirection:"column", gap:9 },
  opt: { display:"flex", alignItems:"center", gap:11, padding:"12px 15px", borderRadius:12, border:"1.5px solid rgba(255,255,255,.11)", background:"rgba(255,255,255,.05)", color:"#eee", cursor:"pointer", textAlign:"left", fontSize:13 },
  optRight: { background:"rgba(0,200,80,.25)", borderColor:"#00c850", color:"#90ffb0" },
  optWrong: { background:"rgba(220,50,50,.25)", borderColor:"#dd3333", color:"#ffaaaa" },
  optLetter: { width:27, height:27, borderRadius:"50%", background:"rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 },
  optTxt: { flex:1, lineHeight:1.4 },
  scoreBig: { fontSize:50, fontWeight:800, textAlign:"center", color:"#c9a0ff", margin:"8px 0 6px" },
  pctTxt: { textAlign:"center", color:"#aac", fontSize:13, marginBottom:14 },
  reviewWrap: { maxHeight:320, overflowY:"auto", display:"flex", flexDirection:"column", gap:6, marginBottom:18 },
  reviewRow: { padding:"8px 12px", borderRadius:8, border:"1px solid", fontSize:12, lineHeight:1.5 },
  btnRow: { display:"flex", gap:9 },
  btnPrimary: { flex:1, padding:13, borderRadius:12, border:"none", background:"linear-gradient(135deg,#7c3aed,#a855f7)", color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer" },
  btnGhost: { flex:1, padding:13, borderRadius:12, border:"1.5px solid rgba(255,255,255,.2)", background:"transparent", color:"#ccc", fontWeight:600, fontSize:14, cursor:"pointer" },
};
