import globalConfig from "@/global.config";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "./_components/logo";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Logo className="size-4" />
        {globalConfig.appName}
      </>
    ),
  },
};
