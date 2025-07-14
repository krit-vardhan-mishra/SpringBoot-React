package com.justforfun.eazystore_backend.repository;

import com.justforfun.eazystore_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
