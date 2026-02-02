import React, {type ReactNode, useEffect} from "react";
import withRouter from "../common/withRouter";
import { actions } from "../../store/layout/reducer.ts";

// Layout Related Components
import {Header} from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import {RightSidebar} from "../CommonForBoth/RightSidebar";

//redux
import { useSelector, useDispatch } from "react-redux";
import type {RootState} from "../../store/store.ts";

type Props = {
  children: ReactNode;
}

const Layout = (props:Props) => {
  const dispatch = useDispatch();
  const layoutState = useSelector((state: RootState) => state.layout);
  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // const toggleMenuCallback = () => {
  //   if (layoutState.leftSideBarType === "default") {
  //     dispatch(actions.actionChangeSideBarType({
  //       ...layoutState,
  //       isMobile: isMobile,
  //     }))
  //   } else if (layoutState.leftSideBarType === "condensed") {
  //     dispatch(actions.actionChangeSideBarType({
  //       ...layoutState,
  //       leftSideBarType: "default",
  //       isMobile: isMobile,
  //     }))
  //   }
  // };

  //hides right sidebar on body click
  const hideRightbar = (event:Event) => {
    const rightbar = document.getElementById("right-bar");
    //if clicked in inside right bar, then do nothing
    if (rightbar && event.target!=null && rightbar.contains(event.target as Node)) {
      return;
    } else {
      //if clicked in outside of rightbar then fire action for hide rightbar
      dispatch(actions.actionShowRightSidebar({
        ...layoutState,
        showRightSidebar: false
      }))

    }
  };

  /*
  layout  settings
  */

  useEffect(() => {
    //init body click event fot toggle rightbar
    document.body.addEventListener("click", hideRightbar, true);

    const preloader = document.getElementById("preloader");
    const status = document.getElementById("status");
    if (layoutState.isPreloader === true) {
      if(preloader) {
        preloader.style.display = "block";
      }
      if(status){
        status.style.display = "block";
      }

      setTimeout(function () {
        if(preloader) {
          preloader.style.display = "none";
        }
        if(status) {
          status.style.display = "none";
        }
      }, 2500);
    } else {
      if(preloader) {
        preloader.style.display = "none";
      }
      if(status) {
        status.style.display = "none";
      }
    }
  }, [layoutState.isPreloader]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(actions.actionChangeLayout({
      ...layoutState,
      layoutType: "vertical",
    }))
  }, [dispatch]);

  useEffect(() => {
    if (layoutState.leftSideBarTheme) {
      dispatch(actions.actionChangeSidebarTheme({
        ...layoutState,
        leftSideBarTheme:layoutState.leftSideBarTheme
      }))
    }
  }, [layoutState.leftSideBarTheme, dispatch]);

  useEffect(() => {
    if (layoutState.layoutModeType) {
      dispatch(actions.actionChangeLayoutMode({
        ...layoutState,
        layoutModeType:layoutState.layoutModeType,
      }))
    }
  }, [layoutState.layoutModeType, dispatch]);

  useEffect(() => {
    if (layoutState.leftSideBarThemeImage) {
      dispatch(actions.actionChangeSidebarThemeImage({
        ...layoutState,
        leftSideBarThemeImage:layoutState.leftSideBarThemeImage
      }))
    }
  }, [layoutState.leftSideBarThemeImage, dispatch]);

  useEffect(() => {
    if (layoutState.layoutWidth) {
      dispatch(actions.actionChangeLayoutWidth({
        ...layoutState,
        layoutWidth: layoutState.layoutWidth
      }))
    }
  }, [layoutState.layoutWidth, dispatch]);

  useEffect(() => {
    if (layoutState.leftSideBarType) {
      dispatch(actions.actionChangeSideBarType({
        ...layoutState,
        leftSideBarType:layoutState.leftSideBarType
      }))
    }
  }, [layoutState.leftSideBarType, dispatch]);

  useEffect(() => {
    if (layoutState.topbarTheme) {
      dispatch(actions.actionChangeTopbarTheme({
        ...layoutState,
        topbarTheme:layoutState.topbarTheme
      }))
    }
  }, [layoutState.topbarTheme, dispatch]);

  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <Header/>
        <Sidebar/>
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>
      {layoutState.showRightSidebar ? <RightSidebar /> : null}
    </React.Fragment>
  );
};

export default withRouter(Layout);
