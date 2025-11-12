// IMPORTS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameData } from "../utils/gameData";
import type { GameData } from "../types/types";
import GameCanvas from "../components/GameCanvas";

export default function Game() {
  // Variables
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Get the game ID from the URL params
  const { id } = useParams();

  // Fetch the game data
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      // Fetch game data based on id
      const data = await fetchGameData(id);
      if (typeof data === "string") {
        console.error(data);
        return;
      }
      setGameData(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div
          className="container w-25 p-2 rounded-3 bg-primary"
          style={{ marginTop: "25vh" }}
        >
          <h2 className="text-center text-white">Loading...</h2>
          <p className="text-white-50">
            Try refreshing the page if it takes too long.
          </p>
        </div>
      ) : gameData && id ? (
        <GameCanvas gameData={gameData} gameId={id} />
      ) : (
        <div
          className="container w-25 p-2 rounded-3 bg-primary"
          style={{ marginTop: "25vh" }}
        >
          <h2 className="text-center text-white">Error Loading Game</h2>
          <p className="text-white-50">
            Could not load game data. Please try again.
          </p>
        </div>
      )}
    </>
  );
}
