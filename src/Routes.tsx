import { BrowserRouter, Route, Routes as ReactRoutes, Navigate } from 'react-router-dom';
import Restaurants from 'pages/restaurants/index/Restaurants';
import ResturantForm from 'pages/restaurants/form/RestaurantForm';
import Login from 'pages/login/Login';
import useCurrentUser from 'hooks/useCurrentUser';
import { AppContext } from 'contexts/AppContext';

const routes = [
    {
        path: "/",
        element: Restaurants,
    },
    {
        path: "/resturants/create",
        element: ResturantForm,
    }
]


const Routes = () => {

    const {
        isLoading, 
        currentUser, 
        onSignOut,
        setCurrentUser,
    } = useCurrentUser();

    const appContext = {
        currentUser,
        onSignOut,
        setCurrentUser,
    }

    return (
        <AppContext.Provider value={appContext}>
            <BrowserRouter>
                <ReactRoutes>
                    <Route
                        path='/sign_in'
                        element={<Login />}
                    />
                    {
                        routes.map(({ path, element: Element }, i) => {

                            if (!isLoading && !currentUser) return (
                                <Route
                                    path={path}
                                    key={i}
                                    element={<Navigate
                                        to="/sign_in"
                                        replace
                                    />}
                                />
                            );

                            return (<Route
                                key={i}
                                path={path}
                                element={<Element />}
                            />)
                        })
                    }
                </ReactRoutes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default Routes;