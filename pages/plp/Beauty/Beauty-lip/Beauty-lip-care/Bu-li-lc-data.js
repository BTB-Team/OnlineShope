// Bu-li-lc-data.js

// =====================================================
// Beauty Lip - Lip Care Products Mock Data
// Used for PLP Type B Product Listing Page
// =====================================================

export const lipCareProducts = [

    // =====================================================
    // Product 1 - Lip Balm
    // =====================================================

    {
        id: "bu-li-lc-001",
        title: "Lip Balm",
        titleKey: "lipBalm",
        category: "Beauty",
        categoryKey: "beautyLip",
        collection: "Lip Care",
        collectionKey: "breadcrumbLipCare",
        price: 150,
        oldPrice: 180,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/736x/20/09/08/200908acc54c815ab9636f63ad886193.jpg",
            "https://i.pinimg.com/736x/2a/d2/d7/2ad2d79a7cd99340765e6ec2ff1f23e9.jpg"
        ],
        video: "",
        shortDescription: "Moisturizing lip balm for soft and hydrated lips.",
        shortDescriptionKey: "lipBalmShortDescription",
        description: "A nourishing lip balm designed to keep lips soft, smooth, and hydrated.",
        descriptionKey: "lipBalmDescription",

        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Clear", value: "#e9d6d6" },
                { name: "Rose Pink", value: "#E01F4C" },
                { name: "Peach", value: "#FFAB91" }
            ],
            sizes: "",
            material: ""
        },

        stock: 30,
        featured: true
    },

    // =====================================================
    // Product 2 - Lip Sleeping Mask
    // =====================================================

    {
        id: "bu-li-lc-002",
        title: "Lip Sleeping Mask",
        titleKey: "lipSleepingMask",
        category: "Beauty",
        categoryKey: "beautyLip",
        collection: "Lip Care",
        collectionKey: "breadcrumbLipCare",
        price: 220,
        oldPrice: 260,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/1200x/cd/6a/c1/cd6ac109e2679db4dcf36253ada8eda6.jpg",
            "https://i.pinimg.com/736x/af/73/ff/af73ff7571320908ddf59179d2dc576f.jpg"
        ],
        video: "",
        shortDescription: "Overnight lip mask for soft and nourished lips.",
        shortDescriptionKey: "lipSleepingMaskShortDescription",
        description: "A rich overnight lip mask that helps keep lips soft, smooth, and comfortable.",
        descriptionKey: "lipSleepingMaskDescription",

        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Rose", value: "#D98A9A" },
                { name: "Berry", value: "#8E244D" },
                { name: "Peach", value: "#FFAB91" }
            ],
            sizes: "",
            material: ""
        },

        stock: 25,
        featured: true
    },

    // =====================================================
    // Product 3 - Lip Scrub
    // =====================================================

    {
        id: "bu-li-lc-003",
        title: "Lip Scrub",
        titleKey: "lipScrub",
        category: "Beauty",
        categoryKey: "beautyLip",
        collection: "Lip Care",
        collectionKey: "breadcrumbLipCare",
        price: 170,
        oldPrice: 200,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/736x/63/01/11/6301116453fc45a0405e28c79e87650c.jpg",
            "https://i.pinimg.com/1200x/73/a7/83/73a7839aecbad032eb844361f370e811.jpg"
        ],
        video: "",
        shortDescription: "Gentle lip scrub for smoother lips.",
        shortDescriptionKey: "lipScrubShortDescription",
        description: "A gentle lip scrub designed to remove dry surface skin and leave lips smooth.",
        descriptionKey: "lipScrubDescription",

        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Pink", value: "#F48FB1" },
                { name: "Peach", value: "#FFAB91" },
                { name: "Rose", value: "#D98A9A" }
            ],
            sizes: "",
            material: ""
        },

        stock: 20,
        featured: false
    },

    // =====================================================
    // Product 4 - Lip Oil
    // =====================================================

    {
        id: "bu-li-lc-004",
        title: "Lip Oil",
        titleKey: "lipOil",
        category: "Beauty",
        categoryKey: "beautyLip",
        collection: "Lip Care",
        collectionKey: "breadcrumbLipCare",
        price: 190,
        oldPrice: 230,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/736x/4d/a4/15/4da415ee379ac10f77e2678cd5d86ed9.jpg",
            "https://i.pinimg.com/736x/57/5c/68/575c685e3e3752ba76ca8fd14a806373.jpg"
        ],
        video: "",
        shortDescription: "Lightweight lip oil for soft and glossy lips.",
        shortDescriptionKey: "lipOilShortDescription",
        description: "A lightweight lip oil that helps nourish lips while providing a smooth glossy finish.",
        descriptionKey: "lipOilDescription",

        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Clear", value: "#e2c7b8c0" },
                { name: "Rose Pink", value: "#E01F4C" },
                { name: "Nude", value: "#C8A27A" }
            ],
            sizes: "",
            material: ""
        },

        stock: 24,
        featured: true
    },

    // =====================================================
    // Product 5 - Lip Treatment
    // =====================================================

    {
        id: "bu-li-lc-005",
        title: "Lip Treatment",
        titleKey: "lipTreatment",
        category: "Beauty",
        categoryKey: "beautyLip",
        collection: "Lip Care",
        collectionKey: "breadcrumbLipCare",
        price: 240,
        oldPrice: 280,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/1200x/c5/92/eb/c592ebe03554ddab50ba0b2b3cf31125.jpg",
            "https://i.pinimg.com/1200x/6e/b6/09/6eb6090f85e91d893395afdcb71743ab.jpg",
            "https://i.pinimg.com/736x/10/53/05/10530554000eb7fa47e59e8ccafcbb1e.jpg"
        ],
        video: "",
        shortDescription: "Nourishing lip treatment for dry lips.",
        shortDescriptionKey: "lipTreatmentShortDescription",
        description: "A nourishing lip treatment designed to care for dry and uncomfortable lips.",
        descriptionKey: "lipTreatmentDescription",

        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Nude", value: "#C8A27A" },
                { name: "Rose", value: "#D98A9A" },
                { name: "Berry", value: "#8E244D" }
            ],
            sizes: "",
            material: ""
        },

        stock: 18,
        featured: true
    },

    // =====================================================
    // Product 6 - Lip Moisturizer
    // =====================================================

    {
        id: "bu-li-lc-006",
        title: "Lip Moisturizer",
        titleKey: "lipMoisturizer",
        category: "Beauty",
        categoryKey: "beautyLip",
        collection: "Lip Care",
        collectionKey: "breadcrumbLipCare",
        price: 160,
        oldPrice: 190,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/736x/e2/a3/dd/e2a3dd0049641037cfabaa8479e3ca8f.jpg",
            "https://i.pinimg.com/736x/a4/66/e9/a466e93a263f488daff238edf18778fd.jpg"
        ],
        video: "",
        shortDescription: "Daily lip moisturizer for smooth and hydrated lips.",
        shortDescriptionKey: "lipMoisturizerShortDescription",
        description: "A daily lip moisturizer that helps maintain soft and hydrated lips.",
        descriptionKey: "lipMoisturizerDescription",

        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Clear", value: "#ddc6c6" },
                { name: "Pink", value: "#FF69B4" },
                { name: "Peach", value: "#FFAB91" }
            ],
            sizes: "",
            material: ""
        },

        stock: 28,
        featured: false
    },

    // =====================================================
    // Product 7 - Lip Conditioner
    // =====================================================

    {
        id: "bu-li-lc-007",
        title: "Lip Conditioner",
        titleKey: "lipConditioner",
        category: "Beauty",
        categoryKey: "beautyLip",
        collection: "Lip Care",
        collectionKey: "breadcrumbLipCare",
        price: 180,
        oldPrice: 220,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/1200x/b8/c6/3d/b8c63d7a3a15a02ce09ed22643d56d1d.jpg",
            "https://i.pinimg.com/736x/50/af/63/50af6329d7552c3576db8bce086c4d42.jpg"
        ],
        video: "",
        shortDescription: "Softening lip conditioner for daily care.",
        shortDescriptionKey: "lipConditionerShortDescription",
        description: "A lightweight lip conditioner that helps keep lips soft, smooth, and comfortable.",
        descriptionKey: "lipConditionerDescription",

        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Rose Pink", value: "#E01F4C" },
                { name: "Soft Pink", value: "#F48FB1" },
                { name: "Nude", value: "#C8A27A" }
            ],
            sizes: "",
            material: ""
        },

        stock: 22,
        featured: false
    },

    // =====================================================
    // Product 8 - Lip Repair Balm
    // =====================================================

    {
        id: "bu-li-lc-008",
        title: "Lip Repair Balm",
        titleKey: "lipRepairBalm",
        category: "Beauty",
        categoryKey: "beautyLip",
        collection: "Lip Care",
        collectionKey: "breadcrumbLipCare",
        price: 210,
        oldPrice: 250,
        badge: "SALE",
        images: [
            "https://i.pinimg.com/1200x/69/26/6c/69266c261972d8646c49648b64c5567e.jpg",
            "https://i.pinimg.com/1200x/3f/78/7d/3f787d7db28dbcee3335d98935ef7ade.jpg"
        ],
        video: "",
        shortDescription: "Repairing lip balm for dry and damaged lips.",
        shortDescriptionKey: "lipRepairBalmShortDescription",
        description: "A repairing lip balm designed to help care for dry and damaged lips.",
        descriptionKey: "lipRepairBalmDescription",

        specifications: {
            category: "Beauty",
            gender: "Women",
            color: [
                { name: "Clear", value: "#dab3b3" },
                { name: "Rose", value: "#D98A9A" },
                { name: "Berry", value: "#8E244D" }
            ],
            sizes: "",
            material: ""
        },

        stock: 20,
        featured: true
    }

];