import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        ViteImageOptimizer({
            png: { quality: 80 },
            jpeg: { quality: 80 },
            jpg: { quality: 80 },
            webp: { quality: 80 },
        }),
        viteCompression({ algorithm: 'gzip', ext: '.gz' }),
        viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
    ],
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
