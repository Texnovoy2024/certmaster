import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    const result = await prisma.certificate.deleteMany({
      where: {
        isTemplate: false
      }
    });

    return NextResponse.json({ 
      success: true, 
      count: result.count,
      message: "Tarix muvaffaqiyatli tozalandi" 
    });
  } catch (error) {
    console.error("CLEAR_HISTORY_ERROR", error);
    return NextResponse.json({ 
      success: false, 
      error: "Tarixni tozalashda xatolik yuz berdi" 
    }, { status: 500 });
  }
}
