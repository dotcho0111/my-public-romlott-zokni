import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index-v4.css';
import emailjs from '@emailjs/browser';

// --- ADATOK ---
const products = [
  { id: 1, name: 'Romlott Zokni Turné Póló', price: 5500, category: 'Ruházat', sizes: ['S', 'M', 'L', 'XL'], image: '/Romlott_zokni_polo.png' },
    { id: 2, name: 'Büdös a lábam - Dedikált zokni', price: 2500, category: 'Kiegészítők', sizes: ['36-40', '41-45'], image: '/zokni_zokni.png' },
    { id: 3, name: 'Punk-Injekció (Zenei CD)', price: 3000, category: 'Zene', sizes: [], image: '/CD_Romlott_zokni.png' },
    { id: 4, name: 'Bakelit Lemez (Vinyl)', price: 9500, category: 'Zene', sizes: [], image: '/vINyl_Romlott_zokni.png' },
    { id: 5, name: 'Punk-Injekció CD Borító', price: 1500, category: 'Dekor', sizes: [], image: '/album_cover.png' },
    { id: 6, name: 'Szétvert Stratocaster (Broken Guitar)', price: 45000, category: 'Hangszer', sizes: [], image: '/Guitar_romlott_zokni.png' },
    { id: 7, name: 'Húr Pengető (3Db)', price: 1200, category: 'Kiegészítők', sizes: [], image: '/Gitar_pengeto_pick.png' },
  ];

// --- NAVIGÁCIÓ ---
function Nav({ cartCount }: { cartCount: number }) {
  return (
    <nav style={{ 
      backgroundColor: '#0a0a0a', padding: '1rem 2rem', display: 'flex', 
      justifyContent: 'space-between', alignItems: 'center', position: 'sticky', 
      top: 0, zIndex: 100, borderBottom: '2px solid #5bdc00' 
    }}>
      <Link to="/" style={{ color: '#5bdc00', fontSize: '1.8rem', fontWeight: '900', textDecoration: 'none' }}>
        ROMLOTT ZOKNI
      </Link>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>FŐOLDAL</Link>
        <Link to="/merch" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>BOLT</Link>
                <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>ROLÚNK</Link>
        <Link to="/cart" style={{ 
          backgroundColor: '#5bdc00', color: 'black', padding: '0.5rem 1.2rem', 
          borderRadius: '4px', textDecoration: 'none', fontWeight: '800' 
        }}>
          🛒 KOSÁR ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

function About() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', color: 'white', fontFamily: 'monospace' }}>
      <h2 style={{ color: '#5bdc00', fontSize: '3rem', fontWeight: '900', marginBottom: '2rem' }}>RÓLUNK</h2>
      <div style={{ borderLeft: '4px solid #5bdc00', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
          A Romlott Zokni 2025-ben alakult Budapesten. Nem csak zenélünk: mi adjuk a város legbüdösebb punk-injekcióját közvetlenül a hallójárataidba.
        </p>
        <p style={{ color: '#888' }}>
          Minden koncertünket saját magunk rögzítjük, hogy a nyers energia akkor is átjöjjön, ha épp nem az első sorban pogózol. PUNK IS NOT DEAD, JUST SMELLS FUNNY.
        </p>
      </div>

      {/* Koncert hangulatkép a szekció alján */}
      <div style={{
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '3px solid #5bdc00',
        boxShadow: '0 0 25px rgba(91, 220, 0, 0.4)'
      }}>
        <img
          src="/concert.jpg"
          alt="Romlott Zokni koncert hangulat"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  );
}

// --- FŐOLDAL ---
function Home() {
  const [dates, setDates] = useState<any[]>([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/tour-dates').then(res => res.json()).then(setDates).catch(() => {});
  }, []);

  return (
    <div style={{ color: 'white' }}>
      <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)' }}>
        <img src="/logo.svg" alt="Logo" style={{ width: '90%', maxWidth: '500px', filter: 'drop-shadow(0 0 15px rgba(91, 220, 0, 0.6))', marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '1.2rem', letterSpacing: '6px', color: '#5bdc00' }}>PUNK IS NOT DEAD, JUST SMELLS FUNNY</h1>
      </header>
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ color: '#5bdc00', fontSize: '2rem', marginBottom: '2rem' }}>TURNÉ 2026</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {dates.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid #222' }}>
                <td style={{ padding: '1.5rem 0', color: '#888' }}>{t.date}</td>
                <td style={{ fontWeight: 'bold' }}>{t.city.toUpperCase()}</td>
                <td>{t.venue}</td>
                <td style={{ textAlign: 'right' }}><a href={t.ticketUrl} target="_blank" rel="noreferrer" style={{ color: '#5bdc00', textDecoration: 'none', border: '1px solid #5bdc00', padding: '0.4rem 1rem' }}>JEGYEK</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

// --- BOLT ---
function Merch({ addToCart }: { addToCart: (p: any, s: string) => void }) {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem', color: '#5bdc00', fontWeight: '900' }}>MERCH STORE</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {products.map(product => {
          const [size, setSize] = useState(product.sizes[0] || 'N/A');
          return (
            <div key={product.id} style={{ backgroundColor: '#111', border: '1px solid #222', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
              {/* Image Container replaced Emojis */}
              <div style={{
                height: '250px',
                backgroundColor: '#0a0a0a',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: '4px',
                border: '1px solid #333'
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '10px'
                  }}
                  // Fallback if image is missing
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=KÉP+HAMAROSAN'; }}
                />
              </div>

              <h3 style={{ color: 'white', fontSize: '1.2rem', minHeight: '3rem' }}>{product.name}</h3>
              <p style={{ color: '#5bdc00', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{product.price} Ft</p>

              <div style={{ marginTop: 'auto' }}>
                {product.sizes.length > 0 && (
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    style={{ width: '100%', padding: '0.7rem', background: '#222', color: 'white', marginBottom: '1rem', border: '1px solid #333', borderRadius: '4px' }}
                  >
                    {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                )}
                <button
                  onClick={() => { addToCart(product, size); alert("Kosárba dobva!"); }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: '#5bdc00',
                    color: 'black',
                    border: 'none',
                    fontWeight: '900',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: '0.2s'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4aba00')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#5bdc00')}
                >
                  KOSÁRBA
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- KOSÁR ÉS CHECKOUT ---
function CartPage({ cart, removeFromCart, clearCart }: { cart: any[], removeFromCart: (index: number) => void, clearCart: () => void }) {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' vagy 'card'
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Inside CartPage component in App.tsx
  const handleOrder = async () => {
    if (!email.includes('@') || address.length < 5) {
      alert("Hé! Érvényes e-mailt és címet adj meg!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, address, cart, total, payment: paymentMethod })
      });

      const data = await response.json();

      // Trigger EmailJS notification
      await emailjs.send(
        'service_63wywa8',
        'template_d1hqlia',
        {
          to_email: email,
          order_id: data.orderId,
          total_amount: total,
          shipping_address: address,
          email_logo: '/zokni_zokni.png'
        },
        '18is6JcjKKDs5aqQY'
      );

      setCompletedOrder(data);
      clearCart();
    } catch (err: any) {
      console.error("DEBUG ERROR:", err);
      // This will show the actual message if it exists, otherwise the string version of the object
      alert("Hiba: " + (err.text || err.message || JSON.stringify(err)));
    }
  };

  if (completedOrder) {
    return (
      <div style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto', color: '#5bdc00', textAlign: 'center' }}>
        <div style={{ border: '2px solid #5bdc00', padding: '3rem', backgroundColor: '#111' }}>
          <h2 style={{ fontSize: '2rem' }}>🤘 RENDELÉS LEADVA!</h2>
          <p style={{ color: 'white', marginTop: '1rem' }}>Rendelésszám: <span style={{color: '#5bdc00'}}>{completedOrder.orderId}</span></p>
          <p style={{ color: 'white' }}>Szállítási cím: {address}</p>
          <p style={{ color: '#888', marginTop: '1rem' }}>Várd a futárt, vigyél neki vizet!</p>
          <Link to="/" style={{ color: '#5bdc00', display: 'inline-block', marginTop: '2rem', fontWeight: 'bold' }}>VISSZA A FŐOLDALRA</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      <h2 style={{ color: '#5bdc00', fontSize: '2rem', marginBottom: '2rem', fontWeight: '900' }}>KOSARAD TARTALMA</h2>
      
      {cart.length === 0 ? (
        <p>A kosarad olyan üres, mint egy basszeros feje. <Link to="/merch" style={{ color: '#5bdc00' }}>Irány vásárolni!</Link></p>
      ) : (
        <>
          <div style={{ backgroundColor: '#111', padding: '1rem', borderRadius: '8px' }}>
            {cart.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #222', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{item.name}</span> ({item.selectedSize})
                  <div style={{ color: '#5bdc00' }}>{item.price} Ft</div>
                </div>
                <button onClick={() => removeFromCart(idx)} style={{ background: 'none', color: '#ff4444', border: '1px solid #ff4444', padding: '0.3rem 0.6rem', cursor: 'pointer', borderRadius: '4px' }}>TÖRLÉS</button>
              </div>
            ))}
            <div style={{ fontSize: '1.5rem', textAlign: 'right', marginTop: '2rem', color: '#5bdc00', fontWeight: 'bold' }}>ÖSSZESEN: {total} Ft</div>
          </div>

          <div style={{ marginTop: '4rem', padding: '2.5rem', backgroundColor: '#111', borderRadius: '12px', border: '2px solid #5bdc00' }}>
            <h3 style={{ color: '#5bdc00', marginBottom: '1.5rem', fontSize: '1.5rem' }}>GUEST CHECKOUT</h3>
            
            <label style={{display: 'block', marginBottom: '0.5rem', color: '#888'}}>E-mail:</label>
            <input type="email" placeholder="email@pelda.hu" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '1rem', marginBottom: '1.5rem', background: '#222', color: 'white', border: '1px solid #333', borderRadius: '4px' }} />
            
            <label style={{display: 'block', marginBottom: '0.5rem', color: '#888'}}>Szállítási cím:</label>
            <input type="text" placeholder="1234 Város, Utca házszám" value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', padding: '1rem', marginBottom: '2rem', background: '#222', color: 'white', border: '1px solid #333', borderRadius: '4px' }} />

            <h4 style={{ color: '#5bdc00', marginBottom: '1rem' }}>Fizetési mód:</h4>
            <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="radio" name="pay" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                Utánvét (Készpénz a futárnak)
              </label>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="radio" name="pay" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                Bankkártya (Előre fizetés)
              </label>
              
              {/* KÁRTYÁS HIBAÜZENET */}
              {paymentMethod === 'card' && (
                <div style={{ backgroundColor: 'rgba(255,0,0,0.1)', color: '#ff4444', padding: '1rem', border: '1px solid #ff4444', borderRadius: '4px', fontSize: '0.9rem' }}>
                  ⚠️ Sajnáljuk, a bankkártyás fizetés technikai okok miatt jelenleg nem elérhető! Kérjük, válaszd az utánvétet.
                </div>
              )}
            </div>

            <button 
              onClick={handleOrder} 
              disabled={paymentMethod === 'card'}
              style={{ 
                width: '100%', padding: '1.2rem', backgroundColor: paymentMethod === 'card' ? '#333' : '#5bdc00', 
                color: 'black', fontWeight: '900', border: 'none', cursor: paymentMethod === 'card' ? 'not-allowed' : 'pointer', 
                borderRadius: '4px', fontSize: '1.1rem' 
              }}
            >
              RENDELÉS LEADÁSA
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// --- FŐ APP ---
export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const addToCart = (product: any, size: string) => setCart(prev => [...prev, { ...product, selectedSize: size }]);
  const removeFromCart = (index: number) => setCart(prev => prev.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);

  return (
    <Router>
      <div style={{ backgroundColor: '#000', minHeight: '100vh', fontFamily: 'monospace' }}>
        <Nav cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/merch" element={<Merch addToCart={addToCart} />} />
          <Route path="/about" element={<About />}/>
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
        </Routes>
        <footer style={{ textAlign: 'center', padding: '4rem', color: '#333', borderTop: '1px solid #111', marginTop: '4rem' }}>
          © 2026 ROMLOTT ZOKNI ZENETÁR | Mérnökinformatikus Projekt
        </footer>
      </div>
    </Router>
  );
}