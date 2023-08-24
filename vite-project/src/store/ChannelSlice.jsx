import { createSlice } from "@reduxjs/toolkit";

const Dummy_Data = [
  {
    img: "",
    name: "Xander Neal",
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero doloremque labore quam!",
  },
  {
    img: "",
    name: "Xander Neal",
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero doloremque labore quam!",
  },
  {
    img: "",
    name: "Xander Neal",
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero doloremque labore quam!",
  },
  {
    img: "",
    name: "Xander Neal",
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero doloremque labore quam!",
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
