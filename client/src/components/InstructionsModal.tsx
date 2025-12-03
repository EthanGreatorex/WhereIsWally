type InstructionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  title: string;
  sceneDescription: string;
  wallyImage: string;
  bonusImages?: { src: string; label: string }[];
};

export default function InstructionsModal({
  isOpen,
  onClose,
  onContinue,
  title,
  sceneDescription,
  wallyImage,
  bonusImages = [],
}: InstructionsModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="instructions-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructions-title"
    >
      <div className="instructions-modal bg-primary border-0 rounded-3 shadow-lg">
        <div className="instructions-header d-flex justify-content-between align-items-center mb-3">
          <h2 id="instructions-title" className="text-white mb-0">
            {title}
          </h2>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={onClose}
          />
        </div>

        <p className="text-white-50 mb-3">{sceneDescription}</p>

        <div className="instructions-body row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="instructions-target-card h-100 p-2 rounded-2">
              <p className="text-white-50 small mb-1">Primary Target</p>
              <div className="instructions-image-frame">
                <img
                  src={wallyImage}
                  alt="Wally target"
                  className="img-fluid rounded-2"
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8">
            <div className="instructions-target-card h-100 p-3 rounded-2">
              <p className="text-white-50 small mb-2">Find bonus charcters to gain time bonuses!</p>
              <div className="row g-3">
                {bonusImages.length === 0 ? (
                  <>
                    <div className="col-6">
                      <div className="instructions-placeholder text-center p-3 rounded-2">
                        <span className="text-white-50 small">
                          Bonus character slot
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="instructions-placeholder text-center p-3 rounded-2">
                        <span className="text-white-50 small">
                          Bonus character slot
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  bonusImages.map((bonus) => (
                    <div className="col-6" key={bonus.label}>
                      <div className="instructions-image-frame">
                        <img
                          src={bonus.src}
                          alt={bonus.label}
                          className="img-fluid rounded-2"
                        />
                      </div>
                      <p className="text-white mt-2 mb-0 small text-center">
                        {bonus.label}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="instructions-footer d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-light pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn bg-button pointer"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}


