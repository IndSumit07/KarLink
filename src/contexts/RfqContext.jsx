import { createContext, useContext, useState } from "react";
import supabase from "../libs/Supabase";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";

const RfqContext = createContext();

export const RfqProvider = ({ children }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Create a new RFQ
    const createRfq = async (rfqData) => {
        if (!user) {
            toast.error("You must be logged in to create an RFQ");
            return { error: "User not logged in" };
        }

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("rfqs")
                .insert([
                    {
                        ...rfqData,
                        user_id: user.id
                    },
                ])
                .select()
                .single();

            if (error) throw error;

            toast.success("RFQ created successfully!");

            // --- Email Notification ---
            try {
                // Determine user details for email
                const userEmail = user.email;
                const userName = user.user_metadata?.full_name || user.email.split('@')[0];

                if (userEmail) {
                    const emailHtml = generateRfqEmailTemplate(data, userName);

                    // Call Backend API
                    // Note: This requires the /api/send-email serverless function to be running (vercel dev or deployed)
                    await fetch('/api/send-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            to: userEmail,
                            subject: 'Your RFQ has been posted! - KarLink',
                            html: emailHtml
                        })
                    });
                    console.log("Confirmation email sent to", userEmail);
                }
            } catch (emailErr) {
                // Log but don't block the UI
                console.warn("Email sending failed (this is expected in local dev without 'vercel dev'):", emailErr);
            }
            // --------------------------

            return { data, error: null };
        } catch (error) {
            console.error("Error creating RFQ:", error);
            toast.error("Failed to create RFQ: " + error.message);
            return { data: null, error };
        } finally {
            setLoading(false);
        }
    };

    // Get all RFQs (for Market)
    const getRfqs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("rfqs")
                .select("*, profiles(full_name, avatar_url, email)")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error("Error fetching RFQs:", error);
            return { data: null, error };
        } finally {
            setLoading(false);
        }
    };

    // Get a specific RFQ by ID
    const getRfqById = async (id) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("rfqs")
                .select("*, profiles(full_name, avatar_url, email)")
                .eq("id", id)
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error("Error fetching RFQ:", error);
            return { data: null, error };
        } finally {
            setLoading(false);
        }
    };

    // Get RFQs for the current user
    const getUserRfqs = async () => {
        if (!user) return { data: null, error: "User not logged in" };

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("rfqs")
                .select("*, profiles(full_name, avatar_url, email)")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error("Error fetching user RFQs:", error);
            return { data: null, error };
        } finally {
            setLoading(false);
        }
    };

    // Update an RFQ
    const updateRfq = async (id, updateData) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('rfqs')
                .update(updateData)
                .eq('id', id)
                .eq('user_id', user.id) // Ensure only owner can update
                .select();

            if (error) throw error;
            toast.success("RFQ updated successfully!");
            return { data, error: null };
        } catch (error) {
            console.error("Error updating RFQ:", error);
            toast.error("Failed to update RFQ");
            return { data: null, error };
        } finally {
            setLoading(false);
        }
    };

    // Delete an RFQ
    const deleteRfq = async (id) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('rfqs')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id); // Ensure only owner can delete

            if (error) throw error;
            toast.success("RFQ deleted successfully");
            return { error: null };
        } catch (error) {
            console.error("Error deleting RFQ:", error);
            toast.error("Failed to delete RFQ");
            return { error };
        } finally {
            setLoading(false);
        }
    };

    const value = {
        createRfq,
        getRfqs,
        getRfqById,
        getUserRfqs,
        updateRfq,
        deleteRfq,
        loading
    };

    return (
        <RfqContext.Provider value={value}>
            {children}
        </RfqContext.Provider>
    );
};

export const useRfq = () => {
    return useContext(RfqContext);
};
