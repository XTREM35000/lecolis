<template>
  <div class="max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-center text-[#0070BA] mb-8">
      Contactez-nous
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Informations de contact -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Informations</h2>
        <ul class="space-y-2">
          <li>
            <i class="fas fa-user mr-2 text-[#0070BA]"></i> Responsable :
            <strong>Thierry Gogo</strong>
          </li>
          <li>
            <i class="fas fa-map-marker-alt mr-2 text-[#0070BA]"></i> Adresse :
            01 BP 5341 Abidjan 01
          </li>
          <li>
            <i class="fas fa-envelope mr-2 text-[#0070BA]"></i> Email :
            <a href="mailto:2024dibo@gmail.com" class="text-[#0070BA]"
              >2024dibo@gmail.com</a
            >
          </li>
          <li>
            <i class="fas fa-phone-alt mr-2 text-[#0070BA]"></i> Téléphone :
            <a href="tel:+2250758966156" class="text-[#0070BA]">0758966156</a>
          </li>
        </ul>
      </div>
      <!-- Formulaire de contact -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Envoyez un message
        </h2>
        <form class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Nom</label
            >
            <input
              type="text"
              id="name"
              class="w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              id="email"
              class="w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Votre email"
            />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700"
              >Message</label
            >
            <textarea
              id="message"
              rows="4"
              class="w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Votre message"
            ></textarea>
          </div>
          <button
            type="submit"
            class="bg-[#0070BA] text-white py-2 px-4 rounded-md hover:bg-[#003087]"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
