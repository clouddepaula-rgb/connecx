const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkSchema() {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { data, error } = await supabase.from('portfolio_projects').select('*').limit(1);
  
  if (error) {
    console.error('Erro:', error);
    return;
  }
  
  if (data && data.length > 0) {
    console.log('Colunas de portfolio_projects:', Object.keys(data[0]));
  } else {
    console.log('Nenhum dado encontrado em portfolio_projects para checar colunas.');
  }
}

checkSchema();
