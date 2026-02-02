import {call, fork, takeEvery, put, all} from "redux-saga/effects"
import {actions} from "./reducer.ts"
import type {ActionLayoutProps} from "./type.ts";

/**
 * Changes the body attribute
 */
function changeBodyAttribute(attribute: string, value: string) {
    if (document.body) document.body.setAttribute(attribute, value)
    return true
}

const changeHtmlAttribute = (attribute: string, value: string) => {
    if (document.documentElement) document.documentElement.setAttribute(attribute, value)
    return true;
}

/**
 * Toggle the class on body
 * @param {*} cssClass
 * @param action
 */
function manageBodyClass(cssClass: string, action: string = "toggle") {
    switch (action) {
        case "add":
            if (document.body) document.body.classList.add(cssClass)
            break
        case "remove":
            if (document.body) document.body.classList.remove(cssClass)
            break
        default:
            if (document.body) document.body.classList.toggle(cssClass)
            break
    }

    return true
}

/**
 * Changes the layout type
 * @param action
 */
function* changeLayout(action: ActionLayoutProps) {
    try {
        if (action.payload.layoutType === "horizontal") {
            // yield put(changeTopbarThemeAction("dark"))
            document.body.removeAttribute("data-sidebar")
            document.body.removeAttribute("data-sidebar-image")
            document.body.removeAttribute("data-sidebar-size")
        } else {
            // yield put(changeTopbarThemeAction("light"))
        }
        yield call(changeBodyAttribute, "data-layout", action.payload.layoutType)
    } catch (error) {
        console.error(error);
    }
}

/**
 * Changes the layout mode
 * @param action
 */
function* changeLayoutMode(action: ActionLayoutProps) {
    try {
        // yield call(changeBodyAttribute, "data-layout-mode", mode);
        yield call(changeHtmlAttribute, "data-bs-theme", action.payload.layoutModeType);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Changes the layout width
 * @param action
 */
function* changeLayoutWidth(action: ActionLayoutProps) {
    try {
        if (action.payload.layoutWidth === "boxed") {
            yield put(actions.actionChangeSideBarType({...action.payload, leftSideBarType: "icon"}))
            yield call(changeBodyAttribute, "data-layout-size", action.payload.layoutWidth)
            yield call(changeBodyAttribute, "data-layout-scrollable", "false")
        } else if (action.payload.layoutWidth === "scrollable") {
            yield put(actions.actionChangeSideBarType({...action.payload, leftSideBarType: "default"}))
            yield call(changeBodyAttribute, "data-layout-scrollable", "true")
        } else {
            yield put(actions.actionChangeSideBarType({...action.payload, leftSideBarType: "default"}))
            yield call(changeBodyAttribute, "data-layout-size", action.payload.layoutWidth)
            yield call(changeBodyAttribute, "data-layout-scrollable", "false")
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Changes the left sidebar theme
 * @param action
 */
function* changeLeftSidebarTheme(action: ActionLayoutProps) {
    try {
        yield call(changeBodyAttribute, "data-sidebar", action.payload.leftSideBarTheme)
    } catch (error) {
        console.log(error);
    }
}

/**
 * Changes the left sidebar theme Image
 * @param action
 */
function* changeLeftSidebarThemeImage(action: ActionLayoutProps) {
    try {
        yield call(changeBodyAttribute, "data-sidebar-image", action.payload.leftSideBarThemeImage)
    } catch (error) {
        console.log(error);
    }
}

/**
 * Changes the topbar theme
 * @param action
 */
function* changeTopbarTheme(action: ActionLayoutProps) {
    try {
        yield call(changeBodyAttribute, "data-topbar", action.payload.topbarTheme)
    } catch (error) {
        console.log(error);
    }
}

/**
 * Changes the left sidebar type
 * @param action
 */
function* changeLeftSidebarType(action: ActionLayoutProps) {
    try {
        switch (action.payload.leftSideBarType) {
            case "compact":
                yield call(changeBodyAttribute, "data-sidebar-size", "small")
                yield call(manageBodyClass, "sidebar-enable", "remove")
                yield call(manageBodyClass, "vertical-collpsed", "remove")
                break
            case "icon":
                yield call(changeBodyAttribute, "data-sidebar-size", "")
                yield call(changeBodyAttribute, "data-keep-enlarged", "true")
                yield call(manageBodyClass, "vertical-collpsed", "add")
                break
            case "condensed":
                yield call(manageBodyClass, "sidebar-enable", "add")
                if (window.screen.width >= 992) {
                    yield call(manageBodyClass, "vertical-collpsed", "remove")
                    yield call(manageBodyClass, "sidebar-enable", "remove")
                    yield call(manageBodyClass, "vertical-collpsed", "add")
                    yield call(manageBodyClass, "sidebar-enable", "add")
                } else {
                    yield call(manageBodyClass, "sidebar-enable", "add")
                    yield call(manageBodyClass, "vertical-collpsed", "add")
                }
                break
            default:
                yield call(changeBodyAttribute, "data-sidebar-size", "")
                yield call(manageBodyClass, "sidebar-enable", "remove")
                if (!action.payload.isMobile) {
                    yield call(manageBodyClass, "vertical-collpsed", "remove")
                }
                break
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Show the rightsidebar
 */
function* showRightSidebar() {
    try {
        yield call(manageBodyClass, "right-bar-enabled", "add")
    } catch (error) {
        console.log(error);
    }
}

/**
 * Watchers
 */
export function* watchChangeLayoutType() {
    yield takeEvery(actions.actionChangeLayout, changeLayout)
}

export function* watchChangeLayoutWidth() {
    yield takeEvery(actions.actionChangeLayoutWidth, changeLayoutWidth)
}

export function* watchChangeLeftSidebarTheme() {
    yield takeEvery(actions.actionChangeSidebarTheme, changeLeftSidebarTheme)
}

export function* watchChangeLeftSidebarThemeImage() {
    yield takeEvery(actions.actionChangeSidebarThemeImage, changeLeftSidebarThemeImage)
}

export function* watchChangeLeftSidebarType() {
    yield takeEvery(actions.actionChangeSideBarType, changeLeftSidebarType)
}

export function* watchChangeTopbarTheme() {
    yield takeEvery(actions.actionChangeTopbarTheme, changeTopbarTheme)
}

export function* watchShowRightSidebar() {
    yield takeEvery(actions.actionShowRightSidebar, showRightSidebar)
}

export function* watchSChangeLayoutMode() {
    yield takeEvery(actions.actionChangeLayoutMode, changeLayoutMode)
}

export function* layoutSaga() {
  yield all([
    fork(watchSChangeLayoutMode),
    fork(watchChangeLayoutType),
    fork(watchChangeLayoutWidth),
    fork(watchChangeLeftSidebarTheme),
    fork(watchChangeLeftSidebarThemeImage),
    fork(watchChangeLeftSidebarType),
    fork(watchShowRightSidebar),
    fork(watchChangeTopbarTheme),
  ])
}
