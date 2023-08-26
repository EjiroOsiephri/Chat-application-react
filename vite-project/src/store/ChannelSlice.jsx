import { createSlice } from "@reduxjs/toolkit";

const Dummy_Data = [
  {
    img: "",
    name: "Xander Neal",
    comment: "Welcome to the group! We're excited to have you as a member.",
  },
  {
    img: "",
    name: "Micheal Schiewesteiger",
    comment:
      "You can message users privately if you want to, just click on the name and you're good",
  },
  {
    img: "",
    name: "James Smith",
    comment: "Welcome!!!",
  },
];

const channelSlice = createSlice({
  name: "welcomechannel",
  initialState: {
    welcomeChannelHistory: Dummy_Data,
  },
  reducers: {
    addTextToWelcomeChannel(state, action) {
      state.welcomeChannelHistory.push(action.payload);
    },
  },
});

export const channelActions = channelSlice.actions;

export default channelSlice;
