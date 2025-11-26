import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import type { GameData, LeaderBoardEntry } from "../types/types";
import { fetchLeaderboard, addPlayerToLeaderboard } from "../utils/gameData";
import Logo from "../assets/logo-bg-removed.png";
import { FaTrophy } from "react-icons/fa";
import { MdSmsFailed } from "react-icons/md";
import { FaRegSnowflake } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { BiSolidParty } from "react-icons/bi";
import { GiThink } from "react-icons/gi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
interface GameCanvasProps {
  gameData: GameData;
  gameId: string;
}

export default function GameCanvas({ gameData, gameId }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [leaderBoardData, setLeaderBoardData] = useState<LeaderBoardEntry[]>(
    []
  );

  const [startTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [guessCount, setGuessCount] = useState<number>(0);
  const [feedback, setFeedback] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [gaveUp, setGaveUp] = useState(false);

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  // Fetch the leaderboard data
  useEffect(() => {
    if (!gameId) return;
    const fetchData = async () => {
      const data = await fetchLeaderboard(gameId);
      if (typeof data === "string") {
        console.error(data);
        setLeaderBoardData([]);
        return;
      }
      setLeaderBoardData(data);
    };
    fetchData();
  }, [gameId]);

  useEffect(() => {
    if (completed) {
      // if completed, ensure elapsedTime is the final time and don't start an interval
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      console.log();
      return;
    }

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 100);
    return () => clearInterval(interval);
  }, [startTime, completed]);

  const handleGiveUp = () => {
    setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    setCompleted(true);
    setGaveUp(true);
    setTimeout(() => {
      setShowModal(true);
    }, 4000);
  };

  const getMousePosition = (canvas: HTMLCanvasElement, event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const xCss = event.clientX - rect.left;
    const yCss = event.clientY - rect.top;
    const img = imageRef.current;
    const imgX = img
      ? Math.round((img.naturalWidth * xCss) / rect.width)
      : null;
    const imgY = img
      ? Math.round((img.naturalHeight * yCss) / rect.height)
      : null;
    return { imgX, imgY };
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imageRef.current;
    if (!img || !img.naturalWidth) return;

    const containerWidth = container.clientWidth;
    const containerHeight = Math.max(
      container.clientHeight,
      window.innerHeight * 0.6
    );
    const imgAspect = img.naturalWidth / img.naturalHeight;

    let displayWidth = containerWidth;
    let displayHeight = Math.floor(displayWidth / imgAspect);

    const maxAllowedHeight = Math.min(
      window.innerHeight * 0.85,
      containerHeight
    );
    if (displayHeight > maxAllowedHeight) {
      displayHeight = Math.floor(maxAllowedHeight);
      displayWidth = Math.floor(displayHeight * imgAspect);
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    canvas.width = Math.max(1, Math.floor(displayWidth * dpr));
    canvas.height = Math.max(1, Math.floor(displayHeight * dpr));

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, 0, 0, displayWidth, displayHeight);

    ctx.strokeStyle = "rgb(33, 37, 52)";

    ctx.lineWidth = 4;
    ctx.strokeRect(0 + 2, 0 + 2, displayWidth - 4, displayHeight - 4);

    // Draw green circle on Wally's position if user gave up
    if (gaveUp) {
      // Get Wally's position
      const targetX = parseFloat(gameData.positionX);
      const targetY = parseFloat(gameData.positionY);

      // Scale from natural image coordinates to displayed canvas coordinates
      const scaledX = (targetX / img.naturalWidth) * displayWidth;
      const scaledY = (targetY / img.naturalHeight) * displayHeight;
      const radius = 30;

      // Place a green highlighted circle around Wally
      ctx.fillStyle = "rgba(129, 212, 129, 0.3)";
      ctx.strokeStyle = "rgb(129, 212, 129)";
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.arc(scaledX, scaledY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }, [gameData, gaveUp]);

  // This will take a seconds amount e.g., 70 and return a minute format e.g., 01:10
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:
${String(secs).padStart(2, "0")}`.replace(/\n/, "");
  };

  // This handles the logic for when a user clicks on the canvas, and will determine if the user has guessed correctly
  const handleUserGuess = useCallback(
    (
      imgX: number | null,
      imgY: number | null,
      clickX: number,
      clickY: number
    ) => {
      if (imgX === null || imgY === null) return;

      // Increment guess count
      setGuessCount((prev) => prev + 1);

      const targetX = parseFloat(gameData.positionX);
      const targetY = parseFloat(gameData.positionY);
      // Tolerane is the amount of pixels each way counted in the click zone
      const tolerance = 50;

      const isCorrect =
        // Math.abs will return the absolute number e.g., (5 rather than -5)
        Math.abs(imgX - targetX) <= tolerance &&
        Math.abs(imgY - targetY) <= tolerance;

      // If not correct, check if "warm"
      const distance = Math.sqrt(
        Math.pow(imgX - targetX, 2) + Math.pow(imgY - targetY, 2)
      );
      const isWarm = distance <= 250 && !isCorrect;

      const feedbackText = isCorrect ? "✓ Correct!" : isWarm ? "Warm!" : "Cold";

      // Show feedback popup at click location
      setFeedback({ text: feedbackText, x: clickX, y: clickY });

      // Clear any existing timeout
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }

      // Hide feedback after 2 seconds
      feedbackTimeoutRef.current = setTimeout(() => {
        setFeedback(null);
      }, 2000);

      if (isCorrect) {
        // freeze final elapsed time and show modal
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        setCompleted(true);
        setShowModal(true);
        setGaveUp(false);
      }
    },
    [gameData, startTime]
  );

  useEffect(() => {
    if (!gameData) return;
    const img = new Image();
    imageRef.current = img;
    img.crossOrigin = "anonymous";
    img.src = gameData.imageUrl || "";

    const onLoad = () => {
      draw();
    };
    img.addEventListener("load", onLoad);

    // Resize observer to keep canvas responsive
    const container = containerRef.current;
    let ro: ResizeObserver | null = null;
    if (container) {
      ro = new ResizeObserver(() => {
        draw();
      });
      ro.observe(container);
    }

    const onWindow = () => draw();
    window.addEventListener("resize", onWindow);

    return () => {
      img.removeEventListener("load", onLoad);
      if (ro && container) ro.unobserve(container);
      window.removeEventListener("resize", onWindow);
    };
  }, [gameData, draw]);

  // attach click handler to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const handler = (e: MouseEvent) => {
      if (completed) return; // no more clicks after completion
      const pos = getMousePosition(canvas, e);

      // Compute coordinates relative to the container (so the popup will show more accurate to where to user clicked)
      const containerRect = container.getBoundingClientRect();
      const clickX = Math.round(e.clientX - containerRect.left);
      const clickY = Math.round(e.clientY - containerRect.top);

      // Pass CSS coords relative to container for popup positioning
      handleUserGuess(pos.imgX, pos.imgY, clickX, clickY);
    };
    canvas.addEventListener("click", handler);
    return () => canvas.removeEventListener("click", handler);
  }, [gameData, completed, handleUserGuess]);

  // Redraw when gaveUp changes to show/hide the green circle
  useEffect(() => {
    draw();
  }, [gaveUp, draw]);

  // This will submit a time to the leaderboard
  const submitLeaderboard = async () => {
    if (!username) {
      setSubmitMessage("Please enter a username");
      return;
    }
    setSubmitting(true);
    setSubmitMessage(null);
    try {
      const response = await addPlayerToLeaderboard(
        gameId,
        username,
        elapsedTime.toString()
      );
      if (response?.status === 200) {
        setSubmitMessage("Submitted - thanks!");
        setTimeout(() => {
          setShowModal(false);
        }, 800);
        navigateHome();
      }
    } catch (err) {
      const error = err as { status?: number };
      if (error?.status === 409) {
        setSubmitMessage("Submission failed. Username already exists");
      } else {
        setSubmitMessage("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: 128,
              height: 128,
              objectFit: "contain",
              cursor: "pointer",
            }}
            className="img-hover logo"
            onClick={navigateHome}
          />
        </div>
        <div className="row flex-column-reverse flex-lg-row p-4">
          <div className=" col-lg-2 align-items-center">
            <div className="d-flex flex-column align-items-center justify-content-center w-100">
              <div className="bg-primary rounded-3 p-4 text-white text-center mt-4 flex-grow-1 game-widget">
                <h3>
                  Current Time <br /> {formatTime(elapsedTime)}
                </h3>
                <p style={{ fontSize: "1.1rem" }}>{guessCount} guesses</p>
                <p className="text-white-50" style={{ fontSize: "1.1rem" }}>
                  {gameData.title}
                </p>
                <div className="container d-flex  flex-md-column align-items-center justify-content-around g-2">
                  <p
                    className="p-1 btn rounded-2 text-black"
                    style={{ backgroundColor: "#8fc7dcff" }}
                  >
                    <FaRegSnowflake />
                    Cold
                  </p>
                  <p
                    className="p-1 btn rounded-2 text-black"
                    style={{ backgroundColor: "#FFA500" }}
                  >
                    <FaFire />
                    Warm
                  </p>
                  <p
                    className="p-1 btn rounded-2 text-black"
                    style={{ backgroundColor: "#81d481ff" }}
                  >
                    <BiSolidParty />
                    Correct
                  </p>
                </div>
                <hr />
                <p className="text-white-50">
                  Giving up will highlight Wally in green
                </p>
                <button
                  className="p-1 btn rounded-2 text-black focus-ring"
                  style={{ backgroundColor: "#f54b4bff" }}
                  onClick={() => handleGiveUp()}
                  tabIndex={0}
                >
                  <MdSmsFailed /> Give Up
                </button>

                <p className="mt-5 text-white" style={{ fontSize: "1.2rem" }}>
                  <FaTrophy className="me-2" style={{ color: "orange" }} />
                  Leaderboard
                </p>
                <hr />
                <div>
                  {leaderBoardData.length === 0 ? (
                    <div className="text-center text-white-50">
                      No entries yet
                    </div>
                  ) : (
                    leaderBoardData.map((entry, index) => (
                      <div
                        key={entry.id ?? index}
                        className="d-flex justify-content-between align-items-center mb-2"
                      >
                        <span>
                          {index + 1}. {entry.username}
                        </span>
                        <span>
                          <strong>
                            <MdOutlineAccessTimeFilled />{" "}
                            {formatTime(entry.time)}
                          </strong>
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 d-flex align-items-center mt-1">
            <div
              ref={containerRef}
              className="w-100 d-flex justify-content-center"
              style={{ paddingBottom: 24, position: "relative" }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  display: "block",
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "20px",
                }}
                tabIndex={0}
                className="focus-ring"
              />

              {feedback && (
                <div
                  style={{
                    position: "absolute",
                    left: feedback.x,
                    top: feedback.y,
                    transform: "translate(0, -120%)",
                    backgroundColor:
                      feedback.text === "✓ Correct!"
                        ? "#81d481ff"
                        : feedback.text === "Warm!"
                        ? "#FFA500"
                        : "#8fc7dcff",
                    color: "#000",
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontWeight: "bold",
                    fontSize: 14,
                    zIndex: 10,
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  {feedback.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#0f1724",
              color: "white",
              padding: 24,
              borderRadius: 12,
              width: 360,
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            }}
          >
            <h3 style={{ marginTop: 0 }} className="text-center mb-4">
              {gaveUp ? "You gave up!" : "You found Wally!"}
            </h3>
            <p>
              <GiThink style={{ fontSize: "2rem" }} className="me-2" />
              Guesses taken: <strong>{guessCount}</strong>
            </p>
            <p>
              <MdOutlineAccessTimeFilled
                style={{ fontSize: "2rem" }}
                className="me-2"
              />
              Time taken: <strong>{formatTime(elapsedTime)}</strong>
            </p>
            {!gaveUp && guessCount < 5 ? (
              <div style={{ marginTop: 12 }}>
                <label style={{ display: "block", marginBottom: 6 }}>
                  Enter a username to be shown on the leaderboard!
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your name"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 6,
                    border: "1px solid #2b2f3a",
                    background: "#071025",
                    color: "white",
                  }}
                />
              </div>
            ) : (
              !gaveUp && (
                <div>
                  <p className="text-white-50">
                    You do not qualify to be on the leaderboard because you have
                    too many guesses.
                  </p>
                </div>
              )
            )}

            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn me-2"
                onClick={() => navigateHome()}
                disabled={submitting}
                style={{ backgroundColor: "#70969fff" }}
              >
                Home
              </button>
              {!gaveUp && (
                <button
                  className="btn"
                  onClick={submitLeaderboard}
                  disabled={submitting || guessCount > 5}
                  style={{ backgroundColor: "#81d481ff" }}
                >
                  {submitting ? "Submitting..." : "Submit to leaderboard"}
                </button>
              )}
            </div>

            {submitMessage && (
              <div className="mt-3 text-sC">{submitMessage}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
