// IMPORTS
import WinterWaldoIMG from "../assets/winterwaldo.jpg";
import Logo from "../assets/logo-bg-removed.png";

export default function Home() {
  return (
    <div className="container py-4">
      <div className="d-flex align-items-center ">
        <img
          src={Logo}
          alt="logo"
          className="me-3"
          style={{ width: 128, height: 128, objectFit: "contain" }}
        />
        <h1 className="mb-0 text-white">Where's Wally</h1>
      </div>

      <div className="row g-4" style={{ minHeight: 300, marginTop: "15vh" }}>
        <div className="col-12 col-md-4">
          <div
            className="card bg-primary rounded-2"
            style={{ width: "18rem;" }}
          >
            <img
              src={WinterWaldoIMG}
              className="rounded-2"
              alt="winter waldo image"
            />
            <div className="card-body bg-primary border-0">
              <h5 className="card-title text-white">Winter Waldo</h5>
              <p className="card-tex text-white-50">
                Try and find waldo in this winter scene as fast as possible.
              </p>
              <a href="#" className="btn bg-button">
                Play
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 text-center bg-primary text-white">
            <div
              className="card-body d-flex align-items-center justify-content-center"
              style={{ height: "200px" }}
            >
              <h3>Coming soon...</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 text-center bg-primary text-white">
            <div
              className="card-body d-flex align-items-center justify-content-center"
              style={{ height: "200px" }}
            >
              <h3>Coming soon...</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
