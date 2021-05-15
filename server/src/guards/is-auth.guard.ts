export function isAuthGuard(req, res, next) {
  if (!req.isAuthenticated()) {
    throw new Error('Not authenticated')
  }

  return next()
}
