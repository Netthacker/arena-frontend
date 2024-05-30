/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const lightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#FFA500',  // Laranja
    'primary-darken-1': '#FF8C00',
    secondary: '#FFA500', // Laranja
    'secondary-darken-1': '#FF8C00',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

const darkTheme = {
  dark: true,
  colors: {

    background: '#333333',
    surface: '#1F1F1F',
    primary: '#FFA500',  // Laranja
    'primary-darken-1': '#FF8C00',
    secondary: '#FFC04D',
    'secondary-darken-1': '#FF8C00',
    error: '#CF6679',
    info: '#BB86FC',
    success: '#03DAC6',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes:{
      lightTheme,darkTheme,
    },
  },

  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
