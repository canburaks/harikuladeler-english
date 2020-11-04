import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Layout from "../../components/Layout"
import Card from "../../components/Card"
import Airdata  from "../api/hello"
import Hero from "../../components/Hero"

const CategoryPage = ({categorydata, currentCategoryData, tagdata}) => {
    const router = useRouter()
    const { pathname } = router

    //console.log("category", currentCategoryData.links)
    
    const getTagNames = (tagId) => tagdata.filter(t => t.id === tagId).map(t => t.fields.name)[0]
    //const existingCategories =  categorydata.filter(c => c.fields.link)
    //const category = categorydata.filter(c => c.fields.slug === pathname)[0]
    //useEffect(() => {
    //  window.dataLayer = window.dataLayer || [];
    //  function gtag(){dataLayer.push(arguments)}
    //  gtag('js', new Date());
    //  gtag('config', 'G-YWQNTGMG9S');
    //},[])

    return (
    <Layout >
      <Head>
        <title>Awesome {currentCategoryData.fields.name} Apps and Tools</title>
        <meta name="description" content={`Awesome ${currentCategoryData.fields.name} apps and tools.`}></meta>
        {/* 
        */}
      </Head>
      <Hero categories={categorydata} />

        <div className="section main">
            <div className="w-layout-grid grid">
            { currentCategoryData.links && currentCategoryData.links.map(link => {
                //console.log("link", k);
                const tagNames = link.fields.tag ? link.fields.tag.map( tid => getTagNames(tid)) : []
                //console.log(tagNames)
                return ( 
                <Card 
                  key={link.id}
                  tagNames={tagNames}
                  slug={link.fields.slug} 
                  title={link.fields.title} 
                  bilgi={link.fields.bilgi}
                  imageUrl={link.fields.imageUrl}
                  url={link.fields.url}
                />
                )})}
            </div>
        </div>
    </Layout>
  )
}

export async function getStaticPaths() {
    const {linkdata, categorydata, tagdata } = await Airdata();
    //const existingCategories =  categorydata.filter(c => c.fields.link)


    const paths = categorydata.map(c => ({params:{slug:c.fields.slug}}))
    return {  paths, fallback: false }
};



export async function getStaticProps({params}) {
    const {linkdata, categorydata, tagdata } = await Airdata();
    //console.log("data", categorydata)

    //const existingCategories =  categorydata.filter(c => c.fields.link)
    var currentCategory = categorydata.filter(c => c.fields.slug === params.slug)[0]
    var currentLinks = linkdata.filter(l => currentCategory.fields.link.includes(l.id) )
    currentCategory.links = currentLinks
    var currentCategoryData = currentCategory
    //const categoryAndLinks = categorydata.map(c => {
    //  if (c.fields.link && c.fields.link.length > 0){
    //    const belongedLinks = linkdata.filter(l => c.fields.link.includes(l.id) )
    //    const updatedCategory = {links: belongedLinks, ...c}
    //    return updatedCategory
    //  }
    //})
    //const data = await rawdata.json()
    //console.log("data", params)
    return {
      props: {
        categorydata,
        currentCategoryData,
        tagdata,

      }, // will be passed to the page component as props
    }
}


export default CategoryPage