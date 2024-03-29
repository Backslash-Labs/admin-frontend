import { BrowserRouter, Route, Routes as ReactRoutes, Navigate } from 'react-router-dom';
import Restaurants from 'pages/restaurants/index/Restaurants';
import ResturantForm from 'pages/restaurants/form/RestaurantForm';
import Login from 'pages/login/Login';
import useCurrentUser from 'hooks/useCurrentUser';
import { AppContext } from 'contexts/AppContext';
import Users from 'pages/users/index/Users';
import ShowRestaurants from 'pages/restaurants/show/ShowRestaurants';
import BranchForm from 'pages/restaurants/show/branchesForm/BranchForm';
import BranchUserForm from 'pages/restaurants/show/branchUsersForm/BranchUserForm';
import UserForm from 'pages/users/form/UserForm';
import Transactions from 'pages/transactions/Transactions';

export const routes = [
    {
        path: "/",
        element: Restaurants,
        name: "Restaurants",
    },
    {
        path: "/restaurants/create",
        element: ResturantForm,
        name: "Restaurants",
    },
    {
        path: "/users",
        element: Users,
        name: "Users",
    },
    {
        path: "/restaurants/:id/edit",
        element: ResturantForm,
        name: "Restaurants",
    },
    {
        path: "/restaurants/:id",
        element: ShowRestaurants,
        name: "Restaurants",
    },
    {
        path: "/restaurants/:restaurant_id/branches/create",
        element: BranchForm,
        name: "Restaurants",
    },
    {
        path: "/restaurants/:restaurant_id/branch_users/create",
        element: BranchUserForm,
        name: "Restaurants",
    },
    {
        path: "/sign_in",
        element: Login,
        auth: false
    },
    {
        path: "/users/create",
        element: UserForm
    },
    {
        path: "/users/:id/edit",
        element: UserForm
    },
    {
        path: "/transactions",
        element: Transactions
    },
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

    if (isLoading) return null;

    return (
        <AppContext.Provider value={appContext}>
            <ReactRoutes>
                {
                    routes.map(({ path, element: Element, auth = true, ...others }, i) => {

                        if (auth && !isLoading && !currentUser) return (
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
                            element={<Element {...others} />}
                        />)
                    })
                }
            </ReactRoutes>
        </AppContext.Provider>
    );
}

export default Routes;