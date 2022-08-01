import React, {createContext, useContext, useState} from 'react';

const ResultContext = createContext();

const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({children}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Oyeleye Nurudeen');

    const getResults = async (searchType) => {
        setLoading(true);

        const response = await fetch(`${baseUrl}${searchType}`,{
            method: 'GET', 
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Key': 'TqsqhOo6ZxmshPqvfdavwTkqxZN7p1eIx2ZjsnurFnK0Kbgjy9',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
              }
        }
        );

        const results = await response.json();
            console.log(results);
         if(searchType.includes('/image')){
          setData(results.entries);
         }
         else if(searchType.includes('/image')){
          setData(results.image_results)
         }
         else setData(results.results)
         setLoading(false);
    }
  return (
    <ResultContext.Provider value={{getResults, data, searchTerm, setSearchTerm, loading}}>
        {children}
    </ResultContext.Provider>
  )
}

export const useResultContext = () => useContext(ResultContext);
