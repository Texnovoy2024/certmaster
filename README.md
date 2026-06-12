# CertMaster — Premium Sertifikat Yaratish Platformasi

O'zbekiston uchun zamonaviy sertifikat, diplom va faxriy yorliq tayyorlash platformasi. QR kod bilan haqiqiylikni tasdiqlang.

## Imkoniyatlar

- 🎨 **Drag & Drop muharrir** — matn, QR kod va rasmlarni sertifikat ustiga joylashtiring
- 📄 **29 ta tayyor shablon** — professional dizaynlar to'plami
- 🔍 **QR kod verifikatsiya** — har bir sertifikat uchun noyob tekshirish linki
- 📥 **PNG/JPG/PDF eksport** — yuqori sifatli yuklab olish
- 📱 **Mobile responsive** — barcha qurilmalarda ishlaydi

## Texnologiyalar

- **Next.js 16** (App Router)
- **Prisma ORM** + **PostgreSQL** (Vercel/Neon)
- **React 19**, **TypeScript**
- **react-rnd** (drag & resize)
- **qrcode.react**, **jsPDF**, **html2canvas**

## Lokal ishga tushirish

```bash
# 1. O'rnatish
npm install

# 2. .env fayl yaratish
cp .env.example .env
# DATABASE_URL ni to'ldiring

# 3. Ma'lumotlar bazasini sozlash
npx prisma generate
npx prisma db push

# 4. Shablonlarni yuklash
node prisma/seed.js

# 5. Ishga tushirish
npm run dev
```

## Vercel ga Deploy qilish

1. [Neon](https://neon.tech) da bepul PostgreSQL bazasini yarating
2. Vercel loyihasida `DATABASE_URL` environment variable ni sozlang
3. GitHub ga push qiling — Vercel avtomatik deploy qiladi
4. Deploy tugagach `npx prisma db push` va seed ni ishga tushiring

## Muhit o'zgaruvchilari

| O'zgaruvchi | Tavsif |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon yoki boshqa) |

## Live Demo

🔗 [certmaster-five.vercel.app](https://certmaster-five.vercel.app)
