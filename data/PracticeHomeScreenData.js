import analytics from "@react-native-firebase/analytics";

export const PracticeHomeScreenData = (navigation) => [
  {
    uri: "https://media.istockphoto.com/id/1140322066/vector/man-meditating-in-nature-and-leaves-concept-illustration-for-yoga-meditation-relax.jpg?s=612x612&w=0&k=20&c=p8mdgXLR1O-ROYVjGWdPe56gTGr2srICaC9cdbe4-tM=",
    subtitle: "Find Inner Harmony and Renewal Through Meditation.",
    title: "Meditation",
    onPress: async () => {
      await analytics().logSelectContent({
        content_type: "practice",
        item_id: "meditation",
      });
      console.log("practice: meditation analytics logged");

      navigation.navigate("MeditationsList");
    },
  },
  {
    uri: "https://media.istockphoto.com/id/1304715728/vector/emotions-scale-on-smartphone-screen-mood-concept-tiny-girl-leave-feedback-online-emoji-set.jpg?s=612x612&w=0&k=20&c=aL0usVoe-3cOGY_Opru5f_NJnsLpZLZqqiuqMVkPbK8=",
    subtitle: "Find Serenity Through Journaling.",
    title: "Journal",
    onPress: async () => {
      await analytics().logSelectContent({
        content_type: "practice",
        item_id: "journal",
      });

      console.log("practice: journal analytics logged");
      navigation.navigate("JournalScreen");
    },
  },
  {
    uri: "https://us.123rf.com/450wm/chatun09/chatun092206/chatun09220600135/187305559-knitting-icon-hand-drawn-skein-of-thread-and-crochet-hook-hobby-concept-illustration-print.jpg",
    subtitle: "Find Calm and Creativity through Crocheting.",
    title: "ZenTree",
    onPress: async () => {
      await analytics().logSelectContent({
        content_type: "practice",
        item_id: "crochet",
      });
      console.log("practice: crochet analytics logged");
      navigation.navigate("CrochetDetailsScreen");
    },
  },
  {
    uri: "https://static.vecteezy.com/system/resources/previews/019/465/921/non_2x/illustration-cute-terrarium-in-a-glass-jar-isolated-on-white-background-vector.jpg",
    subtitle: "Build a Terrarium and Cultivate Serenity.",
    title: "ZenTerrarium",
    onPress: async () => {
      await analytics().logSelectContent({
        content_type: "practice",
        item_id: "terrarium",
      });

      console.log("practice: terrarium analytics logged");

      navigation.navigate("TerrariumDetailScreen");
    },
  },
  {
    uri: "https://media.istockphoto.com/id/854150828/vector/aroma-therapy-set-a-collection-of-home-fragrances-aroma-candle-sticks-and-oil-flat-editable.jpg?s=612x612&w=0&k=20&c=FLPasF9qXc9EqcWPW-CEKc_N_dBPmlPRwvAoLipUAj8=",
    subtitle: "Experience Tranquility with ZenBand Aromatherapy.",
    title: "ZenBand",
    onPress: async () => {
      await analytics().logSelectContent({
        content_type: "practice",
        item_id: "zenband",
      });

      console.log("practice: zenband analytics logged");
      navigation.navigate("ZenBandDetailScreen");
    },
  },
];
