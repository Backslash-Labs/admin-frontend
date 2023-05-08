import classNames from "lib/classNames";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

export interface NavLinkProps extends LinkProps {

}

const NavLink: FC<NavLinkProps> = ({ children, className, to, ...others }) => {

    const currentPath = window.location.pathname;

    const isCurrentPath = currentPath === to;

    return (
        <Link
            className={classNames(
                isCurrentPath
                    ? 'bg-green-500 text-white'
                    : 'text-white hover:bg-green-500 hover:bg-opacity-75',
                'rounded-md py-2 px-3 text-sm font-medium',
                className,
            )}
            aria-current={isCurrentPath ? 'page' : undefined}
            to={to}
            {...others}
        >
            {children}
        </Link>
    )
}

export default NavLink;