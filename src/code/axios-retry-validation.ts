import { AxiosError } from 'axios'
import { isIdempotentRequestError } from 'axios-retry'

const isNetworkError = (error: AxiosError) => (!error.response && error.code !== 'ECONNABORTED')

export const retryCondition = (error: AxiosError) => (isNetworkError(error) || isIdempotentRequestError(error))
