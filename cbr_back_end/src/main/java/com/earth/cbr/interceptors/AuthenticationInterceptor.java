package com.earth.cbr.interceptors;

import com.earth.cbr.models.authentication.PassToken;
import com.earth.cbr.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

public class AuthenticationInterceptor implements HandlerInterceptor {

    @Autowired
    private TokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        Method method = getMethodFromHandlerMethod((HandlerMethod) handler);
        if (!doesRequestNeedAuth(method)) {
            return true;
        }
        if (!doesTokenPresentInHeader(request)) {
            return false;
        }

        String token = getTokenFromHeader(request);
        boolean doesTokenHasValidWorker = tokenService.doesTokenHasValidWorker(token);
        return doesTokenHasValidWorker;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

    private Method getMethodFromHandlerMethod(HandlerMethod handlerMethod) {
        return handlerMethod.getMethod();
    }

    private boolean doesRequestNeedAuth(Method method) {
        return !hasPassToken(method);
    }

    private boolean hasPassToken(Method method) {
        return method.isAnnotationPresent(PassToken.class);
    }

    private boolean doesTokenPresentInHeader(HttpServletRequest request) {
        String token = getTokenFromHeader(request);
        return token != null;
    }

    private String getTokenFromHeader(HttpServletRequest request) {
        return request.getHeader("token");
    }
}
