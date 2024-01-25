import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'

export const IndustryContext = createContext({});

const baseURL = 'http://localhost:8000'

export function IndustryProvider({ children }) {
   const [industry, setIndustry] = useState({});
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      const getCategories = async () => {
         if (!industry._id) return;

         try {
            const response = await axios.get(`${baseURL}/api/industries/${industry._id}`)

            setCategories(response.data?.data?.industry?.categories);
         } catch (error) {
            console.log(error.response);
         }
      }

      getCategories()

   }, [industry._id])

   return (
      <IndustryContext.Provider value={{ industry, categories, setIndustry }}>{children}</IndustryContext.Provider>
   );
}

export function useIndustry() {
   const context = useContext(IndustryContext);
   if (!context) {
      throw new Error("useIndustry must be used within the IndustryProvider");
   }
   return context;
}