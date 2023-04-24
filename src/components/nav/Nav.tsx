import { createContext } from 'react'
import { Disclosure } from '@headlessui/react'
import DesktopNav from './DesktopNav'
import NavSearch from './NavSearch'
import DesktopNavAside from './DesktopNavAside'
import MobileNav from './MobileNav'


const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Restaurants', href: '#', current: true },
    { name: 'Branches', href: '#', current: false },
    { name: 'Users', href: '#', current: false },
    { name: 'Billing', href: '#', current: false },
    // { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

export const NavContext = createContext(null);

const Nav = () => {

    const navContext = {
        navigation,
        userNavigation,
        user,
    }

    return (
        <Disclosure as="nav" className="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none">
            {({ open }) => (
                <NavContext.Provider value={{
                    ...navContext,
                    open,
                }}>
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                                <div className="flex items-center px-2 lg:px-0">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="block h-8 w-8"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <DesktopNav />
                                </div>
                                <NavSearch />
                                <DesktopNavAside />
                            </div>
                        </div>
                        <MobileNav />
                    </>
                </NavContext.Provider>
            )}
        </Disclosure>
    )
}

export default Nav;