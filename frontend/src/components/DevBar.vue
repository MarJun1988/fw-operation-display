<script lang="ts" setup></script>

<template>
  <!-- 🧭 Dev Breakpoint Indicator -->
  <div class="fixed bottom-0 left-0 z-50 w-full text-center font-mono text-sm text-white shadow-md">
    <div class="bg-red-600 sm:hidden">
      📱 <strong>xs</strong> (&lt;640px) — Smartphones (Portrait)
    </div>
    <div class="hidden bg-orange-500 sm:block md:hidden">
      📱 <strong>sm</strong> (≥640px) — Smartphones (Landscape) / kleine Tablets
    </div>
    <div class="hidden bg-yellow-500 md:block lg:hidden">
      💻 <strong>md</strong> (≥768px) — Tablets (Portrait)
    </div>
    <div class="hidden bg-green-500 lg:block xl:hidden">
      🖥️ <strong>lg</strong> (≥1024px) — Tablets (Landscape) / kleine Laptops
    </div>
    <div class="hidden bg-blue-600 xl:block 2xl:hidden">
      🖥️ <strong>xl</strong> (≥1280px) — Desktops (Full HD)
    </div>
    <div class="hidden bg-purple-600 2xl:block">
      🧠 <strong>2xl</strong> (≥1536px) — Widescreens / 4K Displays
    </div>
  </div>
</template>
