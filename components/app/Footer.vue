<template>
  <footer class="bg-gray-100 border-t">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Gogo Express 2.0</h3>
          <p class="text-gray-600">
            Votre partenaire de confiance pour les solutions d'expédition
            internationale.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Liens rapides</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/tracking"
                class="text-gray-600 hover:text-blue-600"
              >
                Suivez vos colis
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/shipping"
                class="text-gray-600 hover:text-blue-600"
              >
                Expédier maintenant
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/support" class="text-gray-600 hover:text-blue-600">
                Support
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <ul class="space-y-2 text-gray-600">
            <li>Email: sieur.thierry.gogo@gmail.com</li>
            <li>WhatsApp: +225 07 58 96 61 56</li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t text-center text-gray-600">
        <p>
          &copy; {{ new Date().getFullYear() }} Gogo Express 2.0. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
