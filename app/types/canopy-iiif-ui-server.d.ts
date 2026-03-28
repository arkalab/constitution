declare module "@canopy-iiif/app/ui/server" {
  import type { CSSProperties, ReactElement } from "react";

  export function SubNavigation(props: {
    navigation?: any;
    page?: any;
    current?: any;
    className?: string;
    style?: CSSProperties;
    heading?: any;
    ariaLabel?: string;
  }): ReactElement | null;

  export function ContentNavigation(props: {
    items?: any[];
    className?: string;
    style?: CSSProperties;
    heading?: any;
    headingId?: any;
    pageTitle?: any;
    ariaLabel?: string;
    collapsible?: boolean;
  }): ReactElement | null;

  export function ContentNavigationScript(): ReactElement;
}
