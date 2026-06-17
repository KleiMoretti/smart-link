import axios from "axios";

export const GET_METHOD = async (url, token) => {
    const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
}

export const POST_METHOD = async (url, data, token) => {
    const res = await axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
}