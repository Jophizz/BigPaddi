

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Modal, FlatList, Image, Alert, SafeAreaView,StatusBar, ScrollView} from 'react-native';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import { launchImageLibrary } from 'react-native-image-picker';
import { Theme } from '../Components/Theme';


export  function PostAdForm  ({navigation})  {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [selectedState, setSelectedState] = useState(null);
    const [images, setImages] = useState([]);
    const [titleError, setTitleError] = useState(false);

    const categories = [
        { name: "Electronics", icon: "tv" },
        { name: "Vehicles", icon: "car" },
        { name: "Furniture", icon: "couch" },
        { name: "Real Estate", icon: "home" },
        { name: "Jobs", icon: "briefcase" },
        { name: "Services", icon: "cogs" },
        { name: "Fashion", icon: "tshirt" },
        { name: "Books", icon: "book" },
        { name: "Sports", icon: "futbol" },
        { name: "Other", icon: "ellipsis-h" },
    ];

    const nigeriaStatesAndTowns = {
        "Abia": ["Aba", "Umuahia", "Ohafia", "Arochukwu", "Bende", "Isuikwuato"],
        "Adamawa": ["Yola", "Mubi", "Numan", "Ganye", "Jimeta", "Michika"],
        "Akwa Ibom": ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Abak", "Etinan"],
        "Anambra": ["Awka", "Onitsha", "Nnewi", "Ekwulobia", "Agulu", "Igbo-Ukwu"],
        "Bauchi": ["Bauchi", "Azare", "Misau", "Jama'are", "Ningi", "Katagum"],
        "Bayelsa": ["Yenagoa", "Ogbia", "Sagbama", "Brass", "Ekeremor", "Nembe"],
        "Benue": ["Makurdi", "Gboko", "Otukpo", "Katsina-Ala", "Vandeikya", "Obi"],
        "Borno": ["Maiduguri", "Biu", "Bama", "Gwoza", "Kukawa", "Damboa"],
        "Cross River": ["Calabar", "Ogoja", "Ikom", "Obudu", "Ugep", "Obubra"],
        "Delta": ["Asaba", "Warri", "Sapele", "Ughelli", "Ozoro", "Agbor"],
        "Ebonyi": ["Abakaliki", "Afikpo", "Onueke", "Ezza", "Ishielu", "Ikwo"],
        "Edo": ["Benin City", "Auchi", "Ekpoma", "Ubiaja", "Uromi", "Igueben"],
        "Ekiti": ["Ado-Ekiti", "Ikere-Ekiti", "Iyin-Ekiti", "Omuo-Ekiti", "Aramoko", "Efon-Alaaye"],
        "Enugu": ["Enugu", "Nsukka", "Oji River", "Udi", "Agbani", "Awgu"],
        "Gombe": ["Gombe", "Kumo", "Deba", "Billiri", "Kaltungo", "Dukku"],
        "Imo": ["Owerri", "Orlu", "Okigwe", "Oguta", "Mbaise", "Nkwerre"],
        "Jigawa": ["Dutse", "Hadejia", "Kazaure", "Birnin Kudu", "Gumel", "Ringim"],
        "Kaduna": ["Kaduna", "Zaria", "Kafanchan", "Saminaka", "Zonkwa", "Kachia"],
        "Kano": ["Kano", "Wudil", "Gaya", "Rano", "Bichi", "Dambatta"],
        "Katsina": ["Katsina", "Daura", "Funtua", "Malumfashi", "Dutsin-Ma", "Bakori"],
        "Kebbi": ["Birnin Kebbi", "Argungu", "Yauri", "Zuru", "Jega", "Bagudo"],
        "Kogi": ["Lokoja", "Okene", "Idah", "Kabba", "Anyigba", "Dekina"],
        "Kwara": ["Ilorin", "Offa", "Omu-Aran", "Lafiagi", "Pategi", "Jebba"],
        "Lagos": ["Ikeja", "Lagos Island", "Ikorodu", "Epe", "Badagry", "Surulere"],
        "Nasarawa": ["Lafia", "Keffi", "Akwanga", "Nasarawa", "Doma", "Toto"],
        "Niger": ["Minna", "Bida", "Kontagora", "Suleja", "Lapai", "Mokwa"],
        "Ogun": ["Abeokuta", "Ijebu-Ode", "Sagamu", "Ilaro", "Ota", "Ifo"],
        "Ondo": ["Akure", "Ondo", "Owo", "Ikare", "Igbokoda", "Ore"],
        "Osun": ["Osogbo", "Ile-Ife", "Ilesa", "Ede", "Ikirun", "Iwo"],
        "Oyo": ["Ibadan", "Ogbomosho", "Oyo", "Saki", "Iseyin", "Eruwa"],
        "Plateau": ["Jos", "Pankshin", "Shendam", "Barkin Ladi", "Langtang", "Bassa"],
        "Rivers": ["Port Harcourt", "Bonny", "Ahoada", "Omoku", "Okrika", "Degema"],
        "Sokoto": ["Sokoto", "Gwadabawa", "Gusau", "Wurno", "Tambuwal", "Bodinga"],
        "Taraba": ["Jalingo", "Wukari", "Serti", "Bali", "Ibi", "Gembu"],
        "Yobe": ["Damaturu", "Potiskum", "Gashua", "Nguru", "Geidam", "Bade"],
        "Zamfara": ["Gusau", "Kaura Namoda", "Talata Mafara", "Anka", "Bungudu", "Maru"],
        "FCT": ["Asokoro", "Maitama", "Gwarimpa", "Wuse", "Garki","Nyanya"]
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setModalVisible(false);
    };

    const handleLocationSelect = (selectedLocation) => {
        setLocation(selectedLocation);
        setLocationModalVisible(false);
    };

    const handlePostAd = () => {
        Alert.alert("Ad Posted", "Your ad has been successfully posted!");
    };const handleTitleChange = (text) =>{
setTitle(text);
if (text.trim()){
    setTitleError(false);
}
    };

    return (
        <SafeAreaView  style={{ flex: 1,backgroundColor: 'white', padding: 20,marginTop:StatusBar.currentHeight}}>
            <ScrollView>
        <View  style={{ flex: 1,backgroundColor: 'white', padding: 20,}}>
            <View style={{ }}>
            <TextInput
                style={styles.inputError}
                placeholder="Title*"
                placeholderTextColor={titleError ? 'red' : '#7d7d7d'}
                value={title}
                onChangeText={handleTitleChange}
                onBlur={() => {
                    if (!title.trim()) {
                        setTitleError(true);
                    }
                }}
               
               />
              {titleError && <Text style={{ color: 'red',
        fontSize: 14,
        marginBottom: 10,}}>This field is required</Text>}

              </View>
              
            <TouchableOpacity style={styles.selectInput} onPress={() => setModalVisible(true)}>
                <Text style={{}}>{category || "Category*"}</Text>
            </TouchableOpacity>
          
         
            
            <TextInput
                style={[styles.selectInput, !category && { backgroundColor:'#f0f0f0', borderWidth: 1, borderColor: '#323232',borderRadius: 5,padding: 15, marginBottom: 15,fontSize: 16,}]}
                placeholder="Name"
                placeholderTextColor={category ? "#000" :"#7d7d7d"}
                value={name}
                onChangeText={setName}
                editable={!!category}
            />

            <Text style={{ color: '#7d7d7d',fontSize: 16,marginBottom: 10,}}>Add at least 1 photo</Text>
            <View style={{   flexDirection: 'row',alignItems: 'center',}}> 
              <View>{category && ( 
                <TouchableOpacity style={{     width: 100, height: 100,backgroundColor: '#323232',justifyContent: 'center',alignItems: 'center',borderRadius: 10,marginRight: 10,}} >
                    <Text style={{color: '#00c853',fontSize: 30,}}> +</Text>
                </TouchableOpacity>
              )}
                </View>
            </View>


         

            <Text style={{   color: '#7d7d7d',fontSize: 12,marginTop: 10,}}>
               a clear picture of the item you want to sell
            </Text>

            <TextInput
                style={[styles.selectInput, !category && { backgroundColor:'#f0f0f0', borderWidth: 1, borderColor: '#323232',borderRadius: 5,padding: 15, marginBottom: 15,fontSize: 16,}]}
                placeholder="Description*"
                placeholderTextColor={category ? "#000" :"#7d7d7d"}
                value={description}
                onChangeText={setDescription}
                editable={!!category}
            />


            <TouchableOpacity
                        style={[styles.selectInput, !category && { backgroundColor: '#f0f0f0' }]} 
                        onPress={() => category && setLocationModalVisible(true)}  // Disable button if no category
                        disabled={!category}  // Disable if no category is selected
                    >
                        <Text style={styles.textInput}>{location || "Location*"}</Text>
                    </TouchableOpacity>

            <TextInput
                style={[styles.selectInput, !category && { backgroundColor:'#f0f0f0', borderWidth: 1, borderColor: '#323232',borderRadius: 5,padding: 15, marginBottom: 15,fontSize: 16,}]}
                placeholder="Price"
                placeholderTextColor= {category ? "#000" : "#7d7d7d"}
                value={price}
                onChangeText={setPrice}
                editable={!!category}
            />

            <TextInput
                style={[styles.selectInput, !category && {  backgroundColor:'#f0f0f0', borderWidth: 1,borderColor: '#323232',borderRadius: 5,padding: 15,marginBottom: 15,fontSize: 16,}]}
                placeholder="Phone number (digits only)*"
                placeholderTextColor= {category ? "#000" :"#7d7d7d"}
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={!!category}
            />

            <TouchableOpacity style={{  backgroundColor: '#00c853',borderRadius: 5,padding: 15, alignItems: 'center',}} onPress={handlePostAd}>
                <Text style={{ color: '#fff',fontSize: 16,fontWeight: 'bold',}}>Post ad</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{   flex: 1,justifyContent: "center", alignItems: "center",backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
                    <View style={{  flex:1,width: '80%',backgroundColor: "white",borderRadius: 10,padding: 20,alignItems: "center",}}>
                        <Text style={{ fontSize: 18,marginBottom: 20,}}>Select Category</Text>
                        <FlatList
    data={categories}
    keyExtractor={(item) => item.name}
    renderItem={({ item }) => (
        <TouchableOpacity
            style={{  padding: 10,borderBottomColor: '#ccc',borderBottomWidth: 1,width: '100%',}}
            onPress={() => handleCategorySelect(item.name)}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome6 name={item.icon} size={30} color="green" style={{ marginRight: 10 }} />
                <Text style={{  fontSize: 16,color: '#000',}}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )}
/>
                    </View>
                </View>
            </Modal>

          
            <Modal
                animationType="slide"
                transparent={true}
                visible={locationModalVisible}
                onRequestClose={() => setLocationModalVisible(false)}
            >
                <View style={{  flex: 1,justifyContent: "center",alignItems: "center",backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
                    <View style={{   flex:1,width: '80%',backgroundColor: "white",borderRadius: 10,padding: 20,alignItems: "center",}}>
                        <Text style={{ fontSize: 18, marginBottom: 20,}}>Select State</Text>
                        <FlatList
                            data={Object.keys(nigeriaStatesAndTowns)}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.categoryItem,
                                        selectedState === item ? styles.selectedItem : null,
                                    ]}
                                    onPress={() => setSelectedState(item)}
                                >
                                    <Text style={[
                                        styles.categoryText,
                                        selectedState === item ? styles.selectedText : null,
                                    ]}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        {selectedState && (
                            <>
                                <Text style={{ fontSize: 18,marginBottom: 20,}}>Select Town</Text>
                                <FlatList
                                    data={nigeriaStatesAndTowns[selectedState]}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={{   padding: 10, borderBottomColor: '#ccc',borderBottomWidth: 1,width: '100%',}}
                                            onPress={() => handleLocationSelect(`${item}, ${selectedState}`)}
                                        >
                                            <Text style={{fontSize: 16,color: '#000',}}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </>
                        )}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setLocationModalVisible(false)}>
                            <Text style={{marginTop: 20,backgroundColor: '#00c853', padding: 10,borderRadius: 5,}}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
   
    categoryItem: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '100%',
     
    },
    selectInput: {
        borderWidth: 1,
        borderColor: '#323232',
         borderRadius: 5,
       padding: 15,
        marginBottom: 15,
    },
    categoryText: {
        fontSize: 16,
        color: '#000',
 
    },
    selectedItem: {
        backgroundColor: '#00c853',
    },
    textInput:{
        color: "#000"
    },
inputError:{
    borderWidth: 1, borderColor:'#323232', borderRadius: 5, padding: 15,marginBottom: 15,fontSize: 16,

}
     
});

