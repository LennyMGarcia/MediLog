import useThemeStore from "./zustandThemeManagement"


export const globalTheme = {
    palette: {
      background:{
        main: String(useThemeStore.getState()["backgroundMain"]),
        secondary:String(useThemeStore.getState()["backgroundSecondary"])
      },
      FSH:{
        main:String(useThemeStore.getState()["FSHMain"])
      },
      primary: {
        main: String(useThemeStore.getState()["primaryMain"]), 
      },
      secondary: {
        main: String(useThemeStore.getState()["secondaryMain"]), 
      },
      tertiary:{
        main:"red"
      },
      caseLabel:{
        active:"#99d98c",
        inactive:"#d9ed92",
        suspended:"#c9184a",
        deleted:"red",
        procces:"#99d98c"
      },
      table:{
        main:"#aaa"
      }

    },
    font:{
      primary:{
        main:String(useThemeStore.getState()["fontPrimaryMain"])
      }
    }
  };

 

