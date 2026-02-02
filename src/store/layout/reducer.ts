import {createSlice} from "@reduxjs/toolkit";
import {
    type ActionLayoutProps,
    layoutModeTypes,
    type LayoutState,
    layoutTypes,
    layoutWidthTypes,
    leftBarThemeImageTypes,
    leftSideBarThemeTypes, leftSidebarTypes, topBarThemeTypes
} from "./type.ts";

const initialState: LayoutState = {
    layoutType: layoutTypes.VERTICAL,
    layoutModeType: layoutModeTypes.LIGHT,
    layoutWidth: layoutWidthTypes.FLUID,
    leftSideBarTheme: leftSideBarThemeTypes.DARK,
    leftSideBarThemeImage: leftBarThemeImageTypes.NONE,
    leftSideBarType: leftSidebarTypes.DEFAULT,
    topbarTheme: topBarThemeTypes.LIGHT,
    isPreloader: false,
    showRightSidebar: false,
    isMobile: false,
    showSidebar: true,
    leftMenu: false,
}

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        actionChangeLayout: (state: LayoutState, action:ActionLayoutProps) => {
            return {...state, layoutType: action.payload.layoutType};
        },
        actionChangePreloader: (state: LayoutState, action:ActionLayoutProps) => {
            return {...state, isPreloader: action.payload.isPreloader};
        },
        actionChangeLayoutMode: (state: LayoutState, action:ActionLayoutProps) => {
            return {...state, layoutModeType: action.payload.layoutModeType};
        },
        actionChangeLayoutWidth: (state: LayoutState, action:ActionLayoutProps) => {
            return {...state, layoutWidth: action.payload.layoutWidth};
        },
        actionChangeSidebarTheme: (state: LayoutState, action:ActionLayoutProps) => {
            return {...state, leftSideBarTheme: action.payload.leftSideBarTheme};
        },
        actionChangeSidebarThemeImage: (state: LayoutState, action:ActionLayoutProps) => {
            return {...state, leftSideBarThemeImage: action.payload.leftSideBarThemeImage};
        },
        actionChangeSideBarType: (state: LayoutState, action:ActionLayoutProps) => {
            return {...state, leftSideBarType: action.payload.leftSideBarType};
        },
        actionChangeTopbarTheme: (state: LayoutState, action:ActionLayoutProps) => {
            return {...state, topbarTheme: action.payload.topbarTheme};
        },
        actionShowRightSidebar: (state: LayoutState, action:ActionLayoutProps) => {
            return {...state, showRightSidebar: action.payload.showRightSidebar};
        },
        actionShowSidebar: (state: LayoutState, action:ActionLayoutProps) => {
            return {...state, showSidebar: action.payload.showSidebar};
        },
        actionToggleLeftmenu: (state: LayoutState, action:ActionLayoutProps) => {
            return {...state, leftSideBarTheme: action.payload.leftSideBarTheme};
        }
    }
})

export const actions = layoutSlice.actions;
export default layoutSlice;
