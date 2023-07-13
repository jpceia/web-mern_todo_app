import axios from "axios";
import { BACKEND_URL } from "../constants";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const login = () => {
        window.location.href = BACKEND_URL + "/auth/google";
    };

    const fetchProfile = async () => {
        setLoading(true)
        try {
            const res = await axios.get(BACKEND_URL + "/api/me", { withCredentials: true })
            const { data } = res
            setProfile(data)
        }
        catch (err) {
            if (err.isAxiosError)
                setError(err.message)
            else {
                const { data } = err.response;
                setError(data)
            }
            setProfile(null)
        }
        setLoading(false)
    }

    const logout = async () => {
        setLoading(true)
        try {
            await axios.get(BACKEND_URL + "/auth/logout", { withCredentials: true })
            setProfile(null)
        }
        catch (err) {
            if (err.isAxiosError)
                setError(err.message)
            else {
                const { data } = err.response;
                setError(data)
            }
        }
        setLoading(false)
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <AuthContext.Provider value={{
            profile,
            loading,
            error,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
