export async function preloadImages(imgUrls: string[]) {
  return Promise.all(imgUrls.map(preloadImage))
}

export async function preloadImage(imgUrl: string) {
  return new Promise((res) => {
    const img = new Image()
    img.src = '/images' + imgUrl
    img.onload = () => res(true)
  })
}
