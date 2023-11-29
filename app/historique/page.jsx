import { useCurrentUser } from "@/hooks/useCurrentUser"
import { getDuels } from "./actions"
import Duel from "./Duel"



export default async function Historique() {

const user = await useCurrentUser()
const duels = await getDuels(user?.id)

if(!duels){
  return <p></p>
}
  return (
    <div className="flex justify-center items-center">
        <div className="flex flex-col gap-6 ">
            {
                duels.map((duel) => {
                  return  <Duel
                    id={user.id}
                    key={duel.id}
                    duel={duel}
                     />
                })
            }
        </div>

    </div>
  )
}
