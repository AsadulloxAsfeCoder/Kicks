"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { Input } from "../ui/input";
import Image from 'next/image';

interface CartItem {
  size: string;
  quantity: string;
  price: number;
  name: string;
  description: string;
  image: string;
  color?:string
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
}

interface FormErrors {
  email: boolean;
  firstName: boolean;
  lastName: boolean;
  address: boolean;
  phone: boolean;
  ageVerified: boolean;
}

const deliveryFee = 6.99;

function ProductCheckout() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [selected, setSelected] = useState<"standard" | "store">("standard");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<CartItem | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: false,
    firstName: false,
    lastName: false,
    address: false,
    phone: false,
    ageVerified: false,
  });
  const [checkboxes, setCheckboxes] = useState({
    sameBilling: false,
    ageVerified: false,
    newsletter: false
  });

  useEffect(() => {
    if (cart.length > 0) {
      setProduct(cart[0]);
    } else {
      router.push("/");
    }
  }, [cart, router]);

  const calculateTotal = (): number => {
    if (!product) return 0;
    const subtotal = product.price * parseInt(product.quantity);
    const delivery = selected === "standard" ? deliveryFee : 0;
    return subtotal + delivery;
  };

  const validateForm = (): boolean => {
    const errors = {
      email: !formData.email,
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      address: !formData.address,
      phone: !formData.phone,
      ageVerified: !checkboxes.ageVerified,
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!product) {
      alert("Mahsulot topilmadi!");
      setLoading(false);
      return;
    }

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            ...product,
            quantity: parseInt(product.quantity)
          },
          customer: {
            ...formData,
            ...checkboxes
          },
          delivery: selected,
          total: calculateTotal().toFixed(2),
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP xatosi! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success || !data.orderId) {
        throw new Error("Buyurtma ID si qaytarilmadi");
      }

      clearCart();
      router.push(`/order-confirmation/${data.orderId}?success=true`);
      
    } catch (error: unknown) {
      console.error('Xatolik:', error);
      alert(`Xatolik yuz berdi: ${error instanceof Error ? error.message : 'Noma\'lum xatolik'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div className="p-14">Yuklanmoqda...</div>;
  }

  return (
    <main className="container mx-auto p-4 lg:p-14 gap-8 flex flex-col lg:flex-row">
      {/* Left Section - Form (Desktop) */}
      <section className="lg:w-2/3 hidden lg:block">
        <form onSubmit={handleSubmit}>
          {/* Contact Details */}
          <div className="mb-8">
            <Link href="#" className="text-[20px] font-semibold">Login and Checkout faster</Link>
            <h3 className="text-[32px] font-semibold">Contact Details</h3>
            <p className="text-[16px] font-semibold opacity-60 mb-6">
              We will use these details to keep you informed about your delivery.
            </p>
            <Input
              className={clsx(
                "w-[342px] h-[48px] border rounded-[8px] pl-4 mb-1",
                formErrors.email ? "border-red-500 bg-red-50" : "border-[#000]"
              )}
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setFormErrors({ ...formErrors, email: false });
              }}
              required
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mb-3">Iltimos, email manzilingizni kiriting</p>
            )}
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-[32px] font-semibold mb-4">Shipping Address</h3>
            <div className="flex gap-4 mb-4">
              <div>
                <input
                  className={clsx(
                    "w-[322px] h-[48px] border rounded-[8px] pl-4",
                    formErrors.firstName ? "border-red-500 bg-red-50" : "border-[#000]"
                  )}
                  type="text"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                    setFormErrors({ ...formErrors, firstName: false });
                  }}
                  required
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">Iltimos, ismingizni kiriting</p>
                )}
              </div>
              <div>
                <input
                  className={clsx(
                    "w-[322px] h-[48px] border rounded-[8px] pl-4",
                    formErrors.lastName ? "border-red-500 bg-red-50" : "border-[#000]"
                  )}
                  type="text"
                  placeholder="Last Name*"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                    setFormErrors({ ...formErrors, lastName: false });
                  }}
                  required
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">Iltimos, familiyangizni kiriting</p>
                )}
              </div>
            </div>
            <div>
              <input
                className={clsx(
                  "w-[664px] h-[48px] border rounded-[8px] pl-4 mb-1",
                  formErrors.address ? "border-red-500 bg-red-50" : "border-[#000]"
                )}
                type="text"
                placeholder="Find Delivery Address*"
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                  setFormErrors({ ...formErrors, address: false });
                }}
                required
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm mb-1">Iltimos, manzilingizni kiriting</p>
              )}
              <p className="text-[12px] font-normal opacity-60 mb-4">
                Start typing your street address or zip code for suggestion
              </p>
            </div>
            <div>
              <input
                className={clsx(
                  "w-[342px] h-[48px] border rounded-[8px] pl-4 mb-1",
                  formErrors.phone ? "border-red-500 bg-red-50" : "border-[#000]"
                )}
                type="tel"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  setFormErrors({ ...formErrors, phone: false });
                }}
                required
              />
              {formErrors.phone && (
                <p className="text-red-500 text-sm mb-1">Iltimos, telefon raqamingizni kiriting</p>
              )}
              <p className="text-[12px] font-normal opacity-60">E.g. (123) 456-7890</p>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="mt-8">
            <h3 className="text-[32px] font-semibold mb-4">Delivery Options</h3>
            <div className="space-y-6">
              <div
                onClick={() => setSelected("standard")}
                className={clsx(
                  "w-[664px] h-[90px] rounded-2xl p-4 cursor-pointer transition-all",
                  "hover:border-[#00f] hover:shadow",
                  selected === "standard"
                    ? "border bg-[#e6f0ff]"
                    : "border border-gray-300 bg-white text-[#000]"
                )}
              >
                <h3 className="flex justify-between text-xl font-semibold">
                  <span>Standard Delivery</span>
                  <span className="text-[#00f]">${deliveryFee.toFixed(2)}</span>
                </h3>
                <p className="text-base">Enter your address to see when you'll get your order</p>
              </div>
              
              <div
                onClick={() => setSelected("store")}
                className={clsx(
                  "w-[664px] h-[90px] rounded-2xl p-4 cursor-pointer transition-all",
                  "hover:border-[#00f] hover:shadow",
                  selected === "store"
                    ? "border bg-[#e6f0ff]"
                    : "border border-[#000] bg-gray-300 text-[#000]"
                )}
              >
                <h3 className="flex justify-between text-xl font-semibold">
                  <span>Collect in store</span>
                  <span>Free</span>
                </h3>
                <p className="text-base">Pay now, collect in store</p>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={checkboxes.sameBilling}
                onCheckedChange={(checked) => setCheckboxes({...checkboxes, sameBilling: !!checked})}
                className="border-[#000]" 
              />
              <p className="text-[16px] font-semibold">
                My billing and delivery information are the same
              </p>
            </div>
            <div className="flex mt-6 items-center gap-2">
              <Checkbox 
                checked={checkboxes.ageVerified}
                onCheckedChange={(checked) => {
                  setCheckboxes({...checkboxes, ageVerified: !!checked});
                  setFormErrors({...formErrors, ageVerified: false});
                }}
                className={clsx(
                  "border-[#000]",
                  formErrors.ageVerified ? "border-red-500" : ""
                )}
                required
              />
              <p className={clsx(
                "text-[16px] font-semibold",
                formErrors.ageVerified ? "text-red-500" : ""
              )}>
                I'm 13+ years old
              </p>
            </div>
            {formErrors.ageVerified && (
              <p className="text-red-500 text-sm -mt-2">Iltimos, yoshingizni tasdiqlang</p>
            )}
            <h3 className="text-[16px] mt-[32px] font-semibold">Also want product updates with our newsletter?</h3>
            <div className="flex mb-6 items-center gap-2">
              <Checkbox 
                checked={checkboxes.newsletter}
                onCheckedChange={(checked) => setCheckboxes({...checkboxes, newsletter: !!checked})}
                className="border-[#000]" 
              />
              <p className="text-[16px] font-semibold">
                Yes, I'd like to receive emails about exclusive sales and more.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              buttonVariants(),
              "w-full lg:w-[362px] h-[48px] uppercase mt-8",
              loading ? "opacity-70 cursor-not-allowed" : ""
            )}
          >
            {loading ? "Working..." : "Review AND PAY"}
          </button>
        </form>
      </section>

      {/* Right Section - Order Summary */}
      <section className="">
        <div className="lg:w-[466px] bg-white rounded-xl shadow-sm p-6 sticky top-8">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>{product.quantity} ITEM</span>
              <span>${(product.price * parseInt(product.quantity)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {selected === "standard" ? `$${deliveryFee.toFixed(2)}` : "Free"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax</span>
              <span>-</span>
            </div>
            <div className="flex justify-between">
              <span>Size</span>
              <span>{product.size}</span>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative lg:w-[466px] p-5 mt-8 bg-white rounded-xl shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Order Details</h3>
          <div className="flex gap-4">
            <Image
              className="w-[138px] h-[158px] object-cover rounded-lg"
              src={product.image}
              alt={product.name}
              width={138}
              height={158}
            />
            <div>
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-blue-600 font-semibold text-lg">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Form (hidden on desktop) */}
      <section className="lg:hidden w-full">
        <form onSubmit={handleSubmit}>
          {/* Contact Details */}
          <div className="mb-8">
            <Link href="#" className="text-[10px] font-semibold">Login and Checkout faster</Link>
            <h3 className="text-[32px] font-semibold">Contact Details</h3>
            <p className="text-[16px] font-semibold opacity-60 mb-6">
              We will use these details to keep you informed about your delivery.
            </p>
            <Input
              className={clsx(
                "w-[322px] h-[48px] border rounded-[8px] pl-4 mb-1",
                formErrors.email ? "border-red-500 bg-red-50" : "border-[#000]"
              )}
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setFormErrors({ ...formErrors, email: false });
              }}
              required
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mb-3">Iltimos, email manzilingizni kiriting</p>
            )}
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-[32px] font-semibold mb-4">Shipping Address</h3>
            <div className="md:flex gap-4 mb-4">
              <div>
                <input
                  className={clsx(
                    "w-[322px] h-[48px] mb-4 border rounded-[8px] pl-4",
                    formErrors.firstName ? "border-red-500 bg-red-50" : "border-[#000]"
                  )}
                  type="text"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                    setFormErrors({ ...formErrors, firstName: false });
                  }}
                  required
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">Iltimos, ismingizni kiriting</p>
                )}
              </div>
              <div>
                <input
                  className={clsx(
                    "w-[322px] h-[48px] border rounded-[8px] pl-4",
                    formErrors.lastName ? "border-red-500 bg-red-50" : "border-[#000]"
                  )}
                  type="text"
                  placeholder="Last Name*"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                    setFormErrors({ ...formErrors, lastName: false });
                  }}
                  required
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">Iltimos, familiyangizni kiriting</p>
                )}
              </div>
            </div>
            <div>
              <input
                className={clsx(
                  "lg:w-[664px] w-[322px] h-[48px] border rounded-[8px] pl-4 mb-1",
                  formErrors.address ? "border-red-500 bg-red-50" : "border-[#000]"
                )}
                type="text"
                placeholder="Find Delivery Address*"
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                  setFormErrors({ ...formErrors, address: false });
                }}
                required
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm mb-1">Iltimos, manzilingizni kiriting</p>
              )}
              <p className="text-[12px] font-normal opacity-60 mb-4">
                Start typing your street address or zip code for suggestion
              </p>
            </div>
            <div>
              <input
                className={clsx(
                  "w-[322px] h-[48px] border rounded-[8px] pl-4 mb-1",
                  formErrors.phone ? "border-red-500 bg-red-50" : "border-[#000]"
                )}
                type="tel"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  setFormErrors({ ...formErrors, phone: false });
                }}
                required
              />
              {formErrors.phone && (
                <p className="text-red-500 text-sm mb-1">Iltimos, telefon raqamingizni kiriting</p>
              )}
              <p className="text-[12px] font-normal opacity-60">E.g. (123) 456-7890</p>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="mt-8">
            <h3 className="text-[32px] font-semibold mb-4">Delivery Options</h3>
            <div className="space-y-6">
              <div
                onClick={() => setSelected("standard")}
                className={clsx(
                  "lg:w-[664px] p-5 h-[90px] rounded-2xl  cursor-pointer transition-all",
                  "hover:border-[#00f] hover:shadow",
                  selected === "standard"
                    ? "border bg-[#e6f0ff]"
                    : "border border-gray-300 bg-white text-[#000]"
                )}
              >
                <h3 className="flex justify-between text-xl font-semibold">
                  <span>Standard Delivery</span>
                  <span className="text-[#00f]">${deliveryFee.toFixed(2)}</span>
                </h3>
                <p className="text-base">Enter your address to see when you'll get your order</p>
              </div>
              
              <div
                onClick={() => setSelected("store")}
                className={clsx(
                  "lg:w-[664px] p-5 h-[90px] rounded-2xl  cursor-pointer transition-all",
                  "hover:border-[#00f] hover:shadow",
                  selected === "store"
                    ? "border bg-[#e6f0ff]"
                    : "border border-[#000] bg-gray-300 text-[#000]"
                )}
              >
                <h3 className="flex justify-between text-xl font-semibold">
                  <span>Collect in store</span>
                  <span>Free</span>
                </h3>
                <p className="text-base">Pay now, collect in store</p>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={checkboxes.sameBilling}
                onCheckedChange={(checked) => setCheckboxes({...checkboxes, sameBilling: !!checked})}
                className="border-[#000]" 
              />
              <p className="text-[16px] font-semibold">
                My billing and delivery information are the same
              </p>
            </div>
            <div className="flex mt-6 items-center gap-2">
              <Checkbox 
                checked={checkboxes.ageVerified}
                onCheckedChange={(checked) => {
                  setCheckboxes({...checkboxes, ageVerified: !!checked});
                  setFormErrors({...formErrors, ageVerified: false});
                }}
                className={clsx(
                  "border-[#000]",
                  formErrors.ageVerified ? "border-red-500" : ""
                )}
                required
              />
              <p className={clsx(
                "text-[16px] font-semibold",
                formErrors.ageVerified ? "text-red-500" : ""
              )}>
                I'm 13+ years old
              </p>
            </div>
            {formErrors.ageVerified && (
              <p className="text-red-500 text-sm -mt-2">Iltimos, yoshingizni tasdiqlang</p>
            )}
            <h3 className="text-[16px] mt-[32px] font-semibold">Also want product updates with our newsletter?</h3>
            <div className="flex mb-6 items-center gap-2">
              <Checkbox 
                checked={checkboxes.newsletter}
                onCheckedChange={(checked) => setCheckboxes({...checkboxes, newsletter: !!checked})}
                className="border-[#000]" 
              />
              <p className="text-[16px] font-semibold">
                Yes, I'd like to receive emails about exclusive sales and more.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              buttonVariants(),
              "w-full lg:w-[362px] h-[48px] uppercase mt-8",
              loading ? "opacity-70 cursor-not-allowed" : ""
            )}
          >
            {loading ? "Working..." : "Review AND PAY"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ProductCheckout;