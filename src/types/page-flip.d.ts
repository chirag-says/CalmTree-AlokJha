/**
 * Minimal ambient types for `page-flip` (StPageFlip), which ships no .d.ts.
 * Only the surface used by EbookReader is declared.
 */
declare module "page-flip" {
  export interface PageFlipSettings {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    maxShadowOpacity?: number;
    showCover?: boolean;
    usePortrait?: boolean;
    mobileScrollSupport?: boolean;
    startPage?: number;
    autoSize?: boolean;
  }

  export interface FlipEvent {
    data: number;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings);
    loadFromHTML(items: HTMLElement[] | NodeListOf<HTMLElement>): void;
    loadFromImages(images: string[]): void;
    on(event: "flip" | "changeState" | "changeOrientation" | "init", cb: (e: FlipEvent) => void): void;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    turnToPage(page: number): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    destroy(): void;
  }
}
