package com.justforfun.eazystore_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EazyController {

    @GetMapping("/")
    public String noIdea() {
        return "Hello From Eazy Store-Backend";
    }

}
