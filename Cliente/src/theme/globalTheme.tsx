import useThemeStore from "./zustandThemeManagement"

/*backgroundMain: "#e9ecef",
backgroundSecondary: "#666",
FSHMain: "#184e77",
primaryMain: '#52b69a',
secondaryMain: '#168aad',
tertiaryMain: "red",
tableMain: "#aaa",
fontPrimaryMain: "#fff",*/


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

  export const glheme = {
    palette: {
      background:{
        main:"#222",
        secondary:"#666"
      },
      FSH:{
        main:"#184e77"
      },
      primary: {
        main: '#52b69a', 
      },
      secondary: {
        main: '#168aad', 
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
        main:"#fff"
      }
    }
  };

