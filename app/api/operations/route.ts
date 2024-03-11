import { NextResponse, NextRequest } from "next/server";
import { getOperationData, updateOperationData } from "@/actions/dataActions"
import { OperationDataSchema } from "@/models/AssetOperationDataModel"
import { z } from 'zod'




// update operation data
export async function POST(req: NextRequest, res: NextResponse){
  
    const postData = await req.json()
    console.log(postData)
    try{
        var data = z.array(OperationDataSchema).parse(postData)
        await updateOperationData(data as [any])
        return NextResponse.json({
            "status": "success"
        })
    }
    catch(err){
        console.log(err)
        if(err instanceof z.ZodError){
            return NextResponse.json({
                "status": "error",
                "message": err.errors
            })
        }
        else{
            return NextResponse.json({
                "status": "error",
                "message": err
            })
        }
    }
}