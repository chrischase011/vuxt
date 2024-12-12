
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
        title: 'My Vuxt App',
        description: 'This is made by Vuxt',
        image: '/favicon.ico',
        url: '',
        type: 'website',
        siteName: '',
    }
} as PageMeta

const createPageTitle = (title: string) => {
    const titleTag = document.querySelector('title')
    titleTag!.textContent = title
}

const createPageIcon = (icon: string) => {
    const checkIcon = document.querySelector('link[rel="icon"]')
    const iconTag = !checkIcon ? document.createElement('link') : checkIcon
    iconTag.setAttribute('rel', 'icon')
    iconTag.setAttribute('href', icon)
    document.head.appendChild(iconTag)
}

const createMetaTag = (name: string, content: string) => {
    const metaTag = document.createElement('meta')
    metaTag.setAttribute('name', name)
    metaTag.setAttribute('content', content)
    document.head.appendChild(metaTag)
}

export const definePageMeta = (meta: PageMeta) => {
    const pageMeta = {
        title: meta.title || defaultMeta.title,
        description: meta.description || defaultMeta.description,
        keywords: meta.keywords || defaultMeta.keywords,
        image: meta.image || defaultMeta.image,
        url: meta.url || defaultMeta.url,
        type: meta.type || defaultMeta.type,
        siteName: meta.siteName || defaultMeta.siteName,
        twitter: meta.twitter || defaultMeta.twitter,
        facebook: meta.facebook || defaultMeta.facebook,
        og: meta.og || defaultMeta.og,
    }


    if (pageMeta.title) {
        createPageTitle(pageMeta.title)
    }

    if (pageMeta.image) {
        createPageIcon(pageMeta.image)
    }

    Object.keys(pageMeta).forEach((key) => {
        const metaKey = key as keyof PageMeta;
        if (typeof pageMeta[metaKey] === 'string') {
            if (pageMeta[metaKey]) createMetaTag(metaKey, pageMeta[metaKey] as string);
        }
    });

}

