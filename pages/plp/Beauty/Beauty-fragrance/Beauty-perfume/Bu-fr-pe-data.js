// Bu-fr-pe-data.js

// =====================================================
// Beauty Fragrance - Perfume Products Mock Data
// Used for PLP Type B Product Listing Page
// =====================================================

export const perfumeProducts = [

    // =====================================================
    // Product 1 - Miss Dior
    // =====================================================

    {
        id: "bu-fr-pe-001",
        title: "Miss Dior",
        titleKey: "missDior",
        category: "Beauty",
        categoryKey: "beautyFragrance",
        subCategory: "Fragrance",
        collection: "Perfume",
        collectionKey: "breadcrumbPerfume",
        price: 850,
        oldPrice: 950,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/736x/be/e5/b2/bee5b2cde4592c789068c603f130845d.jpg",
            "https://i.pinimg.com/736x/88/03/51/8803511cae8d6161a61151c3778de56d.jpg",
            "https://i.pinimg.com/736x/ed/99/e9/ed99e9cc316edddaf170617f08264ba3.jpg"
        ],
        video: "",
        shortDescription: "Elegant floral perfume with a romantic and feminine character.",
        shortDescriptionKey: "missDiorShortDescription",
        description: "A sophisticated floral fragrance with a delicate, elegant and feminine character.",
        descriptionKey: "missDiorDescription",
        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Pink", value: "#E8A0B8" },
                { name: "Rose", value: "#C96B84" },
                { name: "Soft Gold", value: "#D8C08A" }
            ],
            sizes: [
                "30ml",
                "50ml",
                "100ml"
            ],
            material: ""
        },
        stock: 24,
        featured: true
    },

    // =====================================================
    // Product 2 - Chanel Chance
    // =====================================================

    {
        id: "bu-fr-pe-002",
        title: "Chanel Chance",
        titleKey: "chanelChance",
        category: "Beauty",
        categoryKey: "beautyFragrance",
        subCategory: "Fragrance",
        collection: "Perfume",
        collectionKey: "breadcrumbPerfume",
        price: 900,
        oldPrice: 1000,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/736x/58/8c/0a/588c0ae7db714111a096d263306711fe.jpg",
            "https://i.pinimg.com/736x/06/12/a6/0612a664698856e0540db2ca37183141.jpg",
            "https://i.pinimg.com/736x/74/d1/8d/74d18dae220190bda085165397b0a358.jpg",
            "https://i.pinimg.com/1200x/a4/a1/51/a4a1516371006bcb85c5a7428adec899.jpg",
            "https://i.pinimg.com/736x/c0/ff/ed/c0ffedf56bc313c1e0dad0d41021d217.jpg"
        ],
        video: "",
        shortDescription: "Fresh and elegant perfume with a timeless feminine character.",
        shortDescriptionKey: "chanelChanceShortDescription",
        description: "A fresh and elegant fragrance with a refined feminine character and graceful finish.",
        descriptionKey: "chanelChanceDescription",
        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Soft Pink", value: "#F2B6C2" },
                { name: "Peach", value: "#F4B183" },
                { name: "Gold", value: "#D4AF37" }
            ],
            sizes: [
                "30ml",
                "50ml",
                "100ml"
            ],
            material: ""
        },
        stock: 20,
        featured: true
    },

    // =====================================================
    // Product 3 - J'adore
    // =====================================================

    {
        id: "bu-fr-pe-003",
        title: "J'adore",
        titleKey: "jadore",
        category: "Beauty",
        categoryKey: "beautyFragrance",
        subCategory: "Fragrance",
        collection: "Perfume",
        collectionKey: "breadcrumbPerfume",
        price: 880,
        oldPrice: 980,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/736x/77/48/d9/7748d95daffdfc4f344c145b1b897d96.jpg",
            "https://i.pinimg.com/736x/5a/1c/6c/5a1c6cfc42b5bdbd7a2914b9e2a906b8.jpg",
            "https://i.pinimg.com/736x/6d/9f/45/6d9f455b0c6830db315aa518309a70c7.jpg"
        ],
        video: "",
        shortDescription: "Elegant floral perfume with a luxurious feminine character.",
        shortDescriptionKey: "jadoreShortDescription",
        description: "A luxurious floral fragrance designed for an elegant and sophisticated feminine style.",
        descriptionKey: "jadoreDescription",
        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Gold", value: "#D4AF37" },
                { name: "Amber", value: "#C88A3D" },
                { name: "Champagne", value: "#E8D6A8" }
            ],
            sizes: [
                "30ml",
                "50ml",
                "100ml"
            ],
            material: ""
        },
        stock: 22,
        featured: true
    },

    // =====================================================
    // Product 4 - Libre
    // =====================================================

    {
        id: "bu-fr-pe-004",
        title: "Libre",
        titleKey: "libre",
        category: "Beauty",
        categoryKey: "beautyFragrance",
        subCategory: "Fragrance",
        collection: "Perfume",
        collectionKey: "breadcrumbPerfume",
        price: 870,
        oldPrice: 970,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/736x/97/de/9b/97de9b84a7a5bde216c82f32dca4e76f.jpg",
            "https://i.pinimg.com/736x/1d/56/0d/1d560d7c52e271ff1279da9a4e0e0299.jpg",
            "https://i.pinimg.com/736x/83/3c/1e/833c1ef6c5d8ac47ea1558a23b96c42a.jpg"
        ],
        video: "",
        shortDescription: "Bold and elegant perfume with a modern feminine character.",
        shortDescriptionKey: "libreShortDescription",
        description: "A modern feminine fragrance with a confident, elegant and sophisticated character.",
        descriptionKey: "libreDescription",
        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Amber", value: "#C58B45" },
                { name: "Gold", value: "#D4AF37" },
                { name: "Black", value: "#1F1F1F" }
            ],
            sizes: [
                "30ml",
                "50ml",
                "100ml"
            ],
            material: ""
        },
        stock: 18,
        featured: true
    },

    // =====================================================
    // Product 5 - Good Girl
    // =====================================================

    {
        id: "bu-fr-pe-005",
        title: "Good Girl",
        titleKey: "goodGirl",
        category: "Beauty",
        categoryKey: "beautyFragrance",
        subCategory: "Fragrance",
        collection: "Perfume",
        collectionKey: "breadcrumbPerfume",
        price: 920,
        oldPrice: 1020,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/736x/52/3a/54/523a547e07651b4e939965a0facdb6b1.jpg",
            "https://i.pinimg.com/736x/9a/a9/61/9aa961298db23705f506a546a6719c06.jpg",
            "https://i.pinimg.com/736x/c7/b9/07/c7b907d8ccbc934cd1c7c78e78c33ef4.jpg"
        ],
        video: "",
        shortDescription: "Elegant and seductive perfume with a distinctive feminine character.",
        shortDescriptionKey: "goodGirlShortDescription",
        description: "A sophisticated fragrance with a bold, feminine and seductive character.",
        descriptionKey: "goodGirlDescription",
        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Black", value: "#1C1C1C" },
                { name: "Navy Blue", value: "#263A63" },
                { name: "Gold", value: "#D4AF37" }
            ],
            sizes: [
                "30ml",
                "50ml",
                "100ml"
            ],
            material: ""
        },
        stock: 21,
        featured: true
    },

    // =====================================================
    // Product 6 - Black Opium
    // =====================================================

    {
        id: "bu-fr-pe-006",
        title: "Black Opium",
        titleKey: "blackOpium",
        category: "Beauty",
        categoryKey: "beautyFragrance",
        subCategory: "Fragrance",
        collection: "Perfume",
        collectionKey: "breadcrumbPerfume",
        price: 910,
        oldPrice: 1010,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/1200x/5f/c4/29/5fc429e4f85d455a66c085df46cdff9e.jpg",
            "https://i.pinimg.com/1200x/01/c3/37/01c337270de2b984a70ca5b2fbe77cf1.jpg",
            "https://i.pinimg.com/1200x/a6/a8/6d/a6a86d0bc7fd2a169aaec11545842e0e.jpg"
        ],
        video: "",
        shortDescription: "Warm and captivating perfume with a modern feminine character.",
        shortDescriptionKey: "blackOpiumShortDescription",
        description: "A captivating fragrance with a warm, sophisticated and modern feminine character.",
        descriptionKey: "blackOpiumDescription",
        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Black", value: "#1A1A1A" },
                { name: "Gold", value: "#C9A227" },
                { name: "Rose Gold", value: "#B76E79" }
            ],
            sizes: [
                "30ml",
                "50ml",
                "100ml"
            ],
            material: ""
        },
        stock: 19,
        featured: true
    },

    // =====================================================
    // Product 7 - La Vie Est Belle
    // =====================================================

    {
        id: "bu-fr-pe-007",
        title: "La Vie Est Belle",
        titleKey: "laVieEstBelle",
        category: "Beauty",
        categoryKey: "beautyFragrance",
        subCategory: "Fragrance",
        collection: "Perfume",
        collectionKey: "breadcrumbPerfume",
        price: 860,
        oldPrice: 960,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/1200x/52/98/be/5298be7930e5c207e9d3cddc03545b0f.jpg",
            "https://i.pinimg.com/736x/17/67/33/1767331e2dbfbdac1de6c0e322a6d89f.jpg",
            "https://i.pinimg.com/736x/7f/17/72/7f17721a81022ee32c6f6688c2eadfc3.jpg"
        ],
        video: "",
        shortDescription: "Sweet and elegant perfume with a graceful feminine character.",
        shortDescriptionKey: "laVieEstBelleShortDescription",
        description: "A graceful feminine fragrance with an elegant, warm and beautifully balanced character.",
        descriptionKey: "laVieEstBelleDescription",
        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Pink", value: "#E7A1B0" },
                { name: "Rose", value: "#C97B8B" },
                { name: "Champagne", value: "#E6D5B8" }
            ],
            sizes: [
                "30ml",
                "50ml",
                "100ml"
            ],
            material: ""
        },
        stock: 25,
        featured: false
    },

    // =====================================================
    // Product 8 - Burberry Her
    // =====================================================

    {
        id: "bu-fr-pe-008",
        title: "Burberry Her",
        titleKey: "burberryHer",
        category: "Beauty",
        categoryKey: "beautyFragrance",
        subCategory: "Fragrance",
        collection: "Perfume",
        collectionKey: "breadcrumbPerfume",
        price: 840,
        oldPrice: 940,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/1200x/89/f2/48/89f24891054466d2578459f7d07d0b1f.jpg",
            "https://i.pinimg.com/736x/80/98/ad/8098adca505ca2e3f3d8bc50b42aff2f.jpg",
            "https://i.pinimg.com/736x/5b/a6/2b/5ba62bfe672b9c6e298beb2092fe6358.jpg"
        ],
        video: "",
        shortDescription: "Fruity and elegant perfume with a youthful feminine character.",
        shortDescriptionKey: "burberryHerShortDescription",
        description: "A vibrant feminine fragrance with a fresh, fruity and elegant character.",
        descriptionKey: "burberryHerDescription",
        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Pink", value: "#E8A0B8" },
                { name: "Rose", value: "#B96A7A" },
                { name: "Burgundy", value: "#7A3045" }
            ],
            sizes: [
                "30ml",
                "50ml",
                "100ml"
            ],
            material: ""
        },
        stock: 23,
        featured: false
    }

];