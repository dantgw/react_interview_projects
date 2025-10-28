import "./progressbar.css";
type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <>
      <div className="outerBar">
        <div
          className="innerBar"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
