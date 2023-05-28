import { useState, useEffect } from "react";
import axios from "axios";

function useFetchData<T>(url: string): T[] {
    const [data, setData] = useState<T[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get<T[]>(url);
                setData(result.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [url]);

    return data;
}

export default useFetchData;
