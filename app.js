/* ================= PCPower Core JS Application ================= */

// Initialize Lucide icons
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initApp();
});

// App State
const state = {
    currentSection: 'home',
    cart: [],
    selectedBasePcId: 'tier500',
    customizer: {
        cpu: 'ryzen_5600',
        gpu: 'rx_6700xt',
        ram: 'ram_16gb',
        storage: 'ssd_500gb'
    },
    promoApplied: null,
    promoDiscount: 0,
    shippingInfo: {}
};

// PC Pre-Built Bundles Data
const products = [
    {
        id: 'tier200',
        name: '£200 Esports Starter',
        price: 200.00,
        retailPrice: 320.00,
        ecoSavings: '8.5kg e-waste | 110kg CO2',
        description: 'Ultra-budget esport machine. Built with recycled parts to get you in the game cheap.',
        image: '',
        category: 'budget',
        specs: [
            { name: 'AMD Ryzen 3 2200G CPU', source: 'Refurbished' },
            { name: 'Radeon RX 570 4GB GPU', source: 'Refurbished' },
            { name: '8GB DDR4 RAM', source: 'Refurbished' },
            { name: '256GB SSD', source: 'Brand New' },
            { name: '450W Gold Rated PSU', source: 'Brand New' },
            { name: 'Sleek Micro-ATX Case', source: 'Brand New' }
        ]
    },
    {
        id: 'tier300',
        name: '£300 Esports Elite',
        price: 300.00,
        retailPrice: 480.00,
        ecoSavings: '10.2kg e-waste | 130kg CO2',
        description: 'Excellent 1080p gaming performance for competitive esports titles.',
        image: '',
        category: 'budget',
        specs: [
            { name: 'AMD Ryzen 5 3600 CPU', source: 'Refurbished' },
            { name: 'Radeon RX 580 8GB GPU', source: 'Refurbished' },
            { name: '8GB DDR4 RAM', source: 'Refurbished' },
            { name: '256GB NVMe SSD', source: 'Brand New' },
            { name: '500W Bronze PSU', source: 'Brand New' },
            { name: 'Sleek Glass MicroATX Case', source: 'Brand New' }
        ]
    },
    {
        id: 'tier400',
        name: '£400 Power Crusader',
        price: 400.00,
        retailPrice: 620.00,
        ecoSavings: '12.4kg e-waste | 150kg CO2',
        description: 'High-speed 1080p gaming with modern architecture and dedicated graphics.',
        image: '',
        category: 'mid',
        specs: [
            { name: 'AMD Ryzen 5 4100 CPU', source: 'Refurbished' },
            { name: 'Radeon RX 6500 XT 4GB GPU', source: 'Refurbished' },
            { name: '16GB DDR4 RAM', source: 'Refurbished' },
            { name: '500GB NVMe SSD', source: 'Brand New' },
            { name: '500W Bronze PSU', source: 'Brand New' },
            { name: 'Sleek Tempered Glass Case', source: 'Brand New' }
        ]
    },
    {
        id: 'tier500',
        name: '£500 Mid-Range Champion',
        price: 500.00,
        retailPrice: 790.00,
        ecoSavings: '14.8kg e-waste | 180kg CO2',
        description: 'Solid 1080p Ultra and entry-level 1440p gaming. Excellent performance per pound.',
        image: '',
        category: 'mid',
        specs: [
            { name: 'AMD Ryzen 5 5600 CPU', source: 'Refurbished' },
            { name: 'Radeon RX 6700 XT 12GB GPU', source: 'Refurbished' },
            { name: '16GB DDR4 RAM', source: 'Refurbished' },
            { name: '500GB NVMe SSD', source: 'Brand New' },
            { name: '500GB HDD Storage', source: 'Refurbished' },
            { name: '500W Bronze PSU', source: 'Brand New' },
            { name: 'Sleek Airflow Case', source: 'Brand New' }
        ]
    },
    {
        id: 'tier600',
        name: '£600 Pro Performer',
        price: 600.00,
        retailPrice: 980.00,
        ecoSavings: '17.2kg e-waste | 210kg CO2',
        description: 'High-end 1080p and 1440p gaming machine. Smooth frame rates in AAA titles.',
        image: '',
        category: 'high',
        specs: [
            { name: 'AMD Ryzen 7 5700X CPU', source: 'Refurbished' },
            { name: 'Radeon RX 6800 XT 16GB GPU', source: 'Refurbished' },
            { name: '16GB DDR4 RAM', source: 'Refurbished' },
            { name: '500GB NVMe SSD', source: 'Brand New' },
            { name: '500GB HDD Storage', source: 'Refurbished' },
            { name: '600W Gold PSU', source: 'Brand New' },
            { name: 'Tempered Glass Case', source: 'Brand New' }
        ]
    },
    {
        id: 'tier700',
        name: '£700 Ultimate Crusader',
        price: 700.00,
        retailPrice: 1150.00,
        ecoSavings: '19.5kg e-waste | 240kg CO2',
        description: 'Extreme high-performance gaming. Ready for 1440p Ultra and modern titles.',
        image: '',
        category: 'high',
        specs: [
            { name: 'AMD Ryzen 7 5800X CPU', source: 'Refurbished' },
            { name: 'Radeon RX 6950 XT 16GB GPU', source: 'Refurbished' },
            { name: '16GB DDR4 RAM', source: 'Refurbished' },
            { name: '1TB NVMe Gen4 SSD', source: 'Brand New' },
            { name: '1TB HDD Storage', source: 'Refurbished' },
            { name: '700W Gold PSU', source: 'Brand New' },
            { name: 'Premium Dual Chamber Case', source: 'Brand New' }
        ]
    },
    {
        id: 'tier800',
        name: '£800 Elite Workstation',
        price: 800.00,
        retailPrice: 1380.00,
        ecoSavings: '22.3kg e-waste | 270kg CO2',
        description: 'Top-tier workstation and high-end 4K gaming rig. Zero compromises.',
        image: '',
        category: 'high',
        specs: [
            { name: 'AMD Ryzen 9 5900X CPU', source: 'Refurbished' },
            { name: 'Radeon RX 7900 XT 20GB GPU', source: 'Refurbished' },
            { name: '32GB DDR4 RAM', source: 'Refurbished' },
            { name: '1TB NVMe Gen4 SSD', source: 'Brand New' },
            { name: '2TB HDD Storage', source: 'Refurbished' },
            { name: '750W Gold PSU', source: 'Brand New' },
            { name: 'Panoramic Glass Case', source: 'Brand New' }
        ]
    }
];

// Configurator Upgrades Data
const upgrades = {
    cpu: [
        { id: 'ryzen_2200g', name: 'AMD Ryzen 3 2200G', price: 35, source: 'Refurbished' },
        { id: 'ryzen_3600', name: 'AMD Ryzen 5 3600', price: 50, source: 'Refurbished' },
        { id: 'ryzen_4100', name: 'AMD Ryzen 5 4100', price: 55, source: 'Refurbished' },
        { id: 'ryzen_5600', name: 'AMD Ryzen 5 5600', price: 90, source: 'Refurbished' },
        { id: 'ryzen_5700x', name: 'AMD Ryzen 7 5700X', price: 130, source: 'Refurbished' },
        { id: 'ryzen_5800x', name: 'AMD Ryzen 7 5800X', price: 140, source: 'Refurbished' },
        { id: 'ryzen_5900x', name: 'AMD Ryzen 9 5900X', price: 210, source: 'Refurbished' }
    ],
    gpu: [
        { id: 'rx_570', name: 'Radeon RX 570 4GB', price: 60, source: 'Refurbished' },
        { id: 'rx_580', name: 'Radeon RX 580 8GB', price: 86, source: 'Refurbished' },
        { id: 'rx_6500xt', name: 'Radeon RX 6500 XT 4GB', price: 125, source: 'Refurbished' },
        { id: 'rx_6700xt', name: 'Radeon RX 6700 XT 12GB', price: 294, source: 'Refurbished' },
        { id: 'rx_6800xt', name: 'Radeon RX 6800 XT 16GB', price: 424, source: 'Refurbished' },
        { id: 'rx_6950xt', name: 'Radeon RX 6950 XT 16GB', price: 580, source: 'Refurbished' },
        { id: 'rx_7900xt', name: 'Radeon RX 7900 XT 20GB', price: 788, source: 'Refurbished' }
    ],
    ram: [
        { id: 'ram_8gb', name: '8GB DDR4 RAM', price: 20, source: 'Refurbished' },
        { id: 'ram_16gb', name: '16GB DDR4 RAM', price: 40, source: 'Refurbished' },
        { id: 'ram_32gb', name: '32GB DDR4 RAM', price: 75, source: 'Refurbished' }
    ],
    storage: [
        { id: 'ssd_256gb', name: '256GB SSD', price: 15, source: 'Brand New' },
        { id: 'ssd_500gb', name: '500GB NVMe SSD', price: 30, source: 'Brand New' },
        { id: 'ssd_1tb', name: '1TB NVMe SSD', price: 68, source: 'Brand New' }
    ]
};

// Map each base PC ID to its standard parts
const basePartsMapping = {
    tier200: { cpu: 'ryzen_2200g', gpu: 'rx_570', ram: 'ram_8gb', storage: 'ssd_256gb' },
    tier300: { cpu: 'ryzen_3600', gpu: 'rx_580', ram: 'ram_8gb', storage: 'ssd_256gb' },
    tier400: { cpu: 'ryzen_4100', gpu: 'rx_6500xt', ram: 'ram_16gb', storage: 'ssd_500gb' },
    tier500: { cpu: 'ryzen_5600', gpu: 'rx_6700xt', ram: 'ram_16gb', storage: 'ssd_500gb' },
    tier600: { cpu: 'ryzen_5700x', gpu: 'rx_6800xt', ram: 'ram_16gb', storage: 'ssd_500gb' },
    tier700: { cpu: 'ryzen_5800x', gpu: 'rx_6950xt', ram: 'ram_16gb', storage: 'ssd_1tb' },
    tier800: { cpu: 'ryzen_5900x', gpu: 'rx_7900xt', ram: 'ram_32gb', storage: 'ssd_1tb' }
};

// Part absolute pricing
const partAbsolutePrices = {
    ryzen_2200g: 35, ryzen_3600: 50, ryzen_4100: 55, ryzen_5600: 90, ryzen_5700x: 130, ryzen_5800x: 140, ryzen_5900x: 210,
    rx_570: 60, rx_580: 86, rx_6500xt: 125, rx_6700xt: 294, rx_6800xt: 424, rx_6950xt: 580, rx_7900xt: 788,
    ram_8gb: 20, ram_16gb: 40, ram_32gb: 75,
    ssd_256gb: 15, ssd_500gb: 30, ssd_1tb: 68
};

// Constant Build Fee
const FLAT_BUILD_FEE = 49.00;

// Initialize Application
function initApp() {
    renderFeaturedProducts();
    renderShopProducts();
    initCalculator();
    initBuilder();
    selectShowcaseGame('fortnite'); // Initialize default 2D performance metrics
    
    // Check localStorage for cart
    const savedCart = localStorage.getItem('pcpower_cart');
    if (savedCart) {
        try {
            state.cart = JSON.parse(savedCart);
            updateCartUI();
        } catch (e) {
            console.error("Failed parsing cart from localStorage", e);
        }
    }

    // Force page to start on the home screen
    showSection('home');
    if (window.location.hash && window.location.hash !== '#home') {
        history.replaceState(null, null, window.location.pathname);
    }
}

// Navigation & Tab Switching
function showSection(sectionId, elementIdToScroll = null) {
    // Hide active sections
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        state.currentSection = sectionId;
    }
    
    // Update active state in navbar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });

    // Scroll to specific element if provided
    if (elementIdToScroll) {
        setTimeout(() => {
            const element = document.getElementById(elementIdToScroll);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav.style.display === 'flex') {
        mobileNav.style.display = 'none';
    } else {
        mobileNav.style.display = 'flex';
    }
}

// Render Featured Pre-Builts
function renderFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;
    
    featuredContainer.innerHTML = '';
    
    products.forEach(p => {
        const savings = p.retailPrice - p.price;
        const card = document.createElement('div');
        card.className = 'product-card glass-card';
        
        let specsHtml = '';
        p.specs.slice(0, 4).forEach((spec, sIdx) => {
            const isHighlight = sIdx < 2;
            const icon = spec.name.includes('CPU') ? 'cpu' : 
                         spec.name.includes('GPU') ? 'zap' :
                         spec.name.includes('RAM') ? 'database' : 'hard-drive';
            
            const sourceColor = spec.source === 'Refurbished' ? 'green-text' : 'cyan-text';
            specsHtml += `
                <li class="${isHighlight ? 'highlight-spec' : ''}">
                    <i data-lucide="${icon}"></i>
                    <span>${spec.name} <span class="${sourceColor}" style="font-size:0.75rem;">(${spec.source})</span></span>
                </li>
            `;
        });
        
        card.innerHTML = `
            <div class="product-img-container text-gradient-banner">
                <div class="tier-gradient-title">£${p.price.toFixed(0)} BUILD</div>
            </div>
            <div class="product-info">
                <div class="product-badges-row" style="display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap;">
                    <span class="badge-used-inline" style="background:rgba(57, 255, 20, 0.1); border:1px solid rgba(57, 255, 20, 0.2); color:var(--accent-green); font-size:0.75rem; font-weight:600; padding:4px 8px; border-radius:4px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="leaf" style="width:12px;height:12px;"></i> Certified Refurbished</span>
                    <span class="price-saving-badge-inline" style="background:rgba(0, 242, 254, 0.1); border:1px solid rgba(0, 242, 254, 0.2); color:var(--accent-cyan); font-size:0.75rem; font-weight:600; padding:4px 8px; border-radius:4px;">Save £${savings.toFixed(0)}!</span>
                </div>
                <h3>${p.name}</h3>
                <p class="product-desc">${p.description}</p>
                <ul class="product-specs">
                    ${specsHtml}
                </ul>
                <div class="product-pricing">
                    <div class="price-col">
                        <span class="price-retail">Retail New: £${p.retailPrice.toFixed(2)}</span>
                        <span class="price-current">£${p.price.toFixed(2)}</span>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="selectBasePcInBuilder('${p.id}')">
                        Configure <i data-lucide="sliders" style="width:14px;height:14px;"></i>
                    </button>
                </div>
            </div>
        `;
        featuredContainer.appendChild(card);
    });
    lucide.createIcons({ attrs: { class: 'lucide-icon' } });
}

// Render Shop/Pre-Builts
function renderShopProducts() {
    const shopContainer = document.getElementById('shopProducts');
    if (!shopContainer) return;
    
    shopContainer.innerHTML = '';
    
    products.forEach(p => {
        const savings = p.retailPrice - p.price;
        const card = document.createElement('div');
        card.className = `product-card glass-card product-category-${p.category}`;
        
        let specsHtml = '';
        p.specs.forEach((spec, sIdx) => {
            const isHighlight = sIdx < 2;
            const icon = spec.name.includes('CPU') ? 'cpu' : 
                         spec.name.includes('GPU') ? 'zap' :
                         spec.name.includes('RAM') ? 'database' :
                         (spec.name.includes('SSD') || spec.name.includes('HDD')) ? 'hard-drive' :
                         spec.name.includes('PSU') ? 'power' : 'box';
            
            const sourceColor = spec.source === 'Refurbished' ? 'green-text' : 'cyan-text';
            specsHtml += `
                <li class="${isHighlight ? 'highlight-spec' : ''}">
                    <i data-lucide="${icon}"></i>
                    <span>${spec.name} <span class="${sourceColor}" style="font-size:0.75rem;">(${spec.source})</span></span>
                </li>
            `;
        });
        
        card.innerHTML = `
            <div class="product-img-container text-gradient-banner">
                <div class="tier-gradient-title">£${p.price.toFixed(0)} BUILD</div>
            </div>
            <div class="product-info">
                <div class="product-badges-row" style="display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap;">
                    <span class="badge-used-inline" style="background:rgba(57, 255, 20, 0.1); border:1px solid rgba(57, 255, 20, 0.2); color:var(--accent-green); font-size:0.75rem; font-weight:600; padding:4px 8px; border-radius:4px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="leaf" style="width:12px;height:12px;"></i> Refurbished Silicon</span>
                    <span class="price-saving-badge-inline" style="background:rgba(0, 242, 254, 0.1); border:1px solid rgba(0, 242, 254, 0.2); color:var(--accent-cyan); font-size:0.75rem; font-weight:600; padding:4px 8px; border-radius:4px;">Save £${savings.toFixed(0)}!</span>
                </div>
                <h3>${p.name}</h3>
                <p class="product-desc">${p.description}</p>
                <ul class="product-specs">
                    ${specsHtml}
                </ul>
                <div class="product-pricing">
                    <div class="price-col">
                        <span class="price-retail">Retail New: £${p.retailPrice.toFixed(2)}</span>
                        <span class="price-current">£${p.price.toFixed(2)}</span>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="selectBasePcInBuilder('${p.id}')">
                        Customize <i data-lucide="sliders" style="width:14px;height:14px;"></i>
                    </button>
                </div>
            </div>
        `;
        shopContainer.appendChild(card);
    });
    lucide.createIcons({ attrs: { class: 'lucide-icon' } });
}

// Shop Product Filter
function filterProducts(category) {
    // Active tabs class toggle
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Toggle product cards
    products.forEach(p => {
        const cards = document.querySelectorAll(`.product-category-${p.category}`);
        cards.forEach(card => {
            if (category === 'all' || p.category === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ================= SAVINGS CALCULATOR LOGIC =================
const calculatorData = {
    200: {
        retail: ["AMD Athlon 3000G CPU (New)", "Radeon Vega 3 Graphics (Slow)", "4GB DDR4 RAM (New)", "128GB SATA SSD (New)", "Cheap Generic Office Case", "300W Basic Power Supply", "Retail Markup"],
        pcpower: ["AMD Ryzen 3 2200G CPU (Used)", "Radeon RX 570 4GB GPU (Used)", "8GB DDR4 RAM (Used)", "256GB SSD (New)", "Sleek Micro-ATX Case (New)", "450W Gold Rated PSU (New)", "Flat £49 Building Fee"],
        savings: 120, fps: "65 FPS (1080p Esports)", ecoWaste: "8.5kg", co2: "110kg"
    },
    300: {
        retail: ["AMD Ryzen 3 3200G CPU (New)", "Radeon Vega 8 Graphics (Slow)", "8GB DDR4 RAM (New)", "256GB SATA SSD (New)", "Basic Office Case", "350W Basic Power Supply", "Retail Markup"],
        pcpower: ["AMD Ryzen 5 3600 CPU (Used)", "Radeon RX 580 8GB GPU (Used)", "8GB DDR4 RAM (Used)", "256GB NVMe SSD (New)", "Sleek Glass MicroATX (New)", "500W Bronze PSU (New)", "Flat £49 Building Fee"],
        savings: 180, fps: "85 FPS (1080p Esports)", ecoWaste: "10.2kg", co2: "130kg"
    },
    400: {
        retail: ["AMD Ryzen 3 4100 CPU (New)", "Radeon Vega Integrated (Slow)", "8GB DDR4 RAM (New)", "256GB NVMe SSD (New)", "Standard Office Case", "400W Bronze Power Supply", "Retail Markup"],
        pcpower: ["AMD Ryzen 5 4100 CPU (Used)", "Radeon RX 6500 XT 4GB GPU (Used)", "16GB DDR4 RAM (Used)", "500GB NVMe SSD (New)", "Sleek Tempered Glass Case (New)", "500W Bronze PSU (New)", "Flat £49 Building Fee"],
        savings: 220, fps: "110 FPS (1080p High)", ecoWaste: "12.4kg", co2: "150kg"
    },
    500: {
        retail: ["AMD Ryzen 5 4500 CPU (New)", "NVIDIA GTX 1650 4GB GPU (New)", "8GB DDR4 RAM (New)", "256GB NVMe SSD (New)", "Basic Gaming Case", "450W Power Supply", "Retail Markup"],
        pcpower: ["AMD Ryzen 5 5600 CPU (Used)", "Radeon RX 6700 XT 12GB GPU (Used)", "16GB DDR4 RAM (Used)", "500GB NVMe SSD (New)", "500GB HDD (Used)", "Sleek Airflow Case (New)", "500W Bronze PSU (New)", "Flat £49 Building Fee"],
        savings: 290, fps: "165 FPS (1080p Ultra)", ecoWaste: "14.8kg", co2: "180kg"
    },
    600: {
        retail: ["AMD Ryzen 5 5500 CPU (New)", "Radeon RX 6600 8GB GPU (New)", "16GB DDR4 RAM (New)", "512GB NVMe SSD (New)", "RGB Mid Tower Case", "550W Power Supply", "Retail Markup"],
        pcpower: ["AMD Ryzen 7 5700X CPU (Used)", "Radeon RX 6800 XT 16GB GPU (Used)", "16GB DDR4 RAM (Used)", "500GB NVMe SSD (New)", "500GB HDD (Used)", "Tempered Glass Case (New)", "600W Gold PSU (New)", "Flat £49 Building Fee"],
        savings: 380, fps: "220 FPS (1080p Ultra)", ecoWaste: "17.2kg", co2: "210kg"
    },
    700: {
        retail: ["AMD Ryzen 5 5600 CPU (New)", "Radeon RX 7600 8GB GPU (New)", "16GB DDR4 RAM (New)", "512GB NVMe SSD (New)", "High-Airflow Case", "600W Power Supply", "Retail Markup"],
        pcpower: ["AMD Ryzen 7 5800X CPU (Used)", "Radeon RX 6950 XT 16GB GPU (Used)", "16GB DDR4 RAM (Used)", "1TB NVMe Gen4 SSD (New)", "1TB HDD (Used)", "Premium Dual Chamber Case (New)", "700W Gold PSU (New)", "Flat £49 Building Fee"],
        savings: 450, fps: "240 FPS (1080p Ultra)", ecoWaste: "19.5kg", co2: "240kg"
    },
    800: {
        retail: ["AMD Ryzen 5 7600 CPU (New)", "NVIDIA RTX 4060 8GB GPU (New)", "16GB DDR5 RAM (New)", "1TB NVMe SSD (New)", "Panoramic Glass Case", "650W Power Supply", "Retail Markup"],
        pcpower: ["AMD Ryzen 9 5900X CPU (Used)", "Radeon RX 7900 XT 20GB GPU (Used)", "32GB DDR4 RAM (Used)", "1TB NVMe Gen4 SSD (New)", "2TB HDD (Used)", "Panoramic Glass Case (New)", "750W Gold PSU (New)", "Flat £49 Building Fee"],
        savings: 580, fps: "280 FPS (1080p Ultra)", ecoWaste: "22.3kg", co2: "270kg"
    }
};

function initCalculator() {
    const slider = document.getElementById('budgetSlider');
    const budgetVal = document.getElementById('budgetValue');
    const savingsAmt = document.getElementById('savingsAmount');
    const fpsAmt = document.getElementById('fpsAmount');
    
    if (!slider) return;

    function updateCalc() {
        // Find closest tick key
        const val = parseInt(slider.value);
        let key = 600;
        const keys = Object.keys(calculatorData).map(Number).sort((a,b)=>a-b);
        for(let k of keys) {
            if (val >= k) key = k;
        }
        
        const data = calculatorData[key];
        
        budgetVal.innerText = `£${val}`;
        savingsAmt.innerText = `£${data.savings}`;
        fpsAmt.innerText = data.fps;
        
        // Render Lists
        const retailList = document.getElementById('retailList');
        const pcpowerList = document.getElementById('pcpowerList');
        
        retailList.innerHTML = data.retail.map(item => `<li>${item}</li>`).join('');
        pcpowerList.innerHTML = data.pcpower.map(item => `<li>${item}</li>`).join('');
        
        // Eco Impact text
        const ecoImpact = document.querySelector('.calculator-eco-impact span');
        if (ecoImpact) {
            ecoImpact.innerHTML = `Choosing this build prevents <strong>${data.ecoWaste} of e-waste</strong> and saves <strong>${data.co2} of CO2</strong> emissions!`;
        }
    }
    
    slider.addEventListener('input', updateCalc);
    updateCalc(); // Run initially
}


// ================= PC BUILDER CUSTOMIZER LOGIC =================
function initBuilder() {
    renderBasePcOptions();
    selectBasePcInBuilder(state.selectedBasePcId);
}

function renderBasePcOptions() {
    const grid = document.getElementById('basePcGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = `base-select-card ${p.id === state.selectedBasePcId ? 'selected' : ''}`;
        card.id = `base-card-£{p.id}`;
        card.onclick = () => selectBasePcInBuilder(p.id);
        
        card.innerHTML = `
            <h4>${p.name}</h4>
            <p style="font-size:0.75rem; color:var(--text-secondary); flex-grow:1;">${p.description}</p>
            <span class="base-price">£${p.price.toFixed(2)}</span>
        `;
        grid.appendChild(card);
    });
}

function selectBasePcInBuilder(pcId) {
    state.selectedBasePcId = pcId;
    
    // Toggle active classes in grid
    document.querySelectorAll('.base-select-card').forEach(card => {
        card.classList.remove('selected');
    });
    const selectedCard = document.getElementById(`base-card-${pcId}`);
    if (selectedCard) selectedCard.classList.add('selected');
    
    // Reset selections to standard configuration parts
    const stdParts = basePartsMapping[pcId];
    if (stdParts) {
        state.customizer.cpu = stdParts.cpu;
        state.customizer.gpu = stdParts.gpu;
        state.customizer.ram = stdParts.ram;
        state.customizer.storage = stdParts.storage;
    }
    
    // Render builder options
    renderUpgradeOptions();
    updateBuilderPricingAndSummary();
    
    // Navigate to builder
    showSection('builder');
}

function renderUpgradeOptions() {
    const categories = ['cpu', 'gpu', 'ram', 'storage'];
    const stdParts = basePartsMapping[state.selectedBasePcId];
    if (!stdParts) return;
    
    categories.forEach(cat => {
        const container = document.getElementById(`${cat}Upgrades`);
        if (!container) return;
        
        container.innerHTML = '';
        
        upgrades[cat].forEach(opt => {
            const isSelected = state.customizer[cat] === opt.id;
            const row = document.createElement('div');
            row.className = `upgrade-row ${isSelected ? 'selected' : ''}`;
            row.onclick = () => selectUpgrade(cat, opt.id);
            
            // Calculate price difference relative to standard parts
            const stdPartId = stdParts[cat];
            const stdPrice = partAbsolutePrices[stdPartId];
            const optPrice = partAbsolutePrices[opt.id];
            const priceDiff = optPrice - stdPrice;
            
            let priceText = '';
            if (priceDiff === 0) {
                priceText = `£${optPrice.toFixed(2)} (Standard)`;
            } else if (priceDiff > 0) {
                priceText = `£${optPrice.toFixed(2)} (+£${priceDiff.toFixed(2)})`;
            } else {
                priceText = `£${optPrice.toFixed(2)} (-£${Math.abs(priceDiff).toFixed(2)})`;
            }
            
            let sourceColor = opt.source === 'Refurbished' ? 'green-text' : 'cyan-text';
            
            row.innerHTML = `
                <div class="upgrade-info">
                    <span class="upgrade-name">${opt.name}</span>
                    <span class="upgrade-source ${sourceColor}">${opt.source}</span>
                </div>
                <span class="upgrade-price ${priceDiff < 0 ? 'green-text' : ''}">${priceText}</span>
            `;
            container.appendChild(row);
        });
    });
}

function selectUpgrade(cat, optId) {
    state.customizer[cat] = optId;
    renderUpgradeOptions();
    updateBuilderPricingAndSummary();
}

function updateBuilderPricingAndSummary() {
    const basePc = products.find(p => p.id === state.selectedBasePcId);
    if (!basePc) return;
    
    // Update preview title banner
    const previewTitle = document.getElementById('builderPreviewTitle');
    if (previewTitle) {
        previewTitle.innerText = `£${basePc.price.toFixed(0)} BUILD`;
    }
    
    // Set theme for builder banner
    const previewBanner = document.getElementById('builderPreviewBanner');
    if (previewBanner) {
        previewBanner.className = 'preview-image-container text-gradient-banner';
        if (basePc.price <= 300) {
            previewBanner.classList.add('cyan-theme');
        } else if (basePc.price <= 500) {
            previewBanner.classList.add('green-theme');
        } else {
            previewBanner.classList.add('purple-theme');
        }
    }
    
    // Name
    const name = document.getElementById('builderPcName');
    if (name) name.innerText = `Customized: ${basePc.name}`;
    
    // Description
    const desc = document.getElementById('builderPcDesc');
    if (desc) desc.innerText = basePc.description;
    
    // Calculations
    const stdParts = basePartsMapping[basePc.id];
    let upgradeCost = 0;
    
    const summaryList = document.getElementById('builderSummaryList');
    if (summaryList) summaryList.innerHTML = '';
    
    // Find absolute details
    const selectedCpu = upgrades.cpu.find(o => o.id === state.customizer.cpu);
    const selectedGpu = upgrades.gpu.find(o => o.id === state.customizer.gpu);
    const selectedRam = upgrades.ram.find(o => o.id === state.customizer.ram);
    const selectedStorage = upgrades.storage.find(o => o.id === state.customizer.storage);
    
    // Calculate cost delta
    upgradeCost += (partAbsolutePrices[selectedCpu.id] - partAbsolutePrices[stdParts.cpu]);
    upgradeCost += (partAbsolutePrices[selectedGpu.id] - partAbsolutePrices[stdParts.gpu]);
    upgradeCost += (partAbsolutePrices[selectedRam.id] - partAbsolutePrices[stdParts.ram]);
    upgradeCost += (partAbsolutePrices[selectedStorage.id] - partAbsolutePrices[stdParts.storage]);
    
    const specsToDisplay = [
        { name: selectedCpu.name + ' CPU', source: 'Refurbished', price: partAbsolutePrices[selectedCpu.id] },
        { name: selectedGpu.name + ' GPU', source: 'Refurbished', price: partAbsolutePrices[selectedGpu.id] },
        { name: selectedRam.name, source: 'Refurbished', price: partAbsolutePrices[selectedRam.id] },
        { name: selectedStorage.name, source: 'Brand New', price: partAbsolutePrices[selectedStorage.id] }
    ];
    
    // We can lookup standard parts prices by name
    const getStdPartPrice = (name) => {
        const prices = {
            "450W Gold Rated PSU": 35,
            "500W Bronze PSU": 30,
            "600W Gold PSU": 50,
            "700W Gold PSU": 65,
            "750W Gold PSU": 75,
            "Sleek Micro-ATX Case": 35,
            "Sleek Glass MicroATX Case": 40,
            "Sleek Tempered Glass Case": 45,
            "Sleek Airflow Case": 45,
            "Tempered Glass Case": 50,
            "Premium Dual Chamber Case": 85,
            "Panoramic Glass Case": 100,
            "500GB HDD Storage": 15,
            "1TB HDD Storage": 25,
            "2TB HDD Storage": 40
        };
        return prices[name] || 0;
    };
    
    // Append standard parts (PSU, Case, HDD)
    const psuPart = basePc.specs[4];
    const casePart = basePc.specs[5];
    const hddPart = basePc.specs[6];
    
    specsToDisplay.push({ ...psuPart, price: getStdPartPrice(psuPart.name) });
    specsToDisplay.push({ ...casePart, price: getStdPartPrice(casePart.name) });
    if (hddPart) {
        specsToDisplay.push({ ...hddPart, price: getStdPartPrice(hddPart.name) });
    }
    
    // Populate UI summary list
    if (summaryList) {
        specsToDisplay.forEach(spec => {
            const li = document.createElement('li');
            const sourceClass = spec.source === 'Refurbished' ? 'green-text' : 'cyan-text';
            const priceVal = spec.price;
            const priceText = priceVal > 0 ? `(£${priceVal.toFixed(2)})` : '';
            li.innerHTML = `
                <span>${spec.name} <span class="summary-part-price" style="font-size:0.85rem; opacity:0.75; margin-left:4px;">${priceText}</span></span>
                <span class="${sourceClass}">${spec.source}</span>
            `;
            summaryList.appendChild(li);
        });
    }
    
    // Dynamic pricing math
    let partsTotal = (basePc.price - FLAT_BUILD_FEE) + upgradeCost;
    const baseRetailParts = basePc.retailPrice;
    const estimatedSavings = baseRetailParts - partsTotal;
    const totalCost = partsTotal + FLAT_BUILD_FEE;
    
    // Update labels
    document.getElementById('builderPartsCost').innerText = `£${(partsTotal + estimatedSavings).toFixed(2)}`;
    document.getElementById('builderSavingsCost').innerText = `-£${estimatedSavings.toFixed(2)}`;
    document.getElementById('builderFeeCost').innerText = `£${FLAT_BUILD_FEE.toFixed(2)}`;
    document.getElementById('builderTotalCost').innerText = `£${totalCost.toFixed(2)}`;
    
    // Store in temp build state
    state.tempCustomBuild = {
        name: `Customized: ${basePc.name}`,
        baseId: basePc.id,
        price: totalCost,
        basePrice: basePc.price,
        specs: specsToDisplay,
        image: ''
    };
}

function addCustomBuildToCart() {
    const build = state.tempCustomBuild;
    if (!build) return;
    
    // Add to cart state
    const cartItem = {
        id: `custom-£{build.baseId}-£{Date.now()}`,
        name: build.name,
        price: build.price,
        specs: build.specs,
        image: build.image,
        quantity: 1
    };
    
    state.cart.push(cartItem);
    saveCart();
    updateCartUI();
    toggleCart(true); // Slide open cart drawer
}


// ================= E-COMMERCE CART LOGIC =================
function toggleCart(open) {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (!drawer || !backdrop) return;
    
    if (open) {
        drawer.classList.add('active');
        backdrop.style.display = 'block';
    } else {
        drawer.classList.remove('active');
        backdrop.style.display = 'none';
    }
}

function saveCart() {
    localStorage.setItem('pcpower_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
    // Update cart counts
    const count = state.cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(node => {
        node.innerText = count;
    });
    
    const list = document.getElementById('cartItemsList');
    const summary = document.getElementById('cartSummarySection');
    
    if (!list) return;
    
    if (state.cart.length === 0) {
        list.innerHTML = `
            <div class="empty-cart-message">
                <i data-lucide="shopping-bag" style="width:48px;height:48px;"></i>
                <p>Your cart is empty.</p>
                <button class="btn btn-secondary btn-sm" onclick="toggleCart(false); showSection('shop')">Explore Shop</button>
            </div>
        `;
        if (summary) summary.style.display = 'none';
        lucide.createIcons();
        return;
    }
    
    if (summary) summary.style.display = 'flex';
    list.innerHTML = '';
    
    let subtotal = 0;
    
    state.cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // Specs list formatting
        const specsText = item.specs.slice(0, 3).map(s => s.name.split(' ')[2] || s.name.split(' ')[0]).join(' | ');
        
        const card = document.createElement('div');
        card.className = 'cart-item-card';
        card.innerHTML = `
            <div class="cart-item-img text-gradient-banner" style="display:flex;align-items:center;justify-content:center;">
                <div class="tier-gradient-title" style="font-size:0.85rem;animation:none;">£${item.price.toFixed(0)}</div>
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-specs">${specsText}</div>
                <div class="cart-item-row">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                    </div>
                    <div class="cart-item-price">£${itemTotal.toFixed(2)}</div>
                    <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">
                        <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
                    </button>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
    
    // Subtotals and pricing math
    // In our pricing, build fee is included inside the item price. So let's extract it for transparency display!
    let totalBuildFee = state.cart.reduce((total, item) => total + (FLAT_BUILD_FEE * item.quantity), 0);
    
    // Subtotal before flat build fees
    let partsSubtotal = subtotal - totalBuildFee;
    
    // Apply promo code discount if any
    let discount = 0;
    if (state.promoApplied === 'ECOFRIENDLY') {
        discount = 15.00; // £15 off subtotal
    } else if (state.promoApplied === 'FREEBUILD') {
        discount = totalBuildFee; // Waives the building fees!
    }
    
    state.promoDiscount = discount;
    let finalTotal = subtotal - discount;
    if (finalTotal < 0) finalTotal = 0;
    
    // Update labels
    document.getElementById('cartSubtotal').innerText = `£${partsSubtotal.toFixed(2)}`;
    document.getElementById('cartBuildFee').innerText = `£${totalBuildFee.toFixed(2)}`;
    document.getElementById('cartTotal').innerText = `£${finalTotal.toFixed(2)}`;
    
    const promoLine = document.getElementById('promoLine');
    if (state.promoApplied) {
        promoLine.style.display = 'flex';
        document.getElementById('promoName').innerText = `Promo (${state.promoApplied})`;
        document.getElementById('promoDiscount').innerText = `-£${discount.toFixed(2)}`;
    } else {
        promoLine.style.display = 'none';
    }
    
    lucide.createIcons({ attrs: { class: 'lucide-icon' } });
}

function updateQty(itemId, delta) {
    const item = state.cart.find(i => i.id === itemId);
    if (!item) return;
    
    item.quantity += delta;
    if (item.quantity <= 0) {
        state.cart = state.cart.filter(i => i.id !== itemId);
    }
    
    saveCart();
    updateCartUI();
}

function removeFromCart(itemId) {
    state.cart = state.cart.filter(i => i.id !== itemId);
    saveCart();
    updateCartUI();
}

function applyPromoCode() {
    const input = document.getElementById('promoInput');
    const feedback = document.getElementById('promoFeedback');
    
    if (!input || !feedback) return;
    
    const code = input.value.trim().toUpperCase();
    
    if (code === 'ECOFRIENDLY') {
        state.promoApplied = 'ECOFRIENDLY';
        feedback.innerText = "Promo applied! £15 off your order.";
        feedback.className = "promo-feedback green-text";
    } else if (code === 'FREEBUILD') {
        state.promoApplied = 'FREEBUILD';
        feedback.innerText = "Promo applied! £49 Building Fee waived per PC.";
        feedback.className = "promo-feedback green-text";
    } else {
        state.promoApplied = null;
        feedback.innerText = "Invalid discount code.";
        feedback.className = "promo-feedback red-text";
    }
    
    updateCartUI();
}


// ================= CHECKOUT WIZARD LOGIC =================
function openCheckout() {
    toggleCart(false);
    
    const totalCostStr = document.getElementById('cartTotal').innerText;
    document.getElementById('checkoutTotalAmount').innerText = totalCostStr;
    
    // Reset steps
    document.getElementById('step1').className = 'step-indicator active';
    document.getElementById('step2').className = 'step-indicator';
    document.getElementById('step3').className = 'step-indicator';
    
    document.getElementById('shippingForm').style.display = 'flex';
    document.getElementById('paymentForm').style.display = 'none';
    document.getElementById('successContent').style.display = 'none';
    
    document.getElementById('checkoutModal').style.display = 'flex';
}

function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function handleShippingSubmit(e) {
    e.preventDefault();
    
    state.shippingInfo = {
        name: document.getElementById('shipName').value,
        email: document.getElementById('shipEmail').value,
        address: document.getElementById('shipAddress').value,
        city: document.getElementById('shipCity').value,
        zip: document.getElementById('shipZip').value
    };
    
    // Advance to Payment
    document.getElementById('step1').className = 'step-indicator';
    document.getElementById('step2').className = 'step-indicator active';
    
    document.getElementById('shippingForm').style.display = 'none';
    document.getElementById('paymentForm').style.display = 'flex';
}

function backToShipping() {
    document.getElementById('step1').className = 'step-indicator active';
    document.getElementById('step2').className = 'step-indicator';
    
    document.getElementById('shippingForm').style.display = 'flex';
    document.getElementById('paymentForm').style.display = 'none';
}

function handlePaymentSubmit(e) {
    e.preventDefault();
    
    const payBtn = document.getElementById('payBtn');
    payBtn.innerText = "Processing Payment...";
    payBtn.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        payBtn.innerText = "Pay Now";
        payBtn.disabled = false;
        
        // Show success screen
        document.getElementById('step2').className = 'step-indicator';
        document.getElementById('step3').className = 'step-indicator active';
        
        document.getElementById('paymentForm').style.display = 'none';
        document.getElementById('successContent').style.display = 'block';
        
        // Build receipt details
        renderReceipt();
        
        // Clear cart
        state.cart = [];
        state.promoApplied = null;
        saveCart();
        updateCartUI();
    }, 1500);
}

function renderReceipt() {
    const itemsContainer = document.getElementById('receiptItems');
    if (!itemsContainer) return;
    
    itemsContainer.innerHTML = '';
    
    let subtotal = 0;
    let totalBuildFee = 0;
    
    // Retrieve snapshot of the purchased items before clearing
    const cartBackup = JSON.parse(localStorage.getItem('pcpower_cart') || '[]');
    
    cartBackup.forEach(item => {
        const row = document.createElement('div');
        row.className = 'receipt-line-item';
        row.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>£${(item.price * item.quantity).toFixed(2)}</span>
        `;
        itemsContainer.appendChild(row);
        subtotal += (item.price * item.quantity);
        totalBuildFee += (FLAT_BUILD_FEE * item.quantity);
    });
    
    // Promo Code display on receipt
    if (state.promoApplied) {
        const row = document.createElement('div');
        row.className = 'receipt-line-item green-text';
        row.innerHTML = `
            <span>Discount (${state.promoApplied})</span>
            <span>-£${state.promoDiscount.toFixed(2)}</span>
        `;
        itemsContainer.appendChild(row);
    }
    
    // Taxes/shipping simulated
    const taxRow = document.createElement('div');
    taxRow.className = 'receipt-line-item';
    taxRow.innerHTML = `
        <span>Shipping</span>
        <span>FREE</span>
    `;
    itemsContainer.appendChild(taxRow);
    
    const finalTotal = subtotal - state.promoDiscount;
    document.getElementById('receiptTotal').innerHTML = `
        <span>TOTAL PAID:</span>
        <span>£${finalTotal.toFixed(2)}</span>
    `;
    
    // Receipt header details
    document.getElementById('receiptDate').innerText = `Date: ${new Date().toLocaleDateString()}`;
    document.getElementById('receiptId').innerText = `Order ID: #PCP-£{Math.floor(1000 + Math.random() * 9000)}`;
}

function finishCheckout() {
    closeCheckout();
    showSection('home');
}


// ================= FAQ ACCORDION LOGIC =================
function toggleFaq(element) {
    const parent = element.parentElement;
    const answer = parent.querySelector('.faq-answer');
    
    if (parent.classList.contains('active')) {
        parent.classList.remove('active');
        answer.style.display = 'none';
    } else {
        // Close others
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.display = 'none';
        });
        
        parent.classList.add('active');
        answer.style.display = 'block';
    }
}


// ================= PERFORMANCE SHOWCASE LOGIC =================
const gamePerformanceData = {
    fortnite: { fps: 240, settings: "1080p Performance Mode" },
    cyberpunk: { fps: 85, settings: "1440p High (DLSS On)" },
    cod: { fps: 165, settings: "1440p Balanced DLSS" }
};

function selectShowcaseGame(game) {
    const data = gamePerformanceData[game];
    if (!data) return;
    
    // Update text elements
    const fpsVal = document.getElementById('showcaseFps');
    const settingsVal = document.getElementById('showcaseSettings');
    
    if (fpsVal) fpsVal.innerText = data.fps;
    if (settingsVal) settingsVal.innerText = data.settings;
    
    // Toggle active classes on tabs
    document.querySelectorAll('.game-select-tabs .control-badge').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Set active button
    if (game === 'fortnite') {
        const btn = document.getElementById('btnGameFortnite');
        if (btn) btn.classList.add('active');
    } else if (game === 'cyberpunk') {
        const btn = document.getElementById('btnGameCyberpunk');
        if (btn) btn.classList.add('active');
    } else if (game === 'cod') {
        const btn = document.getElementById('btnGameCod');
        if (btn) btn.classList.add('active');
    }
}

// Expose functions to the global scope (required for HTML inline event handlers under Vite ESM modules)
window.showSection = showSection;
window.toggleMobileMenu = toggleMobileMenu;
window.selectShowcaseGame = selectShowcaseGame;
window.selectBasePcInBuilder = selectBasePcInBuilder;
window.addCustomBuildToCart = addCustomBuildToCart;
window.toggleCart = toggleCart;
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
window.applyPromoCode = applyPromoCode;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.handleShippingSubmit = handleShippingSubmit;
window.handlePaymentSubmit = handlePaymentSubmit;
window.backToShipping = backToShipping;
window.finishCheckout = finishCheckout;
window.toggleFaq = toggleFaq;
window.filterProducts = filterProducts;

