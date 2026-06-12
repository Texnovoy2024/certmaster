import { NextResponse } from 'next/server';
import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const certData = {
      recipient: data.recipient || 'Nomaʼlum',
      issuer: data.issuer || 'CertMaster',
      qrCodeUrl: (data.qrCodeUrl !== undefined) ? data.qrCodeUrl : '',
      elementsData: JSON.stringify(data.elements || []),
      isTemplate: false, // foydalanuvchi sertifikatlari hech qachon shablon bo'lmaydi
      templateUrl: data.templateUrl || null
    };

    let cert;
    if (data.id) {
      // Avval tekshiramiz: bu ID shablon bo'lsa, yangi yozuv yaratamiz
      const existing = await prisma.certificate.findUnique({ where: { id: data.id } });
      if (existing?.isTemplate) {
        // Shablon ustiga yozmaslik — yangi yozuv yaratamiz
        cert = await prisma.certificate.create({ data: certData });
      } else {
        cert = await prisma.certificate.upsert({
          where: { id: data.id },
          update: certData,
          create: { ...certData, id: data.id }
        });
      }
    } else {
      cert = await prisma.certificate.create({ data: certData });
    }

    return NextResponse.json({ success: true, id: cert.id });
  } catch (error: any) {
    console.error("CERT_SAVE_ERROR:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Xatolik yuz berdi",
      details: error.code || "UNKNOWN"
    }, { status: 500 });
  }
}
