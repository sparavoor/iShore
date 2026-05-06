const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_rl34kSZQRbWC@ep-summer-lab-a1i13qpb-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
});

async function run() {
  try {
    await client.connect();
    const res = await client.query("SELECT * FROM \"site_content\" WHERE section = 'home_hero'");
    if (res.rows.length > 0) {
      const data = res.rows[0].data;
      data.image = '/hero-bg.png';
      await client.query("UPDATE \"site_content\" SET data = $1 WHERE section = 'home_hero'", [data]);
      console.log('Database updated successfully.');
    } else {
      console.log('Section home_hero not found.');
    }
  } catch (err) {
    console.error('Error updating database:', err);
  } finally {
    await client.end();
  }
}
run();
