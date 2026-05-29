require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const BAAS_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'; // Abstract dark background
const SPRITE_IMAGE = 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800';
const VOITURE_IMAGE = 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800';

async function updateDB() {
    console.log("Updating images...");
    
    // Fix Sprite and Voiture
    await supabase.from('bot_products').update({ image_url: SPRITE_IMAGE }).eq('id', 'prod_sprite');
    await supabase.from('bot_products').update({ image_url: VOITURE_IMAGE }).eq('id', 'prod_voiture');

    // Fix BaaS packs
    const baasIds = ['baas_telegram', 'baas_whatsapp', 'baas_vip', 'baas_ultime'];
    for (const id of baasIds) {
        await supabase.from('bot_products').update({ image_url: BAAS_IMAGE }).eq('id', id);
    }

    console.log("Inserting modules sur mesure...");
    const modules = [
        {
            id: 'mod_livreur', name: '🚴 Système Console Livreur & Tracking', category: 'MODULES SUR MESURE', price: 200,
            description: 'Interface WebApp dédiée aux livreurs, suivi GPS en direct, calcul du temps estimé d\'arrivée (ETA) et chat de coordination sécurisé.',
            image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800', is_active: true, is_featured: false, priority: 6
        },
        {
            id: 'mod_vip', name: '👑 Programme VIP & Cashback Fidélité', category: 'MODULES SUR MESURE', price: 120,
            description: 'Système de paliers clients évolutifs (Bronze/Silver/Gold), génération de liens de parrainage et attribution automatique de solde fidélité.',
            image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800', is_active: true, is_featured: false, priority: 7
        }
    ];

    for (const mod of modules) {
        await supabase.from('bot_products').upsert(mod);
    }

    console.log("Updates completed successfully.");
}

updateDB().then(() => process.exit(0)).catch(e => {
    console.error(e);
    process.exit(1);
});
