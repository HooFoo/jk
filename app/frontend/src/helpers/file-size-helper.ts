export function convertBytesToMbsOrKbs(filesize: number){
  const KB = 1024;
  const MB = KB * KB;
  let size = '';
  if(filesize >= MB) {
    size = (filesize / MB) + ' MB';
  } else if(filesize >= KB){
    size = (filesize / KB) + ' KB';
  } else {
    size = filesize + ' bytes';
  }
  return size
}