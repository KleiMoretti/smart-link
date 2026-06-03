//import { useEffect } from "react";
//import supabase from "../../lib/supabaseClient";

export default function Test() {
    useEffect(() => {
        async function check() {
            const { data, error } = await supabase
                .from("accounts")
                .select("*");

            console.log("DATA:", data);
            console.log("ERROR:", error);
        }

        check();
    }, []);

    return <div>Check console</div>;
}