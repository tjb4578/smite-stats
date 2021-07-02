import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DashboardViewComponent } from './dashboard-view.component';

export default {
  title: 'DashboardViewComponent',
  component: DashboardViewComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<DashboardViewComponent>;

const Template: Story<DashboardViewComponent> = (args: DashboardViewComponent) => ({
  component: DashboardViewComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}