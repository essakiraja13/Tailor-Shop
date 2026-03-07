import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        cssCodeSplit: true,
        rollupOptions: {
            input: {
                main: 'index.html',
                about: 'about.html',
                admin: 'admin.html',
                collections: 'collections.html',
                contact: 'contact.html',
                gallery: 'gallery.html',
                measurement: 'measurement-guide.html',
                pricing: 'pricing.html',
                services: 'services.html',
                track: 'track.html'
            }
        }
    },
});
