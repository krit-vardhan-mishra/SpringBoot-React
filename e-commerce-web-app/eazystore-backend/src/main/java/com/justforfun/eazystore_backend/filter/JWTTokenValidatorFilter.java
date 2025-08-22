package com.justforfun.eazystore_backend.filter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.AntPathMatcher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.justforfun.eazystore_backend.constants.ApplicationConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JWTTokenValidatorFilter extends OncePerRequestFilter {
    private final AntPathMatcher pathMatcher = new AntPathMatcher();
    private final List<String> publicPaths;
    
    @Autowired
    private Environment environment;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader(ApplicationConstants.JWT_HEADER);
        
        if (null != authHeader && authHeader.startsWith("Bearer ")) {
            try {
                String jwt = authHeader.substring(7);
                String secret = environment.getProperty(ApplicationConstants.JWT_SECRET_KEY,
                        ApplicationConstants.JWT_SECRET_DEFAULT_VALUE);
                SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
                
                Claims claims = Jwts.parser().verifyWith(secretKey)
                        .build().parseSignedClaims(jwt).getPayload();
                String username = String.valueOf(claims.get("email"));
                String roles = String.valueOf(claims.get("roles"));
                
                Authentication authentication = new UsernamePasswordAuthenticationToken(username,
                        null, AuthorityUtils.commaSeparatedStringToAuthorityList(roles));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch(ExpiredJwtException exception) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"JWT Token is expired\"}");
                return;
            } catch (Exception exception) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Invalid Token received\"}");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request)
            throws ServletException {
        String path = request.getRequestURI();
        return publicPaths.stream()
                .anyMatch(publicPath -> pathMatcher.match(publicPath, path));
    }
}