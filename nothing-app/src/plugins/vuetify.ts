/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import {
  mdiAccount,
  mdiAccountGroup,
  mdiAirplane,
  mdiArrowDown,
  mdiArrowLeft,
  mdiArrowRight,
  mdiArrowUp,
  mdiBroom,
  mdiChat,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiClipboardList,
  mdiCog,
  mdiConnection,
  mdiController,
  mdiControllerClassic,
  mdiControllerClassicOutline,
  mdiFacebookWorkplace,
  mdiFilter,
  mdiFlaskEmptyOutline,
  mdiGithub,
  mdiHome,
  mdiLightbulbNight,
  mdiLightbulbNightOutline,
  mdiMagnify,
  mdiPipeDisconnected,
  mdiShopping,
  mdiSnowflakeThermometer,
  mdiSunglasses,
  mdiTrashCan,
  mdiVolleyball,
  mdiWalk,
  mdiWeightLifter
} from '@mdi/js'

// clipboard-list
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      dark: mdiLightbulbNight,
      light: mdiLightbulbNightOutline,
      checked: mdiCheckboxMarked,
      unchecked: mdiCheckboxBlankOutline,
      filter: mdiFilter,
      flask: mdiFlaskEmptyOutline,
      github: mdiGithub,
      home: mdiHome,
      search: mdiMagnify,
      settings: mdiCog,
      todo: mdiClipboardList,
      user: mdiAccount,
      users: mdiAccountGroup,
      nothing: mdiSunglasses,
      delete: mdiTrashCan,


      // todos
      personal: mdiWeightLifter,
      other: mdiSnowflakeThermometer,
      shopping: mdiShopping,
      work: mdiFacebookWorkplace,

      // groups/chats
      chat: mdiChat,
      connect: mdiConnection,
      disconnect: mdiPipeDisconnected,
      send: mdiAirplane,
      room: mdiBroom,


      walking: mdiWalk,
      volleyball: mdiVolleyball,

      arrowRight: mdiArrowRight,
      arrowLeft: mdiArrowLeft,
      arrowUp: mdiArrowUp,
      arrowDown: mdiArrowDown,

      //games
      games: mdiController,
      gamesClassic: mdiControllerClassic,
      gamesClassicOutline: mdiControllerClassicOutline,

    },
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        // #5c6f68, #8aa39b, #95d9c3, #a4f9c8, #a7fff6
        // colors: {
        //   background: '#5c6f68',
        //   primary: '#95d9c3',
        //   secondary: '#a7fff6'
        // }
        colors: {
          background: '#999999',
          primary: '#e5625e',
          secondary: '#e5e059'
        }
      },
      dark: {
        colors: {
          background: '#5c6f68',
          primary: '#95d9c3',
          secondary: '#a7fff6'
        }
      }
    }
  }
})
