import type {ActionFolderProps, FileDirInfo} from "../type.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState:FileDirInfo = {
    dirId: null,
    dirNm: null,
    fileCount: 0,
    fileSize: 0,
}

const folderSlice = createSlice({
    name: "folder",
    initialState,
    reducers: {
        actionCreateFolderRequest: (state, action: ActionFolderProps) => {
            return {...state, loading: true};
        },
        actionCreateFolderSuccess: (state, action: ActionFolderProps) => {
            return {...state, loading: false};
        }
    }
})

export const actions = folderSlice.actions;
export default folderSlice;
