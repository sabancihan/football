import { GetStaticProps } from 'next';
import Profile from '@/components/profile';
import {
  getAllPlayers,
  PlayerProps,
  getPlayerCount,
  getFirstPlayer
} from '@/lib/api/player';

import {
  UserProps
} from '@/lib/api/user';

import { defaultMetaProps } from '@/components/layout/meta';
import clientPromise from '@/lib/mongodb';

export default function Home({ player }: { player: PlayerProps }) {
  return <Profile player={player} settings={false} />;
}

export const getStaticProps: GetStaticProps = async () => {
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

  const results = await getAllPlayers();
  const totalPlayers = await getPlayerCount();
  const firstpPlayer = await getFirstPlayer();


  

  return {
    props: {
      meta: defaultMetaProps,
      results,
      totalPlayers,
      player: firstpPlayer
    },
    revalidate: 10
  };
};
