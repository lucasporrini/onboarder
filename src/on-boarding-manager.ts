import { OnboardingConfig, OnboardingStep, StepComponentProps } from '../lib/types';

class OnboardingManagerCore {
  private currentStep: number = 0;
  private config: OnboardingConfig;
  private tooltipElement?: HTMLDivElement;

  constructor(config: OnboardingConfig) {
    this.config = config;
  }

  public start(): void {
    this.showStep();
  }

  private showStep(): void {
    this.destroyTooltip();

    const step = this.config.steps[this.currentStep];
    if (!step) return;

    const props: StepComponentProps = {
      goNext: this.next.bind(this),
      goPrev: this.prev.bind(this),
      close: this.destroy.bind(this),
      currentStep: this.currentStep + 1,
      totalSteps: this.config.steps.length,
    };

    const content = this.createTooltipContent(step, props);
    this.createTooltip(content, step.placement || 'bottom');

    if (step.onNext) {
      this.addNextListener(step.onNext);
    }
  }

  private createTooltipContent(step: OnboardingStep, props: StepComponentProps): string {
    const progress = this.config.options?.showProgress
      ? `<div class="progress">${props.currentStep}/${props.totalSteps}</div>`
      : '';

    const title = step.title ? `<h3 class="title">${step.title}</h3>` : '';

    const content = `<div class="content">${step.content}</div>`;

    const buttons = `
      <div class="buttons">
        ${
          this.config.options?.showBack && props.currentStep > 1
            ? `<button data-onboarding-prev>Back</button>`
            : ''
        }
        ${this.config.options?.showSkip ? `<button data-onboarding-skip>Skip</button>` : ''}
        <button data-onboarding-next>
          ${props.currentStep === props.totalSteps ? 'Finish' : 'Next'}
        </button>
      </div>
    `;

    return `
      <div class="onboarding-tooltip">
        ${progress}
        ${title}
        ${content}
        ${buttons}
      </div>
    `;
  }

  private createTooltip(content: string, placement: string): void {
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className =
      this.config.options?.tooltipClass || 'onboarding-tooltip-container';
    this.tooltipElement.innerHTML = content;

    // Positionnement dynamique
    this.positionTooltip(placement);

    document.body.appendChild(this.tooltipElement);
  }

  private positionTooltip(placement: string): void {
    if (!this.tooltipElement) return;

    const positions = {
      top: () => {
        this.tooltipElement!.style.top = '20px';
        this.tooltipElement!.style.left = '50%';
        this.tooltipElement!.style.transform = 'translateX(-50%)';
      },
      bottom: () => {
        this.tooltipElement!.style.bottom = '20px';
        this.tooltipElement!.style.left = '50%';
        this.tooltipElement!.style.transform = 'translateX(-50%)';
      },
      left: () => {
        this.tooltipElement!.style.left = '20px';
        this.tooltipElement!.style.top = '50%';
        this.tooltipElement!.style.transform = 'translateY(-50%)';
      },
      right: () => {
        this.tooltipElement!.style.right = '20px';
        this.tooltipElement!.style.top = '50%';
        this.tooltipElement!.style.transform = 'translateY(-50%)';
      },
    };

    positions[placement as keyof typeof positions]?.();
  }

  private addNextListener(callback: () => void | boolean): void {
    const nextButtons = this.tooltipElement?.querySelectorAll('[data-onboarding-next]');
    nextButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        const result = callback();
        if (result !== false) this.next();
      });
    });
  }

  public next(): void {
    if (this.currentStep < this.config.steps.length - 1) {
      this.currentStep++;
      this.showStep();
    }
  }

  public prev(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep();
    }
  }

  public destroy(): void {
    this.destroyTooltip();
  }

  private destroyTooltip(): void {
    this.tooltipElement?.remove();
  }
}

export default OnboardingManagerCore;
