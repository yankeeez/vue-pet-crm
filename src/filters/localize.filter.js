import store from '../store'

const locales = {
  'ru-RU': {
    'profile.title': 'Профиль',
    'sidebar.account': 'Счет'
  },
  'en-EN': {
    'profile.title': 'Profile',
    'sidebar.account': 'Account'
  }
}

export default function localizeFilter(key) {
  const locale = store.getters.getUserInfo.locale || 'en-EN'
  return locales[locale][key] || `[Localized error]: ${key} not found`
}
