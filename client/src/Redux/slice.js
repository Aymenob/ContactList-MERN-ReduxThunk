import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const addUser = createAsyncThunk("user/addUser", async function (contact, { rejectWithValue }) {
    try {
        const  {data}= await axios.post("http://localhost:8081/User", contact)
        return data
    }
    catch (err) { rejectWithValue(err.response.data.message) }
}
)

export const getUsers=createAsyncThunk("users/getUsers",async function (_,{rejectWithValue}) {
    try{
       const {data}= await axios.get("http://localhost:8081").then(data=>{return data})
        return data
    }
    catch(err){return rejectWithValue(err.response.data.message)}
})

export const deleteUser=createAsyncThunk("users/deleteUser",async function (id,{rejectWithValue}) {
  try{
    const {data}=await axios.delete("http://localhost:8081/Delete/"+id)
    return data
}
  catch(err){return rejectWithValue(err.response.data.message)}
})

const initialState = {
    addedUser: {},
    deletedUser:{},
    users:[],
    loading: false,
    error: null
}
export const counterSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: {
        [addUser.pending]: (state) => {
            state.loading = true;
        },
        [addUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.addedUser = payload;
            state.deletedUser={}
            state.users=[...state.users,payload]
        },
        [addUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload
        },
        [getUsers.pending]:(state)=>{
           state.loading=true
        },
        [getUsers.fulfilled]:(state,{payload})=>{
            state.loading=false;
            state.users=payload
        },
        [getUsers.rejected]:(state,{payload})=>{
            state.loading=false;
            state.error=payload
        },
        [deleteUser.pending]:(state)=>{
            state.loading=true
        },
        [deleteUser.fulfilled]:(state,{payload})=>{
            state.loading=false;
            state.deletedUser=payload;
            state.users=state.users.filter(e=>e._id!==payload._id)
        },
        [deleteUser.rejected]:(state,{payload})=>{
            state.loading=false;
            state.error=payload
        }
    }
 

})

export default counterSlice.reducer