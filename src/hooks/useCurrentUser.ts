import useFetch from "lib/useFetch";
import { useEffect, useState } from "react";

const useCurrentUser = () => {

    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const {
        onFetch,
    } = useFetch("/user", (body) => {
        setCurrentUser(body);
        setIsLoading(false);
    }, (res) => {
        setIsLoading(false);
    });

    useEffect(() => {
        onFetch()
    }, []);

    const onSignOut = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
    }

    return {
        isLoading,
        currentUser,
        onSignOut,
        setCurrentUser,
    }
}

export default useCurrentUser;