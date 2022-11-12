async function loadData () {
    const cardData = await d3.json("data\\default-cards-20221109100521.json");
    return cardData;
}
  
loadData().then((loadedData) => {
    console.log("Loaded data", loadedData);

    artistLineChart = new linechart(loadedData);
});