import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
	fieldChange: (files: File[]) => void;
	mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
	const [file, setFile] = useState<File[]>([]);
	const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			setFile(acceptedFiles);
			fieldChange(acceptedFiles);
			setFileUrl(convertFileToUrl(acceptedFiles[0]));
		},
		[file]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpeg", ".jpg"],
		},
	});

	return (
		<div
			{...getRootProps()}
			className="flex flex-col items-center justify-center bg-[#120912] rounded-xl cursor-pointer border border-[#1A0E1A] hover:shadow-md transition"
		>
			<input {...getInputProps()} className="cursor-pointer" />

			{fileUrl ? (
				<>
					<div className="flex justify-center w-full p-5 lg:p-10">
						<img
							src={fileUrl}
							alt="Uploaded file"
							className="h-80 lg:h-[480px] w-full rounded-2xl object-cover object-top"
						/>
					</div>
					<p className="text-[#8C7C73] text-center text-sm w-full p-4 border-t border-[#1A0E1A]">
						Click or drag photo to replace
					</p>
				</>
			) : (
				<div className="flex flex-col items-center justify-center p-7 h-80 lg:h-[612px] w-full border-2 border-gray-800 rounded-md">
					<img src="/assets/icons/file-upload.svg" width={96} height={77} alt="Upload" />

					<h3 className="text-base font-medium text-[#FAFAF5] mb-2 mt-6">
						Drag photo here
					</h3>
					<p className="text-sm text-[#B9B4AF] mb-6">SVG, PNG, JPG</p>

					<button
						type="button"
						className="bg-[#5D3C18] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#8A5628] transition-all shadow-sm"
					>
						Select from computer
					</button>
				</div>
			)}
		</div>
	);
};

export default FileUploader;
