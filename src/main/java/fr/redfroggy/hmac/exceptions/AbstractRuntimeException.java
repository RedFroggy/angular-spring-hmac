package fr.redfroggy.hmac.exceptions;

/**
 * Abstract runtime exception
 * Created by michael on 27/06/17.
 */
abstract class AbstractRuntimeException extends RuntimeException {

    private String code;

    AbstractRuntimeException(String message, String code) {
        super(message);
        this.code = code;
    }

    AbstractRuntimeException(String message, Throwable cause, String code) {
        super(message, cause);
        this.code = code;
    }

    String getCode() {
        return code;
    }
}
