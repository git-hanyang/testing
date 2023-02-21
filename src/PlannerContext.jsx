import {createContext} from 'react'

export const PlannerContext= createContext()
export const LoginStatus = createContext()



// export default function newPlannerDataUpdated(props){
//     const [plannerData,setNewPlannerData]=useState()

//     return(
//         <PlannerDataUpdated.Provider value={[PlannerData,setNewPlannerData]}>
//             {props.children}
//         </PlannerDataUpdated.Provider>
//     )
// }

// props.children allows us to compose components
// https://www.youtube.com/watch?v=Sq0FoUPxj_c
//https://stackoverflow.com/questions/69419839/how-to-pass-state-in-context-react