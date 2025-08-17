package com.justforfun.eazystore_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.justforfun.eazystore_backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
}
