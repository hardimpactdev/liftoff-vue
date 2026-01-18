<script setup lang="ts">
import { ref } from 'vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog';
import { Input } from '@/components/input';
import { Label } from '@/components/label';

withDefaults(
  defineProps<{
    /** Error message for password field */
    error?: string;
    /** Whether form is processing */
    processing?: boolean;
  }>(),
  {
    processing: false,
  }
);

const emit = defineEmits<{
  submit: [password: string];
}>();

const password = ref('');

const handleSubmit = () => {
  emit('submit', password.value);
};

const handleCancel = () => {
  password.value = '';
};
</script>

<template>
  <div class="space-y-6">
    <HeadingSmall
      title="Delete account"
      description="Delete your account and all of its resources"
    />
    <div
      class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10"
    >
      <div class="relative space-y-0.5 text-red-600 dark:text-red-100">
        <p class="font-medium">Warning</p>
        <p class="text-sm">
          Please proceed with caution, this cannot be undone.
        </p>
      </div>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="destructive">Delete account</Button>
        </DialogTrigger>
        <DialogContent>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <DialogHeader class="space-y-3">
              <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
              <DialogDescription>
                Once your account is deleted, all of its resources and data will also be permanently
                deleted. Please enter your password to confirm you would like to permanently delete
                your account.
              </DialogDescription>
            </DialogHeader>

            <div class="grid gap-2">
              <Label for="password" class="sr-only">Password</Label>
              <Input
                id="password"
                type="password"
                v-model="password"
                placeholder="Password"
              />
              <InputError :message="error" />
            </div>

            <DialogFooter class="gap-2">
              <DialogClose as-child>
                <Button variant="secondary" type="button" @click="handleCancel">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" variant="destructive" :disabled="processing">
                Delete account
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
