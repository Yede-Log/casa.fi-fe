import { NavbarComponent } from '@/components/Navbar'
import { Html, Head, Main, NextScript } from 'next/document'
import { Container } from 'react-bootstrap'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* <Header /> */}
      <body>
        {/* <Container fluid="md"> */}
          <Main />
        {/* </Container> */}
        <NextScript />
      </body>
    </Html>
  )
}
