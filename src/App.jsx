import React from "react";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import PPPartOne from "./PPPpart-1";
import PartFourFive from "./PartFourFive";

const chapterPages = import.meta.glob("./GK/**/*.jsx", { eager: true });

// Dictionary imports
import Dictionary from "./Dictionary/Dictionary";
import A_Series from "./Dictionary/A_Series";
import A_Part_1 from "./Dictionary/A_Part_1";
import A_Part_2 from "./Dictionary/A_Part_2";

// Current Affairs imports
import CurrentAffairs from "./Current_Affairs/Current_Affairs";
import Jan_2026 from "./Current_Affairs/Jan_2026";

// PYQ Tamil imports
import PYQTAMIL from "./PYQTAMIL/PYQ_TAMIL";
import Special_Examination_2025 from "./PYQTAMIL/Special_Examination_2025";
import Gr_2_Mains_2025 from "./PYQTAMIL/Gr_2_Mains_2025";
import Gr_4_2025 from "./PYQTAMIL/Gr_4_2025";

// Thirukkural
import Thirukkural from "./Thirukkural/Thirukkural_home";
import ThirukkuralOld from "./Thirukkural/thirukkural_old";
import ThirukkuralOldPart1 from "./Thirukkural/thirukkural_old_part1";
import ThirukkuralOldPart1Quiz from "./Thirukkural/thirukkural_old_part1_quiz";
import ThirukkuralOldPart2 from "./Thirukkural/thirukkural_old_part2";

// Tamil Notes
import SanthiPizai from "./TamilNotes/SanthiPizai";
import Mayankoli from "./TamilNotes/Mayankoli";

// TamilBook imports
import Ilakkanam_New from "./TamilBook/ilakkanam_new";
import Sixth_Book from "./TamilBook/sixth_book";
import T_Book from "./TamilBook/t_book";
import T_NewBook from "./TamilBook/t_newbook";
import Term1_Grammar from "./TamilBook/term1_grammar";
import Term3_Grammar from "./TamilBook/term3_grammar";

// ✅ GK imports
import GK from "./GK/gk";
import Six from "./GK/Six/six";
import Seven from "./GK/Seven/seven";
import Eight from "./GK/Eight/eight";
import Nine from "./GK/Nine/nine";
import Ten from "./GK/Ten/ten";
import Eleven from "./GK/Eleven/eleven";
import Twelve from "./GK/Twelve/twelve";

// ✅ GK Six imports
import SixBiology from "./GK/Six/SixBiology/SixBiology";
import SixChemistry from "./GK/Six/SixChemistry/SixChemistry";
import SixEconomics from "./GK/Six/SixEconomics/SixEconomics";
import SixGeography from "./GK/Six/SixGeography/SixGeography";
import SixIndianHistory from "./GK/Six/SixIndianHistory/SixIndianHistory";
import SixPhysics from "./GK/Six/SixPhysics/SixPhysics";
import SixPolity from "./GK/Six/SixPolity/SixPolity";
import SixTamilnaduHistory from "./GK/Six/SixTamilnaduHistory/SixTamilnaduHistory";


//✅ GK Seven imports
import SevenBiology from "./GK/Seven/SevenBiology/SevenBiology";
import SevenChemistry from "./GK/Seven/SevenChemistry/SevenChemistry";
import SevenEconomics from "./GK/Seven/SevenEconomics/SevenEconomics";
import SevenGeography from "./GK/Seven/SevenGeography/SevenGeography";
import SevenIndianHistory from "./GK/Seven/SevenIndianHistory/SevenIndianHistory";
import SevenPhysics from "./GK/Seven/SevenPhysics/SevenPhysics";
import SevenPolity from "./GK/Seven/SevenPolity/SevenPolity";
import SevenTamilnaduHistory from "./GK/Seven/SevenTamilnaduHistory/SevenTamilnaduHistory";

// ✅ GK Eight imports
import EightBiology from "./GK/Eight/EightBiology/EightBiology";
import EightChemistry from "./GK/Eight/EightChemistry/EightChemistry";
import EightEconomics from "./GK/Eight/EightEconomics/EightEconomics";
import EightGeography from "./GK/Eight/EightGeography/EightGeography";
import EightIndianHistory from "./GK/Eight/EightIndianHistory/EightIndianHistory";
import EightPhysics from "./GK/Eight/EightPhysics/EightPhysics";
import EightPolity from "./GK/Eight/EightPolity/EightPolity";
import EightTamilnaduHistory from "./GK/Eight/EightTamilnaduHistory/EightTamilnaduHistory";

// ✅ GK Nine imports
import NineBiology from "./GK/Nine/NineBiology/NineBiology";
import NineChemistry from "./GK/Nine/NineChemistry/NineChemistry";
import NineEconomics from "./GK/Nine/NineEconomics/NineEconomics";
import NineGeography from "./GK/Nine/NineGeography/NineGeography";
import NineIndianHistory from "./GK/Nine/NineIndianHistory/NineIndianHistory";
import NinePhysics from "./GK/Nine/NinePhysics/NinePhysics";
import NinePolity from "./GK/Nine/NinePolity/NinePolity";
import NineTamilnaduHistory from "./GK/Nine/NineTamilnaduHistory/NineTamilnaduHistory";

// ✅ GK Ten imports
import TenBiology from "./GK/Ten/TenBiology/TenBiology";
import TenChemistry from "./GK/Ten/TenChemistry/TenChemistry";
import TenEconomics from "./GK/Ten/TenEconomics/TenEconomics";
import TenGeography from "./GK/Ten/TenGeography/TenGeography";
import TenIndianHistory from "./GK/Ten/TenIndianHistory/TenIndianHistory";
import TenPhysics from "./GK/Ten/TenPhysics/TenPhysics";
import TenPolity from "./GK/Ten/TenPolity/TenPolity";
import TenTamilnaduHistory from "./GK/Ten/TenTamilnaduHistory/TenTamilnaduHistory";

// ✅ GK Eleven imports
import ElevenBiology from "./GK/Eleven/ElevenBiology/ElevenBiology";
import ElevenChemistry from "./GK/Eleven/ElevenChemistry/ElevenChemistry";
import ElevenEconomics from "./GK/Eleven/ElevenEconomics/ElevenEconomics";
import ElevenGeography from "./GK/Eleven/ElevenGeography/ElevenGeography";
import ElevenIndianHistory from "./GK/Eleven/ElevenIndianHistory/ElevenIndianHistory";
import ElevenPhysics from "./GK/Eleven/ElevenPhysics/ElevenPhysics";
import ElevenPolity from "./GK/Eleven/ElevenPolity/ElevenPolity";
import ElevenTamilnaduHistory from "./GK/Eleven/ElevenTamilnaduHistory/ElevenTamilnaduHistory";

// ✅ GK Twelve imports
import TwelveBiology from "./GK/Twelve/TwelveBiology/TwelveBiology";
import TwelveChemistry from "./GK/Twelve/TwelveChemistry/TwelveChemistry";
import TwelveEconomics from "./GK/Twelve/TwelveEconomics/TwelveEconomics";
import TwelveGeography from "./GK/Twelve/TwelveGeography/TwelveGeography";
import TwelveIndianHistory from "./GK/Twelve/TwelveIndianHistory/TwelveIndianHistory";
import TwelvePhysics from "./GK/Twelve/TwelvePhysics/TwelvePhysics";
import TwelvePolity from "./GK/Twelve/TwelvePolity/TwelvePolity";
import TwelveTamilnaduHistory from "./GK/Twelve/TwelveTamilnaduHistory/TwelveTamilnaduHistory";

function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", width: "100%" }}>
      <h1>StudyWithDhilip</h1>
      <a href="PYQ/previous_years.html" className="btn">Previous Year Questions</a>
      <a href="Tamil/Tamil.html" className="btn">Tamil</a>
      <a href="AE/YCT-1/YCT-1.html" className="btn">Assistant Engineer</a>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h2>Assistant Engineer (EEE)</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
          <Link to="/part1" className="btn">Part-1</Link>
          <Link to="/parts" className="btn">Part-4 and 5</Link>
        </div>
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h2>Current Affairs</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
          <Link to="/current-affairs" className="btn">Current Affairs</Link>
        </div>
      </div>

      {/* ✅ GK Section */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h2>General Knowledge (GK)</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
          <Link to="/gk/gk_1" className="btn">General Knowledge</Link>
          
        </div>
      </div>

    </div>
  );
}

function generateGKRoutes() {
  const usedRoutes = new Set();

  return Object.entries(chapterPages)
    .map(([path, module]) => {
      const routePath = path
        .replace("./GK", "/gk")
        .replace(/\.jsx$/, "")
        .toLowerCase();

      if (usedRoutes.has(routePath)) return null;
      usedRoutes.add(routePath);

      const Component = module.default;
      return (
        <Route
          key={routePath}
          path={routePath}
          element={<Component />}
        />
      );
    })
    .filter(Boolean);
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* AE EEE routes */}
        <Route path="/part1" element={<PPPartOne />} />
        <Route path="/parts" element={<PartFourFive />} />
        <Route path="/part4" element={<PartFourFive defaultPart={4} />} />
        <Route path="/part5" element={<PartFourFive defaultPart={5} />} />

        {/* Dictionary routes */}
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/dictionary/a-series" element={<A_Series />} />
        <Route path="/dictionary/a-series/part1" element={<A_Part_1 />} />
        <Route path="/dictionary/a-series/part2" element={<A_Part_2 />} />

        {/* Current Affairs routes */}
        <Route path="/current-affairs" element={<CurrentAffairs />} />
        <Route path="/current-affairs/jan-2026" element={<Jan_2026 />} />

        {/* PYQ Tamil routes */}
        <Route path="/PYQTAMIL" element={<PYQTAMIL />} />
        <Route path="/PYQTAMIL/special-examination-2025" element={<Special_Examination_2025 />} />
        <Route path="/PYQTAMIL/gr-2-mains-2025" element={<Gr_2_Mains_2025 />} />
        <Route path="/PYQTAMIL/gr-4-2025" element={<Gr_4_2025 />} />

        {/* Thirukkural routes */}
        <Route path="/Thirukkural" element={<Thirukkural />} />
        <Route path="/Thirukkural/thirukkural-old" element={<ThirukkuralOld />} />
        <Route path="/Thirukkural/thirukkural-old-part1" element={<ThirukkuralOldPart1 />} />
        <Route path="/Thirukkural/thirukkural-old-part1-quiz" element={<ThirukkuralOldPart1Quiz />} />
        <Route path="/Thirukkural/thirukkural-old-part2" element={<ThirukkuralOldPart2 />} />

        {/* Tamil Notes */}
        <Route path="/santhi-pizai" element={<SanthiPizai />} />
        <Route path="/mayan-koli" element={<Mayankoli />} />

        {/* TamilBook routes */}
        <Route path="/tamilbook/ilakkanam-new" element={<Ilakkanam_New />} />
        <Route path="/tamilbook/sixth-book" element={<Sixth_Book />} />
        <Route path="/tamilbook/t-book" element={<T_Book />} />
        <Route path="/tamilbook/t-newbook" element={<T_NewBook />} />
        <Route path="/tamilbook/term1-grammar" element={<Term1_Grammar />} />
        <Route path="/tamilbook/term3-grammar" element={<Term3_Grammar />} />

        {/* ✅ GK routes */}
        <Route path="/gk/gk_1" element={<GK />} />
        <Route path="/gk/six" element={<Six />} />
        <Route path="/gk/ten" element={<Ten />} />
        <Route path="/gk/seven" element={<Seven />} />
        <Route path="/gk/eight" element={<Eight />} />
        <Route path="/gk/nine" element={<Nine />} />
        <Route path="/gk/eleven" element={<Eleven />} />
        <Route path="/gk/twelve" element={<Twelve />} />

        {/* ✅ GK Six subject routes */}
        <Route path="/gk/six/biology" element={<SixBiology />} />
        <Route path="/gk/six/chemistry" element={<SixChemistry />} />
        <Route path="/gk/six/economics" element={<SixEconomics />} />
        <Route path="/gk/six/geography" element={<SixGeography />} />
        <Route path="/gk/six/indian-history" element={<SixIndianHistory />} />
        <Route path="/gk/six/physics" element={<SixPhysics />} />
        <Route path="/gk/six/polity" element={<SixPolity />} />
        <Route path="/gk/six/tamilnadu-history" element={<SixTamilnaduHistory />} />

                {/* ✅ GK Seven subject routes */}
        <Route path="/gk/seven/biology" element={<SevenBiology />} />
        <Route path="/gk/seven/chemistry" element={<SevenChemistry />} />
        <Route path="/gk/seven/economics" element={<SevenEconomics />} />
        <Route path="/gk/seven/geography" element={<SevenGeography />} />
        <Route path="/gk/seven/indian-history" element={<SevenIndianHistory />} />
        <Route path="/gk/seven/physics" element={<SevenPhysics />} />
        <Route path="/gk/seven/polity" element={<SevenPolity />} />
        <Route path="/gk/seven/tamilnadu-history" element={<SevenTamilnaduHistory />} />

        {/* ✅ GK Eight subject routes */}
        <Route path="/gk/eight/biology" element={<EightBiology />} />
        <Route path="/gk/eight/chemistry" element={<EightChemistry />} />
        <Route path="/gk/eight/economics" element={<EightEconomics />} />
        <Route path="/gk/eight/geography" element={<EightGeography />} />
        <Route path="/gk/eight/indian-history" element={<EightIndianHistory />} />
        <Route path="/gk/eight/physics" element={<EightPhysics />} />
        <Route path="/gk/eight/polity" element={<EightPolity />} />
        <Route path="/gk/eight/tamilnadu-history" element={<EightTamilnaduHistory />} />

        {/* ✅ GK Nine subject routes */}
        <Route path="/gk/nine/biology" element={<NineBiology />} />
        <Route path="/gk/nine/chemistry" element={<NineChemistry />} />
        <Route path="/gk/nine/economics" element={<NineEconomics />} />
        <Route path="/gk/nine/geography" element={<NineGeography />} />
        <Route path="/gk/nine/indian-history" element={<NineIndianHistory />} />
        <Route path="/gk/nine/physics" element={<NinePhysics />} />
        <Route path="/gk/nine/polity" element={<NinePolity />} />
        <Route path="/gk/nine/tamilnadu-history" element={<NineTamilnaduHistory />} />

        {/* ✅ GK Ten subject routes */}
        <Route path="/gk/ten/biology" element={<TenBiology />} />
        <Route path="/gk/ten/chemistry" element={<TenChemistry />} />
        <Route path="/gk/ten/economics" element={<TenEconomics />} />
        <Route path="/gk/ten/geography" element={<TenGeography />} />
        <Route path="/gk/ten/indian-history" element={<TenIndianHistory />} />
        <Route path="/gk/ten/physics" element={<TenPhysics />} />
        <Route path="/gk/ten/polity" element={<TenPolity />} />
        <Route path="/gk/ten/tamilnadu-history" element={<TenTamilnaduHistory />} />

        {/* ✅ GK Eleven subject routes */}
        <Route path="/gk/eleven/biology" element={<ElevenBiology />} />
        <Route path="/gk/eleven/chemistry" element={<ElevenChemistry />} />
        <Route path="/gk/eleven/economics" element={<ElevenEconomics />} />
        <Route path="/gk/eleven/geography" element={<ElevenGeography />} />
        <Route path="/gk/eleven/indian-history" element={<ElevenIndianHistory />} />
        <Route path="/gk/eleven/physics" element={<ElevenPhysics />} />
        <Route path="/gk/eleven/polity" element={<ElevenPolity />} />
        <Route path="/gk/eleven/tamilnadu-history" element={<ElevenTamilnaduHistory />} />

        {/* ✅ GK Twelve subject routes */}
        <Route path="/gk/twelve/biology" element={<TwelveBiology />} />
        <Route path="/gk/twelve/chemistry" element={<TwelveChemistry />} />
        <Route path="/gk/twelve/economics" element={<TwelveEconomics />} />
        <Route path="/gk/twelve/geography" element={<TwelveGeography />} />
        <Route path="/gk/twelve/indian-history" element={<TwelveIndianHistory />} />
        <Route path="/gk/twelve/physics" element={<TwelvePhysics />} />
        <Route path="/gk/twelve/polity" element={<TwelvePolity />} />
        <Route path="/gk/twelve/tamilnadu-history" element={<TwelveTamilnaduHistory />} />

        {generateGKRoutes()}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}