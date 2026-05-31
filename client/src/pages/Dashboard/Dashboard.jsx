import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
            } else {
                setUserDetails(user);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div>
            <h1>Hi {userDetails?.displayName} 👋</h1>
        </div>
    );
}