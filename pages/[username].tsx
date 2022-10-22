import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps } from 'next';
import { defaultMetaProps } from '@/components/layout/meta';
import { getFirstPlayer, getAllPlayers, getPlayer, getPlayerCount } from '@/lib/api/player';
export { default } from '.';
import clientPromise from '@/lib/mongodb';

interface Params extends ParsedUrlQuery {
  username: string;
}

export const getStaticPaths = async () => {
  // You should remove this try-catch block once your MongoDB Cluster is fully provisioned
  try {
    await clientPromise;
  } catch (e: any) {
    // cluster is still provisioning
    return {
      paths: [],
      fallback: true
    };
  }


  const results = await getAllPlayers();
  const paths = results.flatMap(({ players }) =>
    players.map((player) => ({ params: { username: player.username } }))
  );


    
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {


  // You should remove this try-catch block once your MongoDB Cluster is fully provisioned
  try {
    await clientPromise;
  } catch (e: any) {
    if (e.code === 'ENOTFOUND') {
      // cluster is still provisioning
      return {
        props: {
          clusterStillProvisioning: true
        }
      };
    } else {
      throw new Error(`Connection limit reached. Please try again later.`);
    }
  }

  const { username } = context.params as Params;

  const player = await getPlayer(username);

  console.log(player, 'player');



  

  if (!player) {
    return {
      notFound: true,
      revalidate: 10
    };
  }

  

  const results = await getAllPlayers();
  const totalPlayers = await getPlayerCount();

  const ogUrl = `https://mongodb.vercel.app/${player.username}`;
  const meta = {
    ...defaultMetaProps,
    title: `${player.name}'s Profile`,
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl: `https://mongodb.vercel.app/${player.username}`
  };


  return {
    props: {
      meta,
      results,
      totalPlayers,
      player
    },
    revalidate: 10
  };
};
