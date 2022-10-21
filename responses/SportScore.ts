export interface TeamList {
  data: Team[];
}


interface Team {
  id: number;
  sport_id: number;
  category_id: number;
  venue_id: number;
  manager_id: number;
  slug: string;
  name: string;
  has_logo: boolean;
  logo: string;
  name_short: string;
  name_full: string;
  name_code: string;
  has_sub: boolean;
  gender: string;
  is_nationality: boolean;
  country_code: string;
  country: string;
  flag: string;
  foundation?: string;
  details?: any;
}


export interface TeamPlayers {
  data: Player[];
}


interface Player {
  id: number;
  sport_id: number;
  slug: string;
  name: string;
  name_short: string;
  has_photo: boolean;
  photo: string;
  position?: string;
  position_name?: string;
  weight?: number;
  age: number;
  date_birth_at: string;
  height: number;
  shirt_number?: number;
  preferred_foot?: string;
  nationality_code: string;
  flag: string;
  market_currency: string;
  market_value?: number;
  contract_until: string;
  rating?: number;
  characteristics?: Characteristic;
  positions?: Position;
  ability?: Ability[];
}

interface Ability {
  name: string;
  value: number;
  full_average: number;
}

interface Position {
  main: string[] | string;
}

interface Characteristic {
  positive?: Positive[];
  negative?: Positive[];
}

interface Positive {
  feature: string;
  value: number;
}

