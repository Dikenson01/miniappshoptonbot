require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updatePassword() {
    console.log("Updating admin password...");
    
    const { data, error } = await supabase
        .from('bot_settings')
        .update({ admin_password: 'admin2442' })
        .neq('id', 'dummy_id'); // Updates all rows (there is usually only 1 settings row)
    
    if (error) {
        console.error("Error updating password:", error);
    } else {
        console.log("Password successfully updated to admin2442.");
    }
}

updatePassword().then(() => process.exit(0));
