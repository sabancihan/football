import Link from 'next/link';


const Index = () => {

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
          <Link href="/super">
            <a>Ratings</a>
          </Link>          
        </li>

        <li>
          <span role="img" aria-label="rating">
           ⚽
          </span>{' '}
          <Link href="/topscorers">
            <a>Top Scorers</a>
          </Link>          
          
        </li>

        <li>
          <span role="img" aria-label="rating">
          💰
          </span>{' '}
          <Link href="/market_values">
            <a>Market Values</a>
          </Link>       
          
        </li>
        
      </ul>
      
    </div>
  );
};

export default Index;