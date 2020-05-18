const ENDPOINT_DEV = 'http://localhost:5000'
const ENDPOINT_PRD = 'http://localhost:5000'

const ENDPOINT = (process.env.NODE_ENV && process.env.NODE_ENV === 'development' ? ENDPOINT_DEV : ENDPOINT_PRD)

export const getEndpoint = () => {
    return ENDPOINT
}