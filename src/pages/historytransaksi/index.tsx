import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../../components";
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from "../../assets";
import { historyTransaksiApi } from "../../api/api";
import { ScrollView } from "react-native";

const HistoryTransaksi = ({ navigation }) => {
  const [data, setData] = useState()

  const fetchData = async () => {
    const data = await historyTransaksiApi()
    setData(data)
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    // setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const formatDate = (inputDate) => {
    // Mendefinisikan array nama bulan
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

  const ViewTransaksi = () => {
    if (!data) {
      return (
        <View center style={{ flex: 1 }}>
          <Text style={[assets.fonts.bold]}>Tidak ada history transaksi</Text>
        </View>
      )
    } else {
      return (
        <>
          {
            data.map((item, index) => (
              <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <View style={{ marginRight: 10 }}>
                  {item.dataArtis.FotoProfil !== ' ' ? (
                    <Image
                      source={{ uri: (item.dataArtis.FotoProfil).startsWith('https://') ? item.dataArtis.FotoProfil : `data:image/*;base64,${item.dataArtis.FotoProfil}` }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 60,
                      }}
                    />
                  ) : (
                    <Icon color={'grey'} name="circle-user" size={60} solid />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[assets.fonts.bold]}>{item.dataArtis.Username}</Text>
                      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, paddingHorizontal: 5 }}>•</Text>
                      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13 }}>{(item.NoTransaksi).length > 8 ? (item.NoTransaksi).slice(0, 8) + '...' : (item.NoTransaksi)}</Text>
                    </View>
                    <Text style={[assets.fonts.bold, { color: '#165E3D' }]}>Selesai</Text>
                  </View>
                  <Text style={[assets.fonts.default, { fontSize: 12, color: '#747474' }]}>{formatDate(item.TanggalBeli)} - {formatDate(item.TanggalHabisMembership)}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[assets.fonts.bold]}>Rp {(item.Harga).toLocaleString()}</Text>
                    <TouchableOpacity style={{ borderWidth: 1, paddingVertical: 3, paddingHorizontal: 15, borderRadius: 20, borderColor: '#004DA6' }}
                      onPress={() => navigation.navigate("Member", {
                        profile: {
                          id: item.dataArtis.UserID,
                          Username: item.dataArtis.Username,
                          FotoProfil: item.dataArtis.FotoProfil,
                          HargaMember: item.Harga,
                        }
                      })}
                    >
                      <Text style={[assets.fonts.bold, { color: '#004DA6' }]}>Beli Lagi</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          }
        </>
      )
    }
  }

  return (
    <SafeAreaView style={container.defaultTab}>
      <View marginV-20 marginH-15 style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Icon color='black' name="arrow-left" size={20} />
          </TouchableOpacity>
        </View>
        <Text style={[{ fontSize: 16.5, fontFamily: 'Poppins-Bold' }]} >Riwayat Transaksi</Text>
        <View style={{ height: 20, width: 20 }} />
      </View>
      <ScrollView style={{ marginHorizontal: 15 }}>
        <ViewTransaksi />
      </ScrollView>

    </SafeAreaView>
  )
}

export default HistoryTransaksi