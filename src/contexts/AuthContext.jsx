import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../libs/Supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signUp = async (email, password, full_name) => {
        console.log("Attempting signup for:", email, "with metadata:", { full_name });
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name,
                },
            },
        });
        if (error) {
            console.error("Supabase Signup Error:", error);
        } else {
            console.log("Supabase Signup Success:", data);
        }
        return { data, error };
    };

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    };

    const googleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        return { data, error };
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error signing out:", error);
            }
        } catch (error) {
            console.error("Unexpected error signing out:", error);
        } finally {
            // Force clearing of local user state to ensure UI updates
            // even if the server request fails (e.g. 403 Forbidden)
            setUser(null);
        }
    };

    const value = {
        user,
        signUp,
        signIn,
        googleSignIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
