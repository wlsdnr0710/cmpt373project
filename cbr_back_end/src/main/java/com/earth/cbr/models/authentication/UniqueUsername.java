package com.earth.cbr.models.authentication;
import javax.validation.Constraint;
import java.lang.annotation.*;
import javax.validation.Payload;
import static java.lang.annotation.ElementType.METHOD;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

// Based on tutorial Spring web app tutorial 40: Custom Validation Annotation : javavids
// from https://www.youtube.com/watch?v=rFf0CaxaHVc

@Target({METHOD, FIELD})
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {UniqueUsernameValidator.class})

public @interface UniqueUsername {
    String message();

    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default {};
}
