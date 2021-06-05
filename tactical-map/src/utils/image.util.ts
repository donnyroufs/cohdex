export class ImageUtil {
  static async loadAsyncImage(url: string): Promise<HTMLImageElement> {
    return new Promise((res) => {
      const img = new Image()
      img.src = url

      img.onload = () => {
        return res(img)
      }
    })
  }
}
