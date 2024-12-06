<template>
  <div>
    <section
      class="py-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Expédition internationale simplifiée
          </h1>
          <p class="text-xl mb-8">
            Expédiez vos colis dans le monde entier en toute confiance grâce à
            Gogo Express 2.0
          </p>
          <div class="flex justify-center gap-4">
            <UButton to="/shipping" size="lg" color="white" variant="solid">
              Expédier maintenant
            </UButton>
            <UButton to="/tracking" size="lg" color="white" variant="outline">
              Suivez vos colis
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Pourquoi choisir Gogo Express 2.0 ?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div
              class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UIcon
                name="i-heroicons-globe-alt"
                class="w-8 h-8 text-blue-600"
              />
            </div>
            <h3 class="text-xl font-semibold mb-2">Couverture mondiale</h3>
            <p class="text-gray-600">
              Livraison dans plus de 2 pays et territoires à travers le monde
            </p>
          </div>
          <div class="text-center p-6">
            <div
              class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UIcon name="i-heroicons-clock" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Suivi en temps réel</h3>
            <p class="text-gray-600">
              Surveillez vos expéditions 24h/24 et 7j/7 avec des mises à jour
              détaillées
            </p>
          </div>
          <div class="text-center p-6">
            <div
              class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UIcon
                name="i-heroicons-shield-check"
                class="w-8 h-8 text-blue-600"
              />
            </div>
            <h3 class="text-xl font-semibold mb-2">Expédition sécurisée</h3>
            <p class="text-gray-600">
              Vos colis sont entièrement assurés et traités avec soin
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
