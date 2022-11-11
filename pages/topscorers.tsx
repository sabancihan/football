import mongoose from "mongoose";
import { unstable_getServerSession } from "next-auth"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from "next/types"
import { ParsedUrlQuery } from "querystring";
import Player from "../models/Player";
import clientPromise from "../lib/mongoose";
import { authOptions } from "./api/auth/[...nextauth]"

interface PlayerSummary {
    name : string,
    goals : string,
}

interface ServerProps {
    playerWithGoals : Array<PlayerSummary>
}



export default function General({playerWithGoals} : ServerProps) {


    


    

    return (
       
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Goals</th>

          </tr>
        </thead>
        <tbody>
            {
                playerWithGoals.map((player,index) => {
                    return (
                        <tr key={player.name}>
                            <th scope="row">{index+1}</th>
                            <td>{player.name}</td>
                            <td>{player.goals}</td>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
    )
 

    

}



export const getServerSideProps = async (context : GetServerSidePropsContext<ParsedUrlQuery,PreviewData>) => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    
    if (!session) {
        return {
        redirect: {
            destination: '/auth/signin',
            permanent: false,
        },
        }
    }

    

    await clientPromise()


    const playerWithGoals = await 
                                Player.find({goals : {$ne : null}})
                                .select('name goals -_id')
                                .sort({goals : -1})
                                .lean()


    //const playerWithSuperLeagueGoals = await
      //                                      Player.find({"statistics.season_id" : 19367},{_id:0,name:1,statistics : {$elemMatch : {season_id : 19367}}})
        //                                    .sort({"statistics.details.goals" : -1})
          //                                  .lean()
                                            
    

    
    return {
        props: {
            playerWithGoals
        },
    }
    }