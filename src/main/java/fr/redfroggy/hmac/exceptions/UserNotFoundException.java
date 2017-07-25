package fr.redfroggy.hmac.exceptions;

/**
 * User not found exception
 * Created by michael on 27/06/17.
 */
public class UserNotFoundException extends AbstractRuntimeException {

    private static final String USER_NOT_FOUND = "USER_NOT_FOUND";


    public UserNotFoundException(String message) {
        super(message, USER_NOT_FOUND);
    }
}
