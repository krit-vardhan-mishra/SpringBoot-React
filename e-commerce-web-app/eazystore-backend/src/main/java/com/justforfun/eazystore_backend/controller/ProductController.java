package com.justforfun.eazystore_backend.controller;

import com.justforfun.eazystore_backend.dto.ProductDto;
import com.justforfun.eazystore_backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/")
    public List<ProductDto> getProducts() {
        return productService.getProducts();
    }

}
