import { AgoraVideoPlayer } from "agora-rtc-react";

export default function Video(props) {
  const { users, tracks } = props;

  return (
    <>
      <div className="videos">
        <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
    </>
  );
}
