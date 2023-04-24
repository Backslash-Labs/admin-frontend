import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import Restaurants from 'pages/restaurants/index/Restaurants';
import ResturantForm from 'pages/restaurants/form/RestaurantForm';

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

    return (
        <>
            <BrowserRouter>
                <ReactRoutes>
                    {
                        routes.map(({ path, element: Element }, i) =>
                            <Route key={i} path={path} element={<Element />} />
                        )
                    }
                </ReactRoutes>
            </BrowserRouter>
        </>
    );
}

export default Routes;