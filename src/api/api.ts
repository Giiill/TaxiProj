import axios from "axios";

export type Suggestion = {
    value: string;
}

export type TripsType = {
    createdAt: string,
    from: string,
    to: string,
    tariff: string,
    status: string,
    id: number
}

export const getAddressSuggestions = async (query: string): Promise<Suggestion[]> => {
    try {
        const response = await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
            query: query,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token 516be5f8dc05bd00eae0c51fab0a1c3a2a5c5c1d',
            },
        });
        return response.data.suggestions;
    } catch (error) {
        console.error("Ошибка при получении подсказок:", error);
        return [];
    }
};

export const getAllTrips = async (): Promise<TripsType[]> => {
    try {
        const response = await axios.get("https://6795102faad755a134eb1bf1.mockapi.io/api/v1/Trips");
        return response.data; 
    } catch (error) {
        console.error("Ошибка при получении поездок:", error);
        return []; 
    }
}