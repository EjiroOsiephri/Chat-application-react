import React from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

const appId = "79ee237df8ca4b8ca3518529202eafbb";
const token =
  "007eJxTYAj5l7djxSaJmOPveRzXR0w48v7QjHdrzssY3XXoX9XXzXJagcHcMjXVyNg8Jc0iOdEkCUgYmxpamBpZGhkYpSamJSW9E32f0hDIyOB3y4uRkQECQXwWhtzEzDwGBgAoZiJg";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
