
interface PageMeta {
    title: string
    description: string
    keywords?: string
    image?: string
    url?: string
    type?: string
    siteName?: string
    twitter?: {
        card: string
        site: string
        creator: string
    }
    facebook?: {
        appId: string
    }
    og?: {
        title: string
        description: string
        image: string
        url: string
        type: string
        siteName: string
    }
}

const defaultMeta: PageMeta = {
    title: 'My Vuxt App',
    description: 'This is made by Vuxt',
    keywords: 'Vuxt, Vue, Nuxt, TypeScript',
    image: '/favicon.ico',
    url: '',
    type: 'website',
    siteName: '',
    twitter: {
        card: '',
        site: '',
        creator: '',
    },
    facebook: {
        appId: '',
    },
    og: {
        title: '',
        description: '',
        image: '',
        url: '',
        type: '',
        siteName: '',
    }
} as PageMeta

const createPageTitle = (title: string) => {
    const titleTag = document.querySelector('title') || document.createElement('title');
    titleTag.textContent = title;
    if (!titleTag.parentElement) {
        document.head.appendChild(titleTag);
    }
}

const createPageIcon = (icon: string) => {
    const existingIcon = document.querySelector('link[rel="icon"]');
    const iconTag = existingIcon || document.createElement('link');
    iconTag.setAttribute('rel', 'icon')
    iconTag.setAttribute('href', icon)
    document.head.appendChild(iconTag)
}

const createMetaTag = (name: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let metaTag = document.querySelector(selector);

    if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(isProperty ? 'property' : 'name', name);
        document.head.appendChild(metaTag);
    }

    metaTag.setAttribute('content', content);
};


export const definePageMeta = (meta: PageMeta) => {
    const pageMeta = {
        ...defaultMeta,
        ...meta
    }


    if (pageMeta.title) {
        createPageTitle(pageMeta.title)
    }

    if (pageMeta.image) {
        createPageIcon(pageMeta.image)
    }

    Object.entries(pageMeta).forEach(([key, value]) => {
        if (typeof value === 'string' && value) {
            const isOpenGraph = key.startsWith('og:');
            createMetaTag(key, value, isOpenGraph);
        } else if (typeof value === 'object' && value) {
            // Handle nested meta like `og`, `twitter`, etc.
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                if (typeof nestedValue === 'string' && nestedValue) {
                    const isOpenGraph = key === 'og';
                    const metaKey = isOpenGraph ? `og:${nestedKey}` : `${key}:${nestedKey}`;
                    createMetaTag(metaKey, nestedValue, isOpenGraph);
                }
            });
        }
    });

}

