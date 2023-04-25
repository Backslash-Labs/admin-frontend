import { BrowserRouter, Route, Routes as ReactRoutes, Navigate } from 'react-router-dom';
import Restaurants from 'pages/restaurants/index/Restaurants';
import ResturantForm from 'pages/restaurants/form/RestaurantForm';
import Login from 'pages/login/Login';
import useCurrentUser from 'hooks/useCurrentUser';
import { AppContext } from 'contexts/AppContext';
import Plans from 'pages/plans/index/Plans';
import PlanForm from 'pages/plans/form/PlanForm';
import Users from 'pages/users/index/Users';

const routes = [
    {
        path: "/",
        element: Restaurants,
    },
    {
        path: "/restaurants/create",
        element: ResturantForm,
    },
    {
        path: "/plans",
        element: Plans,
    },
    {
        path: "/plans/create",
        element: PlanForm,
    },
    {
        path: "/users",
        element: Users,
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
    
    if(isLoading) return null;    

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