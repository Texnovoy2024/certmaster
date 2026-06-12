"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Rnd } from "react-rnd";
import { QRCodeSVG } from "qrcode.react";
import { useSearchParams, useRouter } from "next/navigation";
import Notification, { NotificationType } from "@/components/Notification";

export default function EditorPageWrapper() {
  return (
    <Suspense fallback={<div className="container mt-20 text-center">Yuklanmoqda...</div>}>
      <EditorPage />
    </Suspense>
  );
}

type ElementType = {
  id: string;
  type: "text" | "qr" | "image";
  text?: string;
  x: number;
  y: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  fontWeight?: string;
  width?: number;
  height?: number;
  url?: string;
};

function EditorPage() {
  const [background, setBackground] = useState<string>("");
  const [elements, setElements] = useState<ElementType[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const [certId, setCertId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<"png" | "jpg" | "pdf">("png");

  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    isVisible: boolean;
  }>({ message: "", type: "info", isVisible: false });

  const showNotification = (message: string, type: NotificationType = "info") => {
    setNotification({ message, type, isVisible: true });
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const loadId = searchParams.get("load");

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (loadId) {
      setIsLoading(true);
      fetch(`/api/certificate/${loadId}`)
        .then(r => r.json())
        .then(res => {
          if (res.success && res.data) {
            if (res.data.isTemplate) {
              setCertId(crypto.randomUUID ? crypto.randomUUID() : Date.now().toString());
            } else {
              setCertId(loadId);
            }
            if (res.data.templateUrl) setBackground(res.data.templateUrl);
            if (res.data.elementsData) {
              try { setElements(JSON.parse(res.data.elementsData)); } catch (e) {}
            }
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setCertId(crypto.randomUUID ? crypto.randomUUID() : Date.now().toString());
    }
  }, [loadId]);

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) setBackground(ev.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        const newEl: ElementType = {
          id: Date.now().toString(), type: "image",
          url: ev.target.result as string,
          x: 100, y: 100, width: 200, height: 100,
        };
        setElements(prev => [...prev, newEl]);
        setSelectedId(newEl.id);
      }
    };
    reader.readAsDataURL(file);
  };

  const addTextElement = () => {
    const newEl: ElementType = {
      id: Date.now().toString(), type: "text", text: "Yangi Matn",
      x: 100, y: 100, fontSize: 28, fontFamily: "Inter", color: "#1a1a2e", fontWeight: "600",
    };
    setElements(prev => [...prev, newEl]);
    setSelectedId(newEl.id);
  };

  const addQRCode = () => {
    if (elements.some(e => e.type === "qr")) return;
    const newEl: ElementType = {
      id: "qr-" + Date.now().toString(), type: "qr",
      x: 50, y: 50, width: 120, height: 120,
    };
    setElements(prev => [...prev, newEl]);
    setSelectedId(newEl.id);
  };

  const updateElement = (id: string, updates: Partial<ElementType>) =>
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));

  const removeElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  // Build a high-quality export canvas
  // IMPORTANT: element coordinates are relative to the visible canvas container.
  // We render at 2x for quality without being too slow.
  const buildExportCanvas = async (currentCertId: string): Promise<HTMLCanvasElement | null> => {
    const container = certRef.current;
    if (!container || !background) return null;

    const SCALE = 2;
    const W = container.offsetWidth;
    const H = container.offsetHeight;

    const canvas = document.createElement("canvas");
    canvas.width = W * SCALE;
    canvas.height = H * SCALE;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(SCALE, SCALE);

    // 1. Draw background — match objectFit: cover behavior
    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = background;
    await new Promise<void>((resolve) => {
      bgImg.onload = () => resolve();
      bgImg.onerror = () => resolve();
    });

    // Cover fit: maintain aspect ratio, fill canvas
    const imgAspect = bgImg.naturalWidth / bgImg.naturalHeight;
    const canvasAspect = W / H;
    let sx = 0, sy = 0, sw = bgImg.naturalWidth, sh = bgImg.naturalHeight;
    if (imgAspect > canvasAspect) {
      sw = bgImg.naturalHeight * canvasAspect;
      sx = (bgImg.naturalWidth - sw) / 2;
    } else {
      sh = bgImg.naturalWidth / canvasAspect;
      sy = (bgImg.naturalHeight - sh) / 2;
    }
    ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, W, H);

    // 2. Draw each element in order
    for (const el of elements) {
      if (el.type === "text" && el.text) {
        ctx.save();
        ctx.font = `${el.fontWeight || 500} ${el.fontSize || 24}px ${el.fontFamily || "Arial"}, sans-serif`;
        ctx.fillStyle = el.color || "#000000";
        ctx.textBaseline = "top";
        ctx.fillText(el.text, el.x, el.y);
        ctx.restore();

      } else if (el.type === "image" && el.url) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = el.url;
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
        ctx.drawImage(img, el.x, el.y, el.width || 120, el.height || 120);

      } else if (el.type === "qr") {
        const QRCode = (await import("qrcode")).default;
        const qrCanvas = document.createElement("canvas");
        const size = el.width || 120;
        const baseUrl = window.location.origin;
        await QRCode.toCanvas(qrCanvas, `${baseUrl}/verify/${currentCertId}`, {
          width: size * SCALE,
          margin: 1,
          color: { dark: "#000000", light: "#ffffff" },
        });
        ctx.drawImage(qrCanvas, el.x, el.y, size, size);
      }
    }

    return canvas;
  };

  const downloadCertificate = async () => {
    if (!background || isExporting) return;
    setIsExporting(true);
    try {
      const textEls = elements.filter(e => e.type === "text");
      const mainText = textEls.length > 0 ? textEls[0].text || "Foydalanuvchi" : "Foydalanuvchi";

      // Run DB save and canvas build in parallel for speed
      const [resp, canvas] = await Promise.all([
        fetch("/api/certificate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: certId, recipient: mainText, issuer: "CertMaster",
            elements, templateUrl: background, isTemplate: false,
          }),
        }),
        buildExportCanvas(certId),
      ]);

      const res = await resp.json();
      if (!res.success) {
        showNotification("Saqlashda xatolik: " + (res.error || "Noma'lum xato"), "error");
        return;
      }
      if (!canvas) {
        showNotification("Canvas yaratishda xatolik", "error");
        return;
      }

      // Download file first, then redirect
      if (exportFormat === "png") {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `sertifikat-${certId.substring(0, 6)}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (exportFormat === "jpg") {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg", 0.95);
        link.download = `sertifikat-${certId.substring(0, 6)}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (exportFormat === "pdf") {
        const { jsPDF } = await import("jspdf");
        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        pdf.addImage(imgData, "JPEG", 0, 0, 297, 210);
        pdf.save(`sertifikat-${certId.substring(0, 6)}.pdf`);
      }

      // Short delay so browser can start the download before navigating
      setTimeout(() => router.push(`/verify/${certId}`), 800);
    } catch (err) {
      console.error(err);
      showNotification("Eksport vaqtida xatolik yuz berdi.", "error");
    } finally {
      setIsExporting(false);
    }
  };

  const selectedEl = elements.find(el => el.id === selectedId);

  if (!mounted) return null;

  return (
    <div className="container flex gap-8 mb-20 mt-10 editor-flex">
      {/* Canvas area */}
      <div className="flex-col w-full editor-canvas-col" style={{ flex: 2 }}>
        <h2 style={{ marginBottom: "20px" }}>
          Sertifikat Muharriri{" "}
          {isLoading && <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>(Yuklanmoqda...)</span>}
        </h2>

        <div
          ref={certRef}
          onClick={() => setSelectedId(null)}
          style={{
            width: "100%",
            aspectRatio: "1.414 / 1",
            position: "relative",
            borderRadius: "8px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            overflow: "hidden",
            background: background ? "transparent" : "#f8f8f8",
          }}
        >
          {background && (
            <img
              src={background}
              alt="background"
              crossOrigin="anonymous"
              style={{
                position: "absolute", top: 0, left: 0,
                width: "100%", height: "100%",
                objectFit: "cover", display: "block",
              }}
            />
          )}

          {!background && (
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)", color: "#94a3b8", textAlign: "center",
            }}>
              Shablon rasmini yuklang yoki Dashboarddan tayyor tanlang
            </div>
          )}

          {elements.map((el) => (
            <Rnd
              key={el.id}
              position={{ x: el.x, y: el.y }}
              onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
              onResizeStop={(e, dir, ref, delta, pos) => {
                if (el.type !== "text") {
                  updateElement(el.id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    ...pos,
                  });
                }
              }}
              bounds="parent"
              enableResizing={el.type !== "text"}
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); setSelectedId(el.id); }}
              style={{
                border: selectedId === el.id ? "2px dashed rgba(79,70,229,0.8)" : "2px solid transparent",
                cursor: "move",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
              size={el.type !== "text" ? { width: el.width || 120, height: el.height || 120 } : undefined}
            >
              {el.type === "text" ? (
                <span style={{
                  fontSize: `${el.fontSize}px`,
                  fontFamily: el.fontFamily,
                  color: el.color,
                  fontWeight: el.fontWeight,
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                  display: "block",
                  userSelect: "none",
                }}>
                  {el.text}
                </span>
              ) : el.type === "qr" ? (
                <QRCodeSVG
                  value={`${typeof window !== "undefined" ? window.location.origin : ""}/verify/${certId}`}
                  size={el.width || 120}
                />
              ) : el.type === "image" && el.url ? (
                <img
                  src={el.url}
                  alt="element"
                  crossOrigin="anonymous"
                  style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
                />
              ) : null}
            </Rnd>
          ))}
        </div>
      </div>

      {/* Tools panel */}
      <div className="glass-panel editor-tools-col" style={{ flex: 1, padding: "24px", height: "fit-content" }}>
        <h3 style={{ marginBottom: "20px" }}>Asboblar</h3>

        <div className="input-group">
          <label className="input-label">Shablon Fonini O&apos;zgartirish</label>
          <input type="file" accept="image/*" onChange={handleBackgroundUpload} className="input-field" style={{ padding: "8px" }} />
        </div>

        <div className="flex gap-4 mb-4 mt-6">
          <button className="btn btn-secondary w-full" onClick={addTextElement}>+ Matn</button>
          <button className="btn btn-secondary w-full" onClick={addQRCode}>+ QR Kod</button>
        </div>

        <div className="input-group mt-2">
          <label className="input-label">E-Imzo / Shtamp (PNG) Qo&apos;shish</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" style={{ padding: "8px" }} />
        </div>

        {/* Text settings */}
        {selectedEl && selectedEl.type === "text" && (
          <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border-color)" }}>
            <h4 style={{ marginBottom: "16px" }}>Matn Sozlamalari</h4>

            <div className="input-group">
              <label className="input-label">Matn</label>
              <input
                type="text"
                value={selectedEl.text}
                onChange={(e) => updateElement(selectedEl.id, { text: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="flex gap-4">
              <div className="input-group w-full">
                <label className="input-label">O&apos;lcham (px)</label>
                <input
                  type="number"
                  value={selectedEl.fontSize}
                  onChange={(e) => updateElement(selectedEl.id, { fontSize: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div className="input-group w-full">
                <label className="input-label">Rang</label>
                <input
                  type="color"
                  value={selectedEl.color}
                  onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "2px", background: "none", border: "none", cursor: "pointer" }}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="input-group w-full">
                <label className="input-label">Shrift</label>
                <select
                  value={selectedEl.fontFamily}
                  onChange={(e) => updateElement(selectedEl.id, { fontFamily: e.target.value })}
                  className="input-field"
                  style={{ appearance: "none" }}
                >
                  <option value="Inter" style={{ color: "black" }}>Inter</option>
                  <option value="Outfit" style={{ color: "black" }}>Outfit</option>
                  <option value="Arial" style={{ color: "black" }}>Arial</option>
                  <option value="Georgia" style={{ color: "black" }}>Georgia</option>
                  <option value="Times New Roman" style={{ color: "black" }}>Times New Roman</option>
                </select>
              </div>
              <div className="input-group w-full">
                <label className="input-label">Qalinlik</label>
                <select
                  value={selectedEl.fontWeight}
                  onChange={(e) => updateElement(selectedEl.id, { fontWeight: e.target.value })}
                  className="input-field"
                  style={{ appearance: "none" }}
                >
                  <option value="400" style={{ color: "black" }}>Normal</option>
                  <option value="500" style={{ color: "black" }}>O&apos;rtacha</option>
                  <option value="600" style={{ color: "black" }}>Qalin</option>
                  <option value="700" style={{ color: "black" }}>Juda Qalin</option>
                </select>
              </div>
            </div>

            <button
              className="btn btn-secondary w-full mt-4"
              style={{ color: "var(--danger-color)", borderColor: "rgba(239,68,68,0.3)" }}
              onClick={() => removeElement(selectedEl.id)}
            >
              Elementni o&apos;chirish
            </button>
          </div>
        )}

        {selectedEl && (selectedEl.type === "qr" || selectedEl.type === "image") && (
          <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border-color)" }}>
            <button
              className="btn btn-secondary w-full"
              style={{ color: "var(--danger-color)", borderColor: "rgba(239,68,68,0.3)" }}
              onClick={() => removeElement(selectedEl.id)}
            >
              {selectedEl.type === "qr" ? "QR Kodni o'chirish" : "Rasmni o'chirish"}
            </button>
          </div>
        )}

        {/* Export section */}
        <div style={{ marginTop: "40px", borderTop: "1px solid var(--border-color)", paddingTop: "24px" }}>
          <label className="input-label" style={{ marginBottom: "8px", display: "block" }}>Eksport Formati</label>
          <div className="flex gap-2 mb-4">
            {(["png", "jpg", "pdf"] as const).map(fmt => (
              <button
                key={fmt}
                onClick={() => setExportFormat(fmt)}
                style={{
                  flex: 1, padding: "8px", borderRadius: "8px",
                  border: `1px solid ${exportFormat === fmt ? "var(--primary-color)" : "var(--border-color)"}`,
                  background: exportFormat === fmt ? "rgba(79,70,229,0.2)" : "transparent",
                  color: exportFormat === fmt ? "white" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontWeight: exportFormat === fmt ? "600" : "400",
                  textTransform: "uppercase", fontSize: "13px",
                }}
              >
                {fmt}
              </button>
            ))}
          </div>

          <button
            className="btn btn-primary w-full"
            style={{ padding: "14px", fontSize: "15px", opacity: isExporting ? 0.7 : 1 }}
            onClick={downloadCertificate}
            disabled={!background || isExporting}
          >
            {isExporting ? "Tayyorlanmoqda..." : `Yuklab Olish (${exportFormat.toUpperCase()})`}
          </button>
        </div>
      </div>

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}
