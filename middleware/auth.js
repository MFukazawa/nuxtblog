export default function ({ store, redirect }) {
  if (!store.getters.isAuthenticated) {
    console.log('[Middleware] Auth')
    redirect('/admin/auth')
  }
}
