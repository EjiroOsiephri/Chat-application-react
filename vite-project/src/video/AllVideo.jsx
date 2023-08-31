import { AgoraVideoPlayer } from "agora-rtc-react";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import Classes from "../sass/VideoCall.module.scss";

export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <main style={{ height: "100%", backgroundColor: "black" }}>
      <div className={Classes["allVideoDiv"]}>
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <div>
                <AgoraVideoPlayer
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            );
          } else return null;
        })}
    </main>
  );
}
