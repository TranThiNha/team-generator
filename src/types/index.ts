export type Player = {
  id: number;
  name: string;
  avt: string;
  score?: number;
};

export type TeamName = {
  key: number;
  name: string;
};

export type Team = {
  players: Player[];
  totalScore: number;
  name: string;
};
