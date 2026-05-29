require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
    {
        id: 'prod_montre',
        name: 'Montre de Luxe',
        description: 'Une superbe montre élégante pour toutes les occasions.',
        price: 150.00,
        category: 'Accessoires',
        image_url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800',
        stock: 50,
        is_active: true
    },
    {
        id: 'prod_sprite',
        name: 'Sprite (Canette 33cl)',
        description: 'Boisson rafraîchissante au citron et citron vert.',
        price: 2.00,
        category: 'Boissons',
        image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800',
        stock: 100,
        is_active: true
    },
    {
        id: 'prod_voiture',
        name: 'Voiture Sportive',
        description: 'Un véhicule puissant et racé.',
        price: 15000.00,
        category: 'Véhicules',
        image_url: 'https://images.unsplash.com/photo-1503376713180-2a95c43493e9?w=800',
        stock: 2,
        is_active: true
    },
    {
        id: 'prod_farine',
        name: 'Sac de Farine (1kg)',
        description: 'Farine de blé T55 pour toutes vos préparations.',
        price: 1.50,
        category: 'Épicerie',
        image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
        stock: 200,
        is_active: true
    },
    {
        id: 'prod_shampoing',
        name: 'Shampoing Doux',
        description: 'Soin capillaire pour un usage quotidien.',
        price: 5.00,
        category: 'Hygiène',
        image_url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800',
        stock: 80,
        is_active: true
    },
    {
        id: 'prod_baguette',
        name: 'Baguette Tradition',
        description: 'Baguette fraîche cuite au four.',
        price: 1.20,
        category: 'Boulangerie',
        image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800',
        stock: 40,
        is_active: true
    },
    // BaaS Formulas
    {
        id: 'baas_telegram',
        name: 'Pack Telegram',
        description: 'Les mêmes fonctionnalités que le bot Farmstegridy_bot (Boutique, Panier, Commandes, etc.).',
        price: 300.00,
        category: 'BAAS',
        image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        stock: 999,
        is_active: true
    },
    {
        id: 'baas_whatsapp',
        name: 'Pack WhatsApp',
        description: 'Farmstegridy_bot + la connexion et la mise en place de WhatsApp.',
        price: 500.00,
        category: 'BAAS',
        image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        stock: 999,
        is_active: true
    },
    {
        id: 'baas_vip',
        name: 'Offre VIP (Pack sur mesure)',
        description: 'WhatsApp + Telegram + 3 fonctionnalités supplémentaires de votre choix (on s\'adapte à vos demandes).',
        price: 850.00,
        category: 'BAAS',
        image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        stock: 999,
        is_active: true
    },
    {
        id: 'baas_ultime',
        name: 'Pack Ultime (Totalement sur mesure)',
        description: 'Base de Telegram + WhatsApp, totalement sur mesure. On fait tout ce qui est possible, on modifie tout en gardant la structure, avec la possibilité du bot à la carte.',
        price: 1500.00,
        category: 'BAAS',
        image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        stock: 999,
        is_active: true
    }
];

async function updateCatalog() {
    console.log("Starting catalog update...");
    
    // Deactivate old products if we want a fresh catalog, or just delete them
    // For safety, let's just delete the existing bot_products to have a clean slate as requested
    const { error: delError } = await supabase.from('bot_products').delete().neq('id', 'dummy_id');
    if (delError) {
        console.error("Error clearing old products:", delError);
    } else {
        console.log("Old products cleared.");
    }

    const { data, error } = await supabase.from('bot_products').insert(products);
    
    if (error) {
        console.error("Error inserting products:", error);
    } else {
        console.log("Successfully inserted", products.length, "products.");
    }
}

updateCatalog().then(() => process.exit(0));
