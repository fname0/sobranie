import Head from "next/head";

const Seo = ({title, keywords, description}) => {
    return ( 
    <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        {/* <meta property="og:image" content="/icon.ico" /> */}
        <meta name='description' content={description}/>
        <meta property="og:description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="keywords" content={keywords} />
        <meta charSet="utf-8"></meta>
        {/* <link rel="icon" href="https://sobranie.vercel.app/icon.ico" type="image/x-icon"/> */}
        {/* <link rel="apple-touch-icon" href="/icon.ico"/> */}
    </Head>
     );
}
export default Seo;