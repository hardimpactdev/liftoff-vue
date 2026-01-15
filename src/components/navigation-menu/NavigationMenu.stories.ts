import type { Meta, StoryObj } from '@storybook/vue3';
import NavigationMenu from './NavigationMenu.vue';
import NavigationMenuContent from './NavigationMenuContent.vue';
import NavigationMenuIndicator from './NavigationMenuIndicator.vue';
import NavigationMenuItem from './NavigationMenuItem.vue';
import NavigationMenuLink from './NavigationMenuLink.vue';
import NavigationMenuList from './NavigationMenuList.vue';
import NavigationMenuTrigger from './NavigationMenuTrigger.vue';
import NavigationMenuViewport from './NavigationMenuViewport.vue';
import { navigationMenuTriggerStyle } from '.';

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      NavigationMenu,
      NavigationMenuContent,
      NavigationMenuIndicator,
      NavigationMenuItem,
      NavigationMenuLink,
      NavigationMenuList,
      NavigationMenuTrigger,
      NavigationMenuViewport,
    },
    setup() {
      return { args, navigationMenuTriggerStyle };
    },
    template: `
      <div class="flex justify-center p-8">
        <NavigationMenu v-bind="args">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li class="row-span-3">
                    <NavigationMenuLink as-child>
                      <a
                        class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <!-- <img src="https://www.radix-vue.com/logo.svg" class="h-6 w-6" /> -->
                        <div class="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p class="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI and
                          Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs/introduction">Introduction</a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs/installation">Installation</a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="/docs/typography">Typography</a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <li v-for="component in ['Alert Dialog', 'Hover Card', 'Progress', 'Scroll-area', 'Tabs', 'Tooltip']" :key="component">
                    <NavigationMenuLink as-child>
                      <a
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="#"
                      >
                        <div class="text-sm font-medium leading-none">{{ component }}</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Brief description for {{ component }}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/docs" :class="navigationMenuTriggerStyle()">
                Documentation
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    `,
  }),
  args: {},
};
