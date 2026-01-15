import type { Meta, StoryObj } from '@storybook/vue3';
import HoverCard from './HoverCard.vue';
import HoverCardContent from './HoverCardContent.vue';
import HoverCardTrigger from './HoverCardTrigger.vue';
import Button from '../button/Button.vue';
import Avatar from '../avatar/Avatar.vue';
import AvatarFallback from '../avatar/AvatarFallback.vue';
import AvatarImage from '../avatar/AvatarImage.vue';
import { CalendarDays } from 'lucide-vue-next';

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      HoverCard,
      HoverCardContent,
      HoverCardTrigger,
      Button,
      Avatar,
      AvatarFallback,
      AvatarImage,
      CalendarDays,
    },
    setup() {
      return { args };
    },
    template: `
      <div class="flex justify-center p-20">
        <HoverCard v-bind="args">
          <HoverCardTrigger as-child>
            <Button variant="link">
              @vuejs
            </Button>
          </HoverCardTrigger>
          <HoverCardContent class="w-80">
            <div class="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/vuejs.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">
                  @vuejs
                </h4>
                <p class="text-sm">
                  The Progressive JavaScript Framework
                </p>
                <div class="flex items-center pt-2">
                  <CalendarDays class="mr-2 h-4 w-4 opacity-70" />
                  <span class="text-xs text-muted-foreground">
                    Joined January 2014
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    `,
  }),
  args: {},
};
