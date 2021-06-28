export async function preloadImages(imgUrls: string[]) {
  return Promise.all(imgUrls.map(preloadImage))
}

export async function preloadImage(imgUrl: string) {
  return new Promise((res) => {
    const img = new Image()
    img.src = process.env.REACT_APP_BASE_URL + imgUrl
    img.onload = () => res(true)
  })
}
