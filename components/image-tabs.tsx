"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageTabs() {
  // To see which tab is active
  const [activeTab, setActiveTab] = useState("organize");

  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Image section */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab("organize")}
              className="
                inline-flex items-center justify-center gap-2
                whitespace-nowrap rounded-md
                text-sm font-medium
                transition-all
                h-9 px-4 py-2
                bg-primary text-white
                hover:bg-primary/90
              "
            >
              Organize Application
            </button>

            <button
              onClick={() => setActiveTab("hired")}
              className="
                inline-flex items-center justify-center gap-2
                whitespace-nowrap rounded-md
                text-sm font-medium
                transition-all
                h-9 px-4 py-2
                bg-primary text-white
                hover:bg-primary/90
              "
            >
              Get hired
            </button>

            <button
              onClick={() => setActiveTab("boards")}
              className="
                inline-flex items-center justify-center gap-2
                whitespace-nowrap rounded-md
                text-sm font-medium
                transition-all
                h-9 px-4 py-2
                bg-primary text-white
                hover:bg-primary/90
              "
            >
              Manage Boards
            </button>
          </div>

          <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden border border-gray-200 shadow-lg py-8 flex flex-col gap-4">
            {activeTab === "organize" && (
              <Image
                src="/hero-images/hero1.png"
                alt="Organize Application"
                width={1200}
                height={800}
              />
            )}

            {activeTab === "hired" && (
              <Image
                src="/hero-images/hero2.png"
                alt="Get hired"
                width={1200}
                height={800}
              />
            )}

            {activeTab === "boards" && (
              <Image
                src="/hero-images/hero3.png"
                alt="Manage Boards"
                width={1200}
                height={800}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
