
interface ImportMetaEnv {
    readonly VITE_API_HOST: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}