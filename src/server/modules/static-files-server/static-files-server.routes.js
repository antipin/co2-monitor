export function makeRoutes() {

    return [
        {
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: 'dist/client'
                }
            }
        }
    ]

}