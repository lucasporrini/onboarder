import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingStep } from '../lib/types';
import OnboardingManager from './OnboardingManager';

const meta: Meta<typeof OnboardingManager> = {
  title: 'Components/OnboardingManager',
  component: OnboardingManager,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OnboardingManager>;

const defaultSteps: OnboardingStep[] = [
  {
    target: '#welcome',
    content: 'Welcome to our amazing app! Let&apos;s take a quick tour.',
    title: 'Welcome',
    placement: 'bottom',
  },
  {
    target: '#features',
    content: 'Here you can find all the amazing features we offer.',
    title: 'Features',
    placement: 'right',
  },
  {
    target: '#settings',
    content: 'Customize your experience in the settings panel.',
    title: 'Settings',
    placement: 'left',
  },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    onComplete: () => console.log('Tour completed!'),
    showProgress: true,
    showSkip: true,
    showBack: true,
  },
  decorators: [
    Story => (
      <div className="min-h-screen bg-gray-100 p-8">
        <div id="welcome" className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Our App</h1>
          <p className="mt-2 text-gray-600">
            We&apos;re excited to have you here! Let&apos;s show you around.
          </p>
        </div>

        <div id="features" className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Features</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">Feature 1</h3>
              <p className="text-blue-600">Amazing feature description</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">Feature 2</h3>
              <p className="text-green-600">Another great feature</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800">Feature 3</h3>
              <p className="text-purple-600">Yet another feature</p>
            </div>
          </div>
        </div>

        <div id="settings" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600" />
              <label className="ml-2 text-gray-700">Enable notifications</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600" />
              <label className="ml-2 text-gray-700">Dark mode</label>
            </div>
          </div>
        </div>

        <Story />
      </div>
    ),
  ],
};

export const WithoutProgress: Story = {
  args: {
    ...Default.args,
    showProgress: false,
  },
};

export const WithoutSkip: Story = {
  args: {
    ...Default.args,
    showSkip: false,
  },
};

export const WithoutBack: Story = {
  args: {
    ...Default.args,
    showBack: false,
  },
};
