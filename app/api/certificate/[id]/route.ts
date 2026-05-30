import { NextResponse } from 'next/server';
import prisma from "../../../../lib/prisma";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const cert = await prisma.certificate.findUnique({
      where: { id: params.id }
    });

    if (!cert) {
      return NextResponse.json({ success: false, error: "Topilmadi" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: cert });
  } catch (error) {
    console.error("GET_CERTIFICATE_ERROR", error);
    return NextResponse.json({ success: false, error: "Server xatosi" }, { status: 500 });
  }
}
