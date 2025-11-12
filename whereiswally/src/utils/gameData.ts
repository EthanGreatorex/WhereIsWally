import type { GameData, LeaderBoardEntry } from "../types/types";

export async function fetchGameData(gameId: string) {
  // Fetch data from API
  try {
    const response = await fetch(`http://localhost:3000/games/${gameId}`);
    if (response.status === 200) {
      const data: GameData = await response.json();
      return data;
    } else {
      throw new Error(
        `Failed to fetch game data, status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching game data:", error);
    return "Error fetching data";
  }
}

export async function fetchLeaderboard(
  gameId: string
): Promise<LeaderBoardEntry[] | string> {
  // Fetch leaderboard data from API and normalize to LeaderBoardEntry[]
  try {
    const response = await fetch(
      `http://localhost:3000/games/leaderboard/${gameId}`
    );
    if (response.status === 200) {
      const data = await response.json();
      
      let entries: unknown[] = [];
      if (Array.isArray(data)) entries = data as unknown[];
      else if (data && typeof data === "object") entries = [data as unknown];

      const normalized: LeaderBoardEntry[] = entries.map((e) => {
        const rec = e as Record<string, unknown>;
        const username =
          (rec.playerName as string) ??
          (rec.username as string) ??
          (rec.name as string) ??
          "Unknown";
        // try to parse time (could be string like "90" or number)
        const rawTime = rec.time as unknown;
        const timeNum =
          typeof rawTime === "number"
            ? (rawTime as number)
            : parseInt(String(rawTime || "0"), 10) || 0;
        return {
          id: rec.id as string | undefined,
          username,
          time: timeNum,
          gameId: rec.gameId as string | undefined,
        };
      });

      return normalized;
    } else {
      throw new Error(
        `Failed to fetch leaderboard data, status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return "Error fetching leaderboard data";
  }
}
