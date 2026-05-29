require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Image on black background (dark abstract/tech instead of circuit boards)
const DARK_IMAGE_URL = 'https://images.unsplash.com/photo-1614064082855-871d374fbdb2?w=800';

async function updateBaasProducts() {
    console.log("Updating BaaS products prices and images...");
    
    // Update baas_telegram
    await supabase.from('bot_products').update({ 
        price: 450,
        image_url: DARK_IMAGE_URL
    }).eq('id', 'baas_telegram');

    // Update baas_whatsapp
    await supabase.from('bot_products').update({ 
        price: 650,
        image_url: DARK_IMAGE_URL
    }).eq('id', 'baas_whatsapp');

    // Update images for other baas products
    await supabase.from('bot_products').update({ 
        image_url: DARK_IMAGE_URL
    }).eq('id', 'baas_vip');

    await supabase.from('bot_products').update({ 
        image_url: DARK_IMAGE_URL
    }).eq('id', 'baas_ultime');

    console.log("Updates completed.");
}

updateBaasProducts().then(() => process.exit(0));
