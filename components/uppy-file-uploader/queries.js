import axios from "axios";
import {baseURL} from "@/constants/env";

export const UPDATE_STORAGE_FILE = async fileId => {
    const res = await axios.patch(`${baseURL}/v1/storage-file/${fileId}`);
    return res?.data;
};