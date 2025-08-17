package com.justforfun.eazystore_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.justforfun.eazystore_backend.constants.ApplicationConstants;
import com.justforfun.eazystore_backend.dto.OrderRequestDto;
import com.justforfun.eazystore_backend.exception.ResourceNotFoundException;
import com.justforfun.eazystore_backend.model.Customer;
import com.justforfun.eazystore_backend.model.Order;
import com.justforfun.eazystore_backend.model.OrderItem;
import com.justforfun.eazystore_backend.model.Product;
import com.justforfun.eazystore_backend.repository.OrderRepository;
import com.justforfun.eazystore_backend.repository.ProductRepository;
import com.justforfun.eazystore_backend.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ProfileServiceImpl profileServiceImpl;

    @Override
    public void createOrder(OrderRequestDto orderRequest) {
        Customer customer = profileServiceImpl.getAuthenticatedCustomer();

        Order order = new Order();
        order.setCustomer(customer);
        BeanUtils.copyProperties(orderRequest, order);
        orderRepository.save(order);
        order.setOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);
        List<OrderItem> orderItems = orderRequest.items().stream().map(item -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            Product product = productRepository.findById(item.productId())
                    .orElseThrow(
                            () -> new ResourceNotFoundException("Product", "ProductID", item.productId().toString()));
            orderItem.setProduct(product);
            orderItem.setQuantity(item.quantity());
            orderItem.setPrice(item.price());
            return orderItem;
        }).collect(Collectors.toList());
        order.setOrderItems(orderItems);
        orderRepository.save(order);
    }

}
