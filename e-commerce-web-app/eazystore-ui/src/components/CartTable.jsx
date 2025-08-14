import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { X } from 'lucide-react';

export default function CartTable() {
    const { cart, addToCart, removeFromCart } = useCart();

    const subtotal = cart
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);

    const updateCartQuantity = (productId, quantity) => {
        const product = cart.find((item) => item.productId === productId);
        addToCart(product, quantity - (product?.quantity || 0));
    };

    return (
        <div className="min-h-80 max-w-4xl mx-auto my-8 w-full font-primary">
            <table className="w-full">
                <thead>
                    <tr className="uppercase text-sm text-primary dark:text-light border-b border-primary dark:border-light">
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Quantity</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Remove</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-primary dark:divide-light">
                    {cart.map((item) => (
                        <tr
                            key={item.productId}
                            className="text-sm sm:text-base text-primary dark:text-light text-center"
                        >
                            <td className="px-4 sm:px-6 py-4 flex items-center">
                                <Link
                                    to={`/products/${item.productId}`}
                                    state={{ product: item }}
                                    className="flex items-center"
                                >
                                    <img
                                        src={`/stickers/${item.imageUrl}`}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-md object-cover mr-4 hover:scale-110 transition-transform"
                                    />
                                    <span className="text-primary dark:text-light hover:underline">
                                        {item.name}
                                    </span>
                                </Link>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                                <input
                                    type="number"
                                    inputMode="numeric"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateCartQuantity(
                                            item.productId,
                                            parseInt(e.target.value, 10) || 1
                                        )
                                    }
                                    className="w-16 px-2 py-1 border rounded-md focus:ring focus:ring-light dark:focus:ring-gray-600 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                />
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-base font-light">
                                ${item.price.toFixed(2)}
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                                <button
                                    aria-label="delete-item"
                                    onClick={() => removeFromCart(item.productId)}
                                    className="text-primary dark:text-red-400 border border-primary dark:border-red-400 p-2 rounded hover:bg-lighter dark:hover:bg-red-700"
                                >
                                    <X />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {cart.length > 0 && (
                        <tr className="text-center">
                            <td></td>
                            <td className="text-base text-gray-600 dark:text-gray-300 font-semibold uppercase px-4 sm:px-6 py-4">
                                Subtotal
                            </td>
                            <td className="text-lg text-primary dark:text-blue-400 font-medium px-4 sm:px-6 py-4">
                                ${subtotal}
                            </td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}