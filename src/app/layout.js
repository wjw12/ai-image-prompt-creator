import '../styles/globals.css'

export const metadata = {
  title: 'AI Image Prompt Creator',
  description: 'Create AI image prompts with ease',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}