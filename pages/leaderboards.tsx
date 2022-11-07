import { useRouter } from 'next/router';



const Index = () => {
  const router = useRouter();

  return (
    <div>
      
      <h1 className="text-2xl font-bold">
        Leaderboards
      </h1>
      
      <ul>
        <li>
          <span role="img" aria-label="rating">
            🔥
          </span>{' '}
          <a href="/super" rel="nofollow">
            Ratings
          </a>{' '}
          
        </li>

        <li>
          <span role="img" aria-label="rating">
           ⚽
          </span>{' '}
          <a href="/topscorers" rel="nofollow">
            Top Scorers
          </a>{' '}
          
        </li>

        <li>
          <span role="img" aria-label="rating">
          💰
          </span>{' '}
          <a href="/market_values" rel="nofollow">
            Market Value
          </a>{' '}
          
        </li>
        
      </ul>
      
    </div>
  );
};

export default Index;