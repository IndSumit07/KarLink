
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import supabase from "../libs/Supabase";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [myOrders, setMyOrders] = useState({ asVendor: [], asClient: [], loaded: false });

    useEffect(() => {
        if (!user) {
            setMyOrders({ asVendor: [], asClient: [], loaded: false });
        } else {
            // Optional: Auto fetch on login
            // fetchMyOrders(); 
        }
    }, [user]);

    // Fetch a single order by ID with all relations
    const getOrderById = useCallback(async (orderId) => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    rfqs (*),
                    bids (*),
                    buyer:profiles!orders_buyer_id_fkey (full_name, avatar_url, email),
                    seller:profiles!orders_seller_id_fkey (full_name, avatar_url, email)
                `)
                .eq('id', orderId)
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error("Error fetching order:", error);
            return { data: null, error };
        }
    }, []);

    // Fetch all my orders (both as buyer and seller) with caching
    const fetchMyOrders = useCallback(async (force = false) => {
        if (!user) return;
        if (!force && myOrders.loaded) return; // cache hit

        setLoading(true);
        try {
            // console.log("Fetching orders for user:", user.id);
            // using explicit foreign key names to avoid ambiguity and ensure correct join
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    rfqs (title, quantity, unit, description),
                    buyer:profiles!orders_buyer_id_fkey (full_name, avatar_url),
                    seller:profiles!orders_seller_id_fkey (full_name, avatar_url)
                `)
                .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Supabase Error fetching orders:", error);
                // If 400 error: "Could not find relationship..." -> Run the fix_orders_relationship.sql script
                if (error.code !== '42P01') throw error;
                return;
            }

            // console.log("Fetched Orders Raw:", data);

            // Client-side filtering
            // "Orders Placed" (previous code) = Bids I made that were accepted. So I am the BIDDER/SELLER. 
            // "Orders Received" (previous code) = RFQs I created. So I am the BUYER.

            // Let's standardise based on E-commerce:
            // I am Client (Buyer): I "Placed" an order (gave work).
            // I am Vendor (Seller): I "Received" an order (got work).

            // BUT, in the previous `YourOrders.jsx`:
            // `myWonOrders` (I am Seller) was labeled "My Won Bids (Jobs to do)".
            // `myGivenOrders` (I am Buyer) was labeled "My Confirmed RFQs (Work assigned)".

            // Let's call them "WorkAsVendor" and "WorkAsClient" to be safe in state, map to tabs in UI.

            const asVendor = data.filter(o => o.seller_id === user.id);
            const asClient = data.filter(o => o.buyer_id === user.id);

            setMyOrders({
                asVendor,
                asClient,
                loaded: true
            });

        } catch (error) {
            console.error("Error fetching my orders:", error);
        } finally {
            setLoading(false);
        }
    }, [user, myOrders.loaded]);

    // Update Order Status
    const updateOrderStatus = async (orderId, newStatus, message = null) => {
        setLoading(true);
        try {
            const updatePayload = { status: newStatus };
            if (message) {
                updatePayload.status_message = message;
            }

            const { data, error } = await supabase
                .from('orders')
                .update(updatePayload)
                .eq('id', orderId)
                .select()
                .single();

            if (error) throw error;
            toast.success(`Order status updated to ${newStatus}`);

            // Refresh local list state
            fetchMyOrders(true);

            return { data, error: null };
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("Failed to update status");
            return { data: null, error };
        } finally {
            setLoading(false);
        }
    };

    const value = {
        getOrderById,
        fetchMyOrders,
        myOrders,
        updateOrderStatus,
        loading
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    return useContext(OrderContext);
};
