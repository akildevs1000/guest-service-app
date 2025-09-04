'use client';

import { useRouter, usePathname } from 'next/navigation'; // Import usePathname

const ChatPage = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current URL path

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* ... (Header content) ... */}
      <footer className="fixed bottom-0 left-0 w-full p-4 z-10 bg-[var(--background)] backdrop-blur-sm dark:bg-[var(--background)]">

        <nav className="flex justify-around border-t border-[var(--border-color)] px-4 pb-3 pt-2">
          {/* Home Button */}
          <button
            className={`flex flex-col items-center justify-end gap-1 w-1/5 bg-transparent border-none outline-none cursor-pointer ${pathname === '/home' ? 'text-[var(--color-primary)]' : 'text-[var(--text-secondary)]'
              }`}
            onClick={() => router.push("/home")}
          >
            <span className="material-symbols-outlined">home</span>
            <p className="text-xs font-medium">Home</p>
          </button>
          {/* Order Button */}
          <button
            className={`flex flex-col items-center justify-end gap-1 w-1/5 bg-transparent border-none outline-none cursor-pointer ${pathname === '/food_items' ? 'text-[var(--color-primary)]' : 'text-[var(--text-secondary)]'
              }`}
            onClick={() => router.push("/food_items")}
          >
            <span className="material-symbols-outlined">receipt_long</span>
            <p className="text-xs font-medium">Order</p>
          </button>
          {/* Checkout Button */}
          <button
            className={`flex flex-col items-center justify-end gap-1 w-1/5 bg-transparent border-none outline-none cursor-pointer ${pathname === '/checkout' ? 'text-[var(--color-primary)]' : 'text-[var(--text-secondary)]'
              }`}
            onClick={() => router.push("/checkout")}
          >
            <span className="material-symbols-outlined">credit_card</span>
            <p className="text-xs font-medium">Checkout</p>
          </button>
          {/* History Button */}
          <button
            className={`flex flex-col items-center justify-end gap-1 w-1/5 bg-transparent border-none outline-none cursor-pointer ${pathname === '/order_history' ? 'text-[var(--color-primary)]' : 'text-[var(--text-secondary)]'
              }`}
            onClick={() => router.push("/order_history")}
          >
            <span className="material-symbols-outlined">history</span>
            <p className="text-xs font-medium">History</p>
          </button>
          {/* Chat Button */}
          <button
            className={`flex flex-col items-center justify-end gap-1 w-1/5 bg-transparent border-none outline-none cursor-pointer ${pathname === '/chat' ? 'text-[var(--color-primary)]' : 'text-[var(--text-secondary)]'
              }`}
            onClick={() => router.push("/chat")}
          >
            <span className="material-symbols-outlined">chat</span>
            <p className="text-xs font-medium">Chat</p>
          </button>
          {/* Profile Button */}
          {/* <button
            className={`flex flex-col items-center justify-end gap-1 w-1/5 bg-transparent border-none outline-none cursor-pointer ${
              pathname === '/profile' ? 'text-[var(--color-primary)]' : 'text-[var(--text-secondary)]'
            }`}
            onClick={() => router.push("/profile")}
          >
            <span className="material-symbols-outlined">person</span>
            <p className="text-xs font-medium">Profile</p>
          </button> */}
        </nav>
      </footer>
    </div>
  );
};

export default ChatPage;