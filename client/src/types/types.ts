
export interface GameData {
  id: string;
  title: string;
  positionX: string;
  positionY: string;
  imageUrl: string;
  image?: string;
}

export interface LeaderBoardData{
    id: string;
    playerName: string;
    time: string;
    gameId: string;
}

export interface LeaderBoardEntry {
  id?: string;
  username: string; 
  time: number;
  gameId?: string;
}