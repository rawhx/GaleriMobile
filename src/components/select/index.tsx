import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../../assets';
import Icon from "react-native-vector-icons/FontAwesome6"
import { ScrollView } from 'react-native-gesture-handler';
const dataSelect = [
    { label: 'Afghanistan', value: '93' },
    { label: 'Albania', value: '355' },
    { label: 'Algeria', value: '213' },
    { label: 'American Samoa', value: '1-684' },
    { label: 'Andorra', value: '376' },
    { label: 'Angola', value: '244' },
    { label: 'Anguilla', value: '1-264' },
    { label: 'Antarctica', value: '672' },
    { label: 'Antigua and Barbuda', value: '1-268' },
    { label: 'Argentina', value: '54' },
    { label: 'Armenia', value: '374' },
    { label: 'Aruba', value: '297' },
    { label: 'Australia', value: '61' },
    { label: 'Austria', value: '43' },
    { label: 'Azerbaijan', value: '994' },
    { label: 'Bahamas', value: '1-242' },
    { label: 'Bahrain', value: '973' },
    { label: 'Bangladesh', value: '880' },
    { label: 'Barbados', value: '1-246' },
    { label: 'Belarus', value: '375' },
    { label: 'Belgium', value: '32' },
    { label: 'Belize', value: '501' },
    { label: 'Benin', value: '229' },
    { label: 'Bermuda', value: '1-441' },
    { label: 'Bhutan', value: '975' },
    { label: 'Bolivia', value: '591' },
    { label: 'Bosnia and Herzegovina', value: '387' },
    { label: 'Botswana', value: '267' },
    { label: 'Brazil', value: '55' },
    { label: 'British Indian Ocean Territory', value: '246' },
    { label: 'British Virgin Islands', value: '1-284' },
    { label: 'Brunei', value: '673' },
    { label: 'Bulgaria', value: '359' },
    { label: 'Burkina Faso', value: '226' },
    { label: 'Burundi', value: '257' },
    { label: 'Cambodia', value: '855' },
    { label: 'Cameroon', value: '237' },
    { label: 'Canada', value: '1' },
    { label: 'Cape Verde', value: '238' },
    { label: 'Cayman Islands', value: '1-345' },
    { label: 'Central African Republic', value: '236' },
    { label: 'Chad', value: '235' },
    { label: 'Chile', value: '56' },
    { label: 'China', value: '86' },
    { label: 'Christmas Island', value: '61' },
    { label: 'Cocos Islands', value: '61' },
    { label: 'Colombia', value: '57' },
    { label: 'Comoros', value: '269' },
    { label: 'Cook Islands', value: '682' },
    { label: 'Costa Rica', value: '506' },
    { label: 'Croatia', value: '385' },
    { label: 'Cuba', value: '53' },
    { label: 'Curacao', value: '599' },
    { label: 'Cyprus', value: '357' },
    { label: 'Czech Republic', value: '420' },
    { label: 'Democratic Republic of the Congo', value: '243' },
    { label: 'Denmark', value: '45' },
    { label: 'Djibouti', value: '253' },
    { label: 'Dominica', value: '1-767' },
    { label: 'Dominican Republic', value: '1-809, 1-829, 1-849' },
    { label: 'East Timor', value: '670' },
    { label: 'Ecuador', value: '593' },
    { label: 'Egypt', value: '20' },
    { label: 'El Salvador', value: '503' },
    { label: 'Equatorial Guinea', value: '240' },
    { label: 'Eritrea', value: '291' },
    { label: 'Estonia', value: '372' },
    { label: 'Ethiopia', value: '251' },
    { label: 'Falkland Islands', value: '500' },
    { label: 'Faroe Islands', value: '298' },
    { label: 'Fiji', value: '679' },
    { label: 'Finland', value: '358' },
    { label: 'France', value: '33' },
    { label: 'French Polynesia', value: '689' },
    { label: 'Gabon', value: '241' },
    { label: 'Gambia', value: '220' },
    { label: 'Georgia', value: '995' },
    { label: 'Germany', value: '49' },
    { label: 'Ghana', value: '233' },
    { label: 'Gibraltar', value: '350' },
    { label: 'Greece', value: '30' },
    { label: 'Greenland', value: '299' },
    { label: 'Grenada', value: '1-473' },
    { label: 'Guam', value: '1-671' },
    { label: 'Guatemala', value: '502' },
    { label: 'Guernsey', value: '44-1481' },
    { label: 'Guinea', value: '224' },
    { label: 'Guinea-Bissau', value: '245' },
    { label: 'Guyana', value: '592' },
    { label: 'Haiti', value: '509' },
    { label: 'Honduras', value: '504' },
    { label: 'Hong Kong', value: '852' },
    { label: 'Hungary', value: '36' },
    { label: 'Iceland', value: '354' },
    { label: 'India', value: '91' },
    { label: 'Indonesia', value: '62' },
    { label: 'Iran', value: '98' },
    { label: 'Iraq', value: '964' },
    { label: 'Ireland', value: '353' },
    { label: 'Isle of Man', value: '44-1624' },
    { label: 'Israel', value: '972' },
    { label: 'Italy', value: '39' },
    { label: 'Ivory Coast', value: '225' },
    { label: 'Jamaica', value: '1-876' },
    { label: 'Japan', value: '81' },
    { label: 'Jersey', value: '44-1534' },
    { label: 'Jordan', value: '962' },
    { label: 'Kazakhstan', value: '7' },
    { label: 'Kenya', value: '254' },
    { label: 'Kiribati', value: '686' },
    { label: 'Kosovo', value: '383' },
    { label: 'Kuwait', value: '965' },
    { label: 'Kyrgyzstan', value: '996' },
    { label: 'Laos', value: '856' },
    { label: 'Latvia', value: '371' },
    { label: 'Lebanon', value: '961' },
    { label: 'Lesotho', value: '266' },
    { label: 'Liberia', value: '231' },
    { label: 'Libya', value: '218' },
    { label: 'Liechtenstein', value: '423' },
    { label: 'Lithuania', value: '370' },
    { label: 'Luxembourg', value: '352' },
    { label: 'Macao', value: '853' },
    { label: 'Macedonia', value: '389' },
    { label: 'Madagascar', value: '261' },
    { label: 'Malawi', value: '265' },
    { label: 'Malaysia', value: '60' },
    { label: 'Maldives', value: '960' },
    { label: 'Mali', value: '223' },
    { label: 'Malta', value: '356' },
    { label: 'Marshall Islands', value: '692' },
    { label: 'Mauritania', value: '222' },
    { label: 'Mauritius', value: '230' },
    { label: 'Mayotte', value: '262' },
    { label: 'Mexico', value: '52' },
    { label: 'Micronesia', value: '691' },
    { label: 'Moldova', value: '373' },
    { label: 'Monaco', value: '377' },
    { label: 'Mongolia', value: '976' },
    { label: 'Montenegro', value: '382' },
    { label: 'Montserrat', value: '1-664' },
    { label: 'Morocco', value: '212' },
    { label: 'Mozambique', value: '258' },
    { label: 'Myanmar', value: '95' },
    { label: 'Namibia', value: '264' },
    { label: 'Nauru', value: '674' },
    { label: 'Nepal', value: '977' },
    { label: 'Netherlands', value: '31' },
    { label: 'Netherlands Antilles', value: '599' },
    { label: 'New Caledonia', value: '687' },
    { label: 'New Zealand', value: '64' },
    { label: 'Nicaragua', value: '505' },
    { label: 'Niger', value: '227' },
    { label: 'Nigeria', value: '234' },
    { label: 'Niue', value: '683' },
    { label: 'North Korea', value: '850' },
    { label: 'Northern Mariana Islands', value: '1-670' },
    { label: 'Norway', value: '47' },
    { label: 'Oman', value: '968' },
    { label: 'Pakistan', value: '92' },
    { label: 'Palau', value: '680' },
    { label: 'Palestine', value: '970' },
    { label: 'Panama', value: '507' },
    { label: 'Papua New Guinea', value: '675' },
    { label: 'Paraguay', value: '595' },
    { label: 'Peru', value: '51' },
    { label: 'Philippines', value: '63' },
    { label: 'Pitcairn', value: '64' },
    { label: 'Poland', value: '48' },
    { label: 'Portugal', value: '351' },
    { label: 'Puerto Rico', value: '1-787, 1-939' },
    { label: 'Qatar', value: '974' },
    { label: 'Republic of the Congo', value: '242' },
    { label: 'Reunion', value: '262' },
    { label: 'Romania', value: '40' },
    { label: 'Russia', value: '7' },
    { label: 'Rwanda', value: '250' },
    { label: 'Saint Barthelemy', value: '590' },
    { label: 'Saint Helena', value: '290' },
    { label: 'Saint Kitts and Nevis', value: '1-869' },
    { label: 'Saint Lucia', value: '1-758' },
    { label: 'Saint Martin', value: '590' },
    { label: 'Saint Pierre and Miquelon', value: '508' },
    { label: 'Saint Vincent and the Grenadines', value: '1-784' },
    { label: 'Samoa', value: '685' },
    { label: 'San Marino', value: '378' },
    { label: 'Sao Tome and Principe', value: '239' },
    { label: 'Saudi Arabia', value: '966' },
    { label: 'Senegal', value: '221' },
    { label: 'Serbia', value: '381' },
    { label: 'Seychelles', value: '248' },
    { label: 'Sierra Leone', value: '232' },
    { label: 'Singapore', value: '65' },
    { label: 'Sint Maarten', value: '1-721' },
    { label: 'Slovakia', value: '421' },
    { label: 'Slovenia', value: '386' },
    { label: 'Solomon Islands', value: '677' },
    { label: 'Somalia', value: '252' },
    { label: 'South Africa', value: '27' },
    { label: 'South Korea', value: '82' },
    { label: 'South Sudan', value: '211' },
    { label: 'Spain', value: '34' },
    { label: 'Sri Lanka', value: '94' },
    { label: 'Sudan', value: '249' },
    { label: 'Suriname', value: '597' },
    { label: 'Svalbard and Jan Mayen', value: '47' },
    { label: 'Swaziland', value: '268' },
    { label: 'Sweden', value: '46' },
    { label: 'Switzerland', value: '41' },
    { label: 'Syria', value: '963' },
    { label: 'Taiwan', value: '886' },
    { label: 'Tajikistan', value: '992' },
    { label: 'Tanzania', value: '255' },
    { label: 'Thailand', value: '66' },
    { label: 'Togo', value: '228' },
    { label: 'Tokelau', value: '690' },
    { label: 'Tonga', value: '676' },
    { label: 'Trinidad and Tobago', value: '1-868' },
    { label: 'Tunisia', value: '216' },
    { label: 'Turkey', value: '90' },
    { label: 'Turkmenistan', value: '993' },
    { label: 'Turks and Caicos Islands', value: '1-649' },
    { label: 'Tuvalu', value: '688' },
    { label: 'U.S. Virgin Islands', value: '1-340' },
    { label: 'Uganda', value: '256' },
    { label: 'Ukraine', value: '380' },
    { label: 'United Arab Emirates', value: '971' },
    { label: 'United Kingdom', value: '44' },
    { label: 'United States', value: '1' },
    { label: 'Uruguay', value: '598' },
    { label: 'Uzbekistan', value: '998' },
    { label: 'Vanuatu', value: '678' },
    { label: 'Vatican', value: '379' },
    { label: 'Venezuela', value: '58' },
    { label: 'Vietnam', value: '84' },
    { label: 'Wallis and Futuna', value: '681' },
    { label: 'Western Sahara', value: '212' },
    { label: 'Yemen', value: '967' },
    { label: 'Zambia', value: '260' },
    { label: 'Zimbabwe', value: '263' },
];
const Select = props => {
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(props.dataSelect);
    const [selected, setSelected] = useState(props.dataSelected);
    const [idData, setIdData] = useState('');

    const fetchData = async () => {
        await setData(props.dataSelect);
        await setSelected(props.dataSelected)
        const selectedItem = props.dataSelect.find((item) => item.value === props.dataSelected)
        if (selectedItem) {
            setSelected(selectedItem.label);
            console.log(selectedItem);
        } else {
            setSelected('');
        }
    }

    useEffect(() => {
        setSelected(props.dataSelected)
    }, [props.dataSelected])

    useEffect(() => {
        fetchData()
    }, [props.dataSelect]);

    const searchRef = useRef();
    const onSearch = search => {
        if (search !== '') {
            let tempData = data.filter(item => {
                return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setData(tempData);
        } else {
            setData(props.dataSelect);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                style={[{
                    width: '100%',
                    height: 50,
                    borderRadius: 10,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 15,
                    paddingRight: 15,
                    backgroundColor: props.backgroundColor ? props.backgroundColor : 'white'
                }, props.styleSelect]}
                onPress={() => {
                    setClicked(!clicked);
                }}>
                <Text style={[assets.fonts.default, { color: 'grey' }]}>
                    {!selected ? '- Pilih -' : selected}
                </Text>
                {clicked ? (
                    <Icon color={'grey'} name="angle-right" size={20} solid style={{ transform: [{ rotate: '-90deg' }] }} />
                ) : (
                    <Icon color={'grey'} name="angle-right" size={20} solid style={{ transform: [{ rotate: '90deg' }] }} />
                )}
            </TouchableOpacity>
            {clicked ? (
                <View
                    style={{
                        elevation: 15,
                        marginTop: 10,
                        maxHeight: 200,
                        zIndex: 99,
                        alignSelf: 'center',
                        width: '100%',
                        backgroundColor: props.backgroundColor ? props.backgroundColor : '#fff',
                        borderRadius: 5,
                    }}>
                    {
                        props.search ? (
                            <TextInput
                                placeholder="Search.."
                                placeholderTextColor={'grey'}
                                value={search}
                                ref={searchRef}
                                onChangeText={txt => {
                                    onSearch(txt);
                                    setSearch(txt);
                                }}
                                style={[assets.fonts.default, {
                                    width: '90%',
                                    height: 50,
                                    alignSelf: 'center',
                                    borderWidth: 1,
                                    borderColor: '#8e8e8e',
                                    borderRadius: 7,
                                    marginTop: 20,
                                    paddingLeft: 20,
                                    color: 'grey'
                                }]}
                            />
                        ) : null
                    }
                    <ScrollView nestedScrollEnabled
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {data.map((item, index) => (
                            <TouchableOpacity
                                key={index} // Pastikan menyertakan key unik untuk setiap elemen dalam loop
                                style={{
                                    width: '85%',
                                    alignSelf: 'center',
                                    height: 50,
                                    justifyContent: 'center',
                                    borderBottomWidth: 0.5,
                                    borderColor: '#8e8e8e',
                                }}
                                onPress={() => {
                                    setSelected(item.label);
                                    setIdData(item.value);
                                    setClicked(!clicked);
                                    onSearch('');
                                    setSearch('');
                                    props.val && props.val(item.value, item.label);
                                }}
                            >
                                <Text style={[assets.fonts.default, { color: 'grey' }]}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ) : null}
        </View>
    );
};

export default Select;