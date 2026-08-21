# 🛡️ Forensics Alert Engine, Security & DMCA Guide

**Project**: Atul Pandey's Portfolio (`atuls-portfolio`)  
**Owner**: Atul Pandey ([GitHub Profile](https://github.com/pandeyatul1022))

---

## 📊 1. Complete Cyber Forensics Captured on Unauthorized Hosting

Jab bhi koi user/hacker aapka source code download karke kisi unauthorized domain (Vercel, Netlify, Github Pages, Custom Domain) par host ya open karega, humara Security Engine unki complete **Forensic Profile** capture karke aapke **Email, SMS, aur WhatsApp** notification channel par bhej dega:

### Aapke Paas aane wali Exact Details:

| Data Parameter | Description / Example |
| :--- | :--- |
| 🚨 **ALERT** | `UNAUTHORIZED WEBSITE HOSTING ATTEMPT DETECTED` |
| 🌐 **OFFENDING_DOMAIN** | Thief ka domain (e.g. `thief-portfolio.vercel.app`, `hacker.github.io`) |
| 🔗 **FULL_PAGE_URL** | Thief ka exact URL (e.g. `https://thief-portfolio.vercel.app/home`) |
| 🌐 **VISITOR_IP** | Thief/Visitor ka Public IP Address (e.g. `103.21.124.50`) |
| 📍 **LOCATION (CITY, COUNTRY)** | Exact City, State & Country (e.g. `Mumbai, Maharashtra, India (IN)`) |
| 📡 **ISP_PROVIDER** | Internet Provider / Cloud Server (e.g. `Jio / Airtel / Vercel Edge Server`) |
| 🗺️ **COORDINATES** | Geographical Latitude & Longitude |
| 📱 **DEVICE_OS & BROWSER** | Operating System & Browser (e.g. `Windows 11 / Chrome 120 / Mac / iPhone`) |
| 🖥️ **SCREEN_RESOLUTION** | Display Size (e.g. `1920x1080`) |
| ⏰ **TIMEZONE & TIMESTAMP** | Visitor's exact local time & UTC timestamp |
| 🔗 **REFERRER_SOURCE** | Web page source where they clicked the link |

---

## 📩 2. Kaise Ye Alerts Aapke Mail, SMS & WhatsApp Par Aayenge?

1. `assets/js/security.js` me `ALERT_WEBHOOK_URL` configured hai.
2. Webhook payload Formspree / EmailJS / Telegram Bot / Twilio WhatsApp API ke through automatic deliver hoga.
3. Formspree/Telegram par alert aate hi:
   - **Email Notification**: Direct aapke inbox me detailed formatted email standard alert.
   - **SMS & WhatsApp Alert**: Aap Formspree integration me SMS/WhatsApp notifications turn ON karke apne mobile par 1 second me message paa sakte hain!

---

## 🎓 3. Educational & Personal Study Policy

- ✅ **Localhost Study Allowed**: Koi bhi code ko study purpose ke liye download karke `localhost` / local file preview par chala sakta hai.
- ❌ **Public Hosting Blocked**: Kisi bhi public domain par host karte hi website wiped ho jayegi aur upar wali saari Forensic details aapke WhatsApp & Email par chali jayengi.

---

## ⚖️ 4. GitHub DMCA Takedown Notice

Formspree / WhatsApp alert me mile thief ke Repository/Domain URL ko copy karein aur [GitHub DMCA Takedown Form](https://support.github.com/contact/dmca-takedown) par bhej dein -> GitHub uski repo 24 ghante me delete kar dega.
