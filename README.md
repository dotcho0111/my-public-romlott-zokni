# 🧦 Romlott Zokni – E-commerce webshop

> Mérnökinformatikus hallgatói projekt | Gábor Dénes Egyetem | 2026  
> Készítők: **Bácskai Nándor**, **Gáspár Benedek**, **Pitner Alexandra**

A **Romlott Zokni** egy fiktív budapesti punk zenekar webshopja és információs portálja. A projekt célja egy reszponzív, full-stack e-commerce alkalmazás fejlesztése, amely lehetővé teszi a rajongók számára a merchandise vásárlást, a turné-dátumok megtekintését és a zenekarral való ismerkedést.

---

## 📋 Tartalom

- [Funkciók](#-funkciók)
- [Technológiák](#-technológiák)
- [Projekt struktúra](#-projekt-struktúra)
- [Telepítés és futtatás](#-telepítés-és-futtatás)
- [API dokumentáció](#-api-dokumentáció)
- [Csapat](#-csapat)

---

## ✨ Funkciók

| Funkció | Leírás |
|---|---|
| 🎸 Turné dátumok | Dinamikusan betöltött koncertlista helyszínekkel és jegyvásárlási linkekkel |
| 🛍️ Merch bolt | 7 termék valós fotókkal, kategóriánként szűrve |
| 👕 Méretválasztó | Ruházati termékeknél S/M/L/XL, kiegészítőknél 36–40/41–45 |
| 🛒 Kosárkezelés | Tételek hozzáadása, törlése, összesítő ár valós időben |
| 📦 Guest checkout | Vásárlás regisztráció nélkül, e-mail + szállítási cím megadásával |
| 💳 Fizetési módok | Utánvét (aktív) és bankkártyás fizetés (fejlesztés alatt) |
| 📧 E-mail visszaigazolás | Automatikus rendelés-visszaigazolás EmailJS-en keresztül |
| 🗄️ Adatbázis-perzisztálás | Rendelések és tételek SQLite adatbázisban tárolva |

---

## 🛠️ Technológiák

**Frontend**
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vitejs.dev/) – build tool és fejlesztői szerver
- [React Router DOM v7](https://reactrouter.com/) – kliensoldali routing
- [Tailwind CSS v4](https://tailwindcss.com/) – utility-first stílusozás
- [@emailjs/browser](https://www.emailjs.com/) – e-mail küldés szerver nélkül

**Backend**
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) – REST API
- [sqlite3](https://www.npmjs.com/package/sqlite3) – könnyűsúlyú relációs adatbázis
- [cors](https://www.npmjs.com/package/cors) – Cross-Origin Resource Sharing

**Eszközök**
- Git + GitHub – verziókezelés
- Figma – UI/UX tervezés
- VS Code, PyCharm – fejlesztői környezetek

---

## 📁 Projekt struktúra

```
romlott-zokni/
├── public/                        # Statikus fájlok (képek, SVG logo)
│   ├── logo.svg
│   ├── Romlott_zokni_polo.png
│   ├── zokni_zokni.png
│   └── ...
├── src/
│   ├── components/
│   │   └── Header.tsx             # Fejléc komponens
│   ├── App.tsx                    # Fő alkalmazás (routing + összes oldal)
│   ├── main.tsx                   # React belépési pont
│   └── index-v4.css               # Tailwind v4 konfiguráció
├── server/
│   ├── index.js                   # Express szerver + API végpontok
│   ├── romlott_zokni.db           # SQLite adatbázis
│   └── package.json
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🚀 Telepítés és futtatás

### Előfeltételek

- [Node.js](https://nodejs.org/) v18 vagy újabb
- npm v9 vagy újabb

### 1. Repository klónozása

```bash
git clone https://github.com/<felhasználónév>/romlott-zokni.git
cd romlott-zokni
```

### 2. Frontend indítása

```bash
npm install
npm run dev
```

A frontend elérhető: **http://localhost:5173**

### 3. Backend indítása (új terminálablakban)

```bash
cd server
npm install
node index.js
```

A backend API elérhető: **http://localhost:5000**

> ⚠️ A turné-dátumok és a checkout funkció csak akkor működik, ha a backend szerver is fut.

---

## 📡 API dokumentáció

### `GET /api/tour-dates`

Visszaadja a közelgő koncertek listáját.

**Válasz példa:**
```json
[
  {
    "id": 1,
    "date": "2026.05.20",
    "city": "Budapest",
    "venue": "Penészes Pince",
    "ticketUrl": "https://peneszespince.hu/tickets"
  }
]
```

---

### `POST /api/checkout`

Rendelés leadása. Elmenti a rendelést és a tételeket az adatbázisba.

**Request body:**
```json
{
  "email": "vasarlo@pelda.hu",
  "address": "1234 Budapest, Példa utca 1.",
  "payment": "cash",
  "total": 8000,
  "cart": [
    {
      "name": "Romlott Zokni Turné Póló",
      "selectedSize": "M",
      "price": 5500
    }
  ]
}
```

**Sikeres válasz (`201 Created`):**
```json
{
  "message": "RENDELÉS SIKERESEN MENTVE AZ ADATBÁZISBA!",
  "orderId": "RZ-3"
}
```

---

## 🗄️ Adatbázis-séma

```sql
CREATE TABLE orders (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    order_code     TEXT UNIQUE,
    email          TEXT,
    address        TEXT,
    payment_method TEXT,
    total_price    INTEGER,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id     INTEGER,
    product_name TEXT,
    size         TEXT,
    price        INTEGER,
    FOREIGN KEY(order_id) REFERENCES orders(id)
);
```

---

## 👥 Csapat

| Név | Szerep | Felelősség |
|---|---|---|
| Bácskai Nándor | UX/UI designer, frontend-fejlesztő | Felületterv, termékoldal, kosár UI, reszponzivitás |
| Gáspár Benedek | Projektvezető, fejlesztő | Ütemterv, integráció, dokumentáció |
| Pitner Alexandra | Backend-fejlesztő, tesztelő | API, adatbázis, checkout logika, tesztelés |

---

## 📄 Licenc

Ez a projekt hallgatói tanulmányi célokra készült a Gábor Dénes Egyetem Mérnökinformatikus szakának keretein belül. Kereskedelmi felhasználásra nem szánt.