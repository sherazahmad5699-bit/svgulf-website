import { PRODUCTS } from './products';
import { BlogPost, ThemeSettings, InquiryLead, StoreData } from '@/lib/adminTypes';

export const SEED_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'buying-refurbished-business-laptops-muscat-oman-guide',
    title: 'The Ultimate Guide to Buying Business Laptops in Muscat, Oman (2026 Edition)',
    titleAr: 'الدليل الشامل لشراء لابتوبات الأعمال في مسقط، سلطنة عُمان (إصدار 2026)',
    excerpt: 'Why corporate-grade laptops from Dell, HP, and Lenovo vastly outlast commercial consumer laptops in the Gulf climate, and what to verify before purchasing.',
    excerptAr: 'لماذا تتفوق لابتوبات الأعمال من فئات ديل لاتيتيود واتش بي إليت بوك على الأجهزة الاستهلاكية في مناخ الخليج، وما هي معايير الفحص الأساسية قبل الشراء.',
    content: `
### Why Business Laptops Dominate Corporate & University Work in Oman

When searching for a reliable laptop in Muscat—whether for daily corporate work in Ruwi, architectural design in Ghala Heights, or university studies at Sultan Qaboos University—buyers often face a dilemma: buy a low-end consumer plastic laptop brand new, or invest in a **Grade A++ certified corporate-grade laptop** at half the price.

Corporate business lines such as the **Dell Latitude series (5440, 5420, 5450)**, **HP EliteBook (830 G8, 840 G8)**, and **Lenovo ThinkPad (T14, X1 Carbon)** are engineered to rigorous **MIL-STD-810H military specifications**. This means:

1. **Magnesium and Carbon-Fiber Chassis**: Unlike consumer plastic that warps in hot Gulf car boots, enterprise alloy frames dissipate heat efficiently and survive accidental drops.
2. **Spill-Resistant Backlit Keyboards**: Protected against accidental coffee spills during hectic office hours.
3. **Enterprise Battery & Cooling**: Dual-pipe cooling architectures prevent thermal throttling during demanding OMR accounting spreadsheets or multitasking.
4. **Hardware Upgradeability**: Standard SO-DIMM RAM slots and M.2 PCIe Gen 4 SSD slots allow you to upgrade to 32GB RAM or 2TB SSD anytime at svGulf.

### The 4 Crucial Checks Before Buying in Muscat

When visiting any computer shop in Muscat, ensure you verify:
* **OEM Battery Health Percentage**: Never accept vague "battery works" promises. At Smart Vision Gulf, every machine undergoes battery calibration guaranteeing **85% to 98% original OEM capacity**.
* **Display Quality**: Look for IPS anti-glare screens (1920x1080 FHD) to reduce eye fatigue in bright Muscat sunlight.
* **Original 3-Pin UK Power Adapter**: Fake chargers damage motherboard power ICs. All svGulf devices include original OEM high-wattage chargers.
* **Written Local Shop Warranty**: Ensure you receive a physical shop warranty (minimum 6 months) with a direct replacement clause.

Visit our **Ghala Heights Showroom (Shop No. 10)** to inspect these machines in person, or order via WhatsApp for same-day delivery across Muscat!
    `.trim(),
    contentAr: `
### لماذا تتصدر لابتوبات الأعمال بيئة العمل والجامعات في سلطنة عُمان؟

عندما تبحث عن لابتوب عالي الاعتمادية في مسقط — سواء كان للاستخدام اليومي في الشركات، أو للأعمال الهندسية، أو للدراسة في جامعة السلطان قابوس — يواجه المشتري خيارين: إما شراء جهاز استهلاكي مصنوع من البلاستيك بسعر مرتفع، أو الاستثمار في **لابتوب أعمال معتمد درجة أولى (Grade A++)** بنصف السعر ومواصفات مضاعفة.

أجهزة الأعمال الشهيرة مثل **Dell Latitude (5440, 5420, 5450)** و **HP EliteBook (830 G8, 840 G8)** و **Lenovo ThinkPad** مصممة وفقاً للمعايير العسكرية الأمريكية **MIL-STD-810H**، مما يمنحها مزايا استثنائية:

1. **هياكل من المغنيسيوم وألياف الكربون**: مقاومة عالية للحرارة والصدمات، على عكس البلاستيك الاستهلاكي الذي يتأثر بالحرارة داخل السيارات في الخليج.
2. **لوحات مفاتيح مقاومة لانسكاب السوائل**: مع إضاءة خلفية وحروف عربية وإنجليزية مطابقة للأصل.
3. **أنظمة تبريد احترافية**: تمنع ارتفاع الحرارة أثناء تشغيل البرامج الثقيلة أو المهام المتعددة.
4. **سهولة الترقية المستقبلية**: إمكانية مضاعفة الرام إلى 32 أو 64 جيجابايت وسعة التخزين في أي وقت في ورشتنا المتخصصة.

### 4 نقاط يجب فحصها قبل الشراء في مسقط:
* **صحة البطارية الفعلية**: في سمارت فيجن الخليج نضمن فحص البطارية بدقة والتأكد من أنها تتجاوز 85% إلى 98% من سعة المصنع الأصلية.
* **دقة ووضوح الشاشة**: شاشات IPS مضادة للتوهج لحماية العين أثناء الاستخدام المطول.
* **الشاحن الأصلي المعتمد**: تجنب الشواحن المقلدة التي تتلف اللوحة الأم؛ جميع أجهزتنا تأتي بشواحن أصلية ثلاثية بنظام UK.
* **ضمان المحل المكتوب**: احرص على الحصول على ضمان حقيقي لا يقل عن 6 أشهر مع ميزة الاستبدال الفوري.

تفضل بزيارة معرضنا في **مرتفعات غلا (محل رقم 10)** لمعاينة الأجهزة، أو اطلب مباشرة عبر واتساب مع خدمة التوصيل في نفس اليوم لجميع مناطق مسقط.
    `.trim(),
    author: 'Eng. Sheraz Ahmad',
    authorAr: 'م. شيراز أحمد',
    publishedAt: '2026-10-16T10:00:00Z',
    readingTime: '5 min read',
    readingTimeAr: 'قراءة في 5 دقائق',
    thumbnail: '/products/dell-latitude-5440.png',
    tags: ['Buying Guide', 'Dell Latitude', 'HP EliteBook', 'Muscat', 'Hardware'],
    published: true,
    featured: true,
    metaTitle: 'The Ultimate Guide to Buying Business Laptops in Muscat (2026) | svGulf',
    metaDescription: 'Expert buying guide for certified business laptops in Muscat, Oman. Dell Latitude vs HP EliteBook, battery testing, and shop warranty standards.'
  },
  {
    id: 'blog-2',
    slug: 'dell-latitude-vs-hp-elitebook-muscat-corporate-guide',
    title: 'Dell Latitude vs. HP EliteBook: Muscat Corporate & Student Comparison',
    titleAr: 'مقارنة ديل لاتيتيود ضد اتش بي إليت بوك: الدليل الشامل للشركات والطلاب في مسقط',
    excerpt: 'An in-depth hardware showdown between Dell Latitude 5440/5420 and HP EliteBook 830/840 G8 covering keyboard comfort, thermals, battery, and pricing in OMR.',
    excerptAr: 'مقارنة هندسية شاملة بين أشهر سلسلتين لأجهزة الأعمال في عُمان: ديل لاتيتيود واتش بي إليت بوك من حيث التبريد، لوحة المفاتيح، عمر البطارية، والأسعار بالريال العُماني.',
    content: `
### Dell Latitude vs HP EliteBook: The Big Comparison

For IT managers and professionals across the Sultanate of Oman, Dell and HP represent the benchmark of business laptops. At Smart Vision Gulf, these two brands make up over 70% of our daily Muscat inquiries. Here is how they stack up in direct real-world testing.

#### 1. Build Quality & Design
* **Dell Latitude (e.g. 5440 & 5420)**: Built with carbon-fiber reinforced bio-plastics and magnesium alloy sub-frames. They have a subtle slate-gray aesthetic that hides scuffs and fingerprints extremely well.
* **HP EliteBook (e.g. 830 G8 & 840 G8)**: Premium CNC machined aluminum unibody with clean silver aesthetics and tapered edges. It delivers a modern, MacBook-like executive look.

#### 2. Keyboard & Typing Feel
* **Dell Latitude**: Offers deep 1.5mm key travel with tactile bounce. For accountants, legal typists, and programmers writing thousands of words daily, Dell keys offer unparalleled comfort.
* **HP EliteBook**: Extremely quiet, dampened click with premium aluminum palm rests. Ideal for boardrooms and library settings where silent typing is preferred.

#### 3. Thermal Management in Oman Heat
Both models excel over consumer notebooks. Dell Latitude uses larger dual-blade fans with bottom-intake and rear-exhaust vents. HP features intelligent thermal sensors that adjust RPM dynamically to keep the chassis cool on your lap.

#### 4. Pricing & Value in Muscat
At svGulf Ghala Heights:
* **Dell Latitude 5440 (13th Gen i5 / 16GB DDR5 / 512GB SSD)**: Available at **OMR 149.000** with 6-month shop warranty.
* **HP EliteBook 830 G8 x360 (11th Gen i5 / 16GB RAM / Touchscreen Convertible)**: Available at **OMR 129.000**.

Both include our comprehensive svGulf bundle: heavy-duty bag, wireless optical mouse, and original charger.
    `.trim(),
    contentAr: `
### مقارنة شاملة: ديل لاتيتيود ضد اتش بي إليت بوك في مسقط

يمثل هذان الاسمان قمة الاعتمادية في سوق الحواسيب المحمولة لقطاع الأعمال في سلطنة عُمان. تشكل هاتان العلامتان أكثر من 70% من مبيعاتنا اليومية في سمارت فيجن الخليج. إليك التفاصيل الهندسية لمساعدتك في اتخاذ القرار الأمثل:

#### 1. جودة التصنيع والخامات:
* **ديل لاتيتيود (Dell Latitude 5440 / 5420)**: هيكل مقوى بألياف الكربون ومزيج البوليمر والمغنيسيوم. لون رمادي كلاسيكي أنيق مقاوم للخدوش وبصمات الأصابع.
* **اتش بي إليت بوك (HP EliteBook 830 G8 / 840 G8)**: هيكل ألومنيوم كامل مصقول بدقة CNC بلون فضي جذاب، يشبه في أناقته أجهزة الماك بوك الفاخرة.

#### 2. لوحة المفاتيح وتجربة الكتابة:
* **ديل لاتيتيود**: عمق ضغطات 1.5 ملم مريح جداً للكتابة السريعة وإدخال البيانات المحاسبية والبرمجة لساعات طويلة دون إجهاد.
* **اتش بي إليت بوك**: مفاتيح هادئة جداً مع وسائد ألومنيوم مريحة، مثالية للاجتماعات وقاعات المحاضرات.

#### 3. التبريد والتحمل في صيف الخليج:
كلا الجهازين يتفوقان بمراحل على الأجهزة الاستهلاكية بفضل فتحات التهوية النحاسية ومراوح التبريد المزدوجة التي تضمن ثبات الأداء حتى تحت أقصى ضغط عمل.

#### 4. الأسعار والقيمة في مسقط:
* **ديل لاتيتيود 5440 (الجيل الـ 13، رام 16 جيجا DDR5، تخزين 512 جيجا)**: متوفر بسعر **149.000 ريال عُماني**.
* **اتش بي إليت بوك 830 G8 لمس قابل للطي 360 درجة**: متوفر بسعر **129.000 ريال عُماني**.

يشمل السعر حقيبة فاخرة، ماوس لاسلكي، شاحن أصلي، وضمان المحل لمدة 6 أشهر مع الاستبدال الفوري.
    `.trim(),
    author: 'svGulf Technical Team',
    authorAr: 'فريق الدعم الفني - سمارت فيجن الخليج',
    publishedAt: '2026-10-17T12:00:00Z',
    readingTime: '6 min read',
    readingTimeAr: 'قراءة في 6 دقائق',
    thumbnail: '/products/hp-elitebook-830g8.png',
    tags: ['Comparison', 'Dell', 'HP', 'Latitude', 'EliteBook', 'Muscat'],
    published: true,
    featured: false,
    metaTitle: 'Dell Latitude vs HP EliteBook Comparison in Oman | svGulf Muscat',
    metaDescription: 'Compare Dell Latitude and HP EliteBook laptops in Muscat, Oman. Thermal benchmarks, keyboard feel, battery life, and prices in OMR.'
  },
  {
    id: 'blog-3',
    slug: 'svgulf-90-point-hardware-inspection-and-warranty-guide',
    title: "Inside svGulf's 90-Point Hardware Inspection & 6-Month Warranty Protocol",
    titleAr: 'كواليس الفحص الفني لـ 90 نقطة وبروتوكول ضمان 6 أشهر في سمارت فيجن الخليج',
    excerpt: 'How our certified hardware engineers in Ghala Heights rigorously stress-test OEM batteries, thermals, memory, and ports before any laptop reaches our showroom floor.',
    excerptAr: 'تعرف على الخطوات الدقيقة التي يتبعها مهندسونا في ورشة مرتفعات غلا لفحص البطاريات والشاشات واللوحات الأم تحت أقصى ضغط قبل عرض أي جهاز للبيع.',
    content: `
### Transparency is Our Primary Principle

Unlike informal classified sellers or generic electronics kiosks, Smart Vision Gulf operates an in-house diagnostics and refurbishing lab located directly at **Shop No. 10, Ghala Heights, Muscat**.

Every laptop arriving at our facility undergoes our rigorous **90-Point Diagnostic Protocol** divided into eight critical stages:

1. **Battery Diagnostic & Stress Testing**:
   * Verification of true OEM cycle count and chemical wear via hardware telemetry.
   * Full load discharge test under 100% CPU stress.
   * Guarantee that battery health remains at or above **85% capacity**.

2. **Motherboard & Power Delivery Inspection**:
   * Verification of DC-in charging circuitry, MOSFET thermals, and USB-C Power Delivery negotiation.
   * Verification of genuine firmware and BIOS lock removal.

3. **Display & Panel Integrity**:
   * RGB color uniformity test to eliminate dead pixels, pressure marks, and backlight bleeding.
   * Hinge torque inspection to ensure smooth 180-degree or 360-degree rotation without creaking.

4. **Keyboard & Trackpad Calibration**:
   * Every single key registered via synthetic input testers.
   * Multi-touch gesture response and palm rejection calibration.

5. **Thermal Repaste & Cleaning**:
   * Thermal heatsinks are sonically cleaned, and premium non-conductive thermal paste is applied to guarantee whisper-quiet fan operation.

### Our 6-Month Direct Shop Warranty & 7-Day Exchange
Every laptop comes with our physical stamped warranty card covering all core hardware components. If any technical defect arises within the first 7 days, you receive an **immediate exchange** on the spot in Ghala Heights.
    `.trim(),
    contentAr: `
### الشفافية هي المبدأ الأساسي لسمارت فيجن الخليج

على عكس الإعلانات المبوبة الفردية أو المتاجر غير المتخصصة، تمتلك سمارت فيجن الخليج ورشة فحص وتشخيص هندسية متكاملة تقع مباشرة في **محل رقم 10، مرتفعات غلا، مسقط**.

يخضع كل جهاز يصل إلى مركزنا إلى **بروتوكول فحص شامل لـ 90 نقطة تقنية** مقسمة على ثمانية محاور:

1. **فحص البطارية واختبارات الجهد العالي**:
   * قراءة دورات الشحن الفعلية ونسبة التآكل الكيميائي عبر أجهزة الفحص المباشر.
   * اختبار تفريغ البطارية تحت ضغط المعالج الكامل 100%.
   * اشتراط ألا تقل كفاءة البطارية عن **85% من سعة المصنع**.

2. **فحص اللوحة الأم (Motherboard) ودوائر الطاقة**:
   * التأكد من كفاءة دوائر الشحن ومنافذ USB-C Power Delivery.
   * فحص دوائر الحماية من ارتفاع التيار الكهربائي.
   * التأكد من تحديث BIOS الرسمي وخلوه من أي أقفال رقمية.

3. **سلامة الشاشة وجودة الألوان**:
   * اختبار شامل للألوان لاكتشاف أي بكسل معطوب أو بقع بيضاء.
   * فحص متانة مفصلات الشاشة ومرونتها الكاملة حتى 180 أو 360 درجة.

4. **لوحة المفاتيح ولوحة اللمس (Trackpad)**:
   * فحص استجابة كل مفتاح على حدة عبر برامج فحص التردد.
   * اختبار دقة اللمس المتعدد والإيماءات الذكية.

5. **تجديد المعجون الحراري وتنظيف المراوح**:
   * تنظيف مسارات التبريد ووضع معجون حراري عالي الكفاءة لضمان هدوء المراوح وبرودة الجهاز.

### ضمان حقيقي لمدة 6 أشهر مع استبدال فوري خلال 7 أيام:
كل جهاز يحصل على بطاقة ضمان ورقية مختومة تغطي كافة القطع الأساسية، مع ضمان الاستبدال الفوري خلال أول 7 أيام في حال ظهور أي عيب مصنعي.
    `.trim(),
    author: 'svGulf Quality Assurance',
    authorAr: 'قسم الجودة والفحص الفني - مسقط',
    publishedAt: '2026-10-18T09:00:00Z',
    readingTime: '4 min read',
    readingTimeAr: 'قراءة في 4 دقائق',
    thumbnail: '/products/dell-latitude-5450.png',
    tags: ['Warranty', 'Quality Assurance', 'Muscat', 'Inspection', 'Lab'],
    published: true,
    featured: false,
    metaTitle: "Inside svGulf's 90-Point Hardware Inspection & Warranty | Muscat Oman",
    metaDescription: "Learn how svGulf tests Grade A++ business laptops in Ghala Heights, Muscat. Battery diagnostics, thermal repasting, and 6-month shop warranty."
  }
];

export const SEED_THEME: ThemeSettings = {
  announcementBanner: {
    enabled: true,
    textEn: '✨ Spring Special: Free Heavy-Duty Bag + Wireless Mouse + Original Charger with every laptop!',
    textAr: '✨ عرض خاص: حقيبة فاخرة + ماوس لاسلكي + شاحن أصلي مجاناً مع كل لابتوب أعمال!',
    linkUrl: '/inventory',
    bgColor: '#001C71'
  },
  promoBar: {
    enabled: true,
    textEn: 'Same-Day Fast Delivery across Muscat & COD All Over Oman · Call or WhatsApp: +968 94009501',
    textAr: 'توصيل سريع في نفس اليوم بمسقط والدفع عند الاستلام لكافة محافظات عُمان · اتصل أو واتساب: 94009501 968+',
    code: 'OMAN2026',
    discountText: 'Free Delivery'
  },
  heroHeadline: {
    badgeEn: 'Sultanate of Oman · Ghala Heights Showroom',
    badgeAr: 'سلطنة عُمان · معرض مرتفعات غلا',
    titlePart1En: 'Certified Business Laptops at ',
    titlePart1Ar: 'لابتوبات أعمال معتمدة بأفضل ',
    titleHighlightEn: 'Wholesale Muscat Prices',
    titleHighlightAr: 'أسعار الجملة في مسقط',
    subtitleEn: 'Handpicked Dell Latitude, HP EliteBook, Lenovo ThinkPad & Apple MacBooks. 100% verified battery health, original UK 3-pin chargers, and comprehensive 6-month shop warranty with same-day Muscat delivery.',
    subtitleAr: 'أجهزة مختارة بعناية من ديل لاتيتيود، اتش بي إليت بوك، لينوفو ثينك باد وابل ماك بوك. فحص بطارية دقيق، شواحن أصلية، وضمان معتمد لمدة 6 أشهر مع توصيل فوري في مسقط.'
  },
  contactNumbers: {
    primaryWhatsApp: '+96894009501',
    secondaryWhatsApp: '+96896009404',
    phoneCall: '+96894009501',
    defaultWhatsAppMessage: 'Hello Smart Vision Gulf, I am inquiring about laptop stock and availability in your Ghala Heights showroom.'
  },
  emergencyAlert: {
    enabled: false,
    badgeTextEn: 'Store Announcement',
    badgeTextAr: 'تنويه المعرض',
    detailsEn: 'Our Ghala Heights showroom is open daily. Walk-ins welcome for on-the-spot hardware inspection.',
    detailsAr: 'معرضنا في مرتفعات غلا مفتوح يومياً لاستقبالكم ومعاينة الأجهزة مباشرة على أرض الواقع.',
    type: 'info'
  },
  branding: {
    accentColor: '#F36607',
    shopAddress: 'Shop No. 10, Ghala Heights, Wilayat Bausher, Muscat, Sultanate of Oman',
    shopAddressAr: 'محل رقم 10، مرتفعات غلا، ولاية بوشر، مسقط، سلطنة عُمان',
    openingHoursEn: 'Sat-Thu: 9:00 AM - 10:00 PM | Fri: 4:30 PM - 10:00 PM',
    openingHoursAr: 'السبت - الخميس: 9:00 صباحاً - 10:00 مساءً | الجمعة: 4:30 عصراً - 10:00 مساءً'
  }
};

export const SEED_INQUIRIES: InquiryLead[] = [
  {
    id: 'inq-101',
    name: 'Ahmed Al-Harthy',
    phone: '+96892345678',
    email: 'ahmed.alharthy@omantel.net.om',
    subject: 'Laptop Stock & Availability Inquiry',
    message: 'Hello, is the Dell Latitude 5440 (16GB RAM) available for pickup today at your Ghala Heights showroom?',
    productSku: 'SVG-DL5440-R',
    productName: 'Dell Latitude 5440 Business Laptop',
    createdAt: '2026-10-18T08:30:00Z',
    source: 'whatsapp_click',
    status: 'contacted',
    notes: 'Customer confirmed pickup today at 6 PM. Reserved unit with 94% battery health.'
  },
  {
    id: 'inq-102',
    name: 'Said Al-Balushi',
    phone: '+96898765432',
    email: 'said.balushi99@gmail.com',
    subject: 'RAM / SSD Custom Upgrade Quote',
    message: 'I want HP EliteBook 830 G8 with upgrade to 32GB RAM and 1TB SSD. What is the total with delivery to Seeb?',
    productSku: 'SVG-HP830G8-R',
    productName: 'HP EliteBook 830 G8 x360 Convertible',
    createdAt: '2026-10-18T10:15:00Z',
    source: 'upgrade_configurator',
    status: 'new',
    notes: 'Quotation sent via WhatsApp: OMR 129 + 25 (32GB) + 20 (1TB) = OMR 174 total.'
  },
  {
    id: 'inq-103',
    name: 'Fatima Al-Raisi',
    phone: '+96891234890',
    email: 'f.alraisi@squ.edu.om',
    subject: 'B2B Corporate & School Bulk Order',
    message: 'Inquiring about 5 units of Lenovo ThinkPad T14 for an engineering office in Muscat. Do you provide formal tax invoices with 5% Oman VAT?',
    productSku: 'SVG-LN-T14-G2',
    productName: 'Lenovo ThinkPad T14 Gen 2',
    createdAt: '2026-10-17T14:40:00Z',
    source: 'contact_form',
    status: 'contacted',
    notes: 'Corporate quote sent with 5% VAT invoice. Awaiting LPO confirmation.'
  },
  {
    id: 'inq-104',
    name: 'Mohammed Al-Shehhi',
    phone: '+96895551234',
    subject: 'Showroom Visit & Directions',
    message: 'Can you share Google Maps location for Shop No. 10 in Ghala Heights? Coming from Sohar.',
    createdAt: '2026-10-17T11:20:00Z',
    source: 'whatsapp_click',
    status: 'resolved',
    notes: 'Location pin shared. Customer visited and purchased Dell 5420.'
  }
];

export function getInitialStoreData(): StoreData {
  return {
    products: JSON.parse(JSON.stringify(PRODUCTS)),
    blogs: JSON.parse(JSON.stringify(SEED_BLOGS)),
    theme: JSON.parse(JSON.stringify(SEED_THEME)),
    inquiries: JSON.parse(JSON.stringify(SEED_INQUIRIES)),
    adminConfig: {
      updatedAt: new Date().toISOString()
    }
  };
}
