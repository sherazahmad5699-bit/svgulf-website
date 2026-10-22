export interface Product {
  sku: string;
  brand: 'dell' | 'hp' | 'lenovo' | 'apple' | 'accessories';
  brandLabel: string;
  name: string;
  nameAr: string;
  category: 'laptop' | 'ultrabook' | 'workstation' | 'monitor' | 'accessory';
  categoryLabel: string;
  categoryLabelAr: string;
  cpu: string;
  ram: string;
  ssd: string;
  display: string;
  graphics: string;
  condition: 'Grade A++' | 'Certified Pre-Owned' | 'Brand New';
  conditionAr: string;
  batteryHealth: string;
  batteryPercentage?: number;
  priceNumeric: number;
  costPriceNumeric?: number;
  priceFormatted: string;
  wasPriceFormatted?: string;
  warranty: string;
  warrantyAr: string;
  keyboard: string;
  bundle: string;
  bundleAr: string;
  featured?: boolean;
  bestSeller?: boolean;
  image: string;
  description: string;
  descriptionAr: string;
  fullSpecs: {
    label: string;
    labelAr: string;
    value: string;
  }[];
  upgradeOptions?: {
    ramOptions: { label: string; labelAr?: string; price: number }[];
    ssdOptions: { label: string; labelAr?: string; price: number }[];
  };
  inStock?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    sku: 'SVG-DL5440-R',
    brand: 'dell',
    brandLabel: 'Dell',
    name: 'Dell Latitude 5440 Business Laptop',
    nameAr: 'لابتوب ديل لاتيتيود 5440 للأعمال',
    category: 'laptop',
    categoryLabel: 'Business Laptop',
    categoryLabelAr: 'لابتوب أعمال',
    cpu: 'Intel Core i5-1335U (13th Gen, 10 Cores, up to 4.6GHz)',
    ram: '16GB DDR5 High-Speed',
    ssd: '512GB PCIe NVMe SSD',
    display: '14.0" Full HD (1920x1080) Anti-Glare IPS 250 nits',
    graphics: 'Intel Iris Xe Graphics',
    condition: 'Grade A++',
    conditionAr: 'درجة أولى ممتازة (A++)',
    batteryHealth: '92% Health Verified',
    batteryPercentage: 92,
    priceNumeric: 149.000,
    priceFormatted: 'OMR 149.000',
    wasPriceFormatted: 'OMR 175.000',
    warranty: '6 Months Shop Warranty + 7 Days Replacement',
    warrantyAr: 'ضمان المحل 6 أشهر + استبدال 7 أيام',
    keyboard: 'Factory Backlit Keyboard (Arabic / English)',
    bundle: 'Free Heavy-Duty Bag + Wireless Mouse + Original 65W UK Charger',
    bundleAr: 'حقيبة فاخرة + ماوس لاسلكي + شاحن ديل أصلي مجاناً',
    featured: true,
    bestSeller: true,
    image: '/products/dell-latitude-5440.png',
    description: 'The standard of corporate reliability in Oman. Powered by 13th Gen Intel Core i5 with DDR5 speed, all-day verified battery life, and rigid MIL-SPEC chassis. Ideal for corporate professionals, engineers, and university students.',
    descriptionAr: 'المعيار الذهبي لابتوبات الأعمال في سلطنة عُمان. معالج إنتل الجيل الثالث عشر مع ذاكرة DDR5 فائقة السرعة، بطارية مفحوصة تدوم طويلاً، وهيكل متين بمعايير عسكرية.',
    fullSpecs: [
      { label: 'Processor', labelAr: 'المعالج', value: 'Intel Core i5-1335U (10 Cores, 12 Threads, up to 4.6 GHz)' },
      { label: 'Installed Memory', labelAr: 'الذاكرة العشوائية', value: '16 GB DDR5 4800MHz (Upgradeable to 64GB)' },
      { label: 'Internal Storage', labelAr: 'سعة التخزين', value: '512 GB M.2 NVMe PCIe 4.0 SSD' },
      { label: 'Screen & Panel', labelAr: 'الشاشة', value: '14.0-inch FHD (1920 x 1080) Non-Touch, Anti-Glare' },
      { label: 'Ports & I/O', labelAr: 'المنافذ', value: '2x Thunderbolt 4 / USB-C, 2x USB 3.2 Gen 1, HDMI 2.0, RJ-45 LAN, MicroSD' },
      { label: 'Camera & Security', labelAr: 'الكاميرا والأمان', value: 'FHD Webcam with Privacy Shutter, Fingerprint Reader' },
      { label: 'Operating System', labelAr: 'نظام التشغيل', value: 'Genuine Windows 11 Pro 64-bit' },
      { label: 'Weight & Build', labelAr: 'الوزن والهيكل', value: '1.36 kg / Carbon Fiber Reinforced Polymer' }
    ],
    upgradeOptions: {
      ramOptions: [
        { label: 'Standard 16GB DDR5', labelAr: 'الأساسي: 16 جيجابايت DDR5', price: 0 },
        { label: 'Upgrade to 32GB DDR5 (+OMR 25.000)', labelAr: 'ترقية إلى 32 جيجابايت DDR5 (+25.000 ر.ع.)', price: 25.000 }
      ],
      ssdOptions: [
        { label: 'Standard 512GB NVMe SSD', labelAr: 'الأساسي: 512 جيجابايت NVMe', price: 0 },
        { label: 'Upgrade to 1TB NVMe Gen4 (+OMR 20.000)', labelAr: 'ترقية إلى 1 تيرابايت Gen4 (+20.000 ر.ع.)', price: 20.000 }
      ]
    }
  },
  {
    sku: 'SVG-HP830G8-R',
    brand: 'hp',
    brandLabel: 'HP',
    name: 'HP EliteBook 830 G8 x360 Convertible',
    nameAr: 'اتش بي اليتبوك 830 G8 قابل للطي 360°',
    category: 'ultrabook',
    categoryLabel: '2-in-1 Convertible',
    categoryLabelAr: 'لابتوب متحول 2 في 1',
    cpu: 'Intel Core i5-1145G7 vPro (11th Gen, up to 4.4GHz)',
    ram: '16GB DDR4 Dual-Channel',
    ssd: '512GB High-Speed NVMe SSD',
    display: '13.3" FHD IPS Touchscreen 360° Flip (Gorilla Glass)',
    graphics: 'Intel Iris Xe Graphics',
    condition: 'Grade A++',
    conditionAr: 'درجة أولى ممتازة (A++)',
    batteryHealth: '88% Health Verified',
    batteryPercentage: 88,
    priceNumeric: 145.000,
    priceFormatted: 'OMR 145.000',
    wasPriceFormatted: 'OMR 169.000',
    warranty: '6 Months Shop Warranty + 7 Days Replacement',
    warrantyAr: 'ضمان المحل 6 أشهر + استبدال 7 أيام',
    keyboard: 'Arabic + English Backlit Spill-Resistant Keyboard',
    bundle: 'Free Protective Sleeve + Wireless Mouse + Original 65W HP Charger',
    bundleAr: 'حقيبة حافظة + ماوس لاسلكي + شاحن اتش بي أصلي',
    featured: true,
    bestSeller: true,
    image: '/products/hp-elitebook-830-g8.png',
    description: 'Premium ultra-light aluminum 2-in-1 laptop that folds 360 degrees into a tablet. Bang & Olufsen premium audio, responsive touchscreen, and robust security for executives on the move.',
    descriptionAr: 'لابتوب تنفيذي فائق النحافة من الألمنيوم النقي يلتف 360 درجة ليتحول لجهاز لوحي. صوت بانج آند أولوفسن وشاشة لمس متطورة.',
    fullSpecs: [
      { label: 'Processor', labelAr: 'المعالج', value: 'Intel Core i5-1145G7 vPro (4 Cores, 8 Threads, up to 4.4GHz)' },
      { label: 'Installed Memory', labelAr: 'الذاكرة العشوائية', value: '16 GB DDR4 3200MHz' },
      { label: 'Internal Storage', labelAr: 'سعة التخزين', value: '512 GB PCIe NVMe M.2 SSD' },
      { label: 'Screen & Touch', labelAr: 'الشاشة واللمس', value: '13.3" FHD (1920x1080) IPS Touchscreen with Corning Gorilla Glass 5' },
      { label: 'Ports & I/O', labelAr: 'المنافذ', value: '2x Thunderbolt 4 / USB4, 2x USB 3.2 Gen 1, 1x HDMI 2.0, Headphone/Mic' },
      { label: 'Audio & Cam', labelAr: 'الصوت والكاميرا', value: 'Bang & Olufsen Dual Stereo Speakers, 720p HD Privacy Camera' },
      { label: 'Operating System', labelAr: 'نظام التشغيل', value: 'Windows 11 Pro 64-bit' },
      { label: 'Weight', labelAr: 'الوزن', value: '1.31 kg Full Aluminum CNC Body' }
    ],
    upgradeOptions: {
      ramOptions: [
        { label: 'Standard 16GB Dual-Channel', labelAr: 'الأساسي: 16 جيجابايت ثنائي القناة', price: 0 }
      ],
      ssdOptions: [
        { label: 'Standard 512GB NVMe', labelAr: 'الأساسي: 512 جيجابايت NVMe', price: 0 },
        { label: 'Upgrade to 1TB NVMe (+OMR 22.000)', labelAr: 'ترقية إلى 1 تيرابايت (+22.000 ر.ع.)', price: 22.000 }
      ]
    }
  },
  {
    sku: 'SVG-DL5450-R',
    brand: 'dell',
    brandLabel: 'Dell',
    name: 'Dell Latitude 5450 AI Powered',
    nameAr: 'ديل لاتيتيود 5450 معالج الذكاء الاصطناعي',
    category: 'laptop',
    categoryLabel: 'AI Business Laptop',
    categoryLabelAr: 'لابتوب الذكاء الاصطناعي',
    cpu: 'Intel Core Ultra 5 135U (12 Cores, Dedicated NPU AI Boost)',
    ram: '16GB DDR5 5600MHz',
    ssd: '512GB PCIe Gen4 NVMe SSD',
    display: '14.0" FHD IPS 300 nits Low Blue Light',
    graphics: 'Intel Graphics with Intel AI Boost NPU',
    condition: 'Certified Pre-Owned',
    conditionAr: 'معتمد شبه جديد (CPO)',
    batteryHealth: '96% Health Verified',
    batteryPercentage: 96,
    priceNumeric: 179.000,
    priceFormatted: 'OMR 179.000',
    wasPriceFormatted: 'OMR 210.000',
    warranty: '6 Months Shop Warranty + 7 Days Replacement',
    warrantyAr: 'ضمان المحل 6 أشهر + استبدال 7 أيام',
    keyboard: 'Arabic + English Backlit with Copilot Key',
    bundle: 'Free Bag + Mouse + Original Dell 65W Type-C Charger',
    bundleAr: 'حقيبة فاخرة + ماوس + شاحن ديل تايب سي أصلي مجاناً',
    featured: true,
    bestSeller: false,
    image: '/products/dell-latitude-5450.png',
    description: 'Next-generation 2024 AI PC with dedicated neural processing unit (NPU). Unmatched power efficiency, intelligent background blur and noise cancellation, and lightning-fast DDR5.',
    descriptionAr: 'جيل 2024 الجديد المدمج بوحدة معالجة الذكاء الاصطناعي (NPU). كفاءة طاقة استثنائية وأداء متطور.',
    fullSpecs: [
      { label: 'Processor', labelAr: 'المعالج', value: 'Intel Core Ultra 5 135U (12 Cores, 14 Threads, Intel AI Boost)' },
      { label: 'Memory', labelAr: 'الذاكرة العشوائية', value: '16 GB DDR5 5600MHz' },
      { label: 'Storage', labelAr: 'سعة التخزين', value: '512 GB PCIe 4.0 NVMe SSD' },
      { label: 'Display', labelAr: 'الشاشة', value: '14.0" FHD IPS (1920x1080), 300 nits, Anti-Glare' },
      { label: 'Battery', labelAr: 'البطارية', value: '54 Wh ExpressCharge Capable, 96% Verified Health' },
      { label: 'Operating System', labelAr: 'نظام التشغيل', value: 'Windows 11 Pro 64-bit with Microsoft Copilot' }
    ],
    upgradeOptions: {
      ramOptions: [
        { label: 'Standard 16GB DDR5', labelAr: 'الأساسي: 16 جيجابايت DDR5', price: 0 },
        { label: 'Upgrade to 32GB DDR5 (+OMR 28.000)', labelAr: 'ترقية إلى 32 جيجابايت DDR5 (+28.000 ر.ع.)', price: 28.000 }
      ],
      ssdOptions: [
        { label: 'Standard 512GB NVMe', labelAr: 'الأساسي: 512 جيجابايت NVMe', price: 0 },
        { label: 'Upgrade to 1TB NVMe (+OMR 20.000)', labelAr: 'ترقية إلى 1 تيرابايت (+20.000 ر.ع.)', price: 20.000 }
      ]
    }
  },
  {
    sku: 'SVG-HP840G8-R',
    brand: 'hp',
    brandLabel: 'HP',
    name: 'HP EliteBook 840 G8 Workhorse',
    nameAr: 'اتش بي اليتبوك 840 G8 للأعمال الشاقة',
    category: 'laptop',
    categoryLabel: 'Enterprise Laptop',
    categoryLabelAr: 'لابتوب الشركات والمؤسسات',
    cpu: 'Intel Core i7-1185G7 vPro (up to 4.8GHz)',
    ram: '16GB DDR4 3200MHz',
    ssd: '512GB High-Speed NVMe SSD',
    display: '14.0" FHD Anti-Glare IPS 400 nits',
    graphics: 'Intel Iris Xe Graphics',
    condition: 'Grade A++',
    conditionAr: 'درجة أولى ممتازة (A++)',
    batteryHealth: '90% Health Verified',
    batteryPercentage: 90,
    priceNumeric: 160.000,
    priceFormatted: 'OMR 160.000',
    wasPriceFormatted: 'OMR 185.000',
    warranty: '6 Months Shop Warranty + 7 Days Replacement',
    warrantyAr: 'ضمان المحل 6 أشهر + استبدال 7 أيام',
    keyboard: 'Arabic + English Backlit',
    bundle: 'Free Bag + Mouse + Original Charger',
    bundleAr: 'حقيبة + ماوس + شاحن أصلي مجاناً',
    featured: false,
    bestSeller: false,
    image: '/products/hp-elitebook-840-g8.png',
    description: 'High performance Intel Core i7 EliteBook in a sleek brushed silver chassis. Featuring an ultra-bright 400 nits screen for outdoor work across Oman.',
    descriptionAr: 'معالج قوي كور اي 7 بهيكل فضي مصفح وشاشة ساطعة جداً 400 نيتس مثالية للعمل في مختلف الأوقات.',
    fullSpecs: [
      { label: 'Processor', labelAr: 'المعالج', value: 'Intel Core i7-1185G7 (4 Cores, 8 Threads, up to 4.8GHz)' },
      { label: 'Memory', labelAr: 'الذاكرة العشوائية', value: '16 GB DDR4 (Upgradable to 64GB)' },
      { label: 'Storage', labelAr: 'سعة التخزين', value: '512 GB PCIe NVMe M.2' },
      { label: 'Display', labelAr: 'الشاشة', value: '14.0" FHD IPS 400 nits Anti-Glare' },
      { label: 'Security', labelAr: 'الأمان', value: 'HP Sure View, Fingerprint, IR Face Unlock' }
    ],
    upgradeOptions: {
      ramOptions: [
        { label: 'Standard 16GB DDR4', labelAr: 'الأساسي: 16 جيجابايت DDR4', price: 0 },
        { label: 'Upgrade to 32GB DDR4 (+OMR 22.000)', labelAr: 'ترقية إلى 32 جيجابايت DDR4 (+22.000 ر.ع.)', price: 22.000 }
      ],
      ssdOptions: [
        { label: 'Standard 512GB NVMe', labelAr: 'الأساسي: 512 جيجابايت NVMe', price: 0 },
        { label: 'Upgrade to 1TB NVMe (+OMR 20.000)', labelAr: 'ترقية إلى 1 تيرابايت (+20.000 ر.ع.)', price: 20.000 }
      ]
    }
  },
  {
    sku: 'SVG-HP830G8-R2',
    brand: 'hp',
    brandLabel: 'HP',
    name: 'HP EliteBook 830 G8 x360 (32GB Power Edition)',
    nameAr: 'اتش بي اليتبوك 830 G8 (نسخة القوة رام 32)',
    category: 'ultrabook',
    categoryLabel: 'Power 2-in-1',
    categoryLabelAr: 'جهاز متحول عالي القوة',
    cpu: 'Intel Core i7-1185G7 vPro (11th Gen)',
    ram: '32GB High-Density RAM',
    ssd: '512GB PCIe NVMe SSD',
    display: '13.3" Touch 360° Flip Anti-Reflective',
    graphics: 'Intel Iris Xe Graphics',
    condition: 'Grade A++',
    conditionAr: 'درجة أولى ممتازة (A++)',
    batteryHealth: '89% Health Verified',
    batteryPercentage: 89,
    priceNumeric: 195.000,
    priceFormatted: 'OMR 195.000',
    wasPriceFormatted: 'OMR 230.000',
    warranty: '6 Months Shop Warranty + 7 Days Replacement',
    warrantyAr: 'ضمان المحل 6 أشهر + استبدال 7 أيام',
    keyboard: 'Arabic + English Backlit',
    bundle: 'Free Bag + Mouse + Original Charger',
    bundleAr: 'حقيبة + ماوس + شاحن أصلي مجاناً',
    featured: false,
    bestSeller: false,
    image: '/products/hp-elitebook-830-g8.png',
    description: 'Maxed out 32GB RAM capacity in a compact 13.3" foldable touch chassis. Designed for heavy virtual machines, multi-tab data analytics, and executive presentation.',
    descriptionAr: 'ذاكرة عملاقة 32 جيجابايت في هيكل مدمج 13.3 انش قابل للطي. صُمم للمدراء ومحللي البيانات.',
    fullSpecs: [
      { label: 'Processor', labelAr: 'المعالج', value: 'Intel Core i7-1185G7 vPro' },
      { label: 'Memory', labelAr: 'الذاكرة العشوائية', value: '32 GB High-Speed Dual Channel' },
      { label: 'Storage', labelAr: 'التخزين', value: '512 GB NVMe SSD' },
      { label: 'Display', labelAr: 'الشاشة', value: '13.3" FHD Touchscreen 360° Flip' }
    ],
    upgradeOptions: {
      ramOptions: [
        { label: 'Maxed 32GB RAM Installed', labelAr: 'أقصى سعة: 32 جيجابايت مثبتة', price: 0 }
      ],
      ssdOptions: [
        { label: 'Standard 512GB NVMe', labelAr: 'الأساسي: 512 جيجابايت NVMe', price: 0 },
        { label: 'Upgrade to 1TB NVMe (+OMR 22.000)', labelAr: 'ترقية إلى 1 تيرابايت (+22.000 ر.ع.)', price: 22.000 }
      ]
    }
  },
  {
    sku: 'SVG-DL5320-R',
    brand: 'dell',
    brandLabel: 'Dell',
    name: 'Dell Latitude 5320 Ultralight',
    nameAr: 'ديل لاتيتيود 5320 خفيف الوزن',
    category: 'ultrabook',
    categoryLabel: 'Compact Ultrabook',
    categoryLabelAr: 'الترا بوك خفيف وسريع',
    cpu: 'Intel Core i5-1145G7 (11th Gen)',
    ram: '16GB Dual Channel',
    ssd: '512GB PCIe NVMe SSD',
    display: '13.3" FHD Compact Display',
    graphics: 'Intel Iris Xe Graphics',
    condition: 'Certified Pre-Owned',
    conditionAr: 'معتمد شبه جديد (CPO)',
    batteryHealth: '85% Health Verified',
    batteryPercentage: 85,
    priceNumeric: 99.000,
    priceFormatted: 'OMR 99.000',
    wasPriceFormatted: 'OMR 120.000',
    warranty: '6 Months Shop Warranty + 7 Days Replacement',
    warrantyAr: 'ضمان المحل 6 أشهر + استبدال 7 أيام',
    keyboard: 'Arabic + English Backlit',
    bundle: 'Free Bag + Mouse + Original Dell Charger',
    bundleAr: 'حقيبة + ماوس + شاحن ديل أصلي مجاناً',
    featured: true,
    bestSeller: true,
    image: '/products/dell-latitude-5320.png',
    description: 'Sub-OMR 100 powerhouse! Compact, lightweight, 16GB RAM and fast NVMe SSD with Dell signature durability. The top choice for budget-conscious students and business start-ups.',
    descriptionAr: 'قوة استثنائية بسعر أقل من 100 ريال! خفيف وصغير مع رام 16 جيجا وهارديسك سريع.',
    fullSpecs: [
      { label: 'Processor', labelAr: 'المعالج', value: 'Intel Core i5-1145G7 (up to 4.4GHz)' },
      { label: 'RAM', labelAr: 'الذاكرة العشوائية', value: '16 GB High Speed' },
      { label: 'Storage', labelAr: 'التخزين', value: '512 GB NVMe SSD' },
      { label: 'Display', labelAr: 'الشاشة', value: '13.3" FHD (1920x1080)' }
    ]
  },
  {
    sku: 'SVG-APM1-N',
    brand: 'apple',
    brandLabel: 'Apple',
    name: 'Apple MacBook Air M1 (Brand New Sealed)',
    nameAr: 'ابل ماك بوك اير M1 (جديد بالكرتون)',
    category: 'laptop',
    categoryLabel: 'MacBook',
    categoryLabelAr: 'ماك بوك',
    cpu: 'Apple M1 Chip (8-Core CPU, 7-Core GPU, 16-Core Neural Engine)',
    ram: '8GB Unified Memory',
    ssd: '256GB Superfast SSD',
    display: '13.3" Retina Display with True Tone (2560x1600)',
    graphics: 'Apple 7-Core Integrated GPU',
    condition: 'Brand New',
    conditionAr: 'جديد تماماً (كرتون مغلق)',
    batteryHealth: '100% Brand New Sealed',
    batteryPercentage: 100,
    priceNumeric: 361.570,
    priceFormatted: 'OMR 361.570',
    wasPriceFormatted: 'OMR 399.000',
    warranty: '1 Year Apple Official Warranty',
    warrantyAr: 'ضمان سنة كاملة معتمد من ابل',
    keyboard: 'Factory Arabic + English Magic Keyboard',
    bundle: 'Original Apple Sealed Box + 30W USB-C Power Adapter + Type-C Cable',
    bundleAr: 'كرتون الوكالة الأصلي + شاحن ابل 30 واط + كيبل',
    featured: true,
    bestSeller: false,
    image: '/products/macbook-air-m1.png',
    description: 'Iconic silent fanless design, up to 18 hours battery life, stunning Retina screen, and smooth macOS Sonoma/Sequoia performance. Official factory Arabic keyboard.',
    descriptionAr: 'تصميم أيقوني صامت بدون مراوح، بطارية تدوم حتى 18 ساعة، شاشة ريتينا ساحرة وكيبورد عربي أصلي من المصنع.',
    fullSpecs: [
      { label: 'Chipset', labelAr: 'المعالج', value: 'Apple Silicon M1 (8-core CPU / 7-core GPU)' },
      { label: 'Unified Memory', labelAr: 'الذاكرة المشتركة', value: '8 GB High Bandwidth' },
      { label: 'Storage', labelAr: 'التخزين', value: '256 GB Superfast SSD' },
      { label: 'Screen', labelAr: 'الشاشة', value: '13.3" Retina (2560x1600, 400 nits, P3 Wide Color)' },
      { label: 'Battery Life', labelAr: 'عمر البطارية', value: 'Up to 18 Hours Wireless Web' }
    ]
  },
  {
    sku: 'SVG-APM2-N',
    brand: 'apple',
    brandLabel: 'Apple',
    name: 'Apple MacBook Air 15" M2 (Brand New Sealed)',
    nameAr: 'ابل ماك بوك اير 15 انش M2 (جديد بالكرتون)',
    category: 'laptop',
    categoryLabel: 'MacBook',
    categoryLabelAr: 'ماك بوك',
    cpu: 'Apple M2 Chip (8-Core CPU, 10-Core GPU)',
    ram: '8GB Unified Memory',
    ssd: '256GB Superfast SSD',
    display: '15.3" Liquid Retina Display with 500 nits',
    graphics: 'Apple 10-Core Integrated GPU',
    condition: 'Brand New',
    conditionAr: 'جديد تماماً (كرتون مغلق)',
    batteryHealth: '100% Brand New Sealed',
    batteryPercentage: 100,
    priceNumeric: 482.130,
    priceFormatted: 'OMR 482.130',
    wasPriceFormatted: 'OMR 576.480',
    warranty: '1 Year Apple Official Warranty',
    warrantyAr: 'ضمان سنة كاملة معتمد من ابل',
    keyboard: 'Factory Arabic + English Magic Keyboard with Touch ID',
    bundle: 'Sealed Apple Box + 35W Dual Port USB-C Charger + MagSafe Cable',
    bundleAr: 'كرتون مغلق + شاحن ابل بمنفذين 35 واط + كيبل ماجسيف',
    featured: false,
    bestSeller: false,
    image: '/products/macbook-air-m2.png',
    description: 'Expansive 15.3-inch Liquid Retina display in an impossibly thin 11.5mm aluminum chassis. Six-speaker sound system with Spatial Audio.',
    descriptionAr: 'شاشة ليكويد ريتينا واسعة 15.3 انش بنحافة مذهلة 11.5 مم ونظام صوتي سداسي مع الصوت المكاني.',
    fullSpecs: [
      { label: 'Processor', labelAr: 'المعالج', value: 'Apple M2 (8-Core CPU / 10-Core GPU)' },
      { label: 'Display', labelAr: 'الشاشة', value: '15.3" Liquid Retina (2880x1864, 500 nits)' },
      { label: 'Charging', labelAr: 'الشحن', value: 'MagSafe 3 Fast Charging' }
    ]
  },
  {
    sku: 'SVG-APM3P-N',
    brand: 'apple',
    brandLabel: 'Apple',
    name: 'Apple MacBook Pro 14" M3 Pro (Brand New)',
    nameAr: 'ابل ماك بوك برو 14 انش M3 برو (جديد)',
    category: 'workstation',
    categoryLabel: 'Pro Workstation',
    categoryLabelAr: 'محطة عمل احترافية',
    cpu: 'Apple M3 Pro Chip (11-Core CPU, 14-Core GPU)',
    ram: '18GB Unified Memory',
    ssd: '512GB Superfast SSD',
    display: '14.2" Liquid Retina XDR (120Hz ProMotion, 1600 nits peak)',
    graphics: 'Apple 14-Core GPU with Hardware Ray Tracing',
    condition: 'Brand New',
    conditionAr: 'جديد تماماً (كرتون مغلق)',
    batteryHealth: '100% Brand New Sealed',
    batteryPercentage: 100,
    priceNumeric: 854.290,
    priceFormatted: 'OMR 854.290',
    wasPriceFormatted: 'OMR 1100.000',
    warranty: '1 Year Apple Official Warranty',
    warrantyAr: 'ضمان سنة كاملة معتمد من ابل',
    keyboard: 'Factory Arabic + English Magic Keyboard',
    bundle: 'Sealed Box + Apple 70W USB-C Power Adapter + Braided Cable',
    bundleAr: 'كرتون مغلق + شاحن ابل 70 واط + كيبل قماشي',
    featured: true,
    bestSeller: false,
    image: '/products/macbook-pro-14.png',
    description: 'Ultimate power for creative pros, developers, 4K/8K video editors, and architecture rendering in Muscat. Space Black finish, HDMI port, SDXC card slot.',
    descriptionAr: 'القوة القصوى للمصممين والمبرمجين وصناع المحتوى. لون أسود فلكي، منفذ HDMI، ومنفذ كروت SD.',
    fullSpecs: [
      { label: 'Processor', labelAr: 'المعالج', value: 'Apple M3 Pro (11-core CPU, 14-core GPU)' },
      { label: 'Memory', labelAr: 'الذاكرة المشتركة', value: '18 GB Unified Memory' },
      { label: 'Display', labelAr: 'الشاشة', value: '14.2" Liquid Retina XDR (3024x1964, 120Hz ProMotion)' },
      { label: 'Ports', labelAr: 'المنافذ', value: '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3, Audio Jack' }
    ]
  },
  {
    sku: 'SVG-HP840G11-N',
    brand: 'hp',
    brandLabel: 'HP',
    name: 'HP EliteBook 840 G11 AI Edition (Brand New)',
    nameAr: 'اتش بي اليتبوك 840 G11 جيل الذكاء الاصطناعي (جديد)',
    category: 'laptop',
    categoryLabel: 'AI Business Laptop',
    categoryLabelAr: 'لابتوب ذكاء اصطناعي للأعمال',
    cpu: 'Intel Core Ultra 5 125H (14 Cores, 18 Threads, Intel Arc Graphics)',
    ram: '16GB DDR5 5600MHz',
    ssd: '512GB PCIe Gen4 NVMe SSD',
    display: '14.0" WUXGA (1920x1200) 16:10 Anti-Glare 300 nits',
    graphics: 'Intel Arc Graphics + Dedicated NPU',
    condition: 'Brand New',
    conditionAr: 'جديد تماماً (كرتون مغلق)',
    batteryHealth: '100% Brand New Sealed',
    batteryPercentage: 100,
    priceNumeric: 275.000,
    priceFormatted: 'OMR 275.000',
    wasPriceFormatted: 'OMR 340.000',
    warranty: '1 Year Manufacturer Official Warranty',
    warrantyAr: 'ضمان سنة كاملة معتمد من الشركة المصنعة',
    keyboard: 'Arabic + English Spill-Resistant Backlit',
    bundle: 'Sealed Box + HP 65W USB-C Smart AC Adapter',
    bundleAr: 'كرتون مغلق + شاحن ذكي تايب سي 65 واط',
    featured: false,
    bestSeller: false,
    image: '/products/hp-elitebook-840-g11.png',
    description: '2024 flagship AI enterprise notebook. 16:10 productive aspect ratio, Poly Studio tuned audio, and 5MP IR camera for crystal clear remote board meetings.',
    descriptionAr: 'أحدث كمبيوتر محمول للأعمال لعام 2024 بنسبة عرض 16:10 وكاميرا 5 ميجابكسل وصوت استوديو بولي.',
    fullSpecs: [
      { label: 'Processor', labelAr: 'المعالج', value: 'Intel Core Ultra 5 125H (14 Cores, up to 4.5 GHz)' },
      { label: 'RAM', labelAr: 'الذاكرة العشوائية', value: '16 GB DDR5 5600MHz' },
      { label: 'Display', labelAr: 'الشاشة', value: '14.0" WUXGA 16:10 (1920x1200) IPS' },
      { label: 'Battery', labelAr: 'البطارية', value: '56 Wh HP Long Life 3-cell Fast Charge' }
    ]
  },
  {
    sku: 'SVG-DL5440-N',
    brand: 'dell',
    brandLabel: 'Dell',
    name: 'Dell Latitude 5440 i7 (Brand New Box)',
    nameAr: 'ديل لاتيتيود 5440 كور اي 7 (جديد بالكرتون)',
    category: 'laptop',
    categoryLabel: 'Enterprise Laptop',
    categoryLabelAr: 'لابتوب شركات ومؤسسات',
    cpu: 'Intel Core i7-1355U (13th Gen, 10 Cores, up to 5.0GHz)',
    ram: '16GB DDR5',
    ssd: '512GB PCIe NVMe SSD',
    display: '14.0" FHD IPS Anti-Glare',
    graphics: 'Intel Iris Xe Graphics',
    condition: 'Brand New',
    conditionAr: 'جديد تماماً (كرتون مغلق)',
    batteryHealth: '100% Brand New Sealed',
    batteryPercentage: 100,
    priceNumeric: 419.000,
    priceFormatted: 'OMR 419.000',
    wasPriceFormatted: 'OMR 480.000',
    warranty: '1 Year Dell ProSupport Official Warranty',
    warrantyAr: 'ضمان سنة معتمد من ديل بروسبورت',
    keyboard: 'Arabic + English Backlit',
    bundle: 'Sealed Retail Box + Dell 65W Type-C Charger',
    bundleAr: 'كرتون مغلق + شاحن ديل تايب سي أصلي 65 واط',
    featured: false,
    bestSeller: false,
    image: '/products/dell-latitude-5440.png',
    description: 'Brand new in box Dell Latitude 5440 powered by high-clock Intel Core i7 13th Gen with Dell ProSupport.',
    descriptionAr: 'جديد بالكرتون بمعالج إنتل كور اي 7 فائق السرعة وضمان ديل المعتمد.',
    fullSpecs: [
      { label: 'CPU', labelAr: 'المعالج', value: 'Intel Core i7-1355U (10 Cores, up to 5.0 GHz)' },
      { label: 'RAM', labelAr: 'الذاكرة العشوائية', value: '16 GB DDR5' },
      { label: 'Storage', labelAr: 'التخزين', value: '512 GB NVMe SSD' }
    ]
  },
  {
    sku: 'SVG-DL5430-N',
    brand: 'dell',
    brandLabel: 'Dell',
    name: 'Dell Latitude 5430 i7 (Brand New Box)',
    nameAr: 'ديل لاتيتيود 5430 كور اي 7 (جديد بالكرتون)',
    category: 'laptop',
    categoryLabel: 'Enterprise Laptop',
    categoryLabelAr: 'لابتوب شركات ومؤسسات',
    cpu: 'Intel Core i7-1255U (12th Gen, up to 4.7GHz)',
    ram: '16GB DDR4',
    ssd: '512GB PCIe NVMe SSD',
    display: '14.0" FHD IPS Anti-Glare',
    graphics: 'Intel Iris Xe Graphics',
    condition: 'Brand New',
    conditionAr: 'جديد تماماً (كرتون مغلق)',
    batteryHealth: '100% Brand New Sealed',
    batteryPercentage: 100,
    priceNumeric: 430.000,
    priceFormatted: 'OMR 430.000',
    wasPriceFormatted: 'OMR 495.000',
    warranty: '1 Year Dell Official Warranty',
    warrantyAr: 'ضمان سنة معتمد من ديل',
    keyboard: 'Arabic + English Backlit',
    bundle: 'Sealed Retail Box + Dell Type-C Charger',
    bundleAr: 'كرتون مغلق + شاحن ديل تايب سي أصلي',
    featured: false,
    bestSeller: false,
    image: '/products/dell-latitude-5440.png',
    description: 'Factory sealed Dell Latitude 5430 with Intel Core i7 and comprehensive corporate security features.',
    descriptionAr: 'جديد بالكرتون من المصنع بمواصفات أمان عالية للأعمال.',
    fullSpecs: [
      { label: 'CPU', labelAr: 'المعالج', value: 'Intel Core i7-1255U' },
      { label: 'RAM', labelAr: 'الذاكرة العشوائية', value: '16 GB DDR4' },
      { label: 'Storage', labelAr: 'التخزين', value: '512 GB SSD' }
    ]
  },
  {
    sku: 'SVG-DLP2422',
    brand: 'accessories',
    brandLabel: 'Dell',
    name: 'Dell P2422H 24" Professional IPS Monitor',
    nameAr: 'شاشة ديل 24 انش احترافية P2422H',
    category: 'monitor',
    categoryLabel: 'Monitor',
    categoryLabelAr: 'شاشات عرض',
    cpu: 'Full HD 1080p (1920x1080) at 60Hz',
    ram: 'Height, Pivot, Swivel & Tilt Ergonomic Stand',
    ssd: 'HDMI, DisplayPort, VGA & 4x USB 3.2 Hub',
    display: '23.8" IPS ComfortView Plus (Hardware Low Blue Light)',
    graphics: 'Ultrathin Bezel 3-Sided Borderless',
    condition: 'Brand New',
    conditionAr: 'جديد تماماً (كرتون مغلق)',
    batteryHealth: 'Direct AC Power (Built-in PSU)',
    priceNumeric: 70.000,
    priceFormatted: 'OMR 70.000',
    wasPriceFormatted: 'OMR 85.000',
    warranty: '1 Year Dell Official Replacement Warranty',
    warrantyAr: 'ضمان استبدال سنة معتمد من ديل',
    keyboard: 'Display Peripheral',
    bundle: 'Stand Riser + Base + Power Cord + DisplayPort Cable + USB Upstream Cable',
    bundleAr: 'حامل هيدروليكي كامل + كابل باور + كابل ديسبلاي بورت + كابل يو اس بي',
    featured: true,
    bestSeller: false,
    image: '/products/dell-p2422h.png',
    description: 'The #1 office monitor choice in Oman. Full ergonomic stand that rotates 90 degrees vertical for coding, spreadsheet viewing, or multi-monitor setups.',
    descriptionAr: 'الشاشة المكتبية الأكثر طلباً في عُمان. حامل هيدروليكي يلتف 90 درجة للبرمجة وتصفح الجداول.',
    fullSpecs: [
      { label: 'Resolution', labelAr: 'الدقة', value: 'Full HD (1920 x 1080) @ 60 Hz' },
      { label: 'Panel Type', labelAr: 'نوع اللوحة', value: 'IPS with 99% sRGB Color Gamut' },
      { label: 'Stand Adjustment', labelAr: 'تعديل الحامل', value: 'Height (150mm), Tilt, Swivel, Pivot (Portrait/Landscape)' },
      { label: 'Connectivity', labelAr: 'المنافذ', value: '1x HDMI 1.4, 1x DP 1.2, 1x VGA, 4x USB 3.2' }
    ]
  },
  {
    sku: 'SVG-LNP27H',
    brand: 'lenovo',
    brandLabel: 'Lenovo',
    name: 'Lenovo ThinkVision P27h-30 27" 2K QHD Docking Monitor',
    nameAr: 'شاشة لينوفو ثينك فيجن 27 انش 2K مع دوكنج محطة عمل',
    category: 'monitor',
    categoryLabel: 'Docking Monitor',
    categoryLabelAr: 'شاشة مع موزع دوك محطة عمل',
    cpu: '2560 x 1440 QHD Resolution at 60Hz',
    ram: 'Integrated One-Cable USB-C Docking Station',
    ssd: 'Gigabit Ethernet RJ45 + 4x USB-A + Daisy Chain DP Out',
    display: '27.0" In-Plane Switching 99% sRGB / 95% DCI-P3 Factory Calibrated',
    graphics: '96W USB-C Power Delivery to Charge Your Laptop',
    condition: 'Brand New',
    conditionAr: 'جديد تماماً (كرتون مغلق)',
    batteryHealth: '96W Pass-through Power Delivery',
    priceNumeric: 138.721,
    priceFormatted: 'OMR 138.721',
    wasPriceFormatted: 'OMR 214.360',
    warranty: '1 Year Lenovo Official Warranty',
    warrantyAr: 'ضمان سنة معتمد من لينوفو',
    keyboard: 'Docking Monitor',
    bundle: 'Full Heavy Stand + USB Type-C Cable + Power Cord',
    bundleAr: 'حامل احترافي + كيبل تايب سي شحن وعرض + كابل باور',
    featured: false,
    bestSeller: false,
    image: '/products/lenovo-p27h.png',
    description: 'Transform your laptop into an elite desktop with just one single USB-C cable. Provides 96W charging, video out, network LAN connection, and 4 USB ports simultaneously.',
    descriptionAr: 'حول لابتوبك إلى محطة عمل عملاقة بكيبل تايب سي واحد فقط يشحن اللابتوب بقوة 96 واط وينقل الصورة والإنترنت.',
    fullSpecs: [
      { label: 'Screen Size & Res', labelAr: 'المقاس والدقة', value: '27-inch 2K QHD (2560 x 1440)' },
      { label: 'Color Accuracy', labelAr: 'دقة الألوان', value: '99% sRGB, 95% DCI-P3 Delta E < 2' },
      { label: 'Docking Ports', labelAr: 'منافذ الدوك', value: 'USB-C (96W PD), RJ-45 LAN, HDMI 2.0, DP 1.4 In/Out (Daisy Chain)' }
    ]
  },
  {
    sku: 'SVG-HPDOCK',
    brand: 'accessories',
    brandLabel: 'HP',
    name: 'HP USB-C Dock G5 Universal Station',
    nameAr: 'محطة توصيل شاملة اتش بي تايب سي G5',
    category: 'accessory',
    categoryLabel: 'Docking Station',
    categoryLabelAr: 'محطة توصيل ملحقات',
    cpu: 'Universal Compatibility (HP, Dell, Lenovo, Apple Mac)',
    ram: 'Gigabit Ethernet LAN 10/100/1000',
    ssd: 'Dual 4K / Triple FHD Display Support',
    display: '2x DisplayPort + 1x HDMI 2.0 Video Out',
    graphics: '100W Power Delivery to Host Laptop',
    condition: 'Brand New',
    conditionAr: 'جديد تماماً (كرتون مغلق)',
    batteryHealth: '120W External Power Supply',
    priceNumeric: 87.517,
    priceFormatted: 'OMR 87.517',
    wasPriceFormatted: 'OMR 105.000',
    warranty: '1 Year HP Official Warranty',
    warrantyAr: 'ضمان سنة معتمد من اتش بي',
    keyboard: 'Universal Hub',
    bundle: '120W Power Adapter + Integrated USB-C Host Cable',
    bundleAr: 'محول كهرباء 120 واط + كيبل تايب سي متصل',
    featured: false,
    bestSeller: false,
    image: '/products/hp-g5-dock.png',
    description: 'Enterprise grade docking hub supporting dual 4K monitors, gigabit wired networking, 4 USB peripherals, and 100W laptop fast charging with single cable simplicity.',
    descriptionAr: 'محطة توصيل شاملة تدعم تشغيل شاشتين بدقة 4K وإنترنت سلكي وشحن سريع بقوة 100 واط.',
    fullSpecs: [
      { label: 'Host Interface', labelAr: 'المنفذ الرئيسي', value: 'USB Type-C (Up to 100W Power Delivery)' },
      { label: 'Video Outputs', labelAr: 'مخارج الفيديو', value: '2x DisplayPort 1.4, 1x HDMI 2.0' },
      { label: 'Peripherals', labelAr: 'المنافذ', value: '4x USB 3.0 (1x charging), 1x RJ45 Gigabit Ethernet, Audio In/Out' }
    ]
  }
];

export const BRANDS = [
  { id: 'all', label: 'All Brands', labelAr: 'جميع الماركات' },
  { id: 'dell', label: 'Dell', labelAr: 'ديل' },
  { id: 'hp', label: 'HP', labelAr: 'اتش بي' },
  { id: 'lenovo', label: 'Lenovo', labelAr: 'لينوفو' },
  { id: 'apple', label: 'Apple', labelAr: 'ابل ماك' },
  { id: 'accessories', label: 'Monitors & Docks', labelAr: 'شاشات وملحقات' },
];

export const CONDITIONS = [
  { id: 'all', label: 'All Conditions', labelAr: 'كافة الحالات' },
  { id: 'Grade A++', label: 'Grade A++ (Like New)', labelAr: 'درجة أولى (A++)' },
  { id: 'Certified Pre-Owned', label: 'Certified Pre-Owned', labelAr: 'معتمد شبه جديد' },
  { id: 'Brand New', label: 'Brand New (Sealed)', labelAr: 'جديد بالكرتون' },
];

export const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', labelAr: 'كافة الأسعار', min: 0, max: 9999 },
  { id: 'under100', label: 'Under OMR 100', labelAr: 'أقل من 100 ر.ع.', min: 0, max: 99.999 },
  { id: '100-180', label: 'OMR 100 - 180 (Best Sellers)', labelAr: '100 - 180 ر.ع. (الأكثر طلباً)', min: 100, max: 180 },
  { id: '180-350', label: 'OMR 180 - 350 (Mid to Pro)', labelAr: '180 - 350 ر.ع. (المستوى المتقدم)', min: 180.001, max: 350 },
  { id: 'above350', label: 'Above OMR 350 (New & Apple)', labelAr: 'أكثر من 350 ر.ع. (الجديد وماك)', min: 350.001, max: 9999 },
];

export const CPU_FILTERS = [
  { id: 'all', label: 'All Processors', labelAr: 'كافة المعالجات' },
  { id: 'i5', label: 'Intel Core i5', labelAr: 'إنتل كور i5' },
  { id: 'i7', label: 'Intel Core i7', labelAr: 'إنتل كور i7' },
  { id: 'm-series', label: 'Apple M-Series', labelAr: 'ابل سيليكون M' },
  { id: 'ultra', label: 'Intel Core Ultra (AI)', labelAr: 'إنتل كور الترا AI' },
];

export const RAM_FILTERS = [
  { id: 'all', label: 'All RAM Sizes', labelAr: 'كافة السعات' },
  { id: '8gb', label: '8 GB', labelAr: '8 جيجابايت' },
  { id: '16gb', label: '16 GB', labelAr: '16 جيجابايت' },
  { id: '32gb', label: '32 GB', labelAr: '32 جيجابايت' },
];

