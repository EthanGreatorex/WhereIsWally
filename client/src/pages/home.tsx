// IMPORTS
import WinterWaldoIMG from "../assets/winterwaldo.jpg";
import MovieSetIMG from "../assets/moviesetwaldo.jpg";
import BusyMarketIMG from "../assets/marketplacewaldo.jpg";
import CastleIMG from "../assets/castle.jpg";
import Logo from "../assets/logo-bg-removed.png";
import WallyTargetIMG from "../assets/wally_target.png";
import WizardTargetIMG from "../assets/wizard_target copy.jpg";
import WendaTargetIMG from "../assets/target_wenda copy.jpg";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { fetchLeaderboard } from "../utils/gameData";
import InstructionsModal from "../components/InstructionsModal";

type GameConfig = {
  id: string;
  title: string;
  description: string;
};

const GAMES: Record<string, GameConfig> = {
  ski: {
    id: "6914722b2dfb703149c28364",
    title: "Ski Resort",
    description:
      "Scan the snowy slopes and crowded ski lifts to find Wally as fast as you can. Watch out for lookalikes!",
  },
  market: {
    id: "691dce917ec8bed752f3e316",
    title: "Busy Market",
    description:
      "The market is packed with shoppers and stalls. Keep your eyes sharp and locate Wally faster than anyone else!",
  },
  movie: {
    id: "691d96f458ad933ed79d90cc",
    title: "Movie Set",
    description:
      "The cameras are rolling and the set is chaos. Spot Wally among actors, crew, and props as quickly as possible.",
  },
  castle: {
    id: "69303daf198ee52011b8960f",
    title: "Storm the Castle",
    description:
      "The castle walls are under siege. Search through knights, ladders, and catapults to track down Wally.",
  },
};

export default function Home() {
  const [skiTime, setSkiTime] = useState<string>("--:--");
  const [movieTime, setMovieTime] = useState<string>("--:--");
  const [castleTime, setCastleTime] = useState<string>("--:--");
  const [marketTime, setMarketTime] = useState<string>("--:--");
  const [selectedGameKey, setSelectedGameKey] = useState<
    keyof typeof GAMES | null
  >(null);
  const navigate = useNavigate();

  // This will open instructions for the selected game
  const openInstructions = (gameKey: keyof typeof GAMES) => {
    setSelectedGameKey(gameKey);
  };

  const closeInstructions = () => {
    setSelectedGameKey(null);
  };

  const continueToGame = () => {
    if (!selectedGameKey) return;
    const game = GAMES[selectedGameKey];
    setSelectedGameKey(null);
    navigate(`/games/${game.id}`);
  };

  // This will take the user to the leaderboard view for a game
  const navigateToLeaderboard = (game: string) => {
    navigate(`/leaderboard/${game}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:
${String(secs).padStart(2, "0")}`.replace(/\n/, "");
  };

  // Get the fastest time for the Ski Resort game (game ID: 6914722b2dfb703149c28364)
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLeaderboard("6914722b2dfb703149c28364");
      if (Array.isArray(data) && data.length > 0) {
        setSkiTime(formatTime(data[0].time));
      }
    };
    fetchData();
  }, []);

  // Get the fastest time for the movie set  game (game ID: 691d96f458ad933ed79d90cc)
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLeaderboard("691d96f458ad933ed79d90cc");
      if (Array.isArray(data) && data.length > 0) {
        setMovieTime(formatTime(data[0].time));
      }
    };
    fetchData();
  }, []);

  // Get the fastest time for the market set  game (game ID: 691dce917ec8bed752f3e316)
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLeaderboard("691dce917ec8bed752f3e316");
      if (Array.isArray(data) && data.length > 0) {
        setMarketTime(formatTime(data[0].time));
      }
    };
    fetchData();
  }, []);

  // Get the fastes time for the castle set game (game ID: 69303daf198ee52011b8960f
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLeaderboard("69303daf198ee52011b8960f");
      if (Array.isArray(data) && data.length > 0) {
        setCastleTime(formatTime(data[0].time));
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <InstructionsModal
        isOpen={selectedGameKey !== null}
        onClose={closeInstructions}
        onContinue={continueToGame}
        title={
          selectedGameKey ? `How to Play - ${GAMES[selectedGameKey].title}` : ""
        }
        sceneDescription={
          selectedGameKey ? GAMES[selectedGameKey].description : ""
        }
        wallyImage={WallyTargetIMG}
        bonusImages={[
          { src: WizardTargetIMG, label: "Wizard Target" },
          { src: WendaTargetIMG, label: "Wenda Target" },
        ]}
      />
      <div className="container py-4">
        <div className="d-flex align-items-center ">
          <img
            src={Logo}
            alt="logo"
            className="me-3 img-hover"
            style={{ width: 128, height: 128, objectFit: "contain" }}
          />
          <h1 className="mb-0 text-white">Where's Wally</h1>
        </div>

        <div className="alert alert-primary mt-5" role="alert">
          How fast can you find Wally? Choose a scene below to get started!
        </div>

        <div className="row g-4" style={{ marginTop: "5vh" }}>
          {/* Ski Resort */}
          <div className="col-12 col-md-4">
            <div
              className="card card-hover bg-primary rounded-2 focus-ring"
              tabIndex={0}
            >
              <img
                src={WinterWaldoIMG}
                className="rounded-2"
                alt="ski resort wally image"
                style={{ height: "250px" }}
              />
              <div className="card-body bg-primary border-0">
                <h5 className="card-title text-white">Ski Resort</h5>
                <p className="card-tex text-white-50">
                  Try and find Wally in this winter scene as fast as possible.
                </p>
                <p className="text-white-50">
                  Difficulty
                  <FaCircle
                    style={{
                      color: "green",
                      marginRight: "3px",
                      marginLeft: "7px",
                    }}
                  />
                  <FaCircle style={{ color: "green", marginRight: "3px" }} />
                  <FaCircle style={{ color: "grey", marginRight: "3px" }} />
                  <FaCircle style={{ color: "grey", marginRight: "3px" }} />
                  <FaCircle style={{ color: "grey", marginRight: "3px" }} />
                </p>
                <p className="card-tex text-white-50">
                  <MdOutlineAccessTimeFilled className="text-white" /> Fastest
                  Time - {skiTime}
                </p>
                <button
                  onClick={() => openInstructions("ski")}
                  className="btn bg-button me-3 focus-ring"
                  tabIndex={0}
                >
                  Play
                </button>
                <button
                  onClick={() =>
                    navigateToLeaderboard("6914722b2dfb703149c28364")
                  }
                  className="btn bg-button focus-ring"
                  tabIndex={0}
                >
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>

          {/* Busy Market */}
          <div className="col-12 col-md-4">
            <div
              className="card card-hover bg-primary rounded-2 focus-ring"
              tabIndex={0}
            >
              <img
                src={BusyMarketIMG}
                className="rounded-2"
                alt="busy market wally image"
                style={{ height: "250px" }}
              />
              <div className="card-body bg-primary border-0">
                <h5 className="card-title text-white">Busy Market</h5>
                <p className="card-tex text-white-50">
                  Try and find Wally in this busy market scene as fast as
                  possible.
                </p>
                <p className="text-white-50">
                  Difficulty
                  <FaCircle
                    style={{
                      color: "yellow",
                      marginRight: "3px",
                      marginLeft: "7px",
                    }}
                  />
                  <FaCircle style={{ color: "yellow", marginRight: "3px" }} />
                  <FaCircle style={{ color: "yellow", marginRight: "3px" }} />
                  <FaCircle style={{ color: "grey", marginRight: "3px" }} />
                  <FaCircle style={{ color: "grey", marginRight: "3px" }} />
                </p>
                <p className="card-tex text-white-50">
                  <MdOutlineAccessTimeFilled className="text-white" /> Fastest
                  Time - {marketTime}
                </p>
                <button
                  onClick={() => openInstructions("market")}
                  className="btn bg-button me-3 focus-ring"
                  tabIndex={0}
                >
                  Play
                </button>
                <button
                  onClick={() =>
                    navigateToLeaderboard("691dce917ec8bed752f3e316")
                  }
                  className="btn bg-button focus-ring"
                  tabIndex={0}
                >
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>

          {/* Movie Set */}
          <div className="col-12 col-md-4">
            <div
              className="card card-hover bg-primary rounded-2 focus-ring"
              tabIndex={0}
            >
              <img
                src={MovieSetIMG}
                className="rounded-2"
                alt="movie set wally image"
                style={{ height: "250px" }}
              />
              <div className="card-body bg-primary border-0">
                <h5 className="card-title text-white">Movie Set</h5>
                <p className="card-tex text-white-50">
                  Try and find Wally in this movie chaos as fast as possible.
                </p>
                <p className="text-white-50">
                  Difficulty
                  <FaCircle
                    style={{
                      color: "red",
                      marginRight: "3px",
                      marginLeft: "7px",
                    }}
                  />
                  <FaCircle style={{ color: "red", marginRight: "3px" }} />
                  <FaCircle style={{ color: "red", marginRight: "3px" }} />
                  <FaCircle style={{ color: "red", marginRight: "3px" }} />
                  <FaCircle style={{ color: "grey", marginRight: "3px" }} />
                </p>
                <p className="card-tex text-white-50">
                  <MdOutlineAccessTimeFilled className="text-white" /> Fastest
                  Time - {movieTime}
                </p>
                <button
                  onClick={() => openInstructions("movie")}
                  className="btn bg-button me-3 focus-ring"
                  tabIndex={0}
                >
                  Play
                </button>
                <button
                  onClick={() =>
                    navigateToLeaderboard("691d96f458ad933ed79d90cc")
                  }
                  className="btn bg-button focus-ring"
                  tabIndex={0}
                >
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>

          {/* Storm the Castle */}
          <div className="col-12 col-md-4">
            <div
              className="card card-hover bg-primary rounded-2 focus-ring"
              tabIndex={0}
            >
              <img
                src={CastleIMG}
                className="rounded-2"
                alt="movie set wally image"
                style={{ height: "250px" }}
              />
              <div className="card-body bg-primary border-0">
                <h5 className="card-title text-white">Storm the Castle</h5>
                <p className="card-tex text-white-50">
                  Try and find Wally in the midst of this chaotic battleground!
                </p>
                <p className="text-white-50">
                  Difficulty
                  <FaCircle
                    style={{
                      color: "red",
                      marginRight: "3px",
                      marginLeft: "7px",
                    }}
                  />
                  <FaCircle style={{ color: "red", marginRight: "3px" }} />
                  <FaCircle style={{ color: "red", marginRight: "3px" }} />
                  <FaCircle style={{ color: "red", marginRight: "3px" }} />
                  <FaCircle style={{ color: "red", marginRight: "3px" }} />
                </p>
                <p className="card-tex text-white-50">
                  <MdOutlineAccessTimeFilled className="text-white" /> Fastest
                  Time - {castleTime}
                </p>
                <button
                  onClick={() => openInstructions("castle")}
                  className="btn me-3 bg-button focus-ring"
                  tabIndex={0}
                >
                  Play
                </button>
                <button
                  onClick={() =>
                    navigateToLeaderboard("69303daf198ee52011b8960f")
                  }
                  className="btn bg-button focus-ring"
                  tabIndex={0}
                >
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>

          {/* Coming soon */}
          <div className="col-12 col-md-4">
            <div
              className="card card-hover bg-primary rounded-2 focus-ring"
              tabIndex={0}
            >
              <div className="card-body bg-primary border-0">
                <h5 className="card-title text-white">Coming soon...</h5>
                <p className="card-tex text-white-50">...</p>
                <p className="text-white-50">
                  Difficulty
                  <FaCircle
                    style={{
                      color: "grey",
                      marginRight: "3px",
                      marginLeft: "7px",
                    }}
                  />
                  <FaCircle style={{ color: "grey", marginRight: "3px" }} />
                  <FaCircle style={{ color: "grey", marginRight: "3px" }} />
                  <FaCircle style={{ color: "grey", marginRight: "3px" }} />
                  <FaCircle style={{ color: "grey", marginRight: "3px" }} />
                </p>
                <p className="card-tex text-white-50 focus-ring">
                  <MdOutlineAccessTimeFilled className="text-white" /> Fastest
                  Time -
                </p>
                <button
                  className="btn bg-button disabled focus-ring"
                  tabIndex={0}
                >
                  Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
