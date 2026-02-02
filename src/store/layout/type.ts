export const layoutTypes = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
}

export const layoutWidthTypes = {
    FLUID: "fluid",
    BOXED: "boxed",
    SCROLLABLE: "scrollable",
}

export const layoutModeTypes = {
    DARK: "dark",
    LIGHT: "light",
}

export const topBarThemeTypes = {
    LIGHT: "light",
    DARK: "dark",
    COLORED: "colored",
}

export const leftBarThemeImageTypes = {
    NONE: "none",
    IMG1: "img1",
    IMG2: "img2",
    IMG3: "img3",
    IMG4: "img4",
}

export const leftSidebarTypes = {
    DEFAULT: "default",
    COMPACT: "compact",
    ICON: "icon",
}

export const leftSideBarThemeTypes = {
    LIGHT: "light",
    COLORED: "colored",
    DARK: "dark",
    WINTER: "winter",
    LADYLIP: "ladylip",
    PLUMPLATE: "plumplate",
    STRONGBLISS: "strongbliss",
    GREATWHALE: "greatwhale",
}

export type ActionLayoutPayload = {
    layoutType: string,
    layoutModeType: string,
    layoutWidth: string,
    leftSideBarTheme: string,
    leftSideBarThemeImage: string,
    leftSideBarType: string,
    topbarTheme: string,
    isPreloader: boolean,
    showRightSidebar: boolean,
    isMobile: boolean,
    showSidebar: boolean,
    leftMenu: boolean,
}

export type ActionLayoutProps = {
    type: string;
    payload: ActionLayoutPayload
}

export type LayoutState = {
    layoutType: string,
    layoutModeType: string,
    layoutWidth: string,
    leftSideBarTheme: string,
    leftSideBarThemeImage: string,
    leftSideBarType: string,
    topbarTheme: string,
    isPreloader: boolean,
    showRightSidebar: boolean,
    isMobile: boolean,
    showSidebar: boolean,
    leftMenu: boolean,
}
