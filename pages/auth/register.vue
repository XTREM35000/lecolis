<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <UFormGroup label="Full Name">
              <UInput
                v-model="name"
                type="text"
                required
                placeholder="Enter your full name"
              />
            </UFormGroup>
          </div>
          <div>
            <UFormGroup label="Email address">
              <UInput
                v-model="email"
                type="email"
                required
                placeholder="Enter your email"
              />
            </UFormGroup>
          </div>
          <div>
            <UFormGroup label="Password">
              <UInput
                v-model="password"
                type="password"
                required
                placeholder="Enter your password"
              />
            </UFormGroup>
          </div>
        </div>

        <div>
          <UButton
            type="submit"
            color="blue"
            block
            :loading="loading"
          >
            Create Account
          </UButton>
        </div>
      </form>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Already have an account?
          <NuxtLink
            to="/auth/login"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in here
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'auth'
})

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const { register } = useAuth()
const router = useRouter()

const handleRegister = async () => {
  loading.value = true
  try {
    const success = await register({
      name: name.value,
      email: email.value,
      password: password.value
    })
    if (success) {
      router.push('/dashboard')
    }
  } finally {
    loading.value = false
  }
}
</script>