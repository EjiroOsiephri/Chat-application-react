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
  {
    img: "",
    name: "Micheal Adeoye",
    comment:
      "Ejiro Chat Hub project is a remarkable and innovative platform that fosters communication and connection among users. Its user-friendly interface, coupled with the efficient organization of channels",
  },
];

const channelSlice = createSlice({
  name: "welcomechannel",
  initialState: {
    welcomeChannelHistory: [],
    newChannel: [],
  },
  reducers: {
    addTextToWelcomeChannel(state, action) {
      state.welcomeChannelHistory.push(action.payload);
    },
    addNewChannel(state, action) {
      state.newChannel.push(action.payload);
    },
  },
});

export const channelActions = channelSlice.actions;

export default channelSlice;
