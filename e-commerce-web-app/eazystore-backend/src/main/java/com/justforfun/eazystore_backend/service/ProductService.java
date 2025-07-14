package com.justforfun.eazystore_backend.service;

import com.justforfun.eazystore_backend.dto.ProductDto;

import java.util.List;

public interface ProductService {

    List<ProductDto> getProducts();

}
