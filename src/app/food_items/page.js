"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../Components/Loader";
import { useInfo } from "../contexts/InfoContext";
import { useCart } from "../contexts/CartContext";
import api from "../lib/api";

export default function FoodItemsPage() {
  const { info } = useInfo();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);

  // ✅ use cart context
  const { cart, addToCart, increaseQty, decreaseQty, cartHasItems } = useCart();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(
          "/get_hotel_menu_categories_list_by_timingId",
          {
            params: {
              company_id: info?.company_id || 0,
            },
          }
        );
        console.log("🚀 Categories API Response:", data);
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchFoodItems = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/get_food_items_by_category", {
          params: {
            company_id: info?.company_id || 0,
            category_id: selectedCategory || 0,
          },
        });

        console.log("🚀 setFoodItems API Response:", data);
        setFoodItems(data);
      } catch (err) {
        console.error("Error fetching food items:", err);
        setFoodItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchFoodItems();
  }, [selectedCategory]);

  return (
    <div className="relative flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="flex items-center justify-between p-4 top-0 bg-[#111714]/80">
        <button className="text-white" onClick={() => router.back()}>
          <span className="material-symbols-outlined"> arrow_back </span>
        </button>
        <h1 className="text-white text-lg font-bold">Room Service</h1>
        <div className="w-8"></div>
      </header>

      {/* Categories */}
      <nav className="bg-gray-100 dark:bg-[#111714]">
        <div className="flex border-b border-gray-300 dark:border-[#3d5245] px-4 gap-6 overflow-x-auto whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-4 bg-transparent transition-colors ${
                selectedCategory === cat.id
                  ? "border-b-[var(--primary-color)] text-[var(--primary-color)]"
                  : "border-b-transparent text-gray-500 dark:text-[#9eb7a8] hover:text-gray-900 dark:hover:text-white"
              }`}
              style={
                selectedCategory === cat.id ? { fontWeight: "bold" } : {}
              }
              onClick={() => setSelectedCategory(cat.id)}
            >
              <p className="text-sm font-bold">{cat.name}</p>
            </button>
          ))}
        </div>
      </nav>

      {/* Food Items */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {loading ? <Loader /> : null}
        <section>
          <div className="space-y-4">
            {foodItems
              .filter((item) => item.category_id === selectedCategory)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl p-4 bg-gray-100 dark:bg-[#1c2620] hover:bg-gray-200 dark:hover:bg-[#29382f] transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-gray-900 dark:text-white text-lg font-bold">
                        {item.name}
                      </p>
                      <p className="text-gray-500 dark:text-[#9eb7a8] text-sm">
                        {item.description}
                      </p>
                      <p className="text-gray-900 dark:text-white font-bold mt-2">
                        ${item.amount}
                      </p>
                    </div>
                    <div
                      className="w-28 h-28 bg-center bg-cover rounded-lg shrink-0"
                      style={{ backgroundImage: `url('${item.item_picture}')` }}
                    ></div>
                  </div>

                  {/* Cart controls */}
                  {cart[item.id] ? (
                    <div className="flex items-center gap-3 w-full">
                      <button
                        className="bg-gray-300 dark:bg-gray-700 text-xl rounded-full w-10 h-10 flex items-center justify-center font-bold"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </button>
                      <span className="font-bold text-lg">
                        {cart[item.id].qty}
                      </span>
                      <button
                        className="bg-green-500 text-white text-xl rounded-full w-10 h-10 flex items-center justify-center font-bold hover:bg-green-600"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full bg-primary text-[#111714] dark:text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      onClick={() => addToCart(item)}
                    >
                      <span className="material-symbols-outlined">
                        add_shopping_cart
                      </span>
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* Proceed to Order */}
      {cartHasItems && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-white dark:bg-[#111714] border-t border-gray-200 dark:border-[#3d5245] z-50">
          <div className="w-full flex items-center justify-center">
            <button
              className="w-full text-[#111714] bg-primary max-w-md relative flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-full overflow-hidden group focus:outline-none border-0"
              type="button"
              onClick={() => router.push("/proceed-order")}
            >
              <span className="relative z-10 flex items-center gap-2 w-full justify-center">
                <span className="material-symbols-outlined">
                  add_shopping_cart
                </span>
                <span> Proceed to Order</span>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
