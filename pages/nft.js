import Head from 'next/head'
import Footer from '../components/footer';
import Header from '../components/header';
import Image from 'next/image';
import Faq from '../components/faq';
import Script from 'next/script';
import Link from 'next/link';
import NFTEscrow from '../components/NFTDeposit.js';

export default function NFT() {

  function addWebsiteJsonLd() {
    return {
      __html: 
      `
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "PaymentService",
            "url": "https://yescrow.io",
            "name": "Yescrow",
            "alternateName": "YesCrow",
            "description": "Establish trust with online strangers.",
            "potentialAction": {
              "@type": "TransferAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://yescrow.io/#Deposit"
              },
              "description": "Escrow NFT"
            },
            "serviceType": "NFT Escrow",
            "logo": {
              "@type": "ImageObject",
              "url": "https://yescrow.io/white_crow_icon_black_bg.png",
              "width": 600,
              "height": 600
            },
            "provider": {
              "@type": "Organization",
              "name": "Yescrow",
              "email": "sunsakis@pm.me",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support"
              }
            }
          }
          
          }
        ]
      }
      
      `
    }
  }

  return (
    <div class="container max-w-2xl mx-auto justify-center">
      <Head>
        <title>NFT Escrow | Yescrow</title>
        <meta 
          name="description" 
          content="Yescrow is a decentralized escrow service with the intention to let people escrow their crypto as simply as possible." 
        />
        <meta 
          name="keywords"
          content="escrow, nft, service"/>
        <link rel="canonical" href="https://yescrow.io/nft" />
      </Head>
      <Script
        id="website-schema"
        dangerouslySetInnerHTML={addWebsiteJsonLd()}
        type="application/ld+json"
      />
        <Header />
        <main>
        <div> 
          <h1 class="m-4 text-4xl text-center font-bold">Escrow NFT to establish online trust.</h1>
          <p class="m-4 text-xl text-center">Yescrow lets people escrow their crypto as simply as possible.</p>
          <br/>
          <div 
    class="rounded-3xl pt-3 pb-2 text-center border-2 bg-[#161618]"
    id="EscrowNFT">
        <div>
                <Image
                  src="/nft_logo.png" 
                  class="mx-auto m-2"
                  width="60" 
                  height="50" 
                  alt="NFT logo">
                </Image>
        <NFTEscrow />
        </div> 
    </div>    
        <br/>
        <p class="m-4 text-xl text-center">Would you like to <Link href="/" class="underline font-bold text-matrix">escrow <span class="font-bold">ERC20</span> tokens?</Link>
          <br/>
        </p>
        <Image 
        class="mx-auto"
        src="/yescrow_trinity_black_bg.png" 
        alt="how to escrow Ethereum on Yes Crow" 
        width={400} 
        height={340} />
        </div>
        <div 
          class="rounded-3xl m-5 pt-3 pb-2 text-center border-2 bg-[#161618]">
            <h2 class="m-4 text-xl font-semibold text-center">Yescrow is at your service. No need to create any accounts, no bullshit, just cut the middleman.</h2>
            <p class="m-4 font-medium text-center">
              Deposit your NFT and release it once the deal goes through.
              <br/>
              Yescrow will only interfere if one of the parties is not satisfied. 
              <br/> 
              All transactions are transparent on Ethereum`s blockchain.
            </p>
            <p class="m-4 font-medium text-center">
              
                We also offer <u>custom tailored solutions.</u>
              
                <br/> 
                Contact us to find out more.</p>
            <Link href="mailto:sunsakis@pm.me">
              <Image
                class="mx-auto m-5" 
                src="envelope-white-bg.svg"
                alt="envelope"
                width="50"
                height="25"
              />
            </Link>
          </div>
        <br/>
        <Faq />
        </main>
        <br/>
      <Footer />
      
    </div>
    
  )
}