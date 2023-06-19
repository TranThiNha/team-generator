export type Player = {
  id: number;
  name: string;
  avt: string;
  score?: number;
  isAdding?: boolean;
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
