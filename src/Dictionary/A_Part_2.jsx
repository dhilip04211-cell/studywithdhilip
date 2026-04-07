import { useState, useEffect, useCallback } from "react";

const ALL_PAIRS = [
  ["act of honour","பெருமைக்குரிய செயல்"],["act of supremacy","சீர்மைச் செயல்"],["act upto","சொன்னபடி செய், நிறைவேற்று"],["acted in service","பணியிலிருந்தவர்"],["acting","மாற்றாள்முறைப் பணியாற்றுகிற"],["acting arrangement","குறுங்கால ஏற்பாடு, இக்கால (தற்கால) ஏற்பாடு"],["acting consideration","தீவிரக் கவனித்தல்"],["acting in good faith","நல்லெண்ணத்துடன் செயலாற்றுதல்"],["acting incumbent","மாற்றாள்முறையில் பணிப் பொறுப்பாளர்"],["acting master","மாற்றுஆசிரியர்"],["acting personnel","மாற்றாள்முறைப் பணியாளர்"],["acting service","மாற்றாள் பணி"],["actinia","கடற்பஞ்சு"],["actinium","கதிரியம்"],["actinobiology","கதிரியஉயிரியல், கதிர்விளைவியல்"],["actinodromous","பல்கிளை"],["actinograph","கதிர்ச் செறிவு வரைவி"],["actinology","ஒளிவிளைவியல், ஊடுகதிரியக்கவியல்"],["actinomyces","உடுஉருக் காளான், விண்மீன் காளான்"],["actinomycosis","மரநாக்கு நோய்"],["action","செயல், நடவடிக்கை"],["action committee","நடவடிக்கைக் குழு"],["action taken report (A.T.R.)","எடுக்கப்பட்ட நடவடிக்கை பற்றிய அறிக்கை, செயலறிக்கை"],["actionable wrongs","நடவடிக்கைக்குரிய முறைகேடுகள்"],["actionotheraphy","கதிர்மருத்துவம்"],["activate","செயற்படுத்து, சுறுசுறுப்பாக்கு"],["activation","செயலாக்கம், இயக்கி வைத்தல், செயற்படுத்தல்"],["active","செயல்திறமுடைய"],["active consideration","முனைப்பாகக் கருதிப்பார்த்தல்"],["active demand","உடனடித் தேவை"],["active device","செயலுறு கருவி"],["active file","இயங்கு கோப்பு"],["active fishing","திறன் மீன்பிடித்தல்"],["active ingredients","ஆக்கக்கூறுகள், செயல்திறன்"],["active service","மும்முரப்பணி"],["active site","வினை நிகழுமிடம்"],["active support","மும்முரஆதரவு"],["active sympathy","முனைப்புப் பரிவு"],["active therapy","முனைப்புப் பண்டுவம்"],["active transport","விரைவுப் போக்குவரத்து"],["active unit","இயங்கும் பிரிவு"],["active window","இயங்குமுகப்பு"],["activity","செயல், நடவடிக்கை"],["actual","உள்ளபடியான"],["actual balance","சரியானஇருப்பு"],["actual expenditure","உண்மையான செலவு"],["actual figure","சரியான கணக்கு"],["actual journey time","சரியான பயணநேரம்"],["actual receipt","சரியானவரவு"],["actual turn over","உள்ளபடியானவிளை முதல்"],["actual value","மெய்ம்மதிப்பு"],["actualization","இயல்பாக்கம்"],["actually transported","சரியாகக் கொண்டு செல்கை"],["actuarial science","நிதி இடர்க் கணிப்பியல்"],["actuary","காப்பீட்டுக் கணிப்பாளர்"],["actuate","உந்து, ஏவு, தூண்டு"],["acuity","கூர்மை"],["aculeus","கொடுக்கு"],["acumen","நுண்ணறிவு"],["acupressure","தொடுகைப் பண்டுவம்"],["acupuncture","தொடுஊசிப் பண்டுவம்"],["acushla","ஆருயிர்"],["acute","கடுமையான, கூர்மையான, முனைப்பான"],["acute stage","நிகழ்வுஉடனிலை"],["acute stress disorder","இடைக்கால மனஅழுத்தநோய்"],["acute transient psychosis","இடைக்கால மனப்பிறழ்வு"],["acute cholicystitis","பித்தப்பைக் கடும்அழற்சி"],["acutely","மிகக் கடுமையான"],["acute nephritis","கடும்ஊறுநீர்அழற்சி"],["acute infection","கடுந்தொற்று"],["acyesis","கருவுறாமை"],["acylation","புளிமவேற்றம்"],["ad absurdum","பொய்யான"],["ad hockery","இடைக்காலத் தீர்வை"],["ad hominem","விளம்பரமாந்தர்"],["ad valorem","விலை மதிப்பீட்டின்படி"],["ad valorem duty","மதிப்பீட்டின்படி தீர்வை"],["adacity","உறுதிப்பாடு"],["adactylous","விரலற்ற"],["adactyly","பிறவிவிரல் இன்மை"],["adage","முதுமொழி"],["adamance","விடாப்பிடி"],["adamant","விடாப்பிடியான"],["adamantine","வன்மையான"],["adapt","தழுவு, பொருத்தமாக்கு"],["adaptability","பொருத்தமாக்கிக் கொள்ளும் தன்மை, சூழல் தகவமைப்பு"],["adaptation","பொருத்தமாக்கிக் கொள்ளுதல், தழுவல்"],["adaptation of law","சட்டத் தழுவல்"],["adapted law","தழுவல் சட்டம்"],["adapter","மாற்றமைவுப் பொறி"],["adaptive research","தகவமைவுஆராய்ச்சி"],["adaptive zone","தகவமை மண்டலம்"],["adaptor","தழுவிஎழுதியவர்"],["adatom","ஈர்ப்பணு, வெளிக்கவரணு"],["adaxial","இலை மேற்பரப்பு"],["add","இணை, சேர்"],["add back","பிற்சேர்க்கை"],["added entry","கூடுதல் பதிவு"],["addendum","பிற்சேர்க்கை, பின்னிணைப்பு"],["addict","பழக்கத்திற்கு அடிமை"],["addition","கூட்டல், சேர்த்தல்"],["additional","கூடுதல்"],["additional allotment","கூடுதல் ஒதுக்கீடு"],["additional charge","கூடுதல் பொறுப்பு"],["additional director general of police","காவல்துறைக்கூடுதல் தலைமை இயக்குநர்"],["additional examiner","கூடுதல் தேர்வாளர்"],["additional fee","கூடுதல் கட்டணம்"],["additional paper","துணைத் தாள்"],["additional post","கூடுதல் பணியிடம்"],["additional security","கூடுதல் பாதுகாப்பு, கூடுதல் பிணையம்"],["additional taxation","கூடுதல் வரிவிதிப்பு"],["additive","சேர்மானம்"],["additive metamorphism","கூடுதல்உருமாற்றம்"],["additivity","கூட்டுத் தன்மை"],["addlepated","குழம்பிய"],["addon","உட்செருகி"],["address","முகவரி"],["address of record","பதிவுமுகவரி"],["addressability","கண்டறி திறன்"],["addressee","பெறுநர், முகவரியாளர்"],["addressograph","முகவரி வரைதல்"],["adduce","எடுத்துச் சொல், சான்றாகக்கூறு"],["adduct","ஒன்றாக்கல்"],["adductor","தசை ஒடுக்கி"],["adductor pollicis","உள்ளொடுங்கு கட்டைவிரல்"],["adenoids","அடிமூக்குச் சதைவளர்ச்சி"],["adenology","சுரப்பியியல்"],["adenomatosis","சுரப்பிப் பெருக்கம்"],["adenopathy","நிணநீர்க் கோளநோய்"],["adephagia","கடும்பசி"],["adept","திறமுடையார், கைதேர்ந்தவர்"],["adequacy","ஏற்ற அளவு, போதுமானஅளவு"],["adequacy of data","போதுமானவிளக்கம்"],["adequate","ஏற்ற, போதிய"],["adequately","போதுமானவரை"],["adequately banked","போதிய வைப்பக ஏற்புப் பெற்றது"],["adequately staffed","போதுமான பணியாளர் அமைந்துள்ள"],["adflation","மிகை விளம்பரம்"],["adhere","ஒட்டியொழுகு, கடைப்பிடி"],["adherence of due dates","உரிய நாளில் செயற்படுதலைப் பின்பற்றுதல்"],["adherency","சார்பு"],["adherent","பின்பற்றுநர்"],["adhesion","ஒட்டுதல்"],["adhesive","ஒட்டிக்கொள்கிற, ஒட்டும் பசை"],["adhesive cell","ஒட்டற் கலம்"],["adhesive disc","ஒட்டு வட்டு"],["adhesives","ஒட்டிகள், பசைகள், பசைமங்கள்"],["adhesive stamp","ஒட்டுமுத்திரை, ஒட்டுவில்லை, பசை வில்லை"],["adhibit","இசைவளி"],["adhoc","அதற்கென அமைந்த, இடைக்கால, குறிப்பிட்ட ஒன்றிற்கென, தனிப்பட்ட, தனிநோக்கிற்கான"],["adhoc committee","இடைக்காலக் குழு"],["adhoc grant","இடைக்கால நல்கை"],["adhoc loans","தனிக் கடன்கள்"],["adhoc payment","இடைக்காலப் பணக் கொடுப்பு"],["adhoc relief","இடருதவிமுன்தொகை"],["adhoc rules","இடைக்காலவிதிகள், தற்கால விதிகள்"],["adhominem","வீண்தருக்கர்"],["adiabatic","வெப்பமாறா நிலை சார்ந்த"],["adiadochokinesis","நடுக்கநோய்"],["adiphoron","மாறுபடுந் தன்மை"],["adipose","உயிரிக் கொழுப்பு"],["adipose cell","கொழுப்புஉயிரணு"],["adipose tissue","கொழுப்பிழைமம்"],["adipsa","நீர் வேட்கை முறிப்பான், நீர் வேட்கை இன்மை"],["aditive morpheme","கூட்டுருபன்"],["adjacent area","அண்மைப் பகுதி"],["adjoin","அடுத்திரு, சார்ந்திரு"],["adjourn","ஒத்தி வை"],["adjourn sine die","நாள் குறிப்பிடாமல் ஒத்தி வை"],["adjournment motion","ஒத்திவைப்புத் தீர்மானம்"],["adjudge","உறுதிப்படுத்து, தீர்ப்புக்கூறு, முடிவு செய்"],["adjudicate","தீர்ப்பளி"],["adjudication","தீர்ப்பு"],["adjudication committee","தீர்ப்புக் குழு"],["adjudicator","தீர்ப்பாளர்"],["adjunct","தொடரடை, தழுவிய"],["adjure","ஆணை உறுதிமொழியின்படி வழிப்படுத்து"],["adjust","சரிக்கட்டு, பொருத்திக்கொள்"],["adjustable","தகவமைக்கவல்ல, தகவான"],["adjusting account","சரிக்கட்டல் கணக்கு"],["adjusting heads","கணக்கைச் சரிக்கட்டும் தலைப்புகள்"],["adjustment","சரிக்கட்டல், சரிப்படுத்தல்"],["adjustment bill","சரிக்கட்டல் பட்டி"],["adjustment by transfer","மாற்றிச் சரிக்கட்டல்"],["adjustment disorder","இணக்கநோய்"],["adjustment entries","சரிக்கட்டல் பதிவுகள்"],["adjustment register","சரிக்கட்டல் பதிவேடு"],["adjutant","படைத்துறை உதவி அலுவலர்"],["adjuvante","துணையூக்கி"],["adlet","கலைத்திறன்"],["administer","ஆட்சிசெய், நிருவகி"],["administration","ஆட்சி, ஆளுகை, நிருவாகம் செலுத்துதல்"],["administration of estates","வளாக ஆளுகை"],["administration of justice","நீதி செலுத்துதல், முறை செய்தல், நீதி வழங்கல்"],["administration of oath","உறுதிமொழி ஏற்கச் செய்தல், பதவியேற்பு செய்து வைத்தல்"],["administration report","ஆட்சிஅறிக்கை"],["administrative authority","ஆட்சிஆணைக் குழு"],["administrative city","ஆட்சி மாநகர், நிருவாக நகரம்"],["administrative control","ஆட்சிக் கட்டுப்பாடு"],["administrative expenses","ஆட்சிச் செலவுகள், நிருவாகச் செலவுகள், ஆளுமைச் செலவினம்"],["administrative glossary","ஆட்சிச் சொல்லகராதி"],["administrative head","ஆட்சித் தலைவர், நிருவாகத் தலைமை"],["administrative intelligence","ஆட்சி நுண்ணறிவு"],["administrative officer","ஆட்சி அலுவலர், நிருவாக அலுவலர்"],["administrative power","ஆட்சி அதிகாரங்கள்"],["administrative sanction","நிருவாக ஒப்பளிப்பு"],["administrative section","நிருவாகப் பிரிவு"],["administrative tribunal","நிருவாகத் தீர்ப்பாயம்"],["administrator","ஆட்சியாளர், நிருவாகி"],["administrator-general","தலைமை ஆட்சியாளர், பேராட்சியாளர்"],["administrivia","நிருவாக அடிப்படைப் பணிகள்"],["adminship","நிருவாகத் தன்மை"],["admirable","அரிய, போற்றும்படியான, மெச்சத்தக்க"],["admiralty","கடற்படைத் தலைமை"],["admiralty chart","கடலாண்மை வரைபடம்"],["admire","போற்று"],["admiringly","புகழ்ச்சியாக"],["admissibility","ஏற்கத்தக்க தன்மை"],["admissible","ஏற்கத்தக்க"],["admissible allowances","ஏற்கத்தக்க படிகள், உரிய படிகள்"],["admission","அனுமதித்தல், ஏற்பு, ஏற்றுக்கொள்ளுதல், ஒப்புக் கொள்ளுதல், சேர்க்கை, சேர்த்தல், நுழைவு"],["admission of claim","உரிமைக் கோரிக்கை ஏற்பு"],["admission policy","இசைவுக் கொள்கை"],["admission register","சேர்க்கைப் பதிவேடு"],["admission to bail","பிணை ஏற்பு, பிணை இசைவு"],["admit","ஒப்புக்கொள், நுழையவிடு"],["admittedly","மறுப்புக்கு இடமின்றி"],["admix","கலவை, சேர்"],["admixture","கலவை"],["admonish","அறிவுறுத்து, எச்சரி"],["admonisher","அறிவுறுத்துபவர்"],["admonition","எச்சரிப்புரை, கடிந்துரை"],["adnexus","அண்ணுறுப்பு"],["adolescence","வளரிளமை, குமரப் பருவம், விடலைப் பருவம்"],["adolescent","இளமைப் பருவத்திலுள்ள"],["adolesentertainer","பதின்பருவப் பொழுதுபோக்கர்"],["adopt","தத்து எடு, மேற்கொள்"],["adoptee","தத்தெடுக்கப்பட்டவர்"],["adopter","தத்தெடுப்பவர்"],["adoption","தத்து எடுத்தல்"],["adorable","பூசிக்கத் தகுந்த, வணங்கத் தகுந்த"],["adore","வணங்கு, பத்தி செய், மிக்கஅன்பு செலுத்து, மிக்கமதிப்புக் கொடு"],["adorn","அணிசெய், அழகுபடுத்து"],["adornment","அணி செய்தல், அழகுபடுத்துதல், ஒப்பனை செய்தல்"],["adoxography","சீர்மிகு எழுத்தாற்றல்"],["adrenalize","ஊக்கமூட்டு"],["adrift","அலைப்புண்டு"],["adroit","கைதேர்ந்த"],["adscititious","புறஞ்சார்"],["adscript","பின்னர் எழுதப்பட்ட"],["adsorb","ஈர்ப்பி"],["adsorbent","பரப்புக் கவர்பொருள்"],["adsorption","உறிஞ்சுதல்"],["aduantas","புத்திடப் பேரச்சம்"],["adulation","போற்றுதல், மகன்மை கொளல், முகமன்"],["adulescenophile","இளமை விரும்பி"],["adult","அகவை முதிர்ந்தோர், முதியோர்"],["adult education","முதியோர் கல்வி, அகவை வந்தோர் கல்வி"],["adult franchise","உரிய அகவை வந்தோர் வாக்குரிமை"],["adult literacy","அகவை வந்தோர் எழுத்தறிவு"],["adult population","அகவை வந்தோர் மக்கள்தொகை"],["adulterated","கலப்படம் செய்யப்பட்ட"],["adulteration","கலப்படம்"],["adultery","ஒழுக்கக் கேடு, கூடா ஒழுக்கம்"],["adult-hood","முதிர்ச்சிப் பருவம்"],["adumbrate","கோடிட்டுக் காட்டு, மேலோட்டமாக விவரி, கமுக்கமாக அறிவி"],["advance","முன்பணம், முன்னேறு"],["advance collection","முன் தண்டல்"],["advance copy","முன் படி"],["advance register","முன்பணப் பதிவேடு"],["advanced","முற்போக்கான, மேம்பட்ட"],["advanced therapy","மேம்பட்டமருத்துவம்"],["advancement","உயர்வு, முன்னேற்றம்"],["advection","வெப்பச்சுழற்சி"],["advantage","ஆக்கப்பாடு, நன்மை, மேன்மை"],["advent","வருகை"],["adventure","வீரச் செயல்"],["adventurism","செயல்துணிவு"],["adversary","எதிரி, பகைவர்"],["adverse","எதிரான"],["adverse action","எதிரான நடவடிக்கை"],["adverse comment","எதிரான கருத்து"],["adverse effect","எதிர்விளைவு"],["adverse enjoyment","எதிர்நிலை நுகர்வு"],["adverse finding","எதிர்மறை கண்டுபிடித்தல்"],["adverse possession","எதிர்நிலை உடைமை"],["adverse remark","எதிரான குறிப்புரை"],["adverse report","எதிரான அறிக்கை"],["adverse season","கேடான பருவம், தீங்கான பருவம்"],["adverse title","எதிரான உரிமை, மாறான உரிமை"],["adversity","இன்னல், துன்பம்"],["advertence","கவனம், விழிப்பு"],["advertise","விளம்பரப்படுத்து"],["advertised time","விளம்பரப்படுத்திய நேரம்"],["advertised vacancies","அறிவிக்கப்பட்ட காலியிடங்கள்"],["advertisement","விளம்பரம்"],["advertisement rate","விளம்பரக் கட்டணவீதம்"],["advertisementophobia","விளம்பர அச்சம்"],["advertisers","விளம்பரவினைஞர், விளம்பரக்காரர்"],["advertising programme","விளம்பர நிகழ்ச்சி"],["advertising signboard","விளம்பரப் பலகை"],["advertising time","விளம்பர நேரம்"],["advertorial","விளம்பரப் பதிப்புரை"],["advice","அறிவுரை"],["advice book","அறிவிப்புப் புத்தகம்"],["advice list","அறிவிப்புப் பட்டி"],["advice note","அறிவிப்புக் குறிப்பு"],["advice slip","அறிவிப்புச் சீட்டு"],["advisable","பரிந்துரைக்கத்தக்க"],["advise","அறிவுரை கூறு, நல்லுரை கூறு"],["advised","தெரிவிக்கப்பட்டது"],["adviser","அறிவுரையாளர், அறிவுரைஞர், கருத்துரையாளர்"],["advising bank","அறிவிக்கும் வங்கி"],["advisory","அறிவுரை கூறுகிற"],["advisory board","அறிவுரைக் குழுமம், அறிவுரை வாரியம்"],["advisory committee","அறிவுரைக் குழு, மதியுரைக் குழு"],["advisory memo","அறிவுரைக் குறிப்பு"],["advisory opinion","அறிவுரைக் கருத்து"],["advocate","வழக்குரைஞர்"],["advocate-general","மாநில அரசுத் தலைமை வழக்குரைஞர்"],["adware","விளம்பர மென்பொருள்"],["adynamic ileus","குடலடைப்பு"],["adze","வாய்ச்சி, செதுக்குளி"],["adz-eye hammer","செங்கோணமுகப்புச் சம்மட்டி"],["aecidium","குடைக் காளான்"],["aedoeology","இன உறுப்பியல்"],["aeena","நுண்மை"],["aefalta","மணப் புல்"],["aeger","நோய்ச் சான்று"],["aegis","ஆதரவுச் செயலுக்குப் பிந்தைய எண்ணம்"],["aeipathy","கட்டுப்பாடற்ற நோய்"],["aeolian deposit","காற்றடிப் படிவு"],["aeolian harp","யாழ்வகை"],["aeolian mode","இசைக் குறியீடு"],["aeolian rock","வளிமணல் பாறை"],["aeolian soil","காற்று குவித்தமண்"],["aeolipyle","ஆவியியக்கஉருளை"],["aeolotropy","இயற்பியல் மாற்றம்"],["aeonian","நிலைபேறுடைய"],["aerated water","காற்றூட்டப்பட்டநீர்"],["aerating root","மூச்சு வேர்"],["aerial","அலைவாங்கி, வான்கம்பி"],["aerial encroachment","வான்வெளி வரைகடப்பு"],["aerial photo","வான்வழி ஒளிப்படம்"],["aerial photogrammetry","வான்வழி ஒளிப்பட முறை"],["aerial photographing","வான்வழிப் படப்பிடிப்பு"],["aerial spray","வான்வழித் தெளிப்பு"],["aerial survey","வான்வழி ஆய்வு"],["aerie","பெரும் பறவைக்கூடு"],["aero plankton","வளி நுண்ணுயிரி"],["aero space","காற்றுவெளி"],["aeroallergen","காற்றுவழி ஒவ்வாமைப்பொருள்"],["aeroballistic missile","விண்வழி ஏவுகணை"],["aerobe","காற்று வாழுயிர்"],["aerobiology","காற்றுஉயிரியல், வளி உயிரியல்"],["aerobridge","வானூர்தி இணைப்பு"],["aerodonetics","வானூர்தி இயல்"],["aerodrome","வானூர்தி நிலையம்"],["aerodynamics","வளியியக்க இயல்"],["aerofoil lift","வானூர்தி இறக்கை உயர்த்தல்"],["aerogram","வான்வழி அஞ்சல்"],["aerolite","விண்கல்"],["aerolithology","விண்கல்லியல்"],["aerology","காற்றியல்"],["aeromancy","வானிலை முன்னறிவிப்பு"],["aeromedicine","வான் நோய்மருத்துவம்"],["aerometer","காற்றுஅளவி, வளிமானி"],["aeronausiphobia","வான்செலவு குமட்டலச்சம்"],["aeronautical education","வானூர்தியியற் கல்வி"],["aeronautics","வானூர்தி இயல், வானூர்திக் கலை"],["aerophagia","வாய்வளி உயிர்ப்பு"],["aerophobia","கடுங் காற்றச்சம்"],["aerophyte","ஒட்டுயிர்ச்செடி"],["aeroplane","வானூர்தி"],["aeroplankton","காற்று நுண்ணுயிரி"],["aeroponics","காற்றூடக வளர்ப்பு"],["aerosol","தூசுப்படலம்"],["aerosol transmission","வளி தொற்றுப் பரவல்"],["aerostat","மிதவை"],["aerostatics","வளிப்புள்ளியியல், காற்றழுத்தவியல்"],["aerotaxis","உயிர்வளி இயக்கம்"],["aerotropism","வளிநோக்கு வளர்ச்சி"],["aesculin","வாதுமை இனிப்புச் சத்து"],["aesophile","மாழை விரும்பி"],["aesopian","உட்பொருட்சொல்"],["aesthetic","அழகியல் சார்ந்த"],["aesthetic arts","அழகியல் கலைகள், கவின்கலை"],["aesthetic pleasure","அழகின்பம்"],["aesthetic sense","அழகியலுணர்வு, முருகியலுணர்வு, அழகுணர்வு"],["aesthetic value","முருகியல் மதிப்பீடு"],["aesthetician","அழகுக் கலைஞர்"],["aestivation (of floral parts)","பூஉறுப்பொழுங்கு"],["aethrioscope","வானிலை வெப்பஅளவி"],["aetiology","நோய்க்காரணி"],["afebrile","காய்ச்சலற்ற, குற்றச்சாட்டு"],["afeno virus","சுரப்பி நச்சியம்"],["affable","நல்லியல்பான"],["affair","அலுவல், குறிப்பிடத்தக்க நடப்பு, செயல், செய்கை, நிகழ்ச்சி, நிலை, பொதுச் செய்தி"],["affaire de coeur","காதல் நிகழ்வு"],["affect","தாக்கம்"],["affectation","பாசாங்கு"],["affected gait","ஒய்யார நடை, ஒயில் நடை"],["affection","ஆசை, உள்ளன்பு, பற்று, பாசம்"],["afferent nerve","உட்செல் நரம்பு"],["afferent tracts","கடத்தும் நரம்புத் தடங்கல்"],["affidavit","ஆணை உறுதிஆவணம், உறுதி ஆவணம், ஆணை உறுதி வாக்குமூலம்"],["affiliated","இணைக்கப்பெற்ற"],["affiliation","இணைத்தல்"],["affiliation fee","இணைப்புக் கட்டணம்"],["affinal","திருமண உறவு"],["affine","உறவுடைய"],["affinity","இன உறவு, உறவு"],["affirm","உறுதி செய், முறைப்படி அறிவி, வலியுறுத்திக்கூறு, உறுதியுரை"],["affirmant","உறுதிகூறுபவர்"],["affirmation","உறுதியேற்றல்"],["affirmative","இசைவான, ஒப்புதலான"],["affix","இணை, ஒட்டு, முன்னிணைப்பு"],["afflatus","அருளூக்கம்"],["afflict","அல்லற்படுத்து, துயருறுத்து"],["afflicted","அல்லற்பட்ட, துயருற்ற"],["affliction","இடும்பை"],["affliction in the eyes","கண்ணோய்த் தொற்று"],["affluence","செல்வச் செழிப்பு, செழுமை, அவாநோய்"],["afford","இயலும் நிலையோடிரு, வாய்ப்பளி"],["afford facilities","இயலும் ஏந்து"],["afforesaid","மேற்கூறிய"],["afforest","காடு வளர்"],["afforestation","காடு வளர்ப்பு"],["affray","அமளி, கலவரம்"],["affreightment","வாடகைக் கலம்"],["affricate","தடையுறழ் ஒலி"],["affright","அச்சுறுத்துதல்"],["aficionado","ஆர்வலர்"],["afield","களத்தில்"],["aflatoxin","பூசண நஞ்சு"],["afloat","குறிக்கோளில்லாப் போக்கு"],["afore","எதிரில், முன்பாக, முன்னால்"],["aforehand","முன்னதாக"],["aforementioned","முற்கூறிய"],["aforesaid","முன்சொன்ன, மேற்சொன்ன"],["aforethought","முற்கருத்து, முன் நினைவு, முற்சிந்தனை"],["afresh","புதிதாக, மறுபடியும், மீண்டும்"],["after all","எப்படியிருந்தாலும்"],["after care","மருத்துவத்திற்குப் பின் பேணல்"],["after careful consideration","கவனமாகக் கருதியபின்"],["after clap","புறனடை விளைவு"],["after effect","பின்விளைவு, விளைவுக்குப் பின்"],["after sales service","வணிகத்திற்குப் பிந்திய சேவை"],["aftersight","பார்வைக்குப் பின்"],["afterthought","செயலுக்குப் பிந்தைய எண்ணம், துணிந்த பின் எண்ணுதல், பின் எண்ணம்"],["after-care","பிற்காப்பு"],["after-care home","பிற்காப்பகம், பிற்காப்பு இல்லம்"],["afterdate","பின்நாளில்"],["aftergame","மறிநிலை ஆட்டம்"],["afterglow","ஒளிர்வு"],["afternoon (P.M.)","பிற்பகல் (பி.ப.)"],["after-party","விருந்துக்குப் பின்னிகழ்வு"],["afterpiece","துணைக் காட்சி"],["aftershaft","தூரிகை இறகு"],["aftershock","பின்னதிர்வு"],["afterword","பின்னுரை"],["agalactia","பால்வற்றுதல்"],["agamogenesis","கலப்பற்ற விலங்கு"],["agamospermy","கருவுறாவிதை"],["aganippe","கவிஊற்று"],["agape","அங்காந்து"],["agar","கடற்கோரை வகை"],["agar slope","பாசிச் சரிவு"],["agarbathies","அகில் மணக்குச்சிகள்"],["agastric","உணவுக் குழலற்ற"],["agate","ஒள்ளூரியம், கடினமான ஒரு வகைக் கல், கடுங்கல், மணிக்கல்"],["agate bearings","செம்மணி தாங்கி, சிவப்புக் கல் தாங்கி"],["agate box","செம்மணிப் பேழை, சிவப்புக் கல்பெட்டி"],["agate burnisher","கல் மெருகேற்றும் கருவி"],["agathokakological","நல்லது கெட்டது கலந்த"],["agathon","சான்றோன்"],["agaze","வெறித்து நோக்கி"],["age","அகவை"],["age certificate","அகவைச் சான்றிதழ்"],["age exemption","அகவை விலக்களிப்பு, அகவை விலக்கு"],["age group","அகவைப் பிரிவு, அகவைத் தொகுதி"],["age limit","அகவை வரம்பு"],["age of discretion","தன்னறிவு அகவை"],["age of superannuation","மூப்பு அகவை"],["ageing","முதிர்ச்சி, முதுமையடைதல்"],["agelast","சிடுமூஞ்சி"],["agency","முகமை, முகவாண்மை, முகவாண்மையகம்"],["agency agreement","முகமை உடன்பாடு"],["agency arrangement","முகமை ஏற்பாடு"],["agency fee","முகமைத் தொகை"],["agency function","முகமைப் பணி"],["agenda","பொருள் நிரல்"],["agent","முகவர்"],["agent exporting","ஏற்றுமதி முகவர்"],["agent forwarding","அனுப்புகை முகவர்"],["agent general","தலைமை முகவர்"],["agent importing","இறக்குமதி முகவர்"],["agent neutral","நடுநிலை முகவர்"],["agent organisation","முகவர் அமைப்பு"],["agent provocateur","உள்உளவாளி"],["agent sole","தனியுரிமை முகவர்"],["agent commission","தரகு முகவர்"],["agent auctioneering","ஏல முகவர்"],["agent space","முகவர் பகுதி"],["age-old practice","தொல்கால நடைமுறை"],["agewise classification","காலமுறை வகைப்பாடு"],["agger","செய்யரண், காப்பரண்"],["agglomeration","கூட்டு"],["agglomeration economics","பல்கூட்டுப் பொருளியல்"],["agglutinated shell","மேலணு ஓடு"],["agglutination","ஒட்டிஉருவாதல்"],["aggrandisement","செல்வாக்குப் பெருக்குதல்"],["aggrandize","ஆற்றல் அதிகரிக்கும்"],["aggravate","சிக்கலாக்கு, சினமூட்டு, தீங்கைப் பெருக்கு"],["aggregate fruit","பூத்திரள் கனி"],["aggregate income","மொத்த வருவாய்"],["aggregate indemnity","மொத்த ஈட்டுறுதி"],["aggregate value","மொத்த மதிப்பு"],["aggregating","எல்லாம் சேர்த்து, மொத்தமாக"],["aggregation","கூட்டுச் சேர்க்கை"],["aggression","வலியத் தீங்கு செய்தல், மோதல் போக்கு, பொல்லாங்கு செய்தல்"],["aggressive","கடுந்தாக்கு"],["aggressive commentary","கடுந்தாக்குரைகள்"],["aggressive posture","தாக்குந் தோரணை, தாக்கும் நிலை கோடல்"],["aggressiveness","தாக்கும் மனப்பான்மை"],["aggressor","வம்பன்"],["aggrieved","இடருற்ற, தீங்குற்ற, மனக்குறையுடைய"],["aggrieved person","உறுகுறைத் தரப்பினர், உறுகுறையர், உறுவலர், உறுவல் தரப்பினர்"],["aggulutination","திரளொட்டுதல்"],["agile","சுறுசுறுப்பான"],["aginner","திட்ட எதிர்ப்பர்"],["agio","நாணயமாற்றுத் தொகை, நாணயமாற்றுக் கட்டணம்"],["agiotage","நாணயமாற்றுத் தொழில், பங்குமாற்றுத் துறை"],["agister","கால்நடை மேய்ச்சல் அலுவலர்"],["agita","பதற்ற உணர்வு"],["agitate","கிளர்ச்சி செய், குழப்பம் செய், தூண்டிவிடு, போராடு"],["agitation","கலகம், கிளர்ச்சி, பதற்றம்"],["agitato","நடுங்கிசை"],["agitator","குலுக்கி"],["agitographia","சொல்விடுபட்டு எழுதுதல் நோய்"],["agitophasia","மீவிரைவுப் பேச்சு"],["aglutition","விழுங்கவியலாமை"],["agnate","பங்காளி"],["agnatic descent","ஆண்வழி மரபு"],["agnation","தந்தை வழியுறவு"],["agnoiology","வெளிற்றியல்"],["agnomen","பட்டப்பெயர்"],["agnosia","புலன் உணர்வின்மை"],["agnostic","பருப்பொருள் கொள்கையர்"],["ago","முற்காலத்தில், முன்பு"],["agog","ஆவலுடன், மகிழ்வுடன்"],["agoing","சென்றுகொண்டிருக்கின்ற"],["agomphiasis","பல்லின்மை, பொக்கை"],["agon","போட்டி"],["agone","கடந்த, கழிந்த"],["agonist","தூண்டி"],["agonistics","வீரப் போட்டிகளுக்குரிய"],["agonize","கடுந்துயரளி"],["agony","துயரம், நோவு, கடுந்துன்பம், வருத்தம்"],["agoraphilia","திறந்தவெளி மிகை நாட்டம்"],["agoraphobia","திரள் மருட்சி"],["agra","கடும் வலி, தாக்கம்"],["agraffe","வண்ணமயமான"],["agrammatism","கோவையற்ற பேச்சு"],["agranulocytosis","வெள்ளணுக்களற்ற நிலை"],["agraphia","எழுதமுடியாமை"],["agrarian","வேளாண்மைத் தொடர்பான"],["agrarian economy","நிலவுடைமைப் பொருளியல்"],["agrarian problem","வேளாண்மைச் சிக்கல்"],["agree","இணங்கு, உடன்படு, ஒப்புக்கொள்"],["agreeable","இசைவான, ஏற்றதான"],["agreeableness","ஒத்திருக்கும் தன்மை"],["agreed","இசைவளிக்கப்பட்ட, ஏற்கப்பட்ட, ஒப்புக்கொள்ளப்பட்ட"],["agreed pattern of staff","ஒப்புதல் பெற்ற பணியாளர் தொகுதி"],["agreement","இணக்கம், உடன்படிக்கை"],["agreement and contract","உடன்படிக்கையும் ஒப்பந்தமும்"],["agreement bond","உடன்படிக்கைப் பிணைமுறி"],["agreement holder","ஒப்பந்தக்காரர்"],["agreement with government","அரசுடன் இணக்கம், அரசுடன் உடன்படிக்கை"],["agrestal","பயிரிடப்பட்ட நிலம்"],["agricultural calendar","வேளாண் கால அட்டவணை"],["agricultural college","வேளாண் கல்லூரி"],["agricultural credit society","வேளாண் கடன் வழங்கும் சங்கம்"],["agricultural demonstration","வேளாண் செயல்முறை விளக்கம்"],["agricultural depot","வேளாண் கிடங்கு"],["agricultural economy","வேளாண்மைப் பொருளியல்"],["agricultural experiments","வேளாண் ஆய்வுகள்"],["agricultural finance","வேளாண்மை நிதி"],["agricultural hub","வேளாண் நடுவம்"],["agricultural implements","வேளாண் கருவிகள்"],["agricultural income","வேளாண் வருவாய்"],["agricultural journal","வேளாண் செய்தியிதழ்"],["agricultural labour","வேளாண் தொழிலாளர்"],["agricultural loans","வேளாண் கடன்கள்"],["agricultural marketing society","வேளாண் பொருள் விற்பனைச் சங்கம்"],["agricultural mechanization","வேளாண் எந்திர வயமாக்கல்"],["agricultural operations","வேளாண் பணிகள்"],["agricultural produce","வேளாண் விளைபொருள்"],["agricultural raw materials","வேளாண் இடுபொருள்"],["agricultural refinance corporation","வேளாண் மறுநிதியுதவிக் கழகம்"],["agricultural research station","வேளாண் ஆராய்ச்சி நிலையம்"],["agricultural society","வேளாண் சங்கம்"],["agricultural statistics","வேளாண் புள்ளிவிவரம்"],["agricultural year","உழவாண்டு"],["agriculture","உழவு, வேளாண்மை"],["agriculturists debt relief","உழவர் கடன் இடருதவி, உழவர் கடன் தணிப்பு"],["agriology","பழங்குடி வழக்கியல்"],["agritecture","வேளாண் கட்டடக் கலை"],["agritourism","வேளாண் உலா"],["agro centre","வேளாண் அங்காடி, வேளாண் நடுவம், வேளாண் மையம்"],["agro ecology","வேளாண் சூழலியல்"],["agro forestry","வேளாண் கானியல்"],["agro implements","வேளாண் துணைக் கருவிகள்"],["agro industries","வேளாண் தொழிலகங்கள், வேளாண் தொழில்கள்"],["agro industry","வேளாண்சார் தொழில்"],["agro meteorology","வேளாண் வானிலையியல்"],["agro service","உழவுப் பணி, வேளாண் பணி"],["agro service centre","வேளாண் பணி நடுவம், வேளாண்மைப் பணி மையம்"],["agrobacterium","வேளாண் நுண்ணுயிரியியல்"],["agrobiology","பயிர்ஊட்டவியல்"],["agro-climatic zone","வேளாண் பருவ மண்டலம்"],["agroforestry","பண்ணைக்காடு"],["agrology","பயிர்மண்ணியல்"],["agromania","தனிவாழ்க்கைவெறி"],["agronomic practice","உழவியற் செயல்முறை"],["agronomics","வேளாண் பொருளியல்நூல்"],["agronomist","உழவியல் வல்லுநர்"],["agronomy","உழவுச் சூழலியல், உழவியல்"],["agrosia","அறியவொணாமை"],["agrostology","புல் இயல்"],["agroxone","வாணிகப் பெயர்"],["agrypnia","உறக்கமின்மை"],["agrypnotic","விழிப்புணர்வு ஊக்கி"],["ague","குளிர்க்காய்ச்சல்"],["aguesia","சுவை உணர்வின்மை"],["agyiophobia","தெரு அச்சம்"],["ahead","தொடர்ந்து, முந்தி, மேலும்"],["ahem","கணைப்பொலி"],["ahoy","அகவுதல்"],["ahungered","பசி"],["ahypnia","உறங்கவியலாமை (உளத்)"],["aichmophobia","கூர்பொருள் அச்சம்"],["aid","உதவி"],["aid and abet","துணையும் தூண்டுதலும்"],["aide de camp","மெய்க்காப்பாளர், ஆளுநரின் மெய்க்காப்பாளர், உதவிப் படைத்தலைவர்"],["aide memoirs","நினைவு உதவிக் குறிப்பு"],["aided school","உதவிபெறும் பள்ளி"],["aiding","உதவுகை"],["aiguillesque","ஊசிப்பாறையொத்த"],["ailblazer","புகழ்ச்சுடர்"],["aileron","வானூர்தி நிலைப்படுத்தி"],["ailment","நோய்"],["ailurophile","பூனை விரும்பி"],["ailurophobia","பூனை அச்சம்"],["aim","இலக்கு, குறிக்கோள்"],["aiming test","நோக்காய்வு"],["aimless","இலக்கற்ற, குறிக்கோளற்ற"],["aims and objectives","நோக்கமும் குறிக்கோளும்"],["aine","தலைமகன்"],["air bag","காப்புப் பை"],["air ball","இலக்கு எய்தாப் பந்து, காற்றூட்டிய ஊதாம்பி"],["air bath","வளி குளியல் தொட்டி"],["air bleed","காற்றுக் கசிவு"],["air boat","வான்படகு"],["air borne trade","வான்வழி வணிகம்"],["air borne waste","வளிமண்டில மாசு"],["air box","காற்றுப் பேழை"],["air bus","மிதவைப் பேருந்து"],["air circulation","காற்றோட்டம்"],["air compressor","காற்றமுக்கி, காற்றழுத்தி"],["air crash","வானூர்தி மோதல்"],["air crew","வானூர்தி ஊழியர்"],["air curtain","வளித்திரை"],["air drill","வளியழுத்தத் துளைப்பி"],["air eliminator","வளி நீக்கி"],["air freshener","மணமூட்டி"],["air front","காற்றுமுகப்பு"],["air glow","விண்மினுக்கம்"],["air hostess","வானூர்திப் பாங்கி"],["air leak","காற்றுக் கசிவு"],["airline","வளித்தடம்"],["airlock strip","விண்ணூர்தி வளிநிலைப்படுத்தி"],["airlog","காற்றளவி, காற்றுமுடக்கம்"],["air mouth","காற்றுப் புழை, வளிவாயில்"],["air pillow","காற்றுத் தலையணை, வளியணை"],["air pollution","காற்று மாசு, வளிமாசு"],["air pump","காற்றூட்டி, காற்றேற்றி"],["air purifier","வளிமாசுநீக்கி"],["air race","வானூர்தித் திறவினை"],["air regulator","வளிச்சீராக்கி"],["air route","வான்தடம்"],["air sacs","காற்றுப் பைகள்"],["air strike","வான்வழித் தாக்குதல்"],["airstrip","விண்ணூர்தித் திட்டு"],["air taxi","வாடகை வானூர்தி"],["air traffic control","வான்வழிக் கட்டுப்பாட்டகம்"],["air traffic controller","வான்போக்குவரத்துக் கட்டுப்பாட்டாளர்"],["air trap","நச்சுவளிமுடக்கி"],["air tunnel","காற்றுப் புழை"],["air turbulence","வளிச் சீற்றம்"],["air velocity","வளித் திசைவேகம்"],["air vent","வளித்துளை"],["air washer","காற்றலம்பி"],["air well","வளிவழி"],["air-ambulance","மருத்துவ வானூர்தி"],["airbase","வானூர்தித் தளம்"],["airborne disease","காற்றால் பரவும் நோய்"],["airborne trade","வான்வழி வணிகம்"],["airbrake","காற்றுத் தடை"],["air-brick","நுண்துறைச் சுதைக்கல்"],["airbus","பெரும் வானூர்தி"],["air-compressor","காற்றழுத்தி"],["air-condition","சீர்வளி"],["air-conditioned bus","சீர்வளிப் பேருந்து"],["air-conditioned train","சீர்வளித் தொடரி"],["air-conditioner","குளிர்ப்பதனி, சீர்வளி"],["air cooler","காற்றுக் குளிர்ப்பி"],["aircraft","வானூர்தி"],["aircraft subsidies","வானூர்திக் கட்டணக்குறைப்பு"],["air cruise","வானூர்தி மகிழ் செலவு (பயணம்)"],["airfield","வானூர்தித் தளம்"],["airforce","வான்படை"],["airframe","காற்றுச் சட்டகம்"],["air-gapped","அட்டவணை இடைவெளி"],["airglow","நள்ளிருள் ஒளிர்வு"],["airhead","மடயன்"],["airless","வளியிலா"],["airlift","வான்வழி எடுத்துச் செல்லல், காற்றுயர்த்தி"],["airmail","வானஞ்சல்"],["airport","வானூர்தி நிலையம்"],["airport beacon","வானூர்தி குறிவிளக்கு"],["air power","வான்படை வலிவு"],["air raid","வான்வழித் தாக்குதல்"],["airsick","வான்செலவுக் குமட்டல்"],["air tanker","வான்கலத் தெளிப்பு, விண்ணூர்திக் கலன்"],["airtight","காற்றுப் புகா"],["airways","வான்வழிப் போக்குவரத்து"],["airworthiness","பறக்கும் தகுதி"],["airy","காற்றோட்டமுள்ள"],["aisle seat","பக்க இருக்கை, சாளர அயலிருக்கை"],["aisling","கற்பனைத் தோற்றம்"],["akimbo","வளைந்த நிலையில்"],["akin","ஒத்த தன்மையுள்ள, குருதித் தொடர்புடைய"],["akinesthesia","இயக்குணர்வின்மை"],["akrasia","உறுதித் தளர்வு"],["alabaster","பூச்சுப் பளிங்கு"],["alacrity","முந்தார்வம்"],["alae spunia","பொய் இறகு"],["alalia","நாத்தடை"],["alarsepta","சிறகு போன்ற இடைச்சுவர்"],["alarm","எச்சரிக்கை ஒலி"],["alarm clock","எழுப்புமணிப்பொறி, விழிப்பொலி"],["alarm time piece","அலறி, விழிப்பொலியன்"],["alarming","எச்சரிக்கை தருகிற"],["alarming report","எச்சரிக்கை அறிக்கை, கவலையளிக்கும் அறிக்கை"],["alarming rise","பெருக்க எச்சரிக்கை"],["alas","அந்தோ!, ஐயகோ!, ஐயோ!"],["albarium","சலவைக்கல் சுண்ணாம்பு"],["albedo","கோள் எதிரொலிப்புத் திறன்"],["albeit","இருப்பினும்"],["albescent","வெளிறிய"],["albigenses","முரண் சமயக்குழு"],["albinism","வெள்ளுடல் நோய்"],["album","தொகுப்பு, படத்தொகுப்பு"],["albuminometer","வெண்புரத அறிமானி"],["alchoholics","கள்காதலர்"],["alcohol","மதுவகை, வெறியம்"],["alcohol industry","சாராய ஆலை, மதுத் தொழிற்சாலை"],["alcolock","குடியறி காப்புக்கருவி"],["alcove","தடுப்பறை, கவிகை மாடம்"],["aldermanry","ஆட்சி நிலை"],["ale conner","மது ஆய்வர்"],["ale house","மதுக்கடை"],["ale wife","மதுவிற்கும் பெண்"],["alem bic","பழங்கால வடிகலம்"],["alemannic","அயலக மொழி"],["alembic","வடிகலன் வகை"],["alert","விழிப்பான"],["alethia","மறதியின்மை"],["alethiology","மெய்ம்மையியல்"],["aleukocytosis","வெள்ளணுக் குறை"],["alexeteric","தொற்று எதிர்ப்பி"],["alexia","சொற்குருடு"],["alexia verbal","ஒலித்துப் படிக்க இயலாமை"],["alexipharmic","நச்சுமுறிப்பான்"],["alexipyretic","காய்ச்சல் தடுப்பான்"],["alexithymia","சொல்லொணா உணர்வு"],["alfisol","களிமண் கணக்கு"],["algae bloom","பாசிப் படர்வு"],["algebra","குறிக் கணக்கியல்"],["algebraic expression","இயற்கணிதக் கோவை"],["algebraic linguistics","இயற்கணித மொழியியல்"],["algebraist","இயற்கணிதர்"],["algedonics","இன்ப துன்பவியல்"],["algefacient","குளிரூட்டி"],["algesimeter","வலிவுணர்வுமானி"],["algid","குளிர் காய்ச்சல்"],["algocracy","கணினிச் செயல்முறை"],["algology","கடற்பாசியியல்"],["algophobia","வலி அச்சம்"],["algorithm","நெறிமுறை"],["algorithm language","நெறிப்பாட்டு மொழி"],["algosis","காளான் தொற்றுநோய்"],["alias","மறுபெயர், என்கிற"],["aliasing","புனைபெயர்"],["alibi","ஒரு நிகழ்வின்போது வேறிடத்தில் இருத்தல், வேறிடத்தில் இருத்தல் குறித்த சான்று"],["alible","ஊட்டச்சத்து உணவு"],["alidade","கோண அளவி"],["alien","அயலார், வெளியார்"],["alien enemy","அயற்பகைவர்"],["alien's branch","அயல்நாட்டுக் கிளை"],["alienability","உடைமை மாற்றம்"],["alienable right","உடைமை மாற்று உரிமை"],["alienate","உடைமை மாற்று, மனமுறிவு கொள்"],["alienation","உடைமை மாற்றல், புறக்கணிப்பு உணர்வு"],["alienation of land","நில உரிமை மாற்றல்"],["alienation of revenue","நிலவரி நீக்கம்"],["alienism","உளப் பிறழ்ச்சி"],["aliennist","மனப்பிணி மருத்துவர்"],["aliform","சிறகு வடிவமைப்பு"],["alight","இறங்கு"],["align","ஒழுங்குபடுத்து, வரிசைப்படுத்து"],["aligned","வரிசைப்படுத்தப்பட்ட"],["alignment","வரிசை, வரிசைப்படுத்துதல், சீரமைவு"],["alike","ஒத்த, போன்ற"],["aliment","ஊட்ட உணவு"],["alimentation","உணவூட்டம்"],["alimentology","ஊணியல்"],["alimentotherapy","உணவு மருத்துவம்"],["alimony","வாழ்க்கைப் படி"],["aliquot","முழு வகு எண்"],["alive","உயிருடன், துடிப்புணர்வுடன்"],["alkalimetry","கார அளவியல்"],["alkalis","காரம், எரிகாரங்கள்"],["alkanet","செஞ்சாயச் செடி"],["alkloid","வெடியக் கலப்பு"],["all","அனைத்தும், எல்லாம்"],["all along","எப்போதும், தொடக்கம் முதல் முடிவுவரை"],["all in all","அனைத்துமாக, எல்லாமாக"],["all india level","அனைத்திந்திய நிலை"],["all india service","அனைத்திந்தியப் பணி"],["all out","முற்றிழப்பு"],["all over","எங்கும், முழுவதும்"],["all rounder","பல்திறனர், பன்முகத் திறத்தர்"],["all-terrain bike","மலை ஈருருளி (மிதிவண்டி)"],["allagrugous","கடுமையான"],["allantoid","உயிரகப் பை"],["allay","குறைப்பு, தணிப்பு, தவிர்த்தல், நீக்கல்"],["allegation","குறைகூறல், சாட்டுரை"],["alleged disparity","சாட்டிய முரண்பாடு, சாட்டிய வேறுபாடு"],["alleged right","இருப்பதாகக் குறிப்பிடப்படுகின்ற உரிமை, கொண்டாடும் உரிமை"],["allegiance","கடப்பாடு, பற்றுறுதி"],["allegiant","நேர்மையான"],["allegory","உருவகம்"],["allegrid","ஒவ்வாமைத் தடிப்பு"],["alleles","மாற்றுரு"],["allelopathy","உயிர்வேதி விளைவு"],["allergen","ஒவ்வாமை ஊக்கி"],["allergology","ஒவ்வாமை இயல்"],["allergosis","ஒவ்வாமை நோய்"],["allergy","ஒவ்வாமை"],["alleviate","குறை, மட்டுப்படுத்து, துயர்தணி"],["alley","குறுந்தெரு, சந்து"],["alley crop (inter crop)","ஊடு பயிர்"],["alleyway","இடைவழி"],["all-hid","கண்ணாமூச்சி"],["alliance","ஒப்பந்தம், திருமண உறவு"],["allied","தொடர்புடைய, சார்புடைய"],["allied nations","நேய நாடுகள்"],["allied trade","தொடர்புடைய வணிகம், சார் வணிகம்"],["allies","நட்பு நாடுகள், நேய நாடுகள்"],["alligate","பிணைப்பு"],["alliteration","ஒலியின் நிகழ்வு"],["alliterative concord","மோனைப் பொருத்தம்"],["allobiosis","சூழலுக்கு ஏற்ப மாறும் நுண்ணுயிரிகள்"],["allocate","பங்கீடு செய், பிரித்துக் கொடு, ஒதுக்கிய"],["allocation of fund","நிதி ஒதுக்கீடு"],["allocation of seat","இட ஒதுக்கீடு, இருக்கை ஒதுக்கீடு"],["allocator","ஒதுக்கீட்டாளர்"],["allocheiria","மாறுகை உணர்வு"],["allochromasia","தோல் நிறமாற்றம்"],["allograph","மாற்றெழுத்து"],["allolalia","பேச்சுத் திணறல்"],["allomorphic change","மாற்றுருபு மாற்றம்"],["allo-motifeme","மாற்றுக்கதை கூறல்"],["allonge","இணைப்புத் தாள்"],["allopathy","ஆங்கில மருத்துவம்"],["allopatric species","வேற்றிடச் சிறப்பினங்கள்"],["allophone","மாற்றொலி"],["allopsychosis","பிறரைப் பழித்தல்"],["allorhythmia","சீரற்ற நாடித்துடிப்பு"],["allot","ஒதுக்கு, பங்கிட்டளி"],["allotment","ஒதுக்கீடு, ஒதுக்கல், பங்கீடு"],["allotment register","பங்கீட்டுப் பதிவேடு"],["allotridontia","பல் ஒட்டு மருத்துவம்"],["allotriomorphic","அகமணி உருவான"],["allotrope","புறவேற்றுமை"],["allotroph","சூழல் ஊன் உயிரி"],["allotted","ஒதுக்கிய"],["allottee","ஒதுக்கீடு பெறுபவர்"],["allotter","ஒதுக்கீடு செய்பவர்"],["allow","இசைவளி, ஒத்துக்கொள்"],["allowance","படி"],["allowed","ஏற்கப்பட்ட"],["alloy","கலப்புமாழை, மாழைக் கலவை"],["alloy metal","கனிமக் கலவை"],["allude","மறைமுகமாகக் குறிப்பிடு"],["allurement","கவர்ச்சி"],["alluring","கவர்ச்சி வாய்ந்த"],["allusion","மறைமுகக் குறிப்பு, மறைக்குறிப்பு"],["allusive","குறிப்புமொழி"]
];

const PART_SIZE = Math.ceil(ALL_PAIRS.length / 10);
const PARTS = Array.from({length: 10}, (_, i) => ALL_PAIRS.slice(i * PART_SIZE, (i+1) * PART_SIZE));

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateOptions(correct, allPairs, isTamilQ) {
  const idx = isTamilQ ? 1 : 0;
  const wrong = shuffle(allPairs.filter(p => p[idx] !== correct)).slice(0, 3).map(p => p[idx]);
  return shuffle([correct, ...wrong]);
}

const MODES = ["EN → Tamil", "Tamil → EN"];

export default function A_Part_2() {
  const [screen, setScreen] = useState("home"); // home | quiz | result
  const [selectedPart, setSelectedPart] = useState(null);
  const [mode, setMode] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const startQuiz = useCallback((partIdx) => {
    const pairs = PARTS[partIdx];
    const isTamil = mode === 0;
    const qs = shuffle(pairs).map(pair => {
      const question = isTamil ? pair[0] : pair[1];
      const correct = isTamil ? pair[1] : pair[0];
      const options = generateOptions(correct, ALL_PAIRS, isTamil);
      return { question, correct, options, pair };
    });
    setSelectedPart(partIdx);
    setQuestions(qs);
    setQIdx(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setShowFeedback(false);
    setScreen("quiz");
  }, [mode]);

  const handleSelect = (opt) => {
    if (showFeedback) return;
    setSelected(opt);
    setShowFeedback(true);
    const correct = questions[qIdx].correct;
    const isCorrect = opt === correct;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(a => [...a, { question: questions[qIdx].question, selected: opt, correct, isCorrect }]);
    setTimeout(() => {
      if (qIdx + 1 >= questions.length) {
        setScreen("result");
      } else {
        setQIdx(i => i + 1);
        setSelected(null);
        setShowFeedback(false);
      }
    }, 1100);
  };

  const pct = questions.length ? Math.round((qIdx / questions.length) * 100) : 0;
  const totalWords = ALL_PAIRS.length;

  return (
    <div style={{minHeight:"100vh", background:"#0a0a0f", fontFamily:"'Georgia', serif", color:"#e8dcc8"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0f; }
        .cinzel { font-family: 'Cinzel', serif; }
        .garamond { font-family: 'EB Garamond', serif; }
        .glow { text-shadow: 0 0 20px #c9a84c66, 0 0 40px #c9a84c33; }
        .btn-opt {
          width: 100%; padding: 14px 20px; border: 1.5px solid #3a3228; border-radius: 4px;
          background: #12100e; color: #e8dcc8; font-family: 'EB Garamond', serif;
          font-size: 1.05rem; cursor: pointer; text-align: left; transition: all 0.2s;
          display: block; margin-bottom: 10px;
        }
        .btn-opt:hover:not(:disabled) { border-color: #c9a84c; background: #1c1810; color: #f5e6c8; }
        .btn-opt.correct { border-color: #4caf78; background: #0d1f14; color: #7fe0a4; }
        .btn-opt.wrong { border-color: #c94c4c; background: #1f0d0d; color: #e07f7f; }
        .btn-opt.reveal { border-color: #4caf78; background: #0d1f14; color: #7fe0a4; }
        .part-btn {
          border: 1px solid #3a3228; border-radius: 4px; padding: 18px 14px;
          background: #0d0c0a; cursor: pointer; transition: all 0.2s; color: #e8dcc8;
          font-family: 'EB Garamond', serif;
        }
        .part-btn:hover { border-color: #c9a84c; background: #151209; transform: translateY(-2px); box-shadow: 0 4px 20px #c9a84c22; }
        .ornament { color: #c9a84c; opacity: 0.6; font-size: 1.2rem; }
        .progress-bar { height: 3px; background: #1e1a14; border-radius: 2px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #c9a84c, #f5d77c); border-radius: 2px; transition: width 0.4s; }
        .mode-tab { padding: 8px 20px; border: 1px solid #3a3228; background: #0d0c0a; color: #a09070; cursor: pointer; font-family: 'EB Garamond', serif; font-size: 1rem; transition: all 0.2s; }
        .mode-tab.active { border-color: #c9a84c; color: #f5e6c8; background: #1c1810; }
        .mode-tab:first-child { border-radius: 4px 0 0 4px; }
        .mode-tab:last-child { border-radius: 0 4px 4px 0; }
        .result-row { padding: 10px 0; border-bottom: 1px solid #1e1a14; }
        .badge { display: inline-block; padding: 2px 10px; border-radius: 2px; font-size: 0.8rem; font-family: 'Cinzel', serif; }
        .badge-ok { background: #0d1f14; color: #7fe0a4; border: 1px solid #4caf7844; }
        .badge-ng { background: #1f0d0d; color: #e07f7f; border: 1px solid #c94c4c44; }
        @keyframes fadeUp { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease both; }
      `}</style>

      {screen === "home" && (
        <div style={{maxWidth:760, margin:"0 auto", padding:"40px 20px"}} className="fade-up">
          <div style={{textAlign:"center", marginBottom:48}}>
            <div className="ornament" style={{fontSize:"2rem", letterSpacing:8}}>❧ ✦ ❧</div>
            <h1 className="cinzel glow" style={{fontSize:"clamp(1.6rem,5vw,2.6rem)", fontWeight:900, color:"#f5e6c8", marginTop:12, marginBottom:8, letterSpacing:2}}>
              ஆட்சிச் சொல்லகராதி
            </h1>
            <p className="garamond" style={{color:"#a09070", fontSize:"1.15rem", fontStyle:"italic"}}>Tamil Administrative Glossary Quiz</p>
            <p style={{marginTop:8, color:"#6a5a40", fontSize:"0.9rem", fontFamily:"'Cinzel',serif", letterSpacing:1}}>
              {totalWords} ENTRIES · 10 EQUAL PARTS
            </p>
          </div>

          <div style={{textAlign:"center", marginBottom:32}}>
            <p className="garamond" style={{color:"#9a8a6a", marginBottom:12, fontSize:"1rem"}}>Quiz Direction</p>
            <div style={{display:"inline-flex"}}>
              {MODES.map((m, i) => (
                <button key={i} className={`mode-tab ${mode===i?"active":""}`} onClick={() => setMode(i)}>{m}</button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <p className="cinzel" style={{color:"#7a6a4a", fontSize:"0.8rem", letterSpacing:2}}>SELECT A PART</p>
            <p style={{color:"#5a4a2a", fontSize:"0.8rem", fontFamily:"'EB Garamond',serif"}}>~{PART_SIZE} words each</p>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(130px, 1fr))", gap:10}}>
            {PARTS.map((part, i) => (
              <button key={i} className="part-btn" onClick={() => startQuiz(i)}>
                <div className="cinzel" style={{fontSize:"0.75rem", color:"#c9a84c", letterSpacing:2, marginBottom:6}}>PART {i+1}</div>
                <div className="garamond" style={{fontSize:"0.95rem", color:"#9a8a6a"}}>
                  {part[0][0].slice(0,12)}…
                </div>
                <div style={{marginTop:6, fontSize:"0.78rem", color:"#5a4a30", fontFamily:"'EB Garamond',serif"}}>
                  {part.length} entries
                </div>
              </button>
            ))}
          </div>

          <p className="garamond" style={{textAlign:"center", color:"#4a3a20", marginTop:40, fontStyle:"italic", fontSize:"0.95rem"}}>
            All 913 entries from the Tamil Government Administrative Glossary (திருந்திய பதிப்பு)
          </p>
        </div>
      )}

      {screen === "quiz" && questions.length > 0 && (
        <div style={{maxWidth:680, margin:"0 auto", padding:"32px 20px"}} className="fade-up">
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20}}>
            <button onClick={() => setScreen("home")} style={{background:"none", border:"1px solid #3a3228", color:"#8a7a5a", padding:"6px 14px", borderRadius:3, cursor:"pointer", fontFamily:"'Cinzel',serif", fontSize:"0.75rem", letterSpacing:1}}>
              ← HOME
            </button>
            <div style={{textAlign:"center"}}>
              <span className="cinzel" style={{fontSize:"0.75rem", color:"#c9a84c", letterSpacing:2}}>PART {selectedPart+1}</span>
              <span style={{color:"#5a4a30", marginLeft:8, fontSize:"0.85rem", fontFamily:"'EB Garamond',serif"}}>
                {qIdx+1} / {questions.length}
              </span>
            </div>
            <div className="cinzel" style={{fontSize:"0.85rem", color:"#c9a84c"}}>
              {score} <span style={{color:"#5a4a30", fontSize:"0.7rem"}}>pts</span>
            </div>
          </div>

          <div className="progress-bar" style={{marginBottom:32}}>
            <div className="progress-fill" style={{width: `${pct}%`}} />
          </div>

          <div style={{background:"#0d0c0a", border:"1px solid #2a2218", borderRadius:6, padding:"28px 28px 24px", marginBottom:24}}>
            <p className="garamond" style={{color:"#6a5a3a", fontSize:"0.85rem", marginBottom:10, fontStyle:"italic"}}>
              {mode === 0 ? "What is the Tamil meaning of:" : "What is the English term for:"}
            </p>
            <p className="cinzel" style={{fontSize:"clamp(1rem,3vw,1.5rem)", color:"#f5e6c8", lineHeight:1.5, letterSpacing:0.5}}>
              {questions[qIdx].question}
            </p>
          </div>

          <div>
            {questions[qIdx].options.map((opt, i) => {
              let cls = "btn-opt";
              if (showFeedback) {
                if (opt === questions[qIdx].correct) cls += " correct reveal";
                else if (opt === selected) cls += " wrong";
              }
              return (
                <button key={i} className={cls} onClick={() => handleSelect(opt)} disabled={showFeedback}>
                  <span style={{color:"#5a4a2a", marginRight:10, fontFamily:"'Cinzel',serif", fontSize:"0.8rem"}}>{["A","B","C","D"][i]}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {screen === "result" && (
        <div style={{maxWidth:720, margin:"0 auto", padding:"40px 20px"}} className="fade-up">
          <div style={{textAlign:"center", marginBottom:40}}>
            <div className="ornament" style={{fontSize:"1.8rem"}}>★</div>
            <h2 className="cinzel glow" style={{fontSize:"2rem", color:"#f5e6c8", marginTop:8, marginBottom:6}}>Results</h2>
            <p className="garamond" style={{color:"#9a8a6a", fontSize:"1.1rem", fontStyle:"italic"}}>Part {selectedPart+1} · {MODES[mode]}</p>
            <div style={{marginTop:24, display:"inline-block", padding:"20px 48px", border:"1px solid #c9a84c44", borderRadius:6, background:"#0d0c0a"}}>
              <div className="cinzel" style={{fontSize:"3rem", color:"#c9a84c"}}>{score}</div>
              <div style={{color:"#6a5a3a", fontFamily:"'EB Garamond',serif"}}>out of {questions.length}</div>
              <div style={{marginTop:8, fontSize:"1.4rem", color: score/questions.length >= 0.7 ? "#7fe0a4" : score/questions.length >= 0.4 ? "#f5c84c" : "#e07f7f", fontFamily:"'Cinzel',serif"}}>
                {Math.round(score/questions.length*100)}%
              </div>
            </div>
          </div>

          <div style={{display:"flex", gap:10, marginBottom:32, justifyContent:"center"}}>
            <button onClick={() => startQuiz(selectedPart)} style={{background:"#0d0c0a", border:"1px solid #c9a84c", color:"#f5e6c8", padding:"10px 24px", borderRadius:4, cursor:"pointer", fontFamily:"'Cinzel',serif", fontSize:"0.85rem", letterSpacing:1}}>
              RETRY PART
            </button>
            <button onClick={() => setScreen("home")} style={{background:"none", border:"1px solid #3a3228", color:"#9a8a6a", padding:"10px 24px", borderRadius:4, cursor:"pointer", fontFamily:"'Cinzel',serif", fontSize:"0.85rem", letterSpacing:1}}>
              ALL PARTS
            </button>
          </div>

          <p className="cinzel" style={{fontSize:"0.75rem", color:"#5a4a2a", letterSpacing:2, marginBottom:16}}>REVIEW</p>
          <div style={{maxHeight:420, overflowY:"auto", border:"1px solid #1e1a14", borderRadius:4, padding:"0 16px"}}>
            {answers.map((a, i) => (
              <div key={i} className="result-row">
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12}}>
                  <div style={{flex:1}}>
                    <p style={{fontFamily:"'Cinzel',serif", fontSize:"0.85rem", color:"#c9a84c", marginBottom:4}}>{a.question}</p>
                    {!a.isCorrect && (
                      <p style={{fontFamily:"'EB Garamond',serif", fontSize:"0.9rem", color:"#e07f7f", marginBottom:2}}>
                        ✗ {a.selected}
                      </p>
                    )}
                    <p style={{fontFamily:"'EB Garamond',serif", fontSize:"0.9rem", color:"#7fe0a4"}}>
                      {a.isCorrect ? "✓" : "→"} {a.correct}
                    </p>
                  </div>
                  <span className={`badge ${a.isCorrect ? "badge-ok" : "badge-ng"}`}>
                    {a.isCorrect ? "✓" : "✗"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
