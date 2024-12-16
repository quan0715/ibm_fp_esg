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

export async function deleteData(id: string) {
    return await repo.delete(id);
}

export async function deleteAll() {
    const data = await repo.query();
    data.forEach(async (item) => {
        if (!item._id) return;
        await repo.delete(item._id.toHexString());
    });
}