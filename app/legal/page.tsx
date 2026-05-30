export default function LegalPage() {
  return (
    <div className="container flex flex-col mt-10 mb-20">
      
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '8px', textAlign: 'center' }}>Ommaviy Offerta (Shartnoma)</h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px', fontSize: '15px' }}>
          So'nggi yangilanish: 2026-yil 12-Aprel
        </p>

        <div className="glass-panel" style={{ padding: '40px', lineHeight: 1.8, fontSize: '15px' }}>
          
          <h2 style={{ fontSize: '22px', marginBottom: '16px', color: 'white', marginTop: 0 }}>1. Umumiy Qoidalar</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Ushbu ommaviy offerta Sertifika platformasi ("Ijrochi") va platformadan foydalanuvchi jismoniy yoki yuridik shaxslar ("Foydalanuvchi") o'rtasidagi munosabatlarni tartibga soluvchi rasmiy bitim hisoblanadi. Mazkur platforma orqali sertifikat tayyorlash shartlariga rozi bo'lish foydalanuvchining offerta shartlarini to'liq qabul qilganligini anglatadi.
          </p>

          <h2 style={{ fontSize: '22px', marginBottom: '16px', color: 'white' }}>2. Maxfiylik va Xavfsizlik Siyosati</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Biz siz kiritgan ism-familiyalar, kompaniya nomlari va yuklagan rasmlaringizning maxfiyligini to'liq kafolatlaymiz. Olingan barcha shaxsiy ma'lumotlar faqatgina sertifikat tayyorlash jarayoni uchungina saqlanadi hamda uchinchi shaxslarga taqdim etilmaydi. QR kodli xavfsizlik tizimi platformamizga yuklatilgan axborotni qalbakilashtirishdan himoya qilish uchun joriy qilingan.
          </p>

          <h2 id="terms" style={{ fontSize: '22px', marginBottom: '16px', color: 'white' }}>3. Foydalanish Shartlari</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            - Platformadan davlat siyosatiga qarshi, irqchilik, diniy va qonunga zid matnlarni sertifikatlarga yozish maqsadida foydalanish qat'iyan man etiladi. <br />
            - Platforma QR kodlarining ishlash kafolatini beradi, biroq foydalanuvchilar maxsus bazadan o'zlari o'chirib yuborgan sertifikatlar qayta tiklanmaydi.<br />
            - Nodavlat va davlat tashkilotlari bilan to'g'ridan-to'g'ri shartnoma qilinishi mumkin va bu platformaning ommaviy huquqlariga ko'ra ustuvor deb topiladi.
          </p>

          <h2 style={{ fontSize: '22px', marginBottom: '16px', color: 'white' }}>4. Tomonlarning O'zaro Majburiyatlari</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Ijrochi platforma uzluksiz ishlashini ta'minlash va QR kod xavfsizligini ta'minlashni o'z zimmasiga oladi. Foydalanuvchi esa o'z axborotining to'g'riligi va qonunchilikka zid emasligini ta'minlashi shart.
          </p>

          <div style={{ padding: '24px', background: 'rgba(79, 70, 229, 0.1)', border: '1px solid rgba(79, 70, 229, 0.2)', borderRadius: '12px', marginTop: '40px' }}>
            <h3 style={{ fontSize: '18px', color: 'white', marginBottom: '8px' }}>Rozilik Tassdig'i</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Sertifikat tizimidan foydalanishni boshlagan vaqtingizdan e'tiboran siz ushbu shartlarning bariga avtomatik tarzda rozi bo'lgansiz deb hisoblanasiz.
            </p>
          </div>

        </div>
      </div>
      
    </div>
  );
}
