export const PracticeHomeScreenData = (navigation) => [
  {
    uri: "https://media.istockphoto.com/id/1140322066/vector/man-meditating-in-nature-and-leaves-concept-illustration-for-yoga-meditation-relax.jpg?s=612x612&w=0&k=20&c=p8mdgXLR1O-ROYVjGWdPe56gTGr2srICaC9cdbe4-tM=",
    subtitle:
      "Journey Within: Find Inner Harmony and Renewal Through Meditation.",
    title: "Meditation",
    onPress: () => {
      navigation.navigate("MeditationsList");
    },
  },
  {
    uri: "https://media.istockphoto.com/id/1304715728/vector/emotions-scale-on-smartphone-screen-mood-concept-tiny-girl-leave-feedback-online-emoji-set.jpg?s=612x612&w=0&k=20&c=aL0usVoe-3cOGY_Opru5f_NJnsLpZLZqqiuqMVkPbK8=",
    subtitle:
      "Discover Your Inner World: Embrace Self-Awareness and Find Serenity Through Journaling.",
    title: "Journal",
    onPress: () => {
      navigation.navigate("JournalScreen");
    },
  },
  {
    uri: "https://us.123rf.com/450wm/chatun09/chatun092206/chatun09220600135/187305559-knitting-icon-hand-drawn-skein-of-thread-and-crochet-hook-hobby-concept-illustration-print.jpg",
    subtitle:
      "Stitch Away Stress: Find Calm and Creativity through Crocheting.",
    title: "Crocheting",
    onPress: () => {
      navigation.navigate("CrochetDetailsScreen");
    },
  },
  {
    uri: "https://static.vecteezy.com/system/resources/previews/019/465/921/non_2x/illustration-cute-terrarium-in-a-glass-jar-isolated-on-white-background-vector.jpg",
    subtitle: "Nurture Your Peace: Build a Terrarium and Cultivate Serenity.",
    title: "Terrarium",
    onPress: () => {
      navigation.navigate("TerrariumDetailScreen");
    },
  },
  {
    uri: "https://media.istockphoto.com/id/854150828/vector/aroma-therapy-set-a-collection-of-home-fragrances-aroma-candle-sticks-and-oil-flat-editable.jpg?s=612x612&w=0&k=20&c=FLPasF9qXc9EqcWPW-CEKc_N_dBPmlPRwvAoLipUAj8=",
    subtitle:
      "Unleash the Power of Scent: Experience Tranquility with ZenBand Aromatherapy.",
    title: "ZenBand",
    onPress: () => {
      navigation.navigate("ZenBandDetailScreen");
    },
  },
];
