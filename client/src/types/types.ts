
export interface GameData {
  id: string;
  title: string;
  waldoPosX: string;
  waldoPosY: string;
  wendaPosX?: string;
  wendaPosY?: string;
  wizardPosX?: string;
  wizardPosY?: string;
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