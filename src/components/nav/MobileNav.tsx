import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'lib/classNames'
import { NavContext } from './Nav'
import { Link } from 'react-router-dom'
import NavLink from './NavLink'
import { AppContext } from 'contexts/AppContext'


const MobileNav = () => {

    const {
        navigation,
        userNavigation,
        user
    } = useContext(NavContext);

    const {
        currentUser
    } = useContext(AppContext);

    return (


        <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
                {
                    navigation.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            as={NavLink}
                            to={item.href}
                            className={"block"}
                        >
                            {item.name}
                        </Disclosure.Button>
                    ))
                }
            </div>
            <div className="border-t border-indigo-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium text-white">{currentUser.name}</div>
                        <div className="text-sm font-medium text-indigo-300">{currentUser.email}</div>
                    </div>
                    <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                    {
                        userNavigation.map((item) => (
                            <Disclosure.Button
                                key={item.name}
                                as={NavLink}
                                to={item.href}
                                className="block"
                            >
                                {item.name}
                            </Disclosure.Button>
                        ))
                    }
                </div>
            </div>
        </Disclosure.Panel>
    )
}

export default MobileNav;