// IMPORTS
import WinterWaldoIMG from "../assets/winterwaldo.jpg";
import MovieSetIMG from "../assets/moviesetwaldo.jpg";
import BusyMarketIMG from "../assets/marketplacewaldo.jpg"
import Logo from "../assets/logo-bg-removed.png";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { fetchLeaderboard } from "../utils/gameData";

export default function Home() {
  const [skiTime, setSkiTime] = useState<string>("--:--");
  const [movieTime, setMovieTime] = useState<string>("--:--");
  const [marketTime, setMarketTime] = useState<string>("--:--");
  const navigate = useNavigate();

  const navigateToGame = (game: string) => {
    navigate(`/games/${game}`);
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

  return (
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
        <div className="col-12 col-md-4">
          <div className="card card-hover bg-primary rounded-2">
            <img
              src={WinterWaldoIMG}
              className="rounded-2"
              alt="movie set wally image"
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
              <a
                onClick={() => navigateToGame("6914722b2dfb703149c28364")}
                className="btn bg-button"
              >
                Play
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card card-hover bg-primary rounded-2">
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
              <a
                onClick={() => navigateToGame("691d96f458ad933ed79d90cc")}
                className="btn bg-button"
              >
                Play
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card card-hover bg-primary rounded-2">
            <img
              src={BusyMarketIMG}
              className="rounded-2"
              alt="movie set wally image"
              style={{ height: "250px" }}
            />
            <div className="card-body bg-primary border-0">
              <h5 className="card-title text-white">Busy Market</h5>
              <p className="card-tex text-white-50">
                Try and find Wally in this busy marker scene as fast as possible.
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
              <a
                onClick={() => navigateToGame("691dce917ec8bed752f3e316")}
                className="btn bg-button"
              >
                Play
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card card-hover bg-primary rounded-2">
            <div className="card-body bg-primary border-0">
              <h5 className="card-title text-white">Coming soon...</h5>
              <p className="card-tex text-white-50">
                ...
              </p>
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
              <p className="card-tex text-white-50">
                <MdOutlineAccessTimeFilled className="text-white" /> Fastest
                Time -
              </p>
              <a
                onClick={() => navigateToGame("691dce917ec8bed752f3e316")}
                className="btn bg-button disabled"
              >
                Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
