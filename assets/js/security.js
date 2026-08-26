/**
 * Domain Lock & Iframe Guard Controller - Atul Pandey Portfolio
 * 
 * Features:
 *  1. Domain Lock: Restricts execution to authorized domains (localhost, GitHub Pages, Vercel, Netlify)
 *  2. Iframe Lock: Prevents embedding site in unauthorized external iframes
 */
(function () {
    'use strict';

    // Allowed Domains
    const ALLOWED_DOMAINS = [
        'localhost',
        '127.0.0.1',
        '::1',
        'pandeyatul1022.github.io',
        'atul-pandey.com',
        'atuls-portfolio.vercel.app',
        'atuls-portfolio.netlify.app'
    ];

    const OWNER_NAME = 'Atul Pandey';
    const OFFICIAL_URL = 'https://github.com/pandeyatul1022';
    const ALERT_WEBHOOK_URL = 'https://formspree.io/f/mqaebrqz';

    function sendUnauthorizedAlert(reason) {
        try {
            fetch(ALERT_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ALERT: '🚨 UNAUTHORIZED DOMAIN HOSTING ATTEMPT',
                    OWNER: OWNER_NAME,
                    OFFENDING_DOMAIN: window.location.hostname || 'Unknown Host',
                    FULL_URL: window.location.href,
                    TIMESTAMP: new Date().toString(),
                    REASON: reason
                })
            }).catch(function () {});
        } catch (e) {}
    }

    function isAuthorizedDomain() {
        const host = (window.location.hostname || '').toLowerCase();
        if (window.location.protocol === 'file:') return true;
        if (!host) return false;
        return ALLOWED_DOMAINS.some(domain => host === domain || host.endsWith('.' + domain));
    }

    function isIframeEmbedded() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    function triggerUnauthorizedBlock(reason) {
        sendUnauthorizedAlert(reason);

        try {
            if (document.body) document.body.innerHTML = '';
            if (document.head) document.head.innerHTML = '';
        } catch (e) {}

        const blockHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>⛔ UNAUTHORIZED DOMAIN</title>
                <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body {
                        background: #090a0f; color: #ef4444; font-family: sans-serif;
                        height: 100vh; display: flex; align-items: center; justify-content: center;
                        text-align: center; padding: 20px;
                    }
                    .box {
                        background: #111827; border: 2px solid #ef4444; border-radius: 16px;
                        padding: 40px 30px; max-width: 500px; width: 100%; box-shadow: 0 10px 30px rgba(239,68,68,0.2);
                    }
                    h1 { font-size: 24px; margin-bottom: 12px; }
                    p { color: #9ca3af; font-size: 14px; margin-bottom: 20px; line-height: 1.5; }
                    a {
                        display: inline-block; background: #ef4444; color: #fff; text-decoration: none;
                        padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="box">
                    <h1>🛑 UNAUTHORIZED DOMAIN</h1>
                    <p>This portfolio is domain-locked and only authorized for deployment by ${OWNER_NAME}.</p>
                    <a href="${OFFICIAL_URL}">Go To Official Profile &rarr;</a>
                </div>
            </body>
            </html>
        `;

        document.open();
        document.write(blockHTML);
        document.close();
    }

    // Execute Domain Lock & Iframe Lock
    if (!isAuthorizedDomain()) {
        triggerUnauthorizedBlock(`Domain '${window.location.hostname}' is not authorized.`);
        return;
    }

    if (isIframeEmbedded()) {
        triggerUnauthorizedBlock('Embedding in external iframe is prohibited.');
        return;
    }

})();
