"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface ElementType {
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
}

interface CertificatePreviewProps {
  templateUrl: string | null;
  elementsData: string;
  certId?: string;
}

export default function CertificatePreview({ templateUrl, elementsData, certId }: CertificatePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [elements, setElements] = useState<ElementType[]>([]);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    try {
      setElements(JSON.parse(elementsData || "[]"));
    } catch (e) {
      setElements([]);
    }
  }, [elementsData]);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const currentWidth = containerRef.current.offsetWidth;
        const BASE_WIDTH = 800;
        setScale(currentWidth / BASE_WIDTH);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className="preview-wrapper">
      {templateUrl && (
        <img
          src={templateUrl}
          alt="Template"
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
      )}
      
      <div 
        className="preview-content"
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {elements.map((el) => (
          <div
            key={el.id}
            className="preview-element"
            style={{
              left: `${el.x}px`,
              top: `${el.y}px`,
              fontSize: el.type === "text" ? `${el.fontSize}px` : undefined,
              fontFamily: el.fontFamily,
              color: el.color,
              fontWeight: el.fontWeight,
            }}
          >
            {el.type === "text" ? (
              el.text
            ) : el.type === "qr" && certId ? (
              <QRCodeSVG
                value={`${origin}/verify/${certId}`}
                size={el.width || 120}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            ) : el.type === "qr" ? (
              // QR placeholder when no certId (e.g. template preview)
              <div style={{
                width: `${el.width || 120}px`,
                height: `${el.height || 120}px`,
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                color: "#888",
              }}>
                QR
              </div>
            ) : el.type === "image" && el.url ? (
              <img 
                src={el.url} 
                alt="El" 
                style={{ width: `${el.width || 100}px`, height: `${el.height || 100}px`, objectFit: "contain" }} 
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
