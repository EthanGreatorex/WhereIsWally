// IMPORTS
import WinterWaldoIMG from "../assets/winterwaldo.jpg";
import Logo from "../assets/logo-bg-removed.png";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  const navigateToGame = (game: string) => {
    navigate(`/games/${game}`);
  };
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
        How fast can you find Waldo? Choose a scene below to get started!
      </div>

      <div className="row g-4" style={{ minHeight: 300, marginTop: "10vh" }}>
        <div className="col-12 col-md-4">
          <div
            className="card card-hover bg-primary rounded-2"
            style={{ width: "18rem;" }}
          >
            <img
              src={WinterWaldoIMG}
              className="rounded-2"
              alt="winter waldo image"
            />
            <div className="card-body bg-primary border-0">
              <h5 className="card-title text-white">Ski Resort</h5>
              <p className="card-tex text-white-50">
                Try and find waldo in this winter scene as fast as possible.
              </p>
              <a onClick={() => navigateToGame("6914722b2dfb703149c28364")} className="btn bg-button">
                Play
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card card-hover h-100 text-center bg-primary text-white">
            <div
              className="card-body d-flex align-items-center justify-content-center"
              style={{ height: "200px" }}
            >
              <h3 className="text-white-50">Coming soon...</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card card-hover h-100 text-center bg-primary text-white">
            <div
              className="card-body d-flex align-items-center justify-content-center"
              style={{ height: "200px" }}
            >
              <h3 className="text-white-50">Coming soon...</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
