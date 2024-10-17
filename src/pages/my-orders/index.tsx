import { Suspense, useEffect, useRef, useState } from "react";
import { defer, redirect, useLoaderData } from "react-router-dom";
import OrderCard from "./components/OrderCard";
import {
  UnauthorizedError,
  loaderFetchProtected,
} from "@/utils/loader-fetch-protected";
import { OrderCardProps } from "./components/types";
import useScreenValue from "@/common/Hooks/use-screenValue";
import useFetch from "@/common/Hooks/use-fetch";
import { initialOrdersToFetch } from "@/utils/initial-orders-to-fetch";
import { CircularProgress } from "@mui/material";

const MyOrders = () => {
  const { ordersData, skipped }: any = useLoaderData();
  const [orders, setOrders] = useState(ordersData)
  const [ordersToSkip, setOrdersToSkip] = useState<number>(skipped)
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<any>(null);
  const screenValue = useScreenValue({
    xsmall: 2,
    small: 4,
    medium: 6,
    large: 6,
    default: 6
  });
  const { fetchData } = useFetch()

  const fetchOrders = async (skip: number, limit: number) => {
    const queryParams = new URLSearchParams({
      skip: String(skip),
      limit: String(limit),
    });
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/orders/user?${queryParams}`,
      "GET",
      null,
      true
    );

    if (result?.response.ok) {
      return result;
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const fetchMoreOrders = async () => {
        for (const entry of entries) {
          if (entry.isIntersecting && hasMore) {
            if (orders.length < screenValue) {
              setHasMore(false);
              return
            }
            try {
              const fetchedOrders: any = await fetchOrders(ordersToSkip, screenValue);
              if (fetchedOrders && fetchedOrders.data.length === screenValue) {
                setOrders((prev: any) => [...prev, ...fetchedOrders.data]);
                setOrdersToSkip((prev: number) => prev + screenValue)
              } else if (fetchedOrders.data.length < screenValue) {
                setOrders((prev: any) => [...prev, ...fetchedOrders.data]);
                setOrdersToSkip((prev: number) => prev + screenValue)
                setHasMore(false);
              } else {
                setHasMore(false);
              }
            } catch (error) {
              console.error("Failed to fetch products:", error);
            }
          }
        }
      };

      fetchMoreOrders();
    }, { threshold: 0.1 });

    const currentElement = observerTarget.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasMore, ordersToSkip]);

  return (
    <div className="flex w-full">
      <div className="grow w-full">
        <h2 className="text-xl font-semibold mb-2">Previous Orders</h2>
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <p>Loading Orders.. <CircularProgress /></p>
        </div>}>
          {orders.map((order: OrderCardProps, index: number) => {
            const isThirdToLast = index === orders.length - 2;
            return (
              <OrderCard
                ref={isThirdToLast ? observerTarget : null}
                key={order.orderId}
                orderId={order.orderId}
                orderTotal={order.orderTotal}
                user={order.user}
                orderQuantity={order.orderQuantity}
                orderDate={order.orderDate}
                orderItems={order.orderItems}
              />
            )
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default MyOrders;


export const loader = async ({ request }: any) => {
  const initOrderCount = initialOrdersToFetch();
  try {
    const result = await loaderFetchProtected(
      `${import.meta.env.VITE_API_URL}/orders/user?skip=0&limit=${initOrderCount}`,
      "GET",
      request,
    );
    return defer({ ordersData: result, skipped: initOrderCount });
  } catch (error: unknown) {
    if (error instanceof UnauthorizedError) {
      return redirect("/sign-in");
    }
  }
};
