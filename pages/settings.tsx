import { GetServerSideProps } from 'next';
import Profile from '@/components/profile';
import { defaultMetaProps } from '@/components/layout/meta';
import { getUser, getAllUsers, UserProps, getUserCount } from '@/lib/api/user';
import { getSession } from 'next-auth/react';
import { PlayerProps } from '@/lib/api/player';

export default function Settings({ player }: { player: PlayerProps }) {
  return <Profile settings={true} player={player} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }

  const results = await getAllUsers();
  const totalUsers = await getUserCount();

  const user = await getUser(session.user.username as string);

  const meta = {
    ...defaultMetaProps,
    title: `Settings | MongoDB Starter Kit`
  };

  return {
    props: {
      meta,
      results,
      totalUsers,
      user
    }
  };
};
