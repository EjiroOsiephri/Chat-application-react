import React from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

const appId = "79ee237df8ca4b8ca3518529202eafbb";
const token =
  "007eJxTYFD6E5ktx5u4XbMw6dWOU4pFE9zeccWe/ppy2I7/NHN/6UEFBnPL1FQjY/OUNIvkRJMkIGFsamhhamRpZGCUmpiWlDRvwvuUhkBGBuaar6yMDBAI4rMw5CZm5jEwAAA2GR/B";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
