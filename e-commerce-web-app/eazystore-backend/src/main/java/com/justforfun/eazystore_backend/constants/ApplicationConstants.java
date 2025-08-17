package com.justforfun.eazystore_backend.constants;

public class ApplicationConstants {

    private ApplicationConstants() {
        throw new AssertionError("Cannot instantiate constants class");
    }

    public static final String JWT_SECRET_KEY = "JWT_SECRET";
    public static final String JWT_SECRET_DEFAULT_VALUE = "XKOzkoS8B8K1uCylsyog4SxchVtJcztWlAsj59UC4us=";
    public static final String JWT_HEADER = "Authorization";
    public static final String ORDER_STATUS_COMPLETED = "COMPLETED";
    public static final String ORDER_STATUS_CREATED = "CREATED";
    public static final String ORDER_STATUS_CANCELLED = "CANCELLED";
}