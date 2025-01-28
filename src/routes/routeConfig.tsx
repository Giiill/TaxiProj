import { Routes, Route } from 'react-router-dom';
import { ERoutes } from './routeDefinitions';
import { HomePage } from '../pages/HomePage';
import { Auth } from '../pages/Auth';
import { TripsPage } from '../pages/TripsPage';

type Route = {
    path: string,
    element: JSX.Element
}

type RouteConfig = Route[];

const routes: RouteConfig = [
    { path: ERoutes.Auth, element: <Auth /> },
    { path: ERoutes.TripsPage, element: <TripsPage /> }
];

const routeConfig = (
    <Routes>
        <Route path='/' element={<HomePage />} />
        {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
        ))}
    </Routes>
);

export { routeConfig };