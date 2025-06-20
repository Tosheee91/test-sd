import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";

const CARD_COLOR = "#e3f0fa";
const CARD_TEXT = "#1a365d";
const CARD_HOVER = "#b6d6f2";
const BG_COLOR = "#f7fafc";
const ACCENT = "#60a5fa";

const items = [
  {
    id: "kubotan",
    name: "Куботан",
    description: "Компактный инструмент для самообороны.",
    images: [
      "https://placehold.co/600x400?text=Куботан+1",
      "https://placehold.co/600x400?text=Куботан+2",
      "https://placehold.co/600x400?text=Куботан+3",
    ],
    properties: ["Металл", "Длина: 14 см", "Вес: 50 г"],
  },
  {
    id: "lighter",
    name: "Зажигалка",
    description: "Обычная газовая зажигалка для повседневного использования.",
    images: [
      "https://placehold.co/600x400?text=Зажигалка+1",
      "https://placehold.co/600x400?text=Зажигалка+2",
    ],
    properties: ["Пластик", "Газ", "Малый размер"],
  },
  {
    id: "knife",
    name: "Нож",
    description: "Складной нож с фиксатором лезвия.",
    images: [
      "https://placehold.co/600x400?text=Нож+1",
      "https://placehold.co/600x400?text=Нож+2",
    ],
    properties: ["Сталь", "Длина лезвия: 8 см", "Рукоять: пластик"],
  },
  {
    id: "powerbank",
    name: "Powerbank",
    description: "Портативное зарядное устройство на 10000 мАч.",
    images: [
      "https://placehold.co/600x400?text=Powerbank+1",
      "https://placehold.co/600x400?text=Powerbank+2",
    ],
    properties: ["Ёмкость: 10000 мАч", "USB-C", "Быстрая зарядка"],
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 700);
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: isMobile ? "static" : "fixed",
        margin: isMobile ? "16px 0" : 0,
        top: 24,
        left: 24,
        zIndex: 100,
        background: "none",
        color: CARD_TEXT,
        border: `2px solid ${ACCENT}`,
        borderRadius: 8,
        padding: isMobile ? "14px 28px" : "8px 20px",
        fontSize: isMobile ? 20 : 18,
        width: isMobile ? "100%" : undefined,
        maxWidth: 320,
        cursor: location.pathname === "/" ? "not-allowed" : "pointer",
        opacity: location.pathname === "/" ? 0.3 : 1,
        transition: "background 0.2s, color 0.2s, border 0.2s"
      }}
      disabled={location.pathname === "/"}
    >
      ← Назад
    </button>
  );
}

function MainGrid() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <div style={{ minHeight: "100vh", background: BG_COLOR, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "8px" : "2rem" }}>
      <BackButton />
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: isMobile ? 16 : 32,
        width: "100%",
        maxWidth: 1200
      }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              borderRadius: "1rem",
              boxShadow: "0 2px 12px #0001",
              padding: isMobile ? "1rem" : "1.5rem",
              border: `1.5px solid ${ACCENT}`,
              background: CARD_COLOR,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
            }}
            onClick={() => navigate(`/item/${item.id}`)}
            onMouseOver={e => e.currentTarget.style.background = CARD_HOVER}
            onMouseOut={e => e.currentTarget.style.background = CARD_COLOR}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <img src={item.images[0]} alt={item.name} style={{ borderRadius: "0.75rem", width: "100%", height: isMobile ? 120 : 180, objectFit: "cover", marginBottom: 16, boxShadow: "0 1px 8px #0001" }} />
            <h2 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 500, color: CARD_TEXT, textAlign: "center", margin: 0 }}>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemPage() {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const item = items.find((i) => i.id === id);
  const [photoIdx, setPhotoIdx] = React.useState(0);
  const [fullscreen, setFullscreen] = React.useState(false);
  if (!item) return <div style={{ textAlign: "center", color: ACCENT, marginTop: 40 }}>Предмет не найден</div>;
  return (
    <div style={{ minHeight: "100vh", background: BG_COLOR, display: "flex", flexDirection: "column", alignItems: "center", padding: isMobile ? "8px" : "2rem" }}>
      <BackButton />
      <div style={{ maxWidth: isMobile ? 400 : 600, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ position: "relative", width: "100%" }}>
          <img
            src={item.images[photoIdx]}
            alt={item.name}
            style={{ borderRadius: "0.75rem", width: "100%", height: isMobile ? 180 : 256, objectFit: "cover", cursor: "pointer", boxShadow: "0 1px 8px #0001", transition: "box-shadow 0.2s" }}
            onClick={() => setFullscreen(true)}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 4px 24px #0002"}
            onMouseOut={e => e.currentTarget.style.boxShadow = "0 1px 8px #0001"}
          />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 8, gap: 8 }}>
            {item.images.map((img, idx) => (
              <button
                key={img}
                style={{
                  width: isMobile ? 12 : 16,
                  height: isMobile ? 12 : 16,
                  borderRadius: "50%",
                  border: `2px solid ${photoIdx === idx ? ACCENT : "#bbb"}`,
                  background: photoIdx === idx ? ACCENT : "#e0e7ef",
                  margin: 0,
                  padding: 0,
                  cursor: "pointer",
                  transition: "background 0.2s, border 0.2s"
                }}
                onClick={() => setPhotoIdx(idx)}
              />
            ))}
          </div>
          {fullscreen && (
            <div style={{ position: "fixed", inset: 0, background: "#000c", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, animation: "fadeIn 0.2s" }}>
              <img src={item.images[photoIdx]} alt={item.name} style={{ maxWidth: "100vw", maxHeight: "100vh", borderRadius: "1rem", boxShadow: "0 8px 32px #0004" }} />
              <button
                style={{ position: "absolute", top: 32, right: 32, fontSize: isMobile ? 28 : 40, color: ACCENT, background: "#fff", borderRadius: "50%", padding: 8, border: "none", cursor: "pointer", boxShadow: "0 2px 8px #0002" }}
                onClick={() => setFullscreen(false)}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
          )}
        </div>
        <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 500, marginTop: 24, marginBottom: 8, color: CARD_TEXT }}>{item.name}</h2>
        <p style={{ marginBottom: 16, color: ACCENT, textAlign: "center", fontSize: isMobile ? 15 : 16 }}>{item.description}</p>
        <ul style={{ marginBottom: 16, padding: 0, listStyle: "none" }}>
          {item.properties.map((prop) => (
            <li key={prop} style={{ color: CARD_TEXT, opacity: 0.7, marginBottom: 4, fontSize: isMobile ? 14 : 16 }}>• {prop}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainGrid />} />
        <Route path="/item/:id" element={<ItemPage />} />
      </Routes>
    </Router>
  );
}
