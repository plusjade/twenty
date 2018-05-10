export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const API_ENDPOINT = (
  IS_PRODUCTION
    ? "https://www.getdamon.com"
    : "http://localhost:4000"
)

export const CLIENT_ID = (
  IS_PRODUCTION
    ? "704999951282-12gkcc3dbcrshpq3sjjoeas7a8mbgd6o.apps.googleusercontent.com"
    : "704999951282-l2e5eer1eu35idbhhp7arn6eik4fvr3i.apps.googleusercontent.com"
)
