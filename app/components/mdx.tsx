/**
 * Replace the examples with your own components or add new ones. You
 * may also import components from dependencies and re-export them here.
 */
 
// Map SSR-safe components to be rendered at build time and used in MDX files
export const components = {
  HeroSection: "./HeroSection.tsx",
  NavBar: "./NavBar.tsx",
  FooterSection: "./FooterSection.tsx",
  AboutLayout: "./AboutLayout.tsx",
  AboutPageLayout: "./AboutPageLayout.tsx",
  SectionTitle: "./SectionTitle.tsx",
  SectionSubtitle: "./SectionSubtitle.tsx",
  SectionCTA: "./SectionCTA.tsx",
  SectionFeaturedImage: "./SectionFeaturedImage.tsx",
  SectionBody: "./SectionBody.tsx",
  WorkDetailLayout: "./WorkDetailLayout.tsx",
  WorkDetailScript: "./WorkDetailScript.tsx",
  WorkMetadataPanel: "./WorkMetadataPanel.tsx",
};
 
// Map browser-only components to their source files; the builder bundles
// them separately and hydrates placeholders at runtime.
export const clientComponents = {
  SearchPage: "./SearchPage.client.tsx",
};