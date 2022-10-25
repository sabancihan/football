import Player from 'models/Player';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import mongooseConnection from '@/lib/mongoose'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { UserProps } from './user';
import { PlayerStats } from 'responses/SportScore';




export interface PlayerProps {
  name: string;
  username: string;
  image: string;
  bio: string;
  bioMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  rating : number;
  nationality : string;
  statistics ?: PlayerStats;
}





export interface ResultProps {
  _id: string;
  players: PlayerProps[];
}

export async function getMdxSource(postContents: string) {
  // Use remark plugins to convert markdown into HTML string
  const processedContent = await remark()
    // Native remark plugin that parses markdown into MDX
    .use(remarkMdx)
    .process(postContents);

  // Convert converted html to string format
  const contentHtml = String(processedContent);

  // Serialize the content string into MDX
  const mdxSource = await serialize(contentHtml);

  return mdxSource;
}

export const placeholderBio = `
Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.

Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.`;

export async function getPlayer(slug: string): Promise<PlayerProps | null> {

  await mongooseConnection;



  const results = await Player.findOne({slug: slug}).select({ _id: 0 }).lean();

  const resultPlayer = results as PlayerProps;

  const details  = resultPlayer?.statistics?.details;




  const stats =  Object.assign({}, ...(details ?? []) as any);

  let customBio;


  if (stats) {
    customBio = `
    Goals: ${stats.goals} \n
    Assists: ${stats.assists} \n
    Rating: ${resultPlayer.statistics?.rating} \n
    Red Cards: ${stats.red_cards} \n
    Yellow Cards: ${stats.yellow_cards} \n
    Touches: ${stats.touches} \n
    Shots: ${stats.total_shots_per_game} \n
    Big Chances: ${stats.big_chance_created} \n
    Key Passes: ${stats.key_passes} \n
    Passes: ${stats.accurate_passes_per_game} \n
    Tackles: ${stats.tackles_per_game} \n
    Interceptions: ${stats.interceptions_per_game} \n
    Fouls: ${stats.fouls} \n
    Dribbles: ${stats.successful_dribbles_per_game} \n
    Aerials: ${stats.aerial_duels_won_per_game} \n
    Clearances: ${stats.total_clearances_per_game},
    `;


    

  }


  


  if (results) {
    const returnResult =  {
      name: results.name,
      nationality: results.flag,
      username: results.slug,
      image: results.photo,
      rating: results.rating,
      bio: customBio || placeholderBio,
      bioMdx: await getMdxSource(customBio|| placeholderBio),
      statistics: results?.statistics ?? null,
    };

    return returnResult;
    
    
  }

return null;





 


    






    




}

export async function getFirstPlayer(): Promise<PlayerProps | null> {

  await mongooseConnection;





  const results = await Player.findOne(
    {}).select({ _id: 0 }).lean();


    const resultPlayer = results as PlayerProps;

    const details  = resultPlayer?.statistics?.details;


    const stats =  details?.pop();

    let customBio;


    if (stats) {
      customBio = `
      Goals: ${stats.goals}
      Assists: ${stats.assists}
      Rating: ${resultPlayer.statistics?.rating}
      Red Cards: ${stats.red_cards}
      Yellow Cards: ${stats.yellow_cards}
      Touches: ${stats.touches}
      Shots: ${stats.total_shots_per_game},
      Big Chances: ${stats.big_chance_created},
      Key Passes: ${stats.key_passes},
      Passes: ${stats.accurate_passes_per_game},
      Tackles: ${stats.tackles_per_game},
      Interceptions: ${stats.interceptions_per_game},
      Fouls: ${stats.fouls},
      Dribbles: ${stats.successful_dribbles_per_game},
      Aerials: ${stats.aerial_duels_won_per_game},
      Clearances: ${stats.total_clearances_per_game},
      `;


      

    }


    


    if (results) {
      const returnResult =  {
        name: results.name,
        nationality: results.flag,
        username: results.slug,
        image: results.photo,
        rating: results.rating,
        bio: customBio || placeholderBio,
        bioMdx: await getMdxSource(customBio|| placeholderBio),
        statistics: results?.statistics ?? null,
      };

      return returnResult;
      
      
    }

  return null;
}

export async function getAllPlayers(): Promise<ResultProps[]> {

  await mongooseConnection;
 




  const result =  await Player
    .aggregate([
      {
        //sort by rating
        $sort: {
          rating: -1
        }
      },
      {
        $limit: 1000
      },
      {
        $group: {
          _id: {
            $toLower: { $substrCP: ['$name', 0, 1] }
          },
          players: {
            $push: {
              name: '$name',
              username: '$slug',
              nationality: '$flag',
              image: '$photo',
              rating: '$rating',
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        //sort alphabetically
        $sort: {
          _id: 1
        }
      }
    ])

    return result
}

export async function searchPlayer(query: string): Promise<UserProps[]> {


  await mongooseConnection;
  


  const results =   await Player
    .aggregate([
      {
        $search: {
          index: 'name-index',
          /* 
          name-index is a search index as follows:
          */

      
          
          text: {
            query: query,
            path: {
              wildcard: '*' // match on both name and username
            },
            fuzzy: {},
          }
        }
      },
      // limit to 10 results
      {
        $limit: 10  
      },
      {
        $project: {
          _id: 0,
          name: '$name',
          username: '$slug',
          nationality: '$flag',
          image: '$photo',
          rating: '$rating',
        }
      } 
    ])

    return results
}

export async function getPlayerCount(): Promise<number> {

  await mongooseConnection;

  const  playerCount = await Player.countDocuments().lean();


  return playerCount;
}

export async function updatePlayer(slug: string, bio: string) {

  await mongooseConnection;

  return await Player.updateOne({ slug }, { $set: { bio } });
}
