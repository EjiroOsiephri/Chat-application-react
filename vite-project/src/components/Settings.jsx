import React from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

const appId = "79ee237df8ca4b8ca3518529202eafbb";
const token =
  "007eJxTYFCTDe1cpD9PY/XH34tOhBz2snuoHqSzWK9VcopFwqkZVe0KDOaWqalGxuYpaRbJiSZJQMLY1NDC1MjSyMAoNTEtKSn/xvuUhkBGhk+/JzEwQiGIz8KQm5iZx8AAAEfLIKo=";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
