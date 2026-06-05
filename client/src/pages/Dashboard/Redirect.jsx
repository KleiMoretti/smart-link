import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Redirect() {
    const { id } = useParams();

    useEffect(() => {
        const fetchLink = async () => {
            const res = await axios.get(`http://localhost:5000/api/${id}`);

            if (res.data.success) {
                window.location.replace(res.data.link.links);
            }
        };

        fetchLink();
    }, [id]);

    return <div>Redirecting...</div>;
}