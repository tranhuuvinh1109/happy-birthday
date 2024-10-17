import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type LoadingProps = {
  progress: number;
};

const Loading = ({ progress = 0 }: LoadingProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-overlay60">
      <div className="max-w-24">
        <CircularProgressbar
          value={progress}
          strokeWidth={50}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: "rgb(239 68 68)",
          })}
        />
      </div>
    </div>
  );
};

export default Loading;
