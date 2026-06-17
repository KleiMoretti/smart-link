import { auth } from "../firebase/firebase"

export const getToken = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("No user logged in");

    return await user.getIdToken();
};