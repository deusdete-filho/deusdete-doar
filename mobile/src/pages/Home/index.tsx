import React, { useState, useEffect } from "react";
import { RectButton } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { View, ImageBackground, Text, Image, StyleSheet } from "react-native";

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation();

  const placeholderUf = {
    label: "Selecione o seu estado",
    value: null,
  };

  const placeholderCity = {
    label: "Selecione a sua cidade",
    value: null,
  };

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") return;

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate("Points", {
      uf: selectedUf,
      city: selectedCity,
    });
  }

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      imageStyle={{ width: 274, height: 268 }}
      style={styles.container}
    >
      <View style={styles.main}>
        <Text style={styles.logo}>
          <AntDesign name="heart" size={35} color="#E92A77" />
          Doar
        </Text>
        <Text style={styles.title}>
          Conectamos pessoas que querem doar com quem mais precisa.
        </Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem um ponto de doação de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.select}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedUf(value)}
            value={selectedUf}
            placeholder={placeholderUf}
            items={ufs.map((uf) => ({
              label: uf,
              value: uf,
            }))}
          />
        </View>

        <View style={styles.select}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedCity(value)}
            placeholder={placeholderCity}
            value={selectedCity}
            items={cities.map((city) => ({
              label: city,
              value: city,
            }))}
          />
        </View>

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="white" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Encontrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    color: "#E92A77",
    fontSize: 45,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },
  title: {
    color: "#165AA8",
    fontSize: 25,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {
    display: "flex",
    justifyContent: "center",
  },

  selectors: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  select: {
    width: "100%",
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#165AA8",
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#165AA8",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },

  buttonText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Ubuntu_700Bold",
    fontSize: 20,
    marginLeft: -30,
  },
});

export default Home;
