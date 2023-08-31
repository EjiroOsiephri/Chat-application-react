import React, { useEffect, useState } from "react";
import {
  channelName,
  config,
  useClient,
  useMicrophoneAndCameraTracks,
} from "../components/Settings";
import Controls from "./Controls";
import Video from "./AllVideo";
import Classes from "../sass/VideoCall.module.scss";

const VideoCall = (props) => {
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });
      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });
      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });
      try {
        await client.join(config.appId, name, config.token, null);
      } catch (error) {
        console.log(error);
      }
      if (tracks) {
        await client.publish([tracks[0], tracks[1]]);
      }
      setStart(true);

      if (ready && tracks) {
        try {
          init(channelName);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
  }, [channelName, ready, tracks]);

  return (
    <main style={{ height: "100%" }}>
      <div style={{ height: "95%" }}>
        {start && tracks && <Video tracks={tracks} users={users} />}
      </div>
      <div style={{ height: "95%" }}>
        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        )}
      </div>
    </main>
  );
};

export default VideoCall;