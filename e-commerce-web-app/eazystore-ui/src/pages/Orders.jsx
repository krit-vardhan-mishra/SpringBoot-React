import apiClient from "../api/apiClient";
import { useLoaderData } from "react-router-dom";
import PageTitle from "../components/PageTitle";

export default function Orders() {
  const orders = useLoaderData() || []; // Provide default empty array

  function formatDate(isoDate) {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return (
    <div className="min-h-[852px] container mx-auto px-6 py-12 font-primary dark:bg-darkbg">
      {!orders || orders.length === 0 ? (
        <p className="text-center text-2xl  text-primary dark:text-lighter">
          No orders found.
        </p>
      ) : (
        <div className="space-y-6 mt-4">
          <PageTitle title="My Orders" />
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white dark:bg-gray-700 shadow-md rounded-md p-6"
            >
              <h2 className="text-xl font-semibold mb-2 text-primary dark:text-lighter">
                Order #{order.orderId}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Status:{" "}
                <span className="font-medium text-gray-800 dark:text-lighter">
                  {order.status}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Price:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  ${order.totalPrice}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Date:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {formatDate(order.createdAt)}
                </span>
              </p>

              <div className="mt-4 space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center border-b pb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Price: ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function ordersLoader() {
  try {
    const response = await apiClient.get("/orders/");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
      error.message ||
      "Failed to fetch orders. Please try again.",
      { status: error.status || 500 }
    );
  }
}