/**
 * Advanced Enterprise Security Engine - Atul Pandey Portfolio
 * 
 * Features:
 *  1. Multi-Layer Domain Lock (Obfuscated & Encoded Hostname Validation)
 *  2. Real-Time Theft Alert Engine (Instant Email / SMS / WhatsApp Webhook ping)
 *  3. Dynamic DOM Wiping & Copyright Violation Screen
 *  4. Educational / Study License Exception (Localhost allowed)
 *  5. Anti-DevTools & Anti-Inspection Locking
 */

(function () {
    'use strict';

    // Encoded Allowed Hostnames (Hex/Base64 to prevent search & replace)
    // Decodes to: localhost, 127.0.0.1, ::1, pandeyatul1022.github.io, atul-pandey.com, atuls-portfolio.vercel.app, atuls-portfolio.netlify.app
    const _0xsec = [
        'bG9jYWxob3N0',
        'MTI3LjAuMC4x',
        'Ojox',
        'cGFuZGV5YXR1bDEwMjIuZ2l0aHViLmlv',
        'YXR1bC1wYW5kZXkuY29t',
        'YXR1bHMtcG9ydGZvbGlvLnZlcmNlbC5hcHA=',
        'YXR1bHMtcG9ydGZvbGlvLm5ldGxpZnkuYXBw'
    ];

    const _0xowner = 'QXR1bCBQYW5kZXk='; // Atul Pandey
    const _0xurl = 'aHR0cHM6Ly9naXRodWIuY29tL3BhbmRleWF0dWwxMDIy'; // https://github.com/pandeyatul1022

    function _d(str) {
        try {
            return atob(str);
        } catch (e) {
            return str;
        }
    }

    // Decode allowed domains list
    const ALLOWED_DOMAINS = _0xsec.map(_d);
    const OWNER_NAME = _d(_0xowner);
    const ORIGINAL_PORTFOLIO_URL = _d(_0xurl);

    // Real-Time Notification Webhook URL (Email / Formspree / Telegram / WhatsApp API)
    // Set your webhook URL here to receive instant Email / WhatsApp / SMS alerts when someone hosts your site!
    const ALERT_WEBHOOK_URL = 'https://formspree.io/f/mqaebrqz'; 

    // Send Advanced Real-Time Forensics Theft Alert Notification to Owner
    function sendTheftAlert(reason) {
        try {
            // Core forensics captured from browser & environment
            const basePayload = {
                ALERT: '🚨 UNAUTHORIZED WEBSITE HOSTING ATTEMPT DETECTED',
                OWNER: OWNER_NAME,
                OFFENDING_DOMAIN: window.location.hostname || 'Unknown Host',
                FULL_PAGE_URL: window.location.href,
                REFERRER_SOURCE: document.referrer || 'Direct Access / Hidden',
                DEVICE_OS: navigator.platform || 'Unknown OS',
                SCREEN_RESOLUTION: `${window.screen.width}x${window.screen.height}`,
                BROWSER_LANGUAGE: navigator.language || 'Unknown',
                TIMEZONE: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
                USER_AGENT: navigator.userAgent,
                TIMESTAMP_LOCAL: new Date().toString(),
                VIOLATION_REASON: reason
            };

            // Fetch visitor IP & Geolocation details asynchronously
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(geo => {
                    const fullPayload = {
                        ...basePayload,
                        VISITOR_IP: geo.ip || 'Unknown IP',
                        CITY: geo.city || 'Unknown',
                        REGION_STATE: geo.region || 'Unknown',
                        COUNTRY: `${geo.country_name || ''} (${geo.country_code || ''})`,
                        ISP_PROVIDER: geo.org || geo.asn || 'Unknown ISP',
                        COORDINATES: `${geo.latitude || ''}, ${geo.longitude || ''}`
                    };
                    dispatchWebhook(fullPayload);
                })
                .catch(function () {
                    // Fallback IP lookup
                    fetch('https://api.ipify.org?format=json')
                        .then(res => res.json())
                        .then(ipData => {
                            dispatchWebhook({ ...basePayload, VISITOR_IP: ipData.ip });
                        })
                        .catch(function () {
                            dispatchWebhook(basePayload);
                        });
                });
        } catch (e) {}
    }

    function dispatchWebhook(payload) {
        if (!ALERT_WEBHOOK_URL) return;
        try {
            fetch(ALERT_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(function () {});
        } catch (e) {}
    }

    // Verify current domain against allowed list
    function isDomainAuthorized() {
        const currentHost = (window.location.hostname || '').toLowerCase();

        // Allow local file protocol & localhost for offline study & learning
        if (window.location.protocol === 'file:') {
            return true;
        }

        if (!currentHost) return false;

        return ALLOWED_DOMAINS.some(domain => {
            return currentHost === domain || currentHost.endsWith('.' + domain);
        });
    }

    // Check clickjacking inside external iframes
    function isIframeEmbebed() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    // Trigger full DOM wipe and display unbypassable Copyright Violation screen
    window.__triggerCopyrightStrike = function (reason) {
        // Dispatch instant alert to owner's Mail / Phone
        sendTheftAlert(reason);

        // Freeze script execution and wipe body
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
                width: 80px;
                height: 80px;
                background: rgba(239, 68, 68, 0.12);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px auto;
                color: #ef4444;
                font-size: 40px;
                border: 2px solid rgba(239, 68, 68, 0.5);
            }
            h1 {
                font-size: 26px;
                font-weight: 800;
                color: #ef4444;
                margin-bottom: 10px;
                letter-spacing: -0.5px;
            }
            p {
                font-size: 14px;
                color: #9ca3af;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .domain-badge {
                display: inline-block;
                background: #1f2937;
                color: #f87171;
                padding: 6px 14px;
                border-radius: 8px;
                font-family: monospace;
                font-size: 13px;
                margin-bottom: 20px;
                border: 1px solid rgba(248, 113, 113, 0.3);
            }
            .alert-status {
                background: rgba(239, 68, 68, 0.1);
                color: #fca5a5;
                padding: 10px 14px;
                border-radius: 10px;
                font-size: 12px;
                margin-bottom: 20px;
                border: 1px dashed rgba(239, 68, 68, 0.4);
            }
            .notice-box {
                background: rgba(0, 0, 0, 0.5);
                border-radius: 12px;
                padding: 16px;
                text-align: left;
                font-size: 13px;
                color: #d1d5db;
                margin-bottom: 24px;
                border: 1px solid rgba(255, 255, 255, 0.08);
            }
            .notice-box p {
                color: #e5e7eb;
                margin-bottom: 6px;
                font-size: 12px;
            }
            .notice-box p:last-child { margin-bottom: 0; }
            .action-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                width: 100%;
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: #ffffff;
                text-decoration: none;
                padding: 14px 24px;
                border-radius: 12px;
                font-weight: 700;
                font-size: 15px;
                transition: transform 0.2s, box-shadow 0.2s;
                box-shadow: 0 4px 20px rgba(239, 68, 68, 0.45);
            }
            .action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(239, 68, 68, 0.65);
            }
            .countdown-text {
                margin-top: 14px;
                font-size: 12px;
                color: #6b7280;
            }
        `;

        const strikeHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                        📲 <strong>Real-time Alert Dispatched:</strong> An automated notification (Domain, URL, User-Agent) has been sent to ${OWNER_NAME}'s Mail & Messaging system.
                    </div>

                    <div class="notice-box">
                        <p>⚖️ <strong>Legal Notice:</strong> This codebase is copyrighted under DMCA International Laws by ${OWNER_NAME}.</p>
                        <p>📘 <strong>Study Exception:</strong> You may download and study this source code locally on localhost for educational purposes, but public hosting on any domain is illegal.</p>
                    </div>

                    <a href="${ORIGINAL_PORTFOLIO_URL}" class="action-btn">
                        Go To Official Website & Profile &rarr;
                    </a>
                    
                    <div class="countdown-text">Redirecting to owner's official page in <span id="secCount">5</span>s...</div>
                </div>

                <script>
                    (function() {
                        let c = 5;
                        const el = document.getElementById('secCount');
                        const timer = setInterval(function() {
                            c--;
                            if (el) el.innerText = c;
                            if (c <= 0) {
                                clearInterval(timer);
                                window.location.href = '${ORIGINAL_PORTFOLIO_URL}';
                            }
                        }, 1000);
                    })();
                </script>
            </body>
            </html>
        `;

        document.open();
        document.write(strikeHTML);
        document.close();
    };

    // Immediate Domain Verification
    if (!isDomainAuthorized()) {
        window.__triggerCopyrightStrike(`Domain '${window.location.hostname}' is not authorized for public hosting.`);
        return;
    }

    if (isIframeEmbebed()) {
        window.__triggerCopyrightStrike('Embedding this site inside an external iframe is prohibited.');
        return;
    }

    // -------------------------------------------------------------
    // ANTI-INSPECTION & CODE PROTECTION
    // -------------------------------------------------------------
    function initAntiInspection() {
        // Disable Right Click
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            showProtectionToast('Right-click context menu is disabled.');
        });

        // Disable DevTools & Source Hotkeys
        document.addEventListener('keydown', function (e) {
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                showProtectionToast('Developer Tools access is disabled.');
                return false;
            }
            if (e.ctrlKey && e.shiftKey && (['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key))) {
                e.preventDefault();
                showProtectionToast('Inspect Element shortcut is disabled.');
                return false;
            }
            if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
                e.preventDefault();
                showProtectionToast('View Page Source is disabled.');
                return false;
            }
            if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
                e.preventDefault();
                showProtectionToast('Saving web pages is disabled.');
                return false;
            }
        });

        // Console Security Watermark
        try {
            console.log('%c⛔ COPYRIGHT NOTICE - ATUL PANDEY', 'color:#ef4444; font-size:22px; font-weight:bold;');
            console.log('%cThis codebase is protected by DMCA laws. Personal study on localhost is allowed. Public hosting is strictly prohibited.', 'color:#9ca3af; font-size:12px;');
        } catch (e) {}
    }

    function showProtectionToast(message) {
        let toast = document.getElementById('securityToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'securityToast';
            toast.style.cssText = `
                position: fixed; bottom: 24px; right: 24px;
                background: rgba(15, 17, 26, 0.95); color: #ef4444;
                border: 1px solid rgba(239, 68, 68, 0.5); padding: 12px 20px;
                border-radius: 10px; font-family: sans-serif; font-size: 13px;
                font-weight: 600; box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                z-index: 999999; transition: all 0.3s ease; opacity: 0;
                transform: translateY(10px); pointer-events: none;
            `;
            document.body.appendChild(toast);
        }
        toast.innerText = '🛡️ ' + message;
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
        clearTimeout(window.securityToastTimer);
        window.securityToastTimer = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
        }, 2500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAntiInspection);
    } else {
        initAntiInspection();
    }
})();
