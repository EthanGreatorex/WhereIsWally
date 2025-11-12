export interface Target {
  name: string;
  x: number; 
  y: number;  
  width: number;  
  height: number;  
}

export interface GameData {
  id: string;
  title: string;
  positionX: string;
  positionY: string;
  imageUrl: string;
  image?: string;
  targets?: Target[];
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