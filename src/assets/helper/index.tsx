// helpers.js

const formatDate = (inputDate) => {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
  
    // Membuat objek Date dari string input
    const date = new Date(inputDate);
  
    // Mengambil tanggal, bulan, dan tahun dari objek Date
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    // Menghasilkan tanggal dalam format yang diinginkan
    return `${day} ${months[monthIndex]} ${year}`;
  };
  
  export const Helper = { formatDate };
  