package fr.redfroggy.hmac.exceptions;

/**
 * Abstract runtime exception
 * Created by michael on 27/06/17.
 */
public abstract class AbstractRuntimeException extends RuntimeException {

    private String code;

    public AbstractRuntimeException(String message, String code) {
        super(message);
        this.code = code;
    }

    public AbstractRuntimeException(String message, Throwable cause, String code) {
        super(message, cause);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
