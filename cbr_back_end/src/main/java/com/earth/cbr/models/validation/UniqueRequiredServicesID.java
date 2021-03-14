package com.earth.cbr.models.validation;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import javax.validation.Constraint;
import java.lang.annotation.*;
import javax.validation.Payload;

// Based on tutorial Spring web app tutorial 40: Custom Validation Annotation : javavids
// from https://www.youtube.com/watch?v=rFf0CaxaHVc

@Target({METHOD, FIELD})
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {UniqueRequiredServicesIDValidator.class})
public @interface UniqueRequiredServicesID {
    String message();

    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default {};
}
