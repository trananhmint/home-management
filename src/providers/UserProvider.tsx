import { createContext, useContext, useEffect, useState } from "react";
import type { Profile } from "../types";
import { userService } from "../services/UserService";
import { useAuth } from "./AuthProvider";

type UserContextType = {
    user: Profile | null;
    loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>({
    user: null,
    loading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { session } = useAuth();

    console.log(">> User Provider: ", session?.user.id);
    
    const [user, setUser] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session) {
            setUser(null);
            setLoading(false);
            return;
        }
        userService.getUserProfile(session.user.id).then(({ data, error }) => {
            if (error) {
                console.error("Failed to fetch user profile:", error);
            } else {
                setUser(data);
            }
        }).finally(() => { setLoading(false) });
    }, [session]);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
