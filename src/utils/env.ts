const AUTH_SECRET = process.env.AUTH_SECRET;

if(!AUTH_SECRET){
    throw new Error("AUTH_ENV is not defined")
}

export const env = {
    authSecret: AUTH_SECRET
}