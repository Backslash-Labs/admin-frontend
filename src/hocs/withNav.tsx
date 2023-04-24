import Nav from "components/nav/Nav";

const withNav = (Component) => {
    return (props) => {
        return (
            <>
                <div className="min-h-full">
                    <div className="bg-indigo-600 pb-32">
                        <Nav />
                        {/*<header className="py-10">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                                </div>
                        </header>*/}
                    </div>

                    <main className="-mt-32">
                        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                            <Component {...props} />
                        </div>
                    </main>
                </div>
            </>
        )
    }
}

export default withNav;