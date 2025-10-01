import { create } from "zustand";

export const HomeStore = create((get,set)=>({
    IsLoading:false,
    getData:async()=>{
        try {
            console.log("fetching ...")
        } catch (error) {
            console.log(error)
        }finally{

        }
    }
}))