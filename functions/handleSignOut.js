import { removeCookies } from 'cookies-next';

export const handleSignOut = (router) => {
    removeCookies('access_token')
    removeCookies('refresh_token')
    router.reload();
}