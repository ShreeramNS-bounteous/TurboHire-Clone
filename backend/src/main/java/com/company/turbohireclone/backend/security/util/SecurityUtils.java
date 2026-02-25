package com.company.turbohireclone.backend.security.util;

import com.company.turbohireclone.backend.security.model.AuthUser;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {

    private SecurityUtils() {}

    public static Long getCurrentUserId() {

        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            return null;
        }

        Object principal = auth.getPrincipal();

        if (!(principal instanceof AuthUser)) {
            return null;
        }

        return ((AuthUser) principal).getUserId();
    }

    public static String getCurrentUserRole() {
        return ((AuthUser) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal()).getRole();
    }

    public static Long getCurrentBU() {
        return ((AuthUser) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal()).getBuId();
    }

}
