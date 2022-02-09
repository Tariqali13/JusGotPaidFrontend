import React, { useEffect } from 'react';
import { DashboardModal } from '@uppy/react';
import AwsS3 from '@uppy/aws-s3';
import ms from 'ms';
import Url from '@uppy/url';
import ImageEditor from '@uppy/image-editor';
import Uppy from '@uppy/core';
import { baseURL, uppyApiUrl } from '@/constants/env';
import '@uppy/dashboard/dist/style.css';
import '@uppy/core/dist/style.css';
import '@uppy/url/dist/style.css';
import '@uppy/image-editor/dist/style.css';
import { useMutation } from 'react-query';
import axios from 'axios';
import _get from 'lodash.get';
import { removeBodyClass } from '@/utils/remove-class';
// import NProgress from 'nprogress'

type IProps = {
  open: boolean,
  handleClose: any,
  maxNumberOfFiles: number,
  maxFileSize: number,
  acceptFileTypes: Array<any>,
  albumName?: string,
  axiosMethod?: string,
  uploadUrl?: string,
  FormInfo?: any,
  performFunc?: any,
  refetch?: any,
  handleUpload?: any,
  handleUploadDone?: any,
  setOpenImageModal: any,
  isMulti?: boolean,
  setIsLoadingMultiFiles?: any,
}

type uploadFinishedFunc = {
  url: string,
  mimetype: string,
  filename: string,
  size: string,
}

const UppyFileUploader = (props: IProps) => {
  const {
    open,
    handleClose,
    maxNumberOfFiles,
    maxFileSize,
    acceptFileTypes,
    axiosMethod,
    uploadUrl,
    FormInfo,
    performFunc,
    refetch,
    handleUpload,
    handleUploadDone,
    setOpenImageModal,
    isMulti = false,
    setIsLoadingMultiFiles,
  } = props;
  const { mutate: UPLOAD_FILE, isLoading } = useMutation(async (e: any) => {
    if (axiosMethod === 'post') {
      const res = await axios.post(`${baseURL}/v1/${uploadUrl}`, e);
      return res?.data;
    }
  });
  // @ts-ignore
  const uppy: any = new Uppy({
    debug: false,
    autoProceed: false,
    restrictions: {
      maxFileSize: maxFileSize * 1024 * 1024,
      maxNumberOfFiles: maxNumberOfFiles,
      minNumberOfFiles: 1,
      allowedFileTypes: acceptFileTypes,
    },
  })
    .use(ImageEditor, {})
    .use(Url, {
      companionUrl: uppyApiUrl,
      locale: {},
    })
    .use(AwsS3, {
      limit: 2,
      timeout: ms('1 minute'),
      companionUrl: uppyApiUrl,
    });
  uppy.on('complete', async (result: any) => {
    const resp = result.successful;
    if (!isMulti) {
      resp.forEach((image: any) => {
        onFileUploadFinished({
          url: image.response.body.location,
          mimetype: image.type,
          filename: image.name,
          size: image.size,
        });
      });
      if (setOpenImageModal) {
        setOpenImageModal(false);
        removeBodyClass();
      }
    }
    if (isMulti) {
      const imageData: any[] = [];
      resp.forEach((image: any) => {
        const originalName = image.name;
        const data = {
          ...FormInfo,
        };
        data.file_url = image.response.body.location;
        data.original_name = originalName;
        data.file_size = image.size;
        data.file_type = image.type;
        data.file_name = image.name;
        imageData.push(data);
      });
      if (setOpenImageModal) {
        setOpenImageModal(false);
        removeBodyClass();
      }
      await onFileUploadFinishedMulti(imageData);
    }
  });

  const onFileUploadFinished = async ({
    url,
    mimetype,
    filename,
    size,
  }: uploadFinishedFunc) => {
    if (uploadUrl) {
      const data = {
        ...FormInfo,
      };
      data.file_url = url;
      data.original_name = filename;
      data.file_size = size;
      data.file_type = mimetype;
      data.file_name = filename;
      await UPLOAD_FILE(data, {
        onSuccess: async res => {
          if (performFunc && _get(res, 'data', {})) {
            await performFunc(_get(res, 'data', {}));
          }
          if (handleUploadDone) {
            handleUploadDone();
          }
          if (refetch) {
            await refetch();
          }
        },
        onError: e => {
          console.log('error', e);
        },
      });
    } else {
      const data = {
        file_url: url,
        file_type: mimetype,
        file_name: filename,
        file_size: size,
      };
      handleUpload(data);
    }
    return;
  };

  const onFileUploadFinishedMulti = async (imageData: any) => {
    if (uploadUrl) {
      setIsLoadingMultiFiles(true);
      UPLOAD_FILE(
        { pictures_data: imageData },
        {
          onSuccess: async res => {
            if (handleUploadDone) {
              await handleUploadDone(res);
            }
            if (setIsLoadingMultiFiles) {
              setIsLoadingMultiFiles(false);
            }
          },
          onError: () => {
            if (setIsLoadingMultiFiles) {
              setIsLoadingMultiFiles(false);
            }
          },
        },
      );
    } else {
      handleUpload(imageData);
    }
  };
  useEffect(() => {
    if (isLoading) {
      // NProgress.start()
      if (setIsLoadingMultiFiles) {
        setIsLoadingMultiFiles(true);
      }
    }
  }, [isLoading]);
  return (
    <DashboardModal
      uppy={uppy}
      closeModalOnClickOutside
      open={open}
      onRequestClose={() => {
        handleClose();
        removeBodyClass();
      }}
      plugins={[
        'ImageEditor',
        'Url',
      ]}
      metaFields={[{ id: 'name', name: 'Name', placeholder: 'File name' }]}
    />
  );
};

export default UppyFileUploader;
