package com.justforfun.eazystore_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.justforfun.eazystore_backend.model.Customer;
import com.justforfun.eazystore_backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomerOrderByCreatedAtDesc(Customer customer);
    List<Order> findByOrderStatus(String orderStatusCreated);
    
}
