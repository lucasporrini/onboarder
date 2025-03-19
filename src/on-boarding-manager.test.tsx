import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import OnboardingManager from './OnboardingManager';

describe('OnboardingManager', () => {
  const mockSteps = [
    {
      target: '#welcome',
      content: 'Welcome to our app!',
      title: 'Welcome',
    },
    {
      target: '#features',
      content: 'Here are our main features.',
      title: 'Features',
    },
  ];

  const mockOnComplete = vi.fn();

  beforeEach(() => {
    // Setup DOM elements for testing
    document.body.innerHTML = `
      <div id="welcome">Welcome Section</div>
      <div id="features">Features Section</div>
    `;
  });

  it('renders without crashing', () => {
    render(<OnboardingManager steps={mockSteps} onComplete={mockOnComplete} />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('shows the first step content', () => {
    render(<OnboardingManager steps={mockSteps} onComplete={mockOnComplete} />);
    expect(screen.getByText('Welcome to our app!')).toBeInTheDocument();
  });

  it('navigates to the next step when clicking next', () => {
    render(<OnboardingManager steps={mockSteps} onComplete={mockOnComplete} />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(screen.getByText('Here are our main features.')).toBeInTheDocument();
  });

  it('calls onComplete when finishing the tour', () => {
    render(<OnboardingManager steps={mockSteps} onComplete={mockOnComplete} />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    const finishButton = screen.getByText('Finish');
    fireEvent.click(finishButton);

    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('allows skipping the tour', () => {
    render(<OnboardingManager steps={mockSteps} onComplete={mockOnComplete} />);

    const skipButton = screen.getByText('Skip');
    fireEvent.click(skipButton);

    expect(mockOnComplete).toHaveBeenCalled();
  });
});
