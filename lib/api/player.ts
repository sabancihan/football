import Player from 'models/Player';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import mongooseConnection from '@/lib/mongoose'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { UserProps } from './user';




export interface PlayerProps {
  name: string;
  username: string;
  image: string;
  bio: string;
  bioMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  rating : number;
  nationality : string;
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



  const ratingString = results?.rating ?  `Player rating ${results?.rating.toString()}` : "No rating available"


 


    






    


  if (results) {
    return {
      name: results.name,
      nationality: results.flag,
      username: results.slug,
      image: results.photo,
      rating: results.rating,
      bio: ratingString ,
      bioMdx: await getMdxSource(ratingString|| placeholderBio)
    };
  } else {
    return null;
  }

}

export async function getFirstPlayer(): Promise<PlayerProps | null> {

  await mongooseConnection;





  const results = await Player.findOne(
    {}).select({ _id: 0 }).lean();

    const ratingString =  `Player rating ${results?.rating.toString()}`


    if (results) {
      return {
        name: results.name,
        nationality: results.flag,
        username: results.slug,
        image: results.photo,
        rating: results.rating,
        bio: ratingString ,
        bioMdx: await getMdxSource(ratingString|| placeholderBio)
      };
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
          score: {
            $meta: 'searchScore'
          }
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
