"use server";
import { MongoDocumentRepository } from "@/data/repositories/mongo/DocumentRepository";
import { DocumentGroupType, DocumentObject } from "@/domain/entities/Document";
import { DocumentUseCase } from "@/domain/Services/DocumentUsecases";
import { ObjectId } from "mongodb";

export async function createNewData(
  data: DocumentObject,
  groupType: DocumentGroupType
) {
  const repo = new MongoDocumentRepository();
  const useCase = new DocumentUseCase(repo, groupType);
  return await useCase.createNewDocument(data);
}

export async function updateData(
  data: DocumentObject,
  groupType: DocumentGroupType
) {
  const repo = new MongoDocumentRepository();
  const useCase = new DocumentUseCase(repo, groupType);
  await useCase.updateDocument(data);
}

export async function deleteData(id: string, groupType: DocumentGroupType) {
  const repo = new MongoDocumentRepository();
  const useCase = new DocumentUseCase(repo, groupType);
  return await useCase.deleteDocument(id);
}

export async function getDocuments(groupType: DocumentGroupType) {
  const repo = new MongoDocumentRepository();
  const useCase = new DocumentUseCase(repo, groupType);
  const data = await useCase.getDocuments();
  return data;
}

export async function getDocumentDataWithId(
  id: string,
  groupType: DocumentGroupType
) {
  // console.log("getDocumentDataWithId", id, groupType);
  const repo = new MongoDocumentRepository();
  const useCase = new DocumentUseCase(repo, groupType);
  const data = await useCase.getAssetData(id);
  return data;
}

export async function getDocumentChildren(
  searchPath: string,
  id: string,
  groupType: DocumentGroupType
) {
  const repo = new MongoDocumentRepository();
  const useCase = new DocumentUseCase(repo, groupType);

  const data = await useCase.getChildren(searchPath, id);
  return data;
}

export async function getDocumentAncestors(
  searchPath: string[] = [],
  groupType: DocumentGroupType
) {
  const repo = new MongoDocumentRepository();
  const useCase = new DocumentUseCase(repo, groupType);
  const data = await useCase.getAncestors(searchPath);
  return data;
}

export async function getAssetSibling(
  searchPathString: string,
  groupType: DocumentGroupType
) {
  const repo = new MongoDocumentRepository();
  const useCase = new DocumentUseCase(repo, groupType);
  // console.log("getAssetSibling", searchPathString, groupType);
  const data = await useCase.getSibling(searchPathString);
  // console.log("getAssetSibling", data);
  return data;
}
