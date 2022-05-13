<template>
  <Form class="mt-8 space-y-6" :validation-schema="schema" @submit="submit">
    <input type="hidden" name="remember" value="true" />
    <div class="-space-y-px">
      <div class="mb-4">
        <label for="email" class="sr-only">Email</label>
        <Field
          name="email"
          type="email"
          class="input input-bordered w-full"
          placeholder="Email"
        />
        <ErrorMessage name="email" class="px-2 text-xs text-error" />
      </div>
      <div class="relative">
        <label for="password" class="sr-only">Password</label>
        <Field
          name="password"
          :type="passwordType"
          class="input input-bordered w-full"
          placeholder="Password"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm">
          <EyeIcon
            v-if="passwordType === 'password'"
            class="h-5 w-5 cursor-pointer"
            @click="showPassword = !showPassword"
          />
          <EyeOffIcon
            v-else
            class="h-5 w-5 cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </div>
        <ErrorMessage name="password" class="px-2 text-xs text-error" />
      </div>
    </div>

    <button type="submit" class="btn btn-primary w-full" :disabled="disabled">
      Sign in
    </button>
  </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { EyeIcon, EyeOffIcon } from "@heroicons/vue/solid";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["submit"]);

const schema = yup.object({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(8).label("Password"),
});

const showPassword = ref(false);
const passwordType = computed(() => (showPassword.value ? "text" : "password"));

function submit({ email, password }) {
  emit("submit", { email: email.trim(), password: password });
}
</script>
