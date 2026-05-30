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
      isTemplate: Boolean(data.isTemplate),
      templateUrl: data.templateUrl || null
    };

    let cert;
    if (data.id) {
      cert = await prisma.certificate.upsert({
        where: { id: data.id },
        update: certData,
        create: { ...certData, id: data.id }
      });
    } else {
      cert = await prisma.certificate.create({ data: certData });
    }

    return NextResponse.json({ success: true, id: cert.id });
  } catch (error) {
    console.error("CERT_SAVE_ERROR", error);
    return NextResponse.json({ success: false, error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
