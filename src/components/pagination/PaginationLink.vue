<script setup lang="ts">
import type { PaginationListItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from '@/components/button'
import { reactiveOmit } from "@vueuse/core"
import { PaginationListItem, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from '@/components/button'

const props = withDefaults(defineProps<PaginationListItemProps & {
  isActive?: boolean
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}>(), {
  size: "icon",
  isActive: false,
})

const delegatedProps = reactiveOmit(props, "class", "size", "isActive")
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PaginationListItem
    data-slot="pagination-link"
    :class="cn(buttonVariants({ variant: isActive ? 'outline' : 'ghost', size }), props.class)"
    v-bind="forwarded"
  >
    <slot />
  </PaginationListItem>
</template>
