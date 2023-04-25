import classNames from "lib/classNames";
import { useContext } from "react";
import { NavContext } from "./Nav";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";

const DesktopNav = () => {

    const {
        navigation,
    } = useContext(NavContext);

    const currentPath = window.location.pathname; 

    return (
        <div className="hidden lg:ml-10 lg:block">
            <div className="flex space-x-4">
                {
                    navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                        >
                            {item.name}
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
}

export default DesktopNav;