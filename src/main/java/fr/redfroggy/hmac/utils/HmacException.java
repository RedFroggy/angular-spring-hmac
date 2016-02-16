package fr.redfroggy.hmac.utils;

/**
 * Hmac signer exception
 * Created by Michael DESIGAUD on 16/02/2016.
 */
public class HmacException extends Exception{

    public HmacException(String message, Throwable throwable) {
        super(message,throwable);
    }
}
