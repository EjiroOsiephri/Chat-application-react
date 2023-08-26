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
      "Ejiro Chat Hub project is a remarkable and innovative platform that fosters communication and connection among users. Its user-friendly interface, coupled with the efficient organization of channels, makes it a convenient and enjoyable tool for users to engage with one another,creating a seamless and immersive chatting experience. Overall, your project is a testament to your dedication and creativity in building a fantastic communication hub for people to connect, collaborate, and share their ideas.",
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
