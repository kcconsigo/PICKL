declare module 'multiple-cucumber-html-reporter' {
  interface BrowserMetadata {
    name: string
    version: string
  }

  interface PlatformMetadata {
    name: string
    version: string
  }

  interface Metadata {
    browser: BrowserMetadata
    device: string
    platform: PlatformMetadata
  }

  interface CustomDataItem {
    label: string
    value: string
  }

  interface CustomData {
    title: string
    data: CustomDataItem[]
  }

  interface ReportOptions {
    jsonDir: string
    reportPath: string
    openReportInBrowser?: boolean
    displayDuration?: boolean
    displayReportTime?: boolean
    metadata?: Metadata
    customData?: CustomData
  }

  export function generate(options: ReportOptions): void
}
