<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-6">
    <h1 class="text-9xl font-extrabold tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,0,0,0.7)] animate-pulse">
      404
    </h1>

    <p class="text-xl mt-6 text-gray-300">
      Oops! Diese Seite existiert leider nicht.
    </p>
    <p class="mt-2 text-center max-w-lg text-gray-400">
      Vielleicht hast du dich vertippt? Oder die Seite wurde verschoben.
    </p>

    <RouterLink
      to="/"
      class="mt-8 inline-block px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition transform hover:scale-105 shadow-lg"
    >
      Zurück zur Startseite
    </RouterLink>

    <div class="absolute top-0 left-0 w-full h-full z-[-1]">
      <div class="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent" />
      <div class="absolute bottom-10 right-10 w-40 h-40 bg-red-600/20 rounded-full blur-3xl" />
      <div class="absolute top-10 left-10 w-28 h-28 bg-red-500/10 rounded-full blur-2xl" />
    </div>
  </div>
</template>
