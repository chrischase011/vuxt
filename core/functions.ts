// Interface
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
    },
    scripts?: {
        src: string;
        type?: string;
        async?: boolean;
        defer?: boolean;
        attr?: [string, string][];
    }[];

    links?: {
        rel: string;
        href: string;
        attr?: [string, string][];
    }[];
}

// FUNCTIONS

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
    },
    scripts: [],
    links: [],

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

const createScriptTag = (src: string, type: string = 'text/javascript', attr: [string, string][] = [], async: boolean = false, defer: boolean = false) => {
    if (document.querySelector(`script[src="${src}"]`)) {
        console.warn(`Script with src "${src}" already exists.`);
        return;
    }

    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', src);
    scriptTag.setAttribute('type', type);

    attr.forEach(([key, value]) => {
        scriptTag.setAttribute(key, value);
    });

    if (async) {
        scriptTag.setAttribute('async', '');
    }

    if (defer) {
        scriptTag.setAttribute('defer', '');
    }

    document.head.appendChild(scriptTag);
};

const createLinksTag = (rel: string, href: string, attr: [string, string][] = []) => {
    if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
        console.warn(`Link with rel "${rel}" and href "${href}" already exists.`);
        return;
    }

    const linkTag = document.createElement('link');
    linkTag.setAttribute('rel', rel);
    linkTag.setAttribute('href', href);

    attr.forEach(([key, value]) => {
        linkTag.setAttribute(key, value);
    });

    document.head.appendChild(linkTag);
}



// EXPORTS

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

    // SEO Meta Tags
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

    // Page Scripts
    if (pageMeta.scripts) {
        pageMeta.scripts.forEach((script) => {
            if (script.src) {
                createScriptTag(script.src, script.type, script.attr || [], script.async || false, script.defer || false);
            }
        });
    }

    // Page Links
    if (pageMeta.links) {
        pageMeta.links.forEach((link) => {
            if (link.rel && link.href) {
                createLinksTag(link.rel, link.href, link.attr || []);
            }
        });
    }

}