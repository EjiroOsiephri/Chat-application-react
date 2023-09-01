import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "79ee237df8ca4b8ca3518529202eafbb";
const token =
  "007eJxTYLC96v+tocGwKNciu+lT/xUVhk72sLvrbr5tEDv/QXtCeZwCg7llaqqRsXlKmkVyokkSkDA2NbQwNbI0MjBKTUxLSjo752NKQyAjw3NJFgZGKATxWRhyEzPzGBgAkVUgmA==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
