export class Theming {
  public static backgroundColor(dark: boolean): string {
    return dark ? '#0f0f0f' : 'white';
  }

  public static textColor(dark: boolean): string {
    return dark ? 'white' : 'black';
  }
}
