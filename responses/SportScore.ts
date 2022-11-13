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


export interface Player {
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
  statistics ?: PlayerStats;
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


export interface PlayerStats {
  id: number;
  player_id: number;
  season_id: number;
  details: Detail[];
  rating?: number;
  season: Season;
}

interface Season {
  id: number;
  league_id: number;
  slug: string;
  name: string;
  year_start: number;
  year_end?: number;
}

interface Detail {
  statistics_items: Statisticsitem[];
  matches_total?: string;
  matches_starting?: string;
  minutes_per_game?: string;
  group_name: string;
  goals?: string;
  goals_frequency?: string;
  goals_average?: string;
  total_shots_per_game?: string;
  big_chance_missed?: string;
  more?: More;
  assists?: string;
  touches?: string;
  big_chance_created?: string;
  key_passes?: string;
  accurate_passes_per_game?: string;
  successful_passes_own_half?: string;
  successful_passes_opposition_half?: string;
  successful_long_passes?: string;
  accurate_chipped_passes?: string;
  successful_crosses_and_corners?: string;
  interceptions_per_game?: string;
  tackles_per_game?: string;
  possession_won_final_third?: string;
  challenges_lost_per_game?: string;
  total_clearances_per_game?: string;
  error_lead_to_a_shot?: string;
  error_lead_toa_goal?: string;
  penalties_conceded?: string;
  successful_dribbles_per_game?: string;
  duels_won_per_game?: string;
  ground_duels_won_per_game?: string;
  aerial_duels_won_per_game?: string;
  possession_lost?: string;
  fouls?: string;
  was_fouled?: string;
  offsides?: string;
  yellow_cards?: string;
  yellow_red_cards?: string;
  red_cards?: string;
}

interface More {
  statistics_items: Statisticsitem2[];
  goal_conversion: string;
  penalties: string;
  penalties_conversion: string;
  set_piece_goals: string;
  set_pieces_conversion: string;
  goals_inside_box: string;
  goals_outside_box: string;
  headed_goals: string;
  left_foot_goals: string;
  right_foot_goals: string;
  penalty_won: string;
  group_name: string;
}

interface Statisticsitem2 {
  goal_conversion?: string;
  penalties?: string;
  penalties_conversion?: string;
  set_piece_goals?: string;
  set_pieces_conversion?: string;
  goals_inside_box?: string;
  goals_outside_box?: string;
  headed_goals?: string;
  left_foot_goals?: string;
  right_foot_goals?: string;
  penalty_won?: string;
}

interface Statisticsitem {
  matches_total?: string;
  matches_starting?: string;
  minutes_per_game?: string;
  goals?: string;
  goals_frequency?: string;
  goals_average?: string;
  total_shots_per_game?: string;
  big_chance_missed?: string;
  assists?: string;
  touches?: string;
  big_chance_created?: string;
  key_passes?: string;
  accurate_passes_per_game?: string;
  successful_passes_own_half?: string;
  successful_passes_opposition_half?: string;
  successful_long_passes?: string;
  accurate_chipped_passes?: string;
  successful_crosses_and_corners?: string;
  interceptions_per_game?: string;
  tackles_per_game?: string;
  possession_won_final_third?: string;
  challenges_lost_per_game?: string;
  total_clearances_per_game?: string;
  error_lead_to_a_shot?: string;
  error_lead_toa_goal?: string;
  penalties_conceded?: string;
  successful_dribbles_per_game?: string;
  duels_won_per_game?: string;
  ground_duels_won_per_game?: string;
  aerial_duels_won_per_game?: string;
  possession_lost?: string;
  fouls?: string;
  was_fouled?: string;
  offsides?: string;
  yellow_cards?: string;
  yellow_red_cards?: string;
  red_cards?: string;
}
