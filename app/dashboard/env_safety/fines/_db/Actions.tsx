"use server";
import { MongoRepo } from "@/lib/TestDBModel";
import { Data, DataParser } from "./DataType";

const repo = new MongoRepo<Data>(new DataParser());

export async function addData(
    data: Data | Data[]
) {
    return await repo.add(data);
}

export async function updateData(
    data: Data,
) {
    await repo.update(data);
}

export async function getAll() {
    return await repo.query();
}