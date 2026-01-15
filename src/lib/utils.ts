import { trans as __ } from 'laravel-vue-i18n'
import { usePage } from '@inertiajs/vue3'
import type { SharedData } from '@/types'
export { cn } from './cn'

export { __ }

export function can(permission: string) {
  const page = usePage<SharedData>()
  return page.props.auth.user.permissions.includes(permission)
}
