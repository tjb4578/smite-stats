import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DashboardCardComponent } from './dashboard-card.component';

export default {
  title: 'DashboardCardComponent',
  component: DashboardCardComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<DashboardCardComponent>;

const Template: Story<DashboardCardComponent> = (args: DashboardCardComponent) => ({
  component: DashboardCardComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    title:  '',
    imgUrl:  '',
    route:  '',
}