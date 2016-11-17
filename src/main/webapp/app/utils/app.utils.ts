//Headers HTTP
export const HEADER_X_SECRET:string = 'X-Secret';
export const HEADER_X_TOKEN_ACCESS:string = 'X-TokenAccess';
export const HEADER_X_DIGEST:string = 'X-Digest';
export const HEADER_X_ONCE:string = 'X-Once';
export const HEADER_WWW_AUTHENTICATE:string = 'WWW-Authenticate';
export const HEADER_AUTHENTICATION:string = 'Authentication';
export const CSRF_CLAIM_HEADER:string = "X-HMAC-CSRF";

//Local storage keys
export const STORAGE_ACCOUNT_TOKEN:string = 'hmacApp-account';
export const STORAGE_SECURITY_TOKEN:string = 'hmacApp-security';

//Common http root api
export const BACKEND_API_PATH:string = '/api';
export const BACKEND_API_AUTHENTICATE_PATH:string = '/authenticate';
export const BACKEND_API_ROOT_URL:string = 'http://localhost:8080'+BACKEND_API_PATH;

export class UrlMatcher {
    public static matches(url:string):boolean {
        return url.indexOf(BACKEND_API_PATH) !== -1
            && url.indexOf(BACKEND_API_PATH+BACKEND_API_AUTHENTICATE_PATH) === -1;
    }
}
