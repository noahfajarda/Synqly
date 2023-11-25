import { useState } from "react";
import Dropzone from "react-dropzone";

export default function AssetUploader({
  selectedAsset,
  setSelectedAsset,
  setSelectedAssetType,
}: {
  selectedAsset: File | undefined;
  setSelectedAsset: (Status: File) => void;
  setSelectedAssetType: (Status: string) => void;
}) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  return (
    <>
      <Dropzone
        onDrop={async (acceptedFiles) => {
          const asset = acceptedFiles[0]; // file object itself
          const assetType = acceptedFiles[0].type.split("/")[0]; // either 'image' or 'video'
          setSelectedAsset(asset);
          setSelectedAssetType(assetType);

          // show asset as a preview
          const file = new FileReader();
          file.onload = () => {
            setPreview(file.result);
          };
          file.readAsDataURL(asset);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="flex sm:justify-end justify-center">
            <div className="w-fit">
              <div {...getRootProps()}>
                <input
                  {...getInputProps()}
                  accept="image/png, image/jpg, video/mp4"
                />
                <p className="flex justify-center items-center gap-5 bg-primary-500 rounded cursor-pointer hover:bg-slate-900/90 stroke-white transition-all p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-camera stroke-1 transition-all"
                    viewBox="0 0 16 16"
                    width="30px"
                    height="30px"
                  >
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />{" "}
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />{" "}
                  </svg>
                  {preview ? "Change File" : "Upload File (Optional)"}
                </p>
              </div>
              <p
                style={{ fontSize: 12 }}
                className="px-2 text-white sm:text-end text-center italic"
              >
                *Upload An Image Or Video
              </p>
            </div>
          </section>
        )}
      </Dropzone>

      {preview && (
        <div className="flex justify-center">
          {selectedAsset && selectedAsset.type.split("/")[0] === "video" ? (
            <video
              className="w-44 rounded border-2 border-white-500"
              width="500px"
              height="500px"
              controls="controls"
            >
              {/* video */}
              <source src={preview} type="video/mp4" />
            </video>
          ) : (
            <img
              className="w-44 rounded border-2 border-white-500"
              src={preview}
            />
          )}
        </div>
      )}
    </>
  );
}
