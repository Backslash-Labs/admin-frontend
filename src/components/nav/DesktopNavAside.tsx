import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'lib/classNames'
import { NavContext } from './Nav'
import { AppContext } from 'contexts/AppContext'
import { Link } from 'react-router-dom'

/**
 * DesktopNavAside contains components found on the right side of the nav
 * 
 */
const DesktopNavAside = () => {

    const {
        open,
        userNavigation,
        user,
    } = useContext(NavContext);

    const {
        onSignOut
    } = useContext(AppContext);

    return (
        <>

            <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-green-850 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                    <span className="sr-only">Open main menu</span>
                    {
                        open ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )
                    }
                </Disclosure.Button>
            </div>
            <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                    <button
                        type="button"
                        className="flex-shrink-0 rounded-full bg-green-500 p-1 text-green-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
                    >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3 flex-shrink-0">
                        <div>
                            <Menu.Button className="flex rounded-full bg-green-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {
                                    userNavigation.map((item) => (
                                        <Menu.Item key={item.name}>
                                            {
                                                ({ active }) => (
                                                    <Link
                                                        to={item.href}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )
                                            }
                                        </Menu.Item>
                                    ))
                                }
                                <Menu.Item>
                                    {
                                        ({ active }) => (
                                            <a
                                                onClick={onSignOut}
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                Sign out
                                            </a>
                                        )
                                    }
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </>
    )
}

export default DesktopNavAside;