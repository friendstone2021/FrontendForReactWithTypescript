export type FileDtlInfo = {
    fileGroupId: string;
    fileId: string;
    orgnlFileNm: string;
    fileExtnNm: string;
    fileSz: number;
}

export type FileDirInfo = {
    dirId: string|null;
    dirNm: string|null;
    fileCount: number;
    fileSize: number;
}

export type ActionFolderPayload = {
    fileDirInfo: FileDirInfo;
    history: string;
    error: string | null | undefined;
}

export type ActionFolderProps = {
    type: string;
    payload: ActionFolderPayload;
}
