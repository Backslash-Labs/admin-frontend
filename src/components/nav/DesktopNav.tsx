import classNames from "lib/classNames";
import { useContext } from "react";
import { NavContext } from "./Nav";

const DesktopNav = () => {

    const {
        navigation,
    } = useContext(NavContext);

    return (
        <div className="hidden lg:ml-10 lg:block">
            <div className="flex space-x-4">
                {
                    navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                'rounded-md py-2 px-3 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default DesktopNav;