/**
 * Advanced Enterprise Security Engine - Atul Pandey Portfolio
 * Hardened & Self-Defending Security Shield v3.0
 */
(function (_0x1a2b, _0x3c4d) {
    'use strict';
    
    // Encoded strings array
    const _0xstr = [
        'bG9jYWxob3N0',                                     // 0: localhost
        'MTI3LjAuMC4x',                                     // 1: 127.0.0.1
        'Ojox',                                             // 2: ::1
        'cGFuZGV5YXR1bDEwMjIuZ2l0aHViLmlv',                 // 3: pandeyatul1022.github.io
        'YXR1bC1wYW5kZXkuY29t',                             // 4: atul-pandey.com
        'YXR1bHMtcG9ydGZvbGlvLnZlcmNlbC5hcHA=',             // 5: atuls-portfolio.vercel.app
        'YXR1bHMtcG9ydGZvbGlvLm5ldGxpZnkuYXBw',             // 6: atuls-portfolio.netlify.app
        'QXR1bCBQYW5kZXk=',                                 // 7: Atul Pandey
        'aHR0cHM6Ly9naXRodWIuY29tL3BhbmRleWF0dWwxMDIy',     // 8: https://github.com/pandeyatul1022
        'aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZi9tcWFlYnJxeg==',     // 9: https://formspree.io/f/mqaebrqz
        'QVBfU0VDXzg5MjgzMDM4NjdfVkVSSUZJRUQ='              // 10: AP_SEC_8928303867_VERIFIED
    ];

    function _0xd(idx) {
        try {
            return atob(_0xstr[idx]);
        } catch (e) {
            return '';
        }
    }

    const ALLOWED = [_0xd(0), _0xd(1), _0xd(2), _0xd(3), _0xd(4), _0xd(5), _0xd(6)];
    const OWNER = _0xd(7);
    const OFFICIAL_URL = _0xd(8);
    const WEBHOOK = _0xd(9);
    const TOKEN = _0xd(10);

    function _0xantiDebug() {
        try {
            console.log('%c⛔ COPYRIGHT PROTECTED - ATUL PANDEY', 'color:#ef4444; font-size:20px; font-weight:bold;');
        } catch (e) {}
    }

    // -----------------------------------------------------------------
    // REAL-TIME FORENSICS TELEMETRY
    // -----------------------------------------------------------------
    function _0xsendAlert(reason) {
        try {
            const payload = {
                ALERT: '🚨 UNAUTHORIZED WEBSITE HOSTING / SECURITY TAMPER DETECTED',
                OWNER: OWNER,
                OFFENDING_DOMAIN: window.location.hostname || 'Unknown Host',
                FULL_PAGE_URL: window.location.href,
                REFERRER_SOURCE: document.referrer || 'Direct Access',
                DEVICE_OS: navigator.platform || 'Unknown OS',
                SCREEN_RESOLUTION: `${window.screen.width}x${window.screen.height}`,
                USER_AGENT: navigator.userAgent,
                TIMESTAMP_LOCAL: new Date().toString(),
                VIOLATION_REASON: reason
            };

            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(geo => {
                    fetch(WEBHOOK, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ...payload,
                            VISITOR_IP: geo.ip || 'Unknown',
                            LOCATION: `${geo.city || ''}, ${geo.region || ''}, ${geo.country_name || ''}`,
                            ISP: geo.org || 'Unknown'
                        })
                    }).catch(() => {});
                })
                .catch(() => {
                    fetch(WEBHOOK, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    }).catch(() => {});
                });
        } catch (e) {}
    }

    // -----------------------------------------------------------------
    // DOMAIN AUTHORIZATION & IFRAME LOCK
    // -----------------------------------------------------------------
    function _0xisAuthorized() {
        const host = (window.location.hostname || '').toLowerCase();
        if (window.location.protocol === 'file:') return true;
        if (!host) return false;
        return ALLOWED.some(d => host === d || host.endsWith('.' + d));
    }

    function _0xisIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    // -----------------------------------------------------------------
    // COPYRIGHT STRIKE DISPLAY & PAGE TERMINATION
    // -----------------------------------------------------------------
    window.__triggerCopyrightStrike = function (reason) {
        _0xsendAlert(reason);

        try {
            if (document.body) document.body.innerHTML = '';
            if (document.head) document.head.innerHTML = '';
        } catch (e) {}

        const strikeCSS = `
            * { box-sizing: border-box; margin: 0; padding: 0; }
            html, body {
                background-color: #06070a !important;
                color: #f3f4f6 !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
                height: 100vh !important;
                width: 100vw !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 20px !important;
                overflow: hidden !important;
            }
            .strike-card {
                background: rgba(15, 17, 26, 0.95);
                border: 2px solid #ef4444;
                box-shadow: 0 0 60px rgba(239, 68, 68, 0.35);
                border-radius: 24px;
                max-width: 650px;
                width: 100%;
                padding: 40px 30px;
                text-align: center;
                backdrop-filter: blur(16px);
                animation: pulseGlow 2.5s infinite alternate;
            }
            @keyframes pulseGlow {
                0% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.25); border-color: rgba(239, 68, 68, 0.6); }
                100% { box-shadow: 0 0 70px rgba(239, 68, 68, 0.55); border-color: #ef4444; }
            }
            .warning-badge {
                width: 80px; height: 80px;
                background: rgba(239, 68, 68, 0.12);
                border-radius: 50%; display: flex;
                align-items: center; justify-content: center;
                margin: 0 auto 20px auto; color: #ef4444;
                font-size: 40px; border: 2px solid rgba(239, 68, 68, 0.5);
            }
            h1 { font-size: 26px; font-weight: 800; color: #ef4444; margin-bottom: 10px; }
            p { font-size: 14px; color: #9ca3af; line-height: 1.6; margin-bottom: 20px; }
            .domain-badge {
                display: inline-block; background: #1f2937; color: #f87171;
                padding: 6px 14px; border-radius: 8px; font-family: monospace;
                font-size: 13px; margin-bottom: 20px; border: 1px solid rgba(248, 113, 113, 0.3);
            }
            .alert-status {
                background: rgba(239, 68, 68, 0.1); color: #fca5a5;
                padding: 10px 14px; border-radius: 10px; font-size: 12px;
                margin-bottom: 20px; border: 1px dashed rgba(239, 68, 68, 0.4);
            }
            .notice-box {
                background: rgba(0, 0, 0, 0.5); border-radius: 12px;
                padding: 16px; text-align: left; font-size: 13px;
                color: #d1d5db; margin-bottom: 24px; border: 1px solid rgba(255, 255, 255, 0.08);
            }
            .notice-box p { color: #e5e7eb; margin-bottom: 6px; font-size: 12px; }
            .action-btn {
                display: inline-flex; align-items: center; justify-content: center;
                gap: 10px; width: 100%; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: #ffffff; text-decoration: none; padding: 14px 24px;
                border-radius: 12px; font-weight: 700; font-size: 15px;
                box-shadow: 0 4px 20px rgba(239, 68, 68, 0.45);
            }
        `;

        const strikeHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>⛔ UNAUTHORIZED HOSTING DETECTED</title>
                <style>${strikeCSS}</style>
            </head>
            <body>
                <div class="strike-card">
                    <div class="warning-badge">🛑</div>
                    <h1>DMCA COPYRIGHT VIOLATION</h1>
                    <p>Public hosting of this source code or design layout is strictly prohibited.</p>
                    <div class="domain-badge">Host Domain: ${window.location.hostname || 'Unauthorized Domain'}</div>
                    <div class="alert-status">
                        📲 <strong>Real-time Alert Dispatched:</strong> Forensics notification sent to ${OWNER}'s Mail & Messaging system.
                    </div>
                    <div class="notice-box">
                        <p>⚖️ <strong>Legal Notice:</strong> This codebase is copyrighted under DMCA International Laws by ${OWNER}.</p>
                        <p>📘 <strong>Study Exception:</strong> You may download and study this source code locally on localhost for educational purposes.</p>
                    </div>
                    <a href="${OFFICIAL_URL}" class="action-btn">Go To Official Profile &rarr;</a>
                </div>
            </body>
            </html>
        `;

        document.open();
        document.write(strikeHTML);
        document.close();
    };

    // -----------------------------------------------------------------
    // EXECUTION & INTEGRITY FLAG SETTING
    // -----------------------------------------------------------------
    if (!_0xisAuthorized()) {
        window.__triggerCopyrightStrike(`Domain '${window.location.hostname}' is not authorized.`);
        return;
    }

    if (_0xisIframe()) {
        window.__triggerCopyrightStrike('Embedding this site inside an external iframe is prohibited.');
        return;
    }

    // Set Security Locks
    window.__SECURITY_VERIFIED__ = true;
    window.__SEC_TOKEN__ = TOKEN;
    window.__SEC_OWNER__ = OWNER;

    // Start Anti-Inspection & Anti-Debugging
    _0xantiDebug();

    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
        if (e.key === 'F12' || e.keyCode === 123) e.preventDefault();
        if (e.ctrlKey && e.shiftKey && (['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key))) e.preventDefault();
        if (e.ctrlKey && (['U', 'u', 'S', 's'].includes(e.key))) e.preventDefault();
    });

})(window, document);
