package com.justforfun.eazystore_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.justforfun.eazystore_backend.constants.ApplicationConstants;
import com.justforfun.eazystore_backend.dto.ContactResponseDto;
import com.justforfun.eazystore_backend.dto.OrderResponseDto;
import com.justforfun.eazystore_backend.dto.ResponseDto;
import com.justforfun.eazystore_backend.model.Order;
import com.justforfun.eazystore_backend.service.ContactService;
import com.justforfun.eazystore_backend.service.OrderService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final OrderService orderService;
    private final ContactService contactService;

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDto>> getAllPendingOrders() {
        return ResponseEntity.ok(orderService.getAllPendingOrders());
    }

    @PatchMapping("/orders/{orderId}/confirm")
    public ResponseEntity<ResponseDto> confirmOrder(@PathVariable Long orderId) {
        Order confirmOrder = orderService.updateOrderStatus(orderId, ApplicationConstants.ORDER_STATUS_CONFIRMED);
        return ResponseEntity.ok(new ResponseDto("200", "Order #" + confirmOrder.getOrderId() + " has been approved."));
    }

    @PatchMapping("/orders/{orderId}/cancel")
    public ResponseEntity<ResponseDto> cancelOrder(@PathVariable Long orderId) {
        Order cancelledOrder = orderService.updateOrderStatus(orderId, ApplicationConstants.ORDER_STATUS_CANCELLED);
        return ResponseEntity.ok(new ResponseDto("200", "Order #" + cancelledOrder.getOrderId() + " has been cancelled."));
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ContactResponseDto>> getAllOpenMessages() {
        return ResponseEntity.ok(contactService.getAllOpenMessages());
    }

    @PatchMapping("/messages/{messageId}/close")
    public ResponseEntity<ResponseDto> closeMessage(@PathVariable Long contactId) {
        contactService.updateMessageStatus(contactId, ApplicationConstants.CLOSED_MESSAGE);
        return ResponseEntity.ok(new ResponseDto("200", "Message #" + contactId + " has been closed."));
    }

}