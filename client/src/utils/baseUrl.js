import clientConfig from './clientConfig'

const baseUrl = process.env.NODE_ENV === 'production'
    ? `http://localhost:3001/                ${clientConfig.serverRoot}`
    : `http://localhost:3000`

export default baseUrl