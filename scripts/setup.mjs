import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import axios from 'axios';

const baseUrl = "https://api.sofascore.com/api/v1"

const topPlayers =  `${baseUrl}/unique-tournament/52/season/42632/statistics?limit=10&order=-goals&group=summary`




dotenv.config();
const setup = async () => {
  let client;
  try {
    client = new MongoClient(process.env.MONGODB_URI);
     await client.connect();

     const hasData = await client
       .db('football')
       .collection('users')
       .countDocuments();

    if (hasData) {
      console.log('Database already exists with data');
      client.close();
      return;
    }


    const top10 = await axios.get(topPlayers);

    const topPlayerInfo = await Promise.all(top10.data.map(
      (stat) => axios.get(`${baseUrl}/${stat.player.id}`)
    ));

    const records = topPlayerInfo.map((record) => {
      const player = record.data.player;
      return {
        name: player.name,
        username : player.slug,
        email : player.team.name,
        image : `${baseUrl}/${player.id}/image`,
        followers : faker.random.number(1000),
        emailVerified : null
      }
    })


    const insert = await client
      .db('football')
      .collection('users')
      .insertMany(records);
    if (insert.acknowledged) {
      console.log('Successfully inserted records');
    }
  } catch (error) {
    return 'Database is not ready yet';
  } finally {
    if (client) {
      await client.close();
    }
  }
};
try {
  setup();
} catch {
  console.warn('Database is not ready yet. Skipping seeding...');
}
export { setup };