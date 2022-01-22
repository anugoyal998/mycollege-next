import { atom } from "recoil";

export const queryState = atom({
    key: "queryState",
    default: {
        q: process.env.DRIVE_PARENT_ID,
        type: 'folders',
        name: null,
    }
})