import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../libs/Supabase";
import Loader from "../components/Loader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        const initSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };
        initSession();

        // Listen for changes
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const signUp = (email, password, full_name) => {
        return supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name,
                },
            },
        });
    };

    const signIn = (email, password) => {
        return supabase.auth.signInWithPassword({
            email,
            password,
        });
    };

    const googleSignIn = () => {
        return supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin
            }
        });
    };

    const signOut = () => {
        return supabase.auth.signOut();
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
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
