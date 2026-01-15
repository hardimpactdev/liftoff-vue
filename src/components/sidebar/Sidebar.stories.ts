import type { Meta, StoryObj } from '@storybook/vue3';
import SidebarProvider from './SidebarProvider.vue';
import Sidebar from './Sidebar.vue';
import SidebarContent from './SidebarContent.vue';
import SidebarGroup from './SidebarGroup.vue';
import SidebarGroupContent from './SidebarGroupContent.vue';
import SidebarGroupLabel from './SidebarGroupLabel.vue';
import SidebarMenu from './SidebarMenu.vue';
import SidebarMenuItem from './SidebarMenuItem.vue';
import SidebarMenuButton from './SidebarMenuButton.vue';
import SidebarInset from './SidebarInset.vue';
import SidebarTrigger from './SidebarTrigger.vue';
import { Home, Inbox, Calendar, Settings } from 'lucide-vue-next';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      SidebarProvider,
      Sidebar,
      SidebarContent,
      SidebarGroup,
      SidebarGroupContent,
      SidebarGroupLabel,
      SidebarMenu,
      SidebarMenuItem,
      SidebarMenuButton,
      SidebarInset,
      SidebarTrigger,
      Home, Inbox, Calendar, Settings
    },
    setup() {
      const items = [
        { title: 'Home', url: '#', icon: Home },
        { title: 'Inbox', url: '#', icon: Inbox },
        { title: 'Calendar', url: '#', icon: Calendar },
        { title: 'Settings', url: '#', icon: Settings },
      ];
      return { args, items };
    },
    template: `
      <div class="h-[600px] border rounded-md overflow-hidden">
        <SidebarProvider>
            <Sidebar v-bind="args">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem v-for="item in items" :key="item.title">
                                    <SidebarMenuButton as-child>
                                        <a :href="item.url">
                                            <component :is="item.icon" />
                                            <span>{{ item.title }}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <header class="flex h-12 items-center px-4 border-b">
                     <SidebarTrigger class="-ml-2" />
                </header>
                <div class="flex-1 p-4">
                    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div class="aspect-video rounded-xl bg-muted/50" />
                        <div class="aspect-video rounded-xl bg-muted/50" />
                        <div class="aspect-video rounded-xl bg-muted/50" />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
      </div>
    `,
  }),
  args: {},
};
