import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
            } else {
                console.log(user);
            }
        });

        // 🔥 IMPORTANT: cleanup
        return () => unsubscribe();
    }, [navigate]);

    return (
        <div>
            <p>a</p>
        </div>
    );
}