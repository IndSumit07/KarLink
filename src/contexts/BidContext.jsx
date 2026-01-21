
import { createContext, useContext, useState } from "react";
import supabase from "../libs/Supabase";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";

const BidContext = createContext();

export const BidProvider = ({ children }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Create a new Bid
    const createBid = async (bidData) => {
        if (!user) {
            toast.error("You must be logged in to place a bid");
            return { error: "User not logged in" };
        }

        setLoading(true);
        console.log("Placing bid for user:", user.id);
        try {
            const { data, error } = await supabase
                .from("bids")
                .insert([
                    {
                        ...bidData,
                        bidder_id: user.id
                    },
                ])
                .select()
                .single();

            if (error) throw error;

            toast.success("Bid placed successfully!");
            return { data, error: null };
        } catch (error) {
            console.error("Error placing bid:", error);
            toast.error("Failed to place bid: " + error.message);
            return { data: null, error };
        } finally {
            setLoading(false);
        }
    };

    // Get bids for a specific RFQ
    const getBidsByRfqId = async (rfqId) => {
        // Don't set global loading true here as it might block other UI, but local loading state in component is better.
        // However, consistent with RfqContext, we can set it if we want, or just return. 
        // Let's keep it simple and just do the fetch.
        try {
            const { data, error } = await supabase
                .from("bids")
                .select("*, profiles(full_name, avatar_url, email)")
                .eq("rfq_id", rfqId)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error("Error fetching bids:", error);
            return { data: null, error };
        }
    };

    // Accept a bid (and close the RFQ)
    const acceptBid = async (bidId, rfqId) => {
        setLoading(true);
        try {
            // 0. Fetch Bid Details first to get the bidder ID and amount
            const { data: bidData, error: fetchErr } = await supabase
                .from('bids')
                .select('*')
                .eq('id', bidId)
                .single();

            if (fetchErr) throw fetchErr;

            // 1. Create a New Order
            const { error: orderError } = await supabase
                .from('orders')
                .insert([{
                    rfq_id: rfqId,
                    bid_id: bidId,
                    buyer_id: user.id,   // You are the buyer (Client)
                    seller_id: bidData.bidder_id, // They are the seller (Vendor)
                    amount: bidData.amount,
                    status: 'pending'
                }]);

            if (orderError) throw orderError;

            // 2. Update Bid Status to 'accepted'
            const { error: bidError } = await supabase
                .from('bids')
                .update({ status: 'accepted' })
                .eq('id', bidId);

            if (bidError) throw bidError;

            // 3. Update RFQ Status to 'closed'
            const { error: rfqError } = await supabase
                .from('rfqs')
                .update({ status: 'closed' })
                .eq('id', rfqId);

            if (rfqError) throw rfqError;

            toast.success("Bid accepted! Order created.");
            return { error: null };
        } catch (error) {
            console.error("Error accepting bid:", error);
            // Handle specific RL error if table doesn't exist yet
            if (error.code === '42P01') {
                toast.error("Database Error: 'orders' table missing. Please run the SQL schema.");
            } else {
                toast.error("Failed to accept bid: " + error.message);
            }
            return { error };
        } finally {
            setLoading(false);
        }
    };

    const value = {
        createBid,
        getBidsByRfqId,
        acceptBid,
        loading
    };

    return (
        <BidContext.Provider value={value}>
            {children}
        </BidContext.Provider>
    );
};

export const useBid = () => {
    return useContext(BidContext);
};
