package com.justforfun.eazystore_backend.service;

import com.justforfun.eazystore_backend.dto.ProductDto;
import com.justforfun.eazystore_backend.model.Product;
import com.justforfun.eazystore_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductDto> getProducts() {
        return productRepository.findAll()
                .stream().map(this::transformToDto).collect(Collectors.toList());
    }

    private ProductDto transformToDto(Product product) {
        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(product, productDto);
        return productDto;
    }
}
