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
We have not yet written a bio for this player. If you are this player, please contact us at [`;

export async function getPlayer(slug: string): Promise<PlayerProps | null> {

  await mongooseConnection;



  const results = await Player.findOne({slug: slug}).select({ _id: 0 }).lean();

  const resultPlayer = results as PlayerProps;

  const details  = resultPlayer?.statistics?.details;




  const stats =  Object.assign({}, ...(details ?? []) as any);

  let customBio;

 


  if (stats) {
    customBio =   Object.entries(stats).filter(([key,value]) => value !== Object(value)).map(([key,value]) =>  `${key.split('_').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')} : ${value}`).join('<br/>')

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



    const stats =  Object.assign({}, ...(details ?? []) as any);

    let customBio;
  
   
  
  
    if (stats) {
      customBio =   Object.entries(stats).filter(([key,value]) => value !== Object(value)).map(([key,value]) =>  `${key.split('_').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')} : ${value}`).join('<br/>')
  
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
 




  const results =  await Player
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



    


    

    

    return results;

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
        $limit: 1000  
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

    

    

    

    return results;
}

export async function getPlayerCount(): Promise<number> {

  await mongooseConnection;

  const  playerCount = await Player.count().lean();


  return playerCount;
}

export async function updatePlayer(slug: string, bio: string) {

  await mongooseConnection;

  return await Player.updateOne({ slug }, { $set: { bio } });
}
