// src/components/dashboard/OrdersView.tsx

import React from "react";
import { useOrders, Order } from "@/context/OrdersContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Truck } from "lucide-react";

export const OrdersView = () => {
  const { orders } = useOrders();

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
        return "default";
      case "shipped":
        return "outline";
      case "delivered":
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage and track your customer orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
              >
                {/* Left: basic info */}
                <div className="flex items-center space-x-6">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                  </div>
                  <div>
                    <p className="font-medium">{order.items.length} items</p>
                    <p className="text-sm text-muted-foreground">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Right: status & actions */}
                <div className="flex items-center space-x-4">
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Truck className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <p className="text-center text-muted-foreground">No orders yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
