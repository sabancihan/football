import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { sportScoreApi } from 'helpers/AxiosInterceptor';
import {SportScore} from "../config/ApiConfig.json"
 
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


    const superLeaguetTeams = await sportScoreApi.get(`seasons/${SportScore.superLeagueSeasonId}/teams`)


    const teamIdList = superLeaguetTeams.data.data.teams.map(team => team.id)


    while (teamIdList) {
      const teamsOfPlayers =  await Promise.all(teamIdList.splice(0,SportScore.requestPerSecond).map(async teamId => {
        return  sportScoreApi.get(`teams/${teamId}/players`)
    }))

    const insert = await client
    .db('football')
    .collection('players')
    .insertMany(teamsOfPlayers.map(team => team.data.data));

    await new Promise(r => setTimeout(r, 1500));
  }


    

  
    const insert = await client
      .db('football')
      .collection('players')
      .insertMany(playerlist);
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