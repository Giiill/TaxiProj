import React, { useEffect, useState } from 'react';
import { getAddressSuggestions, getAllTrips, Suggestion, TripsType } from '../api/api';

const TripsPage: React.FC = () => {
    const [region, setRegion] = useState<string>('');
    const [fromAddress, setFromAddress] = useState<string>('');
    const [toAddress, setToAddress] = useState<string>('');
    const [tariff, setTariff] = useState<string>('');
    const [suggestionsFrom, setSuggestionsFrom] = useState<Suggestion[]>([]);
    const [suggestionsTo, setSuggestionsTo] = useState<Suggestion[]>([]);

    const [trips, setTrips] = useState<TripsType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const tripsData = await getAllTrips();
            setTrips(tripsData);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Загрузка...</p>
    }

    const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'from' | 'to') => {
        const value = e.target.value;
        if (type === 'from') {
            setFromAddress(value);
            if (value.length > 2) {
                const response = await getAddressSuggestions(value);
                setSuggestionsFrom(response);
            }
        } else if (type === 'to') {
            setToAddress(value);
            if (value.length > 2) {
                const response = await getAddressSuggestions(value);
                setSuggestionsTo(response);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <div className="p-5 font-sans">
            <h1 className="text-2xl font-bold mb-4">Страница поездок</h1>
            <button className="mb-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                Добавить поездку
            </button>

            <div className="border border-gray-300 p-5 rounded mb-4 bg-white">
                <h2 className="text-xl font-semibold mb-4">Новая поездка</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Регион:</label>
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Выберите регион</option>
                            <option value="Москва">Москва</option>
                            <option value="Санкт-Петербург">Санкт-Петербург</option>
                            <option value="Казань">Казань</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Откуда:</label>
                        <input
                            type="text"
                            maxLength={200}
                            value={fromAddress}
                            onChange={(e) => handleAddressChange(e, 'from')}
                            placeholder="Введите адрес откуда"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {suggestionsFrom.length > 0 && (
                            <ul className="border border-gray-300 mt-2">
                                {suggestionsFrom.map((suggestion, index) => (
                                    <li key={index}
                                        onClick={() => {
                                            setFromAddress(suggestion.value);
                                            setSuggestionsFrom([]);
                                        }}
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        {suggestion.value}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Куда:</label>
                        <input
                            type="text"
                            maxLength={200}
                            value={toAddress}
                            onChange={(e) => handleAddressChange(e, 'to')}
                            placeholder="Введите адрес куда"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {suggestionsTo.length > 0 && (
                            <ul className="border border-gray-300 mt-2">
                                {suggestionsTo.map((suggestion, index) => (
                                    <li key={index}
                                        onClick={() => {
                                            setToAddress(suggestion.value);
                                            setSuggestionsTo([]);
                                        }}
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        {suggestion.value}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Тариф:</label>
                        <select
                            value={tariff}
                            onChange={(e) => setTariff(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Выберите тариф</option>
                            <option value="Эконом">Эконом</option>
                            <option value="Комфорт">Комфорт</option>
                            <option value="Бизнес">Бизнес</option>
                        </select>
                    </div>
                    <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                        Сохранить поездку
                    </button>
                    <button type="button" className="ml-2 px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
                        Закрыть
                    </button>
                </form>
            </div>

            <h2 className="text-xl font-semibold mb-2">История поездок</h2>
            <ul className="list-none p-0">
                {trips.map(trip => (
                    <li key={trip.id} className="mb-2">
                        <div>
                            <strong>Откуда:</strong> {trip.from}
                        </div>
                        <div>
                            <strong>Куда:</strong> {trip.to}
                        </div>
                        <div>
                            <strong>Тариф:</strong> {trip.tariff}
                        </div>
                        <div>
                            <strong>Статус:</strong> {trip.status}
                        </div>
                        <div>
                            <strong>Дата создания:</strong> {new Date(trip.createdAt).toLocaleString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { TripsPage };