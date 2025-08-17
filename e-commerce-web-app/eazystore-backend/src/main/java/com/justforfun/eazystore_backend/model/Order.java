package com.justforfun.eazystore_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order extends BaseModal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    @NotNull
    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Size(max = 200)
    @NotNull
    @Column(name = "payment_id", nullable = false, length = 200)
    private String paymentId;

    @Size(max = 50)
    @NotNull
    @Column(name = "payment_status", nullable = false, length = 50)
    private String paymentStatus;

    @Size(max = 50)
    @NotNull
    @Column(name = "order_status", nullable = false, length = 50)
    private String orderStatus;

}
