import { useRouter } from 'next/router'
import { useEffect } from 'react'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { pathname } = router
  
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)}
    gtag('js', new Date());
    gtag('config', 'G-LYECJRL21W');
  },[])

   

  return <Component { ...pageProps } />
}

export default MyApp


export async function getStaticProps(context) {
  const {linkdata, categorydata, tagdata } = await Airdata()
  //const data = await rawdata.json()
  //console.log("data", data)
  return {
    props: {
      linkdata, categorydata, tagdata
    }, // will be passed to the page component as props
  }
}