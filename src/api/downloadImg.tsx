import RNFetchBlob from 'rn-fetch-blob';

const downloadImage = (base64Data, fileName) => {
  const pathToSave = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}.jpeg`;
  
  // Menghapus awalan data:image/jpeg;base64, dari base64Data
  const base64Image = base64Data.replace(/^data:image\/jpeg;base64,/, '');

  // Membuat blob dari base64Data
  const imageBlob = RNFetchBlob.polyfill.Blob.build(base64Image, { type: 'image/jpeg;base64' });

  // Menyimpan blob ke penyimpanan lokal
  RNFetchBlob.fs.writeFile(pathToSave, imageBlob, 'base64')
    .then(() => {
      console.log('Gambar berhasil diunduh ke:', pathToSave);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
