//mport type { NextPage } from 'next'
import { useState } from "react"
import {NftCard} from './components/nftCard'

const Home=()=>{

  const [wallet,setWalletAddress]=useState("")
  const [collection, setCollectionAddress]=useState("")
  const [nft, setNfts]=useState([])
  const[fetchForCollection, setFetchForCollection]=useState(false)

  
  let requestOptions={
    method:'GET'
  }

  const fetchNfts= async()=>{

  let nfts;
  console.log(' fetching nfts')

 
    
    const api_key= process.env.api_key;
    const basURL=`https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`; 


    if(!collection.length){
   
      const fetchUrl= `${basURL}?owner=${wallet}`

      nfts= await fetch(fetchUrl,requestOptions).then(data=>data.json())
    }

    else {
      console.log('fetching nfts for collection owned by address')
      const fetchUrl= `${basURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`
      nfts= await fetch(fetchUrl,requestOptions).then(data=>data.json())
    }


    if(nfts){
      console.log(" nfts : ",nfts)
     setNfts(nfts.ownedNfts)
    }
  }


  const fectNftsForCollection=async()=>{
    if(collection.length){
    const api_key= "xBSChVRUiritis03ruq09jTAt2LCzGZj";
    const basURL=`https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`; 
    const fetchUrl= `${basURL}?contractAddress=${collection}&withMetadata=${"true"}`
    const nfts= await fetch(fetchUrl,requestOptions).then(data=>data.json())

    if(nfts){

      console.log('nfts in collection',nfts)
      setNfts(nfts.nfts)
    }


    }
  }






  return (
    <div className='flex flex-col items-center justify-center py-8 gap-y-3'>

      <div className=' flex flex-col w-full justify-center items-center gap-y-2' >
        <input disabled={fetchForCollection} type={"text"} className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" placeholder="put your wallet address" onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} ></input>
        <input type={'text'} className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" placeholder=" put your collection adddress" onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection}></input>
        <label className="text-gray-6oo"><input type={"checkbox"} className="mr-2" onChange={(e)=>setFetchForCollection(e.target.checked)} ></input> fetch for collection ! </label>
        <button className={"disable:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
         
            ()=>{
            if(fetchForCollection){
            fectNftsForCollection()}
            else {
              fetchNfts()
            }
            
            }}> Let's go</button>
     
      </div >
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {nft.length && nft.map(nft =>{
          return ( 
            <NftCard nft={nft}></NftCard>
          )
        })  }
     

      </div>
    </div>
  )


}

export default Home
