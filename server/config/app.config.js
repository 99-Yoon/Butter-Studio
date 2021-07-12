const config = {
    env: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    port: process.env.PORT || 3001,
    // jwtSecret: 'dfkasf23i$efksdfks!',
    jwtExpires: '7d',
    cookieName: 'butterStudio',
    cookieMaxAge: 60 * 60 * 24 * 7 * 1000,
}

export default config