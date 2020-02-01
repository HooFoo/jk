export function isImage(file: any) {
    const fileName = file.name || file.path;
    const suffix = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
    if (suffix === 'jpg' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'png') {
        return true;
    }
}
export function convertBytesToMbsOrKbs(filesize: number){
  var size = '';
  // I know, not technically correct...
  if(filesize >= 1000000){
    size = (filesize / 1000000) + ' megabytes';
  }else if(filesize >= 1000){
    size = (filesize / 1000) + ' kilobytes';
  }else{
    size = filesize + ' bytes' 
  }
  return size
}

export async function createFileFromUrl (url: string) {
  const response = await fetch(url);
  const data = await response.blob();
  const metadata = { type: data.type };
  const ext = data.type.split('/').pop() || "ext";
  const filename = url.replace(/\?.+/, '').split('/').pop() || `file.${ext}`;
  return new File([data], filename, metadata);
}