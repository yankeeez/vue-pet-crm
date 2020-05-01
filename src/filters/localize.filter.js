import store from '../store'

const locales = {
  'ru-RU': {
    'profile.title': 'Профиль',
    'sidebar.account': 'Счет',
    'meta.title.home': 'Домашняя страница',
    'meta.title.history': 'История'
  },
  'en-EN': {
    'profile.title': 'Profile',
    'sidebar.account': 'Account',
    'meta.title.home': 'Home',
    'meta.title.history': 'History'
  }
}

export default function localizeFilter(key) {
  const locale = store.getters.getUserInfo.locale || 'en-EN'
  return locales[locale][key] || `[Localized error]: ${key} not found`
}
