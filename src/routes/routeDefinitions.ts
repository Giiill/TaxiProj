function parseRoutes(init: Record<string, string>) {
    return Object.keys(init).reduce((routes, route) => {
        routes[route] = init[route]; // Убираем env
        return routes;
    }, {} as Record<string, string>);
};

const ERoutes: Record<string, string> = parseRoutes({
    HomePage: '/',
    Auth: '/Auth',
    TripsPage: '/TripsPage'
});

export { ERoutes };