const config = {
    env: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    port: process.env.PORT || 3001,
    jwtSecret: 'dfkasf23i$efksdfks!',
    jwtExpires: '7d',
    cookieName: 'butterStudio',
    cookieMaxAge: 60 * 60 * 24 * 7 * 1000,
    kakaoAdminKey: 'e3ce7106688a35e072e2630daa9d7250',
}

export default config