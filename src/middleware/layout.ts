// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadLayout(route: any) {
    try {
        const layout = route.meta.layout.name ?? route.meta.layout
        const layoutComponent = await import(`@/layouts/${layout}.vue`)
        route.meta.layoutComponent = layoutComponent.default
    } catch (e) {
        const layout = 'DefaultLayout'
        const layoutComponent = await import(`@/layouts/${layout}.vue`)
        route.meta.layoutComponent = layoutComponent.default
    }
}