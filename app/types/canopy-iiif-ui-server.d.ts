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

  export function Label(props: {
    manifest?: any;
    as?: string;
    className?: string;
  }): ReactElement | null;

  export function Summary(props: {
    manifest?: any;
    as?: string;
    className?: string;
  }): ReactElement | null;

  export function Metadata(props: {
    manifest?: any;
    className?: string;
  }): ReactElement | null;

  export function RequiredStatement(props: {
    manifest?: any;
    className?: string;
  }): ReactElement | null;

  export function References(props: {
    className?: string;
  }): ReactElement | null;
}
