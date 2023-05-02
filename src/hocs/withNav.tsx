import Nav from "components/nav/Nav";


/**
 * withNav wraps navbar around component
 * 
 */

const withNav = (Component) => {
    return (props) => {

        const {
            name,
        } = props

        return (
            <>
                <div className="min-h-full">
                    <div className="bg-green-850 pb-32">
                        <Nav />
                        <header className="py-10">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <h1 className="text-3xl font-bold tracking-tight text-white">{name}</h1>
                            </div>
                        </header>
                    </div>

                    <main className="-mt-32">
                        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 h-96 ">
                            <div className='bg-white rounded-md border border-red-800 p-8'>
                                <Component {...props} />
                            </div>
                        </div>
                    </main>
                </div>
            </>
        )
    }
}

export default withNav;