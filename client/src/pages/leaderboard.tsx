// IMPORTS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import type { GameData, LeaderBoardEntry } from "../types/types";
import Logo from "../assets/logo-bg-removed.png";
import { FaTrophy } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { fetchLeaderboard, fetchGameData } from "../utils/gameData";

export default function Leaderboard() {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [leaderBoardData, setLeaderBoardData] = useState<LeaderBoardEntry[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Get the game ID from the URL params
  const { id } = useParams();

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  // This will take the user to the game
  const navigateToGame = (game: string) => {
    navigate(`/games/${game}`);
  };

  // This will take a seconds amount e.g., 70 and return a minute format e.g., 01:10
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:
${String(secs).padStart(2, "0")}`.replace(/\n/, "");
  };

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

  // Fetch the leaderboard data for that game
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const data = await fetchLeaderboard(id);
      if (typeof data === "string") {
        console.error(data);
        setLeaderBoardData([]);
        return;
      }
      setLeaderBoardData(data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center ">
        <img
          src={Logo}
          alt="logo"
          className="me-3 img-hover"
          style={{ width: 128, height: 128, objectFit: "contain" }}
          onClick={() => navigateHome()}
        />
        <h1 className="mb-0 text-white">{gameData?.title}</h1>
      </div>

      <div className="alert alert-primary mt-3" role="alert">
        Want to get your name on the leaderboard? Hit play to take your chance!
      </div>
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
      ) : (
        <div
          className="container card-hover text-center rounded-3 bg-primary p-3 mt-3 focus-ring"
          tabIndex={0}
          style={{ maxWidth: "600px" }}
        >
          <img
            src={gameData?.imageUrl}
            className="rounded-2 img-fluid"
            alt="movie set wally image"
            style={{ height: "350px" }}
          />

          <h2 className="text-white mt-2">
            <FaTrophy className="me-2" style={{ color: "orange" }} />
            Leaderboard
            <FaTrophy className="ms-2" style={{ color: "orange" }} />
          </h2>
          <p className="text-white-50">Top 5 Players</p>
          <hr className="text-white" />
          <div>
            {leaderBoardData.length === 0 ? (
              <div className="text-center text-white-50">No entries yet</div>
            ) : (
              leaderBoardData.map((entry, index) => (
                <div
                  key={entry.id ?? index}
                  className="d-flex justify-content-between align-items-center mb-2 text-white p-2"
                >
                  <span>
                    {index + 1}. {entry.username}
                  </span>
                  <span>
                    <strong>
                      <MdOutlineAccessTimeFilled /> {formatTime(entry.time)}
                    </strong>
                  </span>
                </div>
              ))
            )}
            <button
              tabIndex={0}
              onClick={() => navigateHome()}
              className="btn bg-button me-3 focus-ring"
            >
              Home
            </button>
            <button
              onClick={() => navigateToGame(id || "")}
              className="btn bg-button me-3 focus-ring"
              tabIndex={0}
            >
              Play
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
