package com.justforfun.eazystore_backend.config;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.benmanes.caffeine.cache.Caffeine;

@Configuration
public class CaffeineCacheConfig {

    @Bean
    CacheManager caffeineCacheManager() {
        CaffeineCache productCache = new CaffeineCache("products",
                Caffeine.newBuilder()
                        .expireAfterWrite(30, TimeUnit.MINUTES)
                        .maximumSize(1000)
                        .build());

        CaffeineCache rolesCache = new CaffeineCache("roles",
                Caffeine.newBuilder()
                        .expireAfterWrite(1, TimeUnit.DAYS)
                        .maximumSize(1)
                        .build());

        SimpleCacheManager manager = new SimpleCacheManager();
        manager.setCaches(Arrays.asList(productCache, rolesCache));
        return manager;
    }

}
