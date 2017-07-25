package fr.redfroggy.hmac.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * Controller advice to handle exceptions
 * Created by michael on 27/06/17.
 */
@ControllerAdvice
public class ControllerExceptionHandler {

    private static final String GLOBAL_EXCEPTION_CODE = "GLOBAL_EXCEPTION";

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(Exception.class)
    public ErrorDTO handleGlobalException(Exception ex, HttpServletRequest request) {
        return handleErrorDTO(ex, request, HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserNotFoundException.class)
    public ErrorDTO handleUserNotFoundException(UserNotFoundException ex, HttpServletRequest request) {
        return handleErrorDTO(ex, request, HttpStatus.NOT_FOUND.value());
    }

    private ErrorDTO handleErrorDTO(Exception ex, HttpServletRequest request, int status){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(status);
        if(ex instanceof AbstractRuntimeException) {
            errorDTO.setCode(((AbstractRuntimeException) ex).getCode());
        } else {
            errorDTO.setCode(GLOBAL_EXCEPTION_CODE);
        }

        errorDTO.setDate(new Date());
        errorDTO.setExceptionName(ex.getClass().getCanonicalName());
        errorDTO.setMessage(ex.getMessage());
        errorDTO.setRequest(request.getRequestURL().toString());

        return errorDTO;
    }
}
