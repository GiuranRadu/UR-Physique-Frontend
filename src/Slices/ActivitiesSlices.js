//-> the provided code is a part of a Redux toolkit, which is a library for managing the state of JavaScript applications. Specifically, it is defining a Redux slice.

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  activities: []
}


const activitiesSlice = createSlice({
  name: "activities",
  initialState: initialState,
  reducers: {
    addActivity(state, action) {
      state.activities.push(action.payload)
    },
    removeActivity(state, action) {
      state.activities = state.activities.filter(item => item.activityId !== action.payload)
    },
    increaseDuration(state, action) {

    },
    decreaseDuration(state, action) {

    },
    clearActivities(state, action) {
      state.activities = [];
    }
  }
})

export const { addActivity, removeActivity } = activitiesSlice.actions
export default activitiesSlice.reducer


