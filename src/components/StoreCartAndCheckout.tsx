import React, { useState } from 'react';
import { CartItem, Book } from '../types';
import { ShoppingBag, ChevronRight, ShoppingCart, Trash2, ShieldCheck, Mail, MapPin, CreditCard, Sparkles, Printer, CheckCircle } from 'lucide-react';

interface StoreCartAndCheckoutProps {
  cart: CartItem[];
  onUpdateQuantity: (bookId: string, delta: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
}

export const StoreCartAndCheckout: React.FC<StoreCartAndCheckoutProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '4000 1234 5678 9010',
    expiry: '09/28',
    cvv: '123'
  });

  const [receipt, setReceipt] = useState<{
    orderId: string;
    date: string;
    items: { title: string; qty: number; price: number }[];
    subtotal: number;
    shipping: number;
    total: number;
  } | null>(null);

  // Totals calculations
  const subtotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const grandTotal = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    // Simulate database secure processing delay
    setTimeout(() => {
      const orderId = 'OBO-' + Math.floor(100000 + Math.random() * 900000);
      const now = new Date();
      const formattedDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
      
      setReceipt({
        orderId,
        date: formattedDate,
        items: cart.map(item => ({
          title: item.book.title,
          qty: item.quantity,
          price: item.book.price
        })),
        subtotal,
        shipping,
        total: grandTotal
      });

      setIsProcessing(false);
      setOrderComplete(true);
      onClearCart();
    }, 2000);
  };

  const triggerPrint = () => {
    window.print();
  };

  if (orderComplete && receipt) {
    return (
      <div className="max-w-2xl mx-auto bg-neutral-950 border border-neutral-900 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl animate-fade-in" id="receipt-container">
        
        {/* Animated Check header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle className="w-10 h-10 animate-pulse" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
            Adupe! Order Confirmed
          </h3>
          <p className="text-sm text-neutral-400">
            Thank you for shopping at <span className="text-amber-400 font-mono">OmoBabaOniweBookstore</span>. Your investment in literature is details verified!
          </p>
        </div>

        {/* PRINTABLE REAL MERCHANT RECEIPT */}
        <div className="bg-neutral-900/60 rounded-xl p-6 border border-neutral-850 space-y-6 font-mono text-xs text-neutral-300 print:bg-white print:text-black">
          <div className="border-b border-dashed border-neutral-800 pb-4 text-center space-y-1">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider print:text-black">
              Omo Baba Oniwe Bookstore Invoice
            </h4>
            <p className="text-[10px] text-neutral-500">14 Broad Street, Lagos Island / Digital Row</p>
            <p className="text-[10px] text-amber-500 font-bold">LEGACY NOVELS & SCHOOL TEXTBOOKS</p>
          </div>

          <div className="grid grid-cols-2 gap-y-2 text-[11px] border-b border-dashed border-neutral-800 pb-4">
            <div><span className="text-neutral-500">ORDER NO:</span> <span className="font-bold text-neutral-200">{receipt.orderId}</span></div>
            <div className="text-right"><span className="text-neutral-500">DATE:</span> {receipt.date}</div>
            <div><span className="text-neutral-500">CUSTOMER:</span> {formData.name}</div>
            <div className="text-right"><span className="text-neutral-500">METHOD:</span> {formData.paymentMethod.toUpperCase()}</div>
            <div className="col-span-2"><span className="text-neutral-500">DELIVER TO:</span> {formData.address}, {formData.city}</div>
          </div>

          {/* Individual items table */}
          <div className="space-y-3 border-b border-dashed border-neutral-800 pb-4">
            <div className="grid grid-cols-12 font-bold text-neutral-400 border-b border-neutral-800/40 pb-1">
              <span className="col-span-6">DESCRIPTION</span>
              <span className="col-span-2 text-center">QTY</span>
              <span className="col-span-4 text-right">PRICE</span>
            </div>

            {receipt.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 text-neutral-300">
                <span className="col-span-6 font-serif truncate" title={item.title}>{item.title}</span>
                <span className="col-span-2 text-center">{item.qty}</span>
                <span className="col-span-4 text-right">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Pricing Row aggregates */}
          <div className="space-y-2 text-right">
            <div>
              <span className="text-neutral-500 mr-4">SUBTOTAL:</span>
              <span>${receipt.subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-neutral-500 mr-4">DELIVERY Surcharge:</span>
              <span>{receipt.shipping === 0 ? 'FREE' : `$${receipt.shipping.toFixed(2)}`}</span>
            </div>
            <div className="text-base font-bold text-amber-400 border-t border-neutral-800 pt-2 flex justify-between">
              <span className="text-neutral-200">GRAND TOTAL:</span>
              <span>${receipt.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-4 text-center border-t border-dashed border-neutral-800 text-[10px] text-neutral-500 space-y-1">
            <p>Iwe n gbe ni s\'oke, ka ri daju pe a n ka!</p>
            <p>"Books lift us up, let us make sure we read!"</p>
            <p className="font-sans text-[8px] tracking-tight text-neutral-600">Generated securely by OBO Platform</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={triggerPrint}
            className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 rounded-lg border border-neutral-800 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print physical receipt
          </button>
          <button
            onClick={() => {
              setOrderComplete(false);
              setIsCheckout(false);
              setReceipt(null);
            }}
            className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-lg font-mono text-xs uppercase tracking-widest font-bold text-center"
          >
            Return to Store Bookrack
          </button>
        </div>
      </div>
    );
  }

  // No Items inside standard Cart check
  if (cart.length === 0) {
    return (
      <div className="text-center py-16 bg-neutral-950/40 rounded-2xl border border-neutral-900 max-w-lg mx-auto p-6" id="empty-cart-state">
        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-500">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <h4 className="font-serif text-lg text-white font-bold tracking-tight mb-2">
          Your Shopping Cart is Empty
        </h4>
        <p className="text-neutral-400 text-xs max-w-xs mx-auto mb-6">
          Explore our mahogany virtual bookracks to select your next physical or digital literary investment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="active-store-cart">
      
      {/* LEFT COLUMN: Item rows OR Delivery address details */}
      <div className="lg:col-span-7 bg-neutral-950/70 border border-neutral-900 rounded-2xl p-6 md:p-8 space-y-6">
        
        {!isCheckout ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
              <h3 className="font-serif text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-500 animate-bounce-slow" />
                Shopping Basket ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
              </h3>
              <button 
                onClick={onClearCart}
                className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-red-500 transition-all"
              >
                Clear All
              </button>
            </div>

            {/* Individual Table rows */}
            <div className="divide-y divide-neutral-900 space-y-4">
              {cart.map((item) => (
                <div key={item.book.id} className="pt-4 flex gap-4 items-center">
                  
                  {/* Miniature Cover render */}
                  <div 
                    className="w-12 h-16 rounded-sm flex-none shadow border-l-[2px] border-black/30"
                    style={{ backgroundColor: item.book.coverDesign.themeColor }}
                  />

                  {/* Identification block */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-white text-xs md:text-sm tracking-tight truncate">
                      {item.book.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400">By {item.book.author}</p>
                    <p className="text-xs text-amber-500 font-mono mt-0.5">${item.book.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity controls counter */}
                  <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded px-2 py-1">
                    <button 
                      onClick={() => onUpdateQuantity(item.book.id, -1)}
                      className="text-neutral-400 hover:text-white px-1 text-xs font-mono"
                    >
                      -
                    </button>
                    <span className="text-xs text-white px-2 font-mono">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.book.id, 1)}
                      className="text-neutral-400 hover:text-white px-1 text-xs font-mono"
                    >
                      +
                    </button>
                  </div>

                  {/* Garbage removal */}
                  <button 
                    onClick={() => onRemoveItem(item.book.id)}
                    className="p-1 text-neutral-500 hover:text-red-500 rounded hover:bg-neutral-900 transition-all"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreateOrder} className="space-y-6">
            <div className="border-b border-neutral-900 pb-4">
              <h3 className="font-serif text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Secure Checkout Delivery Credentials
              </h3>
              <p className="text-xs text-neutral-400 mt-1">Please enter your shipping address to route Baba Oniwe's physical cargo package.</p>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Customer Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Adebayo Adeleye"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Email Connection</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="adebayo@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 pl-8 text-xs text-white focus:outline-none"
                    />
                    <Mail className="absolute left-2.5 top-3 w-3.5 h-3.5 text-neutral-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Mobile Line phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+234 803 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Shipping Street Address</label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="e.g. 14 Broad Street, Lagos Island"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 pl-8 text-xs text-white focus:outline-none"
                  />
                  <MapPin className="absolute left-2.5 top-3 w-3.5 h-3.5 text-neutral-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">State City / Region</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Lagos Island / Ile-Ife"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Settlement Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="card">💳 Simulated Credit/Debit Card</option>
                    <option value="cod">🚚 Cash on Delivery (COD)</option>
                    <option value="transfer">📱 Mobile Bank Transfer</option>
                  </select>
                </div>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-850 space-y-3">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                    <CreditCard className="w-3 h-3 text-amber-500" /> Secure Card Simulator
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-6">
                      <label className="block text-[9px] uppercase font-mono text-neutral-400 mb-0.5">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded p-2 focus:outline-none focus:border-amber-500/30 text-neutral-300"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-[9px] uppercase font-mono text-neutral-400 mb-0.5">Expiry</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded p-2 focus:outline-none text-neutral-300 text-center"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-[9px] uppercase font-mono text-neutral-400 mb-0.5">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded p-2 focus:outline-none text-neutral-300 text-center"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsCheckout(false)}
                className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 rounded-lg border border-neutral-800 font-mono text-xs uppercase tracking-widest"
              >
                ← Back to Cart Edit
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className={`flex-1 py-3 rounded-lg font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 ${
                  isProcessing 
                    ? 'bg-neutral-800 text-neutral-600 border border-neutral-700 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/10'
                }`}
              >
                {isProcessing ? 'Verifying payment...' : 'Submit Secured Order'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* RIGHT COLUMN: Ledger Receipt Summary */}
      <div className="lg:col-span-5 bg-neutral-950 border border-neutral-900 rounded-2xl p-6 md:p-8 space-y-6">
        <h3 className="font-serif text-lg font-bold text-white tracking-tight border-b border-neutral-900 pb-3">
          Summary Cost Ledger
        </h3>

        <div className="space-y-4 font-mono text-xs text-neutral-300" id="summary-sidebar-stats">
          
          {/* List items block */}
          <div className="space-y-3 pb-4 border-b border-neutral-900 max-h-48 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.book.id} className="flex justify-between items-start gap-4">
                <span className="text-neutral-400 line-clamp-1 flex-1 font-serif">
                  {item.book.title} <span className="text-neutral-600 font-mono text-[10px]/none">x {item.quantity}</span>
                </span>
                <span className="text-amber-500">${(item.book.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between">
              <span className="text-neutral-500">Subtotal Row:</span>
              <span className="text-neutral-200">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Shipping Delivery:</span>
              <span className="text-neutral-200">
                {shipping === 0 ? (
                  <span className="text-emerald-400 font-bold uppercase text-[10px]">FREE Over $50</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-amber-400 border-t border-neutral-900 pt-3 flex-none">
              <span className="text-neutral-200">Grand Total Surcharge:</span>
              <span className="text-base">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-neutral-900/60 border border-neutral-850 rounded-lg flex gap-2 text-[10px] text-neutral-400 leading-relaxed font-sans mt-4">
            <Sparkles className="w-5 h-5 text-amber-500 flex-none" />
            <p>
              Spend <span className="text-amber-400 font-bold">$50.00</span> or more to secure <span className="text-emerald-400 font-bold font-mono">FREE SHIPPING</span> within our cargo corridor network.
            </p>
          </div>

          {!isCheckout && (
            <button
              onClick={() => setIsCheckout(true)}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-mono text-xs uppercase tracking-widest font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-1 mt-4"
            >
              Proceed to secure Delivery
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
